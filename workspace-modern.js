'use strict';
// Container treatment belongs to the original Module II workspace.
(()=>{
 function update(){
  const root=document.getElementById('content');if(!root)return;
  const workspace=typeof view!=='undefined'&&view.startsWith('m2')&&!view.endsWith('Expanded');
  root.classList.toggle('workspace-modern',workspace);
  delete root.dataset.workspacePattern;
  document.getElementById('workspace-layout-switch')?.remove();
 }
 const prior=render;render=function(){const result=prior.apply(this,arguments);update();return result};update();
})();
