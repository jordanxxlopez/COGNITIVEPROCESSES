"""Independent numerical and source checks for the Version D cases and additions."""
from pathlib import Path
import ast,json,math,re,subprocess
import numpy as np
from scipy import stats,integrate
R=Path(__file__).resolve().parents[1]
def load(n):return json.loads((R/n).read_text().split('=',1)[1].rstrip(';\n'))
D=load('data.js');P=load('version-d-data.js');F={p['id']:p for p in D['problems']+P['extraCases']};checks=0

def check(a,b,label):
 global checks
 assert math.isclose(float(a),float(b),rel_tol=2e-9,abs_tol=2e-10),(label,a,b)
 checks+=1
for pid,q in P['problems'].items():
 p=F[pid];g=p['given'];t=p['topic'];check(q['primaryAnswer'],p['answer'],pid)
 if pid in {x['id'] for x in P['extraCases']}:
  if t=='pooledt':n1,m1,s1=map(float,g['group 1'].split(','));n2,m2,s2=map(float,g['group 2'].split(','));answer=stats.ttest_ind_from_stats(m1,s1,n1,m2,s2,n2,equal_var=True).statistic
  elif t=='onet':answer=(g['mean']-g['μ0'])/(g['s']/math.sqrt(g['n']))
  elif t=='anova':means=ast.literal_eval(g['means']);sd=ast.literal_eval(g['SDs']);size=g['n per group'];samples=[[m-s*math.sqrt((size-1)/2),m+s*math.sqrt((size-1)/2)]+[m]*(size-2) for m,s in zip(means,sd)];answer=stats.f_oneway(*samples).statistic
  elif t=='chi':answer=stats.chi2_contingency(ast.literal_eval(g['observed table']),correction=len(ast.literal_eval(g['observed table']))==2).statistic
  elif t=='summary':answer=stats.sem(ast.literal_eval(g['data']))
  elif t=='normalprob':answer=stats.norm.cdf(g['upper'],g['μ'],g['σ'])-stats.norm.cdf(g['lower'],g['μ'],g['σ'])
  elif t=='expect':xs=np.array([-1,2,3,7]);ps=np.array([.55,.15,.1,.2]);answer=np.sum(ps*(xs-np.sum(xs*ps))**2)
  elif t=='integrate':answer=np.roots([.5,.1,-1])[0];answer=max(np.roots([.5,.1,-1]))
  elif t=='sampling':answer=stats.norm.cdf(g['upper'],g['μ'],g['σ']/math.sqrt(g['n']))-stats.norm.cdf(g['lower'],g['μ'],g['σ']/math.sqrt(g['n']))
  elif t=='zprop':pool=205/406;answer=(.565-.455-.5*(1/186+1/220))/math.sqrt(pool*(1-pool)*(1/186+1/220))
  else:raise AssertionError(pid)
  check(p['answer'],answer,pid+' independent answer')
 assert len(q['parts'])>=2 and len(q['paragraphs'])>=2 and q['basis'],pid
 assert q['wordCount']>=90,(pid,q['wordCount'])
 for step in q['flow']:
  assert step['math'] or step['text'] or step.get('figure'),pid
  if step.get('figure'):assert (R/step['figure']['src']).is_file()
  v=step.get('values',{})
  if 'range' in v:check(v['range'],np.ptp(ast.literal_eval(g['data'])),pid+' range');check(v['median'],np.median(ast.literal_eval(g['data'])),pid+' median')
  if 'percentile75' in v:check(v['percentile75'],np.quantile(ast.literal_eval(g['data']),.75),pid+' percentile')
  if 'q975' in v:
   for name,pct in [('q25',.25),('q75',.75),('q975',.975)]:check(v[name],stats.norm.ppf(pct,g['μ'],g['σ']),pid+name)
  if 'secondMoment' in v and 'variance' in v:check(v['variance'],v['secondMoment']-v['mean']**2,pid+' moments')
  if 'newProportionSE' in v:
   events=g.get('m',g.get('events'));total=g.get('n',g.get('patients'));pr=events/total;check(v['newProportionSE'],math.sqrt(pr*(1-pr)/(4*total)),pid+' proportion SEM')
  if 'reverseOR' in v:check(v['reverseOR'],1/p['answer'],pid+' reversed OR')
  if t in ['ccdf','uniform','integrate'] and 'secondMoment' in v:
   if t=='ccdf':lo=0;hi=2 if pid=='density' else g['upper support'];a=0;b=2/hi**2
   elif t=='uniform':lo,hi=(g['a'],g['b']) if pid=='uniform' else map(float,g['support'].split(' to '));a=1/(hi-lo);b=0
   else:lo=0;hi=1;a=.5;b=1
   mean=integrate.quad(lambda x:x*(a+b*x),lo,hi)[0];second=integrate.quad(lambda x:x*x*(a+b*x),lo,hi)[0];check(v['mean'],mean,pid+' integral mean');check(v['secondMoment'],second,pid+' integral second moment');check(v['variance'],second-mean**2,pid+' integral variance')
  if 'median' in v and t in ['ccdf','uniform','integrate']:
   if t=='ccdf':hi=2 if pid=='density' else g['upper support'];area=(v['median']/hi)**2
   elif t=='uniform':lo,hi=(g['a'],g['b']) if pid=='uniform' else map(float,g['support'].split(' to '));area=(v['median']-lo)/(hi-lo)
   else:area=.5*v['median']+.5*v['median']**2
   check(area,.5,pid+' median CDF')
  if 'pairSE' in v and t in ['posthoc','bonferroni']:
   size=g.get('n',12);variance=g.get('within variance',9);check(v['pairSE'],math.sqrt(2*variance/size),pid+' pair SE')
  if 'critical' in v and 'alpha' in v:check(v['critical'],stats.chi2.isf(v['alpha'],1),pid+' Holm cutoff')
# Specific source cases: pair decisions, actual pooled count and comparison direction.
fil=P['problems']['d-hw2-filgrastim'];decisions=[s['values']['reject'] for s in fil['flow'] if 'reject' in s.get('values',{})];assert decisions==[0,1,0],decisions
fol=P['problems']['d-hw2-folate']['flow'][-1]['values'];check(fol['RR'],(27/525)/(4/475),'No folate / folate RR')
mi=P['problems']['d-hw2-mortality'];pairs=[s['values'] for s in mi['flow'] if 'chi' in s.get('values',{})];assert [v['group'] for v in pairs]==[3,1,2];assert all(v['reject'] for v in pairs)
for v,expected,tol in zip(pairs,[18.234,9.4944,4.6895],[.0005,.00005,.00005]):assert abs(v['chi']-expected)<tol
assert all('power' not in {F[pid]['topic'] for pid in ids} for e in P['writtenExams'] for ids in e['questions'])
for q in P['extraQuizItems']:assert math.isclose(float(q['options'][q['correct']]),F[q['problem']]['answer'],rel_tol=6e-7,abs_tol=1e-8),q['id']
for file in ['data.js','v2-data.js','version-c-data.js','practice-question-data.js','studio-flow-data.js','studio-question-data.js']+[p.name for p in R.glob('*.pdf')]:assert (R/file).read_bytes()==subprocess.check_output(['git','show','HEAD:bme423/'+file]),file
print('PASS:',checks,'independent numerical/source comparisons; all 236 D cases, actual HW results and labels, filgrastim decisions, rounded-proportion pooling, all previous banks and PDFs preserved.')
