

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 1;
const TRACK_COLS = 26;
const TRACK_ROWS = 18;
const	TRACK_CODE_ROAD = 0;
const	TRACK_CODE_WALL = 1;
const	TRACK_CODE_PLAYER = 2;
const	TRACK_CODE_FINISH = 3;
const	TRACK_CODE_MOUNTAIN = 4;
const	TRACK_CODE_TREES = 5;
const	TRACK_CODE_LAKE = 6;
const	TRACK_CODE_FLAG = 7;

var trackGrid = 
[	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,  1,  1, 	1,	1,  1,  1, 	1,	1,	4,
  1,	2,	0,	0,	0,	0,	0,	0,	5,	5,	5,	0,	0,	0,	0,	0,	0,  0,	5,  5,	5,  0,	0,  0,	1,	1,
  1,	2,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,  0,	0,  5,	0,  0,	0,  0,	0,	1,
  1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	5,	5,	5,	0,  0,	0,  0,	0,  0,	0,  0,	0,	1,
  1,	0,	0,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	5,	1,	1,  1,	0,  0,	0,  1,	1,  0,	0,	1,
  1,	0,	0,	1,	5,	1,	1,	1,	1,	1,	1,	1,	1,	1,	5,	6,	6,  1,	1,  1,	1,  1,	1,  0,	0,	1,
  1,	3,	3,	1,	1,	1,	0,	0,	1,	1,	1,	0,	0,	5,	6,	6,	6,  6,	6,  6,	6,  1,	0,  0,	0,	1,
  1,	0,	0,	1,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	5,	1,	1,  1,	1,  1,	1,  1,	0,  0,	0,	1,
  1,	0,	0,	1,	0,	0,	0,	0,	0,	5,	0,	0,	0,	0,	0,	0,	0,  0,	0,  5,	1,  0,	0,  0,	7,	1,
  1,	0,	0,  7,	0,	0,	0,	0,	0,	5,	0,	0,	0,	0,	0,	0,	0,  0,	0,  0,	1,  0,	0,  0,	1,	1,
  1,	0,	0,	0,	0,	0,	7,	0,	0,	5,	0,	0,	7,	0,	5,	5,	5,  7,	0,  0,	1,  1,	0,  0,	1,	1,
  1,	1,	0,	0,	0,	0,	1,	0,	0,	5,	0,	0,	5,	5,	5,	5,	0,  0,	0,	0,	0,  1,	0,  0,	5,	1,
  6,	1,	1,	0,	0,	1,	1,	0,	0,	5,	0,	0,	0,	1,	5,	0,	0,  0,	0,	0,	0,  1,	0,  0,	5,	1,
  6,	6,	1,	5,	5,	1,	5,	0,	0,	5,	7,	0,	0,	1,	0,	0,	0,  7,	5,  5,	5,  1,	0,  0,	5,	1,
  6,	6,	1,	5,	5,	1,	5,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,  0,	0,  0,	0,  7,	0,  0,	5,	1,
  6,	6,	1,	1,	1,	1,	5,	5,	0,	0,	0,	0,	5,	1,	0,	0,	0,  0,	0,  0,	0,  0,	0,  0,	1,	1,
  6,	6,	1,	1,	1,	1,	5,	5,	5,	5,	5,	5,	5,	1,	1,	1,	0,  0,	0,  7,	0,  0,	0,  0,	1,	1,
  6,	6,	6,	6,	6,	6,	6,	5,	5,	5,	5,	5,	5,	5,	1,	1,	1,  1,	1,  1,	1,  1,	1,  1,	1,	4];

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
    var trackIndex = 0;
    var trackX;
    var trackY = 0.5*TRACK_H;
    var trackType;
    
    for (var i=0;	i<TRACK_ROWS;	i++) {
      trackX = 0.5*TRACK_W;
      for (var j=0;	j<TRACK_COLS;	j++) {
        trackType = trackGrid[trackIndex];
        drawImageCenteredAtLocationWithRotation(trackPics[trackType], trackX,	trackY);

        trackIndex++;
        
        trackX += TRACK_W;
      }
      trackY += TRACK_H;
    }
  }