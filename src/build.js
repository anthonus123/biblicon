const fs=require('fs'),path=require('path');
const book=require('./book.js');
if(!book.has('icons.json')){
  console.error(book.file('icons.json')+" is missing \u2014 it is generated. Run `make` (or `node src/assemble.js`) first.");
  process.exit(1);
}
const D=JSON.parse(fs.readFileSync(book.file('icons.json'),'utf8'));
const css=fs.readFileSync(__dirname+'/page.css','utf8');
const app=fs.readFileSync(__dirname+'/app.js','utf8');

// fonts
const faces=JSON.parse(fs.readFileSync(__dirname+'/spectral_keep.json','utf8')).map(function(f){ return Object.assign({},f,{path: __dirname+'/'+f.path.replace(/^src\//,'')}); });
const fontCss=faces.map(f=>`@font-face{font-family:'Spectral';font-style:${f.style};font-weight:${f.weight};font-display:swap;src:url(data:font/woff2;base64,${fs.readFileSync(f.path).toString('base64')}) format('woff2');unicode-range:${f.ur};}`).join('\n');

// images
const IMG={};
const missing=[];
for(const [k,v] of Object.entries(D.images)){
  const p=__dirname+'/img/'+v.file;
  if(!fs.existsSync(p)){ missing.push(v.file); continue; }
  IMG[k]='data:image/webp;base64,'+fs.readFileSync(p).toString('base64');
}
// A page that silently drops icons is the one failure this project cannot ship: refuse to
// write it rather than emit a reader with holes where the icons should be.
if(missing.length){
  console.error('MISSING IMAGE FILES in src/img/ ('+missing.length+'):');
  missing.forEach(f=>console.error('  '+f));
  process.exit(1);
}

// attributions. The reader-supplied icon is kept out of the Commons list — it has no Commons
// page and no licence to state — but the prose above the list promises "one exception noted
// below", so it is named in its own line after the list rather than left unmentioned.
const userKeys=Object.keys(D.images).filter(k=>D.images[k].license==='user-supplied');
const whereShown=k=>(D.passages.find(p=>(p.imgs||[]).includes(k))||{}).range||'';
const userNote=userKeys.length
  ? `<p style="margin-top:14px">The exception is ${userKeys.map(k=>esc(D.images[k].label)
      +(whereShown(k)?' at '+esc(whereShown(k)):'')).join(', ')}: supplied by the reader, `
    +`not taken from Wikimedia Commons.</p>`
  : '';
const attribs=Object.values(D.images).filter(i=>i.license!=='user-supplied')
  .sort((a,b)=>a.title.localeCompare(b.title))
  .map(i=>`<li>${esc(i.title)}${i.date?' · '+esc(i.date):''}${i.artist?' · '+esc(i.artist):''} · ${esc(i.license)}${i.page?` · <a href="${i.page}" target="_blank" rel="noopener">Commons</a>`:''}</li>`).join('\n');
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
const jsonSafe=o=>JSON.stringify(o).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');

const html=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23f2ece0'/%3E%3Cpath d='M16 4v24M9 10h14M11 16h10M12 22h8' stroke='%23a8792c' stroke-width='2.4' fill='none'/%3E%3C/svg%3E">
<title>${book.title} — an Orthodox Icon Reader</title>
<style>
${fontCss}
${css}
</style>
</head>
<body>
<div class="wrap">
<header>
  <svg class="mark" viewBox="0 0 24 24" fill="none" stroke="#a8792c" stroke-width="1.6" aria-hidden="true">
    <path d="M12 2v20M6 7h12M8.5 12h7M9.5 17.5h5"/></svg>
  <h1>The Gospel of <em>${book.name}</em></h1>
  <span class="badge">${book.chapters} Chapters · King James Version</span>
</header>

<div class="layout">
  <aside>
    <h2>Reading ${book.name}</h2>
    <div class="sub">All ${book.chapters} chapters · with the icons of the Church</div>
    <div class="progress"><i id="bar" style="width:0%"></i></div>
    <div class="pctline" id="pct">0% through the reading</div>
    <div class="lab" style="margin-bottom:7px">How to read</div>
    <div class="modes">
      <button data-mode="text" aria-pressed="true">Text leads</button>
      <button data-mode="icons" aria-pressed="false">Icons lead</button>
    </div>
    <div class="lab" style="margin-bottom:6px">Chapters · open to see its icons</div>
    <div class="chapters" id="chapters"></div>
    <div class="railnote" id="railnote">The menu follows you as you read; open a chapter to see its icons.</div>
  </aside>

  <main>
    <div class="mast">
      <div class="kicker">${book.greek}</div>
      <h2>${book.title}</h2>
      <p id="modehint">King James Version · open an icon for its story, the Fathers &amp; its meaning</p>
      <div class="orn"><span></span>☨<span></span></div>
    </div>
    <div id="stream"></div>
    <div class="endorn">· ☨ ·</div>
  </main>
</div>

<footer><div class="inner">
  <h4>About this reader</h4>
  <p>The gospel text is the King James Version. ${book.catenaLong} The icons and frescoes are, ${userKeys.length?'with one exception noted below, ':''}public-domain or
  freely-licensed photographs of Byzantine, Athonite, Serbian, Sicilian-Byzantine and Russian works.
  Where the Church has painted a scene more than once, this reader shows several of its icons
  side by side — the Theophany at Langadas beside the Theophany in the Russian North, the
  Lamentation at Nerezi beside the Lamentation of a Cretan master — and each one carries its own
  reading saying where it was made and what it does differently. Every icon shown for a passage
  depicts that passage&rsquo;s own scene, and no image appears under two passages. Orthodox
  iconography is built on the feast cycle, the miracles and the saints, and it has no scene-icon
  for most of the parables and teaching passages &mdash; those passages are given as plain text
  rather than illustrated with a general image of Christ that would misrepresent them. A few
  passages carry an icon the Church attaches to them without depicting their verses (the Good
  Shepherd beside the Lost Sheep, the Prophet Jonah beside the sign of Jonah); each of those says
  so on the card.</p>
  <h4 style="margin-top:26px">Images</h4>
  <ul>
${attribs}
  </ul>
${userNote}
</div></footer>
<div class="scrim" id="scrim" style="display:none"></div>
</div>
<script>window.__DATA__=${jsonSafe(D)};window.__IMG__=${jsonSafe(IMG)};</script>
<script>
${app}
</script>
</body>
</html>`;
const out=process.argv[2]||(__dirname+'/../'+book.reader);
fs.writeFileSync(out,html);
console.log('wrote',out,(fs.statSync(out).size/1048576).toFixed(2)+' MB','images',Object.keys(IMG).length);
