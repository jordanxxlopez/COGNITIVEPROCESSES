"""Independently check source-based V2 worked values and scope/evidence rules."""
import json,math,re,sys
from pathlib import Path
import numpy as np
from scipy import stats,integrate,optimize
R=Path(__file__).resolve().parents[1]
v=json.loads((R/'v2-data.js').read_text().removeprefix('const V2=').strip().removesuffix(';'))
if '--note-sheet' in sys.argv:
 pack=json.loads((R/'note-sheet-data.js').read_text().removeprefix('const SHEET_PACK=').strip().removesuffix(';'))
 v['blocks']=pack['blocks']
nchecks=0
def shown(block,text,expected):
 global nchecks
 assert text in v['blocks'][block]['html'],(block,text,'not displayed')
 # Half one unit in the final displayed decimal place is the rounding allowance.
 places=len(text.split('.')[1]) if '.' in text else 0
 assert abs(float(text)-float(expected))<=.5001*10**(-places),(block,text,expected)
 nchecks+=1
xs=np.array([65,69,59,64,62,67,68,62,64,65])
for text,n in [('645',xs.sum()),('64.5',np.mean(xs)),('82.5',np.sum((xs-xs.mean())**2)),('9.1667',np.var(xs,ddof=1)),('3.0277',np.std(xs,ddof=1)),('0.95743',stats.sem(xs))]:shown('describe',text,n)
ys=[66,67,69,69,70,70,71,71,72,72]
if '--note-sheet' in sys.argv:  # Archived Version 2 retains its historical convention.
 shown('percent','71.25',stats.mstats.mquantiles(ys,[.75],alphap=0,betap=0)[0])
 shown('percent','68.5',stats.mstats.mquantiles(ys,[.25],alphap=0,betap=0)[0])
else:
 shown('percent','71',np.percentile(ys,75,method='linear'))
 shown('percent','69',np.percentile(ys,25,method='linear'))
 shown('percent','2',np.percentile(ys,75,method='linear')-np.percentile(ys,25,method='linear'))
rv=stats.rv_discrete(values=([-1,2,3,7],[.55,.15,.1,.2]))
shown('discrete','1.45',rv.mean());shown('discrete','11.85',rv.moment(2));shown('discrete','9.7475',rv.var())
shown('continuous','.4375',integrate.quad(lambda x:x/2,1.5,2)[0])
c=optimize.brentq(lambda c:integrate.quad(lambda x:.1+x,0,c)[0]-1,0,2)
shown('endpoint','1.317745',c)
mu=integrate.quad(lambda x:x*(.1+x),0,c)[0]
shown('functionmean','.849556',mu);shown('functionmean','2.69911',2*mu+1)
shown('normalwork','-1.149425',(85-95)/8.7);shown('normalwork','2.298851',(115-95)/8.7)
shown('normalwork','.125190',stats.norm.cdf(85,95,8.7));shown('normalwork','.864053',stats.norm.cdf(115,95,8.7)-stats.norm.cdf(85,95,8.7));shown('normalwork','.0107567',stats.norm.sf(115,95,8.7))
shown('inverse','112.052',95+1.96*8.7);shown('inverse','89.1319',stats.norm.ppf(.25,95,8.7));shown('inverse','100.8681',stats.norm.ppf(.75,95,8.7))
se=1.5/np.sqrt(50)
shown('sampling','.212132',se);shown('sampling','-2.35702',(3.5-4)/se);shown('sampling','-.942809',(3.8-4)/se);shown('sampling','.163678',stats.norm.cdf(3.8,4,se)-stats.norm.cdf(3.5,4,se))
means=np.array([1188,1412,1363]);sds=[189,217,191];within=np.mean(np.square(sds));between=12*np.var(means,ddof=1)
shown('anova','39763.6667',within);shown('anova','1321',means.mean());shown('anova','27734',np.sum((means-means.mean())**2));shown('anova','13867',np.var(means,ddof=1));shown('anova','166404',between);shown('anova','4.18483',between/within);shown('anova','3.28492',stats.f.isf(.05,2,33));shown('anova','.024001',stats.f.sf(between/within,2,33))
pool=(24*2.49**2+24*2.09**2)/48;se=np.sqrt(pool*(1/25+1/25))
shown('pooled','5.2841',pool);shown('pooled','.650175',se);shown('pooled','-5.99838',stats.ttest_ind_from_stats(82.2,2.49,25,86.1,2.09,25,equal_var=True).statistic)
pool=(8*1.05**2+15*.88**2)/23;se=np.sqrt(pool*(1/9+1/16))
shown('unequal','.888522',pool);shown('unequal','.392756',se);shown('unequal','.840216',stats.ttest_ind_from_stats(2.08,1.05,9,1.75,.88,16,equal_var=True).statistic)
shown('onet','1.855936',4.15/np.sqrt(5));shown('onet','2.58630',(76.8-72)/(4.15/np.sqrt(5)));shown('onet','2.776',stats.t.isf(.025,4))
se=np.sqrt(2*239.9/70)
shown('pairs','2.61807',se);shown('pairs','8.21216',21.5/se);shown('pairs','5.61483',14.7/se);shown('pairs','2.59733',6.8/se)
tab=np.array([[18,7],[6,13]]);chi=stats.chi2_contingency(tab,correction=True);e=chi.expected_freq;terms=(np.maximum(0,np.abs(tab-e)-.5)**2/e).flatten()
for text,n in zip(['1.094697','1.313636','1.440391','1.728469'],terms):shown('chi2',text,n)
shown('chi2','5.577193',chi.statistic);shown('z','2.36161',np.sqrt(chi.statistic))
se=np.sqrt((24/44)*(20/44)*(1/25+1/19));shown('z','.151547',se);shown('z','.0229665',se**2);shown('z','.0463158',.5*(1/25+1/19));shown('z','.357895',.72-6/19-.5*(1/25+1/19))
tab=np.array([[36,131],[41,132],[75,104]]);chi=stats.chi2_contingency(tab,correction=False);e=chi.expected_freq;terms=((tab-e)**2/e).flatten()
for text,n in zip(['3.407393','1.411236','1.844298','.763851','9.722297','4.026673'],terms):shown('large',text,n)
shown('large','21.175749',chi.statistic)
for text,n in zip(['2.585106','.478723','5.393617'],(np.array([255,125,90])-np.array([282,117.5,70.5]))**2/np.array([282,117.5,70.5])):shown('gof',text,n)
shown('gof','8.457447',stats.chisquare([255,125,90],[282,117.5,70.5]).statistic)
shown('risk','.438596',(6/19)/(18/25));shown('risk','.404211',18/25-6/19);shown('risk','2.47396',1/(18/25-6/19));shown('risk','2.90698',(50/14)/(43/35))
p=8/61;shown('proportionwork','.131148',p);shown('proportionwork','.113948',p*(1-p));shown('proportionwork','.337562',np.sqrt(p*(1-p)));shown('proportionwork','.0432203',stats.binom.std(61,p)/61)
assert 18.234>stats.chi2.isf(.01,1)>stats.chi2.isf(.05/3,1)>stats.chi2.isf(.025,1)
assert 9.4944>stats.chi2.isf(.025,1) and 4.6895>stats.chi2.isf(.05,1)
assert len(v['B'])==45 and len(v['sheets'])==4
assert len(v['tables'])==8 and sum(t['midterm'] for t in v['tables'])==5
assert all((R/t['url']).exists() for t in v['tables'])
assert all(p['score']==0 for p in v['priorities'] if p['topic'] in ['power','anovaSS'])
assert len(v['questions'])==12 and all(len(set(q['options']))==4 for q in v['questions'])
print(f'PASS: {nchecks} independent source-example numeric checks, corrected Holm/table decisions, all Version B topics, original table files, scope exclusions, and 12 output questions.')
