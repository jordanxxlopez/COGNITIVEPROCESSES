"""Verify PSYC301 Version 10 coverage, writing rules, source facts and preservation."""
import json,re,runpy,subprocess
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2];BASE='0cf7845'
H=runpy.run_path(str(HERE/'build.py'))
load=lambda p:json.loads((ROOT/p).read_text().split(' = ',1)[1].rstrip(';\n'))
V=load('psyc301-v10-data.js');V6=load('psyc301-v6-data.js');C=json.loads((HERE/'coverage.json').read_text())
S=json.loads((HERE.parent/'version6'/'source-pages.json').read_text())
assert V['scope']==V6['scope']==[6,9,10,11,12] and len(V['scripts'])==C['sourcePages']==148
assert sum(bool(b)for b in V['scripts'].values())==C['teachingPages']==141
assert C['words']==sum(H['words'](b)for b in V['scripts'].values())
for m in S['modules']:
 authored=H['parse'](m['collection']+'.txt')
 assert sorted(authored)==[p['page']for p in m['pages']]
 for p in m['pages']:
  key=f"{m['id']}:{p['page']}";blocks=V['scripts'][key]
  assert blocks==authored[p['page']] and bool(blocks)==(p['role']=='teaching'),key
  if blocks:assert any(b['children']for b in blocks),key
  for t in H['paragraphs'](blocks):
   assert not H['BANNED'].search(t),key
   for eq in re.findall(r'\\\[(.*?)\\\]',t):assert eq in V['mathSpeech'],key
assert V['scripts']['6:22']==[],'Case-video link page stays empty'
facts={
 '6:2':['Tulving','mental time travel'],'6:5':['1968','five to seven','15 to 20'],
 '6:16':['4.5 out of 12','3.3 out of 4','82%','1 out of 4','25%'],'6:18':['82%','0.1','39%','36%'],
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
 '12:7':['Seventy percent','three times'],'12:8':['920','botulism','83%'],'12:9':['2.2 million','120,000'],'12:10':['70 lawyers and 30 engineers'],
 '12:11':['Eighty-two percent','conjunction rule'],'12:12':['45 babies','15 babies','Fifty-six percent'],'12:13':['smaller hospital'],
 '12:16':['Lord and coworkers (1979)','myside'],'12:17':['2, 4, 6','increasing order of magnitude'],'12:20':['1/10','7/100'],
 '12:22':['Ritov and Baron (1999)','63%','Twelve percent'],'12:25':['5.4','2.5','3.7','3.8'],'12:26':['601','535','719'],
 '12:28':['46%','54%'],'12:31':['1,997','14%','13%','Baron and Spranca'],'12:32':['$40 billion','sanctions'],'12:33':['2.8','1.9','4.6'],
}
for key,terms in facts.items():
 text=' '.join(H['paragraphs'](V['scripts'][key])).replace('**','')
 missing=[t for t in terms if t not in text];assert not missing,(key,missing)
# Earlier editions, source data and entry pages stay exact apart from the V10 asset tags.
assert subprocess.check_output(['git','show',BASE+':psyc301-v6-data.js'],cwd=ROOT,text=True)==(ROOT/'psyc301-v6-data.js').read_text()
tags=['<link rel="stylesheet" href="psyc301-v10.css?v=psyc301-module2-v10">','<script src="psyc301-v10-data.js?v=psyc301-module2-v10"></script>','<script src="psyc301-v10.js?v=psyc301-module2-v10"></script>']
for name in ['index.html','share.html']:
 # The separately requested Version 12 adds only its own data and script tags.
 text=(ROOT/name).read_text().replace('<script src="psyc301-v12-data.js?v=psyc301-module2-v12"></script>','').replace('<script src="psyc301-v12.js?v=psyc301-module2-v12"></script>','')
 for tag in tags:assert text.count(tag)==1,(name,tag);text=text.replace(tag,'')
 assert text==subprocess.check_output(['git','show',BASE+':'+name],cwd=ROOT,text=True),name
for name in ['module2-data.js','module2-workspace.js','psyc301-v6.js','psyc301-v6.css','collection-slides.js','short-term-memory-v2.js']:
 assert (ROOT/name).read_text()==subprocess.check_output(['git','show',BASE+':'+name],cwd=ROOT,text=True),name
print(f"PASS PSYC301 V10: {C['sourcePages']} source pages in order, {C['teachingPages']} notes-style teaching pages, {C['words']:,} words, source facts verified, earlier editions and data unchanged.")
