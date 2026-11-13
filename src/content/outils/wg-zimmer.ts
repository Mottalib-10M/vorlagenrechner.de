import { defineGuide } from '../../lib/guide-types';
import { wgAnteil } from '../../lib/docs/miete';

/** WG-Zimmer : Anteil an der Gesamtmiete nach Fläche oder Köpfen, Untermiete nach §§ 540, 553 BGB. */
const bsp = (gesamt: number, qm: number) => wgAnteil({ gesamt: String(gesamt), flaeche: '90', qm: String(qm), zimmerSumme: '54', personen: '3', teilung: 'flaeche' });

export default defineGuide({
  id: 'wg-zimmer',
  group: 'wohnen',
  order: 3,
  doc: 'wgZimmer',
  related: ['untermietvertrag', 'mietvertrag', 'kuendigung-mietvertrag'],
  sources: ['bgb540', 'bgb553', 'bgb551', 'bgb573c', 'bgb549'],
  de: {
    slug: 'wg-zimmer-mietvertrag',
    nav: 'WG-Zimmer',
    card: 'Mietanteil nach Zimmergröße oder nach Köpfen berechnen und den WG-Vertrag gleich mitdrucken.',
    title: 'WG Mietvertrag Vorlage: Zimmer, Mietanteil berechnen',
    description: 'WG Mietvertrag Vorlage: Mietanteil des Zimmers nach Fläche oder Köpfen berechnen, Gemeinschaftsfläche fair geteilt, Vertrag mit Kaution und Kasse als PDF.',
    h1: 'WG Mietvertrag Vorlage mit Rechner für den Mietanteil',
    intro: 'Diese WG Mietvertrag Vorlage rechnet zuerst aus, wie viel ein Zimmer von der Gesamtmiete trägt, und schreibt dann den Vertrag zwischen Hauptmieter und neuem Mitbewohner.',
    resume: (h) => `In den meisten Wohngemeinschaften hat nur eine Person oder ein Teil der Bewohner den Mietvertrag mit dem Vermieter unterschrieben; neue Mitbewohner werden Untermieter des Hauptmieters. Der Streit beginnt fast immer bei der Frage, wer wie viel zahlt. Der Rechner oben teilt die Warmmiete auf zwei Arten: nach Köpfen, dann zahlt jeder gleich viel, oder nach Fläche, dann zahlt jeder sein Zimmer plus einen gleichen Teil von Küche, Bad und Flur. Bei ${h.eur(1350)} warm, 90 m² Wohnung, 54 m² Zimmerfläche und drei Personen trägt ein Zimmer von 16 m² nach Fläche ${h.eur(bsp(1350, 16).nachFlaeche)}, nach Köpfen ${h.eur(bsp(1350, 16).nachKopf)}. Das größere Zimmer von 22 m² läge bei ${h.eur(bsp(1350, 22).nachFlaeche)}. Der Vertrag hält den gewählten Betrag, die Kaution, den Anteil am Internet und die WG-Kasse fest; die Erlaubnis des Vermieters zur Untervermietung braucht es trotzdem.`,
    faqs: (h) => [
      { q: 'Wie berechnet man die Miete für ein WG-Zimmer fair?', a: `Am gerechtesten ist die Verteilung nach Fläche: Jeder zahlt den Anteil seines Zimmers an der Wohnung plus einen gleichen Teil der Gemeinschaftsräume. Im Beispiel mit 36 m² Gemeinschaftsfläche kommen zu jedem Zimmer 12 m² hinzu. Ein Zimmer von 16 m² zahlt so ${h.eur(bsp(1350, 16).nachFlaeche)} statt ${h.eur(bsp(1350, 16).nachKopf)} nach Köpfen.` },
      { q: 'Braucht ein WG-Zimmer einen eigenen Mietvertrag?', a: 'Einen schriftlichen Vertrag schreibt das Gesetz nicht vor, aber ohne ihn ist später unklar, welche Miete, welche Kaution und welche Frist vereinbart war. Ein kurzer WG-Vertrag zwischen Hauptmieter und neuem Mitbewohner schafft Klarheit und kostet fünf Minuten. Der Vermieter muss der Untervermietung zustimmen (§ 540 BGB).' },
      { q: 'Welche Kündigungsfrist gilt im WG-Zimmer?', a: 'Wohnt der Hauptmieter selbst in der WG und hat er das Zimmer überwiegend möbliert, gilt die kurze Frist: Kündigung bis zum 15. zum Monatsende. Ist das Zimmer leer vermietet, gelten wie bei einer Wohnung drei Monate mit Zugang bis zum dritten Werktag. Die Vorlage für die Untermiete rechnet beide Fälle auf den Tag.' },
    ],
    body: (h) => `<h2>Der WG Mietvertrag in fünf Punkten</h2>
<p>Die Vorlage hält fest: das Zimmer und die Mitbenutzung von Küche, Bad und Flur, den Einzugstag, den monatlichen Anteil an der Warmmiete, die Beiträge für Internet und gemeinsame Einkäufe, die Kaution und die Zahlung an den Hauptmieter. Wie die Miete geteilt wird, steht ausdrücklich im Vertrag, damit es beim nächsten Wechsel keine neue Diskussion gibt.</p>
${h.table(['Zimmer', 'nach Fläche', 'nach Köpfen'], [12, 16, 22].map((q) => [`${q} m²`, h.eur(bsp(1350, q).nachFlaeche), h.eur(bsp(1350, q).nachKopf)]), 'Gesamtmiete 1.350 € warm, 90 m², 3 Personen, Gemeinschaftsfläche 36 m²', ['l', 'r', 'r'])}
<h2>Hauptmieter, Mitmieter, Untermieter</h2>
<p>Haben alle Bewohner den Mietvertrag mit dem Vermieter unterschrieben, sind sie Mitmieter: Sie haften gemeinsam für die ganze Miete, und kündigen können sie nur gemeinsam. Hat nur einer unterschrieben, sind die anderen seine Untermieter, und der WG-Vertrag regelt ihr Verhältnis zu ihm. Für einen Wechsel braucht der Hauptmieter die Erlaubnis des Vermieters; einen Anspruch darauf gibt ${h.src('bgb553', '§ 553 BGB')}, wenn das Interesse nach Abschluss des Mietvertrags entstanden ist. Wie lange ein Untermieter Kündigungsschutz hat, zeigt der ${h.a('untermietvertrag', 'Untermietvertrag')}.</p>`,
  },
  en: {
    slug: 'flatshare-room-agreement',
    nav: 'Flatshare room',
    card: 'Split the rent by room size or per head, then print the German flatshare agreement.',
    title: 'Flatshare room agreement: rent share calculator, Germany',
    description: 'Flatshare (WG) room agreement for Germany: split the total rent by room size or per head, shared space divided fairly, deposit and kitty included, as PDF.',
    h1: 'German flatshare room agreement with rent share calculator',
    intro: 'This German flatshare room agreement first works out what one room carries of the total rent, then writes the contract between the main tenant and the new flatmate (WG-Zimmer).',
    resume: (h) => `In most German flatshares (Wohngemeinschaft, WG) only one person, or some of the residents, signed the lease with the landlord; new flatmates become subtenants of that main tenant. The argument almost always starts with who pays how much. The calculator above splits the all-in rent two ways: per head, so everyone pays the same, or by floor area, so everyone pays for their own room plus an equal part of kitchen, bathroom and hall. With ${h.eur(1350)} all-in rent, a 90 m² flat, 54 m² of rooms and three people, a 16 m² room carries ${h.eur(bsp(1350, 16).nachFlaeche)} by area and ${h.eur(bsp(1350, 16).nachKopf)} per head. The larger room of 22 m² would come to ${h.eur(bsp(1350, 22).nachFlaeche)}. The agreement records the chosen amount, the deposit, the internet share and the household kitty, in German. The landlord’s permission to sublet is still needed.`,
    faqs: (h) => [
      { q: 'How do you split rent fairly in a German flatshare?', a: `The fairest split is by area: each person pays their room’s share of the flat plus an equal part of the shared rooms. In the example, with 36 m² of shared space, 12 m² is added to each room. A 16 m² room then pays ${h.eur(bsp(1350, 16).nachFlaeche)} instead of ${h.eur(bsp(1350, 16).nachKopf)} per head.` },
      { q: 'Does a flatshare room need its own written agreement?', a: 'German law does not require one, but without it nobody knows later which rent, deposit and notice period were agreed. A short agreement between the main tenant and the new flatmate settles that in five minutes. The landlord must still consent to the sublet under section 540 BGB, and the main lease stays unchanged.' },
      { q: 'What notice period applies to a flatshare room?', a: 'If the main tenant lives in the flat and mostly furnished the room, either side may give notice by the 15th to the end of that month. If the room is let empty, three months apply as for a flat, with receipt by the third working day. The sublease template works out both cases to the day.' },
    ],
    body: (h) => `<h2>The German flatshare room agreement in five points</h2>
<p>The template records the room and the shared use of kitchen, bathroom and hall, the move-in date, the monthly share of the all-in rent, contributions to internet and shared shopping, the deposit and payment to the main tenant. How the rent is split is written into the agreement so that the next change of flatmate does not reopen the debate.</p>
${h.table(['Room', 'by area', 'per head'], [12, 16, 22].map((q) => [`${q} m²`, h.eur(bsp(1350, q).nachFlaeche), h.eur(bsp(1350, q).nachKopf)]), 'Total rent €1,350 all-in, 90 m², 3 people, 36 m² shared space', ['l', 'r', 'r'])}
<h2>Main tenant, co-tenant or subtenant</h2>
<p>If every resident signed the lease with the landlord, they are co-tenants: they are jointly liable for the whole rent and can only give notice together. If only one signed, the others are his subtenants, and the flatshare agreement governs their relationship with him. For each change of flatmate the main tenant needs the landlord’s permission; ${h.src('bgb553', 'section 553 BGB')} gives a right to it when the interest arose after the lease was signed. How much protection a subtenant has is shown on the ${h.a('untermietvertrag', 'sublease agreement')} page.</p>`,
  },
});
