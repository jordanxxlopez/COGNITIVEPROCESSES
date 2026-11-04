"""Package manually authored slide-specific prose. Never generates teaching text from topic templates."""
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'data.js').read_text().removeprefix('const DATA=').rstrip(';\n'))
entries = {}
modules = []
paragraphs_seen = set()
for module in DATA['modules']:
    mid = module['id']
    source = ROOT / 'authoring' / 'version-c' / f'session{mid}.md'
    chunks = re.split(r'^## (\d+) \| (.+)\n', source.read_text(), flags=re.M)
    assert not chunks[0].strip(), source
    authored = {}
    for i in range(1, len(chunks), 3):
        page, title, body = chunks[i:i+3]
        page = int(page)
        paragraphs = [p.strip() for p in re.split(r'\n\s*\n', body.strip()) if p.strip()]
        assert len(paragraphs) in (3, 4), (mid, page, len(paragraphs))
        assert len(' '.join(paragraphs).split()) >= 40, (mid, page, 'too little teaching text')
        assert page not in authored, (mid, page, 'duplicate page')
        for paragraph in paragraphs:
            assert paragraph not in paragraphs_seen, (mid, page, 'reused paragraph')
            paragraphs_seen.add(paragraph)
        assert (ROOT / 'assets' / f'session{mid}' / f'{page}.webp').exists()
        authored[page] = {'title': title, 'paragraphs': paragraphs}
    assert sorted(authored) == list(range(1, module['count'] + 1)), (mid, 'missing/extra pages')
    mapped = [p for section in module['sections'] for p in section['pages']]
    assert sorted(mapped) == sorted(authored)
    for page in sorted(authored):
        entries[f'{mid}:{page}'] = authored[page]
    modules.append({'session': mid, 'pages': module['count'],
                    'source': f"sources/{module['source']}.pdf",
                    'sha256': hashlib.sha256((ROOT / 'sources' / f"{module['source']}.pdf").read_bytes()).hexdigest(),
                    'authoring': f'authoring/version-c/session{mid}.md'})
pack = {'version': 'C', 'slides': entries}
(ROOT / 'version-c-data.js').write_text('const VERSION_C=' + json.dumps(pack, ensure_ascii=False, separators=(',', ':')) + ';\n')
report = {'version': 'C', 'totalSlides': len(entries), 'paragraphs': len(paragraphs_seen),
          'authoring': 'Each script is authored for its source PDF page; no topic-template fallback.',
          'preservation': 'New lecture prose is prepended; the Version B lesson renderer remains the unchanged body below it.',
          'modules': modules}
(ROOT / 'version-c-coverage.json').write_text(json.dumps(report, indent=2) + '\n')
print(f"Version C: {len(entries)} individually authored scripts, {len(paragraphs_seen)} unique paragraphs across {len(modules)} collections.")
