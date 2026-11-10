"""Actual wheel isolation and the PSYC301 left/right reading structure."""
import contextlib
import http.server
import json
import shutil
import threading
from playwright.sync_api import sync_playwright
from modern_smoke import ROOT, QuietHandler


def run(base, browser):
    data = json.loads((ROOT/'ling285/data.json').read_text())
    lectures = [c for c in data['collections'] if c['role'] == 'lecture']
    context = browser.new_context(viewport={'width':1600,'height':900})
    page = context.new_page(); errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))

    def route(edition, cid='lecture11'):
        module = 'module1' if int(cid[7:9]) < 11 else 'module2'
        page.goto(f'{base}/ling285/{edition}?view=collection&module={module}&lecture={cid}')
        page.wait_for_selector('.inline-reader .reader-transcript')
        page.wait_for_function('document.querySelector(".reader-tools") && document.querySelector("#readerSelect")')

    def geometry(root='.inline-reader', stacked=False):
        result = page.locator(root).evaluate('''root=>{
            const t=root.querySelector('.reader-transcript'),v=root.querySelector('.reader-visual'),
                  controls=root.querySelector('.reader-controls').getBoundingClientRect(),
                  a=t.getBoundingClientRect(),b=v.getBoundingClientRect();
            return {text:[a.x,a.y,a.width,a.height,a.bottom],visual:[b.x,b.y,b.width,b.height,b.bottom],
                    controlsBottom:controls.bottom,viewport:innerHeight,
                    overflow:document.documentElement.scrollWidth>innerWidth+2,
                    scrolls:[t,v].map(e=>[getComputedStyle(e).overflowY,getComputedStyle(e).overscrollBehaviorY])};
        }''')
        assert not result['overflow'], result
        a,b = result['text'],result['visual']
        assert result['controlsBottom'] <= min(a[1],b[1])+1, result
        if stacked:
            assert a[1] < b[1] and abs(a[0]-b[0])<2, result
        else:
            assert a[0] < b[0] and abs(a[1]-b[1])<2 and abs(a[3]-b[3])<2, result
        assert min(a[2:4]+b[2:4])>40 and max(a[4],b[4])<=result['viewport']+1, result
        assert all(overflow=='auto' and overscroll=='contain' for overflow,overscroll in result['scrolls']), result

    # Every numbered collection opens in the paired reader, including title pages.
    for edition in ['', 'modern/']:
        for c in lectures:
            route(edition,c['id'])
            assert page.locator('#readerSelect option').count()==len(c['sections'])
            for theme in ['light','dark']:
                page.evaluate('theme=>document.documentElement.dataset.theme=theme',theme)
                geometry()
        print(f'PASS: every collection in {edition or "original"}, both themes, text left and source right', flush=True)

        route(edition)
        page.locator('[data-transcript-version]').select_option('d' if edition else 'v23')
        page.locator('#readerSelect').select_option('3')
        page.set_viewport_size({'width':1600,'height':720})
        page.wait_for_timeout(100)
        text=page.locator('.reader-transcript');visual=page.locator('.reader-visual')
        snapshot=lambda:page.evaluate('''()=>({page:scrollY,text:document.querySelector('.reader-transcript').scrollTop,visual:document.querySelector('.reader-visual').scrollTop,controls:document.querySelector('.reader-controls').getBoundingClientRect().top})''')
        before=snapshot();text.hover();page.mouse.wheel(0,450);page.wait_for_timeout(150);after=snapshot()
        assert after['text']>before['text'] and after['visual']==before['visual'] and after['page']==before['page'], (before,after)
        assert abs(after['controls']-before['controls'])<1
        text.evaluate('(e)=>e.scrollTop=e.scrollHeight');before=snapshot();page.mouse.wheel(0,700);page.wait_for_timeout(150)
        assert snapshot()==before, (before,snapshot(),'transcript bottom leaked')
        # Show the existing source details so the right panel has material to scroll.
        visual.locator('details').evaluate_all('(els)=>els.forEach(e=>e.open=true)')
        page.wait_for_timeout(80)
        assert visual.evaluate('(e)=>e.scrollHeight>e.clientHeight+10')
        before=snapshot();visual.hover();page.mouse.wheel(0,300);page.wait_for_timeout(150);after=snapshot()
        assert after['visual']>before['visual'] and after['text']==before['text'] and after['page']==before['page'], (before,after)
        visual.evaluate('(e)=>e.scrollTop=e.scrollHeight');before=snapshot();page.mouse.wheel(0,700);page.wait_for_timeout(150)
        assert snapshot()==before, (before,snapshot(),'visual bottom leaked')
        visual.evaluate('(e)=>e.scrollTop=0');before=snapshot();page.mouse.wheel(0,-700);page.wait_for_timeout(150)
        assert snapshot()==before, (before,snapshot(),'visual top leaked')
        page.locator('[data-action=readerNext]').click();assert page.locator('#readerSelect').input_value()=='4'
        assert text.evaluate('(e)=>e.scrollTop')==0 and visual.evaluate('(e)=>e.scrollTop')==0
        page.locator('[data-action=expandReader]').click();page.locator('#readerDialog[open] .reader-transcript').wait_for();geometry('#readerDialog')
        page.locator('#readerDialog [data-action=closeReader]').click();page.locator('.inline-reader .reader-transcript').wait_for()
        assert page.locator('#readerSelect').input_value()=='4'
        for width,height in [(1024,800),(390,844)]:
            page.set_viewport_size({'width':width,'height':height});page.wait_for_timeout(100);geometry(stacked=width<=760)
        page.set_viewport_size({'width':1600,'height':900})
        page.locator('.inline-reader [data-action=closeReader]').click()
        assert page.locator('.source-section').count()==11
        assert not page.locator('.inline-reader').count()
        print(f'PASS: real independent scrolling, boundary containment, stable controls, page/expanded navigation and mobile fitting in {edition or "original"}',flush=True)

    # Workspace pairs also retain text on the left at ordinary desktop widths.
    for width in [2000,1600,1024]:
        page.set_viewport_size({'width':width,'height':900})
        for edition,views in [('', ['guide','core','experiments','combined','codeblocks','figures']),('modern/',['guide','qa','cards','contrasts','hard','core','experiments','combined','codeblocks','figures'])]:
            for view in views:
                page.goto(f'{base}/ling285/{edition}?view={view}&module=module2')
                page.wait_for_function('document.querySelector("#content h1") && !document.querySelector("#content .loading")')
                page.locator('#content details').evaluate_all('(els)=>els.slice(0,6).forEach(e=>e.open=true)')
                failures=page.evaluate('''()=>[...document.querySelectorAll('#content .aid-split,#content .modern-qa-pair,#content .section-pair')].filter(e=>e.getBoundingClientRect().height && getComputedStyle(e).gridTemplateColumns.split(' ').length!==2).map(e=>e.className)''')
                assert not failures,(edition,width,view,failures)
    assert not errors,errors
    context.close()
    print('PASS: desktop left/right workspace pairs at 2000, 1600 and 1024 pixels',flush=True)


if __name__=='__main__':
    with http.server.ThreadingHTTPServer(('127.0.0.1',0),QuietHandler) as server:
        threading.Thread(target=server.serve_forever,daemon=True).start()
        try:
            with sync_playwright() as p:
                args={'headless':True,'args':['--no-sandbox']}
                executable=shutil.which('chromium') or shutil.which('chromium-browser')
                if executable:args['executable_path']=executable
                with contextlib.closing(p.chromium.launch(**args)) as browser:run(f'http://127.0.0.1:{server.server_port}',browser)
        finally:server.shutdown()
