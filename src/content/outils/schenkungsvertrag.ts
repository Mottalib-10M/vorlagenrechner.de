import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Schenkung von Geld : §§ 516, 518 BGB ; Freibeträge §§ 15, 16 ErbStG, Zehnjahresfrist § 14, Anzeige § 30. */
const s = (h: Helpers, betrag: number, frueher: number, b: 'kind' | 'enkel' | 'ehegatte' | 'nichte') => h.M.schenkung(betrag, frueher, b);

export default defineGuide({
  id: 'schenkungsvertrag',
  group: 'weitere',
  order: 3,
  doc: 'schenkung',
  related: ['kfz-kaufvertrag', 'vollmacht', 'mahnung'],
  sources: ['bgb516', 'bgb518', 'erbstg15', 'erbstg16', 'erbstg14', 'erbstg30'],
  de: {
    slug: 'schenkungsvertrag',
    nav: 'Schenkungsvertrag',
    card: 'Geld schenken: Vertrag mit Betrag in Worten und Prüfung gegen den Freibetrag der Schenkungsteuer.',
    title: 'Schenkungsvertrag Vorlage: Geld schenken, Freibetrag prüfen',
    description: 'Schenkungsvertrag Vorlage für Geld: Betrag in Worten, Freibetrag nach § 16 ErbStG für Kind, Enkel und Partner, Zehnjahresfrist und Anzeige ans Finanzamt.',
    h1: 'Schenkungsvertrag Vorlage für einen Geldbetrag',
    intro: 'Diese Schenkungsvertrag Vorlage hält eine Geldschenkung schriftlich fest und prüft, ob sie zusammen mit früheren Schenkungen innerhalb des Freibetrags der Schenkungsteuer bleibt.',
    resume: (h) => `Wer Geld verschenkt, schließt einen Schenkungsvertrag (${h.src('bgb516', '§ 516 BGB')}). Ein Versprechen, künftig zu schenken, braucht einen Notar; wird das Geld aber gleich überwiesen, ist die Schenkung mit der Gutschrift wirksam, auch ohne Notar (${h.src('bgb518', '§ 518 Abs. 2 BGB')}). Ein schriftlicher Vertrag lohnt sich trotzdem: Er beweist, dass es ein Geschenk und kein Darlehen war, und er hilft beim Finanzamt. Steuerfrei bleibt eine Schenkung bis zum Freibetrag nach ${h.src('erbstg16', '§ 16 ErbStG')}, der sich nach dem Verhältnis richtet: ${h.eur(h.P.schenkung.freibetraege.ehegatte)} für Ehe- oder Lebenspartner, ${h.eur(h.P.schenkung.freibetraege.kind)} für jedes Kind, ${h.eur(h.P.schenkung.freibetraege.enkel)} für Enkel und ${h.eur(h.P.schenkung.freibetraege.andere)} für Eltern, Geschwister, Nichten, Neffen und alle anderen. Alle Schenkungen derselben Person innerhalb von zehn Jahren werden zusammengerechnet (${h.src('erbstg14', '§ 14 ErbStG')}). Schenken Sie einem Kind ${h.eur(50000)}, bleiben noch ${h.eur(s(h, 50000, 0, 'kind').rest)} frei. Jede Schenkung ist dem Finanzamt binnen drei Monaten anzuzeigen (${h.src('erbstg30', '§ 30 ErbStG')}), auch wenn keine Steuer anfällt.`,
    faqs: (h) => [
      { q: 'Wie viel Geld darf ich steuerfrei verschenken?', a: `Das hängt vom Verhältnis ab: ${h.eur(h.P.schenkung.freibetraege.kind)} an jedes Kind, ${h.eur(h.P.schenkung.freibetraege.enkel)} an jedes Enkelkind, ${h.eur(h.P.schenkung.freibetraege.ehegatte)} an Ehe- oder eingetragene Lebenspartner und ${h.eur(h.P.schenkung.freibetraege.andere)} an alle anderen, jeweils je Schenker und innerhalb von zehn Jahren. Beide Eltern können einem Kind also zusammen ${h.eur(2 * h.P.schenkung.freibetraege.kind)} schenken.` },
      { q: 'Braucht ein Schenkungsvertrag über Geld einen Notar?', a: 'Nur das Versprechen einer künftigen Schenkung muss notariell beurkundet werden. Wird das Geld sofort überwiesen oder bar übergeben, heilt die Ausführung den Formmangel (§ 518 Abs. 2 BGB). Ein privater schriftlicher Vertrag genügt dann als Beweis. Für Immobilien oder GmbH-Anteile ist der Notar dagegen immer nötig.' },
      { q: 'Muss ich eine Schenkung dem Finanzamt melden?', a: 'Ja. Nach § 30 ErbStG sind Schenkungen binnen drei Monaten dem zuständigen Erbschaftsteuer-Finanzamt anzuzeigen, und zwar vom Beschenkten und vom Schenker. Das gilt auch unterhalb des Freibetrags. Übliche Gelegenheitsgeschenke zu Geburtstagen oder Weihnachten sind steuerfrei; die Grenze dafür nennt das Gesetz nicht in Euro.' },
    ],
    body: (h) => `<h2>Schenkungsvertrag und Freibetrag: Rechenbeispiele</h2>
<p>Der Rechner addiert die heutige Schenkung und frühere Schenkungen derselben Person aus den letzten zehn Jahren und vergleicht die Summe mit dem Freibetrag. Was darüber liegt, ist steuerpflichtig; den Steuersatz der Steuerklasse setzt das Finanzamt fest, der Rechner nennt ihn nicht.</p>
${h.table(['Beschenkt', 'Diese Schenkung', 'Frühere in 10 Jahren', 'Noch frei', 'Über dem Freibetrag'], ([['Kind', 50000, 0, 'kind'], ['Kind', 150000, 300000, 'kind'], ['Enkel', 60000, 0, 'enkel'], ['Nichte', 25000, 0, 'nichte']] as Array<[string, number, number, 'kind' | 'enkel' | 'nichte']>).map(([n, b, f, k]) => [n, h.eur(b), h.eur(f), h.eur(s(h, b, f, k).rest), h.eur(s(h, b, f, k).ueber)]), 'Freibeträge nach § 16 ErbStG', ['l', 'r', 'r', 'r', 'r'])}
<h2>Was der Vertrag regelt und was nicht</h2>
<p>Vier kurze Paragrafen: Betrag in Ziffern und Worten mit freiwilligem Zweck, Überweisung an einem bestimmten Tag auf ein bestimmtes Konto, die Anzeige beim Finanzamt und die Annahme durch den Beschenkten. Rückforderungsrechte, Auflagen oder eine Anrechnung auf das spätere Erbe enthält die Vorlage nicht; sie sind Sache einer Beratung. Wird statt Geld ein Auto weitergegeben, beschreibt der ${h.a('kfz-kaufvertrag', 'Kfz-Kaufvertrag')} das Fahrzeug genauer. Gesetzestext und Klassen stehen in ${h.src('erbstg15', '§ 15 ErbStG')}.</p>`,
  },
  en: {
    slug: 'gift-agreement-money',
    nav: 'Gift agreement',
    card: 'Give money in Germany: agreement with the amount in words and a check against the gift tax allowance.',
    title: 'Gift agreement for money: German gift tax allowance check',
    description: 'Gift agreement template for money in Germany: amount in words, gift tax allowance under section 16 ErbStG for child, grandchild or spouse, ten-year rule.',
    h1: 'German gift agreement template for money',
    intro: 'This German gift agreement template records a gift of money in writing (Schenkungsvertrag) and checks whether it stays within the gift tax allowance together with earlier gifts.',
    resume: (h) => `Giving money in Germany is a gift contract (${h.src('bgb516', 'section 516 BGB')}). A promise to give in the future needs a notary; but if the money is transferred straight away, the gift is valid once credited, notary or not (${h.src('bgb518', 'section 518(2) BGB')}). A written agreement is still worth having: it proves it was a gift and not a loan, and it helps with the tax office. A gift is tax-free up to the allowance in ${h.src('erbstg16', 'section 16 ErbStG')}, which depends on the relationship: ${h.eur(h.P.schenkung.freibetraege.ehegatte)} for a spouse or civil partner, ${h.eur(h.P.schenkung.freibetraege.kind)} for each child, ${h.eur(h.P.schenkung.freibetraege.enkel)} for grandchildren and ${h.eur(h.P.schenkung.freibetraege.andere)} for parents, siblings, nieces, nephews and everyone else. All gifts from the same person within ten years are added up (${h.src('erbstg14', 'section 14 ErbStG')}). Give a child ${h.eur(50000)} and ${h.eur(s(h, 50000, 0, 'kind').rest)} remains free. Every gift must be reported to the tax office within three months (${h.src('erbstg30', 'section 30 ErbStG')}), even when no tax is due. The agreement prints in German.`,
    faqs: (h) => [
      { q: 'How much money can I give tax-free in Germany?', a: `It depends on the relationship: ${h.eur(h.P.schenkung.freibetraege.kind)} to each child, ${h.eur(h.P.schenkung.freibetraege.enkel)} to each grandchild, ${h.eur(h.P.schenkung.freibetraege.ehegatte)} to a spouse or registered partner and ${h.eur(h.P.schenkung.freibetraege.andere)} to everyone else, per giver and within ten years. Both parents together can thus give a child ${h.eur(2 * h.P.schenkung.freibetraege.kind)}.` },
      { q: 'Does a German gift of money need a notary?', a: 'Only a promise of a future gift must be notarised. If the money is transferred or handed over at once, performance cures the lack of form (section 518(2) BGB). A private written agreement is then enough as proof. For property or shares in a limited company, a notary is always needed, whatever the amount.' },
      { q: 'Must I report a gift to the German tax office?', a: 'Yes. Under section 30 ErbStG gifts must be reported within three months to the tax office responsible for inheritance and gift tax, by both recipient and giver. This also applies below the allowance. Customary presents for birthdays or Christmas are tax-free; the law sets no euro limit for them.' },
    ],
    body: (h) => `<h2>German gift agreement and allowance: worked examples</h2>
<p>The calculator adds today’s gift to earlier gifts from the same person in the last ten years and compares the total with the allowance. Anything above it is taxable; the tax office sets the rate for the tax class, and the calculator does not estimate it.</p>
${h.table(['Recipient', 'This gift', 'Earlier within 10 years', 'Still free', 'Above allowance'], ([['Child', 50000, 0, 'kind'], ['Child', 150000, 300000, 'kind'], ['Grandchild', 60000, 0, 'enkel'], ['Niece', 25000, 0, 'nichte']] as Array<[string, number, number, 'kind' | 'enkel' | 'nichte']>).map(([n, b, f, k]) => [n, h.eur(b), h.eur(f), h.eur(s(h, b, f, k).rest), h.eur(s(h, b, f, k).ueber)]), 'Allowances under section 16 ErbStG', ['l', 'r', 'r', 'r', 'r'])}
<h2>What the agreement covers and what it does not</h2>
<p>Four short clauses: the amount in figures and words with an optional purpose, the transfer on a given day to a given account, reporting to the tax office, and acceptance by the recipient. Rights to claim the gift back, conditions or offsetting against a later inheritance are not included; they need advice. If a car is passed on instead of money, the ${h.a('kfz-kaufvertrag', 'car sale contract')} describes the vehicle in more detail. The tax classes are set out in ${h.src('erbstg15', 'section 15 ErbStG')}.</p>`,
  },
});
