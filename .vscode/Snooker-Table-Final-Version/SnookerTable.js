//variables
let tableTextur;
let darkWood;
let lightWood;

class SnookerTable {
  constructor(width, height, canvasWidth, canvasHeight) {
    //table dimensions and positions
    this.width = width;
    this.height = height;
    this.x = canvasWidth / 2 - width / 2;
    this.y = canvasHeight / 2 - height / 2;
    //ball and pocket size
    this.ballDiameter = width / 36;
    this.pocketRadius = this.ballDiameter;
    this.pockets = [];

    //defining pocket positions and wall boundaries using physics
    this.createPockets();
    this.addCushions();
  }

  //creating 6pockets two in middle and 4 on corners
  createPockets() {
    let px = this.x, py = this.y;
    let w = this.width, h = this.height, r = this.pocketRadius;
    this.pockets = [
      { x: px, y: py, radius: r },
      { x: px + w / 2, y: py, radius: r },
      { x: px + w, y: py, radius: r },
      { x: px, y: py + h, radius: r },
      { x: px + w / 2, y: py + h, radius: r },
      { x: px + w, y: py + h, radius: r },
    ];
  }

  //adding 4 cushion walls arounf the table for collesion
  addCushions() {
    let thickness = 25;
    let x = this.x;
    let y = this.y;
    let w = this.width;
    let h = this.height;

    let options = {
      isStatic: true,
      restitution: 0.85,
      friction: 0,
      label: 'cushion'
    };

    let top = Matter.Bodies.rectangle(x + w / 2, y - thickness / 2, w, thickness, options);
    let bottom = Matter.Bodies.rectangle(x + w / 2, y + h + thickness / 2, w, thickness, options);
    let left = Matter.Bodies.rectangle(x - thickness / 2, y + h / 2, thickness, h, options);
    let right = Matter.Bodies.rectangle(x + w + thickness / 2, y + h / 2, thickness, h, options);

    Matter.World.add(world, [top, bottom, left, right]);
  }

  //drawing the d-zone for placing the cue ball
  drawDZ() {
    stroke(255);
    strokeWeight(4);
    noFill();

    const dRadius = this.width / 8;
    const centerX = this.x + this.width * 0.25;
    const centerY = this.y + this.height / 2;

    line(centerX, this.y + 2, centerX, this.y + this.height - 2);
    arc(centerX, centerY, dRadius * 2, dRadius * 2, HALF_PI, -HALF_PI);
  }

  //drawing the diamonds for the table border
  drawDiamond(x, y, size) {
    beginShape();
    vertex(x, y - size);
    vertex(x + size, y);
    vertex(x, y + size);
    vertex(x - size, y);
    endShape(CLOSE);
  }

  //drawing a gradient filled pocket on the table
  drawGradientPocket(x, y, radius) {
    for (let i = radius; i > 0; i--) {
      let inter = map(i, 0, radius, 0, 1);
      fill(lerpColor(color(50), color(0), inter));
      noStroke();
      ellipse(x, y, i * 2);
    }
  }

  //drawing the whole snoooker table
  show() {
    //outor border dark wood 
    if (darkWood) {
      image(darkWood, this.x - 40, this.y - 40, this.width + 80, this.height + 80);
    } else {
      noStroke();
      fill(60, 30, 10);
      rect(this.x - 40, this.y - 40, this.width + 80, this.height + 80, 30);
    }

    //inner border light wood 
    if (lightWood) {
      image(lightWood, this.x - 25, this.y - 25, this.width + 50, this.height + 50);
    } else {
      fill(120, 70, 30);
      rect(this.x - 25, this.y - 25, this.width + 50, this.height + 50, 20);
    }

    //green table carpet 
    if (tableTexture) {
      image(tableTexture, this.x, this.y, this.width, this.height);
    } else {
      fill(10, 100, 40);
      stroke(255);
      strokeWeight(2);
      rect(this.x, this.y, this.width, this.height, 15);
    }

    //drawing diamonds on the table border
    fill(0);
    noStroke();
    const spacingX = this.width / 8;
    const spacingY = this.height / 4;
    for (let i = 1; i < 8; i++) {
      this.drawDiamond(this.x + i * spacingX, this.y - 15, 6); // top
      this.drawDiamond(this.x + i * spacingX, this.y + this.height + 15, 6); // bottom
    }
    for (let i = 1; i < 4; i++) {
      this.drawDiamond(this.x - 15, this.y + i * spacingY, 6); // left
      this.drawDiamond(this.x + this.width + 15, this.y + i * spacingY, 6); // right
    }

    //drawing the pockets with gradient
    for (let pocket of this.pockets) {
      this.drawGradientPocket(pocket.x, pocket.y, pocket.radius);
    }

    //drawing the d zone
    this.drawDZ();
  }
}