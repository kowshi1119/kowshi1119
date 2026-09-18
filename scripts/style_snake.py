#!/usr/bin/env python3
"""Present Platane/snk's real contribution animation as an isometric SVG.

Only the presentation changes: cell coordinates, levels and animation keyframes
are preserved. No synthetic contribution data is generated.
"""
import argparse
from copy import deepcopy
from pathlib import Path
import xml.etree.ElementTree as ET

NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)


def tag(name):
    return f'{{{NS}}}{name}'


def stylize(source, destination):
    original = ET.parse(source).getroot()
    if original.tag != tag('svg'):
        raise ValueError('Expected an SVG document')
    cells = [e for e in original if e.tag == tag('rect') and 'c' in e.get('class', '').split()]
    styles = [e for e in original if e.tag == tag('style')]
    if not cells or not styles:
        raise ValueError('Expected a Platane/snk contribution grid and animation styles')
    # Fail clearly if upstream changes the expected layout rather than clipping data.
    if any(not 0 <= float(c.get('x', '0')) <= 860 or not 0 <= float(c.get('y', '0')) <= 112 for c in cells):
        raise ValueError('Unexpected contribution grid dimensions; update the projection')
    root = ET.Element(tag('svg'), {'width':'1200', 'height':'470', 'viewBox':'0 0 1200 470', 'role':'img', 'aria-labelledby':'title desc'})
    ET.SubElement(root, tag('title'), {'id':'title'}).text = 'Consistency, in motion — GitHub contribution snake'
    ET.SubElement(root, tag('desc'), {'id':'desc'}).text = 'A snake moves through Kowshikan Mathivarnan’s actual GitHub contribution grid on a raised isometric surface. Generated using Platane/snk. Activity is not a measure of impact.'
    palette = {'cb':'#345363', 'cs':'#edcc8f', 'ce':'#1b3342', 'c0':'#1b3342', 'c1':'#245b60', 'c2':'#338d80', 'c3':'#53bfa3', 'c4':'#86efd0'}
    for s in styles:
        styled = deepcopy(s)
        # Literal colors also render correctly in static SVG previewers.
        for key, color in palette.items():
            styled.text = styled.text.replace('var(--' + key + ')', color)
        root.append(styled)
    ET.SubElement(root, tag('style')).text = '''
:root{--cb:#345363;--cs:#edcc8f;--ce:#1b3342;--c0:#1b3342;--c1:#245b60;--c2:#338d80;--c3:#53bfa3;--c4:#86efd0}
text{font-family:Segoe UI,Arial,sans-serif}.s{filter:drop-shadow(0 3px 1px #06131e)}
@media(prefers-reduced-motion:reduce){.c,.s,.u{animation:none!important}.s,.u{display:none}}
'''
    ET.SubElement(root,tag('rect'),{'x':'.5','y':'.5','width':'1199','height':'469','rx':'24','fill':'#0c1927','stroke':'#2b4353'})
    def label(x,y,value,size,color,**attrs):
        e=ET.SubElement(root,tag('text'),{'x':str(x),'y':str(y),'font-size':str(size),'fill':color,**attrs});e.text=value
    label(45,51,'THE CONTRIBUTION STUDIO',14,'#7ee6c7',**{'letter-spacing':'3'})
    label(45,96,'Consistency, in motion.',32,'#f1f5f9',**{'font-weight':'600'})
    scene=ET.SubElement(root,tag('g'),{'transform':'translate(150 149) matrix(1.12 .14 -.65 .9 0 0)'})
    ET.SubElement(scene,tag('rect'),{'x':'-14','y':'-10','width':'876','height':'142','rx':'10','fill':'#06111d','stroke':'#24414e'})
    ET.SubElement(scene,tag('rect'),{'x':'-14','y':'-18','width':'876','height':'142','rx':'10','fill':'#122736','stroke':'#426571'})
    for cell in cells:
        ET.SubElement(scene,tag('rect'),{'x':cell.get('x'),'y':str(float(cell.get('y'))+3),'width':'12','height':'12','rx':'2','fill':'#071722','stroke':'#2a4855','stroke-width':'.6'})
    for e in original:
        if e.tag not in {tag('style'), tag('desc'), tag('title')}:
            scene.append(deepcopy(e))
    label(45,440,'ACTUAL GITHUB ACTIVITY  /  REFRESHED DAILY',13,'#a8bdcb',**{'letter-spacing':'1.5'})
    label(1155,440,'kowshi1119',14,'#e5c78d',**{'text-anchor':'end'})
    destination=Path(destination)
    destination.parent.mkdir(parents=True,exist_ok=True)
    ET.ElementTree(root).write(destination,encoding='unicode',xml_declaration=False)
    return len(cells)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source',type=Path)
    parser.add_argument('destination',type=Path)
    args=parser.parse_args()
    print(f'Styled {stylize(args.source,args.destination)} contribution cells → {args.destination}')
