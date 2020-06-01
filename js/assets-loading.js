var carPic = new Image();
var wallPic = new Image();
var roadPic = new Image();
var finishPic = new Image();
var mountainPic = new Image();
var treesPic = new Image();
var lakePic = new Image();
var flagPic = new Image();
var imagesToLoad = 0;



function loadImages() {
  var	imageList	=	[
		{imgNode:carPic,	fileName:"car1.png"},
		{imgNode:wallPic,	fileName:"wall.png"},
		{imgNode:roadPic,	fileName:"road.png"},
		{imgNode:finishPic,	fileName:"finish.png"},
		{imgNode:mountainPic,	fileName:"mountain.png"},
		{imgNode:treesPic,	fileName:"trees.png"},
		{imgNode:lakePic,	fileName:"lake.png"},
		{imgNode:flagPic,	fileName:"flag.png"}
    ];
    
  imagesToLoad = imageList.length;

  for (img of imageList) {
    beginLoadingImage(img.imgNode,img.fileName);
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