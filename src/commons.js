const UA='BibliconStudy/1.0 (anthonymaalouly@gmail.com)';
const API='https://commons.wikimedia.org/w/api.php';
async function api(params){
  const u=new URL(API); u.searchParams.set('format','json'); u.searchParams.set('formatversion','2');
  for(const k in params) u.searchParams.set(k,params[k]);
  for(let a=0;a<5;a++){
    const r=await fetch(u,{headers:{'User-Agent':UA}});
    if(r.ok) return await r.json();
    if(a===4) { console.error('API '+r.status); return {__error:r.status}; }
    await new Promise(z=>setTimeout(z, 800*Math.pow(2,a)));
  }
}
async function catMembers(cat,limit=200){
  const out=[]; let cont;
  do{
    const p={action:'query',list:'categorymembers',cmtitle:'Category:'+cat,cmtype:'file',cmlimit:'200'};
    if(cont) p.cmcontinue=cont;
    const j=await api(p);
    if(j.__error||!j.query) return out;
    out.push(...j.query.categorymembers.map(m=>m.title));
    cont=j.continue&&j.continue.cmcontinue;
  }while(cont&&out.length<limit);
  return out;
}
async function search(q,limit=20){
  const j=await api({action:'query',list:'search',srsearch:q+' filetype:bitmap',srnamespace:'6',srlimit:String(limit)});
  return (j.query&&j.query.search||[]).map(s=>s.title);
}
async function info(titles){
  const out={};
  for(let i=0;i<titles.length;i+=5){
    const j=await api({action:'query',titles:titles.slice(i,i+5).join('|'),prop:'imageinfo',
      iiprop:'url|size|extmetadata',iiurlwidth:'900'});
    for(const pg of (j.query&&j.query.pages)||[]){
      const ii=pg.imageinfo&&pg.imageinfo[0]; if(!ii) continue;
      const em=ii.extmetadata||{}; const g=k=>em[k]&&String(em[k].value).replace(/<[^>]*>/g,'').trim();
      out[pg.title]={thumb:ii.thumburl,url:ii.url,w:ii.width,h:ii.height,
        license:g('LicenseShortName')||'', artist:g('Artist')||'', date:g('DateTimeOriginal')||g('DateTime')||'',
        credit:g('Credit')||'', desc:(g('ImageDescription')||'').slice(0,200),
        page:'https://commons.wikimedia.org/wiki/'+encodeURIComponent(pg.title.replace(/ /g,'_'))};
    }
  }
  return out;
}
const PD=/public domain|pd-|cc0|no known copyright/i;
module.exports={api,catMembers,search,info,PD};
async function catSearch(q,limit=15){
  const j=await api({action:'query',list:'search',srsearch:q,srnamespace:'14',srlimit:String(limit)});
  return (j.query&&j.query.search||[]).map(s=>s.title.replace(/^Category:/,''));
}
module.exports.catSearch=catSearch;
async function subcats(cat){
  const j=await api({action:'query',list:'categorymembers',cmtitle:'Category:'+cat,cmtype:'subcat',cmlimit:'500'});
  return ((j.query&&j.query.categorymembers)||[]).map(m=>m.title.replace(/^Category:/,''));
}
module.exports.subcats=subcats;
