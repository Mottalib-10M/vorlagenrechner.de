import { describe, it, expect } from 'vitest';
import { SPECS } from './index';
const today = '2026-11-13';
const defaults = (id: string) => Object.fromEntries(SPECS[id].fields.map((f) => [f.id, typeof f.def === 'function' ? f.def(today) : f.def]));
describe('Vorlagen', () => {
  for (const id of Object.keys(SPECS)) {
    it(`${id} : Ergebnis und Dokument ohne Lücke`, () => {
      const v = defaults(id);
      for (const l of ['de', 'en'] as const) {
        const r = SPECS[id].result(v, l);
        const s = JSON.stringify(r);
        expect(s).not.toMatch(/undefined|NaN|Invalid/);
        expect(r.value.length).toBeGreaterThan(0);
      }
      const d = SPECS[id].doc?.(v);
      if (d) expect(JSON.stringify(d)).not.toMatch(/undefined|NaN|Invalid|\[object/);
      const ids = SPECS[id].fields.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  }
  it('Kündigung Mietvertrag nennt das berechnete Ende im Brief', () => {
    const v = { ...defaults('kuendigungMiete'), zugang: '2026-11-04', land: 'BE' };
    expect(JSON.stringify(SPECS.kuendigungMiete.doc!(v))).toContain('31. Januar 2027');
  });
  it('Mahnung : Zinsen und Pauschale für Unternehmen', () => {
    const v = { ...defaults('mahnung'), schuldner: 'firma', betrag: '1000', verzug: '2026-07-01', datum: '2026-12-31' };
    const r = SPECS.mahnung.result(v, 'de');
    expect(r.value).toContain('1.093');
  });
});
