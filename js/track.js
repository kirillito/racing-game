

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 1;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const	TRACK_CODE_ROAD = 0;
const	TRACK_CODE_WALL = 1;
const	TRACK_CODE_PLAYER = 2;
var trackGrid = 
[	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
  1,	2,	0,	0,	0,	0,	0,	0,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	1,	1,
  1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
  1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	0,	0,	0,	1,
  1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	1,	1,	1,	0,	0,	1,
  1,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	1,
  1,	0,	0,	1,	1,	1,	0,	0,	1,	1,	1,	0,	0,	0,	0,	1,	1,	0,	0,	1,
  1,	0,	0,	1,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	0,	0,	1,
  1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	0,	0,	1,
  1,	0,	0,  0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,
  1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,	0,	0,	1,
  1,	1,	0,	0,	0,	0,	1,	1,	0,	0,	1,	1,	1,	0,	0,	0,	0,	0,	0,	1,
  1,	1,	1,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,
  1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,
  1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1];

  function isWallAtGridCoordinates(row, col) {
    var trackIndex = trackGridCoordinatesToIndex(row, col);
    return (trackGrid[trackIndex] == TRACK_CODE_WALL);
  }
  
  function trackGridCoordinatesToIndex(row, col) {
    return col + TRACK_COLS * row;
  }
  
  function checkForRoadAtPixelCoord(x, y) {
    var col = Math.floor(x/TRACK_W);
    var row = Math.floor(y/TRACK_H);
  
    // outside the track area - don't do anything
    if (col < 0 || col >= TRACK_COLS || row < 0 || row >= TRACK_ROWS) 
      return false;
  
    var trackIndex = trackGridCoordinatesToIndex(row, col);
    // return true if the track is the road
    return (trackGrid[trackIndex] === TRACK_CODE_ROAD);
  }

  function drawTracks()	{
    for (var i=0;	i<TRACK_ROWS;	i++) {
      for (var j=0;	j<TRACK_COLS;	j++) {
        var	trackX = (j + 0.5) * TRACK_W;
        var	trackY = (i + 0.5) * TRACK_H;

        if (!isWallAtGridCoordinates(i, j)){
          drawImageCenteredAtLocationWithRotation(roadPic, trackX,	trackY);
        } else {
          drawImageCenteredAtLocationWithRotation(wallPic, trackX,	trackY);
        }        
      }
    }
  }