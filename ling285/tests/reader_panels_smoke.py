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
        page.wait_for_selector('.study-mode-tabs')
        assert not page.locator('.inline-reader').count(), 'collections open in Teaching notes'
        assert page.locator('[data-action=teachingNotes]').get_attribute('aria-selected')=='true'
        title=page.locator('#content>h1').inner_text()
        prefix=header_prefix()
        page.locator('[data-reader=lecture][data-expanded=false]').click()
        page.wait_for_selector('.inline-reader .reader-transcript')
        assert page.locator('#content>h1').inner_text()==title
        assert header_prefix()==prefix, 'the complete collection context stays above the view tabs'
        assert page.locator('[data-reader=lecture][data-expanded=false]').get_attribute('aria-selected')=='true'
        assert page.locator('[data-reader=lecture][data-expanded=true]').count()==1
        page.locator('.inline-reader').scroll_into_view_if_needed()

    def header_prefix():
        return page.evaluate('''()=>{const result=[];for(const node of document.querySelector('#content').children){if(node.matches('[data-study-toolbar]'))break;result.push([node.tagName,node.textContent.replace(/\\s+/g,' ').trim(),[...node.querySelectorAll('a')].map(a=>a.href)]);}return result;}''')

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
        assert min(a[2:4]+b[2:4])>40 and max(a[4],b[4])<=result['viewport']+2, result
        assert all(overflow=='auto' and overscroll=='contain' for overflow,overscroll in result['scrolls']), result

    # Every collection starts in notes. Explicit visual mode retains its header.
    for edition in ['', 'modern/']:
        for c in lectures:
            route(edition,c['id'])
            assert page.locator('#readerSelect option').count()==len(c['sections'])
            for theme in ['light','dark']:
                page.evaluate('theme=>document.documentElement.dataset.theme=theme',theme)
                geometry()
        print(f'PASS: every collection in {edition or "original"}, explicit notes/visual modes, retained title/context, both themes and left/right panels', flush=True)

        route(edition)
        page.locator('[data-transcript-version]').select_option('d' if edition else 'v23')
        page.locator('#readerSelect').select_option('3')
        page.set_viewport_size({'width':1600,'height':720})
        page.wait_for_timeout(100)
        page.locator('.inline-reader').scroll_into_view_if_needed()
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
        title=page.locator('#content>h1').inner_text();prefix=header_prefix()
        page.evaluate('window.originalTimer=document.querySelector(".timer")')
        page.locator('#timerStart').click()
        page.wait_for_function('document.querySelector("#clock").textContent!=="30:00"')
        page.locator('[data-reader=lecture][data-expanded=true]').click();page.locator('#readerDialog[open] .reader-transcript').wait_for();geometry('#readerDialog')
        assert page.evaluate('document.querySelector(".timer")===window.originalTimer')
        assert page.locator('.timer').count()==1
        assert page.locator('#readerDialog .timer').evaluate('(e)=>getComputedStyle(e).flexWrap')=='nowrap'
        assert page.locator('#readerDialog .timer').evaluate('(e)=>e.getBoundingClientRect().height')<65
        assert not page.locator('#readerDialog .timer .fit-selection,#readerDialog .timer .fit-select-field').count()
        assert page.locator('#content>h1').inner_text()==title
        page.locator('#readerDialog [data-action=closeReader]').click();page.locator('.inline-reader .reader-transcript').wait_for()
        assert page.locator('#readerSelect').input_value()=='4'
        assert page.locator('#content>h1').inner_text()==title and header_prefix()==prefix
        assert page.evaluate('document.querySelector(".topbar .timer")===window.originalTimer')
        assert page.locator('#timerStart').inner_text()=='Pause'
        page.locator('#timerStart').click()
        for width,height in [(1024,800),(390,844)]:
            page.set_viewport_size({'width':width,'height':height});page.wait_for_timeout(100)
            page.locator('.inline-reader').scroll_into_view_if_needed();geometry(stacked=width<=760)
        page.set_viewport_size({'width':1600,'height':900})
        page.locator('[data-action=teachingNotes]').click()
        assert page.locator('.source-section').count()==11
        assert not page.locator('.inline-reader').count()
        assert page.locator('#content>h1').inner_text()==title
        # Expanding directly from notes also closes into visual mode, as PSYC301 does.
        page.locator('[data-reader=lecture][data-expanded=true]').click()
        page.locator('#readerDialog[open]').wait_for()
        assert page.locator('#readerDialog #readerSelect').input_value()=='4'
        page.keyboard.press('Escape');page.locator('.inline-reader .reader-transcript').wait_for()
        assert page.locator('#readerSelect').input_value()=='4'
        page.locator('[data-action=teachingNotes]').click()
        page.reload();page.wait_for_selector('.study-mode-tabs')
        assert not page.locator('.inline-reader').count()
        assert page.locator('[data-action=teachingNotes]').get_attribute('aria-selected')=='true'
        page.locator('[data-reader=lecture][data-expanded=false]').click()
        assert page.locator('#readerSelect').input_value()=='4'
        page.locator('.reader-controls [data-action=recall]').click();assert page.locator('.recall-cover').count()==1
        page.locator('.reader-controls [data-action=recall]').click();assert not page.locator('.recall-cover').count()
        page.locator('[data-start="lecture:lecture11"]').click()
        page.wait_for_function('new URLSearchParams(location.search).get("view")==="practice"')
        assert not page.locator('.inline-reader').count()
        assert page.locator('.timer').count()==1
        print(f'PASS: independent scrolling, retained header/view tabs, inline/fullscreen/notes round trips, one running single-row timer, reveal and quiz entry in {edition or "original"}',flush=True)

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
