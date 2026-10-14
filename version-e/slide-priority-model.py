"""Guide-based study ranking. Scores are review priorities, not exam probabilities."""
import argparse,html,json,math,re
from collections import Counter
from pathlib import Path
from docx import Document
IDS=(3,5,2,7,4,8,1)
STOP=set('the a an of and to in is are for with from this which what how as be by at only it on that our when not or its have can than those these into one their more some'.split())
def tokens(s):return Counter(w for w in re.findall(r'[a-z]+',html.unescape(re.sub('<[^>]*>',' ',s)).lower()) if w not in STOP)
def cosine(a,b):return sum(v*b.get(k,0) for k,v in a.items())/(math.sqrt(sum(v*v for v in a.values())*sum(v*v for v in b.values())) or 1)
def rank(data,guide):
 blocks={k:[] for k in ('themes','history','perception','attention','language')};group=None
 for p in Document(guide).paragraphs:
  t=p.text.strip()
  if t.startswith('I. Big'):group='themes'
  elif t.startswith('II. Chapter'):group='history'
  elif t.startswith('III. Chapter'):group='perception'
  elif t.startswith('IV. Chapter'):group='attention'
  elif t.startswith('V. Chapter'):group='language'
  elif t.startswith('VI. Assigned'):group=None
  elif group and t:blocks[group].append(t)
 groups={3:'history',5:'perception',2:'perception',7:'attention',4:'attention',8:'language',1:'language'}
 report={'method':'Within-lecture review ranking: 60% best study-guide similarity, 25% direct quiz coverage weighted by the existing question priority, 15% direct essentials-guide reference; top 40% of sections per lecture.', 'interpretation':'Must know identifies core review priorities. Scores are not probabilities of appearing on the exam.', 'validated_prediction':False,'source_material':'Supplied Exam 1 study guide, lecture scripts, existing 208-question bank and essentials guide. No external exam dataset.','sections':[]}
 for m in data['modules']:
  if m['id'] not in IDS:continue
  candidates=[];guide_lines=blocks['themes']+blocks[groups[m['id']]]
  for s in m['sections']:
   vec=tokens(s['title']+' '+' '.join(s['versionE']))
   matches=sorted(((cosine(vec,tokens(t)),t) for t in guide_lines),reverse=True)
   qs=[q for q in data['questions'] if q['module']==m['id'] and q['page']==s['page']]
   qsignal=min(1,sum(q.get('priority',1) for q in qs)/4)
   refs=[e['id'] for e in data['essentials'] if e['source']==f"{m['id']}:{s['page']}"]
   score=.6*matches[0][0]+.25*qsignal+.15*bool(refs)
   record={'module':m['id'],'page':s['page'],'title':s['title'],'score':round(score,6),'guideTopic':matches[0][1],'questionIds':[q['id'] for q in qs],'essentials':refs,'mustKnow':False}
   candidates.append((score,s,record))
  count=math.ceil(len(candidates)*.4)
  for i,(_,s,record) in enumerate(sorted(candidates,key=lambda x:(-x[0],x[2]['page']))):
   record['mustKnow']=i<count
   s['examPriorityE']={k:record[k] for k in ('mustKnow','score','guideTopic','questionIds','essentials')}
  report['sections'].extend(x[2] for x in candidates)
 return report
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--data',required=True);p.add_argument('--guide',required=True);p.add_argument('--output',required=True);a=p.parse_args()
 d=json.loads(Path(a.data).read_text());r=rank(d,a.guide);Path(a.output).write_text(json.dumps(r,ensure_ascii=False,indent=2));print(sum(x['mustKnow'] for x in r['sections']),'core review slides')
