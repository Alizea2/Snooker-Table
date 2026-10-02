# Snooker Table

A browser snooker game built with **p5.js** for drawing and **Matter.js** for physics. You aim the cue with the mouse, strike with the spacebar, and pot balls across three game modes. It has sound effects, a live event log, and a game-over score screen.

Built as the midterm project for a Graphics Programming course.

## Features

- **Realistic table**: wood-textured cushions, green baize, six pockets, the baulk line and the "D"
- **Physics**: Matter.js handles ball collisions, friction and rebounds (gravity is turned off for a top-down table)
- **Three game modes**
  1. **Standard**: reds in a triangle and colours on their spots
  2. **Random Reds**: reds scattered randomly, colours on their spots
  3. **Random All Balls**: every ball placed randomly on the table
- **Cue control**: the cue follows the mouse; the farther the mouse is from the cue ball, the harder the shot
- **Rules**: colours are re-spotted while reds remain. Potting the cue ball or two colours in a row counts as a foul.
- **Game log**: an on-screen panel that records shots, pots and fouls
- **Sound effects**: cue strike, ball-on-ball clicks and pocket sounds, triggered by collision detection
- **Game-over screen**: shows reds potted, colours potted and fouls once the table is cleared

## Controls

| Key / Input | Action |
|-------------|--------|
| `1` / `2` / `3` | Start Standard / Random Reds / Random All Balls mode |
| `I` | Place the cue ball |
| Mouse | Aim the cue and set the power (distance from the cue ball) |
| `Space` | Strike the cue ball |
| `R` | Restart after game over |

## Running the Game

The game loads images and sounds, so it has to be served over a local web server. Opening `index.html` directly from the file system won't work.

**VS Code:** install the *Live Server* extension, right-click `index.html`, and choose **Open with Live Server**.

**Python:**

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Project Structure

| File | Purpose |
|------|---------|
| `index.html` | Loads the libraries and game scripts |
| `sketch.js` | p5.js `preload` / `setup` / `draw` loop and keyboard controls |
| `SnookerTable.js` | Draws the table, cushions, pockets and markings |
| `Ball.js` | Ball physics body and rendering |
| `Cue.js` | Cue aiming, drawing and shot force |
| `GameManager.js` | Ball setup for each mode, pocketing, fouls, collisions and game-over detection |
| `GameModeSelector.js` | On-screen panel listing the game modes |
| `GameLogger.js` | On-screen panel logging game events |
| `GameSound.js` | Loads and plays the sound effects |
| `GameOverScreen.js` | End-of-game stats screen |
| `gallery/` | Textures, background image and sound files |
| `libraries/` | p5.js, p5.sound and Matter.js |

## Built With

- [p5.js](https://p5js.org/): drawing and input
- [p5.sound](https://p5js.org/reference/#/libraries/p5.sound): audio
- [Matter.js](https://brm.io/matter-js/): 2D physics engine

## Author

[@Alizea2](https://github.com/Alizea2)
