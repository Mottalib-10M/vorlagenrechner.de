import { defineGuide } from '../../lib/guide-types';

/** Mietvertrag über Wohnraum, unbefristet : §§ 535, 550, 551, 556, 556b, 568, 573c BGB. */
export default defineGuide({
  id: 'mietvertrag',
  group: 'wohnen',
  order: 1,
  doc: 'mietvertrag',
  related: ['untermietvertrag', 'wg-zimmer', 'kuendigung-mietvertrag', 'vollmacht'],
  sources: ['bgb535', 'bgb550', 'bgb551', 'bgb556', 'bgb556b', 'bgb568', 'bgb573c', 'bgb540', 'bgb553'],
  de: {
    slug: 'mietvertrag-vorlage',
    nav: 'Mietvertrag',
    card: 'Unbefristeter Wohnungsmietvertrag mit Kautionsgrenze und Fälligkeit nach BGB, als PDF zu drucken.',
    title: 'Mietvertrag Vorlage: Wohnung, kostenlos zum Ausfüllen',
    description: 'Mietvertrag Vorlage für eine Wohnung: Angaben eintippen, Kaution bis drei Kaltmieten geprüft, Text mit den Paragrafen des BGB, als PDF drucken, ohne Anmeldung.',
    h1: 'Mietvertrag Vorlage für eine Wohnung zum Ausfüllen',
    intro: 'Diese Mietvertrag Vorlage schreibt den Vertrag mit Ihren Angaben, rechnet die Warmmiete und prüft, ob die Kaution die drei Nettokaltmieten des § 551 BGB einhält.',
    resume: (h) => `Ein Mietvertrag über eine Wohnung braucht keine bestimmte Form, aber er sollte schriftlich sein: Wer für länger als ein Jahr vermietet und nicht schriftlich abschließt, hat nach ${h.src('bgb550', '§ 550 BGB')} einen Vertrag auf unbestimmte Zeit, der frühestens zum Ablauf eines Jahres nach Überlassung gekündigt werden kann. Die Vorlage oben ist der übliche Fall: unbefristet, Nettokaltmiete plus Vorauszahlung auf Betriebs- und Heizkosten, Fälligkeit bis zum dritten Werktag des Monats, Kaution in drei Raten. Sie rechnet mit Ihren Zahlen; bei ${h.eur(750)} kalt liegt die Grenze der Kaution bei ${h.eur(h.M.kaution(750).max)}, und jede Rate darf ${h.eur(h.M.kaution(750).rate)} betragen. Was darüber hinausgeht, ist unwirksam, auch wenn beide unterschreiben. Klauseln, die Gerichte regelmäßig kippen, etwa starre Fristen für Schönheitsreparaturen, enthält die Vorlage bewusst nicht; dort gilt das Gesetz.`,
    faqs: (h) => [
      { q: 'Muss ein Mietvertrag über eine Wohnung schriftlich sein?', a: 'Gültig ist auch ein mündlicher Mietvertrag. Wird ein Vertrag für länger als ein Jahr aber nicht schriftlich geschlossen, gilt er nach § 550 BGB als auf unbestimmte Zeit geschlossen; eine vereinbarte Befristung oder ein Kündigungsverzicht verliert dann ihren Schutz. Schon deshalb unterschreiben beide Seiten dasselbe Papier, und jede Seite behält ein Exemplar.' },
      { q: 'Wie hoch darf die Kaution in einem Mietvertrag sein?', a: `Höchstens das Dreifache der Monatsmiete ohne Betriebskostenvorauszahlung, also drei Nettokaltmieten. Bei ${h.eur(900)} kalt sind das ${h.eur(h.M.kaution(900).max)}. Der Mieter darf in drei gleichen Monatsraten zahlen, die erste zu Mietbeginn. Der Vermieter legt das Geld getrennt von seinem Vermögen an, und die Zinsen gehören dem Mieter (§ 551 BGB).` },
      { q: 'Bis wann muss die Miete laut Mietvertrag gezahlt werden?', a: 'Nach § 556b Abs. 1 BGB ist die Miete zu Beginn, spätestens bis zum dritten Werktag des Monats zu zahlen, für den sie gilt. Die Vorlage übernimmt diese Regel. Wer per Dauerauftrag zahlt, stellt ihn auf den ersten Werktag, damit eine Buchung über das Wochenende nicht zu spät ankommt.' },
      { q: 'Kann ich im Mietvertrag Haustiere ganz verbieten?', a: 'Die Vorlage bietet zwei Fassungen: Hund und Katze sind erlaubt, oder sie brauchen eine Zustimmung, die nur aus sachlichem Grund verweigert wird. Ein pauschales Verbot jeder Tierhaltung in einem Formularvertrag halten Gerichte regelmäßig nicht aufrecht; kleine Tiere wie Fische oder Hamster sind in beiden Fassungen erlaubt.' },
    ],
    body: (h) => `<h2>Was die Mietvertrag Vorlage regelt</h2>
<p>Zehn Paragrafen, jeder mit der Vorschrift, auf der er beruht: Mietsache und Schlüssel, Mietzeit auf unbestimmte Zeit mit Kündigung nach den gesetzlichen Fristen (${h.src('bgb573c', '§ 573c BGB')}), Nettokaltmiete und Vorauszahlung auf die Betriebskosten (${h.src('bgb556', '§ 556 BGB')}), Zahlung bis zum dritten Werktag, Kaution, Untervermietung nur mit Erlaubnis (${h.src('bgb540', '§ 540 BGB')}), Tierhaltung, Erhaltung der Wohnung durch den Vermieter (${h.src('bgb535', '§ 535 BGB')}), Übergabeprotokoll und Schriftform für Änderungen.</p>
${h.table(['Kaltmiete', 'Höchstkaution', 'Je Rate'], [750, 900, 1200].map((k) => [h.eur(k), h.eur(h.M.kaution(k).max), h.eur(h.M.kaution(k).rate)]), 'Kaution nach § 551 BGB, drei gleiche Raten', ['l', 'r', 'r'])}
<h2>Betriebskosten und Abrechnung</h2>
<p>Die Vorauszahlung deckt die laufenden Kosten des Hauses, die die Betriebskostenverordnung aufzählt, etwa Grundsteuer, Wasser, Müllabfuhr, Hausreinigung und Heizung. Sie muss angemessen sein. Der Vermieter rechnet einmal im Jahr ab und muss die Abrechnung spätestens zwölf Monate nach Ende des Abrechnungszeitraums schicken; danach kann er keine Nachzahlung mehr verlangen. Steht im Vertrag eine Pauschale statt einer Vorauszahlung, gibt es keine Abrechnung.</p>
<h2>Was die Vorlage bewusst offen lässt</h2>
<p>Staffel- und Indexmiete, Befristung mit Grund (${h.src('bgb575', '§ 575 BGB')}), Kündigungsverzicht und Regeln zu Schönheitsreparaturen sind Fälle, in denen ein falscher Satz die ganze Klausel kosten kann. Sie fehlen hier, und für sie gilt das Gesetz. Wer eine Wohnung in einem Gebiet mit Mietpreisbremse vermietet, prüft die zulässige Miete vor der Unterschrift. Gekündigt wird später mit der ${h.a('kuendigung-mietvertrag', 'Kündigung des Mietvertrags')}, die das Ende auf den Tag berechnet; ein einzelnes Zimmer vermieten Sie besser mit dem ${h.a('untermietvertrag', 'Untermietvertrag')}.</p>`,
  },
  en: {
    slug: 'residential-lease-template',
    nav: 'Residential lease',
    card: 'Open-ended German flat lease with the deposit cap and rent due date from the Civil Code, ready to print.',
    title: 'Residential lease template for Germany: fill in for free',
    description: 'German residential lease template for a flat: type your details, the deposit is checked against three months’ net rent, BGB clauses, print as PDF, no sign-up.',
    h1: 'German residential lease template to fill in',
    intro: 'This German residential lease template writes a Mietvertrag with your details, adds up the monthly rent and checks the deposit against the three-month cap in section 551 of the Civil Code.',
    resume: (h) => `A German lease for a flat (Mietvertrag über Wohnraum) needs no particular form, but it should be in writing: a lease for more than one year that is not signed in writing counts, under ${h.src('bgb550', 'section 550 BGB')}, as open-ended and can be terminated one year after the tenant moves in at the earliest. The template above covers the usual case: no fixed end, net rent (Kaltmiete) plus an advance for service and heating costs, rent due by the third working day of the month, and a deposit payable in three instalments. It works with your figures; with ${h.eur(750)} net rent the deposit may not exceed ${h.eur(h.M.kaution(750).max)}, and each instalment may be ${h.eur(h.M.kaution(750).rate)}. Anything above that is void even if both sides sign. Clauses that German courts regularly strike down, such as rigid redecoration schedules, are deliberately left out; the statute applies instead. The document itself is in German, as landlords and letting agents expect.`,
    faqs: (h) => [
      { q: 'Does a German flat lease have to be in writing?', a: 'An oral lease is valid. But if a lease for longer than one year is not concluded in writing, section 550 BGB treats it as open-ended, so an agreed fixed term or a waiver of notice loses its protection. That is why both sides sign the same paper and each keeps a copy. The template prints with two signature lines for that purpose.' },
      { q: 'How large can the deposit be under German law?', a: `At most three times the monthly rent without the service-charge advance, so three months of net rent. With ${h.eur(900)} net rent that is ${h.eur(h.M.kaution(900).max)}. The tenant may pay it in three equal monthly instalments, the first at the start. The landlord keeps it apart from his own money, and the interest belongs to the tenant (section 551 BGB).` },
      { q: 'When is rent due in Germany?', a: 'Section 556b(1) BGB makes rent payable at the start of each month, at the latest by the third working day. The template uses that rule. If you pay by standing order, set it for the first working day so that a weekend does not make the payment arrive late; Saturdays count as working days in German law.' },
    ],
    body: (h) => `<h2>What the German residential lease template covers</h2>
<p>Ten clauses, each tied to the section it rests on: the flat and its keys, an open-ended term with the statutory notice periods (${h.src('bgb573c', 'section 573c BGB')}), net rent and the advance for service charges (${h.src('bgb556', 'section 556 BGB')}), payment by the third working day, the deposit, subletting only with consent (${h.src('bgb540', 'section 540 BGB')}), pets, upkeep by the landlord (${h.src('bgb535', 'section 535 BGB')}), a handover report and written form for changes. Field labels are in English; the contract prints in German.</p>
${h.table(['Net rent', 'Maximum deposit', 'Per instalment'], [750, 900, 1200].map((k) => [h.eur(k), h.eur(h.M.kaution(k).max), h.eur(h.M.kaution(k).rate)]), 'Deposit under section 551 BGB, three equal instalments', ['l', 'r', 'r'])}
<h2>Service charges and the yearly statement</h2>
<p>The advance pays the running costs of the building listed in the Service Charges Ordinance, such as property tax, water, refuse collection, cleaning and heating, and it must be reasonable. The landlord settles it once a year and must send the statement no later than twelve months after the end of the accounting period; after that he cannot claim a top-up. If the lease states a flat rate instead of an advance, there is no statement at all.</p>
<h2>What the template leaves to the statute</h2>
<p>Graduated and index-linked rent, fixed terms with a statutory reason (${h.src('bgb575', 'section 575 BGB')}), notice waivers and redecoration duties are areas where one wrong sentence can void the whole clause, so they are not included. In cities with a rent cap, check the permitted rent before signing. To end the tenancy later, use the ${h.a('kuendigung-mietvertrag', 'tenancy notice letter')}, which works out the end date; to let a single room, use the ${h.a('untermietvertrag', 'sublease agreement')}.</p>`,
  },
});
