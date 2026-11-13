import { defineGuide } from '../../lib/guide-types';

/** Einzelvollmacht : §§ 164, 167, 172, 174 BGB. Keine Vorsorge- oder Generalvollmacht. */
export default defineGuide({
  id: 'vollmacht',
  group: 'weitere',
  order: 1,
  doc: 'vollmacht',
  related: ['kfz-kaufvertrag', 'kuendigung-mietvertrag', 'mahnung'],
  sources: ['bgb167', 'bgb174', 'bgb126'],
  de: {
    slug: 'vollmacht-vorlage',
    nav: 'Vollmacht',
    card: 'Vollmacht für Post, Zulassungsstelle, Wohnungsübergabe oder Behörde, mit Gültigkeit von bis.',
    title: 'Vollmacht Vorlage: Post, Kfz, Behörde, kostenlos drucken',
    description: 'Vollmacht Vorlage für eine einzelne Angelegenheit: Post abholen, Auto ummelden, Wohnungsübergabe oder Behördengang, mit Laufzeit von bis, als PDF drucken.',
    h1: 'Vollmacht Vorlage für eine einzelne Angelegenheit',
    intro: 'Diese Vollmacht Vorlage erteilt einer Person Ihres Vertrauens die Befugnis für genau eine Angelegenheit und für eine bestimmte Zeit; der Rechner zeigt, wie viele Tage sie gilt.',
    resume: (h) => `Eine Vollmacht erlaubt einer anderen Person, in Ihrem Namen zu handeln. Sie braucht grundsätzlich keine Form (${h.src('bgb167', '§ 167 Abs. 2 BGB')}), aber ohne Papier glaubt Ihnen am Postschalter, bei der Zulassungsstelle oder beim Vermieter niemand. Schriftlich ist sie außerdem wichtig, weil der Empfänger eine einseitige Erklärung zurückweisen darf, wenn der Bevollmächtigte keine Vollmachtsurkunde im Original vorlegt (${h.src('bgb174', '§ 174 BGB')}); eine Kündigung durch einen Vertreter kann so scheitern. Die Vorlage beschränkt die Vollmacht auf einen Zweck, etwa Post abholen, ein Fahrzeug an- oder abmelden, eine Wohnung übergeben oder Unterlagen bei einer Behörde holen, und auf einen Zeitraum, standardmäßig vier Wochen. Sie ist jederzeit widerruflich, und Untervollmacht ist ausgeschlossen, wenn Sie nichts anderes wählen. Für Vorsorge-, Bank- oder Generalvollmachten ist sie nicht gedacht: Banken verlangen eigene Formulare, und für Grundstücke braucht es den Notar.`,
    faqs: (h) => [
      { q: 'Muss eine Vollmacht handschriftlich unterschrieben sein?', a: 'Für die Wirksamkeit nicht, aber praktisch ja. Behörden und Unternehmen verlangen eine unterschriebene Vollmacht im Original, oft zusammen mit einer Kopie Ihres Ausweises. Bei einseitigen Erklärungen wie einer Kündigung kann der Empfänger sie ohne Original sofort zurückweisen (§ 174 BGB). Drucken Sie die Vollmacht deshalb aus und unterschreiben Sie eigenhändig.' },
      { q: 'Wie lange gilt eine Vollmacht?', a: 'So lange, wie Sie es hineinschreiben, oder bis Sie sie widerrufen. Ohne Datum gilt sie unbegrenzt, was für eine einzelne Besorgung selten gewollt ist. Die Vorlage setzt daher ein Ende, standardmäßig vier Wochen nach Beginn. Lassen Sie sich die Urkunde nach Erledigung zurückgeben, denn ihr Besitz erzeugt nach außen weiter den Anschein der Vollmacht (§ 172 BGB).' },
      { q: 'Brauche ich eine Vollmacht für die Zulassungsstelle?', a: 'Ja, wenn jemand anderes für Sie ein Fahrzeug zulässt, ummeldet oder abmeldet. Die Zulassungsstellen erwarten eine schriftliche Vollmacht, den Ausweis des Bevollmächtigten und meist eine Kopie Ihres Ausweises, dazu die Fahrzeugpapiere. Manche Stellen haben eigene Formulare; fragen Sie vorher, ob dieses Muster dort genügt.' },
    ],
    body: (h) => `<h2>Die Vollmacht Vorlage für vier häufige Zwecke</h2>
<p>Zur Auswahl stehen Post und Pakete abholen, ein Fahrzeug an-, um- oder abmelden, die Wohnungsübergabe mit Protokoll und Schlüsseln sowie ein Behördengang. Für alles andere beschreiben Sie die Angelegenheit in eigenen Worten. Je enger die Beschreibung, desto geringer das Risiko eines Missbrauchs.</p>
${h.table(['Zweck', 'Was mitbringen', 'Hinweis'], [['Post abholen', 'Vollmacht, Ausweis des Bevollmächtigten', 'Zusteller haben teils eigene Formulare'], ['Fahrzeug an- oder abmelden', 'Vollmacht, Ausweise, Fahrzeugpapiere', 'vorher Formular der Stelle prüfen'], ['Wohnungsübergabe', 'Vollmacht, Schlüssel', 'Protokoll erst lesen, dann unterschreiben'], ['Behördengang', 'Vollmacht, Ausweise', 'Anträge auf Pass oder Ausweis nur persönlich']], 'Was die Gegenseite typischerweise sehen will', ['l', 'l', 'l'])}
<h2>Wer unterschreibt</h2>
<p>Unterschreiben muss der Vollmachtgeber. Die zweite Zeile für den Bevollmächtigten ist freiwillig und bestätigt nur, dass er von der Vollmacht weiß. Wer eine Wohnung kündigen lässt, legt der ${h.a('kuendigung-mietvertrag', 'Kündigung')} die Vollmacht im Original bei; wer ein Auto verkauft und den Käufer ummelden lässt, regelt das im ${h.a('kfz-kaufvertrag', 'Kfz-Kaufvertrag')}. Die Schriftform im Sinne des ${h.src('bgb126', '§ 126 BGB')} verlangt eine eigenhändige Unterschrift auf Papier.</p>`,
  },
  en: {
    slug: 'power-of-attorney-template',
    nav: 'Power of attorney',
    card: 'German power of attorney for post, vehicle registration, a flat handover or a public office, valid from and to.',
    title: 'Power of attorney template: one matter in Germany, PDF',
    description: 'Power of attorney template for one matter in Germany: collect post, register a car, hand over a flat or visit a public office, with a validity period, as PDF.',
    h1: 'German power of attorney template for one matter',
    intro: 'This German power of attorney template (Vollmacht) authorises a person you trust for one specific matter and a set period; the tool shows how many days it is valid.',
    resume: (h) => `A power of attorney lets someone else act in your name. Under German law it needs no particular form (${h.src('bgb167', 'section 167(2) BGB')}), but without paper nobody at a post office counter, a vehicle registration office or a landlord’s will accept it. It also matters because the recipient may reject a unilateral declaration if the agent does not present the original document (${h.src('bgb174', 'section 174 BGB')}); a notice given by a representative can fail that way. The template limits the authority to one purpose, such as collecting post, registering or deregistering a vehicle, handing over a flat or picking up documents at a public office, and to a period, four weeks by default. It can be revoked at any time, and delegation is excluded unless you choose otherwise. It is not meant for lasting, banking or general powers: banks require their own forms, and land needs a notary. The document prints in German.`,
    faqs: (h) => [
      { q: 'Does a German power of attorney need a handwritten signature?', a: 'Not for validity, but in practice yes. Public offices and businesses expect a signed original, often with a copy of your ID card. For unilateral declarations such as a notice, the recipient may reject it at once without the original (section 174 BGB). So print it and sign it by hand before giving it to your agent.' },
      { q: 'How long is a power of attorney valid?', a: 'As long as it says, or until you revoke it. Without a date it is unlimited, which is rarely wanted for a single errand. The template therefore sets an end, four weeks after the start by default. Ask for the document back once the matter is done, because holding it keeps up the appearance of authority (section 172 BGB).' },
      { q: 'Do I need one for the vehicle registration office?', a: 'Yes, if someone else registers, re-registers or deregisters a vehicle for you. Registration offices expect a written power of attorney, the agent’s ID and usually a copy of yours, plus the vehicle papers. Some offices have their own forms; ask beforehand whether this template is accepted there.' },
    ],
    body: (h) => `<h2>The German power of attorney template for four common purposes</h2>
<p>You can choose collecting post and parcels, registering or deregistering a vehicle, a flat handover with report and keys, or an errand at a public office. For anything else, describe the matter in your own words. The narrower the description, the lower the risk of misuse.</p>
${h.table(['Purpose', 'What to bring', 'Note'], [['Collect post', 'power of attorney, agent’s ID', 'carriers sometimes have their own forms'], ['Register or deregister a vehicle', 'power of attorney, IDs, vehicle papers', 'check the office’s form first'], ['Flat handover', 'power of attorney, keys', 'read the report before signing'], ['Public office errand', 'power of attorney, IDs', 'passport and ID applications only in person']], 'What the other side usually wants to see', ['l', 'l', 'l'])}
<h2>Who signs</h2>
<p>The principal must sign. The second line for the agent is optional and only confirms that the agent knows about it. If someone gives notice on your flat for you, enclose the original with the ${h.a('kuendigung-mietvertrag', 'tenancy notice')}; if you sell a car and let the buyer register it, cover that in the ${h.a('kfz-kaufvertrag', 'car sale contract')}. Written form under ${h.src('bgb126', 'section 126 BGB')} means a handwritten signature on paper.</p>`,
  },
});
