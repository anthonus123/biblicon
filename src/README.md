# Building `Matthew Reader.html`

The reader is a single self-contained HTML file. Everything (fonts, icons, the KJV
text, the patristic commentary) is embedded, so it opens by double-clicking with no
server and no network.

```
node src/assemble.js      # merge the data files -> src/data/icons.json
node src/build.js         # emit ../Matthew Reader.html
```

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

## Adding an icon

1. Find a public-domain or freely-licensed Orthodox image on Wikimedia Commons.
2. Add its metadata to `data/image_meta.json` and its md5 key to `data/pick_keys.json`
   (`commons.js` has helpers for querying the Commons API).
3. Save it as `img/<key>.webp` at 660px wide.
4. Point the pericope at it in `picks.js`, name it in `labels.js`, and write its
   reading in `hotspots.js` (with markers) or `hotspots2.js` (prose only).
5. Rebuild.

## Tiers

- **a** — a genuine Orthodox icon of *this* scene.
- **b** — the icon the Church reads over the wider scene; the page says so on the card.
- **c** — no traditional icon; the passage shows as a plain verse row.
