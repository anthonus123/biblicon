// Parse the Dominican House of Studies electronic edition of the Catena Aurea on St Luke
// (isidore.co/aquinas/english/CALuke.htm) into the shape the other three books' catena.json
// have:  { "<chapter>": [ { v:[verse numbers], scripture:"…", comments:[{attr,text}] } ] }
//
//   node src/tools/parse_catena_luke.js <CALuke.htm> <out.json>
//
// CCEL hosts only the Matthew and Mark volumes of the Oxford translation, so Luke takes the
// same source John does: the 1843 Oxford text with the second-person pronouns modernised and
// the marginal work references dropped. book.json says so in the footer.
//
// Two things this source does that Mark's does not:
//   * the authors are ALL CAPS and abbreviated differently ("GREG NYSS.", "ATHAN.",
//     "DAMASCENE"), and several of those spellings match none of the patterns in
//     src/fathers.js — St Gregory of Nyssa, St Athanasius, St John of Damascus and St
//     Gregory the Theologian would all be silently dropped from the reader, with `make
//     check` green throughout because Ambrose and Bede alone fill every passage. NAMES below
//     normalises each to the spelling fathers.js already knows, exactly as the Mark parser
//     normalises that volume's five print misspellings, so the shared whitelist is untouched
//     and the other three readers rebuild byte-for-byte.
//   * an attribution may open a paragraph or sit in the middle of one, and "ID." means the
//     Father last named. A paragraph with no attribution at all is kept as attr:"" and never
//     glued onto the comment before it — that would put one Father's words under another's
//     name, and nothing downstream could see it.
const fs=require('fs');

// The source's closed list of attributions -> the spelling src/fathers.js matches on.
// Everything not in this list is recorded as unattributed and printed at the end, so a name
// missing from it cannot pass unnoticed.
const NAMES={
 'AMBROSE':'Ambrose', 'BEDE':'Bede', 'CYRIL':'Cyril of Alexandria', 'BASIL':'Basil',
 'THEOPHYL':'Theophyl.', 'THEOPHYLACT':'Theophyl.',
 'CHRYS':'Chrys.', 'CHRYSOSTOM':'Chrys.',
 'AUG':'Aug.', 'AUGUSTINE':'Aug.',
 // "Greg." on its own matches nothing in fathers.js: its pattern is /^greg(ory|\.)\b/i, and
 // after the full stop there is no word boundary for \b to sit on. Spelling it out is what
 // gets St Gregory the Dialogist — 190 comments here, the fourth most in the volume — into the
 // reader at all. The same hole silently drops "Greg." from Matthew (110), Mark (17) and John
 // (120); fixing it there would rewrite three shipped readers, so HANDOFF leaves that to the owner.
 'GREG':'Gregory', 'GREGORY':'Gregory',
 'GREG NYSS':'Nyssen', 'GREG. NYSS':'Nyssen', 'GREGORY NYSS':'Nyssen',
 'GREG NAZ':'Naz.', 'GREG. NAZ':'Naz.',
 'ATHAN':'Athanasius', 'ATHANASIUS':'Athanasius',
 'DAMASCENE':'Damascenus', 'DAMASCENUS':'Damascenus',
 'JEROME':'Jerome', 'CYPRIAN':'Cyprian', 'EPIPHAN':'Epiphanius',
 'ISIDORE PELEUS':'Isidore of Pelusium', 'MAXIMUS':'Maximus', 'MAXIM':'Maximus',
 'TITUS BOST':'Titus of Bostra', 'TITUS BOSTRENSIS':'Titus of Bostra',
 // Recorded under their own names and excluded downstream by fathers.js, as in the other books.
 'ORIGEN':'Origen', 'EUSEBIUS':'Euseb.', 'GLOSS':'Gloss.', 'GREEK EX':'Greek Ex.',
 'GREEK EXPOSITOR':'Greek Ex.', 'DIONYSIUS AR':'Dionysius Areop.',
 'PSEUDO-CHRYS':'Pseudo-Chrys.', 'PSEUDO-AUG':'Pseudo-Aug.', 'PSEUDO-BASIL':'Pseudo-Basil',
};
const ROMAN={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
const fromRoman=s=>[...s].reduce((n,c,i,a)=>n+(ROMAN[c]<ROMAN[a[i+1]]?-ROMAN[c]:ROMAN[c]),0);

const strip=h=>h.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();

const src=fs.readFileSync(process.argv[2],'utf8');
const lines=src.split('\n');

// Chapter heads: "<p …><span style="font-weight: bold">CHAPTER IV</span>"
const chapAt=[];
lines.forEach((l,i)=>{ const m=/font-weight: bold">CHAPTER ([IVXLC]+)</.exec(l); if(m) chapAt.push([fromRoman(m[1]),i]); });

const out={}; const rejected={};
for(let ci=0;ci<chapAt.length;ci++){
  const [ch,from]=chapAt[ci];
  const to=ci+1<chapAt.length?chapAt[ci+1][1]:lines.length;
  const blocks=[]; let cur=null, pend=null, last='';

  // A block opens with its verses and closes at the next verse heading.
  const openBlock=()=>{ if(pend){ cur={v:pend.v,scripture:pend.s,comments:[]}; blocks.push(cur); pend=null; } };

  for(let i=from+1;i<to;i++){
    const raw=lines[i].trim();
    if(!raw.startsWith('<p')) continue;
    const text=strip(raw);
    if(!text) continue;

    // A verse heading is red AND in the Arial face AND opens with its number. Red alone is
    // not enough: the Fathers' own quotations of the verse are red too, inside their prose.
    const isVerse=/color: #ff0000"><span style="font-family: 'Arial'/.test(raw)&&/^\d+\. /.test(text);
    if(isVerse){
      const m=/^(\d+)\. ?([\s\S]*)$/.exec(text);
      if(cur||!pend){ cur=null; pend=pend&&!cur?pend:{v:[],s:''}; }
      if(!pend) pend={v:[],s:''};
      pend.v.push(+m[1]); pend.s=(pend.s?pend.s+' ':'')+m[2];
      continue;
    }
    openBlock();
    if(!cur) continue;   // prose before the first verse heading of a chapter: not a comment

    // Split the paragraph at every attribution it contains, keeping any leading prose as an
    // unattributed comment of its own.
    const parts=raw.split(/<b>/);
    let head=strip(parts[0]);
    if(head) cur.comments.push({attr:'',text:head});
    for(let p=1;p<parts.length;p++){
      const seg=parts[p];
      const close=seg.indexOf('</b>');
      if(close<0){ const t=strip(seg); if(t) cur.comments.push({attr:'',text:t}); continue; }
      let name=strip(seg.slice(0,close)).replace(/[.;,:]+$/,'').toUpperCase();
      let rest=seg.slice(close+4);
      // "<b>MAXIM</b> US;" — the bold tag ends inside the word.
      const tail=/^ ?([A-Z]{1,6})(?=[.;:,\s])/.exec(strip(rest));
      if(tail&&NAMES[name+tail[1]]){ name=name+tail[1]; rest=rest.replace(/^\s*[A-Z]{1,6}/,''); }
      const body=strip(rest).replace(/^[.;:,]\s*/,'').trim();
      if(!body) continue;
      let attr=NAMES[name];
      if(!attr&&/^ID$/.test(name)) attr=last;                    // "ID." — the Father last named
      if(!attr){
        if(/^[A-Z]/.test(name)&&name.split(/\s+/).length<=4) rejected[name]=(rejected[name]||0)+1;
        cur.comments.push({attr:'',text:body});
        continue;
      }
      last=attr;
      cur.comments.push({attr,text:body});
    }
  }
  openBlock();
  out[String(ch)]=blocks.filter(b=>b.comments.length);
}

fs.writeFileSync(process.argv[3],JSON.stringify(out));
let nb=0,nc=0,na=0; const attrs={};
for(const ch in out) for(const b of out[ch]){ nb++; for(const c of b.comments){ nc++; if(c.attr) na++; attrs[c.attr]=(attrs[c.attr]||0)+1; } }
console.log('chapters',Object.keys(out).length,'blocks',nb,'comments',nc,'attributed',na);
console.log('by author:',Object.entries(attrs).filter(([a])=>a).sort((a,b)=>b[1]-a[1]).map(([k,v])=>k+':'+v).join('  '));
const uk=Object.entries(rejected).sort((a,b)=>b[1]-a[1]);
if(uk.length) console.log('\nrejected bold heads (check none is an author):\n  '+uk.map(([k,v])=>JSON.stringify(k)+'×'+v).join('\n  '));
