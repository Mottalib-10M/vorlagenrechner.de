import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Fristen des § 622 BGB für beide Seiten, Klagefrist § 4 KSchG. */
const Z = '2027-02-10';
const ag = (h: Helpers, beginn: string) => h.M.arbeit({ zugang: Z, beginn, wer: 'ag', probezeit: false });
const STUFEN: Array<[string, string, string]> = [['2025-06-01', 'unter 2 Jahre', 'under 2 years'], ['2024-06-01', '2 Jahre', '2 years'], ['2021-06-01', '5 Jahre', '5 years'], ['2018-06-01', '8 Jahre', '8 years'], ['2016-06-01', '10 Jahre', '10 years'], ['2014-06-01', '12 Jahre', '12 years'], ['2011-06-01', '15 Jahre', '15 years'], ['2006-06-01', '20 Jahre', '20 years']];

export default defineGuide({
  id: 'kuendigungsfrist',
  group: 'arbeit',
  order: 2,
  doc: 'fristRechner',
  related: ['kuendigung-arbeitsvertrag', 'aufhebungsvertrag'],
  sources: ['bgb622', 'kschg4', 'bgb187', 'bgb188', 'kschg1a'],
  de: {
    slug: 'kuendigungsfrist-berechnen',
    nav: 'Kündigungsfrist berechnen',
    card: 'Kündigungsfrist im Job für Arbeitgeber und Arbeitnehmer, mit Staffel nach Jahren und Klagefrist.',
    title: 'Kündigungsfrist berechnen: Arbeitsvertrag nach § 622 BGB',
    description: 'Kündigungsfrist berechnen im Arbeitsvertrag: Staffel des Arbeitgebers nach Jahren, Probezeit, Frist laut Vertrag und Klagefrist von drei Wochen, taggenau.',
    h1: 'Kündigungsfrist berechnen im Arbeitsverhältnis',
    intro: 'Hier können Sie die Kündigungsfrist berechnen, egal wer kündigt: Der Rechner nennt das Ende des Arbeitsverhältnisses und, bei einer Kündigung durch den Arbeitgeber, den letzten Tag für eine Klage.',
    resume: (h) => `Die Kündigungsfrist im Arbeitsrecht hängt davon ab, wer kündigt. Für den Arbeitnehmer gilt ohne andere Vereinbarung immer die Grundfrist von vier Wochen zum 15. oder Monatsende. Der Arbeitgeber muss nach ${h.src('bgb622', '§ 622 Abs. 2 BGB')} länger warten, je länger das Arbeitsverhältnis bestanden hat: ab zwei Jahren einen Monat zum Monatsende, ab fünf Jahren zwei, ab acht drei, ab zehn vier, ab zwölf fünf, ab fünfzehn sechs und ab zwanzig Jahren sieben Monate. Kündigt der Arbeitgeber am ${h.date(Z)} nach gut acht Jahren, endet das Arbeitsverhältnis am ${h.date(ag(h, '2018-06-01').ende)}. Wer sich gegen die Kündigung wehren will, muss innerhalb von drei Wochen nach Zugang beim Arbeitsgericht klagen (${h.src('kschg4', '§ 4 KSchG')}), hier also bis zum ${h.date(ag(h, '2018-06-01').klagefristBis)}. Die alte Regel, nach der Jahre vor dem 25. Geburtstag nicht zählen, wenden Gerichte seit einem Urteil des Europäischen Gerichtshofs von 2010 nicht mehr an; der Rechner zählt alle Jahre.`,
    faqs: (h) => [
      { q: 'Wie lang ist die Kündigungsfrist des Arbeitgebers nach 10 Jahren?', a: `Vier Monate zum Ende eines Kalendermonats (§ 622 Abs. 2 Nr. 4 BGB). Maßgeblich ist die Dauer des Arbeitsverhältnisses an dem Tag, an dem die Kündigung zugeht. Bei Zugang am ${h.date(Z)} und Beginn im Juni 2016 endet das Arbeitsverhältnis am ${h.date(ag(h, '2016-06-01').ende)}. Tarifverträge können andere Fristen vorsehen.` },
      { q: 'Gilt die längere Frist auch, wenn ich selbst kündige?', a: 'Nur, wenn Ihr Arbeits- oder Tarifvertrag das so regelt. Das Gesetz staffelt allein die Frist des Arbeitgebers. Viele Verträge übernehmen die Staffel für beide Seiten; das ist erlaubt. Eine längere Frist nur für den Arbeitnehmer ist unwirksam (§ 622 Abs. 6 BGB).' },
      { q: 'Was ist die Klagefrist bei einer Kündigung?', a: `Drei Wochen ab Zugang der schriftlichen Kündigung (§ 4 KSchG). Wer sie versäumt, kann sich später kaum noch darauf berufen, dass die Kündigung sozial ungerechtfertigt war. Für eine Kündigung vom ${h.date(Z)} endet die Frist am ${h.date(ag(h, '2018-06-01').klagefristBis)}. Die Klage kann man bei der Rechtsantragstelle des Arbeitsgerichts auch ohne Anwalt einreichen.` },
    ],
    body: (h) => `<h2>Kündigungsfrist berechnen: die Staffel des Arbeitgebers</h2>
<p>Die Tabelle wendet ${h.src('bgb622', '§ 622 BGB')} auf eine Kündigung an, die am ${h.date(Z)} zugeht. Gezählt werden volle Jahre des Arbeitsverhältnisses bis zum Zugang.</p>
${h.table(['Beschäftigt seit', 'Dauer', 'Frist', 'Ende'], STUFEN.map(([b, de]) => [h.date(b), de, ag(h, b).monate ? `${ag(h, b).monate} Monat${ag(h, b).monate > 1 ? 'e' : ''} zum Monatsende` : '4 Wochen zum 15. oder Monatsende', h.date(ag(h, b).ende)]), `Kündigung durch den Arbeitgeber, Zugang am ${h.date(Z)}`, ['l', 'l', 'l', 'l'])}
<h2>Probezeit, Vertrag und Tarif</h2>
<p>In einer vereinbarten Probezeit von höchstens sechs Monaten gilt für beide Seiten eine Frist von zwei Wochen, zu jedem Tag. Ein Arbeits- oder Tarifvertrag darf längere Fristen festlegen, ein Arbeitsvertrag kürzere nur in engen Ausnahmen, etwa bei Aushilfen bis drei Monate. Der Rechner nimmt die längere von gesetzlicher und vertraglicher Frist. Für Ihr eigenes Kündigungsschreiben nutzen Sie die ${h.a('kuendigung-arbeitsvertrag', 'Vorlage für die Kündigung des Arbeitsvertrags')}; einigen sich beide Seiten auf ein Ende, hilft der ${h.a('aufhebungsvertrag', 'Aufhebungsvertrag')}.</p>`,
  },
  en: {
    slug: 'employment-notice-period',
    nav: 'Notice period calculator',
    card: 'German employment notice periods for employer and employee, with the length-of-service scale and the deadline to sue.',
    title: 'Employment notice period calculator for Germany (BGB 622)',
    description: 'Employment notice period calculator for Germany: employer’s scale by years of service, probation, your contract’s period and the three-week deadline to sue.',
    h1: 'German employment notice period calculator',
    intro: 'This German employment notice period calculator works whichever side gives notice: it shows the end of employment and, after a dismissal by the employer, the last day to bring a claim.',
    resume: (h) => `The notice period in German employment law depends on who gives notice. For the employee, unless something else was agreed, the basic period always applies: four weeks to the 15th or the end of the month. The employer has to wait longer the longer the employment has lasted, under ${h.src('bgb622', 'section 622(2) BGB')}: from two years one month to the end of a month, from five years two, from eight three, from ten four, from twelve five, from fifteen six and from twenty years seven months. If the employer gives notice on ${h.date(Z)} after just over eight years, employment ends on ${h.date(ag(h, '2018-06-01').ende)}. To fight a dismissal you must sue at the labour court within three weeks of receipt (${h.src('kschg4', 'section 4 KSchG')}), here by ${h.date(ag(h, '2018-06-01').klagefristBis)}. The old rule that years before age 25 do not count has not been applied since a 2010 ruling of the European Court of Justice; the calculator counts every year.`,
    faqs: (h) => [
      { q: 'What is the employer’s notice period after 10 years in Germany?', a: `Four months to the end of a calendar month (section 622(2) no. 4 BGB). What counts is the length of employment on the day notice is received. With receipt on ${h.date(Z)} and a start in June 2016, employment ends on ${h.date(ag(h, '2016-06-01').ende)}. Collective agreements may set other periods, so check yours.` },
      { q: 'Does the longer period also apply when I resign?', a: 'Only if your employment or collective agreement says so. The statute scales only the employer’s period. Many contracts apply the scale to both sides, which is allowed. A longer period for the employee alone is void under section 622(6) BGB, so the employer’s period is always the ceiling for yours.' },
      { q: 'How long do I have to challenge a dismissal in Germany?', a: `Three weeks from receipt of the written dismissal (section 4 KSchG). If you miss it, you can hardly argue later that the dismissal was unfair. For a dismissal received on ${h.date(Z)} the deadline is ${h.date(ag(h, '2018-06-01').klagefristBis)}. The claim can be filed at the labour court’s legal application office without a lawyer.` },
    ],
    body: (h) => `<h2>The employer’s scale in the German employment notice period calculator</h2>
<p>The table applies ${h.src('bgb622', 'section 622 BGB')} to a dismissal received on ${h.date(Z)}. Full years of employment up to receipt are counted.</p>
${h.table(['Employed since', 'Length', 'Period', 'End'], STUFEN.map(([b, , en]) => [h.date(b), en, ag(h, b).monate ? `${ag(h, b).monate} month${ag(h, b).monate > 1 ? 's' : ''} to month end` : '4 weeks to 15th or month end', h.date(ag(h, b).ende)]), `Dismissal by the employer, received on ${h.date(Z)}`, ['l', 'l', 'l', 'l'])}
<h2>Probation, contract and collective agreement</h2>
<p>During an agreed probation of up to six months, two weeks’ notice to any day applies to both sides. An employment or collective agreement may set longer periods; a contract may set shorter ones only in narrow cases, such as temporary help for up to three months. The calculator takes the longer of the statutory and the contractual period. For your own letter use the ${h.a('kuendigung-arbeitsvertrag', 'resignation letter template')}; if both sides agree on an end date, the ${h.a('aufhebungsvertrag', 'termination agreement')} helps.</p>`,
  },
});
