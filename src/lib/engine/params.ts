/** Regeln und Beträge (RECETTE §4) : eine Datei, an der Quelle gelesen, im Code keine Zahl. */
import raw from '../../data/params-2026.json';
export const P = raw;
export type Params = typeof raw;
export type SourceKey = keyof typeof raw.sources;
export type Lang = 'de' | 'en';
export const sourceUrl = (key: SourceKey): string => (raw.sources[key] as { url: string }).url;
