let canvas;
let canvasContext;

const FPS = 30;

let playerScore = 0;
let player1 = new car();
let player2 = new car();

let showingLoseScreen = false;
let showingWinScreen = false;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  this.initInput();
  this.loadImages(); 
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

  player1.carInit();
  player2.carInit();
}

function animate() {
  if(showingLoseScreen) {
    return;
  }

  player1.animateCar();
  player2.animateCar();
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');

  if(showingLoseScreen) {
    canvasContext.fillStyle = 'white';

    canvasContext.fillText("You're score: " + playerScore, 350, 200);

    canvasContext.fillText("click to continue", 350, 500);
    return;
  } else if(showingWinScreen) {
    canvasContext.fillStyle = 'white';

    canvasContext.fillText("You Win! You're score: " + playerScore, 350, 200);

    canvasContext.fillText("click to continue", 350, 500);
    return;
  }

  drawTracks();

  // car
  player1.drawCar();
  player2.drawCar();

  // canvasContext.fillStyle = 'white';
  // canvasContext.fillText("Score: " + playerScore, canvas.width - 100, 10)
}