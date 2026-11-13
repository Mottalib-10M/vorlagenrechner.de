import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Eigenkündigung des Arbeitnehmers : § 622 Abs. 1, 3, 6 BGB, § 623 (Schriftform). */
const an = (h: Helpers, zugang: string, probezeit = false) => h.M.arbeit({ zugang, beginn: '2024-09-01', wer: 'an', probezeit });
const anP = (h: Helpers) => h.M.arbeit({ zugang: '2027-02-10', beginn: '2026-12-01', wer: 'an', probezeit: true });

export default defineGuide({
  id: 'kuendigung-arbeitsvertrag',
  group: 'arbeit',
  order: 1,
  doc: 'kuendigungArbeit',
  related: ['kuendigungsfrist', 'aufhebungsvertrag', 'vollmacht'],
  sources: ['bgb622', 'bgb623', 'bgb130', 'bgb187', 'bgb188', 'sgb3_159'],
  de: {
    slug: 'kuendigung-arbeitsvertrag',
    nav: 'Kündigung Arbeitsvertrag',
    card: 'Selbst kündigen: letzter Arbeitstag nach § 622 BGB und Kündigungsschreiben zum Drucken.',
    title: 'Kündigung Arbeitsvertrag Vorlage: Arbeitnehmer, mit Frist',
    description: 'Kündigung Arbeitsvertrag Vorlage für Arbeitnehmer: letzter Arbeitstag nach § 622 BGB berechnet, auch in der Probezeit und mit Frist laut Vertrag, Brief als PDF.',
    h1: 'Kündigung Arbeitsvertrag Vorlage für Arbeitnehmer',
    intro: 'Diese Kündigung Arbeitsvertrag Vorlage nennt Ihren letzten Arbeitstag, bevor Sie den Brief abgeben, und setzt das Datum gleich in das Kündigungsschreiben ein.',
    resume: (h) => `Wer als Arbeitnehmer selbst kündigt, braucht keinen Grund. Ohne andere Vereinbarung gilt die Grundfrist des ${h.src('bgb622', '§ 622 Abs. 1 BGB')}: vier Wochen zum 15. oder zum Ende eines Kalendermonats, unabhängig davon, wie lange Sie im Betrieb sind. Die längeren Fristen nach Betriebszugehörigkeit gelten nur für Kündigungen durch den Arbeitgeber, es sei denn, Ihr Arbeitsvertrag überträgt sie auf Sie. Geht Ihr Schreiben am ${h.date('2027-02-10')} beim Arbeitgeber ein, ist der ${h.date(an(h, '2027-02-10').ende)} Ihr letzter Arbeitstag; am ${h.date('2027-02-20')} wäre es der ${h.date(an(h, '2027-02-20').ende)}. In einer vereinbarten Probezeit von höchstens sechs Monaten reichen zwei Wochen, also bis zum ${h.date(anP(h).ende)}. Die Kündigung braucht nach ${h.src('bgb623', '§ 623 BGB')} Papier und Ihre eigenhändige Unterschrift; eine E-Mail oder eine Nachricht im Personalportal beendet kein Arbeitsverhältnis. Steht im Vertrag eine längere Frist, wählen Sie sie oben aus.`,
    faqs: (h) => [
      { q: 'Welche Kündigungsfrist habe ich als Arbeitnehmer?', a: `Ohne Regel im Vertrag vier Wochen zum 15. oder zum Monatsende, auch nach vielen Jahren im Betrieb. Viele Arbeits- und Tarifverträge sehen längere Fristen vor, oft einen oder drei Monate zum Monatsende; dann gilt die längere. Für einen Brief, der am ${h.date('2027-02-10')} ankommt, endet die Grundfrist am ${h.date(an(h, '2027-02-10').ende)}.` },
      { q: 'Darf meine Kündigungsfrist länger sein als die des Arbeitgebers?', a: 'Nein. Nach § 622 Abs. 6 BGB darf für die Kündigung durch den Arbeitnehmer keine längere Frist vereinbart werden als für die Kündigung durch den Arbeitgeber. Gleich lange Fristen sind erlaubt und üblich: Viele Verträge übernehmen die Staffel des Arbeitgebers für beide Seiten.' },
      { q: 'Kann ich per E-Mail kündigen?', a: 'Nein. § 623 BGB schreibt die Schriftform vor und schließt die elektronische Form ausdrücklich aus. Wirksam ist nur ein Papier mit Ihrer eigenhändigen Unterschrift, das dem Arbeitgeber zugeht. Am sichersten ist die Übergabe in der Personalabteilung gegen eine Empfangsbestätigung auf einer Kopie.' },
      { q: 'Bekomme ich nach einer eigenen Kündigung Arbeitslosengeld?', a: 'Wer selbst kündigt und keinen neuen Job hat, muss mit einer Sperrzeit von bis zu zwölf Wochen rechnen, es sei denn, es gibt einen wichtigen Grund (§ 159 SGB III). Melden Sie sich spätestens drei Monate vor dem Ende bei der Agentur für Arbeit arbeitsuchend, sonst droht zusätzlich eine kurze Sperrzeit wegen verspäteter Meldung.' },
    ],
    body: (h) => `<h2>Kündigung Arbeitsvertrag: so rechnet die Vorlage</h2>
<p>Die Frist beginnt am Tag nach dem Zugang (${h.src('bgb187', '§ 187 Abs. 1 BGB')}) und endet vier Wochen später am gleichen Wochentag (${h.src('bgb188', '§ 188 Abs. 2 BGB')}). Das Arbeitsverhältnis endet dann am nächsten 15. oder Monatsletzten. Fällt dieser Tag auf ein Wochenende, verschiebt sich nichts: Das Ende ist ein Termin, keine Frist zur Abgabe einer Erklärung.</p>
${h.table(['Kündigung geht zu', 'Grundfrist endet', 'Mit 3 Monaten zum Monatsende'], ['2027-02-10', '2027-02-20', '2027-03-01'].map((z) => [h.date(z), h.date(an(h, z).ende), h.date(h.M.arbeit({ zugang: z, beginn: '2024-09-01', wer: 'an', probezeit: false, vertrag: 'm3' }).ende)]), 'Arbeitnehmer, keine Probezeit', ['l', 'l', 'l'])}
<h2>Was in das Kündigungsschreiben gehört</h2>
<p>Ein Satz genügt: dass Sie das Arbeitsverhältnis ordentlich zum genannten Termin kündigen, hilfsweise zum nächstmöglichen. Der Zusatz rettet die Kündigung, falls Sie sich bei der Frist verrechnet haben. Die Vorlage bittet außerdem um ein qualifiziertes Zeugnis und um eine Antwort zum Resturlaub. Einen Grund müssen Sie nicht nennen. Wollen Sie früher gehen, als die Frist erlaubt, ist ein ${h.a('aufhebungsvertrag', 'Aufhebungsvertrag')} der Weg; wie lang die Frist des Arbeitgebers wäre, zeigt der ${h.a('kuendigungsfrist', 'Kündigungsfrist-Rechner')}.</p>`,
  },
  en: {
    slug: 'resignation-letter',
    nav: 'Resignation letter',
    card: 'Resign from a German job: last working day under section 622 BGB and a letter to print.',
    title: 'Resignation letter template: Germany, with your last day',
    description: 'Resignation letter template for Germany: your last working day under section 622 BGB, during probation or with your contract’s period, letter ready as PDF.',
    h1: 'German resignation letter template with notice period',
    intro: 'This German resignation letter template tells you your last working day before you hand in the letter (Kündigung), then puts that date into the letter itself.',
    resume: (h) => `An employee in Germany who resigns needs no reason. Unless something else was agreed, the basic period of ${h.src('bgb622', 'section 622(1) BGB')} applies: four weeks to the 15th or to the end of a calendar month, however long you have worked there. The longer periods that grow with length of service apply only to dismissals by the employer, unless your contract extends them to you. If your letter reaches the employer on ${h.date('2027-02-10')}, your last day is ${h.date(an(h, '2027-02-10').ende)}; on ${h.date('2027-02-20')} it would be ${h.date(an(h, '2027-02-20').ende)}. During an agreed probation of up to six months two weeks are enough, so until ${h.date(anP(h).ende)}. Under ${h.src('bgb623', 'section 623 BGB')} the resignation needs paper and your own handwritten signature; an email or a message in the HR portal does not end employment. If your contract has a longer period, choose it above. The letter prints in German.`,
    faqs: (h) => [
      { q: 'How much notice must I give when resigning in Germany?', a: `Without a clause in your contract, four weeks to the 15th or the end of the month, even after many years. Many employment and collective agreements set longer periods, often one or three months to the end of a month; the longer one then applies. For a letter received on ${h.date('2027-02-10')} the basic period ends on ${h.date(an(h, '2027-02-10').ende)}.` },
      { q: 'Can I resign by email in Germany?', a: 'No. Section 623 BGB requires written form and expressly rules out electronic form. Only paper bearing your handwritten signature, received by the employer, is valid. The safest way is to hand it to HR and ask for a signed receipt on a copy. A resignation sent only by email leaves you still employed.' },
      { q: 'Can my notice period be longer than my employer’s?', a: 'No. Section 622(6) BGB forbids agreeing a longer period for the employee than for the employer. Equal periods are allowed and common: many contracts apply the employer’s length-of-service scale to both sides. If yours does, pick the matching option in the form above.' },
    ],
    body: (h) => `<h2>How the German resignation letter template counts</h2>
<p>The period starts the day after receipt (${h.src('bgb187', 'section 187(1) BGB')}) and ends four weeks later on the same weekday (${h.src('bgb188', 'section 188(2) BGB')}). Employment then ends on the next 15th or last day of the month. If that day is a weekend nothing moves: the end is a date, not a deadline for a declaration.</p>
${h.table(['Letter received', 'Basic period ends', 'With 3 months to month end'], ['2027-02-10', '2027-02-20', '2027-03-01'].map((z) => [h.date(z), h.date(an(h, z).ende), h.date(h.M.arbeit({ zugang: z, beginn: '2024-09-01', wer: 'an', probezeit: false, vertrag: 'm3' }).ende)]), 'Employee, no probation', ['l', 'l', 'l'])}
<h2>What goes into the letter</h2>
<p>One sentence is enough: that you terminate the employment with ordinary notice on the stated date, or alternatively on the next possible date. That fallback saves the letter if you miscounted. The template also asks for a full written reference (qualifiziertes Zeugnis) and for an answer on remaining leave. You do not have to give a reason. To leave earlier than the period allows, a ${h.a('aufhebungsvertrag', 'termination agreement')} is the route; the ${h.a('kuendigungsfrist', 'notice period calculator')} shows the employer’s side. If you claim unemployment benefit after resigning, expect a suspension of up to twelve weeks (${h.src('sgb3_159', 'section 159 SGB III')}).</p>`,
  },
});
