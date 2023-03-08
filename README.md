# Doodle Jump

## Introduction 

Hello and welcome to this workshop where we will create a Doodle Jump clone. We will work with vanilla Java Script. But don't worry, you will learn a lot of new things like :

* Set up a physical system
* Create an hitbox
* Move a character
* Generate a level in a random way
* Manage a score

## Game presentation

In Doodle Jump you can jump, fall, and start over. The goal of the game is to try to go as high as possible and always get a better score than before. If you fall, you start over.

## The tutorial

First, think about fork this repository. In the assets folder there are the graphical assests. The HTML and CSS are already completed. Indeed, we will try to not waste too much time with things you already know.

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

  init: function () {
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 600;
    this.canvas.height = 800;
    this.gravity = 8;
    this.score = 0;
    this.realScore = 0;
    this.highscore = 0;
    this.frame = 0;
    this.platforms = [];
    this.currentMode = "playing";

    doodler.init();

    this.update();
  },

  update: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // reload game
    this[this.currentMode]();

    window.requestAnimationFrame(() => {
      this.update();
    });
  },

  draw: function () {
    doodler.draw();
  },
  playing: function () {
    doodler.update();

    this.platforms.forEach((platform, index) => {
      platform.update();
    });

    this.realScore += Math.round(-doodler.vy / 5);
    this.score = this.score < this.realScore ? this.realScore : this.score;
    this.draw();
    this.frame++;
  },
  gameOver: function () {
    
  },
};

game.init();
```

### 2. Doodler (character)

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

### 3. Controller
Comme son l'indique, le controller va nous permettre de controler le personnage. Nous auron besoin d'```EventListener``` pour vérifier quelle touche est pressée et quand est-ce qu'elle est relachée.

Au niveau de l'```EventListener``` nous entrons trois paramètres : 
* Paramètre 1 : action / l'évènement.
* Paramètre 2 : la fonction appellée lorsque l'évènement est triger.
* Paramètre 3 : on désactive le bubbling pour empêcher que l'évènement remonte dans le DOM.

Le ```set``` prend toujours deux paramètres :
* Paramètre 1 : la clé
* Paramètre 2 : sa valeur

```javascript
const controller = {
  keys: null,
  init: function () {

    window.addEventListener("keydown", this.keyDown, false);
    window.addEventListener("keyup", this.keyUp, false);

    this.keys = new Map();
  },

  keyUp: function (e) {
    controller.keys.set(e.code, false); // Release key
  },

  keyDown: function (e) {
    controller.keys.set(e.code, true); // Hold Key
  },
};
```

### 4. Platform
