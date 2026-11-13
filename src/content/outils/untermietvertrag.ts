import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Untermiete eines Zimmers : §§ 540, 553, 546 Abs. 2, 549 Abs. 2 Nr. 2, 573c BGB. */
const moebl = (h: Helpers) => h.M.miete({ zugang: '2027-03-10', land: 'BE', wer: 'mieter', moebliert: true });
const normal = (h: Helpers) => h.M.miete({ zugang: '2027-03-10', land: 'BE', wer: 'mieter' });

export default defineGuide({
  id: 'untermietvertrag',
  group: 'wohnen',
  order: 2,
  doc: 'untermiete',
  related: ['wg-zimmer', 'mietvertrag', 'kuendigung-mietvertrag'],
  sources: ['bgb540', 'bgb553', 'bgb549', 'bgb573c', 'bgb551', 'bgb546'],
  de: {
    slug: 'untermietvertrag',
    nav: 'Untermietvertrag',
    card: 'Zimmer untervermieten: Vertrag mit Erlaubnis des Vermieters und der richtigen Kündigungsfrist.',
    title: 'Untermietvertrag Vorlage: Zimmer, mit Kündigungsfrist',
    description: 'Untermietvertrag Vorlage für ein Zimmer: Angaben eintragen, Kündigungsfrist je nach möbliert oder nicht berechnet, Erlaubnis nach § 540 BGB, als PDF drucken.',
    h1: 'Untermietvertrag Vorlage für ein Zimmer',
    intro: 'Mit dieser Untermietvertrag Vorlage vermieten Sie ein Zimmer Ihrer Wohnung weiter; sie zeigt, welche Kündigungsfrist für Ihren Fall gilt und bis wann eine Kündigung ankommen muss.',
    resume: (h) => `Wer als Mieter ein Zimmer weitervermietet, wird selbst zum Vermieter: Der Untermietvertrag läuft nur zwischen Hauptmieter und Untermieter, der Eigentümer ist nicht Vertragspartei. Er muss aber zustimmen. Ohne seine Erlaubnis ist die Untervermietung nach ${h.src('bgb540', '§ 540 BGB')} nicht erlaubt; einen Anspruch auf die Erlaubnis gibt ${h.src('bgb553', '§ 553 BGB')}, wenn nach Abschluss des Mietvertrags ein berechtigtes Interesse entsteht, etwa ein Auszug des Partners oder ein Auslandsjahr. Entscheidend für die Frist ist, ob der Hauptmieter selbst in der Wohnung lebt und das Zimmer überwiegend eingerichtet hat. Dann gilt der kurze Weg: Eine Kündigung, die am 10. März 2027 ankommt, beendet die Untermiete am ${h.date(moebl(h).ende)}. Ist das Zimmer leer vermietet, gelten drei Monate wie bei einer Wohnung, und dieselbe Kündigung wirkt erst zum ${h.date(normal(h).ende)}. Die Vorlage wählt den passenden Paragrafen selbst.`,
    faqs: (h) => [
      { q: 'Brauche ich für einen Untermietvertrag die Erlaubnis des Vermieters?', a: 'Ja. Nach § 540 BGB darf der Mieter die Wohnung oder einen Teil davon nur mit Erlaubnis des Vermieters einem Dritten überlassen. Für einen Teil der Wohnung, etwa ein Zimmer, besteht nach § 553 BGB ein Anspruch auf die Erlaubnis, wenn ein berechtigtes Interesse nach Vertragsschluss entstanden ist. Ohne Erlaubnis riskiert der Hauptmieter eine Abmahnung und im Wiederholungsfall die Kündigung.' },
      { q: 'Welche Kündigungsfrist gilt für einen Untermieter?', a: `Lebt der Hauptmieter selbst in der Wohnung und hat er das Zimmer überwiegend möbliert, kann jede Seite bis zum 15. eines Monats zum Monatsende kündigen; der Untermieter hat dann keinen Kündigungsschutz (§ 549 Abs. 2 Nr. 2 BGB). Sonst gilt § 573c Abs. 1 BGB: Zugang bis zum dritten Werktag, Ende nach Ablauf des übernächsten Monats. Für einen Brief vom 10. März 2027 heißt das ${h.date(normal(h).ende)}.` },
      { q: 'Was passiert mit dem Untermieter, wenn der Hauptmietvertrag endet?', a: 'Endet das Hauptmietverhältnis, kann der Eigentümer das Zimmer nach § 546 Abs. 2 BGB auch vom Untermieter zurückverlangen, selbst wenn der Untermietvertrag noch läuft. Der Untermieter hat dann nur Ansprüche gegen den Hauptmieter. Die Vorlage weist im Vertrag ausdrücklich darauf hin, damit niemand überrascht wird.' },
      { q: 'Darf ich als Hauptmieter mehr verlangen, als ich selbst zahle?', a: 'Einen Aufschlag für Möbel, Strom und Internet zu nehmen ist üblich. Liegt die Wohnung in einem Gebiet mit Mietpreisbremse, gilt die Begrenzung aber auch für die Untermiete, und ein deutlicher Gewinn kann dem Vermieter einen Grund für die Kündigung geben. Wer fair bleibt, rechnet den Anteil am besten nach Fläche aus, wie es der WG-Rechner tut.' },
    ],
    body: (h) => `<h2>Was im Untermietvertrag stehen sollte</h2>
<p>Die Vorlage hat sechs kurze Paragrafen: das Zimmer und die gemeinsam genutzten Räume, die Erlaubnis des Vermieters, Mietzeit und Kündigung, eine Pauschalmiete einschließlich Heizung, Wasser und Strom, die Kaution in bis zu drei Raten und die Regeln des Zusammenlebens. Mit einer Pauschale entfällt die jährliche Nebenkostenabrechnung zwischen Ihnen und dem Untermieter.</p>
${h.table(['Fall', 'Kündigung kommt an', 'Untermiete endet'], [['möbliert, Hauptmieter wohnt dort', h.date('2027-03-10'), h.date(moebl(h).ende)], ['leer oder Hauptmieter wohnt nicht dort', h.date('2027-03-10'), h.date(normal(h).ende)]], 'Beispiel aus dem Rechner, Land Berlin', ['l', 'l', 'l'])}
<h2>Die Frist im Untermietvertrag richtig wählen</h2>
<p>Die kurze Frist des ${h.src('bgb573c', '§ 573c Abs. 3 BGB')} gilt nur, wenn beide Bedingungen erfüllt sind: Das Zimmer gehört zu der Wohnung, die der Hauptmieter selbst bewohnt, und er hat es überwiegend mit eigenen Möbeln eingerichtet. Fehlt eine davon, hat der Untermieter den vollen Schutz eines Mieters, und eine Kündigung durch den Hauptmieter braucht ein berechtigtes Interesse. Ziehen Sie selbst aus und überlassen die ganze Wohnung, ist das keine Untermiete eines Zimmers mehr; dafür reicht diese Vorlage nicht.</p>
<p>Kaution und Zahlungstag folgen den Regeln für Wohnraum (${h.src('bgb551', '§ 551 BGB')}). Lebt die Wohnung als echte Wohngemeinschaft mit gleichberechtigten Bewohnern, passt der ${h.a('wg-zimmer', 'WG-Zimmer-Vertrag')} besser; der eigene ${h.a('mietvertrag', 'Mietvertrag')} mit dem Vermieter bleibt davon unberührt.</p>`,
  },
  en: {
    slug: 'sublease-agreement',
    nav: 'Sublease agreement',
    card: 'Sublet a room in Germany: agreement with the landlord’s consent and the right notice period.',
    title: 'Sublease agreement for a room: German template and notice',
    description: 'Sublease agreement template for a room in Germany: enter the details, the notice period is worked out for furnished or empty rooms, print the text as PDF.',
    h1: 'German sublease agreement for a room',
    intro: 'This German sublease agreement lets you rent out a room in your flat (Untermietvertrag); it also shows which notice period applies to your case and by when a notice must arrive.',
    resume: (h) => `A tenant who sublets a room becomes a landlord himself: the German sublease agreement (Untermietvertrag) binds only the main tenant and the subtenant, and the owner is not a party. The owner must still consent. Without permission, subletting is not allowed under ${h.src('bgb540', 'section 540 BGB')}; ${h.src('bgb553', 'section 553 BGB')} gives the tenant a right to consent for part of the flat if a legitimate interest arises after the lease was signed, such as a partner moving out or a year abroad. The notice period depends on whether the main tenant lives in the flat and furnished the room. If both are true, the short rule applies: a notice that arrives on 10 March 2027 ends the sublet on ${h.date(moebl(h).ende)}. If the room is let empty, three months apply as for a flat, and the same notice only takes effect on ${h.date(normal(h).ende)}. The template picks the right section for you and prints the agreement in German.`,
    faqs: (h) => [
      { q: 'Do I need my landlord’s permission to sublet a room in Germany?', a: 'Yes. Section 540 BGB allows a tenant to let the flat or part of it to a third party only with the landlord’s permission. For part of the flat, such as one room, section 553 BGB gives a right to that permission when a legitimate interest arose after the lease was signed. Subletting without permission can lead to a formal warning and, if repeated, to termination.' },
      { q: 'What notice period applies to a subtenant?', a: `If the main tenant lives in the flat and mostly furnished the room, either side may give notice by the 15th of a month to the end of that month, and the subtenant has no protection against eviction (section 549(2) no. 2 BGB). Otherwise section 573c(1) BGB applies: received by the third working day, ending after the month after next. For a letter arriving on 10 March 2027 that means ${h.date(normal(h).ende)}.` },
      { q: 'What happens to the subtenant when the main lease ends?', a: 'When the main tenancy ends, the owner can claim the room back from the subtenant too, under section 546(2) BGB, even if the sublease is still running. The subtenant then only has claims against the main tenant. The template says so in the agreement itself so that nobody is caught out.' },
    ],
    body: (h) => `<h2>What a German sublease agreement should contain</h2>
<p>The template has six short clauses: the room and the shared areas, the landlord’s consent, term and notice, an all-in rent covering heating, water and electricity, a deposit in up to three instalments, and house rules. With an all-in rent there is no yearly service-charge statement between you and the subtenant. Labels are in English; the agreement prints in German, which is what a landlord or a court will read.</p>
${h.table(['Case', 'Notice arrives', 'Sublet ends'], [['furnished, main tenant lives there', h.date('2027-03-10'), h.date(moebl(h).ende)], ['empty, or main tenant lives elsewhere', h.date('2027-03-10'), h.date(normal(h).ende)]], 'Example from the calculator, state of Berlin', ['l', 'l', 'l'])}
<h2>Choosing the right notice period</h2>
<p>The short period in ${h.src('bgb573c', 'section 573c(3) BGB')} applies only if both conditions are met: the room is part of the flat the main tenant lives in, and he furnished it mostly with his own furniture. If either is missing, the subtenant has the full protection of a tenant, and a notice from the main tenant needs a legitimate reason. If you move out and hand over the whole flat, that is no longer a room sublet and this template is not enough.</p>
<p>Deposit and payment day follow the rules for housing (${h.src('bgb551', 'section 551 BGB')}). If the flat is a real flatshare with equal members, the ${h.a('wg-zimmer', 'flatshare room agreement')} fits better; your own ${h.a('mietvertrag', 'lease')} with the landlord is not affected.</p>`,
  },
});
