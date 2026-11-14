// node --test ling406/modern/tests/modern-versions.test.cjs   (from the repo root)
const test=require('node:test'),assert=require('node:assert'),fs=require('fs'),path=require('path'),vm=require('vm'),{execFileSync}=require('child_process');
const L=path.resolve(__dirname,'../..'),M=path.join(L,'modern');
const load=(...files)=>{const w={};for(const f of files)vm.runInNewContext(fs.readFileSync(path.join(L,f),'utf8'),{window:w});return w};
const manifest=load('modern/packs/manifest.js').LING406_MODERN_MANIFEST;
test('every text file passes the checker',()=>{
  const pages=JSON.parse(fs.readFileSync(path.join(M,'authoring/pages.json'),'utf8'));
  for(const m of ['m1','m2','m3'])for(const v of manifest[m])for(const c of Object.keys(pages[m])){
    const out=execFileSync('node',[path.join(M,'authoring/build.cjs'),'check',m,v.id,c],{encoding:'utf8'});
    assert.match(out,/^PASS /m,`${m}/${v.id}/${c}`);
  }
});
test('manifest lists six versions in Module II and five in Modules I and III',()=>{
  assert.deepEqual(manifest.m2.map(v=>v.id),['v20','v21','v22','n93','n101','simple']);
  for(const m of ['m1','m3'])assert.deepEqual(manifest[m].map(v=>v.id),['v21','v22','n93','n101','simple']);
});
test('dropdown values never collide with an existing version',()=>{
  const old={m2:[1,2,3,4,5,6,7,10,12,14,16,18],m1:[20,21,22,23],m3:[20,21,22,23]};
  for(const m in old)for(const v of manifest[m])assert.ok(!old[m].includes(v.value),`${m} ${v.id} uses ${v.value}`);
});
test('every pack covers every page of its module, and empty pages stay empty',()=>{
  const mods={m2:load('data.js','transcripts-v3-data.js','transcripts-v18-data.js'),m1:load('module1/data.js'),m3:load('module3/data.js')};
  const W2=mods.m2,ids2=[...W2.LING406.sections.map(s=>s.id),...W2.LING406_TRANSCRIPTS_V3.review.map(r=>r.id)];
  for(const m of ['m1','m2','m3'])for(const v of manifest[m]){
    const pack=load('modern/packs/'+v.file).LING406_MODERN_PACKS[m+'-'+v.id];
    assert.ok(pack,`${m}-${v.id} missing`);
    if(m==='m2'){for(const id of ids2){assert.ok(Array.isArray(pack.scripts[id]),`${id}`);assert.equal(!!pack.scripts[id].length,!!W2.LING406_TRANSCRIPTS_V18.scripts[id].length,`${m}-${v.id} ${id}`)}}
    else{const D=m==='m1'?mods.m1.LING406_MODULE1:mods.m3.LING406_MODULE3;for(const s of D.sections){const ref=D.editions[0].scripts[s.id];assert.ok(Array.isArray(pack.scripts[s.id]),s.id);assert.equal(!!pack.scripts[s.id].length,ref.status==='ready'&&!!ref.blocks.length,`${m}-${v.id} ${s.id}`)}}
  }
});
test('older versions are unchanged',()=>{
  const changed=execFileSync('git',['diff','--name-only','HEAD','--','ling406'],{cwd:path.resolve(L,'..'),encoding:'utf8'}).trim().split('\n').filter(Boolean).filter(f=>!f.startsWith('ling406/modern/')&&!f.startsWith('ling406/study/')&&!f.endsWith('.md'));
  assert.deepEqual(changed.sort(),['ling406/index.html','ling406/module1/index.html','ling406/module3/index.html'].filter(f=>changed.includes(f)).sort());
  for(const f of changed)assert.ok(/index\.html$/.test(f),f);
});
test('the three pages load the manifest and script right after app.js',()=>{
  for(const [p,pre] of [['index.html',''],['module1/index.html','../'],['module3/index.html','../']]){
    const html=fs.readFileSync(path.join(L,p),'utf8');
    assert.match(html,new RegExp(`<script src="app\\.js[^"]*"></script><script src="${pre.replace(/\./g,'\\.')}modern/packs/manifest\\.js\\?v=[^"]+"></script><script src="${pre.replace(/\./g,'\\.')}modern/modern-versions\\.js\\?v=[^"]+"></script>`),p);
    assert.ok(html.includes(`${pre}modern/modern-versions.css?v=`),p);
  }
});
