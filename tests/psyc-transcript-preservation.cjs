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
module.exports={directTeaching};
