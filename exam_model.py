"""Study-priority ranking from the supplied guide and six examples.

This is a transparent heuristic with smoothed topic weights, not a validated
forecast of unseen instructor questions. No USC-specific exam data is assumed.
"""
import math,re,json
from collections import Counter
from pathlib import Path
from docx import Document

EXAMPLES=[
 ('attention','Eye tracking is used in covert visual attention experiments to ensure attentional shifts are not overt saccades'),
 ('history','According to behaviorists only observable behavior should be the emphasis of psychology'),
 ('history','Little Albert rat loud noise classical conditioning'),
 ('perception','Inverse projection problem understanding three dimensions'),
 ('perception','Which driving observation captures attention from the top down distant state license plate'),
 ('attention','Which is NOT an expectation of Feature Integration Theory attended objects bound illusory conjunctions features absent')]
GROUPS={'history':[3],'perception':[5,2],'attention':[7,4],'language':[8,1],'articles':[0]}
GUIDE=next(Path('/workspace/attachments').glob('*/*Study_Guide*.docx'))
paragraphs=[p.text for p in Document(GUIDE).paragraphs if p.text.strip()]
blocks={k:[] for k in GROUPS}; current=None
for t in paragraphs:
 if t.startswith('II. Chapter 1'):current='history'
 elif t.startswith('III. Chapter 3'):current='perception'
 elif t.startswith('IV. Chapter 4'):current='attention'
 elif t.startswith('V. Chapter 11'):current='language'
 elif t.startswith('VI. Assigned'):current='articles'
 elif current:blocks[current].append(t)
STOP=set('the a an of and to in is are for with from this which what how as be by at only it on that'.split())
def tokens(s):return Counter(w for w in re.findall(r'[a-z]+',s.lower()) if w not in STOP)
def cosine(a,b):
 return sum(a[k]*b.get(k,0) for k in a)/(math.sqrt(sum(v*v for v in a.values())*sum(v*v for v in b.values())) or 1)
def attach(questions):
 counts={k:len(v) for k,v in blocks.items()}; total=sum(counts.values())
 observed=Counter(k for k,_ in EXAMPLES)
 # A strong guide-based prior prevents six examples from eclipsing language.
 prior_strength=36
 shares={k:(prior_strength*counts[k]/total+observed[k])/(prior_strength+len(EXAMPLES)) for k in GROUPS}
 # Preserve assigned-article coverage; apportion the other 90 items by largest remainder.
 chapter_total=sum(shares[k] for k in GROUPS if k!='articles')
 raw={k:90*shares[k]/chapter_total for k in GROUPS if k!='articles'}
 quotas={k:math.floor(v) for k,v in raw.items()}
 for k in sorted(raw,key=lambda k:raw[k]-quotas[k],reverse=True)[:90-sum(quotas.values())]:quotas[k]+=1
 quotas['articles']=10
 guide_vectors={k:tokens(' '.join(v)) for k,v in blocks.items()}
 sample_vectors=[tokens(s) for _,s in EXAMPLES]
 for q in questions:
  group=next(k for k,ids in GROUPS.items() if q['module'] in ids)
  text=tokens(q['stem']+' '+q['options'][0]+' '+q['why'])
  guide_match=cosine(text,guide_vectors[group]);sample_match=max(cosine(text,v) for v in sample_vectors)
  # Most weight goes to guide alignment, less to sparse sample similarity.
  q['priority']=round(1+3*guide_match+sample_match,6)
  q['examGroup']=group
 return {'method':'Guide-weighted topic smoothing and lexical relevance ranking','validated_prediction':False,'examples':6,'guide_counts':counts,'topic_shares':shares,'quotas100':[quotas[k] for k in GROUPS],'groups':list(GROUPS),'question_scores':{str(q['id']):q['priority'] for q in questions}}
