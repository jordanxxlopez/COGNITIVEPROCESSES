"""Additional teaching choices retain full text, source visuals and study state."""
import contextlib
import http.server
import json
from pathlib import Path
import shutil
import threading

from playwright.sync_api import sync_playwright
from modern_smoke import KEY, LEGACY, ROOT, QuietHandler
from content_fitting_smoke import DIAGNOSTICS


def run(base, browser, edition_ids=('original-c-v2', 'd-v2', 'notes-v7'), report_name='clear-editions-validation.json'):
    studio = ROOT / 'ling285'
    editions = {key: json.loads((studio / f'modern/transcripts-{key}.json').read_text())
                for key in edition_ids}
    primary_edition = edition_ids[0]
    context = browser.new_context(viewport={'width': 1600, 'height': 1000})
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    checks = 0
    for width in [1600, 390]:
        page.set_viewport_size({'width': width, 'height': 1000 if width > 500 else 844})
        for cid, collection in editions[primary_edition]['collections'].items():
            module = 'module1' if int(cid[7:9]) < 11 else 'module2'
            page.goto(f'{base}/ling285/modern/?view=collection&lecture={cid}&module={module}')
            page.wait_for_selector('.source-section')
            page.wait_for_function('document.querySelectorAll("[data-transcript-version] option:not(:disabled)").length >= 9')
            assert page.title() == 'LING258 · Study Studio'
            assert not page.locator('.inline-reader').count(), 'Opening a collection retains Teaching notes.'
            assert page.locator('[data-transcript-version] option[value="notes-v7"]').evaluate('(option)=>option.disabled') == (module == 'module1')
            assert page.locator('.source-section').count() == len(collection['sections'])
            for key, payload in editions.items():
                if module == 'module1' and key == 'notes-v7':
                    continue
                page.locator('[data-transcript-version]').select_option(key)
                assert page.locator('[data-transcript-version]').input_value() == key
                failures = page.evaluate('''collection => {
                    const failures = [], plain = text => text.replaceAll('**','').replace(/\\s+/g,' ').trim();
                    for(const section of collection.sections) {
                        const node = document.querySelector('[data-section="'+section.id+'"] .teaching');
                        if(!section.teaching.length) continue;
                        if(!node) {failures.push([section.id,'missing teaching']);continue;}
                        for(const block of section.teaching) for(const text of [block.text,...block.children])
                            if(!plain(node.textContent).includes(plain(text))) failures.push([section.id,text.slice(0,80)]);
                        if(JSON.stringify(section.teaching).includes('**') && !node.querySelector('strong'))
                            failures.push([section.id,'missing bold emphasis']);
                    }
                    return failures;
                }''', payload['collections'][cid])
                assert not failures, (cid, key, failures)
                page.locator('.source-section').evaluate_all('(nodes)=>nodes.forEach(node=>node.open=true)')
                for theme in ['light', 'dark']:
                    page.evaluate('theme=>document.documentElement.dataset.theme=theme', theme)
                    page.wait_for_timeout(30)
                    result = page.evaluate(DIAGNOSTICS)
                    assert not result['overflow'] and not result['errors'], (cid, key, width, theme, result)
                    checks += 1
            print(f'PASS: complete new teaching, emphasis and fitting in {cid} at {width}px', flush=True)

    page.set_viewport_size({'width': 1600, 'height': 900})
    page.goto(f'{base}/ling285/modern/?view=collection&lecture=lecture11&module=module2')
    page.wait_for_selector('.source-section')
    page.locator('[data-transcript-version]').select_option(primary_edition)
    section = page.locator('[data-section="lecture11-p004"]')
    section.evaluate('(node)=>node.open=true')
    section.locator('[data-note]').fill('Keep my explanation of the two modes.')
    section.locator('[data-read]').check()
    title = page.locator('#content>h1').inner_text()
    page.locator('[data-reader="lecture"][data-expanded="false"]').click()
    page.wait_for_selector('.inline-reader')
    page.locator('#readerSelect').select_option('3')
    assert page.locator('#content>h1').inner_text() == title
    for key in editions:
        page.locator('[data-transcript-version]').select_option(key)
        assert page.locator('#readerSelect').input_value() == '3'
        assert page.locator('.reader-transcript .teaching').inner_text().strip()
        assert page.locator('.reader-transcript [data-note]').input_value() == 'Keep my explanation of the two modes.'
        assert page.locator('.reader-transcript [data-read]').is_checked()
    for theme in ['light', 'dark']:
        page.evaluate('theme=>document.documentElement.dataset.theme=theme', theme)
        rects = page.locator('.inline-reader').evaluate('''node=>{
            const text=node.querySelector('.reader-transcript').getBoundingClientRect(),
                  visual=node.querySelector('.reader-visual').getBoundingClientRect();
            return {text:[text.x,text.y,text.height],visual:[visual.x,visual.y,visual.height]};
        }''')
        assert rects['text'][0] < rects['visual'][0] and abs(rects['text'][1]-rects['visual'][1]) < 2, rects
    page.locator('[data-reader="lecture"][data-expanded="true"]').click()
    page.locator('#readerDialog[open]').wait_for()
    assert page.locator('#readerDialog #readerSelect').input_value() == '3'
    for key in editions:
        page.locator('#readerDialog [data-transcript-version]').select_option(key)
        assert page.locator('#readerDialog #readerSelect').input_value() == '3'
        assert page.locator('#readerDialog .reader-transcript .teaching').inner_text().strip()
    page.locator('[data-action="closeReader"]').click()
    assert page.locator('.inline-reader #readerSelect').input_value() == '3'
    page.locator('[data-action="teachingNotes"]').click()
    saved_edition = 'd-v2' if 'd-v2' in editions else primary_edition
    page.locator('[data-transcript-version]').select_option(saved_edition)
    page.reload()
    page.wait_for_selector('.source-section')
    assert page.locator('[data-transcript-version]').input_value() == saved_edition
    for key in [KEY, LEGACY]:
        saved = page.evaluate('key=>JSON.parse(localStorage.getItem(key))', key)
        assert saved['notes']['lecture11-p004'] == 'Keep my explanation of the two modes.'
        assert saved['read']['lecture11-p004']
    assert not errors, errors
    report = dict(editions=list(edition_ids), collectionEditionViewportThemeChecks=checks, completeTeaching=True,
                  boldEmphasis=True, preservedPageIds=True, notesAndReadMarksShared=True,
                  readerSwitching=True, originalEditions='Frozen hashes verified separately.')
    (studio / 'modern' / report_name).write_text(json.dumps(report, indent=2) + '\n')
    context.close()
    print(f'PASS: {checks} fitting checks; inline and expanded choices, shared notes/read marks and reload', flush=True)


if __name__ == '__main__':
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), QuietHandler) as server:
        threading.Thread(target=server.serve_forever, daemon=True).start()
        try:
            with sync_playwright() as p:
                options = {'headless': True, 'args': ['--no-sandbox']}
                executable = shutil.which('chromium') or shutil.which('chromium-browser')
                if executable:
                    options['executable_path'] = executable
                with contextlib.closing(p.chromium.launch(**options)) as browser:
                    run(f'http://127.0.0.1:{server.server_port}', browser)
        finally:
            server.shutdown()
