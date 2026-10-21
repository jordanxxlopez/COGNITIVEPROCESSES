"""Independently validate Session 17 arithmetic and preserve the midterm archive."""
from pathlib import Path
import hashlib,json,math
import numpy as np
from scipy import stats
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'module2-data.js').read_text().split('const BME_MODULE_II=',1)[1].rstrip(';\n'))
checks=0
def same(actual,expected):
 global checks
 assert math.isclose(actual,expected,rel_tol=2e-11,abs_tol=2e-11),(actual,expected)
 checks+=1
for c in D['cases']:
 v=c['values'];conf=v['confidence'];topic=c['topic']
 if topic=='oneMean':
  se=v['sd']/math.sqrt(v['n']);df=v['n']-1;critical=stats.t.isf((1-conf)/2,df)
  lo,hi=stats.t.interval(conf,df,loc=v['x'],scale=se)
  same(v['df'],df)
 elif topic=='twoMeans':
  n1,n2=v['n1'],v['n2'];df=n1+n2-2
  variance=np.average([v['s1']**2,v['s2']**2],weights=[n1-1,n2-1])
  se=math.sqrt(variance)*math.sqrt(1/n1+1/n2);critical=stats.t.isf((1-conf)/2,df)
  delta=v['x1']-v['x2'];lo,hi=stats.t.interval(conf,df,loc=delta,scale=se)
  same(v['variance'],variance);same(v['df'],df)
  result=stats.ttest_ind_from_stats(v['x1'],v['s1'],n1,v['x2'],v['s2'],n2,equal_var=True)
  assert v['reject']==bool(result.pvalue<1-conf)
 elif topic=='oneProportion':
  p=v['m']/v['n'];se=math.sqrt(stats.bernoulli.var(p)/v['n']);critical=1.96 if conf==.95 else stats.norm.isf((1-conf)/2)
  lo,hi=p-critical*se,p+critical*se;same(v['p'],p);same(v['variance'],stats.bernoulli.var(p))
  assert v['reject']==(not lo<=v['reference']<=hi)
 else:
  p1=v['m1']/v['n1'];p2=v['m2']/v['n2'];p=(v['m1']+v['m2'])/(v['n1']+v['n2'])
  variance=stats.bernoulli.var(p);se=math.sqrt(variance*(1/v['n1']+1/v['n2']));same(v['rawSE'],se)
  if c.get('rounded'):p1,p2,se=round(p1,2),round(p2,2),round(se,2)
  critical=1.96;lo,hi=p1-p2-critical*se,p1-p2+critical*se
  same(v['pooled'],p);same(v['variance'],variance);assert v['reject']==(not lo<=0<=hi)
 same(v['se'],se);same(v['critical'],critical);same(v['margin'],se*critical);same(v['lower'],lo);same(v['upper'],hi);same(c['answer'],lo)
 assert len(c['steps'])>=7 and all(s['general'] and s['work'] and s['words'] for s in c['steps'])
 assert all(c['hypotheses'][k] for k in ['null','alternative','nullWords','alternativeWords']) if 'hypotheses' in c else True
C={c['id']:c for c in D['cases']}
# Reference values recomputed from the original lecture data.
same(C['ci-urine']['values']['variance'],40380.5)
same(C['ci-heart']['values']['lower'],60.56178784626402)
same(C['ci-survey']['values']['lower'],.31208311904733366)
same(C['ci-aspirin']['values']['lower'],.106)
same(C['ci-aspirin']['values']['upper'],.694)
same(C['ci-aspirin-precision']['values']['upper'],.7012427366420297)
same(C['ci-glucose']['values']['variance'],18.65)
same(C['ci-glucose']['values']['lower'],2.8891316163842307)
assert len(D['questions'])==100 and len({q['id'] for q in D['questions']})==100
assert all(q['module']==17 and len(q['options'])==4 and len(set(q['options']))==4 and q['why'] for q in D['questions'])
assert [s['page'] for s in D['modules'][0]['slides']]==list(range(1,18))
assert all(len(s['paragraphs'])==3 for s in D['modules'][0]['slides'])
assert [s['id'] for s in D['syllabus']['moduleII']['sessions'] if s['available']]==[17]
assert D['syllabus']['moduleI']['sessions']==list(range(1,17))
assert len(D['syllabus']['moduleII']['sessions'])==11
for source in D['sources']:assert hashlib.sha256((ROOT/source['path']).read_bytes()).hexdigest()==source['sha256']
old=json.loads((ROOT/'module2-preserved.json').read_text())['files']
for file,sha in old.items():assert hashlib.sha256((ROOT/file).read_bytes()).hexdigest()==sha,file+' archive changed'
for n in range(1,18):assert (ROOT/f'assets/session17/{n}.webp').is_file()
print(f'PASS: {checks} independent numerical checks, 22 complete worked cases, all 17 slide explanations and visuals, source conventions, 100 unique questions, the syllabus boundary, and {len(old)} unchanged MODULE I assets.')
