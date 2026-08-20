# HANDOFF — Biblicon (Matthew icon reader)

Cross-session handoff log. Read this first at session start. End every working session by
updating `## Status` + `## Next` and appending a `## Session YYYY-MM-DD` block
(Did / Why / Verified / Next). The `SessionStart` hook prints everything above
`## Session history` into context; the `Stop` hook blocks if `src/` or the HTML changed
and this file did not.

---

## Status

- **What this is.** A Bible-study reader for the Gospel of Matthew (KJV) in which every
  passage is paired with an Eastern Orthodox icon and with commentary from the Church
  Fathers. Owner's priority order, stated 2026-08-20: **the icons and the explanation of
  each icon matter most**, then theological correctness on Orthodox terms, then visual
  polish. Catena Bible (catenabible.com) is the model for multi-Father commentary.
- **Scope.** Desktop web only for now; a native app "only if we see that it's worth it."
  Keep the existing page structure and extend it rather than redesign it.
- **Deliverable:** `Matthew Reader.html` — a single self-contained file (~8.7 MB). Fonts,
  icons, the KJV text and all commentary are embedded; it opens by double-clicking, no
  server and no network. **Do not hand-edit it.** It is generated:
  ```
  node src/assemble.js      # merge the data files -> src/data/icons.json
  node src/build.js         # emit "Matthew Reader.html"
  ```
- **Structure** (preserved from the owner's original wireframe): sticky header, sticky
  chapter rail with a per-chapter icon tree, a **Text leads / Icons lead** mode toggle, and
  a right-hand drawer with three tabs — *Scripture Story*, *Wisdom of the Fathers*,
  *Deciphering the Icon* (numbered hotspot markers over the icon).
- **Content, as of 2026-08-20:**
  - **118 passages**, all 28 chapters. Tiers: **53 (a)**, **63 (b)**, **2 (c)**.
    **116 have an icon**, drawn from **62 unique images**.
  - **15 of 62 icons have positioned hotspot markers.** All 62 have a prose reading.
    **46 passages** also carry passage-level "Points to notice" (inherited from the
    owner's original 46 entries).
  - **354 patristic quotations, every one verbatim** from the *Catena Aurea* on Matthew
    (Oxford 1842, public domain). Chrysostom on 115 of 118 passages, then Jerome,
    Augustine, Hilary, Leo, Ambrose, Cyril of Alexandria, Bede, Cassian, Chrysologus,
    Cyprian, John of Damascus. **Nothing paraphrased, nothing invented.**
- **Tier system** (rendered on the card and in the drawer, so the reader is never misled):
  - **a** — a genuine Orthodox icon of *this* scene.
  - **b** — the icon the Church reads over the *wider* scene; the page says so explicitly.
  - **c** — no traditional icon; the passage shows as a plain verse row. Only two:
    `cost8` (Mt 8:18–22) and `reconcile18` (Mt 18:15–20).
- **History.** The owner's original file is kept as `Matthew Reader.wireframe-original.html`.
  It was a design-canvas bundle whose "icons" were empty `<image-slot>` drop targets that
  only function inside that editor, with 46 of 118 passages wired up. The current file is a
  rebuild in plain HTML/CSS/vanilla JS; the layout and interaction structure are unchanged.

## Next

In the owner's priority order:

1. **Positioned hotspot markers for the other 47 icons.** This is the biggest remaining
   gap and the thing he cares most about. Method that works: `src/` has no grid tool
   committed, but the one used was a Pillow script that overlays a 10% coordinate grid on
   `src/img/<key>.webp`, montaged 4-up — read the coordinates straight off the overlay,
   then write `[label, text, "top%", "left%"]` into `hotspots.js`. Do **not** guess
   coordinates from a thumbnail; markers land on empty sky.
2. **Replace the shared *Christ the Teacher* fallback where a real icon exists.** ~20
   tier-b passages share `Christos Didaskon Dionysiou`. Orthodox tradition genuinely has no
   scene-icon for most parables, so the sharing is honest — but `talents`, `tenants21`,
   `twosons21` and `servant` may exist in Romanian or Serbian monastery fresco cycles that
   were not exhausted (Sucevița, Voroneț, Humor, Moldovița were not reachable by the
   category names tried).
3. **The two tier-c passages** — decide whether they stay iconless or take a broader icon.
4. **Mobile.** The layout is desktop-only by decision: a fixed 284px rail plus a 240px
   icon column. There is no responsive breakpoint at all yet.

## Gotchas (learned)

- **Wikimedia Commons free-text search returns Western art** (Dutch engravings, MET/NGA
  paintings) for Gospel scenes — useless here. What works is harvesting whole Orthodox
  cycles by *category* and matching on title. The productive ones:
  `Frescos in Dionysiou monastery` (Athos, 1547 — the backbone, ~40 Gospel scenes with
  transliterated Greek titles), `Cathedral (Monreale) - New Testament mosaics` and its
  subcategories, `Museum of Dionisy's Frescos` (Ferapontov, 1502 — has parables),
  `Icons in Saint Paraskevi Church, Langadas` (115 numbered 19th-c. Greek icons),
  Rossano Gospels, Menologion of Basil II, Gračanica, Sant'Apollinare Nuovo.
- **Commons API quirks.** `list=search` needs `filetype:bitmap` or it returns PDFs and
  DjVus. Short queries beat long ones — a five-word query usually returns nothing.
  `prop=imageinfo` **silently truncates** large batches: request 5 titles per call and
  retry, or you will lose ~60% of results with no error. Parallel image downloads get
  rate-limited into HTML error pages that land on disk with a `.jpg` name — **fetch
  serially and check `file -b` before trusting anything you downloaded.**
- **Verify every image by eye before wiring it up.** Titles lie. `Christ in the pharisee's
  house (Monreale)` is actually the healing of the man with dropsy — its own Latin
  inscription says `SANAT YDROPICUM DIE SABBATI`. It had been assigned to seven
  Pharisee-dispute passages before a contact-sheet pass caught it. Batch ~12 thumbnails
  into one montage and read that, rather than one file at a time.
- **Commons attribution for the Dionysiou frescoes is inconsistent** — split between
  Tzortzis Phouka and Theophanes the Cretan. The katholikon is standardly given to
  Tzortzis. Credit lines render the Commons field verbatim, so don't assert a painter in
  the prose that contradicts the credit sitting next to it.
- **Never write a patristic quotation from memory.** `src/data/catena.json` holds ~6,200
  real ones parsed from the 1842 Catena; `fathers.js` selects from it. If a passage has no
  quote, widen the block window — do not compose one.
- **The Fathers whitelist is deliberate.** `fathers.js` excludes Pseudo-Chrysostom (the
  Arian-tinged *Opus Imperfectum*), the medieval Latin *Glossa*, the Carolingians
  (Rabanus, Remigius, Haymo), Origen (condemned in part at the Fifth Council) and Eusebius.
  Pre-schism Western Fathers (Jerome, Augustine, Ambrose, Leo, Gregory) are kept — they are
  saints in the Orthodox calendar too.
- **`assemble.js` must carry `o.hot` through as `notes`.** The owner's original 46 entries
  each hold three `[label, text]` pairs of passage commentary. An earlier refactor moved
  hotspots onto the *image* record and silently dropped these; they are now re-attached to
  the *passage* as "Points to notice". Don't lose them again in a refactor.
- **Tiering is computed, not declared.** `assemble.js` derives it: no image → `c`; image
  shared by more than one passage → `b`; otherwise the tier from `assign.js`. Passages that
  legitimately *own* a shared image (e.g. `entry` owns the Entry-into-Jerusalem icon that
  `lament23` borrows) need `tierA:true` in `overrides.js`; the reverse case needs
  `tierB:true`.
- **The HTML is ~8.7 MB and regenerated wholesale**, so every commit that touches it adds
  a full copy to git history. Rebuild and commit it deliberately, not on every tweak.
- **`file://` is blocked in the Playwright MCP browser.** To verify, serve the directory
  (`python3 -m http.server 8731 --bind 127.0.0.1`) and open
  `http://127.0.0.1:8731/Matthew%20Reader.html`. A build that writes without error is not
  evidence it renders — open it, cycle all three drawer tabs, click hotspots, switch modes,
  and check the console.

---

## Session history

## Session 2026-08-20 (rebuild from wireframe to working reader; icons + Catena commentary)

**Did**
- Unpacked the design-canvas bundle the owner started from (gzipped base64 manifest +
  `dc-runtime` + React). Extracted the app template, the 46 existing icon entries, the 118
  pericope anchors, the KJV text, and the one Nativity image he had dropped into a slot.
- Rebuilt as a single self-contained HTML page: vanilla JS, real `<img>` elements, Spectral
  embedded as woff2 data URIs. Dropped the Caveat/Gaegu handwriting fonts (wireframe fonts
  next to Byzantine icons). Removed the dead `Icon Bible Wireframes.dc.html` back-link.
- Scraped the *Catena Aurea* on Matthew (CCEL plain-text cache) and parsed it into ~6,200
  attributed patristic comments keyed by chapter:verse. Wired selection to prefer
  Chrysostom, restricted to Fathers venerated in the Orthodox Church.
- Harvested ~6,100 candidate images from Orthodox/Byzantine Commons categories, verified
  them visually in contact sheets, and wired **116 of 118** passages to an icon.
- Wrote the icon explanations: prose readings for all 62 icons, positioned hotspot markers
  for 15, and re-attached the owner's original 46 passage-level note sets.
- Moved the build pipeline into `src/` with a README, so icons can be added without
  touching the 8.7 MB output.

**Why**
- `<image-slot>` is a design-canvas host feature backed by a `.image-slots.state.json`
  sidecar. Outside that editor it is inert, so "keep the structure" could not mean "keep
  the bundle" — the page had to emit real images. Layout and interaction were preserved
  exactly; only the runtime changed.
- The commentary had to be quoted, not recalled: the existing entries render Father quotes
  in quotation styling with a `☨ Homily III`-style citation, and authoring 72 more of those
  from memory would have minted fabricated citations under the owner's single loudest
  requirement ("as theologically correct… very important"). The Catena is both public
  domain and the actual source Catena Bible is built on.

**Corrections made to the owner's data** (they contradict the file he supplied — flagged to
him explicitly):
- Mt 1:18–25 "The Annunciation" → **"The Nativity of Christ."** These verses *are* the
  Orthodox Nativity Gospel, and the Nativity icon's Joseph-with-the-tempter detail comes
  from this passage. Uses the icon he dropped in himself.
- Mt 2:19–23 "The Nativity of Christ" → **"The Return to Nazareth."** Its own story text
  described the flight to Egypt; the label was wrong for the verses.
- Mt 2:13–15 gains the **Flight into Egypt** icon that 2:19–23 had been misusing.

**Verified**
- Playwright at 1440×960 against a local HTTP server: 118 passages render, 116 icon cards,
  **0 broken images**, no horizontal body scroll, **console clean (0 errors)**.
- Drawer opens; all three tabs cycle on ten spot-checked passages; hotspot markers click
  and highlight. Marker placement checked by screenshotting `.hotwrap` — on the Nativity
  all five land correctly (star / Theotokos / manger / Joseph and the tempter / the
  washing), on the Ravenna Judgment all five land correctly (Christ / two angels / sheep /
  goats).
- Icons-lead mode renders 118 plates with legible captions; 61-entry attribution list in
  the footer.
- Counts re-derived from `src/data/icons.json` after the final build, not estimated.

**Next**
- Positioned markers for the remaining 47 icons — see `## Next` item 1 for the method.
- Hunt Romanian/Serbian fresco cycles for the four parables still on the shared
  *Christ the Teacher* fallback.
