/** Beträge : Kaution (§ 551 BGB), Verzugszinsen (§§ 247, 288 BGB), Abfindung (§ 1a KSchG), Schenkung (§§ 15, 16 ErbStG), Zahl in Worten. */
import { P } from './params';
import { fromIso, toIso, plusMonate } from './tage';

export const kaution = (kaltmiete: number) => ({ max: P.miete.kautionMaxMonatsmieten * kaltmiete, rate: (P.miete.kautionMaxMonatsmieten * kaltmiete) / P.miete.kautionRaten, raten: P.miete.kautionRaten });

/** Basiszinssatz an einem Tag (Tabelle der Bundesbank). */
export function basiszins(iso: string): number {
  let s = P.verzug.basiszins[0].satz;
  for (const r of P.verzug.basiszins) if (iso >= r.ab) s = r.satz;
  return s;
}
export interface ZinsTeil { von: string; bis: string; tage: number; satz: number; zins: number }
/** Verzugszinsen auf `betrag` vom ersten Verzugstag `von` bis einschließlich `bis`, taggenau, 365 Tage. */
export function verzugszinsen(betrag: number, von: string, bis: string, verbraucher: boolean): { summe: number; teile: ZinsTeil[]; pauschale: number } {
  const punkte = verbraucher ? P.verzug.verbraucherPunkte : P.verzug.unternehmerPunkte;
  const a = fromIso(von), e = fromIso(bis);
  const teile: ZinsTeil[] = [];
  if (!(betrag > 0) || e < a) return { summe: 0, teile, pauschale: verbraucher ? 0 : P.verzug.pauschale };
  const grenzen = P.verzug.basiszins.map((r) => fromIso(r.ab)).filter((g) => g > a && g <= e);
  const punkteListe = [a, ...grenzen, e + 1];
  for (let i = 0; i < punkteListe.length - 1; i++) {
    const s = punkteListe[i], t = punkteListe[i + 1] - 1;
    const satz = basiszins(toIso(s)) + punkte;
    const tage = t - s + 1;
    teile.push({ von: toIso(s), bis: toIso(t), tage, satz, zins: (betrag * satz * tage) / 36500 });
  }
  return { summe: teile.reduce((x, y) => x + y.zins, 0), teile, pauschale: verbraucher ? 0 : P.verzug.pauschale };
}

/** Abfindung nach § 1a KSchG : 0,5 Monatsverdienste je Jahr, mehr als sechs Monate zählen als volles Jahr. */
export function abfindung1a(monatsverdienst: number, beginn: string, ende: string): { jahre: number; betrag: number } {
  const b = fromIso(beginn), e = fromIso(ende) + 1;
  let monate = 0; while (plusMonate(b, monate + 1) <= e && monate < 1200) monate++;
  const voll = Math.floor(monate / 12), rest = monate - voll * 12;
  const jahre = Math.max(0, voll + (rest >= 6 && plusMonate(b, voll * 12 + 6) < e ? 1 : 0));
  return { jahre, betrag: jahre * P.arbeit.abfindungFaktor * monatsverdienst };
}

export type Beziehung = keyof typeof P.schenkung.freibetraege;
export const STEUERKLASSE: Record<Beziehung, 'I' | 'II' | 'III'> = { ehegatte: 'I', kind: 'I', enkel: 'I', eltern: 'II', geschwister: 'II', nichte: 'II', andere: 'III' };
export function schenkung(betrag: number, frueher: number, b: Beziehung) {
  const fb = P.schenkung.freibetraege[b];
  const summe = Math.max(0, betrag) + Math.max(0, frueher);
  return { freibetrag: fb, summe, ueber: Math.max(0, summe - fb), rest: Math.max(0, fb - summe), klasse: STEUERKLASSE[b] };
}

/* ------------------------------------------------------------------ Zahl in Worten (Kaufpreis, Schenkung) */
const E = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
const Z = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
function bis999(n: number): string {
  const h = Math.floor(n / 100), r = n % 100;
  let s = h ? `${E[h]}hundert` : '';
  if (r < 20) s += E[r];
  else { const e = r % 10, z = Math.floor(r / 10); s += (e ? `${E[e]}und` : '') + Z[z]; }
  return s;
}
/** Ganze Zahl in deutschen Worten, wie im Vertrag : 12500 → « zwölftausendfünfhundert ». */
export function inWorten(n: number): string {
  n = Math.floor(Math.abs(n));
  if (n === 0) return 'null';
  if (n === 1) return 'eins';
  const mio = Math.floor(n / 1e6), tsd = Math.floor((n % 1e6) / 1000), rest = n % 1000;
  let s = '';
  if (mio) s += mio === 1 ? 'eine Million ' : `${bis999(mio)} Millionen `;
  if (tsd) s += `${bis999(tsd)}tausend`;
  if (rest) s += bis999(rest);
  if (n % 100 === 1) s += 's';
  return s.trim();
}
/** Betrag in Worten mit Cent : 1250.5 → « eintausendzweihundertfünfzig Euro und fünfzig Cent ». */
export function euroInWorten(x: number): string {
  const ganz = Math.floor(x + 1e-9), cent = Math.round((x - ganz) * 100);
  const s = `${inWorten(ganz)} Euro`;
  return cent ? `${s} und ${inWorten(cent)} Cent` : s;
}
