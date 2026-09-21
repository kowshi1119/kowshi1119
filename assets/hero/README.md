# AI / QA / Development hero

An original, deterministic 10-second engineering concept animation. The neural
core, editor, testing panels, bug scanner, browser, mobile device and delivery
nodes illustrate engineering activities. Status labels are part of the concept
animation, not live test results or claims of production performance.

## Outputs

- `ai-qa-dev-flow.gif`: desktop hero, 1600 × 600, 25 FPS, infinite loop.
- `ai-qa-dev-flow.png`: desktop still, captured at 8.7 seconds.
- `ai-qa-dev-flow-mobile.gif`: mobile composition, 800 × 820, 25 FPS.
- `ai-qa-dev-flow-mobile.png`: mobile still at 8.7 seconds.

The README embeds only exported image files. Its `picture` sources choose the
mobile composition below 600 CSS pixels and PNGs for reduced-motion preferences.
The still-image link provides a manual alternative. PNG selection is an
accessibility fallback, not a network-error fallback.

## Source and playback

Open `source/index.html` in a browser. Source playback follows requestAnimationFrame
(typically 60 FPS) and includes a pause/play control. It respects reduced motion
on initial load. The export API is `window.renderHero(seconds, mobile)`; every
frame is independent of elapsed wall-clock time. The source uses Canvas 2D with
projected isometric geometry and a 3D neural mesh. No external fonts, libraries,
logos, images, network calls, or raster reference images are used by the scene.

Source JavaScript executes only in the source preview and renderer, never in the
GitHub README. The existing SVG tech stack and contribution snake are preserved.

## Rebuild

Requirements: Node.js, Python with Pillow, FFmpeg with palette filters,
and Playwright Chromium. From `assets/hero/source`:

```sh
npm install
python -m pip install -r requirements.txt
npx playwright install chromium
npm run render -- --ffmpeg /path/to/ffmpeg --work-dir /path/to/temporary/hero-frames
```

On a machine where FFmpeg is in PATH, omit `--ffmpeg`. The temporary directory
stores the PNG frames, palettes and export report; it is outside the repository
by default. `--python /path/to/python` selects a Python interpreter.
`--reuse-frames` is available for re-encoding only when the source has not changed.
The renderer exports 250 frames per composition, generates a global
192-color palette and uses ordered dithering. `optimize_gif.py` then writes
transparent changed rectangles against the fixed global palette and compares
every decoded output frame with the original encoded frame. This step is lossless
relative to the palette-encoded GIF.
If needed, it retries at 1280px desktop / 720px mobile with 160 colors. It fails
rather than silently writing a GIF larger than 10 MiB.

## Timeline

| Time | Workflow |
| --- | --- |
| 0–1 s | Neural core illumination activates gently |
| 1–2.2 s | Code lines appear and data flows toward the core |
| 2.2–3.5 s | Build starts and completes; testing begins |
| 3.5–5.2 s | QA checks progress individually; browser navigation runs |
| 5–6.3 s | Defect scan and AI analysis |
| 6.3–7.3 s | Defect verification and report node |
| 7.3–8.5 s | Browser and mobile viewport scans complete |
| 8.5–9.5 s | Delivery nodes illuminate and deployment completes |
| 9.5–10 s | State fades to the starting state |

The name is fixed. Neural rotation is a small oscillation, not continuous
spinning. Geometry floats with a ten-second period; data pulses are confined to
connector paths. Loading indicators turn only while their CI step is running.
Tiny labels supplement the illustrations and are not essential to understanding
the scene. The mobile version rearranges the composition rather than shrinking
the desktop name to an unreadable size.

## Delivered files

Created:

- `assets/hero/ai-qa-dev-flow.gif`
- `assets/hero/ai-qa-dev-flow.png`
- `assets/hero/ai-qa-dev-flow-mobile.gif`
- `assets/hero/ai-qa-dev-flow-mobile.png`
- `assets/hero/README.md`
- `assets/hero/source/.gitignore`
- `assets/hero/source/index.html`
- `assets/hero/source/animation.css`
- `assets/hero/source/animation.js`
- `assets/hero/source/render.mjs`
- `assets/hero/source/optimize_gif.py`
- `assets/hero/source/package.json`
- `assets/hero/source/requirements.txt`

Modified:

- `README.md`: exported hero, mobile/reduced-motion sources, identity line and categories.
- `assets/README.md`: points to the current GIF source and keeps SVG maintenance guidance.
- `docs/PROFILE_DESIGN.md`: distinguishes the current hero from retained SVG alternatives.

## Verified delivery

- Desktop: 1600 × 600, 5,630,604 bytes (5.37 MiB).
- Mobile: 800 × 820, 4,552,593 bytes (4.34 MiB).
- Each GIF: 250 frames, 40 ms per frame, 10 seconds total, infinite loop.
- All 250 decoded frames match their pre-optimization palette-encoded counterparts.
- The name region is unchanged across every frame of each animation.
- The last-to-first mean frame difference is below the largest ordinary adjacent-frame difference.
- Layouts checked at 1440, 390 and 320 CSS pixels, in light and dark modes.
- Desktop/mobile PNG selection under reduced motion checked in a browser.
- All 17 local image references in README resolve; no script, iframe or canvas is embedded.
