const	KEY_UP_ARROW	= 38;
const	KEY_DOWN_ARROW	= 40;
const	KEY_LEFT_ARROW	= 37;
const	KEY_RIGHT_ARROW	= 39;
var	keyHeld_Gas	= false;
var	keyHeld_Reverse	= false;
var	keyHeld_TurnLeft	= false;
var	keyHeld_TurnRight	= false;

function initInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

function keyPressed(e) {
  setKeyHoldState(e.keyCode, true);

  e.preventDefault();
}

function keyReleased(e) {
  setKeyHoldState(e.keyCode, false);
}

function setKeyHoldState(keyCode,	setTo) {
  if (keyCode === KEY_UP_ARROW) {
    keyHeld_Gas	= setTo;
  }
  else if (keyCode === KEY_DOWN_ARROW) {
    keyHeld_Reverse	= setTo;
  }
  else if (keyCode === KEY_LEFT_ARROW) {
    keyHeld_TurnLeft	= setTo;
  }
  else if (keyCode === KEY_RIGHT_ARROW) {
    keyHeld_TurnRight	= setTo;
  }
}