"""Verify actual decoded .8xp code, numeric results, screen flow and packaging."""
import ast,hashlib,json,math,re,struct
from pathlib import Path
import numpy as np
from scipy import stats,integrate,optimize
from tivars.models import TI_84PCEPY
from tivars.types import TIProgram
from ti_basic_vm import VM

R=Path(__file__).resolve().parents[1];ROOT=R/'ti84'
manifest=json.loads((ROOT/'manifest.json').read_text())
programs={p['name']:p for p in manifest['programs']};decoded={};runs=0;checks=0
for name,p in programs.items():
    path=ROOT/p['download'];raw=path.read_bytes()
    assert raw[:8]==b'**TI83F*'
    length=struct.unpack('<H',raw[53:55])[0]
    assert length==len(raw)-57,(name,'container length')
    assert sum(raw[55:-2])%65536==struct.unpack('<H',raw[-2:])[0],(name,'checksum')
    a=TIProgram.open(str(path));assert a.name==name and a.supported_by(TI_84PCEPY)
    text=a.string(model=TI_84PCEPY);decoded[name]=text
    b=TIProgram(name=name);b.load_string((ROOT/p['source']).read_text(),model=TI_84PCEPY)
    assert a.data==b.data
    assert hashlib.sha256(raw).hexdigest()==p['sha256']
    for dependency in re.findall(r'^prgm([A-Z0-9]+)',text,re.M):assert dependency in programs,dependency
    # Stored program calculations do not depend on Python or an external helper.
    if name!='BME423':assert not re.search(r'^prgm',text,re.M)

def run(name,inputs,keys=(),menus=()):
    global runs
    vm=VM(inputs,keys,menus,root=ROOT/'source').run(decoded[name]);runs+=1
    return vm
def near(vm,var,expected,tol=2e-9):
    global checks
    assert math.isclose(vm.variables[var],float(expected),rel_tol=tol,abs_tol=tol),(var,vm.variables[var],expected)
    checks+=1
def valid(vm):assert not vm.errors,vm.errors

previews={}
for name,p in programs.items():
    if name=='BME423':continue
    vm=run(name,p['example']);valid(vm)
    assert vm.screens,(name,'no result screen')
    assert all(len(s)==10 and all(len(row)==26 for row in s) for s in vm.screens)
    assert all('ENTER' in s[9] for s in vm.screens)
    assert all('CHECK INPUT' not in ' '.join(s) for s in vm.screens)
    # CLEAR stops on the first result, rather than forcing every work screen.
    first=run(name,p['example'],keys=[45]);assert len(first.screens)==1,name
    previews[name]=dict(inputs=[dict(label=k,value=float(v)) for k,v in vm.input_log],screens=vm.screens)

# Execute every numerical family in the existing 224-problem bank. Classification
# and randomization/masking questions are concepts, not calculator calculations.
D=json.loads((R/'data.js').read_text().removeprefix('const DATA=').rstrip(';\n'))
covered=[];concept=[]
for p in D['problems']:
    g=p['given'];t=p['topic'];pid=p['id'];keys=[]
    if t in ['classification','trials']:concept.append(pid);continue
    if t=='summary':
        data=ast.literal_eval(g['data']) if 'data' in g else [2,4,6]
        name,inputs,var='BMDESC',[len(data),*data],'E' if pid!='population' else 'F'
    elif t=='percentile':
        data=[2,4,6,8,10,12,14] if pid=='percentile' else [2,4,6,8,10,12]
        name,inputs,var='BMPCTL',[len(data),*data,g['p']],'T'
    elif t=='random':name,inputs,var='BMCOIN',[3,2],'P'
    elif t=='independent':name,inputs,var='BMEVENT',[4/52,3/51],'P'
    elif t=='pmf':name,inputs,var='BMMASS',[3,1,2,3],'C'
    elif t=='expect':
        xs=list(map(float,g['x'].split(',')));ps=list(map(float,g['probabilities'].split(',')))
        name,inputs,var='BMDISC',[len(xs),*[z for pair in zip(xs,ps) for z in pair],max(xs)],'S'
    elif t=='dcdf':name,inputs,var='BMDISC',[3,0,.2,1,.5,2,.3,1.5],'F'
    elif t=='linear':name,inputs,var='BMLINE',[2,-3,0,10,4,9,1],'S'
    elif t=='ccdf':
        b=2 if pid=='density' else g['upper support']
        name,inputs,var='BMPDF',[0,2/b**2,0,b,b/2,0,b],'R'
    elif t=='integrate':name,inputs,var='BMEND',[.5,1],'T'
    elif t=='uniform':
        if pid=='uniform':a,b,lo,hi=2,8,3,5
        else:
            a,b=map(float,re.search(r'Uniform\(([^,]+),([^\)]+)\)',p['prompt']).groups())
            lo,hi=map(float,re.search(r'P\(([^<]+)<X<([^\)]+)\)',p['prompt']).groups())
        name,inputs,var='BMUNIF',[a,b,lo,hi],'P'
    elif t=='normalprob':name,inputs,var='BMNORM',[g['μ'],g['σ'],g['lower'],g['upper']],'P'
    elif t=='normalquant':name,inputs,var='BMINVN',[g['μ'],g['σ'],g['left-tail area']],'T'
    elif t=='sampling':
        if pid=='sampling':name,inputs,var='BMSE',[100,20,25,108,1e99],'P'
        else:name,inputs,var='BMSEM',[g['σ'],g['n']],'H'
    elif t=='estimators':name,inputs,var='BMSECH',[3,16,64],'T'
    elif t=='anova':
        means=ast.literal_eval(g['means']);sds=ast.literal_eval(g['SDs'])
        name,inputs,var='BMANOVA',[len(means),g['n per group'],*[v for pair in zip(means,sds) for v in pair],.05],'F'
    elif t=='onet':name,inputs,var='BMONE',[g['mean'],g['s'],g['n'],g['μ0'],.05],'T'
    elif t=='pooledt':
        n1,m1,s1=map(float,g['group 1'].split(','));n2,m2,s2=map(float,g['group 2'].split(','))
        name,inputs,var='BMTWO',[m1,s1,n1,m2,s2,n2,.05],'T'
    elif t=='posthoc':
        name,inputs,var='BMPAIR',[g['mean gap'],0,g['n'],g['n'],g['within variance']],'T';keys=[45]
    elif t=='bonferroni':
        if pid=='bonf':name,inputs,var='BMBONF',[.05,3,1,4/math.sqrt(8/5),12],'T'
        else:name,inputs,var='BMBONF',[.05,g['k']],'G';keys=[45]
    elif t=='holm':
        vals=[.008,.020,.040] if pid=='holm' else [.010,.030,.040]
        name,inputs,var='BMHOLM',[1,3,.05,*[v for pair in enumerate(vals,1) for v in pair]],'R'
    elif t=='binary':name,inputs,var='BMBIN',[g.get('m',g.get('events')),g.get('n',g.get('patients'))],'E'
    elif t=='zprop':
        m1,n1=map(int,g['m1/n1'].split('/'));m2,n2=map(int,g['m2/n2'].split('/'))
        name,inputs,var='BMZ',[m1,n1,m2,n2,.05],'T'
    elif t=='chi':
        table=ast.literal_eval(g['observed table']);flat=[v for row in table for v in row]
        name,inputs,var=('BMCHI2',flat+[.05],'T') if len(table)==len(table[0])==2 else ('BMCHIR',[len(table),len(table[0]),*flat,.05],'T')
    elif t=='gof':name,inputs,var='BMGOF',[3,255,.6,125,.25,90,.15,.05],'T'
    elif t=='risk':
        if pid=='risk':name,inputs,var='BMRISK',[10,100,20,100],'T'
        elif pid=='aspirin-risk':name,inputs,var='BMRISK',[6,19,18,25],'T'
        else:name,inputs,var='BMNNT',[g['treated'],g['control']],'R'
    elif t=='nnt':name,inputs,var='BMNNT',[.08,.03],'T'
    elif t=='odds':name,inputs,var='BMOR',([50,14,43,35] if pid=='smoke-odds' else [g['a'],g['b'],g['c'],g['d']]),'T'
    elif t=='rcode':name,inputs,var='BMOUTPUT',[1,g['p'],g['α']],'P'
    else:raise AssertionError(('Unmapped',pid,t))
    vm=run(name,inputs,keys);valid(vm)
    if t=='rcode':assert int(vm.variables['P']<vm.variables['A'])==p['answer'];checks+=1
    else:near(vm,var,p['answer'])
    covered.append(pid)
assert len(covered)==222 and len(concept)==2

# Extra source-based cases and edges, independent of the bank's answers.
for kind,df,df2,alpha in [('t',1,0,.05),('t',4,0,.05),('t',47,0,.05),('t',207,0,.05/3),('chi',1,0,.05),('chi',2,0,.001),('f',2,33,.05),('f',4,995,.01)]:
    mode={'t':2,'f':3,'chi':4}[kind]
    inputs=[mode,df]+([df2] if kind=='f' else [])+[alpha]
    vm=run('BMCRIT',inputs);valid(vm)
    expected=stats.t.isf(alpha/2,df) if kind=='t' else stats.chi2.isf(alpha,df) if kind=='chi' else stats.f.isf(alpha,df,df2)
    near(vm,'C',expected,tol=1e-8)
near(run('BMCRIT',[1,.05]),'C',stats.norm.isf(.025))
for a,b,l,u in [(0,.5,0,2),(1,0,0,1),(1,-.5,0,2)]:
    vm=run('BMPDF',[a,b,l,u,u+1,l-1,u+1]);valid(vm)
    near(vm,'K',1);near(vm,'P',1)
    mu=integrate.quad(lambda x:x*(a+b*x),l,u)[0]
    near(vm,'M',mu);near(vm,'S',integrate.quad(lambda x:(x-mu)**2*(a+b*x),l,u)[0])
for a,b in [(.1,1),(.5,1),(1,0),(0,2)]:
    vm=run('BMEND',[a,b]);valid(vm)
    near(vm,'T',optimize.brentq(lambda c:a*c+b*c*c/2-1,0,10))
vm=run('BMPIECE',programs['BMPIECE']['example']);near(vm,'K',.875);near(vm,'P',.75);near(vm,'M',1);near(vm,'S',1/6);near(vm,'R',1)
near(run('BMCONST',[0,1,0,2]),'K',.5)
near(run('BMSEVAR',[4,16]),'T',16*math.sqrt(2/15))
vm=run('BMSHIFT',[-26,1,95,75.69]);near(vm,'T',69);near(vm,'H',75.69)
near(run('BMSHIFT',[1,2,4/3],keys=[45]),'T',11/3)
near(run('BMSE',[4,1.5,50,3.5,3.8]),'P',stats.norm.cdf(3.8,4,1.5/math.sqrt(50))-stats.norm.cdf(3.5,4,1.5/math.sqrt(50)))
# Every endpoint-inclusion combination, including a zero-width interval.
for low,high in [(2,7),(2,2),(1,8)]:
    for li in [0,1]:
        for hi in [0,1]:
            xs=np.array([-1,2,3,7]);ps=np.array([.55,.15,.1,.2]);mask=((xs>=low) if li else (xs>low))&((xs<=high) if hi else (xs<high))
            near(run('BMDCDF',[4,-1,.55,2,.15,3,.1,7,.2,low,high,li,hi]),'P',ps[mask].sum())
near(run('BMPCTL',[2,1,9,0]),'T',1);near(run('BMPCTL',[2,1,9,100]),'T',9)
near(run('BMCOIN',[3,0]),'P',1/8)
near(run('BMCOIN',[3,3]),'P',1/8)
near(run('BMCHI2',[5,5,5,5,.05]),'T',0)
near(run('BMZ',[5,10,5,10,.05]),'T',0)
near(run('BMZ',[0,20,10,20,.05]),'T',math.sqrt(stats.chi2_contingency([[0,20],[10,10]],correction=True).statistic))
near(run('BMANOVA',[2,5,10,2,10,2,.05]),'P',1)
near(run('BMBONF',[.05,3,2,5.57719298245614,1]),'R',stats.chi2.isf(.05/3,1))
vm=run('BMHOLM',[3,3,1,.05,3,18.234,1,9.4944,2,4.6895]);near(vm,'R',3);assert list(vm.lists['BMID'])==[3,1,2]
vm=run('BMHOLM',[1,3,.05,1,.2,2,.3,3,.4]);near(vm,'R',0)
vm=run('BMNNT',[0,0]);valid(vm);assert 'NOT FINITE' in ' '.join(vm.screens[0])
vm=run('BMNNT',[.1,.1]);valid(vm);assert 'NOT FINITE' in ' '.join(vm.screens[0])
near(run('BMNNT',[.08,.03]),'T',20)
near(run('BMNNT',[.01,.008]),'T',500)
near(run('BMOR',[0,10,5,10]),'T',0)
# Larger tables, including more columns than rows; no Yates outside 2x2.
rng=np.random.default_rng(423)
for rows,cols in [(2,3),(3,2),(4,3),(5,5)]:
    for _ in range(3):
        a=rng.integers(1,40,size=(rows,cols));vm=run('BMCHIR',[rows,cols,*a.flatten().tolist(),.05]);valid(vm)
        ref=stats.chi2_contingency(a,correction=False)
        near(vm,'T',ref.statistic);near(vm,'P',ref.pvalue);near(vm,'D',ref.dof)
        assert np.allclose(vm.lists['BME'],ref.expected_freq.flatten())
for mean,sd,n,ref in [(10,2,5,10),(3,1.2,10,4),(-2,.5,7,-2.5)]:
    vm=run('BMONE',[mean,sd,n,ref,.05]);valid(vm)
    near(vm,'T',(mean-ref)/(sd/math.sqrt(n)));near(vm,'P',2*stats.t.sf(abs((mean-ref)/(sd/math.sqrt(n))),n-1))
for name,inputs in [('BMDISC',[2,1,.4,2,.5]),('BMDISC',[1,1,-.1]),('BMZ',[0,10,0,10,.05]),
                    ('BMCHI2',[0,0,1,2,.05]),('BMOR',[1,0,2,3]),('BMPDF',[0,1,0,2]),
                    ('BMEND',[0,0]),('BMONE',[1,0])]:
    vm=run(name,inputs);assert vm.errors,(name,'invalid input was not rejected');assert not vm.screens
# The optional launcher uses the same files and reaches the right calculator.
vm=run('BME423',programs['BMONE']['example'],menus=[3,1]);valid(vm);near(vm,'T',(76.8-72)/(4.15/math.sqrt(5)))
assert len(vm.screens)==4

report=dict(programs=len(programs),executions=runs,independentNumericChecks=checks,
            manifestSHA256=hashlib.sha256((ROOT/'manifest.json').read_bytes()).hexdigest(),
            bankProblemsVerified=covered,conceptOnlyBankProblems=concept,
            binaryChecks='TI file container sizes, checksums, names, model support, and source/token round trip',
            execution='Decoded TI-BASIC execution harness; distribution primitives supplied by SciPy; not a physical calculator/ROM test',
            layout='26 columns x 10 rows, CE / CE Python',passed=True)
(ROOT/'validation.json').write_text(json.dumps(report,indent=2)+'\n')
(ROOT/'previews.json').write_text(json.dumps(previews,ensure_ascii=False,separators=(',',':'))+'\n')
print(f'PASS: {len(programs)} .8xp files; {runs} decoded-code executions; {checks} numeric comparisons; all 222 numerical bank problems, source cases, critical values, endpoint choices, invalid inputs, CLEAR exit, launcher and CE screens. Hardware not emulated.')
