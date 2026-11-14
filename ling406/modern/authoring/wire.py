"""Adds the modern-versions tags and the study-layer tags to the three LING406 pages. Safe to run again.
Run it after any rebuild of module1/ or module3/ (their builders rewrite index.html)."""
import re, pathlib
L = pathlib.Path(__file__).resolve().parents[2]
V = 'modern-2'
S = 'study-1'  # study layer cache version (ling406/study/)
for page, prefix, mod in (('index.html', '', 'm2'), ('module1/index.html', '../', 'm1'), ('module3/index.html', '../', 'm3')):
    f = L / page
    html = re.sub(r'<link rel="stylesheet" href="[^"]*(?:modern-versions|study/study)\.css[^"]*">', '', f.read_text())
    html = re.sub(r'<script src="[^"]*modern/(?:packs/manifest|modern-versions)\.js[^"]*"></script>', '', html)
    html = re.sub(r'<script src="[^"]*study/(?:data/m\d|study)\.js[^"]*"></script>', '', html)
    css = f'<link rel="stylesheet" href="{prefix}modern/modern-versions.css?v={V}">'
    js = f'<script src="{prefix}modern/packs/manifest.js?v={V}"></script><script src="{prefix}modern/modern-versions.js?v={V}"></script>'
    if (L / 'study' / 'data' / f'{mod}.js').exists():
        css += f'<link rel="stylesheet" href="{prefix}study/study.css?v={S}">'
        js += f'<script src="{prefix}study/data/{mod}.js?v={S}"></script><script src="{prefix}study/study.js?v={S}"></script>'
    # BME423 has its own site since 2026-11-14; the module builders may still write the old relative link.
    html = html.replace('"../bme423/"', '"https://jordanxxlopez.github.io/BME423/bme423/"').replace('"../../bme423/"', '"https://jordanxxlopez.github.io/BME423/bme423/"')
    html = html.replace('src="../../course-switcher.js"', 'src="../../course-switcher.js?v=course-switcher-2"')
    assert '</head>' in html and len(re.findall(r'<script src="app\.js[^"]*"></script>', html)) == 1, page
    html = html.replace('</head>', css + '</head>', 1)
    html = re.sub(r'(<script src="app\.js[^"]*"></script>)', lambda m: m[1] + js, html, count=1)
    f.write_text(html)
    print('wired', page)
