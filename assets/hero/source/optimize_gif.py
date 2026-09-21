"""Losslessly re-encode an indexed GIF using transparent changed rectangles.

Keeps every displayed palette color, frame duration and loop metadata. Needs Pillow.
"""
from pathlib import Path
from PIL import Image, ImageChops, GifImagePlugin
import argparse


def optimize(source, target):
    GifImagePlugin.LOADING_STRATEGY = GifImagePlugin.LoadingStrategy.RGB_AFTER_DIFFERENT_PALETTE_ONLY
    gif=Image.open(source)
    palette=gif.getpalette()
    if palette is None:
        raise ValueError('Expected an indexed GIF')
    palette=(palette+[0]*768)[:768]
    transparency=gif.info.get('transparency',255)
    pal=Image.new('P',(1,1)); pal.putpalette(palette)
    previous=None
    with open(target,'wb') as output:
        for index in range(gif.n_frames):
            gif.seek(index)
            if gif.mode != 'P' or gif.getpalette() != palette:
                raise ValueError('Expected a fixed global palette; regenerate with the supplied renderer')
            frame=gif.copy()
            frame.info['transparency']=transparency
            if previous is None:
                header,_=GifImagePlugin.getheader(frame,info={'loop':0,'transparency':transparency})
                for block in header: output.write(block)
                box=(0,0,*frame.size)
                delta=frame
            else:
                diff=ImageChops.difference(frame.convert('RGB'),previous.convert('RGB'))
                box=diff.getbbox()
                if box is None:
                    box=(0,0,1,1)
                    delta=Image.new('P',(1,1),transparency);delta.putpalette(palette)
                else:
                    # RGB max difference is nonzero whenever displayed palette colors differ.
                    r,g,b=diff.split()
                    changed=ImageChops.lighter(ImageChops.lighter(r,g),b).point(lambda v:255 if v else 0)
                    delta=Image.new('P',frame.size,transparency);delta.putpalette(palette)
                    delta.paste(frame,mask=changed)
                    delta=delta.crop(box)
            for block in GifImagePlugin.getdata(delta,offset=box[:2],duration=gif.info.get('duration',40),disposal=1,transparency=transparency):
                output.write(block)
            previous=frame.copy()
        output.write(b';')
    # Decode and compare every displayed frame, not just file metadata.
    result=Image.open(target)
    if result.n_frames!=gif.n_frames or result.info.get('loop')!=0:
        raise ValueError('GIF metadata changed')
    for i in range(gif.n_frames):
        gif.seek(i);result.seek(i)
        if ImageChops.difference(gif.convert('RGBA'),result.convert('RGBA')).getbbox(alpha_only=False):
            raise ValueError(f'Visible frame mismatch at {i}')
    print(f'Lossless GIF optimization: {Path(source).stat().st_size} -> {Path(target).stat().st_size} bytes; {result.n_frames} frames verified')

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source');parser.add_argument('target')
    args=parser.parse_args();optimize(args.source,args.target)
