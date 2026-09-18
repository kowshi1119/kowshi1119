#!/usr/bin/env python3
"""Build dependency-free, script-free SVG artwork for the GitHub profile."""
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
FONT = 'Segoe UI, Inter, Arial, sans-serif'


def text(x, y, value, size=20, color='#a7b8cb', weight=400, extra=''):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" {extra}>{escape(value)}</text>'


def svg(body, width, height, title, desc):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
<title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>
<defs>
<linearGradient id="bg" x2="1" y2="1"><stop stop-color="#0b1220"/><stop offset="1" stop-color="#112c38"/></linearGradient>
<linearGradient id="top" x2="1" y2="1"><stop stop-color="#83f4d2"/><stop offset="1" stop-color="#258c85"/></linearGradient>
<linearGradient id="glass" x2="1" y2="1"><stop stop-color="#203f51"/><stop offset="1" stop-color="#122332"/></linearGradient>
<linearGradient id="gold" x2="1" y2="1"><stop stop-color="#f3d69c"/><stop offset="1" stop-color="#a77b3d"/></linearGradient>
<radialGradient id="glow"><stop stop-color="#4ccbaa" stop-opacity=".15"/><stop offset="1" stop-color="#4ccbaa" stop-opacity="0"/></radialGradient>
<filter id="shadow" x="-50%" y="-50%" width="200%" height="220%"><feDropShadow dx="0" dy="18" stdDeviation="15" flood-color="#000814" flood-opacity=".65"/></filter>
</defs>
<style>
text{{font-family:{FONT}}}
.float{{animation:float 7s ease-in-out infinite}}.float-slow{{animation:float 9s ease-in-out -3s infinite}}
.pulse{{animation:pulse 5s ease-in-out infinite}}.trace{{stroke-dasharray:12 220;animation:trace 10s linear infinite}}
@keyframes float{{0%,100%{{transform:translateY(0)}}50%{{transform:translateY(-10px)}}}}
@keyframes pulse{{0%,100%{{opacity:.4}}50%{{opacity:1}}}}
@keyframes trace{{to{{stroke-dashoffset:-464}}}}
@media(prefers-reduced-motion:reduce){{.float,.float-slow,.pulse,.trace{{animation:none!important}}}}
</style>
<rect x=".5" y=".5" width="{width-1}" height="{height-1}" rx="24" fill="url(#bg)" stroke="#263c4e"/>
{body}</svg>\n'''


def slab(x, y, w=145, h=62, depth=20, top='url(#glass)', edge='#38606b'):
    return f'''<g transform="translate({x} {y})"><path d="M{-w} 0L0 {h}L{w} 0V{depth}L0 {h+depth}L{-w} {depth}Z" fill="#102936" stroke="{edge}"/>
<path d="M0 {h}V{h+depth}L{w} {depth}V0Z" fill="#163d48"/>
<path d="M{-w} 0L0 {-h}L{w} 0L0 {h}Z" fill="{top}" stroke="{edge}"/>
<path d="M{-w+12} 0L0 {h-6}L{w-12} 0" fill="none" stroke="#96f6dd" opacity=".3"/></g>'''


def cube(x, y, size=50):
    return f'''<g transform="translate({x} {y})"><path d="M0 {-size}L{size} {-size/2}V{size/2}L0 {size}L{-size} {size/2}V{-size/2}Z" fill="#166267" stroke="#78e4c8"/>
<path d="M0 0L{size} {-size/2}V{size/2}L0 {size}Z" fill="#194751"/>
<path d="M0 {-size}L{size} {-size/2}L0 0L{-size} {-size/2}Z" fill="url(#top)"/>
<path d="M0 0V{size}M{-size} {-size/2}L0 0L{size} {-size/2}" fill="none" stroke="#97f8dc" opacity=".65"/></g>'''


def sculpture(x, y, scale=1):
    return f'''<g transform="translate({x} {y}) scale({scale})">
<circle r="235" fill="url(#glow)"/><ellipse cy="123" rx="187" ry="42" fill="#07131f" opacity=".7"/>
<g fill="none" stroke="#36525f"><ellipse cy="60" rx="219" ry="92"/><ellipse cy="60" rx="245" ry="109" stroke-dasharray="2 12" opacity=".6"/></g>
{slab(0,100,155,66,20)}
<g class="float-slow">{slab(0,48,145,62,16)}{slab(0,0,135,58,14,'url(#top)','#79d8c4')}</g>
<g class="float" filter="url(#shadow)">{cube(0,-92,57)}</g>
<path d="M-202 35L-145 60L0 121L145 60L204 35" fill="none" stroke="#71e7c5" class="trace" stroke-width="2"/>
<circle cx="-202" cy="35" r="5" fill="#e5c78d" class="pulse"/>
<circle cx="204" cy="35" r="4" fill="#79ecca"/>
<g class="float-slow">{cube(167,-92,15)}</g>
</g>'''


def build():
    ASSETS.mkdir(exist_ok=True)
    hero = text(52,55,'K / M',20,'#78e4c8',600, 'letter-spacing="4"') + text(148,55,'SOFTWARE ENGINEERING',14,'#a7b8cb',500,'letter-spacing="3"')
    hero += text(52,151,'Kowshikan',70,'#f1f5f9',650,'letter-spacing="-3"') + text(52,232,'Mathivarnan.',70,'#f1f5f9',650,'letter-spacing="-3"')
    hero += text(55,287,'Thoughtful engineering.',27,'#dbe5ed') + text(55,324,'Practical software.',27,'#7ee6c7')
    hero += sculpture(937,224,.92)
    hero += '<path d="M52 399H1148" stroke="#2c4352"/>'
    hero += text(54,446,'APPLIED AI  /  ANDROID  /  WEB',17,'#c2d1dd',500,'letter-spacing="2"') + text(1148,446,'JAFFNA, SRI LANKA',14,'#d7bd8d',500,'text-anchor="end" letter-spacing="2"')
    (ASSETS/'profile-hero.svg').write_text(svg(hero,1200,490,'Kowshikan Mathivarnan — Software engineering','Layered 3D architecture with gently floating geometry. Applied AI, Android and web development.'))
    mobile = text(32,45,'K / M',18,'#78e4c8',600,'letter-spacing="4"') + text(32,107,'Kowshikan',48,'#f1f5f9',650,'letter-spacing="-2"') + text(32,163,'Mathivarnan.',48,'#f1f5f9',650,'letter-spacing="-2"')
    mobile += text(33,205,'Thoughtful engineering. Practical software.',18,'#bccbd7') + sculpture(270,354,.76)
    mobile += '<path d="M32 502H508" stroke="#2c4352"/>' + text(32,540,'APPLIED AI  /  ANDROID  /  WEB',17,'#7ee6c7',500) + text(32,572,'Jaffna, Sri Lanka',16,'#d7bd8d')
    (ASSETS/'profile-hero-mobile.svg').write_text(svg(mobile,540,605,'Kowshikan Mathivarnan — Software engineering','Applied AI, Android and web. A gently floating 3D sculpture.'))
    cards = [
        ('autoqa','01','AutoQA','Explore. Validate. Reproduce.','AGENT SYSTEMS / QUALITY ENGINEERING','#7ee6c7'),
        ('medvision','02','MedVision','Voice and vision, in real time.','MULTIMODAL AI / LIVE INTERACTION','#bcaaf6'),
        ('cse','03','CSE Stock Insight','Financial data. Native experience.','ANDROID / DATA VISUALISATION','#e7c991')
    ]
    for kind,num,title,subtitle,label,accent in cards:
        body = text(40,49,num,15,accent,600,'letter-spacing="2"') + text(80,49,label,13,'#a7b8cb',500,'letter-spacing="2"')
        body += text(40,135,title,49,'#f1f5f9',650,'letter-spacing="-1.5"') + text(43,181,subtitle,23,'#b7c8d6')
        body += '<path d="M43 225H94" stroke="'+accent+'" stroke-width="2"/>' + text(43,266,'VIEW PROJECT  →',14,accent,500,'letter-spacing="2"')
        art = '<ellipse cx="920" cy="266" rx="180" ry="24" fill="#07121d"/>'
        if kind == 'autoqa':
            art += slab(920,214,164,55,15)
            for x,y,index in [(803,156,1),(920,110,2),(1037,156,3)]:
                art += f'<g class="float{ "-slow" if index%2 else ""}">{cube(x,y,38)}</g>'
            art += '<path d="M803 195L920 150L1037 195" fill="none" stroke="#79ecca" stroke-width="2" class="trace"/>'
            art += text(920,278,'EXPLORE  /  VERIFY  /  REPORT',11,'#9bbdc9',500,'text-anchor="middle" letter-spacing="2"')
        elif kind == 'medvision':
            art += slab(920,215,155,51,16)
            art += '<g class="float"><rect x="815" y="80" width="210" height="139" rx="15" fill="url(#glass)" stroke="#7b779d"/><rect x="830" y="95" width="180" height="107" rx="8" fill="#0b1927"/>'
            for i,h in enumerate([12,24,42,29,62,82,54,30,47,72,38,22,12]):
                art += f'<rect x="{843+i*12}" y="{150-h/2}" width="5" height="{h}" rx="2.5" fill="{accent}" opacity="{.45+i%3*.2}" class="pulse" style="animation-delay:-{i*.3}s"/>'
            art += '</g>'
            art += '<circle cx="1064" cy="101" r="30" fill="#203342" stroke="#bcaaf6"/><circle cx="1064" cy="101" r="12" fill="none" stroke="#dfd4ff"/><circle cx="1064" cy="101" r="5" fill="#bcaaf6"/>'
        else:
            art += slab(932,221,164,52,16)
            art += '<g class="float" transform="translate(0 0)"><path d="M831 53L986 73L986 235L831 215Z" fill="#253d4c" stroke="#81979c"/><path d="M838 49L993 69L993 231L838 211Z" fill="#0b1b29" stroke="#e7c991"/><path d="M852 172L880 156L908 162L936 129L978 109" fill="none" stroke="#7ee6c7" stroke-width="3"/>'
            for i,h in enumerate([25,41,32,63,80]):
                art += f'<path d="M{853+i*25} {197+i*3}V{197+i*3-h}" stroke="#dbbd87" stroke-width="12" opacity=".7"/>'
            art += text(852,94,'CSE',16,'#e7c991',600) + '</g>'
            art += cube(1060,177,24)
        body += art
        (ASSETS/f'project-{kind}.svg').write_text(svg(body,1200,310,title+' — project illustration',subtitle+' Concept artwork, not an application screenshot.'))

if __name__ == '__main__':
    build()
