"""Assemble reviewed teaching and original source assets for the static LING285 studio."""
from pathlib import Path
from collections import Counter
import hashlib,json,re,shutil
from PIL import Image
from assessment_ranking import rank_questions
ROOT=Path(__file__).resolve().parents[1];A=ROOT/'authoring'
REVISION='2026-10-19-v3'
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
mcq=read('practice-mcq.json');assessment_model=read('assessment-model.json')
module_two={key for key,entry in manifest.items() if entry['role']=='lecture' and int(re.match(r'lecture(\d+)',key).group(1))>=11}
meadows=['notes-08-25-1','notes-08-25-2','notes-09-01','notes-09-03','notes-09-15','notes-09-17']
def required_module(refs):return 'module2' if any(ref['collection'] in module_two for ref in refs) else 'module1'
questions=[dict(q,type='written',edition=REVISION) for q in practice['questions']]+[dict(q,edition=REVISION) for q in mcq['questions']]
question_index={q['id']:q for q in questions}
retained_module_two={q['id'] for q in questions if required_module(q['sources'])=='module2'}
expanded_banks=[];claimed_ids=set()
for bank_path in sorted(A.glob('module2-lecture*-practice.json')):
 bank=json.loads(bank_path.read_text());owner=bank['lectureId']
 assert owner in module_two,('No supplied lecture source for bank',owner)
 assert len(bank['questions'])==50,(owner,'Lecture quizzes require50 questions')
 assert Counter(q['type'] for q in bank['questions'])=={'mcq':25,'written':25},owner
 assert len({q['id'] for q in bank['questions']})==50,owner
 for question in bank['questions']:
  assert question['id'] not in claimed_ids,('A question belongs to only one lecture quiz',question['id'])
  claimed_ids.add(question['id'])
  assert question['lectureId']==owner,question['id']
  assert any(ref['collection']==owner for ref in question['sources']),question['id']
  if question['id'] in question_index:
   original=question_index[question['id']]
   for field in ['type','prompt','answer','rubric','sources','topic','options','correctOption']:
    assert original.get(field)==question.get(field),(question['id'],'Existing content changed',field)
  question_index[question['id']]=dict(question,edition=REVISION)
 expanded_banks.append(owner)
assert set(expanded_banks)==module_two,('Supply a complete50-question bank for every Module II lecture',module_two-set(expanded_banks))
assert retained_module_two<=claimed_ids,('Existing Module II questions missing from lecture banks',retained_module_two-claimed_ids)
questions=list(question_index.values())
for q in questions:
 q['moduleId']=required_module(q['sources'])
 q['lectureId']=q.get('lectureId') or next((ref['collection'] for ref in q['sources'] if ref['collection'] in module_two),None) or next((ref['collection'] for ref in q['sources'] if ref['collection'].startswith('lecture')),None)
 if q['type']=='mcq':
  assert len(q['options'])==4 and len({o['id'] for o in q['options']})==4,q['id']
  assert q['correctOption'] in {o['id'] for o in q['options']},q['id']
  assert all(o['text'].strip() and o['feedback'].strip() for o in q['options']),q['id']
for owner in module_two:
 assert Counter(q['type'] for q in questions if q['lectureId']==owner)=={'mcq':25,'written':25},owner
rankings=rank_questions(questions,assessment_model)
for q,r in zip(questions,rankings):q['priority']=r['priority']
guide=[dict(g,moduleIds=[required_module(g['refs'])]) for g in practice['guide']]
expected={k for k,v in manifest.items() if v['role']!='style-reference'}
assert set(authored)==expected,('Missing',expected-set(authored),'Unexpected',set(authored)-expected)
assert all(v['status']=='downloaded' for v in manifest.values())
core={(r['collection'],r['page']):r['reason'] for r in practice['coreReview']}
assert len(core)==len(practice['coreReview'])
media_dir=ROOT/'assets/original';media_dir.mkdir(parents=True,exist_ok=True)
used_media={};audit=[];collections=[];source_issues=[]
lecture_keys=sorted(k for k,v in manifest.items() if v['role']=='lecture')
other_keys=['exam-review','exam-review-seagull','notes-08-25-1','notes-08-25-2','notes-09-01','notes-09-03','notes-09-15','notes-09-17','notes-lecture07','notes-lecture08','notes-lecture09','notes-lecture10','syllabus']
other_keys.extend(sorted(expected-set(lecture_keys)-set(other_keys)))
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
 collections.append({'id':key,'title':author['title'],'number':number,'label':label,'role':entry['role'],'sourceFile':entry['file'],'pdfFile':entry['rendered_pdf'],'originalFilename':entry['original'],'issues':issues,'sections':sections,'moduleId':None if key=='syllabus' else 'module2' if key in module_two else 'module1','workspaceGroup':'meadows' if key in meadows else 'lectures' if entry['role']=='lecture' else 'sources'})
all_sections={s['id']:s for c in collections for s in c['sections']}
def check_ref(ref):assert f'{ref["collection"]}-p{ref["page"]:03}' in all_sections,ref
for q in questions:
 assert q['prompt'] and q['answer'] and len(q['rubric'])>=2,q
 for ref in q['sources']:check_ref(ref)
for ref in practice['coreReview']:check_ref(ref)
for g in practice['guide']:
 for ref in g['refs']:check_ref(ref)
assert len({q['id'] for q in questions})==len(questions)
assert not any(s['core'] and not s['teaching'] for s in all_sections.values())
assert not any('need not' in t.lower() for s in all_sections.values() for t in s['teaching'])
limitations=sorted({limit for item in audit for limit in item['review'].get('limitations',[]) if limit})
late_lectures=[key for key in lecture_keys if key in module_two]
late_range='Lectures '+str(int(re.match(r'lecture(\d+)',late_lectures[0]).group(1)))+'–'+str(int(re.match(r'lecture(\d+)',late_lectures[-1]).group(1)))
modules=[
 {'id':'module1','title':'Module I','subtitle':'Midterm 1','lectureIds':[key for key in lecture_keys if key not in module_two],
  'supplementIds':['notes-lecture07','notes-lecture08','notes-lecture09','notes-lecture10'],'meadowsIds':meadows,
  'lectureRange':'Lectures 01–10','description':'First-midterm material · Lectures 01–10.','futureNote':'First-midterm material remains available with its own notes, review tools, and practice.'},
 {'id':'module2','title':'Module II','subtitle':'Midterm 2','lectureIds':[key for key in lecture_keys if key in module_two],
  'supplementIds':[],'meadowsIds':[],'lectureRange':late_range+' so far','description':'Current focus · '+late_range+'. Future lectures will be added here.',
  'assessmentPolicy':{'lectureQuizSize':50,'currentTestSize':100,'mcqShare':.5},
  'futureNote':late_range+' are available now. New lectures will extend this module and its cumulative practice as the professor posts them.'}
]
for module in modules:
 module['questionCount']=sum(q['moduleId']==module['id'] for q in questions)
 module['mcqCount']=sum(q['moduleId']==module['id'] and q['type']=='mcq' for q in questions)
 module['writtenCount']=module['questionCount']-module['mcqCount']
coverage={'sourceCount':len(manifest),'studentSourceCount':len(collections),'pageCount':len(all_sections),
 'lecturePageCount':sum(len(c['sections']) for c in collections if c['role']=='lecture'),
 'lectureCollectionCount':len(lecture_keys),'coreCount':len(core),'questionCount':len(questions),
 'writtenQuestionCount':sum(q['type']=='written' for q in questions),'mcqQuestionCount':sum(q['type']=='mcq' for q in questions),
 'guideCount':len(guide),'teachingWordCount':sum(a['words'] for a in audit),
 'allSuppliedSourcesAcquired':True,'pageReviewComplete':True,'originalSourceHashesVerified':True,
 'sources':[dict(v,id=k) for k,v in manifest.items() if v['role']=='style-reference'],
 'issues':['The LING406 reference PDF is an organization reference and is excluded from LING285 teaching and practice.',
 'Generated practice is a source-aligned study aid, not an actual instructor exam or a validated exam prediction. Written answers use self-assessment rather than automatic grading; multiple-choice answers use a source-checked key.',
 'The supplied Exam 1 Review contains 20 conceptual prompts and no A–D questions. New multiple-choice items adapt its reasoning patterns. Module II practice applies that style to Lectures 11–13.',
 'Original external or untranscribed audio content is not represented as a recovered lecture transcript.']+limitations}
data={'course':{'code':'LING285','title':'Human Language and Technology','professor':'Khalil Iskarous',
 'edition':'Module I · Lectures 01–10 / Module II · '+late_range,'revision':REVISION,'defaultModule':'module2',
 'coverageNotice':'Module II begins with Lectures 11–13 and grows as new material arrives. Module I retains Lectures 01–10 and separate study tools. Supporting documents remain in Sources & coverage.'},
 'modules':modules,'collections':collections,'questions':questions,'guide':guide,'coverage':coverage,'assessmentModel':assessment_model}
write(ROOT/'data.json',data);write(ROOT/'coverage-report.json',coverage);write(ROOT/'source-manifest.json',manifest);write(A/'teaching-coverage.json',audit);write(A/'runtime-asset-manifest.json',list(used_media.values()));write(A/'page-inventory.json',list(inventory.values()))
write(A/'preparation-status.json',{'sourceAcquisitionComplete':True,'blockedSources':[],'originalsVerified':len(manifest),'pagesRendered':len(inventory),'studentPages':len(all_sections),'lectureSlides':216,'teachingCoverageVerified':True,'reviewLimitations':limitations,'assemblyComplete':True})
write(A/'assessment-ranking.json',{'method':'TF–IDF cosine similarity to the 20 supplied review prompts plus observed reasoning-pattern weights. Scores measure study relevance, not the probability of appearing on an exam. Sampling preserves lecture and question-type coverage before using these weights.','revision':REVISION,'questions':rankings,'rankedIdsByModule':{module['id']:[q['id'] for q in sorted((q for q in rankings if q['moduleId']==module['id']),key=lambda q:(-q['priority'],q['id']))] for module in modules}})
print(json.dumps({k:v for k,v in coverage.items() if k not in ['sources','issues']},indent=2));print('Runtime assets',len(used_media),sum(v['bytes'] for v in used_media.values())//1024//1024,'MiB')
