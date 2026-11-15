# Synthèse du 3e tour : corrections après les testeurs naïfs du 2026-11-14 (tour2), vorlagenrechner.de

Notes du tour : testeur 1 : 8 / 7 / 9 · testeur 2 : 8 / 7 / 9 · testeur 3 : 7 / 6 / 8 (clarté / facilité / utilité).
Moyennes : clarté 7,7 · facilité 6,7 · utilité 8,7. Le seuil de RECETTE §15.8 (notes ≥ 7, moyennes ≥ 8) n'est pas encore atteint.

Pour ce tour, l'éditeur a validé **une seule correction** (n° 1). Les autres difficultés restent ouvertes et lui sont soumises :
elles sont marquées **non retenu**, parce qu'elles n'ont pas été validées pour ce tour (règle du 2026-11-14 : montrer et demander avant le tour suivant).

| # | Difficulté (testeurs) | Statut | Raison / correction |
|---|---|---|---|
| 1 | La barre collante du chiffre clé cache l'intitulé du champ en cours sur 7 pages sur 8 : « Mindestlaufzeit », « Monatsgehalt brutto », « Zahlung », la date sur Strom (T1, T2, T3) | **corrigé** | `src/components/calc/kit.tsx` : la barre n'est plus posée par-dessus la page en bas de l'écran. Elle est maintenant dans le flux, en tête du calculateur, et colle sous le menu quand on défile (`sticky top-16`). Sa place est toujours réservée : on la rend invisible au lieu de la retirer, donc elle ne recouvre aucun champ au repos et la page ne saute pas. `global.css` ajoute `scroll-padding-top: 9.5rem` sur téléphone : un champ qui reçoit le focus s'arrête sous le menu et la barre, avec son libellé visible. Le masquage pendant la saisie n'a plus de raison d'être (le clavier ne remonte plus la barre) : il est retiré, et le résultat reste visible pendant qu'on tape. |
| 1b | La barre coupe son propre texte : « Letzter Arbeitstag im V… », « Das Mietverhältnis endet … » (T1, T3) | **corrigé** | `truncate` retiré : le libellé passe à la ligne, le montant ou la date reste sur une ligne. Test : `tests/testeurs-naifs-2026-11-14.test.ts`, bloc 3. |
| 2 | Les valeurs d'exemple ne sont annoncées qu'après tout le formulaire (T1, T3) | non retenu | Non validé par l'éditeur pour ce tour ; à lui soumettre. |
| 3 | Bail : « verpasst » affiché par défaut, trois dates identiques, panique (T1, T2, T3) | non retenu | Non validé par l'éditeur pour ce tour ; à lui soumettre en priorité (relevé par les trois testeurs). |
| 4 | « Welche Regeln gelten: neue Regeln: Vertrag ab 1. März 2022 » incompris (T1, T2, T3) | non retenu | Non validé par l'éditeur pour ce tour ; à lui soumettre. |
| 5 | Jargon : « hilfsweise », « Sachmängelhaftung », « Arglist », « Freistellung unwiderruflich », « Auf wessen Veranlassung? », « FIN », « TT.MM.JJJJ », « Kündigung geht zu » (T1, T2, T3) | non retenu | Non validé par l'éditeur pour ce tour ; à lui soumettre. |
| 6 | Kfz : la barre « Kaufpreis 8.500 € » répète la saisie (T1, T2, T3) | non retenu | Non validé par l'éditeur pour ce tour ; à lui soumettre (piste : prix en lettres ou âge du véhicule). |
| 7 | Exemples datés dans le passé (Fitness « 28. Februar 2026 ») ; Rechenbeispiele confus (T1, T2, T3) | non retenu | Non validé par l'éditeur pour ce tour ; à lui soumettre. |
| 8 | Peur des champs personnels et de l'IBAN avant la réassurance (T2, T3) | non retenu | Non validé par l'éditeur pour ce tour ; à lui soumettre. |
| 9 | Date de réception pré-remplie à aujourd'hui (T2) | non retenu | Un seul testeur, choix de valeur par défaut ; à soumettre à l'éditeur. |
| 10 | Double trait de signature (T1) | non retenu | Un seul testeur ; à soumettre. |
| 11 | Menu sans entrée vers la résiliation générale, liste des modèles trop basse sur l'accueil (T1, T2, T3) | non retenu | Non validé par l'éditeur pour ce tour ; à soumettre. |

## Défaut de trame
La barre collante vient de `_trame` (`src/components/calc/kit.tsx`, composant `Shell`) : posée en `fixed bottom-0` avec `truncate`,
elle recouvre la dernière ligne visible et coupe les libellés longs sur tous les sites. Corrigée ici seulement ; `_trame/_template` non modifié.
