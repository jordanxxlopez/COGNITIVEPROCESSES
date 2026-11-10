"""Browser contracts for the isolated workspace. Requires Python Playwright and Chromium."""
import collections
import contextlib
import http.server
import json
from pathlib import Path
import shutil
import threading

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
KEY = 'ling285-modern-studio-v1'
LEGACY = 'ling285-study-studio-v1'


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *args):
        pass


def run(base, browser):
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, accept_downloads=True)
    page = context.new_page()
    errors, failed = [], []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('response', lambda response: failed.append(f'{response.status} {response.url}') if response.status >= 400 else None)

    def state():
        return page.evaluate('(key) => JSON.parse(localStorage.getItem(key))', KEY)

    def route(view, **params):
        query = '&'.join(f'{k}={v}' for k, v in {'view': view, 'module': 'module2', **params}.items())
        page.goto(f'{base}/ling285/modern/?{query}')
        page.wait_for_function("document.querySelector('#content h1') && !document.querySelector('#content .loading')")

    page.goto(base + '/ling285/')
    page.locator('#modernWorkspaceEntry').wait_for()
    page.wait_for_function("document.querySelector('#content h1') && !document.querySelector('#content .loading')")
    old_question = json.loads((ROOT/'ling285/data.json').read_text())['questions'][0]['id']
    page.evaluate('([key,id]) => localStorage.setItem(key, JSON.stringify({notes:{"lecture11-p002":"Existing personal note"},read:{"lecture11-p002":true},drafts:{[id]:"Original response"}}))', [LEGACY,old_question])
    page.locator('#modernWorkspaceEntry').click()
    page.wait_for_selector('.modern-guide-point')
    assert page.title() == 'LING258 · Study Studio'
    assert page.locator('h1').inner_text() == 'What to know by the end'
    ready = page.locator('[data-ready]').first
    ready.check()
    ready_id = ready.get_attribute('data-ready')
    page.reload()
    page.locator(f'[data-ready="{ready_id}"]').wait_for()
    assert page.locator(f'[data-ready="{ready_id}"]').is_checked()
    assert state()['notes']['lecture11-p002'] == 'Existing personal note'

    # Reading sections keep Q&A-style disclosures without quiz wording controls.
    for view, selector in [('ask','.modern-answer'),('qa','.modern-qa'),('cards','.modern-experiment'),('contrasts','.modern-contrast'),('hard','.modern-hard'),('review','.modern-review'),('core','.modern-core'),('experiments','.modern-connection'),('codeblocks','.modern-code'),('figures','.modern-figure')]:
        route(view)
        page.locator(selector).first.wait_for()
        assert page.locator('[data-modern-wording]').count() == 0, view
        details = page.locator('#content details').first
        if details.count():
            details.evaluate('(el)=>el.open=true')
    route('qa')
    page.locator('[data-modern-qa="qaLecture"]').select_option('lecture18')
    page.locator('.modern-qa > summary').first.click()
    assert page.locator('.modern-qa[open]').count() == 1
    page.locator('[data-layout-field="qaMode"]').select_option('connections')
    page.locator('[data-modern-qa="qaLecture"]').select_option('all')
    assert page.locator('.modern-qa').count() > 0

    route('collection', lecture='lecture11')
    assert page.locator('.source-section').count() == 11
    styles = page.locator('[data-transcript-version]')
    assert styles.locator('option').count() == 11
    for edition in ['professor','b','c','follow','v20','original-c','d','original-c-v2','d-v2','notes-v7','original-c-v3']:
        styles.select_option(edition)
        assert styles.input_value() == edition
        assert page.locator('.source-section').count() == 11
    section = page.locator('[data-section="lecture11-p002"]')
    section.evaluate('(el)=>el.open=true')
    note = section.locator('[data-note]')
    note.fill('A note edited in the modern workspace.')
    page.wait_for_function('(key)=>JSON.parse(localStorage.getItem(key)).notes["lecture11-p002"] === "A note edited in the modern workspace."', arg=LEGACY)
    legacy = page.evaluate('(key)=>JSON.parse(localStorage.getItem(key))', LEGACY)
    assert legacy['drafts'][old_question] == 'Original response'
    page.locator('[data-reader="lecture"][data-expanded="true"]').click()
    page.locator('#readerDialog[open]').wait_for()
    page.locator('[data-action="closeReader"]').click()
    print('PASS: reading sections, editions and shared notes', flush=True)

    def assert_set(size, owner=None):
        saved = state()
        session = saved['session']
        assert len(session['ids']) == size
        assert len(set(session['ids'])) == size
        bank = page.evaluate('window.LING285_MODERN.questions')
        by_id = {q['id']: q for q in bank}
        selected = [by_id[i] for i in session['ids']]
        assert collections.Counter(q['type'] for q in selected) == {'mcq': size//2, 'written': size//2}
        assert len({q['wordings']['simple'] for q in selected}) == size
        if owner:
            assert all(q['lectureId'] == owner for q in selected)
        else:
            assert sorted(collections.Counter(q['lectureId'] for q in selected).values()) == [12]*4+[13]*4
        return selected

    route('test')
    page.locator('[data-start="mixed"]').click()
    selected = assert_set(100)
    position = next(i for i,q in enumerate(selected) if q['type'] == 'mcq')
    page.get_by_text('Question navigator', exact=True).click()
    page.locator(f'.number-nav [data-question-index="{position}"]').click()
    page.locator('[data-mcq-option="correct"]').check()
    page.locator('[data-check-question]').click()
    previous = state()
    for wording in ['college','simple','original']:
        page.locator('[data-modern-wording]').select_option(wording)
        current = state()
        assert current['session']['ids'] == previous['session']['ids']
        assert current['mcqSelections'] == previous['mcqSelections']
        assert current['mcqSubmitted'] == previous['mcqSubmitted']
        assert current['optionOrders'] == previous['optionOrders']
    for n in range(11,19):
        route('quizzes')
        page.locator(f'[data-start="lecture:lecture{n}"]').click()
        assert_set(50, f'lecture{n}')
    print('PASS: full test, wording state and all lecture quizzes', flush=True)

    route('writing')
    assert page.locator('.modern-writing').count() == 25
    assert page.locator('[data-modern-wording]').count() == 0
    card = page.locator('.modern-writing').first
    question_id = card.get_attribute('id')
    card.locator('.modern-response > summary').click()
    card.locator('textarea').fill('My saved conceptual explanation.')
    card.locator('.modern-answer > summary').click()
    card.locator('[data-writing-rating="review"]').click()
    page.reload()
    card = page.locator(f'#{question_id}')
    card.wait_for()
    assert card.locator('textarea').input_value() == 'My saved conceptual explanation.'
    assert card.locator('.modern-answer').get_attribute('open') is not None
    route('missed')
    page.locator(f'.modern-queue:has([data-single-question="{question_id}"]) > summary').click()
    page.locator(f'[data-single-question="{question_id}"]').click()
    assert state()['session']['ids'] == [question_id]
    route('sources')
    with page.expect_download() as download:
        page.locator('[data-action="export"]').click()
    backup = json.loads(Path(download.value.path()).read_text())
    assert backup['workspace'] == 'modern'
    assert backup['state']['drafts'][question_id] == 'My saved conceptual explanation.'

    # Exercise every route in a narrow viewport and check page-level overflow.
    page.set_viewport_size({'width':390,'height':844})
    for view in ['guide','ask','qa','cards','contrasts','hard','review','core','experiments','stimuli','combined','codeblocks','figures','test','writing','quizzes','missed','sources','meadows']:
        route(view)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 2'), view
    route('collection', lecture='lecture18')
    page.locator('[data-transcript-version]').select_option('v20')
    page.locator('[data-reader="lecture"][data-expanded="false"]').click()
    assert page.locator('#readerSelect option').count() == 8
    assert not errors, errors
    assert not failed, failed
    context.close()
    print('PASS: original entry, section routes, 11 editions, shared notes, 100-question test, 8 quizzes, wording state, writing, backup and mobile layout')


if __name__ == '__main__':
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), QuietHandler) as server:
        threading.Thread(target=server.serve_forever, daemon=True).start()
        try:
            with sync_playwright() as playwright:
                executable = shutil.which('chromium') or shutil.which('chromium-browser')
                options = {'headless':True, 'args':['--no-sandbox']}
                if executable:
                    options['executable_path'] = executable
                with contextlib.closing(playwright.chromium.launch(**options)) as browser:
                    run(f'http://127.0.0.1:{server.server_port}', browser)
        finally:
            server.shutdown()
