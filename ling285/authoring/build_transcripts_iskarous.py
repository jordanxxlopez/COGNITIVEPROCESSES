"""Assemble the Iskarous teaching editions of Module II (Versions 20, 21 and 22).

Usage: python3 ling285/authoring/build_transcripts_iskarous.py [20 21 22]
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

# Version 20 follows the transcripts closely. Version 21 (Version B) keeps the same
# teaching but trims side stories, names, dates and jargon that are not tested.
# Version 22 (Version C) is written in the style of the Notes v3 PDFs, with reasoning in
# words instead of numbers and math, weighted by what he said he would test.
LABELS_BY_VERSION={20:'Iskarous · Professor teaching transcript',21:'Iskarous B · Focused professor teaching',22:'Iskarous C · Natural teaching notes'}
VERSION=20
LABEL=LABELS_BY_VERSION[VERSION]
GUIDANCE=('Written the way Professor Iskarous teaches the slides in class. Each idea is reasoned out in full, connected '
 'sentences that read aloud naturally, with his own examples and only the numbers that carry a result. No telegraphic '
 'fragments, shorthand or reference-sheet lists.')
GUIDANCE_B=('Version B keeps the same professor-style teaching but removes side stories, names, dates and jargon that '
 'are not tested, so each page stays on the concepts and the reasoning he expects in exam answers.')
GUIDANCE_C=('Version C follows the Notes v3 style. Every idea is explained in connected sentences that reason about '
 'what each part does, with patterns stated in words instead of numbers or calculations, and the fullest '
 'explanations go to the ideas he said he would test.')
# Version C also covers the Module I lecture decks, written fresh from the slides, their
# speaker notes and the Exam 1 key, so the whole course can be reviewed in one style.
MODULE1=['lecture01','lecture02','lecture03','lecture04','lecture05-06','lecture07','lecture08','lecture09','lecture10']
# The class transcript teaches two pages that the slides leave as bare prompts.
TAUGHT_PROMPTS={('lecture14',19),('lecture14',20)}
# Compressed shorthand the user rejected, such as "Vector in, one number out".
SHORTHAND=re.compile(r'\b\w+ in, [\w ]+ out\b|\b(?:Theory|Prediction|Setup|Result|Conclusion)\.\s',re.I)
# Version C also rejects headings disguised as bold fragments, stacked short sentences, dashes
# and equals signs, and numbers used as measurements or calculations instead of words.
BOLD_LABEL=re.compile(r'^\*\*(?:(?:\S+\s){0,3}\S+|[^*]{1,40},[^*]{1,30})\.\*\*(?:\s|$)')
STRICT=re.compile(r'[—–=×]|\b\d+(?:\.\d+)?\s*(?:Hz|hertz|%|percent|kHz)\b|\b\d{3,}\b|\b\d+\.\d+\b|\b(?:four|two|three) times (?:heavier|stiffer)\b|\bshows?\b|\bnote that\b',re.I)

def sentences(text):
 plain=text.replace('**','')
 return [s.strip() for s in re.split(r'(?<=[.!?])\s+(?=[A-Z“"(])',plain) if s.strip()]

def build():
 folder=A/f'transcripts-v{VERSION}'
 data=json.loads((ROOT/'data.json').read_text());v4=json.loads((ROOT/'transcripts-v4.json').read_text())
 collections={};counts=[];short=[]
 for lec in (MODULE1+LECTURES if VERSION>=22 else LECTURES):
  source=next(c for c in data['collections'] if c['id']==lec)
  # Module I has no earlier transcript edition, so its page titles and kinds come from the course data.
  base=v4['collections'][lec] if lec in v4['collections'] else {'title':source['title'],'sections':[{k:x.get(k) for k in ('id','page','title','kind')}|{'teaching':x.get('teaching',[])} for x in source['sections']]}
  authored=parse(folder/f'{lec}.txt')
  assert sorted(authored)==[int(s['page']) for s in source['sections']],(lec,'pages must match the source deck in order')
  sections=[]
  for s,b in zip(source['sections'],base['sections']):
   assert s['id']==b['id'];page=int(s['page']);blocks=authored[page]
   assert not isinstance(blocks,tuple),(lec,page,'every page is written out in full')
   if lec in MODULE1:assert page!=1 or not blocks,(s['id'],'title pages stay empty')
   elif (lec,page) not in TAUGHT_PROMPTS:assert bool(blocks)==bool(b['teaching']),(s['id'],'title, blank and prompt-only pages stay empty')
   if blocks:
    assert any(x['children'] for x in blocks),(s['id'],'notes need nested bullets');counts.append(words(blocks))
   for p in paragraphs(blocks):
    assert p,s['id']
    assert not BANNED.search(p),(s['id'],BANNED.search(p).group(),p[:80])
    assert not LABELS.search(p),(s['id'],LABELS.search(p).group(),p[:80])
    assert not SHORTHAND.search(p),(s['id'],'shorthand',SHORTHAND.search(p).group())
    assert p.count('**')%2==0,(s['id'],'unbalanced bold')
    short+=[(s['id'],t) for t in sentences(p) if len(t.split())<5]
    if VERSION>=22:
     ss=sentences(p)
     assert not BOLD_LABEL.search(p),(s['id'],'bold label fragment',p[:60])
     assert not STRICT.search(p.replace('**','')),(s['id'],'numbers, symbols or banned wording',STRICT.search(p.replace('**','')).group(),p[:60])
     assert not (len(ss)>=3 and sum(len(t.split()) for t in ss)/len(ss)<8),(s['id'],'stacked short sentences',p[:60])
   if VERSION>=22:
    for x in blocks:
     assert 1<=len(sentences(x['text']))<=5,(s['id'],'bullets have one to five sentences',x['text'][:60])
     for c in x['children']:assert 1<=len(sentences(c))<=3,(s['id'],'sub-bullets have one to three sentences',c[:60])
   sections.append({'id':s['id'],'page':b['page'],'title':b['title'],'kind':b['kind'],'teaching':blocks})
  collections[lec]={'title':base['title'],'sections':sections}
 assert not short,('telegraphic sentences',short)
 payload={'id':f'v{VERSION}','label':LABEL,'revision':f'2026-11-03-transcripts-v{VERSION}','baseDataSha256':sha(ROOT/'data.json'),
  'collections':collections,'visualPresentation':copy.deepcopy(v4['visualPresentation']),'references':copy.deepcopy(v4['references']),
  'writingReference':'LING285 class transcripts, Oct 6 to Nov 3, and the Module II teaching notes','guidance':{21:GUIDANCE_B,22:GUIDANCE_C}.get(VERSION,GUIDANCE),
  'metrics':{'instructionalPages':len(counts),'words':sum(counts),'averageWords':round(sum(counts)/len(counts)),'medianWords':statistics.median(counts),'maximumWords':max(counts)}}
 (ROOT/f'transcripts-v{VERSION}.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
 print(f'v{VERSION}',payload['metrics'])

if __name__=='__main__':
 for v in (sys.argv[1:] or ['20','21','22']):
  VERSION=int(v);LABEL=LABELS_BY_VERSION[VERSION];build()
