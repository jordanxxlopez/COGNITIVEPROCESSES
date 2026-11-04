"""Independent arithmetic, symbolic calculus, coverage and preservation checks.

Recalculate from the raw course data; do not import the authoring builder.
"""
from pathlib import Path
import hashlib, json, math, re
import numpy as np
from scipy import stats
import sympy as sp

ROOT=Path(__file__).resolve().parents[1]
pack=json.loads((ROOT/'exam-sheet-v6-data.js').read_text().removeprefix('const V6_PACK=').rstrip(';\n'))
B=pack['blocks'];checks=0;failures=[]
def shown(key,text,value):
    global checks
    checks+=1
    if text not in B[key]['html']:failures.append((key,text,'not printed'));return
    places=len(text.split('.')[1]) if '.' in text else 0
    if abs(float(text)-float(value))>.501*10**(-places):failures.append((key,text,float(value)))
def equal(a,b):
    global checks
    np.testing.assert_allclose(a,b,rtol=2e-12,atol=2e-12);checks+=np.size(a)

x=np.array([65,69,59,64,62,67,68,62,64,65]);d=x-x.mean()
for text,v in [('645',x.sum()),('64.5',x.mean()),('82.5',sum(d*d)),('9.16666667',x.var(ddof=1)),('3.02765035',x.std(ddof=1)),('.957427108',stats.sem(x))]:shown('summary',text,v)
for j in range(10):
    assert rf'd_{j+1}' in B['summary']['html'] if j<9 else r'd_{10}' in B['summary']['html']
    equal((x[j]-64.5)**2,d[j]**2)
for text,v in [('3.25',1+.25*9),('5.5',1+.5*9),('7.75',1+.75*9),('62.5',np.percentile(x,25)),('64.5',np.median(x)),('66.5',np.percentile(x,75)),('4',stats.iqr(x)),('10',np.ptp(x))]:shown('percentile',text,v)

xx=np.array([-1,2,3,7]);pr=np.array([.55,.15,.1,.2]);mu=xx@pr
for text,v in [('1.45',mu),('11.85',xx**2@pr),('9.7475',(xx-mu)**2@pr),('3.12209865',np.sqrt((xx-mu)**2@pr)),('.25',pr[(xx>=2)&(xx<7)].sum())]:shown('discrete',text,v)
equal(pr.cumsum(),[.55,.70,.80,1]);shown('discrete-cdf','.30',pr[xx>2].sum());shown('discrete-cdf','.45',pr[xx>=2].sum());shown('discrete-cdf','.15',pr[(xx>-1)&(xx<3)].sum())
die=np.arange(1,7);dp=np.array([.2]+[.16]*5)
for text,v in [('.52',sum(dp[:3])),('3.4',die@dp),('14.6',die**2@dp),('3.04',(die-die@dp)**2@dp)]:shown('loaded',text,v)

shown('events','.00452489',4/52*3/51)
for text,v in zip(['3.301375','.045375','.24025','6.1605'],(xx-1.45)**2*pr):shown('discrete',text,v)

t=sp.symbols('t',real=True);c=(-sp.Rational(1,5)+sp.sqrt(sp.Rational(201,25)))/2
equal(float(sp.integrate(t/2,(t,0,2))),1)
equal(float(sp.integrate(t*t/2,(t,0,2))),4/3)
equal(float(sp.integrate(t*t*t/2,(t,0,2))),2)
equal(float(sp.integrate(t/2,(t,sp.Rational(3,2),2))),.4375)
equal(float(sp.integrate(t,(t,0,sp.Rational(1,2)))+sp.integrate(2-t,(t,1,sp.Rational(3,2)))+sp.Rational(1,2)-sp.Rational(1,8)),.875)
shown('piecewise','.125',.5**2/2);shown('piecewise','.875',2*1.5-1.5**2/2-1);shown('piecewise','.75',.875-.125)
assert sp.simplify(c/10+c*c/2-1)==0
mu=sp.integrate(t*(sp.Rational(1,10)+t),(t,0,c));ex2=sp.integrate(t*t*(sp.Rational(1,10)+t),(t,0,c))
for text,v in [('1.31774469',c),('.849555608',mu),('.830088878',ex2),('.108344148',ex2-mu**2),('2.69911122',2*mu+1),('.825',1-(.1*.5+.5**2/2)),('.24',.1*.6+.6**2/2),('.904987562',-.1+np.sqrt(1.01))]:shown('endpoint',text,v)
equal(float(sp.integrate(1,(t,0,1))),1);equal(float(sp.integrate(t,(t,0,1))),.5);equal(float(sp.integrate((t-sp.Rational(1,2))**2,(t,0,1))),1/12)

for text,v in [('-1.14942529',(85-95)/8.7),('2.29885057',(115-95)/8.7),('.8749',stats.norm.cdf(1.15)),('.9893',stats.norm.cdf(2.3)),('.1251',1-.8749),('.8642',.9893-.1251),('.0107',1-.9893),('.1251903',stats.norm.cdf(85,95,8.7)),('.8640530',stats.norm.cdf(115,95,8.7)-stats.norm.cdf(85,95,8.7)),('.0107567',stats.norm.sf(115,95,8.7))]:shown('normal',text,v)
shown('normal','-10.9195402',-95/8.7)
for text,v in [('.67448975',stats.norm.ppf(.75)),('89.1319392',stats.norm.ppf(.25,95,8.7)),('100.868061',stats.norm.ppf(.75,95,8.7)),('77.948',95-1.96*8.7),('112.052',95+1.96*8.7)]:shown('quantile',text,v)
se=1.5/np.sqrt(50)
for text,v in [('.045',1.5**2/50),('.212132034',se),('-2.35702260',-.5/se),('-.942809042',-.2/se),('.172889293',stats.norm.cdf(-.2/se)),('.009211063',stats.norm.cdf(-.5/se)),('.163678230',stats.norm.cdf(-.2/se)-stats.norm.cdf(-.5/se))]:shown('sampling',text,v)
shown('linear','69',95-26);shown('linear','75.69',8.7**2);shown('linear','190',95+95);shown('linear','151.38',2*8.7**2)
shown('precision','.478713554',stats.sem(x)/2)

shown('one-t','4',16/np.sqrt(16));shown('one-t','-3',(103-115)/4);shown('one-t','2.131450',stats.t.isf(.025,15));shown('one-t','.00897274',2*stats.t.sf(3,15))
v1=8.4**2;v2=9.5**2;pool=(21*v1+26*v2)/47;se=np.sqrt(pool*(1/22+1/27));tv=-8/se
for text,v in [('70.56',v1),('90.25',v2),('1481.76',21*v1),('2346.50',26*v2),('81.4523404',pool),('2.59212894',se),('-3.08626622',tv),('2.01174051',stats.t.isf(.025,47)),('.00339345',2*stats.t.sf(abs(tv),47)),('2.013',stats.t.isf(.025,46)),('2.011',stats.t.isf(.025,48))]:shown('pooled-t',text,v)
means=np.array([3.7,4.6,5.2]);sds=np.array([1.1,1.4,2.1]);wit=np.mean(sds*sds);between=15*np.var(means,ddof=1)
for text,v in [('1.21',sds[0]**2),('1.96',sds[1]**2),('4.41',sds[2]**2),('2.52666667',wit),('4.5',means.mean()),('1.14',sum((means-means.mean())**2)),('.57',np.var(means,ddof=1)),('8.55',between),('3.38390501',between/wit),('3.21994229',stats.f.isf(.05,2,42)),('.04339471',stats.f.sf(between/wit,2,42))]:shown('anova',text,v)
se=np.sqrt(2*wit/15);critical=stats.t.isf(.05/6,42)
for text,v in [('.01666667',.05/3),('2.49366738',critical),('.580421303',se),('1.550598',.9/se),('2.584330',1.5/se),('1.033732',.6/se)]:shown('bonferroni',text,v)
assert [.9/se>critical,1.5/se>critical,.6/se>critical]==[False,True,False]
O=np.array([[887,117],[967,79],[901,85],[912,59]])
for row,text,a,crit in [(3,'18.234103',.05/3,'5.731139'),(1,'9.494427',.025,'5.023886'),(2,'4.689514',.05,'3.841459')]:
    result=stats.chi2_contingency(O[[0,row],:],correction=True)
    shown('holm',text,result.statistic);shown('holm',crit,stats.chi2.isf(a,1));assert result.pvalue<a

po=24/44;se=np.sqrt(po*(1-po)*(1/25+1/19));cy=.5*(1/25+1/19);gap=18/25-6/19-cy
for text,v in [('.315789474',6/19),('.545454545',po),('.454545455',1-po),('.151547046',se),('.0463157895',cy),('.357894737',gap),('2.36160813',gap/se),('1.959964',stats.norm.isf(.025))]:shown('z-yates',text,v)
for key,obs,expected_text,contrib_text,total in [
 ('chi2',np.array([[4,471],[27,498]]),['14.725','460.275','16.275','508.725'],['7.10021222','.227148172','6.42400154','.205515013'],'13.9568769'),
 ('large-chi',np.array([[36,131],[41,132],[75,104]]),['48.9094412','118.090559','50.6666667','122.333333','52.4238921','126.576108'],['3.40739270','1.41123621','1.84429825','.763851045','9.72229698','4.02667341'],'21.1757486')]:
    corrected=obs.shape==(2,2);r=stats.chi2_contingency(obs,correction=corrected)
    for text,v in zip(expected_text,r.expected_freq.flat):shown(key,text,v)
    contributions=np.maximum(0,abs(obs-r.expected_freq)-(.5 if corrected else 0))**2/r.expected_freq
    for text,v in zip(contrib_text,contributions.flat):shown(key,text,v)
    shown(key,total,r.statistic)
    assert sum(contributions.flat)==r.statistic
    shown(key,'3.841459' if corrected else '5.991465',stats.chi2.isf(.05,r.dof))
g=np.array([255,125,90]);e=470*np.array([.60,.25,.15]);cc=(g-e)**2/e
for text,v in zip(['2.58510638','.478723404','5.39361702'],cc):shown('gof',text,v)
shown('gof','8.45744681',sum(cc));shown('gof','5.991465',stats.chi2.isf(.05,2))
pr=8/61
for text,v in [('.131147541',pr),('.868852459',1-pr),('.337561644',np.sqrt(pr*(1-pr))),('.0432203397',np.sqrt(pr*(1-pr)/61))]:shown('binary',text,v)
for text,v in [('.315789474',6/19),('.438596491',(6/19)/(18/25)),('.404210526',18/25-6/19),('2.47395833',1/(18/25-6/19)),('.05',.08-.03),('20',1/(.08-.03))]:shown('risk',text,v)
for text,v in [('.0514285714',27/525),('.00842105263',4/475),('6.10714286',(27/525)/(4/475)),('.163742690',(4/475)/(27/525))]:shown('folate-risk',text,v)
for text,v in [('3.57142857',50/14),('1.22857143',43/35),('2.90697674',50*35/(14*43))]:shown('odds',text,v)

# Authentic supplied-output examples: recompute each reported test from data.
y=np.array([69,66,70,71,72,67,70,71,72,69])
for eqvar,text in [(False,'.0003625'),(True,'.0002594')]:shown('t-output',text,stats.ttest_ind(x,y,equal_var=eqvar).pvalue)
shown('t-output','15.611',stats.ttest_ind(x,y,equal_var=False).df)
no=[23.1,37.8,19.4,29.3,41,26.5,9.1,10.8,6.5,21,18.4,23.9,17.7,34.8,4.5,10.1,10.5,16.1,24.5,12.4,20.6,18.6]
aov=stats.f_oneway(no[:6],no[6:16],no[16:])
shown('anova-output','5.832',aov.statistic);shown('anova-output','0.0106',aov.pvalue)
# Check the reported ANOVA statistic using the original observations, not rounded printed mean squares.
shown('design','5.5772',stats.chi2_contingency([[18,7],[6,13]],correction=True).statistic)
shown('design','.0182',stats.chi2_contingency([[18,7],[6,13]],correction=True).pvalue)
shown('design','.00002522',stats.chi2_contingency([[36,131],[41,132],[75,104]],correction=False).pvalue)
shown('design','.01457',stats.chisquare(g,e).pvalue)

assert len(B)==34 and len(pack['sheets'])==4
assert len({k for page in pack['sheets'] for col in page for k in col})==len(B)
assert all(len(cols)==3 for cols in pack['sheets'])
for key in ['one-t','pooled-t','anova','bonferroni','holm','z-yates','chi2','large-chi','gof']:assert 'In words:' in B[key]['html']
for key in ['chi2','large-chi']:
    for cell in (['11','12','21','22'] if key=='chi2' else ['11','12','21','22','31','32']):
        assert ('E_{'+cell+'}') in B[key]['html'] and ('c_{'+cell+'}') in B[key]['html']
assert all(x in B['bonferroni']['html'] for x in ['t_{LM}','t_{LH}','t_{MH}'])
assert not any(t in ''.join(b['html'] for b in B.values()) for t in ['EXAM-TIME PROTOCOL','WHAT IS THIS QUESTION','P1·C','power analysis'])
assert not any(ch in ''.join(b['html'] for b in B.values()) for ch in ['\x07','\x08','\x0c'])
preserved=json.loads((ROOT/'exam-sheet-v6-preserved.json').read_text())
for path,digest in preserved.items():assert hashlib.sha256((ROOT.parent/path).read_bytes()).hexdigest()==digest,path+' changed'
coverage=json.loads((ROOT/'exam-sheet-v6-coverage.json').read_text())
for path,digest in coverage['sourceHashes'].items():assert hashlib.sha256((ROOT/'sources'/path).read_bytes()).hexdigest()==digest,path+' source changed'
assert not failures, '\n'+ '\n'.join(map(str,failures))
print(f'PASS: {checks} independent numerical/symbolic checks; all cells/pairs and topic locations; hypotheses in words; {len(preserved)} V5 files unchanged.')
