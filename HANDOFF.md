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
- **Deliverable:** `Matthew Reader.html` — a single self-contained file (~17.3 MB). Fonts,
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
  *Deciphering the Icon* (numbered hotspot markers over the icon). Since 2026-08-20i a
  passage may show **several icons of its own scene**: a thumbnail strip under the drawer
  image and under the "Icons lead" plate switches between them, and the credit line, the
  prose reading and the positioned markers all follow the icon selected.
- **Content, as of 2026-08-20i:**
  - **118 passages**, all 28 chapters. Tiers: **51 (a)**, **6 (b)**, **61 (c)**.
    **57 have an icon, and they show 114 icons between them** — no image is used under two
    passages. **32 of those 57 show more than one icon of their own scene** (the Theophany
    has four, the Burial four, the Crucifixion four); the other 25 have one because no
    second Orthodox image of that scene was found. The remaining 61 passages render as
    plain verse rows because no Orthodox icon of them exists.
  - **87 of the 114 icons have positioned hotspot markers**, 440 markers in all: 14 live sets
    in `hotspots.js` (a 15th is on a retired image) and 73 in `hotspots3.js`. The 27 without
    are **the Passion icons, Matthew 26:6 to 27:66** — chapters 1–25 are done and so is
    chapter 28; the pass stopped at the Anointing at Bethany and resumed after the tomb. **All 114 have a prose reading** — `make check` hard-fails on an
    icon with no label, and reports how many would show an empty "Deciphering the Icon" tab.
    **46 passages** also carry passage-level "Points to notice" (inherited from the
    owner's original 46 entries).
  - **354 patristic quotations, every one verbatim** from the *Catena Aurea* on Matthew
    (Oxford 1842, public domain). Chrysostom on 115 of 118 passages, then Jerome,
    Augustine, Hilary, Leo, Ambrose, Cyril of Alexandria, Bede, Cassian, Chrysologus,
    Cyprian, John of Damascus. **Nothing paraphrased, nothing invented.**
- **Tier system.** Tier is a property of the **passage**, not of an image: every icon a
  passage shows is of that passage's own scene, so a second or third one cannot change the
  tier. The owner's rule of 2026-08-20 (*no reuse; if there is no relevant icon, remove it
  altogether*) still holds in the form **one image, one passage** — what changed on
  2026-08-20i is that one passage may hold several images.
  - **a** — an Orthodox icon of *this* scene, shown for this passage only. 51.
  - **b** — a **type icon**: the image the Church attaches to the passage without depicting its
    verses. The card and drawer say so: *"This is the icon the Church attaches to this passage;
    it is not a depiction of these verses."* Exactly 6, each declared `tierB` in `overrides.js`:
    `galilee` (the Forerunner dragged to prison, the event 4:12 reports), `matthew` (the apostle's own
    icon at his calling), `twelve` (the Synaxis at the sending), `signjonah12` (Jonah at the
    sign of Jonah), `lostsheep` (the Good Shepherd), `commission` (Christ manifest among the
    apostles). `olivet` became tier a when it got a real Second Coming icon.
  - **c** — no icon; the passage is a plain verse row. 61, and that is the honest number.
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

1. **Positioned hotspot markers for the 27 icons of the Passion — Matthew 26:6 to 27:66.**
   Chapters 1–25 have them and so does chapter 28; only this stretch is missing. The 12 passages affected are listed in session 2026-08-21. Method that works:
   `src/tools/grid.py` overlays a 10% coordinate grid on `src/img/<key>.webp` — read the
   coordinates straight off the overlay, then write `[label, text, "top%", "left%"]` into
   `hotspots3.js`. Do **not** guess coordinates from a thumbnail; markers land on empty sky.
   To *check* placements afterwards, draw the stored coordinates back onto the icons and
   montage them 9-up: an overlay sheet reads in one glance and is how the Sinai Last
   Judgment error below was caught.
2. **The shared-fallback problem — searched 2026-08-20b, and the answer is mostly "no icon
   exists".** **35** passages (not ~20) share `Christos Didaskon Dionysiou` and **11** share
   `Christos Apostolois Dionysiou`: 46 of 116, 40% of the reader, on two images. A second
   independent search found no Orthodox image for any of the 15 subjects `assign.js` names —
   see Gotchas. Resolved 2026-08-20d/e: no reuse at all, and the
   60 passages with no icon of their own now render as plain verse rows.
3. **More icons of the scenes that still have only one.** 25 of the 57 illustrated passages
   still show a single icon. The ones where a second almost certainly exists but was not
   found this pass: the stilling of the storm, the centurion, Peter's mother-in-law, the
   cleansing of the leper, the two blind men, the dumb man, the withered hand, the Canaanite
   woman, walking on the water, the Sermon on the Mount. Method that worked is in Gotchas.
4. **Mobile.** The layout is desktop-only by decision: a fixed 284px rail plus a 240px
   icon column. There is no responsive breakpoint at all yet.

Note: the working tree carries uncommitted work — the full-size lightbox, the fix to the
hotspot markers described in session 2026-08-20h, and the whole of the multi-icon gallery
work of 2026-08-20i. Nothing of it is committed yet.

## Gotchas (learned)

- **To find more icons of a scene you already have, seed the search from the file you already
  trust.** Free-text search returns Western art and guessed category names mostly do not
  exist. What works: `prop=categories` on each file already in `pick_keys.json`, then
  `catMembers` on the subject categories that come back — a verified Theophany fresco sits in
  precisely the categories where more Theophany icons live. That bootstrapped 56 known-good
  files into a pool of 44,000 candidates on 2026-08-20i. `catSearch` on a programme name
  ("Life of Christ mosaics") also surfaces cycles you would never guess: that is how
  *Miracles and Teachings of Christ mosaics in Sant'Apollinare Nuovo (Ravenna)* and
  *Palatine chapel (Palermo) - Life of Christ mosaics* were found.
- **Grepping a pool for a place name undercounts a cycle badly.** The Ferapontov frescoes are
  titled `Fig tree cursed 04-16.jpg`, `Ten virgins 05-15.jpg` — no place name anywhere in the
  title. Probing the pool for "Ferapontov" returned 8 files; the category itself holds 39, and
  it is one of the very few Orthodox programmes that paints parables. Enumerate the category,
  never grep the titles.
- **`upload.wikimedia.org` rate-limits into 429s, and a 429 is not a dead candidate.** A first
  pass fetching 177 thumbnails got 21 files and 156 "failures". With `Retry-After` honoured and
  an exponential backoff (6 attempts, ~1.5s growing), the same list returned 172 of 172. Never
  record a 429 as "no such image".
- **A title that names the right feast can still name the wrong person.**
  `049 Saint John the Baptist Icon 2 ... Langadas` is inscribed ΙΩΑΝΗC ο Βαγγελιστής and shows
  an old man writing with Prochoros beside him — St John the **Evangelist**, not the
  Forerunner. `Matthew the Evangelist.jpg` has a Commons description reading "Saint Mathias".
  Both were caught only by looking at the picture at full size after they had passed the
  contact sheet. Two-stage review works: 400px contact sheets to throw out the obvious
  Western art, then 700px for anything you are about to wire up.
- **Coptic and Armenian images are not Eastern Orthodox.** `Baptism (coptic icon)` and the
  T'oros Roslin Gospels are Oriental Orthodox; they were dropped on those grounds, and the
  same rule should hold next time they surface — which they will, because they match every
  keyword.
- **A second icon may not change the passage's tier, and that rules out the obvious padding.**
  The Anastasis (the Descent into Hades) is the Church's icon *of* the Resurrection, not a
  picture of Matthew 28:1–10, so the three Anastasis panels found for `resurrection` were
  dropped rather than set beside the myrrhbearers at the tomb. Likewise a second and third
  Christ Pantokrator beside `yoke` is padding, not a second reading of a scene — and the two
  generic-Christ files that commits `982bc5e` and `e283f96` deliberately removed must not come
  back in through the gallery door.

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
- **A source file missing from the Makefile's `SOURCES` ships a stale reader in silence.**
  `src/hotspots3.js` was added on 2026-08-20i but never listed, so `$(DATA)` did not rebuild
  when it changed and the 18,080,873-byte reader on disk was a build behind its own sources —
  no error, nothing in `git status` to say so, and `make` printing "wrote … 114 images" as
  usual. Fixed 2026-08-21. **Every file `assemble.js` requires must appear in `SOURCES`.**
- **A green `make check` says nothing about whether a marker is on the right thing.** It
  validates that coordinates parse and fall in 0–100; it cannot see that "Christ in judgment"
  is sitting on an apostle. Only drawing the stored coordinates back onto the picture does.
- **The HTML is ~17.3 MB and regenerated wholesale**, so every commit that touches it adds
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
- **`img.complete` / `naturalWidth` is NOT a broken-image check on this page.** Every icon
  carries `loading="lazy"`, so any image below the fold reports `naturalWidth === 0` whether it
  is fine or not — two freshly added icons looked "broken" this way and decoded perfectly when
  forced. Verify by constructing `new Image()` per `src` and awaiting `onload`/`onerror`;
  that is the only count worth quoting.
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

## Session 2026-08-20g (two better icons, both at the owner's prompting)

**Did**
- **Mt 24:1–51, the Second Coming.** Was a Gračanica Christ bust — an architectural photograph
  with neighbouring frescoes and a dark ledge intruding at the edges, cropped from the narthex
  Last Judgment. Replaced with **Georgios Klontzas' *Second Coming*, Crete, late 16th c.**
  (2705×3605, public domain): the full Deutera Parousia — Christ in the mandorla with the
  Deesis, the Hetoimasia and the cross, the apostles enthroned, the river of fire running the
  height of the panel into the mouth of hell, the earth and sea giving up their dead. Now
  **tier a**: it depicts what 24:30–31 proclaims, so it is no longer a type icon.
- **Mt 21:12–17, the Cleansing of the Temple.** The Rossano miniature was authentic
  (ΠΕΡΙ ΤΩΝ ΕΚΒΛΗΘΕΝΤΩΝ ΕΚ ΤΟΥ ΙΕΡΟΥ) but the scene fills only the top third of the leaf; the
  rest is prophets and text columns. Replaced with the **Monreale mosaic**, Christ with the
  scourge overturning the table, coins scattered, the sellers drawing back with oxen, sheep and
  a cage of doves. Two Commons files show this mosaic; took the brighter, tighter crop.
- Both new images: metadata pulled from Commons into `image_meta.json`, key = md5(title)[0:12]
  per the existing convention, 660px WebP, label, and a prose reading in `hotspots2.js`.

**Verified**
- Playwright: **57 of 57 images decode** (forced decode — see the new Gotcha; the lazy-loading
  trap made two good icons look broken), console clean, no horizontal scroll, 6 tier-b notes.
  The Klontzas credit line renders with artist, date and licence, and its reading shows under
  *Deciphering the Icon*. `make check`: a:51 b:6 c:61, 57 images / 57 passages, one each.
- Page 8.14 MB → **8.54 MB**; the two replacements are larger files than what they displaced.

**Next**
- Unchanged. Nine files now sit unused in `src/img/` (the displaced Gračanica bust and Rossano
  leaf among them); they are left in place, not deleted.

---

## Session 2026-08-20h (the marker-click scroll, reported by the owner)

**Did**
- The owner reported: open an icon → *Deciphering the Icon* → click marker **4** on the
  Genealogy (that marker is "The prophets with scrolls") and the panel **jumps back to the
  top** instead of going down to that entry. Two separate faults, one already fixed:
  1. **The jump to the top.** At `HEAD` (995efe8) the marker handler was
     `onclick:function(){state.hot=i+1;renderDrawer();}`, and `renderDrawer` begins
     `scrim.innerHTML=''` — every click destroyed the `.drawer` node and built a new one, so
     `scrollTop` went to 0. That is the reported symptom exactly. The uncommitted work already
     in the tree replaces it with `selectHot()`, which only flips `aria-current` on the markers
     and rows. **The fix was on disk and in the built HTML before this session started, so what
     the owner was looking at was a page loaded before the rebuild — a reload cures it.**
  2. **The alignment was wrong anyway,** and this *was* reproduced. `alignInDrawer` pinned the
     row 96px below the top of the panel; at 2560×1400 the drawer's maximum scroll is 1232 and
     the four targets are 1609/1737/1865/1992, so **all four markers clamped to the same
     position** — the end of the panel — and carried the icon (1115–1690) off the top with them.
     Replaced with minimal scrolling: leave it alone if the row is already fully visible, else
     move just far enough to uncover it (bottom-align below, top-align above, 16px margin).
- Only `alignInDrawer` changed. Row clicks in the list stay highlight-only (`align=false`) on
  purpose — yanking the panel under someone who is reading a row would be a new annoyance.

**Verified**
- Playwright against the rebuilt page. 2560×1400, marker 4: `scrollTop` 824 (was 1232), the icon
  fully on screen at 292–867 and row 4 fully on screen at 1264–1384. 1850×910, starting from the
  reader looking at the icon (`scrollTop` 1150): markers 1 and 2 don't move at all (their rows are
  already visible), 3 moves 36px, 4 moves 164px — each row ends fully in view, against 1722 (the
  end of the panel) for all four before. `make` rebuilds clean, `src/app.js` embeds verbatim.

**Next**
- Unchanged. This change is **unstaged and uncommitted** along with the lightbox work it sits on.

## Session 2026-08-20i (several icons of one scene)

**Did.** The owner asked for more than one icon per scene — "I'm sure you can find different
icons of baptism of Christ ... please look deeply." A passage can now carry a gallery.

- **Data.** `picks.js` values are a file *or a list of files*; the first is the primary.
  `assemble.js` emits `imgs:[...]` alongside `img` (the primary) and collects every variant
  into the `shown` set so `build.js` embeds them. `check.js` keeps the invariant that matters —
  an image belongs to exactly one passage — and adds: no duplicate inside a passage's own
  gallery, primary must be `imgs[0]`, and a **hard fail** on an icon with no label.
- **UI** (`app.js`, `page.css`). A thumbnail strip appears under the drawer image and under the
  "Icons lead" plate, only where a passage really has more than one icon. Selecting one swaps
  the picture, the credit line, the prose reading and the positioned markers, and the choice is
  remembered per passage in `state.pick` so the plate, the drawer and the full-size view agree.
  The full-size view gained ‹ › arrows and Left/Right keys across the icons of one scene. The
  small text-mode card gets a "3 icons" badge instead of a strip — it is itself a `<button>`,
  and a button inside a button does not work.
- **Icons.** 57 new ones, taking the reader from 57 to **114 images over the same 57 passages**;
  32 passages now show a gallery. Sources: the Langadas / Adam / Agios Vasileios Greek village
  collections, Ferapontov (Dionisy, 1502), Sant'Apollinare Nuovo, the Palatine Chapel and
  Monreale, Sinai, Chora, Nerezi, Mileševa, Gračanica, Gelati, Rila, the Hermitage and the
  Kirillo-Belozersky iconostasis. Four files earlier sessions had downloaded and left unused
  (`Rossano Gospels - Cleansing of the Temple`, `Christ before Caiaphas` and the Last Judgment
  Christ from Gračanica, the Princeton Twelve Apostles) now have a home as second icons.
- **Words.** Every one of the 58 carries a `labels.js` name and a `hotspots2.js` reading of two
  to four sentences saying where and when it was made and **what it does differently** from the
  icon it stands beside. All 115 icons in the reader now have a reading.
- **Rejected, on purpose.** The Gračanica narthex Christ — its file is titled "last judgment"
  and it is indeed the Christ of the Dread Judgment, but the frame holds a half-figure with an
  open book and nothing of the judgment itself, which makes it the same kind of image as the
  Pantokratoros rejected below. Three Anastasis panels (the Church's icon of the Resurrection, not
  Matthew 28:1–10); extra Pantokratoros for `yoke`; a Coptic Baptism and an Armenian Gadarene;
  Monreale's ten lepers (Luke 17) under Matthew 8; "Sunday of the Blind Man" and the Siloam
  mosaics (John 9) under Matthew 9; a St John the **Evangelist** mislabelled as the Baptist;
  a "Saint Mathias"; and every Bowyer Bible / MET / NGA engraving the keyword pass dragged in.

**Why.** The owner's stated priority is the icons and the explanation of each icon. One icon
per scene made the reader assert that the Church paints a feast one way; it does not.

**Verified.** `make` → 17.16 MB, 114 images, `make check` green. Served over HTTP and driven in
the browser: 32 strips render; switching an icon moves the picture, credit, reading and markers
together and keeps the drawer's scroll position and the open tab; the Crucifixion's 3 markers
disappear on a variant that has none and come back on return with the highlight in range; the
plate strip swaps in place without re-rendering the stream; the lightbox steps 1→2→3→4→1 by
click and by arrow key and Escape closes it without closing the drawer; **all 114 images decode**
(counted with `new Image()` + `onload`, not `naturalWidth` — see Gotchas); console clean. The
card in the reading stream follows a choice made in the drawer or the full-size view, so all
four views of a passage agree.

**Size.** The page went from 8.96 MB to **17.16 MB**. Variants are encoded at 660px like every
other icon, deliberately: they open in the same "see it at full size" view, and a softer variant
under that promise would be a lie. If the size ever has to come down, the lever is fewer
variants, not smaller ones.

**Also.** `src/tools/` now holds the harvest pipeline (category seeding, pool enumeration,
the backoff fetcher, the encoder) with a README of the method, because `## Next` item 3 asks
for more of exactly this. And `make check` now fails on a duplicate key in `labels.js` or
`hotspots2.js`: bringing back four files that earlier sessions had downloaded and shelved
created three silent duplicate entries, invisible because one copy was single-quoted and the
other double-quoted. The later entry wins, so nothing shipped wrong — but the older text was
dead, and `hotspots2.js` overwriting a `hotspots.js` entry would have wiped its markers.

**Next.** Positioned markers are still only on 14 icons of 114. 25 illustrated passages still
show a single icon — the list of the ones most likely to yield a second is in `## Next`.

## Session 2026-08-21 (full final check — nothing new added, one build bug and three content faults found)

**Did.** The owner asked for a full final check that every element is there and correct. No new
icons, no new markers; this was verification, plus the fixes the verification turned up.

- **The shipped reader was stale, and the Makefile was why.** `src/hotspots3.js` — the file that
  now carries 73 of the 87 marker sets — was never added to `SOURCES`, so `make` did not
  re-derive `icons.json` when it changed. The reader on disk (18,080,873 bytes, 01:38) predated
  the last edit to `hotspots3.js` (06:37) and rebuilt 15,152 bytes larger. The whole of the h3
  marker corpus is ~97 KB of JSON, so what was missing was roughly one editing session's
  increment, not the marker work as a whole — but nothing anywhere said so. `SOURCES` fixed and
  verified: `touch src/hotspots3.js && make` now runs `assemble.js`, and two consecutive `make`
  runs still produce identical bytes.
- **The footer promised an exception it never named.** "The icons and frescoes are, with one
  exception noted below…" — but `build.js` filters `license==='user-supplied'` out of the credit
  list, so the reader-supplied Nativity was simply absent. It is now named in a line after the
  list, with its passage range derived rather than hard-coded.
- **Two icons in one gallery carried the same name.** Both Dionysiou Jonahs at Matthew 12:38–45
  were labelled "The Prophet Jonah — Dionysiou, Athos, 1547"; the strip tooltips read alike and
  only the fine print of the credit differed. The primary is now "Jonah and the Great Fish".
  `make check` gained a guard: identical labels inside one passage's gallery **fail**, identical
  labels across two passages warn. Verified by reverting the label — it fails.
- **`make check` gained the h1∩h2 guard as well.** The existing one catches markers declared in
  both `hotspots.js` and `hotspots3.js`. The same silent overwrite exists between `hotspots.js`
  and `hotspots2.js` (`hotdb[k]={read:h2[k],hot:[]}` replaces the record). Nothing collides
  today; the guard keeps it that way. Verified by probe.

**Verified.** Data: 118 passages, tiers a:51 b:6 c:61, 57 illustrated, 114 icons, 32 galleries,
no image under two passages, 114/114 readings, 87 with markers (440 markers), 46 "Points to
notice", 354 quotations. **All 1071 verses of Matthew are present, contiguous, with no gap or
overlap, and every verse string matches `matthew_kjv.json` exactly.** **All 354 patristic
quotations reproduce byte-for-byte from `catena.json` through `fathers.js` `clean()`** — nothing
paraphrased, nothing invented — and every display name matches the Catena's own attribution
(Chrys.→Chrysostom, Chrysol.→Chrysologus, no crossover); no Pseudo-Chrysostom, Glossa,
Carolingian, Origen or Eusebius leaked through. In the browser over HTTP: 118 rows in text mode
with 57 cards and 32 "N icons" badges; 118 plates in Icons-lead mode with 57 images, 61 plain
rows, 32 strips, 6 tier-b notes, 28 chapter marks; 28 rail chapters, 5 of them reporting "No
icon in this chapter yet", which is exactly the 5 chapters (6, 7, 16, 19, 23) with no icon;
all three drawer tabs; **all 114 images decode** (`new Image()` + `onload`); console clean; no
horizontal page scroll. **The regression surface the multi-icon work never exercised — switching
between two icons that both carry markers — is clean:** the marker set swaps entirely, the
highlight lands back in range, the open tab and the stream card follow. Lightbox steps and wraps
4→1 and closes without closing the drawer.

**Marker placement, checked by eye.** All 87 marker sets were drawn back onto their icons at the
stored coordinates and read as 10 montage sheets. Placement is good: markers labelled for an
inscription sit on the inscription (Monreale's two temptation tituli are correctly told apart —
the devil's words on one band, Christ's answer on the other), Elias and Moses are on the right
figures in all three Transfigurations, the sheep and the goats are on the right sides at Ravenna,
and the root of the Jesse tree is at the root. **One error found in 440 markers**, and it is not
a coordinate slip: on *The Last Judgment — John Tokhabi, Sinai, c. 1100* (the second icon at
Matthew 25:31–46), marker 1 "Christ in judgment" at top 16% / left 72% sits on the **right-hand
bench of enthroned apostles**. The panel has two apostle benches, left and right, and the centre
where Christ would sit is abraded away — there is no Christ figure in the frame. The marker text
("At the top right he sits enthroned with the apostles ranked on either side") and the reading's
opening ("Christ at the top") share the misreading. **Left for the owner**, because the fix is a
rewrite of prose about a damaged 900-year-old panel, not a nudge.

**What this check does *not* establish.** The 114 icon readings were verified to be **present**,
not content-audited: every icon has one, none is a stub. Their prose was not read against the
pictures the way the markers were — and the one reading examined closely, the Sinai Last
Judgment, carried the same misreading as its marker ("Christ at the top" on a panel whose centre
is abraded away). A reading-by-reading audit against the images is still owed.

**Flagged, not changed.**
- **Two quotations given to "St Ambrose of Milan" are cited by the Catena itself as
  *Ambrosiaster*** (Matthew 3:13–17 and 8:28–34), which is not Ambrose but an anonymous
  4th-c. commentator; the page prints "St Ambrose of Milan, Ambrosiaster. Serm. X. 5". A third,
  at Matthew 18:10–14, is "St Bede | ap. Anselm" — Bede as quoted in the *Glossa*, which the
  whitelist otherwise excludes. Same class of call as the Pseudo-Chrysostom exclusion, so the
  owner's to make. 3 of 354.
- **`Mosaic of the exorcism of the Gerasene demoniac` (Sant'Apollinare Nuovo) sits under Matthew
  8:28–34**, where Matthew says *Gadarenes* and *two* men. It is the synoptic parallel of the
  same event, so this is not the Luke-only / John-only borrow the Gotchas forbid — but the label
  says "Gerasene" under a Gadarene passage, which a reader may notice.
- **Three icons are below 400px on their long side** because that is the resolution Commons
  holds: the Rossano Wise and Foolish Virgins (335×213), the Langadas St Matthew (389×506) and
  the reader-supplied Nativity (337×436). They open in the same "see it at full size" view as
  the 660px ones.
- **The 9 orphan files in `src/img/` are all documented decisions**, not leftovers: the Gračanica
  Last Judgment Christ and `Christos Didaskon` (deliberately retired), the Langadas St John the
  **Evangelist** mislabelled as the Baptist, the "Saint Mathias", the Langadas Christ Enthroned,
  the Theotokos Panachranta and a 16th-c. Adoration (never wired up), plus two files
  (`64edfde436b3`, `bd8f72a1b1fe`) that have been unreferenced since the first rebuild at
  `99d8959` and appear in no data file at all.

**Not verified.** Mobile — the layout is still desktop-only by decision, and nothing here changed
that.

**Next.** Markers for the 27 Passion icons (Matthew 26:6–27:66): the Anointing at Bethany, Judas
Agrees to Betray, two of the three Mystical Suppers, Peter's Denial Foretold, all three of the
Agony in the Garden, all three of the Betrayal and Arrest, both Before Caiaphas, both of the End
of Judas, all three Before Pilate, three of the four Crucifixions, three of the four Burials and
all three of the Guard at the Tomb. Then the Sinai Last Judgment marker above.
