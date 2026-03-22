/**
 * VividAR — app.js
 *
 * Handles AR marker events and video playback control.
 * Designed to be minimal and readable (MVP scope).
 */

(function () {
  'use strict';

  // ------------------------------------------------------------------
  // Camera availability check
  // ------------------------------------------------------------------
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    var msg = document.getElementById('no-camera-msg');
    if (msg) {
      msg.style.display = 'flex';
    }
    console.warn('[VividAR] Camera API not available in this browser.');
    return;
  }

  // ------------------------------------------------------------------
  // Wait for A-Frame scene to be fully loaded before attaching events
  // ------------------------------------------------------------------
  var scene = document.querySelector('a-scene');

  scene.addEventListener('loaded', function () {
    var marker = document.getElementById('ar-marker');
    var videoEl = document.getElementById('ar-video');

    if (!marker) {
      console.error('[VividAR] Marker element not found.');
      return;
    }

    if (!videoEl) {
      console.error('[VividAR] Video element not found.');
      return;
    }

    // ----------------------------------------------------------------
    // markerFound — triggered when the camera sees the marker
    // ----------------------------------------------------------------
    marker.addEventListener('markerFound', function () {
      console.log('[VividAR] Marker detected — playing video.');

      // Attempt to play (browser autoplay policies may require user gesture)
      var playPromise = videoEl.play();

      if (playPromise !== undefined) {
        playPromise.catch(function (err) {
          console.warn('[VividAR] Video autoplay was prevented:', err.message);
        });
      }
    });

    // ----------------------------------------------------------------
    // markerLost — triggered when the marker leaves the camera frame
    // ----------------------------------------------------------------
    marker.addEventListener('markerLost', function () {
      console.log('[VividAR] Marker lost — pausing video.');
      videoEl.pause();
    });

    console.log('[VividAR] App initialised. Point your camera at the marker.');
  });

}());
