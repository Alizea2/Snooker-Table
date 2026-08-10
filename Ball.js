class Ball {
  constructor(x, y, r, color, label) {
    //creating the ball using physics engine
    this.body = Matter.Bodies.circle(x, y, r, {
      //for the ball bounciness
      restitution: 0.9,
      //no friction
      friction: 0,
      //adding slight air friction
      frictionAir: 0.01,
      //lable for the ball
      label: label
    });
    //adding the ball to the world
    Matter.World.add(world, this.body);
    //ball properties
    this.r = r;
    this.color = color;
    this.label = label;
    this.isPotted = false;
  }

  //display the ball on th table
  show() {
    //ball position
    let pos = this.body.position;
    push();
    //moving the ball to the position
    translate(pos.x, pos.y);

    //drawing radial gradient ball
    this.drawGradientBall(0, 0, this.r, this.color);

    //removing
    pop();
  }

  //drawing radial gradient ball
  drawGradientBall(x, y, r, baseColor) {
    const centerColor = color(baseColor);
    const edgeColor = color(lerpColor(centerColor, color(0), 0.6)); // darkened outer edge

     //drawing concentric circles to create the gradient effect
    for (let i = r; i > 0; i--) {
      let inter = map(i, 0, r, 0, 1);
      fill(lerpColor(centerColor, edgeColor, inter));
      noStroke();
      ellipse(x, y, i * 2, i * 2);
    }
  }

  //checking if the ball is in any of the pockets
  isInPocket(pockets) {
    let pos = this.body.position;
    for (let pocket of pockets) {
      let d = dist(pos.x, pos.y, pocket.x, pocket.y);
      //if ball id very close to the pocket it drops
      if (d < pocket.radius) return true;
    }
    //if the ball is not in any pocket it stays
    return false;
  }

  //removing the ball from the world
  remove() {
    Matter.World.remove(world, this.body);
    this.isPotted = true;
  }
}