// Parse the CCEL plain-text cache of the Catena Aurea on St Mark (Oxford 1842) into the
// same shape src/books/matthew/catena.json has:
//   { "<chapter>": [ { v:[verse numbers], scripture:"…", comments:[{attr,text}] } ] }
// A paragraph that opens with an attribution starts a comment; a following paragraph with
// no attribution is recorded as a comment with attr:"" — as the Matthew parse did, so
// fathers.js sees both books alike.
//
// The attribution vocabulary of this volume is closed and small (see NAMES): matching on it
// is what keeps "There follows, …" and "It is to be noted that …" out of the author field.
// Free-form heuristics let 300 sentences in.
const fs=require('fs');
const src=fs.readFileSync(process.argv[2],'utf8');
const lines=src.split('\n');

// Every author token this volume uses to open a comment, including the print/OCR misspellings
// it uses for three of them. Normalising the misspellings matters for more than tidiness:
// fathers.js blocks the pseudonymous authors by `/^pseudo/i` and Origen by `/^origen/i`, and
// "Psuedo-Chrys." and "Origin" slip through both.
const FIX={'Theophlyact':'Theophylact','Theophyact':'Theophylact','Psuedo-Chrys.':'Pseudo-Chrys.',
           'Pseudo-Chyrs.':'Pseudo-Chrys.','Origin':'Origen','Greg':'Greg.'};
const NAMES=new Set(['Bede','Theophylact','Pseudo-Jerome','Pseudo-Chrys.','Augustine','Chrys.',
 'Chrysostom','Gloss.','Gloss','Greg.','Gregory','Origen','Severianus','Jerome','Remig.',
 'Pseudo-Augustine','Pseudo-Aug.','Cyril','Hilary','Ambrose','Titus','Leo',
 ...Object.keys(FIX)]);

const RULE=/^\s*_{10,}\s*$/;
// Verse lines are "   4. And it came to pass" — and a handful use a colon for the point.
const VERSE=/^   (\d+)[.:] ?(.*)$/;
const VER=/^   Ver\. (\d+): ?(.*)$/;
const ATTR=/^([^:]{1,140}?):\s+(\S.*)$/;

const flow=ls=>ls.map(l=>l.trim()).join(' ').replace(/\s{2,}/g,' ').trim();

const chapStart=[];
lines.forEach((l,i)=>{ const m=/^Chapter (\d+)\s*$/.exec(l); if(m) chapStart.push([+m[1],i]); });

const out={}; const unknownHeads={};
for(let ci=0;ci<chapStart.length;ci++){
  const [ch,from]=chapStart[ci];
  const to=ci+1<chapStart.length?chapStart[ci+1][1]:lines.length;
  const blocks=[]; let cur=null, para=[], pv=null, ps='';

  const flushPara=()=>{
    const text=flow(para); para=[];
    if(!text||!cur) return;
    const m=ATTR.exec(text);
    if(m){
      const head=m[1].trim();
      const tok=head.split(/[,;\s]/)[0];
      if(NAMES.has(tok)){
        cur.comments.push({attr:(FIX[tok]?head.replace(tok,FIX[tok]):head).replace(/[;]+$/,''),text:m[2].trim()});
        return;
      }
      // Record what was rejected, so a name missing from NAMES cannot pass unnoticed.
      if(/^[A-Z]/.test(tok)&&head.split(/\s+/).length<=4) unknownHeads[head]=(unknownHeads[head]||0)+1;
    }
    cur.comments.push({attr:'',text});
  };
  const openBlock=()=>{
    if(pv){ cur={v:pv,scripture:ps,comments:[]}; blocks.push(cur); pv=null; ps=''; }
  };

  for(let i=from+1;i<to;i++){
    const l=lines[i];
    if(RULE.test(l)){ flushPara(); openBlock(); continue; }
    if(!l.trim()){ flushPara(); continue; }
    const v=VERSE.exec(l)||VER.exec(l);
    if(v){
      flushPara();
      const n=+v[1]; let t=v[2].trim();
      while(i+1<to&&lines[i+1].startsWith('   ')&&!VERSE.test(lines[i+1])&&!VER.test(lines[i+1])
            &&!RULE.test(lines[i+1])&&lines[i+1].trim()) t+=' '+lines[++i].trim();
      t=t.replace(/\s{2,}/g,' ').trim();
      if(!pv){ pv=[n]; ps=t; } else { pv.push(n); ps+=' '+t; }
      continue;
    }
    para.push(l);
  }
  flushPara();
  out[String(ch)]=blocks.filter(b=>b.comments.length);
}

fs.writeFileSync(process.argv[3],JSON.stringify(out));
let nb=0,nc=0,na=0; const attrs={};
for(const ch in out) for(const b of out[ch]){ nb++; for(const c of b.comments){ nc++; if(c.attr) na++; attrs[c.attr]=(attrs[c.attr]||0)+1; } }
console.log('chapters',Object.keys(out).length,'blocks',nb,'comments',nc,'attributed',na);
const first={}; for(const [a,n] of Object.entries(attrs)) if(a){ const t=a.split(/[,;\s]/)[0]; first[t]=(first[t]||0)+n; }
console.log('by author token:',Object.entries(first).sort((a,b)=>b[1]-a[1]).map(([k,v])=>k+':'+v).join('  '));
const uk=Object.entries(unknownHeads).sort((a,b)=>b[1]-a[1]);
if(uk.length) console.log('\nrejected capitalised heads (check none is an author):\n  '+uk.map(([k,v])=>JSON.stringify(k)+'×'+v).join('\n  '));
for(const ch in out) console.log('ch'+ch, out[ch].map(b=>b.v[0]+'-'+b.v[b.v.length-1]).join(' '));
