class GameLogger {
  constructor(x, y, w, h) {
    //properties of the game logger
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h + 40; 
    this.messages = [];
    this.lineHeight = 16;
    this.padding = 10;
    this.maxMessages = Math.floor((this.h - 50) / this.lineHeight); 
  }

  //adding message to the log
  log(msg) {
    //ads message to the array
    this.messages.push(msg);
    if (this.messages.length > this.maxMessages) {
      //removes the oldest if the limit is reached
      this.messages.shift();
    }
  }

  //displaying the log meaasages in the game
  show() {
    push();

    //translucent background
    noStroke();
    fill(0, 180);
    rect(this.x, this.y, this.w, this.h, 15);

    //border glow effect
    strokeWeight(2);
    stroke(200, 200, 255, 80);
    noFill();
    rect(this.x + 1, this.y + 1, this.w - 2, this.h - 2, 15);

    stroke(255, 255, 255, 40);
    rect(this.x + 3, this.y + 3, this.w - 6, this.h - 6, 12);

    //adding header background
    const titleBoxW = 140;
    const titleBoxH = 26;
    const titleBoxX = this.x + this.w / 2 - titleBoxW / 2;
    const titleBoxY = this.y + 5;

    fill(255, 80);
    noStroke();
    rect(titleBoxX, titleBoxY, titleBoxW, titleBoxH, 8);

    //creating the 8 ball icon
    const ballX = titleBoxX + 15;
    const ballY = titleBoxY + titleBoxH / 2;
    fill(0); ellipse(ballX, ballY, 20);
    fill(255); ellipse(ballX, ballY, 10);
    fill(0); textAlign(CENTER, CENTER); textSize(8); text("8", ballX, ballY + 0.5);

    //adding the title text
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(16);
    text("Game Log", ballX + 12, ballY + 1);

    //displaying the log messages with padding
    textAlign(LEFT, TOP);
    textSize(12);
    fill(240);

    //giving the starting y position
    let baseY = this.y + 38;
    for (let i = 0; i < this.messages.length; i++) {
      const msg = this.messages[i];
      //clipping if too long
      const clipped = msg.length > 45 ? msg.slice(0, 42) + "..." : msg;
      //drawing the message in the log
      text(clipped, this.x + this.padding, baseY + i * this.lineHeight);
    }
    pop();
  }
}