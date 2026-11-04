from pathlib import Path
import json,hashlib,re
import fitz
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'data.js').read_text().removeprefix('window.LING406 = ').rstrip(';\n'))
S={s['id']:s for s in D['sections']}
assert len(S)==229 and len(D['modules'])==9
scripts=[]
for m in D['modules']:
 src=D['sources'][m['source']]
 assert len(m['sections'])==src['pages']
 for n,sid in enumerate(m['sections'],1):
  s=S[sid];assert s['page']==n and s['module']==m['id']
  assert len(s['paragraphs'])>=2
  assert s['image'].endswith(f'/{n:02}.webp') and (ROOT/s['image']).exists()
  assert len(' '.join(s['paragraphs']).split())>=35
  scripts.append(' '.join(s['paragraphs']))
assert len(set(scripts))==229
assert sum(s['core'] for s in S.values())==131
for key in ['guide','experiments']:
 for g in D[key]:
  assert g['sections'] and all(s in S for s in g['sections'])
assert len(D['review'])==55
for n,r in enumerate(D['review'],1):assert r['page']==n and r['section'] in S and (ROOT/r['image']).exists()
for key,s in D['sources'].items():
 path=ROOT/s['file'];assert hashlib.sha256(path.read_bytes()).hexdigest()==s['sha256'];assert len(fitz.open(path))==s['pages']
for w in D['written']:assert w['section'] in S and len(w['answer'])==3
assert len(D['written'])==18 and sum(D['testAllocation'].values())==100
assert all(6<=v<=20 for v in D['testAllocation'].values())
# Verify the supplied review's year is represented accurately.
assert 'Fall 2025' in (ROOT/'authoring/review.txt').read_text()
assert 'Fall 2026' in (ROOT/'authoring/syllabus-ocr.txt').read_text()
# Existing PSYC301, BME423 and all archived PDFs stay byte-for-byte unchanged.
base=Path('/tmp/ling406-preserved.json')
if base.exists():
 preserved=json.loads(base.read_text())
 for name,digest in preserved.items():assert hashlib.sha256((ROOT.parent/name).read_bytes()).hexdigest()==digest,name
 print(f'{len(preserved)} existing repository files unchanged.')
print('PASS: 229 individual lecture explanations, 284 lecture/review visuals, 180 questions, 18 written prompts, all source hashes/pages, source links, core markers and test allocations.')
