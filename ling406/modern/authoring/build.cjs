// Validates the modern-version text files and builds the packs the studio loads.
//   node build.cjs check <m1|m2|m3> <version> <collection>   check one file
//   node build.cjs build                                      build every complete pack
// Text format, one line per page:  page|block >> child >> child || next block >> child
// A page with nothing after "|" stays empty (title and logistics pages).
const fs=require('fs'),path=require('path');
const A=__dirname,OUT=path.resolve(A,'../packs'),PAGES=JSON.parse(fs.readFileSync(path.join(A,'pages.json'),'utf8'));
const VERSIONS={
 v20:{value:{m2:20},label:'Version 20 · natural teaching transcript',family:'psyc',modules:['m2']},
 v21:{value:{m2:21,m1:31,m3:31},label:'Version 21 · natural teaching notes with following slides',family:'psyc',modules:['m2','m1','m3']},
 v22:{value:{m2:22,m1:32,m3:32},label:'Version 22 · natural teaching notes with researchers and years',family:'psyc',modules:['m2','m1','m3']},
 n93:{value:{m2:93,m1:93,m3:93},label:'Notes 9.3 · clearest slide-by-slide notes',family:'notes',modules:['m2','m1','m3']},
 n101:{value:{m2:101,m1:101,m3:101},label:'Notes 10.1 · bold main idea first',family:'notes',modules:['m2','m1','m3']},
 simple:{value:{m2:120,m1:120,m3:120},label:'Simpler · answer first, one step per sentence',family:'notes',modules:['m2','m1','m3']},
};
const BANNED=/\b(?:coworkers?|co-workers?|et al|need not|lawful|this shows|that shows|shows that|shows how|illustrates?|illustrating|demonstrates?|demonstrating|the key point|key takeaway|takeaway|as you can see|let.s|let us|remember that|note that|notice that|the slides?|this slide|slides|the lecture|this lecture|lectures?|the professor|the instructor|in class|this course|the figure|this figure|the graph|this graph|the next topic|the next step|this sets up|turns to|we now|moving on|next we|earlier we|later we|in this section|our focus|this helps us understand|in other words|basically|simply put|e\.g|i\.e|etc|vs|thus|hence|whereby|mediated(?! priming)|downstream|fares worse|blame|squeez\w*|covered here|this topic)\b/i;
const PICTURE=/\b(?:the|a|this|that|their|its|his|her|bigger|whole|full|overall|clear|clearer) (?:\w+ )?picture\b(?! (?:of|naming|books?|cards?|stimul\w+|task|description))|\bpictured\b/i;
const PUNCT=/[:;=—–→←⇒↔×]|\s-\s|--|->|<-/;
const LABELS=/\*\*(?:setup|set-up|participants|procedure|observations?|results?|interpretation|conclusions?|findings?|explanation|hypothesis|method|design|summary|definition|example|answer|question)\*\*|\b(?:The) (?:setup|procedure|observation|interpretation|conclusion|explanation|hypothesis) (?:was|is|worked|compared|used)\b/i;
const NUMBERS=/\b(?:1[89]|20)\d\d\b|\d\s*%|\bpercent\b|\b\d+\.\d+\b|\b\d{3,}\b|\b\d{1,3}(?:,\d{3})+\b/;
const words=s=>s.replace(/\*\*/g,'').trim().split(/\s+/).filter(Boolean);
const sentences=s=>s.replace(/\*\*/g,'').replace(/\b(Dr|Mr|Ms|Mrs|St)\./g,'$1').split(/(?<=[.?!]["”’)]?)\s+(?=["“‘(\/\[]?[A-Z0-9])/).map(x=>x.trim()).filter(Boolean);
function parseFile(file){
  const map=new Map();
  for(const raw of fs.readFileSync(file,'utf8').split('\n')){const line=raw.trimEnd();if(!line.trim())continue;const i=line.indexOf('|');if(i<0||!/^\d+$/.test(line.slice(0,i).trim()))throw new Error(`${file}: line does not start with "page|": ${line.slice(0,60)}`);
    const page=+line.slice(0,i),rest=line.slice(i+1).trim();if(map.has(page))throw new Error(`${file}: page ${page} appears twice`);
    map.set(page,rest?rest.split(' || ').map(b=>{const [text,...children]=b.split(' >> ').map(x=>x.trim());return{text,children}}):[]);}
  return map;
}
function checkPage(ver,page,blocks,errs,warn){
  const E=m=>errs.push(`p${page}: ${m}`),W=m=>warn.push(`p${page}: ${m}`);
  const all=blocks.flatMap(b=>[b.text,...b.children]);
  for(const t of all){
    if(!t)E('empty block or child');
    if((t.match(/\*\*/g)||[]).length%2)E('unbalanced ** in: '+t.slice(0,50));
    const plain=t.replace(/\*\*/g,'');
    let m;if((m=BANNED.exec(plain)))E(`banned wording "${m[0]}" in: ${plain.slice(Math.max(0,m.index-30),m.index+40)}`);
    if((m=PICTURE.exec(plain)))E(`"picture" used as a noun for something that is not a real image: ${plain.slice(Math.max(0,m.index-20),m.index+40)}`);
    if((m=PUNCT.exec(plain)))E(`banned punctuation "${m[0]}" in: ${plain.slice(Math.max(0,m.index-30),m.index+30)}`);
    if((m=LABELS.exec(t)))E(`label wording "${m[0]}"`);
    if(/^\*\*[^*]{1,40}\*\*\s*[A-Z]/.test(t)&&!/[.?!]\*\*/.test(t.slice(0,t.indexOf('**',2)+2)))W('opens with a short bold fragment, check it is not a label: '+t.slice(0,50));
    if(/\|/.test(t))E('stray | character');
    const num=ver==='v22'?plain.replace(/\((?:[^()]*?)(?:1[89]|20)\d\d[a-z]?(?:,\s*(?:1[89]|20)\d\d)*\)/g,''):plain;
    if((ver==='v21'||ver==='v22')&&(m=NUMBERS.exec(num)))E(`number or year "${m[0]}" (Version 21 has none; Version 22 allows only years in parentheses after researcher names)`);
    const min=ver==='n101'?0:VERSIONS[ver].family==='psyc'?5:4,max=VERSIONS[ver].family==='psyc'?40:30;
    for(const s of sentences(t.replace(/"([^"]*)"|“([^”]*)”/g,(m,a,c)=>(a??c).trim().split(/\s+/).length>=3?'QUOTED':m))){const n=words(s).length;if(n<min)E(`sentence under ${min} words: "${s}"`);if(n>max)E(`sentence over ${max} words (${n}): "${s.slice(0,70)}…"`);else if(VERSIONS[ver].family==='notes'&&n>25)W(`long sentence (${n} words): "${s.slice(0,60)}…"`)}
  }
  const total=words(all.join(' ')).length,sc=t=>sentences(t).length;
  if(ver==='v20'){if(!blocks.some(b=>b.children.length))E('Version 20 needs at least one sub-bullet');for(const b of blocks){if(sc(b.text)<2||sc(b.text)>5)E(`main bullet must be 2 to 5 sentences (has ${sc(b.text)}): ${b.text.slice(0,50)}`);for(const c of b.children)if(sc(c)>3)E('sub-bullet over 3 sentences: '+c.slice(0,50))}if(total<90)W(`short page (${total} words)`)}
  if(ver==='v21'||ver==='v22'){const ss=all.flatMap(sentences);if(ss.reduce((a,s)=>a+words(s).length,0)/ss.length<8)E('sentences average under 8 words, too choppy');if(total<45)W(`short page (${total} words)`);if(/\d/.test((ver==='v22'?all.join(' ').replace(/\((?:[^()]*?)(?:1[89]|20)\d\d[a-z]?(?:,\s*(?:1[89]|20)\d\d)*\)/g,''):all.join(' ')).replace(/\b[FL]\d\b/g,'')))W('digits on the page; write counts and ages in words');if(total>190)E(`over 190 words (${total}); Versions 21 and 22 are the short notes`)}
  if(ver==='n93'||ver==='simple'){if(total<60)W(`short page (${total} words)`);if(total>330)E(`over 330 words (${total})`)}
  if(ver==='n101'){const first=blocks[0].text;if(!/^\*\*[^*]+[.?!]\*\*/.test(first))E('Notes 10.1 must open with a whole sentence in bold');if(!blocks.some(b=>b.children.length))E('Notes 10.1 needs sub-bullets under the bold main idea');if(total>260)E(`over 260 words (${total})`)}
  if(!/\*\*/.test(all.join(' ')))E('no bold term or bold sentence on the page');
  return total;
}
function checkCollection(mod,ver,col){
  const file=path.join(A,'text',mod,ver,col+'.txt'),spec=PAGES[mod][col],errs=[],warn=[];
  if(!spec)return{errs:[`unknown collection ${mod}/${col}`],warn};
  if(!fs.existsSync(file))return{missing:true,errs:[`missing ${file}`],warn};
  let map;try{map=parseFile(file)}catch(e){return{errs:[e.message],warn}}
  const scripts={};let total=0,n=0;
  for(const p of spec.pages){if(!map.has(p.page)){errs.push(`p${p.page}: page missing`);continue}const blocks=map.get(p.page);
    if(p.empty){if(blocks.length)errs.push(`p${p.page}: must stay empty`)}else if(!blocks.length)errs.push(`p${p.page}: teaching page is empty`);else{total+=checkPage(ver,p.page,blocks,errs,warn);n++}
    scripts[p.id]=blocks}
  for(const k of map.keys())if(!spec.pages.some(p=>p.page===k))errs.push(`p${k}: no such page`);
  return{errs,warn,scripts,avg:n?Math.round(total/n):0,pages:n};
}
const [cmd,mod,ver,col]=process.argv.slice(2),PARTIAL=process.argv.includes('--partial'); // --partial is for local testing only
if(cmd==='check'){
  if(!VERSIONS[ver]||!VERSIONS[ver].modules.includes(mod)){console.error('unknown version/module');process.exit(2)}
  const r=checkCollection(mod,ver,col);
  if(process.argv.includes('--warn'))r.warn.forEach(w=>console.log('warn  '+w));
  r.errs.forEach(e=>console.log('ERROR '+e));
  console.log(r.errs.length?`FAIL ${mod}/${ver}/${col}: ${r.errs.length} errors, ${r.warn.length} warnings`:`PASS ${mod}/${ver}/${col}: ${r.pages} teaching pages, ${r.avg} words average, ${r.warn.length} warnings`);
  process.exit(r.errs.length?1:0);
}else if(cmd==='build'){
  fs.mkdirSync(OUT,{recursive:true});const report={},manifest={};let bad=0;
  for(const [v,V] of Object.entries(VERSIONS))for(const m of V.modules){
    const scripts={},stats={};let ok=true;
    for(const c of Object.keys(PAGES[m])){const r=checkCollection(m,v,c);stats[c]=r.errs.length?{errors:r.errs.length,missing:!!r.missing}:{pages:r.pages,avgWords:r.avg,warnings:r.warn.length};if(r.errs.length){if(PARTIAL&&r.missing){for(const p of PAGES[m][c].pages)scripts[p.id]=[];continue}ok=false;continue}Object.assign(scripts,r.scripts)}
    report[`${m}-${v}`]=stats;
    if(!ok){bad++;console.log(`skip ${m}-${v}: ${Object.entries(stats).filter(([,s])=>s.errors).map(([c,s])=>c+(s.missing?' (missing)':` (${s.errors} errors)`)).join(', ')}`);continue}
    if(m==='m2')for(const r of PAGES.m2review){if(r.id==='review-54')continue;scripts[r.id]=r.empty?[]:scripts[r.lectureSection];if(!scripts[r.id]&&PARTIAL)scripts[r.id]=[];if(!scripts[r.id])throw new Error('review map broken '+r.id)}
    const revision=`ling406-modern-${m}-${v}-1`;
    fs.writeFileSync(path.join(OUT,`${m}-${v}.js`),`(window.LING406_MODERN_PACKS=window.LING406_MODERN_PACKS||{})[${JSON.stringify(m+'-'+v)}]=${JSON.stringify({id:v,label:V.label,revision,scripts})};\n`);
    (manifest[m]=manifest[m]||[]).push({id:v,value:V.value[m],label:V.label,family:V.family,file:`${m}-${v}.js`,revision});
    console.log(`built ${m}-${v}: ${Object.keys(scripts).length} pages`);
  }
  fs.writeFileSync(path.join(OUT,'manifest.js'),`window.LING406_MODERN_MANIFEST=${JSON.stringify(manifest)};\n`);
  fs.writeFileSync(path.join(A,'coverage.json'),JSON.stringify(report,null,1));
  console.log(bad?`${bad} packs not built`:'all packs built');process.exit(bad?1:0);
}else{console.log('usage: node build.cjs check <m1|m2|m3> <version> <collection> [--warn] | build');process.exit(2)}
