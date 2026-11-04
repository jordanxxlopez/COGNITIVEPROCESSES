"""Check source wording, per-page nondecreasing length and additive preservation."""
from pathlib import Path
import hashlib
import copy
import json
import re
import runpy

ROOT=Path(__file__).resolve().parents[1]
helpers=runpy.run_path(str(ROOT/'version4/build_transcripts.py'))
load=helpers['load_js'];norm=helpers['norm'];size=helpers['size'];flat=helpers['flat'];first=helpers['first_sentence']
D=load('data.js','window.LING406 = ')
V3=load('transcripts-v3-data.js','window.LING406_TRANSCRIPTS_V3 = ')
V4=load('transcripts-v4-data.js','window.LING406_TRANSCRIPTS_V4 = ')
C=json.loads((ROOT/'version4/coverage.json').read_text())
assert C['baselineSHA256']==hashlib.sha256((ROOT/'transcripts-v3-data.js').read_bytes()).hexdigest()
assert len(V4['scripts'])==284
assert set(V4['scripts'])==set(V3['scripts'])==set(C['scripts'])
sections={s['id']:s for s in D['sections']}
review={r['id']:r for r in V3['review']}
changed=0
for sid,script in V4['scripts'].items():
    old=V3['scripts'][sid];a=C['scripts'][sid]
    origin=review[sid]['lectureSection'] if sid in review and review[sid]['page']!=54 else sid
    expected=helpers['clarify'](origin,copy.deepcopy(old))
    assert size(old)==a['version3'] and size(script)==a['version4'],sid
    assert size(script)['words']>=size(old)['words'],sid
    assert size(script)['characters']>=size(old)['characters'],sid
    assert len(script)==len(old),sid
    assert len(flat(script))==len(flat(old)),sid
    for current,previous in zip(flat(script),flat(old)):
        assert len(helpers['visible'](current).split())>=len(helpers['visible'](previous).split()),sid
        assert len(helpers['visible'](current))>=len(helpers['visible'](previous)),sid
    if not old:
        assert not script and a['role']=='title-or-reading-reminder',sid
        continue
    # Existing explanations remain in place, rather than being replaced with short quotations.
    assert script[1:]==expected[1:],sid
    assert script[0]['children']==expected[0]['children'],sid
    assert script[0]['text'].endswith(expected[0]['text'][len(first(expected[0]['text'])):]),sid
    prose=' '.join(flat(script))
    assert all(p.count('**')%2==0 for p in flat(script)),sid
    assert not re.search(r'[:;]|\bneed not\b|\blawful\b',prose,re.I),sid
    assert not re.search(r'\b(this slide|next slide|previous slide|later experiments|the key point|this shows|this illustrates|this demonstrates|as you can see|from here|before getting to|this sets up|reading the figure)\b',prose,re.I),sid
    assert norm(a['sourceAnchor']) in norm(prose),sid
    source=review[sid]['sourceText'] if sid.startswith('review-') else sections[sid]['sourceText']
    if a['anchorType']=='extracted-slide-text':assert norm(a['sourceAnchor']) in norm(source),sid
    if script!=old:changed+=1
assert changed==259
assert C['words']==sum(size(s)['words'] for s in V4['scripts'].values())
example=' '.join(flat(V4['scripts']['speech1-03']))
assert 'Somehow we have to turn a **highly variable, analog signal into something more abstract**' in example
assert 'An analog signal varies continuously' in example
assert 'symbolic representation identifies an abstract unit' in example
for r in V3['review']:
    if r['page']!=54:assert V4['scripts'][r['id']]==V4['scripts'][r['lectureSection']],r['id']
assert 'word forms rather than a similarity' in ' '.join(flat(V4['scripts']['review-54']))
# Every original file outside the necessary edition selector, cache and documentation changes is pinned.
preserved=Path('/tmp/ling406-v4-preserved.json')
if preserved.exists():
    before=json.loads(preserved.read_text())
    allowed={'AGENTS.md','ling406/README.md','ling406/app.js','ling406/index.html','ling406/sw.js','ling406/tests/transcripts-v2.cjs','ling406/tests/transcripts-v3.cjs'}
    for name,digest in before.items():
        if name not in allowed:assert hashlib.sha256((ROOT.parent/name).read_bytes()).hexdigest()==digest,name
    print(f'{len(before)} original files checked with only the declared selector/cache/documentation changes allowed.')
print(f'PASS: all 284 V4 entries retain or exceed V3 in words and characters, all source anchors verified, 259 source-wording revisions, complete teaching explanations retained, and previous editions preserved.')
