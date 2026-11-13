/** Mini-simulateurs du site (RECETTE §9.3) : une entrée par sujet, à remplir pour chaque site.
 *  Fourni vide par la trame (2026-11-13) pour que MiniSim compile ; un sujet inconnu lève une erreur au build. */
import type { MiniSpec } from './mini-types';

const SPECS: Record<string, (lang: string) => MiniSpec> = {};

export function getSpec(kind: string, lang: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`mini-specs : aucun mini-simulateur « ${kind} » — à décrire dans src/lib/mini-specs.ts`);
  return f(lang);
}
