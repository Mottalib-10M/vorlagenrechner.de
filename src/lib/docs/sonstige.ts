/** Vollmacht, Kfz-Kaufvertrag, Schenkungsvertrag über Geld, Mahnung mit Verzugszinsen. */
import type { DocSpec, V } from './types';
import { T } from './types';
import { L_, dDe, dL, eurDe, eurL, num, iso, partei, ortDatumFelder, t, joinZeilen, plusTage } from './util';
import * as M from '../engine';

const ortDatum = (v: V) => `${L_(v.ort, 18)}, den ${dDe(v.datum)}`;

/* ------------------------------------------------------------------ Vollmacht (Einzelvollmacht) */
const ZWECK: Record<string, { de: string; en: string; text: string }> = {
  post: { de: 'Post, Paket oder Einschreiben abholen', en: 'Collect post, parcels or registered letters', text: 'für mich bestimmte Briefe, Einschreiben und Pakete entgegenzunehmen, abzuholen und den Empfang zu quittieren' },
  kfz: { de: 'Fahrzeug an-, um- oder abmelden', en: 'Register, re-register or deregister a vehicle', text: 'mein Fahrzeug bei der Zulassungsbehörde an-, um- oder abzumelden und alle dafür nötigen Erklärungen abzugeben und Unterlagen entgegenzunehmen' },
  wohnung: { de: 'Wohnungsübergabe', en: 'Flat handover', text: 'mich bei der Übergabe bzw. Rücknahme der Wohnung zu vertreten, das Übergabeprotokoll zu unterzeichnen sowie Schlüssel zu übergeben und entgegenzunehmen' },
  behoerde: { de: 'Behördengang, Unterlagen abholen', en: 'Errand at a public office, collect documents', text: 'bei Behörden für mich Anträge einzureichen, Auskünfte einzuholen und für mich bestimmte Unterlagen abzuholen' },
  frei: { de: 'eigene Angelegenheit (Feld unten)', en: 'your own matter (field below)', text: '' },
};
export const vollmacht: DocSpec = {
  id: 'vollmacht',
  exemple: t('Beispiel: Paket abholen, gültig vier Wochen', 'Example: collect a parcel, valid for four weeks'),
  fields: [
    { id: 'zweck', kind: 'select', label: t('Wofür?', 'What for?'), def: 'post', group: t('Umfang', 'Scope'), options: Object.entries(ZWECK).map(([value, z]) => ({ value, label: { de: z.de, en: z.en } })) },
    { id: 'frei', kind: 'text', label: t('Angelegenheit in eigenen Worten', 'The matter in your own words'), def: '', wide: true, showIf: (v) => v.zweck === 'frei' },
    { id: 'von', kind: 'date', label: t('Gültig ab', 'Valid from'), def: (d) => d },
    { id: 'bis', kind: 'date', label: t('Gültig bis', 'Valid until'), def: (d) => plusTage(d, 28) },
    { id: 'unter', kind: 'select', label: t('Untervollmacht erlaubt?', 'May the agent delegate?'), def: 'nein', options: [{ value: 'nein', label: t('nein', 'no') }, { value: 'ja', label: t('ja', 'yes') }] },
    ...partei('vg', 'des Vollmachtgebers', 'the person granting it', t('Vollmachtgeber (Sie)', 'Principal (you)')),
    { id: 'vgGeb', kind: 'date', label: t('Geburtsdatum des Vollmachtgebers', 'Principal’s date of birth'), def: '1985-01-01' },
    ...partei('bv', 'des Bevollmächtigten', 'the agent', t('Bevollmächtigter', 'Agent')),
    { id: 'bvGeb', kind: 'date', label: t('Geburtsdatum des Bevollmächtigten', 'Agent’s date of birth'), def: '1990-01-01' },
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const von = iso(v, 'von', '2026-11-13'), bis = iso(v, 'bis', '2026-12-11');
    const tage = Math.max(0, M.fromIso(bis) - M.fromIso(von) + 1);
    return {
      label: T(l, 'Die Vollmacht gilt bis', 'Valid until'), value: dL(bis, l), sub: T(l, `${tage} Tage, jederzeit widerruflich`, `${tage} days, revocable at any time`),
      rows: [[T(l, 'Ab', 'From'), dL(von, l)], [T(l, 'Vorlage', 'Show'), T(l, 'im Original, mit Ausweis', 'the original, with ID')], [T(l, 'Untervollmacht', 'Delegation'), v.unter === 'ja' ? T(l, 'erlaubt', 'allowed') : T(l, 'nicht erlaubt', 'not allowed')]],
      alert: bis < von ? T(l, 'Das Ende liegt vor dem Beginn.', 'The end date is before the start date.') : undefined,
    };
  },
  doc: (v) => {
    const z = ZWECK[v.zweck] ?? ZWECK.post;
    const zweck = v.zweck === 'frei' ? `mich in folgender Angelegenheit zu vertreten: ${L_(v.frei, 40)}` : z.text;
    return {
      title: 'Vollmacht',
      blocks: [
        { p: [`Ich, ${L_(v.vgName)}, geboren am ${dDe(v.vgGeb)}, wohnhaft ${L_(v.vgStrasse)}, ${L_(v.vgOrt, 18)},`, `bevollmächtige hiermit ${L_(v.bvName)}, geboren am ${dDe(v.bvGeb)}, wohnhaft ${L_(v.bvStrasse)}, ${L_(v.bvOrt, 18)},`, `${zweck}.`] },
        { p: [`Die Vollmacht gilt vom ${dDe(v.von)} bis zum ${dDe(v.bis)}. Sie kann jederzeit widerrufen werden. Der Bevollmächtigte ist ${v.unter === 'ja' ? '' : 'nicht '}berechtigt, Untervollmacht zu erteilen.`, 'Der Bevollmächtigte legt diese Vollmacht im Original zusammen mit seinem Ausweis vor.', ortDatum(v)] },
      ],
      sign: ['Unterschrift des Vollmachtgebers', 'Unterschrift des Bevollmächtigten (zur Kenntnis)'],
    };
  },
};

/* ------------------------------------------------------------------ Kfz-Kaufvertrag (privat) */
export const kfz: DocSpec = {
  id: 'kfz',
  exemple: t('Beispiel: Gebrauchtwagen für 8.500 €, privat verkauft', 'Example: used car for €8,500, private sale'),
  fields: [
    { id: 'preis', kind: 'number', label: t('Kaufpreis', 'Price'), def: '8500', unit: '€', max: 10000000, group: t('Preis und Übergabe', 'Price and handover') },
    { id: 'uebergabe', kind: 'date', label: t('Tag der Übergabe', 'Handover date'), def: (d) => d },
    { id: 'uhr', kind: 'text', label: t('Uhrzeit der Übergabe', 'Handover time'), def: '14:00' },
    { id: 'zahlung', kind: 'select', label: t('Zahlung', 'Payment'), def: 'bar', options: [{ value: 'bar', label: t('bar bei Übergabe', 'cash on handover') }, { value: 'ueberweisung', label: t('Überweisung vor Übergabe', 'bank transfer before handover') }] },
    { id: 'marke', kind: 'text', label: t('Hersteller und Modell', 'Make and model'), def: '', group: t('Fahrzeug', 'Vehicle') },
    { id: 'fin', kind: 'text', label: t('Fahrzeug-Identifizierungsnummer (FIN)', 'Vehicle identification number (VIN)'), def: '', personal: true },
    { id: 'kennzeichen', kind: 'text', label: t('Amtliches Kennzeichen', 'Number plate'), def: '', personal: true },
    { id: 'ez', kind: 'date', label: t('Erstzulassung', 'First registration'), def: '2018-05-01' },
    { id: 'km', kind: 'number', label: t('Kilometerstand (abgelesen)', 'Mileage read off'), def: '98000', unit: 'km', max: 3000000 },
    { id: 'hu', kind: 'text', label: t('Nächste Hauptuntersuchung (MM/JJJJ)', 'Next roadworthiness test (MM/YYYY)'), def: '' },
    { id: 'unfall', kind: 'select', label: t('Unfallschäden', 'Accident damage'), def: 'keine', options: [{ value: 'keine', label: t('dem Verkäufer keine bekannt', 'none known to the seller') }, { value: 'bekannt', label: t('bekannt, siehe Feld unten', 'known, see field below') }] },
    { id: 'schaeden', kind: 'text', label: t('Bekannte Schäden und Mängel', 'Known damage and defects'), def: '', wide: true },
    { id: 'gewaehr', kind: 'select', label: t('Sachmängelhaftung', 'Liability for defects'), def: 'aus', options: [{ value: 'aus', label: t('ausgeschlossen (privat)', 'excluded (private sale)') }, { value: 'gesetz', label: t('gesetzlich', 'as by law') }] },
    ...partei('vk', 'des Verkäufers', 'the seller', t('Verkäufer', 'Seller')),
    ...partei('kf', 'des Käufers', 'the buyer', t('Käufer', 'Buyer')),
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const p = num(v, 'preis');
    return {
      label: T(l, 'Kaufpreis', 'Price'), value: eurL(p, l), sub: T(l, `in Worten: ${M.euroInWorten(p)}`, `in words (German): ${M.euroInWorten(p)}`),
      rows: [[T(l, 'Übergabe', 'Handover'), `${dL(iso(v, 'uebergabe', '2026-11-13'), l)}, ${v.uhr || '—'}`], [T(l, 'Fahrzeugalter', 'Vehicle age'), `${M.volleJahre(M.fromIso(iso(v, 'ez', '2018-05-01')), M.fromIso(iso(v, 'uebergabe', '2026-11-13')))} ${T(l, 'Jahre', 'years')}`], [T(l, 'Haftung für Mängel', 'Liability for defects'), v.gewaehr === 'aus' ? T(l, 'ausgeschlossen, außer Arglist und Garantie', 'excluded, except fraud and guarantees') : T(l, 'gesetzlich', 'as by law')]],
    };
  },
  doc: (v) => {
    const p = num(v, 'preis');
    return {
      title: 'Kaufvertrag über ein gebrauchtes Kraftfahrzeug (privat)',
      blocks: [
        { p: [`Verkäufer: ${L_(v.vkName)}, ${L_(v.vkStrasse)}, ${L_(v.vkOrt, 18)}`, `Käufer: ${L_(v.kfName)}, ${L_(v.kfStrasse)}, ${L_(v.kfOrt, 18)}`] },
        { h: '1. Fahrzeug', p: [`Hersteller und Modell: ${L_(v.marke, 24)}; FIN: ${L_(v.fin, 17)}; amtliches Kennzeichen: ${L_(v.kennzeichen, 12)}; Erstzulassung: ${dDe(v.ez)}; abgelesener Kilometerstand: ${num(v, 'km') ? `${num(v, 'km').toLocaleString('de-DE')} km` : '________ km'}; nächste Hauptuntersuchung: ${L_(v.hu, 8)}.`, 'Mit übergeben werden die Zulassungsbescheinigungen Teil I und II, alle Schlüssel und vorhandene Wartungsnachweise.'] },
        { h: '2. Kaufpreis', p: [`Der Kaufpreis beträgt ${eurDe(p)} (in Worten: ${M.euroInWorten(p)}). ${v.zahlung === 'bar' ? 'Er wird bei Übergabe bar gezahlt; der Verkäufer quittiert den Empfang unten.' : 'Er wird vor der Übergabe auf das Konto des Verkäufers überwiesen; das Fahrzeug wird nach Gutschrift übergeben.'} Das Fahrzeug bleibt bis zur vollständigen Zahlung Eigentum des Verkäufers.`] },
        { h: '3. Zustand und Haftung', p: [v.unfall === 'keine' ? 'Der Verkäufer erklärt, dass ihm keine Unfallschäden bekannt sind.' : `Der Verkäufer weist auf folgende Unfallschäden hin: ${L_(v.schaeden, 40)}.`, `Weitere bekannte Mängel: ${v.unfall === 'keine' ? L_(v.schaeden, 40) : 'siehe oben'}.`, v.gewaehr === 'aus' ? 'Das Fahrzeug wird unter Ausschluss der Sachmängelhaftung verkauft, wie besichtigt und Probe gefahren. Der Ausschluss gilt nicht, soweit der Verkäufer einen Mangel arglistig verschwiegen oder eine Garantie übernommen hat (§ 444 BGB), und nicht für Schäden aus der Verletzung von Leben, Körper oder Gesundheit sowie für grobe Fahrlässigkeit und Vorsatz.' : 'Für Sachmängel haftet der Verkäufer nach den gesetzlichen Vorschriften.'] },
        { h: '4. Übergabe und Zulassung', p: [`Übergabe am ${dDe(v.uebergabe)} um ${L_(v.uhr, 5)} Uhr. Ab diesem Zeitpunkt trägt der Käufer die Gefahr und alle Kosten. Der Käufer meldet das Fahrzeug unverzüglich auf sich um oder meldet es ab. Verkäufer und Käufer zeigen den Verkauf ihren Kfz-Versicherern an.`, ortDatum(v)] },
      ],
      sign: ['Verkäufer', 'Käufer', v.zahlung === 'bar' ? 'Kaufpreis bar erhalten (Verkäufer)' : 'Zahlung erhalten (Verkäufer)'],
    };
  },
};

/* ------------------------------------------------------------------ Schenkungsvertrag über Geld */
const BEZ: Record<M.Beziehung, { de: string; en: string }> = {
  kind: { de: 'Kind oder Stiefkind', en: 'Child or stepchild' }, enkel: { de: 'Enkelkind', en: 'Grandchild' }, ehegatte: { de: 'Ehe- oder Lebenspartner', en: 'Spouse or civil partner' },
  eltern: { de: 'Elternteil', en: 'Parent' }, geschwister: { de: 'Geschwister', en: 'Sibling' }, nichte: { de: 'Nichte oder Neffe', en: 'Niece or nephew' }, andere: { de: 'andere Person', en: 'Someone else' },
};
export const schenkungDoc: DocSpec = {
  id: 'schenkung',
  exemple: t('Beispiel: 50.000 € an das eigene Kind', 'Example: €50,000 to your own child'),
  fields: [
    { id: 'betrag', kind: 'number', label: t('Betrag', 'Amount'), def: '50000', unit: '€', max: 100000000, group: t('Schenkung', 'Gift') },
    { id: 'beziehung', kind: 'select', label: t('Beschenkt wird', 'The recipient is your'), def: 'kind', options: (Object.keys(BEZ) as M.Beziehung[]).map((k) => ({ value: k, label: BEZ[k] })) },
    { id: 'frueher', kind: 'number', label: t('Frühere Schenkungen in 10 Jahren', 'Earlier gifts within 10 years'), def: '0', unit: '€', max: 100000000 },
    { id: 'tag', kind: 'date', label: t('Tag der Überweisung', 'Transfer date'), def: (d) => d },
    { id: 'zweck', kind: 'text', label: t('Zweck (freiwillig)', 'Purpose (optional)'), def: '', wide: true },
    ...partei('sg', 'des Schenkers', 'the donor', t('Schenker', 'Donor')),
    ...partei('bs', 'des Beschenkten', 'the recipient', t('Beschenkter', 'Recipient')),
    { id: 'iban', kind: 'text', label: t('IBAN des Beschenkten', 'Recipient’s IBAN'), def: '', personal: true },
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const b = (Object.keys(BEZ).includes(v.beziehung) ? v.beziehung : 'kind') as M.Beziehung;
    const r = M.schenkung(num(v, 'betrag'), num(v, 'frueher'), b);
    return {
      label: r.ueber > 0 ? T(l, 'Über dem Freibetrag', 'Above the allowance') : T(l, 'Freibetrag noch frei', 'Allowance still unused'), value: eurL(r.ueber > 0 ? r.ueber : r.rest, l),
      sub: T(l, `Freibetrag ${eurL(r.freibetrag, l)} in 10 Jahren, Steuerklasse ${r.klasse} (§§ 15, 16 ErbStG)`, `allowance ${eurL(r.freibetrag, l)} per 10 years, tax class ${r.klasse} (ss. 15, 16 ErbStG)`),
      rows: [[T(l, 'Diese Schenkung', 'This gift'), eurL(num(v, 'betrag'), l)], [T(l, 'Mit früheren zusammen', 'With earlier gifts'), eurL(r.summe, l)], [T(l, 'Anzeige ans Finanzamt', 'Report to the tax office'), T(l, 'binnen 3 Monaten (§ 30 ErbStG)', 'within 3 months (s. 30 ErbStG)')]],
      alert: r.ueber > 0 ? T(l, 'Über dem Freibetrag fällt Schenkungsteuer an; ihre Höhe setzt das Finanzamt fest.', 'Gift tax is due above the allowance; the tax office sets the amount.') : undefined,
    };
  },
  doc: (v) => {
    const b = num(v, 'betrag');
    return {
      title: 'Schenkungsvertrag über einen Geldbetrag',
      blocks: [
        { p: [`Zwischen ${L_(v.sgName)}, ${L_(v.sgStrasse)}, ${L_(v.sgOrt, 18)} (Schenker)`, `und ${L_(v.bsName)}, ${L_(v.bsStrasse)}, ${L_(v.bsOrt, 18)} (Beschenkter)`, 'wird folgender Schenkungsvertrag geschlossen:'] },
        { h: '§ 1 Gegenstand', p: [`Der Schenker schenkt dem Beschenkten einen Geldbetrag von ${eurDe(b)} (in Worten: ${M.euroInWorten(b)}). Beide sind sich einig, dass die Zuwendung unentgeltlich erfolgt (§ 516 Abs. 1 BGB).${v.zweck && v.zweck.trim() ? ` Der Betrag ist bestimmt für: ${v.zweck.trim()}.` : ''}`] },
        { h: '§ 2 Vollzug', p: [`Der Schenker überweist den Betrag am ${dDe(v.tag)} auf das Konto des Beschenkten, IBAN ${L_(v.iban, 27)}. Mit der Gutschrift ist die Schenkung vollzogen (§ 518 Abs. 2 BGB).`] },
        { h: '§ 3 Steuer', p: ['Die Parteien zeigen die Schenkung dem zuständigen Finanzamt an, soweit § 30 ErbStG dies verlangt. Eine etwaige Schenkungsteuer trägt der Beschenkte, sofern nichts anderes vereinbart ist.'] },
        { h: '§ 4 Annahme', p: ['Der Beschenkte nimmt die Schenkung an.', ortDatum(v)] },
      ],
      sign: ['Schenker', 'Beschenkter'],
    };
  },
};

/* ------------------------------------------------------------------ Mahnung mit Verzugszinsen */
const STUFE: Record<string, { de: string; en: string; titel: string }> = {
  erinnerung: { de: 'Zahlungserinnerung', en: 'Payment reminder', titel: 'Zahlungserinnerung' },
  mahnung: { de: '1. Mahnung', en: 'First formal reminder', titel: 'Mahnung' },
  letzte: { de: 'Letzte Mahnung', en: 'Final reminder', titel: 'Letzte Mahnung' },
};
function forderung(v: V) {
  const betrag = num(v, 'betrag'), heute = iso(v, 'datum', '2026-11-13');
  const verzugAb = iso(v, 'verzug', plusTage(iso(v, 'faellig', '2026-10-15'), 1));
  const z = v.stufe === 'erinnerung' ? { summe: 0, teile: [], pauschale: 0 } : M.verzugszinsen(betrag, verzugAb, heute, v.schuldner !== 'firma');
  const pauschale = v.stufe === 'erinnerung' ? 0 : z.pauschale;
  return { betrag, zinsen: z.summe, pauschale, gesamt: betrag + z.summe + pauschale, satz: M.basiszins(heute) + (v.schuldner === 'firma' ? M.P.verzug.unternehmerPunkte : M.P.verzug.verbraucherPunkte), verzugAb, heute };
}
export const mahnung: DocSpec = {
  id: 'mahnung',
  exemple: t('Beispiel: Rechnung über 1.200 €, seit Mitte Oktober fällig, Privatkunde', 'Example: €1,200 invoice, due since mid-October, private customer'),
  fields: [
    { id: 'betrag', kind: 'number', label: t('Offener Betrag', 'Amount outstanding'), def: '1200', unit: '€', max: 100000000, decimals: 2, group: t('Forderung', 'Claim') },
    { id: 'faellig', kind: 'date', label: t('Fällig am (Zahlungsziel)', 'Due date'), def: (d) => plusTage(d, -29) },
    { id: 'verzug', kind: 'date', label: t('Verzug seit', 'In default since'), def: (d) => plusTage(d, -28), help: t('meist Tag nach dem Zahlungsziel', 'usually day after the due date') },
    { id: 'schuldner', kind: 'select', label: t('Schuldner ist', 'The debtor is'), def: 'privat', options: [{ value: 'privat', label: t('Privatperson (Verbraucher)', 'a private person (consumer)') }, { value: 'firma', label: t('Unternehmen', 'a business') }] },
    { id: 'stufe', kind: 'select', label: t('Schreiben', 'Letter'), def: 'mahnung', options: Object.entries(STUFE).map(([value, s]) => ({ value, label: { de: s.de, en: s.en } })) },
    { id: 'frist', kind: 'number', label: t('Zahlungsfrist in Tagen', 'Days to pay'), def: '14', max: 90 },
    { id: 'rnr', kind: 'text', label: t('Rechnungsnummer', 'Invoice number'), def: '' },
    { id: 'rdatum', kind: 'date', label: t('Rechnungsdatum', 'Invoice date'), def: (d) => plusTage(d, -43) },
    ...partei('gl', 'des Gläubigers', 'the creditor', t('Absender (Gläubiger)', 'Sender (creditor)')),
    ...partei('sc', 'des Schuldners', 'the debtor', t('Empfänger (Schuldner)', 'Recipient (debtor)')),
    { id: 'iban', kind: 'text', label: t('Ihre IBAN', 'Your IBAN'), def: '', personal: true },
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const f = forderung(v);
    return {
      label: T(l, 'Forderung heute', 'Amount claimed today'), value: eurL(f.gesamt, l, 2),
      sub: v.stufe === 'erinnerung' ? T(l, 'Zahlungserinnerung: ohne Zinsen', 'payment reminder: no interest') : T(l, `Verzugszins ${String(f.satz.toFixed(2)).replace('.', l === 'de' ? ',' : '.')} % im Jahr (§ 288 BGB)`, `default interest ${f.satz.toFixed(2)}% a year (s. 288 BGB)`),
      rows: [
        [T(l, 'Hauptforderung', 'Principal'), eurL(f.betrag, l, 2)],
        [T(l, 'Verzugszinsen seit', 'Interest since'), dL(f.verzugAb, l)],
        [T(l, 'Zinsen bis heute', 'Interest to date'), eurL(f.zinsen, l, 2)],
        [T(l, 'Pauschale (nur Unternehmen)', 'Flat fee (businesses only)'), eurL(f.pauschale, l, 0)],
        [T(l, 'Zahlung bis', 'Pay by'), dL(plusTage(f.heute, num(v, 'frist') || 14), l)],
      ],
    };
  },
  doc: (v) => {
    const f = forderung(v), s = STUFE[v.stufe] ?? STUFE.mahnung, bis = plusTage(f.heute, num(v, 'frist') || 14);
    const saetze = v.stufe === 'erinnerung'
      ? [`sicher ist es Ihrer Aufmerksamkeit entgangen: Unsere Rechnung Nr. ${L_(v.rnr, 10)} vom ${dDe(v.rdatum)} über ${eurDe(f.betrag)} war am ${dDe(v.faellig)} fällig und ist noch offen.`, `Bitte überweisen Sie den Betrag bis zum ${dDe(bis)} auf das Konto IBAN ${L_(v.iban, 27)}. Sollte sich Ihre Zahlung mit diesem Schreiben überschnitten haben, betrachten Sie es bitte als gegenstandslos.`]
      : [`die Rechnung Nr. ${L_(v.rnr, 10)} vom ${dDe(v.rdatum)} über ${eurDe(f.betrag)}, fällig am ${dDe(v.faellig)}, ist trotz Fälligkeit nicht bezahlt. Sie befinden sich seit dem ${dDe(f.verzugAb)} in Verzug (§ 286 BGB).`,
         `Für die Zeit des Verzugs berechnen wir Verzugszinsen von ${f.satz.toFixed(2).replace('.', ',')} Prozent im Jahr (${v.schuldner === 'firma' ? 'neun' : 'fünf'} Prozentpunkte über dem Basiszinssatz, § 288 BGB), bis heute ${eurDe(f.zinsen)}${f.pauschale ? `, sowie die Pauschale von ${eurDe(f.pauschale, 0)} nach § 288 Abs. 5 BGB` : ''}. Offen sind damit ${eurDe(f.gesamt)}.`,
         `Bitte überweisen Sie diesen Betrag bis zum ${dDe(bis)} auf das Konto IBAN ${L_(v.iban, 27)}.`,
         v.stufe === 'letzte' ? 'Geht die Zahlung bis dahin nicht ein, werden wir ohne weitere Ankündigung das gerichtliche Mahnverfahren einleiten; die Kosten dafür gehen zu Ihren Lasten.' : 'Sollte sich Ihre Zahlung mit diesem Schreiben überschnitten haben, betrachten Sie es bitte als gegenstandslos.'];
    return {
      from: joinZeilen(L_(v.glName), L_(v.glStrasse), L_(v.glOrt, 18)),
      to: joinZeilen(L_(v.scName), L_(v.scStrasse), L_(v.scOrt, 18)),
      ortDatum: ortDatum(v),
      title: `${s.titel}: Rechnung Nr. ${L_(v.rnr, 10)} vom ${dDe(v.rdatum)}`,
      blocks: [{ p: ['Sehr geehrte Damen und Herren,', ...saetze, 'Mit freundlichen Grüßen'] }],
      sign: [L_(v.glName, 20)],
    };
  },
};
