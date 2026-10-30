"""Check V18 teaching-script coverage, authored-content rules and preservation of everything else."""
import hashlib,json,re,runpy,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1];REPO=R.parent;BASE='99731a3'
H=runpy.run_path(str(R/'version18/build_transcripts.py'));load=H['load'];size=H['size'];paragraphs=H['paragraphs']
D=load('data.js','window.LING406 = ')
V=load('transcripts-v18-data.js','window.LING406_TRANSCRIPTS_V18 = ');V16=load('transcripts-v16-data.js','window.LING406_TRANSCRIPTS_V16 = ')
V6=load('transcripts-v6-data.js','window.LING406_TRANSCRIPTS_V6 = ')
V3=load('transcripts-v3-data.js','window.LING406_TRANSCRIPTS_V3 = ')
C=json.loads((R/'version18/coverage.json').read_text())
assert set(V['scripts'])==set(V6['scripts'])==set(C['scripts']) and len(V['scripts'])==284
assert C['baselineSHA256']==hashlib.sha256((R/'transcripts-v16-data.js').read_bytes()).hexdigest()
assert C['words']==sum(size(x)['words']for x in V['scripts'].values())
# Every individual collection keeps every source page in source order.
for m in D['modules']:
 authored=H['parse'](m['id']+'.txt')
 assert sorted(authored)==list(range(1,len(m['sections'])+1)),m['id']
 for sid in m['sections']:
  page=next(s for s in D['sections']if s['id']==sid)['page']
  assert V['scripts'][sid]==authored[page],sid
for sid,blocks in V['scripts'].items():
 assert bool(blocks)==bool(V6['scripts'][sid]),sid
 assert C['scripts'][sid]['version18']==size(blocks)
 if blocks:
  assert blocks!=V16['scripts'][sid],('not rewritten from V16',sid)
  assert any(b['children']for b in blocks),sid
 for p in paragraphs(blocks):
  assert not H['BANNED'].search(p),(sid,H['BANNED'].search(p).group())
  assert not H['LABELS'].search(p),(sid,H['LABELS'].search(p).group())
  assert p.count('**')%2==0,sid
  for math in re.findall(r'\\\[(.*?)\\\]',p):assert math in V['mathSpeech'],(sid,math)
for r in V3['review']:
 assert C['scripts'][r['id']]['lectureSection']==r['lectureSection']
 if r['page']==54:assert V['scripts'][r['id']]!=V['scripts'][r['lectureSection']]
 else:assert V['scripts'][r['id']]==V['scripts'][r['lectureSection']]
# Source facts, numbers and experiment details taught in the notes.
facts={
 'speech1-06':['300 Hz','900 Hz','Praat'],
 'speech1-17':['1957','one step','two steps','three steps','boundar'],
 'speech1-25':['1971','20D','+20','+40','−20','+60','+80','20S'],
 'speech1-26':['Hindi','Salish','6–8','8–10','10–12'],
 'speech1-32':['4–5','6–8','10–12','Filipino','[ŋa]'],
 'speech2-11':['17.5'],
 'speech2-13':['300–1100','1100–1900'],
 'speech2-15':['1994','beace','war','ging','queen','bill','drug'],
 'speech2-18':['1980','corpse','gorpse','5-millisecond'],
 'speech2-27':['beaker','beetle','speaker','carriage'],
 'sentence-06':['late closure','dynamite','verb phrase'],
 'sentence-12':['1995','pencil','towel','box'],
 'sentence-14':['55%','17%'],
 'sentence-24':['ELAN','100–200','eaten','Max’s of proof'],
 'sentence-28':['noun-like','verb-like','50','120','110'],
 'aphasias-02':['Lichtheim','Wernicke','1870s'],
 'aphasias-14':['sentence-picture','Broca','Wernicke','algorithmic'],
 'aphasias-19':['2004'],
 'aphasias-21':['90.0','91.3'],
 'development1-17':['bimodal','unimodal'],
 'development1-18':['twelve 25-minute'],
 'development2-04':['pretty','f(\\mathrm{pretty})'],
 'development2-09':['GOPILA','BU-GIKO','\\frac{2}{4}=0.5','\\frac{2}{2}=1'],
 'development2-24':['2006','gorping','MLU'],
 'l1-critical-12':['49','Basser'],
 'l1-critical-15':['36','37','behind'],
 'l1-critical-16':['either/or'],
 'l1-critical-18':['2002','9 to 15','36%','50%'],
 'l2-learning-11':['69.7','43.7','36.0'],
 'l2-learning-18':['18%','7%'],
 'l2-learning-19':['8%','5%','not statistically significant'],
 'l2-learning-31':['19.3','36.2','4.3'],
 'l2-sensitive-06':['−0.87','−0.16'],
 'l2-sensitive-14':['−0.23','−0.69','Spanish'],
 'review-54':['spichki','sound overlap','1990, 1994'],
}
for sid,terms in facts.items():
 text=' '.join(paragraphs(V['scripts'][sid])).replace('**','').lower()
 missing=[t for t in terms if t.lower() not in text];assert not missing,(sid,missing)
# Everything outside the declared V18 files, integration points and edition-count
# test updates is byte-for-byte unchanged from the baseline commit.
changed=subprocess.check_output(['git','diff','--name-only',BASE,'--'],cwd=REPO,text=True).split()
untracked=subprocess.check_output(['git','ls-files','--others','--exclude-standard'],cwd=REPO,text=True).split()
allowed={'ling406/app.js','ling406/index.html','ling406/sw.js','ling406/README.md','README.md','index.html','share.html',
 'ling406/transcripts-v18-data.js','ling406/tests/transcripts-v18.cjs','ling406/tests/verify_v18.py','psyc301-v18.js','psyc301-v18-data.js','tests/psyc301-v18.test.cjs',
 'tests/psyc-transcript-preservation.cjs','tests/studio-gradients.test.cjs','tests/direct-teaching.test.cjs',
 *['ling406/tests/transcripts-v'+v+'.cjs' for v in ['2','3','5','6','7','10','12','14','16']],
 *['ling406/tests/verify_v'+v+'.py' for v in ['7','10','12','14','16']],
 *['authoring/psyc301/version'+v+'/verify.py' for v in ['6','10','12','14','16']]}
for name in changed+untracked:assert name in allowed or name.startswith(('authoring/psyc301/version18/','ling406/version18/')),name
old=subprocess.check_output(['git','show',BASE+':ling406/app.js'],cwd=REPO,text=True)
prefixes=('const T2=','const state=','state.transcriptVersion=','function teachingBlocks(','function transcriptSelector(','function changeTranscriptVersion(',' return text.split(open).map(')
def unchanged(t):return '\n'.join(line for line in t.splitlines()if not line.startswith(prefixes))
assert unchanged(old)==unchanged((R/'app.js').read_text()),'Unexpected application behavior changed'
assert C['rewrittenPages']==C['teachingPages']
print(f'PASS V18 (average {C["averageWords"]} words per teaching page): {len(V["scripts"])} source pages in order, all {C["teachingPages"]} teaching pages rewritten from V16 as Prompt 2 teaching scripts, {C["words"]:,} words, source facts and equations verified, earlier editions and all other files unchanged.')
