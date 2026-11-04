"""Build an additive, explicitly authored plain-language teaching edition."""
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
  p,text=row.split('|',1);p=int(p);assert p not in out
  blocks=[]
  if text:
   for part in text.split(' || '):
    text,*children=part.split(' >> ');blocks.append({'text':text.strip(),'children':[c.strip() for c in children]})
  out[p]=blocks
 return out
def build():
 d=load('data.js','window.LING406 = ');v3=load('transcripts-v3-data.js','window.LING406_TRANSCRIPTS_V3 = ');v4=load('transcripts-v4-data.js','window.LING406_TRANSCRIPTS_V4 = ')
 scripts={};coverage={}
 for m in d['modules']:
  authored=parse(m['id']+'.txt');assert set(authored)==set(range(1,len(m['sections'])+1)),m['id']
  for sid in m['sections']:
   s=next(s for s in d['sections'] if s['id']==sid);scripts[sid]=authored[s['page']]
   coverage[sid]={'source':m['source'],'page':s['page'],'authorFile':'version5/'+m['id']+'.txt'}
 custom=parse('review.txt')
 for r in v3['review']:
  scripts[r['id']]=copy.deepcopy(custom[r['page']] if r['page'] in custom else scripts[r['lectureSection']])
  coverage[r['id']]={'source':'review','page':r['page'],'lectureSection':r['lectureSection'],'authorFile':'version5/review.txt' if r['page'] in custom else coverage[r['lectureSection']]['authorFile']}
 assert set(scripts)==set(v4['scripts']) and len(scripts)==284
 banned=re.compile(r'[:;]|\bneed not\b|\blawful\b|\b(?:slide|slides|the lecture|this lecture)\b|\b(?:this shows|this illustrates|this demonstrates|the key takeaway|as you can see|later experiments|from here|this sets up|the next topic)\b',re.I)
 for sid,blocks in scripts.items():
  assert bool(blocks)==bool(v4['scripts'][sid]),sid
  assert not blocks or blocks!=v4['scripts'][sid],sid
  for p in paragraphs(blocks):
   assert not banned.search(p),(sid,banned.search(p).group())
   assert p.count('**')%2==0,sid
  coverage[sid].update({'role':'teaching' if blocks else 'title-or-logistics','version4':size(v4['scripts'][sid]),'version5':size(blocks),'blocks':len(blocks),'paragraphs':len(paragraphs(blocks))})
 math_speech={
  r'\frac{f(\mathrm{pretty})}{f(\mathrm{pre})}\gg\frac{f(\mathrm{tyba})}{f(\mathrm{ty})}':'the frequency of pretty divided by the frequency of pre is much greater than the frequency of tyba divided by the frequency of ty',
  r'\frac{2}{2}=1':'two divided by two equals one',
  r'\frac{2}{4}=0.5':'two divided by four equals zero point five',
 }
 payload={'revision':'ling406-transcripts-v5','scripts':scripts,'mathSpeech':math_speech}
 (ROOT/'transcripts-v5-data.js').write_text('window.LING406_TRANSCRIPTS_V5 = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n')
 report={'version':5,'baselineVersion':4,'baselineSHA256':hashlib.sha256((ROOT/'transcripts-v4-data.js').read_bytes()).hexdigest(),'lecturePages':229,'reviewPages':55,'teachingPages':sum(bool(x) for x in scripts.values()),'words':sum(size(s)['words']for s in scripts.values()),'method':'Page-specific authored rewrites. Preserve source terminology, tasks, conditions, observations, qualifications and values. Reuse matching review content with a separately authored review page 54. No padding of titles or logistics.','scripts':coverage}
 (HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print({k:report[k]for k in ['lecturePages','reviewPages','teachingPages','words']})
if __name__=='__main__':build()
