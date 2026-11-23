import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Mahnung : § 286 (Verzug), § 288 (Zinsen, 40-€-Pauschale), § 247 (Basiszinssatz, Deutsche Bundesbank). */
const z = (h: Helpers, betrag: number, verbraucher: boolean) => h.M.verzugszinsen(betrag, '2026-09-01', '2026-11-13', verbraucher);
const pct = (h: Helpers, x: number) => h.num(x, 2);

export default defineGuide({
  id: 'mahnung',
  group: 'weitere',
  order: 4,
  doc: 'mahnung',
  related: ['vollmacht', 'fitnessstudio', 'schenkungsvertrag'],
  sources: ['bgb286', 'bgb288', 'bgb247', 'bundesbank', 'bgb193'],
  de: {
    slug: 'mahnung-vorlage',
    nav: 'Mahnung',
    card: 'Offene Rechnung anmahnen: Verzugszinsen auf den Tag, 40-Euro-Pauschale gegenüber Firmen, Brief zum Drucken.',
    title: 'Mahnung Vorlage: Verzugszinsen auf den Tag berechnet',
    description: 'Mahnung Vorlage für offene Rechnungen: Verzugszinsen nach § 288 BGB mit dem Basiszinssatz der Bundesbank, 40-Euro-Pauschale bei Firmen, drei Mahnstufen.',
    h1: 'Mahnung Vorlage mit Rechner für Verzugszinsen',
    intro: 'Diese Mahnung Vorlage rechnet die Verzugszinsen auf den Tag aus, mit dem jeweils geltenden Basiszinssatz, und schreibt eine Zahlungserinnerung, erste oder letzte Mahnung.',
    resume: (h) => `Zahlt ein Kunde eine fällige Rechnung nicht, kommt er durch eine Mahnung in Verzug (${h.src('bgb286', '§ 286 BGB')}); ohne Mahnung spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung, bei Verbrauchern aber nur, wenn die Rechnung darauf hinweist. Ab Verzug schuldet er Zinsen (${h.src('bgb288', '§ 288 BGB')}): fünf Prozentpunkte über dem Basiszinssatz, wenn er Verbraucher ist, neun Prozentpunkte, wenn an dem Geschäft kein Verbraucher beteiligt ist. Den Basiszinssatz legt die ${h.src('bundesbank', 'Deutsche Bundesbank')} jeweils zum 1. Januar und 1. Juli fest; seit dem ${h.date('2026-07-01')} beträgt er ${pct(h, h.M.basiszins('2026-07-01'))} %, davor ${pct(h, h.M.basiszins('2026-06-30'))} %. Auf ${h.eur(1000)}, die seit dem ${h.date('2026-09-01')} offen sind, ergeben sich bis zum ${h.date('2026-11-13')} gegenüber einer Privatperson ${h.eur(z(h, 1000, true).summe, 2)}, gegenüber einer Firma ${h.eur(z(h, 1000, false).summe, 2)} Zinsen. Von einer Firma dürfen Sie zusätzlich eine Pauschale von ${h.eur(h.P.verzug.pauschale)} verlangen. Die erste freundliche Zahlungserinnerung rechnet die Vorlage ohne Zinsen.`,
    faqs: (h) => [
      { q: 'Wie hoch sind die Verzugszinsen?', a: `Gegenüber Verbrauchern fünf, gegenüber Unternehmen neun Prozentpunkte über dem Basiszinssatz. Mit dem Basiszinssatz von ${pct(h, h.M.basiszins('2026-07-01'))} % seit dem ${h.date('2026-07-01')} sind das ${pct(h, h.M.basiszins('2026-07-01') + 5)} % und ${pct(h, h.M.basiszins('2026-07-01') + 9)} % im Jahr. Ändert sich der Basiszinssatz während des Verzugs, rechnet die Vorlage jeden Abschnitt mit seinem Satz.` },
      { q: 'Wie viele Mahnungen muss ich schicken, bevor ich das Mahnverfahren einleite?', a: 'Gesetzlich genügt eine Mahnung, um den Schuldner in Verzug zu setzen; drei Mahnungen schreibt kein Gesetz vor. Üblich ist trotzdem eine freundliche Erinnerung, dann eine Mahnung mit Zinsen und eine letzte Mahnung mit Hinweis auf das gerichtliche Mahnverfahren. Danach können Sie online einen Mahnbescheid beantragen.' },
      { q: 'Wie hoch sind die Verzugszinsen 2027?', a: `Das hängt vom Basiszinssatz ab, der sich zum 1. Januar 2027 ändert und den die Deutsche Bundesbank unverzüglich danach bekannt gibt. Bis dahin sind es ${pct(h, h.M.basiszins('2026-07-01') + 5)} % gegenüber Verbrauchern und ${pct(h, h.M.basiszins('2026-07-01') + 9)} % gegenüber Unternehmen; die Vorlage übernimmt den neuen Satz, sobald er veröffentlicht ist.` },
      { q: 'Darf ich Mahngebühren verlangen?', a: `Pauschale Mahngebühren gibt es gegenüber Verbrauchern nur, wenn sie vereinbart sind, und auch dann nur in Höhe der tatsächlichen Kosten für Papier und Porto; die erste Mahnung, die den Verzug erst auslöst, ist nicht erstattungsfähig. Gegenüber Unternehmen steht Ihnen nach § 288 Abs. 5 BGB die Pauschale von ${h.eur(h.P.verzug.pauschale)} zu.` },
    ],
    body: (h) => `<h2>Mahnung Vorlage: so rechnet sie die Zinsen</h2>
<p>Zinsen laufen ab dem ersten Tag des Verzugs bis zum Tag der Mahnung, taggenau auf 365 Tage. Liegt ein Wechsel des Basiszinssatzes dazwischen, teilt der Rechner den Zeitraum. Die Tabelle zeigt die Sätze, mit denen er arbeitet; jeder ist auf der Seite der Bundesbank veröffentlicht.</p>
${h.table(['Basiszinssatz ab', 'Satz', 'Verbraucher (+5)', 'Unternehmen (+9)'], h.P.verzug.basiszins.slice().reverse().map((r) => [h.date(r.ab), `${pct(h, r.satz)} %`, `${pct(h, r.satz + 5)} %`, `${pct(h, r.satz + 9)} %`]), 'Basiszinssatz nach § 247 BGB, bekanntgemacht von der Deutschen Bundesbank', ['l', 'r', 'r', 'r'])}
<h2>Verzugszinsen 2027</h2>
<p>Der Basiszinssatz für das erste Halbjahr 2027 steht noch nicht fest. Er ändert sich nach ${h.src('bgb247', '§ 247 BGB')} zum ${h.date('2027-01-01')} um so viel, wie sich der Zinssatz der jüngsten Hauptrefinanzierungsoperation der Europäischen Zentralbank seit der letzten Änderung bewegt hat, und die ${h.src('bundesbank', 'Deutsche Bundesbank')} gibt ihn unverzüglich nach dem Stichtag im Bundesanzeiger bekannt. Bis dahin gilt ${pct(h, h.M.basiszins('2026-07-01'))} %. Sobald der neue Satz veröffentlicht ist, rechnet die Vorlage jeden Verzugstag ab dem 1. Januar 2027 damit.</p>
<h2>Wann der Schuldner in Verzug ist</h2>
<p>Steht in der Rechnung ein Kalenderdatum als Zahlungsziel, beginnt der Verzug am Tag danach, ohne Mahnung. Fällt das Zahlungsziel auf einen Sonnabend, Sonntag oder Feiertag, darf am nächsten Werktag gezahlt werden (${h.src('bgb193', '§ 193 BGB')}). Fehlt ein Datum, setzt erst die Mahnung oder der Ablauf von 30 Tagen den Verzug in Gang. Tragen Sie den ersten Verzugstag oben ein; Rechnungsnummer und Ihre Bankverbindung ergänzen den Brief. Für Kündigungen laufender Verträge gibt es eigene Vorlagen, etwa für das ${h.a('fitnessstudio', 'Fitnessstudio')}.</p>`,
  },
  en: {
    slug: 'payment-reminder-letter',
    nav: 'Payment reminder',
    card: 'Chase an unpaid invoice in Germany: default interest to the day, €40 flat fee for businesses, letter to print.',
    title: 'Payment reminder letter for Germany with default interest',
    description: 'Payment reminder letter for Germany: default interest under section 288 BGB at the Bundesbank base rate, €40 flat fee for businesses, three reminder stages.',
    h1: 'German payment reminder letter with interest calculator',
    intro: 'This German payment reminder letter template works out default interest to the day at the base rate in force, then writes a friendly reminder, a first or a final reminder (Mahnung).',
    resume: (h) => `If a customer does not pay an invoice when due, a reminder puts him in default (${h.src('bgb286', 'section 286 BGB')}); without one, at the latest 30 days after the due date and receipt of the invoice, but for consumers only if the invoice says so. From default he owes interest (${h.src('bgb288', 'section 288 BGB')}): five percentage points above the base rate if he is a consumer, nine points if no consumer is involved in the deal. The base rate is published by the ${h.src('bundesbank', 'Deutsche Bundesbank')} each 1 January and 1 July; since ${h.date('2026-07-01')} it has been ${pct(h, h.M.basiszins('2026-07-01'))}%, before that ${pct(h, h.M.basiszins('2026-06-30'))}%. On ${h.eur(1000)} outstanding since ${h.date('2026-09-01')}, interest up to ${h.date('2026-11-13')} comes to ${h.eur(z(h, 1000, true).summe, 2)} from a private person and ${h.eur(z(h, 1000, false).summe, 2)} from a business. From a business you may also claim a flat fee of ${h.eur(h.P.verzug.pauschale)}. The first friendly reminder is calculated without interest. The letter prints in German.`,
    faqs: (h) => [
      { q: 'How high is default interest in Germany?', a: `Five percentage points above the base rate for consumers, nine for businesses. With the base rate of ${pct(h, h.M.basiszins('2026-07-01'))}% since ${h.date('2026-07-01')}, that is ${pct(h, h.M.basiszins('2026-07-01') + 5)}% and ${pct(h, h.M.basiszins('2026-07-01') + 9)}% a year. If the base rate changes during the default, the template applies each period’s own rate.` },
      { q: 'How many reminders must I send before going to court?', a: 'By law one reminder is enough to put the debtor in default; no statute requires three. It is still usual to send a friendly reminder, then a reminder with interest and a final one mentioning the court dunning procedure. After that you can apply online for a payment order (Mahnbescheid).' },
      { q: 'What is the default interest rate in 2027?', a: `It depends on the base rate, which changes on 1 January 2027 and which the Deutsche Bundesbank announces right after. Until then it is ${pct(h, h.M.basiszins('2026-07-01') + 5)}% towards consumers and ${pct(h, h.M.basiszins('2026-07-01') + 9)}% towards businesses; the template uses the new rate as soon as it is published.` },
      { q: 'Can I charge reminder fees?', a: `Towards consumers, flat reminder fees apply only if agreed, and even then only the actual cost of paper and postage; the first reminder, which triggers default, cannot be charged. Towards businesses you are entitled to the flat fee of ${h.eur(h.P.verzug.pauschale)} under section 288(5) BGB.` },
    ],
    body: (h) => `<h2>How the German payment reminder letter counts interest</h2>
<p>Interest runs from the first day of default to the day of the reminder, to the day on a 365-day basis. If the base rate changes in between, the calculator splits the period. The table shows the rates it uses; each is published on the Bundesbank’s website.</p>
${h.table(['Base rate from', 'Rate', 'Consumer (+5)', 'Business (+9)'], h.P.verzug.basiszins.slice().reverse().map((r) => [h.date(r.ab), `${pct(h, r.satz)}%`, `${pct(h, r.satz + 5)}%`, `${pct(h, r.satz + 9)}%`]), 'Base rate under section 247 BGB, published by the Deutsche Bundesbank', ['l', 'r', 'r', 'r'])}
<h2>Default interest in 2027</h2>
<p>The base rate for the first half of 2027 is not yet known. Under ${h.src('bgb247', 'section 247 BGB')} it changes on ${h.date('2027-01-01')} by as much as the rate of the European Central Bank's latest main refinancing operation has moved since the last change, and the ${h.src('bundesbank', 'Deutsche Bundesbank')} announces it in the Federal Gazette right after that date. Until then it is ${pct(h, h.M.basiszins('2026-07-01'))}%. Once the new rate is published, the template applies it to every day of default from 1 January 2027.</p>
<h2>When the debtor is in default</h2>
<p>If the invoice states a calendar date for payment, default starts the next day without any reminder. If that date is a Saturday, Sunday or public holiday, payment on the next working day is in time (${h.src('bgb193', 'section 193 BGB')}). Without a date, only a reminder or the lapse of 30 days triggers default. Enter the first day of default above; the invoice number and your bank details complete the letter. Cancelling running contracts has its own templates, for example for a ${h.a('fitnessstudio', 'gym membership')}.</p>`,
  },
});
