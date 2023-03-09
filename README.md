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

## Part 1 - Initialize the game

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

Mais dans notre cas, on aura aussi besoin d'une fonction ```playing``` et ```gameOver```. ```playing``` définira l'état du jeu : est-ce que le jeu tourne ou est-il sur l'écran reset. Ensuite, le ```gameOver``` définira si le personnage est tombé hors de l'écran ou pas. 

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
  
  playing: function() {
  
  }, 
  
  gameOver: function() {
  
  }
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

    this.draw();
  },
  
  gameOver: function () {
    
  },
};

game.init();
```

### 2. Doodler (character)

Let's create our main character. Comme pour l'objet jeu, nous allons devoir l'initialiser, l'update et l'afficher. On va aussi lui donner une positon sur le plan, une taille, et d'autres paramètres bien utiles. 

Nous mettons les deux sources du main character dans sources et on se sert d'une boucle et de direction pour définir dans quel sens le personnage doit être tourner.

```javascript
const doodler = {
  init: function () {
    this.x = 20;
    this.y = 200;
    this.width = 92;
    this.height = 90;
    this.vx = 0; // Character velocity on x
    this.vy = 0; // Character velocity on y
    this.speed = 10;
    this.jumpforce = -25;
    this.direction = 1; // 0 = left, 1 = right
    this.sources = ["./assets/doodler-left.png", "./assets/doodler-right.png"];
    this.images = [];
    this.offsetTop = 90;

    // This loop alows us to flip the doodler
    this.sources.forEach((source, i) => {
      this.images[i] = new Image();
      this.images[i].src = source;
    });
  },

  update: function () {
    this.x += this.vx;
    this.y += this.vy;
  },

  draw: function () {
    game.ctx.drawImage(this.images[this.direction], this.x, this.y);
  },
};
```

Et voila ! Normalement, le personnage devrait apparaitre sur votre écran en haut à gauche.
Okay, now we have initialize the game. Let's go to the second part to make the character move.

## Part 2 - Make the doodler move

### Controller
Comme son nom l'indique, le controller va nous permettre de controler le personnage. Nous auron besoin d'```EventListener``` pour vérifier quelle touche est pressée et quand est-ce qu'elle est relachée.

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

A ce stade nous n'aurons plus besoin de modifier le controller.


Dans l'objet ```game``` au niveau du ```init``` il faut appeller le ```init``` du ```controller```.

```javascript
  controller.init();
```

Dans l'objet ```doodler``` au niveau du ```update``` il faut ajouter ces deux conditions :

```javascript
  if (controller.keys.get("ArrowLeft")) {
    this.vx = -this.speed;
    this.direction = 0;
  } else if (controller.keys.get("ArrowRight")) {
    this.vx = this.speed;
    this.direction = 1;
  } else {
    this.vx = 0;
  }
```

Magie! Le doodler peut se balader de gauche à droite maintenant. Vous remarquerez que le personnage peut sortir de l'écran. Dans le vrai jeu Doodle Jump, le personnage peut passer d'un côté à l'autre de l'écran. Let's do the same!

### Passage d'écran

Toujours dans la fonction ```update``` du ```doodler``` ajoutez ceci :

```javascript
  if (this.x > game.canvas.width) {
    this.x = 0;
  }
  if (this.x < 0) {
    this.x = game.canvas.width;
  }
```

Maintenant nous devons lui faire afficher le résultat, pour ça nous devons accéder à la fonction ```draw``` du ```doodler``` et préciser ceci :

```javascript
  game.ctx.drawImage(
    this.images[this.direction],
    this.x + game.canvas.width,
    this.y
  );
  game.ctx.drawImage(
    this.images[this.direction],
    this.x - game.canvas.width,
    this.y
  );
```

## Part 3 - Platform

Let's create our platforms. Dans un premier nous allons crée la class ```Platform```

```javascript
class Platform {
  static minGap = 100;
  static maxGap = 250;

  constructor(y = 0) {
    // We will need later to define if the platform should desapear or not
    this.isAlive = true;
    this.width = 138;
    this.height = 44;
    // We already generate a position on x axe
    this.x = Math.random() * (game.canvas.width - this.width);
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.source = "./assets/platform.png";
    this.image = new Image();
    this.image.src = this.source;
    this.canGenerate = true;
  }

  update() {

  }

  draw() {
    game.ctx.drawImage(this.image, this.x, this.y);
  }
}
```

Ajoute cette loop dans la fonction ```draw``` de l'objet ```game```

```javascript
  this.platforms.forEach((platform, index) => {
    platform.draw();
  });
```

Ajoute cette fonction dans l'objet ```game```

```javascript
  generatePlatforms: function (number = 1, baseY = 0) {
    for (let i = 0; i < number; i++) {
      const y = baseY - i * Platform.maxGap;
      this.platforms.push(new Platform(y));
    }
  },
```

Maintenant il faut l'initialiser donc direction le ```init``` de ```game``` et écrit ça : 

```javascript
  this.generatePlatforms(3, doodler.y);
```

### Next

Nous allons maintenant faire en sorte de toujours avoir une plateforme en dessous du doodler. Comme ça lorsqu'il apparaitra il ne pourra pas tomber directement dans le vide. Évidemment on initiliase ceci dans la fonction ```init``` de ```game```.

```javascript
  const firstPlatform = new Platform();
  firstPlatform.y = doodler.y;
  firstPlatform.x = doodler.x;
  this.platforms.push(firstPlatform);
```

Dans le vrai jeu Doodle Jump, le personnage ne dépasse jamais la moitié de l'écran lorsqu'il saute. Direction la fonction ```update``` de l'objet ```doodler``` Cette condition va régler le probleme :

```javascript
    if (this.y < game.canvas.height / 2.8) {
      this.y = game.canvas.height / 2.8;
    }
```

## Part 4 - Physique and hitbox

Donnons un peu de mouvement à tout ça, mettez une vélocité sur l'axe y de -25 au ```doodler```. Vous constatez que le doodler tombe mais à l'enver. Et c'est tout à fait ce qu'on veut. Vous comprendrez un peu plus tard pourquoi.

## Part 5 - Score and reset

### Score

Maintenant que le jeu est jouable, ajoutons un système de score.

Dans la fonction ```playing``` de l'objet ```game``` ajoutez ceci :

```javascript
  this.realScore += Math.round(-doodler.vy / 5);
  this.score = this.score < this.realScore ? this.realScore : this.score;
```

Et maintenant dans la fonction ```draw``` de ```game``` ajoutez ceci : 

```javascript
  const displayScore = new Intl.NumberFormat(["fr-FR"]).format(this.score);
  this.ctx.font = "20px Arial";
  this.ctx.textAlign = "center";
  this.ctx.fillText(`Score : ${displayScore}`, this.canvas.width / 2, 20);
```

### Game Over
