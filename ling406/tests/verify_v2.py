"""Check additive V2 coverage, references, source-linked examples and preservation."""
from pathlib import Path
import hashlib
import json
import re
import fitz

ROOT = Path(__file__).resolve().parents[1]

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def js_data(name, prefix):
    return json.loads((ROOT/name).read_text().removeprefix(prefix).rstrip(';\n'))

D = js_data('data.js', 'window.LING406 = ')
V = js_data('transcripts-v2-data.js', 'window.LING406_TRANSCRIPTS_V2 = ')
C = json.loads((ROOT/'version2/coverage.json').read_text())
canonical = {
    'data.js': 'd03b3652a44d37968665b3730fc06fc96ffff6c47d1bdf1f5735bdf86a8cd30f',
    'teaching-notes.json': 'd0a2417fdb653f90800686ecbd2c6d2e5b3fff41fc3de251d22ef83a99f57646',
    'questions.json': '66cf0fd42ac1be2b75d98ed3a47b4bb928e852befa5a8ebbf97df5f695615e24',
    'quiz-engine.js': 'e2916a4d7ac6d910dac4574b8f18df0227bf5dd59d07d3b0c021b7e9aa479dda',
    'source-manifest.json': '0ffbdd36081264d3504a037d32274273029edebe947ffe27e8cd963f19614fca',
}
for name, digest in canonical.items():
    assert sha(ROOT/name) == digest, name
assert C['preservedV1SHA256'] == canonical['teaching-notes.json']
assert set(V['scripts']) == {s['id'] for s in D['sections']} == set(C['scripts'])
assert len(V['scripts']) == 229
assert len({tuple(v) for v in V['scripts'].values()}) == 229
total = 0
for s in D['sections']:
    sid = s['id']
    pars = V['scripts'][sid]
    assert 5 <= len(pars) <= 6, sid
    assert len(set(pars)) == len(pars), sid
    assert all(len(p.split()) >= 12 for p in pars), sid
    count = len(' '.join(pars).split())
    assert count > len(' '.join(s['paragraphs']).split())*1.5, sid
    assert count == C['scripts'][sid]['words'], sid
    assert len(pars) == C['scripts'][sid]['paragraphs'], sid
    assert s['page'] == C['scripts'][sid]['page'], sid
    assert all(p.count('**') % 2 == 0 for p in pars), sid
    assert not any(re.search(r'\b(this slide|the slide|limitations paragraph)\b', p, re.I) for p in pars), sid
    total += count
assert total == C['words']
for name, digest in C['sourceHashes'].items():
    assert sha(ROOT/'sources'/f'{name}.pdf') == digest
for ref in V['references'].values():
    path = ROOT/ref['file']
    assert sha(path) == ref['sha256'], ref
    assert len(fitz.open(path)) == ref['pages'], ref
for r in D['review']:
    assert r['section'] in V['scripts'], r

# Representative source-specific language survives in the fuller teaching prose.
phrases = {
    'development1-02': ['generativity', 'identifying the abstract grammar', 'grammatical and ungrammatical', 'operant conditioning', 'Universal Grammar', 'hypothesis-formulating'],
    'speech2-04': ['activity threshold is crossed', 'phoneme'],
    'speech2-05': ['passed forward continuously over time', 'bear', 'pear'],
    'speech2-10': ['McMurray', 'visual-world', 'clicks'],
    'sentence-11': ['Recent research reported by', 'The burglar arrested in the parking lot was charged today', 'The policeman arrested in the parking lot was charged today'],
    'sentence-26': ['Chris and Ben are glad', 'perches seem easy to install', 'perches comfortably in the cage', 'The teacher told the principal', 'student needs were not being met', 'needs to be more focused'],
    'development2-09': ['GOPILA', 'BU-GIKO', '2/2', '2/4', 'matched for frequency'],
    'development2-12': ['CAT', 'FELIX', 'WHISKERS', 'gavagai', 'hypothesis space'],
    'l2-learning-10': ['gitaar–gettar', 'tijger–duunze', 'domein–domaan', 'herstel–groop'],
}
for sid, needles in phrases.items():
    text = ' '.join(V['scripts'][sid]).lower().replace('**', '')
    for needle in needles:
        assert needle.lower() in text, (sid, needle)

# Optional full before/after snapshot from this task includes every other studio.
snapshot = Path('/tmp/ling406-v2-preserved.json')
if snapshot.exists():
    previous = json.loads(snapshot.read_text())
    for name, digest in previous.items():
        assert sha(ROOT.parent/name) == digest, name
    print(f'{len(previous)} pre-existing files remain byte-identical.')
print(f'PASS: all 229 V2 scripts, {total:,} words, 5–6 paragraphs each, all review mappings, reference hashes/pages, original scripts/questions preserved, and source-specific teaching examples.')
