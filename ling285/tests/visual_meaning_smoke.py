"""Verify the source-visual teaching edition using the shared reader contracts."""
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
        try:
            with sync_playwright() as p:
                options = {'headless': True, 'args': ['--no-sandbox']}
                executable = shutil.which('chromium') or shutil.which('chromium-browser')
                if executable:
                    options['executable_path'] = executable
                with contextlib.closing(p.chromium.launch(**options)) as browser:
                    run(f'http://127.0.0.1:{server.server_port}', browser,
                        edition_ids=('original-c-v3',), report_name='visual-meaning-validation.json')
        finally:
            server.shutdown()
