"""Verify PSYC301 Version 20 coverage, read-aloud writing rules, source facts and preservation."""
import hashlib,json,re,runpy
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
H=runpy.run_path(str(HERE/'build.py'))
load=lambda p:json.loads((ROOT/p).read_text().split(' = ',1)[1].rstrip(';\n'))
V=load('psyc301-v20-data.js');V18=load('psyc301-v18-data.js');C=json.loads((HERE/'coverage.json').read_text())
P=json.loads((HERE/'pages.json').read_text())
assert V['scope']==V18['scope']==[6,9,10,11,12] and len(V['scripts'])==C['sourcePages']==148
assert sum(bool(b)for b in V['scripts'].values())==C['teachingPages']==141
assert C['words']==sum(H['words'](b)for b in V['scripts'].values())
# Every page earlier editions cover is present, in source order, and rewritten.
assert list(V['scripts'])==list(V18['scripts'])
# The writing check must reject the shorthand and framing the user ruled out.
for bad in ['One neuron. Vector in, one number out.','A neuron takes a vector of inputs today. This shows that it works.','Memory fades fast; it is brief and limited.','**Results** The effect held in every condition. It was large.','Note that recall fell sharply after the delay. It fell further later.','Recall rose sharply in the second phase — then it fell back again.','The slide lists four kinds of memory store. Each holds information briefly.','The key point is that rehearsal helps memory. It keeps items active.']:
 assert H['problems'](bad,False),bad
errors=[]
for m in P['modules']:
 authored=H['parse'](f"module-{m['id']:02d}.txt")
 for p in m['pages']:
  key=f"{m['id']}:{p['page']}";blocks=V['scripts'][key]
  assert blocks==authored[p['page']] and bool(blocks)==bool(V18['scripts'][key]),key
  if blocks:assert blocks!=V18['scripts'][key],('not rewritten from V18',key)
  for b in blocks:
   for t,child in [(b['text'],False),*[(c,True)for c in b['children']]]:
    errors+=[f'{key} {e}' for e in H['problems'](t,child)]
assert not errors,'\n'.join(errors)
assert V['scripts']['6:22']==[],'Case-video link page stays empty'
facts={
 '6:2':['Tulving','mental time travel'],'6:5':['1968','five to seven','15 to 20'],
 '6:16':['4.5 out of 12','3.3 out of 4','82%','1 out of 4','25%'],'6:18':['82%','36%'],
 '6:24':['Brown (1958)','Peterson and Peterson (1959)','F Z L 45','3 to 18'],
 '6:30':['decay','proactive interference','15 to 20 seconds'],'6:42':['100 milliseconds','900-millisecond','three to four','conjunction'],
 '6:43':['4.4','2.8','2.0','1.6'],'6:45':['Ericsson','79','Chase and Simon (1973)'],
 '9:3':['43\\times6=258','3\\times6=18'],'9:8':['Conrad (1964)','E','B','F'],'9:10':['1975, 1984','Ellis and Hennelly (1980)','1.5 to 2.0'],
 '9:13':['Brooks (1968)','pointing was easier'],'9:14':['speaking was easier'],'9:17':['Shepard and Metzler (1971)','180 degrees','4.5 seconds'],
 '9:18':['Miyake','updating','shifting','inhibition','homunculus'],'9:19':['2000','4','16 words','amnesic'],'9:21':['Two items with two distractors','high-capacity','low-capacity'],
 '10:3':['Koffka (1935)','x=r'],'10:6':['3(2+3)=15'],'10:7':['big jump from 3 to 7','gradual increase'],'10:8':['twice as likely'],
 '10:11':['B-A-2C=127-21-2(3)=100','A+C=15+3=18','A-C=28-3=25'],'10:14':['64 disks','a trillion years'],'10:21':['bread','butter','twice as fast'],
 '11:3':['32 bachelors','30 men and 32 women','30 marriages'],'11:6':['Only 10%'],'11:9':['30%','75%','Gick and Holyoak'],
 '11:12':['Eighty-one percent','10%'],'11:14':['Sixty-nine percent'],'11:15':['33%'],'11:19':['Chase and Simon (1973)','5 seconds'],'11:20':['Chi and colleagues (1982)','24 physics problems'],
 '12:7':['Seventy percent','three times'],'12:8':['920','botulism','41%'],'12:9':['2.2 million','120,000'],'12:10':['70 lawyers and 30 engineers'],
 '12:11':['Eighty-two percent','conjunction rule'],'12:12':['45 babies','15 babies','ifty-six percent'],'12:13':['smaller hospital'],
 '12:16':['Lord and coworkers (1979)','myside'],'12:17':['2, 4, 6','increasing order of magnitude'],'12:20':['1/10','7/100'],
 '12:22':['Ritov and Baron (1999)','63%','Twelve percent'],'12:25':['5.4','2.5'],'12:26':['601','535','719'],
 '12:28':['46%','54%'],'12:31':['1,997','14%','13%','Baron and Spranca'],'12:32':['$40 billion','sanctions'],'12:33':['SV','noSV','lowered','raised'],
}
for key,terms in facts.items():
 text=' '.join(H['paragraphs'](V['scripts'][key])).replace('**','')
 missing=[t for t in terms if t not in text];assert not missing,(key,missing)
# Earlier editions and studio data stay byte-for-byte as they were when Version 20 was added.
KEPT={
 'psyc301-v6-data.js':'3c751a5d05a6fed16eb16b18b485427c6382103951ec4464844380e774dd4dff',
 'psyc301-v6.js':'ef2183c4d0fcba164b9c530c7eb9daee8a0e1be1abefb52e1b25b2c7270a40f8',
 'psyc301-v6.css':'372d2df6beca09d4807741708e60ecbb268e0aa71d9350cd44c76418205b221c',
 'psyc301-v10-data.js':'181ef950d361c428969349dcaf6da0e16a2f02c02141ea16efd719ca62875eff',
 'psyc301-v10.js':'a4a9973d098910e4eac08d35d2b3e7015fd78e11b6ed8b98bbbfc69e40f1d12a',
 'psyc301-v10.css':'84461cfd3a801fdbadec18c494a2e4152dcd357d5760ae3c3cab0b06901b4b5c',
 'psyc301-v12-data.js':'e733ccec6064e7c68169264ef5c10b958afc9eb3bb3df910556cc9eb053871df',
 'psyc301-v12.js':'654c1b18709818be2a25916151cd77adf572a774267b9e047292c79f717dc3c2',
 'psyc301-v14-data.js':'686fe836d251513ed9d5868c8a1ee64417511eafa4bf7546fed2d4fd34670a47',
 'psyc301-v14.js':'1292ca713d1d0090b4ead1d84863e31c07ec088cacf19dc547ce75a520240a2a',
 'psyc301-v16-data.js':'ad36d4403d2d022257c09d649c4abea2dec56c2c2140fd0d9e3588f4552eb8b7',
 'psyc301-v16.js':'63d1eabda74b15d2103010e0aa4c04f641ea412cda74499d1af15de7e49ddab8',
 'psyc301-v18-data.js':'159824e57d0e8f3ad17403406d7b9ae1aaee51a20a4fb5694c0a3ffbdf70b62a',
 'psyc301-v18.js':'3f4d3d2d65ea6d0e46b59a7bdb236d835a8f5858c1ddf7176ec5badceeeb3090',
 'module2-data.js':'849e09d7a5de2ac985d3cbbb0d99749ef1f9cde2d7ef97214ade688041523133',
 'module2-workspace.js':'1d40f498dcbce69acf5c9b00e09512234519f2d5984934a84cf01ba4bff2dfda',
}
for name,digest in KEPT.items():assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest,name
tags=['<script src="psyc301-v20-data.js?v=psyc301-module2-v20"></script>','<script src="psyc301-v20.js?v=psyc301-module2-v20"></script>']
for name in ['index.html','share.html']:
 text=(ROOT/name).read_text()
 for tag in tags:assert text.count(tag)==1,(name,tag)
 assert text.index('psyc301-v18.js')<text.index(tags[0])<text.index(tags[1]),name
print(f"PASS PSYC301 V20 (average {C['averageWords']} words per teaching page): {C['sourcePages']} Module II source pages in order, all {C['teachingPages']} teaching pages rewritten as natural teaching transcripts, {C['words']:,} words, writing rules and source facts verified, earlier editions unchanged.")
