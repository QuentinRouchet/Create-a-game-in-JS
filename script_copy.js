// CONTROLLER
const controller = {
  keys: null,
  init: function () {
    window.addEventListener("keydown", this.keyDown, false);
    window.addEventListener("keyup", this.keyUp, false);

    this.keys = new Map();
  },

  keyUp: function (e) {
    controller.keys.set(e.code, false);
  },

  keyDown: function (e) {
    controller.keys.set(e.code, true);
  },
};

// GAME
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

    controller.init();

    doodler.init();

    const firstPlatform = new Platform();
    firstPlatform.y = doodler.y;
    firstPlatform.x = doodler.x + 20;
    this.platforms.push(firstPlatform);

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
      if (!platform.isAlive) {
        return;
      }
      platform.draw();
    });

    const displayScore = new Intl.NumberFormat(["fr-FR"]).format(this.score);
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Score : ${displayScore}`, this.canvas.width / 2, 20);
  },

  generatePlatforms: function (number = 1, baseY = 0) {
    for (let i = 0; i < number; i++) {
      const y = baseY - i * Platform.maxGap;
      this.platforms.push(new Platform(y));
    }
  },

  playing: function () {
    doodler.update();

    this.platforms.forEach((platform, index) => {
      if (!platform.isAlive) {
        return;
      }

      platform.update();

      const { x, y, width, height, offsetTop } = doodler;
      if (
        platform.checkCollision(x, y, width, height, offsetTop) &&
        doodler.vy > 0
      ) {
        doodler.getHit(platform);
      }
    });

    this.realScore += Math.round(-doodler.vy / 5);
    this.score = this.score < this.realScore ? this.realScore : this.score;
    this.draw();
    this.frame++;
  },

  gameOver: function () {
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
  },
};

// DOODLER
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

    this.sources.forEach((source, i) => {
      this.images[i] = new Image();
      this.images[i].src = source;
    });
  },

  update: function () {
    if (this.x > game.canvas.width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = game.canvas.width;
    }
    // center le personnage au millieu de l'écran
    if (this.y < game.canvas.height / 2.8) {
      this.y = game.canvas.height / 2.8;
    }

    if (controller.keys.get("ArrowLeft")) {
      this.vx = -this.speed;
      this.direction = 0;
    } else if (controller.keys.get("ArrowRight")) {
      this.vx = this.speed;
      this.direction = 1;
    } else {
      this.vx = 0;
    }

    if (this.y > game.canvas.height) {
      game.currentMode = "gameOver";
    }

    this.vy += this.vy > game.gravity ? 0 : 1;

    this.x += this.vx;
    this.y += this.vy;
  },

  draw: function () {
    game.ctx.drawImage(this.images[this.direction], this.x, this.y);
    // Gère le passage d'un coté à l'autre de l'écran
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

  getHit(platform) {
    this.vy = this.jumpforce;
    if (platform.canGenerate) {
      game.generatePlatforms(1, doodler.y - 3 * Platform.maxGap);
      platform.canGenerate = false;
    }
  },
};

class Platform {
  static minGap = 100;
  static maxGap = 250;

  constructor(y = 0) {
    this.isAlive = true;
    this.width = 138;
    this.height = 44;
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
    this.vy = -doodler.vy;

    if (this.y > game.canvas.height) {
      this.isAlive = false;
    }

    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    game.ctx.drawImage(this.image, this.x, this.y);
  }
  checkCollision(x, y, width, height, offsetTop = 0) {
    if (this.x <= x + width && this.x + this.width >= x) {
      if (this.y <= y + height && this.y + this.height >= y + offsetTop) {
        return true;
      }
    }
    return false;
  }
}

game.init();
