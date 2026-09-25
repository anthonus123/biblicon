// Passage types, key verses and type-icon declarations for the Gospel of Luke. `keyVerse` pulls
// the KJV text automatically. Tier is declared, not counted: `tierB` marks the passages whose
// icon is the one the Church attaches to them without depicting their verses.
//
// Only the passages that have an icon are listed. A tier-c passage of Luke has no card and no
// opener, so `app.js` never reaches `p.type` or `p.keyText` for it — checked against the four
// call sites (app.js:176, :209, :297, :312), all of which sit inside `card()` or
// `renderDrawer()`. Entries for the other 104 passages would be dead weight in a hand-edited
// literal that `make check` already guards for duplicate keys because a duplicate once cost a
// session's corrections.
//
// Key verses lean on what only Luke says, where he says something only he says: the soldiers at
// the Jordan, the tiling of the roof, the angel in the garden, the Lord turning to look upon
// Peter, the thief promised paradise, and "Why seek ye the living among the dead?"
//
// `story` retells the passage's own verses — it adds nothing the text does not say, keeps KJV
// spelling (`shewed`, not `shown`) and curly apostrophes, and folds KJV clauses in without
// quotation marks, the same convention Matthew's and John's own `story` fields use. Check every
// batch with `BOOK=luke node src/tools/story_check.js` before commit, then read every "so",
// "that" or "because" the story adds and every quoted speech whose pronouns changed by eye
// against the printed verses — the script catches invented vocabulary, not an invented relation
// between two words that are both already in the text.
module.exports={

 // ---- the six type icons ----
 // The Angel of the Desert is the Church's icon of the Forerunner himself — winged, with his
 // own severed head already in the charger — not a scene from these verses. Mark declares the
 // same file tierB at 1:2-8.
 forerunnerpreach:{tierB:true,type:'Prophet',keyVerse:4,
  story:"In the fifteenth year of the reign of Tiberius Caesar, Pontius Pilate being governor of Judaea and Herod being tetrarch of Galilee, the word of God came unto John the son of Zacharias in the wilderness. He came into all the country about Jordan, preaching the baptism of repentance for the remission of sins, as it is written in the book of the words of Esaias the prophet: The voice of one crying in the wilderness, Prepare ye the way of the Lord, make his paths straight. Every valley shall be filled, and every mountain and hill shall be brought low, and the crooked shall be made straight, and the rough ways shall be made smooth; and all flesh shall see the salvation of God."},
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
 // St Luke's own icon, shown with his symbol the ox — not a picture of the prologue's four
 // verses. Harvested 2026-09-25c, the bonus find alongside the Feast-cycle harvest.
 prologue:{tierB:true,type:'Event',keyVerse:3,
  story:"Luke opens by naming his purpose. Many had already taken in hand to set forth in order a declaration of the things most surely believed among us, as the eyewitnesses and ministers of the word had delivered them; having himself had perfect understanding of all things from the very first, he too determined to write in order for the most excellent Theophilus, that Theophilus might know the certainty of the things wherein he had already been instructed."},

 // ---- chapter 1 ----
 zacharias:{type:'Event',keyVerse:13,
  story:"Zacharias, a priest of the course of Abia, and his wife Elisabeth, both righteous before God, were old and had no child. As he burned incense in the temple an angel of the Lord appeared beside the altar and told him, Fear not: thy prayer is heard, and thy wife Elisabeth shall bear thee a son, and thou shalt call his name John — a son who shall be great in the sight of the Lord, filled with the Holy Ghost even from his mother’s womb, and who shall go before him in the spirit and power of Elias, to turn the hearts of the fathers to the children. Zacharias asked a sign, Whereby shall I know this? for I am an old man; the angel answered, I am Gabriel, that stand in the presence of God, and told him he should be dumb, and not able to speak, until the day that these things should be performed, because he believed not. He came out of the temple unable to speak, and when the days of his ministration were ended he departed to his own house; after those days Elisabeth conceived, and hid herself five months, saying, Thus hath the Lord dealt with me, to take away my reproach among men."},
 annunciation:{type:'Feast',keyVerse:38,
  story:"In the sixth month the angel Gabriel was sent from God to Nazareth, to a virgin espoused to Joseph of the house of David, named Mary. Hail, thou that art highly favoured, the Lord is with thee, he said, and she was troubled at the saying. Fear not, Mary, he told her: thou shalt conceive in thy womb and bring forth a son, and shalt call his name JESUS; he shall be great, and shall be called the Son of the Highest, and of his kingdom there shall be no end. How shall this be, seeing I know not a man? she asked, and he answered, The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee; therefore that holy thing which shall be born of thee shall be called the Son of God — and he told her that her cousin Elisabeth, called barren, had herself conceived in her old age, for with God nothing shall be impossible. Mary answered, Behold the handmaid of the Lord; be it unto me according to thy word, and the angel departed from her."},
 visitation:{type:'Event',keyVerse:42,
  story:"Mary arose and went with haste into the hill country of Juda, to the house of Zacharias, and saluted Elisabeth. At the sound of her voice the babe leaped in Elisabeth’s womb, and Elisabeth, filled with the Holy Ghost, cried out with a loud voice, Blessed art thou among women, and blessed is the fruit of thy womb — and whence is this to me, that the mother of my Lord should come to me? As soon as the voice of thy salutation sounded in mine ears, she said, the babe leaped in my womb for joy; and blessed is she that believed, for there shall be a performance of those things which were told her from the Lord."},
 // Luke's own detail, and the one the icon paints beside the birth itself. `type:'Feast'` prints
 // the "Great Feast" ribbon (app.js), and this is not one of the Twelve — but neither are
 // `supper`, `thomas` (John) or `myrrhbearers` (Mark), already typed 'Feast' by earlier sessions,
 // where `beheading` (Matthew, Mark) is typed 'Event' despite having its own fixed feast day. The
 // convention is not perfectly consistent; flagged for the owner rather than changed here.
 forerunnerbirth:{type:'Feast',keyVerse:63,
  story:"When Elisabeth’s full time came she brought forth a son, and her neighbours and cousins rejoiced with her at the great mercy the Lord had shewed her. On the eighth day they came to circumcise the child and would have called him Zacharias after his father, but his mother said, Not so; he shall be called John — though none of her kindred bore that name. They made signs to his father, who asked for a writing table and wrote, His name is John, and they marvelled all; immediately his mouth was opened and his tongue loosed, and he spake, and praised God. Fear came on all that dwelt round about, and the sayings were noised abroad through all the hill country, every hearer laying them up in his heart and asking, What manner of child shall this be!"},

 // ---- chapter 2 ----
 nativity:{type:'Feast',keyVerse:7,
  story:"A decree from Caesar Augustus went out that all the world should be taxed, and Joseph went up from Nazareth in Galilee to Bethlehem, the city of David, because he was of the house and lineage of David, to be taxed with Mary his espoused wife, being great with child. While they were there the days were accomplished that she should be delivered, and she brought forth her firstborn son, wrapped him in swaddling clothes, and laid him in a manger — because there was no room for them in the inn."},
 circumcision:{type:'Feast',keyVerse:21, // same ribbon caveat as forerunnerbirth above
  story:"When eight days were accomplished for the circumcising of the child, his name was called JESUS, the name the angel had given him before he was conceived in the womb."},
 // The Hypapante, one of the Twelve Great Feasts — Symeon's Nunc Dimittis.
 meeting:{type:'Feast',keyVerse:29,
  story:"When the days of Mary’s purification were accomplished according to the law of Moses, they brought the child to Jerusalem, to present him to the Lord, and to offer a sacrifice according to that which is said in the law of the Lord, a pair of turtledoves or two young pigeons. There was a man in Jerusalem, Simeon, just and devout, waiting for the consolation of Israel, to whom it had been revealed by the Holy Ghost that he should not see death before he had seen the Lord’s Christ. Coming by the Spirit into the temple, he took the child up in his arms and blessed God: Lord, now lettest thou thy servant depart in peace, according to thy word: for mine eyes have seen thy salvation, which thou hast prepared before the face of all people; a light to lighten the Gentiles, and the glory of thy people Israel. He blessed Joseph and Mary, and told Mary that this child is set for the fall and rising again of many in Israel, and for a sign which shall be spoken against (yea, a sword shall pierce through thy own soul also), that the thoughts of many hearts may be revealed. Anna, a widowed prophetess of great age who never departed from the temple but served God with fastings and prayers night and day, came in at that instant and gave thanks likewise, speaking of the child to all them that looked for redemption in Jerusalem."},

 // ---- chapter 3 ----
 // The fresco's right-hand group is soldiers in mail, and 3:14 is the only place in the four
 // Gospels where soldiers come to John and ask what they shall do.
 fruits:{type:'Teaching',keyVerse:14,
  story:"To the multitude that came forth to be baptized John said, O generation of vipers, who hath warned you to flee from the wrath to come? Bring forth therefore fruits worthy of repentance, and begin not to say within yourselves, We have Abraham to our father, for God is able of these stones to raise up children unto Abraham; now also the axe is laid unto the root of the trees, and every tree that bringeth not forth good fruit is hewn down and cast into the fire. Asked what they should do, he told the people, He that hath two coats, let him impart to him that hath none, and he that hath meat, let him do likewise; he told the publicans, Exact no more than that which is appointed you; and he told the soldiers, Do violence to no man, neither accuse any falsely, and be content with your wages."},
 baptism:{type:'Feast',keyVerse:22,
  story:"When all the people were baptized, Jesus also being baptized, and praying, the heaven was opened, and the Holy Ghost descended in a bodily shape like a dove upon him, and a voice came from heaven: Thou art my beloved Son; in thee I am well pleased."},

 // ---- chapter 4 ----
 // Luke's own close to the forty days, and his own order: the stones, the kingdoms, the pinnacle.
 temptation:{type:'Event',keyVerse:13,
  story:"Jesus, full of the Holy Ghost, returned from Jordan and was led by the Spirit into the wilderness, forty days tempted of the devil; he did eat nothing in those days, and when they were ended he afterward hungered. If thou be the Son of God, said the devil, command this stone that it be made bread — but Jesus answered, It is written, That man shall not live by bread alone, but by every word of God. Taking him up into an high mountain, the devil shewed him all the kingdoms of the world in a moment of time, and offered him all this power and the glory of them if he would worship him; Jesus answered, Get thee behind me, Satan: for it is written, Thou shalt worship the Lord thy God, and him only shalt thou serve. Then the devil set him on a pinnacle of the temple and said, If thou be the Son of God, cast thyself down from hence, for it is written, He shall give his angels charge over thee, to keep thee; and Jesus answered, It is said, Thou shalt not tempt the Lord thy God. When the devil had ended all the temptation, he departed from him for a season."},
 petersmother:{type:'Miracle',keyVerse:39,
  story:"Jesus arose out of the synagogue and entered into Simon’s house, where Simon’s wife’s mother was taken with a great fever, and they besought him for her. He stood over her, and rebuked the fever, and it left her; immediately she arose and ministered unto them. When the sun was setting, all they that had any sick with divers diseases brought them unto him, and he laid his hands on every one of them and healed them; devils also came out of many, crying out, Thou art Christ the Son of God, but he rebuked them and suffered them not to speak, for they knew that he was Christ."},

 // ---- chapter 5 ----
 draught:{type:'Miracle',keyVerse:11,
  story:"As the people pressed upon him to hear the word of God, Jesus stood by the lake of Gennesaret and saw two ships standing by the lake, the fishermen gone out of them and washing their nets. He entered into Simon’s ship, and prayed him to thrust out a little from the land, and sat down and taught the people out of the ship; when he had left speaking he told Simon, Launch out into the deep, and let down your nets for a draught. Simon answered, Master, we have toiled all the night and taken nothing, nevertheless at thy word I will let down the net — and they inclosed a great multitude of fishes, and their net brake; and they beckoned unto their partners in the other ship, that they should come and help them, and they came, and filled both the ships, so that they began to sink. Simon Peter, astonished, fell down at Jesus’ knees, saying, Depart from me, for I am a sinful man, O Lord; and Jesus told him, Fear not, from henceforth thou shalt catch men. And when they had brought their ships to land, they forsook all, and followed him."},
 leper:{type:'Miracle',keyVerse:13,
  story:"In a certain city was a man full of leprosy who, seeing Jesus, fell on his face and besought him, saying, Lord, if thou wilt, thou canst make me clean. Jesus put forth his hand and touched him, saying, I will: be thou clean — and immediately the leprosy departed from him. He charged him to tell no man, but to go and shew himself to the priest and offer for his cleansing according as Moses commanded, for a testimony unto them; yet so much the more went there a fame abroad of him, and great multitudes came together to hear him and to be healed of their infirmities, and he withdrew himself into the wilderness, and prayed."},
 // The tiling, which is what the Monreale mosaic paints.
 paralytic:{type:'Miracle',keyVerse:19,
  story:"As Jesus taught, with Pharisees and doctors of the law sitting by who had come out of every town of Galilee and Judaea and Jerusalem, and the power of the Lord was present to heal them, men brought in a bed a man taken with a palsy, and sought means to bring him in and lay him before Jesus. Finding no way in because of the multitude, they went upon the housetop and let him down through the tiling with his couch into the midst before Jesus; and when Jesus saw their faith he said, Man, thy sins are forgiven thee. The scribes and Pharisees began to reason, Who is this which speaketh blasphemies? who can forgive sins but God alone? — but Jesus, perceiving their thoughts, asked them, Whether is easier, to say, Thy sins be forgiven thee, or to say, Rise up and walk? and, that they might know that the Son of man hath power upon earth to forgive sins, he said to the man sick of the palsy, Arise, and take up thy couch, and go into thine house. Immediately he rose up before them, took up that whereon he lay, and departed to his own house, glorifying God; and they were all amazed, and glorified God, and were filled with fear, saying, We have seen strange things to day."},

 // ---- chapter 6 ----
 witheredhand:{type:'Miracle',keyVerse:10,
  story:"On another sabbath Jesus entered into the synagogue and taught, and there was a man whose right hand was withered; the scribes and Pharisees watched him, whether he would heal on the sabbath day, that they might find an accusation against him. Knowing their thoughts, he said to the man with the withered hand, Rise up, and stand forth in the midst, and he arose and stood forth. Then Jesus said unto them, I will ask you one thing: is it lawful on the sabbath days to do good, or to do evil? to save life, or to destroy it? and looking round about upon them all, he said to the man, Stretch forth thy hand; and he did so, and his hand was restored whole as the other. But they were filled with madness, and communed one with another what they might do to Jesus."},

 // ---- chapter 7 ----
 centurion:{type:'Miracle',keyVerse:9},

 // ---- chapter 8 ----
 sower:{type:'Parable',keyVerse:11},
 storm:{type:'Miracle',keyVerse:24},
 gadarene:{type:'Miracle',keyVerse:35},
 issueofblood:{type:'Miracle',keyVerse:44},
 jairus:{type:'Miracle',keyVerse:54},

 // ---- chapter 9 ----
 fivethousand:{type:'Miracle',keyVerse:16},
 // Luke alone ties the Transfiguration to prayer: "And as he prayed, the fashion of his
 // countenance was altered."
 transfiguration:{type:'Feast',keyVerse:29},

 // ---- chapter 10 ----
 samaritan:{type:'Parable',keyVerse:34},

 // ---- chapter 11 ----
 // The devil that was dumb — exactly what the Dionysiou fresco is inscribed for.
 beelzebub:{type:'Miracle',keyVerse:14},

 // ---- chapter 17 ----
 tenlepers:{type:'Miracle',keyVerse:14},

 // ---- chapter 18 ----
 publican:{type:'Parable',keyVerse:13},

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
 emmausroad:{type:'Event',keyVerse:17},
 breaking:{type:'Event',keyVerse:35},
 ascension:{type:'Feast',keyVerse:51},
};
