"""Build the additive PSYC301 Module II Version 20 natural teaching-transcript edition."""
import json,re
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
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
# Prose with the equations set aside and bold markers removed, so the rules see only spoken text.
def spoken(text):return re.sub(r'(\b[A-Z][a-z]+ [A-Z])\.(?= [A-Z][a-z])',r'\1',re.sub(r'\\\[.*?\\\]','the equation',text).replace('**',''))
def sentences(text):
 # A displayed equation stands between sentences, so it also ends the sentence before it.
 parts=re.split(r'\\\[.*?\\\]',text)
 return [s for part in parts for s in re.split(r'(?<=[.!?])[”’"\')]*\s+(?=[“‘"\'(]*[A-Z0-9$])',spoken(part).strip()) if s]
# The user's banned phrases, presentation narration, and the wording earlier editions rejected.
BANNED=re.compile(r'\b(?:need not|lawful|this shows|that shows|shows that|shows how|illustrates?|illustrating|demonstrates?|demonstrating|the key point|key takeaway|as you can see|let.s|let us|remember that|note that|notice that|the slides?|slides|the lecture|this lecture|the professor|the instructor|the figure|this figure|the graph|this graph|the next topic|the next step|this sets up|turns to|we now|moving on|next we|earlier we|later we|in this section|our focus|this helps us understand|in other words|basically|simply put|e\.g|i\.e|etc|vs)\b',re.I)
# Colons, semicolons, dashes, equals signs and arrows do not belong in read-aloud prose.
PUNCT=re.compile(r'[:;=—–→←⇒↔]|\s-\s|--|->|<-')
# Experiments are taught in connected sentences, without report-style labels.
LABELS=re.compile(r'\*\*(?:setup|set-up|method|methods|participants|procedure|design|observations?|results?|outcome|interpretation|conclusions?|findings?|explanation|hypothesis|takeaway|summary|definition|example)\*\*|(?:^|[.!?]\s+)(?:Setup|Method|Methods|Procedure|Design|Results?|Findings?|Outcome|Interpretation|Conclusions?|Takeaway|Summary|Definition|Example)\b(?!\s+(?:of|from|in|for|is|are|was|were)\b)')
# Compressed shorthand such as "vector in, number out".
SHORTHAND=re.compile(r'\b[\w’\']+(?: [\w’\']+){0,2} in, (?:[\w’\']+ ){0,3}out\b',re.I)
def problems(text,child):
 found=[];plain=spoken(text)
 for rx,why in [(BANNED,'banned phrase'),(PUNCT,'punctuation'),(LABELS,'report label'),(SHORTHAND,'X in, Y out shorthand')]:
  hit=rx.search(plain)
  if hit:found.append(f'{why} “{hit.group().strip()}”')
 parts=sentences(text)
 for s in parts:
  if len(s.split())<5:found.append(f'sentence under 5 words “{s}”')
 low,high=(1,3)if child else(2,5)
 if not low<=len(parts)<=high:found.append(f'{len(parts)} sentences in a {"sub-bullet" if child else "bullet"} (needs {low} to {high})')
 if text.count('**')%2:found.append('unbalanced bold')
 if text.count('\\[')!=text.count('\\]'):found.append('unbalanced equation')
 return found
def build():
 pages=json.loads((HERE/'pages.json').read_text())
 math=json.loads((ROOT/'psyc301-v18-data.js').read_text().split(' = ',1)[1].rstrip(';\n'))['mathSpeech']
 scripts={};coverage={};errors=[]
 for m in pages['modules']:
  name=f"module-{m['id']:02d}.txt";rows=parse(name)
  assert sorted(rows)==[p['page']for p in m['pages']],(name,'pages differ from the studio')
  for page in m['pages']:
   key=f"{m['id']}:{page['page']}";blocks=rows[page['page']]
   if bool(blocks)!=(page['role']=='teaching'):errors.append(f'{key} teaching notes must match the page role {page["role"]}')
   if blocks and not any(b['children']for b in blocks):errors.append(f'{key} needs at least one sub-bullet')
   for b in blocks:
    for t,child in [(b['text'],False),*[(c,True)for c in b['children']]]:
     errors+=[f'{key} {p} in “{t[:70]}”' for p in problems(t,child)]
     for eq in re.findall(r'\\\[(.*?)\\\]',t):
      if eq not in math:errors.append(f'{key} equation without speech {eq}')
   scripts[key]=blocks
   coverage[key]={'page':page['page'],'role':page['role'],'bullets':len(blocks),'subBullets':sum(len(b['children'])for b in blocks),'words':words(blocks),'authorFile':'authoring/psyc301/version20/'+name}
 if errors:raise SystemExit('Version 20 writing check failed\n'+'\n'.join(errors))
 scope=[m['id']for m in pages['modules']]
 payload={'version':20,'revision':'psyc301-v20','scope':scope,'scripts':scripts,'mathSpeech':{k:v for k,v in math.items() if any(k in t for b in scripts.values() for t in paragraphs(b))}}
 (ROOT/'psyc301-v20-data.js').write_text('window.PSYC301_V20 = '+json.dumps(payload,ensure_ascii=False,indent=1)+';\n')
 teaching=sum(bool(x)for x in scripts.values());total=sum(words(x)for x in scripts.values())
 report={'version':20,'scope':scope,'sourcePages':len(scripts),'teachingPages':teaching,'words':total,'averageWords':round(total/teaching),'guidelines':'Every Module II teaching page in PSYC301 collections 09 to 13 is rewritten as a natural teaching transcript that reads aloud like a professor explaining the material. Bullets hold two to five complete, connected sentences and sub-bullets hold one to three. Each page explains what a concept is, how it works and why it matters, in source order, using only source material. There are no fragments, compressed shorthand, report labels, presentation narration, colons, semicolons, dashes, equals signs or arrows in the prose. Title and divider pages stay empty. Earlier editions are not rewritten.','pages':coverage}
 (HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=1)+'\n')
 print({k:report[k]for k in ['sourcePages','teachingPages','words','averageWords']})
if __name__=='__main__':build()
