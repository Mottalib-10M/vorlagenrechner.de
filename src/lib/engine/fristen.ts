/**
 * Kündigungsfristen, nach dem Wortlaut der Vorschriften (params-2026.json) :
 *   miete      § 573c BGB (Abs. 1 und 3, mit § 549 Abs. 2 Nr. 2 für das möblierte Zimmer in der Wohnung des Vermieters)
 *   arbeit     § 622 BGB (Grundfrist, Staffel des Arbeitgebers, Probezeit) und § 4 KSchG (Klagefrist)
 *   vertrag    § 309 Nr. 9 BGB und § 56 Abs. 3 TKG (Verbraucherverträge mit Mindestlaufzeit)
 *   versicherung § 11 VVG
 * Fristberechnung : §§ 187 Abs. 1, 188 Abs. 2 und 3 BGB. Alle Tage als ganze Zahlen (tage.ts).
 */
import { P } from './params';
import { type Land, dn, fromIso, toIso, ymd, monatsEnde, plusMonate, nterWerktag, wd } from './tage';

/* ------------------------------------------------------------------ Miete */
export interface MieteIn { zugang: string; land: Land; wer: 'mieter' | 'vermieter'; ueberlassung?: string; moebliert?: boolean }
export interface MieteOut {
  ende: string; monate: number; rechtzeitig: boolean;
  /** Letzter Tag, an dem die Kündigung zugehen muss, damit sie zum frühestmöglichen Ende wirkt. */
  stichtag: string;
  /** Stichtag des Folgemonats und das Ende, das er noch erreicht. */
  stichtagNaechster: string; endeNaechster: string;
  jahre: number; regel: 'abs1' | 'abs3';
}
export function miete(x: MieteIn): MieteOut {
  const z = fromIso(x.zugang); const { y, m, d } = ymd(z); const M = P.miete;
  if (x.moebliert) {
    const ok = d <= M.moebliertStichtag;
    const ende = ok ? monatsEnde(y, m) : monatsEnde(y, m + 1);
    const naechst = ymd(dn(y, m + 1, 1));
    return { ende: toIso(ende), monate: 0, rechtzeitig: ok, stichtag: toIso(dn(y, m, M.moebliertStichtag)), stichtagNaechster: toIso(dn(naechst.y, naechst.m, M.moebliertStichtag)), endeNaechster: toIso(monatsEnde(naechst.y, naechst.m)), jahre: 0, regel: 'abs3' };
  }
  let jahre = 0;
  if (x.wer === 'vermieter' && x.ueberlassung) {
    const u = fromIso(x.ueberlassung);
    jahre = 0; while (plusMonate(u, 12 * (jahre + 1)) <= z) jahre++;
  }
  const plus = x.wer === 'vermieter' ? M.vermieterStufenJahre.filter((j) => jahre >= j).length * M.vermieterPlusMonate : 0;
  const monate = M.mieterMonate + plus;
  const st = nterWerktag(y, m, M.karenzWerktage, x.land);
  const ok = z <= st;
  const ende = monatsEnde(y, m + monate - (ok ? 1 : 0));
  const n = ymd(dn(y, m + 1, 1));
  const st2 = nterWerktag(n.y, n.m, M.karenzWerktage, x.land);
  return { ende: toIso(ende), monate, rechtzeitig: ok, stichtag: toIso(st), stichtagNaechster: toIso(st2), endeNaechster: toIso(monatsEnde(n.y, n.m + monate - 1)), jahre, regel: 'abs1' };
}

/* ------------------------------------------------------------------ Arbeit */
export type Vertragsfrist = 'gesetz' | 'm1' | 'm2' | 'm3' | 'm6' | 'q3' | 'q6';
export interface ArbeitIn { zugang: string; beginn: string; wer: 'an' | 'ag'; probezeit: boolean; vertrag?: Vertragsfrist }
export interface ArbeitOut {
  ende: string; regel: 'probezeit' | 'grund' | 'staffel' | 'vertrag'; jahre: number; monate: number;
  /** Ende nach der gesetzlichen Frist allein (zum Vergleich mit einer vertraglichen). */
  endeGesetz: string;
  klagefristBis: string; inProbezeit: boolean;
}
/** Vier Wochen zum Fünfzehnten oder zum Monatsende (§ 622 Abs. 1). */
function grund(z: number): number {
  const t = z + 7 * P.arbeit.grundWochen;
  const { y, m, d } = ymd(t);
  if (d <= 15) return dn(y, m, 15);
  return monatsEnde(y, m);
}
/** n Monate zum Ende eines Kalendermonats. */
const zumMonatsende = (z: number, n: number) => { const t = plusMonate(z, n); const { y, m } = ymd(t); return monatsEnde(y, m); };
/** n Monate zum Quartalsende. */
const zumQuartal = (z: number, n: number) => { const t = plusMonate(z, n); const { y, m } = ymd(t); return monatsEnde(y, Math.ceil(m / 3) * 3); };
export function volleJahre(von: number, bis: number): number { let j = 0; while (plusMonate(von, 12 * (j + 1)) <= bis) j++; return j; }
export function arbeit(x: ArbeitIn): ArbeitOut {
  const z = fromIso(x.zugang), b = fromIso(x.beginn), A = P.arbeit;
  const jahre = volleJahre(b, z);
  const inProbezeit = x.probezeit && z < plusMonate(b, A.probezeitMaxMonate);
  let gesetz: number, regel: ArbeitOut['regel'], monate = 0;
  if (inProbezeit) { gesetz = z + 7 * A.probezeitWochen; regel = 'probezeit'; }
  else if (x.wer === 'ag') {
    const stufe = [...A.staffel].reverse().find(([j]) => jahre >= j);
    if (stufe) { monate = stufe[1]; gesetz = zumMonatsende(z, monate); regel = 'staffel'; }
    else { gesetz = grund(z); regel = 'grund'; }
  } else { gesetz = grund(z); regel = 'grund'; }
  let ende = gesetz;
  if (!inProbezeit && x.vertrag && x.vertrag !== 'gesetz') {
    const n = Number(x.vertrag.slice(1));
    const v = x.vertrag[0] === 'q' ? zumQuartal(z, n) : zumMonatsende(z, n);
    if (v > ende) { ende = v; regel = 'vertrag'; }
  }
  return { ende: toIso(ende), endeGesetz: toIso(gesetz), regel, jahre, monate, klagefristBis: toIso(z + 7 * A.klagefristWochen), inProbezeit };
}

/* ------------------------------------------------------------------ Verbraucherverträge */
export interface VertragIn {
  beginn: string; laufzeit: number; abschluss: string; zugang: string;
  /** Frist vor Ablauf der Erstlaufzeit laut Vertrag, in Monaten. */
  frist: number;
  /** Verlängerung laut Vertrag (nur Altverträge vor dem 1. März 2022), in Monaten. */
  verlaengerung: number;
  tkg?: boolean;
}
export interface VertragOut {
  ende: string; erstEnde: string; spaetesterZugang: string;
  regel: 'erst' | 'monatlich' | 'periode'; neuesRecht: boolean; fristGekappt: boolean; laufzeitZuLang: boolean;
}
export function vertrag(x: VertragIn): VertragOut {
  const V = P.verbraucher, z = fromIso(x.zugang), b = fromIso(x.beginn);
  const neu = x.abschluss >= V.neuesRechtAb || !!x.tkg;
  const fristGekappt = neu && x.frist > V.kuendigungMaxMonate;
  const frist = fristGekappt ? V.kuendigungMaxMonate : Math.max(0, x.frist);
  const laufzeitZuLang = x.laufzeit > (x.tkg ? V.tkgMaxMonate : V.maxErstlaufzeitMonate);
  const erstEnde = plusMonate(b, Math.max(1, x.laufzeit)) - 1;
  const spaet = plusMonate(erstEnde, -frist);
  if (z <= spaet) return { ende: toIso(erstEnde), erstEnde: toIso(erstEnde), spaetesterZugang: toIso(spaet), regel: 'erst', neuesRecht: neu, fristGekappt, laufzeitZuLang };
  if (neu) {
    const e = Math.max(erstEnde, plusMonate(z, x.tkg ? V.tkgFristMonate : V.kuendigungMaxMonate));
    return { ende: toIso(e), erstEnde: toIso(erstEnde), spaetesterZugang: toIso(spaet), regel: 'monatlich', neuesRecht: neu, fristGekappt, laufzeitZuLang };
  }
  const v = Math.max(1, x.verlaengerung);
  let k = 1, e = plusMonate(erstEnde + 1, v * k) - 1;
  while (plusMonate(e, -frist) < z && k < 600) { k++; e = plusMonate(erstEnde + 1, v * k) - 1; }
  return { ende: toIso(e), erstEnde: toIso(erstEnde), spaetesterZugang: toIso(spaet), regel: 'periode', neuesRecht: neu, fristGekappt, laufzeitZuLang };
}

/* ------------------------------------------------------------------ Versicherung (§ 11 VVG) */
export interface VersicherungIn { zugang: string; ablauf: string; frist: number }
export interface VersicherungOut { ende: string; spaetesterZugang: string; fristOk: boolean; frist: number }
export function versicherung(x: VersicherungIn): VersicherungOut {
  const V = P.verbraucher, z = fromIso(x.zugang);
  const frist = Math.min(V.vvgMaxMonate, Math.max(V.vvgMinMonate, Math.round(x.frist) || V.vvgMaxMonate));
  let a = fromIso(x.ablauf), k = 0;
  while (plusMonate(a, -12 * k) > z) k++; // frühestes Ablaufdatum nach dem Zugang suchen
  let e = plusMonate(a, -12 * k); if (e < z) e = plusMonate(a, -12 * (k - 1));
  let i = 0; while (plusMonate(e, -frist) < z && i < 50) { e = plusMonate(e, 12); i++; }
  return { ende: toIso(e), spaetesterZugang: toIso(plusMonate(e, -frist)), fristOk: frist === Math.round(x.frist), frist };
}

/** Grundversorgung Strom oder Gas : zwei Wochen (§ 20 StromGVV). */
export const grundversorgung = (zugang: string) => toIso(fromIso(zugang) + 7 * P.verbraucher.grundversorgungWochen);
export const wochentag = (iso: string) => wd(fromIso(iso));
export { dn };
