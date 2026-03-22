# VividAR

**WebAR MVP that plays a video on marker detection.**

VividAR is a minimal browser-based augmented reality demo. It uses the device camera to detect a visual marker and plays a video directly on top of it in real time — no app installation required.

---

## Tech Stack

| Layer | Library |
|-------|---------|
| 3D / AR scene | [A-Frame 1.4](https://aframe.io) |
| Marker tracking | [AR.js](https://ar-js-org.github.io/AR.js-Docs/) |
| Rendering | Three.js (bundled with A-Frame) |
| Language | Vanilla HTML5 + JavaScript |

---

## Project Structure

```
vividar/
├── index.html          # Main AR page
├── assets/
│   ├── marker.patt     # Hiro marker pattern data (reference)
│   └── video.mp4       # ← Replace with your own video file
├── js/
│   └── app.js          # Marker found/lost event handling
├── styles/
│   └── style.css       # Full-screen reset
└── README.md           # This file
```

---

## How to Run

> **Camera requires HTTPS or localhost — it will not work with `file://`.**

### Option 1 — Node.js / npx (recommended)

```bash
cd vividar
npx serve .
# Open http://localhost:3000 in your browser
```

### Option 2 — Python

```bash
cd vividar
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

### Option 3 — VS Code Live Server

Install the **Live Server** extension, right-click `index.html`, and choose *Open with Live Server*.

---

## How to Test

1. **Add your video** — copy an `.mp4` file to `assets/video.mp4`.  
   *(Any short, looping clip works well for demos.)*

2. **Display the Hiro marker** — print it or open it on a second screen:  
   - Download: <https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png>

3. **Open the app** in your browser via the local server URL above.

4. **Allow camera access** when the browser prompts.

5. **Point the camera at the Hiro marker** — the video will appear anchored to the marker.

### Using a Custom Marker

1. Generate a `.patt` file at:  
   <https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html>
2. Save it as `assets/marker.patt`.
3. In `index.html`, replace:
   ```html
   <a-marker preset="hiro">
   ```
   with:
   ```html
   <a-marker type="pattern" url="assets/marker.patt">
   ```

---

## Features

- 📷 Camera access via browser (desktop + mobile)
- 🎯 Marker detection using the built-in Hiro pattern (or a custom `.patt`)
- 🎬 Video renders flat on top of the detected marker
- ▶️ Video autoplays, loops, and is muted (satisfies browser autoplay policies)
- ⏸️ Video pauses automatically when the marker is lost
- 📱 Mobile-friendly (`playsinline`, `webkit-playsinline`)

---

## Known Limitations

- Requires **HTTPS or localhost** — camera access is blocked on non-localhost HTTP connections.
- Performance depends on device hardware and camera quality.
- Marker tracking can be **unstable in low-light** conditions.
- Some browsers may block autoplay even when muted; a user interaction may be required.
- The included `assets/video.mp4` is a **placeholder** — replace it with a real video file before running.

---

## Console Debug Output

Open the browser developer tools to see real-time logs:

```
[VividAR] App initialised. Point your camera at the marker.
[VividAR] Marker detected — playing video.
[VividAR] Marker lost — pausing video.
```
