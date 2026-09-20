// Write src/books/mark/anchors.json. The divisions are the Catena Aurea's own verse blocks
// on Mark (the 1842 Oxford volume groups the text into 105 of them), with four of its
// overlapping pairs resolved and its two-verse pair 2-3/4-8 joined into one preaching of the
// Forerunner. They are the traditional pericopes, so they are also where the Fathers'
// comments sit — which is what fathers.js selects on.
const fs=require('fs');
const kjv=require('../books/mark/kjv.json');

const P=[
[1,[[1,1,'beginning','The Beginning of the Gospel'],
    [2,8,'forerunner','The Preaching of the Forerunner'],
    [9,11,'baptism','The Baptism of Christ'],
    [12,13,'temptation','The Temptation in the Wilderness'],
    [14,15,'kingdom','The Kingdom of God Is at Hand'],
    [16,20,'fishers','The Calling of the Four Fishermen'],
    [21,22,'authority','He Taught as One Having Authority'],
    [23,28,'capernaum','The Unclean Spirit at Capernaum'],
    [29,31,'petersmother','Peter’s Mother-in-Law'],
    [32,34,'evening','The Healings at Evening'],
    [35,39,'preaching','Preaching Throughout Galilee'],
    [40,45,'leper','The Cleansing of the Leper']]],
[2,[[1,12,'paralytic','The Paralytic Borne of Four'],
    [13,17,'levi','The Calling of Levi'],
    [18,22,'fasting','The Question of Fasting'],
    [23,28,'sabbath','Lord of the Sabbath']]],
[3,[[1,6,'witheredhand','The Withered Hand'],
    [7,12,'multitudes','The Multitudes by the Sea'],
    [13,19,'twelve','The Choosing of the Twelve'],
    [20,22,'beside','His Friends and the Scribes'],
    [23,30,'blasphemy','The Sin Against the Holy Ghost'],
    [31,35,'brethren','Who Is My Mother?']]],
[4,[[1,20,'sower','The Parable of the Sower'],
    [21,25,'candle','The Candle and the Measure'],
    [26,29,'seedgrowing','The Seed Growing Secretly'],
    [30,34,'mustard','The Grain of Mustard Seed'],
    [35,41,'storm','The Stilling of the Storm']]],
[5,[[1,20,'gerasene','The Gerasene Demoniac'],
    [21,34,'issueofblood','The Woman with the Issue of Blood'],
    [35,43,'jairus','The Daughter of Jairus']]],
[6,[[1,6,'nazareth','No Prophet in His Own Country'],
    [7,13,'sending','The Sending of the Twelve'],
    [14,16,'herod','Herod Hears of Jesus'],
    [17,29,'beheading','The Beheading of the Forerunner'],
    [30,34,'return','The Return of the Apostles'],
    [35,44,'fivethousand','The Five Thousand Fed'],
    [45,52,'water','Christ Walking on the Sea'],
    [53,56,'gennesaret','The Healings at Gennesaret']]],
[7,[[1,13,'tradition','The Tradition of the Elders'],
    [14,23,'defile','What Defiles a Man'],
    [24,30,'syrophoenician','The Syrophoenician Woman'],
    [31,37,'deafmute','The Deaf and Dumb Man']]],
[8,[[1,9,'fourthousand','The Four Thousand Fed'],
    [10,21,'leaven','The Sign Sought and the Leaven'],
    [22,26,'bethsaida','The Blind Man of Bethsaida'],
    [27,33,'confession','The Confession of Peter'],
    [34,38,'takecross','Whosoever Will Come After Me']]],
[9,[[1,8,'transfiguration','The Transfiguration'],
    [9,13,'elias','Elias Must First Come'],
    [14,29,'dumbspirit','The Boy with a Dumb Spirit'],
    [30,37,'greatest','The Greatest and the Child'],
    [38,42,'notagainst','He That Is Not Against Us'],
    [43,50,'offend','If Thy Hand Offend Thee']]],
[10,[[1,12,'divorce','The Question of Divorce'],
     [13,16,'children','Suffer the Little Children'],
     [17,27,'richman','The Rich Young Man'],
     [28,31,'leftall','They That Have Left All'],
     [32,34,'foretold','The Third Foretelling of the Passion'],
     [35,40,'zebedee','The Sons of Zebedee'],
     [41,45,'minister','Whosoever Will Be Chief'],
     [46,52,'bartimaeus','Blind Bartimaeus']]],
[11,[[1,10,'entry','The Entry into Jerusalem'],
     [11,14,'figtree','The Fig Tree Cursed'],
     [15,18,'temple','The Cleansing of the Temple'],
     [19,26,'faith','Have Faith in God'],
     [27,33,'bywhat','By What Authority?']]],
[12,[[1,12,'vineyard','The Wicked Husbandmen'],
     [13,17,'tribute','Render unto Caesar'],
     [18,27,'risen','The Question of the Resurrection'],
     [28,34,'commandment','The First Commandment'],
     [35,37,'davidson','The Son of David'],
     [38,40,'scribes','Beware of the Scribes'],
     [41,44,'widowmite','The Widow’s Two Mites']]],
[13,[[1,2,'stones','Not One Stone Upon Another'],
     [3,8,'sorrows','The Beginning of Sorrows'],
     [9,13,'persecution','Ye Shall Be Brought Before Rulers'],
     [14,20,'desolation','The Abomination of Desolation'],
     [21,27,'coming','The Coming of the Son of Man'],
     [28,31,'figparable','The Parable of the Fig Tree'],
     [32,37,'watch','Watch Ye Therefore']]],
[14,[[1,2,'plot','The Plot to Kill Him'],
     [3,9,'anointing','The Anointing at Bethany'],
     [10,11,'judas','Judas Bargains with the Priests'],
     [12,16,'upperroom','The Preparing of the Passover'],
     [17,21,'betrayer','One of You Shall Betray Me'],
     [22,25,'supper','The Mystical Supper'],
     [26,31,'denialforetold','The Denial Foretold'],
     [32,42,'gethsemane','Gethsemane'],
     [43,52,'arrest','The Betrayal and the Arrest'],
     [53,59,'council','Before the Council'],
     [60,65,'highpriest','Art Thou the Christ?'],
     [66,72,'denial','The Denial of Peter']]],
[15,[[1,5,'pilate','Before Pilate'],
     [6,15,'barabbas','Barabbas Released'],
     [16,20,'mocking','The Crowning with Thorns'],
     [21,28,'crucifixion','The Crucifixion'],
     [29,32,'reviled','They That Passed By Reviled Him'],
     [33,37,'death','The Death of Christ'],
     [38,41,'veil','The Veil Rent and the Centurion'],
     [42,47,'burial','The Burial']]],
[16,[[1,8,'myrrhbearers','The Myrrhbearing Women'],
     [9,13,'magdalene','He Appeared First to Mary Magdalene'],
     [14,18,'commission','Go Ye into All the World'],
     [19,20,'ascension','The Ascension']]],
];

const counts={}; kjv.chapters.forEach(c=>counts[+c.chapter]=c.verses.length);
const out={}; const ids=new Set(); let n=0;
for(const [ch,rows] of P){
  out[String(ch)]=rows.map(([vS,vE,id,name])=>{
    if(ids.has(id)) throw new Error('duplicate id '+id);
    ids.add(id); n++;
    return {id,vS,vE,name};
  });
  // Contiguous and complete: every verse of the chapter sits in exactly one passage.
  let expect=1;
  for(const r of rows){ if(r[0]!==expect) throw new Error(`ch${ch}: gap or overlap at ${r[0]}, expected ${expect}`); expect=r[1]+1; }
  if(expect-1!==counts[ch]) throw new Error(`ch${ch}: covers ${expect-1} verses, KJV has ${counts[ch]}`);
}
fs.writeFileSync(process.argv[2],JSON.stringify(out,null,1)+'\n');
console.log('wrote',n,'passages over',Object.keys(out).length,'chapters — every verse covered once');
