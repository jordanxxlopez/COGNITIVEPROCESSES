'use strict';
(()=>{
 const KEY='psyc301-workspace-layout';
 let enabled=false;try{enabled=localStorage.getItem(KEY)==='modern'}catch{}
 function update(){
  const root=document.getElementById('content');if(!root)return;
  // Module II workspace and its opt-in slide practice.
  const workspace=typeof view!=='undefined'&&view.startsWith('m2')&&!view.endsWith('Expanded');
  root.classList.toggle('workspace-containers',workspace);
  root.classList.toggle('workspace-modern',workspace&&enabled);
  if(workspace&&enabled)root.dataset.workspacePattern=['m2qabank','m2lectures','m2test','m2testbank','m2missed'].includes(view)?'list':'path';else delete root.dataset.workspacePattern;
  let control=document.getElementById('workspace-layout-switch');
  const nav=document.getElementById('workspaceNav');if(!nav)return;
  if(!control){
   control=document.createElement('label');control.id='workspace-layout-switch';control.className='workspace-layout-switch';
   const input=document.createElement('input');input.type='checkbox';input.setAttribute('role','switch');input.checked=enabled;
   const text=document.createElement('span');text.textContent='Modern workspace';
   input.addEventListener('change',()=>{enabled=input.checked;try{localStorage.setItem(KEY,enabled?'modern':'original')}catch{}const scroll=window.scrollY;render();window.scrollTo(0,scroll)});
   control.append(input,text);
   const scope=[...nav.querySelectorAll('.label')].find(x=>x.textContent.includes('Module 2'));
   if(scope)scope.after(control);else nav.prepend(control);
  }
 }
 const prior=render;render=function(){const result=prior.apply(this,arguments);update();return result};update();
})();
