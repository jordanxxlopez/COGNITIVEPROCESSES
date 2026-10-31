"""Assemble an additional Module II teaching-notes edition (Versions 7–18).

Usage: python3 ling285/authoring/build_transcripts_notes.py 7
Each edition is authored page by page in authoring/transcripts-vN/lectureNN.txt
as `page|text >> sub-bullet || next bullet >> sub-bullet`, and is written to
transcripts-vN.json beside the earlier editions, which stay unchanged.
"""
from pathlib import Path
import copy
import hashlib
import json
import re
import statistics
import sys

ROOT=Path(__file__).resolve().parents[1];A=ROOT/'authoring'
LECTURES=['lecture11','lecture12','lecture13','lecture14','lecture15']
# One entry per edition, mirroring the matching PSYC301 and LING406 editions.
EDITIONS={
 7:{'label':'Version 7 · Teaching notes (bulleted)','guidance':'Study Studio Prompt 1 (updated). Bolded main bullets of connected read-aloud sentences with nested sub-bullets for each mechanism step, demonstration and figure value. Key terms defined where they appear.','max':None},
 10:{'label':'Version 10 · Direct teaching notes','guidance':'Study Studio Prompt 1 with direct explanations. Affirmative teaching replaces unnecessary caveats, not-statements and limits the source does not state. Limits the source itself states are kept.','max':None},
 12:{'label':'Version 12 · Detailed teaching notes','guidance':'Study Studio Prompt 1 with corrected word counts. About 150–250 words on simple pages, 250–350 on standard concept pages and 300–400 on demonstration and mechanism pages.','max':500},
 14:{'label':'Version 14 · Balanced teaching notes','guidance':'Study Studio Prompt 1 with a 225-word average and a 350-word maximum. Restatements and closing summaries that add no new fact are removed and long sentences are split.','max':350},
 16:{'label':'Version 16 · Natural teaching notes','guidance':'Study Studio natural-experiments guidance with a 225-word average and a strict 300-word maximum. Demonstrations are explained in connected sentences without report-style labels.','max':300},
 18:{'label':'Version 18 · Teaching scripts','guidance':'Study Studio Prompt 2 with no word limit. Figures are explained by their scientific meaning instead of a walkthrough of panels, axes or colors, only the numbers that define conditions or carry key results are kept, and wording avoids crowded or tongue-twisting phrases.','max':None},
}
# Authored prose excludes presentation narration, illustrative framing, arrow chains,
# colons/semicolons and the user-rejected wording.
BANNED=re.compile(r'[:;→]|\bneed not\b|\blawful\b|\b(?:slide|slides|the lecture|this lecture|in this lecture|the professor|this illustrates|this demonstrates|this shows|shows that|shows how|illustrates|illustrating|demonstrates|demonstrating|the key takeaway|the key point|as you can see|the next step|from here|this sets up|the next topic|turns to|we now|let.s|moving on|next we|remember that|earlier we|later we|attention now|our focus|this helps us understand)\b',re.I)
# Experiments and demonstrations are taught in connected sentences, without report labels.
LABELS=re.compile(r'\*\*(?:setup|set-up|participants|procedure|observations?|results?|interpretation|conclusions?|findings?|explanation|hypothesis)\*\*|\b(?:the|The) (?:setup|procedure|observation|interpretation|conclusion|explanation|hypothesis) (?:was|is|worked|compared|used)\b')

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def paragraphs(blocks):return [p for b in blocks for p in [b['text'],*b['children']]]
def words(blocks):return len(' '.join(paragraphs(blocks)).replace('**','').split())
def parse(path):
 rows={}
 for row in path.read_text().splitlines():
  if not row.strip():continue
  page,text=row.split('|',1);page=int(page);assert page not in rows,(path.name,page)
  blocks=[]
  if text.startswith('='):
   # The same source slide repeated in another deck reuses this edition's text.
   lec,ref=text[1:].split(':');rows[page]=('alias',lec,int(ref));continue
  if text.strip():
   for part in text.split(' || '):
    head,*children=part.split(' >> ');blocks.append({'text':head.strip(),'children':[c.strip() for c in children]})
  rows[page]=blocks
 return rows

def build(version):
 spec=EDITIONS[version];folder=A/f'transcripts-v{version}'
 data=json.loads((ROOT/'data.json').read_text());v4=json.loads((ROOT/'transcripts-v4.json').read_text())
 collections={};counts=[]
 for lec in LECTURES:
  source=next(c for c in data['collections'] if c['id']==lec);base=v4['collections'][lec]
  authored=parse(folder/f'{lec}.txt')
  for page,row in authored.items():
   if isinstance(row,tuple):
    target=parse(folder/f'{row[1]}.txt')[row[2]]
    assert not isinstance(target,tuple) and target,(version,lec,page,'alias must point at authored text')
    v4src=next(s for s in v4['collections'][row[1]]['sections'] if int(s['page'])==row[2])['teaching']
    v4dst=next(s for s in base['sections'] if int(s['page'])==page)['teaching']
    assert v4src==v4dst,(version,lec,page,'aliases join only identical source slides')
    authored[page]=copy.deepcopy(target)
  assert sorted(authored)==[int(s['page']) for s in source['sections']],(version,lec,'pages must match the source deck in order')
  sections=[]
  for s,b in zip(source['sections'],base['sections']):
   assert s['id']==b['id'];page=int(s['page']);blocks=authored[page]
   assert bool(blocks)==bool(b['teaching']),(version,s['id'],'title, blank and prompt-only pages stay empty')
   if blocks:
    assert any(x['children'] for x in blocks),(version,s['id'],'notes need nested bullets')
    if spec['max']:assert words(blocks)<=spec['max'],(version,s['id'],words(blocks))
    counts.append(words(blocks))
   for p in paragraphs(blocks):
    assert p,(version,s['id'])
    assert not BANNED.search(p),(version,s['id'],BANNED.search(p).group(),p[:80])
    assert not LABELS.search(p),(version,s['id'],LABELS.search(p).group(),p[:80])
    assert p.count('**')%2==0,(version,s['id'],'unbalanced bold')
   sections.append({'id':s['id'],'page':b['page'],'title':b['title'],'kind':b['kind'],'teaching':blocks})
  collections[lec]={'title':base['title'],'sections':sections}
 payload={'id':f'v{version}','label':spec['label'],'revision':f'2026-10-31-transcripts-v{version}','baseDataSha256':sha(ROOT/'data.json'),
  'collections':collections,'visualPresentation':copy.deepcopy(v4['visualPresentation']),'references':copy.deepcopy(v4['references']),
  'writingReference':'PSYC301 Module II and LING406 Version '+str(version),'guidance':spec['guidance'],
  'metrics':{'instructionalPages':len(counts),'words':sum(counts),'averageWords':round(sum(counts)/len(counts)),'medianWords':statistics.median(counts),'maximumWords':max(counts)}}
 (ROOT/f'transcripts-v{version}.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
 print(f'v{version}',payload['metrics'])
 return payload

if __name__=='__main__':
 for v in (sys.argv[1:] or EDITIONS):build(int(v))
