"""Rendered Module II layout checks, including comparison with modern PSYC301."""
import contextlib
import http.server
import json
from pathlib import Path
import shutil
import threading
from playwright.sync_api import sync_playwright
from modern_smoke import QuietHandler

ROUTES=['guide','ask','qa','cards','contrasts','hard','review','core','experiments','stimuli','combined','codeblocks','figures','test','writing','quizzes','missed','sources']

BOUNDS=r"""() => {
 const errors=[];
 for(const el of document.querySelectorAll('#content img,#content video')){
  const rect=el.getBoundingClientRect();if(!rect.width || !rect.height)continue;
  const container=el.closest('figure,.stimulus-card,.stim-gallery-card,.media-item') || el.parentElement;
  const bounds=container.getBoundingClientRect();
  if(rect.left<bounds.left-2 || rect.right>bounds.right+2)errors.push({tag:el.tagName,width:rect.width,container:bounds.width,src:el.currentSrc || el.src});
 }
 return {overflow:document.documentElement.scrollWidth>innerWidth+2,media:errors};
}"""


def run(base,browser):
    context=browser.new_context(viewport={'width':1440,'height':1000})
    context.add_init_script("localStorage.setItem('psyc301-workspace-layout','modern')")
    page=context.new_page();errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(base+'/')
    page.wait_for_function('typeof window.PSYC301QABank !== "undefined"')
    page.evaluate("view='m2guide';render()")
    reference=page.locator('.aid-qa>summary').first.evaluate('''el=>{const c=getComputedStyle(el);return {padding:c.padding,borderRadius:getComputedStyle(el.parentElement).borderRadius,fontSize:c.fontSize}}''')

    def route(view,module='module2'):
        page.goto(f'{base}/ling285/modern/?module={module}&view={view}')
        page.wait_for_function("document.querySelector('#content h1') && !document.querySelector('#content .loading')")

    route('guide')
    guide=page.locator('[data-guide-id]')
    assert guide.count()==19
    counts=guide.locator('.aid-qas').evaluate_all('(els)=>els.map(e=>e.children.length)')
    assert min(counts)>=3 and len(set(counts))>1,counts
    assert counts[0]==5
    actual=page.locator('.aid-qas>.aid-qa>summary').first.evaluate('''el=>{const c=getComputedStyle(el);return {padding:c.padding,borderRadius:getComputedStyle(el.parentElement).borderRadius,fontSize:c.fontSize}}''')
    assert actual==reference,(actual,reference)
    page.locator('.aid-qas>.aid-qa>summary').first.click()
    assert guide.first.locator('.aid-qas>.aid-qa[open]').count()==1
    assert 'Inertia keeps the mass moving' in guide.first.inner_text()
    ready=page.locator('[data-ready]').first;ready.check();ready_id=ready.get_attribute('data-ready')
    page.reload();page.locator(f'[data-ready="{ready_id}"]').wait_for()
    assert page.locator(f'[data-ready="{ready_id}"]').is_checked()

    route('qa')
    bank=page.evaluate('window.LING285_MODERN.qa.filter(q=>q.moduleId==="module2")')
    assert page.locator('.module2-qa-group').count()==8
    assert page.locator('[data-qa-kind=slides]').count()==8
    assert page.locator('[data-qa-kind=connections]').count()==8
    assert set(page.locator('[data-layout-question]').evaluate_all('(els)=>els.map(e=>e.dataset.layoutQuestion)'))=={q['id'] for q in bank}
    page.locator('[data-layout-answers=true]').click()
    assert page.locator('.qa-item[open]').count()==len(bank)
    page.locator('[data-layout-answers=false]').click()
    assert page.locator('.qa-item[open]').count()==0
    assert page.locator('.module2-qa-group[open]').count()==8
    page.locator('[data-layout-field=qaSpeak]').check()
    assert page.locator('[data-layout-answers=true]').count()==0
    page.locator('[data-layout-field=qaSpeak]').uncheck()
    page.locator('[data-modern-qa=qaLecture]').select_option('lecture18')
    assert page.locator('.module2-qa-group').count()==1
    page.locator('[data-layout-field=qaMode]').select_option('connections')
    assert page.locator('[data-qa-kind=slides]').count()==0
    page.reload();page.locator('.module2-qa-group').wait_for()
    assert page.locator('[data-layout-field=qaMode]').input_value()=='connections'
    page.locator('[data-layout-field=qaMode]').select_option('both')
    page.locator('[data-modern-qa=qaLecture]').select_option('all')

    for view in ['ask','cards','contrasts','hard','codeblocks','figures']:
        route(view)
        owners=page.locator('[data-layout-owner]').evaluate_all('(els)=>[...new Set(els.map(e=>e.dataset.layoutOwner))]')
        assert owners,view
        page.locator(f'[data-layout-field="lecture-{view}"]').select_option(owners[0])
        assert page.locator('.module2-lecture-group:not([hidden])').count()==1,view
        page.locator(f'[data-layout-field="lecture-{view}"]').select_option('all')

    # Exercise both themes on every menu section at desktop, intermediate,
    # tablet and mobile widths. Open previews rather than checking only headers.
    checked=[]
    for width in [1440,1280,1024,390]:
        page.set_viewport_size({'width':width,'height':1000 if width>650 else 844})
        for theme in ['light','dark']:
            for view in ROUTES:
                route(view)
                page.evaluate('theme=>{document.documentElement.dataset.theme=theme}',theme)
                page.evaluate('''()=>{
                 for(const el of document.querySelectorAll('#content .modern-figure,#content .modern-core'))el.open=true;
                 for(const el of [...document.querySelectorAll('#content .source-section')].slice(0,3))el.open=true;
                 for(const el of document.querySelectorAll('#content .modern-qa-pair video,#content .aid-visual video')){el.width=1920;el.height=1080;}
                }''')
                result=page.evaluate(BOUNDS)
                assert not result['overflow'],(view,width,theme,'page overflow')
                assert not result['media'],(view,width,theme,result['media'][:3])
                if view in ['qa','guide']:
                    styles=page.locator('.aid-qa>summary').first.evaluate('''e=>({color:getComputedStyle(e).color,ink:getComputedStyle(e).getPropertyValue('--ink').trim()})''')
                    assert styles['color']==('rgb(248, 237, 242)' if theme=='dark' else 'rgb(48, 33, 41)'),styles
                controls=page.locator('.aid-bar select').all()
                for control in controls:
                    if control.is_visible():
                        color=control.evaluate('(e)=>getComputedStyle(e).color')
                        assert color==('rgb(248, 237, 242)' if theme=='dark' else 'rgb(48, 33, 41)'),(view,color)
                checked.append([view,width,theme])
        print(f'PASS: all Module II sections at {width}px in both themes',flush=True)
    # Open the interactive states that are easy to miss in an overview screenshot.
    for width in [1440,390]:
        page.set_viewport_size({'width':width,'height':1000 if width>650 else 844})
        for theme in ['light','dark']:
            route('qa')
            page.evaluate('t=>document.documentElement.dataset.theme=t',theme)
            question=page.locator('.qa-item:has(.slide-button)').first
            question.locator(':scope > summary').click()
            assert not page.evaluate(BOUNDS)['media']
            question.locator('.slide-button').first.click()
            page.locator('#imageDialog[open]').wait_for()
            page.wait_for_function("document.querySelector('#enlargedImage').complete && document.querySelector('#enlargedImage').naturalWidth>0")
            ratio=page.locator('#enlargedImage').evaluate('(e)=>{const r=e.getBoundingClientRect();return (r.width/r.height)/(e.naturalWidth/e.naturalHeight)}')
            assert abs(ratio-1)<.02,('enlarged source proportions',width,ratio)
            page.locator('[data-action=closeImage]').click()
            question.locator('[data-open-section]').first.click()
            page.locator('#readerDialog[open]').wait_for()
            assert page.locator('#readerDialog video').evaluate_all('(els)=>els.every(e=>e.getBoundingClientRect().width<=e.closest("figure").getBoundingClientRect().width+2)')
            page.locator('[data-action=closeReader]').click()
            route('codeblocks')
            page.locator('.modern-code .modern-answer').first.evaluate('(e)=>e.open=true')
            assert not page.evaluate(BOUNDS)['overflow']
            route('review')
            page.locator('.modern-review .modern-response').first.evaluate('(e)=>e.open=true')
            page.locator('.modern-review textarea').first.fill('Preserve this review response.')
            page.reload();page.locator('.modern-review').first.wait_for()
            assert page.locator('.modern-review textarea').first.input_value()=='Preserve this review response.'
            route('experiments')
            page.locator('[data-layout-reader]').first.click()
            page.locator('#readerDialog[open]').wait_for()
            assert page.locator('#readerSelect option').count()>10
            page.locator('[data-action=closeReader]').click()
    route('test')
    assert page.locator('.module2-assessment-path>.card').count()==2
    assert page.locator('.module2-assessment-path>.card').first.locator('[data-start=modern-high]').count()==1
    assert page.locator('.module2-lecture-grid .modern-quiz-card').count()==8
    route('core')
    page.locator('[data-action=expandSections]').click()
    assert page.locator('.modern-core[open]').count()==36
    page.locator('[data-layout-core-find]').fill('stiffness')
    assert 0<page.locator('.modern-core:not([hidden])').count()<36
    page.locator('[data-layout-core-find]').fill('')
    page.locator('[data-action=collapseSections]').click()
    assert page.locator('.modern-core[open]').count()==0
    route('sources')
    assert page.locator('.modern-source-entry').count()==17
    assert page.locator('.module2-source-group[open] .modern-source-entry').count()==8
    route('guide','module1')
    assert page.locator('#content.module2-workspace').count()==0
    assert page.locator('[data-layout-question]').count()==0
    route('collection')
    assert page.locator('#content.module2-workspace').count()==0
    assert not errors,errors
    context.close()
    print(f'PASS: PSYC301 structural comparison, integrated guide/Q&A, filters, persistence and {len(checked)} rendered section/theme/viewport combinations')


if __name__=='__main__':
    with http.server.ThreadingHTTPServer(('127.0.0.1',0),QuietHandler) as server:
        threading.Thread(target=server.serve_forever,daemon=True).start()
        try:
            with sync_playwright() as p:
                options={'headless':True,'args':['--no-sandbox']}
                executable=shutil.which('chromium') or shutil.which('chromium-browser')
                if executable:options['executable_path']=executable
                with contextlib.closing(p.chromium.launch(**options)) as browser:
                    run(f'http://127.0.0.1:{server.server_port}',browser)
        finally:server.shutdown()
