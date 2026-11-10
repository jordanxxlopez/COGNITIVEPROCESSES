from pathlib import Path
import json,re,hashlib,os
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1]
d=json.loads((R/'data.js').read_text().removeprefix('window.LING406_MODULE1 = ').rstrip(';\n'))
assert len(d['modules'])==9 and len(d['sections'])==294 and len(d['questions'])==90
ids={s['id'] for s in d['sections']};assert len(ids)==294
for key,s in d['sources'].items():
 assert hashlib.sha256((R/s['file']).read_bytes()).hexdigest()==s['sha256']
 rows=[p for p in d['sections'] if p['source']==key]
 assert [r['page'] for r in rows]==list(range(1,s['pages']+1))
 for r in rows:assert (R/r['image']).is_file()
for e in d['editions']:
 assert set(e['scripts'])==ids
 for s in e['scripts'].values():
  prose=' '.join(b['text']+' '+' '.join(b['children']) for b in s['blocks'])
  assert not re.search(r'[:;]|\bneed not\b|\blawful\b|the slide shows|the lecture says',prose,re.I),prose
for q in d['questions']:assert q['section'] in ids and 0<=q['correct']<4 and len(set(q['choices']))==4
for typ in ['guide','experiments']:
 for g in d[typ]:assert set(g['sections'])<=ids
base=os.getenv('STUDIO_BASE','http://127.0.0.1:8912/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 q=b.new_page(ignore_https_errors=True,viewport={'width':1440,'height':1000});errors=[]
 q.on('pageerror',lambda e:errors.append(str(e)))
 q.goto(base+'ling406/?view=collection&lecture=speech1',wait_until='networkidle')
 q.locator('[data-note]').first.fill('Unchanged Module II note');before=q.evaluate("localStorage.getItem('ling406-study-studio-v1')")
 q.locator('#courseNav [data-module-link="3"]').click();q.wait_for_load_state('networkidle')
 q.evaluate('LingStudio.go("collection","reading1")');q.locator('[data-note]').first.fill('Unchanged Module III note');before3=q.evaluate("localStorage.getItem('ling406-module3-study-studio-v1')")
 q.locator('#courseNav [data-module-link="1"]').click();q.wait_for_load_state('networkidle')
 assert q.locator('#collectionNav button').count()==9
 assert q.locator('header [data-transcript-version] option').count()==4
 for m in d['modules']:
  q.evaluate('(key)=>LingStudio.go("collection",key)',m['id']);assert q.locator('.note-section').count()==len(m['sections'])
 q.evaluate('LingStudio.go("collection","lecture01")')
 q.locator('[data-note="m1-lecture01-p001"]').fill('Preserved first-module note');q.locator('[data-read="m1-lecture01-p001"]').check()
 q.evaluate('LingStudio.openReader([...LingStudio.sections.keys()],0,true,"All source pages")')
 for version in ['20','21','22','23']:
  q.locator('#readerRoot [data-transcript-version]').select_option(version)
  assert q.evaluate("""()=>{for(let i=0;i<294;i++){moveReader(i);const s=reader.items[i],e=D.editions[state.transcriptVersion-20].scripts[s.id];if(document.querySelectorAll('#readerRoot .teaching-script > li').length!==e.blocks.length)throw Error(s.id);const img=document.querySelector('#readerRoot img.slide');if(!img||!img.src.endsWith(s.image))throw Error('image '+s.id)}return 294}""")==294
 q.keyboard.press('Escape');q.reload(wait_until='networkidle')
 assert q.locator('[data-note="m1-lecture01-p001"]').input_value()=='Preserved first-module note'
 assert q.locator('[data-read="m1-lecture01-p001"]').is_checked()
 for route in ['home','guide','core','experiments','videos','combined','test','quizzes','missed','sources','written']:
  q.evaluate('(v)=>LingStudio.go(v)',route);assert len(q.locator('#content').inner_text())>50,route
 q.evaluate('LingStudio.startQuiz("exam")')
 q.evaluate("""()=>{const count=state.quiz.items.length;for(let i=0;i<count;i++){document.querySelector('[data-quiz-index="'+i+'"]').click();const item=state.quiz.items[i],question=questions.get(item.id);document.querySelector('[data-answer="'+question.correct+'"]').click();}document.querySelector('[data-action="finishQuiz"]').click()}""")
 assert q.evaluate('state.quiz.finished && Object.keys(state.quiz.answers).length===90')
 assert '90 / 90' in q.locator('#content').inner_text()
 assert q.evaluate("localStorage.getItem('ling406-study-studio-v1')")==before
 assert q.evaluate("localStorage.getItem('ling406-module3-study-studio-v1')")==before3
 for width in [1440,390]:
  q.set_viewport_size({'width':width,'height':1000});q.evaluate('LingStudio.go("collection","lecture04")');q.locator('[data-reader="lecture"]').last.click()
  assert q.locator('#readerSelect option').count()==47
  assert q.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  q.keyboard.press('Escape')
 assert not errors,errors
 print('PASS:294 original pages,4 editions,90questions,all routes,1176reader views,notes/read marks,module isolation,desktop/mobile.')
 b.close()
