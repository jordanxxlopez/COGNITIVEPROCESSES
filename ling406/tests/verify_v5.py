"""Validate source coverage, explicit V5 authorship, and bounded additive changes."""
import hashlib,json,re,runpy,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1];REPO=R.parent
H=runpy.run_path(str(R/'version5/build_transcripts.py'));load=H['load'];size=H['size'];paragraphs=H['paragraphs']
D=load('data.js','window.LING406 = ');V=load('transcripts-v5-data.js','window.LING406_TRANSCRIPTS_V5 = ');V4=load('transcripts-v4-data.js','window.LING406_TRANSCRIPTS_V4 = ');V3=load('transcripts-v3-data.js','window.LING406_TRANSCRIPTS_V3 = ');C=json.loads((R/'version5/coverage.json').read_text())
assert set(V['scripts'])==set(V4['scripts'])==set(C['scripts']) and len(V['scripts'])==284
assert len(D['sections'])==229 and len(V3['review'])==55
assert C['baselineSHA256']==hashlib.sha256((R/'transcripts-v4-data.js').read_bytes()).hexdigest()
assert C['words']==sum(size(x)['words']for x in V['scripts'].values())>=sum(size(x)['words']for x in V4['scripts'].values())
for m in D['modules']:
 authored=H['parse'](m['id']+'.txt')
 assert sorted(authored)==list(range(1,len(m['sections'])+1))
 for sid in m['sections']:
  source=next(s for s in D['sections']if s['id']==sid);assert V['scripts'][sid]==authored[source['page']]
for sid,blocks in V['scripts'].items():
 assert bool(blocks)==bool(V4['scripts'][sid]),sid
 if blocks:assert blocks!=V4['scripts'][sid],sid
 assert C['scripts'][sid]['version5']==size(blocks)
 for p in paragraphs(blocks):
  assert not re.search(r'[:;]|\bneed not\b|\blawful\b|\b(?:slide|slides|the lecture|this lecture|this illustrates|this demonstrates|this shows|the key takeaway|later experiments|as you can see)\b',p,re.I),sid
  assert p.count('**')%2==0,sid
  for math in re.findall(r'\\\[(.*?)\\\]',p):assert math in V['mathSpeech'],(sid,math)
for r in V3['review']:
 if r['page']==54:assert V['scripts'][r['id']]!=V['scripts'][r['lectureSection']]
 else:assert V['scripts'][r['id']]==V['scripts'][r['lectureSection']]
# Retain the actual tasks, comparisons, source examples and salient numbers.
facts={
 'speech1-03':['highly variable, analog signal','symbolic','phoneme'],
 'speech1-25':['1971','20D','+20','+40','−20','+60','+80','20S'],
 'speech1-29':['1974','rise time','sawtooth','sine','0 to 80'],
 'speech2-10':['2003','bear','pear','lamp','ship','eye'],
 'speech2-13':['300–1100','1100–1900','boundary'],
 'speech2-15':['1994','beace','peace','war','ging','king','queen','bill','drug'],
 'sentence-11':['research','reported','burglar','policeman'],
 'sentence-12':['1995','apple','towel','box'],
 'sentence-26':['3,158','perches','needs','noun','verb'],
 'aphasias-02':['Lichtheim','Wernicke','1870s','A','M','B','1','2','3','4','5','6','7'],
 'aphasias-13':['semantically constrained','reversible','improbable','horse','bird','worm','man'],
 'aphasias-19':['93.4%','87.5%','98.5%','99.4%'],
 'aphasias-21':['99.2%','98.1%','99.1%','98.2%','98.6%','96.7%','96.3%','95.2%','90.0%','91.3%'],
 'development1-02':['Chomsky','Skinner','generativity','operant conditioning','Universal Grammar','hypothesis-formulating'],
 'development1-17':['Maye','bimodal','unimodal','4.85','4.53','4.98','5.20','5.66','6.41','5.45','6.15'],
 'development1-18':['twelve 25-minute','Mandarin','contingent','noncontingent'],
 'development2-09':['Half','GOPILA','BU-GIKO','GO–PI','PI–LA','BU–GI','2}{2','2}{4'],
 'development2-14':['Baldwin','Eighteen','screen','joint'],
 'development2-24':['2006','gorping','duck','rabbit','MLU','morpheme'],
 'l1-critical-04':['2–3','3–4','week','spines','axon'],
 'l1-critical-15':['12','5','37','4','behind','in front of','plural'],
 'l1-critical-16':['100','3','7','51','6','and','or'],
 'l1-critical-18':['2002','Mayberry','9–15','ASL','spoken'],
 'l2-learning-06':['Gè','Bǎ','Běn','Kuài','Liàng','Tái','Xiē','Zhāng','Zhī'],
 'l2-learning-11':['69.7%','43.7%','93.4%','92.0%','78.4%','69.0%','68.4%','36.0%','86.0%','72.7%','1,833','2,597','2,333','3,412'],
 'l2-learning-13':['92.7%','73.7%','79.3%','52.2%','89.7%','73.3%','82.3%','52.5%','97.7%','88.9%','91.5%','64.9%','98.5%','90.7%','63.0%'],
 'l2-learning-17':['speaker','spichki','matches','spear','buben','cherepaha','marka'],
 'l2-learning-31':['fourteen','19.6','19.3','36.2','lenition'],
 'l2-sensitive-04':['46','3 and 39','3–26','Korean','Chinese'],
 'l2-sensitive-06':['3–15','17–39','−0.87','−0.16'],
 'l2-sensitive-09':['exercise','maturational-state'],
 'l2-sensitive-11':['0.27','−0.23','Ellis'],
 'l2-sensitive-14':['2001','Spanish','−0.23','−0.69'],
 'review-54':['speaker','spichki','matches','1990','1994','sound','meanings'],
}
for sid,terms in facts.items():
 text=' '.join(paragraphs(V['scripts'][sid])).replace('**','').lower()
 for term in terms:assert term.lower()in text,(sid,term)
# All old documents, illustrations, question banks, prior editions and palettes
# remain byte-for-byte intact. Only the declared UI/cache/docs/tests can change.
allowed={'ling406/app.js','ling406/index.html','ling406/sw.js','ling406/README.md','ling406/tests/transcripts-v2.cjs','ling406/tests/transcripts-v3.cjs','ling406/tests/transcripts-v5.cjs'}
for name,digest in json.loads((R/'version5/preserved.json').read_text()).items():
 if name not in allowed:assert hashlib.sha256((REPO/name).read_bytes()).hexdigest()==digest,name
old=subprocess.check_output(['git','show','d44e23f:ling406/app.js'],cwd=REPO,text=True)
new=(R/'app.js').read_text();start=new.index('// Versions 5 and 6');end=new.index('function transcriptHTML',start);new=new[:start]+new[end:]
changed=('const T2=','const state=','state.transcriptVersion=','function teachingBlocks(','function transcriptHTML(','function transcriptSelector(','function changeTranscriptVersion(','function readAloud(')
def unchanged(text):return '\n'.join(line for line in text.splitlines()if not line.startswith(changed))
assert unchanged(old)==unchanged(new),'Unexpected application behavior changed'
print(f'PASS V5: 229 lecture pages, 55 review pages, {C["teachingPages"]} independently authored teaching entries, {C["words"]:,} words, source facts/math, preserved prior editions, images, quizzes and palettes; bounded selector/rendering additions only.')
