# Profile artwork maintenance

## Current AI / QA hero

The README hero now uses exported GIFs and PNG fallbacks from `assets/hero/`.
See `assets/hero/README.md` for the editable source, timeline and export commands.
Only image files are embedded in the profile. The source HTML and JavaScript are
kept for local playback and deterministic rendering. The older SVG hero files
remain available as alternatives; the instructions below maintain those SVGs,
project artwork, the technology board and contribution snake.

This is a GitHub profile README, not a hosted website. The visual system uses script-free SVG images: midnight navy, mint highlights, champagne accents, isometric geometry and slow animation. Career details and project limitations remain readable Markdown; artwork is decorative and never used as evidence of project results.

## Regenerate illustrations

```sh
python3 scripts/build_profile_assets.py
```

The desktop and mobile hero use a README `picture` source breakpoint. Project cards share a 1200 × 310 viewBox. No fonts, JavaScript, image services or package installs are needed. SVG CSS supports `prefers-reduced-motion`; text remains visible with animation disabled.

## Contribution animation

`.github/workflows/snake.yml` runs daily, manually, and when its generator or workflow changes on main. The SHA-pinned Platane/snk action reads the repository owner's contribution calendar. `scripts/style_snake.py` projects that SVG onto an isometric surface, adds depth and recolors it. It preserves contribution cell positions, levels, snake motion and timing; it does not fabricate activity. The output branch already exists and its history is preserved with a normal push.

The README uses `output/contribution-snake.svg`. A checked-in snapshot is also available as `assets/contribution-snake.svg` (the `img` source for renderers without `picture` support; this is not a network-error fallback). GitHub's image cache can delay an updated image. Activity is not a measure of engineering quality.

```sh
python3 scripts/style_snake.py path/to/github-snake.svg assets/contribution-snake.svg
```

The source snapshot used for the initial rendering came from the existing output branch. The action regenerates it from actual activity. The stylesheet disables all snake animation and hides the moving snake/progress bar under reduced motion, retaining the contribution grid.

## GitHub rendering limits

Motion lives inside SVG images. README links remain standard accessible GitHub links; there is no page-level JavaScript, hover tilt, WebGL or scroll animation. Avoid adding unsupported inline styles or scripts to README HTML. All project illustrations are explicitly labeled as concepts, not screenshots.

## Technology board and reduced motion

`node scripts/build-tech-stack.mjs` rebuilds the animated technology board from
18 locally stored Devicon logos. Source attribution and the MIT license are in
`assets/README.md` and `assets/icons/LICENSE`. No network request or package
installation is needed to regenerate the board.

After regenerating artwork, run `python3 scripts/build_static_assets.py` to
refresh explicit static alternatives. The README selects them using picture
sources for reduced-motion preferences, with a separate mobile hero. This also
works in browsers that do not propagate reduced-motion preferences into SVG
images. SVG styles retain their own reduced-motion rules as a second layer.

The snake workflow also runs:

```sh
python3 scripts/build_static_assets.py dist/contribution-snake.svg
```

It publishes `output/contribution-snake-static.svg` with the animated version,
so both reflect the same contribution snapshot. The static snake hides the
moving snake and progress bar while retaining contribution cells.
