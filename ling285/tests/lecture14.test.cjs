'use strict';
// Independent intake/preservation checks for the real Lecture 14 upload.
// Source bytes and visible text are verified mechanically; these tests do not
// pretend to grade the completeness or scientific quality of teaching prose.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const {execFileSync} = require('node:child_process');
const repo = path.resolve(__dirname, '../..');
const studio = path.join(repo, 'ling285');
const data = JSON.parse(fs.readFileSync(path.join(studio, 'data.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(studio, 'source-manifest.json'), 'utf8'));
const before = JSON.parse(execFileSync('git', ['show', '792c93f:ling285/data.json'], {cwd:repo,encoding:'utf8',maxBuffer:20*1024*1024}));
const native = JSON.parse(fs.readFileSync(path.join(studio, 'authoring/extracted/lecture14-native.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(studio, 'authoring/extracted/lecture14-pages.json'), 'utf8'));
const upload = fs.readFileSync(path.join(studio, 'sources/lecture14.pptx'));
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const normalize = value => String(value).normalize('NFKC').replace(/\s+/g, ' ').trim();
const byCollection = new Map(data.collections.map(collection => [collection.id, collection]));
function lecture() {const found = byCollection.get('lecture14');assert(found, 'Assemble the real Lecture 14 collection first.');return found;}
function section(page) {const found = lecture().sections.find(item => item.page === page);assert(found, 'Missing Lecture 14 page ' + page);return found;}
function file(relative) {
  assert(relative && !path.isAbsolute(relative));const target=path.resolve(studio, relative);
  assert(target.startsWith(studio+path.sep));assert(fs.statSync(target).isFile());return target;
}
// Read the supplied OOXML ZIP directly rather than trusting an extraction
// manifest to prove that the extracted originals match the upload.
function unzip(bytes) {
  const lowerBound = Math.max(0, bytes.length - 65557);let end = bytes.length - 22;
  while (end >= lowerBound && bytes.readUInt32LE(end) !== 0x06054b50) end -= 1;
  assert(end >= lowerBound, 'Missing ZIP end record.');
  const count = bytes.readUInt16LE(end+10);let cursor=bytes.readUInt32LE(end+16);const entries=new Map();
  assert(count < 65535, 'This source is expected to be a non-ZIP64 OOXML archive.');
  for (let index=0; index<count; index+=1) {
    assert.equal(bytes.readUInt32LE(cursor),0x02014b50);
    const flags=bytes.readUInt16LE(cursor+8),method=bytes.readUInt16LE(cursor+10),compressed=bytes.readUInt32LE(cursor+20),size=bytes.readUInt32LE(cursor+24);
    const nameLength=bytes.readUInt16LE(cursor+28),extraLength=bytes.readUInt16LE(cursor+30),commentLength=bytes.readUInt16LE(cursor+32),offset=bytes.readUInt32LE(cursor+42);
    const name=bytes.subarray(cursor+46,cursor+46+nameLength).toString('utf8');assert.equal(flags & 1,0,'Encrypted source entry '+name);
    entries.set(name,{size,read(){assert.equal(bytes.readUInt32LE(offset),0x04034b50);const start=offset+30+bytes.readUInt16LE(offset+26)+bytes.readUInt16LE(offset+28);const raw=bytes.subarray(start,start+compressed);const content=method===0?raw:method===8?zlib.inflateRawSync(raw):null;assert(content,'Unsupported ZIP compression method '+method);assert.equal(content.length,size,name);return content;}});
    cursor += 46+nameLength+extraLength+commentLength;
  }
  return entries;
}
const archive = unzip(upload);
function xmlText(value) {
  return value.replace(/&#x([0-9a-f]+);|&#([0-9]+);|&(amp|lt|gt|quot|apos);/gi,(_,hex,decimal,named)=>hex?String.fromCodePoint(parseInt(hex,16)):decimal?String.fromCodePoint(Number(decimal)):({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[named.toLowerCase()]));
}
function visibleParagraphs(xml) {
  return [...xml.matchAll(/<a:p(?:\s[^>]*)?>([\s\S]*?)<\/a:p>/g)]
    .map(match=>[...match[1].matchAll(/<a:t(?:\s[^>]*)?>([\s\S]*?)<\/a:t>|<a:br\b[^>]*>/g)].map(part=>part[1]===undefined?'\n':xmlText(part[1])).join(''))
    .map(normalize).filter(Boolean);
}

test('Lecture 14 preserves the exact uploaded deck and maps all twenty-five slides',()=>{
  const source=manifest.lecture14;assert(source);
  assert.equal(source.original,'Ling285_F26_L14_32MB.pptx');assert.equal(source.pages,25);assert.equal(source.slides,25);
  assert.equal(upload.length,30721272);
  assert.equal(digest(upload),'11d3e4f8d97150e680b617ce4be8e62cde790874f48a83a9d351775bbd796d2e');
  assert.equal(source.sha256,digest(upload));assert.equal(digest(fs.readFileSync(file(source.rendered_pdf))),source.rendered_pdf_sha256);
  const slideNames=[...archive.keys()].filter(name=>/^ppt\/slides\/slide\d+\.xml$/.test(name));assert.equal(slideNames.length,25);
  assert.equal(native.length,25);assert.equal(pages.length,25);
  const collection=lecture();assert.equal(collection.moduleId,'module2');assert.equal(collection.workspaceGroup,'lectures');
  assert.deepEqual(collection.sections.map(item=>item.page),Array.from({length:25},(_,index)=>index+1));
  for (const item of collection.sections) {
    assert.equal(item.id,'lecture14-p'+String(item.page).padStart(3,'0'));file(item.image);
    assert(Array.isArray(item.teaching));assert(Array.isArray(item.assets));
    assert.equal(typeof item.sourceText,'string');assert.equal(typeof item.speakerNotes,'string');
  }
});

test('all eight original embedded videos are available with exactly their uploaded bytes',()=>{
  const originals=[...archive.entries()].filter(([name])=>/^ppt\/media\/.*\.mp4$/i.test(name));assert.equal(originals.length,8);
  const runtime=[...new Set(lecture().sections.flatMap(item=>item.assets.filter(asset=>asset.type==='video').map(asset=>asset.file)))];
  assert.equal(runtime.length,8);
  const available=new Map(runtime.map(relative=>{const bytes=fs.readFileSync(file(relative));return [digest(bytes),{relative,bytes}];}));
  assert.equal(available.size,8);
  for (const [name,entry] of originals) {
    const original=entry.read(),actual=available.get(digest(original));assert(actual,'Missing original video '+name);
    assert.equal(actual.bytes.length,entry.size,name);assert(actual.bytes.equals(original),'Video was modified '+name);
    assert(path.basename(actual.relative).startsWith(digest(original).slice(0,20)));
  }
  for (const item of lecture().sections.filter(item=>item.assets.some(asset=>asset.type==='video'))) {
    assert.notEqual(item.kind,'blank',`${item.id} is media-bearing, not an empty slide`);
    assert(item.teaching.length>0,`${item.id} needs teaching for its visual demonstration`);
  }
});

test('native visible wording, speaker notes, labels, and the supplied code survive assembly',()=>{
  for (let page=1;page<=25;page+=1) {
    const extracted=native.find(item=>item.page===page);assert(extracted);
    const nativeVisible=extracted.shapes.filter(shape=>shape.type==='text').map(shape=>shape.text).join('\n');
    const original=archive.get(`ppt/slides/slide${page}.xml`);assert(original);
    const paragraphs=visibleParagraphs(original.read().toString('utf8'));
    const assembled=normalize([section(page).sourceText,section(page).nativeText || ''].join('\n'));
    for (const paragraph of paragraphs) {
      assert(normalize(nativeVisible).includes(paragraph),`Native extraction omitted visible text on page ${page}: ${paragraph}`);
      assert(assembled.includes(paragraph),`Assembled source text omitted a native paragraph on page ${page}: ${paragraph}`);
    }
    assert.equal(section(page).speakerNotes,extracted.speakerNotes || '',`Speaker notes changed on page ${page}`);
  }
  const code=native[24].shapes.find(shape=>shape.type==='text' && shape.text.includes('import torch') && shape.text.includes('nn.Sequential')).text;
  assert.equal((code.match(/nn\.Linear\(/g)||[]).length,4);
  assert.equal((code.match(/bias=False/g)||[]).length,4);
  assert(!/Softmax|ReLU|Sigmoid|backward\(|optimizer|\.step\(/i.test(code),'The actual source declaration does not supply activation, normalization, or training.');
  assert(normalize(section(25).sourceText).includes(normalize(code)),'Preserve the full contiguous original code in source text, not only an image or interleaved PDF fragments.');
});

test('new core review is selective and heading-only or incomplete sources stay bounded',()=>{
  const selected=lecture().sections.filter(item=>item.core),taught=lecture().sections.filter(item=>item.teaching.length);
  assert(selected.length>0 && selected.length<taught.length,'A core review selects among taught concepts.');
  for (const item of selected) {assert(item.coreReason?.trim());assert(item.teaching.length);assert(!['title','blank','logistics'].includes(item.kind));}
  for (const page of [1,19,20]) {
    assert.deepEqual(section(page).teaching,[],`Heading-only page ${page} must not gain an invented lecture or experimental outcome.`);
    assert.equal(section(page).core,false);
  }
  assert(section(24).issues.length+section(25).issues.length>0,'Record the mismatch between a schematic probability display and a bare linear declaration.');
  const currentQuestions=data.questions.filter(question=>question.lectureId==='lecture14');
  assert.equal(currentQuestions.length,50);assert.equal(currentQuestions.filter(question=>question.type==='mcq').length,25);assert.equal(currentQuestions.filter(question=>question.type==='written').length,25);
  for (const question of currentQuestions) {
    assert.equal(question.moduleId,'module2');assert(question.sources.some(ref=>ref.collection==='lecture14'));
    for (const ref of question.sources) {
      const target=byCollection.get(ref.collection)?.sections.find(item=>item.page===ref.page);assert(target,'Missing question source '+question.id);
      assert(!['title','blank','logistics'].includes(target.kind),`${question.id} assesses a source-limited heading rather than supplied teaching.`);
      assert(!(ref.collection==='lecture14' && [19,20].includes(ref.page)));
    }
  }
});

test('all 242 previously released questions and 315 source sections remain unchanged',()=>{
  assert.equal(before.questions.length,242);assert.equal(before.collections.reduce((sum,collection)=>sum+collection.sections.length,0),315);
  const nowQuestions=new Map(data.questions.map(question=>[question.id,question]));
  for (const old of before.questions) {
    const current=nowQuestions.get(old.id);assert(current,'A saved question ID disappeared: '+old.id);
    // Edition and model-derived priority may change as the current bank grows.
    for (const key of Object.keys(old).filter(key=>!['edition','priority'].includes(key))) assert.deepEqual(current[key],old[key],`${old.id}: released ${key} changed`);
  }
  for (const oldCollection of before.collections) {
    const current=byCollection.get(oldCollection.id);assert(current,'A saved collection disappeared: '+oldCollection.id);
    assert.deepEqual(current.sections,oldCollection.sections,`Existing notes/read/source IDs or content changed in ${oldCollection.id}`);
  }
  assert.equal(data.questions.length,292);assert.equal(data.collections.flatMap(collection=>collection.sections).length,340);
  const module=data.modules.find(item=>item.id==='module2');
  assert.deepEqual(module.lectureIds,['lecture11','lecture12','lecture13','lecture14']);assert.equal(module.questionCount,200);
  assert.equal(module.mcqCount,100);assert.equal(module.writtenCount,100);
  assert.deepEqual(module.assessmentPolicy,{lectureQuizSize:50,currentTestSize:100,mcqShare:.5});
});
