/** Kündigung von Verbraucherverträgen : allgemein, Handy und Internet, Fitnessstudio, Strom und Gas, Versicherung. */
import type { DocSpec, V, FieldDef, Txt, Result, L } from './types';
import { T } from './types';
import { L_, dDe, dL, num, iso, partei, ortDatumFelder, t, joinZeilen, plusTage } from './util';
import * as M from '../engine';

const ortDatum = (v: V) => `${L_(v.ort, 18)}, den ${dDe(v.datum)}`;
const ALT = (v: V) => iso(v, 'beginn', '2025-01-01') < M.P.verbraucher.neuesRechtAb;

/**
 * Vertragsbeginn des Beispiels : erster Tag des Monats, `monate` Monate vor dem Tag des Builds. So endet die
 * Mindestlaufzeit des Beispiels immer in den nächsten Monaten und der späteste Zugang liegt noch vor uns
 * (testeurs naïfs du 2026-11-14 : « Ende der Mindestlaufzeit 31. März 2026 » im November 2026 las sich wie « zu spät »).
 * Die Seite wird täglich neu gebaut (.github/workflows/deploy.yml).
 */
export const beginnVor = (today: string, monate: number) => { const { y, m } = M.ymd(M.fromIso(today)); return M.toIso(M.dn(y, m - monate, 1)); };
const monatJahr = (iso: string, l: L) => new Date(`${iso}T00:00:00Z`).toLocaleDateString(l === 'en' ? 'en-GB' : 'de-DE', { month: 'long', year: 'numeric', timeZone: 'UTC' });
/** Text des Beispiels mit dem Monat des Vertragsbeginns. */
const beispiel = (monate: number, de: (mj: string) => string, en: (mj: string) => string) => (today: string): Txt => { const b = beginnVor(today, monate); return { de: de(monatJahr(b, 'de')), en: en(monatJahr(b, 'en')) }; };
const ZUGANG_HILFE = t('der Tag, an dem Ihr Schreiben ankommt, nicht der Tag des Absendens: rechnen Sie einige Tage Postweg ein', 'the day your letter arrives, not the day you post it: allow a few days for the post');

/** Felder der Laufzeit : Beginn, Mindestlaufzeit, Frist, (bei Altverträgen) Verlängerung, Zugang. */
function laufzeitFelder(monateVorher: number, defLaufzeit: number, gruppe: Txt): FieldDef[] {
  return [
    { id: 'zugang', kind: 'date', label: t('Tag, an dem der Anbieter die Kündigung erhält', 'Day the provider receives the notice'), def: (d) => d, group: gruppe, help: ZUGANG_HILFE },
    { id: 'beginn', kind: 'date', label: t('Vertragsbeginn', 'Contract start'), def: (d) => beginnVor(d, monateVorher), help: t('steht auf Vertrag oder erster Rechnung', 'on the contract or first bill') },
    { id: 'laufzeit', kind: 'number', label: t('Mindestlaufzeit in Monaten', 'Minimum term in months'), def: String(defLaufzeit), max: 120 },
    { id: 'frist', kind: 'number', label: t('Kündigungsfrist laut Vertrag in Monaten', 'Notice period in the contract, months'), def: '1', max: 12 },
    { id: 'verlaengerung', kind: 'number', label: t('Verlängerung laut Vertrag in Monaten', 'Renewal period in the contract, months'), def: '12', max: 60, showIf: ALT },
  ];
}
function vertragErgebnis(v: V, l: L, tkg: boolean): { r: M.VertragOut; res: Result } {
  const beginn = iso(v, 'beginn', '2025-01-01');
  const r = M.vertrag({ beginn, laufzeit: num(v, 'laufzeit') || 1, abschluss: beginn, zugang: iso(v, 'zugang', '2026-11-13'), frist: num(v, 'frist'), verlaengerung: num(v, 'verlaengerung') || 12, tkg });
  const zugang = iso(v, 'zugang', '2026-11-13');
  // Verpasst : der späteste Zugang zum Ende der Mindestlaufzeit liegt vor dem Tag, an dem das Schreiben ankommt.
  const verpasst = r.regel !== 'erst';
  const erstVorbei = r.erstEnde < zugang;
  const regel = {
    erst: T(l, 'rechtzeitig zum Ende der Mindestlaufzeit', 'in time for the end of the minimum term'),
    monatlich: erstVorbei
      ? (tkg ? T(l, 'Mindestlaufzeit schon vorbei: Sie können jederzeit mit einem Monat Frist kündigen (§ 56 Abs. 3 TKG)', 'minimum term already over: you can cancel at any time on one month’s notice (s. 56(3) TKG)') : T(l, 'Mindestlaufzeit schon vorbei: Sie können jederzeit mit höchstens einem Monat Frist kündigen (§ 309 Nr. 9 BGB)', 'minimum term already over: you can cancel at any time on at most one month’s notice (s. 309 no. 9 BGB)'))
      : T(l, 'Termin zum Ende der Mindestlaufzeit verpasst: danach gilt ein Monat ab Zugang', 'end-of-term deadline missed: after that, one month from receipt applies'),
    periode: T(l, 'Vertrag von vor März 2022: Termin verpasst, er verlängert sich wie im Vertrag vereinbart', 'contract from before March 2022: deadline missed, it renews as agreed in the contract'),
  }[r.regel];
  const alerts: string[] = [];
  if (r.fristGekappt) alerts.push(T(l, 'Eine Frist von mehr als einem Monat ist bei Verträgen ab dem 1. März 2022 unwirksam; gerechnet wird mit einem Monat.', 'A notice period over one month is void for contracts from 1 March 2022; we use one month.'));
  if (r.laufzeitZuLang) alerts.push(T(l, 'Eine erste Laufzeit über 24 Monate ist in den AGB eines Verbrauchervertrags unwirksam.', 'An initial term over 24 months is void in a consumer contract’s standard terms.'));
  return {
    r,
    res: {
      label: T(l, 'Der Vertrag endet am', 'The contract ends on'), value: dL(r.ende, l), sub: regel,
      rows: [
        [T(l, 'Ende der Mindestlaufzeit', 'End of minimum term'), erstVorbei ? T(l, `schon vorbei (${dL(r.erstEnde, l)})`, `already over (${dL(r.erstEnde, l)})`) : dL(r.erstEnde, l)],
        verpasst
          ? [T(l, 'Muss spätestens ankommen am', 'Must arrive by'), T(l, `${dL(r.spaetesterZugang, l)}, verpasst: nächster möglicher Termin ${dL(r.ende, l)}`, `${dL(r.spaetesterZugang, l)}, missed: next possible date ${dL(r.ende, l)}`)]
          : [T(l, 'Muss spätestens ankommen am', 'Must arrive by'), dL(r.spaetesterZugang, l)],
        [T(l, 'Welche Regeln gelten', 'Which rules apply'), r.neuesRecht ? T(l, 'neue Regeln: Vertrag ab 1. März 2022', 'new rules: contract from 1 March 2022') : T(l, 'alte Regeln: Vertrag vor dem 1. März 2022', 'old rules: contract before 1 March 2022')],
      ],
      alert: alerts.join(' ') || undefined,
    },
  };
}
const brief = (v: V, betreff: string, saetze: string[], ende: string): ReturnType<NonNullable<DocSpec['doc']>> => ({
  from: joinZeilen(L_(v.kdName), L_(v.kdStrasse), L_(v.kdOrt, 18)),
  to: joinZeilen(L_(v.abName), L_(v.abStrasse), L_(v.abOrt, 18)),
  ortDatum: ortDatum(v),
  title: betreff,
  blocks: [
    { p: ['Sehr geehrte Damen und Herren,', `hiermit kündige ich den oben genannten Vertrag ordentlich und fristgerecht zum ${ende}, hilfsweise zum nächstmöglichen Termin.`, ...saetze] },
    { p: ['Bitte bestätigen Sie mir den Eingang der Kündigung und das genaue Vertragsende schriftlich oder per E-Mail. Einer Kontaktaufnahme zu Werbezwecken oder zur Rückgewinnung widerspreche ich.', 'Mit freundlichen Grüßen'] },
  ],
  sign: [L_(v.kdName, 20)],
});
const kunde = (): FieldDef[] => [...partei('kd', 'des Kunden', 'the customer', t('Ihre Angaben', 'Your details')), ...partei('ab', 'des Anbieters', 'the provider', t('Anbieter', 'Provider'))];

/* ------------------------------------------------------------------ allgemein (Startseite) */
export const kuendigung: DocSpec = {
  id: 'kuendigung',
  exemple: beispiel(21, (mj) => `Beispiel: Vertrag seit ${mj}, 24 Monate, ein Monat Frist`, (mj) => `Example: contract since ${mj}, 24 months, one month’s notice`),
  fields: [
    { id: 'art', kind: 'select', label: t('Welcher Vertrag?', 'Which contract?'), def: 'abo', group: t('Vertrag', 'Contract'), options: [
      { value: 'abo', label: t('Abo, Zeitschrift, Streaming', 'Subscription, magazine, streaming') },
      { value: 'verein', label: t('Mitgliedschaft (nicht Verein)', 'Membership (not a club)') },
      { value: 'dienst', label: t('anderer Dienstleistungsvertrag', 'other service contract') },
    ] },
    ...laufzeitFelder(21, 24, t('Laufzeit und Frist', 'Term and notice')),
    { id: 'nr', kind: 'text', label: t('Kunden- oder Vertragsnummer', 'Customer or contract number'), def: '' },
    ...kunde(),
    ...ortDatumFelder(),
  ],
  result: (v, l) => vertragErgebnis(v, l, false).res,
  doc: (v) => { const { r } = vertragErgebnis(v, 'de', false); return brief(v, `Kündigung meines Vertrags${v.nr ? `, Kunden-/Vertragsnummer ${v.nr}` : ''}`, ['Eine erteilte Einzugsermächtigung (SEPA-Lastschriftmandat) widerrufe ich zum Vertragsende.'], dDe(r.ende)); },
};

/* ------------------------------------------------------------------ Handy und Internet (§ 56 TKG) */
export const handy: DocSpec = {
  id: 'handy',
  exemple: beispiel(20, (mj) => `Beispiel: Handyvertrag seit ${mj}, 24 Monate`, (mj) => `Example: mobile contract since ${mj}, 24 months`),
  fields: [
    ...laufzeitFelder(20, 24, t('Laufzeit und Frist', 'Term and notice')),
    { id: 'rufnummer', kind: 'text', label: t('Rufnummer oder Anschlusskennung', 'Phone number or line ID'), def: '', personal: true },
    { id: 'nr', kind: 'text', label: t('Kundennummer', 'Customer number'), def: '' },
    { id: 'mitnahme', kind: 'select', label: t('Rufnummer mitnehmen?', 'Keep your number?'), def: 'nein', options: [{ value: 'nein', label: t('nein', 'no') }, { value: 'ja', label: t('ja, zu neuem Anbieter', 'yes, to a new provider') }] },
    ...kunde(),
    ...ortDatumFelder(),
  ],
  result: (v, l) => vertragErgebnis(v, l, true).res,
  doc: (v) => {
    const { r } = vertragErgebnis(v, 'de', true);
    const s = [`Betroffen ist der Anschluss ${L_(v.rufnummer, 18)}${v.nr ? ` unter der Kundennummer ${v.nr}` : ''}.`];
    if (v.mitnahme === 'ja') s.push('Ich möchte meine Rufnummer zu einem anderen Anbieter mitnehmen. Bitte bestätigen Sie mir die Freigabe der Rufnummer für die Portierung.');
    s.push('Eine erteilte Einzugsermächtigung (SEPA-Lastschriftmandat) widerrufe ich zum Vertragsende.');
    return brief(v, `Kündigung meines Mobilfunk- bzw. Internetvertrags${v.nr ? `, Kundennummer ${v.nr}` : ''}`, s, dDe(r.ende));
  },
};

/* ------------------------------------------------------------------ Fitnessstudio (§ 309 Nr. 9 BGB) */
export const fitness: DocSpec = {
  id: 'fitness',
  exemple: beispiel(9, (mj) => `Beispiel: Mitgliedschaft seit ${mj}, 12 Monate`, (mj) => `Example: membership since ${mj}, 12 months`),
  fields: [
    ...laufzeitFelder(9, 12, t('Laufzeit und Frist', 'Term and notice')),
    { id: 'nr', kind: 'text', label: t('Mitgliedsnummer', 'Membership number'), def: '' },
    { id: 'studio', kind: 'text', label: t('Studio (Filiale)', 'Gym (branch)'), def: '' },
    ...kunde(),
    ...ortDatumFelder(),
  ],
  result: (v, l) => vertragErgebnis(v, l, false).res,
  doc: (v) => {
    const { r } = vertragErgebnis(v, 'de', false);
    return brief(v, `Kündigung meiner Mitgliedschaft${v.nr ? `, Mitgliedsnummer ${v.nr}` : ''}${v.studio ? `, ${v.studio}` : ''}`, ['Meine Mitgliedskarte gebe ich zum Vertragsende zurück, sofern sie Eigentum des Studios ist. Eine erteilte Einzugsermächtigung (SEPA-Lastschriftmandat) widerrufe ich zum Vertragsende.'], dDe(r.ende));
  },
};

/* ------------------------------------------------------------------ Strom und Gas */
export const strom: DocSpec = {
  id: 'strom',
  exemple: beispiel(8, (mj) => `Beispiel: Sondervertrag seit ${mj}, 12 Monate`, (mj) => `Example: special tariff since ${mj}, 12 months`),
  fields: [
    { id: 'tarif', kind: 'select', label: t('Tarif', 'Tariff'), def: 'sonder', group: t('Tarif', 'Tariff'), help: t('Steht auf Ihrer Rechnung „Grundversorgung“? Sonst ist es ein Sondervertrag.', 'Does your bill say “Grundversorgung” (basic supply)? If not, it is a special tariff.'), options: [{ value: 'sonder', label: t('Sondervertrag mit Laufzeit', 'special tariff with a term') }, { value: 'grund', label: t('Grundversorgung (zwei Wochen)', 'basic supply (two weeks)') }] },
    { id: 'energie', kind: 'select', label: t('Energie', 'Energy'), def: 'strom', options: [{ value: 'strom', label: t('Strom', 'Electricity') }, { value: 'gas', label: t('Gas', 'Gas') }] },
    ...laufzeitFelder(8, 12, t('Laufzeit und Frist', 'Term and notice')).map((f) => (f.id === 'zugang' ? f : { ...f, showIf: (v: V) => v.tarif !== 'grund' && (!f.showIf || f.showIf(v)) })),
    { id: 'zaehler', kind: 'text', label: t('Zählernummer', 'Meter number'), def: '', group: t('Lieferstelle', 'Supply point') },
    { id: 'nr', kind: 'text', label: t('Kundennummer', 'Customer number'), def: '' },
    { id: 'grund', kind: 'select', label: t('Anlass', 'Reason'), def: 'wechsel', options: [{ value: 'wechsel', label: t('Anbieterwechsel', 'switching supplier') }, { value: 'umzug', label: t('Auszug', 'moving out') }] },
    ...kunde(),
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    if (v.tarif === 'grund') {
      const e = M.grundversorgung(iso(v, 'zugang', '2026-11-13'));
      return { label: T(l, 'Die Belieferung endet am', 'Supply ends on'), value: dL(e, l), sub: T(l, 'zwei Wochen ab Zugang (§ 20 StromGVV)', 'two weeks from receipt (s. 20 StromGVV)'), rows: [[T(l, 'Form', 'Form'), T(l, 'Textform genügt (E-Mail, Brief)', 'text form is enough (email, letter)')], [T(l, 'Kündigungsentgelt', 'Cancellation fee'), T(l, 'keines erlaubt', 'none allowed')]] };
    }
    return vertragErgebnis(v, l, false).res;
  },
  doc: (v) => {
    const ende = v.tarif === 'grund' ? M.grundversorgung(iso(v, 'zugang', '2026-11-13')) : vertragErgebnis(v, 'de', false).r.ende;
    const s = [`Betroffen ist die ${v.energie === 'gas' ? 'Gas' : 'Strom'}lieferung an meine Anschrift, Zählernummer ${L_(v.zaehler, 16)}${v.nr ? `, Kundennummer ${v.nr}` : ''}.`];
    if (v.grund === 'umzug') s.push(`Ich ziehe aus. Den Zählerstand am Tag der Übergabe teile ich Ihnen gesondert mit; bitte senden Sie die Schlussrechnung an meine neue Anschrift: ${'_'.repeat(30)}.`);
    else s.push('Ich wechsle den Lieferanten. Den Zählerstand zum Vertragsende teile ich Ihnen mit.');
    s.push('Eine erteilte Einzugsermächtigung (SEPA-Lastschriftmandat) widerrufe ich zum Vertragsende.');
    return brief(v, `Kündigung meines ${v.energie === 'gas' ? 'Gas' : 'Strom'}liefervertrags`, s, dDe(ende));
  },
};

/* ------------------------------------------------------------------ Versicherung (§ 11 VVG) */
const naechstesJahresende = (d: string) => `${d.slice(0, 4)}-12-31`;
export const versicherung: DocSpec = {
  id: 'versicherung',
  exemple: t('Beispiel: Versicherungsjahr endet am 31. Dezember, drei Monate Frist', 'Example: insurance year ends 31 December, three months’ notice'),
  fields: [
    { id: 'zugang', kind: 'date', label: t('Tag, an dem der Versicherer die Kündigung erhält', 'Day the insurer receives the notice'), def: (d) => d, group: t('Frist', 'Deadline'), help: ZUGANG_HILFE },
    { id: 'ablauf', kind: 'date', label: t('Ende des Versicherungsjahres', 'End of the insurance year'), def: naechstesJahresende, help: t('steht im Versicherungsschein (Ablauf, Hauptfälligkeit)', 'on the policy schedule (expiry, renewal date)') },
    { id: 'frist', kind: 'number', label: t('Kündigungsfrist laut Vertrag in Monaten', 'Notice period in the policy, months'), def: '3', max: 12 },
    { id: 'sparte', kind: 'select', label: t('Versicherung', 'Policy'), def: 'haftpflicht', options: [
      { value: 'haftpflicht', label: t('Privathaftpflicht', 'Personal liability') }, { value: 'hausrat', label: t('Hausrat', 'Contents') },
      { value: 'rechtsschutz', label: t('Rechtsschutz', 'Legal expenses') }, { value: 'kfz', label: t('Kfz-Versicherung', 'Car insurance') }, { value: 'andere', label: t('andere', 'other') },
    ] },
    { id: 'nr', kind: 'text', label: t('Versicherungsscheinnummer', 'Policy number'), def: '' },
    ...kunde(),
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const r = M.versicherung({ zugang: iso(v, 'zugang', '2026-11-13'), ablauf: iso(v, 'ablauf', '2026-12-31'), frist: num(v, 'frist') });
    return {
      label: T(l, 'Der Versicherungsschutz endet am', 'Cover ends on'), value: dL(r.ende, l),
      sub: T(l, `Kündigung muss spätestens ankommen am ${dL(r.spaetesterZugang, l)} (${r.frist} Monat${r.frist > 1 ? 'e' : ''} vorher)`, `notice must arrive by ${dL(r.spaetesterZugang, l)} (${r.frist} month${r.frist > 1 ? 's' : ''} before)`),
      rows: [[T(l, 'Frist im Gesetz', 'Statutory range'), T(l, '1 bis 3 Monate, für beide gleich', '1 to 3 months, same for both')], [T(l, 'Verlängerung', 'Renewal'), T(l, 'höchstens ein Jahr', 'at most one year')]],
      alert: r.fristOk ? undefined : T(l, 'Eine Frist unter einem oder über drei Monaten ist nicht zulässig (§ 11 Abs. 3 VVG); gerechnet wird mit dem nächsten zulässigen Wert.', 'A period under one or over three months is not allowed (s. 11(3) VVG); we use the nearest permitted value.'),
    };
  },
  doc: (v) => {
    const r = M.versicherung({ zugang: iso(v, 'zugang', '2026-11-13'), ablauf: iso(v, 'ablauf', '2026-12-31'), frist: num(v, 'frist') });
    const sparte = { haftpflicht: 'Privathaftpflichtversicherung', hausrat: 'Hausratversicherung', rechtsschutz: 'Rechtsschutzversicherung', kfz: 'Kfz-Versicherung', andere: 'Versicherung' }[v.sparte as 'hausrat'] ?? 'Versicherung';
    return brief(v, `Kündigung meiner ${sparte}, Versicherungsscheinnummer ${L_(v.nr, 16)}`, ['Bitte erstatten Sie zu viel gezahlte Beiträge auf das Ihnen bekannte Konto. Eine erteilte Einzugsermächtigung (SEPA-Lastschriftmandat) widerrufe ich zum Vertragsende.'], dDe(r.ende));
  },
};
export const _plusTage = plusTage;
