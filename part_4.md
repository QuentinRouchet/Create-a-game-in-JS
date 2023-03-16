[<< Go back](./part_3.md) || [Part 5 >>](./part_5.md)

## Part 4 - Physics and hitbox

### Physics

Let's make this move! Put `doodler`'s vy to -25.

Weird... Nothing happens! Add this line in the `update` part:

```javascript
this.vy += this.vy > game.gravity ? 0 : 1;
```

Woah! The doodler is falling!

In the `update` of the `Platform` class we can add this :

```javascript
this.vy = -doodler.vy; // The dooler make a little jump at the start

this.x += this.vx;
this.y += this.vy;
```

Now we need to call the function update inside the `playing` function of the `game` like this :

```javascript
// Mets à jour les nouvelles plateformes qui on été générée.
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

Let's create the function handling the hit between the `doodler` and the `platform`. Write this function inside the `doodler`. 
This function gets the platform which the doodler has hit, makes the doodler jump higher and generates a new platform every time that the doodler touches one platform. It also prevents the platform from generating several platform ont he same spot.

```javascript
  getHit(platform) {
    this.vy = this.jumpforce;
    if (platform.canGenerate) {
      game.generatePlatforms(1, doodler.y - 3 * Platform.maxGap);
      platform.canGenerate = false;
    }
  },
```

And now we modify the `forEach` loop within the `playing` function of the `game`.
The ```const { x, y, width, height, offsetTop } = doodler;``` is what we call destructuring a variable. This way we avoid having to declare each variable separately.

```javascript
const { x, y, width, height, offsetTop } = doodler;
// Si le doodler entre en collision avec une plateforme et que le doodler tombe alors on appelle le getHit
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

In the following function we want to stop the function with a return whenever the platform is not "alive" anymore.
And let's add this in the `forEach` of the `playing` function within the `game` object:

```javascript
if (!platform.isAlive) {
  return;
}
```

[<< Go back](./part_3.md) || [Part 5 >>](./part_5.md)
