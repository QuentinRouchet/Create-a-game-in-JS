[<< Go back](./part_2.md) || [Part 4 >>](./part_4.md)

## Part 3 - Platform

Let's create our platforms. To do so, let's create the `Platform` object.

```javascript
class Platform {
  static minGap = 100;
  static maxGap = 250;

  constructor(y = 0) {
    // We will need later to define if the platform should disappear or not
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
```

Let's now add this loop in the `draw` section of the `game` object.

```javascript
this.platforms.forEach((platform, index) => {
  platform.draw();
});
```

Let's now write the function to generate platform in the `game` object.

```javascript
  generatePlatforms: function (number = 1, baseY = 0) {
    for (let i = 0; i < number; i++) {
      const y = baseY - i * Platform.maxGap;
      this.platforms.push(new Platform(y));
    }
  },
```

We have to initialize this newly designed function and thus need to incorporate it in the `init` function of the `game` object.

```javascript
this.generatePlatforms(3, doodler.y);
```

### First platform

Now we will try to always have a platform under our doodler. By doing that we can organize things so that he does not fall when he is drawed. This is still happening in the `init` part of `game`.

```javascript
const firstPlatform = new Platform();
firstPlatform.y = doodler.y;
firstPlatform.x = doodler.x;
this.platforms.push(firstPlatform);
```

In the real game, the doodler can never go up more than half of the screen size whenever he jumps. In the `update` function of the `doodler` object, we can add this condition to solve this issue:

```javascript
if (this.y < game.canvas.height / 2.8) {
  this.y = game.canvas.height / 2.8;
}
```

[<< Go back](./part_2.md) || [Part 4 >>](./part_4.md)
