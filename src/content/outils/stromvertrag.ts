import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Strom und Gas : Grundversorgung § 20 StromGVV (zwei Wochen, Textform), Sondervertrag § 309 Nr. 9 BGB. */
const sonder = (h: Helpers, zugang: string) => h.M.vertrag({ beginn: '2025-02-01', laufzeit: 12, abschluss: '2025-02-01', zugang, frist: 1, verlaengerung: 12 });

export default defineGuide({
  id: 'stromvertrag',
  group: 'kuendigen',
  order: 3,
  doc: 'strom',
  related: ['handyvertrag', 'kuendigung-mietvertrag', 'versicherung'],
  sources: ['stromgvv20', 'bgb309', 'egbgb229', 'bgb130'],
  de: {
    slug: 'kuendigung-stromvertrag',
    nav: 'Stromvertrag kündigen',
    card: 'Strom oder Gas kündigen: Grundversorgung in zwei Wochen, Sondervertrag nach Laufzeit, Schreiben mit Zählernummer.',
    title: 'Kündigung Stromvertrag Vorlage: Grundversorgung und Tarif',
    description: 'Kündigung Stromvertrag Vorlage für Strom und Gas: Grundversorgung mit zwei Wochen nach § 20 StromGVV, Sondertarif nach Laufzeit, Schreiben mit Zählernummer.',
    h1: 'Kündigung Stromvertrag Vorlage für Strom und Gas',
    intro: 'Mit dieser Kündigung Stromvertrag Vorlage sehen Sie, wann die Belieferung endet, je nachdem ob Sie in der Grundversorgung sind oder einen Tarif mit Laufzeit haben; das Schreiben nennt Zähler und Anlass.',
    resume: (h) => `Beim Strom und beim Gas kommt es zuerst darauf an, welchen Vertrag Sie haben. Wer nie einen Tarif gewählt hat, ist meist in der Grundversorgung des örtlichen Versorgers. Sie lässt sich nach ${h.src('stromgvv20', '§ 20 StromGVV')} mit einer Frist von zwei Wochen kündigen, die Kündigung braucht nur Textform, und der Versorger darf dafür kein Entgelt verlangen; für Gas gilt dasselbe nach der Gasgrundversorgungsverordnung. Eine Kündigung, die am ${h.date('2027-02-10')} ankommt, beendet die Grundversorgung am ${h.date(h.M.grundversorgung('2027-02-10'))}. Ein Sondervertrag mit Laufzeit endet dagegen zum Ende der Laufzeit, wenn Sie die vereinbarte Frist wahren; bei einem Tarif ab dem ${h.date('2025-02-01')} über zwölf Monate war das der ${h.date(sonder(h, '2025-12-01').erstEnde)}. Für Verträge ab dem 1. März 2022 rechnet die Vorlage danach mit höchstens einem Monat Frist (${h.src('bgb309', '§ 309 Nr. 9 BGB')}): Eine Kündigung vom ${h.date('2027-02-10')} wirkt dann zum ${h.date(sonder(h, '2027-02-10').ende)}. Beim Wechsel kündigt meist der neue Lieferant für Sie.`,
    faqs: (h) => [
      { q: 'Wie schnell kann ich die Grundversorgung kündigen?', a: `Mit einer Frist von zwei Wochen, zu jedem Tag (§ 20 Abs. 1 StromGVV). Die Kündigung braucht Textform, also Brief oder E-Mail, und der Versorger muss sie unverzüglich mit dem Vertragsende bestätigen. Eine Gebühr für die Kündigung oder den Wechsel ist ausgeschlossen. Zugang am ${h.date('2027-02-10')} heißt Ende am ${h.date(h.M.grundversorgung('2027-02-10'))}.` },
      { q: 'Muss ich selbst kündigen, wenn ich den Stromanbieter wechsle?', a: 'Meist nicht. Beim Abschluss beim neuen Lieferanten können Sie ihn beauftragen, den alten Vertrag für Sie zu kündigen; er kennt die Fristen und meldet den Wechsel beim Netzbetreiber an. Selbst kündigen sollten Sie, wenn Sie sicher sein wollen, dass die Frist gewahrt ist, oder wenn Sie ausziehen und keinen neuen Vertrag abschließen.' },
      { q: 'Was gilt beim Umzug?', a: 'Bei einem Auszug endet die Belieferung an der alten Adresse nicht von selbst. Die Grundversorgung kündigen Sie mit zwei Wochen; bei einem Sondervertrag sehen viele Bedingungen und das Energiewirtschaftsrecht eine Kündigung wegen Umzugs vor. Notieren Sie bei der Wohnungsübergabe den Zählerstand und teilen Sie ihn mit, die Vorlage nennt das im Schreiben.' },
    ],
    body: (h) => `<h2>Kündigung Stromvertrag: Grundversorgung oder Sondervertrag</h2>
<p>Auf der Rechnung steht, ob Sie „Grundversorgung“ oder einen Tarifnamen haben. Ein Sondervertrag kann auch beim örtlichen Versorger bestehen, etwa ein Ökostrom- oder Festpreistarif. Im Zweifel fragen Sie den Versorger, bevor Sie sich auf die zwei Wochen verlassen.</p>
${h.table(['Kündigung kommt an', 'Grundversorgung', 'Tarif ab Februar 2025, 12 Monate, 1 Monat Frist'], ['2025-12-01', '2026-06-15', '2027-02-10'].map((z) => [h.date(z), h.date(h.M.grundversorgung(z)), h.date(sonder(h, z).ende)]), 'Rechenbeispiele', ['l', 'l', 'l'])}
<h2>Preiserhöhung und Schlussrechnung</h2>
<p>Erhöht der Lieferant die Preise, muss er Sie vorher informieren, und Sie dürfen den Vertrag ohne Einhaltung der normalen Frist zum Zeitpunkt der Erhöhung kündigen; ergänzen Sie dann im Schreiben den Hinweis auf die Preisänderung. Nach dem Ende erhalten Sie eine Schlussrechnung mit dem Zählerstand; zu viel gezahlte Abschläge werden erstattet. Wer zugleich die Wohnung aufgibt, findet die ${h.a('kuendigung-mietvertrag', 'Kündigung des Mietvertrags')} mit eigener Frist.</p>`,
  },
  en: {
    slug: 'cancel-energy-contract',
    nav: 'Cancel energy contract',
    card: 'Cancel German electricity or gas: default supply in two weeks, fixed-term tariffs by term, letter with meter number.',
    title: 'Cancel a German electricity contract: dates and letter',
    description: 'Cancel a German electricity or gas contract: default supply ends two weeks after notice (section 20 StromGVV), fixed tariffs by term, letter with meter number.',
    h1: 'Cancel a German electricity or gas contract',
    intro: 'To cancel a German electricity contract, choose default supply or a tariff with a term: the tool shows when supply ends and writes the letter with your meter number and reason.',
    resume: (h) => `For German electricity and gas the first question is which contract you have. If you never chose a tariff, you are usually in the local supplier’s default supply (Grundversorgung). Under ${h.src('stromgvv20', 'section 20 StromGVV')} it can be cancelled on two weeks’ notice, text form is enough, and the supplier may not charge for it; the gas default supply ordinance says the same. A cancellation that arrives on ${h.date('2027-02-10')} ends default supply on ${h.date(h.M.grundversorgung('2027-02-10'))}. A special tariff with a term ends at the end of the term if you keep to the agreed notice; for a tariff from ${h.date('2025-02-01')} over twelve months that was ${h.date(sonder(h, '2025-12-01').erstEnde)}. For contracts from 1 March 2022 the template then counts at most one month’s notice (${h.src('bgb309', 'section 309 no. 9 BGB')}): a cancellation of ${h.date('2027-02-10')} takes effect on ${h.date(sonder(h, '2027-02-10').ende)}. When you switch, the new supplier usually cancels for you. The letter prints in German.`,
    faqs: (h) => [
      { q: 'How fast can I leave German default electricity supply?', a: `On two weeks’ notice, to any day (section 20(1) StromGVV). Text form, a letter or an email, is enough, and the supplier must confirm the end date without delay. No fee may be charged for cancelling or switching. Receipt on ${h.date('2027-02-10')} means supply ends on ${h.date(h.M.grundversorgung('2027-02-10'))}.` },
      { q: 'Do I have to cancel myself when switching supplier?', a: 'Usually not. When signing with the new supplier you can ask it to cancel the old contract for you; it knows the periods and registers the switch with the grid operator. Cancel yourself if you want to be sure the notice is in time, or if you move out without taking a new contract.' },
      { q: 'What about moving house?', a: 'Moving out does not end supply at the old address automatically. Default supply ends two weeks after notice; for special tariffs many terms provide for cancellation on moving. Note the meter reading at the handover of the flat and send it to the supplier; the template mentions this in the letter so the final bill is right.' },
    ],
    body: (h) => `<h2>Cancelling a German electricity contract: default supply or tariff</h2>
<p>Your bill says either “Grundversorgung” or a tariff name. A special tariff can also be with the local supplier, for example a green or fixed-price tariff. If unsure, ask the supplier before relying on the two weeks.</p>
${h.table(['Notice arrives', 'Default supply', 'Tariff from Feb 2025, 12 months, 1 month’s notice'], ['2025-12-01', '2026-06-15', '2027-02-10'].map((z) => [h.date(z), h.date(h.M.grundversorgung(z)), h.date(sonder(h, z).ende)]), 'Worked examples', ['l', 'l', 'l'])}
<h2>Price rises and the final bill</h2>
<p>If the supplier raises prices it must tell you in advance, and you may then cancel without the normal notice, effective from the price change; add a sentence about the price change to the letter. After the end you receive a final bill based on the meter reading, and overpaid instalments are refunded. If you are giving up your flat at the same time, the ${h.a('kuendigung-mietvertrag', 'tenancy notice')} has its own deadline.</p>`,
  },
});
