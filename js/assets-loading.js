let carPic1 = new Image();
let carPic2 = new Image();
let trackPics = [];

let imagesToLoad = 0;

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = new Image();
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
  let	imageList	=	[
    {imgNode:carPic1,	fileName:"car1.png"},
    {imgNode:carPic2,	fileName:"car2.png"},
    
		{trackCode:TRACK_CODE_WALL,	fileName:"wall.png"},
		{trackCode:TRACK_CODE_ROAD,	fileName:"road.png"},
		{trackCode:TRACK_CODE_FINISH,	fileName:"finish.png"},
		{trackCode:TRACK_CODE_MOUNTAIN,	fileName:"mountain.png"},
		{trackCode:TRACK_CODE_TREES,	fileName:"trees.png"},
		{trackCode:TRACK_CODE_LAKE,	fileName:"lake.png"},
    {trackCode:TRACK_CODE_FLAG,	fileName:"flag.png"},
    {trackCode:TRACK_CODE_GRASS,	fileName:"grass.png"},
    {trackCode:TRACK_CODE_OIL,	fileName:"oil.png"}
    ];
    
  imagesToLoad = imageList.length;

  for (img of imageList) {
    if (img.trackCode !== undefined) {
      loadImageForTrackCode(img.trackCode, img.fileName);
    } else {
      beginLoadingImage(img.imgNode,img.fileName);
    }    
  }
}

function beginLoadingImage(imgNode, fileName) {
  imgNode.src = "images/" + fileName;
  imgNode.onload = setAssetAsLoadedAndLaunchIfReady();
}

function setAssetAsLoadedAndLaunchIfReady() {
  imagesToLoad--;
  this.launchIfReady();
}