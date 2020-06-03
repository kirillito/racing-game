const	KEY_UP_ARROW	= 38;
const	KEY_DOWN_ARROW	= 40;
const	KEY_LEFT_ARROW	= 37;
const	KEY_RIGHT_ARROW	= 39;
const	KEY_W	= 87;
const	KEY_A	= 65;
const	KEY_S	= 83;
const	KEY_D	= 68;

function initInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  player1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
  player2.setupControls(KEY_W, KEY_S, KEY_A, KEY_D);
}

function keyPressed(e) {
  setKeyHoldState(e.keyCode, player1, true);
  setKeyHoldState(e.keyCode, player2, true);

  e.preventDefault();
}

function keyReleased(e) {
  setKeyHoldState(e.keyCode, player1, false);
  setKeyHoldState(e.keyCode, player2, false);
}

function setKeyHoldState(keyCode, player,	isPressed) {
  if (keyCode === player.controlKeyGas) {
    player.keyHeld_Gas	= isPressed;
  }
  else if (keyCode === player.controlKeyReverse) {
    player.keyHeld_Reverse	= isPressed;
  }
  else if (keyCode === player.controlKeyTurnLeft) {
    player.keyHeld_TurnLeft	= isPressed;
  }
  else if (keyCode === player.controlKeyTurnRight) {
    player.keyHeld_TurnRight	= isPressed;
  }
}