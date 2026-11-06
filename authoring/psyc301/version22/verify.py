"""Verify additive V22 coverage, citation policy and preserved earlier material."""
from pathlib import Path
import json,hashlib,runpy,re
H=Path(__file__).resolve().parent;R=H.parents[2];B=runpy.run_path(str(H/'build.py'))
def load(n):return json.loads((R/n).read_text().split(' = ',1)[1].rstrip(';\n'))
a=load('psyc301-v21-data.js');v=load('psyc301-v22-data.js')
assert v['version']==22 and v['scope']==a['scope']==[6,9,10,11,12,13]
assert list(v['scripts'])==list(a['scripts'])
assert len(v['scripts'])==176 and sum(bool(x)for x in v['scripts'].values())==167
for key,blocks in v['scripts'].items():
 assert bool(blocks)==bool(a['scripts'][key]),key
 for block in blocks:
  for text,child in [(block['text'],False),*[(x,True)for x in block['children']]]:assert not B['problems'](text,child),(key,text,B['problems'](text,child))
for text in [
 'In an experiment by Vogel and colleagues (2005), participants retained relevant items and ignored distractors. Their responses distinguished storage from filtering.',
 'Baddeley (2000) added the episodic buffer to working memory. It combines information from several sources.',
 'Baddeley and colleagues (1975, 1984) compared memory for short and long words. Participants recalled more short words.'
]:assert not B['problems'](text,False),B['problems'](text,False)
for text in ['An experiment found 82% correct answers. The display disappeared after a brief interval.','Baddeley added the episodic buffer in 2000. It combines information from several sources.','**Results.** Participants retained the items in memory for the test.','The lecture says the buffer combines information. Participants performed a memory task.']:
 assert B['problems'](text,False),text
for name,digest in json.loads((H/'preserved.json').read_text()).items():assert hashlib.sha256((R/name).read_bytes()).hexdigest()==digest,name
for name in ['index.html','share.html']:
 s=(R/name).read_text();assert s.index('psyc301-v21.js?')<s.index('psyc301-v22-data.js?')<s.index('psyc301-v22.js?');assert 'psyc301-v22.css?' in s
ui=(R/'psyc301-v22.js').read_text();assert "state.explanationVersions[id]='22'" in ui and 'psyc-v22-follow' in ui
assert 'Baddeley (2000)' in re.sub(r'\*\*','', ' '.join(B['paragraphs'](v['scripts']['9:19'])))
print('PASS Version22:176 source pages,167 teaching pages; source-year citations allowed, other V21 style gates retained; earlier files unchanged.')
