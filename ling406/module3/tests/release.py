"""Validate the complete Module III release and Module II state preservation."""
from pathlib import Path
import hashlib,json,re,subprocess
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];REPO=ROOT.parents[1]
data=json.loads((ROOT/'data.js').read_text().removeprefix('window.LING406_MODULE3 = ').rstrip(';\n'))
assert data['status']=='ready'
assert len(data['modules'])==6 and len(data['sections'])==185
assert len(data['questions'])==60 and len(data['written'])==12
ids={s['id'] for s in data['sections']};assert len(ids)==185
for key,source in data['sources'].items():
 assert hashlib.sha256((ROOT/source['file']).read_bytes()).hexdigest()==source['sha256']
 assert source['previewStatus']=='ready'
 rows=[s for s in data['sections'] if s['source']==key]
 assert [s['page'] for s in rows]==list(range(1,source['pages']+1))
 for s in rows:assert (ROOT/s['image']).is_file()
for edition in data['editions']:
 assert set(edition['scripts'])==ids
 for sid,entry in edition['scripts'].items():
  assert entry['status'] in ['ready','noninstructional']
  assert bool(entry['blocks'])==(entry['status']=='ready')
  prose=' '.join(b['text']+' '+' '.join(b['children']) for b in entry['blocks'])
  assert not re.search(r'[:;]|\bneed not\b|\blawful\b|the (?:slide|lecture) (?:says|shows|describes)',prose,re.I),(sid,prose)
for s in data['sections']:
 variants=[e['scripts'][s['id']]['blocks'] for e in data['editions']]
 if variants[0]:assert len({json.dumps(v) for v in variants})==4,s['id']
for q in data['questions']:
 assert q['section'] in ids and len(q['choices'])==4 and len(set(q['choices']))==4 and 0<=q['correct']<4
for m in data['modules']:assert sum(q['module']==m['id'] for q in data['questions'])==10
for group in data['guide']+data['experiments']:assert set(group['sections'])<=ids
# Only navigation, source-coverage wording and its cache manifest may change in
# the released Module II. Its authored data, visuals and quiz bank stay untouched.
baseline='9e91594'
protected=['data.js','quiz-engine.js'] + [p.name for p in ROOT.parent.glob('transcripts*-data.js')]
for name in protected:
 original=subprocess.check_output(['git','show',f'{baseline}:ling406/{name}'],cwd=REPO)
 assert (ROOT.parent/name).read_bytes()==original,name
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1440,'height':1000});errors=[];failures=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('response',lambda r:failures.append((r.status,r.url)) if r.status>=400 else None)
 page.goto('http://127.0.0.1:8907/ling406/?view=collection&lecture=speech1',wait_until='networkidle')
 assert page.locator('#collectionNav button').count()==10
 page.locator('[data-note]').first.fill('Module II preserved note')
 page.locator('[data-read]').first.check()
 page.evaluate('LingStudio.startQuiz("quick")');page.locator('[data-answer]').first.click()
 before=page.evaluate("localStorage.getItem('ling406-study-studio-v1')")
 page.locator('#courseNav [data-module-link="3"]').click();page.wait_for_url('**/module3/?view=home');page.wait_for_load_state('networkidle')
 assert page.locator('#collectionNav button').count()==6
 assert page.locator('header [data-transcript-version] option').count()==4
 for module in data['modules']:
  page.evaluate('(key)=>LingStudio.go("collection",key)',module['id'])
  assert page.locator('.note-section').count()==len(module['sections'])
  page.locator('[data-reader="lecture"]').last.click()
  assert page.locator('#readerSelect option').count()==len(module['sections'])
  assert page.locator('[data-action="previous"]').is_disabled()
  page.locator('#readerSelect').select_option(str(len(module['sections'])-1))
  assert page.locator('[data-action="next"]').is_disabled()
  page.keyboard.press('Escape')
 page.evaluate('LingStudio.go("collection","reading1")')
 page.locator('[data-note="m3-reading1-p001"]').fill('Module III persistent note')
 page.locator('[data-read="m3-reading1-p001"]').check()
 page.evaluate('LingStudio.openReader([...LingStudio.sections.keys()],0,true,"All pages")')
 for version in ['20','21','22','23']:
  page.locator('#readerRoot [data-transcript-version]').select_option(version)
  result=page.evaluate('''() => {let total=0;for(let i=0;i<185;i++){moveReader(i);const s=reader.items[i],e=D.editions[state.transcriptVersion-20].scripts[s.id];if(document.querySelectorAll('#readerRoot .teaching-script > li').length!==e.blocks.length)throw Error(s.id);const img=document.querySelector('#readerRoot img.slide');if(!img||!img.src.endsWith(s.image))throw Error('image '+s.id);total++;}return total;}''')
  assert result==185
 assert page.locator('#readerSelect').input_value()=='184'
 page.keyboard.press('Escape');page.reload(wait_until='networkidle')
 assert page.locator('header [data-transcript-version]').input_value()=='23'
 assert page.locator('[data-note="m3-reading1-p001"]').input_value()=='Module III persistent note'
 assert page.locator('[data-read="m3-reading1-p001"]').is_checked()
 page.locator('#noteSearch').fill('COLONEL');assert page.locator('.note-section:not([hidden])').count()>=1
 for route in ['guide','core','experiments','videos','combined','test','quizzes','missed','sources','written']:
  page.evaluate('(v)=>LingStudio.go(v)',route);text=page.locator('#content').inner_text();assert text and not re.search(r'\bpending\b',text,re.I),route
 page.evaluate('LingStudio.startQuiz("exam")')
 assert page.evaluate('LingStudio.state.quiz.items.length')==60
 assert page.evaluate('LingStudio.validateAnswerKey(LingStudio.state.quiz.items,LingStudio.questions)')
 # Grade by canonical identity despite shuffled display positions.
 for i in range(60):
  page.evaluate('''() => {const q=questions.get(state.quiz.items[state.quiz.index].id);document.querySelector(`[data-answer="${q.correct}"]`).click();}''')
  assert page.locator('.feedback strong').inner_text()=='Correct.'
  if i<59:page.locator(f'[data-quiz-index="{i+1}"]').first.click()
 page.locator('[data-action="finishQuiz"]').click();assert '60 / 60 correct' in page.locator('h1').inner_text()
 page.evaluate('LingStudio.startQuiz("quick")')
 page.evaluate('''() => {const q=questions.get(state.quiz.items[0].id);document.querySelector(`[data-answer="${(q.correct+1)%4}"]`).click();}''')
 assert page.evaluate('LingStudio.state.missed.length')==1
 quiz_before=page.evaluate('JSON.stringify(LingStudio.state.quiz)')
 page.reload(wait_until='networkidle');assert page.evaluate('JSON.stringify(LingStudio.state.quiz)')==quiz_before
 page.evaluate('LingStudio.go("missed")');assert page.locator('[data-quiz="missed"]').count()==1
 for width in [1440,390]:
  page.set_viewport_size({'width':width,'height':1000})
  for theme in ['light','dark']:
   page.evaluate('(t)=>{LingStudio.state.theme=t;LingStudio.state.sideClosed=true;LingStudio.go("collection","thought")}',theme)
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
   page.locator('[data-reader="lecture"]').last.click();page.locator('#readerSelect').select_option('8')
   assert page.evaluate('document.querySelector(".expanded-shell").scrollWidth<=innerWidth+1')
   page.screenshot(path=f'/tmp/ling406-release-{width}-{theme}.png')
   page.keyboard.press('Escape')
 assert page.evaluate("localStorage.getItem('ling406-study-studio-v1')")==before
 page.locator('#courseNav [data-module-link="2"]').click();page.wait_for_url('**/ling406/?view=home');page.wait_for_load_state('networkidle')
 # Navigating back resumes the previous Module II quiz and notes unchanged.
 assert page.evaluate("localStorage.getItem('ling406-study-studio-v1')")==before
 assert page.evaluate('LingStudio.state.notes[Object.keys(LingStudio.state.notes)[0]]')=='Module II preserved note'
 page.locator('#courseNav [data-module-link="3"]').click();page.wait_for_url('**/module3/?view=home');page.wait_for_load_state('networkidle')
 page.evaluate('navigator.serviceWorker.ready.then(()=>true)')
 page.reload(wait_until='networkidle')
 page.context.set_offline(True);page.reload(wait_until='domcontentloaded')
 assert page.locator('#collectionNav button').count()==6
 page.evaluate('LingStudio.go("collection","reading1")');assert page.locator('.note-section').count()==24
 page.context.set_offline(False)
 assert not errors,errors
 assert not failures,failures
 browser.close()
print('PASS: 185 visuals, 175 instructional pages × four editions, 60 questions and grading, all routes, both modules and saved states, readers, search, desktop/mobile themes and offline text shell.')
