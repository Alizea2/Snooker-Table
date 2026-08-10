class GameModeSelector {
  constructor(x, y, w, h) {
    //for setting the size and position of the selector
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //adding the padding for the text
    this.padding = 12;
    //setting the available game modes
    this.modes = [
      { key: "1", label: "Standard Mode (reds + colors)" },
      { key: "2", label: "Random Reds" },
      { key: "3", label: "Random All Balls" }
    ];
  }

  show() {
    push();

    //translucent background
    noStroke();
    fill(0, 180);
    rect(this.x, this.y, this.w, this.h, 15);

    //border layers
    strokeWeight(2);
    stroke(200, 200, 255, 80);
    noFill();
    rect(this.x + 1, this.y + 1, this.w - 2, this.h - 2, 15);

    stroke(255, 255, 255, 40);
    rect(this.x + 3, this.y + 3, this.w - 6, this.h - 6, 12);

    //header background
    const titleW = 150;
    const titleH = 26;
    const titleX = this.x + this.w / 2 - titleW / 2;
    const titleY = this.y + 5;

    fill(255, 80);
    noStroke();
    rect(titleX, titleY, titleW, titleH, 8);

    //adding icon with white ellipse background 
    const iconX = titleX + 15;
    const iconY = titleY + titleH / 2;

    fill(255);
    noStroke();
    ellipse(iconX, iconY, 20);

    textSize(14);
    textAlign(CENTER, CENTER);
    fill(0);
    text("🎮", iconX + 1.6, iconY + 0.5);

    //adding title text
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(16);
    text("Game Modes", iconX + 15, iconY + 1);

    //mode labels
    fill(240);
    textAlign(LEFT, TOP);
    textSize(14);
    let baseY = this.y + 40;
    for (let i = 0; i < this.modes.length; i++) {
      text(`${this.modes[i].key} → ${this.modes[i].label}`, this.x + this.padding, baseY + i * 20);
    }

    //adding note at the bottom for cue
    textSize(15);
    fill(255);
    text("Note: Press 'I' for Cue", this.x + this.padding, baseY + this.modes.length * 20 );

    pop();
  }
}