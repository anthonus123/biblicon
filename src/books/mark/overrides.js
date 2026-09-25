// Passage types, key verses and type-icon declarations for the Gospel of Mark. `keyVerse` pulls
// the KJV text automatically. Tier is declared, not counted: `tierB` marks the four passages
// whose icon is the one the Church attaches to them without depicting their verses.
//
// `story` retells the passage's own verses — it adds nothing the text does not say, keeps KJV
// spelling and curly apostrophes, and folds KJV clauses in without quotation marks, the same
// convention Matthew's, Luke's and John's own `story` fields use. Written only for the 38
// passages that carry an icon (`make check`'s "with an icon" count) — the other 66 have no card
// and no opener, so `app.js` never reaches a story field for them. Check every batch with
// `BOOK=mark node src/tools/story_check.js` before commit, then read every "so", "that" or
// "because" the story adds and every quoted speech whose pronouns changed by eye against the
// printed verses — the script catches invented vocabulary, not an invented relation between two
// words that are both already in the text.
module.exports={

 // ---- the four type icons ----
 // Mark 1:14 reports the Forerunner's imprisonment in half a verse; the fresco paints the
 // arrest itself, which is the event that half-verse refers to, not the preaching that follows.
 kingdom:{tierB:true,type:'Event',keyVerse:15,
  story:"Now after that John was put in prison, Jesus came into Galilee, preaching the gospel of the kingdom of God, and saying, The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel."},
 // The Church identifies Levi the son of Alphaeus with the Apostle Matthew, and these are his
 // own icons, not a picture of the receipt of custom.
 levi:{tierB:true,type:'Event',keyVerse:17,
  story:"He went forth again by the sea side, and all the multitude resorted unto him, and he taught them. As he passed by, he saw Levi the son of Alphaeus sitting at the receipt of custom, and said unto him, Follow me. And he arose and followed him. It came to pass, that, as Jesus sat at meat in his house, many publicans and sinners sat also together with Jesus and his disciples, for there were many, and they followed him. When the scribes and Pharisees saw him eat with publicans and sinners, they said unto his disciples, How is it that he eateth and drinketh with publicans and sinners? When Jesus heard it, he saith unto them, They that are whole have no need of the physician, but they that are sick: I came not to call the righteous, but sinners to repentance."},
 // The Synaxis of the Twelve is the feast of the apostles, not the moment of their choosing.
 twelve:{tierB:true,type:'Event',keyVerse:14},
 // Christ standing among the apostles: the Church's image of the sending, not of these verses.
 commission:{tierB:true,type:'Teaching',keyVerse:15},

 // ---- chapter 1 ----
 beginning:{type:'Teaching',keyVerse:1},
 // The Angel of the Desert is the Church's icon of the Forerunner himself, not a scene from
 // these verses: it paints him winged, with his own severed head already in the charger.
 forerunner:{tierB:true,type:'Event',keyVerse:4,
  story:"As it is written in the prophets, Behold, I send my messenger before thy face, which shall prepare thy way before thee; the voice of one crying in the wilderness, Prepare ye the way of the Lord, make his paths straight. John did baptize in the wilderness, and preach the baptism of repentance for the remission of sins, and there went out unto him all the land of Judaea, and they of Jerusalem, and were all baptized of him in the river of Jordan, confessing their sins. John was clothed with camel’s hair, and with a girdle of a skin about his loins, and he did eat locusts and wild honey; and he preached, saying, There cometh one mightier than I after me, the latchet of whose shoes I am not worthy to stoop down and unloose. I indeed have baptized you with water: but he shall baptize you with the Holy Ghost."},
 baptism:{type:'Feast',keyVerse:11,
  story:"In those days Jesus came from Nazareth of Galilee, and was baptized of John in Jordan. And straightway coming up out of the water, he saw the heavens opened, and the Spirit like a dove descending upon him; and there came a voice from heaven, saying, Thou art my beloved Son, in whom I am well pleased."},
 temptation:{type:'Event',keyVerse:13,
  story:"Immediately the Spirit driveth him into the wilderness, and he was there in the wilderness forty days, tempted of Satan, and was with the wild beasts; and the angels ministered unto him."},
 fishers:{type:'Event',keyVerse:17},
 authority:{type:'Teaching',keyVerse:22},
 capernaum:{type:'Miracle',keyVerse:27},
 petersmother:{type:'Miracle',keyVerse:31,
  story:"Forthwith, when they were come out of the synagogue, they entered into the house of Simon and Andrew, with James and John. Simon’s wife’s mother lay sick of a fever, and anon they tell him of her; and he came and took her by the hand, and lifted her up, and immediately the fever left her, and she ministered unto them."},
 evening:{type:'Miracle',keyVerse:34},
 preaching:{type:'Event',keyVerse:38},
 leper:{type:'Miracle',keyVerse:41,
  story:"There came a leper to him, beseeching him, and kneeling down to him, and saying unto him, If thou wilt, thou canst make me clean. Jesus, moved with compassion, put forth his hand, and touched him, and saith unto him, I will; be thou clean; and as soon as he had spoken, immediately the leprosy departed from him, and he was cleansed. He straitly charged him, and forthwith sent him away, and saith unto him, See thou say nothing to any man: but go thy way, shew thyself to the priest, and offer for thy cleansing those things which Moses commanded, for a testimony unto them. But he went out, and began to publish it much, and to blaze abroad the matter, insomuch that Jesus could no more openly enter into the city, but was without in desert places: and they came to him from every quarter."},

 // ---- chapter 2 ----
 paralytic:{type:'Miracle',keyVerse:5,
  story:"He entered again into Capernaum after some days, and it was noised that he was in the house; and straightway many were gathered together, insomuch that there was no room to receive them, no, not so much as about the door, and he preached the word unto them. They come unto him, bringing one sick of the palsy, which was borne of four; and when they could not come nigh unto him for the press, they uncovered the roof where he was, and when they had broken it up, they let down the bed wherein the sick of the palsy lay. When Jesus saw their faith, he said unto the sick of the palsy, Son, thy sins be forgiven thee. But there were certain of the scribes sitting there, and reasoning in their hearts, Why doth this man thus speak blasphemies? who can forgive sins but God only? Immediately when Jesus perceived in his spirit that they so reasoned within themselves, he said unto them, Why reason ye these things in your hearts? Whether is it easier to say to the sick of the palsy, Thy sins be forgiven thee, or to say, Arise, and take up thy bed, and walk? But that ye may know that the Son of man hath power on earth to forgive sins, (he saith to the sick of the palsy,) I say unto thee, Arise, and take up thy bed, and go thy way into thine house. Immediately he arose, took up the bed, and went forth before them all, insomuch that they were all amazed, and glorified God, saying, We never saw it on this fashion."},
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
