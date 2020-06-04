let canvas;
let canvasContext;

const FPS = 30;

const TOTAL_LAPS = 3;

let player1 = new car("Player 1");
let player2 = new car("Player 2");
let winner = null;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  document.getElementById("player1Name").innerHTML = player1.name;
  document.getElementById("player1NameControls").innerHTML = player1.name;
  document.getElementById("player2Name").innerHTML = player2.name;
  document.getElementById("player2NameControls").innerHTML = player2.name;

  this.initInput();
  this.loadImages();

  canvas.addEventListener('mousedown', handleMouseClick);
}

function handleMouseClick(e) {
  if(winner) {
    player1.reset();
    player2.reset();
    winner = null;
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

function animate() {
  if(winner !== null) {
    return;
  }

  player1.move();
  player2.move();

  if (player1.lap >= TOTAL_LAPS) {
    winner = player1;
  } else if (player2.lap >= TOTAL_LAPS) {
    winner = player2;
  }
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');

  if(winner !== null) {
    canvasContext.fillStyle = 'white';

    canvasContext.fillText(winner.name + " won! Congratulations", 350, 200);

    canvasContext.fillText("click to continue", 360, 500);
    return;
  } 

  drawTracks();

  // car
  player1.draw();
  player2.draw();

  document.getElementById("player1LapLabel").innerHTML = player1.lap + " / " + TOTAL_LAPS;
  document.getElementById("player2LapLabel").innerHTML = player2.lap + " / " + TOTAL_LAPS;
  // canvasContext.fillStyle = 'white';
  // canvasContext.fillText("Score: " + playerScore, canvas.width - 100, 10)
}