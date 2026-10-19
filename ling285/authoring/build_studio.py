"""Assemble reviewed teaching and original source assets for the static LING285 studio."""
from pathlib import Path
from collections import Counter
import hashlib,json,re,shutil
from PIL import Image
ROOT=Path(__file__).resolve().parents[1];A=ROOT/'authoring'
def read(name):return json.loads((A/name).read_text())
def write(path,value):path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
manifest=read('source-manifest.json');inventory={(p['source'],p['page']):p for p in read('page-inventory.json')}
media={a['sha256']:a for a in read('unique-embedded.json')}
authored={}
for name in ['teaching-early.json','teaching-middle.json','teaching-later.json','teaching-readings.json']:
 for key,value in read(name).items():
  assert key not in authored,key
  authored[key]=value
practice=read('practice-guide.json');authored.update(practice['examReviewCollections'])
expected={k for k,v in manifest.items() if v['role']!='style-reference'}
assert set(authored)==expected,('Missing',expected-set(authored),'Unexpected',set(authored)-expected)
assert all(v['status']=='downloaded' for v in manifest.values())
core={(r['collection'],r['page']):r['reason'] for r in practice['coreReview']}
assert len(core)==len(practice['coreReview'])
media_dir=ROOT/'assets/original';media_dir.mkdir(parents=True,exist_ok=True)
used_media={};audit=[];collections=[];source_issues=[]
lecture_keys=sorted(k for k,v in manifest.items() if v['role']=='lecture')
other_keys=['exam-review','exam-review-seagull','notes-08-25-1','notes-08-25-2','notes-09-01','notes-09-03','notes-09-15','notes-09-17','notes-lecture07','notes-lecture08','notes-lecture09','notes-lecture10','syllabus']
for key in lecture_keys+other_keys:
 entry=manifest[key];author=authored[key];pages=author['sections']
 assert [p['page'] for p in pages]==list(range(1,entry['pages']+1)),key
 assert digest(ROOT/entry['file'])==entry['sha256'],key
 sections=[]
 for section in pages:
  page=section['page'];p=inventory[key,page];review=section['review']
  assert review['pageInspected'] and review['assetsInspected'],(key,page,review)
  assert isinstance(section['teaching'],list)
  sid=f'{key}-p{page:03}'
  raw=p.get('native',{});shape_text='\n'.join(s.get('text','') if 'text' in s else '\n'.join(' | '.join(row) for row in s.get('rows',[])) for s in raw.get('shapes',[]))
  # Preserve exact extracted wording separately from authored teaching.
  original_text=p['text'].strip() or p['ocr'].strip() or shape_text.strip()
  seen=set();assets=[]
  for ref in p.get('embeddedAssets',[]):
   sha=ref['sha256']
   if sha in seen:continue
   seen.add(sha);asset=media[sha];source=ROOT/asset['file'];ext=source.suffix.lower()
   if ext in ['.mp4','.wav']:kind='video' if ext=='.mp4' else 'audio'
   else:
    try:
     with Image.open(source) as im:
      width,height=im.size;animated=getattr(im,'is_animated',False)
     if min(width,height)<70 or width*height<65000:continue
     kind='image'
    except Exception:continue
   target=media_dir/(sha[:20]+ext)
   if not target.exists():shutil.copy2(source,target)
   assert digest(target)==sha
   used_media[sha]={'file':str(target.relative_to(ROOT)),'sha256':sha,'bytes':source.stat().st_size,'original':asset['file']}
   label={'video':'Original embedded demonstration','audio':'Original embedded audio · no supplied transcript','image':'Original figure detail'}[kind]
   if kind=='image' and ext=='.gif' and animated:label='Original animated illustration'
   assets.append({'file':str(target.relative_to(ROOT)),'type':kind,'label':label,'animated':bool(kind=='image' and ext=='.gif' and animated),'originalFilename':source.name})
  is_core=(key,page) in core
  # Internal authoring observations belong in the audit, not the student flow.
  display_issues=[s for s in section.get('issues',[]) if not re.search(r'agent instruction|new user request|instructions? (?:issued |to the assistant)|not instructions|source policy is recorded',s,re.I)]
  sections.append({'id':sid,'page':page,'title':section['title'],'kind':section['kind'],'teaching':section['teaching'],'image':p['image'],'assets':assets,'sourceText':original_text,'speakerNotes':raw.get('speakerNotes',''),'issues':display_issues,'core':is_core,'coreReason':core.get((key,page),'')})
  audit.append({'id':sid,'source':key,'page':page,'kind':section['kind'],'teachingParagraphs':len(section['teaching']),'words':sum(len(t.split()) for t in section['teaching']),'core':is_core,'review':review,'issues':section.get('issues',[]),'sourceSha256':entry['sha256']})
  source_issues.extend(display_issues)
  p['detailedVisualReviewComplete']=True;p['teachingCoverageVerified']=True
  p['reviewMethod']=review['method'];p['reviewLimitations']=review.get('limitations',[])
 number=('05–06' if key=='lecture05-06' else key.removeprefix('lecture')) if entry['role']=='lecture' else ''
 issues=[]
 if key=='lecture05-06':issues.append('The uploaded filename identifies Lectures 05–06; its internal title says Lecture 4+5. Both original labels are retained.')
 if key=='exam-review-seagull':issues.append('Uploaded answer companion with unverified authorship. Teaching resolves its inconsistencies against the primary lecture sources.')
 if key in ['lecture11','lecture12','lecture13']:issues.append('Embedded videos supply content that can appear blank in the static PDF. Play the original demonstrations on the relevant pages.')
 label=f'Lecture {number}' if number else 'Uploaded review' if entry['role']=='review' else 'Course syllabus' if key=='syllabus' else 'Supporting reading'
 collections.append({'id':key,'title':author['title'],'number':number,'label':label,'role':entry['role'],'sourceFile':entry['file'],'pdfFile':entry['rendered_pdf'],'originalFilename':entry['original'],'issues':issues,'sections':sections})
all_sections={s['id']:s for c in collections for s in c['sections']}
def check_ref(ref):assert f'{ref["collection"]}-p{ref["page"]:03}' in all_sections,ref
for q in practice['questions']:
 assert q['prompt'] and q['answer'] and len(q['rubric'])>=2,q
 for ref in q['sources']:check_ref(ref)
for ref in practice['coreReview']:check_ref(ref)
for g in practice['guide']:
 for ref in g['refs']:check_ref(ref)
assert len({q['id'] for q in practice['questions']})==len(practice['questions'])
assert not any(s['core'] and not s['teaching'] for s in all_sections.values())
assert not any('need not' in t.lower() for s in all_sections.values() for t in s['teaching'])
limitations=sorted({limit for item in audit for limit in item['review'].get('limitations',[]) if limit})
coverage={'sourceCount':len(manifest),'studentSourceCount':len(collections),'pageCount':len(all_sections),'lecturePageCount':sum(len(c['sections']) for c in collections if c['role']=='lecture'),'lectureCollectionCount':len(lecture_keys),'coreCount':len(core),'questionCount':len(practice['questions']),'guideCount':len(practice['guide']),'teachingWordCount':sum(a['words'] for a in audit),'allSuppliedSourcesAcquired':True,'pageReviewComplete':True,'originalSourceHashesVerified':True,'sources':[dict(v,id=k) for k,v in manifest.items() if v['role']=='style-reference'],'issues':['The LING406 reference PDF is an organization reference and is excluded from LING285 teaching and practice.','Generated practice is a source-aligned study aid, with self-assessment rather than automatic grading or exam prediction.','Original external or untranscribed audio content is not represented as a recovered lecture transcript.']+limitations}
data={'course':{'code':'LING285','title':'Human Language and Technology','professor':'Khalil Iskarous','edition':'Supplied material · Lectures 01–13','revision':'2026-10-19-v1','coverageNotice':'All supplied lecture decks are included. Practice covers the material available now and can grow as new lectures arrive. Source discrepancies and unavailable external clips are noted on their pages.'},'collections':collections,'questions':practice['questions'],'guide':practice['guide'],'coverage':coverage}
write(ROOT/'data.json',data);write(ROOT/'coverage-report.json',coverage);write(ROOT/'source-manifest.json',manifest);write(A/'teaching-coverage.json',audit);write(A/'runtime-asset-manifest.json',list(used_media.values()));write(A/'page-inventory.json',list(inventory.values()))
write(A/'preparation-status.json',{'sourceAcquisitionComplete':True,'blockedSources':[],'originalsVerified':len(manifest),'pagesRendered':len(inventory),'studentPages':len(all_sections),'lectureSlides':216,'teachingCoverageVerified':True,'reviewLimitations':limitations,'assemblyComplete':True})
print(json.dumps({k:v for k,v in coverage.items() if k not in ['sources','issues']},indent=2));print('Runtime assets',len(used_media),sum(v['bytes'] for v in used_media.values())//1024//1024,'MiB')
