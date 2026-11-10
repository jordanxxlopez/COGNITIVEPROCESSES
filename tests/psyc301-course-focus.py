from playwright.sync_api import sync_playwright
import os
base=os.getenv('STUDIO_BASE','http://127.0.0.1:8910/')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 q=b.new_page(ignore_https_errors=True,viewport={'width':1440,'height':1000});errors=[]
 q.on('pageerror',lambda e:errors.append(str(e)))
 q.goto(base,wait_until='networkidle')
 for n in [1,2,3,1,3,2]:
  q.locator(f'[data-studio-module="{n}"]').click();q.wait_for_timeout(100)
  assert q.evaluate('PsycCourseFocus.active()')==n
  assert q.locator('[data-studio-module="%s"]'%n).get_attribute('aria-pressed')=='true'
  assert q.evaluate('view')=='home'
  ids=q.locator('#workspaceNav [data-module],#moduleNav [data-module]').evaluate_all('(es)=>es.map(e=>Number(e.dataset.module))')
  second=q.evaluate('secondHalf.modules')
  assert all((x in second)==(n==2) for x in ids)
  assert bool(ids)==(n!=3)
  q.locator('[data-studio-module="overview"]').click();assert q.evaluate('PsycCourseFocus.active()')==n
  q.reload(wait_until='networkidle');assert q.evaluate('PsycCourseFocus.active()')==n
 # Notes retain the same IDs across modules and reloads.
 q.locator('[data-studio-module="1"]').click();q.locator('#moduleNav [data-module]').first.click()
 note=q.locator('[data-personal-note]').first;key=note.get_attribute('data-personal-note');note.fill('Preserved Module I note')
 q.locator('[data-studio-module="2"]').click();q.locator('#workspaceNav [data-module]').first.click()
 note=q.locator('[data-personal-note]').first;key2=note.get_attribute('data-personal-note');note.fill('Preserved Module II note')
 q.locator('[data-studio-module="1"]').click();q.locator('#moduleNav [data-module]').first.click()
 assert q.locator('[data-personal-note="'+key+'"]').input_value()=='Preserved Module I note'
 # Snapshot an answered quiz and ensure module switching does not replace it.
 q.evaluate('startQuiz("mixed10")');q.locator('[data-answer]').first.click()
 before=q.evaluate('JSON.stringify(quiz)')
 for n in [2,3,1]:q.locator(f'[data-studio-module="{n}"]').click()
 assert q.evaluate('JSON.stringify(quiz)')==before
 q.locator('[data-studio-module="2"]').click();q.locator('#workspaceNav [data-module]').first.click()
 assert q.locator('[data-personal-note="'+key2+'"]').input_value()=='Preserved Module II note'
 # Existing modern Module II tools remain available.
 q.locator('#workspaceNav [data-view="m2guide"]').click()
 assert q.locator('#workspace-layout-switch').is_visible()
 q.locator('#workspace-layout-switch input').check()
 assert q.locator('#content').evaluate('(e)=>e.classList.contains("workspace-modern")')
 q.locator('[data-studio-module="1"]').click();q.screenshot(path='/tmp/psyc-midterm1-focus.png')
 q.set_viewport_size({'width':390,'height':844});q.reload(wait_until='networkidle')
 if not q.locator('#courseModuleButtons').is_visible():q.locator('#openSidebar').click()
 q.locator('[data-studio-module="3"]').click();assert 'not been added' in q.locator('#content').inner_text()
 assert not errors,errors
 print('PASS: module-specific homes, scoped tools/collections, overview, reloads, notes, answered quiz, modern tools, mobile and no JS errors.')
 b.close()
