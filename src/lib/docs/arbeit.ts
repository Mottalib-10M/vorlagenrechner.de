/** Vorlagen zum Arbeitsverhältnis : Kündigung durch den Arbeitnehmer, Fristenrechner, Aufhebungsvertrag. */
import type { DocSpec, V, FieldDef } from './types';
import { T } from './types';
import { L_, dDe, dL, eurDe, eurL, num, iso, partei, ortDatumFelder, t, joinZeilen } from './util';
import * as M from '../engine';

const ortDatum = (v: V) => `${L_(v.ort, 18)}, den ${dDe(v.datum)}`;
const VERTRAG: FieldDef = {
  id: 'vertrag', kind: 'select', label: t('Frist laut Arbeitsvertrag', 'Notice period in your contract'), def: 'gesetz',
  options: [
    { value: 'gesetz', label: t('keine eigene, gesetzliche Frist', 'none, statutory period') },
    { value: 'm1', label: t('1 Monat zum Monatsende', '1 month to month end') },
    { value: 'm2', label: t('2 Monate zum Monatsende', '2 months to month end') },
    { value: 'm3', label: t('3 Monate zum Monatsende', '3 months to month end') },
    { value: 'm6', label: t('6 Monate zum Monatsende', '6 months to month end') },
    { value: 'q3', label: t('3 Monate zum Quartalsende', '3 months to quarter end') },
    { value: 'q6', label: t('6 Monate zum Quartalsende', '6 months to quarter end') },
  ],
};
const PROBE: FieldDef = { id: 'probezeit', kind: 'select', label: t('Probezeit vereinbart?', 'Probation agreed?'), def: 'nein', options: [{ value: 'nein', label: t('nein oder vorbei', 'no, or over') }, { value: 'ja', label: t('ja, bis zu 6 Monate', 'yes, up to 6 months') }] };
const regelText = (r: M.ArbeitOut, l: 'de' | 'en') => ({
  probezeit: T(l, 'Probezeit: zwei Wochen (§ 622 Abs. 3 BGB)', 'Probation: two weeks (s. 622(3) BGB)'),
  grund: T(l, 'vier Wochen zum 15. oder Monatsende (§ 622 Abs. 1 BGB)', 'four weeks to the 15th or month end (s. 622(1) BGB)'),
  staffel: T(l, `${r.monate} Monat${r.monate > 1 ? 'e' : ''} zum Monatsende nach ${r.jahre} Jahren (§ 622 Abs. 2 BGB)`, `${r.monate} month${r.monate > 1 ? 's' : ''} to month end after ${r.jahre} years (s. 622(2) BGB)`),
  vertrag: T(l, 'längere Frist laut Arbeitsvertrag', 'longer period in your contract'),
}[r.regel]);
const arbeitAus = (v: V, wer: 'an' | 'ag') => M.arbeit({ zugang: iso(v, 'zugang', '2026-11-13'), beginn: iso(v, 'beginn', '2020-01-01'), wer, probezeit: v.probezeit === 'ja', vertrag: (v.vertrag as M.Vertragsfrist) || 'gesetz' });

/* ------------------------------------------------------------------ Kündigung durch den Arbeitnehmer */
export const kuendigungArbeit: DocSpec = {
  id: 'kuendigungArbeit',
  exemple: t('Beispiel: seit 2021 beschäftigt, Zugang heute, keine eigene Frist', 'Example: employed since 2021, received today, no own period'),
  fields: [
    { id: 'zugang', kind: 'date', label: t('Tag, an dem der Arbeitgeber die Kündigung erhält', 'Day your employer receives the letter'), def: (d) => d, group: t('Frist', 'Deadline') },
    { id: 'beginn', kind: 'date', label: t('Beginn des Arbeitsverhältnisses', 'Start of employment'), def: '2021-04-01' },
    PROBE, VERTRAG,
    ...partei('an', 'des Arbeitnehmers', 'the employee', t('Arbeitnehmer', 'Employee')),
    { id: 'pnr', kind: 'text', label: t('Personalnummer (falls vorhanden)', 'Staff number (if any)'), def: '' },
    ...partei('ag', 'des Arbeitgebers', 'the employer', t('Arbeitgeber', 'Employer')),
    { id: 'zHd', kind: 'text', label: t('zu Händen (Personalabteilung)', 'For the attention of (HR)'), def: 'Personalabteilung' },
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const r = arbeitAus(v, 'an');
    return {
      label: T(l, 'Letzter Arbeitstag im Vertrag', 'Last day of employment'), value: dL(r.ende, l), sub: regelText(r, l),
      rows: [
        [T(l, 'Betriebszugehörigkeit', 'Length of service'), `${r.jahre} ${T(l, 'Jahre', 'years')}`],
        [T(l, 'Nach Gesetz allein', 'Statutory period alone'), dL(r.endeGesetz, l)],
        [T(l, 'Form', 'Form'), T(l, 'Papier, eigenhändig unterschrieben', 'paper, signed by hand')],
      ],
      alert: v.vertrag === 'gesetz' ? undefined : T(l, 'Eine Frist im Vertrag darf für Sie nicht länger sein als für den Arbeitgeber (§ 622 Abs. 6 BGB).', 'A contractual period may not be longer for you than for the employer (s. 622(6) BGB).'),
    };
  },
  doc: (v) => {
    const r = arbeitAus(v, 'an');
    return {
      from: joinZeilen(L_(v.anName), L_(v.anStrasse), L_(v.anOrt, 18)),
      to: joinZeilen(L_(v.agName), v.zHd ? `z. Hd. ${v.zHd}` : '', L_(v.agStrasse), L_(v.agOrt, 18)),
      ortDatum: ortDatum(v),
      title: `Kündigung meines Arbeitsverhältnisses${v.pnr ? ` (Personalnummer ${v.pnr})` : ''}`,
      blocks: [
        { p: ['Sehr geehrte Damen und Herren,', `hiermit kündige ich mein Arbeitsverhältnis ordentlich und fristgerecht zum ${dDe(r.ende)}, hilfsweise zum nächstmöglichen Zeitpunkt.`, 'Bitte bestätigen Sie mir den Erhalt dieser Kündigung und das Ende des Arbeitsverhältnisses schriftlich.'] },
        { p: ['Ich bitte um ein qualifiziertes Arbeitszeugnis sowie um Mitteilung, wie mein restlicher Urlaub bis zum Ende des Arbeitsverhältnisses gewährt oder abgegolten wird.', 'Für die gemeinsame Zeit bedanke ich mich.', 'Mit freundlichen Grüßen'] },
      ],
      sign: [L_(v.anName, 20)],
    };
  },
};

/* ------------------------------------------------------------------ Fristenrechner (ohne Dokument) */
export const fristRechner: DocSpec = {
  id: 'fristRechner',
  exemple: t('Beispiel: Arbeitgeber kündigt nach rund fünfeinhalb Jahren', 'Example: employer gives notice after about five and a half years'),
  fields: [
    { id: 'wer', kind: 'select', label: t('Wer kündigt?', 'Who gives notice?'), def: 'ag', options: [{ value: 'ag', label: t('der Arbeitgeber', 'the employer') }, { value: 'an', label: t('ich, der Arbeitnehmer', 'me, the employee') }] },
    { id: 'zugang', kind: 'date', label: t('Zugang der Kündigung', 'Day the notice is received'), def: (d) => d },
    { id: 'beginn', kind: 'date', label: t('Beginn des Arbeitsverhältnisses', 'Start of employment'), def: '2021-05-01' },
    PROBE, VERTRAG,
  ],
  result: (v, l) => {
    const r = arbeitAus(v, v.wer === 'an' ? 'an' : 'ag');
    const rows: Array<[string, string]> = [
      [T(l, 'Regel', 'Rule'), regelText(r, l)],
      [T(l, 'Betriebszugehörigkeit', 'Length of service'), `${r.jahre} ${T(l, 'volle Jahre', 'full years')}`],
      [T(l, 'Ende nach Gesetz allein', 'End under the statute alone'), dL(r.endeGesetz, l)],
    ];
    if (v.wer !== 'an') rows.push([T(l, 'Klage spätestens bis', 'Last day to sue'), dL(r.klagefristBis, l)]);
    return { label: T(l, 'Das Arbeitsverhältnis endet am', 'Employment ends on'), value: dL(r.ende, l), sub: regelText(r, l), rows,
      alert: v.wer !== 'an' ? T(l, `Wer die Kündigung angreifen will, muss binnen drei Wochen nach Zugang klagen (§ 4 KSchG): bis ${dL(r.klagefristBis, l)}.`, `To challenge the dismissal you must sue within three weeks of receipt (s. 4 KSchG): by ${dL(r.klagefristBis, l)}.`) : undefined };
  },
};

/* ------------------------------------------------------------------ Aufhebungsvertrag */
export const aufhebung: DocSpec = {
  id: 'aufhebung',
  exemple: t('Beispiel: 6 Jahre beschäftigt, 4.200 € brutto, Ende in zwei Monaten', 'Example: 6 years’ service, €4,200 gross, end in two months'),
  fields: [
    { id: 'beginn', kind: 'date', label: t('Beginn des Arbeitsverhältnisses', 'Start of employment'), def: '2020-09-01', group: t('Eckdaten', 'Key facts') },
    { id: 'ende', kind: 'date', label: t('Vereinbartes Ende', 'Agreed end date'), def: (d) => { const n = M.fromIso(d); const { y, m } = M.ymd(n); return M.toIso(M.monatsEnde(y, m + 2)); } },
    { id: 'heute', kind: 'date', label: t('Tag der Unterschrift', 'Day of signing'), def: (d) => d },
    { id: 'gehalt', kind: 'number', label: t('Monatsgehalt brutto', 'Gross monthly salary'), def: '4200', unit: '€', max: 1000000 },
    { id: 'abfindung', kind: 'number', label: t('Vereinbarte Abfindung brutto', 'Agreed severance (gross)'), def: '12600', unit: '€', max: 10000000 },
    { id: 'urlaub', kind: 'number', label: t('Resturlaub in Tagen', 'Remaining leave in days'), def: '8', max: 100 },
    { id: 'anlass', kind: 'select', label: t('Auf wessen Veranlassung?', 'At whose initiative?'), def: 'ag', options: [{ value: 'ag', label: t('Arbeitgeber (statt Kündigung)', 'employer (instead of notice)') }, { value: 'an', label: t('Arbeitnehmer', 'employee') }] },
    { id: 'freistellung', kind: 'select', label: t('Freistellung bis zum Ende', 'Garden leave until the end'), def: 'ja', options: [{ value: 'ja', label: t('ja, unwiderruflich, bezahlt', 'yes, irrevocable, paid') }, { value: 'nein', label: t('nein, Arbeit bis zum Ende', 'no, work until the end') }] },
    { id: 'zeugnis', kind: 'select', label: t('Zeugnis', 'Reference'), def: 'gut', options: [{ value: 'sehrgut', label: t('qualifiziert, Note sehr gut', 'detailed, grade very good') }, { value: 'gut', label: t('qualifiziert, Note gut', 'detailed, grade good') }, { value: 'offen', label: t('qualifiziert, wohlwollend', 'detailed, favourable') }] },
    ...partei('ag', 'des Arbeitgebers', 'the employer', t('Arbeitgeber', 'Employer')),
    ...partei('an', 'des Arbeitnehmers', 'the employee', t('Arbeitnehmer', 'Employee')),
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const heute = iso(v, 'heute', '2026-11-13'), ende = iso(v, 'ende', '2027-01-31');
    const frist = M.arbeit({ zugang: heute, beginn: iso(v, 'beginn', '2020-01-01'), wer: 'ag', probezeit: false });
    const ref = M.abfindung1a(num(v, 'gehalt'), iso(v, 'beginn', '2020-01-01'), ende);
    const zuFrueh = ende < frist.ende;
    return {
      label: T(l, 'Übliche Abfindung, grob geschätzt', 'Usual severance, rough estimate'), value: eurL(ref.betrag, l),
      sub: T(l, `Richtwert, kein Anspruch: ein halbes Monatsgehalt je Jahr, × ${ref.jahre} Jahre (§ 1a KSchG)`, `a guide, not an entitlement: half a month’s pay per year, × ${ref.jahre} years (s. 1a KSchG)`),
      rows: [
        [T(l, 'Im Vertrag vereinbart', 'Agreed in the contract'), eurL(num(v, 'abfindung'), l)],
        [T(l, 'Ende bei Kündigung durch den Arbeitgeber', 'End if the employer gave notice'), dL(frist.ende, l)],
        [T(l, 'Vereinbartes Ende', 'Agreed end'), dL(ende, l)],
        [T(l, 'Kündigungsfrist eingehalten?', 'Notice period respected?'), zuFrueh ? T(l, 'nein, Ende zu früh', 'no, end too early') : T(l, 'ja', 'yes')],
      ],
      alert: zuFrueh
        ? T(l, `Das vereinbarte Ende liegt vor dem Ende der Kündigungsfrist (${dL(frist.ende, l)}). Die Agentur für Arbeit kann das Arbeitslosengeld dann eher für bis zu 12 Wochen sperren (§ 159 SGB III).`, `The agreed end is before the employer’s notice period would end (${dL(frist.ende, l)}). The employment agency is then more likely to suspend unemployment benefit for up to 12 weeks (s. 159 SGB III).`)
        : undefined,
      hinweis: zuFrueh ? undefined : T(l, 'Arbeitslosengeld: Nach einem Aufhebungsvertrag kann die Agentur für Arbeit das Geld bis zu 12 Wochen sperren, wenn sie keinen wichtigen Grund sieht. Ein Ende, das die Kündigungsfrist einhält, und eine sonst drohende Kündigung sprechen für Sie (§ 159 SGB III).', 'Unemployment benefit: signing a termination agreement can lead to a suspension of up to 12 weeks if the employment agency sees no good reason. An end that respects the notice period and a dismissal that would otherwise have come count in your favour (s. 159 SGB III).'),
    };
  },
  doc: (v) => {
    const note = { sehrgut: 'mit der Gesamtnote „sehr gut“', gut: 'mit der Gesamtnote „gut“', offen: 'wohlwollend formuliert' }[v.zeugnis as 'gut'] ?? 'wohlwollend formuliert';
    return {
      title: 'Aufhebungsvertrag',
      blocks: [
        { p: [`Zwischen ${L_(v.agName)}, ${L_(v.agStrasse)}, ${L_(v.agOrt, 18)} (Arbeitgeber)`, `und ${L_(v.anName)}, ${L_(v.anStrasse)}, ${L_(v.anOrt, 18)} (Arbeitnehmer)`, 'wird Folgendes vereinbart:'] },
        { h: '§ 1 Beendigung', p: [`Das seit dem ${dDe(v.beginn)} bestehende Arbeitsverhältnis endet ${v.anlass === 'ag' ? 'auf Veranlassung des Arbeitgebers zur Vermeidung einer sonst auszusprechenden ordentlichen betriebsbedingten Kündigung' : 'auf Wunsch des Arbeitnehmers'} einvernehmlich mit Ablauf des ${dDe(v.ende)}.`] },
        { h: '§ 2 Vergütung und Freistellung', p: [v.freistellung === 'ja' ? `Der Arbeitgeber stellt den Arbeitnehmer ab Unterzeichnung bis zum Ende unwiderruflich unter Fortzahlung der Vergütung von der Arbeit frei. Der Resturlaub von ${num(v, 'urlaub')} Tagen wird mit der Freistellung gewährt.` : `Der Arbeitnehmer arbeitet bis zum Ende zu den bisherigen Bedingungen. Der Resturlaub von ${num(v, 'urlaub')} Tagen wird bis dahin in natura gewährt; was nicht genommen werden kann, wird abgegolten.`, 'Die Vergütung wird bis zum Ende ordnungsgemäß abgerechnet und gezahlt.'] },
        { h: '§ 3 Abfindung', p: [`Für den Verlust des Arbeitsplatzes zahlt der Arbeitgeber eine Abfindung von ${eurDe(num(v, 'abfindung'))} brutto. Sie ist mit der letzten Gehaltsabrechnung fällig und vererblich.`] },
        { h: '§ 4 Zeugnis', p: [`Der Arbeitnehmer erhält ein qualifiziertes Arbeitszeugnis ${note}, das ihm für sein berufliches Fortkommen nicht hinderlich ist.`] },
        { h: '§ 5 Rückgabe und Abwicklung', p: ['Der Arbeitnehmer gibt alle Arbeitsmittel, Schlüssel und Unterlagen des Arbeitgebers bis zum Ende zurück. Der Arbeitgeber übermittelt die Arbeitspapiere und die Arbeitsbescheinigung.'] },
        { h: '§ 6 Hinweise', p: ['Der Arbeitnehmer wurde darauf hingewiesen, dass er sich frühzeitig bei der Agentur für Arbeit arbeitsuchend melden muss und dass ein Aufhebungsvertrag zu einer Sperrzeit beim Arbeitslosengeld führen kann (§ 159 SGB III). Er hatte Gelegenheit, sich vor der Unterschrift beraten zu lassen.'] },
        { h: '§ 7 Form', p: ['Dieser Vertrag bedarf der Schriftform; die elektronische Form ist ausgeschlossen (§ 623 BGB). Beide Seiten unterschreiben dasselbe Exemplar.', ortDatum(v)] },
      ],
      sign: ['Arbeitgeber', 'Arbeitnehmer'],
    };
  },
};
