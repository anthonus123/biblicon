// Passage types, key verses and type-icon declarations for the Gospel of Luke. `keyVerse` pulls
// the KJV text automatically. Tier is declared, not counted: `tierB` marks the passages whose
// icon is the one the Church attaches to them without depicting their verses.
//
// Only the passages that have an icon are listed. A tier-c passage of Luke has no card and no
// opener, so `app.js` never reaches `p.type` or `p.keyText` for it — checked against the four
// call sites (app.js:176, :209, :297, :312), all of which sit inside `card()` or
// `renderDrawer()`. Entries for the other 119 passages would be dead weight in a hand-edited
// literal that `make check` already guards for duplicate keys because a duplicate once cost a
// session's corrections.
//
// Key verses lean on what only Luke says, where he says something only he says: the soldiers at
// the Jordan, the tiling of the roof, the angel in the garden, the Lord turning to look upon
// Peter, the thief promised paradise, and "Why seek ye the living among the dead?"
module.exports={

 // ---- the five type icons ----
 // The Angel of the Desert is the Church's icon of the Forerunner himself — winged, with his
 // own severed head already in the charger — not a scene from these verses. Mark declares the
 // same file tierB at 1:2-8.
 forerunnerpreach:{tierB:true,type:'Prophet',keyVerse:4},
 // The Church identifies Levi at the receipt of custom with the Apostle Matthew, and these are
 // his own icons, not a picture of the receipt of custom.
 levi:{tierB:true,type:'Event',keyVerse:32},
 // The Synaxis of the Twelve is the feast of the apostles, not the night of prayer on the
 // mountain and the choosing at daybreak that Luke reports.
 twelve:{tierB:true,type:'Event',keyVerse:13},
 // The Good Shepherd carrying the sheep is the image the Church reads over this parable; neither
 // mosaic paints the ninety and nine left in the wilderness.
 lostsheep:{tierB:true,type:'Parable',keyVerse:5},
 // Looked at 2026-09-20d to settle the question HANDOFF left open. The fresco is a frontal
 // Christ on a footstool between two ranked groups of apostles carrying books, with a generic
 // post-resurrection inscription; no wounds are shown, and none of these verses is in it — no
 // table, no broiled fish, no fear. So it is the Church's image of the risen Lord among his own,
 // tierB here as in Matthew and Mark, and `assign.js` was moved to tier b to agree.
 peace:{tierB:true,type:'Event',keyVerse:39},

 // ---- chapter 2 ----
 nativity:{type:'Feast',keyVerse:7},

 // ---- chapter 3 ----
 // The fresco's right-hand group is soldiers in mail, and 3:14 is the only place in the four
 // Gospels where soldiers come to John and ask what they shall do.
 fruits:{type:'Teaching',keyVerse:14},
 baptism:{type:'Feast',keyVerse:22},

 // ---- chapter 4 ----
 // Luke's own close to the forty days, and his own order: the stones, the kingdoms, the pinnacle.
 temptation:{type:'Event',keyVerse:13},
 petersmother:{type:'Miracle',keyVerse:39},

 // ---- chapter 5 ----
 draught:{type:'Miracle',keyVerse:11},
 leper:{type:'Miracle',keyVerse:13},
 // The tiling, which is what the Monreale mosaic paints.
 paralytic:{type:'Miracle',keyVerse:19},

 // ---- chapter 6 ----
 witheredhand:{type:'Miracle',keyVerse:10},

 // ---- chapter 7 ----
 centurion:{type:'Miracle',keyVerse:9},

 // ---- chapter 8 ----
 sower:{type:'Parable',keyVerse:11},
 storm:{type:'Miracle',keyVerse:24},
 gadarene:{type:'Miracle',keyVerse:35},
 jairus:{type:'Miracle',keyVerse:54},

 // ---- chapter 9 ----
 fivethousand:{type:'Miracle',keyVerse:16},
 // Luke alone ties the Transfiguration to prayer: "And as he prayed, the fashion of his
 // countenance was altered."
 transfiguration:{type:'Feast',keyVerse:29},

 // ---- chapter 11 ----
 // The devil that was dumb — exactly what the Dionysiou fresco is inscribed for.
 beelzebub:{type:'Miracle',keyVerse:14},

 // ---- chapter 19 ----
 entry:{type:'Feast',keyVerse:36},
 temple:{type:'Event',keyVerse:46},

 // ---- chapter 21 ----
 coming:{type:'Teaching',keyVerse:27},

 // ---- chapter 22 ----
 supper:{type:'Feast',keyVerse:19},
 // The angel from heaven strengthening him: Luke alone.
 gethsemane:{type:'Event',keyVerse:43},
 // Luke alone gives the Lord's words to Judas at the kiss.
 arrest:{type:'Event',keyVerse:48},
 // Luke alone has the Lord turn and look upon Peter.
 denial:{type:'Event',keyVerse:61},
 // Luke alone gives Christ this clause of his answer to the council's first question;
 // neither icon paints it, but it is part of the largest block of his own words in either scene.
 council:{type:'Event',keyVerse:68},

 // ---- chapter 23 ----
 // Augustine's own comment on this block says Matthew and Mark affirm the accusing but
 // never give its words, where Luke has laid open the very charges themselves — a clause
 // in this passage that passes the header's own "only Luke says" test.
 pilate:{type:'Event',keyVerse:2},
 // Luke alone gives the thief on the right hand his words and the promise of paradise.
 crucifixion:{type:'Event',keyVerse:43},
 // None of Matthew, Mark or John says Joseph dissented from the council that condemned Christ;
 // only Luke's own parenthesis at 23:51 does.
 burial:{type:'Event',keyVerse:51},

 // ---- chapter 24 ----
 // The two angels of 24:4 speak it, and the Dionysiou fresco paints two where Matthew and Mark
 // give one.
 myrrhbearers:{type:'Event',keyVerse:5},
};
