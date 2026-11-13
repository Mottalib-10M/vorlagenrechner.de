/**
 * Kalender : Tage als ganze Zahlen (UTC), gesetzliche Feiertage der 16 Länder (nur landesweite ;
 * Teil-Feiertage einzelner Gemeinden bleiben außen vor, was jede Frist höchstens früher, also sicherer
 * enden lässt). Ostern nach der Gaußschen Osterformel in der Fassung der PTB.
 */
export type Land = 'BW' | 'BY' | 'BE' | 'BB' | 'HB' | 'HH' | 'HE' | 'MV' | 'NI' | 'NW' | 'RP' | 'SL' | 'SN' | 'ST' | 'SH' | 'TH';
export const LAENDER: Land[] = ['BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'];
export const LAND_NAME: Record<Land, { de: string; en: string }> = {
  BW: { de: 'Baden-Württemberg', en: 'Baden-Württemberg' }, BY: { de: 'Bayern', en: 'Bavaria' }, BE: { de: 'Berlin', en: 'Berlin' },
  BB: { de: 'Brandenburg', en: 'Brandenburg' }, HB: { de: 'Bremen', en: 'Bremen' }, HH: { de: 'Hamburg', en: 'Hamburg' },
  HE: { de: 'Hessen', en: 'Hesse' }, MV: { de: 'Mecklenburg-Vorpommern', en: 'Mecklenburg-Western Pomerania' },
  NI: { de: 'Niedersachsen', en: 'Lower Saxony' }, NW: { de: 'Nordrhein-Westfalen', en: 'North Rhine-Westphalia' },
  RP: { de: 'Rheinland-Pfalz', en: 'Rhineland-Palatinate' }, SL: { de: 'Saarland', en: 'Saarland' }, SN: { de: 'Sachsen', en: 'Saxony' },
  ST: { de: 'Sachsen-Anhalt', en: 'Saxony-Anhalt' }, SH: { de: 'Schleswig-Holstein', en: 'Schleswig-Holstein' }, TH: { de: 'Thüringen', en: 'Thuringia' },
};
export const isLand = (s: string): s is Land => (LAENDER as string[]).includes(s);

const MS = 86400000;
export const dn = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d) / MS;
export const fromIso = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return dn(y, m, d); };
export const toIso = (n: number) => new Date(n * MS).toISOString().slice(0, 10);
export const isIso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(fromIso(s)) && toIso(fromIso(s)) === s;
/** 0 = Sonntag … 6 = Samstag */
export const wd = (n: number) => new Date(n * MS).getUTCDay();
export const ymd = (n: number) => { const d = new Date(n * MS); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() }; };
/** Letzter Tag eines Monats (m darf über 12 hinausgehen). */
export const monatsEnde = (y: number, m: number) => dn(y, m + 1, 1) - 1;
/** Gleicher Tag n Monate später ; fehlt er, der letzte Tag jenes Monats (§ 188 Abs. 3 BGB). */
export function plusMonate(n: number, monate: number): number {
  const { y, m, d } = ymd(n);
  const ziel = dn(y, m + monate, 1);
  const { y: y2, m: m2 } = ymd(ziel);
  return Math.min(dn(y2, m2, d), monatsEnde(y2, m2));
}

export function ostersonntag(x: number): number {
  const K = Math.floor(x / 100);
  const M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25);
  const S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19;
  const D = (19 * A + M) % 30;
  const R = Math.floor((D + Math.floor(A / 11)) / 29);
  const OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7);
  const OE = 7 - ((((OG - SZ) % 7) + 7) % 7);
  return dn(x, 3, 1) + OG + OE - 1;
}

type Def = { id: string; de: string; en: string; tag: (y: number) => number | null; laender: Land[] | 'alle'; seit?: Partial<Record<Land, number>> };
const fix = (m: number, d: number) => (y: number) => dn(y, m, d);
const ost = (o: number) => (y: number) => ostersonntag(y) + o;
const bussUndBettag = (y: number) => { const n = dn(y, 11, 23); return n - ((((wd(n) - 3) % 7) + 7) % 7 || 7); };
export const FEIERTAGE: Def[] = [
  { id: 'neujahr', de: 'Neujahr', en: "New Year's Day", tag: fix(1, 1), laender: 'alle' },
  { id: 'drei-koenige', de: 'Heilige Drei Könige', en: 'Epiphany', tag: fix(1, 6), laender: ['BW', 'BY', 'ST'] },
  { id: 'frauentag', de: 'Internationaler Frauentag', en: "International Women's Day", tag: fix(3, 8), laender: ['BE', 'MV'], seit: { BE: 2019, MV: 2023 } },
  { id: 'karfreitag', de: 'Karfreitag', en: 'Good Friday', tag: ost(-2), laender: 'alle' },
  { id: 'ostersonntag', de: 'Ostersonntag', en: 'Easter Sunday', tag: ost(0), laender: ['BB'] },
  { id: 'ostermontag', de: 'Ostermontag', en: 'Easter Monday', tag: ost(1), laender: 'alle' },
  { id: 'maifeiertag', de: 'Tag der Arbeit', en: 'Labour Day', tag: fix(5, 1), laender: 'alle' },
  { id: 'himmelfahrt', de: 'Christi Himmelfahrt', en: 'Ascension Day', tag: ost(39), laender: 'alle' },
  { id: 'pfingstsonntag', de: 'Pfingstsonntag', en: 'Whit Sunday', tag: ost(49), laender: ['BB'] },
  { id: 'pfingstmontag', de: 'Pfingstmontag', en: 'Whit Monday', tag: ost(50), laender: 'alle' },
  { id: 'fronleichnam', de: 'Fronleichnam', en: 'Corpus Christi', tag: ost(60), laender: ['BW', 'BY', 'HE', 'NW', 'RP', 'SL'] },
  { id: 'mariae-himmelfahrt', de: 'Mariä Himmelfahrt', en: 'Assumption Day', tag: fix(8, 15), laender: ['SL'] },
  { id: 'weltkindertag', de: 'Weltkindertag', en: "World Children's Day", tag: fix(9, 20), laender: ['TH'], seit: { TH: 2019 } },
  { id: 'einheit', de: 'Tag der Deutschen Einheit', en: 'German Unity Day', tag: fix(10, 3), laender: 'alle' },
  { id: 'reformationstag', de: 'Reformationstag', en: 'Reformation Day', tag: fix(10, 31), laender: ['BB', 'HB', 'HH', 'MV', 'NI', 'SN', 'ST', 'SH', 'TH'], seit: { HB: 2018, HH: 2018, NI: 2018, SH: 2018 } },
  { id: 'allerheiligen', de: 'Allerheiligen', en: "All Saints' Day", tag: fix(11, 1), laender: ['BW', 'BY', 'NW', 'RP', 'SL'] },
  { id: 'buss-und-bettag', de: 'Buß- und Bettag', en: 'Day of Repentance and Prayer', tag: bussUndBettag, laender: ['SN'] },
  { id: 'weihnachten-1', de: '1. Weihnachtstag', en: 'Christmas Day', tag: fix(12, 25), laender: 'alle' },
  { id: 'weihnachten-2', de: '2. Weihnachtstag', en: 'Second Day of Christmas', tag: fix(12, 26), laender: 'alle' },
];
const cache = new Map<string, Map<number, Def>>();
/** Landesweite gesetzliche Feiertage eines Jahres : Tag → Feiertag. */
export function feiertageJahr(y: number, land: Land): Map<number, Def> {
  const k = `${y}${land}`;
  const hit = cache.get(k); if (hit) return hit;
  const m = new Map<number, Def>();
  for (const f of FEIERTAGE) {
    const t = f.tag(y); if (t === null) continue;
    const seit = f.seit?.[land]; if (seit && y < seit) continue;
    if (f.laender === 'alle' || f.laender.includes(land)) m.set(t, f);
  }
  cache.set(k, m); return m;
}
export const feiertag = (n: number, land: Land) => feiertageJahr(ymd(n).y, land).get(n) ?? null;
/** Werktag im Sinne des § 573c BGB : Montag bis Samstag, kein Feiertag (BGH VIII ZR 206/04 : der Samstag zählt). */
export const istWerktag = (n: number, land: Land) => wd(n) !== 0 && !feiertag(n, land);
/** Werktag im Sinne des § 193 BGB : Montag bis Freitag, kein Feiertag. */
export const istArbeitstag = (n: number, land: Land) => wd(n) !== 0 && wd(n) !== 6 && !feiertag(n, land);
/** n-ter Werktag (Mo–Sa) eines Monats. */
export function nterWerktag(y: number, m: number, n: number, land: Land): number {
  let t = dn(y, m, 1) - 1, k = 0;
  while (k < n) { t++; if (istWerktag(t, land)) k++; }
  return t;
}
/** § 193 BGB : fällt der letzte Tag auf Samstag, Sonntag oder Feiertag, tritt der nächste Werktag an seine Stelle. */
export function nach193(n: number, land: Land): number { let t = n; while (!istArbeitstag(t, land)) t++; return t; }
