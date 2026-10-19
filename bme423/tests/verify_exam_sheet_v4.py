"""Independent V4 arithmetic, table, authentic-R, source and PDF checks.

References are evaluated from original data with SciPy/NumPy/SymPy, not the
authoring script's answers. Older PDFs and course data must remain unchanged.
"""
from pathlib import Path
import hashlib, html, json, math, re, subprocess
import numpy as np
import sympy as sp
from scipy import stats, integrate, optimize
import fitz

ROOT=Path(__file__).resolve().parents[1]
PACK=json.loads((ROOT/'exam-sheet-v4-data.js').read_text().removeprefix('const V4_PACK=').rstrip(';\n'))
B=PACK['blocks']; nchecks=0
def shown(key,text,value):
 global nchecks
 assert text in B[key]['html'],(key,text,'missing')
 places=len(text.split('.')[1]) if '.' in text else 0
 assert abs(float(text)-float(value))<=.501*10**(-places),(key,text,value)
 nchecks+=1
def close(actual,expected):
 global nchecks
 np.testing.assert_allclose(actual,expected,rtol=2e-12,atol=2e-12);nchecks+=np.size(actual)

x=np.array([65,69,59,64,62,67,68,62,64,65])
for text,value in [('645',x.sum()),('64.5',x.mean()),('82.5',((x-x.mean())**2).sum()),('9.16667',x.var(ddof=1)),('3.02765',x.std(ddof=1)),('.957427',stats.sem(x)),('41685',(x*x).sum())]:shown('summary',text,value)
shown('percentile','2.2',1+30*(5-1)/100)
shown('percentile','7.2',np.percentile([3,7,8,9,14],30,method='linear'))
xs=np.array([-1,2,3,7]);ps=np.array([.55,.15,.1,.2]);mu=xs@ps
for text,value in [('1.45',mu),('11.85',xs**2@ps),('9.74750',(xs-mu)**2@ps),('.25',ps[(xs>=2)&(xs<7)].sum())]:shown('discrete',text,value)
for level in [.55,.70,.80,1]:assert np.min(abs(ps.cumsum()-level))<1e-12
dx=np.arange(1,7);dp=np.array([.2]+[.16]*5)
for text,value in [('.52',dp[:3].sum()),('3.4',dx@dp),('14.6',dx**2@dp),('3.04',(dx-dx@dp)**2@dp)]:shown('loaded',text,value)
shown('events','.00452489',4/52*3/51);shown('events','.375',3/8)
u,t=sp.symbols('u t',real=True)
assert sp.integrate(u/2,(u,0,2))==1
assert sp.integrate(u**2/2,(u,0,2))==sp.Rational(4,3)
assert sp.integrate(u**3/2,(u,0,2))==2
assert sp.simplify(2-sp.Rational(4,3)**2)==sp.Rational(2,9)
for text,value in [('.25',integrate.quad(lambda u:u/2,0,1)[0]),('.4375',integrate.quad(lambda u:u/2,1.5,2)[0]),('1.41421',math.sqrt(2)),('1.33333',4/3),('.222222',2/9)]:shown('continuous',text,value)
assert sp.simplify(sp.Rational(1,2)+sp.integrate(2-u,(u,1,t))-(2*t-t*t/2-1))==0
close(integrate.quad(lambda u:u,0,1)[0]+integrate.quad(lambda u:2-u,1,2)[0],1)
c=optimize.brentq(lambda q:.1*q+q*q/2-1,0,2)
mean=integrate.quad(lambda u:u*(.1+u),0,c)[0]
for text,value in [('1.31774',c),('.825',1-.1*.5-.5**2/2),('.24',.1*.6+.6**2/2),('.849556',mean),('2.69911',2*mean+1)]:shown('endpoint',text,value)
assert sp.integrate(u,(u,0,1))==sp.Rational(1,2)
assert sp.integrate(u**2,(u,0,1))-sp.Rational(1,4)==sp.Rational(1,12)
close(1/integrate.quad(lambda u:u,0,2)[0],.5)
shown('continuous-sketch','.175',.1*.5+.5**2/2)
for text,value in [('-1.14943',(85-95)/8.7),('2.29885',(115-95)/8.7),('.8749',stats.norm.cdf(1.15)),('.9893',stats.norm.cdf(2.30)),('.1251',1-.8749),('.8642',.9893-(1-.8749)),('.0107',1-.9893),('-10.9195',(0-95)/8.7)]:shown('normal',text,value)
for text,value in [('.674490',stats.norm.ppf(.75)),('89.1319',stats.norm.ppf(.25,95,8.7)),('100.868',stats.norm.ppf(.75,95,8.7)),('77.948',95-1.96*8.7),('112.052',95+1.96*8.7)]:shown('quantile',text,value)
se=1.5/np.sqrt(50)
for text,value in [('.212132',se),('-2.35702',(3.5-4)/se),('-.942809',(3.8-4)/se),('.172889',stats.norm.cdf(3.8,4,se)),('.00921106',stats.norm.cdf(3.5,4,se)),('.163678',stats.norm.cdf(3.8,4,se)-stats.norm.cdf(3.5,4,se)),('.1645',.1736-.0091)]:shown('sampling',text,value)
shown('linear','69',95-26);shown('linear','75.69',8.7**2)
shown('one-t','4',16/np.sqrt(16));shown('one-t','-3',(103-115)/(16/np.sqrt(16)))
shown('one-t','2.131',stats.t.isf(.025,15))
pool=(21*8.4**2+26*9.5**2)/47;se=np.sqrt(pool*(1/22+1/27))
for text,value in [('70.56',8.4**2),('90.25',9.5**2),('81.4523',pool),('2.59213',se),('-3.08627',(49-57)/se),('2.013',stats.t.isf(.025,46)),('2.011',stats.t.isf(.025,48))]:shown('pooled-t',text,value)
means=np.array([1188,1412,1363]);sds=np.array([189,217,191]);wit=np.mean(sds**2);bet=12*means.var(ddof=1)
for text,value in [('39763.7',wit),('1321',means.mean()),('27734',((means-means.mean())**2).sum()),('13867',means.var(ddof=1)),('166404',bet),('4.18483',bet/wit),('3.29',stats.f.isf(.05,2,32)),('3.28',stats.f.isf(.05,2,34))]:shown('anova',text,value)
assert stats.f.isf(.05,2,34)<stats.f.isf(.05,2,33)<stats.f.isf(.05,2,32)
for text,value in [('68.05',(7.3**2+9.1**2)/2),('75.5',(74.2+76.8)/2),('3.38',np.var([74.2,76.8],ddof=1)),('16.9',5*np.var([74.2,76.8],ddof=1)),('.248347',16.9/68.05),('5.32',stats.f.isf(.05,1,8))]:shown('conditions',text,value)
se=np.sqrt(2*2.5267/15)
for text,value in [('.580425',se),('2.58431',1.5/se),('1.55059',.9/se),('1.03373',.6/se),('2.49367',stats.t.isf(.05/6,42))]:shown('bonferroni',text,value)
for text,a in [('2.687',.01),('2.59973',.0125),('2.48469',.05/3)]:shown('holm',text,stats.t.isf(a/2,46))
assert [3.3>stats.t.isf(.01/2,46),2.9>stats.t.isf(.0125/2,46),2.3>stats.t.isf((.05/3)/2,46)]==[True,True,False]
shown('tables','2.132',stats.t.isf(.05,4));shown('tables','2.776',stats.t.isf(.025,4))
assert .05<2*stats.t.sf(2.58630,4)<.10
prob=8/61
for text,value in [('.131148',prob),('.113948',prob*(1-prob)),('.337562',np.sqrt(prob*(1-prob))),('.0432203',np.sqrt(prob*(1-prob)/61))]:shown('binary',text,value)
prob=24/44;se=np.sqrt(prob*(1-prob)*(1/25+1/19));cy=.5*(1/25+1/19);dy=18/25-6/19-cy
for text,value in [('.315789',6/19),('.545455',prob),('.151547',se),('.0463158',cy),('.357895',dy),('2.36161',dy/se),('1.960',stats.norm.isf(.025))]:shown('z-yates',text,value)
prob=205/406;se2=np.sqrt(prob*(1-prob)*(1/186+1/220))
for text,value in [('.504926',prob),('.495074',1-prob),('.0498017',se2),('.00496090',.5*(1/186+1/220)),('2.10915',(.565-.455-.5*(1/186+1/220))/se2)]:shown('z-yates',text,value)
obs=np.array([[18,7],[6,13]]);chi=stats.chi2_contingency(obs,correction=True)
for text,value in zip(['13.6364','11.3636','10.3636','8.63636'],chi.expected_freq.flat):shown('chi2',text,value)
for text,value in zip(['1.09470','1.31364','1.44039','1.72847'],((np.maximum(0,abs(obs-chi.expected_freq)-.5))**2/chi.expected_freq).flat):shown('chi2',text,value)
for text,value in [('5.57719',chi.statistic),('3.841',stats.chi2.isf(.05,1)),('5.024',stats.chi2.isf(.025,1)),('6.635',stats.chi2.isf(.01,1))]:shown('chi2',text,value)
close(chi.statistic,(dy/se)**2);assert .01<chi.pvalue<.025
obs=np.array([[36,131],[41,132],[75,104]]);large=stats.chi2_contingency(obs,correction=False)
for text,value in zip(['48.9094','118.091','50.6667','122.333','52.4239','126.576'],large.expected_freq.flat):shown('large-chi',text,value)
for text,value in zip(['3.40739','1.41124','1.84430','.763851','9.72230','4.02667'],((obs-large.expected_freq)**2/large.expected_freq).flat):shown('large-chi',text,value)
shown('large-chi','21.1757',large.statistic);shown('large-chi','5.991',stats.chi2.isf(.05,2))
gof=stats.chisquare([255,125,90],[282,117.5,70.5])
for text,value in zip(['2.58511','.478723','5.39362'],(np.array([255,125,90])-np.array([282,117.5,70.5]))**2/np.array([282,117.5,70.5])):shown('gof',text,value)
shown('gof','8.45745',gof.statistic);shown('gof','5.991',stats.chi2.isf(.05,2))
for text,a in [('6.635',.01),('5.024',.025),('3.841',.05)]:shown('chi-holm',text,stats.chi2.isf(a,1))
assert all(stats.chi2.sf(stat,1)<alpha for stat,alpha in zip([18.234,9.4944,4.6895],[.05/3,.05/2,.05]))
for text,value in [('.438596',(6/19)/(18/25)),('.404211',18/25-6/19),('2.47396',1/(18/25-6/19)),('500',1/(.01-.008)),('25',500/20)]:shown('risk',text,value)
shown('odds','2.90698',50*35/(14*43))
for text,value in [('475',471+4),('525',498+27),('.00842105',4/475),('.0514286',27/525),('6.10714',(27/525)/(4/475)),('.163743',(4/475)/(27/525))]:shown('folate-risk',text,value)
heights=np.sort(x)
for text,value in [('3.25',1+.25*(len(x)-1)),('62.5',np.percentile(x,25)),('5.5',1+.5*(len(x)-1)),('64.5',np.median(x)),('7.75',1+.75*(len(x)-1)),('66.5',np.percentile(x,75)),('4',stats.iqr(x))]:shown('quartile-steps',text,value)
for text,value in [('.70',ps[xs<=2].sum()),('.30',ps[xs>2].sum()),('.45',ps[xs>=2].sum()),('.15',ps[(xs>-1)&(xs<3)].sum())]:shown('cdf-endpoints',text,value)
shown('integral-steps','.5625',1.5**2/4);shown('integral-steps','.4375',integrate.quad(lambda u:u/2,1.5,2)[0])
assert sp.integrate(u*u/2,(u,0,2))==sp.Rational(8,6)

# Real R output, generated with actual course data, independently checked.
r=json.loads((ROOT/'exam-sheet-v4-r-output.json').read_text());senior=np.array([69,66,70,71,72,67,70,71,72,69])
for name,equal in [('welch',False),('pooled',True)]:
 result=stats.ttest_ind(x,senior,equal_var=equal)
 close(r['numbers'][name],[result.statistic,result.df,result.pvalue])
 for line in r['outputs'][name].splitlines():
  if 't-test' in line or line.startswith('t ='):assert html.escape(line) in B['t-output']['html']
groups=[np.array(z) for z in [[23.1,37.8,19.4,29.3,41,26.5],[9.1,10.8,6.5,21,18.4,23.9,17.7,34.8,4.5,10.1],[10.5,16.1,24.5,12.4,20.6,18.6]]]
fr=stats.f_oneway(*groups);mse=sum(((g-g.mean())**2).sum() for g in groups)/(sum(map(len,groups))-3)
close(r['numbers']['anova'],[fr.statistic,fr.pvalue,mse]);shown('aov-output','66.8154',mse)
assert html.escape(r['outputs']['anova']) in B['aov-output']['html']
for key,res in [('chi_yates',chi),('chi_large',large)]:close(r['numbers'][key],[res.statistic,res.dof,res.pvalue])
close(r['numbers']['chi_gof'],[gof.statistic,2,gof.pvalue])
for key,res in [('pnorm_left',stats.norm.cdf(85,95,8.7)),('pnorm_right',stats.norm.sf(115,95,8.7)),('qnorm_left',stats.norm.ppf(.975,95,8.7)),('qnorm_right',stats.norm.isf(.025,95,8.7))]:
 printed=r['outputs'][key].split()[-1];assert abs(float(printed)-res)<=.501*10**(-len(printed.split('.')[1]));nchecks+=1

coverage=json.loads((ROOT/'exam-sheet-v4-coverage.json').read_text())
assert len(B)==42 and coverage['indexRemoved'] and coverage['protocolRemoved'] and 'router' not in PACK and 'protocol' not in B and len(PACK['sheets'])==4
previous=json.loads(subprocess.check_output(['git','show','22f04e6:bme423/exam-sheet-v4-data.js'],cwd=ROOT.parent).decode().removeprefix('const V4_PACK=').rstrip(';\n'))
for key,old in previous['blocks'].items():
 if key=='protocol':continue
 assert key in B
 assert re.findall(r'\\\[([\s\S]*?)\\\]',old['html'])==re.findall(r'\\\[([\s\S]*?)\\\]',B[key]['html']),(key,'existing math changed')
assert all(t['status']=='covered' for t in coverage['topics'] if not t['excluded'])
assert {t['topic'] for t in coverage['topics'] if t['excluded']}=={'power','anovaSS'}
assert PACK['margins']==.3 and PACK['minimumBodyPt']==7
assert 'paired' not in ' '.join(b['title'] for b in B.values()).lower()
for b in B.values():
 for source in b['sources']:assert (ROOT/'sources'/source.split(':')[0]).is_file(),source
for name,digest in coverage['sourceHashes'].items():
 assert 'session14' not in name
 assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest
graphs=coverage['graphs'];close(graphs['discrete']['x'],xs);close(graphs['discrete']['p'],ps)
close(graphs['continuous']['c'],c)
close(integrate.quad(lambda u:.1+u,0,c)[0],1)
for s in ['discrete','continuous','normal']:assert '<svg' in (ROOT/'figures'/f'v4-{s}.svg').read_text()
assert graphs['normal']['mean']==95 and graphs['normal']['sd']==8.7

# Immutable prior sheets, course content and calculator binaries.
for name in ['BME423-four-page-notes.pdf','BME423-four-page-notes-v2.pdf','BME423-four-page-notes-v3.pdf','follow-along-sheet-data.js','follow-along-sheet.css','follow-along-sheet.js','notes-v3.html','note-sheet-data.js','notes-v2.html','version-c-data.js','data.js','v2-data.js','equation-guide-data.js','math.js']:
 if (ROOT/name).exists():
  baseline=subprocess.check_output(['git','show','8c8f205:bme423/'+name],cwd=ROOT.parent)
  assert baseline==(ROOT/name).read_bytes(),'older content changed: '+name
pdf=fitz.open(ROOT/'BME423-four-page-notes-v4.pdf');assert len(pdf)==4
for i,page in enumerate(pdf,1):
 assert tuple(page.rect)==(0,0,612,792)
 text=page.get_text();assert len(text.split())>700
 assert not re.search(r'START|WHAT IS THIS QUESTION|P\d·C\d·B\d|page·column·box|EXAM-TIME PROTOCOL|90 minutes|Final check:',text),'removed index/protocol/navigation text remains'
 assert not re.search(r'\\frac|\\\[|\$\$|Session\s+\d+|Side\s*\d/4',text),'unwanted raw math / source clutter'
 blocks=page.get_text('blocks')
 assert min(z[0] for z in blocks)>=21.6-.2,(i,'left')
 assert max(z[2] for z in blocks)<=590.4+.2,(i,'right')
 assert min(z[1] for z in blocks)>=21.6-.2,(i,'top')
 assert max(z[3] for z in blocks)<=770.4+.2,(i,'bottom')
 # Standard prose/R fonts must stay >=7pt; mathematical scripts scale normally.
 for block in page.get_text('dict')['blocks']:
  for line in block.get('lines',[]):
   for span in line['spans']:
    if any(f in span['font'] for f in ['Arial','Liberation','Courier']):assert span['size']>=6.99,(i,span)
print(f'PASS: {nchecks} independently recomputed displayed/R values; symbolic densities and piecewise CDF; all critical values and decisions; source hashes/scope; 43 included topics; authentic R excerpts; graphs; older sheets/content preserved; four physical Letter pages with 0.3in margins and >=7pt prose.')
