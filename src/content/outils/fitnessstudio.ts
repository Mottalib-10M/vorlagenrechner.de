import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Fitnessstudio : § 309 Nr. 9 BGB (seit 1. März 2022), Art. 229 § 60 EGBGB, § 314 (wichtiger Grund) nicht gerechnet. */
const neu = (h: Helpers, zugang: string) => h.M.vertrag({ beginn: '2025-04-01', laufzeit: 12, abschluss: '2025-04-01', zugang, frist: 1, verlaengerung: 12 });
const alt = (h: Helpers, zugang: string) => h.M.vertrag({ beginn: '2021-04-01', laufzeit: 24, abschluss: '2021-04-01', zugang, frist: 3, verlaengerung: 12 });

export default defineGuide({
  id: 'fitnessstudio',
  group: 'kuendigen',
  order: 2,
  doc: 'fitness',
  related: ['handyvertrag', 'versicherung', 'mahnung'],
  sources: ['bgb309', 'egbgb229', 'bgb312k', 'bgb130'],
  de: {
    slug: 'kuendigung-fitnessstudio',
    nav: 'Fitnessstudio kündigen',
    card: 'Mitgliedschaft im Fitnessstudio kündigen: Ende nach neuem und altem Recht, Schreiben zum Drucken.',
    title: 'Kündigung Fitnessstudio Vorlage: Ende nach § 309 BGB',
    description: 'Kündigung Fitnessstudio Vorlage: Ende der Mitgliedschaft nach § 309 Nr. 9 BGB berechnet, monatlich kündbar nach der Laufzeit, Altverträge vor März 2022 extra.',
    h1: 'Kündigung Fitnessstudio Vorlage mit Vertragsende',
    intro: 'Diese Kündigung Fitnessstudio Vorlage rechnet aus, wann Ihre Mitgliedschaft endet, und unterscheidet Verträge ab dem 1. März 2022 von älteren Verträgen mit Verlängerung um ein Jahr.',
    resume: (h) => `Seit dem 1. März 2022 gilt für neue Verträge über regelmäßige Leistungen, zu denen Fitnessstudios gehören, eine verbraucherfreundliche Regel (${h.src('bgb309', '§ 309 Nr. 9 BGB')}): höchstens zwei Jahre Erstlaufzeit, danach keine Verlängerung um ein ganzes Jahr mehr, sondern eine Mitgliedschaft auf unbestimmte Zeit, die mit höchstens einem Monat Frist kündbar ist. Eine Mitgliedschaft ab dem ${h.date('2025-04-01')} über zwölf Monate endet bei Zugang bis zum ${h.date(neu(h, '2026-02-15').spaetesterZugang)} am ${h.date(neu(h, '2026-02-15').erstEnde)}; eine Kündigung vom ${h.date('2027-02-10')} wirkt zum ${h.date(neu(h, '2027-02-10').ende)}. Für Verträge, die vor dem 1. März 2022 geschlossen wurden, gilt nach ${h.src('egbgb229', 'Art. 229 § 60 EGBGB')} das alte Recht: Verlängerung um bis zu ein Jahr und Kündigungsfrist bis zu drei Monaten. Ein Altvertrag vom April 2021 mit drei Monaten Frist, der am ${h.date('2027-02-10')} gekündigt wird, läuft deshalb bis zum ${h.date(alt(h, '2027-02-10').ende)}. Die Vorlage erkennt den Fall am Beginn des Vertrags.`,
    faqs: (h) => [
      { q: 'Kann ich mein Fitnessstudio monatlich kündigen?', a: `Wenn der Vertrag ab dem 1. März 2022 geschlossen wurde und die Erstlaufzeit vorbei ist, ja: höchstens ein Monat Frist zu jedem Tag. Eine Kündigung, die am ${h.date('2027-02-10')} ankommt, beendet eine solche Mitgliedschaft am ${h.date(neu(h, '2027-02-10').ende)}. Während der Erstlaufzeit gilt die vereinbarte Frist zum Ende der Laufzeit.` },
      { q: 'Muss ich im Fitnessstudio persönlich kündigen?', a: 'Nein. Klauseln, die eine strengere Form als die Textform verlangen oder eine Kündigung nur an der Theke zulassen, sind unwirksam (§ 309 Nr. 13 BGB). Eine E-Mail genügt. Hat das Studio online Verträge abgeschlossen, muss es zusätzlich einen Kündigungsbutton auf der Website anbieten (§ 312k BGB).' },
      { q: 'Kann ich wegen Krankheit oder Umzug sofort kündigen?', a: 'Eine dauerhafte Krankheit, die das Training unmöglich macht, ist ein wichtiger Grund für eine Kündigung ohne Frist; ein Attest ohne Diagnose reicht meist als Nachweis. Ein Umzug allein ist nach der Rechtsprechung kein wichtiger Grund. Der Rechner bildet nur die ordentliche Kündigung ab; den Grund ergänzen Sie dann im Schreiben.' },
    ],
    body: (h) => `<h2>Kündigung Fitnessstudio: neues und altes Recht</h2>
<p>Maßgeblich ist der Tag des Vertragsschlusses. Der Rechner nimmt dafür den Beginn der Mitgliedschaft; liegen Unterschrift und Beginn weit auseinander, tragen Sie den Tag der Unterschrift als Beginn ein.</p>
${h.table(['Kündigung kommt an', 'Vertrag ab April 2025 (12 Monate, 1 Monat Frist)', 'Alter Vertrag, vor März 2022: ab April 2021 (24 Monate, 3 Monate Frist)'], ['2026-02-15', '2026-06-20', '2027-02-10'].map((z) => [h.date(z), h.date(neu(h, z).ende), h.date(alt(h, z).ende)]), 'Rechenbeispiele', ['l', 'l', 'l'])}
<h2>Ruhezeiten, Gebühren und Lastschrift</h2>
<p>Ein vereinbartes Ruhen der Mitgliedschaft, etwa während einer Schwangerschaft, verlängert die Laufzeit nur, wenn der Vertrag das ausdrücklich so regelt. Eine Gebühr für die Kündigung ist nicht vorgesehen. Das Schreiben widerruft das Lastschriftmandat zum Vertragsende; bucht das Studio danach noch ab, können Sie die Lastschrift bei Ihrer Bank zurückgeben. Fordert ein Studio trotz wirksamer Kündigung weiter Beiträge, hilft eine schriftliche Antwort mit dem errechneten Ende; ähnlich funktioniert der ${h.a('handyvertrag', 'Handyvertrag')}.</p>`,
  },
  en: {
    slug: 'cancel-gym-membership',
    nav: 'Cancel gym membership',
    card: 'Cancel a German gym membership: end date under new and old rules, letter to print.',
    title: 'Cancel a German gym membership: end date and letter',
    description: 'Cancel a German gym membership: the end date under section 309 no. 9 BGB, monthly notice after the first term, contracts from before March 2022 handled apart.',
    h1: 'Cancel a German gym membership with the right end date',
    intro: 'To cancel a German gym membership, enter the start, term and notice period: the tool tells contracts signed from 1 March 2022 apart from older ones that renew for a year.',
    resume: (h) => `Since 1 March 2022, new contracts for recurring services, which include gyms, follow a consumer-friendly rule (${h.src('bgb309', 'section 309 no. 9 BGB')}): at most two years of initial term, then no more renewal for a whole year but an open-ended membership that can be cancelled on at most one month’s notice. A twelve-month membership from ${h.date('2025-04-01')} ends on ${h.date(neu(h, '2026-02-15').erstEnde)} if notice arrives by ${h.date(neu(h, '2026-02-15').spaetesterZugang)}; a cancellation of ${h.date('2027-02-10')} takes effect on ${h.date(neu(h, '2027-02-10').ende)}. Contracts signed before 1 March 2022 stay under the old rules (${h.src('egbgb229', 'article 229 section 60 EGBGB')}): renewal for up to a year and up to three months’ notice. An older contract from April 2021 with three months’ notice, cancelled on ${h.date('2027-02-10')}, therefore runs until ${h.date(alt(h, '2027-02-10').ende)}. The template detects the case from the start date and prints the letter in German.`,
    faqs: (h) => [
      { q: 'Can I cancel my German gym membership monthly?', a: `If the contract was signed on or after 1 March 2022 and the initial term is over, yes: at most one month’s notice, to any day. A cancellation that arrives on ${h.date('2027-02-10')} ends such a membership on ${h.date(neu(h, '2027-02-10').ende)}. During the initial term the agreed notice to the end of that term applies.` },
      { q: 'Do I have to cancel at the gym in person?', a: 'No. Clauses that demand a stricter form than text form, or allow cancellation only at the front desk, are void (section 309 no. 13 BGB). An email is enough. If the gym sells memberships online, it must also offer a cancellation button on its website (section 312k BGB), which must confirm receipt at once.' },
      { q: 'Can I cancel at once because of illness or a move?', a: 'A lasting illness that makes training impossible is good cause for cancellation without notice; a doctor’s note without a diagnosis usually serves as proof. A move alone is not good cause according to the courts. The calculator covers only ordinary notice; add the reason to the letter yourself in that case.' },
    ],
    body: (h) => `<h2>Cancelling a German gym membership: new and old rules</h2>
<p>What matters is the day the contract was signed. The calculator uses the start of the membership; if signing and start are far apart, enter the signing day as the start.</p>
${h.table(['Notice arrives', 'Contract from April 2025 (12 months, 1 month’s notice)', 'Older contract from April 2021 (24 months, 3 months’ notice)'], ['2026-02-15', '2026-06-20', '2027-02-10'].map((z) => [h.date(z), h.date(neu(h, z).ende), h.date(alt(h, z).ende)]), 'Worked examples', ['l', 'l', 'l'])}
<h2>Pauses, fees and direct debit</h2>
<p>An agreed pause, for example during pregnancy, extends the term only if the contract says so expressly. There is no fee for cancelling. The letter revokes the direct debit mandate from the end date; if the gym still collects afterwards, your bank can reverse the debit. If a gym keeps billing after a valid cancellation, a written reply quoting the calculated end usually settles it; the ${h.a('handyvertrag', 'mobile contract')} page works the same way.</p>`,
  },
});
