"""Build psyc301-module2.html, the friend copy of the Module II studio (Versions 20 and 22 only).

It copies share.html exactly and changes three things: its own storage key, the friend
script in place of module-ii-share.js, and the page title. Rerun after share.html changes.
"""
from pathlib import Path

root = Path(__file__).resolve().parents[3]
html = (root / 'share.html').read_text(encoding='utf-8')
swaps = [
    ("const KEY=new URLSearchParams(location.search).get('module')==='ii'?'psyc301-module-ii-share-v1':'psyc301-studio-v1';",
     "const KEY='psyc301-module-ii-friend-v20-v22-v1';"),
    ('<script src="module-ii-share.js?v=2"></script>', '<script src="module-ii-friend.js?v=1"></script>'),
    ('<title>PSYC301 · Study Studio</title>', '<title>PSYC301 · Module II · Study Studio</title>'),
]
for old, new in swaps:
    if html.count(old) != 1:
        raise SystemExit(f'expected exactly one match for: {old[:70]}')
    html = html.replace(old, new)
(root / 'psyc301-module2.html').write_text(html, encoding='utf-8')
print('wrote psyc301-module2.html')
