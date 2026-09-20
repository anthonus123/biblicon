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

# Checking the quotations

`quotes.js` (`BOOK=john node src/tools/quotes.js`) checks the words inside the readings and
markers, which nothing else does. KJV clauses must be verbatim from the book's `kjv.json`. A
Father quoted as "St Augustine: …" must be quoted from a Catena comment the Catena credits to
him. Its first run on John found 17 misquoted verses, 18 drifted patristic sentences and two
comments of Origen credited to Augustine and Chrysostom. Run it after writing any reading or
marker, and read the list it prints: our own prose around a quotation shows up too.

# Where Mark's text and pericopes came from

Two one-shot scripts, kept as the record of how `src/books/mark/` was made on 2026-09-20. Both
still reproduce their output byte-for-byte, which is the point of keeping them.

| script | what it does |
|---|---|
| `parse_catena_mark.js <catena2.txt> <out.json>` | parses the CCEL plain-text cache of the *Catena Aurea* on St Mark (Volume II, Oxford 1842 — `ccel.org/ccel/a/aquinas/catena2/cache/catena2.txt`) into `catena.json`. It matches the volume's **closed list of 22 author tokens**, because a "looks like an attribution" heuristic read 300 sentences (`There follows,`, `It goes on,`) as authors; it prints every capitalised head it rejected, so a missing name cannot pass unnoticed. It also normalises five print misspellings — `Psuedo-Chrys.`, `Pseudo-Chyrs.` and `Origin` would otherwise slip past the `^pseudo` / `^origen` exclusions in `fathers.js`, and `Theophlyact` past `^theophyl`. |
| `mark_anchors.js <out.json>` | writes `anchors.json`. The divisions are the Catena's own verse blocks, and the script **refuses to write** on a gap, an overlap, a duplicate id, or a chapter whose passages do not add up to the KJV's verse count. |

`node src/tools/mark_anchors.js src/books/mark/anchors.json` regenerates the anchors in place.
