# Android Jump

## Introduction 

Bonjour et bienvenue dans ce workshop ou nous allons crée un clone de Doodle Jump. Nous allons traviller avec du Java Script vanilla. Mais ne vous inquiétez pas, vous allez apprendre beaucoups de nouvelles choses comme :

* mettre en place un système physique
* crée une hitbox
* déplacer un personnage
* générer un niveau de manière aléatoire

## Présentation du jeu

Dans Android Jump vous pouvez sauter, tirer, tomber, recommencer. Le but du jeu étant d'essayer d'aller le plus haut possible et ainsi de toujours faire un meilleur score qu'avant. Si vous tombez, vous recommencez. Sur votre chemin il y aura des ennemis, des plateformes fixes, des plateformes mouveantes et des plateformes qui cassent.

## Le tuto

Premièrement, pensez à clone ce repository. Dans le dossier il y les assests graphiques, notre fichier HTML très simple et un css déjà complèter. En effet, on va essayer de ne pas perdre trop de temps avec des choses que vous connaissez déjà.

Dans un premier temps, nous allons sélectioner le canvas grâce à son id. Précisons que le contexte de notre jeu est en 2D. Nous allons aussi régler la hauteur et la largeur du canvas pour que ça soit de la même dimension que le background dans nos assets.

```javascript
// L'évènement load est déclenché lorsque la page et toutes ses ressources dépendantes (telles que les feuilles de style et des images) sont complètement chargées.
window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 532;
  canvas.height = 850;
});
```
