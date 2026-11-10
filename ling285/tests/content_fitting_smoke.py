"""Content geometry and media controls across both LING285 studio editions."""
import contextlib
import http.server
import threading
import shutil
from playwright.sync_api import sync_playwright
from modern_smoke import QuietHandler

MODERN=['guide','ask','qa','cards','contrasts','hard','review','core','experiments','stimuli','combined','codeblocks','figures','test','writing','quizzes','missed','sources']
ORIGINAL=['guide','review','core','experiments','stimuli','combined','codeblocks','figures','test','writing','quizzes','missed','sources']
DIAGNOSTICS=r"""() => {
 const errors=[];
 for(const element of document.querySelectorAll('#content img,#content video,#content figcaption')){
  const r=element.getBoundingClientRect();if(!r.width || !r.height)continue;
  const figure=element.closest('figure') || element.closest('.stimulus-card') || element.parentElement;
  const box=figure.getBoundingClientRect();
  if(r.left<box.left-2 || r.right>box.right+2)errors.push(['horizontal',element.tagName,r.width,box.width]);
  if(r.bottom>box.bottom+2 && !figure.classList.contains('reader-visual'))errors.push(['vertical',element.tagName,r.bottom,box.bottom]);
  const width=element.naturalWidth || element.videoWidth,height=element.naturalHeight || element.videoHeight;
  if(width && height && !document.fullscreenElement && Math.abs((r.width/r.height)/(width/height)-1)>.025)errors.push(['aspect',element.tagName,r.width/r.height,width/height]);
 }
 for(const panel of document.querySelectorAll('#content .aid-visual')){
  const r=panel.getBoundingClientRect();if(!r.width || !r.height)continue;
  if(panel.scrollHeight>panel.clientHeight+2)errors.push(['source-panel-height',panel.scrollHeight,panel.clientHeight]);
 }
 for(const player of document.querySelectorAll('.fit-player')){
  const video=player.querySelector('video'),controls=player.querySelector('.fit-player-controls'),r=video.getBoundingClientRect(),c=controls.getBoundingClientRect();
  if(video.controls)errors.push(['overlaid-native-controls']);
  if(r.width && r.height && c.top<r.bottom-1)errors.push(['controls-overlap',c.top,r.bottom]);
 }
 return {overflow:document.documentElement.scrollWidth>innerWidth+2,errors};
}"""


def run(base,browser):
    context=browser.new_context(viewport={'width':1600,'height':880},device_scale_factor=1.25)
    page=context.new_page();errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))

    def route(view,module='module2',edition='modern/',lecture=None):
        url=f'{base}/ling285/{edition}?view={view}&module={module}'
        if lecture:url+='&lecture='+lecture
        page.goto(url)
        page.wait_for_function("document.querySelector('#content h1') && !document.querySelector('#content .loading')")
        page.wait_for_function("document.documentElement.hasAttribute('data-ling-fitting')")
        page.evaluate('''()=>{
         for(const d of [...document.querySelectorAll('#content .modern-core,#content .modern-figure,#content .source-section')].slice(0,4))d.open=true;
        }''')
        page.wait_for_timeout(40)

    def check(label):
        result=page.evaluate(DIAGNOSTICS)
        assert not result['overflow'],(label,'page overflow')
        assert not result['errors'],(label,result['errors'][:6])

    checked=0
    for width in [2000,1600,1024,390]:
        page.set_viewport_size({'width':width,'height':880 if width>650 else 844})
        for edition,views in [('modern/',MODERN),('',ORIGINAL)]:
            for module in ['module2','module1']:
                for view in views:
                    route(view,module,edition)
                    for theme in ['light','dark']:
                        page.evaluate('theme=>document.documentElement.dataset.theme=theme',theme)
                        check((edition or 'original',module,view,width,theme));checked+=1
        print(f'PASS: fitting across both studio editions and modules at {width}px in both themes',flush=True)
    # Every numbered collection uses the same source identities and fitting.
    collections=page.evaluate('window.LING285_MODERN?.pageConcepts')
    if not collections:
        route('guide');collections=page.evaluate('window.LING285_MODERN.pageConcepts')
    for width in [1600,390]:
        page.set_viewport_size({'width':width,'height':880})
        for collection in collections:
            route('collection',module='module1' if int(collection[7:9])<11 else 'module2',lecture=collection)
            check(('collection',collection,width))
    # Reproduce the flush hard-topic text and cropped final caption from the screenshots.
    page.set_viewport_size({'width':1600,'height':880});route('hard')
    card=page.locator('.modern-hard').first
    assert card.locator('.modern-topic-body').evaluate('(e)=>parseFloat(getComputedStyle(e).paddingLeft)')>=18
    card.locator('img').evaluate_all('(els)=>els.forEach(e=>e.loading="eager")')
    page.wait_for_function("[...document.querySelector('.modern-hard').querySelectorAll('img')].every(e=>e.complete && e.naturalWidth>0)")
    check('loaded hard-topic source images')
    assert card.locator('.aid-visual').evaluate('(e)=>e.clientHeight>=e.scrollHeight-1')
    # Real source video playback, proportional scaling, seeking and controls outside the frame.
    route('core');card=page.locator('.modern-core').first
    player=card.locator('.fit-player').first;player.scroll_into_view_if_needed();video=player.locator('video');video.evaluate('(e)=>e.muted=true')
    player.locator('[data-fit-control=play]').click()
    page.wait_for_function('document.querySelector(".modern-core video").currentTime>.1')
    player.locator('[data-fit-control=play]').click()
    player.locator('[data-fit-control=seek]').fill('5')
    player.locator('[data-fit-control=speed]').select_option('1.5')
    assert video.evaluate('(e)=>e.playbackRate')==1.5
    assert video.evaluate('(e)=>Math.abs(e.currentTime-5)<.3')
    check('loaded source video with external controls')
    assert card.locator('.notes-box').evaluate('(e)=>e.getBoundingClientRect().width')>card.locator('.modern-topic-body').evaluate('(e)=>e.getBoundingClientRect().width')*.9
    note=card.locator('[data-note]');note.fill('The saved note survives content fitting.')
    page.reload();page.locator('.modern-core').first.evaluate('(e)=>e.open=true')
    assert page.locator('.modern-core [data-note]').first.input_value()=='The saved note survives content fitting.'
    # Readers and the following-slide choice retain their controls and full source.
    route('combined');page.locator('[data-reader=combined][data-expanded=true]').click();page.locator('#readerDialog[open]').wait_for()
    page.locator('#readerSelect').select_option('1')
    page.locator('#readerDialog [data-transcript-version]').select_option('follow')
    page.wait_for_timeout(50)
    assert page.locator('#readerDialog [data-action=readerNext]').is_enabled()
    page.locator('[data-action=closeReader]').click()
    assert not errors,errors
    context.close()
    print(f'PASS: {checked} route/theme/viewport combinations, every collection, loaded-media aspect ratios, complete captions, playback, saved notes and reader controls')


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
