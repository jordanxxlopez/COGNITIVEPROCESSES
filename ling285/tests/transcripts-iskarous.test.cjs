const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const D=read('data.json'),E=read('transcripts-v20.json');
const LECTURES=['lecture11','lecture12','lecture13','lecture14','lecture15','lecture16','lecture17'];
const TAUGHT_PROMPTS=new Set(['lecture14-p019','lecture14-p020']);
const plain=b=>[b.text,...b.children].join(' ').replace(/\*\*/g,'');

test('the Iskarous edition maps every Module II page in order',()=>{
 assert.equal(E.id,'v20');assert.equal(E.label,'Iskarous · Professor teaching transcript');
 assert.equal(E.baseDataSha256,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'data.json'))).digest('hex'));
 for(const id of LECTURES){
  const base=D.collections.find(c=>c.id===id).sections,mine=E.collections[id].sections;
  assert.deepEqual(mine.map(s=>s.id),base.map(s=>s.id),id);
  for(const [i,s] of mine.entries()){
   if(!TAUGHT_PROMPTS.has(s.id))assert.equal(Boolean(s.teaching.length),Boolean(base[i].teaching.length),s.id);
   if(s.teaching.length)assert(s.teaching.some(b=>b.children.length),s.id+' has nested bullets');
  }
 }
});

test('the Iskarous edition reads as full sentences without shorthand or banned wording',()=>{
 const banned=/[:;→]|\b(?:slides?|the lecture|the professor|this shows|shows that|illustrates|demonstrates|let.s|remember that|need not|lawful)\b/i;
 const shorthand=/\b\w+ in, [\w ]+ out\b/i;
 for(const id of LECTURES)for(const s of E.collections[id].sections)for(const b of s.teaching){
  const text=plain(b);
  assert(!banned.test(text),s.id+' '+(text.match(banned)||[])[0]);
  assert(!shorthand.test(text),s.id+' uses shorthand');
  for(const sentence of text.split(/(?<=[.!?])\s+(?=[A-Z“"(])/))assert(sentence.trim().split(/\s+/).length>=5,s.id+' telegraphic sentence '+sentence);
 }
});

test('the dropdown offers the Iskarous edition beside the earlier ones',()=>{
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
 assert(app.includes("'v18','v20']"));assert(app.includes("['v20','Iskarous · Professor teaching transcript']"));
});
