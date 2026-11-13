/**
 * Eine Seite = EINE Datei in `src/content/outils/`. Sie trägt beide Sprachen
 * (Deutsch und Englisch), Text, FAQ, Quellen, Vorlage und Verweise ; der Kern (Routen, Menüs, Fußzeile,
 * Sitemap, hreflang, Schemas) liest sie selbst.
 */
import type { SourceKey, Params, Lang } from './engine/params';
export type { Lang };
export type Group = 'wohnen' | 'arbeit' | 'kuendigen' | 'weitere';
export interface FAQ { q: string; a: string }

/** Schreibwerkzeuge für den Seitentext : Links, Zahlen und Daten im Format der Sprache, Motor. */
export interface Helpers {
  lang: Lang;
  /** Text der Sprache der Seite, Reihenfolge immer de, en. */
  T: <A>(de: A, en: A) => A;
  /** Interner Link auf eine Seite (id) ; fehlt sie, nur der Text. */
  a: (id: string, text: string) => string;
  eur: (n: number, decimals?: number) => string;
  num: (n: number, decimals?: number) => string;
  /** Datum (ISO) in der Sprache der Seite : « 1. Oktober 2026 », « 1 October 2026 ». */
  date: (iso: string) => string;
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link auf eine amtliche Quelle aus params-2026.json. */
  src: (key: SourceKey, text?: string) => string;
  P: Params;
  M: typeof import('./engine/index');
  /** Tag des Builds (Berliner Zeit). */
  today: string;
}

export interface PageText {
  slug: string;
  nav: string;
  card: string;
  /** 50 bis 60 Zeichen, Suchbegriff vorn (RECETTE §11). */
  title: string;
  /** 150 bis 160 Zeichen. */
  description: string;
  h1: string;
  intro: string;
  /** Zitierfähiger Block : EIN Absatz mit mindestens 120 Wörtern (RECETTE §21). */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  body: (h: Helpers) => string;
}

export interface PageDef {
  id: string;
  group: Group;
  order: number;
  /** Vorlage am Kopf der Seite (lib/docs, components/outils/DocTool.tsx). */
  doc: string;
  /** Vorgaben einzelner Felder. */
  preset?: Record<string, string>;
  related: string[];
  sources: SourceKey[];
  de: PageText;
  en: PageText;
}
export const defineGuide = (g: PageDef): PageDef => g;
