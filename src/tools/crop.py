#!/usr/bin/env python3
"""Enlarge one region of an icon so an inscription or a small figure can actually be read
before anything is written about it.  Usage:

    python3 src/tools/crop.py OUT.png KEY TOP% LEFT% BOTTOM% RIGHT%

Percentages are the same ones hotspots use, so a marker can be checked at the coordinates
it will be written with."""
import sys, os
from PIL import Image

out, key, t, l, b, r = sys.argv[1], sys.argv[2], *map(float, sys.argv[3:7])
src = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "img", key + ".webp")
im = Image.open(src).convert("RGB")
w, h = im.size
box = (int(w*l/100), int(h*t/100), int(w*r/100), int(h*b/100))
im = im.crop(box)
s = 900.0 / max(im.size)
if s > 1:
    im = im.resize((int(im.width*s), int(im.height*s)), Image.LANCZOS)
im.save(out)
print(out, im.size)
