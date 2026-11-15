/**
 * Défauts relevés par les testeurs naïfs du 2026-11-14 sur vorlagenrechner.de (RECETTE §15.8) :
 *  1. dates déjà passées affichées sans « verpasst » (Fitnessstudio, Strom) ; exemples par défaut à échéance future ;
 *  2. champ date natif lu au format américain (« 04/01/2025 ») → champ texte TT.MM.JJJJ ;
 *  3. barre du chiffre clé : dans le flux en tête du calculateur, collée sous le menu, texte non tronqué (3e tour) ;
 *  4. jargon : « Recht: ab 1. März 2022 », « Altvertrag », « Spätester Zugang dafür », Faustformel présentée comme un droit,
 *     « Frist des Vermieters nach 8 Jahren » ; références de loi sorties des phrases ;
 *  5. tableaux d'exemples : la date en tête de fiche porte le nom de sa colonne.
 */
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SPECS } from '../src/lib/docs';
import { beginnVor } from '../src/lib/docs/vertraege';
import * as M from '../src/lib/engine';
import DateField, { texteVersIso, isoVersTexte } from '../src/components/ui/DateField';
import DocTool, { ohneVorschrift } from '../src/components/outils/DocTool';
import { ficheTitre, tableHtml } from '../src/lib/tableaux';
import { readFileSync } from 'node:fs';

const defaults = (id: string, today: string) => Object.fromEntries(SPECS[id].fields.map((f) => [f.id, typeof f.def === 'function' ? f.def(today) : f.def]));
const VERTRAEGE = ['kuendigung', 'handy', 'fitness', 'strom'];
const JOURS = ['2026-11-14', '2026-11-30', '2026-12-01', '2027-01-31', '2027-02-28', '2027-07-15', '2028-02-29'];

describe('1. échéances : jamais une date passée sans le dire', () => {
  it('exemples par défaut : fin de la durée minimale et dernier jour d’arrivée encore à venir, quel que soit le jour du build', () => {
    for (const id of VERTRAEGE) for (const today of JOURS) {
      const v = defaults(id, today);
      const r = M.vertrag({ beginn: v.beginn, laufzeit: Number(v.laufzeit), abschluss: v.beginn, zugang: v.zugang, frist: Number(v.frist), verlaengerung: 12, tkg: id === 'handy' });
      expect(r.regel, `${id} ${today}`).toBe('erst');
      expect(r.spaetesterZugang >= today, `${id} ${today}`).toBe(true);
      expect(r.erstEnde > today, `${id} ${today}`).toBe(true);
      const s = JSON.stringify(SPECS[id].result(v, 'de'));
      expect(s).not.toMatch(/verpasst|vorbei/);
      expect(s).toContain('Muss spätestens ankommen am');
      expect(s).not.toMatch(/Spätester Zugang|"Recht"|Altvertrag/);
    }
  });
  it('le texte de l’exemple dit le même mois que le champ « Vertragsbeginn »', () => {
    const ex = SPECS.fitness.exemple as (d: string) => { de: string; en: string };
    expect(beginnVor('2026-11-14', 9)).toBe('2026-02-01');
    expect(ex('2026-11-14').de).toBe('Beispiel: Mitgliedschaft seit Februar 2026, 12 Monate');
    expect(ex('2026-11-14').en).toBe('Example: membership since February 2026, 12 months');
  });
  it('Fitnessstudio : durée minimale finie → « schon vorbei », « verpasst: nächster möglicher Termin »', () => {
    const v = { ...defaults('fitness', '2026-11-14'), beginn: '2025-04-01', laufzeit: '12', zugang: '2026-11-14' };
    const r = SPECS.fitness.result(v, 'de');
    expect(r.value).toBe('14. Dezember 2026');
    const rows = Object.fromEntries(r.rows!);
    expect(rows['Ende der Mindestlaufzeit']).toBe('schon vorbei (31. März 2026)');
    expect(rows['Muss spätestens ankommen am']).toBe('28. Februar 2026, verpasst: nächster möglicher Termin 14. Dezember 2026');
    expect(r.sub).toMatch(/^Mindestlaufzeit schon vorbei: Sie können jederzeit/);
    expect(rows['Welche Regeln gelten']).toBe('neue Regeln: Vertrag ab 1. März 2022');
  });
  it('Strom : idem ; ancien contrat → « alte Regeln »', () => {
    const v = { ...defaults('strom', '2026-11-14'), beginn: '2025-02-01', laufzeit: '12', zugang: '2026-11-14' };
    expect(JSON.stringify(SPECS.strom.result(v, 'de'))).toContain('31. Dezember 2025, verpasst: nächster möglicher Termin');
    const alt = { ...defaults('kuendigung', '2026-11-14'), beginn: '2021-01-01', laufzeit: '24', zugang: '2026-11-14', frist: '3' };
    const r = SPECS.kuendigung.result(alt, 'de');
    expect(Object.fromEntries(r.rows!)['Welche Regeln gelten']).toBe('alte Regeln: Vertrag vor dem 1. März 2022');
    expect(r.sub).toMatch(/vor März 2022/);
  });
  it('Kündigung Mietvertrag : « verpasst » dans la ligne, plus de « Frist des Vermieters nach 8 Jahren »', () => {
    const v = { ...defaults('kuendigungMiete', '2026-11-14'), zugang: '2026-11-14', land: 'BE' };
    const r = SPECS.kuendigungMiete.result(v, 'de');
    const s = JSON.stringify(r);
    expect(s).not.toMatch(/8 Jahren|Vermieters|Stichtag|… Ende/);
    expect(s).toContain('verpasst: nächster möglicher Termin 28. Februar 2027');
  });
});

describe('2. champ date : texte TT.MM.JJJJ, jamais natif', () => {
  it('lecture jour d’abord', () => {
    expect(texteVersIso('01.04.2025')).toBe('2025-04-01');
    expect(texteVersIso('1.4.2025')).toBe('2025-04-01');
    expect(texteVersIso('04/01/2025')).toBe('2025-01-04');
    expect(texteVersIso('01042025')).toBe('2025-04-01');
    expect(texteVersIso('31.02.2025')).toBeNull();
    expect(texteVersIso('2025-04-01')).toBeNull();
    expect(isoVersTexte('2025-04-01')).toBe('01.04.2025');
  });
  it('rendu : type text, valeur TT.MM.JJJJ, date en toutes lettres et aide', () => {
    const html = renderToStaticMarkup(createElement(DateField, { id: 'x', label: 'Vertragsbeginn', value: '2025-04-01', onChange: () => {}, help: 'steht auf Vertrag' }));
    expect(html).not.toContain('type="date"');
    expect(html).toContain('type="text"');
    expect(html).toContain('value="01.04.2025"');
    expect(html).toContain('= 1. April 2025');
    expect(html).toContain('TT.MM.JJJJ');
  });
  it('aucun calculateur ne rend un champ date natif', () => {
    for (const id of Object.keys(SPECS)) {
      const html = renderToStaticMarkup(createElement(DocTool, { docId: id, lang: 'de', refDay: '2026-11-14', id: `t-${id}` }));
      expect(html, id).not.toContain('type="date"');
    }
  });
});

describe('3. barre du chiffre clé', () => {
  it('dans le flux, en tête du calculateur, jamais par-dessus un champ, texte non tronqué (3e tour)', () => {
    const src = readFileSync(new URL('../src/components/calc/kit.tsx', import.meta.url), 'utf8');
    const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
    expect(src).toMatch(/data-barre-cle/);
    expect(src).toMatch(/className=\{`sticky top-16 /);
    expect(src).not.toMatch(/fixed inset-x-0 bottom-0/);
    expect(src).not.toMatch(/truncate/);
    expect(css).toMatch(/\[data-barre-cle\][^}]*scroll-padding-top/);
  });
});

describe('4. mots simples, lois en note', () => {
  it('références de loi sorties de la phrase', () => {
    const refs: string[] = [];
    expect(ohneVorschrift('vier Wochen zum 15. oder Monatsende (§ 622 Abs. 1 BGB)', refs)).toBe('vier Wochen zum 15. oder Monatsende');
    expect(refs).toEqual(['§ 622 Abs. 1 BGB']);
  });
  it('Aufhebungsvertrag : estimation, pas un droit ; verdict sur la Kündigungsfrist ; pas de ligne « Sperrzeit »', () => {
    const v = defaults('aufhebung', '2026-11-14');
    const r = SPECS.aufhebung.result(v, 'de');
    expect(r.label).toBe('Übliche Abfindung, grob geschätzt');
    expect(r.sub).toMatch(/kein Anspruch/);
    expect(Object.fromEntries(r.rows!)['Kündigungsfrist eingehalten?']).toBe('ja');
    expect(JSON.stringify(r.rows)).not.toMatch(/Sperrzeit|Faustformel/);
    expect(r.alert).toBeUndefined();
    expect(r.hinweis).toMatch(/12 Wochen/);
    const html = renderToStaticMarkup(createElement(DocTool, { docId: 'aufhebung', lang: 'de', refDay: '2026-11-14', id: 'a' }));
    expect(html).toContain('Grundlage: § 1a KSchG; § 159 SGB III');
    expect(html).not.toContain('(§ 1a KSchG)');
  });
});

describe('5. tableaux d’exemples : la date en titre de fiche est nommée', () => {
  it('colonne de dates avec en-tête → nommée', () => {
    expect(ficheTitre(['Kündigung kommt an', 'Vertrag', 'Alt'], [['1. Oktober 2026', '31. Dezember 2026', '31. Dezember 2026']])).toEqual({ titre: 0, nommer: true });
    expect(ficheTitre(['Notice arrives', 'A', 'B'], [['1 October 2026', 'x', 'y']])).toEqual({ titre: 0, nommer: true });
    expect(tableHtml(['Kündigung kommt an', 'Ende', 'Alt'], [['1. Oktober 2026', 'a', 'b']])).toContain('data-label="Kündigung kommt an"');
    expect(ficheTitre(['Vertrag', 'Regel', 'Form'], [['Wohnung (Mieter)', '3 Monate', 'Schriftform']])).toEqual({ titre: 0, nommer: false });
  });
});
