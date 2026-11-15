# Test naïf du 2026-11-14 (tour2), testeur 1 : vorlagenrechner.de
**Persona :** Allemand(e) de 45 ans, salarié(e), à l'aise avec son téléphone, aucune connaissance particulière du sujet, ne lit pas les longs paragraphes. A tapé sa question dans Google (« Kündigung Vorlage ») et a cliqué sur le résultat « Kündigung Vorlage: Schreiben mit Enddatum, kostenlos » parce qu'elle veut vraiment résilier un abonnement.

## 1. Concept

**Après 5 s :** le titre « Kündigung Vorlage mit berechnetem Enddatum » répond mot pour mot à la promesse de Google. Le chapeau « rechnet zuerst aus, wann Ihr Vertrag endet, und setzt das Datum dann in ein fertiges Schreiben ein » est clair. En bas de l'écran, la barre « Der Vertrag endet am 31. Januar 2027 » montre tout de suite qu'il y a un calcul. Elle pense : « je mets mes dates, j'obtiens la lettre avec la bonne date de fin ». C'est juste.

**Après 2 min :** elle a compris qu'il s'agit d'un site de modèles de lettres et de contrats (16 au total) qui calculent eux-mêmes les dates et les montants : résiliation d'abonnement, de bail, de travail, de mobile, de salle de sport, d'électricité, plus Aufhebungsvertrag, Kfz-Kaufvertrag… La lettre est visible en entier sous le formulaire, avec « Drucken oder als PDF speichern » et « Text kopieren ».

**Clair ?** Oui. **Pour qui ?** Pour un particulier qui veut résilier ou signer quelque chose sans avocat. **Bénéfice concret :** savoir à quelle date le contrat prend fin et à quelle date la lettre doit arriver au plus tard (« Muss spätestens ankommen am 31. Dezember 2026 »), puis repartir avec une lettre prête à signer. Gratuit, sans compte, « Eingaben bleiben in Ihrem Browser ».

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'essentiel, avec quelques décrochages.** Le parcours « je change une date, je lis le résultat, j'imprime » marche sans rien lire d'autre. Ça décroche :
- quand la barre collée en haut de l'écran cache l'intitulé du champ qu'on remplit (« Mindestlaufzeit in Monaten », « Monatsgehalt brutto », « Zahlung », la date d'arrivée sur Strom) : elle voit un « 12 » ou un « 24 » sans savoir à quoi il correspond ;
- sur le vocabulaire juridique de la carte de résultat et de la lettre : « Welche Regeln gelten: neue Regeln: Vertrag ab 1. März 2022 », « hilfsweise zum nächstmöglichen Termin », « Sachmängelhaftung », « Textform / Schriftform » (expliqués seulement plus bas, dans un long paragraphe) ;
- sur la carte du bail : « verpasst » suivi de trois lignes qui donnent la même date, ce qui sème le doute.

## 3. Parcours écran par écran

- **01-accueil-1** : compris. Titre = sa recherche. « Welcher Vertrag? » → « Abo, Zeitschrift, Streaming » : c'est son cas. L'aide « der Tag, an dem Ihr Schreiben ankommt, nicht der Tag des Absendens: rechnen Sie einige Tage Postweg ein » est précieuse. **Coince :** les valeurs déjà remplies (01.02.2025, 24, 1) : rien ne dit en haut que c'est un exemple. Elle peut croire que le site a deviné quelque chose ou laisser ces valeurs telles quelles. Le bandeau « Beispiel: … ändern Sie eine Zahl » n'apparaît que deux écrans plus bas.
- **01-accueil-suite1** : la barre « Der Vertrag endet am » passe en haut et cache l'aide sous « Vertragsbeginn » (« 1. Februar 2025 · steht auf Vertrag oder… », coupé). Ensuite viennent les champs d'adresse, compris.
- **01-accueil-suite2** : adresse de l'Anbieter, lieu, date. Puis le bandeau jaune « Beispiel: Vertrag seit Februar 2025, 24 Monate, ein Monat Frist — ändern Sie eine Zahl, um Ihr Ergebnis zu sehen » : là seulement, elle comprend que ce sont des valeurs d'exemple.
- **01-accueil-suite3** : la carte de résultat est très claire (« 31. Januar 2027 », « Muss spätestens ankommen am 31. Dezember 2026 »). « Welche Regeln gelten — neue Regeln: Vertrag ab 1. März 2022 » : elle ne sait pas quoi en faire. Les boutons « Drucken oder als PDF speichern » et « Text kopieren » sont évidents, et « Leere Felder erscheinen als Linie zum Ausfüllen von Hand » rassure.
- **01-accueil-suite4 / suite5** : la lettre complète, avec la date reprise (« zum 31. Januar 2027 »). Rassurant : la phrase sur le SEPA et le refus des appels de reconquête (« Rückgewinnung widerspreche ich ») est un vrai plus. **Coince :** « hilfsweise » ne lui dit rien. Pour la signature, un trait plein plus un trait pointillé : elle ne sait pas où signer et où écrire son nom.
- **01-accueil-suite6 / suite7** : « so arbeitet der Rechner », un long paragraphe qu'elle saute. Les Rechenbeispiele sont lisibles, mais l'écart entre « 1. Oktober 2026 → Alter Vertrag 31. Dezember 2027 » (un an de plus pour un jour de retard) l'inquiète sans explication à côté.
- **01-accueil-suite8 / suite9** : tableau « Welche Frist für welchen Vertrag gilt », utile et lisible en mode fiche (Wohnung, Arbeitsvertrag, Handy, Fitness, Strom, Versicherung). L'explication de « Schriftform / Textform » est enfin là : « Wer bei der Form unsicher ist, wählt Papier », phrase parfaite.
- **01-accueil-suite10 / suite11 / suite12** : « Zugang beweisen » donne un bon conseil (« nie am letzten Tag »). « Alle Vorlagen im Überblick » est une liste de liens noyée dans le texte, lisible. « Woher die Regeln kommen » est rassurant, mais elle ne le lira pas.
- **02-menu-1** : clair, avec les rubriques Wohnen / Arbeit / Verträge kündigen / Weitere Vorlagen. **Coince :** la Kündigung générale (Abo, celle de l'accueil) n'a pas d'entrée dans le menu ; pour y revenir, il faut le logo.
- **03-de-aufhebungsvertrag-1** : titre et chapeau compris (« ein halbes Monatsgehalt je Jahr »). La barre « Übliche Abfindung, grob geschätzt 12.600 € » est parlante.
- **03-…-suite1** : la barre en haut cache l'intitulé « Monatsgehalt brutto » : elle voit « 4.200 € » sans titre. « Auf wessen Veranlassung? », « Freistellung… unwiderruflich » : jargon, mais les choix proposés aident.
- **03-…-suite2 / suite3** : adresses, puis le résultat. « Richtwert, kein Anspruch » est honnête. « Kündigungsfrist eingehalten? ja » est clair.
- **03-…-suite4** : l'avertissement « Arbeitslosengeld … bis zu 12 Wochen sperren » est très utile et bien placé.
- **03-…-suite5 / suite6** : le contrat en §§, lisible, avec les montants et les dates repris.
- **04-de-kfz-kaufvertrag-1** : compris (« schreibt den Kaufpreis in Worten aus »). **Coince :** la barre « Kaufpreis 8.500 € » ne fait que répéter ce qu'elle a tapé, ce n'est pas un résultat.
- **04-…-suite1 / suite2 / suite3** : champs du véhicule (FIN, Kennzeichen, HU) clairs. L'intitulé « Zahlung » est caché par la barre, donc elle ne voit pas le choix. « Sachmängelhaftung: ausgeschlossen (privat) » : elle comprend le « privat », pas le terme.
- **04-…-suite4 / suite5 / suite6** : résultat (« in Worten: achttausendfünfhundert Euro », « Fahrzeugalter 8 Jahre ») et contrat clairs. Ce contrat-ci n'est pas la priorité de la persona, mais il est compréhensible.
- **05-de-kuendigung-arbeitsvertrag-1** : clair (« nennt Ihren letzten Arbeitstag »). **Coince :** la barre est tronquée : « Letzter Arbeitstag im V… ».
- **05-…-suite1 / suite2** : la barre cache l'intitulé du menu « keine eigene, gesetzliche Frist » (on devine « Kündigungsfrist laut Vertrag »). « zu Händen (Personalabteilung) » pré-rempli : bien.
- **05-…-suite3** : résultat clair : « 15. Dezember 2026 », « vier Wochen zum 15. oder Monatsende », « Form: Papier, eigenhändig unterschrieben ». Parfait, c'est dit en mots simples.
- **05-…-suite4 / suite5 / suite6** : la lettre est claire et polie (« Für die gemeinsame Zeit bedanke ich mich »). Le tableau d'exemples est lisible.
- **06-de-kuendigung-fitnessstudio-1 / suite1** : compris. La barre cache l'intitulé du champ « 12 » (Mindestlaufzeit).
- **06-…-suite2 / suite3** : résultat identique dans sa forme à l'accueil, cohérent. « neue Regeln: Vertrag ab 1. März 2022 », même incompréhension.
- **06-…-suite4** : le paragraphe donne des exemples datés dans le passé (« bei Zugang bis zum 28. Februar 2026 am 31. März 2026 ») alors qu'on est en novembre 2026 : ça fait daté.
- **06-…-suite5 / suite6** : la lettre est claire (« Mitgliedskarte gebe ich … zurück »). La section « neues und altes Recht » explique quoi mettre en Vertragsbeginn, ce qui est utile.
- **07-de-kuendigung-handyvertrag-1 → suite6** : très clair (« Rufnummer mitnehmen? »). Résultat : « 28. Februar 2027 », à recevoir avant le « 28. Januar 2027 ». La barre cache l'intitulé « Mindestlaufzeit ». La lettre reprend le « Anschluss ».
- **08-de-kuendigung-mietvertrag-1** : clair. « Bundesland (Feiertage) » : elle ne voit pas pourquoi, mais elle choisit son Land. La barre est tronquée : « Das Mietverhältnis endet … ».
- **08-…-suite1 / suite2** : « alle Mieter im Vertrag müssen unterschreiben » est un excellent rappel. Les champs IBAN pour la Kaution sont rassurants (« wird nicht an uns gesendet »).
- **08-…-suite3** : **ça coince.** « Brief kommt nach dem 4. November 2026 an (verpasst) », puis « 4. November 2026, verpasst: nächster möglicher Termin 28. Februar 2027 », puis « Im nächsten Monat: muss ankommen bis 3. Dezember 2026 », puis « Mietende … 28. Februar 2027 ». Trois fois la même date et deux « verpasst » : elle croit avoir raté quelque chose de grave alors que le message réel est « vous avez jusqu'au 3 décembre, la fin sera le 28 février ».
- **08-…-suite4 / suite5 / suite6** : le résumé « mit drei Monaten Frist… dritten Werktag » est clair. La lettre est bonne (Kaution, Übergabe).
- **09-de-kuendigung-stromvertrag-1** : l'aide « Steht auf Ihrer Rechnung „Grundversorgung"? Sonst ist es ein Sondervertrag. » est excellente.
- **09-…-suite1** : la barre recouvre le champ de date lui-même (« 14.11.2026 » à moitié caché) et son intitulé.
- **09-…-suite2 → suite6** : le choix « Anlass: Anbieterwechsel » est repris dans la lettre (« Ich wechsle den Lieferanten »). Résultat et lettre clairs.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Calcul de la date de fin (accueil, Fitness, Handy, Strom) | oui, dès l'écran 1 (barre du bas) | oui | très | 5 |
| « Muss spätestens ankommen am » | oui (carte de résultat) | oui | très, c'est la vraie réponse | 4 |
| Bandeau « Beispiel… » | tard, après tous les champs | oui | oui | 2 |
| Barre de résultat collée | oui | oui, sauf quand elle est tronquée ou cache un intitulé | oui (sauf Kfz) | 3 |
| Lettre générée en direct | oui | oui | très | 5 |
| Drucken / PDF, Text kopieren | oui | oui | très | 5 |
| « Leere Felder erscheinen als Linie » | oui | oui | rassurant | 4 |
| Calcul Kündigung Mietvertrag (3e Werktag, Bundesland) | oui | à moitié (« verpasst » ×2) | très | 3 |
| Calcul Arbeitsvertrag (letzter Arbeitstag, Form) | oui | oui | très | 4 |
| Abfindungsrechner (Aufhebungsvertrag) | oui | oui | oui | 4 |
| Kfz-Kaufvertrag (prix en lettres, âge) | oui | oui | moyen pour elle | 4 |
| Tableau des délais par contrat | oui, en descendant | oui | oui | 4 |
| Menu ☰ | oui | oui | oui, mais sans la Kündigung générale | 4 |
| Version EN | vue | – | – | – |

## 5. Enchaînement et navigation

Le schéma est le même partout (titre, chapeau, formulaire, résultat, boutons, lettre, explications), donc après une page, elle sait lire toutes les autres. Le fil d'Ariane « Startseite / … » est présent. La barre de résultat suit le défilement, ce qui est une bonne idée, mais une fois en haut elle masque systématiquement une ligne de formulaire. Le formulaire est long (une quinzaine de champs d'adresse) avant d'arriver au résultat détaillé. Le lien « Zum fertigen Dokument » aide à sauter, mais il se trouve dans la carte de résultat, qu'on n'atteint qu'après les adresses. Elle aurait voulu voir la carte de résultat juste après les 4 champs de calcul, et les adresses ensuite. Le menu n'a pas de lien vers la Kündigung générale (Abo), qui est pourtant la page d'arrivée depuis Google.

## 6. Difficultés classées

1. **La barre de résultat collée cache des intitulés de champ** (01-suite1, 03-suite1, 04-suite1, 05-suite1, 06-suite1, 07-suite1, 09-suite1). Vécu : « 24, c'est quoi déjà ? », « 4.200 € de quoi ? ». Sur Strom, elle cache même la date en cours de saisie. Recommandation : laisser la barre fixée en bas de l'écran (comme au premier écran) et ne jamais la faire passer en haut, ou décaler le contenu de la hauteur de la barre.
2. **Les valeurs d'exemple ne sont annoncées qu'après tout le formulaire** (01-accueil-1 contre 01-suite2). Vécu : elle croit que 01.02.2025 / 24 / 1 sont des valeurs « normales » ou déjà les siennes. Recommandation : placer le bandeau jaune au-dessus du premier champ. Texte : « Beispielwerte – ersetzen Sie sie durch die Daten aus Ihrem Vertrag. »
3. **La carte du bail est confuse** (08-suite3). Recommandation : remplacer les quatre lignes par deux. « Für den 31. Januar 2027 zu spät (Stichtag war der 4. November 2026). » puis « Sie haben noch bis zum 3. Dezember 2026 Zeit – das Mietverhältnis endet dann am 28. Februar 2027. »
4. **Libellé de la barre tronqué** (05-1 « Letzter Arbeitstag im V… », 08-1 « Das Mietverhältnis endet … »). Recommandation : des libellés courts, « Letzter Arbeitstag » et « Mietende ».
5. **« Welche Regeln gelten: neue Regeln: Vertrag ab 1. März 2022 »** (01-suite3, 06-suite3, 07-suite3, 09-suite4) ne dit rien à un non-juriste. Recommandation : « Nach der Mindestlaufzeit: jederzeit mit 1 Monat Frist kündbar (Vertrag ab 1. März 2022). »
6. **Jargon dans la lettre et les champs** : « hilfsweise zum nächstmöglichen Termin », « Sachmängelhaftung », « Freistellung unwiderruflich ». Recommandation : une petite aide sous la lettre. « „hilfsweise zum nächstmöglichen Termin" = falls das Datum nicht stimmt, gilt die Kündigung zum nächsten erlaubten Tag. » Sous Sachmängelhaftung : « = keine Haftung für Mängel nach dem Kauf (unter Privatleuten üblich) ».
7. **La barre « Kaufpreis 8.500 € » du Kfz-Kaufvertrag** (04-1) répète la saisie au lieu d'un résultat. Recommandation : afficher le prix en lettres (« achttausendfünfhundert Euro ») ou l'âge du véhicule, ou supprimer la barre sur cette page.
8. **Double trait de signature** (trait plein + pointillé, sur toutes les lettres) et **exemples passés** dans le texte Fitness (« bis zum 28. Februar 2026 »). Recommandation : légender les traits (« Unterschrift » sous le trait plein, « Name in Druckbuchstaben » sous le pointillé) et dater les exemples dans le futur.

## 7. À garder

- Le titre de l'accueil qui reprend exactement la promesse Google, et la date de fin visible dès le premier écran.
- « der Tag, an dem Ihr Schreiben ankommt, nicht der Tag des Absendens: rechnen Sie einige Tage Postweg ein ».
- « Muss spätestens ankommen am … », la vraie réponse à sa question.
- La lettre complète visible en direct, la mention « Leere Felder erscheinen als Linie zum Ausfüllen von Hand » et les deux boutons Drucken / Text kopieren.
- « Eingaben bleiben in Ihrem Browser » et « wird nicht an uns gesendet » (IBAN).
- « Form: Papier, eigenhändig unterschrieben » et « Wer bei der Form unsicher ist, wählt Papier ».
- L'aide Strom « Steht auf Ihrer Rechnung „Grundversorgung"? Sonst ist es ein Sondervertrag. »
- L'alerte Arbeitslosengeld sur l'Aufhebungsvertrag et « alle Mieter im Vertrag müssen unterschreiben ».
- La phrase anti-démarchage « Rückgewinnung widerspreche ich » dans les lettres.
- La même structure sur toutes les pages.

## 8. Notes

Clarté : 8/10
Facilité : 7/10
Utilité : 9/10
