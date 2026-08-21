// Download candidate images serially (parallel downloads get rate-limited into HTML error
// pages that land on disk with a .jpg name — HANDOFF) and check what actually arrived.
const C=require('../commons.js');
const fs=require('fs'),cp=require('child_process');
const D=__dirname, RAW=D+'/raw';
if(!fs.existsSync(RAW)) fs.mkdirSync(RAW);
const UA='BibliconStudy/1.0 (anthonymaalouly@gmail.com)';
const md5=s=>require('crypto').createHash('md5').update(s).digest('hex').slice(0,12);
const sleep=ms=>new Promise(z=>setTimeout(z,ms));

async function grab(titles,width){
  const meta={};
  for(let i=0;i<titles.length;i+=5){
    const j=await C.api({action:'query',titles:titles.slice(i,i+5).join('|'),prop:'imageinfo',
      iiprop:'url|size|extmetadata',iiurlwidth:String(width)});
    for(const pg of (j.query&&j.query.pages)||[]){
      const ii=pg.imageinfo&&pg.imageinfo[0]; if(!ii) continue;
      const em=ii.extmetadata||{}; const g=k=>em[k]&&String(em[k].value).replace(/<[^>]*>/g,'').trim();
      meta[pg.title]={thumb:ii.thumburl,url:ii.url,w:ii.width,h:ii.height,
        license:g('LicenseShortName')||'',artist:g('Artist')||'',
        date:g('DateTimeOriginal')||g('DateTime')||'',credit:g('Credit')||'',
        desc:(g('ImageDescription')||'').slice(0,300),
        page:'https://commons.wikimedia.org/wiki/'+encodeURIComponent(pg.title.replace(/ /g,'_'))};
    }
    await sleep(150);
  }
  const ok=[],bad=[];
  for(const t of titles){
    const m=meta[t];
    if(!m||!m.thumb){ bad.push([t,'no imageinfo']); continue; }
    const k=md5(t), out=RAW+'/'+k+'.img';
    if(!fs.existsSync(out)){
      // upload.wikimedia.org rate-limits hard: a 429 is normal, not a dead file. Back off and
      // retry rather than losing the candidate (HANDOFF: fetch serially, check what arrived).
      let got=null,err='';
      for(let a=0;a<6;a++){
        const r=await fetch(m.thumb,{headers:{'User-Agent':UA}});
        if(r.ok){ got=Buffer.from(await r.arrayBuffer()); break; }
        err='http '+r.status;
        const ra=+(r.headers.get('retry-after')||0);
        await sleep(Math.max(ra*1000, 1500*Math.pow(1.8,a)));
      }
      if(!got){ bad.push([t,err]); continue; }
      fs.writeFileSync(out,got);
      await sleep(700);
    }
    const kind=cp.execSync('file -b '+JSON.stringify(out)).toString().trim();
    if(!/image|bitmap|PNG|JPEG|TIFF|Web/i.test(kind)){ bad.push([t,'not an image: '+kind.slice(0,40)]); fs.unlinkSync(out); continue; }
    ok.push({title:t,key:k,file:out,meta:m,kind:kind.split(',')[0]});
  }
  return {ok,bad,meta};
}
module.exports={grab,md5,RAW};
if(require.main===module){
  const titles=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
  const width=+(process.argv[4]||900);
  grab(titles,width).then(r=>{
    fs.writeFileSync(process.argv[3],JSON.stringify({ok:r.ok,bad:r.bad,meta:r.meta},null,1));
    console.log('downloaded',r.ok.length,'failed',r.bad.length);
    r.bad.forEach(b=>console.log('  x',b[0].slice(0,70),'—',b[1]));
  });
}
