import { defineGuide } from '../../lib/guide-types';

/** Privater Autokauf : §§ 433, 434, 444 BGB, Veräußerungsanzeige nach der Fahrzeug-Zulassungsverordnung. */
export default defineGuide({
  id: 'kfz-kaufvertrag',
  group: 'weitere',
  order: 2,
  doc: 'kfz',
  related: ['vollmacht', 'versicherung', 'schenkungsvertrag'],
  sources: ['bgb433', 'bgb444', 'bgb126'],
  de: {
    slug: 'kfz-kaufvertrag',
    nav: 'Kfz-Kaufvertrag',
    card: 'Gebrauchtwagen privat verkaufen: Kaufvertrag mit Preis in Worten, Kilometerstand, Schäden und Übergabezeit.',
    title: 'Kfz Kaufvertrag Vorlage: Gebrauchtwagen privat verkaufen',
    description: 'Kfz Kaufvertrag Vorlage für den Privatverkauf: Preis in Worten, Kilometerstand, Unfallschäden, Ausschluss der Gewährleistung und Übergabezeit, als PDF drucken.',
    h1: 'Kfz Kaufvertrag Vorlage für den privaten Autoverkauf',
    intro: 'Diese Kfz Kaufvertrag Vorlage schreibt den Kaufpreis in Worten aus, rechnet das Alter des Wagens und hält Kilometerstand, Schäden und die genaue Übergabezeit fest.',
    resume: (h) => `Verkauft eine Privatperson ihr Auto an eine andere, gilt das Kaufrecht des BGB (${h.src('bgb433', '§ 433 BGB')}): Der Verkäufer übergibt Fahrzeug, Schlüssel und Papiere, der Käufer zahlt. Anders als ein Händler darf ein privater Verkäufer die Haftung für Sachmängel ausschließen, und das ist üblich. Der Ausschluss hilft aber nicht, wenn er einen Mangel arglistig verschwiegen oder eine Beschaffenheit garantiert hat (${h.src('bgb444', '§ 444 BGB')}). Deshalb listet der Vertrag bekannte Unfallschäden und Mängel ausdrücklich auf, und der Kilometerstand heißt „abgelesen“, nicht „garantiert“. Der Preis steht in Ziffern und in Worten, bei ${h.eur(8500)} also „${h.M.euroInWorten(8500)}“, damit niemand eine Zahl nachträglich ändert. Die Uhrzeit der Übergabe zählt, weil ab diesem Moment der Käufer für Unfälle, Strafzettel und Kosten verantwortlich ist. Melden Sie den Verkauf der Zulassungsstelle und der Versicherung; die Vorlage erinnert daran.`,
    faqs: (h) => [
      { q: 'Kann ich beim privaten Autoverkauf die Gewährleistung ausschließen?', a: 'Ja. Zwischen Privatpersonen ist der Satz „gekauft wie gesehen unter Ausschluss jeder Sachmängelhaftung“ zulässig. Er schützt aber nicht, wenn Sie einen bekannten Mangel verschweigen oder eine Eigenschaft zusichern (§ 444 BGB). Schreiben Sie bekannte Schäden deshalb in den Vertrag; die Vorlage hat dafür ein eigenes Feld.' },
      { q: 'Was muss ich nach dem Verkauf meines Autos melden?', a: 'Der Verkäufer zeigt der Zulassungsbehörde den Verkauf mit Namen und Anschrift des Käufers an. Der Versicherung melden Sie den Verkauf ebenfalls; der Vertrag geht auf den Käufer über, und beide können ihn kündigen. Behalten Sie eine Kopie des Kaufvertrags mit der Uhrzeit der Übergabe, falls später ein Bußgeldbescheid kommt.' },
      { q: 'Bar oder Überweisung beim Autokauf?', a: `Bei Barzahlung quittiert der Verkäufer den Empfang direkt auf dem Vertrag, die Vorlage hat dafür eine Zeile. Bei Überweisung übergibt der Verkäufer das Auto erst nach der Gutschrift, nicht nach einem Beleg über den Auftrag. Bei ${h.eur(8500)} oder mehr bar lohnt es, das Geld gemeinsam bei einer Bank zu prüfen.` },
    ],
    body: (h) => `<h2>Was im Kfz Kaufvertrag steht</h2>
<p>Vier Abschnitte: das Fahrzeug mit Hersteller, Modell, Fahrzeug-Identifizierungsnummer, Kennzeichen, Erstzulassung, Kilometerstand und nächster Hauptuntersuchung; der Kaufpreis in Ziffern und Worten mit der Zahlungsart; Zustand und Haftung mit Unfallschäden und bekannten Mängeln; Übergabe, Zulassung und Versicherung. Am Ende unterschreiben beide, bei Barzahlung quittiert der Verkäufer.</p>
${h.table(['Preis', 'in Worten'], [1900, 8500, 23750].map((p) => [h.eur(p), h.M.euroInWorten(p)]), 'So schreibt die Vorlage den Preis aus', ['r', 'l'])}
<h2>Übergabe ohne Ärger</h2>
<p>Prüfen Sie gemeinsam die Fahrzeug-Identifizierungsnummer am Wagen gegen die Zulassungsbescheinigung, übergeben Sie alle Schlüssel und Teil I und II der Zulassungsbescheinigung und notieren Sie den Kilometerstand. Soll der Käufer das Fahrzeug später für Sie abmelden, geben Sie ihm eine ${h.a('vollmacht', 'Vollmacht')} mit. Geht das Auto ohne Geld an ein Familienmitglied, ist es eine Schenkung; für Geld gibt es den ${h.a('schenkungsvertrag', 'Schenkungsvertrag')}.</p>`,
  },
  en: {
    slug: 'car-sale-contract',
    nav: 'Car sale contract',
    card: 'Sell a used car privately in Germany: contract with the price in words, mileage, damage and handover time.',
    title: 'Car sale contract template: private used car in Germany',
    description: 'Car sale contract template for a private used-car sale in Germany: price in words, mileage, accident damage, no-liability clause and handover time, as PDF.',
    h1: 'German car sale contract template for private sellers',
    intro: 'This German car sale contract template writes the price out in German words, works out the age of the car and records mileage, damage and the exact handover time (Kfz-Kaufvertrag).',
    resume: (h) => `When one private person sells a car to another in Germany, the sales law of the Civil Code applies (${h.src('bgb433', 'section 433 BGB')}): the seller hands over the car, keys and papers, and the buyer pays. Unlike a dealer, a private seller may exclude liability for defects, and that is common. The exclusion does not help, however, if he fraudulently concealed a defect or guaranteed a quality (${h.src('bgb444', 'section 444 BGB')}). The contract therefore lists known accident damage and defects expressly, and the mileage is “as read”, not “guaranteed”. The price appears in figures and in German words, for ${h.eur(8500)} that is “${h.M.euroInWorten(8500)}”, so nobody can alter a number later. The handover time matters because from that moment the buyer is responsible for accidents, fines and costs. Report the sale to the registration office and the insurer; the template reminds you. The contract prints in German, which is what German offices expect.`,
    faqs: (h) => [
      { q: 'Can I exclude liability when selling a car privately in Germany?', a: 'Yes. Between private persons the clause “bought as seen, excluding any liability for defects” is allowed. It does not protect you if you conceal a known defect or promise a quality (section 444 BGB). So write known damage into the contract; the template has a separate field for it, which keeps you on the safe side.' },
      { q: 'What must I report after selling my car?', a: 'The seller notifies the registration authority of the sale with the buyer’s name and address. Tell the insurer as well; the policy passes to the buyer, and both may cancel it. Keep a copy of the contract with the handover time in case a fine arrives later for a trip you did not make.' },
      { q: 'Cash or bank transfer?', a: `With cash the seller acknowledges receipt on the contract itself; the template has a line for that. With a transfer, hand over the car only once the money is credited, not on proof that the order was placed. For ${h.eur(8500)} or more in cash, checking the notes together at a bank is worth it.` },
    ],
    body: (h) => `<h2>What the German car sale contract contains</h2>
<p>Four sections: the vehicle with make, model, vehicle identification number, plate, first registration, mileage and next roadworthiness test; the price in figures and words with the payment method; condition and liability with accident damage and known defects; handover, registration and insurance. Both sign at the end, and with cash the seller signs a receipt.</p>
${h.table(['Price', 'in German words'], [1900, 8500, 23750].map((p) => [h.eur(p), h.M.euroInWorten(p)]), 'How the template writes the price out', ['r', 'l'])}
<h2>A smooth handover</h2>
<p>Check the identification number on the car against the registration certificate together, hand over all keys and parts I and II of the certificate, and note the mileage. If the buyer is to deregister the car for you later, give him a ${h.a('vollmacht', 'power of attorney')}. If the car goes to a family member for nothing, that is a gift; for money there is the ${h.a('schenkungsvertrag', 'gift agreement')}.</p>`,
  },
});
