let canvas;
let canvasContext;

const FPS = 30;

const TOTAL_LAPS = 3;

// Race flow: READY (start screen) -> COUNTDOWN (3-2-1-GO) -> RACING -> FINISHED
const RACE_STATE_READY = 0;
const RACE_STATE_COUNTDOWN = 1;
const RACE_STATE_RACING = 2;
const RACE_STATE_FINISHED = 3;

const COUNTDOWN_FROM = 3;       // counts 3, 2, 1
const COUNTDOWN_STEP_MS = 1000; // time per number
const GO_MESSAGE_MS = 800;      // how long "GO!" stays on screen after the race starts

let player1 = new car("Player 1");
let player2 = new car("Player 2");
let winner = null;

let raceState = RACE_STATE_READY;
let countdownStartTime = 0;
let countdownLastStep = -1;
let raceStartTime = 0;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  document.getElementById("player1Name").innerHTML = player1.name;
  document.getElementById("player1NameControls").innerHTML = player1.name;
  document.getElementById("player2Name").innerHTML = player2.name;
  document.getElementById("player2NameControls").innerHTML = player2.name;

  this.initInput();
  this.loadSounds();
  this.loadImages();

  canvas.addEventListener('mousedown', handleMouseClick);
  document.addEventListener('keydown', handleGeneralKey);
}

// Click: starts the race from the start screen, or restarts after a finish.
function handleMouseClick(e) {
  requestRaceStart();
}

function handleGeneralKey(e) {
  if (e.keyCode === KEY_SPACE || e.keyCode === KEY_ENTER) {
    requestRaceStart();
  } else if (e.keyCode === KEY_M) {
    toggleSound();
  }
}

function requestRaceStart() {
  if (raceState === RACE_STATE_READY) {
    startCountdown();
  } else if (raceState === RACE_STATE_FINISHED) {
    player1.reset();
    player2.reset();
    winner = null;
    startCountdown();
  }
}

function launchIfReady() {
  if (imagesToLoad === 0) {
    startGame();
  }
}

function startGame() {
  setInterval(function() {
    animate();
    draw();
  }, 1000/FPS);

  player1.init(carPic1);
  player2.init(carPic2);
}

function startCountdown() {
  raceState = RACE_STATE_COUNTDOWN;
  countdownStartTime = performance.now();
  countdownLastStep = -1;
}

function startRace(now) {
  raceState = RACE_STATE_RACING;
  raceStartTime = now;
  player1.startLapTimer(now);
  player2.startLapTimer(now);
  playSound("go");
}

// Advances the 3-2-1 countdown; cars stay frozen until it reaches zero.
function updateCountdown(now) {
  let step = Math.floor((now - countdownStartTime) / COUNTDOWN_STEP_MS);

  if (step === countdownLastStep) {
    return;
  }
  countdownLastStep = step;

  if (step < COUNTDOWN_FROM) {
    playSound("countdown");
  } else {
    startRace(now);
  }
}

function animate() {
  let now = performance.now();

  if (raceState === RACE_STATE_COUNTDOWN) {
    updateCountdown(now);
    return;
  }

  if (raceState !== RACE_STATE_RACING) {
    return;
  }

  player1.move();
  player2.move();

  if (player1.lap >= TOTAL_LAPS) {
    winner = player1;
  } else if (player2.lap >= TOTAL_LAPS) {
    winner = player2;
  }

  if (winner !== null) {
    raceState = RACE_STATE_FINISHED;
    playSound("win");
  }
}

function formatTime(ms) {
  if (ms === null || ms === undefined) {
    return "-";
  }
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor(ms / 1000) % 60;
  let hundredths = Math.floor(ms / 10) % 100;
  return minutes + ":" + String(seconds).padStart(2, "0") + "." + String(hundredths).padStart(2, "0");
}

function updateHud(now) {
  let racing = (raceState === RACE_STATE_RACING);
  let players = [player1, player2];

  for (let i = 0; i < players.length; i++) {
    let p = players[i];
    let id = "player" + (i + 1);
    document.getElementById(id + "LapLabel").innerHTML = p.lap + " / " + TOTAL_LAPS;
    document.getElementById(id + "TimeLabel").innerHTML = racing ? formatTime(p.getCurrentLapTime(now)) : "-";
    document.getElementById(id + "BestLabel").innerHTML = formatTime(p.bestLapTime);
  }
}

function drawFinishedScreen() {
  drawCenteredText(winner.name + " won! Congratulations", 200, 32, 'white');

  let players = [player1, player2];
  let y = 280;
  for (let p of players) {
    drawCenteredText(p.name + " - best lap: " + formatTime(p.bestLapTime), y, 22, 'white');
    y += 34;
  }

  drawCenteredText("click or press Space to race again", 500, 22, 'white');
}

function drawCountdownOverlay(now) {
  let elapsed = now - countdownStartTime;
  let step = Math.floor(elapsed / COUNTDOWN_STEP_MS);
  let text = (step < COUNTDOWN_FROM) ? String(COUNTDOWN_FROM - step) : "GO!";
  drawCenteredText(text, canvas.height/2 + 40, 140, 'yellow');
}

function draw() {
  let now = performance.now();

  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');

  if (raceState === RACE_STATE_FINISHED) {
    drawFinishedScreen();
    updateHud(now);
    return;
  }

  drawTracks();

  // car
  player1.draw();
  player2.draw();

  if (raceState === RACE_STATE_READY) {
    drawCenteredText("Click or press Space to start", canvas.height/2, 40, 'yellow');
  } else if (raceState === RACE_STATE_COUNTDOWN) {
    drawCountdownOverlay(now);
  } else if (now - raceStartTime < GO_MESSAGE_MS) {
    drawCenteredText("GO!", canvas.height/2 + 40, 140, 'yellow');
  }

  updateHud(now);
}
