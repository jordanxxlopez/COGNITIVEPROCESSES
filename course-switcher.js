'use strict';
// Shared navigation only. Each course keeps its own app, URL and storage keys.
(() => {
 const script=document.currentScript;
 if(!script)return;
 const base=new URL('.',script.src);
 const revision=new URL(script.src).searchParams.get('v');
 const courses=[
  {id:'PSYC301',path:''},
  {id:'BME423',path:'bme423/'},
  {id:'LING406',path:'ling406/'},
  {id:'LING285',path:'ling285/'}
 ];
 const current=courses.find(c=>c.path&&(location.pathname.startsWith(new URL(c.path,base).pathname)||location.pathname===new URL(c.path,base).pathname.slice(0,-1)))||courses[0];
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
    const target=new URL(destination.path,base);
    if(revision)target.searchParams.set('v',revision);
    location.assign(target.href);
   }
  });
  // Restore the active option if Back/Forward restores a cached page.
  addEventListener('pageshow',()=>{select.value=current.id});
  label.append(caption,select);courseName.after(label);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
