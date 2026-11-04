const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const D=read('data.json'),EDITIONS={v20:read('transcripts-v20.json'),v21:read('transcripts-v21.json'),v22:read('transcripts-v22.json')};
const MODULE1=['lecture01','lecture02','lecture03','lecture04','lecture05-06','lecture07','lecture08','lecture09','lecture10'];
const LECTURES=['lecture11','lecture12','lecture13','lecture14','lecture15','lecture16','lecture17'];
const TAUGHT_PROMPTS=new Set(['lecture14-p019','lecture14-p020']);
const plain=b=>[b.text,...b.children].join(' ').replace(/\*\*/g,'');

for(const [version,E] of Object.entries(EDITIONS)){
test(version+' maps every Module II page in order',()=>{
 assert.equal(E.id,version);
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

test(version+' reads as full sentences without shorthand or banned wording',()=>{
 const banned=/[:;→]|\b(?:slides?|the lecture|the professor|this shows|shows that|illustrates|demonstrates|let.s|remember that|need not|lawful)\b/i;
 const shorthand=/\b\w+ in, [\w ]+ out\b/i;
 for(const id of LECTURES)for(const s of E.collections[id].sections)for(const b of s.teaching){
  const text=plain(b);
  assert(!banned.test(text),s.id+' '+(text.match(banned)||[])[0]);
  assert(!shorthand.test(text),s.id+' uses shorthand');
  for(const sentence of text.split(/(?<=[.!?])\s+(?=[A-Z“"(])/))assert(sentence.trim().split(/\s+/).length>=5,s.id+' telegraphic sentence '+sentence);
 }
});

}
test('Version B trims asides that are not tested',()=>{
 const text=JSON.stringify(EDITIONS.v21.collections);
 for(const aside of ['Margaret Hamilton','psychiatrist','UC San Diego','scams','two directors','Nobel Prize in Chemistry','NumPy'])assert(!text.includes(aside),aside);
 assert(JSON.stringify(EDITIONS.v20.collections).includes('Margaret Hamilton'),'Version 20 stays as it was');
});

test('Version C also covers every Module I lecture page in order',()=>{
 for(const id of MODULE1){
  const base=D.collections.find(c=>c.id===id).sections,mine=EDITIONS.v22.collections[id].sections;
  assert.deepEqual(mine.map(s=>s.id),base.map(s=>s.id),id);
  assert.equal(mine[0].teaching.length,0,id+' title page stays empty');
  assert(mine.filter(s=>s.teaching.length).length>=base.length/2,id+' teaches most pages');
  for(const s of mine)if(s.teaching.length)assert(s.teaching.some(b=>b.children.length),s.id+' has nested bullets');
 }
 for(const v of ['v20','v21'])for(const id of MODULE1)assert(!(id in EDITIONS[v].collections),v+' stays Module II only');
});

test('Version C keeps numbers, dates and calculations out of the teaching',()=>{
 for(const id of [...MODULE1,...LECTURES])for(const s of EDITIONS.v22.collections[id].sections)for(const b of s.teaching)for(const p of [b.text,...b.children]){
  const text=p.replace(/\*\*/g,'');
  assert(!/\b\d+(?:\.\d+)?\s*(?:Hz|hertz|%|percent)\b|\b\d{3,}\b|\b\d+\.\d+\b|[—–=×]/i.test(text),s.id+' '+text.slice(0,60));
  assert(!/^\*\*(?:(?:\S+\s){0,3}\S+|[^*]{1,40},[^*]{1,30})\.\*\*(?:\s|$)/.test(p),s.id+' bold label fragment');
 }
 // Slide titles keep their wording, so only the teaching text is searched.
 const text=JSON.stringify([...MODULE1,...LECTURES].map(id=>EDITIONS.v22.collections[id].sections.map(s=>s.teaching)));
 for(const aside of ['Woodford','Lagrange','Malécot','Hinton','1943','1985','1986','Nobel Prize in 1932','USC'])assert(!text.includes(aside),aside);
});

test('the dropdown offers the Iskarous edition beside the earlier ones',()=>{
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
 assert(app.includes("'v18','v20','v21','v22']"));assert(app.includes("['v22','Iskarous C · Natural teaching notes']"));assert(app.includes("['v21','Iskarous B · Focused professor teaching']"));assert(app.includes("['v20','Iskarous · Professor teaching transcript']"));
});
