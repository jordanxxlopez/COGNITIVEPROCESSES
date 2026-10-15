"""Independent numerical, symbolic, coverage, preservation and physical-PDF checks."""
from pathlib import Path
import json, math, re, subprocess
import numpy as np
from scipy import stats, integrate, optimize
import sympy as sp
import fitz
R=Path(__file__).resolve().parents[1]
p=json.loads((R/'follow-along-sheet-data.js').read_text().removeprefix('const SHEET_PACK=').split(';\n',1)[0])
b=p['blocks'];count=0
def shown(key,text,value):
 global count
 assert text in b[key]['html'],(key,text,'missing')
 places=len(text.split('.')[1]) if '.' in text else 0
 assert abs(float(text)-float(value))<=.501*10**(-places),(key,text,value)
 count+=1
x=np.array([65,69,59,64,62,67,68,62,64,65])
for text,value in [('645',x.sum()),('64.5',x.mean()),('82.5',((x-x.mean())**2).sum()),('9.1667',x.var(ddof=1)),('3.0277',x.std(ddof=1)),('.95743',stats.sem(x)),('41685',(x*x).sum())]:shown('raw',text,value)
shown('percentile','2.2',1+30*(5-1)/100);shown('percentile','7.2',np.percentile([3,7,8,9,14],30,method='linear'))
assert r'1+\frac{p(n-1)}{100}' in b['percentile']['html']
xs=np.array([-1,2,3,7]);ps=np.array([.55,.15,.1,.2]);mu=np.dot(xs,ps)
for text,value in [('1.45',mu),('11.85',np.dot(xs*xs,ps)),('9.7475',np.dot((xs-mu)**2,ps))]:shown('discrete',text,value)
for text,value in zip(['3.301375','.045375','.24025','6.1605'],ps*(xs-mu)**2):shown('direct-variance',text,value)
rv=stats.rv_discrete(values=(xs,ps))
shown('endpoints','.25',ps[(xs>=2)&(xs<7)].sum());shown('endpoints','.30',rv.sf(2));shown('endpoints','.45',1-rv.cdf(1.999))
shown('independence','.0045249',4/52*3/51)
u=sp.symbols('u',real=True)
assert sp.integrate(u/2,(u,0,2))==1
assert sp.integrate(u*u/2,(u,0,2))==sp.Rational(4,3)
assert sp.integrate(u*u*u/2,(u,0,2))==2
assert sp.simplify(2-sp.Rational(4,3)**2)==sp.Rational(2,9)
shown('continuous','.25',integrate.quad(lambda u:u/2,0,1)[0]);shown('continuous','.4375',integrate.quad(lambda u:u/2,1.5,2)[0])
assert sp.Rational(1,2)+sp.integrate(2-u,(u,1,2))==1
assert sp.simplify(sp.Rational(1,2)+sp.integrate(2-u,(u,1,sp.Symbol('x')))-(2*sp.Symbol('x')-sp.Symbol('x')**2/2-1))==0
c=optimize.brentq(lambda c:.1*c+c*c/2-1,0,2)
shown('endpoint','1.317745',c);shown('endpoint','.825',1-.1*.5-.5**2/2);shown('endpoint','.24',.1*.6+.6**2/2)
mu=integrate.quad(lambda u:u*(.1+u),0,c)[0]
shown('function','.849556',mu);shown('function','2.69911',2*mu+1)
assert sp.integrate(u,(u,0,1))==sp.Rational(1,2)
assert sp.integrate(u*u,(u,0,1))-sp.Rational(1,4)==sp.Rational(1,12)
for text,value in [('-1.149425',(85-95)/8.7),('2.298851',(115-95)/8.7),('.1251',1-.8749),('.8642',.9893-(1-.8749)),('.0107',1-.9893),('.125190',stats.norm.cdf(85,95,8.7)),('.864053',stats.norm.cdf(115,95,8.7)-stats.norm.cdf(85,95,8.7)),('.0107567',stats.norm.sf(115,95,8.7)),('75.69',8.7**2),('-10.9195',(0-95)/8.7)]:shown('normal',text,value)
shown('quantile','112.052',95+1.96*8.7);shown('quantile','89.1319',stats.norm.ppf(.25,95,8.7));shown('quantile','100.8681',stats.norm.ppf(.75,95,8.7))
shown('r-probability','.125190',stats.norm.cdf(85,95,8.7));shown('r-probability','112.0517',stats.norm.ppf(.975,95,8.7))
se=1.5/np.sqrt(50)
for text,value in [('.212132',se),('-2.35702',(3.5-4)/se),('-.942809',(3.8-4)/se),('.172889',stats.norm.cdf((3.8-4)/se)),('.00921106',stats.norm.cdf((3.5-4)/se)),('.163678',stats.norm.cdf(3.8,4,se)-stats.norm.cdf(3.5,4,se)),('.1645',.1736-.0091)]:shown('sampling',text,value)
shown('one-t','1.855936',4.15/np.sqrt(5));shown('one-t','2.58630',(76.8-72)/(4.15/np.sqrt(5)));shown('one-t','2.776',stats.t.isf(.025,4))
pool=(21*8.4**2+26*9.5**2)/47;se=np.sqrt(pool*(1/22+1/27))
for text,value in [('70.56',8.4**2),('90.25',9.5**2),('81.45234',pool),('2.592129',se),('-3.08627',stats.ttest_ind_from_stats(49,8.4,22,57,9.5,27,equal_var=True).statistic),('2.013',stats.t.isf(.025,46)),('2.011',stats.t.isf(.025,48))]:shown('two-t',text,value)
means=np.array([1188,1412,1363]);sds=np.array([189,217,191]);wit=np.mean(sds**2);bet=12*means.var(ddof=1)
for text,value in [('39763.6667',wit),('1321',means.mean()),('27734',((means-means.mean())**2).sum()),('13867',means.var(ddof=1)),('166404',bet),('4.18483',bet/wit),('3.29',stats.f.isf(.05,2,32)),('3.28',stats.f.isf(.05,2,34))]:shown('anova',text,value)
shown('anova-no','.248',16.9/68.05);shown('anova-no','5.32',stats.f.isf(.05,1,8))
se=np.sqrt(2*2.5267/15)
for text,value in [('.580425',se),('2.58431',1.5/se),('1.55059',.9/se),('1.03373',.6/se),('2.49367',stats.t.isf(.05/6,42))]:shown('bonferroni',text,value)
for text,a in [('2.687',.01),('2.59973',.0125),('2.48469',.05/3)]:shown('holm',text,stats.t.isf(a/2,46))
assert [3.3>stats.t.isf(.01/2,46),2.9>stats.t.isf(.0125/2,46),2.3>stats.t.isf((.05/3)/2,46)]==[True,True,False]
prob=8/61
for text,value in [('.131148',prob),('.113948',prob*(1-prob)),('.337562',np.sqrt(prob*(1-prob))),('.0432203',np.sqrt(prob*(1-prob)/61))]:shown('binary',text,value)
pooled=24/44;se=np.sqrt(pooled*(1-pooled)*(1/25+1/19));cy=.5*(1/25+1/19);dy=.72-6/19-cy
for text,value in [('.315789',6/19),('.545455',pooled),('.0229665',se**2),('.151547',se),('.0463158',cy),('.357895',dy),('2.36161',dy/se)]:shown('z',text,value)
obs=np.array([[18,7],[6,13]]);result=stats.chi2_contingency(obs,correction=True)
for text,value in zip(['13.63636','11.36364','10.36364','8.63636'],result.expected_freq.flat):shown('chi2',text,value)
for text,value in zip(['1.094697','1.313636','1.440391','1.728469'],((np.maximum(0,abs(obs-result.expected_freq)-.5))**2/result.expected_freq).flat):shown('chi2',text,value)
shown('chi2','5.577193',result.statistic);shown('chi2','3.841',stats.chi2.isf(.05,1));shown('chi2','5.024',stats.chi2.isf(.025,1));shown('chi2','6.635',stats.chi2.isf(.01,1));assert .01<stats.chi2.sf(result.statistic,1)<.025
assert math.isclose(result.statistic,(dy/se)**2)
obs=np.array([[36,131],[41,132],[75,104]]);result=stats.chi2_contingency(obs,correction=False)
for text,value in zip(['48.90944','118.09056','50.66667','122.33333','52.42389','126.57611'],result.expected_freq.flat):shown('large',text,value)
for text,value in zip(['3.407393','1.411236','1.844298','.763851','9.722297','4.026673'],((obs-result.expected_freq)**2/result.expected_freq).flat):shown('large',text,value)
shown('large','21.175749',result.statistic);shown('large','5.991',stats.chi2.isf(.05,2))
for text,value in zip(['2.585106','.478723','5.393617'],(np.array([255,125,90])-np.array([282,117.5,70.5]))**2/np.array([282,117.5,70.5])):shown('gof',text,value)
shown('gof','8.457447',stats.chisquare([255,125,90],[282,117.5,70.5]).statistic)
for text,a in [('6.635',.01),('5.024',.025),('3.841',.05)]:shown('chi-holm',text,stats.chi2.isf(a,1))
for key,values in [('risk',[('.438596',(6/19)/(18/25)),('.404211',18/25-6/19),('2.47396',1/(18/25-6/19))]),('odds',[('2.90698',50*35/(14*43))]),('nnh',[('500',1/(.01-.008)),('25',500/20)])]:
 for text,value in values:shown(key,text,value)
used=[k for s in p['sheets'] for col in s['columns'] for k in col]
assert len(used)==len(set(used))==44
assert len(p['sheets'])==4 and all(len(s['columns'])==3 for s in p['sheets'])
assert p['margins']==dict(top=.3,bottom=.3,left=.3,right=.3)
coverage=json.loads((R/'follow-along-coverage.json').read_text())
assert all(t['status']=='covered' and t['printedBlocks'] for t in coverage['topics'] if not t['excluded'])
assert {t['topic'] for t in coverage['topics'] if t['excluded']}=={'power','anovaSS'}
# Earlier print files and all slide-teaching/question data are preserved byte for byte.
for name in ['note-sheet-data.js','notes-v2.html','BME423-four-page-notes-v2.pdf','BME423-four-page-notes.pdf','data.js','v2-data.js','version-c-data.js','math.js','style.css']:
 prior=subprocess.check_output(['git','show','38b7392:bme423/'+name],cwd=R.parent)
 assert prior==(R/name).read_bytes(),name+' changed'
doc=fitz.open(R/'BME423-four-page-notes-v3.pdf');assert len(doc)==4
for page in doc:
 assert tuple(page.rect)==(0,0,612,792)
 text=page.get_text();assert len(text.split())>1000
 assert not re.search(r'\\frac|\\\[|\$\$|Session\s+\d+|HW[12]',text),text
 blocks=page.get_text('blocks')
 assert min(t[0] for t in blocks)>=21.6-.2
 assert max(t[2] for t in blocks)<=590.4+.2
 assert min(t[1] for t in blocks)>=21.6-.2
 assert max(t[3] for t in blocks)<=770.4+.2
print(f'PASS: {count} independently recomputed displayed values; symbolic density/CDF identities; correct lecture percentile convention and rounded Normal table arithmetic; all 43 included topics; preserved teaching/older sheets; four dense letter pages with 0.3in margins and rendered math.')
