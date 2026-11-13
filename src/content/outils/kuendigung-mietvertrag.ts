import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Kündigung durch den Mieter : § 568 (Schriftform), § 573c (Fristen), § 193 nicht anwendbar auf den Zugang. */
const m = (h: Helpers, zugang: string) => h.M.miete({ zugang, land: 'BE', wer: 'mieter' });
const vm = (h: Helpers, ueberlassung: string) => h.M.miete({ zugang: '2027-02-03', land: 'BE', wer: 'vermieter', ueberlassung });

export default defineGuide({
  id: 'kuendigung-mietvertrag',
  group: 'wohnen',
  order: 4,
  doc: 'kuendigungMiete',
  related: ['mietvertrag', 'untermietvertrag', 'vollmacht'],
  sources: ['bgb568', 'bgb573c', 'bgb549', 'bgb130', 'bgb126', 'bghSamstag', 'bgb551'],
  de: {
    slug: 'kuendigung-mietvertrag',
    nav: 'Kündigung Mietvertrag',
    card: 'Kündigung der Wohnung als Mieter: Ende auf den Tag, Stichtag dritter Werktag, Brief zum Drucken.',
    title: 'Kündigung Mietvertrag Vorlage: Mieter, Frist berechnet',
    description: 'Kündigung Mietvertrag Vorlage für Mieter: Frist von drei Monaten auf den Tag berechnet, dritter Werktag mit Samstag und Feiertagen Ihres Landes, Brief als PDF.',
    h1: 'Kündigung Mietvertrag Vorlage für Mieter',
    intro: 'Mit dieser Kündigung Mietvertrag Vorlage sehen Sie, an welchem Tag Ihr Mietverhältnis endet und bis wann der Brief beim Vermieter sein muss; der fertige Brief nennt das Datum.',
    resume: (h) => `Als Mieter kündigen Sie eine Wohnung ohne Grund mit drei Monaten Frist. Die Kündigung muss spätestens am dritten Werktag eines Monats beim Vermieter ankommen, dann endet das Mietverhältnis mit Ablauf des übernächsten Monats (${h.src('bgb573c', '§ 573c Abs. 1 BGB')}). Der Samstag zählt dabei als Werktag, so der Bundesgerichtshof in VIII ZR 206/04; Sonntage und Feiertage zählen nicht. Kommt Ihr Brief am ${h.date('2027-02-03')} an, ist das rechtzeitig, und die Wohnung ist zum ${h.date(m(h, '2027-02-03').ende)} gekündigt. Kommt er einen Tag später, verschiebt sich das Ende auf den ${h.date(m(h, '2027-02-04').ende)}: Ein Tag kostet eine Monatsmiete. Im Mai 2027 liegt der Stichtag wegen des Feiertags am 1. Mai erst am ${h.date(m(h, '2027-05-01').stichtag)}. Die Kündigung braucht die Schriftform (${h.src('bgb568', '§ 568 BGB')}): Papier mit eigenhändiger Unterschrift aller Mieter, die im Vertrag stehen. E-Mail, Fax oder Foto reichen nicht.`,
    faqs: (h) => [
      { q: 'Wie lange ist die Kündigungsfrist für Mieter?', a: `Drei Monate, egal wie lange Sie schon dort wohnen. Die längeren Fristen von sechs und neun Monaten gelten nur für den Vermieter, nach fünf und acht Jahren Mietdauer. Eine Kündigung, die bis zum dritten Werktag ankommt, wirkt zum Ende des übernächsten Monats, zum Beispiel vom ${h.date('2027-02-03')} zum ${h.date(m(h, '2027-02-03').ende)}.` },
      { q: 'Kann ich meinen Mietvertrag per E-Mail kündigen?', a: 'Nein. § 568 BGB verlangt die schriftliche Form, also ein Papier mit Ihrer eigenhändigen Unterschrift. Eine E-Mail, ein Fax oder ein eingescanntes Schreiben ist unwirksam, auch wenn der Vermieter antwortet. Stehen zwei Mieter im Vertrag, unterschreiben beide denselben Brief; die Vorlage hat dafür eine zweite Zeile.' },
      { q: 'Wie beweise ich, dass die Kündigung rechtzeitig ankam?', a: 'Entscheidend ist der Zugang beim Vermieter, nicht das Absenden (§ 130 BGB). Am sichersten ist die persönliche Übergabe mit einem Zeugen, der den Inhalt gelesen hat, oder ein Bote. Ein Einwurf-Einschreiben belegt den Einwurf in den Briefkasten, nicht den Inhalt. Schicken Sie den Brief daher einige Tage vor dem Stichtag.' },
      { q: 'Muss ich einen Nachmieter stellen, um früher auszuziehen?', a: 'Ein Recht, mit Nachmieter früher aus dem Vertrag zu kommen, gibt das Gesetz nicht. Viele Vermieter lassen sich darauf ein, oft gegen einen Aufhebungsvertrag. Steht im Mietvertrag eine Nachmieterklausel, gilt sie. Sonst bleibt es bei drei Monaten, und die Miete ist bis zum Ende zu zahlen, auch wenn Sie früher ausziehen.' },
    ],
    body: (h) => `<h2>Kündigung Mietvertrag: der Stichtag im Kalender</h2>
<p>Der dritte Werktag verschiebt sich mit Wochenenden und Feiertagen. Der Rechner kennt die landesweiten Feiertage aller 16 Länder, damit der Stichtag stimmt; regionale Feiertage einzelner Gemeinden wie Fronleichnam in Teilen Sachsens oder Mariä Himmelfahrt in Teilen Bayerns sind nicht eingerechnet. Fällt der dritte Werktag auf einen Samstag, wie im April 2027, rechnet der Rechner vorsichtig mit diesem Samstag: Ob sich die Frist dann nach § 193 BGB auf den Montag verschiebt, hat der Bundesgerichtshof in VIII ZR 206/04 ausdrücklich offengelassen.</p>
${h.table(['Kündigung kommt an', 'Stichtag dieses Monats', 'Mietende'], ['2027-02-03', '2027-02-04', '2027-04-01', '2027-05-01', '2027-11-03'].map((z) => [h.date(z), h.date(m(h, z).stichtag), h.date(m(h, z).ende)]), 'Mieter in Berlin, Rechenbeispiele', ['l', 'l', 'l'])}
<h2>Fristen des Vermieters zum Vergleich</h2>
<p>Kündigt der Vermieter, braucht er einen Grund, etwa Eigenbedarf, und seine Frist wächst mit der Mietdauer: drei Monate, nach fünf Jahren ${vm(h, '2021-06-01').monate} Monate, nach acht Jahren ${vm(h, '2018-06-01').monate} Monate. Für ein möbliertes Zimmer in der Wohnung des Vermieters gilt die kurze Frist bis zum 15. zum Monatsende (${h.src('bgb549', '§ 549 Abs. 2 BGB')}); der Rechner stellt das um, wenn Sie diesen Wohnungstyp wählen.</p>
<h2>Nach der Kündigung</h2>
<p>Bitten Sie um eine schriftliche Bestätigung und vereinbaren Sie die Übergabe der Wohnung mit Protokoll. Die Kaution steht Ihnen nach Abrechnung zu, mit Zinsen (${h.src('bgb551', '§ 551 BGB')}); der Vermieter darf eine angemessene Zeit für die Prüfung behalten. Können Sie den Brief nicht selbst unterschreiben, hilft eine ${h.a('vollmacht', 'Vollmacht')}, die im Original beiliegen muss.</p>`,
  },
  en: {
    slug: 'give-notice-on-a-tenancy',
    nav: 'Tenancy notice',
    card: 'Give notice on a German flat as a tenant: end date to the day, third-working-day deadline, letter to print.',
    title: 'Give notice on a German tenancy: letter and end date',
    description: 'Give notice on a German tenancy as a tenant: the three-month period worked out to the day, third working day with Saturdays and state holidays, letter as PDF.',
    h1: 'Give notice on a German tenancy as a tenant',
    intro: 'To give notice on a German tenancy, enter the day the landlord will receive your letter: the tool shows the end date and the deadline, and the letter (Kündigung) states that date.',
    resume: (h) => `As a tenant in Germany you can end a lease without a reason on three months’ notice. The notice must reach the landlord by the third working day of a month, and the tenancy then ends at the close of the month after next (${h.src('bgb573c', 'section 573c(1) BGB')}). Saturday counts as a working day, as the Federal Court of Justice held in VIII ZR 206/04; Sundays and public holidays do not. If your letter arrives on ${h.date('2027-02-03')} it is in time and the flat is given up on ${h.date(m(h, '2027-02-03').ende)}. One day later and the end moves to ${h.date(m(h, '2027-02-04').ende)}: a day’s delay costs a month’s rent. In May 2027 the deadline is ${h.date(m(h, '2027-05-01').stichtag)} because 1 May is a holiday. The notice must be in written form (${h.src('bgb568', 'section 568 BGB')}): paper signed by hand by every tenant named in the lease. Email, fax or a photo is not enough. The letter prints in German.`,
    faqs: (h) => [
      { q: 'How much notice does a tenant have to give in Germany?', a: `Three months, however long you have lived there. The longer periods of six and nine months apply only to the landlord, after five and eight years. A notice that arrives by the third working day takes effect at the end of the month after next, for example from ${h.date('2027-02-03')} to ${h.date(m(h, '2027-02-03').ende)}.` },
      { q: 'Can I give notice on my German lease by email?', a: 'No. Section 568 BGB requires written form, meaning paper with your own handwritten signature. Email, fax or a scanned letter is void even if the landlord replies. If two tenants are named in the lease, both sign the same letter; the template has a second line for that.' },
      { q: 'How do I prove the notice arrived in time?', a: 'What counts is receipt by the landlord, not posting (section 130 BGB). The safest way is to hand it over in person with a witness who has read it, or to use a courier. A registered letter of the Einwurf type proves it went into the letterbox, not what it contained. Send it several days before the deadline.' },
    ],
    body: (h) => `<h2>Giving notice on a German tenancy: the deadline in the calendar</h2>
<p>The third working day moves with weekends and public holidays. The tool knows the statewide holidays of all 16 German states so that the deadline is right; local holidays that apply only in some municipalities, such as Corpus Christi in parts of Saxony, are not included. When the third working day is a Saturday, as in April 2027, the tool cautiously keeps that Saturday: whether section 193 BGB then moves the deadline to Monday was expressly left open by the Federal Court of Justice in VIII ZR 206/04.</p>
${h.table(['Notice arrives', 'Deadline that month', 'Tenancy ends'], ['2027-02-03', '2027-02-04', '2027-04-01', '2027-05-01', '2027-11-03'].map((z) => [h.date(z), h.date(m(h, z).stichtag), h.date(m(h, z).ende)]), 'Tenant in Berlin, worked examples', ['l', 'l', 'l'])}
<h2>The landlord’s periods for comparison</h2>
<p>A landlord needs a reason, such as needing the flat for himself, and his period grows with the length of the tenancy: three months, after five years ${vm(h, '2021-06-01').monate} months, after eight years ${vm(h, '2018-06-01').monate} months. A furnished room in the landlord’s own home has the short rule of notice by the 15th to the end of the month (${h.src('bgb549', 'section 549(2) BGB')}); the tool switches to it when you choose that type of home.</p>
<h2>After giving notice</h2>
<p>Ask for written confirmation and arrange a handover with a written report. The deposit is due back with interest after settlement (${h.src('bgb551', 'section 551 BGB')}); the landlord may keep it for a reasonable time to check claims. If you cannot sign yourself, a ${h.a('vollmacht', 'power of attorney')} must be enclosed in the original.</p>`,
  },
});
