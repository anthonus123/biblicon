// For every file already trusted in picks.js, ask Commons which categories it sits in.
// A verified Theophany fresco lives in the categories where more Theophany icons live.
const C=require('../commons.js');
const picks=require(require('../book.js').file('picks.js'));
const fs=require('fs');
const OUT=__dirname+'/file_cats.json';

async function categoriesOf(titles){
  const out={};
  for(let i=0;i<titles.length;i+=5){
    const j=await C.api({action:'query',titles:titles.slice(i,i+5).join('|'),prop:'categories',cllimit:'500'});
    for(const pg of (j.query&&j.query.pages)||[]){
      out[pg.title]=(pg.categories||[]).map(c=>c.title.replace(/^Category:/,''));
    }
    await new Promise(z=>setTimeout(z,120));
  }
  return out;
}
(async()=>{
  const titles=[...new Set(Object.values(picks))].filter(t=>t.startsWith('File:'));
  const cats=await categoriesOf(titles);
  fs.writeFileSync(OUT,JSON.stringify(cats,null,1));
  const missing=titles.filter(t=>!cats[t]);
  console.log('files',titles.length,'resolved',Object.keys(cats).length,'missing',missing.length);
  if(missing.length) console.log(missing.join('\n'));
  const all={};
  for(const t in cats) for(const c of cats[t]) (all[c]=all[c]||[]).push(t);
  console.log('distinct categories',Object.keys(all).length);
})();
