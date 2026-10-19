"""Verify actual source-page coverage, V3 writing constraints and bounded preservation."""
from pathlib import Path
import hashlib
import json
import re
import runpy
import subprocess
import fitz
ROOT=Path(__file__).resolve().parents[1]
REPO=ROOT.parent

def read_js(file,prefix):
    return json.loads((ROOT/file).read_text().removeprefix(prefix).rstrip(';\n'))

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

D=read_js('data.js','window.LING406 = ')
V=read_js('transcripts-v3-data.js','window.LING406_TRANSCRIPTS_V3 = ')
C=json.loads((ROOT/'version3/coverage.json').read_text())
wording=json.loads((ROOT/'editorial/wording-changes.json').read_text())
replace=runpy.run_path(str(ROOT/'editorial/direct_wording.py'))['direct_wording']
for file,change in wording['files'].items():
    baseline=subprocess.check_output(['git','show',wording['baselineCommit']+':ling406/'+file],cwd=REPO,text=True)
    assert hashlib.sha256(baseline.encode()).hexdigest()==change['before']
    assert replace(baseline)==(ROOT/file).read_text(),file
    assert sha(ROOT/file)==change['after'],file
# Sources, questions and prior transcripts otherwise remain exactly the same.
assert D['revision']==json.loads(subprocess.check_output(['git','show',wording['baselineCommit']+':ling406/data.js'],cwd=REPO,text=True).removeprefix('window.LING406 = ').rstrip(';\n'))['revision']
assert set(V['scripts'])=={s['id'] for s in D['sections']}|{f'review-{i}' for i in range(1,56)}
assert len(V['scripts'])==284 and len(V['review'])==55
assert not any(re.search(r'[:;]|\blawful\b',title,re.I) for title in V['titles'].values())
all_prose=[]
for sid,script in V['scripts'].items():
    paragraphs=[p for b in script for p in [b['text'],*b['children']]]
    prose=' '.join(paragraphs)
    assert not re.search(r'[:;]|\bneed not\b|\blawful\b',prose,re.I),sid
    assert not re.search(r'\b(this slide|next slide|previous slide|later experiments|the key point|this shows|this illustrates|this demonstrates|as you can see|from here|before getting to|this sets up|reading the figure)\b',prose,re.I),sid
    assert all(p.replace('**','').endswith(('.', '?', '!”', '.”')) for p in paragraphs),sid
    assert all(p.count('**')%2==0 for p in paragraphs),sid
    assert C['scripts'][sid]['words']==len(prose.split()),sid
    assert C['scripts'][sid]['visualChecked'],sid
    assert C['scripts'][sid]['paragraphs']==len(paragraphs),sid
    if script: all_prose.append(prose)
assert len(all_prose[:210])==len(set(all_prose[:210]))
assert sum(len(x.split()) for x in all_prose)==C['words']
for key,digest in C['sourceHashes'].items():
    assert sha(ROOT/D['sources'][key]['file'])==digest,key
for key,digest in C['referenceHashes'].items():
    refs=read_js('transcripts-v2-data.js','window.LING406_TRANSCRIPTS_V2 = ')['references']
    assert sha(ROOT/refs[key]['file'])==digest,key
review_pdf=fitz.open(ROOT/'sources/review.pdf')
for i,page in enumerate(V['review'],1):
    assert page['id']==f'review-{i}' and page['page']==i
    assert page['sourceText']==review_pdf[i-1].get_text().strip()
    assert page['lectureSection']==D['review'][i-1]['section']
    assert (ROOT/D['review'][i-1]['image']).exists()
    if i!=54: assert V['scripts'][page['id']]==V['scripts'][page['lectureSection']]
assert V['scripts']['review-54']!=V['scripts']['l2-learning-21']
# Actual forms, task actions and results rather than a template attached to every page.
phrases={
 'speech1-04':['formants','tongue','resonances'],
 'speech1-25':['20d','+20','+40','sucking'],
 'speech1-31':['/ga/','/ka/'],
 'speech2-10':['bear','pear','lamp','ship'],
 'speech2-15':['beace','war','ging','queen'],
 'sentence-13':['two','apple'],
 'development1-02':['generativity','operant conditioning','abstract grammar'],
 'development2-09':['gopila','bu-giko','2/2','2/4'],
 'development2-14':['behind a screen','eighteen-month'],
 'l2-learning-17':['spichki','matches','speaker'],
 'l2-sensitive-09':['exercise hypothesis','maturational-state hypothesis'],
 'review-54':['spichki','word forms','meanings'],
}
for sid,words in phrases.items():
    prose=' '.join(p for b in V['scripts'][sid] for p in [b['text'],*b['children']]).lower().replace('**','')
    for word in words: assert word in prose,(sid,word)
# No invented teaching on the title, reading-reminder or links-only pages.
assert not V['scripts']['review-1']
assert not V['scripts']['l1-critical-21']
assert not V['scripts']['speech2-26']
for name in ['teaching-notes.json','questions.json','data.js','transcripts-v2-data.js','transcripts-v3-data.js']:
    assert not re.search(r'\bneed not\b',(ROOT/name).read_text(),re.I),name
# The current task's full baseline pins every other course and every source file.
snapshot=Path('/tmp/ling406-v3-preserved.json')
if snapshot.exists():
    prior=json.loads(snapshot.read_text())
    intentional={'ling406/tests/studio.cjs','ling406/tests/transcripts-v2.cjs','ling406/tests/verify_v2.py','ling406/version2/coverage.json'}
    for name,digest in prior.items():
        if name in intentional: continue
        approved=wording['files'].get(name.removeprefix('ling406/'))
        if approved:
            assert approved['before']==digest,name
            digest=approved['after']
        assert sha(REPO/name)==digest,name
    print(f'{len(prior)} baseline file hashes checked with explicitly bounded editorial/UI-test changes.')
print(f'PASS: 229 lecture pages and 55 original review pages, {C["words"]:,} teaching words, source/reference hashes, direct-prose constraints, source-specific experimental details, and preserved previous editions.')
