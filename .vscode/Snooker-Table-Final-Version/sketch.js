/* 
Snooker Game Project Commentary:
The GameLogger.js extension plays a crucial role in recording the player’s movements throughout the game.
This extension ensures that every movement, shot, foul  and game event is logged. It tracks key events such
as ball positioning, successful shots, and fouls, providing detailed feedback that can be accessed for review.
The ability to log game progress enhances the player’s experience, offering a record of their performance. By
analyzing these logs, players can understand their strategies, track improvements, and identify areas for 
enhancement in future sessions.

The GameOverScreen.js extension offers an immersive experience for players at the conclusion of the game.
When the game ends, this extension triggers a smooth transition to a game-over screen, signaling the conclusion
of the match. The game-over screen is visually engaging and informative, displaying key metrics such as the final
score which includes the total red balls potted, total color balls potted and fouls. This feature provides a sense
of accomplishment or areas to work on, encouraging players to reflect on their gameplay and determine the next steps
towards starting a new session by a simple key movement.

The GameSound.js extension is integral in providing an auditory layer to the gameplay, enhancing immersion. Sounds
such as the cue striking the balls, the sound of a successful pot, or balls clicking togather makes the game room
experience more engaging. The GameSound.js extension controls the sound effects, ensuring that the gameplay is both
dynamic and enjoyable using collision detection. The sound feedback reinforces actions, as at each shot a sound is 
played by detecting collision making it feel more impactful.This addition creates an atmosphere that complements the 
visual elements, creating a more enjoyable snooker session overall.

The Cue.js extension governs the player’s interaction with the cue, a fundamental aspect of gameplay.This extension
provides control over the angle and precision of each shot. The cue stick is visually represented and reacts according
to user input, allowing players to aim and strike. This extension plays a critical role in making the game feel responsive
and realistic, ensuring that each shot feels intentional and satisfying.User can use the mouse to aim at the ball and then
use the spacebar to strike at the ball to pocket it.

The 2nd and 3rd game modes require a random function to place balls on the canvas unlike the1st game mode. In the “Random Reds”
and “Random All Balls” modes, ball positions are determined by generating random coordinates within the table’s dimensions.
The algorithm uses JavaScript’s Math.random() function to assign positions to each ball. These random coordinates ensure that
the balls are scattered unpredictably across the table. To avoid overlap and ensure a playable area, additional constraints
are applied, keeping the balls within the boundaries of the table. This approach guarantees that no two games are the same,
enhancing replayability and adding excitement by requiring players to adapt to new ball arrangements with every game start.
 */


//declaring global variables
let engine, world;
let canvasWidth, canvasHeight;
let table, game, logger, modeSelector;
let bgImage;
let gameSound;
let gameOverScreen;

//loading images and sounds before setup
function preload() {
  //background
  bgImage = loadImage('./gallery/bgimg.jpg');  
  //table carpet       
  tableTexture = loadImage('./gallery/green.jpg'); 
  //table outer border    
  darkWood = loadImage('./gallery/D_Wood.jpg'); 
  //table inner border       
  lightWood = loadImage('./gallery/L_Wood.jpg'); 
  //game sound effects       
  gameSound = new GameSound();
}

function setup() {
  //creating full screen canvas
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);

  //creating Matter.js engine
  engine = Matter.Engine.create();
  world = engine.world;
  //disableing gravity
  engine.gravity.y = 0;

  //creating UI components
  modeSelector = new GameModeSelector(canvasWidth - 260, 20, 240, 120);   // ⬆ appears first
  logger = new GameLogger(canvasWidth - 260, 160, 240, 190);              // ⬇ appears below

  //setting uo the game manager and table
  table = new SnookerTable(800, 400, canvasWidth, canvasHeight);
  game = new GameManager(table, logger);

  //adding cue and collision ditection in game
  game.cue = new Cue(game.table);
  game.detectCollisions();

  //creating game over UI
  gameOverScreen = new GameOverScreen();
}

function draw() {
  //Background image
  image(bgImage, 0, 0, width, height); 
  //Updates physics engine
  Matter.Engine.update(engine);

  //draws table, ball, cue and checks if balls are in pocket
  table.show();
  game.show();
  game.checkPockets();

  //drawing the game mode selector and logger
  modeSelector.show();  
  logger.show();        

  //updates cue based on player input
  if (game && game.cue && game.cueBall) {
    game.cue.update(game.cueBall);
  }

   //showing the game over screen if needed
  gameOverScreen.render();
}

function keyPressed() {
  //standard mode
  if (key === '1') game.setupBalls(1);
  //random reds mode 
  if (key === '2') game.setupBalls(2);
  //random all balls
  if (key === '3') game.setupBalls(3);
  //inserts cue ball
  if (key === 'I' || key === 'i') game.insertCueBall();
  //shooting using spacebar
  if (keyCode === 32) game.cue.shoot(game.cueBall); 
  //to restart the game after game over
  if (key === 'R' || key === 'r') {
    //resets the table
    game.clearBalls();
    //reloads the standard mode
    game.setupBalls(1); 
    //places the cue ball
    game.insertCueBall();
    //remumes drawing if stops
    loop();
  }
}