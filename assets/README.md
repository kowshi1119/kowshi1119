# Graphic sources

The active AI / QA hero is maintained in `hero/source/` and exported to GIF/PNG.
See `hero/README.md` for rebuilding it. The commands below maintain the retained
SVG alternatives and the other profile illustrations.

Regenerate the illustrated hero and project covers with:

```sh
python scripts/build_profile_assets.py
```

Regenerate the technology board, then refresh all still-image alternatives:

```sh
node scripts/build-tech-stack.mjs
python scripts/build_static_assets.py
```

The graphics use self-contained SVG CSS keyframes, without JavaScript or remote
fonts. README picture sources select explicit static SVGs when the visitor
prefers reduced motion. Each animated SVG also includes a reduced-motion rule.

Technology icons: Devicon, MIT license, copyright 2015 konpa.
Source: https://github.com/devicons/devicon
Pinned revision: 7330accdbc47e2dc0c19789a48533c4a3c50fe58
The original license is included in `assets/icons/LICENSE`.
Names and logos identify technologies; they do not imply endorsement.

Contribution graphics use actual GitHub contribution data from Platane/snk.
The existing `scripts/style_snake.py` adds the perspective frame. The daily
workflow publishes both animated and static versions on the output branch.
See `docs/PROFILE_DESIGN.md` for maintenance details.
