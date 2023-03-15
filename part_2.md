[<< Go back](./part_1.md) || [Part 3 >>](./part_3.md)

## Part 2 - Make the doodler move

### Controller

We will create a controller to, as its name indicates, control our doodler. We will use an `EventListener` to check when a key is pressed and when it is released.

We will use three parameters on the ```addEventListener```:
* The action/event
* The function to be called when the action is performed
* The desactivation of bubbling by a false boolean value

The `set` used on the keys of the controller has two parameters:
* its key (the key to press)
* its value

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

Within the `game` object, at the `init` function level, we need to call the controller `init`.

```javascript
controller.init();
```

In the `doodler` object, at the `update` function level, we need to add those conditions so that our doodler moves along:

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

Within the `update` function, in the `doodler` object, add this:

```javascript
if (this.x > game.canvas.width) {
  this.x = 0;
}
if (this.x < 0) {
  this.x = game.canvas.width;
}
```

Now we will make it so that the image transfers in a fluid manner to the other side of the screen when it exits from one side. In order to do so, we need to access the `draw` function within the `doodler` object and add this:

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

[<< Go back](./part_1.md) || [Part 3 >>](./part_3.md)
