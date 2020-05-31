var carPic = new Image();
var wallPic = new Image();
var roadPic = new Image();
var imagesToLoad = 3;



function loadImages() {
  carPic.src="images/car1.png";
  wallPic.src="images/wall.png";
  roadPic.src="images/road.png";
  carPic.onload = setAssetAsLoadedAndLaunchIfReady();
  wallPic.onload = setAssetAsLoadedAndLaunchIfReady();
  roadPic.onload = setAssetAsLoadedAndLaunchIfReady();
}

function setAssetAsLoadedAndLaunchIfReady() {
  imagesToLoad--;
  this.launchIfReady();
}