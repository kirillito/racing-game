// Common graphics functions

function drawRectangle(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}

function drawCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
  canvasContext.fill();
}

function drawImageCenteredAtLocationWithRotation(graphic, x, y, angle) {
  canvasContext.save();
  canvasContext.translate(x,y);
  canvasContext.rotate(angle);	//	sets	the	rotation
  if (graphic && graphic.complete && graphic.naturalWidth > 0) {
    canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2);
  } else {
    // Placeholder for a missing/unloaded image so a bad path is easy to spot.
    canvasContext.fillStyle = 'magenta';
    canvasContext.fillRect(-10, -6, 20, 12);
  }
  canvasContext.restore();
}

// Draws horizontally centered text on the canvas.
function drawCenteredText(text, y, fontSize, color) {
  canvasContext.font = "bold " + fontSize + "px sans-serif";
  canvasContext.textAlign = "center";
  canvasContext.fillStyle = color;
  canvasContext.fillText(text, canvas.width/2, y);
  canvasContext.textAlign = "left";
}