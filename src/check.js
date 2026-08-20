// Structural check on the assembled data. Run it with `make check`.
//
// Two kinds of output. FAIL is an invariant the reader cannot be shipped without — a
// missing image file, a marker off the frame, a passage with no verses, or the loss of the
// owner's original passage notes. WARN and the counts are informational: content is meant
// to grow (more hotspots, more icons), so growth must never turn the build red.
const fs=require('fs'),path=require('path');
const B=__dirname+'/data/';

if(!fs.existsSync(B+'icons.json')){
  console.error("src/data/icons.json is missing — it is generated. Run `make` (or `node src/assemble.js`) first.");
  process.exit(1);
}
const D=JSON.parse(fs.readFileSync(B+'icons.json','utf8'));
const meta=JSON.parse(fs.readFileSync(B+'image_meta.json','utf8'));
const keys=JSON.parse(fs.readFileSync(B+'pick_keys.json','utf8'));

const fails=[],warns=[];
const fail=m=>fails.push(m), warn=m=>warns.push(m);

// --- images -----------------------------------------------------------------
const onDisk=new Set(fs.readdirSync(__dirname+'/img'));
const used=new Set();
for(const [k,v] of Object.entries(D.images)){
  if(!v.file) fail(`image ${k}: no file name`);
  else if(!onDisk.has(v.file)) fail(`image ${k}: src/img/${v.file} does not exist`);
  else used.add(v.file);
  if(!v.label) warn(`image ${k}: no label`);
  if(!v.read) warn(`image ${k}: no prose reading`);
  if(v.license!=='user-supplied'&&!v.page) warn(`image ${k}: no Commons page for attribution`);
  for(const h of v.hot||[]){
    if(!Array.isArray(h)||h.length!==4) fail(`image ${k}: malformed hotspot ${JSON.stringify(h)}`);
    else if(!h[0]||!h[1]) fail(`image ${k}: hotspot with no label or no text`);
  }
}
for(const [title,k] of Object.entries(keys)){
  if(!meta[title]) fail(`pick_keys: "${title}" has no entry in image_meta.json`);
  if(!D.images[k]) warn(`pick_keys: "${title}" (${k}) is not used by any passage`);
}
const orphans=[...onDisk].filter(f=>!used.has(f));
if(orphans.length) warn(`src/img has ${orphans.length} file(s) no passage uses: ${orphans.join(', ')}`);

// --- hotspot coordinates, read from the source ------------------------------
// assemble.js clamps markers to 9–92% so they never sit on the frame edge, which means the
// assembled data can never look wrong — the clamp has already hidden it. So check what was
// actually written. A nudged coordinate is usually deliberate; one far outside is a typo,
// and HANDOFF is explicit that a bad coordinate puts the marker on empty sky.
const raw=require('./hotspots.js');
for(const [title,v] of Object.entries(raw)){
  for(const h of v.hot||[]){
    for(const [axis,c] of [['top',h[2]],['left',h[3]]]){
      const n=parseFloat(c);
      if(isNaN(n)) fail(`${title}: unparseable ${axis} coordinate "${c}" on "${h[0]}"`);
      else if(n<0||n>100) fail(`${title}: ${axis} ${c} is off the icon entirely ("${h[0]}")`);
      else if(n<9||n>92) warn(`${title}: ${axis} ${c} on "${h[0]}" was clamped to ${Math.min(92,Math.max(9,n))}%`);
    }
  }
}

// --- passages ---------------------------------------------------------------
const seen=new Set();
let withImage=0,withStory=0,withNotes=0,quotes=0,noFathers=0;
const tiers={a:0,b:0,c:0};
for(const p of D.passages){
  if(seen.has(p.id)) fail(`duplicate passage id "${p.id}"`);
  seen.add(p.id);
  if(!p.name) fail(`${p.id}: no name`);
  if(!p.verses||!p.verses.length) fail(`${p.id}: no verses`);
  else{
    if(p.verses[0].n!==p.vS||p.verses[p.verses.length-1].n!==p.vE)
      fail(`${p.id}: verses ${p.verses[0].n}–${p.verses[p.verses.length-1].n} do not match the anchor ${p.vS}–${p.vE}`);
    if(p.verses.some(v=>!v.t||!v.t.trim())) fail(`${p.id}: an empty verse`);
  }
  if(p.img&&!D.images[p.img]) fail(`${p.id}: points at unknown image "${p.img}"`);
  if(!p.img&&p.tier!=='c') fail(`${p.id}: no image but tier "${p.tier}" (an iconless passage must be tier c)`);
  if(p.img&&p.tier==='c') fail(`${p.id}: has an image but is tier c`);
  if(tiers[p.tier]===undefined) fail(`${p.id}: unknown tier "${p.tier}"`); else tiers[p.tier]++;
  if(p.img) withImage++;
  if(p.story) withStory++;
  if(p.notes&&p.notes.length) withNotes++;
  quotes+=p.fathers.length;
  if(!p.fathers.length){ noFathers++; warn(`${p.id}: no patristic quotation`); }
}
// Regression guard. The owner's original 46 entries each carry three [label, text] pairs of
// passage commentary; a refactor once moved hotspots onto the image record and silently
// dropped them. Fewer than 46 means it happened again.
if(withNotes<46) fail(`only ${withNotes} passages carry "Points to notice" — the owner's original 46 must all survive (see HANDOFF Gotchas)`);

// --- report -----------------------------------------------------------------
const uniqueImages=new Set(D.passages.filter(p=>p.img).map(p=>p.img)).size;
const withHot=Object.values(D.images).filter(i=>(i.hot||[]).length).length;
console.log(`passages        ${D.passages.length}   tiers a:${tiers.a} b:${tiers.b} c:${tiers.c}`);
console.log(`with an icon    ${withImage}   from ${uniqueImages} unique images (${Object.keys(D.images).length} defined)`);
console.log(`icon readings   ${Object.values(D.images).filter(i=>i.read).length}/${Object.keys(D.images).length}   with positioned markers ${withHot}`);
console.log(`passage notes   ${withNotes}   scripture stories ${withStory}`);
console.log(`patristic       ${quotes} quotations` + (noFathers?`   (${noFathers} passages have none)`:''));

if(warns.length){
  console.log(`\n${warns.length} warning(s):`);
  warns.forEach(w=>console.log('  · '+w));
}
if(fails.length){
  console.error(`\n${fails.length} FAILURE(S):`);
  fails.forEach(f=>console.error('  ✗ '+f));
  process.exit(1);
}
console.log('\nok — every structural invariant holds.');
