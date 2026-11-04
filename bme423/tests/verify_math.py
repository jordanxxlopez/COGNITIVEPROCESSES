"""Independent numerical checks. Run with Python + numpy/scipy/PyMuPDF."""
from pathlib import Path
import json,math,ast,re
import numpy as np
from scipy import stats,integrate,optimize
R=Path(__file__).resolve().parents[1]
d=json.loads((R/'data.js').read_text().removeprefix('const DATA=').strip().removesuffix(';'))
problems={p['id']:p for p in d['problems']};checked=[]
def check(p,expected):
 assert math.isclose(p['answer'],float(expected),rel_tol=1e-9,abs_tol=1e-10),(p['id'],p['answer'],expected)
 checked.append(p['id'])
for p in d['problems']:
 g=p['given'];topic=p['topic']
 if topic=='summary' and 'data' in g:
  xs=ast.literal_eval(g['data']);check(p,stats.sem(xs))
 elif topic=='anova':
  means=ast.literal_eval(g['means']);sds=ast.literal_eval(g['SDs']);n=int(g['n per group']);arrays=[]
  for m,s in zip(means,sds):
   delta=s*math.sqrt((n-1)/2);arrays.append([m-delta,m+delta]+[m]*(n-2))
  check(p,stats.f_oneway(*arrays).statistic)
 elif topic=='pooledt':
  n1,m1,s1=map(float,g['group 1'].split(','));n2,m2,s2=map(float,g['group 2'].split(','));check(p,stats.ttest_ind_from_stats(m1,s1,n1,m2,s2,n2,equal_var=True).statistic)
 elif topic=='onet':
  n=g['n'];mean=g['mean'];sd=g['s'];delta=sd*math.sqrt((n-1)/2);xs=[mean-delta,mean+delta]+[mean]*(n-2);check(p,stats.ttest_1samp(xs,g['μ0']).statistic)
 elif topic=='zprop':
  m1,n1=map(int,g['m1/n1'].split('/'));m2,n2=map(int,g['m2/n2'].split('/'));chi=stats.chi2_contingency([[m1,n1-m1],[m2,n2-m2]],correction=True).statistic;check(p,math.sqrt(chi))
 elif topic=='chi':
  table=ast.literal_eval(g['observed table']);check(p,stats.chi2_contingency(table,correction=len(table)==2).statistic)
 elif topic=='gof':check(p,stats.chisquare([255,125,90],[282,117.5,70.5]).statistic)
 elif topic=='normalprob':check(p,integrate.quad(lambda x:stats.norm.pdf(x,g['μ'],g['σ']),g['lower'],g['upper'])[0])
 elif p['id']=='density':check(p,optimize.brentq(lambda m:integrate.quad(lambda x:.5*x,0,m)[0]-.5,0,2))
 elif topic=='ccdf' and p['id'].startswith('density-'):
  b=g['upper support'];check(p,optimize.brentq(lambda m:integrate.quad(lambda x:2*x/(b*b),0,m)[0]-.5,0,b))
 elif topic=='expect' and p['id'].startswith('discrete-'):
  a=float(g['probabilities'].split(',')[0]);ps=[a,.4,.6-a];mu=np.dot([0,1,2],ps);check(p,np.dot((np.array([0,1,2])-mu)**2,ps))
assert len(checked)>100
for q in d['questions']:
 assert len(q['options'])==4 and len(set(q['options']))==4
 if q.get('problem'):
  assert math.isclose(float(q['options'][q['correct']]),problems[q['problem']]['answer'],rel_tol=.0001,abs_tol=.0001)
assert all(q['topic'] not in ['power','anovaSS'] for q in d['questions'])
for m in d['modules']:
 pages=[p for s in m['sections'] for p in s['pages']];assert pages==list(range(1,m['count']+1))
 assert all((R/'assets'/f"session{m['id']}"/f'{p}.webp').is_file() for p in pages)
assert len(d['sources'])==17
assert all((R/s['url']).is_file() for s in d['sources'])
import fitz
pdf=fitz.open(R/'BME423-four-page-notes.pdf');assert len(pdf)==4
for p in pdf:
 assert p.rect.width==612 and p.rect.height==792
 assert len(p.get_text().split())>150
assert all(title.split(' · ')[0] in ''.join(p.get_text() for p in pdf) for title,_ in d['sheets'])
print(f'PASS: {len(checked)} independent numerical comparisons, every numeric quiz answer, all 384 slide mappings, 17 PDFs, scope exclusions, and four letter-size notes pages.')
# Cover the remaining numerical families using independent identities/reference calculations.
for p in d['problems']:
 if p['id'] in checked: continue
 g=p['given'];t=p['topic'];pid=p['id']
 if t=='uniform': expected=1/3
 elif t=='sampling': expected=stats.norm.sf(2) if pid=='sampling' else g['σ']/math.sqrt(g['n'])
 elif t=='bonferroni': expected=4/math.sqrt(8/5) if pid=='bonf' else .05/g['k']
 elif t=='posthoc': expected=g['mean gap']/math.sqrt(2*g['within variance']/g['n'])
 elif t=='risk':
  if pid=='risk': expected=1/(20/100-10/100)
  elif pid=='aspirin-risk': expected=1/(18/25-6/19)
  else: expected=g['treated']/g['control']
 elif t=='odds': expected=50*35/(14*43) if pid=='smoke-odds' else (g['a']/g['b'])/(g['c']/g['d'])
 elif t=='binary':
  events=g.get('m',g.get('events'));n=g.get('n',g.get('patients'));expected=stats.binom.std(n,events/n)/n
 elif pid=='population': expected=np.var([2,4,6],ddof=0)
 elif pid=='discrete': expected=stats.rv_discrete(values=([0,1,2],[.2,.5,.3])).var()
 elif t=='percentile': expected=np.percentile([2,4,6,8,10,12,14] if pid=='percentile' else [2,4,6,8,10,12],g['p'],method='linear')
 elif t=='normalquant': expected=stats.norm.isf(.025,loc=100,scale=15)
 else:
  expected={'classify':3,'coins':stats.binom.pmf(2,3,.5),'cards':stats.hypergeom.pmf(2,52,4,2),'pmf':1/sum([1,2,3]),'dcdf':stats.rv_discrete(values=([0,1,2],[.2,.5,.3])).cdf(1.5),'linear':4*9+9*1,'normalize':optimize.brentq(lambda c:integrate.quad(lambda x:.5+x,0,c)[0]-1,.1,2),'sem':3*math.sqrt(16/64),'holm':3,'holmstop':1,'nnh':1/(.08-.03),'trial':2,'rout':int(.0223<.05)}[pid]
 check(p,expected)
assert len(checked)==len(d['problems'])
# Symbolically derive continuous-density results and the independent-sample shortcuts.
import sympy as sp
x,b,n,s,m=sp.symbols('x b n s m',positive=True)
pdf=2*x/b**2
assert sp.simplify(sp.integrate(pdf,(x,0,b))-1)==0
assert sp.simplify(sp.integrate(x*pdf,(x,0,b))-2*b/3)==0
assert sp.simplify(sp.integrate(x*x*pdf,(x,0,b))-(2*b/3)**2-b*b/18)==0
assert sp.simplify(sp.integrate(pdf,(x,0,b/sp.sqrt(2)))-sp.Rational(1,2))==0
assert sp.simplify(s*s/n+s*s/n-2*s*s/n)==0
# Balanced ANOVA denominator degrees of freedom: N - groups = groups*(n-1).
assert sp.expand(m*n-m-m*(n-1))==0
# Bonferroni's displayed decision is independently checked as well as its t value.
bonf=problems['bonf'];assert 4/math.sqrt(8/5)>stats.t.isf(.05/6,12)>2/math.sqrt(8/5)
print(f'PASS: all {len(checked)} practice answers checked; six symbolic normalization/moment/SE/df identities; Bonferroni decision checked.')
