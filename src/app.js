(function(){
'use strict';
var D=window.__DATA__, IMG=window.__IMG__;
var TC={Feast:'#a8792c',Event:'#7a6e5a',Prophet:'#5f7c86',Teaching:'#6f8a5f',Miracle:'#4f7a86',Parable:'#8a6f4f'};
var state={mode:'text',active:null,chapter:1,detail:null,tab:1,hot:1,pick:{}};
var byId={}; D.passages.forEach(function(p){byId[p.id]=p;});
var chapters=[];
D.passages.forEach(function(p){
  var c=chapters[chapters.length-1];
  if(!c||c.ch!==p.ch){c={ch:p.ch,title:D.chapterTitles[p.ch]||('Chapter '+p.ch),passages:[]};chapters.push(c);}
  c.passages.push(p);
});
function el(tag,attrs,kids){
  var n=document.createElement(tag);
  if(attrs) for(var k in attrs){
    if(k==='class')n.className=attrs[k];
    else if(k==='html')n.innerHTML=attrs[k];
    else if(k==='text')n.textContent=attrs[k];
    else if(k.slice(0,2)==='on')n.addEventListener(k.slice(2),attrs[k]);
    else if(attrs[k]!=null&&attrs[k]!==false)n.setAttribute(k,attrs[k]);
  }
  (kids||[]).forEach(function(c){ if(c) n.appendChild(typeof c==='string'?document.createTextNode(c):c); });
  return n;
}
function src(key){ return IMG[key]||''; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
function versesHTML(p,cls){
  return p.verses.map(function(v){return '<span><sup>'+v.n+'</sup>'+esc(v.t)+' </span>';}).join('');
}
// Tier b is now only the type icon: the image the Church attaches to a passage without
// depicting its verses (the Good Shepherd at the Lost Sheep, Jonah at the sign of Jonah).
// Nothing stands in for anything else — a passage with no icon of its own simply has none.
var TIERB='This is the icon the Church attaches to this passage; it is not a depiction of these verses.';

/* ---------------- a passage's icons ---------------- */
// A passage may carry several icons OF THE SAME SCENE — the Theophany at Ohrid beside the
// Theophany on Athos. They are alternatives, not a sequence: the first leads, and it is the
// one that carries the positioned markers. Which one the reader last chose is remembered per
// passage, so the drawer, the plate and the full-size view all agree.
function imgsOf(p){ return (p.imgs&&p.imgs.length?p.imgs:(p.img?[p.img]:[])); }
function selIdx(p){
  var n=imgsOf(p).length;
  var i=state.pick[p.id]||0;
  return i<n?i:0;
}
function selKey(p){ return imgsOf(p)[selIdx(p)]||null; }
function rec(k){ return k?D.images[k]:null; }
// The card or plate already rendered in the stream for this passage. Choosing an icon in the
// drawer has to move it too, or closing the drawer reveals a card still showing the primary.
function syncStream(p){
  var row=document.getElementById('p-'+p.id);
  if(!row) return;
  var k=selKey(p), im=rec(k);
  var img=row.querySelector('.frame img');
  if(img&&k) img.setAttribute('src',src(k));
  var i=selIdx(p);
  row.querySelectorAll('.stripthumbs button').forEach(function(b,j){
    b.setAttribute('aria-current',j===i?'true':'false');});
  var tb=row.querySelector('.tierb');
  if(tb&&im) tb.textContent=(row.classList.contains('plate')?'Icon shown: '+im.label+' · '+TIERB:im.label);
}
// The strip of alternatives. `onpick` gets the new index; it is not rendered for a passage
// with only one icon.
function strip(p,current,onpick){
  var ks=imgsOf(p);
  if(ks.length<2) return null;
  var wrap=el('div',{class:'strip'});
  wrap.appendChild(el('div',{class:'striplab',
    text:ks.length+' icons of this scene — the Church has painted it more than once'}));
  var row=el('div',{class:'stripthumbs'});
  ks.forEach(function(k,i){
    var im=D.images[k];
    row.appendChild(el('button',{'aria-current':i===current?'true':'false',
      title:im.label,onclick:function(e){e.stopPropagation();onpick(i);}},[
      el('img',{src:src(k),alt:im.label,loading:'lazy'})]));
  });
  wrap.appendChild(row);
  return wrap;
}


/* ---------------- full-size icon ---------------- */
// Every icon is embedded at 660px wide. The card crops it, the drawer reduces it; this is the
// one view that shows the icon whole, at its own size, as large as the window allows.
var lbEl=null;
function closeLightbox(){
  if(lbEl&&lbEl.parentNode) lbEl.parentNode.removeChild(lbEl);
  lbEl=null;
}
function openLightbox(p,idx){
  closeLightbox();
  var ks=imgsOf(p);
  if(!ks.length) return;
  var i=(idx==null?selIdx(p):idx);
  if(i<0) i=ks.length-1; if(i>=ks.length) i=0;
  var im=D.images[ks[i]];
  if(!im) return;
  var fig=el('figure',{onclick:function(e){e.stopPropagation();}},[
    el('img',{src:src(ks[i]),alt:p.name}),
    el('figcaption',{},[
      el('b',{text:p.name}),
      el('span',{text:im.label+' · '+p.range}),
      ks.length>1?el('span',{class:'of',text:'Icon '+(i+1)+' of '+ks.length+' of this scene'}):null])]);
  lbEl=el('div',{class:'lightbox',role:'dialog','aria-label':p.name,onclick:closeLightbox},[
    fig,
    el('button',{class:'lbclose',text:'×','aria-label':'Close',onclick:closeLightbox})]);
  if(ks.length>1){
    lbEl.appendChild(el('button',{class:'lbnav prev',text:'‹','aria-label':'Previous icon of this scene',
      onclick:function(e){e.stopPropagation();lbGo(p,i-1);}}));
    lbEl.appendChild(el('button',{class:'lbnav next',text:'›','aria-label':'Next icon of this scene',
      onclick:function(e){e.stopPropagation();lbGo(p,i+1);}}));
  }
  document.body.appendChild(lbEl);
  lbCtx={p:p,i:i};
}
var lbCtx=null;
// Stepping in the full-size view also moves the selection behind it, so closing the lightbox
// leaves the drawer showing the icon the reader stopped on rather than snapping back.
function lbGo(p,i){
  var n=imgsOf(p).length;
  i=(i+n)%n;
  state.pick[p.id]=i;
  state.hot=1;
  syncStream(p);
  openLightbox(p,i);
  if(state.detail===p.id) renderDrawer(true);
}
function zoomable(p,getIdx){
  return function(e){ e.stopPropagation(); e.preventDefault(); openLightbox(p,getIdx?getIdx():null); };
}

/* ---------------- rail ---------------- */
var railEl=document.getElementById('chapters');
function renderRail(){
  railEl.innerHTML='';
  chapters.forEach(function(c){
    var open=state.chapter===c.ch;
    var box=el('div');
    box.appendChild(el('button',{class:'chrow','aria-current':open?'true':'false',
      onclick:function(){jumpChapter(c.ch);}},[
      el('span',{class:'n',text:String(c.ch)}),
      el('span',{class:'t',text:c.title})]));
    if(open){
      var withIcon=c.passages.filter(function(p){return p.img;});
      var sub=el('div',{class:'sublist'});
      if(!withIcon.length) sub.appendChild(el('div',{class:'nohot',style:'font-size:12px;padding:2px 0',text:'No icon in this chapter yet'}));
      withIcon.forEach(function(p){
        sub.appendChild(el('button',{'aria-current':state.active===p.id?'true':'false',
          onclick:function(){jumpTo(p.id);}},[
          el('span',{class:'dot'}),
          el('span',{},[el('span',{class:'nm',text:p.name}),el('span',{class:'rg',text:p.range})])]));
      });
      box.appendChild(sub);
    }
    railEl.appendChild(box);
  });
}

/* ---------------- main ---------------- */
var mainEl=document.getElementById('stream');
function card(p,big){
  var ks=imgsOf(p);
  var i=selIdx(p);
  var im=rec(ks[i]);
  var img=el('img',{src:src(ks[i]),alt:p.name,loading:'lazy'});
  var frame=el('div',{class:'frame'},[el('div',{class:'in'},[img])]);
  if(big){
    var plate=el('div',{class:'plate',id:'p-'+p.id,'data-pid':p.id});
    frame.setAttribute('role','button');
    frame.setAttribute('tabindex','0');
    frame.setAttribute('title','See this icon at full size');
    frame.addEventListener('click',zoomable(p,function(){return selIdx(p);}));
    frame.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openLightbox(p,selIdx(p));}});
    var holder=el('div',{style:'position:relative'},[frame,
      el('div',{class:'ribbon',text:p.type==='Feast'?'Great Feast':(p.type||'From the Gospel')}),
      el('div',{class:'cap'},[el('div',{class:'rg',text:p.range}),el('div',{class:'nm',text:p.name})])]);
    plate.appendChild(holder);
    var tb=p.tier==='b'?el('div',{class:'tierb',text:'Icon shown: '+im.label+' · '+TIERB}):null;
    // Choosing another icon of the same scene swaps the picture in place. Re-rendering the
    // whole stream here would scroll the reader away from the plate they are looking at.
    var st=strip(p,i,function(n){
      state.pick[p.id]=n;
      state.hot=1;              // the new icon has its own markers; keep the highlight in range
      var k=imgsOf(p)[n];
      img.setAttribute('src',src(k));
      if(tb) tb.textContent='Icon shown: '+rec(k).label+' · '+TIERB;
      st.querySelectorAll('.stripthumbs button').forEach(function(b,j){
        b.setAttribute('aria-current',j===n?'true':'false');});
      if(state.detail===p.id) renderDrawer(true);
    });
    if(st) plate.appendChild(st);
    if(tb) plate.appendChild(tb);
    plate.appendChild(el('button',{class:'openbtn',text:'Open its story, the Fathers & the icon\u2019s meaning \u203a',
      onclick:function(){openDetail(p.id);}}));
    plate.appendChild(el('div',{class:'platebody'},[
      el('div',{class:'lab',text:'From the Gospel · '+p.range}),
      el('div',{class:'txt',html:versesHTML(p)})]));
    return plate;
  }
  // The small card is itself a button, so the thumbnails cannot live inside it — a button
  // inside a button is invalid and does not click through. It says how many icons there are
  // and the drawer shows them.
  var c=el('button',{class:'card',onclick:function(){openDetail(p.id);}});
  c.appendChild(frame);
  c.appendChild(el('div',{class:'nm',text:p.name}));
  c.appendChild(el('div',{class:'meta'},[
    el('span',{class:'rg',text:p.range}),
    p.type?el('span',{class:'tag',style:'border-color:'+(TC[p.type]||'#7a6e5a')+';color:'+(TC[p.type]||'#7a6e5a'),text:p.type}):null,
    ks.length>1?el('span',{class:'count',text:ks.length+' icons'}):null]));
  c.appendChild(el('div',{class:'hint',text:state.active===p.id?'panel open':'Story, Fathers & icon meaning \u203a'}));
  if(p.tier==='b') c.appendChild(el('div',{class:'tierb',text:im.label}));
  return c;
}
function renderStream(){
  mainEl.innerHTML='';
  var icons=state.mode==='icons';
  chapters.forEach(function(c){
    mainEl.appendChild(el('div',{class:'chapmark','data-chapter':c.ch,id:'ch-'+c.ch},[
      el('span',{class:'cn',text:'Chapter '+c.ch}),
      el('span',{class:'ct',text:c.title}),
      el('span',{class:'ln'})]));
    c.passages.forEach(function(p){
      if(icons){
        if(p.img){ mainEl.appendChild(card(p,true)); }
        else{
          mainEl.appendChild(el('div',{class:'plate',id:'p-'+p.id,'data-pid':p.id,
            style:'margin-bottom:18px'},[
            el('div',{class:'plain',style:'border-bottom:1px dotted var(--rule)'},[
              el('span',{style:'font-style:italic;color:var(--muted);font-size:16.5px',text:p.name}),
              el('span',{class:'rg',style:'font-size:12px;color:var(--gold)',text:p.range}),
              el('span',{style:'flex:1'}),
              el('button',{class:'openbtn',style:'margin:0',text:'read the verses ›',
                onclick:function(){setMode('text');setTimeout(function(){jumpTo(p.id);},60);}})])]));
        }
        return;
      }
      var row=el('div',{class:'passage'+(state.active===p.id?' on':''),id:'p-'+p.id,'data-pid':p.id});
      row.appendChild(el('div',{class:'verses',html:versesHTML(p)}));
      if(p.img) row.appendChild(card(p,false));
      else row.appendChild(el('div'));
      mainEl.appendChild(row);
    });
  });
}

/* ---------------- drawer ---------------- */
var scrim=document.getElementById('scrim');
function fatherBlock(f){
  return el('div',{class:'fq'},[
    el('div',{class:'qm',text:'“'}),
    el('div',{class:'t',text:f.t}),
    el('div',{class:'a',html:'☨&nbsp; <b>'+esc(f.n)+'</b>'+(f.w?', '+esc(f.w):'')})]);
}
// The drawer is the scrolling element, so bringing something into view means moving the
// drawer, not the page: scrollIntoView would drag the reading behind it along too.
// Move as little as possible. Pinning the row to a fixed offset from the top of the panel
// runs the drawer to its end and carries the icon off with it, so every marker lands in the
// same place; scrolling just far enough to uncover the row keeps the icon on screen above it.
function alignInDrawer(node){
  var d=scrim.querySelector('.drawer');
  if(!d) return;
  var M=16, dr=d.getBoundingClientRect(), nr=node.getBoundingClientRect(), delta=0;
  if(nr.bottom>dr.bottom-M) delta=nr.bottom-(dr.bottom-M);
  if(nr.top-delta<dr.top+M) delta=nr.top-(dr.top+M);
  if(!delta) return;
  d.scrollTo({top:Math.max(0,d.scrollTop+delta),behavior:'smooth'});
}
// `keep` re-renders without throwing the reader back to the top: switching to another icon
// of the same scene must not lose their place in the panel.
function renderDrawer(keep){
  var was=keep?(scrim.querySelector('.drawer')||{}).scrollTop||0:0;
  scrim.innerHTML='';
  if(!state.detail){scrim.style.display='none';return;}
  scrim.style.display='flex';
  var p=byId[state.detail], sel=selIdx(p), key=selKey(p), im=rec(key);
  var d=el('div',{class:'drawer',onclick:function(e){e.stopPropagation();}});
  d.appendChild(el('div',{class:'top'},[
    el('div',{},[el('div',{class:'rg',text:p.range}),el('h3',{text:p.name})]),
    el('button',{class:'close',text:'×','aria-label':'Close',onclick:closeDetail})]));
  if(im){
    d.appendChild(el('div',{class:'dimg'},[el('div',{class:'in'},[
      el('img',{src:src(key),alt:p.name,title:'See this icon at full size',
        onclick:zoomable(p,function(){return selIdx(p);})})])]));
    d.appendChild(el('div',{class:'zoomhint',text:'Tap the icon to see it at full size.'}));
    // The alternatives, each with its own credit and its own reading below.
    var st=strip(p,sel,function(n){ state.pick[p.id]=n; state.hot=1; syncStream(p); renderDrawer(true); });
    if(st) d.appendChild(st);
    var cr=el('div',{class:'credit'});
    cr.innerHTML='<b style="color:var(--ink2);font-weight:600">'+esc(im.label)+'</b><br>'+esc(im.title)+(im.date?' · '+esc(im.date):'')+
      (im.artist?' · '+esc(im.artist):'')+' · '+esc(im.license)+
      (im.page?' · <a href="'+im.page+'" target="_blank" rel="noopener">Wikimedia Commons</a>':'');
    d.appendChild(cr);
    if(p.tier==='b') d.appendChild(el('div',{class:'srcnote',text:TIERB}));
  }
  var meta=el('div',{style:'display:flex;gap:8px;align-items:center;margin:12px 0 4px'});
  if(p.type) meta.appendChild(el('span',{class:'tag',
    style:'border-color:'+(TC[p.type]||'#7a6e5a')+';color:'+(TC[p.type]||'#7a6e5a'),text:p.type}));
  meta.appendChild(el('span',{style:'font-size:12px;color:var(--faint)',text:'Eastern Orthodox iconography'}));
  d.appendChild(meta);

  var labels=['Scripture Story','Wisdom of the Fathers','Deciphering the Icon'];
  var tabs=el('div',{class:'tabs'});
  labels.forEach(function(l,i){
    tabs.appendChild(el('button',{'aria-selected':state.tab===i+1?'true':'false',role:'tab',text:l,
      onclick:function(){state.tab=i+1;renderDrawer();}}));
  });
  d.appendChild(tabs);

  if(state.tab===1){
    var b=el('div');
    if(p.keyText) b.appendChild(el('div',{class:'keyq'},[
      el('p',{text:'“'+p.keyText+'”'}),el('cite',{text:'— '+(p.keyRef||p.range)})]));
    if(p.story) b.appendChild(el('div',{class:'story',text:p.story}));
    else b.appendChild(el('div',{class:'story',html:versesHTML(p)}));
    d.appendChild(b);
  }else if(state.tab===2){
    var f=el('div');
    if(p.fathers.length){ p.fathers.forEach(function(x){f.appendChild(fatherBlock(x));});
      f.appendChild(el('div',{class:'srcnote',
        text:D.book.catenaShort}));
    } else f.appendChild(el('div',{class:'nohot',text:'No patristic comment on this passage in the present collection.'}));
    d.appendChild(f);
  }else{
    var h=el('div');
    var hot=(im&&im.hot)||[];
    if(im&&im.read){
      h.appendChild(el('div',{class:'iconread',text:im.read}));
    }
    if(im&&hot.length){
      h.appendChild(el('div',{class:'hotintro',text:'Tap a marker to read what each part of the icon means.'}));
      // Selecting a marker only moves the highlight: re-rendering the drawer would rebuild the
      // scrolling element and throw the reader back to the top of the panel.
      var marks=[],rows=[];
      var selectHot=function(n,align){
        state.hot=n;
        marks.forEach(function(b,j){b.setAttribute('aria-current',j===n-1?'true':'false');});
        rows.forEach(function(b,j){b.setAttribute('aria-current',j===n-1?'true':'false');});
        if(align&&rows[n-1]) alignInDrawer(rows[n-1]);
      };
      var wrap=el('div',{class:'hotwrap'},[el('img',{src:src(key),alt:p.name,
        title:'See this icon at full size',onclick:zoomable(p,function(){return selIdx(p);})})]);
      hot.forEach(function(x,i){
        var b=el('button',{class:'hot',style:'top:'+x[2]+';left:'+x[3],
          'aria-current':state.hot===i+1?'true':'false',text:String(i+1),
          onclick:function(){selectHot(i+1,true);}});
        marks.push(b); wrap.appendChild(b);
      });
      h.appendChild(wrap);
      var list=el('div',{class:'hotlist'});
      hot.forEach(function(x,i){
        var b=el('button',{'aria-current':state.hot===i+1?'true':'false',
          onclick:function(){selectHot(i+1,false);}},[
          el('span',{class:'n',text:String(i+1)}),
          el('span',{},[el('span',{class:'l',text:x[0]}),el('span',{class:'x',text:x[1]})])]);
        rows.push(b); list.appendChild(b);
      });
      h.appendChild(list);
    }else if(im){
      h.appendChild(el('div',{class:'hotwrap'},[el('img',{src:src(key),alt:p.name,
        title:'See this icon at full size',onclick:zoomable(p,function(){return selIdx(p);})})]));
    }else{
      h.appendChild(el('div',{class:'nohot',text:'The Church has no traditional icon of this passage; it is read within the discourse it belongs to.'}));
    }
    if(p.notes && p.notes.length){
      h.appendChild(el('div',{class:'noteshead',text:'Points to notice in this passage'}));
      var nl=el('div',{class:'noteslist'});
      p.notes.forEach(function(n){
        nl.appendChild(el('div',{class:'note'},[
          el('span',{class:'l',text:n[0]}),
          el('span',{class:'x',text:n[1]})]));
      });
      h.appendChild(nl);
    }
    d.appendChild(h);
  }
  scrim.appendChild(d);
  if(was) d.scrollTop=was;
}
function openDetail(id){state.detail=id;state.active=id;state.tab=1;state.hot=1;renderDrawer();renderRail();markActive();}
function closeDetail(){closeLightbox();state.detail=null;renderDrawer();}
scrim.addEventListener('click',closeDetail);
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){ if(lbEl) closeLightbox(); else closeDetail(); return; }
  // Arrow keys step between the icons of one scene while the full-size view is open.
  if(!lbEl||!lbCtx) return;
  if(e.key==='ArrowLeft'){e.preventDefault();lbGo(lbCtx.p,lbCtx.i-1);}
  else if(e.key==='ArrowRight'){e.preventDefault();lbGo(lbCtx.p,lbCtx.i+1);}
});

function markActive(){
  document.querySelectorAll('.passage').forEach(function(n){
    n.classList.toggle('on',n.getAttribute('data-pid')===state.active);
    var hint=n.querySelector('.hint');
    if(hint) hint.textContent=(n.getAttribute('data-pid')===state.active)?'panel open':'Story, Fathers & icon meaning ›';
  });
}
function jumpTo(id){
  state.active=id;markActive();renderRail();
  var e=document.getElementById('p-'+id);
  if(e) window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY-90,behavior:'smooth'});
}
function jumpChapter(ch){
  state.chapter=ch;renderRail();
  var e=document.getElementById('ch-'+ch);
  if(e) window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY-84,behavior:'smooth'});
}
function setMode(m){
  if(state.mode===m)return;
  state.mode=m;
  document.querySelectorAll('.modes button').forEach(function(b){
    b.setAttribute('aria-pressed',b.getAttribute('data-mode')===m?'true':'false');});
  document.getElementById('modehint').textContent = m==='text'
    ? 'King James Version · open an icon for its story, the Fathers & its meaning'
    : 'The icons lead · the gospel text follows beneath each scene';
  document.getElementById('railnote').textContent = m==='text'
    ? 'The menu follows you as you read; open a chapter to see its icons.'
    : 'Each icon leads, with its gospel passage beneath. Switch to “Text leads” to read straight through.';
  renderStream();markActive();
}
document.querySelectorAll('.modes button').forEach(function(b){
  b.addEventListener('click',function(){setMode(b.getAttribute('data-mode'));});});

var bar=document.getElementById('bar'), pct=document.getElementById('pct');
var ticking=false;
function onScroll(){
  var h=document.documentElement.scrollHeight-window.innerHeight;
  var v=h>0?Math.min(100,Math.max(0,Math.round(window.scrollY/h*100))):0;
  bar.style.width=v+'%'; pct.textContent=v+'% through the reading';
  var ch=state.chapter;
  var marks=document.querySelectorAll('[data-chapter]');
  for(var i=0;i<marks.length;i++){
    if(marks[i].getBoundingClientRect().top<=160) ch=+marks[i].getAttribute('data-chapter'); else break;
  }
  if(ch!==state.chapter){state.chapter=ch;renderRail();}
  ticking=false;
}
window.addEventListener('scroll',function(){ if(!ticking){ticking=true;requestAnimationFrame(onScroll);} },{passive:true});

renderRail();renderStream();renderDrawer();onScroll();
})();
