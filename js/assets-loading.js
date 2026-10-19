// Image loading. All file names come from assets-config.js.

let carPic1 = new Image();
let carPic2 = new Image();
let trackPics = [];

let imagesToLoad = 0;

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = new Image();
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
  let imageList = [
    {imgNode: carPic1, fileName: CAR_IMAGES.player1},
    {imgNode: carPic2, fileName: CAR_IMAGES.player2}
  ];

  for (let trackCode in TRACK_TILE_IMAGES) {
    imageList.push({trackCode: Number(trackCode), fileName: TRACK_TILE_IMAGES[trackCode]});
  }

  imagesToLoad = imageList.length;

  for (let img of imageList) {
    if (img.trackCode !== undefined) {
      loadImageForTrackCode(img.trackCode, img.fileName);
    } else {
      beginLoadingImage(img.imgNode, img.fileName);
    }
  }
}

function beginLoadingImage(imgNode, fileName) {
  // A missing file still counts as "done" so the game never hangs on loading;
  // drawImageCenteredAtLocationWithRotation draws a placeholder box instead.
  imgNode.onload = setAssetAsLoadedAndLaunchIfReady;
  imgNode.onerror = setAssetAsLoadedAndLaunchIfReady;
  imgNode.src = IMAGE_DIR + fileName;
}

function setAssetAsLoadedAndLaunchIfReady() {
  imagesToLoad--;
  launchIfReady();
}
