// Writes one source file per collection for the writers of the modern versions,
// plus pages.json (which pages teach and which stay empty).
const fs=require('fs'),path=require('path'),vm=require('vm');
const L=path.resolve(__dirname,'../..');
function load(...files){const w={};for(const f of files)vm.runInNewContext(fs.readFileSync(path.join(L,f),'utf8'),{window:w});return w}
const flat=blocks=>blocks.map(b=>'- '+b.text+b.children.map(c=>'\n  - '+c).join('')).join('\n');
const pages={m2:{},m1:{},m3:{}};
function emit(mod,col,title,rows){
  const dir=path.join(__dirname,'sources',mod);fs.mkdirSync(dir,{recursive:true});
  let out=`# ${mod.toUpperCase()} · ${col} · ${title}\n\n${rows.length} pages. Pages marked EMPTY get an empty line (\`page|\`).\n`;
  for(const r of rows){
    out+=`\n\n=====================\n## Page ${r.page} · ${r.title}${r.empty?' · EMPTY (title or logistics page, write nothing)':''}\nSlide image: ling406/${r.image}\n\n### Original slide text\n${(r.sourceText||'(visual only)').trim()}\n`;
    if(!r.empty)for(const [name,blocks] of r.refs)out+=`\n### Existing reviewed notes (${name}), for facts only, do not copy the wording\n${flat(blocks)}\n`;
  }
  fs.writeFileSync(path.join(dir,col+'.md'),out);
  pages[mod][col]={title,pages:rows.map(r=>({page:r.page,id:r.id,empty:r.empty}))};
}
{const w=load('data.js','transcripts-v3-data.js','transcripts-v12-data.js','transcripts-v18-data.js');
 const D=w.LING406,T3=w.LING406_TRANSCRIPTS_V3,T12=w.LING406_TRANSCRIPTS_V12,T18=w.LING406_TRANSCRIPTS_V18,S=new Map(D.sections.map(s=>[s.id,s]));
 for(const m of D.modules)emit('m2',m.id,m.title,m.sections.map(id=>{const s=S.get(id);return{page:s.page,id,title:T3.titles[id]||s.title,image:s.image,sourceText:s.sourceText,empty:!T18.scripts[id].length,refs:[['Version 18',T18.scripts[id]],['Version 12, more detail',T12.scripts[id]]]}}));
 pages.m2review=T3.review.map(r=>({id:r.id,page:r.page,lectureSection:r.lectureSection,empty:!T18.scripts[r.id].length}));
 const r=T3.review.find(x=>x.id==='review-54');
 emit('m2','review','Midterm II Review, the one page with its own notes',[{page:54,id:'review-54',title:r.title,image:'assets/slides/review/54.webp',sourceText:r.sourceText,empty:false,refs:[['Version 18',T18.scripts['review-54']],['Version 12, more detail',T12.scripts['review-54']]]}]);
}
for(const [mod,dir,g] of [['m1','module1','LING406_MODULE1'],['m3','module3','LING406_MODULE3']]){
 const M=load(dir+'/data.js')[g],S=new Map(M.sections.map(s=>[s.id,s])),E=Object.fromEntries(M.editions.map(e=>[e.id,e]));
 for(const m of M.modules)emit(mod,m.id,m.title,m.sections.map(id=>{const s=S.get(id),a=E.psyc20.scripts[id];return{page:s.page,id,title:s.title,image:dir+'/'+s.image,sourceText:s.sourceText,empty:a.status!=='ready'||!a.blocks.length,refs:[['PSYC301 v20-style edition',a.blocks||[]],['Original C · Version 3, adds what the visual means',E['original-c-v3'].scripts[id].blocks||[]]]}}));
}
fs.writeFileSync(path.join(__dirname,'pages.json'),JSON.stringify(pages,null,1));
for(const m of ['m2','m1','m3'])for(const c in pages[m])console.log(m,c,pages[m][c].pages.length,'teaching',pages[m][c].pages.filter(p=>!p.empty).length);
