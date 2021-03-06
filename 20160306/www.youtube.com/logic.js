
var creative = {};

/**
 * Window onload handler.
 */
function preInit() {
  setupDom();

  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener(
      studio.events.StudioEvent.INIT,
      init
    );
  }
}

/**
 * Initializes the ad components
 */
function setupDom() {
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
  creative.dom.exit = document.getElementById('exit');
  creative.dom.video0 = {};
  creative.dom.video0.vidContainer = document.getElementById('video-container-0');
  creative.dom.video0.vid          = document.getElementById('video-0');
  creative.dom.video0.vidPlayBtn   = document.getElementById('play-btn-0');
  creative.dom.video0.vidPauseBtn  = document.getElementById('pause-btn-0');
  creative.dom.video0.vidStopBtn   = document.getElementById('stop-btn-0');
  creative.dom.video0.vidReplayBtn = document.getElementById('replay-btn-0');
  creative.dom.video0.vidUnmuteBtn = document.getElementById('unmute-btn-0');
  creative.dom.video0.vidMuteBtn   = document.getElementById('mute-btn-0');
  creative.dom.video0.vidProgressBar   = document.getElementById('progress-bar-0');
}

/**
 * Ad initialisation.
 */
function init() {
  // You can update the autoplay flag to 'true' to enable muted
  // autoplay although it won't work on iOS.
  creative.autoplay0 = true;
  creative.isClick0 = false;

  // Hide mute / unmute on iOS.
  if ((navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/iPod/i))) {
    creative.dom.video0.vidUnmuteBtn.style.opacity = 0;
    creative.dom.video0.vidMuteBtn.style.opacity = 0;
  }

  addVideoTracking0();

  addListeners();

  // Polite loading
  if (Enabler.isVisible()) {
    show();
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, show);
  }
}

/**
 * Adds appropriate listeners at initialization time
 */
function addListeners() {
  creative.dom.exit.addEventListener('click', exitClickHandler);
  creative.dom.video0.vidPlayBtn.addEventListener('click', pausePlayHandler0, false);
  creative.dom.video0.vidPauseBtn.addEventListener('click', pausePlayHandler0, false);
  creative.dom.video0.vidMuteBtn.addEventListener('click', muteUnmuteHandler0, false);
  creative.dom.video0.vidUnmuteBtn.addEventListener('click', muteUnmuteHandler0, false);
  creative.dom.video0.vidReplayBtn.addEventListener('click', replayHandler0, false);
  creative.dom.video0.vidStopBtn.addEventListener('click', stopHandler0, false);
  creative.dom.video0.vid.addEventListener('ended', videoEndHandler0, false);
  creative.dom.video0.vid.addEventListener('timeupdate', videoTimeUpdateHandler0, false);
}

/**
 *  Shows the ad.
 */
function show() {
  creative.dom.exit.style.display = "block";
  creative.dom.video0.vidMuteBtn.style.visibility    = 'hidden';
  creative.dom.video0.vidUnmuteBtn.style.visibility  = 'visible';
  creative.dom.video0.vidPauseBtn.style.visibility   = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility    = 'visible';
  if (creative.autoplay0) {
    if (creative.dom.video0.vid.readyState >= 2) {
      startMuted0(null);
    }
    else {
      creative.dom.video0.hasCanPlay = true;
      creative.dom.video0.vid.addEventListener('canplay', startMuted0, false);
    }
    // HACK: Safari experiences video rendering issues, fixed by forcing a viewport refresh
    creative.dom.video0.vidMuteBtn.style.visibility = 'visible';
      setTimeout(function() {
        creative.dom.video0.vidMuteBtn.style.visibility = 'hidden';
      }, 200);
  }
  else {
    creative.dom.video0.vidMuteBtn.style.visibility    = 'visible';
    creative.dom.video0.vidUnmuteBtn.style.visibility  = 'hidden';
    creative.dom.video0.vidPauseBtn.style.visibility   = 'hidden';
    creative.dom.video0.vidPlayBtn.style.visibility    = 'visible';
  }
  creative.dom.video0.vidContainer.style.visibility  = 'visible';
}

// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------

function exitClickHandler() {
  // Reset video
  creative.dom.video0.vid.pause();
  if (creative.dom.video0.vid.readyState > 0) {
    creative.dom.video0.vid.currentTime = 0;
  }
  creative.dom.video0.vidPauseBtn.style.visibility = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility  = 'visible';
  Enabler.exit('BackgroundExit');
}
/**
 * Triggered once the video player is ready to play the video on expansion.
 */
function startMuted0(e) {
  // Leaving the listener can cause issues on Chrome / Firefox
  if (creative.dom.video0.hasCanPlay) {
    creative.dom.video0.vid.removeEventListener('canplay', startMuted0);
    creative.dom.video0.hasCanPlay = false;
  }
  // If paused then play
  creative.dom.video0.vid.volume       = 0; // Muted by default
  creative.dom.video0.vid.currentTime  = 0;
  creative.dom.video0.vid.play();
  creative.dom.video0.vidPauseBtn.style.visibility = 'visible';
  creative.dom.video0.vidPlayBtn.style.visibility  = 'hidden';
}

/**
 * Play pause toggle.
 */
function pausePlayHandler0(e) {
  // Under IE10, a video is not 'paused' after it ends.
  if (creative.dom.video0.vid.paused || creative.dom.video0.vid.ended) {
    if (creative.isClick0) {
      creative.dom.video0.vid.volume = 1.0;
      creative.dom.video0.vidMuteBtn.style.visibility    = 'visible';
      creative.dom.video0.vidUnmuteBtn.style.visibility  = 'hidden';
      creative.isClick0 = false;
    }
    // If paused then play
    creative.dom.video0.vid.play();
    creative.dom.video0.vidPauseBtn.style.visibility = 'visible';
    creative.dom.video0.vidPlayBtn.style.visibility  = 'hidden';
  }
  else {
    creative.dom.video0.vid.pause();
    creative.dom.video0.vidPauseBtn.style.visibility = 'hidden';
    creative.dom.video0.vidPlayBtn.style.visibility  = 'visible';
  }
}

/**
 * Mutes or unmute the video player.
 */
function muteUnmuteHandler0(e) {
  if (creative.dom.video0.vid.volume == 0.0) {
    Enabler.counter("Unmute video 0", true);
    creative.dom.video0.vid.volume = 1.0;
    creative.dom.video0.vidMuteBtn.style.visibility   = 'visible';
    creative.dom.video0.vidUnmuteBtn.style.visibility = 'hidden';
  } else {
    Enabler.counter("Mute video 0", true);
    creative.dom.video0.vid.volume = 0.0;
    creative.dom.video0.vidMuteBtn.style.visibility   = 'hidden';
    creative.dom.video0.vidUnmuteBtn.style.visibility = 'visible';
  }
}

/**
 * Stops the video.
 */
function stopHandler0(e) {
  Enabler.counter("Video 0 stopped", true);
  creative.dom.video0.vid.currentTime = 0;
  creative.dom.video0.vid.pause();
  creative.dom.video0.vidPauseBtn.style.visibility = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility  = 'visible';
  creative.isClick0 = true;
}

/**
 * Relaunches the video from the beginning.
 */
function replayHandler0(e) {
  Enabler.counter("Replay video 0", true);
  creative.dom.video0.vid.currentTime = 0;
  creative.dom.video0.vid.play();
  creative.dom.video0.vid.volume = 1.0;
  creative.dom.video0.vidPauseBtn.style.visibility = 'visible';
  creative.dom.video0.vidMuteBtn.style.visibility  = 'visible';
}

/**
 * Handler triggered when the video has finished playing.
 */
function videoEndHandler0(e) {
  creative.dom.video0.vid.currentTime = 0;
  creative.dom.video0.vid.pause();
  creative.dom.video0.vidPauseBtn.style.visibility = 'hidden';
  creative.dom.video0.vidPlayBtn.style.visibility  = 'visible';
  creative.isClick0 = true;
}

/**
 * Handler triggered when the video has timeUpdates.
 */
function videoTimeUpdateHandler0(e) {
 var perc = creative.dom.video0.vid.currentTime / creative.dom.video0.vid.duration;
 creative.dom.video0.vidProgressBar.style.width = Math.round(100*perc) + '%';
}

/**
 * Add video metrics to the HTML5 video elements by loading in video module, and assigning to videos.
 */
function addVideoTracking0() {
  // Add in the video files.
  // These are 3 different codecs due to different browser specifications ; we recommend you have all 3 filetypes.
  var srcNode = document.createElement('source');

  srcNode.setAttribute('type', 'video/mp4');
  srcNode.setAttribute('src', Enabler.getUrl('video.mp4'));
  creative.dom.video0.vid.appendChild(srcNode);

  creative.dom.video0.vid.appendChild(srcNode);

  Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
    studio.video.Reporter.attach('Video Report 0', creative.dom.video0.vid);
  }.bind(this));
}

/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);