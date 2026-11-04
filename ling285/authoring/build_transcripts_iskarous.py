"""Assemble the Iskarous teaching edition of Module II (Version 20).

Usage: python3 ling285/authoring/build_transcripts_iskarous.py
Pages are authored in authoring/transcripts-v20/lectureNN.txt in the same
`page|text >> sub-bullet || next bullet >> sub-bullet` format as Versions 7–18.
The text follows the class transcripts for Oct 6 to Nov 3: his reasoning and
examples, few numbers, and full connected sentences that read aloud naturally.
"""
from pathlib import Path
import copy
import json
import re
import statistics
import sys

sys.path.insert(0,str(Path(__file__).resolve().parent))
from build_transcripts_notes import ROOT,A,LECTURES,BANNED,LABELS,sha,paragraphs,words,parse

VERSION=20
LABEL='Iskarous · Professor teaching transcript'
GUIDANCE=('Written the way Professor Iskarous teaches the slides in class. Each idea is reasoned out in full, connected '
 'sentences that read aloud naturally, with his own examples and only the numbers that carry a result. No telegraphic '
 'fragments, shorthand or reference-sheet lists.')
# The class transcript teaches two pages that the slides leave as bare prompts.
TAUGHT_PROMPTS={('lecture14',19),('lecture14',20)}
# Compressed shorthand the user rejected, such as "Vector in, one number out".
SHORTHAND=re.compile(r'\b\w+ in, [\w ]+ out\b|\b(?:Theory|Prediction|Setup|Result|Conclusion)\.\s',re.I)

def sentences(text):
 plain=text.replace('**','')
 return [s.strip() for s in re.split(r'(?<=[.!?])\s+(?=[A-Z“"(])',plain) if s.strip()]

def build():
 folder=A/f'transcripts-v{VERSION}'
 data=json.loads((ROOT/'data.json').read_text());v4=json.loads((ROOT/'transcripts-v4.json').read_text())
 collections={};counts=[];short=[]
 for lec in LECTURES:
  source=next(c for c in data['collections'] if c['id']==lec);base=v4['collections'][lec]
  authored=parse(folder/f'{lec}.txt')
  assert sorted(authored)==[int(s['page']) for s in source['sections']],(lec,'pages must match the source deck in order')
  sections=[]
  for s,b in zip(source['sections'],base['sections']):
   assert s['id']==b['id'];page=int(s['page']);blocks=authored[page]
   assert not isinstance(blocks,tuple),(lec,page,'every page is written out in full')
   if (lec,page) not in TAUGHT_PROMPTS:assert bool(blocks)==bool(b['teaching']),(s['id'],'title, blank and prompt-only pages stay empty')
   if blocks:
    assert any(x['children'] for x in blocks),(s['id'],'notes need nested bullets');counts.append(words(blocks))
   for p in paragraphs(blocks):
    assert p,s['id']
    assert not BANNED.search(p),(s['id'],BANNED.search(p).group(),p[:80])
    assert not LABELS.search(p),(s['id'],LABELS.search(p).group(),p[:80])
    assert not SHORTHAND.search(p),(s['id'],'shorthand',SHORTHAND.search(p).group())
    assert p.count('**')%2==0,(s['id'],'unbalanced bold')
    short+=[(s['id'],t) for t in sentences(p) if len(t.split())<5]
   sections.append({'id':s['id'],'page':b['page'],'title':b['title'],'kind':b['kind'],'teaching':blocks})
  collections[lec]={'title':base['title'],'sections':sections}
 assert not short,('telegraphic sentences',short)
 payload={'id':f'v{VERSION}','label':LABEL,'revision':f'2026-11-03-transcripts-v{VERSION}','baseDataSha256':sha(ROOT/'data.json'),
  'collections':collections,'visualPresentation':copy.deepcopy(v4['visualPresentation']),'references':copy.deepcopy(v4['references']),
  'writingReference':'LING285 class transcripts, Oct 6 to Nov 3, and the Module II teaching notes','guidance':GUIDANCE,
  'metrics':{'instructionalPages':len(counts),'words':sum(counts),'averageWords':round(sum(counts)/len(counts)),'medianWords':statistics.median(counts),'maximumWords':max(counts)}}
 (ROOT/f'transcripts-v{VERSION}.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
 print(f'v{VERSION}',payload['metrics'])

if __name__=='__main__':build()
