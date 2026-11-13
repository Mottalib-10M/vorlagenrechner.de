import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Versicherung : § 11 VVG (Verlängerung höchstens ein Jahr, Frist 1 bis 3 Monate, nach drei Jahren). */
const v = (h: Helpers, zugang: string, frist: number) => h.M.versicherung({ zugang, ablauf: '2026-12-31', frist });

export default defineGuide({
  id: 'versicherung',
  group: 'kuendigen',
  order: 4,
  doc: 'versicherung',
  related: ['fitnessstudio', 'kfz-kaufvertrag', 'handyvertrag'],
  sources: ['vvg11', 'bgb309', 'bgb130', 'bgb188'],
  de: {
    slug: 'kuendigung-versicherung',
    nav: 'Versicherung kündigen',
    card: 'Haftpflicht, Hausrat, Kfz und andere Versicherungen kündigen: Ablauf nach § 11 VVG, Schreiben zum Drucken.',
    title: 'Kündigung Versicherung Vorlage: Ablauf nach § 11 VVG',
    description: 'Kündigung Versicherung Vorlage für Haftpflicht, Hausrat, Kfz und Rechtsschutz: Ende des Versicherungsjahres und letzter Zugang nach § 11 VVG berechnet.',
    h1: 'Kündigung Versicherung Vorlage mit Ablaufdatum',
    intro: 'Diese Kündigung Versicherung Vorlage rechnet aus, zu welchem Ablauf Ihre Kündigung wirkt und bis wann sie beim Versicherer sein muss; das Schreiben nennt Versicherungsscheinnummer und Sparte.',
    resume: (h) => `Die meisten Sachversicherungen laufen ein Jahr und verlängern sich dann stillschweigend um ein weiteres Jahr, wenn niemand kündigt. ${h.src('vvg11', '§ 11 VVG')} setzt dafür feste Grenzen: Eine Verlängerung um mehr als ein Jahr ist unwirksam, und die Kündigungsfrist muss für beide Seiten gleich sein, mindestens ein und höchstens drei Monate vor Ablauf. Endet Ihr Versicherungsjahr am ${h.date('2026-12-31')} und sieht der Vertrag drei Monate Frist vor, muss die Kündigung bis zum ${h.date(v(h, '2026-09-15', 3).spaetesterZugang)} ankommen; bei einem Monat reicht der ${h.date(v(h, '2026-09-15', 1).spaetesterZugang)}. Kommt sie bei drei Monaten am ${h.date('2026-10-05')} an, endet der Vertrag erst am ${h.date(v(h, '2026-10-05', 3).ende)}. Wer einen Vertrag über mehr als drei Jahre geschlossen hat, kann nach § 11 Abs. 4 VVG trotzdem zum Ende des dritten Jahres mit drei Monaten Frist kündigen. Den Ablauf finden Sie im Versicherungsschein oder auf der letzten Beitragsrechnung.`,
    faqs: (h) => [
      { q: 'Wann muss ich meine Versicherung spätestens kündigen?', a: `Spätestens so, dass die Frist laut Vertrag vor dem Ablauf endet, meist drei Monate oder einen Monat vorher. Bei Ablauf am ${h.date('2026-12-31')} und drei Monaten Frist ist der letzte sichere Tag der ${h.date(v(h, '2026-09-15', 3).spaetesterZugang)}. Entscheidend ist der Zugang beim Versicherer, nicht das Datum des Briefes.` },
      { q: 'Kann ich nach einem Schaden kündigen?', a: 'Ja, bei vielen Versicherungen gibt das Gesetz beiden Seiten nach einem Versicherungsfall ein Sonderkündigungsrecht, zum Beispiel in der Haftpflicht- und der Sachversicherung. Die Kündigung muss dann innerhalb eines Monats nach Abschluss der Verhandlungen über den Schaden erklärt werden. Der Rechner bildet nur die ordentliche Kündigung zum Ablauf ab.' },
      { q: 'Reicht eine E-Mail für die Kündigung einer Versicherung?', a: 'In den meisten Fällen ja. Allgemeine Versicherungsbedingungen dürfen für Kündigungen keine strengere Form als die Textform verlangen (§ 309 Nr. 13 BGB), sodass E-Mail oder Fax genügen. Bestehen Sie auf einer Bestätigung mit dem Ablaufdatum, damit später kein Streit über den Zugang entsteht.' },
      { q: 'Wann endet eine Kfz-Versicherung?', a: 'Viele Kfz-Versicherungen laufen auf das Kalenderjahr und haben einen Monat Frist, sodass die Kündigung bis zum 30. November beim Versicherer sein muss. Maßgeblich ist aber Ihr Vertrag; tragen Sie Ablauf und Frist aus dem Versicherungsschein ein. Beim Verkauf des Autos geht die Versicherung auf den Käufer über, und beide dürfen dann kündigen.' },
    ],
    body: (h) => `<h2>Kündigung Versicherung: Ablauf und Frist</h2>
<p>Der Rechner sucht den nächsten Ablauf nach dem Zugang und prüft, ob die Frist bis dahin reicht. Reicht sie nicht, rückt das Ende um ein Versicherungsjahr. Eine Frist unter einem oder über drei Monaten stellt er auf die Grenze des ${h.src('vvg11', '§ 11 Abs. 3 VVG')} um und weist darauf hin.</p>
${h.table(['Kündigung kommt an', 'Frist 1 Monat: Ende', 'Frist 3 Monate: Ende'], ['2026-09-15', '2026-10-05', '2026-12-10'].map((z) => [h.date(z), h.date(v(h, z, 1).ende), h.date(v(h, z, 3).ende)]), 'Versicherungsjahr endet am 31. Dezember', ['l', 'l', 'l'])}
<h2>Was nicht unter diese Vorlage fällt</h2>
<p>Lebens- und Rentenversicherungen, private Krankenversicherung und Pflegeversicherung haben eigene Regeln, und bei der Krankenversicherung muss eine Anschlussversicherung nachgewiesen werden. Für sie ist dieses Schreiben nicht gedacht. Verkaufen Sie ein Auto, gehört der Hinweis auf die Versicherung in den ${h.a('kfz-kaufvertrag', 'Kaufvertrag für das Auto')}; andere laufende Verträge wie ${h.a('fitnessstudio', 'das Fitnessstudio')} haben ihre eigenen Fristen.</p>`,
  },
  en: {
    slug: 'cancel-insurance-policy',
    nav: 'Cancel insurance',
    card: 'Cancel German liability, contents, car and other insurance: expiry under section 11 VVG, letter to print.',
    title: 'Cancel a German insurance policy: deadline and letter',
    description: 'Cancel a German insurance policy such as liability, contents or car cover: end of the insurance year and the latest receipt date under section 11 VVG, as PDF.',
    h1: 'Cancel a German insurance policy on time',
    intro: 'To cancel a German insurance policy, enter the end of the insurance year and the notice period: the tool shows which expiry your notice reaches and by when the insurer must have it.',
    resume: (h) => `Most German property and liability policies run for a year and then renew tacitly for another year unless someone cancels. ${h.src('vvg11', 'Section 11 VVG')} sets firm limits: a renewal for more than one year is void, and the notice period must be the same for both sides, at least one and at most three months before expiry. If your insurance year ends on ${h.date('2026-12-31')} and the policy has three months’ notice, the cancellation must arrive by ${h.date(v(h, '2026-09-15', 3).spaetesterZugang)}; with one month, ${h.date(v(h, '2026-09-15', 1).spaetesterZugang)} is enough. If it arrives on ${h.date('2026-10-05')} with three months’ notice, the policy only ends on ${h.date(v(h, '2026-10-05', 3).ende)}. A policy taken out for more than three years can still be cancelled at the end of the third year on three months’ notice (section 11(4) VVG). The expiry date is on your policy schedule or the last premium notice. The letter prints in German.`,
    faqs: (h) => [
      { q: 'By when must I cancel my German insurance?', a: `Early enough for the contractual notice to run before expiry, usually three months or one month. With expiry on ${h.date('2026-12-31')} and three months’ notice, the last safe day is ${h.date(v(h, '2026-09-15', 3).spaetesterZugang)}. What counts is receipt by the insurer, not the date on your letter.` },
      { q: 'Can I cancel after a claim?', a: 'Yes, for many kinds of cover the law gives both sides a special right to cancel after an insured event, for example in liability and property insurance. That cancellation must be made within one month after the claim has been settled. The calculator covers only ordinary cancellation at expiry.' },
      { q: 'Is an email enough to cancel German insurance?', a: 'In most cases yes. Standard policy terms may not require a stricter form than text form for cancellations (section 309 no. 13 BGB), so email or fax will do. Insist on a confirmation stating the end date, so that there is no dispute about receipt later on.' },
    ],
    body: (h) => `<h2>Cancelling a German insurance policy: expiry and notice</h2>
<p>The calculator looks for the next expiry after receipt and checks whether the notice period fits before it. If not, the end moves on by one insurance year. A period under one or over three months is set to the limit in ${h.src('vvg11', 'section 11(3) VVG')}, with a warning.</p>
${h.table(['Notice arrives', '1 month’s notice: ends', '3 months’ notice: ends'], ['2026-09-15', '2026-10-05', '2026-12-10'].map((z) => [h.date(z), h.date(v(h, z, 1).ende), h.date(v(h, z, 3).ende)]), 'Insurance year ends on 31 December', ['l', 'l', 'l'])}
<h2>What this template does not cover</h2>
<p>Life and pension policies, private health and long-term care insurance have their own rules, and for health insurance proof of follow-on cover is required. This letter is not meant for them. Many car policies run on the calendar year with one month’s notice, so cancellation must arrive by 30 November; check your schedule. When selling a car, the insurance passes to the buyer, which belongs in the ${h.a('kfz-kaufvertrag', 'car sale contract')}; other running contracts such as ${h.a('fitnessstudio', 'a gym membership')} have their own periods.</p>`,
  },
});
