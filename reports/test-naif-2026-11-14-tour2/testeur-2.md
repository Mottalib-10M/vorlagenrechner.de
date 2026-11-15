# Test naïf du 2026-11-14 (tour2), testeur 2 : vorlagenrechner.de
**Persona :** Allemand(e) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Arrivé(e) depuis le résultat Google « Kündigung Vorlage: Schreiben mit Enddatum, kostenlos » (« Enddatum nach § 309 BGB auf den Tag berechnet, fertiges Schreiben zum Drucken oder Kopieren, gratis »), sur son téléphone.

## 1. Concept

**Après 5 s :** le titre « Kündigung Vorlage mit berechnetem Enddatum » colle mot pour mot à ce que Google promettait. La phrase « rechnet zuerst aus, wann Ihr Vertrag endet, und setzt das Datum dann in ein fertiges Schreiben ein » se comprend tout de suite. Et surtout, la barre collée en bas affiche déjà « Der Vertrag endet am 31. Januar 2027 » : je vois le résultat avant même d'avoir touché à quoi que ce soit. Je reste.

**Après 2 min :** c'est un générateur de lettres de résiliation (et de quelques contrats) qui calcule la date de fin, qui met cette date dans la lettre et qui permet d'imprimer ou de copier. Il y a 15 autres modèles (Miete, Arbeit, Handy, Fitness, Strom, Kfz…). Pour qui ? Pour moi, qui veux résilier un abonnement ou un contrat de salle de sport sans chercher à quelle date. Le bénéfice concret : la date exacte de fin (« Muss spätestens ankommen am 31. Dezember 2026 »), plus une lettre prête avec la phrase de sécurité. C'est clair.

Le hic : la lettre elle-même se trouve 4 à 5 écrans plus bas, après une longue liste de champs vides. Il faut avoir confiance pour descendre jusque-là.

## 2. « Tout le monde peut-il comprendre ? »

Oui pour l'essentiel : la date de fin et le bouton « Drucken oder als PDF speichern ». Ça décroche à trois endroits :
- **Le vocabulaire juridique** est laissé sans explication : « hilfsweise zum nächstmöglichen Termin », « Kündigung geht zu », « Zugang », « Textform », « Sondervertrag », « Nach Gesetz allein », « Welche Regeln gelten : neue Regeln: Vertrag ab 1. März 2022 ».
- **Les tableaux « Rechenbeispiele »** n'ont pas de titre de colonne pour la date de droite, et la ligne « Alter Vertrag, vor März 2022 » donne « 31. Dezember 2027 » sans aucune explication.
- **La page Mietvertrag** affiche par défaut « verpasst », ce qui fait peur à quelqu'un qui n'a encore rien saisi.

## 3. Parcours écran par écran

- **01-accueil-1** : compris. Titre, promesse et résultat dans la barre du bas. Le menu déroulant « Welcher Vertrag? Abo, Zeitschrift, Streaming » montre bien que je dois choisir mon type de contrat. L'aide sous la date (« der Tag, an dem Ihr Schreiben ankommt, nicht der Tag des Absendens ») est utile, mais le champ est pré-rempli avec aujourd'hui, ce qui n'est pas réaliste.
- **01-accueil-suite1** : ça coince un peu. La barre collée « Der Vertrag endet am » cache le texte d'aide sous « Vertragsbeginn » (on ne voit que le haut de « 1. Februar 2025 · steht auf Vertrag oder… »). Ensuite viennent beaucoup de champs vides (Kunden-, Name, Straße…). Je me demande s'ils sont obligatoires : rien ne le dit à ce moment-là.
- **01-accueil-suite2** : compris. Le cadre jaune « Beispiel: Vertrag seit Februar 2025, 24 Monate, ein Monat Frist — ändern Sie eine Zahl » me dit enfin que ce sont des valeurs d'exemple. Il arrive trop tard : il faudrait le voir en haut, avant les champs.
- **01-accueil-suite3** : compris et rassurant. On y lit « Muss spätestens ankommen am 31. Dezember 2026 », « Eingaben bleiben in Ihrem Browser », puis les boutons Drucken / Text kopieren. « Leere Felder erscheinen als Linie zum Ausfüllen von Hand » répond enfin à ma question sur les champs vides, mais trop bas.
- **01-accueil-suite4/5** : la lettre est compréhensible. Le haut n'est fait que de lignes « ______ », ce qui donne une impression de document vide et peu soigné. La signature cumule un trait plein et une ligne en tirets. « hilfsweise » : je ne connais pas ce mot.
- **01-accueil-suite5/6** : texte juridique. Un accordéon « Ganzen Absatz lesen » est disponible. On lit « Von Radif Partners » : je ne sais pas qui c'est.
- **01-accueil-suite6/7** : les « Rechenbeispiele » coincent. Je ne sais pas ce que représente la date de droite (fin du contrat ? date limite ?). Et je ne comprends pas pourquoi l'ancien contrat donne toujours « 31. Dezember 2027 ».
- **01-accueil-suite8/9** : compris. Le tableau des délais par type de contrat est clair et l'explication Schriftform/Textform est utile (« Wer bei der Form unsicher ist, wählt Papier »).
- **01-accueil-suite10/11** : compris. « Zugang beweisen » donne un bon conseil (« nie am letzten Tag »). La liste « Alle Vorlagen im Überblick » est utile, mais c'est un pavé de liens dans une phrase.
- **01-accueil-suite12** : du texte sur les sources et un arrêt du BGH. C'est rassurant, mais je ne le lis pas.
- **02-menu-1** : compris. Les rubriques sont claires (Wohnen, Arbeit, Verträge kündigen, Weitere Vorlagen). En revanche, aucune entrée ne ramène à la « Kündigung allgemein / Abo » de l'accueil, et « Methode und Quellen » occupe une place de rubrique.
- **03-de-aufhebungsvertrag** : en gros compris. « Übliche Abfindung, grob geschätzt 12.600 € » parle tout de suite. La barre collée cache l'intitulé du champ « Monatsgehalt brutto » (suite1). Les choix proposés sont clairs (« Arbeitgeber (statt Kündigung) », « ja, unwiderruflich, bezahlt »). L'avertissement sur l'Arbeitslosengeld (« bis zu 12 Wochen sperren ») est précieux. Ici, le texte explicatif est placé AVANT les boutons d'impression, alors que sur l'accueil il est après la lettre : ce n'est pas cohérent.
- **04-de-kfz-kaufvertrag** : compris. Le prix en toutes lettres (« achttausendfünfhundert Euro ») et l'âge du véhicule sont pratiques. Par contre, la barre du bas « Kaufpreis 8.500 € » ne fait que répéter ce que j'ai tapé, sans rien calculer. Elle cache aussi la valeur du menu « Zahlung » (suite1).
- **05-de-kuendigung-arbeitsvertrag** : compris (« Letzter Arbeitstag im Vertrag 15. Dezember 2026 »). Dans la barre du bas, l'intitulé est coupé : « Letzter Arbeitstag im V… ». La barre cache aussi l'intitulé du 2e menu déroulant (on ne voit que « keine eigene, gesetzliche Frist »). « Nach Gesetz allein » est incompréhensible. Les exemples disent « Kündigung geht zu » alors que l'accueil dit « kommt an ». La mention passe de « Von Radif Partners » à « Geprüft von Radif Partners ».
- **06-de-kuendigung-fitnessstudio** : compris. Le résultat est le même que sur l'accueil, ce qui est cohérent. La barre cache l'intitulé « Mindestlaufzeit » au-dessus du « 12 » (suite1). Le texte cite des exemples déjà passés (« endet bei Zugang bis zum 28. Februar 2026 am 31. März 2026 »), ce qui est déroutant en novembre 2026.
- **07-de-kuendigung-handyvertrag** : compris. Même défaut de barre (le « 24 » apparaît sans intitulé). « Rufnummer mitnehmen? nein » est clair. « Welche Regeln gelten: neue Regeln: Vertrag ab 1. März 2022 » apparaît alors que le texte parle du § 56 TKG : quelle règle s'applique ?
- **08-de-kuendigung-mietvertrag** : ça coince. Par défaut, le résultat affiche « Brief kommt nach dem 4. November 2026 an (verpasst) » et « 4. November 2026, verpasst: nächster möglicher Termin 28. Februar 2027 ». À première lecture, je crois avoir raté quelque chose alors que je n'ai rien saisi. La date 28 février 2027 revient trois fois (barre, titre, « Mietende, wenn der Brief bis dahin ankommt »). L'intitulé de la barre est coupé : « Das Mietverhältnis endet … ». Le champ IBAN avec « wird nicht an uns gesendet » est rassurant.
- **09-de-kuendigung-stromvertrag** : compris. La question « Steht auf Ihrer Rechnung „Grundversorgung"? Sonst ist es ein Sondervertrag. » est une très bonne aide. La lettre avec « Ich wechsle den Lieferanten » est bien adaptée. La barre cache encore une partie de l'intitulé de la date (suite1).

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Calcul de la date de fin (barre collée + encadré) | oui, tout de suite | oui | très | 5 |
| « Muss spätestens ankommen am » | oui | oui | très (c'est LA date qui compte) | 4 |
| Choix du type de contrat (accueil) | oui | oui | oui | 4 |
| Lettre générée | oui, mais loin en bas | oui, sauf « hilfsweise » | très | 3 |
| « Drucken oder als PDF speichern » / « Text kopieren » | oui | oui | très | 4 |
| Lien « Zum fertigen Dokument » | oui | oui | oui (raccourci) | 3 (simple lien souligné, peu visible) |
| Champs vides → lignes à la main | oui, après coup | oui | oui | 2 (expliqué trop tard) |
| Abfindungsrechner (Aufhebungsvertrag) | oui | oui | très | 4 |
| Prix en toutes lettres (Kfz) | oui | oui | oui | 4 |
| Bundesland / jours fériés (Miete) | oui | à peu près | oui | 3 |
| Rechenbeispiele | oui | non (colonne sans titre) | moyen | 2 |
| Tableau des délais par contrat | oui | oui | oui | 4 |
| Menu ☰ | oui | oui | oui | 4 |
| EN | vu | oui | pas pour moi | 4 |

## 5. Enchaînement et navigation

Le fil d'Ariane « Startseite / … » et le menu fonctionnent. Les pages suivent toutes le même schéma (formulaire → résultat → boutons → lettre → explications), ce qui est rassurant une fois qu'on l'a compris. Ce qui gêne :
- Le formulaire est très long avant le résultat détaillé et la lettre, environ 4 écrans de champs d'adresse vides.
- La barre collée en bas, très utile en haut de page, cache des intitulés et des textes d'aide dès qu'on fait défiler (accueil, Aufhebungsvertrag, Kfz, Arbeitsvertrag, Fitness, Handy, Strom).
- L'accueil propose une liste déroulante des types de contrat, et le menu propose des pages dédiées (Fitness, Handy, Strom). Je ne sais pas laquelle choisir pour ma salle de sport, et le menu n'offre aucun retour vers la résiliation générale.
- Selon la page, le texte d'explication se place avant ou après les boutons d'impression.

## 6. Difficultés classées

1. **La barre collée en bas masque des intitulés et des aides pendant le défilement** (01-suite1, 03-suite1, 04-suite1, 05-suite1, 06-suite1, 07-suite1, 09-suite1). Je vois un « 24 » ou un « 12 » sans savoir à quoi il correspond, ou un menu déroulant sans sa question. *Recommandation :* quand le résultat est visible à l'écran, cacher la barre ou la réduire à une ligne plus fine. Ajouter une marge de défilement pour qu'aucun intitulé ne passe dessous. Raccourcir les intitulés coupés : « Letzter Arbeitstag » au lieu de « Letzter Arbeitstag im V… », « Mietende » au lieu de « Das Mietverhältnis endet … ».
2. **Page Mietvertrag : « verpasst » affiché par défaut** (08-suite3). On croit avoir déjà échoué. *Recommandation :* prendre un exemple qui n'est pas encore raté, ou adoucir le texte. Remplacement : « Für den 4. November ist es zu spät. Kommt Ihr Brief bis 3. Dezember 2026 an, endet die Miete am 28. Februar 2027. »
3. **Lettre et explication des champs vides trop bas** (01-suite1 à suite4). En voyant tous ces champs vides, je crains de devoir tout remplir. *Recommandation :* placer en tête du formulaire « Nur die Daten oben sind nötig. Name und Adressen können Sie leer lassen und später von Hand eintragen. », et mettre le cadre jaune « Beispiel… » au-dessus du premier champ.
4. **Jargon sans explication** : « hilfsweise zum nächstmöglichen Termin », « Kündigung geht zu », « Nach Gesetz allein », « Welche Regeln gelten : neue Regeln ». *Recommandation :* uniformiser sur « kommt an ». Remplacer « Nach Gesetz allein » par « Ohne eigene Frist im Vertrag ». Remplacer « neue Regeln: Vertrag ab 1. März 2022 » par « Vertrag ab 1. März 2022: höchstens 1 Monat Frist nach der Mindestlaufzeit ». Ajouter sous la lettre : « „hilfsweise zum nächstmöglichen Termin" = falls das Datum nicht stimmt, gilt der nächste mögliche Termin. »
5. **Rechenbeispiele illisibles** (01-suite6/7, 05-suite6, 07-suite6). On ne sait pas ce que la date de droite représente. *Recommandation :* ajouter « Vertragsende: » devant chaque date ou un titre de colonne « endet am ». Pour l'ancien contrat, ajouter « (verlängert sich um 1 Jahr) ».
6. **La date de réception est pré-remplie avec aujourd'hui.** C'est irréaliste : on risque de se fier à une échéance trop optimiste. *Recommandation :* pré-remplir avec aujourd'hui + 3 jours, et écrire dans l'aide « Wir haben 3 Tage Postweg eingerechnet ».
7. **L'accueil et les pages dédiées se recoupent.** Le menu n'a pas d'entrée pour la résiliation générale de l'accueil. *Recommandation :* dans « Welcher Vertrag? », lorsque j'ai choisi Fitness ou Handy, afficher le lien « Eigene Vorlage für Fitnessstudio → ». Ajouter au menu « Kündigung allgemein (Abo, Mitgliedschaft) ».
8. **Kfz : la barre « Kaufpreis 8.500 € » n'apporte rien**, et les exemples Fitness sont datés dans le passé (« 28. Februar 2026 »). *Recommandation :* dans la barre Kfz, afficher « in Worten: achttausendfünfhundert Euro » ou l'âge du véhicule, et mettre à jour les exemples Fitness sur 2027. Accessoirement, uniformiser « Von » / « Geprüft von Radif Partners » et dire en une ligne qui est Radif Partners.

## 7. À garder

- La promesse tenue dès le 1er écran : titre identique à Google, résultat visible sans rien saisir.
- « Muss spätestens ankommen am … » : c'est la vraie réponse à ma question.
- L'aide « der Tag, an dem Ihr Schreiben ankommt, nicht der Tag des Absendens ».
- « Eingaben bleiben in Ihrem Browser » et, pour l'IBAN, « wird nicht an uns gesendet ».
- Les deux boutons « Drucken oder als PDF speichern » / « Text kopieren ».
- La question sur la facture « Grundversorgung » (Strom), le prix en toutes lettres (Kfz) et l'avertissement Arbeitslosengeld (Aufhebungsvertrag).
- Le conseil « Schicken Sie Kündigungen deshalb einige Tage vor dem letzten Termin, nie am letzten Tag ».
- Les textes longs repliés avec « Ganzen Absatz lesen ».

## 8. Notes

Clarté : 8/10
Facilité : 7/10
Utilité : 9/10
