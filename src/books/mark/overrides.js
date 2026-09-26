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
 twelve:{tierB:true,type:'Event',keyVerse:14,
  story:"He goeth up into a mountain, and calleth unto him whom he would, and they came unto him. He ordained twelve, that they should be with him, and that he might send them forth to preach, and to have power to heal sicknesses, and to cast out devils: Simon he surnamed Peter; and James the son of Zebedee, and John the brother of James, and he surnamed them Boanerges, which is, The sons of thunder; and Andrew, and Philip, and Bartholomew, and Matthew, and Thomas, and James the son of Alphaeus, and Thaddaeus, and Simon the Canaanite, and Judas Iscariot, which also betrayed him: and they went into an house."},
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
 witheredhand:{type:'Miracle',keyVerse:5,
  story:"He entered again into the synagogue, and there was a man there which had a withered hand. They watched him, whether he would heal him on the sabbath day, that they might accuse him. He saith unto the man which had the withered hand, Stand forth. He saith unto them, Is it lawful to do good on the sabbath days, or to do evil? to save life, or to kill? But they held their peace. When he had looked round about on them with anger, being grieved for the hardness of their hearts, he saith unto the man, Stretch forth thine hand. He stretched it out: and his hand was restored whole as the other. The Pharisees went forth, and straightway took counsel with the Herodians against him, how they might destroy him."},
 multitudes:{type:'Event',keyVerse:11},
 beside:{type:'Event',keyVerse:21},
 blasphemy:{type:'Teaching',keyVerse:29},
 brethren:{type:'Teaching',keyVerse:35},

 // ---- chapter 4 ----
 sower:{type:'Parable',keyVerse:20,
  story:"He began again to teach by the sea side, and there was gathered unto him a great multitude, so that he entered into a ship, and sat in the sea, and the whole multitude was by the sea on the land. He taught them many things by parables, and said unto them in his doctrine, Hearken; Behold, there went out a sower to sow: and it came to pass, as he sowed, some fell by the way side, and the fowls of the air came and devoured it up. Some fell on stony ground, where it had not much earth, and immediately it sprang up, because it had no depth of earth; but when the sun was up, it was scorched, and because it had no root, it withered away. Some fell among thorns, and the thorns grew up, and choked it, and it yielded no fruit. Other fell on good ground, and did yield fruit that sprang up and increased, and brought forth, some thirty, and some sixty, and some an hundred. He said unto them, He that hath ears to hear, let him hear. When he was alone, they that were about him with the twelve asked of him the parable. He said unto them, Unto you it is given to know the mystery of the kingdom of God, but unto them that are without, all these things are done in parables, that seeing they may see, and not perceive, and hearing they may hear, and not understand, lest at any time they should be converted, and their sins should be forgiven them. He said unto them, Know ye not this parable? and how then will ye know all parables? The sower soweth the word. These are they by the way side, where the word is sown; but when they have heard, Satan cometh immediately, and taketh away the word that was sown in their hearts. These are they likewise which are sown on stony ground, who, when they have heard the word, immediately receive it with gladness, and have no root in themselves, and so endure but for a time; afterward, when affliction or persecution ariseth for the word’s sake, immediately they are offended. These are they which are sown among thorns, such as hear the word, and the cares of this world, and the deceitfulness of riches, and the lusts of other things entering in, choke the word, and it becometh unfruitful. These are they which are sown on good ground, such as hear the word, and receive it, and bring forth fruit, some thirtyfold, some sixty, and some an hundred."},
 candle:{type:'Teaching',keyVerse:22},
 seedgrowing:{type:'Parable',keyVerse:27},
 mustard:{type:'Parable',keyVerse:31},
 storm:{type:'Miracle',keyVerse:39,
  story:"The same day, when the even was come, he saith unto them, Let us pass over unto the other side. When they had sent away the multitude, they took him even as he was in the ship, and there were also with him other little ships. There arose a great storm of wind, and the waves beat into the ship, so that it was now full. He was in the hinder part of the ship, asleep on a pillow, and they awake him, and say unto him, Master, carest thou not that we perish? He arose, and rebuked the wind, and said unto the sea, Peace, be still. The wind ceased, and there was a great calm. He said unto them, Why are ye so fearful? how is it that ye have no faith? They feared exceedingly, and said one to another, What manner of man is this, that even the wind and the sea obey him?"},

 // ---- chapter 5 ----
 gerasene:{type:'Miracle',keyVerse:19,
  story:"They came over unto the other side of the sea, into the country of the Gadarenes. When he was come out of the ship, immediately there met him out of the tombs a man with an unclean spirit, who had his dwelling among the tombs, and no man could bind him, no, not with chains, because that he had been often bound with fetters and chains, and the chains had been plucked asunder by him, and the fetters broken in pieces; neither could any man tame him. Always, night and day, he was in the mountains, and in the tombs, crying, and cutting himself with stones. But when he saw Jesus afar off, he ran and worshipped him, and cried with a loud voice, and said, What have I to do with thee, Jesus, thou Son of the most high God? I adjure thee by God, that thou torment me not. For he said unto him, Come out of the man, thou unclean spirit. He asked him, What is thy name? And he answered, saying, My name is Legion: for we are many. He besought him much that he would not send them away out of the country. Now there was there nigh unto the mountains a great herd of swine feeding, and all the devils besought him, saying, Send us into the swine, that we may enter into them. Forthwith Jesus gave them leave. The unclean spirits went out, and entered into the swine, and the herd ran violently down a steep place into the sea, (they were about two thousand;) and were choked in the sea. They that fed the swine fled, and told it in the city, and in the country. They went out to see what it was that was done. They come to Jesus, and see him that was possessed with the devil, and had the legion, sitting, and clothed, and in his right mind, and they were afraid. They that saw it told them how it befell to him that was possessed with the devil, and also concerning the swine. They began to pray him to depart out of their coasts. When he was come into the ship, he that had been possessed with the devil prayed him that he might be with him. Howbeit Jesus suffered him not, but saith unto him, Go home to thy friends, and tell them how great things the Lord hath done for thee, and hath had compassion on thee. He departed, and began to publish in Decapolis how great things Jesus had done for him, and all men did marvel."},
 issueofblood:{type:'Miracle',keyVerse:34},
 jairus:{type:'Miracle',keyVerse:41,
  story:"While he yet spake, there came from the ruler of the synagogue’s house certain which said, Thy daughter is dead: why troublest thou the Master any further? As soon as Jesus heard the word that was spoken, he saith unto the ruler of the synagogue, Be not afraid, only believe. He suffered no man to follow him, save Peter, and James, and John the brother of James. He cometh to the house of the ruler of the synagogue, and seeth the tumult, and them that wept and wailed greatly. When he was come in, he saith unto them, Why make ye this ado, and weep? the damsel is not dead, but sleepeth. They laughed him to scorn. But when he had put them all out, he taketh the father and the mother of the damsel, and them that were with him, and entereth in where the damsel was lying. He took the damsel by the hand, and said unto her, Talitha cumi; which is, being interpreted, Damsel, I say unto thee, arise. Straightway the damsel arose, and walked, for she was of the age of twelve years. They were astonished with a great astonishment. He charged them straitly that no man should know it, and commanded that something should be given her to eat."},

 // ---- chapter 6 ----
 nazareth:{type:'Event',keyVerse:4},
 sending:{type:'Event',keyVerse:7},
 herod:{type:'Event',keyVerse:16},
 beheading:{type:'Event',keyVerse:27,
  story:"Herod himself had sent forth and laid hold upon John, and bound him in prison for Herodias’ sake, his brother Philip’s wife, for he had married her. For John had said unto Herod, It is not lawful for thee to have thy brother’s wife. Therefore Herodias had a quarrel against him, and would have killed him, but she could not, for Herod feared John, knowing that he was a just man and an holy, and observed him, and when he heard him, he did many things, and heard him gladly. When a convenient day was come, that Herod on his birthday made a supper to his lords, high captains, and chief estates of Galilee, and when the daughter of the said Herodias came in, and danced, and pleased Herod and them that sat with him, the king said unto the damsel, Ask of me whatsoever thou wilt, and I will give it thee. He sware unto her, Whatsoever thou shalt ask of me, I will give it thee, unto the half of my kingdom. She went forth, and said unto her mother, What shall I ask? And she said, The head of John the Baptist. She came in straightway with haste unto the king, and asked, saying, I will that thou give me by and by in a charger the head of John the Baptist. The king was exceeding sorry, yet for his oath’s sake, and for their sakes which sat with him, he would not reject her. Immediately the king sent an executioner, and commanded his head to be brought, and he went and beheaded him in the prison, and brought his head in a charger, and gave it to the damsel, and the damsel gave it to her mother. When his disciples heard of it, they came and took up his corpse, and laid it in a tomb."},
 return:{type:'Event',keyVerse:34},
 fivethousand:{type:'Miracle',keyVerse:41,
  story:"When the day was now far spent, his disciples came unto him, and said, This is a desert place, and now the time is far passed; send them away, that they may go into the country round about, and into the villages, and buy themselves bread, for they have nothing to eat. He answered and said unto them, Give ye them to eat. They say unto him, Shall we go and buy two hundred pennyworth of bread, and give them to eat? He saith unto them, How many loaves have ye? go and see. When they knew, they say, Five, and two fishes. He commanded them to make all sit down by companies upon the green grass. They sat down in ranks, by hundreds, and by fifties. When he had taken the five loaves and the two fishes, he looked up to heaven, and blessed, and brake the loaves, and gave them to his disciples to set before them, and the two fishes divided he among them all. They did all eat, and were filled. They took up twelve baskets full of the fragments, and of the fishes. They that did eat of the loaves were about five thousand men."},
 water:{type:'Miracle',keyVerse:50},
 gennesaret:{type:'Miracle',keyVerse:56},

 // ---- chapter 7 ----
 tradition:{type:'Teaching',keyVerse:8},
 defile:{type:'Teaching',keyVerse:15},
 syrophoenician:{type:'Miracle',keyVerse:28,
  story:"From thence he arose, and went into the borders of Tyre and Sidon, and entered into an house, and would have no man know it, but he could not be hid. For a certain woman, whose young daughter had an unclean spirit, heard of him, and came and fell at his feet. The woman was a Greek, a Syrophenician by nation, and she besought him that he would cast forth the devil out of her daughter. But Jesus said unto her, Let the children first be filled: for it is not meet to take the children’s bread, and to cast it unto the dogs. She answered and said unto him, Yes, Lord: yet the dogs under the table eat of the children’s crumbs. He said unto her, For this saying go thy way; the devil is gone out of thy daughter. When she was come to her house, she found the devil gone out, and her daughter laid upon the bed."},
 deafmute:{type:'Miracle',keyVerse:37},

 // ---- chapter 8 ----
 fourthousand:{type:'Miracle',keyVerse:8,
  story:"In those days the multitude being very great, and having nothing to eat, Jesus called his disciples unto him, and saith unto them, I have compassion on the multitude, because they have now been with me three days, and have nothing to eat: and if I send them away fasting to their own houses, they will faint by the way: for divers of them came from far. His disciples answered him, From whence can a man satisfy these men with bread here in the wilderness? He asked them, How many loaves have ye? And they said, Seven. He commanded the people to sit down on the ground, and he took the seven loaves, and gave thanks, and brake, and gave to his disciples to set before them, and they did set them before the people. They had a few small fishes, and he blessed, and commanded to set them also before them. So they did eat, and were filled, and they took up of the broken meat that was left seven baskets. They that had eaten were about four thousand, and he sent them away."},
 leaven:{type:'Teaching',keyVerse:15},
 bethsaida:{type:'Miracle',keyVerse:25},
 confession:{type:'Event',keyVerse:29},
 takecross:{type:'Teaching',keyVerse:34},

 // ---- chapter 9 ----
 transfiguration:{type:'Feast',keyVerse:7,
  story:"He said unto them, Verily I say unto you, That there be some of them that stand here, which shall not taste of death, till they have seen the kingdom of God come with power. After six days Jesus taketh with him Peter, and James, and John, and leadeth them up into an high mountain apart by themselves, and he was transfigured before them. His raiment became shining, exceeding white as snow, so as no fuller on earth can white them. There appeared unto them Elias with Moses, and they were talking with Jesus. Peter answered and said to Jesus, Master, it is good for us to be here: and let us make three tabernacles; one for thee, and one for Moses, and one for Elias. For he wist not what to say, for they were sore afraid. There was a cloud that overshadowed them, and a voice came out of the cloud, saying, This is my beloved Son: hear him. Suddenly, when they had looked round about, they saw no man any more, save Jesus only with themselves."},
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
 entry:{type:'Feast',keyVerse:9,
  story:"When they came nigh to Jerusalem, unto Bethphage and Bethany, at the mount of Olives, he sendeth forth two of his disciples, and saith unto them, Go your way into the village over against you: and as soon as ye be entered into it, ye shall find a colt tied, whereon never man sat; loose him, and bring him. And if any man say unto you, Why do ye this? say ye that the Lord hath need of him, and straightway he will send him hither. They went their way, and found the colt tied by the door without in a place where two ways met, and they loose him. Certain of them that stood there said unto them, What do ye, loosing the colt? They said unto them even as Jesus had commanded, and they let them go. They brought the colt to Jesus, and cast their garments on him, and he sat upon him. Many spread their garments in the way, and others cut down branches off the trees, and strawed them in the way. They that went before, and they that followed, cried, saying, Hosanna; Blessed is he that cometh in the name of the Lord: Blessed be the kingdom of our father David, that cometh in the name of the Lord: Hosanna in the highest."},
 figtree:{type:'Event',keyVerse:14,
  story:"Jesus entered into Jerusalem, and into the temple, and when he had looked round about upon all things, and now the eventide was come, he went out unto Bethany with the twelve. On the morrow, when they were come from Bethany, he was hungry, and seeing a fig tree afar off having leaves, he came, if haply he might find any thing thereon, and when he came to it, he found nothing but leaves; for the time of figs was not yet. Jesus answered and said unto it, No man eat fruit of thee hereafter for ever. His disciples heard it."},
 temple:{type:'Event',keyVerse:17,
  story:"They come to Jerusalem, and Jesus went into the temple, and began to cast out them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, and would not suffer that any man should carry any vessel through the temple. He taught, saying unto them, Is it not written, My house shall be called of all nations the house of prayer? but ye have made it a den of thieves. The scribes and chief priests heard it, and sought how they might destroy him, for they feared him, because all the people was astonished at his doctrine."},
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
 coming:{type:'Teaching',keyVerse:26,
  story:"Then if any man shall say to you, Lo, here is Christ; or, lo, he is there; believe him not. For false Christs and false prophets shall rise, and shall shew signs and wonders, to seduce, if it were possible, even the elect. But take ye heed: behold, I have foretold you all things. But in those days, after that tribulation, the sun shall be darkened, and the moon shall not give her light, and the stars of heaven shall fall, and the powers that are in heaven shall be shaken. Then shall they see the Son of man coming in the clouds with great power and glory. And then shall he send his angels, and shall gather together his elect from the four winds, from the uttermost part of the earth to the uttermost part of heaven."},
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
