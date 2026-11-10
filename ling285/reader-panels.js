'use strict';
// Reuse the retained app's reader, navigation and study-state handlers. This
// adapter adds the PSYC301 panel structure without changing original course data.
(() => {
 const content=document.getElementById('content'),dialog=document.getElementById('readerDialog');
 if(!content || !dialog)return;
 let scheduled=false,allPages=null,pendingScroll=null;
 const positions=new Map(),panels=new WeakSet();
 const params=()=>new URLSearchParams(location.search);
 const collection=()=>params().get('view')==='collection'?params().get('lecture'):null;
 const storageKey='ling285-reader-page-positions';
 try{for(const [key,value] of Object.entries(JSON.parse(sessionStorage.getItem(storageKey) || '{}')))positions.set(key,value);}catch{}
 function remember(id,value){
  if(!id)return;positions.set(id,value);
  try{sessionStorage.setItem(storageKey,JSON.stringify(Object.fromEntries(positions)));}catch{}
 }
 function containWheel(event){
  if(event.ctrlKey || !event.deltaY || Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
  const pane=event.currentTarget,down=event.deltaY>0;
  // A textarea or another nested scrollable control gets the first chance to
  // consume the gesture. Only a gesture with nowhere left inside is contained.
  for(const node of event.composedPath()){
   if(!(node instanceof Element))continue;
   const css=getComputedStyle(node);
   if(/auto|scroll/.test(css.overflowY) && node.scrollHeight>node.clientHeight+1){
    if(down?node.scrollTop+node.clientHeight<node.scrollHeight-1:node.scrollTop>1)return;
   }
   if(node===pane)break;
  }
  event.preventDefault();
 }
 function prepare(root){
  const pair=root.querySelector('.reader-stage .section-pair');if(!pair)return;
  root.classList.add('split-reader');
  const controls=root.querySelector('.reader-controls');
  if(controls && !controls.dataset.splitLayout){
   controls.dataset.splitLayout='true';
   const navigation=document.createElement('div');navigation.className='reader-navigation';navigation.setAttribute('role','group');navigation.setAttribute('aria-label','Slide navigation');
   const tools=document.createElement('div');tools.className='reader-tools';tools.setAttribute('role','group');tools.setAttribute('aria-label','Teaching controls');
   const select=controls.querySelector('#readerSelect');
   for(const node of [controls.querySelector('[data-action=readerPrevious]'),select?.closest('.fit-select-field') || select,controls.querySelector('[data-action=readerNext]'),controls.querySelector('.reader-position')])if(node)navigation.append(node);
   tools.append(...controls.children);controls.append(navigation,tools);
  }
  const text=pair.firstElementChild,visual=pair.querySelector(':scope>.source-figure');
  if(!text || !visual)return;
  // Recover a footer if the fitting observer saw this reader before this adapter.
  const footer=pair.parentElement.querySelector(':scope>.fit-study-footer');if(footer)text.append(footer);
  for(const [node,name,label] of [[text,'reader-transcript','Transcript'],[visual,'reader-visual','Slides and videos']]){
   node.classList.add(name);node.tabIndex=0;node.setAttribute('role','region');node.setAttribute('aria-label',label);
   if(!panels.has(node)){node.addEventListener('wheel',containWheel,{passive:false});panels.add(node);}
  }
  if(root!==dialog){
   content.dataset.splitReader='true';
   const label=content.querySelector(':scope>.eyebrow');
   if(label){const title=document.createElement('h1');title.className='collection-reader-title';title.textContent=label.textContent;label.replaceWith(title);}
   const close=root.querySelector('[data-action=closeReader]');if(close && close.textContent!=='All source pages')close.textContent='All source pages';
   const top=root.getBoundingClientRect().top,viewport=window.visualViewport?.height || innerHeight;
   const height=Math.max(0,Math.floor(viewport-Math.max(0,top)-16));
   if(root.style.getPropertyValue('--split-reader-height')!==height+'px')root.style.setProperty('--split-reader-height',height+'px');
  }
  const select=root.querySelector('#readerSelect');if(select)remember(collection(),select.value);
  if(pendingScroll){
   text.scrollTop=pendingScroll.text;visual.scrollTop=pendingScroll.visual;pendingScroll=null;
  }
 }
 function enhance(){
  scheduled=false;
  const inline=content.querySelector('.inline-reader');
  if(inline)prepare(inline);else delete content.dataset.splitReader;
  if(dialog.open)prepare(dialog);
  const id=collection();
  if(!inline && !dialog.open && id && id!==allPages && /^lecture\d/.test(id)){
   const button=content.querySelector('[data-reader=lecture][data-expanded=false]');
   if(button){
    const index=positions.get(id) || '0';button.click();
    const select=content.querySelector('#readerSelect');
    if(select && [...select.options].some(o=>o.value===index) && select.value!==index){select.value=index;select.dispatchEvent(new Event('change',{bubbles:true}));}
    const current=content.querySelector('.inline-reader');if(current)prepare(current);
   }
  }
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(enhance);}}
 const observer=new MutationObserver(schedule);
 for(const root of [content,dialog])observer.observe(root,{childList:true,subtree:true});
 document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.matches('[data-action=closeReader]') && button.closest('.inline-reader'))allPages=collection();
  else if(button.matches('[data-collection],[data-go],[data-module],[data-reader]'))allPages=null;
 },true);
 document.addEventListener('change',event=>{
  if(event.target.matches('[data-transcript-version]')){
   const root=event.target.closest('.split-reader');
   if(root)pendingScroll={text:root.querySelector('.reader-transcript')?.scrollTop || 0,visual:root.querySelector('.reader-visual')?.scrollTop || 0};
  }
 },true);
 // Controls and wrapped selection labels can change height after a version,
 // font-size, viewport or sidebar change.
 const resize=new ResizeObserver(schedule);resize.observe(content);resize.observe(dialog);
 window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);
 window.addEventListener('popstate',()=>{allPages=null;schedule();});
 enhance();
})();
