// Sound manager. Sound definitions live in assets-config.js (SOUND_ASSETS).
//
// playSound("name") plays the file if it loaded, otherwise a short synthesized
// beep, so audio never breaks the game when a file is missing or blocked.

let soundEnabled = true;
let sounds = {};
let audioContext = null;

function loadSounds() {
  for (let name in SOUND_ASSETS) {
    let def = SOUND_ASSETS[name];
    let entry = {def: def, audio: null, failed: !def.file};

    if (def.file) {
      let audio = new Audio(AUDIO_DIR + def.file);
      audio.volume = def.volume !== undefined ? def.volume : 1;
      audio.addEventListener('error', function() { entry.failed = true; });
      entry.audio = audio;
    }
    sounds[name] = entry;
  }
}

function playSound(name) {
  let entry = sounds[name];
  if (!soundEnabled || !entry) {
    return;
  }

  if (entry.audio && !entry.failed) {
    // Clone so overlapping plays of the same sound don't cut each other off.
    let instance = entry.audio.cloneNode();
    instance.volume = entry.audio.volume;
    instance.play().catch(function() { playFallbackBeep(entry.def.fallback, entry.audio.volume); });
  } else {
    playFallbackBeep(entry.def.fallback, entry.def.volume);
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
}

function playFallbackBeep(beep, volume) {
  if (!beep) {
    return;
  }

  try {
    if (audioContext === null) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    let osc = audioContext.createOscillator();
    let gain = audioContext.createGain();
    osc.type = beep.type || 'square';
    osc.frequency.value = beep.freq;
    gain.gain.value = 0.15 * (volume !== undefined ? volume : 1);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + beep.duration);
  } catch (e) {
    // No audio available (or blocked by the browser) - stay silent.
  }
}
