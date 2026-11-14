import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Aufhebungsvertrag : § 623 BGB (Schriftform), § 1a KSchG (Faustformel), § 159 SGB III (Sperrzeit). */
const abf = (h: Helpers, gehalt: number, beginn: string) => h.M.abfindung1a(gehalt, beginn, '2027-03-31');

export default defineGuide({
  id: 'aufhebungsvertrag',
  group: 'arbeit',
  order: 3,
  doc: 'aufhebung',
  related: ['kuendigungsfrist', 'kuendigung-arbeitsvertrag'],
  sources: ['bgb623', 'kschg1a', 'sgb3_159', 'bgb622', 'bgb126'],
  de: {
    slug: 'aufhebungsvertrag',
    nav: 'Aufhebungsvertrag',
    card: 'Arbeitsverhältnis im Einvernehmen beenden: Abfindung nach Faustformel, Sperrzeit-Risiko, Vertrag zum Drucken.',
    title: 'Aufhebungsvertrag Vorlage: Abfindung und Sperrzeit prüfen',
    description: 'Aufhebungsvertrag Vorlage für Arbeitnehmer und Arbeitgeber: Abfindung nach Faustformel, Ende gegen die Kündigungsfrist geprüft, Hinweis zur Sperrzeit, als PDF.',
    h1: 'Aufhebungsvertrag Vorlage mit Abfindungsrechner',
    intro: 'Diese Aufhebungsvertrag Vorlage vergleicht Ihre Abfindung mit dem üblichen Richtwert (ein halbes Monatsgehalt je Jahr) und prüft, ob das vereinbarte Ende vor der Kündigungsfrist des Arbeitgebers liegt.',
    resume: (h) => `Mit einem Aufhebungsvertrag beenden Arbeitgeber und Arbeitnehmer das Arbeitsverhältnis gemeinsam, ohne Kündigung und ohne Kündigungsfrist. Er braucht nach ${h.src('bgb623', '§ 623 BGB')} die Schriftform: ein Papier, das beide eigenhändig unterschreiben. Einen gesetzlichen Anspruch auf Abfindung gibt es nicht; als Maßstab dient fast immer die Formel aus ${h.src('kschg1a', '§ 1a KSchG')}, ein halbes Monatsgehalt je Beschäftigungsjahr, wobei mehr als sechs Monate auf ein volles Jahr aufgerundet werden. Bei ${h.eur(4200)} brutto und einem Beginn am ${h.date('2020-09-01')} ergibt das zum ${h.date('2027-03-31')} ${h.num(abf(h, 4200, '2020-09-01').jahre)} Jahre und ${h.eur(abf(h, 4200, '2020-09-01').betrag)}. Das größte Risiko für den Arbeitnehmer ist die Sperrzeit beim Arbeitslosengeld von bis zu zwölf Wochen (${h.src('sgb3_159', '§ 159 SGB III')}): Wer an der Beendigung mitwirkt, muss einen wichtigen Grund haben. Die Vorlage hält deshalb fest, dass der Vertrag eine sonst drohende betriebsbedingte Kündigung vermeidet, und warnt, wenn das Ende vor der Kündigungsfrist liegt.`,
    faqs: (h) => [
      { q: 'Wie hoch ist die Abfindung bei einem Aufhebungsvertrag?', a: `Sie ist frei verhandelbar. Üblich ist die Faustformel des § 1a KSchG: 0,5 Bruttomonatsgehälter für jedes Jahr, Rest über sechs Monate aufgerundet. Bei ${h.eur(3500)} und Beginn im März 2022 sind das zum ${h.date('2027-03-31')} ${h.eur(abf(h, 3500, '2022-03-01').betrag)}. Wer gute Chancen gegen eine Kündigung hätte, kann deutlich mehr verlangen.` },
      { q: 'Bekomme ich nach einem Aufhebungsvertrag eine Sperrzeit?', a: 'Das Risiko besteht, weil Sie an der Beendigung mitwirken. Die Agentur für Arbeit sieht in der Regel keinen Grund für eine Sperrzeit, wenn sonst eine rechtmäßige betriebsbedingte Kündigung zum selben Termin gekommen wäre und die Abfindung im üblichen Rahmen liegt. Ein Ende vor Ablauf der Kündigungsfrist macht die Sperrzeit wahrscheinlicher.' },
      { q: 'Kann ich einen Aufhebungsvertrag widerrufen?', a: 'Ein gesetzliches Widerrufsrecht gibt es nicht, auch wenn der Vertrag zu Hause unterschrieben wurde. Unwirksam kann er sein, wenn er unter Drohung oder durch Täuschung zustande kam, oder wenn der Arbeitgeber das Gebot fairen Verhandelns verletzt hat, etwa durch Überrumpelung. Nehmen Sie den Entwurf deshalb mit und lassen Sie ihn prüfen.' },
      { q: 'Muss ein Aufhebungsvertrag schriftlich sein?', a: 'Ja, § 623 BGB verlangt die Schriftform, die elektronische Form ist ausgeschlossen. Beide Seiten unterschreiben dieselbe Urkunde eigenhändig, oder jede Seite unterschreibt das für die andere bestimmte Exemplar. Ein per E-Mail bestätigter Aufhebungsvertrag ist unwirksam; das Arbeitsverhältnis läuft dann weiter.' },
    ],
    body: (h) => `<h2>Was die Aufhebungsvertrag Vorlage regelt</h2>
<p>Sechs Paragrafen: Beendigung zum vereinbarten Tag und auf wessen Veranlassung, Vergütung und Freistellung mit Anrechnung des Resturlaubs, die Abfindung brutto, ein qualifiziertes Zeugnis mit der vereinbarten Note, Rückgabe der Arbeitsmittel und Arbeitspapiere sowie der Hinweis auf die Meldung bei der Agentur für Arbeit. Klauseln zu Wettbewerbsverbot, Betriebsrente oder Aktienoptionen fehlen; dafür braucht es eine Beratung.</p>
${h.table(['Monatsgehalt', 'Beginn', 'Jahre', 'Faustformel'], ([[3000, '2023-01-01'], [4200, '2020-09-01'], [5500, '2012-04-01']] as Array<[number, string]>).map(([g, b]) => [h.eur(g), h.date(b), h.num(abf(h, g, b).jahre), h.eur(abf(h, g, b).betrag)]), `Ende am ${h.date('2027-03-31')}, 0,5 Gehälter je Jahr`, ['r', 'l', 'r', 'r'])}
<h2>Ende und Kündigungsfrist</h2>
<p>Liegt das vereinbarte Ende vor dem Tag, zu dem der Arbeitgeber frühestens hätte kündigen können, ruht der Anspruch auf Arbeitslosengeld unter Umständen zusätzlich, und die Sperrzeit wird wahrscheinlicher. Der Rechner zeigt deshalb das Ende nach ${h.src('bgb622', '§ 622 BGB')} bei einer Kündigung am Tag der Unterschrift. Wie lange die Frist genau ist, steht im ${h.a('kuendigungsfrist', 'Kündigungsfrist-Rechner')}. Wer ohne Einigung gehen will, nimmt die ${h.a('kuendigung-arbeitsvertrag', 'Vorlage für die eigene Kündigung')}.</p>`,
  },
  en: {
    slug: 'termination-agreement',
    nav: 'Termination agreement',
    card: 'End German employment by mutual agreement: severance rule of thumb, benefit suspension risk, agreement to print.',
    title: 'Termination agreement Germany: severance and benefit risk',
    description: 'Termination agreement template for Germany: severance under the rule of thumb, end date checked against notice, benefit suspension warning, print as PDF.',
    h1: 'German termination agreement with severance calculator',
    intro: 'This German termination agreement template compares your severance with the statutory rule of thumb and checks whether the agreed end falls before the employer’s notice period.',
    resume: (h) => `With a termination agreement (Aufhebungsvertrag) employer and employee end the employment together, with no dismissal and no notice period. Under ${h.src('bgb623', 'section 623 BGB')} it needs written form: a document both sign by hand. There is no statutory right to severance; the benchmark is almost always the formula in ${h.src('kschg1a', 'section 1a KSchG')}, half a month’s pay per year of service, with more than six months rounded up to a full year. With ${h.eur(4200)} gross and a start on ${h.date('2020-09-01')}, an end on ${h.date('2027-03-31')} gives ${h.num(abf(h, 4200, '2020-09-01').jahre)} years and ${h.eur(abf(h, 4200, '2020-09-01').betrag)}. The biggest risk for the employee is a suspension of unemployment benefit of up to twelve weeks (${h.src('sgb3_159', 'section 159 SGB III')}): whoever takes part in ending the job needs a good reason. The template therefore records that the agreement avoids an otherwise impending redundancy dismissal, and warns when the end is before the notice period. The agreement prints in German.`,
    faqs: (h) => [
      { q: 'How much severance is usual in a German termination agreement?', a: `It is negotiable. The usual benchmark is section 1a KSchG: 0.5 gross months’ pay for each year, with more than six months rounded up. With ${h.eur(3500)} and a start in March 2022, an end on ${h.date('2027-03-31')} gives ${h.eur(abf(h, 3500, '2022-03-01').betrag)}. If you would have good chances against a dismissal, you can ask for considerably more.` },
      { q: 'Will a termination agreement suspend my unemployment benefit?', a: 'There is a risk because you take part in ending the job. The employment agency usually sees no ground for a suspension if a lawful redundancy dismissal would otherwise have come on the same date and the severance is within the usual range. An end before the notice period expires makes a suspension more likely.' },
      { q: 'Can I withdraw from a termination agreement?', a: 'There is no statutory right of withdrawal, even if you signed at home. The agreement can be void if it was obtained by threat or deceit, or if the employer breached the duty of fair negotiation, for example by ambushing you. So take the draft away and have it checked before signing.' },
    ],
    body: (h) => `<h2>What the German termination agreement covers</h2>
<p>Six clauses: the end on the agreed date and at whose initiative, pay and garden leave with remaining holiday set off, the gross severance, a full written reference with the agreed grade, return of work equipment and employment papers, and the reminder to register with the employment agency. Non-compete clauses, company pensions and share options are not covered; they need advice.</p>
${h.table(['Monthly pay', 'Start', 'Years', 'Rule of thumb'], ([[3000, '2023-01-01'], [4200, '2020-09-01'], [5500, '2012-04-01']] as Array<[number, string]>).map(([g, b]) => [h.eur(g), h.date(b), h.num(abf(h, g, b).jahre), h.eur(abf(h, g, b).betrag)]), `End on ${h.date('2027-03-31')}, 0.5 months’ pay per year`, ['r', 'l', 'r', 'r'])}
<h2>End date and notice period</h2>
<p>If the agreed end falls before the earliest date on which the employer could have dismissed you, benefit may additionally be put on hold and a suspension becomes more likely. The calculator therefore shows the end under ${h.src('bgb622', 'section 622 BGB')} for a dismissal on the day of signing. The exact period is in the ${h.a('kuendigungsfrist', 'notice period calculator')}. To leave without agreement, use the ${h.a('kuendigung-arbeitsvertrag', 'resignation letter template')}.</p>`,
  },
});
