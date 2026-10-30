"""Build the additive Version 7 notes-style teaching edition for individual collections."""
import copy,hashlib,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];HERE=Path(__file__).resolve().parent
def load(name,prefix):return json.loads((ROOT/name).read_text().removeprefix(prefix).rstrip(';\n'))
def paragraphs(blocks):return [p for b in blocks for p in [b['text'],*b['children']]]
def size(blocks):
 text=' '.join(paragraphs(blocks)).replace('**','');return {'words':len(text.split()),'characters':len(text)}
def parse(name):
 out={}
 for row in (HERE/name).read_text().splitlines():
  if not row.strip():continue
  p,text=row.split('|',1);p=int(p);assert p not in out,(name,p)
  blocks=[]
  if text:
   for part in text.split(' || '):
    text,*children=part.split(' >> ');blocks.append({'text':text.strip(),'children':[c.strip() for c in children]})
  out[p]=blocks
 return out
# Authored prose excludes presentation narration, illustrative framing,
# arrow chains, colons/semicolons and the user-rejected wording.
BANNED=re.compile(r'[:;→]|\bneed not\b|\blawful\b|\b(?:slide|slides|the lecture|this lecture|in this lecture|the professor|this illustrates|this demonstrates|this shows|shows that|illustrates|the key takeaway|the key point|later experiments|as you can see|the next step|from here|this sets up|the next topic|turns to|we now|let.s|moving on|next we|remember that|earlier we|later we)\b',re.I)
def build():
 d=load('data.js','window.LING406 = ');v3=load('transcripts-v3-data.js','window.LING406_TRANSCRIPTS_V3 = ');v6=load('transcripts-v6-data.js','window.LING406_TRANSCRIPTS_V6 = ')
 scripts={};coverage={}
 for m in d['modules']:
  authored=parse(m['id']+'.txt');assert set(authored)==set(range(1,len(m['sections'])+1)),m['id']
  for sid in m['sections']:
   s=next(s for s in d['sections'] if s['id']==sid);scripts[sid]=authored[s['page']]
   coverage[sid]={'source':m['source'],'page':s['page'],'authorFile':'version7/'+m['id']+'.txt'}
 custom=parse('review.txt')
 for r in v3['review']:
  scripts[r['id']]=copy.deepcopy(custom[r['page']] if r['page'] in custom else scripts[r['lectureSection']])
  coverage[r['id']]={'source':'review','page':r['page'],'lectureSection':r['lectureSection'],'authorFile':'version7/review.txt' if r['page'] in custom else coverage[r['lectureSection']]['authorFile']}
 assert set(scripts)==set(v6['scripts']) and len(scripts)==284
 for sid,blocks in scripts.items():
  assert bool(blocks)==bool(v6['scripts'][sid]),sid
  if blocks:
   assert blocks!=v6['scripts'][sid],sid
   assert any(b['children'] for b in blocks),('notes need nested bullets',sid)
   assert size(blocks)['words']>=size(v6['scripts'][sid])['words'],('shorter than V6',sid,size(blocks)['words'],size(v6['scripts'][sid])['words'])
  for p in paragraphs(blocks):
   assert p,sid
   assert not BANNED.search(p),(sid,BANNED.search(p).group(),p[:80])
   assert p.count('**')%2==0,sid
 math_speech=dict(v6['mathSpeech'])
 for sid,blocks in scripts.items():
  for p in paragraphs(blocks):
   for math in re.findall(r'\\\[(.*?)\\\]',p):assert math in math_speech,(sid,math)
 payload={'revision':'ling406-transcripts-v7','scripts':scripts,'mathSpeech':math_speech}
 (ROOT/'transcripts-v7-data.js').write_text('window.LING406_TRANSCRIPTS_V7 = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n')
 for sid,blocks in scripts.items():
  coverage[sid].update({'role':'teaching' if blocks else 'title-or-logistics','version6':size(v6['scripts'][sid]),'version7':size(blocks),'bullets':len(blocks),'subBullets':sum(len(b['children'])for b in blocks)})
 report={'version':7,'baselineVersion':6,'baselineSHA256':hashlib.sha256((ROOT/'transcripts-v6-data.js').read_bytes()).hexdigest(),'lecturePages':229,'reviewPages':55,'teachingPages':sum(bool(x) for x in scripts.values()),'words':sum(size(s)['words']for s in scripts.values()),'method':'Page-specific authored teaching notes following the Study Studio note instructions. Each instructional page is taught in source order as bolded main bullets of connected spoken sentences with nested sub-bullets for mechanisms, experiment setup, observations and interpretation, and the values in instructional figures. No presentation narration, arrow chains, colons or semicolons, added topics, padding of titles or logistics, or references to other pages. Matching review pages reuse the lecture notes, and review page 54 is authored separately.','scripts':coverage}
 (HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print({k:report[k]for k in ['lecturePages','reviewPages','teachingPages','words']})
if __name__=='__main__':build()
