"""Recompute the inherited mathematics and verify V8's unchanged worked content."""
from pathlib import Path
import hashlib, json, re, subprocess, sys

ROOT = Path(__file__).resolve().parents[1]
# This verifier only reads the V7 pack and earlier hashes; it never exports PDFs.
subprocess.run([sys.executable, str(ROOT/'tests/verify_exam_sheet_v7.py')], check=True)
def pack(v):
    return json.loads((ROOT/f'exam-sheet-v{v}-data.js').read_text().split('=',1)[1].rstrip(';\n'))
old, new = pack(7), pack(8)
assert new['version'] == 8 and new['sheets'] == old['sheets']
assert len(new['blocks']) == 39
patterns = [r'\\\[(.*?)\\\]', r'<table>.*?</table>', r'<pre.*?</pre>', r'<h4>.*?</h4>', r'<img[^>]+>']
for key, block in new['blocks'].items():
    previous = old['blocks'][key]
    for pattern in patterns:
        assert re.findall(pattern, block['html'], re.S) == [x.replace('v7-', 'v8-') for x in re.findall(pattern, previous['html'], re.S)], (key, pattern)
    assert block['html'].count('class="v8-step"') == previous['html'].count('class="v7-step"'), key
    assert '→' in block['title'] and '<b>TRIGGER</b>' in block['html'] and '<b>TRAP' in block['html'], key
    for field in ['sources', 'topics', 'page', 'column']:
        assert block[field] == previous[field], (key, field)
for key in ['one-t','pooled-t','anova','bonferroni','holm','z-yates','chi2','large-chi','gof']:
    assert 'In words:' in new['blocks'][key]['html'], key
    assert '<b>TABLE' in new['blocks'][key]['html'], key
for key in ['one-t','pooled-t','anova','bonferroni-pairs','holm','z-yates','chi2','large-chi','gof','risk','odds']:
    assert '<b>WRITE' in new['blocks'][key]['html'], key
assert sum(len(re.findall(patterns[0], b['html'], re.S)) for b in new['blocks'].values()) == 382
preserved = json.loads((ROOT/'exam-sheet-v8-preserved.json').read_text())
for filename, digest in preserved.items():
    assert hashlib.sha256((ROOT.parent/filename).read_bytes()).hexdigest() == digest, filename
coverage = json.loads((ROOT/'exam-sheet-v8-coverage.json').read_text())
for filename, digest in coverage['inputs'].items():
    assert hashlib.sha256((ROOT/filename).read_bytes()).hexdigest() == digest, filename
for filename, digest in coverage['sourceHashes'].items():
    assert hashlib.sha256((ROOT/'sources'/filename).read_bytes()).hexdigest() == digest, filename
print(f'PASS: V8 retains all 382 display equations, tables, printed outputs, graphs, worked operations and source scope; 39 recognition headings/TRIGGER/TRAP cues; {len(preserved)} earlier files unchanged.')
