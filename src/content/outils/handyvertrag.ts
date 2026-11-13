import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Handy und Internet : § 56 TKG (24 Monate, danach ein Monat), § 309 Nr. 13 BGB (Textform), § 312k BGB. */
const r = (h: Helpers, zugang: string) => h.M.vertrag({ beginn: '2025-03-01', laufzeit: 24, abschluss: '2025-03-01', zugang, frist: 1, verlaengerung: 12, tkg: true });

export default defineGuide({
  id: 'handyvertrag',
  group: 'kuendigen',
  order: 1,
  doc: 'handy',
  related: ['fitnessstudio', 'stromvertrag', 'versicherung'],
  sources: ['tkg56', 'bgb309', 'bgb312k', 'bgb130', 'bgb188'],
  de: {
    slug: 'kuendigung-handyvertrag',
    nav: 'Handyvertrag kündigen',
    card: 'Handy- oder Internetvertrag kündigen: Ende nach § 56 TKG, auch nach der Mindestlaufzeit, Schreiben zum Drucken.',
    title: 'Kündigung Handyvertrag Vorlage: Ende nach § 56 TKG',
    description: 'Kündigung Handyvertrag Vorlage: Ende der Mindestlaufzeit und monatliche Kündigung nach § 56 TKG berechnet, Rufnummernmitnahme im Schreiben, als PDF drucken.',
    h1: 'Kündigung Handyvertrag Vorlage mit Enddatum',
    intro: 'Mit dieser Kündigung Handyvertrag Vorlage sehen Sie, wann Ihr Mobilfunk- oder Internetvertrag endet, und erhalten ein fertiges Schreiben mit Rufnummer und Wunsch zur Mitnahme.',
    resume: (h) => `Handy- und Internetverträge dürfen mit Verbrauchern höchstens 24 Monate Erstlaufzeit haben (${h.src('tkg56', '§ 56 Abs. 1 TKG')}). Danach verlängern sie sich zwar stillschweigend, aber nur noch auf unbestimmte Zeit: Sie können jederzeit mit einer Frist von einem Monat kündigen (§ 56 Abs. 3 TKG). Für einen Vertrag ab dem ${h.date('2025-03-01')} mit 24 Monaten endet die Mindestlaufzeit am ${h.date(r(h, '2027-01-20').erstEnde)}; dafür muss die Kündigung bis zum ${h.date(r(h, '2027-01-20').spaetesterZugang)} beim Anbieter sein, wenn der Vertrag einen Monat Frist vorsieht. Kommt sie erst am ${h.date('2027-02-10')} an, endet der Vertrag einen Monat später, am ${h.date(r(h, '2027-02-10').ende)}, und nicht erst nach einer weiteren Verlängerung um ein Jahr. Eine strengere Form als die Textform darf der Anbieter in seinen Bedingungen nicht verlangen (${h.src('bgb309', '§ 309 Nr. 13 BGB')}): Brief, E-Mail oder der Kündigungsbutton auf der Website genügen. Das Schreiben der Vorlage eignet sich für jeden dieser Wege.`,
    faqs: (h) => [
      { q: 'Kann ich meinen Handyvertrag nach 24 Monaten monatlich kündigen?', a: `Ja. Nach Ablauf der anfänglichen Laufzeit können Sie einen stillschweigend verlängerten Vertrag jederzeit mit einer Frist von einem Monat kündigen (§ 56 Abs. 3 TKG). Eine Kündigung, die am ${h.date('2027-02-10')} zugeht, beendet den Vertrag zum ${h.date(r(h, '2027-02-10').ende)}.` },
      { q: 'Muss ich die Kündigung per Einschreiben schicken?', a: 'Nein. Der Anbieter darf in seinen Bedingungen keine strengere Form als die Textform verlangen und auch keine besonderen Zugangswege (§ 309 Nr. 13 BGB). Eine E-Mail an die Kundenservice-Adresse oder der Kündigungsbutton reichen. Bewahren Sie den Sendebeleg oder die Eingangsbestätigung auf, denn im Streit müssen Sie den Zugang beweisen.' },
      { q: 'Wie nehme ich meine Rufnummer mit?', a: 'Sagen Sie Ihrem neuen Anbieter, dass Sie die Nummer mitnehmen wollen; er beantragt die Portierung beim alten Anbieter. In der Kündigung können Sie die Freigabe gleich ankündigen, die Vorlage hat dafür eine Auswahl. Die Mitnahme ist auch vor dem Vertragsende möglich, der alte Vertrag läuft dann ohne Nummer weiter.' },
      { q: 'Was ist der Kündigungsbutton?', a: 'Wer Verträge auf seiner Website abschließen lässt, muss dort auch eine Schaltfläche „Verträge hier kündigen“ anbieten, die zu einer Kündigungsseite führt (§ 312k BGB). Nach dem Absenden muss der Anbieter den Eingang sofort elektronisch bestätigen. Der Button ist ein zusätzlicher Weg; ein Brief oder eine E-Mail bleibt wirksam.' },
    ],
    body: (h) => `<h2>Kündigung Handyvertrag: Mindestlaufzeit oder ein Monat</h2>
<p>Die Mindestlaufzeit endet am Tag vor dem Monatstag des Beginns, also bei einem Start am ersten eines Monats am Monatsletzten. Die vertragliche Frist rechnet von diesem Tag zurück. Ist sie verpasst, gilt nicht mehr die alte Regel einer weiteren Verlängerung, sondern ein Monat ab Zugang (${h.src('tkg56', '§ 56 Abs. 3 TKG')}).</p>
${h.table(['Kündigung kommt an', 'Regel', 'Vertrag endet'], ['2026-12-15', '2027-01-20', '2027-02-10', '2027-06-30'].map((z) => [h.date(z), r(h, z).regel === 'erst' ? 'Ende der Mindestlaufzeit' : 'ein Monat ab Zugang', h.date(r(h, z).ende)]), 'Handyvertrag seit 1. März 2025, 24 Monate, ein Monat Frist', ['l', 'l', 'l'])}
<h2>Sonderfälle</h2>
<p>Ziehen Sie um und kann der Anbieter die Leistung am neuen Wohnort nicht erbringen, dürfen Sie mit einer Frist von einem Monat kündigen. Bei einer einseitigen Vertragsänderung durch den Anbieter, etwa einer Preiserhöhung, besteht ein Sonderkündigungsrecht. Beide Fälle nennt das Schreiben nicht; ergänzen Sie dann einen Satz mit dem Anlass. Laufen bei Ihnen auch ein ${h.a('fitnessstudio', 'Fitnessstudio-Vertrag')} oder ein ${h.a('stromvertrag', 'Stromvertrag')}, rechnen die Vorlagen dort mit den jeweils eigenen Regeln.</p>`,
  },
  en: {
    slug: 'cancel-mobile-contract',
    nav: 'Cancel mobile contract',
    card: 'Cancel a German mobile or broadband contract: end date under section 56 TKG and a letter to print.',
    title: 'Cancel a German mobile contract: end date and letter',
    description: 'Cancel a German mobile or internet contract: end of the minimum term and the one-month rule of section 56 TKG worked out, number porting in the letter, as PDF.',
    h1: 'Cancel a German mobile contract with the right end date',
    intro: 'To cancel a German mobile contract, enter when it started and when your notice will arrive: the tool shows the end date and writes the cancellation letter, including your number and porting wish.',
    resume: (h) => `German mobile and broadband contracts with consumers may have an initial term of at most 24 months (${h.src('tkg56', 'section 56(1) TKG')}). After that they renew tacitly, but only for an indefinite period: you can cancel at any time on one month’s notice (section 56(3) TKG). For a contract from ${h.date('2025-03-01')} with 24 months, the minimum term ends on ${h.date(r(h, '2027-01-20').erstEnde)}; with one month’s notice in the contract, the cancellation must reach the provider by ${h.date(r(h, '2027-01-20').spaetesterZugang)}. If it only arrives on ${h.date('2027-02-10')}, the contract ends one month later, on ${h.date(r(h, '2027-02-10').ende)}, not after another year. The provider’s terms may not require a stricter form than text form (${h.src('bgb309', 'section 309 no. 13 BGB')}): a letter, an email or the cancellation button on the website will do. The template’s letter, written in German, works for each of these routes.`,
    faqs: (h) => [
      { q: 'Can I cancel my German mobile contract monthly after 24 months?', a: `Yes. Once the initial term has expired you can cancel a tacitly renewed contract at any time on one month’s notice (section 56(3) TKG). A cancellation received on ${h.date('2027-02-10')} ends the contract on ${h.date(r(h, '2027-02-10').ende)}. The provider must remind you of this before the renewal.` },
      { q: 'Do I have to send the cancellation by registered mail?', a: 'No. The provider’s terms may not require a stricter form than text form or any special delivery channel (section 309 no. 13 BGB). An email to customer service or the cancellation button is enough. Keep the sent receipt or the confirmation, because in a dispute you must prove that it arrived.' },
      { q: 'What is the German cancellation button?', a: 'A business that lets consumers sign contracts on its website must also show a button labelled “Verträge hier kündigen” leading to a cancellation page (section 312k BGB). After you submit, the provider must confirm receipt electronically at once. The button is an extra route; a letter or email remains valid.' },
    ],
    body: (h) => `<h2>Cancelling a German mobile contract: minimum term or one month</h2>
<p>The minimum term ends the day before the calendar day on which it began, so a contract that started on the first ends on the last day of a month. The contractual notice period counts back from that day. Once it is missed, the old rule of another renewal no longer applies; instead one month from receipt does (${h.src('tkg56', 'section 56(3) TKG')}).</p>
${h.table(['Cancellation arrives', 'Rule', 'Contract ends'], ['2026-12-15', '2027-01-20', '2027-02-10', '2027-06-30'].map((z) => [h.date(z), r(h, z).regel === 'erst' ? 'end of minimum term' : 'one month from receipt', h.date(r(h, z).ende)]), 'Mobile contract since 1 March 2025, 24 months, one month’s notice', ['l', 'l', 'l'])}
<h2>Special cases</h2>
<p>If you move and the provider cannot deliver the service at the new address, you may cancel on one month’s notice. A one-sided change by the provider, such as a price rise, gives a special right to cancel. The letter does not mention either case; add one sentence stating the reason. If you also have a ${h.a('fitnessstudio', 'gym membership')} or an ${h.a('stromvertrag', 'energy contract')} to end, those templates use their own rules.</p>`,
  },
});
