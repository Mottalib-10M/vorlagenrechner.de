import type { Locale } from './routes';
const de = {
  updatedOn: 'Aktualisiert am', editorialPolicy: 'Redaktionelle Grundsätze', contactLabel: 'Kontakt', reviewedBy: 'Geprüft von',
  skipToContent: 'Zum Inhalt', mainNav: 'Hauptnavigation', breadcrumbLabel: 'Brotkrumen', breadcrumbHome: 'Startseite', menuOpen: 'Menü öffnen',
  faqTitle: 'Häufige Fragen', relatedCalculators: 'Verwandte Vorlagen', sourcesTitle: 'Quellen', writtenBy: 'Geschrieben von',
  asOf: 'Stand der Regeln', lastUpdated: 'gelesen am', footerValidated: 'Quellen: BGB, TKG, VVG, StromGVV, ErbStG, KSchG und SGB III auf gesetze-im-internet.de, Basiszinssatz der Bundesbank', footerBrowser: 'Ausfüllen im Browser · keine Anmeldung, keine E-Mail · kostenlos',
  footerDisclaimer: 'Unabhängige Seite von Radif Partners, keine Kanzlei und keine Behörde. Die Vorlagen sind standardisierte Textbausteine wie in einem Formularhandbuch; sie prüfen Ihren Einzelfall nicht, und die Seite ersetzt keine Rechtsberatung. Fristen werden nach dem Wortlaut der genannten Vorschriften berechnet; maßgeblich sind Ihr Vertrag und der tatsächliche Zugang des Schreibens. Was Sie eintippen, verlässt Ihren Browser nicht.', footerPopular: '', notFound: 'Diese Seite gibt es nicht.',
  readMore: 'Weiterlesen', independent: 'Unabhängige Seite, keine Kanzlei: Vorlage wie aus einem Formularhandbuch, keine Rechtsberatung.',
};
const en: typeof de = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Frequently asked questions', relatedCalculators: 'Related templates', sourcesTitle: 'Sources', writtenBy: 'Written by',
  asOf: 'Rules as of', lastUpdated: 'read on', footerValidated: 'Sources: German Civil Code (BGB), TKG, VVG, StromGVV, ErbStG, KSchG and Social Code III on gesetze-im-internet.de, Bundesbank base rate', footerBrowser: 'Filled in in your browser · no sign-up, no email · free',
  footerDisclaimer: 'Independent site published by Radif Partners, not a law firm and not an authority. The templates are standard text blocks, like a book of legal forms; they do not review your individual case and are no substitute for legal advice. Deadlines are computed from the wording of the statutes cited; your contract and the actual day the letter is received are what count. What you type never leaves your browser.', footerPopular: '', notFound: 'This page does not exist.',
  readMore: 'Read more', independent: 'Independent site, not a law firm: a standard template, like a book of legal forms, not legal advice.',
};
export function t(lang: Locale) { return lang === 'en' ? en : de; }
