"""Build the additive Version 14 balanced teaching-notes edition for individual collections."""
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
# Authored prose excludes presentation narration, illustrative and attention-directing
# framing, arrow chains, colons/semicolons and the user-rejected wording.
BANNED=re.compile(r'[:;→]|\bneed not\b|\blawful\b|\b(?:slide|slides|the lecture|this lecture|in this lecture|the professor|this illustrates|this demonstrates|this shows|shows that|shows how|illustrates|illustrating|demonstrates|demonstrating|the key takeaway|the key point|later experiments|as you can see|the next step|from here|this sets up|the next topic|turns to|we now|let.s|moving on|next we|remember that|earlier we|later we|attention now|our focus|this helps us understand)\b',re.I)
# Study Studio length guidance for this edition: about 225 words per page on
# average, with 350 words as the ceiling for especially complex pages.
MAX_WORDS=350
def build():
 d=load('data.js','window.LING406 = ');v3=load('transcripts-v3-data.js','window.LING406_TRANSCRIPTS_V3 = ');v6=load('transcripts-v6-data.js','window.LING406_TRANSCRIPTS_V6 = ');v12=load('transcripts-v12-data.js','window.LING406_TRANSCRIPTS_V12 = ')
 scripts={};coverage={}
 for m in d['modules']:
  authored=parse(m['id']+'.txt');assert set(authored)==set(range(1,len(m['sections'])+1)),m['id']
  for sid in m['sections']:
   s=next(s for s in d['sections'] if s['id']==sid);scripts[sid]=authored[s['page']]
   coverage[sid]={'source':m['source'],'page':s['page'],'authorFile':'version14/'+m['id']+'.txt'}
 custom=parse('review.txt')
 for r in v3['review']:
  scripts[r['id']]=copy.deepcopy(custom[r['page']] if r['page'] in custom else scripts[r['lectureSection']])
  coverage[r['id']]={'source':'review','page':r['page'],'lectureSection':r['lectureSection'],'authorFile':'version14/review.txt' if r['page'] in custom else coverage[r['lectureSection']]['authorFile']}
 assert set(scripts)==set(v6['scripts']) and len(scripts)==284
 for sid,blocks in scripts.items():
  assert bool(blocks)==bool(v6['scripts'][sid]),sid
  if blocks:
   assert any(b['children'] for b in blocks),('notes need nested bullets',sid)
   assert size(blocks)['words']<=MAX_WORDS,('over the page ceiling',sid,size(blocks)['words'])
  for p in paragraphs(blocks):
   assert p,sid
   assert not BANNED.search(p),(sid,BANNED.search(p).group(),p[:80])
   assert p.count('**')%2==0,sid
 math_speech=dict(v6['mathSpeech'])
 for sid,blocks in scripts.items():
  for p in paragraphs(blocks):
   for math in re.findall(r'\\\[(.*?)\\\]',p):assert math in math_speech,(sid,math)
 payload={'revision':'ling406-transcripts-v14','scripts':scripts,'mathSpeech':math_speech}
 (ROOT/'transcripts-v14-data.js').write_text('window.LING406_TRANSCRIPTS_V14 = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n')
 for sid,blocks in scripts.items():
  coverage[sid].update({'role':'teaching' if blocks else 'title-or-logistics','version12':size(v12['scripts'][sid]),'version14':size(blocks),'rewrittenFromVersion12':blocks!=v12['scripts'][sid],'bullets':len(blocks),'subBullets':sum(len(b['children'])for b in blocks)})
 report={'version':14,'baselineVersion':12,'baselineSHA256':hashlib.sha256((ROOT/'transcripts-v12-data.js').read_bytes()).hexdigest(),'lecturePages':229,'reviewPages':55,'teachingPages':sum(bool(x) for x in scripts.values()),'words':sum(size(s)['words']for s in scripts.values())}
 report['averageWords']=round(report['words']/report['teachingPages']);report['maxWords']=max(size(s)['words']for s in scripts.values())
 report['rewrittenPages']=sum(1 for c in coverage.values() if c.get('rewrittenFromVersion12'))
 report['method']='Version 12 notes rewritten under the Study Studio balanced-length guidance (about 100-150 words for simple pages, 175-250 for standard concepts, 250-300 for experiments and detailed mechanisms, and up to 350 only for especially complex pages, averaging about 225). Repeated restatements and closing summaries that add no new fact are removed, long sentences are split into shorter spoken sentences, and every source term, value, study, stimulus and figure detail stays. Notes keep bolded main bullets of connected sentences with nested sub-bullets, direct explanations, and no presentation narration, arrow chains, colons or semicolons, added topics, padding of titles or logistics, or references to other pages. Matching review pages reuse the lecture notes, and review page 54 is authored separately.'
 report['scripts']=coverage
 (HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print({k:report[k]for k in ['lecturePages','reviewPages','teachingPages','words','rewrittenPages','averageWords','maxWords']})
if __name__=='__main__':build()
