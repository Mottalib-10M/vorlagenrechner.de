# Test naïf du 2026-11-14, testeur 2 : vorlagenrechner.de
**Persona :** Allemand(e) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Arrivé(e) depuis le résultat Google « Kündigung Vorlage: Schreiben mit Enddatum, kostenlos » (« Enddatum nach § 309 BGB auf den Tag berechnet, fertiges Schreiben zum Drucken oder Kopieren, gratis »), sur son téléphone.

## 1. Concept

**Après 5 s :** le titre « Kündigung Vorlage mit berechnetem Enddatum » reprend mot pour mot ce que Google m'a promis. La phrase dessous (« rechnet zuerst aus, wann Ihr Vertrag endet, und setzt das Datum dann in ein fertiges Schreiben ein ») est limpide. Le formulaire commence tout de suite (« Welcher Vertrag? » → « Abo, Zeitschrift, Streaming ») et la barre collée en bas me donne déjà une réponse : « Der Vertrag endet am 31. Dezember 2026 ». Je comprends : je mets mes dates, j'ai la date de fin et la lettre. Je reste.

**Après 2 min :** c'est un générateur de lettres/contrats « intelligent » : il calcule la date qui compte (fin de contrat, dernier jour de travail, fin de bail, indemnité de départ) et la glisse dans un modèle prêt à imprimer en PDF ou à copier. 15 autres modèles (Miete, Arbeit, Handy, Fitness, Strom, Kfz…). Gratuit, sans compte, « Eingaben bleiben in Ihrem Browser ».

**Clair ?** Oui, dès le premier écran. **Pour qui ?** Toute personne qui veut résilier un abonnement / contrat / bail / travail sans payer un service de résiliation. **Bénéfice concret :** je sais *à quelle date* mon contrat s'arrête et j'ai la lettre déjà écrite avec cette date, plus « hilfsweise zum nächstmöglichen Termin » qui me protège si je me trompe.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'essentiel (date + lettre), non pour les détails du bloc résultat.** Le grand chiffre est compris de tous. Ça décroche sur :
- les lignes secondaires du résultat en jargon juridique : « Spätester Zugang dafür », « Recht — ab 1. März 2022 », « Stichtag », « Mögliche Sperrzeit beim Arbeitslosengeld — bis 12 Wochen » ;
- les dates **déjà passées** affichées comme résultats (Fitness, Strom) sans dire qu'elles sont passées ;
- le format des dates dans les champs (« 11/14/2026 », « 09/01/2020 ») qui n'est pas allemand ;
- les tableaux d'exemples sans titre de colonne (on ne sait pas ce qu'est la date en gras).

## 3. Parcours écran par écran

- **01-accueil-1** — Compris. Titre = ma recherche. Mention « Unabhängige Seite, keine Kanzlei… keine Rechtsberatung » rassurante et honnête. Le champ « Tag, an dem der Anbieter die Kündigung erhält » est clair. Coince : dates en « 11/14/2026 » et « 01/01/2025 » (format US ; un Allemand lit 01/01 sans souci mais 11/14 est clairement « pas de chez nous »). Le champ « Mindestlaufzeit in Monaten » est coupé par la barre du bas.
- **01-accueil-suite1** — Coince : la barre collante « Der Vertrag endet am 31. Dezember 2026 » (énorme, sur 2 lignes) recouvre exactement le champ « Mindestlaufzeit in Monaten » : je ne vois jamais sa valeur (24, selon l'exemple plus bas). Le reste (Kundennummer, Ihre Angaben, Anbieter) est évident.
- **01-accueil-suite2** — Compris. Encadré jaune « Beispiel: Vertrag seit Januar 2025, 24 Monate, ein Monat Frist — ändern Sie eine Zahl, um Ihr Ergebnis zu sehen » : très bien, je sais que ce sont des valeurs d'exemple. Mais il arrive *après* tout le formulaire ; en haut je croyais que 31.12.2026 était déjà « mon » résultat.
- **01-accueil-suite3** — Compris : « Ende der Mindestlaufzeit 31. Dezember 2026 », « Spätester Zugang dafür 30. November 2026 ». Coince sur « Recht — ab 1. März 2022 » : c'est quoi, « Recht ab » ? Le lien « Zum fertigen Dokument » est utile. Boutons « Drucken oder als PDF speichern » / « Text kopieren » parfaits. « Leere Felder erscheinen als Linie zum Ausfüllen von Hand » : rassurant, mais j'aurais voulu le lire *avant* de me demander si je dois tout remplir.
- **01-accueil-suite4 / suite5** — Compris. La lettre est propre, sérieuse, avec la date calculée, la révocation du SEPA et le refus de la « Rückgewinnung » (bonne idée, je n'y aurais pas pensé). Texte explicatif replié avec « Ganzen Absatz lesen » : bien.
- **01-accueil-suite6 / suite7** — Coince : liste « Rechenbeispiele nach § 309 Nr. 9 BGB und Art. 229 § 60 EGBGB », puis « 1. Oktober 2026 » en gras et des dates à droite. Aucun en-tête : je dois deviner que la date en gras est le jour de réception et la date à droite la fin du contrat. « Altvertrag » pas expliqué à cet endroit.
- **01-accueil-suite8 / suite9** — Compris : tableau « Welche Frist für welchen Vertrag gilt » utile (Mieter 3 Monate, Arbeitnehmer 4 Wochen, Handy 24 Monate puis 1 Monat…). L'explication Schriftform / Textform est claire (« Wer bei der Form unsicher ist, wählt Papier »). Excellent conseil.
- **01-accueil-suite10 / suite11** — Compris, conseils concrets (« Schicken Sie Kündigungen deshalb einige Tage vor dem letzten Termin, nie am letzten Tag »). Bloc « Fristen und Feiertage » dense mais lisible. « Alle Vorlagen im Überblick » = un paragraphe de liens : fonctionne, mais une liste/cartes serait plus scannable sur mobile.
- **01-accueil-suite12** — « Woher die Regeln kommen » : rassurant (gesetze-im-internet.de, BGH I ZR 113/20). Trop juridique pour moi, mais ça inspire confiance.
- **02-menu-1** — Compris : Wohnen / Arbeit / Verträge kündigen / Weitere Vorlagen / Methode und Quellen. Coince légèrement : deux sections ouvertes, deux fermées, sans logique visible ; pas d'entrée « Kündigung allgemein » ni « Startseite » pour revenir au modèle d'accueil.
- **03-de-aufhebungsvertrag-1** — Compris : « Aufhebungsvertrag Vorlage mit Abfindungsrechner ». Barre « Abfindung nach der Faustformel 12.600 € » : parlant.
- **03-…-suite1** — Coince : la barre recouvre « Monatsgehalt brutto » ; je ne vois jamais quel salaire est pris (4.200 € n'apparaît que dans l'encadré jaune plus bas). Champs « Auf wessen Veranlassung? », « Freistellung bis zum Ende », « Zeugnis » compréhensibles.
- **03-…-suite3** — Compris : « 0,5 Monatsgehälter × 6 Jahre (§ 1a KSchG) ». Coince : l'intro promettait de vérifier « ob das vereinbarte Ende vor der Kündigungsfrist des Arbeitgebers liegt », mais je vois juste deux dates identiques (« Ende bei Kündigung durch den Arbeitgeber 31. Januar 2027 » / « Vereinbartes Ende 31. Januar 2027 ») sans verdict « OK ». Et « Mögliche Sperrzeit beim Arbeitslosengeld bis 12 Wochen » fait peur, sans dire si *mon* cas est concerné.
- **03-…-suite4 à suite6** — Compris : contrat bien structuré (§ 1 Beendigung… § 6 Hinweise), les valeurs saisies sont reprises (8 Tage Resturlaub, 12.600,00 €, Note „gut“).
- **04-de-kfz-kaufvertrag-1 à suite6** — Compris : prix en lettres (« achttausendfünfhundert Euro »), âge du véhicule, clause d'exclusion de garantie. Coince : la barre collante « Kaufpreis 8.500 € » ne fait que répéter ce que je viens de taper (aucune valeur ajoutée) et cache le champ « Zahlung ». « Sachmängelhaftung — ausgeschlossen (privat) » : terme technique mais le résultat le reformule (« ausgeschlossen, außer Arglist und Garantie »).
- **05-de-kuendigung-arbeitsvertrag-1 à suite6** — Compris : « Letzter Arbeitstag im Vertrag 15. Dezember 2026 », « vier Wochen zum 15. oder Monatsende ». La lettre demande le Zeugnis et le solde de congés : top. Coince : tableau « Arbeitnehmer, keine Probezeit » → « 10. Februar 2027 / Grundfrist endet 15. März 2027 » : la date en gras n'est pas nommée.
- **06-de-kuendigung-fitnessstudio-1 à suite6** — Compris : « Der Vertrag endet am 14. Dezember 2026 ». **Coince fort** : juste dessous, « Ende der Mindestlaufzeit 31. März 2026 » et « Spätester Zugang dafür 28. Februar 2026 » — ces dates sont *dans le passé*. Premier réflexe : « Mist, j'ai raté la date limite ? ». Il faut lire la petite ligne « nach der Mindestlaufzeit: höchstens ein Monat ab Zugang » pour comprendre que c'est bon. La barre cache à nouveau la valeur de « Mindestlaufzeit in Monaten ».
- **07-de-kuendigung-handyvertrag-1 à suite6** — Compris : « 28. Februar 2027 », « rechtzeitig zum Ende der Mindestlaufzeit ». « Rufnummer mitnehmen? » : bien vu. Coince : la barre cache le libellé du champ « 1 » (je ne sais pas que c'est la Kündigungsfrist).
- **08-de-kuendigung-mietvertrag-1 à suite6** — Compris : « Das Mietverhältnis endet am 28. Februar 2027 », « Stichtag 4. November 2026 verpasst: ein Monat später », « Nächster Stichtag 3. Dezember 2026 ». Très utile. Coince : « Zum Vergleich: Frist des Vermieters nach 8 Jahren 9 Monate » — d'où sortent ces 8 ans ? Le champ de début de bail n'apparaît pas à l'écran (masqué par la barre / entre deux écrans), et en tant que locataire je me fiche de la Frist du bailleur. « … Ende bei Zugang bis dahin » : formulation bancale.
- **09-de-kuendigung-stromvertrag-1 à suite6** — Compris : choix Grundversorgung / Sondervertrag, « Anlass: Anbieterwechsel », lettre qui dit « Ich wechsle den Lieferanten ». Coince : même problème que Fitness, « Ende der Mindestlaufzeit 31. Januar 2026 » et « Spätester Zugang dafür 31. Dezember 2025 » sont passées sans le dire.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Calcul de la date de fin (barre collante + bloc résultat) | Oui, immédiatement | Oui (grand chiffre) ; lignes secondaires moins | Très | 4 |
| Lettre/contrat pré-rempli en aperçu | Oui, en scrollant | Oui | Très | 4 |
| « Drucken oder als PDF speichern » / « Text kopieren » | Oui | Oui | Très | 5 |
| Lien « Zum fertigen Dokument » | Oui, dans le bloc résultat | Oui | Oui (raccourci) | 4 |
| Encadré « Beispiel… ändern Sie eine Zahl » | Oui, mais tard (après le formulaire) | Oui | Oui | 3 |
| Champs vides → lignes à remplir à la main | Oui, après coup | Oui | Oui | 3 |
| Choix « Welcher Vertrag? » (accueil) | Oui | Oui | Oui | 5 |
| Bundesland (Feiertage) pour la Miete | Oui | Oui | Oui | 4 |
| Abfindung nach Faustformel | Oui | Oui | Oui | 4 |
| Vérification « vereinbartes Ende vs. Kündigungsfrist » (Aufhebung) | Annoncée, pas visible comme verdict | Non | ? | 2 |
| Tableaux « Rechenbeispiele » | Oui | Partiellement (pas d'en-têtes) | Moyen | 2 |
| Tableau « Welche Frist für welchen Vertrag gilt » | Oui | Oui | Très | 4 |
| Bouton EN | Oui | Oui | Pour non-germanophones | 4 |
| Menu ☰ | Oui | Oui | Oui | 4 |

## 5. Enchaînement et navigation

- Ordre logique sur chaque page : titre → promesse → formulaire → résultat → explication courte → imprimer/copier → aperçu → méthode → exemples → guide. Les pages se ressemblent toutes : une fois la première comprise, les autres sont instantanées. Gros point fort.
- Fil d'Ariane « Startseite / … » présent partout : je sais où je suis.
- Le formulaire est long (jusqu'à ~15 champs d'adresse) avant d'arriver à la lettre ; un impatient peut croire qu'il *doit* tout remplir. Le « Zum fertigen Dokument » aide, mais il est dans le bloc résultat, lui aussi en bas du formulaire.
- La barre collante est une bonne idée (le résultat me suit) mais elle est haute (2 lignes en gros) et masque à chaque fois le champ juste sous le haut d'écran.
- Les liens vers les autres modèles sur l'accueil sont noyés dans un paragraphe.

## 6. Difficultés classées

1. **Dates passées affichées comme résultats sans le dire** — *06-…-suite3, 09-…-suite3*. Vécu : « 31. März 2026 », « Spätester Zugang dafür 28. Februar 2026 » → panique « c'est trop tard ». Reco : quand la date est dépassée, l'écrire : « Mindestlaufzeit schon vorbei (31. März 2026) – jetzt gilt: 1 Monat ab Zugang » et masquer ou griser « Spätester Zugang dafür ».
2. **La barre collante masque un champ** — *01-accueil-suite1, 03-…-suite1, 04-…-suite1, 06-…-suite1, 07-…-suite1, 08-…-suite1, 09-…-suite1*. Vécu : je ne vois ni la Mindestlaufzeit, ni le Monatsgehalt, ni la Zahlung. Reco : barre sur une seule ligne, plus fine (« Vertrag endet: 31.12.2026 »), et scroll-margin sur les champs pour qu'un champ actif ne passe jamais dessous. Sur le Kfz, remplacer « Kaufpreis 8.500 € » (simple écho) par une info utile ou supprimer la barre.
3. **Format des dates des champs « 11/14/2026 », « 09/01/2020 »** — *tous les formulaires*. Vécu : format américain ; « 09/01/2020 » se lit 9 janvier chez nous alors que la lettre dit « 1. September 2020 ». Reco : afficher TT.MM.JJJJ, ou au minimum répéter la date en clair sous le champ (« = 1. September 2020 »).
4. **Jargon dans le bloc résultat** — *01-accueil-suite3, 07-…-suite3, 09-…-suite3, 08-…-suite3*. Reco : « Spätester Zugang dafür » → « Kündigung muss ankommen bis » ; « Recht: ab 1. März 2022 » → « Neues Recht gilt (Vertrag ab 1. März 2022) » ; « … Ende bei Zugang bis dahin » → « Mietende, wenn der Brief bis dahin ankommt ».
5. **Aufhebungsvertrag : vérification promise, pas de verdict ; Sperrzeit anxiogène** — *03-…-suite3*. Reco : ajouter une ligne verdict : « ✓ Vereinbartes Ende hält die Kündigungsfrist ein – Sperrzeit-Risiko geringer » / « ✗ Ende liegt vor der Kündigungsfrist – Sperrzeit wahrscheinlich » ; renommer « Mögliche Sperrzeit… bis 12 Wochen » en « Arbeitsagentur kann ALG bis 12 Wochen sperren, wenn… ».
6. **L'exemple n'est annoncé qu'en bas du formulaire** — *01-accueil-1 vs suite2*. Vécu : en haut je crois que « 31. Dezember 2026 » est mon résultat. Reco : mettre la mention dès la barre ou sous le titre : « Beispielwerte – tragen Sie Ihre Daten ein ». Et sous « Ihre Angaben » : « Optional – leere Felder werden zur Linie zum Ausfüllen von Hand ».
7. **Tableaux d'exemples sans en-têtes** — *01-accueil-suite6/7, 05-…-suite6, 06-…-suite6*. Reco : titre de colonne « Kündigung kommt an am » / « Vertrag endet am ».
8. **Miete : « Frist des Vermieters nach 8 Jahren 9 Monate »** — *08-…-suite3*. Vécu : d'où viennent les 8 ans, et en quoi ça me concerne ? Reco : le supprimer de la carte locataire ou l'expliquer : « Nur zum Vergleich: Der Vermieter müsste Ihnen nach 8 Jahren Mietdauer 9 Monate vorher kündigen ».

## 7. À garder

- Le titre de l'accueil identique à la promesse Google, et la phrase d'intro en une ligne de sens.
- Le grand résultat en gras + la barre qui suit pendant le scroll (à affiner, pas à retirer).
- L'encadré jaune « Beispiel… ändern Sie eine Zahl, um Ihr Ergebnis zu sehen ».
- Les lettres elles-mêmes : propres, complètes (SEPA, Rückgewinnung, Zeugnis, Kaution + IBAN, Rufnummernmitnahme), « hilfsweise zum nächstmöglichen Termin ».
- « Drucken oder als PDF speichern » / « Text kopieren » et « Leere Felder erscheinen als Linie zum Ausfüllen von Hand ».
- L'honnêteté : « keine Kanzlei », « keine Rechtsberatung », « Eingaben bleiben in Ihrem Browser ».
- Le tableau « Welche Frist für welchen Vertrag gilt » et le conseil « nie am letzten Tag ».
- La structure identique d'une page à l'autre.

## 8. Notes

Clarté : 8/10
Facilité : 7/10
Utilité : 9/10
