"""Add general symbolic rules above the complete, unchanged worked calculations.

Uses the reviewed operation map shared with the notation references. Only
calculation steps get equations; conceptual and hypothesis-only steps retain
their existing text. Numbered cells/pairs keep every individual calculation.
"""
from pathlib import Path
import json,re
import build_step_references as refs
R=Path(__file__).resolve().parents[1]
def load(name):return json.loads((R/name).read_text().split('=',1)[1].rstrip(';\n'))
chains=load('worked-equation-chain-data.js')
rules={key:val['tex'] for key,val in refs.guide['rules'].items()}
# Context-specific general expressions use the same symbols as the work below.
rules.update({
 'range':[r'\operatorname{range}=x_{\max}-x_{\min}'],
 'medianrange':[],
 'cdfboundary':[r'F(t)=P(X\le t)=\sum_{x\le t}f(x)',r'P(X<t)=\sum_{x<t}f(x)'],
 'densitysketch':[r'F(t)=\int_{-\infty}^{t}f(x)\,dx'],
 'densityconstant':[r'\int_0^c f(x)\,dx=1',r'Aq^2+Bq+C=0\ \Rightarrow\ q=\frac{-B\pm\sqrt{B^2-4AC}}{2A}'],
 'estimatedmeans':[r'\hat\mu=\bar x,\qquad\hat\sigma=s',r'\mathrm{SEM}_{\mathrm{new}}=\mathrm{SEM}_{\mathrm{old}}\sqrt{\frac{n_{\mathrm{old}}}{n_{\mathrm{new}}}}'],
 'fractionnotation':[r'r_g=\frac{m_g}{n_g}',r'\mathrm{RR}_{i/j}=\frac{r_i}{r_j}=\frac{m_i/n_i}{m_j/n_j}'],
 'directrr':[r'r_g=\frac{m_g}{n_g}',r'\mathrm{RR}_{i/j}=\frac{r_i}{r_j}=\frac{m_i/n_i}{m_j/n_j}'],
 'individualrecover':[r'\sigma=\mathrm{SEM}\sqrt n'],
 'sampleplanning':[r'n=\left(\frac{\sigma}{\mathrm{SEM}_{\mathrm{target}}}\right)^2'],
 'normalpdf':[r'f(x)=\frac1{\sigma\sqrt{2\pi}}\exp\!\left[-\frac{(x-\mu)^2}{2\sigma^2}\right]'],
 'normalshape':[],
 'normalpartition':[r'P(X<l)=\Phi\!\left(\frac{l-\mu}{\sigma}\right)',r'P(l\le X<u)=\Phi\!\left(\frac{u-\mu}{\sigma}\right)-\Phi\!\left(\frac{l-\mu}{\sigma}\right)',r'P(X\ge u)=1-\Phi\!\left(\frac{u-\mu}{\sigma}\right)'],
 'populationmoments':[r'E[X]=\mu,\qquad\operatorname{Var}(X)=\sigma^2',r'E[X+c]=E[X]+c'],
 'shift':[r'W=Z+c:\quad E[W]=E[Z]+c',r'\operatorname{Var}(W)=\operatorname{Var}(Z),\qquad\operatorname{SD}(W)=\sqrt{\operatorname{Var}(W)}'],
 'varianceboth':[r'\operatorname{Var}(X)=\sum_x(x-\mu)^2f(x)=E[X^2]-(E[X])^2'],
 'binarychange':[r'\widehat{\operatorname{SD}}(X)=\sqrt{\hat p(1-\hat p)}',r'\mathrm{SE}_{\mathrm{new}}(\hat p)=\mathrm{SE}_{\mathrm{old}}(\hat p)\sqrt{\frac{n_{\mathrm{old}}}{n_{\mathrm{new}}}}'],
 'odds_groups':[r'\mathrm{odds}_{\mathrm{case}}=\frac{\text{exposed cases}}{\text{unexposed cases}}',r'\mathrm{odds}_{\mathrm{control}}=\frac{\text{exposed controls}}{\text{unexposed controls}}',r'\mathrm{OR}=\frac{\mathrm{odds}_{\mathrm{case}}}{\mathrm{odds}_{\mathrm{control}}}'],
 'reverseodds':[r'\mathrm{OR}_{\mathrm{reversed}}=\frac1{\mathrm{OR}}'],
 'absolutechange':[r'|\Delta\mathrm{risk}|=|r_C-r_T|'],
 'harmchange':[r'\mathrm{ARI}=r_T-r_C'],
 'gofcell':[r'c_i=\frac{(O_i-E_i)^2}{E_i}'],
 'samplemeaninterval':[r'P(l<\bar X<u)=\Phi\!\left(\frac{u-\mu}{\sigma/\sqrt n}\right)-\Phi\!\left(\frac{l-\mu}{\sigma/\sqrt n}\right)'],
 'samplemeanvar':[r'\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}'],
 'cellchiidentity':[r'\chi_Y^2=z_Y^2'],
 'familycount':[r'k=\#\{\text{requested comparisons}\}'],
 'allfamily':[r'k=\frac{m(m-1)}2'],
 'controlfamily':[r'k=m-1'],
 'sortvalues':[r'x_{(1)}\le x_{(2)}\le\cdots\le x_{(n)}'],
 'ssshortcut':[r'\sum_i(x_i-\bar x)^2=\sum_i x_i^2-\frac{(\sum_i x_i)^2}{n}'],
 'uniformcdf':[r'F(x)=\frac{x-a}{b-a}\quad(a<x<b)'],
})
rules['medianrange']=rules['median']+rules['range']
rules['normalshape']=rules['normalpdf']+rules['ccdf']

def general_keys(pid,s,index,mode):
 topic=refs.by_id[pid]['topic'];label=s['label'];maths=chains[mode][pid][index]
 if not maths or any(re.search(r'H_\{?0\}?\s*:',tex) for tex in maths):return []
 keys=refs.reference_rules(pid,s,index,mode)
 if label=='Median, quartiles and IQR':keys=['rank','interpolate','median','iqr']
 if label in ('Complete CDF and sketches','Full CDF') and topic in ('expect','pmf','dcdf','random'):keys=['dcdf']
 if label in ('Requested family and adjusted level','All-pair family and cutoff'):
  family='controlfamily' if topic=='bonferroni' and pid!='bonf' else 'allfamily'
  keys=[family,'bonf','pairdf','bonftail']+(['pairse'] if label=='All-pair family and cutoff' else [])
 if label in ('Population SD',):keys=['rvsd']
 if label=='Second moment' and topic=='integrate':keys=['cex2']
 if label=='Moments from the density':keys=['cex','cex2','var','linearmean']
 if label=='Interval probability' and topic=='sampling':keys=['samplemeaninterval']
 if label=='Number of people':keys=['nnh' if any('NNH' in tex for tex in maths) else 'nnt']
 if label=='Absolute event-risk change':keys=['harmchange' if pid=='nnh' else 'arr']
 if label=='Largest departure contribution':keys=['gofcell']
 if label=='Calculate contributions' and topic=='gof':keys=['gofcell','gof']
 if label=='Count the specified family':keys=['familycount']
 if label.startswith('Control versus Group '):keys=['expected','yatescell','chisum','chidf','holm','chidecision']
 if label=='Equivalent corrected chi-square comparison':keys=['cellchiidentity','chidf']
 if label=='Find variance of the group means':keys=['popss' if pid=='population' else 'meansvar']
 if 'cdfboundary' in keys and topic not in ('expect','pmf','dcdf','random'):keys=['ccdf']
 for key in keys:assert key in rules,(pid,label,key)
 return list(dict.fromkeys(keys))

# Each embedded Apply-it display is classified by its actual mathematical
# operations, not by a general formula bank placed elsewhere on the page.
def source_keys(key,tex,index):
 if key in ('language','classify','normal','linear','tables','decision','chooser','trial','binary','uniform-definition','cltwhy','anovaoutput'):return []
 if key=='uniform' and index==0 or key=='pairs' and index==0:return []
 if key=='discrete' and index==1 or key=='depend' and index==2 or key=='endpoint' and index==2:return []
 selected=[]
 def add(*keys):selected.extend(keys)
 if key=='describe':
  return [['mean','deviation','squares'],['ss','samplevar','sd','sem'],['ssshortcut'],[],['median','range'],['rank'],['interpolate'],['sechange']][index]
 if key=='percent':return ['rank','interpolate'] if index==0 else ['rank','interpolate','iqr']
 if key=='discrete':return ['validpmf','ex','ex2','var'] if index==0 else ['dcdf']
 if key=='depend':return ['count'] if index==0 else ['conditional']
 if key=='continuous':return [['area','ccdf','tails'],['cex','cex2','var'],['medianarea']][index]
 if key=='normalwork':return ['z'] if index==0 else ['phi','normalinterval','normalright']
 if key=='inverse':return ['zquant','quantile']
 if key=='sampling':return [] if index==0 else ['meanse','meanz','samplemeaninterval']
 if key=='ti':return ['pool','diffse','twot']
 if key=='anova':return [['within'],['grand','meansvar'],['meansvar','between'],['f','fdf']][index]
 if key in ('pooled','unequal'):return ['squaredsds','pool','diffse','twot','tdf']
 if key=='onet':return ['sem','gap','onet','odf']
 if key=='pairs':return ['pairse','pairt']
 if key=='multiplicity':return ['bonf','bonftail','holm']
 if key=='z':return [['prop','proppool'],['propdiffse'],['yatesgap'],['zprop']][index]
 if key=='chi2':return ['expected'] if index==0 else ['yatescell','chisum','chidf']
 if key=='large':return ['expected','chicell','chisum','chidf']
 if key=='gof':return ['gofexpected','gofcell','gof']
 if key=='risk':return ['risks','rr','arr','nnt'] if index==0 else ['odds_groups']
 if key=='output':return ['holm','chidecision']
 if key=='proportionwork':return ['prop','binaryvar'] if index==0 else ['binarysd','propse']
 if key in ('uniform','uniform-worked'):return ['ccdf','cex','cex2','var']
 if key=='functionmean':return ['ceh','cex','linearmean']
 if key=='endpoint':
  if index==0:return ['densityconstant']
  if index in (1,3):return ['ccdf']
  if index==4:return ['cex']
  if index==5:return ['linearmean']
  if index==6:return ['cex2']
  if index==7:return ['var']
  if index==8:return ['tails']
  if index==9:return ['interval']
  if index==10:return ['point']
 raise AssertionError(('Unreviewed embedded solution',key,index))

def build():
 pack={'rules':rules,'D':{},'C':{},'sources':{}}
 for pid,q in refs.version_d['problems'].items():
  pack['D'][pid]=[general_keys(pid,s,i,'D') for i,s in enumerate(q['flow'])]
  pack['D'][refs.neuro['byOriginal'][pid]]=pack['D'][pid]
 for pid,flow in refs.old['problems'].items():pack['C'][pid]=[general_keys(pid,s,i,'C') for i,s in enumerate(flow)]
 for mode,sources in chains['sources'].items():
  pack['sources'][mode]={}
  for key,html in sources.items():
   displays=re.findall(r'\\\[([\s\S]*?)\\\]',html)
   pack['sources'][mode][key]=[source_keys(key,tex,i) for i,tex in enumerate(displays)]
 for mode in ['D','C']:
  for pid,steps in pack[mode].items():
   assert len(steps)==len(chains[mode][pid])
   for i,keys in enumerate(steps):
    if not keys:
     maths=chains[mode][pid][i]
     assert not maths or any(re.search(r'H_\{?0\}?\s*:',tex) for tex in maths),(mode,pid,i,'unassigned numerical step')
    for k in keys:assert rules[k],(mode,pid,i,k)
 used={k for mode in ['D','C'] for steps in pack[mode].values() for keys in steps for k in keys}
 used.update(k for mode in pack['sources'].values() for slots in mode.values() for keys in slots for k in keys)
 pack['rules']={k:rules[k] for k in sorted(used)}
 (R/'worked-general-equation-data.js').write_text('const WORKED_GENERAL='+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
 print('Assigned general equations to',sum(bool(keys) for mode in ['D','C'] for steps in pack[mode].values() for keys in steps),'calculation steps across',sum(len(pack[mode]) for mode in ['D','C']),'example/version entries.')
if __name__=='__main__':build()
