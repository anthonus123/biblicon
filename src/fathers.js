const fs=require('fs');
const book=require('./book.js');
const catena=JSON.parse(fs.readFileSync(book.file('catena.json'),'utf8'));

// Fathers venerated as saints in the Orthodox Church (all pre-schism).
// Deliberately excluded: Pseudo-Chrysostom (the Arian-tinged Opus Imperfectum),
// the medieval Latin Glossa, the Carolingians (Rabanus, Remigius, Haymo),
// Origen (condemned in part at the Fifth Council) and Eusebius.
const FATHERS = [
 [/^chrys\b|^chrysostom|^chyrs\b/i,        'St John Chrysostom',        10],
 [/^cyril of alexandria|^cyril\b/i,        'St Cyril of Alexandria',     9],
 [/^basil\b/i,                             'St Basil the Great',         9],
 [/^nyssen|gregory of nyssa/i,             'St Gregory of Nyssa',        9],
 [/^naz\b|gregory nazianzen/i,             'St Gregory the Theologian',  9],
 [/^damas(cenus|\.)/i,                     'St John of Damascus',        9],
 [/^athanas/i,                             'St Athanasius the Great',    9],
 [/^cassian\b/i,                           'St John Cassian',            8],
 [/^jerome\b/i,                            'St Jerome',                  7],
 [/^aug(ustine|\.)/i,                      'St Augustine of Hippo',      7],
 [/^hilary\b|^hil\./i,                     'St Hilary of Poitiers',      7],
 [/^ambrose\b/i,                           'St Ambrose of Milan',        7],
 [/^leo\b/i,                               'St Leo the Great',           7],
 [/^greg(ory|\.)\b/i,                      'St Gregory the Dialogist',   7],
 [/^cyprian\b/i,                           'St Cyprian of Carthage',     7],
 [/^chrysol|^chrysologus/i,                'St Peter Chrysologus',       6],
 [/^bede\b/i,                              'St Bede',                    6],
 // Blessed Theophylact of Ohrid (d. c. 1107): the standard Orthodox commentator on the
 // Gospels, cited throughout the John volume. Not a Latin; his rank sits just under
 // Chrysostom, whom he follows.
 [/^theophyl/i,                            'Blessed Theophylact of Ohrid', 9],
 [/^council of ephesus/i,                  'The Council of Ephesus (431)', 8],
 // The Catena on Luke names him in full, and he is not the Isidore of the line below: this is
 // St Isidore of Pelusium (d. c. 450), the Egyptian ascetic whose letters the volume quotes.
 // The pattern is deliberately the full name, so it matches nothing in the other three books —
 // Matthew's "Isidore, Epist. lib. iv. 166" keeps the entry it has always had.
 [/^isidore of pelusium/i,                 'St Isidore of Pelusium',     6],
 [/^isidore\b/i,                           'St Isidore',                 6],
 // St Epiphanius of Salamis (d. 403). Only the Luke volume cites him; no attribution in the
 // Matthew, Mark or John catena begins with "Epiphan", so this line is inert in those readers.
 [/^epiphan/i,                             'St Epiphanius of Salamis',   7],
];
const BLOCKED=/^(pseudo|gloss|remig|raban|haymo|anselm|origen|euseb|but |or otherwise|interlin|ord\b)/i;
// BLOCKED is anchored, so it only ever tested the author token — and the Catena routinely
// names the real source in the *work* portion instead. "Ambrose, Ambrosiaster. Serm. x. 5"
// is not Ambrose but Ambrosiaster, the anonymous 4th-c. commentator; "Bede, ap. Anselm" is
// Bede as transmitted by the medieval Glossa, which the whitelist excludes on its own. Both
// passed as whitelisted Fathers. Exclude on the same grounds the pseudonymous Chrysostom is
// excluded: what the Church reads under a Father's name has to actually be his.
const BLOCKED_WORK=/ambrosiaster|\bap\.?\s*(anselm|raban|gloss)|gloss/i;

function romanize(s){ return s.replace(/\b(?:hom|serm|lib|cap|tract|ep|qu)\.\s*([ivxlc]+)\b/gi,(m,r)=>m.replace(r,r.toUpperCase())); }

// "Chrys., Hom. iv" -> {name:'St John Chrysostom', work:'Hom. IV', rank:10}
function identify(attr){
  if(!attr||BLOCKED.test(attr)||BLOCKED_WORK.test(attr)) return null;
  for(const [re,name,rank] of FATHERS){
    if(re.test(attr)){
      let work=attr.replace(/^[^,]+,?\s*/,'').trim().replace(/[.,;]+$/,'');
      work=romanize(work);
      return {name,work,rank};
    }
  }
  return null;
}

function clean(t){
  return t
    .replace(/\s*\[[^\]]{0,300}\]/g,'')   // editorial notes and inserted scripture refs
    .replace(/\s{2,}/g,' ')
    .replace(/`/g,'’')
    .replace(/ '/g,' ‘').replace(/([a-z.,;!?])'/g,'$1’')
    .trim();
}

// blocks of a chapter, each given an effective verse range
function chapterBlocks(ch){
  const bs=(catena[ch]||[]).map(b=>({...b, start:b.v[0]}));
  bs.sort((a,b)=>a.start-b.start);
  bs.forEach((b,i)=>{ b.end = i+1<bs.length ? bs[i+1].start-1 : 200; });
  return bs;
}

function forPericope(ch,vS,vE,want=3){
  const collect=(pad,minLen,strict)=>{
    const out=[];
    for(const b of chapterBlocks(ch)){
      if(b.end<vS-pad||b.start>vE+pad) continue;
      for(const cm of b.comments){
        const id=identify(cm.attr); if(!id) continue;
        const text=clean(cm.text);
        if(text.length<minLen||text.length>1500) continue;
        if(strict && /^(Or|Otherwise|Or else)\b/.test(text)) continue;
        let score=id.rank*10 + Math.min(text.length,700)/100;
        if(text.length>420&&text.length<1050) score+=6;
        if(/^["\u201c(]/.test(text)) score-=14;
        if(/^(Which|Hence|Thus|But|And|For|Then|Therefore|Also|Again|Whence|Wherefore|Nor|Yet|Mystically|Morally|Observe|Note|As|That|It|This|These|They|He)\b/.test(text)) score-=10;
        if(/^(In |When |After |At |Because |Christ |The |Our |God |Jesus |Let |We |Since |Whoso|Behold|Great |Many |Not )/.test(text)) score+=5;
        if(b.start>=vS&&b.start<=vE) score+=6;
        out.push({name:id.name,work:id.work,text,score,rank:id.rank});
      }
    }
    return out;
  };
  let cands=collect(0,200,true);
  if(!cands.length) cands=collect(3,120,false);
  cands.sort((a,b)=>b.score-a.score);
  const picked=[], names=new Set();
  for(const c of cands){ if(names.has(c.name)) continue; names.add(c.name); picked.push(c); if(picked.length>=want) break; }
  for(const c of cands){ if(picked.length>=want) break; if(picked.indexOf(c)<0) picked.push(c); }
  return picked;
}

module.exports={forPericope,chapterBlocks};
