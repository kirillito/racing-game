const DRIVE_POWER = 0.4;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.02;
const MIN_TURN_SPEED = 0.6;
const GROUNDSPEED_DECAY_MULT = 0.94;

function car() {
  this.carX = 50;
  this.carY = 50;
  this.carSpeed = 0;
  this.carAngle = 0;

  this.keyHeld_Gas	= false;
  this.keyHeld_Reverse	= false;
  this.keyHeld_TurnLeft	= false;
  this.keyHeld_TurnRight	= false;

  this.setupControls = function(gasKey, reverseKey, turnLeftKey, turnRightKey) {
    this.controlKeyGas = gasKey;
    this.controlKeyReverse = reverseKey;
    this.controlKeyTurnLeft = turnLeftKey;
    this.controlKeyTurnRight = turnRightKey;
  }

  this.carInit = function() {
    this.carReset();
  }

  this.carReset = function() {
    // if (playerLives <= 0) {
    //   showingLoseScreen = true;
    // }

    for (var i=0; i<trackGrid.length; i++) {
      if (trackGrid[i] == TRACK_CODE_PLAYER) {
        var	row	= Math.floor(i/TRACK_COLS);
        var	col	=	i%TRACK_COLS;
        
        this.carX = TRACK_W * (col + 0.5);
        this.carY = TRACK_H * (row + 0.5);
        trackGrid[i] = TRACK_CODE_ROAD;
        break;
      }
    }
  }

  this.animateCar = function() {
    if (this.keyHeld_Gas)	{
      this.carSpeed	+= DRIVE_POWER;
    }
    if (this.keyHeld_Reverse)	{
      this.carSpeed	+= -REVERSE_POWER;
    }
    if (Math.abs(this.carSpeed) >= MIN_TURN_SPEED) {
      if (this.keyHeld_TurnLeft)	{
        this.carAngle	+= -TURN_RATE*Math.PI;
      }
      if (this.keyHeld_TurnRight)	{
        this.carAngle	+= TURN_RATE*Math.PI;
      }
    }

    var nextCarX = this.carX + Math.cos(this.carAngle) * this.carSpeed;
    var nextCarY = this.carY + Math.sin(this.carAngle) * this.carSpeed;

    if (checkForRoadAtPixelCoord(nextCarX, nextCarY)) {
      this.carX = nextCarX;
      this.carY = nextCarY;

      this.carSpeed *= GROUNDSPEED_DECAY_MULT;				
    } else {
      this.carSpeed = -0.5*this.carSpeed;
    }
  }

  this.drawCar = function() {
    drawImageCenteredAtLocationWithRotation(carPic, this.carX, this.carY, this.carAngle);
  }
}