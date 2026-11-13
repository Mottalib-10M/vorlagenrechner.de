/** Alle Vorlagen, nach id. */
import type { DocSpec } from './types';
import { mietvertrag, untermiete, wgZimmer, kuendigungMiete } from './miete';
import { kuendigungArbeit, fristRechner, aufhebung } from './arbeit';
import { kuendigung, handy, fitness, strom, versicherung } from './vertraege';
import { vollmacht, kfz, schenkungDoc, mahnung } from './sonstige';
export const SPECS: Record<string, DocSpec> = Object.fromEntries(
  [mietvertrag, untermiete, wgZimmer, kuendigungMiete, kuendigungArbeit, fristRechner, aufhebung, kuendigung, handy, fitness, strom, versicherung, vollmacht, kfz, schenkungDoc, mahnung].map((s) => [s.id, s]),
);
