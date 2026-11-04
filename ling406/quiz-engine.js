/* One engine for every lecture quiz, mixed test, quick set and retry queue. */
(function(root){
 'use strict';
 function shuffle(values,rng=Math.random){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function validateAnswerKey(items,bank){
  let previous=-1;
  for(const item of items){
   const q=bank.get(item.id);
   if(!q||item.order.length!==q.choices.length||new Set(item.order).size!==q.choices.length||item.order.some(x=>!Number.isInteger(x)||x<0||x>=q.choices.length))return false;
   const current=item.order.indexOf(q.correct);
   if(current<0||current===previous)return false;
   previous=current;
  }
  return true;
 }
 function prepareQuizItems(questions,rng=Math.random){
  const bank=new Map(questions.map(q=>[q.id,q]));
  // Reject a locally repeated correct letter, reshuffle its choices, then
  // validate every adjacent pair in the complete key before it can be used.
  for(let attempt=0;attempt<100;attempt++){
   const items=[];let previous=-1;
   for(const q of questions){
    let order,letter,retries=0;
    do{order=shuffle(q.choices.map((_,i)=>i),rng);letter=order.indexOf(q.correct);if(++retries>10000)throw new Error('Random source could not create a valid choice order');}while(letter===previous);
    items.push({id:q.id,order});previous=letter;
   }
   if(validateAnswerKey(items,bank))return items;
  }
  throw new Error('Invalid quiz arrangement rejected');
 }
 const api={shuffle,validateAnswerKey,prepareQuizItems};root.LingQuiz=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
