"""Check V6 source alignment, all-page authorship and preservation of older study data."""
import hashlib,json,re,runpy,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1];REPO=R.parent
H=runpy.run_path(str(R/'version6/build_transcripts.py'));load=H['load'];size=H['size'];paragraphs=H['paragraphs']
D=load('data.js','window.LING406 = ')
V=load('transcripts-v6-data.js','window.LING406_TRANSCRIPTS_V6 = ')
V5=load('transcripts-v5-data.js','window.LING406_TRANSCRIPTS_V5 = ')
V3=load('transcripts-v3-data.js','window.LING406_TRANSCRIPTS_V3 = ')
C=json.loads((R/'version6/coverage.json').read_text())
assert set(V['scripts'])==set(V5['scripts'])==set(C['scripts']) and len(V['scripts'])==284
assert len(D['sections'])==229 and len(V3['review'])==55
assert C['baselineSHA256']==hashlib.sha256((R/'transcripts-v5-data.js').read_bytes()).hexdigest()
assert C['words']==sum(size(x)['words']for x in V['scripts'].values())>=sum(size(x)['words']for x in V5['scripts'].values())
for m in D['modules']:
 authored=H['parse'](m['id']+'.txt')
 assert sorted(authored)==list(range(1,len(m['sections'])+1))
 for sid in m['sections']:
  source=next(s for s in D['sections']if s['id']==sid)
  assert V['scripts'][sid]==authored[source['page']]
  assert C['scripts'][sid]['page']==source['page']
for sid,blocks in V['scripts'].items():
 assert bool(blocks)==bool(V5['scripts'][sid]),sid
 if blocks:assert blocks!=V5['scripts'][sid],sid
 assert C['scripts'][sid]['version6']==size(blocks)
 for p in paragraphs(blocks):
  assert not re.search(r'[:;→]|\bneed not\b|\blawful\b|\b(?:slide|slides|the lecture|this lecture|this illustrates|this demonstrates|this shows|the key takeaway|later experiments|as you can see|the next step|from here)\b',p,re.I),sid
  assert p.count('**')%2==0,sid
  for math in re.findall(r'\\\[(.*?)\\\]',p):assert math in V['mathSpeech'],(sid,math)
for r in V3['review']:
 assert C['scripts'][r['id']]['lectureSection']==r['lectureSection']
 if r['page']==54:assert V['scripts'][r['id']]!=V['scripts'][r['lectureSection']]
 else:assert V['scripts'][r['id']]==V['scripts'][r['lectureSection']]
# Explicit source-fact checks cover concepts, comparisons, task behavior and
# meaningful numbers. Incidental graph/table values are intentionally omitted.
facts={
 'speech1-03':['highly variable, analog signal','symbolic','phoneme','Categorical perception'],
 'speech1-08':['source','filter','buzz','approximate'],
 'speech1-09':['first four','F1','F2','same'],
 'speech1-14':['F1','F2','linearly','equal','boundary'],
 'speech1-16':['labeling','discrimination','independent','1 and 3','5 and 7'],
 'speech1-17':['1957','one-step','two-step','three-step','boundaries'],
 'speech1-25':['1971','20D','+20','+40','−20','+60','+80','20S','0 condition','sucking'],
 'speech1-26':['Hindi','Salish','6–8','8–10','10–12','English'],
 'speech1-29':['1974','rise time','sawtooth','sine','pluck','bow'],
 'speech1-31':['0-millisecond','80-millisecond','food','/ga/–/ka/','1975','1999'],
 'speech1-32':['4–5','6–8','10–12','Filipino','[ŋa]'],
 'speech2-02':['1979','cochlea','segmental','lexical','Cascaded','Feedback'],
 'speech2-10':['2003','bear','pear','lamp','ship','eye'],
 'speech2-12':['bear','pear','final answer','boundary','gradient'],
 'speech2-13':['300–1100','1100–1900','boundary'],
 'speech2-15':['1994','beace','peace','war','ging','king','queen','bill','drug'],
 'speech2-18':['1980','corpse','gorpse','5-millisecond'],
 'speech2-22':['TRACE','plug','blood','blush','/g/'],
 'speech2-27':['beaker','beetle','speaker','carriage','cohort','rhyme'],
 'sentence-02':['horse','raced','fell','that was'],
 'sentence-06':['late closure','dynamite','verb-phrase','noun-phrase'],
 'sentence-11':['research','reported','burglar','policeman','inanimate'],
 'sentence-12':['1995','apple','towel','box','current-location'],
 'sentence-14':['one apple','two apples','referential context'],
 'sentence-24':['ELAN','100–200','left/anterior','pizza','word-class'],
 'sentence-26':['3,158','perches','needs','noun','verb'],
 'sentence-29':['morphological','princess','soda','infant','neutral'],
 'aphasias-02':['Lichtheim','Wernicke','1870s','A','M','B','1','2','3','4','5','6','7'],
 'aphasias-06':['Leborgne','Tan','apraxia'],
 'aphasias-08':['lemmas','arbitrary','HOUSEBOAT','DOGHOUSE','easy enoughly'],
 'aphasias-13':['semantically constrained','reversible','improbable','horse','bird','worm'],
 'aphasias-16':['active','subject cleft','object cleft','passive','dog','cat'],
 'aphasias-18':['healthy','compressed','low-pass','memory','performance'],
 'aphasias-19':['Saygin','2004','nonverbal','licking','ice cream','semantically related'],
 'aphasias-21':['90%','environmental','cow','not differ significantly'],
 'aphasias-25':['voxel','anterior','posterior','double dissociation'],
 'development1-02':['Chomsky','Skinner','generativity','operant conditioning','Universal Grammar','hypothesis-formulating'],
 'development1-06':['four months','Color vision','visual acuity','innate'],
 'development1-13':['Narayan','2010','/ma/–/na/','/na/–/ŋa/','salient'],
 'development1-17':['Maye','bimodal','unimodal','stimuli 3 and 6','alternating'],
 'development1-18':['twelve 25-minute','Mandarin','contingent','noncontingent','audio-only'],
 'development2-03':['7.5-month-olds','1999','kingdom','device','stress'],
 'development2-06':['Saffran','1996','monotone','consonant–vowel','no pauses'],
 'development2-09':['Half','GOPILA','BU-GIKO','GO–PI','PI–LA','BU–GI','2}{2','2}{4'],
 'development2-12':['Quine','gavagai','hypothesis space','CAT','FELIX','LEG'],
 'development2-14':['Baldwin','Eighteen','screen','joint'],
 'development2-20':['Markman','1989','second half','default'],
 'development2-24':['2006','gorping','duck','rabbit','MLU','morphemes'],
 'l1-critical-02':['critical period','sensitive period','gradual','possible'],
 'l1-critical-04':['2–3','3–4','week','spines','axon'],
 'l1-critical-06':['1996','fifties','tens of thousands','plasticity'],
 'l1-critical-14':['Curtiss','1974','thirteen years and seven months','twenty months'],
 'l1-critical-15':['four years','hundreds','behind','in front of','morphology'],
 'l1-critical-16':['and','or','comprehension','production','punishment'],
 'l1-critical-18':['2002','Mayberry','9–15','ASL','spoken'],
 'l2-learning-06':['Gè','Bǎ','Běn','Kuài','Liàng','Tái','Xiē','Zhāng','Zhī'],
 'l2-learning-10':['2000','one week','Gitaar','gettar','tijger','duunze','domein','domaan'],
 'l2-learning-11':['retained','Response times','Abstract non-cognates','week'],
 'l2-learning-12':['receptive','productive','Dutch','unfamiliar form'],
 'l2-learning-17':['speaker','spichki','matches','spear','buben','cherepaha','marka'],
 'l2-learning-19':['not statistically significant','asymmetric'],
 'l2-learning-21':['1990','1994','sound overlap','not shared meaning','matches'],
 'l2-learning-26':['plain–tense','plain–aspirated','tense–aspirated','no better','Korean'],
 'l2-learning-31':['fourteen','VOT','lenition','morphology'],
 'l2-sensitive-04':['46','3 and 39','Korean','Chinese'],
 'l2-sensitive-06':['3–15','17–39','−0.87','−0.16'],
 'l2-sensitive-09':['exercise','maturational-state','L1'],
 'l2-sensitive-10':['implicit','explicit','Ellis','2005','untimed','automatically'],
 'l2-sensitive-11':['0.27','−0.23','Ellis'],
 'l2-sensitive-14':['2001','Spanish','−0.23','−0.69'],
 'review-54':['speaker','spichki','matches','1990','1994','sound','meanings'],
}
for sid,terms in facts.items():
 text=' '.join(paragraphs(V['scripts'][sid])).replace('**','').lower()
 for term in terms:assert term.lower()in text,(sid,term)
# Only explicit integration, documentation and compatibility checks can change.
allowed={'ling406/app.js','ling406/index.html','ling406/sw.js','ling406/README.md',
 'ling406/tests/transcripts-v2.cjs','ling406/tests/transcripts-v3.cjs',
 'ling406/tests/transcripts-v5.cjs','ling406/tests/verify_v5.py'}
for name,digest in json.loads((R/'version6/preserved.json').read_text()).items():
 if name not in allowed:assert hashlib.sha256((REPO/name).read_bytes()).hexdigest()==digest,name
old=subprocess.check_output(['git','show','bdf8c75:ling406/app.js'],cwd=REPO,text=True)
new=(R/'app.js').read_text()
changed=('const T2=','const state=','state.transcriptVersion=','function teachingBlocks(',
 'function transcriptSelector(','function changeTranscriptVersion(',
 '// The new edition alone','// Versions 5 and 6',' if(state.transcriptVersion',
 " return text.split(open).map(")
def unchanged(t):return '\n'.join(line for line in t.splitlines()if not line.startswith(changed))
assert unchanged(old)==unchanged(new),'Unexpected application behavior changed'
for path in ['index.html','share.html','module2-data.js','module2-workspace.js','psyc301-theme.css',
 'bme423/app.js','bme423/index.html','bme423/module2-data.js','ling285/app.js','ling285/index.html']:
 assert (REPO/path).read_bytes()==subprocess.check_output(['git','show','bdf8c75:'+path],cwd=REPO),path
print(f'PASS V6: {len(V["scripts"])} original pages, {C["teachingPages"]} new source-aligned teaching entries, {C["words"]:,} words, salient source facts/math, prior editions unchanged, original images/questions/state paths/palettes preserved; PSYC301/BME423/LING285 unchanged.')
