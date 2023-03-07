# Doodle Jump

## Introduction 

Bonjour et bienvenue dans ce workshop ou nous allons crée un clone de Doodle Jump. Nous allons traviller avec du Java Script vanilla. Mais ne vous inquiétez pas, vous allez apprendre beaucoups de nouvelles choses comme :

* mettre en place un système physique
* crée une hitbox
* déplacer un personnage
* générer un niveau de manière aléatoire

## Présentation du jeu

Dans Doodled Jump vous pouvez sauter, tomber, recommencer. Le but du jeu étant d'essayer d'aller le plus haut possible et ainsi de toujours faire un meilleur score qu'avant. Si vous tombez, vous recommencez.

## Le tuto

Premièrement, pensez à clone ce repository. Dans le dossier il y les assests graphiques, notre fichier HTML très simple et un css déjà complèter. En effet, on va essayer de ne pas perdre trop de temps avec des choses que vous connaissez déjà.

Premièrement, nous allons crée un un objet game dans le JS. Comme vous l'avez sans doute remarquez, nous allons travailler dans un canvas.

```javascript
const game = {
  canvas: document.querySelector("#game"),
  gameover: false,

  // Initialize the game properties
  init: function () {
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 400;
    this.canvas.height = 800;
    this.gravity = 8;
    this.score = 0;
    this.highscore = 0;
    this.frame = 0;
    this.platforms = [];

    controller.init();

    doodler.init();

    this.update();
  },

  // Update the game elements
  update: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.draw();
    doodler.update();

    window.requestAnimationFrame(() => {
      this.update();
    });
  },

  // Draw / display the elements
  draw: function () {
    doodler.draw();
  },
};
```
