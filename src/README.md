# Building `Matthew Reader.html`

The reader is a single self-contained HTML file. Everything (fonts, icons, the KJV
text, the patristic commentary) is embedded, so it opens by double-clicking with no
server and no network.

```sh
make          # assemble -> check -> emit "Matthew Reader.html"   (run from the repo root)
make check    # structural check + content counts, without re-emitting the page
make serve    # serve it at http://127.0.0.1:8731
make clean    # drop the generated intermediate
```

Two stages, which `make` sequences for you:

```
src/assemble.js   the data files + the js modules below -> src/data/icons.json
src/build.js      src/data/icons.json + fonts + img/ + page.css + app.js -> the html
```

`src/data/icons.json` is generated and not tracked in git. `build.js` refuses to run without
it, and refuses to write a page with any icon missing from `img/`, so a build that succeeds
is a build with all 62 images in it.

## Where things live

| file | what it holds |
|---|---|
| `data/anchors.json` | the 118 pericope divisions of Matthew (chapter, first and last verse) |
| `data/matthew_kjv.json` | the King James text |
| `data/catena.json` | the *Catena Aurea* on Matthew, parsed into ~6,200 patristic comments keyed by verse |
| `fathers.js` | picks the quotations — restricted to Fathers venerated in the Orthodox Church |
| `assign.js` | each pericope's Orthodox iconographic subject and tier |
| `picks.js` | pericope → the Wikimedia Commons file used for it |
| `labels.js` | a readable name for each icon |
| `hotspots.js` | icons with numbered "Deciphering the Icon" markers (`[label, text, top%, left%]`) |
| `hotspots2.js` | icons with a prose reading only |
| `overrides.js` | corrected passage titles, key verses and scripture summaries |
| `data/image_meta.json` | source, artist and licence for every image |
| `img/` | the icons, 660px WebP |
| `check.js` | the structural check `make check` runs |

## Adding an icon

1. Find a public-domain or freely-licensed Orthodox image on Wikimedia Commons.
2. Add its metadata to `data/image_meta.json` and its md5 key to `data/pick_keys.json`
   (`commons.js` has helpers for querying the Commons API).
3. Save it as `img/<key>.webp` at 660px wide.
4. Point the pericope at it in `picks.js`, name it in `labels.js`, and write its
   reading in `hotspots.js` (with markers) or `hotspots2.js` (prose only).
5. `make`. The check will tell you if the file is missing, if a marker landed outside the
   frame, or if the icon ended up attached to no passage.

## What `make check` guarantees

It hard-fails on the things that would ship a broken reader: an image record with no file in
`img/`, a hotspot coordinate outside the 9–92% frame, a passage whose verses don't match its
anchor, a passage pointing at an unknown image, a tier that contradicts whether an icon is
present, and any drop below the 46 passages carrying the owner's original "Points to notice".

Everything else — an icon with no prose reading yet, a passage with no patristic quotation,
an unused file in `img/` — is a warning. Content is meant to grow, so growth never turns the
build red.

## Tiers

- **a** — a genuine Orthodox icon of *this* scene.
- **b** — the icon the Church reads over the wider scene; the page says so on the card.
- **c** — no traditional icon; the passage shows as a plain verse row.
