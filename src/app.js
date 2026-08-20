(function(){
'use strict';
var D=window.__DATA__, IMG=window.__IMG__;
var TC={Feast:'#a8792c',Event:'#7a6e5a',Prophet:'#5f7c86',Teaching:'#6f8a5f',Miracle:'#4f7a86',Parable:'#8a6f4f'};
var state={mode:'text',active:null,chapter:1,detail:null,tab:1,hot:1};
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
var TIERB='This is the icon the Church reads over this passage; it belongs to the wider scene, not to these verses alone.';

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
  var im=p.img?D.images[p.img]:null;
  var frame=el('div',{class:'frame'},[
    el('div',{class:'in'},[el('img',{src:src(p.img),alt:p.name,loading:'lazy'})])]);
  if(big){
    var plate=el('div',{class:'plate',id:'p-'+p.id,'data-pid':p.id});
    var holder=el('div',{style:'position:relative'},[frame,
      el('div',{class:'ribbon',text:p.type==='Feast'?'Great Feast':(p.type||'From the Gospel')}),
      el('div',{class:'cap'},[el('div',{class:'rg',text:p.range}),el('div',{class:'nm',text:p.name})])]);
    plate.appendChild(holder);
    if(p.tier==='b') plate.appendChild(el('div',{class:'tierb',text:'Icon shown: '+im.label+' · '+TIERB}));
    plate.appendChild(el('button',{class:'openbtn',text:'Open its story, the Fathers & the icon’s meaning ›',
      onclick:function(){openDetail(p.id);}}));
    plate.appendChild(el('div',{class:'platebody'},[
      el('div',{class:'lab',text:'From the Gospel · '+p.range}),
      el('div',{class:'txt',html:versesHTML(p)})]));
    return plate;
  }
  var c=el('button',{class:'card',onclick:function(){openDetail(p.id);}});
  c.appendChild(frame);
  c.appendChild(el('div',{class:'nm',text:p.name}));
  c.appendChild(el('div',{class:'meta'},[
    el('span',{class:'rg',text:p.range}),
    p.type?el('span',{class:'tag',style:'border-color:'+(TC[p.type]||'#7a6e5a')+';color:'+(TC[p.type]||'#7a6e5a'),text:p.type}):null]));
  c.appendChild(el('div',{class:'hint',text:state.active===p.id?'panel open':'Story, Fathers & icon meaning ›'}));
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
function renderDrawer(){
  scrim.innerHTML='';
  if(!state.detail){scrim.style.display='none';return;}
  scrim.style.display='flex';
  var p=byId[state.detail], im=p.img?D.images[p.img]:null;
  var d=el('div',{class:'drawer',onclick:function(e){e.stopPropagation();}});
  d.appendChild(el('div',{class:'top'},[
    el('div',{},[el('div',{class:'rg',text:p.range}),el('h3',{text:p.name})]),
    el('button',{class:'close',text:'×','aria-label':'Close',onclick:closeDetail})]));
  if(im){
    d.appendChild(el('div',{class:'dimg'},[el('div',{class:'in'},[
      el('img',{src:src(p.img),alt:p.name})])]));
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
        text:'Quoted verbatim from the Catena Aurea on the Gospel of St Matthew, compiled by St Thomas Aquinas from the Fathers (Oxford: J.G.F. & J. Rivington, 1842; public domain).'}));
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
      var wrap=el('div',{class:'hotwrap'},[el('img',{src:src(p.img),alt:p.name})]);
      hot.forEach(function(x,i){
        wrap.appendChild(el('button',{class:'hot',style:'top:'+x[2]+';left:'+x[3],
          'aria-current':state.hot===i+1?'true':'false',text:String(i+1),
          onclick:function(){state.hot=i+1;renderDrawer();}}));
      });
      h.appendChild(wrap);
      var list=el('div',{class:'hotlist'});
      hot.forEach(function(x,i){
        list.appendChild(el('button',{'aria-current':state.hot===i+1?'true':'false',
          onclick:function(){state.hot=i+1;renderDrawer();}},[
          el('span',{class:'n',text:String(i+1)}),
          el('span',{},[el('span',{class:'l',text:x[0]}),el('span',{class:'x',text:x[1]})])]));
      });
      h.appendChild(list);
    }else if(im){
      h.appendChild(el('div',{class:'hotwrap'},[el('img',{src:src(p.img),alt:p.name})]));
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
}
function openDetail(id){state.detail=id;state.active=id;state.tab=1;state.hot=1;renderDrawer();renderRail();markActive();}
function closeDetail(){state.detail=null;renderDrawer();}
scrim.addEventListener('click',closeDetail);
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDetail();});

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
