// Expected differences explicitly authorized after the earlier preservation snapshots.
const fs=require('node:fs'),path=require('node:path');
const edits=JSON.parse(fs.readFileSync(path.join(__dirname,'../authoring/psyc301/direct-teaching-wording-changes.json'),'utf8'));
const replacements=new Map(edits.map(e=>[e.before,e.after]));
function directTeaching(value){
 if(typeof value==='string')return replacements.get(value)||value;
 if(Array.isArray(value))return value.map(directTeaching);
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,directTeaching(v)]));
 return value;
}
// Compare an earlier coverage edition without letting later appended lectures
// invalidate its guarantees for pre-existing content.
function existingCoverage(current,earlier){
 if(!Array.isArray(current.modules)||!Array.isArray(earlier.modules)||!Array.isArray(current.collections))return current;
 const known=new Set(earlier.modules),result={...current,revision:earlier.revision};
 result.modules=current.modules.filter(id=>known.has(id));
 result.collections=current.collections.filter(m=>known.has(m.id));
 result.questions=current.questions.filter(q=>known.has(q.module));
 result.lectureNumbers=Object.fromEntries(Object.entries(current.lectureNumbers).filter(([id])=>known.has(Number(id))));
 for(const key of ['topics','coreReview','experiments'])result[key]=current[key].filter(g=>known.has(g.module??6));
 return result;
}
module.exports={directTeaching,existingCoverage};
