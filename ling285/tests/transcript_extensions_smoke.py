"""Legacy C and additive D render fully and share existing study state."""
import contextlib
import http.server
import json
from pathlib import Path
import shutil
import threading

from playwright.sync_api import sync_playwright
from modern_smoke import KEY, LEGACY, ROOT, QuietHandler
from content_fitting_smoke import DIAGNOSTICS


def run(base, browser):
    original = json.loads((ROOT/'ling285/transcripts-v22.json').read_text())
    d = json.loads((ROOT/'ling285/modern/transcripts-d.json').read_text())
    context = browser.new_context(viewport={'width': 2000, 'height': 1000}, device_scale_factor=1.25)
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    checked = 0
    for width in [2000, 390]:
        page.set_viewport_size({'width': width, 'height': 1000 if width > 500 else 844})
        for cid, collection in original['collections'].items():
            module = 'module1' if int(cid[7:9]) < 11 else 'module2'
            page.goto(f'{base}/ling285/modern/?view=collection&lecture={cid}&module={module}')
            page.locator('.inline-reader [data-action="closeReader"]').click()
            page.wait_for_function('document.querySelectorAll("[data-transcript-version] option:not(:disabled)").length === 7')
            for edition, payload in [('original-c', original), ('d', d)]:
                page.locator('[data-transcript-version]').select_option(edition)
                assert page.locator('[data-transcript-version]').input_value() == edition
                assert page.locator('body').evaluate('(e)=>e.classList.contains("follow-slides")')
                assert page.locator('.source-section').count() == len(collection['sections'])
                # Browser-rendered teaching must contain every full parent and
                # child, including content well beyond the initial viewport.
                failures = page.evaluate('''collection => {
                    const failures = [], plain = t => t.replaceAll('**','').replace(/\\s+/g,' ').trim();
                    for(const section of collection.sections) {
                        const node = document.querySelector('[data-section="'+section.id+'"] .teaching');
                        if(!section.teaching.length) continue;
                        if(!node) { failures.push([section.id,'missing teaching']); continue; }
                        const rendered = plain(node.textContent);
                        for(const block of section.teaching) for(const text of [block.text,...block.children]) {
                            if(!rendered.includes(plain(text))) failures.push([section.id,text.slice(0,70)]);
                        }
                    }
                    return failures;
                }''', payload['collections'][cid])
                assert not failures, (cid, edition, failures)
                page.locator('.source-section').evaluate_all('(els)=>els.forEach(e=>e.open=true)')
                page.wait_for_timeout(40)
                for theme in ['light', 'dark']:
                    page.evaluate('theme=>document.documentElement.dataset.theme=theme', theme)
                    result = page.evaluate(DIAGNOSTICS)
                    assert not result['overflow'] and not result['errors'], (cid, edition, width, theme, result)
                    checked += 1
            print(f'PASS: {cid}, complete Original C and D at {width}px', flush=True)

    # Existing note/read identities are shared across all choices and both studios.
    page.set_viewport_size({'width': 1600, 'height': 1000})
    page.goto(f'{base}/ling285/modern/?view=collection&lecture=lecture15&module=module2')
    page.locator('.inline-reader [data-action="closeReader"]').click()
    selector = page.locator('[data-transcript-version]')
    selector.select_option('original-c')
    section = page.locator('[data-section="lecture15-p008"]')
    section.evaluate('(e)=>e.open=true')
    section.locator('[data-note]').fill('My existing note stays with this source page.')
    section.locator('[data-read]').check()
    selector.select_option('d')
    assert section.locator('[data-note]').input_value() == 'My existing note stays with this source page.'
    assert section.locator('[data-read]').is_checked()
    assert section.locator('.teaching').inner_text().count('The difficult early-weight problem') == 1
    for key in [KEY, LEGACY]:
        state = page.evaluate('key=>JSON.parse(localStorage.getItem(key))', key)
        assert state['notes']['lecture15-p008'] == 'My existing note stays with this source page.'
        assert state['read']['lecture15-p008']
    page.reload()
    page.wait_for_selector('.reader-transcript')
    assert selector.input_value() == 'd'
    page.locator('[data-action="expandReader"]').click()
    page.locator('#readerDialog[open]').wait_for()
    page.locator('#readerSelect').select_option('7')
    for edition, text in [('original-c', 'Why the weights are changed from the end backward'),
                          ('d', 'The difficult early-weight problem')]:
        page.locator('#readerDialog [data-transcript-version]').select_option(edition)
        assert text in page.locator('#readerDialog .teaching').inner_text()
        assert page.locator('#readerSelect').input_value() == '7'
        assert page.locator('#readerDialog [data-action="readerNext"]').is_enabled()
    page.locator('[data-action="closeReader"]').click()
    page.locator('.inline-reader [data-action="closeReader"]').click()
    # The previous C is still available unchanged after using both additions.
    selector.select_option('c')
    assert 'The difficult early-weight problem' not in section.inner_text()
    assert section.locator('[data-note]').input_value() == 'My existing note stays with this source page.'
    assert not errors, errors
    context.close()
    print(f'PASS: {checked} collection/edition/viewport/theme checks, full teaching text, following slides, saved notes/read marks, reload and reader switching', flush=True)


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
