// Passage types, key verses and type-icon declarations for the Gospel of Mark. `keyVerse` pulls
// the KJV text automatically. Tier is declared, not counted: `tierB` marks the four passages
// whose icon is the one the Church attaches to them without depicting their verses.
module.exports={

 // ---- the four type icons ----
 // Mark 1:14 reports the Forerunner's imprisonment in half a verse; the fresco paints the
 // arrest itself, which is the event that half-verse refers to, not the preaching that follows.
 kingdom:{tierB:true,type:'Event',keyVerse:15},
 // The Church identifies Levi the son of Alphaeus with the Apostle Matthew, and these are his
 // own icons, not a picture of the receipt of custom.
 levi:{tierB:true,type:'Event',keyVerse:17},
 // The Synaxis of the Twelve is the feast of the apostles, not the moment of their choosing.
 twelve:{tierB:true,type:'Event',keyVerse:14},
 // Christ standing among the apostles: the Church's image of the sending, not of these verses.
 commission:{tierB:true,type:'Teaching',keyVerse:15},

 // ---- chapter 1 ----
 beginning:{type:'Teaching',keyVerse:1},
 forerunner:{type:'Event',keyVerse:4},
 baptism:{type:'Feast',keyVerse:11},
 temptation:{type:'Event',keyVerse:13},
 fishers:{type:'Event',keyVerse:17},
 authority:{type:'Teaching',keyVerse:22},
 capernaum:{type:'Miracle',keyVerse:27},
 petersmother:{type:'Miracle',keyVerse:31},
 evening:{type:'Miracle',keyVerse:34},
 preaching:{type:'Event',keyVerse:38},
 leper:{type:'Miracle',keyVerse:41},

 // ---- chapter 2 ----
 paralytic:{type:'Miracle',keyVerse:5},
 fasting:{type:'Teaching',keyVerse:22},
 sabbath:{type:'Teaching',keyVerse:27},

 // ---- chapter 3 ----
 witheredhand:{type:'Miracle',keyVerse:5},
 multitudes:{type:'Event',keyVerse:11},
 beside:{type:'Event',keyVerse:21},
 blasphemy:{type:'Teaching',keyVerse:29},
 brethren:{type:'Teaching',keyVerse:35},

 // ---- chapter 4 ----
 sower:{type:'Parable',keyVerse:20},
 candle:{type:'Teaching',keyVerse:22},
 seedgrowing:{type:'Parable',keyVerse:27},
 mustard:{type:'Parable',keyVerse:31},
 storm:{type:'Miracle',keyVerse:39},

 // ---- chapter 5 ----
 gerasene:{type:'Miracle',keyVerse:19},
 issueofblood:{type:'Miracle',keyVerse:34},
 jairus:{type:'Miracle',keyVerse:41},

 // ---- chapter 6 ----
 nazareth:{type:'Event',keyVerse:4},
 sending:{type:'Event',keyVerse:7},
 herod:{type:'Event',keyVerse:16},
 beheading:{type:'Event',keyVerse:27},
 return:{type:'Event',keyVerse:34},
 fivethousand:{type:'Miracle',keyVerse:41},
 water:{type:'Miracle',keyVerse:50},
 gennesaret:{type:'Miracle',keyVerse:56},

 // ---- chapter 7 ----
 tradition:{type:'Teaching',keyVerse:8},
 defile:{type:'Teaching',keyVerse:15},
 syrophoenician:{type:'Miracle',keyVerse:28},
 deafmute:{type:'Miracle',keyVerse:37},

 // ---- chapter 8 ----
 fourthousand:{type:'Miracle',keyVerse:8},
 leaven:{type:'Teaching',keyVerse:15},
 bethsaida:{type:'Miracle',keyVerse:25},
 confession:{type:'Event',keyVerse:29},
 takecross:{type:'Teaching',keyVerse:34},

 // ---- chapter 9 ----
 transfiguration:{type:'Feast',keyVerse:7},
 elias:{type:'Teaching',keyVerse:13},
 dumbspirit:{type:'Miracle',keyVerse:24},
 greatest:{type:'Teaching',keyVerse:35},
 notagainst:{type:'Teaching',keyVerse:40},
 offend:{type:'Teaching',keyVerse:50},

 // ---- chapter 10 ----
 divorce:{type:'Teaching',keyVerse:9},
 children:{type:'Teaching',keyVerse:15},
 richman:{type:'Teaching',keyVerse:27},
 leftall:{type:'Teaching',keyVerse:31},
 foretold:{type:'Teaching',keyVerse:33},
 zebedee:{type:'Teaching',keyVerse:38},
 minister:{type:'Teaching',keyVerse:45},
 bartimaeus:{type:'Miracle',keyVerse:52},

 // ---- chapter 11 ----
 entry:{type:'Feast',keyVerse:9},
 figtree:{type:'Event',keyVerse:14},
 temple:{type:'Event',keyVerse:17},
 faith:{type:'Teaching',keyVerse:24},
 bywhat:{type:'Teaching',keyVerse:33},

 // ---- chapter 12 ----
 vineyard:{type:'Parable',keyVerse:10},
 tribute:{type:'Teaching',keyVerse:17},
 risen:{type:'Teaching',keyVerse:27},
 commandment:{type:'Teaching',keyVerse:30},
 davidson:{type:'Teaching',keyVerse:37},
 scribes:{type:'Teaching',keyVerse:38},
 widowmite:{type:'Event',keyVerse:44},

 // ---- chapter 13 ----
 stones:{type:'Teaching',keyVerse:2},
 sorrows:{type:'Teaching',keyVerse:8},
 persecution:{type:'Teaching',keyVerse:13},
 desolation:{type:'Teaching',keyVerse:20},
 coming:{type:'Teaching',keyVerse:26},
 figparable:{type:'Parable',keyVerse:31},
 watch:{type:'Teaching',keyVerse:37},

 // ---- chapter 14 ----
 plot:{type:'Event',keyVerse:1},
 anointing:{type:'Event',keyVerse:8},
 judas:{type:'Event',keyVerse:11},
 upperroom:{type:'Event',keyVerse:15},
 betrayer:{type:'Event',keyVerse:20},
 supper:{type:'Feast',keyVerse:22},
 denialforetold:{type:'Event',keyVerse:30},
 gethsemane:{type:'Event',keyVerse:36},
 arrest:{type:'Event',keyVerse:46},
 council:{type:'Event',keyVerse:55},
 highpriest:{type:'Event',keyVerse:62},
 denial:{type:'Event',keyVerse:72},

 // ---- chapter 15 ----
 pilate:{type:'Event',keyVerse:2},
 barabbas:{type:'Event',keyVerse:15},
 mocking:{type:'Event',keyVerse:17},
 crucifixion:{type:'Event',keyVerse:25},
 reviled:{type:'Event',keyVerse:32},
 death:{type:'Event',keyVerse:37},
 veil:{type:'Event',keyVerse:39},
 burial:{type:'Event',keyVerse:46},

 // ---- chapter 16 ----
 myrrhbearers:{type:'Feast',keyVerse:6},
 magdalene:{type:'Event',keyVerse:9},
 ascension:{type:'Feast',keyVerse:19},
};
