class GameSound {
    constructor() {
      //preloading and storing all sound files
      this.pocketSound = loadSound("./gallery/pocket.wav");
      this.cueSound = loadSound("./gallery/cue.wav");
      this.ballHitSound = loadSound("./gallery/ball.wav");
  
      //setting the volume levels
      this.ballHitSound.setVolume(0.05); 
      this.pocketSound.setVolume(0.8);  
      this.cueSound.setVolume(0.9);
    }
  
    //playing the pocket sound when a ball drops in the pocket
    playPocketSound() {
      if (this.pocketSound && this.pocketSound.isLoaded()) {
        this.pocketSound.play();
      }
    }
  
    //playing the cue sound when he cue hits the cue ball
    playCueSound() {
      if (this.cueSound && this.cueSound.isLoaded()) {
        this.cueSound.play();
      }
    }
  
    //playing the ball hit sound when a ball collides with another ball
    playBallHitSound() {
      if (this.ballHitSound && this.ballHitSound.isLoaded()) {
        this.ballHitSound.play();
      }
    }
  }