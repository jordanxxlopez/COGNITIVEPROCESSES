'use strict';
// Shared course-local activity. Each square counts active study minutes, not visits.
(()=>{
 const palette=document.querySelector('link[data-studio-gradient]')?.dataset.studioGradient;if(!palette)return;
 const KEY='study-studio-activity-'+palette;
 let days={},lastAction=Date.now(),lastTick=Date.now(),lastMinute='';
 try{days=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{}
 const dateKey=date=>{const d=date||new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
 function write(){try{const latest=JSON.parse(localStorage.getItem(KEY)||'{}');for(const [day,value] of Object.entries(latest))days[day]=Math.max(days[day]||0,value);localStorage.setItem(KEY,JSON.stringify(days))}catch{}}
 function active(){lastAction=Date.now()}
 for(const e of ['pointerdown','keydown','scroll','input'])document.addEventListener(e,active,{passive:true});
 function tick(){
  const now=Date.now(),elapsed=Math.min(now-lastTick,30000);lastTick=now;
  if(document.visibilityState==='hidden'||now-lastAction>90000)return;
  // Accumulate only elapsed foreground time and prevent double counting across tabs.
  carry+=elapsed;if(carry<60000)return;carry-=60000;
  const minute=Math.floor(now/60000),day=dateKey(),marker=day+':'+minute;
  try{if(localStorage.getItem(KEY+'-minute')===marker)return;localStorage.setItem(KEY+'-minute',marker)}catch{}
  if(lastMinute===marker)return;lastMinute=marker;
  days[day]=(days[day]||0)+1;write();if(panel?.open)draw();
 }
 let carry=0,panel;
 function draw(){
  const grid=panel.querySelector('.activity-grid');grid.replaceChildren();
  const end=new Date();end.setHours(12,0,0,0);const start=new Date(end);start.setDate(end.getDate()-84-end.getDay());
  for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1)){
   const key=dateKey(d),minutes=days[key]||0,level=minutes>=60?4:minutes>=30?3:minutes>=10?2:minutes?1:0;
   const cell=document.createElement('button');cell.type='button';cell.className='activity-cell';cell.dataset.level=level;
   const label=d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})+' · '+minutes+' active study minute'+(minutes===1?'':'s');
   cell.title=label;cell.setAttribute('aria-label',label);cell.onclick=()=>{panel.querySelector('.activity-detail').textContent=label};grid.append(cell);
  }
  const today=days[dateKey()]||0;panel.querySelector('.activity-detail').textContent=today+' active study minute'+(today===1?'':'s')+' today';
 }
 function mount(){
  // Sidebar-only addition: no collection or workspace teaching DOM is modified.
  const sidebar=document.getElementById('sidebar');if(!sidebar||sidebar.querySelector('.study-activity'))return;
  panel=document.createElement('details');panel.className='study-activity';
  panel.innerHTML='<summary>Daily activity</summary><div class="activity-inner"><div class="activity-title"></div><div class="activity-grid" aria-label="Daily active study minutes"></div><div class="activity-legend"><span>Less</span><i data-level="0"></i><i data-level="1"></i><i data-level="2"></i><i data-level="3"></i><i data-level="4"></i><span>More</span></div><p class="activity-detail" aria-live="polite"></p><p class="activity-note">Last 13 weeks · active minutes<br>Tracking starts here; saved in this browser.</p></div>';
  panel.querySelector('.activity-title').textContent=palette.toUpperCase();panel.addEventListener('toggle',()=>{if(panel.open)draw()});sidebar.append(panel);draw();
 }
 const style=document.createElement('style');style.textContent=`
 .study-activity{margin:20px 0 12px;border:1px solid var(--line,#718096);border-radius:12px;overflow:hidden;color:inherit;font-size:12px}
 .study-activity>summary{padding:12px 14px;background-image:var(--studio-pop-heading);font-weight:700}
 .activity-inner{padding:12px}.activity-title{font-size:11px;letter-spacing:.08em;margin-bottom:10px;font-weight:700}
 .activity-grid{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,11px);grid-auto-columns:11px;gap:3px;max-width:100%}
 #sidebar .study-activity .activity-grid .activity-cell,.activity-legend i{display:block;width:11px;min-width:0;height:11px;min-height:0;padding:0;border:0;border-radius:2px;background-image:var(--studio-pop-hero);margin:0}
 .activity-cell[data-level="0"],.activity-legend [data-level="0"]{opacity:.12}.activity-cell[data-level="1"],.activity-legend [data-level="1"]{opacity:.35}.activity-cell[data-level="2"],.activity-legend [data-level="2"]{opacity:.55}.activity-cell[data-level="3"],.activity-legend [data-level="3"]{opacity:.8}
 .activity-legend{display:flex;align-items:center;justify-content:flex-end;gap:4px;margin:12px 0;font-size:10px}.activity-detail{margin:10px 0;font-size:12px}.activity-note{margin:10px 0 0;font-size:11px;opacity:.8;line-height:1.6}
 `;document.head.append(style);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
 setInterval(tick,15000);document.addEventListener('visibilitychange',()=>{lastTick=Date.now()});window.addEventListener('pagehide',write);
})();
