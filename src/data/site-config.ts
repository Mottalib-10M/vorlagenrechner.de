/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://vorlagenrechner.de";
export const SITE_NAMES: Record<string, string> = {"de": "Vorlagenrechner", "en": "Vorlagenrechner"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "rechner";
export const LANG_TAGS: Record<string, string> = {"de": "de-DE", "en": "en-DE"};
export const OG_LOCALES: Record<string, string> = {"de": "de_DE", "en": "en_GB"};
export const LOCALE_TAG = 'de-DE';
export const LOCALE_BY_LANG: Record<string, string> = { de: 'de-DE', en: 'en-IE' };
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-11-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"de": "Unabhängiger Herausgeber kostenloser Vertrags- und Kündigungsvorlagen zum Ausfüllen im Browser, mit Fristenrechner nach dem BGB", "en": "Independent publisher of free German contract and termination templates you fill in in your browser, with a notice-period calculator based on the German Civil Code"};
export const AUTHOR_DESC: Record<string, string> = {"de": "Radif Partners ist ein unabhängiger Herausgeber. Für den Vorlagenrechner liest es die einschlägigen Paragrafen des Bürgerlichen Gesetzbuchs auf gesetze-im-internet.de (§§ 126, 193, 309, 535 bis 580a, 622, 623, 516, 433, 286 und 167) und rechnet jede Kündigungsfrist im Browser nach diesen Regeln. Die Vorlagen sind standardisierte Textbausteine wie in einem Formularhandbuch: keine Prüfung Ihres Einzelfalls, keine Rechtsberatung. Radif Partners ist keine Kanzlei.", "en": "Radif Partners is an independent publisher. For the Vorlagenrechner it reads the relevant sections of the German Civil Code (BGB) on gesetze-im-internet.de (sections 126, 193, 309, 535 to 580a, 622, 623, 516, 433, 286 and 167) and computes every notice period in the browser from those rules. The templates are standard text blocks, like a book of legal forms: no review of your individual case and no legal advice. Radif Partners is not a law firm."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"de": ["Mietvertrag und Untermietvertrag", "Kündigungsfristen nach § 573c und § 622 BGB", "Kündigung von Verbraucherverträgen nach § 309 Nr. 9 BGB", "Aufhebungsvertrag", "Vollmacht", "Kfz-Kaufvertrag und Schenkungsvertrag"], "en": ["German residential leases and sublets", "German notice periods for tenancies and employment", "Cancelling consumer contracts in Germany", "Termination agreements in Germany", "Powers of attorney in Germany"]};
export const CONTACT_EMAIL = "contact@vorlagenrechner.de";
export const THEME_COLOR = '#2B3A55';
export const LOGO_SYMBOL = 'VR';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = 'b3d856202457a43037e32dcde12cf4e0';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',
  legalForm: '',  // vide : forme juridique non publiée, comme sur les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Frankreich / France",
  phone: '',
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "USt-IdNr.",
  vatNumber: '',
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
