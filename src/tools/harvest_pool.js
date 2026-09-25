// Enumerate a candidate pool of Orthodox Gospel imagery.
//   (a) the subject categories the 57 trusted files already sit in, plus their subcats
//   (b) subject categories found by searching the category namespace for each scene
//   (c) whole Orthodox programmes (the method HANDOFF says actually works)
const C=require('../commons.js');
const fs=require('fs');
const D=__dirname;
const fileCats=JSON.parse(fs.readFileSync(D+'/file_cats.json','utf8'));

// Categories that say nothing about subject — licences, maintenance, upload provenance.
const BOILER=/^(CC-|PD|Public domain|Files |Self-published|Template |Artworks |Pages |Media |Images |Photos by|Author died|Uploaded|Media needing|Media missing|Media supported|Media with|Undated|Unidentified|Scans |Uniate)/i;
const CYCLES=[
 'Frescos in Dionysiou monastery','Cathedral (Monreale) - New Testament mosaics',
 'Museum of Dionisy\'s Frescos','Icons in Saint Paraskevi Church, Langadas',
 'Rossano Gospels','Menologion of Basil II','Frescos in the Gračanica Monastery',
 'Mosaics of Sant\'Apollinare Nuovo (Ravenna)','Mosaics of the Chora Church',
 'Frescoes in the Visoki Dečani monastery','Frescos in Studenica monastery',
 'Frescoes of Mileševa monastery','Frescoes in Sopoćani monastery',
 'Mosaics in Hosios Loukas','Mosaics of Daphni Monastery','Mosaics of Nea Moni of Chios',
 'Icons of Saint Catherine\'s Monastery','Frescoes of the Protaton',
 'Voroneț monastery','Sucevița Monastery','Moldovița Monastery','Humor Monastery',
 'Boyana Church','Rila Monastery','Icons in the Byzantine and Christian Museum (Athens)',
 'Icons by Andrei Rublev','Theophanes the Greek','Novgorod icons','Pskov icons',
 'Icons in the Tretyakov gallery','Russian icons in the Russian Museum',
 'Frescoes of the Church of Saint Panteleimon, Nerezi','Icons of Cyprus',
 'Frescoes in Kariye Museum','Painted churches in the Troodos Region',
 'Life of Jesus Christ in art','Gospel of Jesus Christ in icons',
];
// Scene keyword sets -> used only to name subject-category searches here.
// Luke's own harvest (2026-09-25c): the Infancy and Feast cycle no earlier book's
// pool touched, plus the handful of Luke-only miracles and parables Orthodox
// programmes do paint. Transliterated-Greek and Slavonic variants are added
// separately in the match-by-hand pass (English category names miss the Feasts).
const SUBJECT_QUERIES=[
 'Annunciation to Zacharias','Annunciation icons','Evangelismos icons',
 'Visitation icons','Nativity of John the Baptist icons','Circumcision of Jesus icons',
 'Presentation of Jesus at the Temple','Hypapante icons','Meeting of the Lord icons',
 'Christ among the doctors','Finding in the Temple','Mesopentecost icons',
 'Raising of the son of the widow of Nain','Widow of Nain',
 'Woman with the issue of blood','Healing of the bent woman','Healing of the dropsical man',
 'Zacchaeus icons','Publican and Pharisee icons','Prodigal Son icons',
 'Rich man and Lazarus icons','Good Samaritan icons','Ten lepers icons',
 'Christ before Herod','Simon of Cyrene','Road to Emmaus icons','Supper at Emmaus icons',
 'Ascension of Jesus icons','Analepsis icons','Christ in Glory icons',
 'Saint Luke the Evangelist icons',
];
const sleep=ms=>new Promise(z=>setTimeout(z,ms));
(async()=>{
  const seedCats=new Set();
  for(const t in fileCats) for(const c of fileCats[t]) if(!BOILER.test(c)) seedCats.add(c);
  console.error('seed subject categories',seedCats.size);

  const found=new Set(CYCLES);
  for(const c of seedCats) found.add(c);
  for(const q of SUBJECT_QUERIES){
    const cs=await C.catSearch(q,8);
    for(const c of cs) if(!BOILER.test(c)) found.add(c);
    await sleep(100);
  }
  console.error('categories to enumerate',found.size);

  // one level of subcategories on everything found
  const cats=[...found];
  const withSubs=new Set(cats);
  for(const c of cats){
    const s=await C.subcats(c);
    for(const x of s) if(!BOILER.test(x)) withSubs.add(x);
    await sleep(60);
  }
  console.error('with subcats',withSubs.size);

  const pool={};
  let i=0;
  for(const c of withSubs){
    const m=await C.catMembers(c,1000);
    for(const t of m) (pool[t]=pool[t]||[]).push(c);
    if(++i%40===0) console.error('  ',i,'/',withSubs.size,'files',Object.keys(pool).length);
    await sleep(50);
  }
  fs.writeFileSync(D+'/pool.json',JSON.stringify(pool));
  fs.writeFileSync(D+'/cats_used.json',JSON.stringify([...withSubs],null,1));
  console.error('POOL',Object.keys(pool).length,'files from',withSubs.size,'categories');
})();
