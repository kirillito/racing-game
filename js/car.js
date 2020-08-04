const DRIVE_POWER = 0.4;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.02;
const MIN_TURN_SPEED = 0.6;
const GROUNDSPEED_DECAY_MULT = 0.94;

function car(name) {
  this.name = name;

  this.startX;
  this.startY;
  this.carX;
  this.carY;

  this.carSpeed;
  this.carAngle;
  this.lap;

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

  this.init = function(img) {
    this.imgSprite = img;
    this.reset();
  }

  this.reset = function() {
    this.carSpeed = 0;
    this.carAngle = 0;
    this.lap = 0;

    if (this.startX === undefined) {
      for (let i=0; i<trackGrid.length; i++) {
        if (trackGrid[i] == TRACK_CODE_PLAYER) {
          let	row	= Math.floor(i/TRACK_COLS);
          let	col	=	i%TRACK_COLS;
          
          this.startX = TRACK_W * (col + 0.5);
          this.startY = TRACK_H * (row + 0.5);
          trackGrid[i] = TRACK_CODE_ROAD;
          break;
        }
      }
    }

    this.carX = this.startX;
    this.carY = this.startY;
  }

  this.move = function() {
    let currentTileCode = getTrackCodeAtPixelCoordinates(this.carX, this.carY);

    if (this.keyHeld_Gas)	{
      if (currentTileCode !== TRACK_CODE_GRASS) {
        this.carSpeed	+= DRIVE_POWER;
      } else {
        this.carSpeed	+= DRIVE_POWER*0.4;
      }
    }
    if (this.keyHeld_Reverse)	{
      if (currentTileCode !== TRACK_CODE_GRASS) {
        this.carSpeed	+= -REVERSE_POWER;
      } else {
        this.carSpeed	+= -REVERSE_POWER*0.4;
      }
    }
    if (Math.abs(this.carSpeed) >= MIN_TURN_SPEED) {
      if (this.keyHeld_TurnLeft)	{
        if (currentTileCode !== TRACK_CODE_OIL) {
          this.carAngle	+= -TURN_RATE*Math.PI;
        }
      }
      if (this.keyHeld_TurnRight)	{
        if (currentTileCode !== TRACK_CODE_OIL) {
          this.carAngle	+= TURN_RATE*Math.PI;
        }
      }
    }

    let nextCarX = this.carX + Math.cos(this.carAngle) * this.carSpeed;
    let nextCarY = this.carY + Math.sin(this.carAngle) * this.carSpeed;

    let nextTileCode = getTrackCodeAtPixelCoordinates(nextCarX, nextCarY);

    if (nextTileCode === TRACK_CODE_ROAD || nextTileCode === TRACK_CODE_GRASS || nextTileCode === TRACK_CODE_OIL || nextTileCode === TRACK_CODE_FINISH) {
      if (nextTileCode === TRACK_CODE_FINISH) {
        let currentTileCode = getTrackCodeAtPixelCoordinates(this.carX, this.carY);

        // TODO: it is currenty possible to drive in opposite direction and still cross the finish line counting it as a lap
        if (currentTileCode !== nextTileCode) {
          this.lap++;
        }
      }

      this.carX = nextCarX;
      this.carY = nextCarY;

      this.carSpeed *= GROUNDSPEED_DECAY_MULT;
    } else {
      this.carSpeed = -0.5*this.carSpeed;
    }
  }

  this.draw = function() {
    drawImageCenteredAtLocationWithRotation(this.imgSprite, this.carX, this.carY, this.carAngle);
  }
}