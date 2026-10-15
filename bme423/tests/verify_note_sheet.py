"""Math and physical-PDF checks for the isolated four-page revision."""
from pathlib import Path
import json,math,re,subprocess,sys
import numpy as np
from scipy import stats
import fitz
R=Path(__file__).resolve().parents[1]
subprocess.run([sys.executable,str(R/'tests/verify_v2.py'),'--note-sheet'],check=True)
p=json.loads((R/'note-sheet-data.js').read_text().removeprefix('const SHEET_PACK=').strip().removesuffix(';'))
b=p['blocks'];used=[k for s in p['sheets'] for c in s['columns'] for k in c]
assert len(p['sheets'])==4 and all(len(s['columns'])==3 for s in p['sheets'])
assert len(used)==len(set(used))==49
assert p['margins']==dict(top=.3,bottom=.3,left=.24,right=.24)
# Independent direct-deviation versus moment calculations.
xs=np.array([-1,2,3,7]);ps=np.array([.55,.15,.1,.2]);mu=np.dot(xs,ps)
contributions=ps*(xs-mu)**2
for text,value in zip(['3.301375','.045375','.24025','6.1605'],contributions):
 assert text in b['variance-direct']['html']
 assert math.isclose(float(text),value,abs_tol=1e-10)
assert math.isclose(contributions.sum(),9.7475)
rv=stats.rv_discrete(values=(xs,ps))
assert math.isclose(rv.cdf(6.999)-rv.cdf(1.999),.25)
assert math.isclose(stats.norm.ppf(.975,95,8.7),112.0517,abs_tol=.00005)
assert '112.0517' in b['r-directions']['html']
assert math.isclose(stats.t.isf(.05/6,207),2.414,abs_tol=.0005)
assert '2.414' in b['bonf-work']['html']
# Actual five-comparison exercise: first two rejected, then a failed third stops Holm.
rejected=[]
for j,t in enumerate([3.3,2.9,2.3,2.2,2.1],1):
 a=.05/(6-j);crit=stats.t.isf(a/2,46)
 if t>crit:rejected.append(j)
 else:break
assert rejected==[1,2]
for value in [2.687,2.600,2.485]:assert f'{value:.3f}' in b['holm-stop']['html']
assert math.isclose(.008/.010,.8) and math.isclose(1/(.010-.008),500) and 500/20==25
coverage=json.loads((R/'notes-coverage-report.json').read_text())
assert all(t['status']=='covered' for t in coverage['topics'] if not t['excluded'])
assert {t['topic'] for t in coverage['topics'] if t['excluded']}=={'power','anovaSS'}
doc=fitz.open(R/'BME423-four-page-notes-v2.pdf');assert len(doc)==4
for i,page in enumerate(doc):
 assert page.rect.width==612 and page.rect.height==792
 text=page.get_text();assert len(text.split())>1000
 assert not re.search(r'Session\s+\d+|HW[12]|supplied chi-square table|Review pp?\.|\\frac|\\\[',text),text
 blocks=page.get_text('blocks')
 assert min(x[1] for x in blocks)>=.3*72-.2
 assert max(x[3] for x in blocks)<=792-.3*72+.2
 assert min(x[0] for x in blocks)>=.24*72-.2
 assert max(x[2] for x in blocks)<=612-.24*72+.2
print('PASS: direct variance/CDF, Holm stop and cutoffs, risk/NNH, all review-method coverage, four dense letter pages, requested margins, and no printed source-reference lines.')
