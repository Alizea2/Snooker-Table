class Cue {
  constructor() {
    //flag checking if cue shooting
    this.shooting = false;
    //flag checking if cue visible
    this.visible = true;
  }

  //displayig the cue based on cue balls position and mouse position
  show(cueBall) {
    if (!cueBall || !this.visible) return;
  
    //getting the cue ball postionn
    let pos = cueBall.body.position;
    //calculating mouse angle
    let angle = atan2(mouseY - pos.y, mouseX - pos.x);
  
    //drawing the cue
    push();
    //moving thecue to the cue ball possition
    translate(pos.x, pos.y);
    //pointing the cue tip towards cue ball
    rotate(angle + PI); 
  
    //cue stick properties
    const cueLength = min(width, height) * 0.45;
    const frontWidth = 6;
    const backWidth = 16;
    const gripLength = 30;
  
    //red triangle tip
    fill(255, 0 ,0);
    noStroke();
    triangle(0, 0, 8, -3, 8, 3);
  
    //silver ring
    fill(192);
    rect(8, -frontWidth / 2, 4, frontWidth);
  
    //tapered shaft
    fill(222, 184, 135); 
    beginShape();
    vertex(12, -frontWidth / 2);                            
    vertex(12 + cueLength - gripLength, -backWidth / 2);   
    vertex(12 + cueLength - gripLength, backWidth / 2);    
    vertex(12, frontWidth / 2);                             
    endShape(CLOSE);
  
    //making the solid dark brown handle
    noStroke();
    fill(80, 40, 20); 
    rect(12 + cueLength - gripLength, -backWidth / 2, gripLength, backWidth);
  
    //rounded back cap
    fill(60, 30, 30);
    ellipse(12 + cueLength - gripLength - 6, 0, 18, 18); 
  
    //ending cue drawing
    pop();
  }

  //shooting the cue ball 
  shoot(cueBall) {
    //playing the cue sound
    if (gameSound) gameSound.playCueSound();
    if (!cueBall) return;
    //stopping shooting while cue ball stilll moving
    if (Matter.Vector.magnitude(cueBall.body.velocity) > 0.1) return;

    let pos = cueBall.body.position;
    //calculating the distance between mouse and cue ball
    let dx = mouseX - pos.x;
    let dy = mouseY - pos.y;
    //constraining the shooting distance
    let distance = constrain(sqrt(dx * dx + dy * dy), 10, 150);
    //calculating the angle of the shot
    let angle = atan2(dy, dx);
    //mapping the distance to force
    let forceMagnitude = map(distance, 10, 150, 0.005, 0.03);

    //calculating the force vector
    let force = {
      x: cos(angle) * forceMagnitude,
      y: sin(angle) * forceMagnitude
    };


    Matter.Body.setVelocity(cueBall.body, { x: 0, y: 0 });
    //applyig force to the cur ball
    Matter.Body.applyForce(cueBall.body, pos, force);

    //hiding the cue after shooting
    this.visible = false; 
  }

  //updating the cue stick visibility based on ball speed
  update(cueBall) {
    if (!cueBall) return;
    //calculates sped of cue ball
    const speed = Matter.Vector.magnitude(cueBall.body.velocity);
    if (speed < 0.1) {
      //showing the cue stick when ball is not moving
      this.visible = true; 
    }
  }
}