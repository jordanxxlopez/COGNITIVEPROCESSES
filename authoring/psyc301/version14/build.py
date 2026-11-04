"""Build the additive PSYC301 Module II Version 14 balanced teaching-notes edition."""
import json,re
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2];V6DIR=HERE.parent/'version6'
def paragraphs(blocks):return [p for b in blocks for p in [b['text'],*b['children']]]
def words(blocks):return len(re.sub(r'\*\*','',' '.join(paragraphs(blocks))).split())
def parse(name):
 rows={}
 for row in (HERE/name).read_text().splitlines():
  if not row.strip():continue
  page,text=row.split('|',1);page=int(page);assert page not in rows,(name,page)
  blocks=[]
  if text:
   for part in text.split(' || '):
    head,*children=part.split(' >> ');blocks.append({'text':head.strip(),'children':[c.strip()for c in children]})
  rows[page]=blocks
 return rows
# Teaching prose excludes presentation narration, illustrative framing, arrow chains,
# colons/semicolons and the user-rejected wording.
BANNED=re.compile(r'[:;→]|\bneed not\b|\blawful\b|\b(?:slide|slides|the lecture|this lecture|in this lecture|the professor|this illustrates|this demonstrates|this shows|shows that|shows how|illustrates|the key takeaway|the key point|later experiments|as you can see|the next step|from here|this sets up|the next topic|turns to|we now|let.s|moving on|next we|remember that|earlier we|later we|the lecture says|the lecture gives|the lecture describes|illustrating|demonstrates|demonstrating|attention now|our focus|this helps us understand)\b',re.I)
# Balanced length ceiling for this edition.
MAX_WORDS=350
def build():
 source=json.loads((V6DIR/'source-pages.json').read_text())
 v6=json.loads((ROOT/'psyc301-v6-data.js').read_text().split(' = ',1)[1].rstrip(';\n'))
 scripts={};coverage={}
 for m in source['modules']:
  rows=parse(m['collection']+'.txt')
  assert sorted(rows)==[p['page']for p in m['pages']],m['id']
  for page in m['pages']:
   key=str(m['id'])+':'+str(page['page']);blocks=rows[page['page']]
   assert bool(blocks)==(page['role']=='teaching'),key
   if blocks:
    assert any(b['children']for b in blocks),('notes need nested bullets',key)
    assert words(blocks)<=MAX_WORDS,('over the page ceiling',key,words(blocks))
   for p in paragraphs(blocks):
    assert p,key
    assert not BANNED.search(p),(key,BANNED.search(p).group(),p[:80])
    assert p.count('**')%2==0,key
    assert p.count('\\[')==p.count('\\]'),key
    for eq in re.findall(r'\\\[(.*?)\\\]',p):assert eq in v6['mathSpeech'],(key,eq)
   scripts[key]=blocks
   coverage[key]={'collection':m['collection'],'page':page['page'],'role':page['role'],'bullets':len(blocks),'subBullets':sum(len(b['children'])for b in blocks),'words':words(blocks),'authorFile':'authoring/psyc301/version14/'+m['collection']+'.txt'}
 payload={'version':14,'revision':'psyc301-module2-v14','scope':v6['scope'],'scripts':scripts,'mathSpeech':v6['mathSpeech']}
 (ROOT/'psyc301-v14-data.js').write_text('window.PSYC301_V14 = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n')
 report={'version':14,'averageWords':None,'scope':source['scope'],'sourcePages':len(scripts),'teachingPages':sum(bool(x)for x in scripts.values()),'words':sum(words(x)for x in scripts.values()),'guidelines':'Version 12 notes rewritten under the balanced Study Studio length guidance (about 100-150 words for simple pages, 175-250 for standard concepts, 250-300 for experiments and up to 350 only for especially complex pages). Repeated restatements and closing summaries that add no new fact are removed and long sentences are split for reading aloud, while every source term, value, study and figure detail stays. Study Studio teaching notes per source page, in source order. Bolded main bullets of connected read-aloud sentences with nested sub-bullets for mechanisms, experiment setup, observations and interpretation, and the values in instructional figures. Direct explanations without added caveats, presentation narration, arrow chains, colons or semicolons, or outside material. Title, divider and link-only pages remain visible without invented explanations. Earlier editions are not rewritten.','pages':coverage}
 (HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 report['averageWords']=round(report['words']/report['teachingPages']);(HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print({k:report[k]for k in ['sourcePages','teachingPages','words','averageWords']})
if __name__=='__main__':build()
