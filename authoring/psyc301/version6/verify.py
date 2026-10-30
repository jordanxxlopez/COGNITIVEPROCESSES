"""Verify every current source page and preserve all existing editions and study data."""
import hashlib,json,re,runpy,subprocess
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
load=lambda p:json.loads((ROOT/p).read_text().split(' = ',1)[1].rstrip(';\n'))
V=load('psyc301-v6-data.js');C=json.loads((HERE/'coverage.json').read_text());S=json.loads((HERE/'source-pages.json').read_text())
assert V['scope']==[6,9,10,11,12]
assert len(V['scripts'])==C['sourcePages']==148
assert sum(bool(p)for p in V['scripts'].values())==C['teachingPages']==141
assert set(V['scripts'])==set(C['pages'])
H=runpy.run_path(str(HERE/'build.py'))
assert C['words']==sum(H['words'](p)for p in V['scripts'].values())
for m in S['modules']:
 authored={}
 for row in (HERE/(m['collection']+'.txt')).read_text().splitlines():
  page,text=row.split('|',1);authored[int(page)]=[x.strip()for x in text.split(' || ')]if text else []
 assert sorted(authored)==[p['page']for p in m['pages']]
 for page,blocks in authored.items():assert blocks==V['scripts'][str(m['id'])+':'+str(page)]
 if m['repositoryPdf']:assert hashlib.sha256((ROOT/m['repositoryPdf']).read_bytes()).hexdigest()==m['sourceSha256']
 for p in m['pages']:
  key=str(m['id'])+':'+str(p['page']);blocks=V['scripts'][key]
  assert bool(blocks)==(p['role']=='teaching'),key
  assert C['pages'][key]['role']==p['role']
  for t in blocks:
   assert t.count('**')%2==0,key
   assert not re.search(r'[:;→]|\bneed not\b|\b(?:the|this) lecture\b|this slide|next slide|this (?:shows|illustrates|demonstrates)|the key takeaway|as you can see|from here|later experiments|the next step',t,re.I),key
   assert t.count('\\[')==t.count('\\]'),key
   for eq in re.findall(r'\\\[(.*?)\\\]',t):assert eq in V['mathSpeech'],key
# Anchors reflect each experiment's actual conditions, roles and findings.
facts={
 '6:2':['Tulving','mental time travel','episodic'],
 '6:4':['sensory','short-term','long-term','declarative','procedural','episodic','semantic'],
 '6:5':['1968','five to seven','15–20','control process','retrieved'],
 '6:7':['555-5100','Attention','short-term'],
 '6:11':['icon','echo','visual','auditory','sensory modality'],
 '6:14':['whole report','partial report','tone','after the display','Delayed'],
 '6:16':['4.5','12','3.3','four','one letter','delay'],
 '6:24':['Brown (1958)','1959','F Z L','45','42, 39, 36','3–18'],
 '6:25':['first','three to eighteen','relatively high','earlier trigrams'],
 '6:26':['third','eighteen','three','proactive'],
 '6:29':['interaction','trial position','recall'],
 '6:30':['decay','proactive','15–20'],
 '6:32':['retroactive','new phone number','old number'],
 '6:33':['proactive','past week','today','routine'],
 '6:37':['1956','Alvarez','Cavanagh','2004','change detection'],
 '6:42':['100 milliseconds','900-millisecond','2,000','three to four','conjunction'],
 '6:44':['radicals','incorrectly','complexity'],
 '6:45':['Ericsson','1980','79','running','Chase','Simon','1973'],
 '6:46':['meaningful','random','greatly reduced'],
 '9:2':['Baddeley','Hitch','1974','storage','manipulation'],
 '9:3':['43\\times6=258','3\\times6=18','24+1=25','tens'],
 '9:5':['phonological store','articulatory','visuospatial','central executive'],
 '9:8':['1964','E','B','F','sound','visual'],
 '9:10':['1975','1984','1980','Welsh','English','1.5–2'],
 '9:11':['suppression','word-length effect is reduced','similarity effect is also reduced','conversion'],
 '9:13':['Brooks','1968','noun','Pointing was easier','speaking'],
 '9:14':['F','inside','outside','Speaking was easier','pointing','IN and OUT'],
 '9:17':['Shepard','Metzler','1971','Picture-plane','Depth','linearly','angular'],
 '9:18':['Miyake','2000','updating','shifting','inhibition','homunculus'],
 '9:19':['2000','four chunks','sixteen words','amnesic','binds'],
 '9:20':['Vogel','2005','red','blue','100 milliseconds','900-millisecond','ERPs'],
 '9:21':['two targets','four targets','high-capacity','low-capacity','negative'],
 '9:22':['correlates positively','filtering efficiency','distractors'],
 '10:3':['Koffka','1935','Köhler','rectangle','diagonals','x=r'],
 '10:5':['Metcalfe','Wiebe','1987','fifteen seconds','warmth'],
 '10:6':['three of ten','seven dots','two cents','three cents','fifteen-cent','3(2+3)=15'],
 '10:8':['candle','tacks','empty matchboxes','twice'],
 '10:9':['pliers','weight','pendulum'],
 '10:11':['B-A-2C=127-21-2(3)=100','A+C=15+3=18','A-C=28-3=25'],
 '10:13':['one disk','larger disk','smaller one','operators'],
 '10:18':['free','third peg','middle peg','size rule'],
 '10:20':['sixty-four','thirty-two','same color','cannot'],
 '10:21':['blank','colored','black and pink','bread and butter','twice'],
 '10:22':['think-aloud','new thoughts','representational shift'],
 '11:3':['thirty-two','thirty men','thirty-two women','thirty marriages'],
 '11:5':['source','target','analogical transfer','marriages','domino'],
 '11:6':['Duncker','low-intensity','simultaneously','ten percent'],
 '11:9':['Gick','Holyoak','noticing','mapping','applying','thirty percent','seventy-five'],
 '11:12':['eighty-one','ten percent','surface'],
 '11:14':['sixty-nine','fragile','tissue'],
 '11:15':['thirty-three','sixty-nine','insufficient','surrounding'],
 '11:17':['analogical paradox','in vivo','natural','control'],
 '11:19':['1973','five seconds','actual game','random','chunks'],
 '11:20':['1982','professors','semester','surface','structural'],
 '11:21':['23 and 24','21 and 24','conservation of energy'],
 '11:23':['divergent','problem generation','problem formulation','implementation'],
 '12:3':['probably, but not definitely','representativeness','number','quality','black swan'],
 '12:6':['availability','distinctiveness','emotional salience','encoding','retrieval'],
 '12:7':['third position','three times','seventy'],
 '12:9':['Robert','2.2 million','120,000','base-rate'],
 '12:10':['seventy lawyers','thirty engineers','Jack','carpentry'],
 '12:11':['Linda','conjunction','eighty-two','subset'],
 '12:12':['forty-five','fifteen','sixty percent','sample size'],
 '12:13':['smaller hospital','variability'],
 '12:16':['Lord','1979','same article','myside'],
 '12:17':['2, 4, 6','intervals of two','increasing order'],
 '12:20':['one dollar','seven-out-of-one-hundred','0.10','0.07','denominator'],
 '12:22':['1999','100-1000=-900','1000-100=900','one life'],
 '12:23':['Tetlock','Kristel','Elson','Green','Lerner','2000','taboo','tragic'],
 '12:25':['taboo','much greater','tragic','similar','interaction','not-saved'],
 '12:26':['2007','settlers','refugees','students'],
 '12:27':['ninety-nine','one billion','ten years','apology'],
 '12:28':['moral absolutists','non-absolutists','right of return','Jerusalem'],
 '12:29':['anger','disgust','violence','opposite direction','symbolic reciprocity'],
 '12:31':['1,997','Farsi','Baron','Spranca','1997','fourteen','thirteen'],
 '12:32':['six conditions','forty billion','sanctions','government accepted'],
 '12:33':['nuclear energy','lower','highest','financial','anticipated anger'],
}
for key,terms in facts.items():
 text=' '.join(V['scripts'][key]).replace('**','').lower()
 for term in terms:assert term.lower()in text,(key,term)
# Every prior tracked source, transcript, bank, palette and unrelated course stays exact.
# Later authorized gradient assets are checked exactly in tests/studio-gradients.test.cjs.
allowed={'index.html','share.html','README.md','tests/psyc-transcript-preservation.cjs','tests/judgment.test.cjs','bme423/index.html','ling406/index.html','ling285/index.html','ling406/sw.js','tests/direct-teaching.test.cjs','ling406/tests/verify_v6.py',
 # LING406 Versions 7 and 10 were authorized separately and are pinned by their own verifiers.
 'ling406/README.md','ling406/app.js','ling406/tests/transcripts-v2.cjs','ling406/tests/transcripts-v3.cjs','ling406/tests/transcripts-v5.cjs','ling406/tests/transcripts-v6.cjs'}
for name,sha in json.loads((HERE/'preserved.json').read_text()).items():
 if name not in allowed:assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==sha,name
assets=['<link rel="stylesheet" href="bme423/vendor/katex/katex.min.css">','<link rel="stylesheet" href="psyc301-v6.css?v=psyc301-module2-v6">','<script src="bme423/vendor/katex/katex.min.js"></script>','<script src="psyc301-v6-data.js?v=psyc301-module2-v6"></script>','<script src="psyc301-v6.js?v=psyc301-module2-v6"></script>']
for name in ['index.html','share.html']:
 text=(ROOT/name).read_text().replace('<link rel="stylesheet" href="studio-gradients.css?v=studio-gradients-1" data-studio-gradient="psyc301">','')
 for asset in assets:assert text.count(asset)==1,(name,asset);text=text.replace(asset,'')
 assert text==subprocess.check_output(['git','show','1be9d5a:'+name],cwd=ROOT,text=True),name
print(f'PASS PSYC301 V6: five Module II collections, {C["sourcePages"]} source pages, {C["teachingPages"]} new instructional explanations, {C["words"]:,} words, source conditions/findings and math verified. Every earlier edition, source visual, archive, bank, palette and unrelated course is preserved.')
