# Building the readers

Each reader is a single self-contained HTML file — `Matthew Reader.html`, `Mark Reader.html`,
`Luke Reader.html`, `John Reader.html`.
Everything (fonts, icons, the KJV text, the patristic commentary) is embedded, so it opens
by double-clicking with no server and no network.

```sh
make               # assemble -> check -> emit every reader   (run from the repo root)
make john          # one Gospel only (also: make matthew, make mark, make luke)
make check         # structural check + content counts for every book, without re-emitting
make BOOK=john serve   # serve a reader at http://127.0.0.1:8731
make clean         # drop the generated intermediates
```

Two stages, which `make` sequences for you, once per book (`BOOK=matthew`, `BOOK=mark`, `BOOK=luke` or
`BOOK=john`; `src/book.js` resolves the folder). A new Gospel is a new `src/books/<book>/`
folder with the eleven files below plus a line in the Makefile's `BOOKS`:

```
src/assemble.js   src/books/<book>/* + the shared pool -> src/books/<book>/icons.json
src/build.js      that icons.json + fonts + img/ + page.css + app.js -> the html
```

`src/books/<book>/icons.json` is generated and not tracked in git. `build.js` refuses to run
without it, and refuses to write a page with any icon missing from `img/`, so a build that
succeeds is a build with every image in it.

## Where things live

Per Gospel, in `src/books/<book>/`:

| file | what it holds |
|---|---|
| `book.json` | name, Greek title, chapter count, output file name, the commentary's provenance line, and the footer's own examples of this reader's galleries and type icons |
| `anchors.json` | the pericope divisions (chapter, first and last verse, name) |
| `kjv.json` | the King James text |
| `catena.json` | the *Catena Aurea* on that Gospel, parsed into attributed patristic comments keyed by verse |
| `assign.js` | each pericope's Orthodox iconographic subject and tier |
| `picks.js` | pericope → the Wikimedia Commons file(s) shown for it |
| `labels.js` | a readable name for each icon |
| `hotspots.js` | icons with reading and numbered markers together (`[label, text, top%, left%]`) |
| `hotspots2.js` | prose readings |
| `hotspots3.js` | positioned markers for the icons whose reading is in `hotspots2.js` |
| `overrides.js` | passage titles, types, key verses and scripture summaries; `tierB` declarations |
| `icons_orig.json` | (Matthew only) the owner's original 46 entries with their "Points to notice" |

Shared:

| file | what it holds |
|---|---|
| `fathers.js` | picks the quotations — restricted to Fathers venerated in the Orthodox Church |
| `data/image_meta.json`, `data/pick_keys.json` | source, artist, licence and key for every image in the pool |
| `img/` | the icons, 660px WebP — one pool for every reader; an image may serve more than one Gospel, because an icon of the Entry into Jerusalem is the same icon whichever Gospel's account it stands beside |
| `check.js` | the structural check `make check` runs |
| `tools/` | the harvest and marker-checking scripts (take `BOOK=`) |

## Adding an icon

1. Find a public-domain or freely-licensed Orthodox image on Wikimedia Commons.
2. Add its metadata to `data/image_meta.json` and its md5 key to `data/pick_keys.json`
   (`commons.js` has helpers for querying the Commons API).
3. Save it as `img/<key>.webp` at 660px wide.
4. Point the pericope at it in the book's `picks.js`, name it in `labels.js`, and write its
   reading in `hotspots.js` (with markers) or `hotspots2.js` (prose only).
5. `make`. The check will tell you if the file is missing, if a marker landed outside the
   frame, or if the icon ended up attached to no passage.

## What `make check` guarantees

It hard-fails on the things that would ship a broken reader: an image record with no file in
`img/`, a hotspot coordinate outside the 9–92% frame, a passage whose verses don't match its
anchor, a passage pointing at an unknown image, a tier that contradicts whether an icon is
present, and (Matthew) any drop below the 46 passages carrying the owner's original "Points to notice".

Everything else — an icon with no prose reading yet, a passage with no patristic quotation,
an unused file in `img/` — is a warning. Content is meant to grow, so growth never turns the
build red.

## Tiers

- **a** — a genuine Orthodox icon of *this* scene.
- **b** — the icon the Church reads over the wider scene; the page says so on the card.
- **c** — no traditional icon; the passage shows as a plain verse row.
