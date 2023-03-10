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
    controller.init();
    this.generatePlatforms(3, doodler.y);

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

    this.platforms.forEach((platform, index) => {
      platform.draw();
    });
  },

  generatePlatforms: function (number = 1, baseY = 0) {
    for (let i = 0; i < number; i++) {
      const y = baseY - i * Platform.maxGap;
      this.platforms.push(new Platform(y));
    }
  },

  playing: function () {
    doodler.update();

    this.draw();
  },

  gameOver: function () {},
};

const doodler = {
  init: function () {
    this.x = 20;
    this.y = 200;
    this.width = 92;
    this.height = 90;
    this.vx = 0; // Character velocity on x
    this.vy = -25; // Character velocity on y
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
    if (controller.keys.get("ArrowLeft")) {
      this.vx = -this.speed;
      this.direction = 0;
    } else if (controller.keys.get("ArrowRight")) {
      this.vx = this.speed;
      this.direction = 1;
    } else {
      this.vx = 0;
    }

    if (this.x > game.canvas.width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = game.canvas.width;
    }

    this.x += this.vx;
    this.y += this.vy;
  },

  draw: function () {
    game.ctx.drawImage(this.images[this.direction], this.x, this.y);

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
  },
};

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

  update() {}

  draw() {
    game.ctx.drawImage(this.image, this.x, this.y);
  }
}

game.init();
