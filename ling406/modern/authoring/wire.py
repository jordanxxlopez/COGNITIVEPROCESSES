"""Adds the modern-versions tags to the three LING406 pages. Safe to run again.
Run it after any rebuild of module1/ or module3/ (their builders rewrite index.html)."""
import re, pathlib
L = pathlib.Path(__file__).resolve().parents[2]
V = 'modern-1'
for page, prefix in (('index.html', ''), ('module1/index.html', '../'), ('module3/index.html', '../')):
    f = L / page
    html = re.sub(r'<link rel="stylesheet" href="[^"]*modern-versions\.css[^"]*">', '', f.read_text())
    html = re.sub(r'<script src="[^"]*modern/(?:packs/manifest|modern-versions)\.js[^"]*"></script>', '', html)
    css = f'<link rel="stylesheet" href="{prefix}modern/modern-versions.css?v={V}">'
    js = f'<script src="{prefix}modern/packs/manifest.js?v={V}"></script><script src="{prefix}modern/modern-versions.js?v={V}"></script>'
    assert '</head>' in html and len(re.findall(r'<script src="app\.js[^"]*"></script>', html)) == 1, page
    html = html.replace('</head>', css + '</head>', 1)
    html = re.sub(r'(<script src="app\.js[^"]*"></script>)', lambda m: m[1] + js, html, count=1)
    f.write_text(html)
    print('wired', page)
