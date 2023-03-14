## Part 4 - Physics and hitbox

### Physics

Let's make this move! Put `doodler`'s vy to -25.

Weird... Nothing happens! Add this line in the `update` part:

```javascript
this.vy += this.vy > game.gravity ? 0 : 1;
```

Woah! The doodler is falling!

Dans l'`update` de la class `Platform` on peut ajouter ceci :

```javascript
this.vy = -doodler.vy; // The dooler make a little jump at the start

this.x += this.vx;
this.y += this.vy;
```

Now we need to call the function update inside the `playing` function of the `game` like this :

```javascript
this.platforms.forEach((platform, index) => {
  platform.update();
});
```

### Hitbox



In the `platform` class, we will add a function to check hitboxes.

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

Let's create the function handling the hit between the `doodler` and the `platform`.

```javascript
  getHit(platform) {
    this.vy = this.jumpforce;
    if (platform.canGenerate) {
      game.generatePlatforms(1, doodler.y - 3 * Platform.maxGap);
      platform.canGenerate = false;
    }
  },
```

And now we modify the foreach loop within the `playing` function of the `game`.

```javascript
const { x, y, width, height, offsetTop } = doodler;
if (platform.checkCollision(x, y, width, height, offsetTop) && doodler.vy > 0) {
  doodler.getHit(platform);
}
```

### Remove platform

In the real Doodle Jump game, we cannot jump back on a platform that got out of screen. We now have to remove those platforms from the game.

Let's add this in the ```update``` function of the ```platform``` class:

```javascript
if (this.y > game.canvas.height) {
  this.isAlive = false;
}
```

And let's add this in the `forEach` of the `playing` function within the `game` object:

```javascript
if (!platform.isAlive) {
  return;
}
```

[<< Go back](./part_3.md) || [Part 5 >>](./part_5.md)
