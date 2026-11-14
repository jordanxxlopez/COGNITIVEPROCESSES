'use strict';
// Shared navigation only. Each course keeps its own app, URL and storage keys.
// BME423 has its own site (jordanxxlopez/BME423). PSYC301, LING406 and LING285 stay on the Study Studio
// site (jordanxxlopez/COGNITIVEPROCESSES). Courses on this site use relative links, so local previews work.
// Courses on the other site use full URLs. HERE is the only line that differs between the two copies.
(() => {
 const HERE='studio';
 const SITES={studio:'https://jordanxxlopez.github.io/COGNITIVEPROCESSES/',bme423:'https://jordanxxlopez.github.io/BME423/'};
 const script=document.currentScript;
 if(!script)return;
 const base=new URL('.',script.src);
 const revision=new URL(script.src).searchParams.get('v');
 const courses=[
  {id:'PSYC301',site:'studio',path:''},
  {id:'BME423',site:'bme423',path:'bme423/'},
  {id:'LING406',site:'studio',path:'ling406/'},
  {id:'LING285',site:'studio',path:'ling285/'}
 ];
 const href=c=>new URL(c.path,c.site===HERE?base:SITES[c.site]);
 const local=courses.filter(c=>c.site===HERE);
 const current=local.find(c=>c.path&&(location.pathname.startsWith(href(c).pathname)||location.pathname===href(c).pathname.slice(0,-1)))||local[0];
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
