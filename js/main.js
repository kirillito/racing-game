var canvas;
var canvasContext;

const FPS = 30;

var playerScore = 0;

var showingLoseScreen = false;
var showingWinScreen = false;

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

  carReset();
}

function animate() {
  if(showingLoseScreen) {
    return;
  }

  animateCar();
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
  drawCar(carX, carY);

  // canvasContext.fillStyle = 'white';
  // canvasContext.fillText("Score: " + playerScore, canvas.width - 100, 10)
}