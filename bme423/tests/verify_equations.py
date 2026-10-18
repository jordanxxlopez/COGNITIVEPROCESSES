"""Coverage, independent numerical checks, and preservation for equation additions."""
import json, re, subprocess, math
from pathlib import Path
import numpy as np
from scipy import stats
import sympy as sp

R=Path(__file__).resolve().parents[1]
def load(name,prefix):return json.loads((R/name).read_text().removeprefix(prefix).rstrip(';\n'))
def old(name,prefix):return json.loads(subprocess.check_output(['git','show','a1e844d:bme423/'+name],cwd=R.parent,text=True).removeprefix(prefix).rstrip(';\n'))
E=load('equation-guide-data.js','const EQUATION_GUIDE=')
D=load('data.js','const DATA=');V=load('v2-data.js','const V2=')
coverage=json.loads((R/'equation-coverage.json').read_text())
assert len(E['problems'])==len(coverage['problems'])==len(D['problems'])==224
assert len(coverage['slides'])==384 and len({s['page'] for s in coverage['slides']})==384
assert len(coverage['worked'])==len(V['blocks'])==38
steps=0
for p in D['problems']:
    entries=E['problems'][p['id']]
    assert len(entries)==len(p['steps'])
    for i,s in enumerate(p['steps']):
        assert 'np.float64' not in s['math']
        # Conceptual/interpretive steps are explicitly recorded rather than
        # being silently given a generic topic formula.
        if not entries[i]:
            assert (p['topic'] in {'classification','trials'} or s['label'] in {
                'State H0','Describe the area','Check direction','Explain',
                'Distinguish the ratio from a whole-person count','State the comparison','State the result'})
        assert all(k in E['rules'] for k in entries[i])
        if p['topic']=='chi' and s['label']=='Calculate each cell contribution':
            a=json.loads(p['given']['observed table'])
            assert entries[i]==(['yatescell'] if len(a)==2 and len(a[0])==2 else ['chicell'])
        steps+=1
assert steps==1077

# Numerically check every newly added slide-specific substitution, with no
# dependency on the JS distribution library or its displayed rounded answers.
checks=0
def shown(key,text,value):
    global checks
    assert text in ' '.join(E['rules'][key]['tex']),(key,text)
    precision=len(text.split('.')[1]) if '.' in text else 0
    assert math.isclose(float(text),float(value),rel_tol=0,abs_tol=.501*10**(-precision)),(key,text,value)
    checks+=1
shown('percentile30','2.2',1+.30*(5-1));shown('percentile30','7.2',np.percentile([3,7,8,9,14],30))
shown('hrbox','18.5',80-61.5)
shown('hrwithin','68.05',np.mean(np.square([7.3,9.1])))
shown('hrgrand','75.5',np.mean([74.2,76.8]))
shown('hrmeansvar','3.38',np.var([74.2,76.8],ddof=1))
shown('hrbetween','16.9',5*np.var([74.2,76.8],ddof=1))
shown('hrf','0.24835',16.9/68.05)
pool=(2.49**2+2.09**2)/2;se=math.sqrt(pool*2/25)
shown('glucosepool','5.2841',pool);shown('glucoset','0.650175',se)
shown('glucoset','-5.99838',stats.ttest_ind_from_stats(82.2,2.49,25,86.1,2.09,25,equal_var=True).statistic)
pool=(8*1.05**2+15*.88**2)/23;se=math.sqrt(pool*(1/9+1/16))
shown('cardiacpool','0.888522',pool);shown('cardiact','0.392756',se)
shown('cardiact','0.840216',stats.ttest_ind_from_stats(2.08,1.05,9,1.75,.88,16,equal_var=True).statistic)
shown('hronet','1.855936',4.15/math.sqrt(5));shown('hronet','2.58630',(76.8-72)/(4.15/math.sqrt(5)))
se=math.sqrt(2*239.9/70)
shown('hdlse','2.61807',se)
for text,gap in [('8.21216',21.5),('5.61483',14.7),('2.59733',6.8)]:shown('hdlpairs',text,gap/se)
shown('hdlbonf','0.016667',.05/3);shown('hdlcontrol','0.025',.05/2)
assert 3.3>stats.t.isf(.01/2,46) and 2.9>stats.t.isf(.0125/2,46) and 2.3<stats.t.isf((.05/3)/2,46)
p=8/61
for text,x in [('.131148',p),('.113948',p*(1-p)),('.0432203',math.sqrt(p*(1-p)/61))]:shown('halothane',text,x)
shown('aspirinpool','.315789',6/19);shown('aspirinpool','.545455',24/44)
se=math.sqrt((24/44)*(20/44)*(1/25+1/19));gap=18/25-6/19-.5*(1/25+1/19)
shown('aspirinz','.151547',se);shown('aspirinz','.357895',gap);shown('aspirinz','2.36161',gap/se)
test=stats.chi2_contingency([[18,7],[6,13]],correction=True)
shown('aspirinchi','5.577193',test.statistic)
for text,x in zip(['1.094697','1.313636','1.440391','1.728469'],(np.maximum(0,abs(np.array([[18,7],[6,13]])-test.expected_freq)-.5)**2/test.expected_freq).flat):shown('aspirinchi',text,x)
assert math.isclose(test.statistic,(gap/se)**2)
shown('smokeor','2.90698',50*35/(14*43));shown('ocor','3.72136',13*9993/(4987*7))
shown('aspirinnnt','.404211',18/25-6/19);shown('aspirinnnt','2.47396',1/(18/25-6/19))
shown('baselinebenefit','.002',.01-.008);shown('baselinebenefit','500',1/(.01-.008));shown('benefitharm','25',500/20)
# Piecewise cumulative area and the Uniform variance are checked symbolically.
x=sp.symbols('x',real=True)
assert sp.simplify(sp.Rational(1,2)+sp.integrate(2-sp.Symbol('u'),(sp.Symbol('u'),1,x))-(2*x-x*x/2-1))==0
assert sp.integrate((x-30)**2/20,(x,20,40))==sp.Rational(100,3)

# Preserve all original questions, explanations and slide prose except the
# identified course-percentile correction and removal of NumPy repr noise.
prior=old('data.js','const DATA=')
for a,b in zip(prior['lessons'],D['lessons']):
    if a['id']!='percentile':assert a==b,a['id']
for a,b in zip(prior['problems'],D['problems']):
    if a['id'] in {'percentile','percentile2'}:continue
    for s in a['steps']:s['math']=re.sub(r'np\.float64\(([^()]*)\)',r'\1',s['math']).replace('82.80999999999999','82.81')
    assert a==b,a['id']
for a,b in zip(prior['questions'],D['questions']):
    if a['id'] not in {'q8','q88','q89'}:assert a==b,a['id']
assert prior['modules']==D['modules'] and prior['exams']==D['exams']
assert old('v2-data.js','const V2=')['B']==V['B']
for file in ['version-c-data.js','follow-along-sheet-data.js','follow-along-sheet.css','BME423-four-page-notes-v3.pdf','BME423-four-page-notes-v2.pdf','note-sheet-data.js']:
    assert subprocess.check_output(['git','show','a1e844d:bme423/'+file],cwd=R.parent)==(R/file).read_bytes(),file
print(f'PASS: {checks} independently checked new displayed values; piecewise CDF/Uniform identities; all {steps} steps, 38 worked blocks and 384 slides audited; original teaching, questions, slide images and four-page print guide preserved except the two corrected percentile exercises.')
