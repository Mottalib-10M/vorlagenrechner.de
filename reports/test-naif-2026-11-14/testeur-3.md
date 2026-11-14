# Test naïf du 2026-11-14, testeur 3 : vorlagenrechner.de
**Persona :** Allemand(e) de 61 ans, se sert de son téléphone pour WhatsApp et la météo, lit lentement, se méfie des sites qui demandent des données, ne comprend pas les sigles, ne lit pas l'anglais. Il/elle a cliqué sur le résultat Google « Kündigung Vorlage: Schreiben mit Enddatum, kostenlos » parce qu'il/elle doit résilier un abonnement (ou aider un proche à le faire).

## 1. Concept

**Après 5 secondes (01-accueil-1) :** « C'est bien ce que Google m'a promis. » Le grand titre « Kündigung Vorlage mit berechnetem Enddatum » reprend mot pour mot le résultat de recherche, et la phrase dessous est simple : « rechnet zuerst aus, wann Ihr Vertrag endet, und setzt das Datum dann in ein fertiges Schreiben ein ». Le bandeau du bas « Der Vertrag endet am 31. Dezember 2026 » donne déjà une date. Elle comprend : « je mets mon contrat, il me dit quand ça s'arrête et il m'écrit la lettre ». Le drapeau allemand dans le logo la rassure : c'est un site allemand.

**Après 2 minutes :** elle a vu le formulaire, la date en gros, puis la lettre toute faite (« Kündigung meines Vertrags … hiermit kündige ich den oben genannten Vertrag ordentlich und fristgerecht zum 31. Dezember 2026 »), et les boutons « Drucken oder als PDF speichern » / « Text kopieren ». Le concept est clair : **une lettre de résiliation prête, avec la bonne date de fin**. Elle découvre aussi, par le menu, qu'il y a d'autres modèles (loyer, travail, téléphone, salle de sport, électricité, vente de voiture).

**Pour qui :** tout particulier qui veut résilier un contrat sans se tromper de date. **Bénéfice concret :** ne plus se demander « jusqu'à quand je dois envoyer ma lettre ? » (« Spätester Zugang dafür 30. November 2026 ») et avoir une lettre propre, gratuite, sans inscription.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'idée, non pour tout le détail.** L'idée et le résultat principal (la date en gros, la lettre) sont compris par n'importe qui. Ça décroche à trois endroits :
- **Les dates des champs** s'affichent « 11/14/2026 », « 04/01/2021 » : à l'américaine. Une Allemande lit « 04/01/2021 » comme le 4 janvier, pas le 1er avril.
- **Le vocabulaire juridique** dans les cases de résultat : « Spätester Zugang dafür », « Recht – ab 1. März 2022 », « Textform », « Sondervertrag », « Faustformel », « Sachmängelhaftung », « Arglist », « hilfsweise ». Et les paragraphes truffés de « § 309 Nr. 9 BGB », « § 56 TKG », « Art. 229 § 60 EGBGB », « BGH, VIII ZR 206/04 ».
- **Des dates passées affichées dans le résultat** (salle de sport, électricité) qui font peur : « Spätester Zugang dafür 28. Februar 2026 » alors qu'on est en novembre 2026.

## 3. Parcours écran par écran

- **01-accueil-1** : compris. Titre = promesse Google. Le petit texte gris « Unabhängige Seite, keine Kanzlei … keine Rechtsberatung » est honnête mais très petit. Le choix « Welcher Vertrag? – Abo, Zeitschrift, Streaming » est clair. **Coince** sur « 11/14/2026 » : « le 14e mois ? » Elle finit par comprendre que c'est aujourd'hui, mais elle hésite. « EN » en haut : elle l'ignore.
- **01-accueil-suite1** : le bandeau collant « Der Vertrag endet am 31. Dezember 2026 » **cache la case « Mindestlaufzeit in Monaten »** : elle ne voit pas ce qui est rempli (24 ? 12 ?). Puis « Kündigungsfrist laut Vertrag in Monaten – 1 » : compris. « Kunden- oder Vertragsnummer », nom, adresse : compris, mais elle se demande si elle doit vraiment donner son adresse à un site.
- **01-accueil-suite2** : « Anbieter », « Ort der Unterschrift », « Datum » : compris. L'encadré jaune « Beispiel: Vertrag seit Januar 2025, 24 Monate, ein Monat Frist — ändern Sie eine Zahl, um Ihr Ergebnis zu sehen » est **très utile** : elle comprend que ce n'est pas encore son cas à elle.
- **01-accueil-suite3** : « Ende der Mindestlaufzeit 31. Dezember 2026 » compris ; « Spätester Zugang dafür 30. November 2026 » : elle devine « dernier jour pour que ça arrive », mais le mot « Zugang » ne lui parle pas. « Recht – ab 1. März 2022 » : **incompris** (« quel droit ? »). « Eingaben bleiben in Ihrem Browser » : rassurant, mais elle ne sait pas bien ce qu'est un « Browser ». Les boutons noir/blanc sont clairs. La lettre commence par des traits : expliqué par « Leere Felder erscheinen als Linie zum Ausfüllen von Hand » : compris.
- **01-accueil-suite4** : la lettre : **très bien**, polie, normale, elle reconnaît une vraie lettre allemande. « hilfsweise zum nächstmöglichen Termin » : elle ne comprend pas, mais ça fait sérieux. La phrase sur le prélèvement SEPA lui plaît.
- **01-accueil-suite5** : paragraphe « Eine Kündigung ist eine einseitige Erklärung … (§ 130 BGB) … § 309 Nr. 9 BGB » : elle décroche, trop de paragraphes. « Ganzen Absatz lesen » : elle ne clique pas. « Von Radif Partners » : inconnu, ni rassurant ni inquiétant.
- **01-accueil-suite6 / suite7** : « so arbeitet der Rechner » : texte clair (« Sie tragen drei Daten ein … »). Le tableau « Rechenbeispiele » **coince** : les dates en gras (« 1. Oktober 2026 », « 15. Dezember 2026 ») n'ont pas d'étiquette ; elle ne sait pas que c'est le jour où la lettre arrive. « Altvertrag » : à peu près compris.
- **01-accueil-suite8 / suite9** : tableau « Welche Frist für welchen Vertrag gilt » : la colonne de droite est lisible (« 3 Monate », « Schriftform », « Textform »). L'explication « Schriftform heißt … Papier mit eigenhändiger Unterschrift. Textform heißt … also auch E-Mail » est **excellente** : enfin des mots simples. « Wer bei der Form unsicher ist, wählt Papier » : le conseil qu'elle retient.
- **01-accueil-suite10** : « Zugang beweisen » : utile et concret (Einwurf-Einschreiben, « nie am letzten Tag »). Elle comprend.
- **01-accueil-suite11** : « Fristen und Feiertage » : trop technique, elle passe. « Alle Vorlagen im Überblick » : liste claire de liens.
- **01-accueil-suite12** : « Woher die Regeln kommen » : « gesetze-im-internet.de, dem Angebot des Bundesministeriums der Justiz » la rassure. Le reste (UrhG, BGH, I ZR 113/20) : elle passe.
- **02-menu-1** : compris. Rubriques nettes (« Wohnen », « Arbeit », « Verträge kündigen », « Weitere Vorlagen »). Elle voit tout de suite « Fitnessstudio kündigen », « Stromvertrag kündigen ». Petit doute : « Arbeit » et « Weitere Vorlagen » sont fermés, elle ne sait pas qu'il faut toucher la flèche.
- **03-de-aufhebungsvertrag-1** : « Aufhebungsvertrag Vorlage mit Abfindungsrechner » : elle connaît vaguement le mot. « gesetzlichen Faustformel » : incompris. Dates « 09/01/2020 », « 01/31/2027 » : **le « 31 » en 2e position la trouble** (« le 1er du 31e mois ? »).
- **03-…-suite1** : le bandeau cache « Monatsgehalt brutto » et sa valeur. « Freistellung bis zum Ende – ja, unwiderruflich, bezahlt », « Zeugnis – qualifiziert, Note gut » : compréhensible pour quelqu'un qui a travaillé. « Auf wessen Veranlassung? » : formulation lourde.
- **03-…-suite2 / suite3** : « Abfindung nach der Faustformel 12.600 € – 0,5 Monatsgehälter × 6 Jahre » : compris grâce au calcul affiché. « Mögliche Sperrzeit beim Arbeitslosengeld bis 12 Wochen » : **avertissement précieux**, elle le note. Mais il n'est pas expliqué ici (pourquoi ? que faire ?).
- **03-…-suite4 à suite6** : le contrat (§ 1 à § 6) est clair et complet ; « vererblich » l'étonne mais ça rassure. Bon document.
- **04-de-kfz-kaufvertrag-1 à suite6** : très clair. « Kaufpreis … in Worten: achttausendfünfhundert Euro » : elle adore, c'est ce qu'on lui a toujours dit de faire. « Fahrzeug-Identifizierungsnummer (FIN) » : le sigle est expliqué, bien. « Sachmängelhaftung – ausgeschlossen (privat) » et « außer Arglist und Garantie » : **jargon**. Le bandeau cache le choix « Zahlung ». « Erstzulassung 05/01/2018 » puis la lettre dit « 1. Mai 2018 » : elle comprend après coup que l'écran affichait le mois en premier, ce qui confirme le problème du format.
- **05-de-kuendigung-arbeitsvertrag-1 à suite6** : clair. « Letzter Arbeitstag im Vertrag 15. Dezember 2026 » : parfait, c'est la question qu'on se pose. « Beginn des Arbeitsverhältnisses 04/01/2021 » : elle lit le 4 janvier. Le bandeau masque un champ sous « Probezeit vereinbart? ». « Form – Papier, eigenhändig unterschrieben » : **très clair**, exemplaire. La lettre est polie (« Für die gemeinsame Zeit bedanke ich mich »). Les « Rechenbeispiele » avec « Grundfrist endet » : à moitié compris.
- **06-de-kuendigung-fitnessstudio-1 à suite6** : résultat « 14. Dezember 2026 » compris. **Coince** : juste dessous, « Ende der Mindestlaufzeit 31. März 2026 » et « Spätester Zugang dafür 28. Februar 2026 ». Elle panique : « j'ai raté la date, c'est trop tard ? » Il faut relire la petite ligne « nach der Mindestlaufzeit: höchstens ein Monat ab Zugang » pour être rassurée. « Vertragsbeginn 04/01/2025 » alors que l'exemple jaune dit « seit April 2025 » : elle voit la contradiction apparente. Le bandeau cache « Mindestlaufzeit » et l'étiquette du champ « 1 ». La lettre (carte de membre, SEPA) : très bien.
- **07-de-kuendigung-handyvertrag-1 à suite6** : clair. « Rufnummer mitnehmen? – nein » : compris. « Anschlusskennung » : incompris. Le résultat (28. Februar 2027, Zugang bis 28. Januar 2027) est logique. Le texte « Sie können jederzeit mit einer Frist von einem Monat kündigen » : **phrase rassurante et simple**. Le tableau en bas répète « Regel / Ende der Mindestlaufzeit » : peu parlant.
- **08-de-kuendigung-mietvertrag-1 à suite6** : « Bundesland (Feiertage) » : elle comprend pourquoi on lui demande sa région, bien. Le bandeau masque le premier champ « Mieter ». « Ihre IBAN für die Kaution » : **méfiance forte** (« pourquoi un site veut mon numéro de compte ? »), même si c'est pour la lettre au propriétaire. Résultat : « Stichtag 4. November 2026 verpasst: ein Monat später » : le mot « verpasst » inquiète, mais l'explication (ça décale d'un mois) est comprise. « Zum Vergleich: Frist des Vermieters nach 8 Jahren 9 Monate » : **incompris** (« quels 8 ans ? Je suis locataire, pas propriétaire »). La lettre est bonne (Kaution, Übergabe).
- **09-de-kuendigung-stromvertrag-1 à suite6** : « Tarif – Sondervertrag mit Laufzeit » : **mot inconnu** ; le texte de la fin (« Auf der Rechnung steht, ob Sie „Grundversorgung“ oder einen Tarifnamen haben ») l'explique, mais seulement tout en bas. Mêmes dates passées dans le résultat (« Ende der Mindestlaufzeit 31. Januar 2026 », « Spätester Zugang dafür 31. Dezember 2025 ») : même peur que pour la salle de sport. « Anlass – Anbieterwechsel » : compris. La lettre (« Ich wechsle den Lieferanten. Den Zählerstand … teile ich Ihnen mit ») : très bien.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Calcul de la date de fin (bandeau collant + case résultat) | Oui, tout de suite | Oui pour la date en gros, non pour « Zugang » et « Recht » | Très | 4 |
| Lettre pré-remplie | Oui, en défilant | Oui | Très | 4 |
| « Drucken oder als PDF speichern » | Oui | Oui pour « Drucken » ; « PDF » flou au téléphone | Oui | 4 |
| « Text kopieren » | Oui | Elle ne sait pas où le coller ensuite | Moyen pour elle | 3 |
| « Zum fertigen Dokument » (lien) | Oui | Oui | Pratique pour sauter le texte | 3 |
| Exemple jaune « ändern Sie eine Zahl » | Oui | Oui | Rassurant | 5 |
| Menu ☰ | Oui | Oui | Oui | 4 |
| Tableau des délais par contrat | Oui | Colonne droite oui, sigles non | Oui | 3 |
| Montant en toutes lettres (Kfz) | Oui | Oui | Très | 5 |
| Calcul d'Abfindung | Oui | Oui grâce à la formule affichée | Oui | 4 |
| « Ganzen Absatz lesen » | Oui | Oui | Elle ne l'ouvre pas | 3 |
| Bouton « EN » | Oui | Elle ne lit pas l'anglais | Non pour elle | – |

## 5. Enchaînement et navigation

- Le schéma est **le même sur toutes les pages** (titre, phrase, formulaire, encadré jaune, résultat, boutons, lettre, explications) : au 3e modèle elle sait où regarder. Très bon point.
- Le fil d'Ariane « Startseite / … » lui permet de revenir.
- Le bandeau collant en bas donne la réponse sans attendre, c'est le meilleur élément du site. Mais en défilant, il **cache à chaque page un champ** (Mindestlaufzeit, Monatsgehalt brutto, Zahlung, champ du locataire…).
- Le formulaire est **long** (souvent 15 champs) avant d'arriver au résultat détaillé et à la lettre ; le lien « Zum fertigen Dokument » est placé après le formulaire, donc elle ne sait pas tout de suite qu'il y a une lettre plus bas.
- Sur l'accueil, la longue partie juridique après la lettre est lourde pour elle : elle s'arrête à « Zugang beweisen ».

## 6. Difficultés classées

1. **Format des dates à l'américaine** (01-accueil-1, 03-…-1, 05-…-1, 06-…-1, 04-…-suite1) : « 11/14/2026 », « 04/01/2021 », « 01/31/2027 ». Elle lit 04/01/2021 comme le 4 janvier ; l'exemple dit « seit April 2025 » et le champ affiche « 04/01/2025 ». Risque d'erreur de date, sur un site dont tout l'intérêt est la date exacte. **Recommandation :** forcer l'affichage TT.MM.JJJJ (langue de la page = de-DE), ou afficher sous chaque champ la date en toutes lettres : « = 1. April 2025 ».
2. **Dates passées dans le résultat** (06-…-suite3, 09-…-suite3) : « Spätester Zugang dafür 28. Februar 2026 » en novembre 2026 = panique « trop tard ». **Recommandation :** quand la durée minimale est déjà finie, remplacer ces deux lignes par une seule : « Mindestlaufzeit schon vorbei (seit 31. März 2026) – Sie können jetzt jederzeit mit einem Monat kündigen. »
3. **Le bandeau collant cache des champs** (01-accueil-suite1, 03-…-suite1, 04-…-suite1, 05-…-suite1, 06-…-suite1, 08-…-suite1) : on ne voit pas « Mindestlaufzeit » ni sa valeur, ni « Monatsgehalt brutto ». **Recommandation :** réduire le bandeau à une ligne (« Vertrag endet: 31.12.2026 ») et ajouter une marge en haut des champs quand on les touche (scroll-margin), ou masquer le bandeau pendant la saisie.
4. **Mots juridiques dans la case résultat** (01-accueil-suite3 et toutes les pages) : « Spätester Zugang dafür », « Recht – ab 1. März 2022 ». **Remplacement :** « Spätester Zugang dafür » → « Ihr Brief muss spätestens ankommen am » ; « Recht: ab 1. März 2022 » → « Es gilt die neue Regel für Verträge ab 1. März 2022 » (ou supprimer la ligne).
5. **IBAN demandé** (08-…-suite2) : méfiance immédiate. **Recommandation :** ajouter sous le champ : « freiwillig – erscheint nur in Ihrem Brief an den Vermieter, wird nicht an uns gesendet ».
6. **« Zum Vergleich: Frist des Vermieters nach 8 Jahren 9 Monate »** (08-…-suite3) : sans rapport visible avec sa situation de locataire, origine des « 8 Jahre » invisible. **Remplacement :** « Nur zur Info: Würde der Vermieter kündigen, hätte er nach 8 Jahren Mietdauer 9 Monate Frist. » ou retirer la ligne.
7. **Termes non expliqués au moment du choix** (09-…-1 « Sondervertrag mit Laufzeit », 04-…-suite2 « Sachmängelhaftung », 03-…-1 « Faustformel », 07-…-suite1 « Anschlusskennung ») : **Recommandation :** une aide d'une ligne sous le champ, p. ex. sous « Tarif » : « Steht auf Ihrer Rechnung „Grundversorgung“? Sonst ist es ein Sondervertrag. » ; sous Sachmängelhaftung : « = Sie haften nicht für spätere Mängel (bei privat üblich) ».
8. **Tableaux « Rechenbeispiele » sans étiquette** (01-accueil-suite6/7, 05-…-suite6) : la date en gras (« 1. Oktober 2026 ») n'est pas nommée. **Remplacement :** « Brief kommt an am 1. Oktober 2026 → Vertrag endet am … ».

## 7. À garder

- Le titre qui reprend exactement la promesse Google, et la phrase d'explication en dessous.
- Le bandeau « Der Vertrag endet am … » : la réponse visible dès le premier écran.
- L'encadré jaune « Beispiel: … — ändern Sie eine Zahl, um Ihr Ergebnis zu sehen ».
- La lettre toute faite, polie, avec la date déjà insérée, et les traits « zum Ausfüllen von Hand » (on peut tout faire au stylo sans rien donner au site).
- « Form – Papier, eigenhändig unterschrieben » et l'explication Schriftform / Textform en mots simples.
- « Kaufpreis … in Worten » sur la vente de voiture.
- « Zugang beweisen » et le conseil « nie am letzten Tag ».
- « Eingaben bleiben in Ihrem Browser » et « Unabhängige Seite, keine Kanzlei » : honnêtes et rassurants.
- La même construction sur toutes les pages, et un menu clair par thème.

## 8. Notes

Clarté : 7/10
Facilité : 6/10
Utilité : 8/10
