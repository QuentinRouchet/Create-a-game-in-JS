# Doodle Jump

## Introduction 

Hello and welcome to this workshop where we will create a Doodle Jump clone. We will work with vanilla Java Script. But don't worry, you will learn a lot of new things and be able to :

* Set up a physical system
* Create an hitbox
* Move a character
* Generate a level in a random way
* Manage a score

## Game presentation

In Doodle Jump you can jump, fall, and start over. The goal of the game is to try to go as high as possible and always get a better score than before. If you fall, you start over.

## The tutorial

First, please fork this repository. In the assets folder you will find the graphical assests. The HTML and CSS are already completed. Indeed, we will try to not waste too much time with things you already know.

## Part 1 - Initialize the game

### 1. Game object

The first step will be to create an object named ```game```. As you probably noticed, we will work in a HTML canvas. This is a functionality offered by HTML 5 which allows us to draw a canvas/an area on which we can determine a context and make all kind of actions. This is used to make games or create animations zones. 

Within the game object, we will firstly select this canvas as a normal HTML element (we created it in the HTML file) and set up the gameover variable on false. This variable helps us to determine if the game is or not over. By default, the game is on and it is put on false.

```javascript
const game = {
  canvas: document.querySelector("#game"),
  gameover: false,
};
```

Whenever we try to create a game, we need three essential functions:
* The init function will initialize a state for the game (what is the state of things when we start).
*The update function will help us change this state.
*The draw function will help us display/draw elements on the canvas, so we can see the game itself (in this case we can see a doodler and platforms).

To these essential function, we will add a ```playing``` and a ```gameOver``` function. The playing function will define the state of our game: is it running, or are we on another screen (the reset/game over screen)? The gameOver function will determine is the doodler has fallen outside the screen, which would mean that the game is over.

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

We will first start by determining the init function. We will give it a 2D context because we are creating a 2D game (this is a given when you use HTML canvas: you have access to various premades in js, including context options).
We also initialize variables that will prove to be useful later.

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

Let's create our main character, the doodler! 

As for the game object, we have to create functions to init, update and draw. We will also give it a place within the canva, a size and some other useful parameters.

We give two sources for the image displaying the doodler, one for when it is turnt left and one for when it is turnt right. Then, we use a for loop to determine in which sense it is.

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

And voilà ! After these steps, you should be able to see your little doodler on the top left of the screen.
Okay, now we have initialize the game. Let's go to the second part to make the character move.

## Part 2 - Make the doodler move

### Controller

We will create a controller to, as its name indicates, control our doodler. We will use an ```EventListener``` to check when a key is pressed and when it is released.

We will use three parameters:
*The action/event
*The function to be called when the action is performed
*The deactivation of bubbling by a false boolean value

The ```set``` used on the kays of the controller has two parameters:
*its key (the key to press)
*its value

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

At this point the controller is complete and do not need to be modified anymore, as we have all controls that are needed for our doodler.

Within the ```game``` object, at the ```init``` function level, we need to call the controller ```init```.

```javascript
  controller.init();
```

In the ```doodler``` object, at the ```update``` function level, we need to add those conditions so that our doodler moves along:

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

It's like magic! Your doodler is now able to move from left to right. You will notice that the doodler can go out of the screen. In the real game, when that happens, the character moves from one side of the screen to the other. Let's do the same!

### From one side to another

Within the ```update``` function, in the ```doodler``` object, add this:

```javascript
  if (this.x > game.canvas.width) {
    this.x = 0;
  }
  if (this.x < 0) {
    this.x = game.canvas.width;
  }
```
Now we will make it so that the image transfers in a fluid manner to the other side of the screen when it exits from one side. In order to do so, we need to access the  ```draw``` function within the ```doodler``` object and add this:


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

Let's create our platforms. To do so, let's create the ```Platform``` object.

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

Let's now add this loop in the ```draw``` section of the ```game``` object.

```javascript
  this.platforms.forEach((platform, index) => {
    platform.draw();
  });
```

Let's now write the function to generate platform in the ```game``` object.

```javascript
  generatePlatforms: function (number = 1, baseY = 0) {
    for (let i = 0; i < number; i++) {
      const y = baseY - i * Platform.maxGap;
      this.platforms.push(new Platform(y));
    }
  },
```

We have to initialize this newly designd function and thus need to incorporate it in the ```init``` function of the ```game``` object.

```javascript
  this.generatePlatforms(3, doodler.y);
```

### Next

Now we will try to alaways have a platform under our doodler. By doing that we can organize things so that he does not fall when he is drawed. This is still happening in the ```init``` part of ```game```.

```javascript
  const firstPlatform = new Platform();
  firstPlatform.y = doodler.y;
  firstPlatform.x = doodler.x;
  this.platforms.push(firstPlatform);
```

In the real game, the doodler can never go up more than half of the screen size whenever he jumps. In the ```update``` function of the ```doodler``` object, we can add this condition to solve this issue:

```javascript
    if (this.y < game.canvas.height / 2.8) {
      this.y = game.canvas.height / 2.8;
    }
```

## Part 4 - Physics and hitbox

### Physics


Let's make this move! Put ```doodler```'s vy to -25.


Weird... Nothing happens! Add this line in the ```update``` part:

```javascript
  this.vy += this.vy > game.gravity ? 0 : 1;
```

Woah! The doodler is falling!

Dans l'```update``` de la class ```Platform``` on peut ajouter ceci :

```javascript
  this.vy = -doodler.vy; // The dooler make a little jump at the start

  this.x += this.vx;
  this.y += this.vy;
```

Now we need to call the function update inside the ```playing``` function of the ```game``` like this :

```javascript
  this.platforms.forEach((platform, index) => {
    platform.update();
  });
```

### Hitbox

In the ```platform``` class, we will add a function to check hitboxes.

```javascript
  checkCollision(x, y, width, height, offsetTop = 0) {
    if (this.x <= x + width && this.x + this.width >= x) {
      if (this.y <= y + height && this.y + this.height >= y + offsetTop) {
        return true;
      }
    }
    return false;
  }
```

Let's create the function handling the hit between the ```doodler``` and the ```platform```.

```javascript
  getHit(platform) {
    this.vy = this.jumpforce;
    if (platform.canGenerate) {
      game.generatePlatforms(1, doodler.y - 3 * Platform.maxGap);
      platform.canGenerate = false;
    }
  },
```


And now we modify the foreach loop within the ```playing``` function of the ```game```.

```javascript
  const { x, y, width, height, offsetTop } = doodler;
  if (
    platform.checkCollision(x, y, width, height, offsetTop) &&
    doodler.vy > 0
  ) {
    doodler.getHit(platform);
  }
```

### Remove platform

In the real Doodle Jump game, we cannot jump back on a platform that got out of screen. We now have to remove those platforms from the game.

Let's add this in the ``update``` function of the ```platform```class:

```javascript
  if (this.y > game.canvas.height) {
    this.isAlive = false;
  }
```

And let's add this in the ```forEach``` of the ```playing``` function within the ```game``` object:

```javascript
  if (!platform.isAlive) {
    return;
  }
```

## Part 5 - Score and reset

### Score

Now that the game is playable, we need a scoring system!

Within the ```playing``` function of the ```game``` object, add this :

```javascript
  this.realScore += Math.round(-doodler.vy / 5);
  this.score = this.score < this.realScore ? this.realScore : this.score;
  this.frame++;
```

And now within ```draw``` of ```game``` add this : 

```javascript
  const displayScore = new Intl.NumberFormat(["fr-FR"]).format(this.score);
  this.ctx.font = "20px Arial";
  this.ctx.textAlign = "center";
  this.ctx.fillText(`Score : ${displayScore}`, this.canvas.width / 2, 20);
```

### Game Over

We know how to handle a loss! Let's design what happens when the game is over.

In the ```gameOver``` function of ```game```, we add this :

```javascript
  this.ctx.font = "20px Arial";
  this.ctx.textAlign = "center";
  this.ctx.fillText(
    `You lost`,
    this.canvas.width / 2,
    this.canvas.height / 2
  );
  this.ctx.fillText(
    `Press SPACE to restart`,
    this.canvas.width / 2,
    this.canvas.height / 2 + 26
  );
  if (controller.keys.get("Space")) {
    window.location = "index.html";
  }
```

And the final touch, within the ```update``` of ```doodler```:

```javascript
  if (this.y > game.canvas.height) {
    game.currentMode = "gameOver";
  }
```
