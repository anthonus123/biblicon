#!/usr/bin/env python3
"""Overlay a 10% coordinate grid on src/img/<key>.webp so hotspot coordinates can be
read straight off the picture instead of guessed.  Usage:

    python3 src/tools/grid.py OUTDIR KEY [KEY ...]

Writes OUTDIR/<key>.png, each ~760px on the long side, with left% along the top edge
and top% down the left edge — the same percentages hotspots.js stores."""
import sys, os
from PIL import Image, ImageDraw, ImageFont

SIDE = 760
MARGIN = 26

def font(sz):
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, sz)
    return ImageFont.load_default()

def grid(src, dst):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    s = SIDE / max(w, h)
    im = im.resize((max(1, int(w * s)), max(1, int(h * s))), Image.LANCZOS)
    w, h = im.size
    out = Image.new("RGB", (w + MARGIN, h + MARGIN), "white")
    out.paste(im, (MARGIN, MARGIN))
    d = ImageDraw.Draw(out)
    f = font(11)
    for p in range(0, 101, 10):
        x = MARGIN + int(w * p / 100.0)
        y = MARGIN + int(h * p / 100.0)
        d.line([(x, MARGIN), (x, MARGIN + h)], fill=(255, 0, 0), width=1)
        d.line([(MARGIN, y), (MARGIN + w, y)], fill=(255, 0, 0), width=1)
        d.text((x + 2, 6), str(p), fill=(200, 0, 0), font=f)
        d.text((2, y + 2), str(p), fill=(200, 0, 0), font=f)
    out.save(dst)

if __name__ == "__main__":
    outdir, keys = sys.argv[1], sys.argv[2:]
    os.makedirs(outdir, exist_ok=True)
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "img")
    for k in keys:
        grid(os.path.join(root, k + ".webp"), os.path.join(outdir, k + ".png"))
        print(os.path.join(outdir, k + ".png"))
