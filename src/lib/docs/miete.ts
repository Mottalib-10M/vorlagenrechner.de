/** Vorlagen rund um die Wohnung : Mietvertrag, Untermietvertrag, WG-Zimmer, Kündigung des Mieters. */
import type { DocSpec, V } from './types';
import { T } from './types';
import { L_, dDe, dL, eurDe, eurL, num, iso, land, partei, landFeld, ortDatumFelder, t, joinZeilen } from './util';
import * as M from '../engine';

const ortDatum = (v: V) => `${L_(v.ort, 18)}, den ${dDe(v.datum)}`;
const monatEnde = (d: string) => { const n = M.fromIso(d); const { y, m } = M.ymd(n); return M.toIso(M.monatsEnde(y, m)); };

/* ------------------------------------------------------------------ Mietvertrag (Wohnung, unbefristet) */
export const mietvertrag: DocSpec = {
  id: 'mietvertrag',
  exemple: t('Beispiel: 3 Zimmer, 750 € kalt, 180 € Vorauszahlung', 'Example: 3 rooms, €750 net rent, €180 service-charge advance'),
  fields: [
    ...partei('vm', 'des Vermieters', 'the landlord', t('Vermieter', 'Landlord')),
    ...partei('mt', 'des Mieters', 'the tenant', t('Mieter', 'Tenant')),
    { id: 'objStrasse', kind: 'text', label: t('Straße und Hausnummer der Wohnung', 'Street and number of the flat'), def: '', personal: true, group: t('Wohnung', 'Flat') },
    { id: 'objOrt', kind: 'text', label: t('PLZ und Ort der Wohnung', 'Postcode and town of the flat'), def: '', personal: true },
    { id: 'lage', kind: 'text', label: t('Lage (Geschoss, links/rechts)', 'Position (floor, left/right)'), def: '2. OG links' },
    { id: 'zimmer', kind: 'number', label: t('Zimmer', 'Rooms'), def: '3', max: 20 },
    { id: 'flaeche', kind: 'number', label: t('Wohnfläche', 'Floor area'), def: '72', unit: 'm²', max: 1000 },
    { id: 'mit', kind: 'text', label: t('Mitvermietet (Keller, Stellplatz …)', 'Also let (cellar, parking …)'), def: 'Kellerraum Nr. 4' },
    { id: 'beginn', kind: 'date', label: t('Mietbeginn', 'Start of tenancy'), def: (d) => M.toIso(M.monatsEnde(M.ymd(M.fromIso(d)).y, M.ymd(M.fromIso(d)).m) + 1), group: t('Miete und Kaution', 'Rent and deposit') },
    { id: 'kalt', kind: 'number', label: t('Nettokaltmiete im Monat', 'Net rent per month'), def: '750', unit: '€', max: 100000 },
    { id: 'nk', kind: 'number', label: t('Vorauszahlung Betriebs- und Heizkosten', 'Advance for service and heating costs'), def: '180', unit: '€', max: 100000 },
    { id: 'kaution', kind: 'number', label: t('Kaution', 'Deposit'), def: '2250', unit: '€', max: 1000000, help: t('höchstens drei Nettokaltmieten', 'at most three months’ net rent') },
    { id: 'iban', kind: 'text', label: t('IBAN des Vermieters für die Miete', 'Landlord’s IBAN for the rent'), def: '', personal: true },
    { id: 'tiere', kind: 'select', label: t('Haustiere', 'Pets'), def: 'zustimmung', options: [
      { value: 'zustimmung', label: t('Hund und Katze nach Zustimmung', 'Dogs and cats with consent') },
      { value: 'erlaubt', label: t('Hund und Katze erlaubt', 'Dogs and cats allowed') },
    ] },
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const kalt = num(v, 'kalt'), nk = num(v, 'nk'), kau = num(v, 'kaution'), k = M.kaution(kalt);
    return {
      label: T(l, 'Monatliche Miete (warm)', 'Monthly rent incl. advance'), value: eurL(kalt + nk, l),
      sub: T(l, `fällig bis zum 3. Werktag des Monats`, `due by the 3rd working day of each month`),
      rows: [
        [T(l, 'Nettokaltmiete', 'Net rent'), eurL(kalt, l)],
        [T(l, 'Vorauszahlung', 'Advance'), eurL(nk, l)],
        [T(l, 'Höchstkaution (3 × kalt)', 'Maximum deposit (3 × net rent)'), eurL(k.max, l)],
        [T(l, 'Erlaubte Rate (3 Raten)', 'Permitted instalment (3)'), eurL(Math.min(kau, k.max) / 3, l, 2)],
      ],
      alert: kau > k.max + 0.005 ? T(l, `Die Kaution übersteigt drei Nettokaltmieten (${eurL(k.max, l)}); der Mehrbetrag ist nach § 551 BGB unwirksam.`, `The deposit exceeds three months’ net rent (${eurL(k.max, l)}); the excess is void under section 551 BGB.`) : undefined,
    };
  },
  doc: (v) => {
    const kalt = num(v, 'kalt'), nk = num(v, 'nk'), kau = Math.min(num(v, 'kaution'), M.kaution(kalt).max);
    return {
      title: 'Mietvertrag über Wohnraum',
      blocks: [
        { p: [`Zwischen ${L_(v.vmName)}, ${L_(v.vmStrasse)}, ${L_(v.vmOrt, 18)} (Vermieter)`, `und ${L_(v.mtName)}, ${L_(v.mtStrasse)}, ${L_(v.mtOrt, 18)} (Mieter)`, 'wird folgender Mietvertrag geschlossen:'] },
        { h: '§ 1 Mietsache', p: [`Vermietet wird die Wohnung ${L_(v.lage, 14)} im Haus ${L_(v.objStrasse)}, ${L_(v.objOrt, 18)}, bestehend aus ${num(v, 'zimmer') || '___'} Zimmern, Küche oder Kochnische, Bad und Flur, Wohnfläche rund ${num(v, 'flaeche') || '___'} m².`, `Mitvermietet: ${L_(v.mit, 20)}. Der Mieter erhält bei Übergabe die im Übergabeprotokoll aufgeführten Schlüssel.`] },
        { h: '§ 2 Mietzeit und Kündigung', p: [`Das Mietverhältnis beginnt am ${dDe(v.beginn)} und läuft auf unbestimmte Zeit.`, 'Die Kündigung richtet sich nach den gesetzlichen Vorschriften (§§ 573 bis 573c BGB) und bedarf der schriftlichen Form (§ 568 Abs. 1 BGB).'] },
        { h: '§ 3 Miete und Betriebskosten', p: [`Die Nettokaltmiete beträgt monatlich ${eurDe(kalt)}. Daneben zahlt der Mieter eine Vorauszahlung auf die Betriebskosten einschließlich Heizung und Warmwasser von ${eurDe(nk)}, zusammen ${eurDe(kalt + nk)}.`, 'Umgelegt werden die Betriebskosten im Sinne der Betriebskostenverordnung (§ 556 Abs. 1 BGB). Über die Vorauszahlungen rechnet der Vermieter jährlich ab; die Abrechnung erhält der Mieter spätestens zwölf Monate nach Ende des Abrechnungszeitraums (§ 556 Abs. 3 BGB).'] },
        { h: '§ 4 Zahlung', p: [`Die Miete ist monatlich im Voraus, spätestens bis zum dritten Werktag des Monats (§ 556b Abs. 1 BGB), auf folgendes Konto zu zahlen: IBAN ${L_(v.iban, 27)}.`] },
        { h: '§ 5 Mietsicherheit', p: [`Der Mieter leistet eine Kaution von ${eurDe(kau)}. Er ist berechtigt, sie in drei gleichen monatlichen Teilzahlungen zu leisten; die erste ist zu Beginn des Mietverhältnisses fällig, die weiteren mit den beiden folgenden Mieten. Der Vermieter legt die Kaution getrennt von seinem Vermögen bei einem Kreditinstitut an; die Erträge stehen dem Mieter zu (§ 551 BGB).`] },
        { h: '§ 6 Nutzung und Untervermietung', p: ['Die Wohnung wird zu Wohnzwecken vermietet. Eine Untervermietung oder sonstige Überlassung an Dritte bedarf der Erlaubnis des Vermieters (§ 540 BGB); der Anspruch des Mieters nach § 553 BGB bleibt unberührt.'] },
        { h: '§ 7 Tierhaltung', p: [v.tiere === 'erlaubt' ? 'Die Haltung von Kleintieren sowie eines Hundes oder einer Katze ist gestattet. Der Mieter sorgt dafür, dass andere Hausbewohner nicht belästigt werden.' : 'Die Haltung von Kleintieren ist gestattet. Die Haltung eines Hundes oder einer Katze bedarf der vorherigen Zustimmung des Vermieters, die er nur aus einem sachlichen Grund verweigert.'] },
        { h: '§ 8 Erhaltung der Wohnung', p: ['Für die Erhaltung der Wohnung in vertragsgemäßem Zustand gelten die gesetzlichen Vorschriften (§ 535 Abs. 1 BGB). Schäden zeigt der Mieter dem Vermieter unverzüglich an.'] },
        { h: '§ 9 Übergabe', p: ['Bei Einzug und Auszug erstellen die Parteien gemeinsam ein Übergabeprotokoll mit Zählerständen, Schlüsseln und dem Zustand der Räume; es wird von beiden unterschrieben.'] },
        { h: '§ 10 Sonstiges', p: ['Änderungen und Ergänzungen dieses Vertrags bedürfen der Schriftform. Sollte eine Bestimmung unwirksam sein, bleibt der Vertrag im Übrigen wirksam; an ihre Stelle tritt die gesetzliche Regelung.', ortDatum(v)] },
      ],
      sign: ['Vermieter', 'Mieter'],
    };
  },
};

/* ------------------------------------------------------------------ Untermietvertrag (Zimmer in der eigenen Wohnung) */
const kuendigungUntermiete = (v: V, l: 'de' | 'en') => {
  const moebl = v.moebliert === 'ja' && v.wohnt === 'ja';
  const r = M.miete({ zugang: iso(v, 'heute', '2026-11-13'), land: land(v), wer: 'mieter', moebliert: moebl });
  return { moebl, r };
};
export const untermiete: DocSpec = {
  id: 'untermiete',
  exemple: t('Beispiel: möbliertes Zimmer, 450 € pauschal, Hauptmieter wohnt mit', 'Example: furnished room, €450 all-in, main tenant lives in'),
  fields: [
    ...partei('hm', 'des Hauptmieters', 'the main tenant', t('Hauptmieter', 'Main tenant')),
    ...partei('um', 'des Untermieters', 'the subtenant', t('Untermieter', 'Subtenant')),
    { id: 'zimmer', kind: 'text', label: t('Überlassenes Zimmer', 'Room let'), def: 'Zimmer zur Straße', group: t('Zimmer und Miete', 'Room and rent') },
    { id: 'qm', kind: 'number', label: t('Größe des Zimmers', 'Room size'), def: '16', unit: 'm²', max: 500 },
    { id: 'moebliert', kind: 'select', label: t('Vom Hauptmieter möbliert?', 'Furnished by the main tenant?'), def: 'ja', options: [{ value: 'ja', label: t('ja, überwiegend', 'yes, mostly') }, { value: 'nein', label: t('nein, leer', 'no, unfurnished') }] },
    { id: 'wohnt', kind: 'select', label: t('Wohnt der Hauptmieter selbst dort?', 'Does the main tenant live there?'), def: 'ja', options: [{ value: 'ja', label: t('ja', 'yes') }, { value: 'nein', label: t('nein', 'no') }] },
    { id: 'beginn', kind: 'date', label: t('Beginn', 'Start'), def: (d) => d },
    { id: 'miete', kind: 'number', label: t('Miete einschließlich Nebenkosten', 'Rent including all costs'), def: '450', unit: '€', max: 100000 },
    { id: 'kaution', kind: 'number', label: t('Kaution', 'Deposit'), def: '900', unit: '€', max: 100000 },
    { id: 'erlaubnis', kind: 'select', label: t('Erlaubnis des Vermieters', 'Landlord’s permission'), def: 'liegt', options: [{ value: 'liegt', label: t('liegt schriftlich vor', 'granted in writing') }, { value: 'beantragt', label: t('ist beantragt', 'has been requested') }] },
    landFeld(),
    { id: 'heute', kind: 'date', label: t('Tag einer Kündigung (zur Probe)', 'Day a notice would arrive (to test)'), def: (d) => d },
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const { moebl, r } = kuendigungUntermiete(v, l);
    return {
      label: T(l, 'Mietende bei Kündigung an diesem Tag', 'End of the sublet if notice arrives that day'), value: dL(r.ende, l),
      sub: moebl ? T(l, 'Zugang bis zum 15. → Ende desselben Monats (§ 573c Abs. 3 BGB)', 'Received by the 15th → end of that month (s. 573c(3) BGB)') : T(l, 'drei Monate, Zugang bis zum 3. Werktag (§ 573c Abs. 1 BGB)', 'three months, received by the 3rd working day (s. 573c(1) BGB)'),
      rows: [
        [T(l, 'Stichtag in diesem Monat', 'Deadline this month'), dL(r.stichtag, l)],
        [T(l, 'Danach: Stichtag', 'After that: deadline'), dL(r.stichtagNaechster, l)],
        [T(l, '… und Ende', '… and end'), dL(r.endeNaechster, l)],
        [T(l, 'Kaution, höchstens', 'Deposit, at most'), eurL(3 * num(v, 'miete'), l)],
      ],
      alert: v.erlaubnis === 'beantragt' ? T(l, 'Ohne Erlaubnis des Vermieters darf der Hauptmieter nicht untervermieten (§ 540 BGB).', 'Without the landlord’s permission the main tenant may not sublet (s. 540 BGB).') : undefined,
    };
  },
  doc: (v) => {
    const moebl = v.moebliert === 'ja' && v.wohnt === 'ja';
    return {
      title: 'Untermietvertrag über ein Zimmer',
      blocks: [
        { p: [`Zwischen ${L_(v.hmName)}, ${L_(v.hmStrasse)}, ${L_(v.hmOrt, 18)} (Hauptmieter)`, `und ${L_(v.umName)}, ${L_(v.umStrasse)}, ${L_(v.umOrt, 18)} (Untermieter)`, 'wird folgender Untermietvertrag geschlossen:'] },
        { h: '§ 1 Mietsache', p: [`Der Hauptmieter überlässt dem Untermieter in der von ihm gemieteten Wohnung ${L_(v.hmStrasse)}, ${L_(v.hmOrt, 18)} das ${L_(v.zimmer, 20)} (rund ${num(v, 'qm') || '___'} m²) ${v.moebliert === 'ja' ? 'möbliert, mit der Einrichtung laut Anlage' : 'unmöbliert'} zur alleinigen Nutzung. Küche, Bad und Flur darf der Untermieter mitbenutzen.`] },
        { h: '§ 2 Erlaubnis', p: [v.erlaubnis === 'liegt' ? 'Der Hauptmieter versichert, dass die Erlaubnis des Vermieters zur Untervermietung schriftlich vorliegt (§ 540 BGB).' : 'Die Erlaubnis des Vermieters zur Untervermietung (§ 540 BGB) ist beantragt. Der Untermieter zieht erst ein, wenn sie vorliegt.', 'Der Untermieter weiß, dass er das Zimmer bei Ende des Hauptmietverhältnisses auch an den Vermieter herausgeben muss (§ 546 Abs. 2 BGB).'] },
        { h: '§ 3 Mietzeit und Kündigung', p: [`Das Untermietverhältnis beginnt am ${dDe(v.beginn)} und läuft auf unbestimmte Zeit.`, moebl ? 'Da das Zimmer Teil der vom Hauptmieter selbst bewohnten Wohnung ist und von ihm überwiegend eingerichtet wurde, kann jede Seite spätestens am 15. eines Monats zum Ablauf dieses Monats kündigen (§ 549 Abs. 2 Nr. 2, § 573c Abs. 3 BGB).' : 'Die Kündigung ist spätestens am dritten Werktag eines Kalendermonats zum Ablauf des übernächsten Monats zulässig (§ 573c Abs. 1 BGB).', 'Die Kündigung bedarf der schriftlichen Form.'] },
        { h: '§ 4 Miete', p: [`Die Miete beträgt monatlich ${eurDe(num(v, 'miete'))} einschließlich aller Nebenkosten (Heizung, Wasser, Strom, Müll). Sie ist monatlich im Voraus, spätestens bis zum dritten Werktag, an den Hauptmieter zu zahlen.`] },
        { h: '§ 5 Kaution', p: [`Der Untermieter leistet eine Kaution von ${eurDe(num(v, 'kaution'))}, zahlbar in bis zu drei gleichen monatlichen Raten. Sie wird nach Rückgabe des Zimmers und Abrechnung offener Forderungen zurückgezahlt.`] },
        { h: '§ 6 Zusammenleben', p: ['Der Untermieter erhält einen Wohnungs- und einen Zimmerschlüssel. Besuch ist erlaubt; die Aufnahme weiterer Personen auf Dauer bedarf der Zustimmung des Hauptmieters. Die Hausordnung des Vermieters gilt auch für den Untermieter.', ortDatum(v)] },
      ],
      sign: ['Hauptmieter', 'Untermieter'],
    };
  },
};

/* ------------------------------------------------------------------ WG-Zimmer : Anteil an der Gesamtmiete */
export function wgAnteil(v: V) {
  const ges = num(v, 'gesamt'), fl = num(v, 'flaeche'), zi = num(v, 'qm'), n = Math.max(1, Math.round(num(v, 'personen')));
  const gemeinsam = Math.max(0, fl - num(v, 'zimmerSumme'));
  const anteilFlaeche = fl > 0 ? (zi + gemeinsam / n) / fl : 0;
  const nachFlaeche = ges * anteilFlaeche;
  const nachKopf = ges / n;
  return { nachFlaeche, nachKopf, gemeinsam, anteilFlaeche, n, betrag: v.teilung === 'kopf' ? nachKopf : nachFlaeche };
}
export const wgZimmer: DocSpec = {
  id: 'wgZimmer',
  exemple: t('Beispiel: 1.350 € warm, 90 m², 3 Personen, Zimmer 16 m²', 'Example: €1,350 all-in, 90 m², 3 people, room of 16 m²'),
  fields: [
    { id: 'gesamt', kind: 'number', label: t('Gesamtmiete der Wohnung (warm)', 'Total rent of the flat (all-in)'), def: '1350', unit: '€', max: 100000, group: t('Mietanteil', 'Share of the rent') },
    { id: 'flaeche', kind: 'number', label: t('Wohnfläche gesamt', 'Total floor area'), def: '90', unit: 'm²', max: 2000 },
    { id: 'qm', kind: 'number', label: t('Ihr Zimmer', 'Your room'), def: '16', unit: 'm²', max: 500 },
    { id: 'zimmerSumme', kind: 'number', label: t('Alle Zimmer zusammen', 'All rooms together'), def: '54', unit: 'm²', max: 2000 },
    { id: 'personen', kind: 'number', label: t('Personen in der WG', 'People in the flatshare'), def: '3', max: 20 },
    { id: 'teilung', kind: 'select', label: t('Aufteilung', 'Split'), def: 'flaeche', options: [{ value: 'flaeche', label: t('nach Zimmergröße', 'by room size') }, { value: 'kopf', label: t('nach Köpfen', 'per head') }] },
    ...partei('hm', 'des Hauptmieters', 'the main tenant', t('Hauptmieter', 'Main tenant')),
    ...partei('um', 'des neuen Mitbewohners', 'the new flatmate', t('Neuer Mitbewohner', 'New flatmate')),
    { id: 'beginn', kind: 'date', label: t('Einzug', 'Move-in'), def: (d) => d, group: t('Vertrag', 'Agreement') },
    { id: 'kaution', kind: 'number', label: t('Kaution', 'Deposit'), def: '800', unit: '€', max: 100000 },
    { id: 'internet', kind: 'number', label: t('Anteil Internet im Monat', 'Internet share per month'), def: '10', unit: '€', max: 1000 },
    { id: 'kasse', kind: 'number', label: t('WG-Kasse im Monat', 'Household kitty per month'), def: '15', unit: '€', max: 1000 },
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const a = wgAnteil(v);
    return {
      label: T(l, 'Ihr Anteil an der Warmmiete', 'Your share of the rent'), value: eurL(a.betrag, l),
      sub: v.teilung === 'kopf' ? T(l, `Gesamtmiete geteilt durch ${a.n} Personen`, `total rent divided by ${a.n} people`) : T(l, `Zimmer plus 1/${a.n} der Gemeinschaftsfläche`, `room plus 1/${a.n} of the shared space`),
      rows: [
        [T(l, 'Nach Zimmergröße', 'By room size'), eurL(a.nachFlaeche, l)],
        [T(l, 'Nach Köpfen', 'Per head'), eurL(a.nachKopf, l)],
        [T(l, 'Gemeinschaftsfläche', 'Shared space'), `${Math.round(a.gemeinsam)} m²`],
        [T(l, 'Monatlich mit Internet und Kasse', 'Monthly incl. internet and kitty'), eurL(a.betrag + num(v, 'internet') + num(v, 'kasse'), l)],
      ],
      alert: num(v, 'zimmerSumme') > num(v, 'flaeche') ? T(l, 'Die Zimmer sind zusammen größer als die Wohnung: bitte Flächen prüfen.', 'The rooms add up to more than the flat: please check the areas.') : undefined,
    };
  },
  doc: (v) => {
    const a = wgAnteil(v);
    const proz = Math.round(a.anteilFlaeche * 1000) / 10;
    return {
      title: 'Untermietvertrag für ein WG-Zimmer',
      blocks: [
        { p: [`Zwischen ${L_(v.hmName)}, ${L_(v.hmStrasse)}, ${L_(v.hmOrt, 18)} (Hauptmieter)`, `und ${L_(v.umName)}, bisher wohnhaft ${L_(v.umStrasse)}, ${L_(v.umOrt, 18)} (Mitbewohner)`, 'wird folgender Vertrag über ein Zimmer in einer Wohngemeinschaft geschlossen:'] },
        { h: '§ 1 Zimmer und Gemeinschaftsräume', p: [`Der Mitbewohner erhält ein Zimmer von rund ${num(v, 'qm') || '___'} m² zur alleinigen Nutzung. Küche, Bad, Flur und weitere Gemeinschaftsräume (zusammen rund ${Math.round(a.gemeinsam)} m²) nutzen alle ${a.n} Bewohner gemeinsam.`] },
        { h: '§ 2 Erlaubnis', p: ['Der Hauptmieter versichert, dass der Vermieter der Aufnahme eines Untermieters zugestimmt hat (§ 540 BGB). Endet der Hauptmietvertrag, muss auch der Mitbewohner das Zimmer herausgeben (§ 546 Abs. 2 BGB).'] },
        { h: '§ 3 Beginn und Kündigung', p: [`Der Vertrag beginnt am ${dDe(v.beginn)} und läuft auf unbestimmte Zeit. Für die Kündigung gelten die gesetzlichen Fristen (§ 573c BGB); sie bedarf der schriftlichen Form.`] },
        { h: '§ 4 Mietanteil', p: [v.teilung === 'kopf' ? `Die Gesamtmiete der Wohnung von ${eurDe(num(v, 'gesamt'))} wird nach Köpfen geteilt. Der Anteil des Mitbewohners beträgt ${eurDe(a.betrag)} monatlich.` : `Die Gesamtmiete der Wohnung von ${eurDe(num(v, 'gesamt'))} wird nach Fläche geteilt: Zimmer plus gleicher Anteil an den Gemeinschaftsräumen, das sind ${String(proz).replace('.', ',')} Prozent der Wohnfläche. Der Anteil des Mitbewohners beträgt ${eurDe(a.betrag)} monatlich.`, 'Er ist bis zum dritten Werktag jedes Monats an den Hauptmieter zu zahlen. Ergibt die Betriebskostenabrechnung des Vermieters eine Nachzahlung oder ein Guthaben, wird sie im selben Verhältnis geteilt.'] },
        { h: '§ 5 Internet, Haushaltskasse, Kaution', p: [`Für den gemeinsamen Internetanschluss zahlt der Mitbewohner ${eurDe(num(v, 'internet'))} und in die WG-Kasse für Putz- und Verbrauchsmittel ${eurDe(num(v, 'kasse'))} im Monat. Er leistet eine Kaution von ${eurDe(num(v, 'kaution'))}, die nach Auszug und Abrechnung zurückgezahlt wird.`] },
        { h: '§ 6 Zusammenleben', p: ['Die Bewohner reinigen die Gemeinschaftsräume nach einem gemeinsam vereinbarten Plan. Die Aufnahme weiterer Personen auf Dauer bedarf der Zustimmung aller Bewohner und des Vermieters.', ortDatum(v)] },
      ],
      sign: ['Hauptmieter', 'Mitbewohner'],
    };
  },
};

/* ------------------------------------------------------------------ Kündigung durch den Mieter */
export const kuendigungMiete: DocSpec = {
  id: 'kuendigungMiete',
  exemple: t('Beispiel: Kündigung geht heute zu, Berlin', 'Example: notice arrives today, Berlin'),
  fields: [
    { id: 'zugang', kind: 'date', label: t('Tag, an dem der Vermieter das Schreiben erhält', 'Day the landlord receives the letter'), def: (d) => d, group: t('Frist', 'Deadline') },
    landFeld(),
    { id: 'art', kind: 'select', label: t('Art der Wohnung', 'Type of home'), def: 'wohnung', options: [{ value: 'wohnung', label: t('Wohnung oder Haus', 'Flat or house') }, { value: 'moebliert', label: t('möbliertes Zimmer beim Vermieter', 'furnished room in the landlord’s home') }] },
    ...partei('mt', 'des Mieters', 'the tenant', t('Mieter', 'Tenant')),
    { id: 'mt2', kind: 'text', label: t('Weitere Mieterin / weiterer Mieter', 'Second tenant'), def: '', personal: true, help: t('alle Mieter im Vertrag müssen unterschreiben', 'every tenant on the lease must sign') },
    ...partei('vm', 'des Vermieters', 'the landlord', t('Vermieter', 'Landlord')),
    { id: 'objekt', kind: 'text', label: t('Wohnung (Adresse, Lage)', 'Flat (address, position)'), def: '', personal: true, wide: true, group: t('Wohnung und Kaution', 'Flat and deposit') },
    { id: 'iban', kind: 'text', label: t('Ihre IBAN für die Kaution', 'Your IBAN for the deposit'), def: '', personal: true },
    { id: 'termin', kind: 'text', label: t('Vorschlag für die Übergabe', 'Proposed handover date'), def: '' },
    ...ortDatumFelder(),
  ],
  result: (v, l) => {
    const r = M.miete({ zugang: iso(v, 'zugang', '2026-11-13'), land: land(v), wer: 'mieter', moebliert: v.art === 'moebliert' });
    const vm = M.miete({ zugang: iso(v, 'zugang', '2026-11-13'), land: land(v), wer: 'vermieter', ueberlassung: '2015-01-01' });
    return {
      label: T(l, 'Das Mietverhältnis endet am', 'The tenancy ends on'), value: dL(r.ende, l),
      sub: r.rechtzeitig ? T(l, `Zugang bis ${dL(r.stichtag, l)} reicht dafür`, `receipt by ${dL(r.stichtag, l)} is enough`) : T(l, `Stichtag ${dL(r.stichtag, l)} verpasst: ein Monat später`, `deadline ${dL(r.stichtag, l)} missed: one month later`),
      rows: [
        [T(l, 'Stichtag in diesem Monat', 'Deadline this month'), dL(r.stichtag, l)],
        [T(l, 'Nächster Stichtag', 'Next deadline'), dL(r.stichtagNaechster, l)],
        [T(l, '… Ende bei Zugang bis dahin', '… end if received by then'), dL(r.endeNaechster, l)],
        ...(v.art === 'moebliert' ? [] : [[T(l, 'Zum Vergleich: Frist des Vermieters nach 8 Jahren', 'For comparison: landlord’s period after 8 years'), `${vm.monate} ${T(l, 'Monate', 'months')}`] as [string, string]]),
      ],
    };
  },
  doc: (v) => {
    const r = M.miete({ zugang: iso(v, 'zugang', '2026-11-13'), land: land(v), wer: 'mieter', moebliert: v.art === 'moebliert' });
    const wir = !!(v.mt2 && v.mt2.trim());
    return {
      from: joinZeilen(L_(v.mtName), wir ? v.mt2 : '', L_(v.mtStrasse), L_(v.mtOrt, 18)),
      to: joinZeilen(L_(v.vmName), L_(v.vmStrasse), L_(v.vmOrt, 18)),
      ortDatum: ortDatum(v),
      title: `Kündigung des Mietvertrags über die Wohnung ${L_(v.objekt, 30)}`,
      blocks: [
        { p: ['Sehr geehrte Damen und Herren,', `hiermit ${wir ? 'kündigen wir' : 'kündige ich'} das Mietverhältnis über die oben genannte Wohnung fristgerecht zum ${dDe(r.ende)}, hilfsweise zum nächstmöglichen Termin.`, `Bitte bestätigen Sie ${wir ? 'uns' : 'mir'} den Eingang dieser Kündigung und das Ende des Mietverhältnisses schriftlich.`] },
        { p: [`Für die Wohnungsübergabe ${wir ? 'schlagen wir' : 'schlage ich'} ${v.termin && v.termin.trim() ? v.termin.trim() : 'einen Termin in der letzten Woche des Mietverhältnisses'} vor. Die Kaution nebst Zinsen überweisen Sie bitte nach Abrechnung auf das Konto IBAN ${L_(v.iban, 27)}.`, 'Mit freundlichen Grüßen'] },
      ],
      sign: wir ? [L_(v.mtName, 20), v.mt2!.trim()] : [L_(v.mtName, 20)],
    };
  },
};
export const _monatEnde = monatEnde;
