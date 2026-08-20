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
  server and no network. **Do not hand-edit it.** It is generated — one command from the
  repo root, which sequences assemble → check → build:
  ```
  make            # -> src/data/icons.json (generated, untracked) -> "Matthew Reader.html"
  make check      # structural check + the content counts below, without re-emitting
  make serve      # http://127.0.0.1:8731  (file:// is blocked in the Playwright browser)
  ```
  The build is deterministic: rebuilding unchanged content reproduces the same bytes.
- **Structure** (preserved from the owner's original wireframe): sticky header, sticky
  chapter rail with a per-chapter icon tree, a **Text leads / Icons lead** mode toggle, and
  a right-hand drawer with three tabs — *Scripture Story*, *Wisdom of the Fathers*,
  *Deciphering the Icon* (numbered hotspot markers over the icon).
- **Content, as of 2026-08-20:**
  - **118 passages**, all 28 chapters. Tiers: **51 (a)**, **7 (b)**, **60 (c)**.
    **57 have an icon, from 57 images — one icon, one passage, no image used twice.**
    The other 61 render as plain verse rows because no Orthodox icon of them exists.
  - **15 of 62 icons have positioned hotspot markers.** All 62 have a prose reading.
    **46 passages** also carry passage-level "Points to notice" (inherited from the
    owner's original 46 entries).
  - **354 patristic quotations, every one verbatim** from the *Catena Aurea* on Matthew
    (Oxford 1842, public domain). Chrysostom on 115 of 118 passages, then Jerome,
    Augustine, Hilary, Leo, Ambrose, Cyril of Alexandria, Bede, Cassian, Chrysologus,
    Cyprian, John of Damascus. **Nothing paraphrased, nothing invented.**
- **Tier system** (owner's rule, 2026-08-20: *one icon, one passage; no reuse; if there is no
  relevant icon, remove it altogether*):
  - **a** — an Orthodox icon of *this* scene, shown for this passage only. 51.
  - **b** — a **type icon**: the image the Church attaches to the passage without depicting its
    verses. The card and drawer say so: *"This is the icon the Church attaches to this passage;
    it is not a depiction of these verses."* Exactly 7, each declared `tierB` in `overrides.js`:
    `galilee` (the Forerunner dragged to prison, the event 4:12 reports), `matthew` (the apostle's own
    icon at his calling), `twelve` (the Synaxis at the sending), `signjonah12` (Jonah at the
    sign of Jonah), `lostsheep` (the Good Shepherd), `olivet` (Christ in Glory at the Second
    Coming), `commission` (Christ manifest among the apostles).
  - **c** — no icon; the passage is a plain verse row. 60, and that is the honest number.
  - Tier is **declared, not counted**. `assemble.js` reads `c` if there is no image, `b` if
    `overrides.tierB` says so, else `a`. The old rule ("shared image ⇒ tier b") is gone with
    the sharing.
- **History.** The owner's original was a design-canvas bundle whose "icons" were empty
  `<image-slot>` drop targets that only function inside that editor, with 46 of 118 passages
  wired up. The current file is a rebuild in plain HTML/CSS/vanilla JS; the layout and
  interaction structure are unchanged. The bundle itself was kept as
  `Matthew Reader.wireframe-original.html` until the owner dropped it on 2026-08-20 — it is
  still in history at commit `99d8959` (`git show 99d8959:"Matthew Reader.wireframe-original.html"`)
  if anything is ever needed back out of it.

## Next

In the owner's priority order:

1. **Positioned hotspot markers for the other 47 icons.** This is the biggest remaining
   gap and the thing he cares most about. Method that works: `src/` has no grid tool
   committed, but the one used was a Pillow script that overlays a 10% coordinate grid on
   `src/img/<key>.webp`, montaged 4-up — read the coordinates straight off the overlay,
   then write `[label, text, "top%", "left%"]` into `hotspots.js`. Do **not** guess
   coordinates from a thumbnail; markers land on empty sky.
2. **The shared-fallback problem — searched 2026-08-20b, and the answer is mostly "no icon
   exists".** **35** passages (not ~20) share `Christos Didaskon Dionysiou` and **11** share
   `Christos Apostolois Dionysiou`: 46 of 116, 40% of the reader, on two images. A second
   independent search found no Orthodox image for any of the 15 subjects `assign.js` names —
   see Gotchas. Resolved 2026-08-20d/e: no reuse at all, and the
   60 passages with no icon of their own now render as plain verse rows.
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
- **The parable/teaching passages have no Orthodox scene-icon, and this has now been
  searched twice — don't search a third time.** On 2026-08-20b: three complete Orthodox
  programs were enumerated in full (Dionysiou katholikon 338 files, Saint Paraskevi Langadas
  115 icons, Dionisy at Ferapontov 39) and **none** contains the Sermon, the disputes, or the
  parables of the talents / tares / mustard seed / hidden treasure / unforgiving servant /
  wicked husbandmen, nor the tribute money, the stater, the rich young ruler, the blessing of
  the children, the calling of the fishermen, the confession of Peter, or the Great
  Commission. Orthodox programs are built on the **feast cycle, the miracles and the saints**;
  parables are the exception, not the rule. Every dedicated Commons category for those 15
  subjects (`Render unto Caesar`, `Parable of the Talents`, `Parable of the Tares`,
  `Unmerciful servant`, `The Tenants in the Vineyard`, …) is Western art — Cranach, Titian,
  Caravaggio, Dutch engravings. Beware `Miniatures of Parables of Jesus Christ`: it looks
  right and is almost entirely Ottonian/Flemish. `File:Parable of the Talents.jpg` is a 15th-c
  **Western Gothic** miniature (crowned king in Western dress, no halo, no gold ground) —
  checked by eye. The productive vein, already exhausted, is Byzantine Gospel manuscripts:
  Rossano Gospels (6th c.) and Greek minuscules gave the Ten Virgins and the Labourers, and
  Ferapontov gave the Wedding Feast — **all three are already in use.** Where an Orthodox
  parable image exists on Commons, this project already has it.
- **A shared keyword is not a match — read what the icon actually depicts.** `johnq`
  (Mt 11:1–15, "John Sends from Prison") was showing `Elkomenos Prodromos Phylaken`, whose
  inscription is *ΕΛΚΟΜΕΝΟС Ο ΠΡΟΔΡΟΜΟС ΕΙС ΤΗΝ ΦΥΛΑΚΗΝ* — the Forerunner **dragged into**
  prison. That is the arrest Matthew reports at 4:12, not John sending his disciples at 11:2.
  The owner caught it; the automated name check did not, because both names contain "prison".
  The fresco now sits at `galilee` (4:12–17) and 11:1–15 has no icon.
- **An icon of one scene inside a multi-verse pericope is correct, not a mismatch.** The
  passage titles name the whole block, so `Lord of the Sabbath` (12:1–21) legitimately carries
  the healing of the withered hand (vv 9–14), and `Christ Walking on the Water` (14:22–36)
  carries Peter saved from the waves (vv 28–31). Don't "fix" these.
- **Read the Greek inscription before trusting a Dionysiou file name.** The three exorcism
  frescoes were all in the wrong place, and only the painted inscriptions settled it:
  `Iomenos Daimonon Takophon` is *τὸν δαιμονῶντα κωφόν*, the **dumb** demoniac (Mt 9:32–34),
  not the Gadarenes where it sat; `Iomenos Daimonizomenous` is **plural** and set among tombs,
  which is the two Gadarene demoniacs (Mt 8:28–34); the singular `Iomenos Daimonizomenon` went
  to Mt 12:22–37. Crop the top 14% of the file and enlarge it — the inscriptions are legible at
  660px and they name the scene exactly.
- **`Christ before Caiaphas` (Gračanica) is unused on purpose.** Christ is present in it, so it
  is the trial (26:57–75), not the plot to kill him (26:1–5) where it had been placed — and the
  Dionysiou `Krinomenos Christou`, whose inscription names *both* Annas and Caiaphas, fits that
  pericope better. With no reuse allowed, the Gračanica one has no home.
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
  a full copy to git history. It stays tracked deliberately — it is what someone clones the
  repo for — but the build is byte-deterministic, so a rebuild with no content change leaves
  `git status` clean and costs history nothing. Only a real content change grows the repo.
  `src/data/icons.json` is generated and **untracked**; `make` rebuilds it.
- **The build fails loudly now — keep it that way.** `build.js` exits non-zero rather than
  emitting a page with an icon missing from `img/`, and `assemble.js` gates its optional
  requires (`overrides.js`, `stories.js`) on `fs.existsSync` instead of catching. The old
  `try{...}catch(e){}` meant a syntax error in the 38 KB hand-edited `overrides.js` produced
  a *successful* build with every override silently gone. Don't reintroduce a catch there.
- **`make check` (`src/check.js`) hard-fails only on ship-breaking structure** — a missing
  image file, a passage whose verses don't match its anchor, a tier contradicting whether an
  icon is present, or the count of passages carrying the owner's "Points to notice" dropping
  below 46. Everything else warns, because content is meant to grow. Note that `assemble.js`
  *clamps* hotspot coordinates to 9–92%, so bad coordinates cannot be seen in the assembled
  data — the check reads the raw ones out of `hotspots.js` instead. Four current markers are
  deliberately just outside and warn as clamped.
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

## Session 2026-08-20b (make the repository nicer to rebuild)

**Did**
- `Makefile` at the root: `make` (assemble → check → build), `make check`, `make serve`,
  `make clean`. `src/data/icons.json` has real prerequisites, so touching `hotspots.js` or
  any data file redoes it; running `build.js` alone can no longer emit a page from stale
  assembled data.
- Removed the two silent-failure paths. `assemble.js` no longer wraps its requires in
  `catch(e){}` — optional modules are gated on `fs.existsSync`, so a syntax error in
  `overrides.js`/`hotspots.js` stops the build instead of emptying it. `build.js` exits
  non-zero on a missing image file or a missing `icons.json`, with a message saying what to
  run, instead of printing to stderr and writing the page anyway.
- New `src/check.js` / `make check`: structural invariants hard-fail, content-growth
  observations warn, and it prints the counts this log quotes. Includes the regression guard
  for the owner's 46 passage-level note sets that a refactor dropped once before.
- Untracked `src/data/icons.json` (staged deletion, added to `.gitignore`) — it is a pure
  intermediate. `Matthew Reader.html` stays tracked: the owner chose that, it is the thing
  people clone the repo for.
- Root `README.md` (was 10 bytes) and a rewritten build section in `src/README.md`.
- Deleted `Matthew Reader.wireframe-original.html` (4 MB) at the owner's request — the
  rebuild has superseded it. Deleting does not shrink `.git`; the blob stays in history at
  `99d8959`, which is also where to recover it from.

**Why**
- The two-step build had no ordering guarantee and three ways to fail quietly: a stale
  `icons.json`, a swallowed require error, and a page written with icons missing. Each one
  produces a reader that looks built and is wrong — the expensive kind of failure in a
  project whose output is an 8.7 MB blob nobody reads by eye.
- The check exists because the browser pass (HANDOFF's standing rule: a build that writes
  without error is not evidence it renders) is slow, and most of what breaks is structural
  and catchable in a second.

**Verified**
- `make` from clean reproduces `Matthew Reader.html` **byte-identically** to the committed
  copy (md5 `416aa99f…` both), which is what makes the "rebuild costs history nothing" claim
  true rather than hopeful.
- `make check` re-derives every count in `## Status` unchanged: 118 passages, a:53 b:63 c:2,
  116 with an icon, 62 unique images, 15 with markers, 46 with notes, 354 quotations.
- All four failure paths exercised deliberately: `build.js` with no `icons.json` → exit 1
  with the fix instruction; an image file moved away → `build.js` exit 1 naming the file,
  `check.js` exit 1; a syntax error appended to `overrides.js` → `assemble.js` throws and
  exits 1 (previously: exit 0, all overrides silently gone). Everything restored afterwards.
- `make check` warns about 2 unused files in `src/img/` (`64edfde436b3.webp`,
  `bd8f72a1b1fe.webp`). Left in place, not deleted — they may be staged for the hotspot work.

**Next**
- Unchanged; see `## Next`. Positioned markers for the remaining 47 icons is still item 1,
  and `make check` now reports that count on every build.

## Session 2026-08-20c (audit of repeated icons)

**Did**
- Audited icon reuse after the owner noticed repeats. Distribution: 62 images over 116
  passages, but **51 used once, 35 on one image, 11 on another**. HANDOFF's "~20" was an
  undercount; corrected above.
- Found the mechanism. `assemble.js` computes tier as `useCount[imgKey]>1 ? 'b' : as.tier`.
  That rule was built for the `entry`/`lament23` case — one passage owns an icon, another
  borrows it. It is also firing on passages that named a real iconographic subject in
  `assign.js`, found no icon, and were given a generic Christ-teaching fresco: the shared-image
  rule then relabels the result `b`, and the card says *"This is the icon the Church reads over
  this passage; it belongs to the wider scene"* (`app.js:30`). For those, that sentence is
  false — it converts "we had nothing" into a claim about Orthodox tradition.
- Searched independently for all 15 missing subjects (see Gotchas for the full negative
  result and the categories not worth retrying). Conclusion: the previous session was not
  cutting corners — where an Orthodox image exists, it is already in the set.
- Declared the three honest borrows (`nativity`, `boy17`, `lament23`) with `tierB:true` in
  `overrides.js`, so an intentional borrow is now distinguishable from a failed search.
- `make check` gained two checks: the silent-demotion list (warns, names all 16 with the
  subject each wants) and a duplicate-key check on `overrides.js` — a repeated key in that
  38 KB literal silently discards the earlier entry, which is how the first attempt at the
  `tierB` declarations was lost.

**Why**
- The owner ranks theological correctness second only to the icons themselves. A page that
  tells the reader the Church reads *Christ the Teacher* over "Render unto Caesar" is making a
  claim the tradition does not support, and it does so on 16 passages.

**Verified**
- Every count re-derived from `src/data/icons.json`, not estimated. `make check` reports the
  16 demotions on every build now. `Matthew Reader.html` md5 unchanged (`416aa99f`) — the
  `tierB` declarations record intent without altering output, as intended.
- The Western-Gothic identification of `File:Parable of the Talents.jpg` was made by
  downloading the file and looking at it, per the owner's instruction and the Gotchas rule.

**Next**
- Both open items were closed in session 2026-08-20d, below.

## Session 2026-08-20d (honest labelling for the stand-in icons)

**Did**
- Added the **stand-in** concept. `assemble.js` sets `fb` when a passage names a real subject
  in `assign.js`, shares its image, and has no `tierA`/`tierB` declaration — the exact case
  where the tier-b sentence was making a false claim. `app.js` renders those with their own
  wording in all three paths (small card, icons-lead plate, drawer) and a `.standin` rule in
  `page.css` sets them off with a rule and a warmer ink. 14 passages.
- `twosons21` and `tenants21` lost their icon entirely (removed from `picks.js`, now tier c,
  plain verse rows). They had been showing the *Labourers in the Vineyard* miniature, a
  different parable. No icon of either scene exists, so no icon is the honest answer.
- `commandment` (22:34-46) declared `tierB:true` instead: `assign.js` names its own subject as
  "The Greatest Commandment / **Christ the Teacher**", so the Didaskon fresco is genuinely its
  icon, not a stand-in.
- Footer text in `build.js` now states the stand-in policy and the four iconless passages.
- `make check` now **fails** if a demoted passage is not flagged `fb` — the page can never
  silently go back to claiming a wider-scene reading for one of these.

**Why**
- Sourcing was the owner's first choice and it is a dead end (see Gotchas: searched twice).
  With no icon to be had, the only remaining honesty is to say so on the page. The owner ranks
  theological correctness second only to the icons themselves, and 16 passages were asserting
  a tradition that does not exist.

**Verified**
- Playwright at 1440x960 against the local server, both modes and the drawer: 118 plates in
  icons-lead, **0 broken images** (114 now, down from 116 by design), **console clean**, no
  horizontal scroll. 14 stand-in notes and 47 plain tier-b notes in each of the card and plate
  paths; the drawer shows the stand-in sentence and **zero** plain tier-b notes on a stand-in.
- Spot-checked the three cases by their rendered text: `caesar22` reads "... - stands in",
  `saltlight5` (a genuine wider-scene borrow) reads just the icon label, and `tenants21`
  renders as a plain verse row with no image element.
- `make check`: 118 passages, a:53 b:61 c:4, 114 with an icon, 46 notes, 354 quotations.

**Next**
- Positioned hotspot markers for the remaining 47 icons is again the top item (`## Next` 1).
- If an Orthodox image for any of the 14 ever surfaces, `make check` prints the standing list
  with the subject each one wants.

## Session 2026-08-20e (one icon, one passage — full re-audit of every image)

**Did**
- Audited all **64 files in `src/img/`** by eye, in six labelled contact sheets built with
  `montage`, against the passage each was serving. Decision table (file → passage → keep/drop →
  reason) was written to disk before any edit.
- **Rewrote `src/picks.js` from that table: 58 placements, no image used twice.** Header
  documents the rule. The other 60 passages have no icon and render as plain verse rows.
- **Three misplacements found and corrected**, all decided by the painted Greek inscriptions
  (see Gotchas): the Gadarene demoniacs, the dumb demoniac and the single demoniac were each
  on the wrong passage. This is the kind of error the owner asked to be found.
- **Dropped as portrait/generic with no tie:** the Twelve Apostles panel (was on two passages),
  `Christ Enthroned` (was on the Lord's Prayer), `Theotokos Panachranta` (was on "Who is my
  mother?", where it reads backwards — the passage's point is that his kindred are those who do
  the Father's will). Left unused: the Gračanica Caiaphas, the Monreale dropsy mosaic (Luke 14,
  not Matthew), and a Dionysiou pendentive of St Matthew writing.
- **Retired the stand-in vocabulary entirely** — with no reuse there is nothing to stand in.
  `fb` is gone from `assemble.js`, `STANDIN` from `app.js`, `.standin` from `page.css`. Tier b
  now means only *type icon*, 7 of them, each declared in `overrides.js`.
- `assemble.js` now drops image records no passage shows, so the page stops embedding and
  crediting images the reader never sees: **8.68 MB → 8.28 MB**, 62 → 58 embedded images.
- `make check` gained the invariant this all rests on: **fail if any image is used by more than
  one passage**, replacing the demotion checks.

**Why**
- The owner's rule, stated directly: one icon per passage, no reuse, correct theological place,
  and no icon at all where none is relevant. A general icon of Christ next to the Talents was
  never an icon of the Talents, and labelling it honestly (session d) was a stopgap; removing it
  is the answer.

**Verified**
- Playwright at 1440×960, both modes and the drawer: 118 plates, **58 images, 0 broken**,
  **console clean**, no horizontal scroll, **7** tier-b notes and **0** stand-in notes.
  The 60 imageless passages collapse to a slim titled row (54px vs 961px for a plate) with a
  "read the verses" link — screenshotted at the Talents; it reads as a deliberate text entry,
  not a broken card. Footer credits 57 works (58 minus the owner's own Nativity).
- `make check`: 118 passages, a:51 b:7 c:60, 58 images / 58 passages one each, 46 notes,
  354 quotations, every structural invariant holding.
- The duplicate-key trap in `overrides.js` fired again while adding the `tierB` declarations
  (`galilee` and `signjonah12` are declared twice, and the later one wins). The check added in
  session c caught it. **This file bites every session — always merge into the existing entry.**

**Next**
- Positioned hotspot markers: now only **58** icons to cover, 15 done, and no wasted work on
  icons that were about to be dropped.
- `make check` lists the 19 passages that name a subject in `assign.js` and have no icon; that
  is the standing want-list if an Orthodox image ever surfaces.

## Session 2026-08-20f (two placements the owner caught)

**Did**
- `johnq` (11:1–15) → **no icon**. Its fresco was the Forerunner being *dragged into* prison
  (inscription read off the file), which is not John sending his disciples from prison.
- Moved that fresco to `galilee` (4:12–17), whose first verse is "when Jesus had heard that
  John was cast into prison" — the event the fresco depicts. Kept as tier b: it shows the
  occasion of the passage, not Jesus' preaching.
- **Dropped `Christos Didaskon` (Christ the Teacher) entirely.** It was the last generic image
  in the set, holding 4:12–17 only because nothing better was there. Now nothing is.
- Confirmed the owner's second flag is **not** an error: the withered hand (12:9–14) sits
  inside the `Lord of the Sabbath` pericope (12:1–21). Recorded in Gotchas so it is not
  "corrected" later.
- Swept all 57 placements for the same class of error by comparing icon name to passage name;
  the other divergences are synonyms (Theophany/Baptism, Tree of Jesse/Genealogy, Agony in the
  Garden/Prayer in Gethsemane).

**Verified**
- Playwright: 57 images, **0 broken**, console clean, no horizontal scroll, 7 tier-b notes.
  `galilee` shows the Forerunner fresco, `johnq` has no image, and `Christos Didaskon` no
  longer appears anywhere in the page. `make check`: a:50 b:7 c:61, 57 images / 57 passages.
  Page 8.28 MB → **8.14 MB**.

**Next**
- Unchanged. Positioned markers for the 57 icons (15 done) is the top item.
