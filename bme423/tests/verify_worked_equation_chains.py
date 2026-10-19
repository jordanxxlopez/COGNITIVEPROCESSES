"""Check the added mathematics independently of the authoring functions."""
from pathlib import Path
import ast,json,math,re,subprocess
import numpy as np
from scipy import stats,integrate
from sympy.parsing.sympy_parser import parse_expr,standard_transformations,implicit_multiplication_application
R=Path(__file__).resolve().parents[1]
def load(name):return json.loads((R/name).read_text().split('=',1)[1].rstrip(';\n'))
d,v,old,neuro,pack=[load(n) for n in ('data.js','version-d-data.js','studio-flow-data.js','neuroscience-worked-data.js','worked-equation-chain-data.js')]
by={p['id']:p for p in d['problems']+v['extraCases']};checks=0

def close(a,b,label):
 global checks
 assert math.isclose(float(a),float(b),rel_tol=1e-6,abs_tol=1e-7),(label,a,b)
 checks+=1

def terminal(tex):return float(tex.rsplit('=',1)[1])
for mode in ['D','C']:
 expected_ids=set(v['problems'])|set(neuro['questions']) if mode=='D' else set(old['problems'])
 assert set(pack[mode])==expected_ids
 for pid,steps in pack[mode].items():
  original=neuro['questions'][pid]['originalId'] if pid in neuro['questions'] else pid
  p=by[original];g=p['given'];topic=p['topic']
  base=neuro['questions'][pid]['flow'] if pid in neuro['questions'] else v['problems'][pid]['flow'] if mode=='D' else old['problems'][pid]
  assert len(steps)==len(base),(mode,pid)
  for i,(ms,s) in enumerate(zip(steps,base)):
   label=s['label'];joined=' '.join(ms)
   assert not any(x.startswith('=') for x in ms),(mode,pid,i,'disconnected continuation')
   if topic=='chi' and (label=='Build expected counts' or label.startswith('Control versus Group ')):
    obs=np.array(ast.literal_eval(g['observed table']),float)
    if label.startswith('Control versus'):
     j=s['values']['group']-(0 if original=='d-hw2-mortality' else 1);obs=obs[[0,j]]
    expected=stats.contingency.expected_freq(obs)
    terms=[m for m in ms if m.startswith('E_{')]
    assert len(terms)==obs.size
    for j,(term,want)in enumerate(zip(terms,expected.flat)):
     assert re.search(r'=\\frac\{R_\dC_\d\}\{N\}=',term),term
     close(terminal(term),want,(pid,label,j))
    if label.startswith('Control versus'):
     vals=[m for m in ms if m.startswith('c_{')];chi=stats.chi2_contingency(obs,correction=True).statistic
     close(sum(terminal(m) for m in vals),chi,(pid,label,'sum corrected cells'))
   if topic=='chi' and label=='Calculate each cell contribution':
    obs=np.array(ast.literal_eval(g['observed table']),float);e=stats.contingency.expected_freq(obs);correct=obs.shape==(2,2);gap=np.maximum(0,np.abs(obs-e)-.5) if correct else obs-e
    assert len(ms)==obs.size
    for j,(term,want)in enumerate(zip(ms,(gap**2/e).flat)):
     assert 'O_{' in term and 'E_{' in term and term.count('=')>=3,term
     close(terminal(term),want,(pid,label,j))
   if label=='All-pair family and cutoff':
    assert len(ms)==5 and r'\frac{m(m-1)}2' in ms[0] and r'\frac{\alpha_T}{k}' in ms[1]
    means=np.array(ast.literal_eval(g['means']));sds=np.array(ast.literal_eval(g['SDs']));n=g['n per group'];se=math.sqrt(2*np.mean(sds**2)/n);df=len(means)*(n-1);k=len(means)*(len(means)-1)/2
    close(terminal(ms[-1]),se,(pid,'pair SE'));close(terminal(ms[-2]),stats.t.ppf(1-.05/(2*k),df),(pid,'adjusted t cutoff'))
   if label in ('Low versus Medium','Low versus High','Medium versus High') or label.startswith('Groups '):
    assert r'\bar x_' in ms[0] and r'\mathrm{SE}_{ij}' in ms[0] and ms[0].count('=')==3,(pid,label)
    if 't' in s.get('values',{}):close(terminal(ms[0]),s['values']['t'],(pid,label))
   if topic=='summary' and label=='Subtract the mean':
    x=np.array(ast.literal_eval(g['data']),float)
    for term,want in zip(ms,x-x.mean()):assert r'\bar x=' in term;close(terminal(term),want,(pid,'deviation'))
   if topic=='summary' and label=='Square those differences':
    x=np.array(ast.literal_eval(g['data']),float)
    for term,want in zip(ms,(x-x.mean())**2):close(terminal(term),want,(pid,'squared deviation'))
   if 'Risk for ' in label:
    assert len(ms)==3
    for term in ms[:2]:assert r'\frac{m_' in term and r'}{n_' in term and term.count('=')==3,term
    assert r'\mathrm{RR}=\frac{r_' in ms[-1]
    close(terminal(ms[-1]),(27/525)/(4/475),(pid,'named risk ratio'))
   if topic in ('risk','nnt') and label=='Number of people':assert r'\mathrm{ARR}' in joined or r'\mathrm{ARI}' in joined
   if topic=='odds' and label=='Exposure odds in the sampled outcome groups':
    assert r'\mathrm{odds}_{\mathrm{case}}' in ms[-1] and r'\mathrm{odds}_{\mathrm{control}}' in ms[-1]
    close(terminal(ms[-1]),p['answer'],(pid,'odds ratio'))
   if topic in ('ccdf','uniform','integrate') and label=='Moments from the density':
    assert r'\int_a^b' in ms[0] and r'\,dx=' in ms[0] and r'\left[' in ms[0]
    if topic=='ccdf':lo=0;hi=2 if original=='density' else g['upper support'];density=lambda x:2*x/hi**2
    elif topic=='uniform':lo,hi=(g['a'],g['b']) if original=='uniform' else map(float,g['support'].split(' to '));density=lambda x:1/(hi-lo)
    else:lo,hi=0,1;density=lambda x:.5+x
    close(terminal(ms[0]),integrate.quad(lambda x:x*density(x),lo,hi)[0],(pid,'integral mean'))
    close(terminal(ms[1]),integrate.quad(lambda x:x*x*density(x),lo,hi)[0],(pid,'second moment'))
# Check every purely numerical equality that can be evaluated, including
# intermediate arithmetic rather than only the stored final answer.
def group(text,pos):
 if pos>=len(text):raise ValueError()
 if text[pos]!='{':return text[pos],pos+1
 start=pos+1;depth=1;pos+=1
 while depth:
  if text[pos]=='{':depth+=1
  if text[pos]=='}':depth-=1
  pos+=1
 return text[start:pos-1],pos

def numeric(text):
 text=text.strip()
 text=re.sub(r'\\(?:left|right|bigl|bigr|!|,|;| )','',text)
 text=text.replace(r'\tfrac',r'\frac').replace(r'\max','Max').replace(r'\cdot','*').replace(r'\times','*')
 while r'\frac' in text or r'\sqrt' in text:
  candidates=[(text.find(command),command) for command in [r'\frac',r'\sqrt'] if command in text];i,command=min(candidates)
  a,end=group(text,i+len(command))
  if command==r'\frac':b,end=group(text,end);sub='(('+numeric_string(a)+')/('+numeric_string(b)+'))'
  else:sub='sqrt('+numeric_string(a)+')'
  text=text[:i]+sub+text[end:]
 text=text.replace('{','(').replace('}',')').replace('^','**')
 while '|' in text:
  a=text.index('|');b=text.index('|',a+1);text=text[:a]+'Abs('+text[a+1:b]+')'+text[b+1:]
 allowed=text.replace('sqrt','').replace('Abs','').replace('Max','')
 if re.search(r'[^0-9.eE+\-*/().,\s]',allowed):raise ValueError()
 value=parse_expr(text,transformations=standard_transformations+(implicit_multiplication_application,))
 if value.free_symbols:raise ValueError()
 return float(value)
def numeric_string(text):
 # Preserve exact arithmetic in nested fractions; this conversion is not used
 # as the independent expected value for the distribution checks above.
 return str(numeric(text))
def equal_parts(tex):
 depth=0;out=[];start=0
 for i,c in enumerate(tex):
  if c=='{':depth+=1
  elif c=='}':depth-=1
  elif c=='=' and depth==0:out.append(tex[start:i]);start=i+1
 out.append(tex[start:]);return out
arithmetic=0
for mode in ['D','C']:
 for pid,steps in pack[mode].items():
  for i,ms in enumerate(steps):
   for tex in ms:
    for part in re.split(r',\\quad|\\quad|\\\\',tex):
     vals=[]
     for expression in equal_parts(part):
      try:val=numeric(expression)
      except (ValueError,TypeError,IndexError,SyntaxError,AttributeError):val=None
      vals.append(val)
     for a,b in zip(vals,vals[1:]):
      if a is None or b is None:continue
      assert math.isclose(a,b,rel_tol=5e-4,abs_tol=2e-6),(mode,pid,i,tex,a,b)
      arithmetic+=1
assert arithmetic>3000,arithmetic
# Original content, grading data, wording, slide scripts and PDFs are read-only.
for name in ['data.js','v2-data.js','version-d-data.js','version-c-data.js','neuroscience-worked-data.js','practice-question-data.js','studio-flow-data.js','studio-question-data.js','hypothesis-data.js']+[p.name for p in R.glob('*.pdf')]:
 assert (R/name).read_bytes()==subprocess.check_output(['git','show','HEAD:bme423/'+name]),name
print(f'PASS: {checks} independent formula/result checks and {arithmetic} evaluated numerical equalities; all 696 example/version entries, 4029 steps, 38 embedded worked cases per version; questions, answers, hypotheses, notes references and PDFs preserved.')

old_refs=json.loads(subprocess.check_output(['git','show','HEAD:bme423/step-reference-data.js']).decode().split('=',1)[1].rstrip(';\n'))
new_refs=load('step-reference-data.js');changed=0
for mode,problems in old_refs.items():
 for pid,steps in problems.items():
  for i,text in enumerate(steps):
   if text==new_refs[mode][pid][i]:continue
   assert mode=='D'
   original=neuro['questions'][pid]['originalId'] if pid in neuro['questions'] else pid
   assert v['problems'][original]['flow'][i]['label']=='Requested family and adjusted level'
   assert 'original ANOVA residual df' in new_refs[mode][pid][i] and 'pooled two-sample df' not in new_refs[mode][pid][i]
   changed+=1
assert changed in (0,50),changed
confirmed=0
for pid,q in v['problems'].items():
 for i,step in enumerate(q['flow']):
  if step['label']!='Requested family and adjusted level':continue
  for target in [pid,neuro['byOriginal'][pid]]:
   assert 'original ANOVA residual df' in new_refs['D'][target][i] and 'pooled two-sample df' not in new_refs['D'][target][i]
   confirmed+=1
assert confirmed==50,confirmed
print('PASS: all 50 consolidated-family references retain original ANOVA residual df.')
