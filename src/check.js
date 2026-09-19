// Structural check on the assembled data. Run it with `make check`.
//
// Two kinds of output. FAIL is an invariant the reader cannot be shipped without — a
// missing image file, a marker off the frame, a passage with no verses, or the loss of the
// owner's original passage notes. WARN and the counts are informational: content is meant
// to grow (more hotspots, more icons), so growth must never turn the build red.
const fs=require('fs'),path=require('path');
const book=require('./book.js');
const B=__dirname+'/data/';

if(!book.has('icons.json')){
  console.error(book.file('icons.json')+" is missing — it is generated. Run `make` (or `node src/assemble.js`) first.");
  process.exit(1);
}
const D=JSON.parse(fs.readFileSync(book.file('icons.json'),'utf8'));
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
  // A gallery of unlabelled thumbnails would be decoration. Every icon the page shows has to
  // say what it is, so a missing label is a failure, not a warning: without one the credit line
  // prints the raw Commons filename at the reader.
  if(!v.label) fail(`image ${k}: no label — every icon shown must name itself`);
  if(!v.read) warn(`image ${k}: no prose reading`);
  if(v.license!=='user-supplied'&&!v.page) warn(`image ${k}: no Commons page for attribution`);
  for(const h of v.hot||[]){
    if(!Array.isArray(h)||h.length!==4) fail(`image ${k}: malformed hotspot ${JSON.stringify(h)}`);
    else if(!h[0]||!h[1]) fail(`image ${k}: hotspot with no label or no text`);
  }
}
// The image pool is shared between the readers: a file this Gospel does not show may be
// shown by the other one, so a pool entry or a file on disk is only reported when no book's
// picks name it at all.
const otherUsed=new Set(), otherTitles=new Set();
for(const b of fs.readdirSync(__dirname+'/books')){
  if(b===book.id||!fs.existsSync(path.join(__dirname,'books',b,'picks.js'))) continue;
  const pk=require(path.join(__dirname,'books',b,'picks.js'));
  for(const v of Object.values(pk)) for(const t of (Array.isArray(v)?v:[v])){
    otherTitles.add(t);
    if(keys[t]) otherUsed.add(keys[t]+'.webp');
    if(t.startsWith('USER:')) otherUsed.add('user-nativity.webp');
  }
}
for(const [title,k] of Object.entries(keys)){
  if(!meta[title]) fail(`pick_keys: "${title}" has no entry in image_meta.json`);
  if(!D.images[k]&&!otherTitles.has(title)) warn(`pick_keys: "${title}" (${k}) is not used by any passage of either reader`);
}
const orphans=[...onDisk].filter(f=>!used.has(f)&&!otherUsed.has(f));
if(orphans.length) warn(`src/img has ${orphans.length} file(s) no passage in any reader uses: ${orphans.join(', ')}`);

// --- hotspot coordinates, read from the source ------------------------------
// assemble.js clamps markers to 9–92% so they never sit on the frame edge, which means the
// assembled data can never look wrong — the clamp has already hidden it. So check what was
// actually written. A nudged coordinate is usually deliberate; one far outside is a typo,
// and HANDOFF is explicit that a bad coordinate puts the marker on empty sky.
const raw=require(book.file('hotspots.js')), raw3=require(book.file('hotspots3.js'));
// assemble.js applies hotspots3 last, so a file with markers in both files would quietly
// lose the ones in hotspots.js. Say so rather than let a set of markers disappear.
// The same hole exists between hotspots.js and hotspots2.js: `hotdb[k]={read:h2[k],hot:[]}`
// replaces the whole record, so an h1 marker set whose file later gets a reading in h2 is
// wiped without a trace. Nothing collides today; the guard is here so it stays that way.
const raw2=require(book.file('hotspots2.js'));
for(const t of Object.keys(raw3))
  if(((raw[t]||{}).hot||[]).length) fail(`${t}: markers in both hotspots.js and hotspots3.js — the hotspots3 set silently wins`);
for(const t of Object.keys(raw2))
  if(((raw[t]||{}).hot||[]).length && !raw3[t]) fail(`${t}: markers in hotspots.js and a reading in hotspots2.js — the h2 entry wipes the markers`);
const rawHot=Object.entries(raw).map(([t,v])=>[t,v.hot||[]])
  .concat(Object.entries(raw3).map(([t,v])=>[t,v]));
for(const [title,hots] of rawHot){
  for(const h of hots){
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
let withImage=0,withStory=0,withNotes=0,quotes=0,noFathers=0,shownIcons=0,withGallery=0;
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
  const imgs=p.imgs||(p.img?[p.img]:[]);
  for(const k of imgs) if(!D.images[k]) fail(`${p.id}: points at unknown image "${k}"`);
  if(imgs[0]!==(p.img||undefined)&&!(imgs.length===0&&!p.img))
    fail(`${p.id}: primary image "${p.img}" is not the first of imgs [${imgs.join(', ')}]`);
  if(new Set(imgs).size!==imgs.length) fail(`${p.id}: the same icon appears twice in its own gallery`);
  if(!p.img&&p.tier!=='c') fail(`${p.id}: no image but tier "${p.tier}" (an iconless passage must be tier c)`);
  if(p.img&&p.tier==='c') fail(`${p.id}: has an image but is tier c`);
  if(tiers[p.tier]===undefined) fail(`${p.id}: unknown tier "${p.tier}"`); else tiers[p.tier]++;
  if(p.img) withImage++;
  shownIcons+=imgs.length;
  if(imgs.length>1) withGallery++;
  if(p.story) withStory++;
  if(p.notes&&p.notes.length) withNotes++;
  quotes+=p.fathers.length;
  if(!p.fathers.length){ noFathers++; warn(`${p.id}: no patristic quotation`); }
}
// Regression guard. The owner's original 46 entries each carry three [label, text] pairs of
// passage commentary; a refactor once moved hotspots onto the image record and silently
// dropped them. Fewer than 46 means it happened again.
if(withNotes<book.minNotes) fail(`only ${withNotes} passages carry "Points to notice" — the owner's original ${book.minNotes} must all survive (see HANDOFF Gotchas)`);

// --- one icon, one passage -------------------------------------------------
// A passage may now show several icons, but every one of them is of its own scene, so an
// image still belongs to exactly one passage. An image shown under two passages tells the
// reader the second has an icon of its own when it does not, and that is how the Wicked
// Husbandmen ended up under the Labourers in the Vineyard. Hard failure, not a warning.
const usedBy={};
for(const p of D.passages) for(const k of (p.imgs||[])) (usedBy[k]=usedBy[k]||[]).push(p.range);
for(const [k,ranges] of Object.entries(usedBy))
  if(new Set(ranges).size>1) fail(`"${D.images[k].label}" is used by ${new Set(ranges).size} passages (${[...new Set(ranges)].join(', ')}) — one icon belongs to one passage`);

// A passage that names a real iconographic subject and has no icon is expected, not broken:
// Orthodox tradition has no scene-icon for most parables and teaching passages. Reported so
// the gap stays visible if an image ever surfaces.
const A=require(book.file('assign.js'));
const wanted=D.passages.filter(p=>!p.img && (A[p.id]||{}).tier==='a');
if(wanted.length){
  warn(`${wanted.length} passage(s) name an iconographic subject in assign.js but have no icon —`
    +` searched twice, none exists (see HANDOFF Gotchas). They render as plain verse rows:`);
  for(const p of wanted) warn(`    ${p.range.padEnd(17)} wanted "${(A[p.id]||{}).subj}"`);
}

// labels.js and hotspots2.js are hand-edited object literals keyed by Commons title, and a
// repeated key silently discards the earlier entry the same way overrides.js does. It has
// happened: adding a second icon for a passage re-introduced four files that already had a
// label from an earlier session, and the duplicates went unnoticed because one copy was
// single-quoted and the other double-quoted. Compare the keys, not the source lines.
for(const f of ['labels','hotspots2','hotspots3']){
  const src=fs.readFileSync(book.file(f+'.js'),'utf8');
  const keys=[...src.matchAll(/^(['"])((?:File|USER):.*?)\1\s*:/gm)].map(m=>m[2]);
  const dup=[...new Set(keys.filter((k,i)=>keys.indexOf(k)!==i))];
  if(dup.length) fail(`${f}.js has duplicate key(s), the later one silently wins: ${dup.join(' | ')}`);
}

// Two icons of one scene shown side by side under the same name give the reader nothing to
// choose between: the strip tooltips read alike and only the fine print of the credit differs.
// It happened to the two Dionysiou Jonahs. Warn, because a repeat across two distant passages
// is only a coincidence of naming, but a repeat inside one gallery is a real collision.
const labelOf={};
for(const [k,v] of Object.entries(D.images)) (labelOf[v.label]=labelOf[v.label]||[]).push(k);
for(const [lab,ks] of Object.entries(labelOf)) if(ks.length>1){
  const ranges=[...new Set(ks.map(k=>(D.passages.find(p=>(p.imgs||[]).includes(k))||{}).range))];
  const msg=`${ks.length} icons share the label "${lab}" (${ranges.join(', ')})`;
  if(ranges.length===1) fail(msg+' — two icons in one gallery must not carry the same name');
  else warn(msg);
}

// overrides.js is one hand-edited 38 KB object literal: a repeated key silently discards the
// earlier one, taking its corrections with it and leaving no trace anywhere in the output.
const ovSrc=book.has('overrides.js')?fs.readFileSync(book.file('overrides.js'),'utf8'):'';
const ovKeys=[...ovSrc.matchAll(/^ ([A-Za-z0-9_]+):\{/gm)].map(m=>m[1]);
const dups=[...new Set(ovKeys.filter((k,i)=>ovKeys.indexOf(k)!==i))];
if(dups.length) fail(`overrides.js has duplicate key(s), the later one silently wins: ${dups.join(', ')}`);

// --- report -----------------------------------------------------------------
const uniqueImages=new Set([].concat(...D.passages.map(p=>p.imgs||[]))).size;
const withHot=Object.values(D.images).filter(i=>(i.hot||[]).length).length;
console.log(`passages        ${D.passages.length}   tiers a:${tiers.a} b:${tiers.b} c:${tiers.c}`);
console.log(`with an icon    ${withImage}   showing ${shownIcons} icons from ${uniqueImages} unique images (${Object.keys(D.images).length} defined)`);
console.log(`galleries       ${withGallery} passage(s) show more than one icon of their own scene`);
const reads=Object.values(D.images).filter(i=>i.read).length, nImg=Object.keys(D.images).length;
console.log(`icon readings   ${reads}/${nImg}${reads<nImg?`   (${nImg-reads} icon(s) would show an empty "Deciphering the Icon" tab)`:''}   with positioned markers ${withHot}`);
console.log(`passage notes   ${withNotes}   scripture stories ${withStory}`);
console.log(`icon reuse      none — every one of the ${uniqueImages} images belongs to a single passage`);
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
