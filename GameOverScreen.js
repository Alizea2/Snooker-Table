class GameOverScreen {
    constructor() {
      //determines if the game is over is visible
      this.visible = false;
      //traking the user score 
      this.stats = {
        redPotted: 0,
        colorPotted: 0,
        fouls: 0
      };
    }
  
    //shows the game over screen with user stats
    show(stats) {
      this.stats = stats;
      this.visible = true;
    }
  
    //rendering the game over screen with user score
    render() {
      if (!this.visible) return;
  
      //drawing a transparent black rectangular background
      push();
      fill(0, 180);
      rect(0, 0, width, height);

      //game over txt propertoes
      textAlign(CENTER, CENTER);
      textSize(40);
      fill(255);
      text("🏁 GAME OVER", width / 2, height / 2 - 100);
  
      //displying the user stats
      textSize(20);
      fill(255);
      text("Potted Reds:", width / 2 - 100, height / 2 - 40);
      text(this.stats.redPotted, width / 2 + 100, height / 2 - 40);
  
      text("Potted Colors:", width / 2 - 100, height / 2);
      text(this.stats.colorPotted, width / 2 + 100, height / 2);
  
      text("Fouls:", width / 2 - 100, height / 2 + 40);
      text(this.stats.fouls, width / 2 + 100, height / 2 + 40);
  
      //instructions to restart the game
      textSize(16);
      text("Press 'R' to restart", width / 2, height / 2 + 100);
      pop();
    }
  
    //hides the game over screen
    hide() {
      this.visible = false;
    }
  }