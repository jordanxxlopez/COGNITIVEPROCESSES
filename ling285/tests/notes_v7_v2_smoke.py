"""The adapted PDF edition preserves the existing reader and study state."""
import contextlib
import http.server
import shutil
import threading
from playwright.sync_api import sync_playwright
from clear_editions_smoke import run
from modern_smoke import QuietHandler


if __name__ == '__main__':
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), QuietHandler) as server:
        threading.Thread(target=server.serve_forever, daemon=True).start()
        base = f'http://127.0.0.1:{server.server_port}'
        try:
            with sync_playwright() as p:
                options = {'headless': True, 'args': ['--no-sandbox']}
                executable = shutil.which('chromium') or shutil.which('chromium-browser')
                if executable:
                    options['executable_path'] = executable
                with contextlib.closing(p.chromium.launch(**options)) as browser:
                    run(base, browser, edition_ids=('notes-v7-v2','notes-v7'), report_name='notes-v7-v2-validation.json')
                    context = browser.new_context()
                    page = context.new_page()
                    page.goto(base + '/ling285/modern/?view=collection&module=module1&lecture=lecture01')
                    page.wait_for_selector('.source-section')
                    for edition in ['notes-v7','notes-v7-v2']:
                        assert page.locator(f'option[value="{edition}"]').evaluate('(option)=>option.disabled')
                    context.close()
                    print('PASS: PDF editions stay scoped to their supplied Module II material', flush=True)
        finally:
            server.shutdown()
