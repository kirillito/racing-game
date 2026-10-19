// ---------------------------------------------------------------------------
// Asset manifest - the ONE place to change file paths for graphics and audio.
//
// To swap an asset, drop your new file into the images/ or audio/ folder and
// change the file name below. Nothing else in the code needs to be touched.
// ---------------------------------------------------------------------------

const IMAGE_DIR = "images/";
const AUDIO_DIR = "audio/";

// Car sprites (one per player).
const CAR_IMAGES = {
  player1: "car1.png",
  player2: "car2.png"
};

// Track tile sprites, keyed by TRACK_CODE_* constants (see track.js).
const TRACK_TILE_IMAGES = {
  [TRACK_CODE_WALL]:     "wall.png",
  [TRACK_CODE_ROAD]:     "road.png",
  [TRACK_CODE_FINISH]:   "finish.png",
  [TRACK_CODE_MOUNTAIN]: "mountain.png",
  [TRACK_CODE_TREES]:    "trees.png",
  [TRACK_CODE_LAKE]:     "lake.png",
  [TRACK_CODE_FLAG]:     "flag.png",
  [TRACK_CODE_GRASS]:    "grass.png",
  [TRACK_CODE_OIL]:      "oil.png"
};

// Sound effects, keyed by the name used in playSound("name").
//   file:     file inside AUDIO_DIR (set to null to use only the fallback beep)
//   volume:   0..1
//   fallback: synthesized beep used while the file is missing, so the game
//             is audible even before you add real sound files.
const SOUND_ASSETS = {
  countdown: { file: "countdown.wav", volume: 0.6, fallback: { freq: 440, duration: 0.15, type: "square" } },
  go:        { file: "go.wav",        volume: 0.6, fallback: { freq: 880, duration: 0.40, type: "square" } },
  lap:       { file: "lap.wav",       volume: 0.6, fallback: { freq: 660, duration: 0.25, type: "triangle" } },
  bump:      { file: "bump.wav",      volume: 0.5, fallback: { freq: 120, duration: 0.10, type: "sawtooth" } },
  win:       { file: "win.wav",       volume: 0.7, fallback: { freq: 988, duration: 0.60, type: "triangle" } }
};
