// Pericope -> the Orthodox icons shown for it. Same rules as the other three books: one
// scene, many icons; the first file is the primary and leads the card. Luke shares the image
// pool with Matthew, Mark and John by the owner's decision of 2026-09-20, so a file here may
// also stand beside their accounts of the same event — but "one icon, one passage" still holds
// inside this reader, and each file was chosen against what the picture shows of LUKE's verses.
//
// The first pass, 2026-09-20b/d, wired the 32 passages the shared pool already covers, plus
// `fruits`. Luke's own material — the Feast cycle no earlier harvest touched because Matthew and
// John do not tell those events — was harvested 2026-09-25c: the two Annunciations, the
// Visitation, the Nativity of the Forerunner, the Circumcision, the Meeting in the Temple, and
// the Ascension are wired below; Emmaus is wired in both its own moments (the road and the
// supper); Christ at twelve years is not (see HANDOFF Gotchas — the one candidate found is
// catalogued as a different feast).
//
// Where Luke's account differs, the file is deliberately NOT reused, and the reasons are in
// HANDOFF by name: no scourging (Luke has Pilate say only "I will therefore chastise him" and
// never reports it carried out), no Pilate washing his hands (Matthew 27:24), no two blind men
// at Jericho where Luke names one, no fig tree (the pool's are the cursing, not Luke's parable),
// no anointing at Bethany for the sinful woman of Luke 7, and no second leper file for the ten.
// `draught` (5:1-11) is NOT the pool's John 21 catch at Tiberias (Monreale, used in John's own
// reader) — it is a fresh find, the Ravenna miracle-cycle panel. It stages Matthew's and Mark's
// simpler calling of Peter and Andrew, not Luke's own longer telling; see the chapter-5 comment
// below and HANDOFF for why it is kept tier a rather than dropped or tierB.
module.exports={

  // ---- chapter 1 ----
  // St Luke's own icon (inscribed ΛΟΥΚΑΣ), shown seated with an ox — his own symbol, not a
  // depiction of these four verses. Bonus find, harvested 2026-09-25c: `assign.js` already
  // named this passage tier b (`prologue`) but no file had ever been wired to it.
  "prologue": [
    "File:051 Saint Luke Icon from Saint Paraskevi Church in Langadas.jpg",
  ],
  // Harvested 2026-09-25c (see HANDOFF): the priest inside the sanctuary at the altar of
  // incense, an angel within the dark recess, the people waiting outside — Luke 1:10-11.
  // Commons' own description confirms it: "Fresco of the Annunciation to Zachariah".
  "zacharias": [
    "File:Evangelismos Zachariou Dionysiou.jpg",
  ],
  // The classic two-figure composition — Gabriel with wings and staff, the Theotokos before a
  // lectern with an open book, her hand raised at "Behold the handmaid of the Lord" (1:38).
  "annunciation": [
    "File:017 Annunciation Icon from Saint Paraskevi Church in Langadas.jpg",
    "File:Annunciation Icon Sinai 12th century.jpg",
  ],
  // Two haloed women embracing under an archway — the Theotokos and St Elisabeth, Luke 1:40.
  "visitation": [
    "File:Visitation 04-18.jpg",
  ],
  // Elisabeth reclining attended by midwives, an infant washed at bottom left, and — at the
  // left of the panel — Zacharias seated, writing. That last detail is Luke's own (1:63), and
  // it is what the Church's icon of this feast always shows beside the birth itself.
  "forerunnerbirth": [
    "File:052 Nativity of Saint John the Baptist Icon from Saint Paraskevi Church in Langadas.jpg",
  ],

  // ---- chapter 2 ----
  // The Nativity icon is mostly Luke's text: the manger, the swaddling clothes, the ox and the
  // ass over the cave, the shepherds on the hillside. All three stand under Matthew 1:18-25 too,
  // where the Evangelist gives the birth in a single verse.
  "nativity": [
    "File:031 Nativity of Jesus Icon from Saint Paraskevi Church in Langadas.jpg",
    "File:12 Nativity of Jesus Icon in Assumption of Mary Church in Agios Vasileios.jpg",
    "File:Nativity Icon Panagia Evraidos Church 19 Century.jpg",
  ],
  // Harvested 2026-09-25c. Both inscribed "Η ΠΕΡΙΤΟΜΗ ΤΟΥ ΧΡΙΣΤΟΥ" — the Circumcision of
  // Christ — a priest at an altar with the child, Mary and Joseph named in the Adam panel's
  // own lettering. That panel's inscription also names a second, unrelated figure, "Ο ΑΓΙΟΣ
  // ΒΑΣΙΛΕΙΟΣ" (St Basil the Great) — his feast falls on the same day, 1 January, and Orthodox
  // panels of this feast often pair the two. A reading must not call him anyone from Luke 2:21.
  "circumcision": [
    "File:039 Circumcision of Jesus Icon from Saint Paraskevi Church in Langadas.jpg",
    "File:02 Circumcision of Jesus Icon from Saint Paraskevi Church in Adam.jpg",
  ],
  // Inscribed "ΗΠΑΠΑΝΤΗ ΤΟΥ ΧΡΙΣΤΟΥ" — the Hypapante, the Church's own name for this feast.
  // Symeon receives the Child under a ciborium; Mary and Joseph flank him.
  "meeting": [
    "File:050 Presentation of Jesus at the Temple Icon from Saint Paraskevi Church in Langadas.jpg",
  ],
  // NOT wired — an open question for the owner, the same shape as `Christos Iomenos Typhlon`
  // and the Bethesda fresco in Matthew's reader. `Kirillo-Belozersky iconostasis 06 - Among
  // doctors.jpg` was drafted here 2026-09-25c on the strength of its composition (a haloed figure
  // enthroned among two ranked groups of elders, which is exactly Luke 2:46's scene) but
  // retracted the same session on finding that the iconostasis's own 24-panel list (the
  // icon-art.info page the credit line points to) catalogues panel 6, in order, as
  // "Преполовение" — Mid-Pentecost, the feast of John 7:14, whose own icon type is
  // conventionally painted the same way. That does not settle which event this particular panel
  // shows, only that the composition alone can't. No other Orthodox icon of Christ at twelve
  // years was found this session; tier c for now, pending the owner's word on whether the
  // resemblance is enough to keep it here with a caveat.

  // ---- chapter 3 ----
  // The Angel of the Desert: the Church's icon of the Forerunner himself, winged, with his own
  // severed head already in the charger. It depicts no part of 3:1-6, so it is declared tierB,
  // as the same file is in Mark.
  "forerunnerpreach": [
    "File:St John the Baptist Late XVII - Early XVIII Cenury St Mary Blonichka Church, Ohris Icon Gallery.jpg",
  ],
  // "The Forerunner teaching the Jews" — and the group on the right of the fresco is SOLDIERS,
  // in mail and helmets, one holding his helmet in both hands. Luke alone brings soldiers to
  // John: "And the soldiers likewise demanded of him, saying, And what shall we do?" (3:14).
  // The elders on the left are the multitude and the publicans of 3:10-13. Not surveyed in the
  // HANDOFF table; found 2026-09-20d while settling which Forerunner file 3:1-6 should carry.
  "fruits": [
    "File:Prodromos Didaskon Ioudaious Dionysiou.jpg",
  ],
  "baptism": [
    "File:Baptism of Christ, Early XIV Century, St Mary Perivleptos Church, Ohrid Icon Gallery.jpg",
    "File:019 Baptism of Jesus Icon from Saint Paraskevi Church in Langadas.jpg",
    "File:03 Baptism of Christ Icon from Saint Paraskevi Church in Adam.jpg",
    "File:0663Ha. Hermitage Museum (Hall 143). Icon of the Epiphany.jpg",
  ],

  // ---- chapter 4 ----
  // Luke gives all three temptations, in his own order — the stones, the kingdoms, the pinnacle.
  "temptation": [
    "File:Christ's temptation (Monreale).jpg",
    "File:Cathedral (Monreale) - Right wing transept - 2nd Temptation of Christ.jpg",
  ],
  "petersmother": [
    "File:Monreale - Jesus heals Simon's mother in law.jpg",
  ],

  // ---- chapter 5 ----
  // The Ravenna miracle-cycle panel, catalogued on Commons as "Miraculous Draught of Fish". NOT
  // the pool's John 21 catch (the Monreale panel used in John's own reader, "Le apparizioni
  // presso il lago di Tiberiade") — this one sits in Sant'Apollinare Nuovo's pre-Passion miracle
  // register with `fivethousand` and `gadarene`. A dedicated source (christianiconography.info)
  // identifies the same mosaic as the Calling of Peter and Andrew, Matthew 4:18-20 / Mark
  // 1:16-18 — a single boat, one net, none of Luke's own longer staging (the second ship, the
  // breaking net, Peter's confession). Kept tier a, like `centurion`, because Luke's Gospel has
  // no other image of the calling — Augustine's own Catena comment on this passage sets Matthew's
  // and Mark's telling beside Luke's own without deciding whether it is one event or two, so the
  // tier a call rests on there being no alternative icon, not on a settled harmonization. The
  // only Orthodox file a title search found
  // for it, 2026-09-22h — category browsing of eight more fresco cycles turned up nothing to
  // search within (most of those category names return zero members; not a thorough check),
  // and free-text Commons searches for "calling of Peter and Andrew" found only Western art.
  "draught": [
    "File:Miraculous catch of fish - Sant'Apollinare Nuovo - Ravenna 2016.jpg",
  ],
  "leper": [
    "File:Christ cleans leper man.jpg",
  ],
  // Luke has the roof too: "they went upon the housetop, and let him down through the tiling
  // with his couch into the midst before Jesus" (5:19), and the Monreale mosaic paints exactly
  // that — two men lifting the tiles, the bed set down at Christ's feet.
  // The HANDOFF survey listed a third file here, `Christos Iomenos Paralyton Dionysiou`. Looked
  // at 2026-09-20d and NOT reused: the fresco paints the five porches and the pool, with the
  // other sick lying under the arcade — that is Bethesda, John 5, not the house at Capernaum.
  // John's reader labels it so; Matthew's, which shows it at 9:1-8, does not (see HANDOFF).
  "paralytic": [
    "File:Monreale - healing of paralytic.jpg",
    "File:Healing of the Paralytic 04-17.jpg",
  ],
  // The Church identifies Levi at the receipt of custom with the Apostle Matthew, and these are
  // his own icons, not a picture of these verses.
  "levi": [
    "File:090 Mathew the Apostle Icon from Saint Paraskevi Church in Langadas.jpg",
    "File:Matthew the Evangelist - icon.jpeg",
  ],

  // ---- chapter 6 ----
  "witheredhand": [
    "File:Iomenos xeran echon cheira Dionysiou.jpg",
  ],
  // The Synaxis of the Twelve is the feast of the apostles, not the night of prayer and the
  // choosing that Luke reports.
  "twelve": [
    "File:Synaxis of the Twelve Apostles by Constantinople master (early 14th c., Pushkin museum).jpg",
    "File:Synaxis of the Twelve Apostles Dimitar Molerov Rila Monastery 1835.jpg",
    "File:The Twelve Apostles, with later gilding, Greek, Late Byzantine, early 1300s, tempera and gold leaf on wood panel - Princeton University Art Museum - DSC06701.jpg",
  ],

  // ---- chapter 7 ----
  "centurion": [
    "File:Iomenos Gon Ekatonarchou Dionysiou.jpg",
  ],

  // ---- chapter 8 ----
  "sower": [
    "File:Representation of the Sower's parable.JPEG",
  ],
  "storm": [
    "File:Hrist utišava buru na moru, manastir Gračanica.jpg",
  ],
  // The SINGULAR demoniac, as for Mark: Luke has "a certain man, which had devils long time"
  // and "Legion: because many devils were entered into him" (8:27, 8:30). The Dionysiou plural
  // fresco is Matthew's two.
  "gadarene": [
    "File:Mosaic of the exorcism of the Gerasene demoniac from the Basilica of Sant'Apollinare Nuovo.jpg",
  ],
  // A woman kneeling at Christ's hem in a crowd of apostles — Luke 8:44. The Dionysiou fresco's
  // own Commons description names the Haemorrhoissa; the Monreale mosaic's own title does.
  // Harvested 2026-09-25c.
  "issueofblood": [
    "File:Haemorrhoissa Dionysiou.jpg",
    "File:Monreale - Healing of the Woman with an Issue of Blood.jpg",
  ],
  "jairus": [
    "File:Daughter of the head of synagogue is resurrected by Christ.jpg",
    "File:Raising of Jairus' daughter 03-19.jpg",
    "File:Tokalı Kilise Raising of daughter of Jairus - 2004 6964.jpg",
  ],

  // ---- chapter 9 ----
  "fivethousand": [
    "File:Evlogesis Pente Arton Dionysiou.jpg",
    "File:Feeding the multitude, Sant'Apollinare Nuovo, Ravenna.jpg",
  ],
  "transfiguration": [
    "File:Transfiguration of Christ Icon Sinai 12th century.jpg",
    "File:Icon of the Transfiguration from Saint Catherine's, Sinai.jpg",
    "File:Icon of transfiguration (Spaso-Preobrazhensky Monastery, Yaroslavl).jpg",
    "File:042 Transfiguration of Jesus Icon from Saint Paraskevi Church in Langadas.jpg",
  ],

  // ---- chapter 10 ----
  // Rossano's own strip-miniature title, "ΠΕΡΙ ΤΟΥ ΕΜΠΕΣΟΝΤΟΣ ΕΙΣ ΤΟΥΣ ΛΗΣΤΑΣ" — "concerning
  // him who fell among thieves" — is Luke 10:30 itself. Harvested 2026-09-25c.
  "samaritan": [
    "File:RossanoGospelsFolio007vGoodSamaritan.jpg",
  ],

  // ---- chapter 11 ----
  // The DUMB demoniac, which is exactly Luke 11:14. Its neighbour in the pool, `Iomenos
  // Daimonizomenon`, is Matthew 12:22 — blind AND dumb, a detail Luke does not give.
  "beelzebub": [
    "File:Christos Iomenos Daimonon Takophon Dionysiou.jpg",
  ],

  // ---- chapter 15 ----
  // The Good Shepherd is the image the Church reads over this parable; neither mosaic paints
  // the ninety and nine left in the wilderness.
  "lostsheep": [
    "File:The Good Shepherd from the Imperial Palace of Constantinople 5th-6th century AD.jpg",
    "File:Ravenna — The Good Shepherd mosaic.jpg",
  ],

  // ---- chapter 17 ----
  // Latin OCCVRRERVNT EI... OSTENDITE VOS SACERDOTIBVS... MVNDATI SVNT — "they met him...
  // shew yourselves to the priests... they were cleansed," Luke 17:12-14 word for word. The
  // clean, well-lit photograph; a second, darker phone photo of the same mosaic was dropped
  // as redundant. Harvested 2026-09-25c.
  "tenlepers": [
    "File:Monreale - Christ cleans ten leper men in Samaria.jpg",
  ],

  // ---- chapter 18 ----
  // Two crops of the same Gračanica fresco: an elder with hands raised at the top of the
  // temple steps (the Pharisee) and a bowed man with hands crossed on his breast below (the
  // publican, "smote upon his breast," 18:13). Harvested 2026-09-25c.
  "publican": [
    "File:The story of the Publican and the Pharisee, under dome, east, GRACANICA 1 090A7601.jpg",
    "File:The story of the Publican and the Pharisee, under dome, east, GRACANICA 4 IMG 8016.jpg",
  ],

  // ---- chapter 19 ----
  "entry": [
    "File:Baiophoros Dionysiou.jpg",
    "File:005 Entry into Jerusalem Icon from Saint Paraskevi Church in Langadas.jpg",
    "File:18 Triumphal entry into Jerusalem Icon from Saint Paraskevi Church in Adam..jpg",
    "File:Entry into Jerusalem (Afon icon).jpg",
  ],
  "temple": [
    "File:Christ banish tradesmen from Temple (Monreale).jpg",
    "File:Rossano Gospels - Cleansing of the Temple.jpg",
  ],

  // ---- chapter 21 ----
  "coming": [
    "File:Second Coming by G.Klontzas (16th c.).jpg",
  ],

  // ---- chapter 22 ----
  "supper": [
    "File:Deipnos Mystikos Dionysiou.jpg",
    "File:05 Last Supper Icon from Saint Paraskevi Church in Adam.jpg",
    "File:Kirillo-Belozersky iconostasis 12 - Last Supper.jpg",
  ],
  // Luke alone has the angel from heaven strengthening him and the sweat as great drops of
  // blood (22:43-44); whether a given fresco paints the angel has to be read off the picture.
  "gethsemane": [
    "File:Gethsemane Dionysiou.jpg",
    "File:Cathedral (Monreale) - Right wing transept - Agony in the Garden.jpg",
    "File:The Lord's prayer in Gethsemane - Stavronikita monastery, Mt Athos - Theophanes of Crete, 16th c..jpg",
  ],
  "arrest": [
    "File:Prodosia Dionysiou.jpg",
    "File:Judas's kiss (Monreale).jpg",
    "File:Kiss of Judas (Church of Saint Nicolas the Orphan).jpg",
  ],
  // Luke alone adds that the Lord turned and looked upon Peter (22:61).
  "denial": [
    "File:Alektor Petrou Dionysiou.jpg",
    "File:Ravenna, sant'apollinare nuovo, int., storie cristologiche, epoca di teodorico 07.1 rinnegamento di pietro.jpg",
  ],
  "council": [
    "File:Krinomenos Christou Dionysiou.jpg",
    "File:Christ before Caiaphas, GRACANICA 1 090A7764.jpg",
  ],

  // ---- chapter 23 ----
  "pilate": [
    "File:Cathedral (Monreale) - Right wing transept - Before Pilate.jpg",
    "File:Pilate judgement (icon).jpg",
  ],
  // Luke alone gives the penitent malefactor his words and the promise of paradise — Luke
  // himself never says which side he hung on; "the right hand" is Bede's own tradition, not
  // the text (see HANDOFF batch 14).
  "crucifixion": [
    "File:Stavrosis Dionysiou.jpg",
    "File:Crucifixion Icon Sinai 12th century.jpg",
    "File:024 Crucifixion of Jesus Icon from Saint Paraskevi Church in Langadas.jpg",
    "File:Double-sided icon - Crucifixion and Hodegetria (9-13th c., Byzantine museum).jpg",
  ],
  // The first is Joseph asking Pilate for the body, which is Luke 23:52 itself.
  "burial": [
    "File:Etesatou Ioseph Somatou Christou.jpg",
    "File:Apokalthelosis Dionysiou.jpg",
    "File:Epitaphios Threnos Dionysiou.jpg",
  ],

  // ---- chapter 24 ----
  // TWO angels, which is Luke 24:4 and John 20:12 — Matthew and Mark give one. The fresco also
  // paints the fallen guard, and the guard is Matthew's alone (27:62-66, 28:4); Luke reports no
  // watch at the sepulchre. Whoever writes the reading must say so and not claim the soldiers
  // for Luke. Matthew shows this file at 28:1-10 and Mark at 16:1-8 already.
  "myrrhbearers": [
    "File:Ide Topos pou Ekato Dionysiou.jpg",
  ],
  // The first of Monreale's own numbered "Apparition" sequence (1 of 4, after the Resurrection —
  // panel 2 is the confirmed `breaking` mosaic below): a haloed, bearded, barefoot Christ with a
  // pilgrim's staff walks beside two travelling companions toward a walled city. Its first line
  // is abbreviated past a confident reading, but the second and third are legible as "...
  // CONFERTIS AD I[N]VICE[M] AM/BVLANTES ... ESTIS TRISTES" — the Vulgate's own words for "ye
  // have one to another, as ye walk, and are sad," Luke 24:17. Found 2026-09-25c on a second pass,
  // by enumerating
  // the mosaic's own Commons category rather than keyword-matching titles — the first pass's
  // keyword search missed it because "Apparition" alone doesn't match `/emmaus/`. Two Prizren
  // "remnants" photographs captioned as this same scene were looked at and NOT used: only one
  // figure is haloed, and nothing there settles whether that figure is meant for Christ.
  "emmausroad": [
    "File:Cathedral (Monreale) - Left wing transept - 1 Apparition.jpg",
  ],
  // The Monreale mosaic's own Latin title settles it: COGNOVERVNT EVM IN FRACTIONE PANIS —
  // "they knew him in breaking of bread," Luke 24:35 exactly. It is the very next panel in the
  // same numbered sequence as `emmausroad` above (2 of 4). The Prizren fresco is damaged
  // (plaster loss at lower left) but the gesture — Christ handing bread to a seated disciple
  // under a canopy — is legible. Harvested 2026-09-25c. Two further panels in Monreale's own
  // sequence (3: the disciples at table after Christ vanishes, Luke 24:32; 4: their return to
  // report to the Eleven, 24:33-34) were found but not wired — this passage already has two
  // icons, and neither adds a scene the other doesn't cover.
  "breaking": [
    "File:Cathedral (Monreale) - Left wing transept - 2 Apparition (Emmaus).jpg",
    "File:The Supper at Emmaus PRIZREN 2 IMG 4853-2.jpg",
  ],
  // Christ standing in the midst of the apostles. Looked at 2026-09-20d: a frontal Christ on a
  // footstool between two ranked groups who carry books, no wounds shown and no detail of these
  // verses — no table, no broiled fish, no fear. It is the Church's image of the risen Lord
  // among his own, so tierB here as in Matthew and Mark.
  "peace": [
    "File:Christos Apostolois Dionysiou.jpg",
  ],
  // The Langadas panel is inscribed Η ΑΝΑΛΗΨΙΣ ΤΟΥ ΧΡΙΣΤΟΥ ("the Ascension of Christ") and begins
  // quoting the angels' own words in Greek, "Ανδρες Γαλιλαίοι, τι εστήκατε εμβλέποντες..." — Acts
  // 1:11, not Luke (the rest of the inscription is not clearly legible). The Monreale mosaic is
  // titled ASCENSIO DOMINI ("the Ascension of the Lord," a title, not a quotation). Christ
  // ascends in a mandorla with the apostles below; the Monreale panel also gives the Theotokos a
  // place at their centre. The two men/angels are Acts 1:10-11's own detail, not Luke's (how many
  // either panel actually paints was not counted here — leave that to the crop when the reading
  // is written). The Theotokos at the Ascension is in neither Luke nor Acts (1:14 puts her in the
  // upper room afterward): that figure is the icon's own developed tradition, not a citation.
  // Luke's own text has Bethany, the lifted hands and the blessing (24:50-51) — a reading must
  // draw the angel(s) from Acts and the Theotokos from tradition, not claim either for Luke's own
  // words, the same caveat `Ide Topos` carries for its fallen guard. Harvested 2026-09-25c.
  "ascension": [
    "File:016 Ascension of Jesus Icon from Saint Paraskevi Church in Langadas.jpg",
    "File:Cathedral (Monreale) - Left wing transept - Ascension.jpg",
  ],
};
