'use strict';
// Shared navigation only. Each course keeps its own app, URL and storage keys.
// Each course has its own site: PSYC301 (jordanxxlopez/COGNITIVEPROCESSES), LING406 (jordanxxlopez/LING406),
// LING285 (jordanxxlopez/LING285) and BME423 (jordanxxlopez/BME423). The course on this site uses a relative
// link, so local previews work. The others use full URLs. HERE is the only line that differs between copies.
(() => {
 const HERE='psyc301';
 const SITES={psyc301:'https://jordanxxlopez.github.io/COGNITIVEPROCESSES/',ling406:'https://jordanxxlopez.github.io/LING406/',ling285:'https://jordanxxlopez.github.io/LING285/',bme423:'https://jordanxxlopez.github.io/BME423/'};
 const script=document.currentScript;
 if(!script)return;
 const base=new URL('.',script.src);
 const revision=new URL(script.src).searchParams.get('v');
 const courses=[
  {id:'PSYC301',site:'psyc301',path:''},
  {id:'BME423',site:'bme423',path:'bme423/'},
  {id:'LING406',site:'ling406',path:'ling406/'},
  {id:'LING285',site:'ling285',path:'ling285/'}
 ];
 const href=c=>new URL(c.path,c.site===HERE?base:SITES[c.site]);
 const current=courses.find(c=>c.site===HERE)||courses[0];
 function mount(){
  const sidebar=document.getElementById('sidebar');
  if(!sidebar||sidebar.querySelector('[data-course-switcher]'))return;
  const brand=sidebar.querySelector('.brand-row')||sidebar.querySelector('.brand');
  const courseName=sidebar.querySelector('.course-name')||brand?.nextElementSibling;
  if(!courseName)return;
  const label=document.createElement('label');
  label.className='study-course-switcher';label.setAttribute('data-course-switcher','');
  const caption=document.createElement('span');caption.textContent='Course';
  const select=document.createElement('select');
  select.setAttribute('aria-label','Switch course');select.setAttribute('data-course-select','');
  for(const c of courses){const option=document.createElement('option');option.value=c.id;option.textContent=c.id;option.selected=c.id===current.id;select.append(option)}
  select.addEventListener('change',()=>{
   const destination=courses.find(c=>c.id===select.value);
   if(destination&&destination.id!==current.id){
    const target=href(destination);
    if(revision&&destination.site===HERE)target.searchParams.set('v',revision);
    location.assign(target.href);
   }
  });
  // Restore the active option if Back/Forward restores a cached page.
  addEventListener('pageshow',()=>{select.value=current.id});
  label.append(caption,select);courseName.after(label);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
