const fs=require('fs');
const B=__dirname+'/data/';
const anchors=JSON.parse(fs.readFileSync(B+'anchors.json','utf8'));
const titles=JSON.parse(fs.readFileSync(B+'titles.json','utf8'));
const orig=JSON.parse(fs.readFileSync(B+'icons_orig.json','utf8'));
const pool=JSON.parse(fs.readFileSync(B+'image_meta.json','utf8'));
const keys=JSON.parse(fs.readFileSync(B+'pick_keys.json','utf8'));
const kjv=JSON.parse(fs.readFileSync(B+'matthew_kjv.json','utf8'));
const A=require('./assign.js'), picks=require('./picks.js'), F=require('./fathers.js');
const h1=require('./hotspots.js'), h2=require('./hotspots2.js');

// Genuinely optional modules are gated on the file existing. They are NOT wrapped in a
// catch: a syntax error in one of these hand-edited files has to stop the build, not
// quietly produce a page with every override or story missing.
const optional=n=>fs.existsSync(__dirname+'/'+n)?require('./'+n):{};
const over=optional('overrides.js');
const stories=optional('stories.js');

const hotdb={...h1}; for(const k in h2) hotdb[k]={read:h2[k],hot:[]};
const labels=require('./labels.js');

const verses={}; for(const c of kjv.chapters) verses[+c.chapter]=c.verses.map(v=>({n:+v.verse,t:v.text}));
const dash='–';

// keep markers off the very edge of the frame
const clamp=v=>{ const n=parseFloat(v); return Math.min(92,Math.max(9,isNaN(n)?50:n))+'%'; };
const clampHot=h=>[h[0],h[1],clamp(h[2]),clamp(h[3])];

// ---- image records ----
const images={};
for(const [title,k] of Object.entries(keys)){
  const p=pool[title]||{};
  const hx=hotdb[title]||{};
  images[k]={ file:k+'.webp', label:labels[title]||title.replace(/^File:/,'').replace(/\.\w+$/,''),
    title:title.replace(/^File:/,'').replace(/\.\w+$/,''),
    artist:(p.artist||'').replace(/\s+/g,' ').replace(/^(.+?)\1$/,'$1').replace(/^(unknown author|unknown|anonymous)$/i,'Unknown').slice(0,120), license:p.license||'', date:p.date||'',
    page:p.page||'', read:hx.read||'', hot:(hx.hot||[]).map(clampHot) };
}
const un=hotdb['USER:icon-nativity']||{};
images['user-nativity']={file:'user-nativity.webp',label:labels['USER:icon-nativity'],title:'The Nativity of Christ',
  artist:'Icon supplied by the reader', license:'user-supplied', date:'', page:'',
  read:un.read||'', hot:(un.hot||[]).map(clampHot)};

// ---- how many passages share each image ----
const useCount={};
for(const ch of Object.keys(anchors)) for(const a of anchors[ch]){
  const pk=picks[a.id]; if(!pk) continue;
  const k = pk.startsWith('USER:') ? 'user-nativity' : keys[pk];
  useCount[k]=(useCount[k]||0)+1;
}

// ---- passages ----
const passages=[];
for(const ch of Object.keys(anchors).map(Number).sort((a,b)=>a-b)){
  for(const a of anchors[ch]){
    const o=orig[a.id]||{}, as=A[a.id]||{}, ov=over[a.id]||{};
    const pk=picks[a.id];
    const imgKey = pk ? (pk.startsWith('USER:') ? 'user-nativity' : keys[pk]) : null;
    const fa=F.forPericope(ch,a.vS,a.vE,3);
    const range='Matthew '+ch+':'+a.vS+dash+a.vE;
    passages.push({
      id:a.id, ch, vS:a.vS, vE:a.vE,
      name: ov.name || o.name || a.name || titles[ch],
      range,
      type: ov.type || o.type || '',
      // No icon -> c. A declared type icon -> b. Otherwise the icon depicts this passage's own
      // scene -> a. Tier is no longer inferred from how many passages share an image, because
      // no image is shared any more: picks.js is one icon to one passage, and `make check`
      // enforces it. That also retires the stand-in flag — nothing stands in for anything.
      tier: !imgKey ? 'c' : (ov.tierB ? 'b' : 'a'),
      subject: ov.subject || as.subj || '',
      img: imgKey || null,
      keyRef: ov.keyVerse ? ('Matthew '+ch+':'+ov.keyVerse) : (ov.keyRef || o.keyRef || ''),
      keyText: ov.keyVerse
        ? ((verses[ch].find(function(v){return v.n===ov.keyVerse;})||{}).t||'')
        : (ov.keyText || o.keyText || ''),
      story: stories[a.id] || ov.story || o.story || '',
      notes: (ov.notes || o.hot || []).map(function(h){ return [h[0],h[1]]; }),
      fathers: fa.map(f=>({n:f.name,w:f.work,t:f.text})),
      verses: verses[ch].filter(v=>v.n>=a.vS&&v.n<=a.vE),
    });
  }
}
// Only ship the images a passage actually shows. Unused records would still be embedded as
// base64 in the page and credited in the footer, crediting works the reader never sees.
const shown=new Set(passages.map(p=>p.img).filter(Boolean));
for(const k of Object.keys(images)) if(!shown.has(k)) delete images[k];

const out={ chapterTitles:titles, images, passages };
fs.writeFileSync(B+'icons.json',JSON.stringify(out));
const st={a:0,b:0,c:0}; passages.forEach(p=>st[p.tier]++);
console.log('passages',passages.length,JSON.stringify(st),
 'with image',passages.filter(p=>p.img).length,
 'with story',passages.filter(p=>p.story).length,
 'with fathers',passages.filter(p=>p.fathers.length).length,
 'size KB',Math.round(fs.statSync(B+'icons.json').size/1024));
