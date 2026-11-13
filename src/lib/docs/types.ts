/**
 * Eine Vorlage = eine Spezifikation : Felder (deutsch und englisch beschriftet), ein Ergebnis (Datum oder
 * Betrag, aus dem Motor) und das Dokument selbst, immer auf Deutsch, weil Vermieter, Arbeitgeber und
 * Anbieter es so erwarten. Standardisierte Textbausteine wie in einem Formularhandbuch (BGH I ZR 113/20) :
 * keine Prüfung des Einzelfalls.
 */
export type L = 'de' | 'en';
export type Txt = { de: string; en: string };
export type V = Record<string, string>;
export interface FieldDef {
  id: string;
  kind: 'text' | 'date' | 'number' | 'select';
  label: Txt;
  help?: Txt;
  /** Vorgabe ; eine Funktion bekommt den Tag des Builds (gleich auf Server und im Browser). */
  def: string | ((today: string) => string);
  options?: Array<{ value: string; label: Txt }>;
  unit?: string; max?: number; min?: number; decimals?: number;
  showIf?: (v: V) => boolean;
  /** Überschrift einer Feldgruppe, an ihrem ersten Feld. */
  group?: Txt;
  /** ganze Zeile statt halber */
  wide?: boolean;
  /** persönliche Angabe : nie vorbelegt, im Dokument eine Schreiblinie, solange leer */
  personal?: boolean;
}
export interface Result {
  label: string; value: string; sub?: string;
  rows?: Array<[string, string]>;
  alert?: string;
}
export interface DocBlock { h?: string; p: string[] }
export interface DocOut {
  /** Absender oben links (Briefe) */
  from?: string[];
  /** Empfänger (Briefe) */
  to?: string[];
  ortDatum?: string;
  title: string;
  blocks: DocBlock[];
  /** Unterschriftszeilen */
  sign: string[];
}
export interface DocSpec {
  id: string;
  fields: FieldDef[];
  result: (v: V, l: L) => Result;
  doc?: (v: V) => DocOut;
  /** Was das Beispiel annimmt (Hinweis « Beispiel », solange nichts geändert ist). */
  exemple: Txt;
}
export const T = <A,>(l: L, de: A, en: A) => (l === 'en' ? en : de);
