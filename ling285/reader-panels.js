'use strict';
// Fit the native notes / inline / expanded modes. Opening a collection never
// chooses a reader mode or replaces its heading and view controls.
(() => {
 const content=document.getElementById('content'),dialog=document.getElementById('readerDialog');
 if(!content || !dialog)return;
 let scheduled=false,pendingScroll=null;
 const panels=new WeakSet(),controls=new Set();
 function containWheel(event){
  if(event.ctrlKey || !event.deltaY || Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
  const pane=event.currentTarget,down=event.deltaY>0;
  for(const node of event.composedPath()){
   if(!(node instanceof Element))continue;
   if(/auto|scroll/.test(getComputedStyle(node).overflowY) && node.scrollHeight>node.clientHeight+1){
    if(down?node.scrollTop+node.clientHeight<node.scrollHeight-1:node.scrollTop>1)return;
   }
   if(node===pane)break;
  }
  event.preventDefault();
 }
 function prepare(root){
  const pair=root.querySelector('.reader-stage .section-pair');if(!pair)return;
  root.classList.add('split-reader');
  const text=pair.firstElementChild,visual=pair.querySelector(':scope>.source-figure');
  if(!text || !visual)return;
  const footer=pair.parentElement.querySelector(':scope>.fit-study-footer');if(footer)text.append(footer);
  for(const [node,name,label] of [[text,'reader-transcript','Transcript'],[visual,'reader-visual','Slides and videos']]){
   node.classList.add(name);node.tabIndex=0;node.setAttribute('role','region');node.setAttribute('aria-label',label);
   if(!panels.has(node)){node.addEventListener('wheel',containWheel,{passive:false});panels.add(node);}
  }
  const bar=root.querySelector('.reader-controls');
  if(bar){
   if(!controls.has(bar)){resize.observe(bar);controls.add(bar);}
   const height=Math.ceil(bar.getBoundingClientRect().height)+'px';
   if(root.style.getPropertyValue('--reader-controls-height')!==height)root.style.setProperty('--reader-controls-height',height);
   if(root!==dialog){
    const helper=root.querySelector('.reader-helper'),stage=root.querySelector('.reader-stage');
    const outerHeight=node=>{if(!node)return 0;const css=getComputedStyle(node);return node.getBoundingClientRect().height+parseFloat(css.marginBlockStart || 0)+parseFloat(css.marginBlockEnd || 0);};
    const viewport=window.visualViewport?.height || innerHeight;
    const reserve=outerHeight(bar)+outerHeight(helper)+parseFloat(getComputedStyle(stage).marginBlockStart || 0)+parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || 0)+16;
    const available=Math.max(0,Math.floor(Math.min(viewport*.76,viewport-reserve)))+'px';
    if(root.style.getPropertyValue('--reader-panel-height')!==available)root.style.setProperty('--reader-panel-height',available);
   }
  }
  if(pendingScroll){text.scrollTop=pendingScroll.text;visual.scrollTop=pendingScroll.visual;pendingScroll=null;}
 }
 function enhance(){
  scheduled=false;
  const inline=content.querySelector('.inline-reader');
  content.toggleAttribute('data-split-reader',Boolean(inline));
  if(inline)prepare(inline);
  if(dialog.open)prepare(dialog);
  for(const bar of controls)if(!bar.isConnected){resize.unobserve(bar);controls.delete(bar);}
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(enhance);}}
 const observer=new MutationObserver(schedule);
 for(const root of [content,dialog])observer.observe(root,{childList:true,subtree:true});
 const resize=new ResizeObserver(schedule);resize.observe(content);resize.observe(dialog);
 document.addEventListener('change',event=>{
  if(!event.target.matches('[data-transcript-version]'))return;
  const root=event.target.closest('#readerDialog') || content.querySelector('.inline-reader');
  if(root)pendingScroll={text:root.querySelector('.reader-transcript')?.scrollTop || 0,visual:root.querySelector('.reader-visual')?.scrollTop || 0};
 },true);
 window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);
 enhance();
})();
