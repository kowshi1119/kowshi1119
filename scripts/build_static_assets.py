#!/usr/bin/env python3
"""Build explicit still-image alternatives for GitHub picture media sources."""
from pathlib import Path
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NAMES = ('profile-hero', 'profile-hero-mobile', 'project-autoqa', 'project-medvision', 'project-cse', 'tech-stack', 'contribution-snake')

def freeze(source):
    source = Path(source)
    svg = source.read_text(encoding='utf-8')
    ET.fromstring(svg)
    end = svg.rfind('</svg>')
    if end < 0:
        raise ValueError(f'Missing SVG closing element: {source}')
    # Explicit static files do not depend on media preference propagation into images.
    css = '<style>*{animation:none!important;transition:none!important}.s,.u{display:none!important}</style>'
    target = source.with_name(source.stem + '-static.svg')
    target.write_text(svg[:end] + css + svg[end:], encoding='utf-8')
    print(f'Static alternative: {target.name}')

if __name__ == '__main__':
    for source in (sys.argv[1:] or [ROOT / 'assets' / (name + '.svg') for name in NAMES]):
        freeze(source)
