[<< Go back](./README.md) || [Part 2 >>](./part_2.md)

## Part 1 - Initialize the game

### Game object

The first step will be to create an object named `game`. As you probably noticed, we will work in a HTML canvas. This is a functionality offered by HTML 5 which allows us to draw a canvas/an area on which we can determine a context and make all kind of actions. This is used to make games or create animations zones.

Within the game object, we will firstly select this canvas as a normal HTML element (we created it in the HTML file) and set up the gameover variable on false.

```javascript
const game = {
  canvas: document.querySelector("#game"),
};
```

Whenever we try to create a game, we need three essential functions:

* The ```init()``` function will initialize a state for the game (what is the state of things when we start).
* The ```update()``` function will help us change this state.
* The ```draw()``` function will help us display/draw elements on the canvas, so we can see the game itself (in this case we can see a doodler and platforms).

To these essential function, we will add a `playing` and a `gameOver` function. The playing function will define the state of our game: is it running, or are we on another screen (the reset/game over screen)? The gameOver function will determine is the doodler has fallen outside the screen, which would mean that the game is over. The ```playing()``` contain the state of the game when it's running, the ```gameOver()``` contain the game over screen.

```javascript
const game = {
  canvas: document.querySelector("#game"),

  // Initialize the game properties
  init: function () {},

  // Update the game elements
  update: function () {},

  // Draw / display the elements
  draw: function () {},

  playing: function () {},

  gameOver: function () {},
};
```

We will first start by determining the init function. We will give it a 2D context because we are creating a 2D game (this is a given when you use HTML canvas: you have access to various premades in js, including context options).
We also initialize variables that will prove to be useful later.

```javascript
const game = {
  canvas: document.querySelector("#game"),

  init: function () {
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 600;
    this.canvas.height = 800;
    this.gravity = 8;
    this.score = 0;
    this.realScore = 0;
    this.platforms = [];
    this.currentMode = "playing";

    doodler.init();

    this.update();
  },

  update: function () {
    // clearRect allows us to 
    // parameter(x, y, largeur, hauteur)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // reload game
    this[this.currentMode]();

    // Demande à la fenêtre la permission pour éxécuter une fonction relative à une animation
    // Ca permet de limiter la vitesse du jeu en fonction de la vitesse de l'écran. Stp David mets ton écran en 60hz
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

  gameOver: function () {},
};

// This function should always be at the end of our document
game.init();
```

### Doodler (character)

Let's create our main character, the doodler!

As for the game object, we have to create functions to ```init```, ```update``` and ```draw```. We will also give it a place within the canva, a size and some other useful parameters.

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

[<< Go back](./README.md) || [Part 2 >>](./part_2.md)
