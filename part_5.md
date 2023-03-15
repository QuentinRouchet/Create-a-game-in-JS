## Part 5 - Score and reset

### Score

Now that the game is playable, we need a scoring system!

Within the `playing` function of the `game` object, add this :

```javascript
this.realScore += Math.round(-doodler.vy / 5);
this.score = this.score < this.realScore ? this.realScore : this.score;
```

In the code you can see three native function of JavaScript : 
* ```font``` : select a font for the context
* ```textAlign``` : select an alignement for the text
* ```fillText``` : write your text
And now within `draw` of `game` add this :

```javascript
const displayScore = new Intl.NumberFormat(["fr-FR"]).format(this.score);
// parameters(size font, font familly)
this.ctx.font = "20px Arial";
this.ctx.textAlign = "center";
// parameters(your text, x, y)
this.ctx.fillText(`Score : ${displayScore}`, this.canvas.width / 2, 20);
```

### Game Over

We know how to handle a loss! Let's design what happens when the game is over.

In the `gameOver` function of `game`, we add this :

```javascript
this.ctx.font = "20px Arial";
this.ctx.textAlign = "center";
this.ctx.fillText(`You lost`, this.canvas.width / 2, this.canvas.height / 2);
this.ctx.fillText(
  `Press SPACE to restart`,
  this.canvas.width / 2,
  this.canvas.height / 2 + 26
);
if (controller.keys.get("Space")) {
  window.location = "index.html";
}
```

And the final touch, within the `update` of `doodler`:

```javascript
if (this.y > game.canvas.height) {
  game.currentMode = "gameOver";
}
```

[<< Go back](./part_4.md)
