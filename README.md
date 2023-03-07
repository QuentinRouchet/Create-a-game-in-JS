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

### 1. Game object

La première étape est de crée un un objet ```game```. Comme vous l'avez sans doute remarquez, nous allons travailler dans un canvas. Donc à l'intérieur de l'objet game, sélectionnons le canvas et parametrons la variable gameover sur false. Elle nous sera utile plus tard.

```javascript
const game = {
  canvas: document.querySelector("#game"),
  gameover: false,
};
```

Lorsque l'on crée un jeu, nous avons besoin de trois fonctions essensiel :
* La fonction init : nous permet d'initialiser un état.
* La fonction update : nous permet de changer l'état du jeu dynamiquement.
* La fonction draw : nous permet d'afficher, de dessiner les éléments.

```javascript
const game = {
  canvas: document.querySelector("#game"),
  gameover: false,

  // Initialize the game properties
  init: function () {

  },

  // Update the game elements
  update: function () {
  
  },

  // Draw / display the elements
  draw: function () {
  
  },
};
```

Nous allons maintenant nous occuper du init. Donnons lui un context 2D car le jeu est en 2D. On va aussi définir une hauteur et une largeur au canvas. Initialisons aussi les autres valeurs qui nous serons utiles plus tard.

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

    this.update();
  },

  // Update the game elements
  update: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    window.requestAnimationFrame(() => {

    });
  },

  // Draw / display the elements
  draw: function () {
  
  },
};

game.init();
```

### 2. Doodler (character) object

Let's create our main character. Comme pour l'objet jeu, nous allons devoir l'initialiser, l'update et l'afficher. On va aussi lui donner une positon sur le plan, une taille, et d'autres parametres bien utiles. 

Nous mettons les deux sources du main character dans sources et on se sert d'une boucle et de direction pour définir dans quel sens le personnage doit être tourner.

```javascript
const doodler = {
  init: function () {
    this.x = -20;
    this.y = 600;
    this.width = 92;
    this.height = 90; 
    this.vx = 0; // Character velocity on x
    this.vy = 0; // Character velocity on y
    this.speed = 10;
    this.jumpforce = 25;
    this.direction = 1; // 0 = left, 1 = right
    this.sources = ["./assets/doodler-left.png", "./assets/doodler-right.png"];
    this.images = [];

    // This loop alows us to flip the doodler
    this.sources.forEach((source, i) => {
      this.images[i] = new Image();
      this.images[i].src = source;
    });
  },
  
  update: function () {

  },
  
  draw: function () {
   
  },
};
```

### 3. Controler object

Comme son l'indique, le controller va nous permettre dencontroler le personnage

```javascript
const controller = {
  keys: null,
  init: function () {
    // EventListener
    // param 1 = action / l'évènement.
    // param 2 = la fonction appellée lorsque l'évènement est triger.
    // param 3 = on désactive le bubbling pour empêcher que l'évènement remonte dans le DOM.
    // Le bubbling = propagation de l'évènemenbt sur l'aboresance.
    window.addEventListener("keydown", this.keyDown, false);
    window.addEventListener("keyup", this.keyUp, false);

    this.keys = new Map();
  },

  keyUp: function (e) {
    // on récupére le code de la touche qui lui est associée
    // le set récupere en parametre la clé et sa valeur
    controller.keys.set(e.code, false);
  },

  keyDown: function (e) {
    controller.keys.set(e.code, true);
  },
};
```
