/** Bausteine der Vorlagen : Platzhalter, Datum, Beträge, Standardfelder. */
import type { FieldDef, Txt, V } from './types';
import { displayDate, formatMoney } from '../format';
import { fromIso, toIso, isIso, isLand, LAENDER, LAND_NAME, type Land } from '../engine';

/** Leeres Feld → Schreiblinie, damit ein leer gedrucktes Blatt von Hand ausgefüllt werden kann. */
export const L_ = (s: string | undefined, n = 28) => (s && s.trim() ? s.trim() : '_'.repeat(n));
export const dDe = (iso: string) => (isIso(iso) ? displayDate(iso, 'de-DE') : '__.__.____');
export const dL = (iso: string, l: 'de' | 'en') => (isIso(iso) ? displayDate(iso, l === 'en' ? 'en-GB' : 'de-DE') : '—');
export const kurz = (iso: string) => (isIso(iso) ? iso.split('-').reverse().join('.') : '__.__.____');
export const eurDe = (x: number, d = 2) => (Number.isFinite(x) && x > 0 ? formatMoney(x, d, 'de') : '________ €');
export const eurL = (x: number, l: 'de' | 'en', d = 0) => formatMoney(Number.isFinite(x) ? x : 0, d, l);
export const num = (v: V, k: string) => { const n = Number(String(v[k] ?? '').replace(',', '.')); return Number.isFinite(n) ? n : 0; };
export const iso = (v: V, k: string, fb: string) => (isIso(v[k] ?? '') ? v[k] : fb);
export const land = (v: V): Land => (isLand(v.land ?? '') ? (v.land as Land) : 'BE');
export const plusTage = (d: string, n: number) => toIso(fromIso(d) + n);
export const joinZeilen = (...z: Array<string | undefined>) => z.filter((x) => x && x.trim()).map((x) => x!.trim());

const t = (de: string, en: string): Txt => ({ de, en });
/** Name und Anschrift einer Partei (drei Felder) ; `gruppe` = Überschrift der Feldgruppe. */
export function partei(p: string, rolleDe: string, rolleEn: string, gruppe?: Txt): FieldDef[] {
  return [
    { id: `${p}Name`, kind: 'text', label: t(`Name ${rolleDe}`, `Name of ${rolleEn}`), def: '', personal: true, ...(gruppe ? { group: gruppe } : {}) },
    { id: `${p}Strasse`, kind: 'text', label: t('Straße und Hausnummer', 'Street and number'), def: '', personal: true },
    { id: `${p}Ort`, kind: 'text', label: t('PLZ und Ort', 'Postcode and town'), def: '', personal: true },
  ];
}
export const landFeld = (help?: Txt): FieldDef => ({
  id: 'land', kind: 'select', label: t('Bundesland (Feiertage)', 'German state (public holidays)'), def: 'BE', help,
  options: LAENDER.map((l) => ({ value: l, label: LAND_NAME[l] })),
});
export const datumFeld = (id: string, label: Txt, help?: Txt, def: string | ((d: string) => string) = (d) => d): FieldDef => ({ id, kind: 'date', label, help, def });
export const ortDatumFelder = (): FieldDef[] => [
  { id: 'ort', kind: 'text', label: t('Ort der Unterschrift', 'Place of signing'), def: '', personal: true, group: t('Ort und Datum', 'Place and date') },
  { id: 'datum', kind: 'date', label: t('Datum', 'Date'), def: (d) => d },
];
export { t };
