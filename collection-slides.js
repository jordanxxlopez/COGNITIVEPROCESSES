'use strict';
// Individual collections retain every original page. A missing title, divider,
// or logistical page gets its original visual and no authored transcript.
const sourcePageTitles={
 '3:1':'Introduction to Cognitive Psychology · title',
 '3:5':'CogLab 5 · lab presentation requirements',
 '3:6':'Chapter 1 · divider',
 '5:1':'Perception · title',
 '2:1':'Perception · Part 2 · title',
 '7:1':'Attention · Part 1 · title',
 '4:1':'Attention · Part 2 · title',
 '8:1':'Language · Part 1 · title',
 '1:1':'Language · Part 2 · title',
 '6:1':'Short-Term Memory · title',
 '9:1':'Short-Term and Working Memory · title',
 '9:16':'Mental rotation · divider',
 '10:1':'Problem-Solving and Reasoning · title'
};
function retainAllSourceSlides(modules){
 for(const m of modules){
  const present=new Set(m.sections.map(s=>s.page));
  const added=m.original.flatMap((image,index)=>{
   const page=index+1;
   return present.has(page)?[]:[{page,title:sourcePageTitles[m.id+':'+page]||'Original source page '+page,bullets:[],image,sourceOnly:true}];
  });
  if(added.length)m.sections=[...m.sections,...added].sort((a,b)=>a.page-b.page);
 }
}
retainAllSourceSlides(M);
