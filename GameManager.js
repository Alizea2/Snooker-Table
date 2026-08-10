class GameManager {
  constructor(table, logger) {
    //refrensing to the snooker table and logger
    this.table = table;
    this.logger = logger;
    //list of red balls
    this.balls = [];
    //cue ball object and cue shooting
    this.cueBall = null;
    this.cue = new Cue();
    //colored balls list
    this.coloredBalls = [];
    //tracking the last pocketed balls color
    this.lastPottedColor = null;
    //checking fouls
    this.consecutiveColorFoul = false;
    //spots of colored balls on the table
    this.colorSpots = {};

    //counting the number of balls potted and fouls
    this.redPotted = 0;
    this.colorPotted = 0;
    this.foulCount = 0;
    //flag to check if the game is over
    this.isGameOver = false;
  }

  //setting the balls based on the selectedd game mode 
  setupBalls(mode) {
    //clears the existing balls
    this.clearBalls();
    //radius of the ball
    let r = this.table.ballDiameter / 2;
    let startY = this.table.y + this.table.height / 2;

    //sets the balls upon user selection
    if (mode === 1) {
      this.addRedTriangle(this.table.x + this.table.width * 0.7, startY, r);
      this.addColoredBalls();
    } else if (mode === 2) {
      this.addRandomBalls('red');
    } else if (mode === 3) {
      this.addRandomBalls('all');
    }
  }

  //clears the existing balls
  clearBalls() {
    //removing all the balls from the table
    for (let b of this.balls) b.remove();
    for (let b of this.coloredBalls) b.remove();
    if (this.cueBall) this.cueBall.remove();

    //resetting all the game variables
    this.balls = [];
    this.coloredBalls = [];
    this.cueBall = null;
    this.lastPottedColor = null;
    this.consecutiveColorFoul = false;
    this.redPotted = 0;
    this.colorPotted = 0;
    this.foulCount = 0;
    this.isGameOver = false;
    //hidding the game over screen
    if (gameOverScreen) gameOverScreen.hide();
  }

  //adding the red triangle ball
  addRedTriangle(x, y, r) {
    //creating the red triangle ball
    let rows = 5;
    const startX = this.table.x + this.table.width * 0.71;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j <= i; j++) {
        let bx = startX + i * r * 2;
        let by = y - i * r + j * r * 2;
        //adding the red triangle ball
        this.balls.push(new Ball(bx, by, r, 'red', 'red'));
      }
    }
  }

  //adding the colored balls
  addColoredBalls() {
    if (this.coloredBalls.length > 0) return;
    
    //variables
    const r = this.table.ballDiameter / 2;
    const x = this.table.x;
    const y = this.table.y;
    const w = this.table.width;
    const h = this.table.height;

    const centerY = y + h / 2;
    const baulkX = x + w * 0.25;
    const dRadius = w / 8;

    const positions = {
      green:  { x: baulkX - dRadius * Math.cos(Math.PI / 2), y: centerY - dRadius * Math.sin(Math.PI / 2) },
      brown:  { x: baulkX, y: centerY },
      yellow: { x: baulkX - dRadius * Math.cos(Math.PI / 2), y: centerY + dRadius * Math.sin(Math.PI / 2) },
      blue:   { x: x + w * 0.5, y: centerY },
      pink:   { x: x + w * 0.68, y: centerY },
      black:  { x: x + w * 0.93, y: centerY }
    };

    //adding each colored ball to the table at its position
    for (let color in positions) {
      let pos = positions[color];
      const ball = new Ball(pos.x, pos.y, r, color, color);
      this.coloredBalls.push(ball);
      this.colorSpots[color] = { x: pos.x, y: pos.y };
    }
  }

  //adding random set of balls based on the type red or all
  addRandomBalls(type) {
    //if type is red then adds 15 balls but if type is all then adds 21 balls
    const total = type == 'red' ? 15 : 21;
    const r = this.table.ballDiameter / 2;
    const colors = ['yellow', 'green', 'brown', 'blue', 'pink', 'black'];

    //adds random balls to the table
    for (let i = 0; i < total; i++) {
      const x = random(this.table.x + r * 2, this.table.x + this.table.width - r * 2);
      const y = random(this.table.y + r * 2, this.table.y + this.table.height - r * 2);
      if (type === 'red') {
        //adds red balls
        this.balls.push(new Ball(x, y, r, 'red', 'red'));
      } else {
        const color = i < 15 ? 'red' : colors[i % colors.length];
        const arr = color === 'red' ? this.balls : this.coloredBalls;
        //addds colored balls
        arr.push(new Ball(x, y, r, color, color));
      }
    }
  }

  //inseting the cue ball in the d-zone
  insertCueBall() {
    const r = this.table.ballDiameter / 2;
    const dRadius = this.table.width / 8;
    const centerX = this.table.x + this.table.width * 0.25;
    const centerY = this.table.y + this.table.height / 2;

    const cueX = centerX - dRadius * 0.5;
    const cueY = centerY;

    const cueBall = new Ball(cueX, cueY, r, 'white', 'cueBall');
    this.cueBall = cueBall;
    //logs the cue ball insertion
    this.logger.log("Cue ball inserted in D zone.");
  }

  //cheaking if any balls are pocketed
  checkPockets() {
    const allBalls = [...this.balls, ...this.coloredBalls];
  
    //looping through all the balls and checking if they are pocketed
    for (let i = allBalls.length - 1; i >= 0; i--) {
      const ball = allBalls[i];
      if (ball.isInPocket(this.table.pockets)) {
        //playing the pocket sound
        if (gameSound) gameSound.playPocketSound();
        this.logger.log(`${ball.label} ball potted.`);
        //removing the ball from the table
        ball.remove();
  
        //removing the ball from the balls array and updating the score
        if (ball.label === 'red') {
          this.redPotted++;
          this.balls.splice(this.balls.indexOf(ball), 1);
          //sees if the last red ball is potted
          this.lastBallType = 'red'; 
        } else {
          this.colorPotted++;
          const idx = this.coloredBalls.indexOf(ball);
          if (idx !== -1) this.coloredBalls.splice(idx, 1);
  
          //respoting the colored balls if red balls are remaining
          if (this.balls.length > 0) {
            const spot = this.colorSpots[ball.label];
            if (spot) {
              const r = this.table.ballDiameter / 2;
              const respotted = new Ball(spot.x, spot.y, r, ball.label, ball.label);
              this.coloredBalls.push(respotted);
            }
          }
  
          //checking for foul if consecutive colored balls are potted
          if (this.lastBallType === 'color') {
            this.consecutiveColorFoul = true;
            this.foulCount++;
            this.logger.log("Foul: Consecutive colored balls potted!");
          } else {
            this.consecutiveColorFoul = false;
          }
          //updating last ball type
          this.lastBallType = 'color';
        }
      }
    }
  
    //checking if the cue ball is pocketed
    if (this.cueBall && this.cueBall.isInPocket(this.table.pockets)) {
      if (gameSound) gameSound.playPocketSound();
      this.logger.log("Cue ball potted. Replacing...");
      this.cueBall.remove();
      this.insertCueBall();
      this.foulCount++;
    }
  
    //ending the game if all balss are pocketed
    if (
      (this.balls.length === 0 && this.coloredBalls.length === 0) &&
      (this.redPotted > 0 || this.colorPotted > 0)
    ) {
      this.isGameOver = true;
      gameOverScreen.show({
        redPotted: this.redPotted,
        colorPotted: this.colorPotted,
        fouls: this.foulCount
      });
      this.logger.log("🎉 Game Over! All balls potted.");
    }
  }

  //detecting collisions between balls
  detectCollisions() {
    Matter.Events.on(engine, 'collisionStart', (event) => {
      for (let pair of event.pairs) {
        const a = pair.bodyA.label;
        const b = pair.bodyB.label;
        if (a === 'cueBall' || b === 'cueBall') {
          const other = a === 'cueBall' ? b : a;
          //logging cue ball collisions
          this.logger.log(`Cue ball hit ${other}`);
        }

        if (gameSound && a !== 'table' && b !== 'table') {
          //playing the ball hit sound
          gameSound.playBallHitSound();
        }
      }
    });
  }

  //displaying all the balls on the table
  show() {
    //showing red balls
    for (let b of this.balls) b.show();
    //showing colored balls
    for (let b of this.coloredBalls) b.show();
    //showing the cue ball
    if (this.cueBall) this.cueBall.show();
    //showing cue stick
    this.cue.show(this.cueBall);
  }
}