#!/usr/bin/env python3
"""Draw the stored hotspot markers back onto their icons and montage them, so a whole set
of placements can be checked in one glance.  This is the only check that can see a marker
sitting on the wrong figure — `make check` only knows the coordinates parse.  Usage:

    node src/assemble.js                      # icons.json must be current
    python3 src/tools/overlay.py OUTDIR [KEY ...]

With no keys, every icon that has markers is drawn, 4 to a sheet, in Gospel order, with a
legend of the marker labels beside each icon.  With keys, one sheet per key at a larger
size.  Coordinates are the assembled (clamped) ones — what the reader actually shows."""
import sys, os, json
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
D = json.load(open(os.path.join(ROOT, "data", "icons.json")))

def font(sz, bold=True):
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else
              "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
              "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, sz)
    return ImageFont.load_default()

def pct(s):
    return float(str(s).rstrip("%"))

def panel(key, im_rec, passage, side, legend_w, grid=False):
    im = Image.open(os.path.join(ROOT, "img", im_rec["file"])).convert("RGB")
    w, h = im.size
    s = side / max(w, h)
    im = im.resize((max(1, int(w*s)), max(1, int(h*s))), Image.LANCZOS)
    w, h = im.size
    out = Image.new("RGB", (w + legend_w, max(h, side)), "white")
    out.paste(im, (0, 0))
    d = ImageDraw.Draw(out)
    if grid:  # single-icon mode: a 10% grid, so a corrected coordinate can be read off
        fg = font(11)
        for pc in range(10, 100, 10):
            x = int(w * pc / 100.0); y = int(h * pc / 100.0)
            d.line([(x, 0), (x, h)], fill=(0, 200, 255), width=1)
            d.line([(0, y), (w, y)], fill=(0, 200, 255), width=1)
            d.text((x + 2, 2), str(pc), fill=(0, 120, 255), font=fg)
            d.text((2, y + 2), str(pc), fill=(0, 120, 255), font=fg)
    r = max(9, side // 50)
    f = font(int(r * 1.2))
    for i, hs in enumerate(im_rec.get("hot", [])):
        y = h * pct(hs[2]) / 100.0
        x = w * pct(hs[3]) / 100.0
        d.ellipse([x-r, y-r, x+r, y+r], fill=(255, 40, 40), outline="white", width=2)
        d.text((x, y), str(i+1), fill="white", font=f, anchor="mm")
    # legend
    fl = font(13, bold=False); fb = font(13)
    y = 6
    d.text((w + 8, y), (passage or "?")[:40], fill="black", font=fb); y += 18
    d.text((w + 8, y), key, fill=(90, 90, 90), font=fl); y += 18
    d.text((w + 8, y), im_rec["title"][:36], fill=(90, 90, 90), font=fl); y += 22
    for i, hs in enumerate(im_rec.get("hot", [])):
        t = "%d. %s" % (i+1, hs[0])
        # wrap
        line = ""
        for word in t.split():
            if d.textlength(line + " " + word, font=fl) > legend_w - 14 and line:
                d.text((w + 8, y), line, fill="black", font=fl); y += 16; line = word
            else:
                line = (line + " " + word).strip()
        d.text((w + 8, y), line, fill="black", font=fl); y += 20
    return out

def main():
    outdir = sys.argv[1]; keys = sys.argv[2:]
    os.makedirs(outdir, exist_ok=True)
    owner = {}
    for p in D["passages"]:
        for k in p.get("imgs", []):
            owner[k] = p["range"] + "  " + p.get("name", "")
    items = [(k, v) for k, v in D["images"].items() if v.get("hot")]
    def order(kv):
        r = owner.get(kv[0], "")
        import re
        m = re.match(r"Matthew (\d+):(\d+)", r)
        return (int(m.group(1))*1000 + int(m.group(2))) if m else 0
    items.sort(key=order)
    if keys:
        for k in keys:
            p = panel(k, D["images"][k], owner.get(k), 900, 320, grid=True)
            fn = os.path.join(outdir, k + ".png"); p.save(fn); print(fn)
        return
    per, side, lw = 4, 520, 250
    for n in range(0, len(items), per):
        batch = items[n:n+per]
        panels = [panel(k, v, owner.get(k), side, lw) for k, v in batch]
        W = 2 * (side + lw) + 10; H = 2 * (side + 10)
        sheet = Image.new("RGB", (W, H), (200, 200, 200))
        for i, p in enumerate(panels):
            sheet.paste(p, ((i % 2) * (side + lw + 10), (i // 2) * (side + 10)))
        fn = os.path.join(outdir, "sheet%02d.png" % (n // per + 1)); sheet.save(fn); print(fn)

if __name__ == "__main__":
    main()
