# Finding more icons

These are the scripts that took the reader from one icon per passage to several, and they
are here because `HANDOFF.md` `## Next` asks for more of the same: 25 illustrated passages
still show a single icon.

The method, in order. It is the one that works — free-text Commons search returns Dutch
engravings, and guessed category names mostly do not exist.

| step | script | what it does |
|---|---|---|
| 1 | `seed_categories.js` | asks Commons which categories each file already in `picks.js` sits in. A verified Theophany fresco lives where more Theophany icons live. |
| 2 | `harvest_pool.js` | enumerates those categories, their subcategories, and a list of whole Orthodox programmes, into a pool of candidate titles. `catSearch` on a programme name ("Life of Christ mosaics") turns up cycles you would not guess. |
| 3 | *(match by hand)* | filter the pool by scene keywords, then **look at every survivor**: 400px contact sheets, ~12 per sheet, to throw out the Western art, then 700px for anything about to be wired up. Titles lie — see HANDOFF Gotchas for the ones that lied. |
| 4 | `fetch_images.js` | downloads serially with `Retry-After` honoured and exponential backoff. `upload.wikimedia.org` 429s constantly; without the backoff a 177-file run returned 21 files, with it 172 of 172. |
| 5 | `encode_images.py` | 660px WebP into `src/img/`, and merges the Commons metadata into `data/image_meta.json` and `data/pick_keys.json`. |

Then add the file to `picks.js` under its passage, name it in `labels.js`, write its reading
in `hotspots2.js`, and run `make`. The check fails if an icon has no label.

The paths in these scripts assume they are run from this directory. They were written for one
harvest and are kept as a record of the method rather than as a polished tool.
