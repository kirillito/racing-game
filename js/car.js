var carX = 50;
var carY = 50;
var carSpeed = 0;
var carAngle = 0;

var DRIVE_POWER = 0.4;
var REVERSE_POWER = 0.2;
var TURN_RATE = 0.02;
var MIN_TURN_SPEED = 0.6;
var GROUNDSPEED_DECAY_MULT = 0.94;


function carReset() {
  // if (playerLives <= 0) {
  //   showingLoseScreen = true;
  // }

  for (var i=0; i<trackGrid.length; i++) {
    if (trackGrid[i] == TRACK_CODE_PLAYER) {
      var	row	= Math.floor(i/TRACK_COLS);
      var	col	=	i%TRACK_COLS;
      
      carX = TRACK_W * (col + 0.5);
      carY = TRACK_H * (row + 0.5);
      trackGrid[i] = TRACK_CODE_ROAD;
      break;
    }
  }
}

function animateCar() {
  if (keyHeld_Gas)	{
    carSpeed	+= DRIVE_POWER;
  }
  if (keyHeld_Reverse)	{
    carSpeed	+= -REVERSE_POWER;
  }
  if (Math.abs(carSpeed) >= MIN_TURN_SPEED) {
    if (keyHeld_TurnLeft)	{
      carAngle	+= -TURN_RATE*Math.PI;
    }
    if (keyHeld_TurnRight)	{
      carAngle	+= TURN_RATE*Math.PI;
    }
  }

  var nextCarX = carX + Math.cos(carAngle) * carSpeed;
  var nextCarY = carY + Math.sin(carAngle) * carSpeed;

  if (checkForRoadAtPixelCoord(nextCarX, nextCarY)) {
    carX = nextCarX;
    carY = nextCarY;

    carSpeed *= GROUNDSPEED_DECAY_MULT;				
  } else {
    carSpeed = -0.5*carSpeed;
  }
}

function drawCar(carX, carY) {
  drawImageCenteredAtLocationWithRotation(carPic, carX, carY, carAngle);
}