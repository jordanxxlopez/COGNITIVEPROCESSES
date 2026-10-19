"""Build a separate V5: equations and substitutions belong to the same step.

Read V4 as an immutable source. No V4 builder, figure or PDF is regenerated.
Explicit placements keep equations with their corresponding operation; the
placement manifest records the old work and the final step for review.
"""
from copy import deepcopy
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
raw = (ROOT / 'exam-sheet-v4-data.js').read_text()
source = json.loads(raw.removeprefix('const V4_PACK=').rstrip(';\n'))
pack = deepcopy(source)
pack['revision'] = 'v5-equations-with-each-step-full-algebra'
pack['minimumBodyPt'] = 6.1
audit = {}

# Replacements are whole operations, never a second bank of general formulas.
# A tuple means two lines of the SAME numbered operation when one would be wide.
R = {
 'summary': {
  1: (r'\sum x_i=645,\quad n=10', r'\bar x=\frac{\sum x_i}{n}=\frac{645}{10}=64.5'),
  3: (r'\sum(x_i-\bar x)^2=82.5', r's^2=\frac{\sum(x_i-\bar x)^2}{n-1}=\frac{82.5}{9}=9.16667'),
  4: r's=\sqrt{s^2}=\sqrt{9.16667}=3.02765',
  5: r'\mathrm{SEM}=\frac{s}{\sqrt n}=\frac{3.02765}{\sqrt{10}}=.957427',
 },
 'percentile': {
  1: r'r=1+\frac{p(n-1)}{100}=1+\frac{30(5-1)}{100}=2.2=I+d',
  2: (r'x_p=x_{(I)}+d[x_{(I+1)}-x_{(I)}]', r'x_{30}=7+.2(8-7)=7.2'),
 },
 'discrete': {
  1: (r'f(x)\ge0,\quad\sum_x f(x)=.55+.15+.10+.20=1',),
  2: r'\mu=E[X]=\sum_x xf(x)=-.55+.30+.30+1.40=1.45',
  3: r'E[X^2]=\sum_x x^2f(x)=.55+.60+.90+9.80=11.85',
  4: r'\operatorname{Var}(X)=E[X^2]-\mu^2=11.85-1.45^2=9.74750',
  5: (r'\operatorname{Var}(X)=\sum_x(x-\mu)^2f(x)',),
  7: (r'F(t)=\sum_{x\le t}f(x)',),
 },
 'loaded': {
  1: (r'\sum_xf(x)=.20+5(.16)=1', r'P(X\le3)=F(3)=\sum_{x\le3}f(x)=.20+.16+.16=.52'),
  2: (r'E[X]=\sum_x xf(x)=1(.20)+(2+3+4+5+6)(.16)',r'=3.4'),
  3: (r'E[X^r]=\sum_x x^rf(x)',r'E[X^2]=.20+(4+9+16+25+36)(.16)=14.6'),
 },
 'events': {
  1: (r'P(A\cap B)=P(A)P(B\mid A)', r'P(\text{two kings})=\frac4{52}\frac3{51}=.00452489'),
 },
 'continuous': {
  1: r'\int_a^b f(x)\,dx=\int_0^2\frac{x}{2}\,dx=\left[\frac{x^2}{4}\right]_0^2=1',
  2: (r'F(t)=\int_a^t f(u)\,du',),
  3: r'P(X<1)=F(1)=\frac{1^2}{4}=.25',
  4: (r'P(X>t)=1-F(t)',r'P(X>1.5)=1-\frac{1.5^2}{4}=.4375'),
  5: (r'E[X]=\int_a^b xf(x)\,dx',),
  6: (r'E[X^r]=\int_a^b x^rf(x)\,dx\quad(r=2)',),
  7: r'\operatorname{Var}(X)=E[X^2]-\mu^2=2-(4/3)^2=2/9',
  8: r'F(q)=.5:\quad q^2/4=.5\Rightarrow q=\sqrt2=1.41421',
 },
 'piecewise': {2: (r'F(t)=\int_a^s f_1(u)\,du+\int_s^t f_2(u)\,du\quad(t>s)',)},
 'endpoint': {
  1: (r'\int_{\mathrm{support}}f(x)\,dx=1',),
  3: (r'Ac^2+Bc+D=0:\quad c=\frac{-B\pm\sqrt{B^2-4AD}}{2A}',),
 },
 'uniform': {},
 'coefficient': {
  1: (r'1=\int_a^b kg(x)\,dx=k\int_a^b g(x)\,dx',),
 },
 'normal': {
  1: r'z_{85}=\frac{x-\mu}{\sigma}=\frac{85-95}{8.7}=-1.14943\approx-1.15',
  2: r'z_{115}=\frac{x-\mu}{\sigma}=\frac{115-95}{8.7}=2.29885\approx2.30',
  3: (r'\Phi(z)=P(Z\le z)',),
  4: (r'P(X<85)=\Phi(-1.15)=1-\Phi(1.15)',r'=1-.8749=.1251'),
  5: (r'P(l<X<u)=\Phi(z_u)-\Phi(z_l)',),
 },
 'quantile': {
  1: r'p=.975,\quad z_p=\Phi^{-1}(p)=\Phi^{-1}(.975)=1.96',
  2: r'x_p=\mu+z_p\sigma=95+1.96(8.7)=112.052',
 },
 'sampling': {
  1: (r'E[\bar X]=\mu=4,\quad\operatorname{Var}(\bar X)=\sigma^2/n', r'\mathrm{SEM}=\frac{\sigma}{\sqrt n}=\frac{1.5}{\sqrt{50}}=.212132'),
  2: r'z_L=\frac{\bar x-\mu}{\sigma/\sqrt n}=\frac{3.5-4}{.212132}=-2.35702',
  3: r'z_U=\frac{\bar x-\mu}{\sigma/\sqrt n}=\frac{3.8-4}{.212132}=-.942809',
 },
 'linear': {
  1: (r'E[aX+b]=a\mu+b', r'E[X-26]=1(95)-26=69'),
  2: (r'\operatorname{Var}(aX+b)=a^2\sigma^2', r'\operatorname{Var}(X-26)=1^2(8.7)^2=75.69,\quad\operatorname{SD}=8.7'),
  3: (r'E[aX+bY+c]=a\mu_X+b\mu_Y+c', r'\operatorname{Var}(aX+bY+c)=a^2\sigma_X^2+b^2\sigma_Y^2'),
 },
 'one-t': {
  1: (r'H_0:\mu=\mu_0,\quad H_1:\mu\ne\mu_0',),
  2: r'\mathrm{SEM}=s/\sqrt n=16/\sqrt{16}=4',
  4: (r't=\frac{\bar x-\mu_0}{s/\sqrt n}=\frac{-12}{4}=-3', r'\nu=n-1=16-1=15'),
 },
 'pooled-t': {
  1: (r'H_0:\mu_1=\mu_2,\quad H_1:\mu_1\ne\mu_2', r's_1^2=8.4^2=70.56,\quad s_2^2=9.5^2=90.25', r'\nu=n_1+n_2-2=22+27-2=47'),
  2: (r's_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}',),
  3: (r'\mathrm{SE}_{\Delta}=\sqrt{s_p^2(1/n_1+1/n_2)}',),
  4: r't=\frac{\bar x_1-\bar x_2}{\mathrm{SE}_{\Delta}}=\frac{49-57}{2.59213}=-3.08627',
 },
 'anova': {
  1: (r'H_0:\mu_1=\cdots=\mu_m;\quad H_1:\text{not all equal}', r's_{\mathrm{wit}}^2=\frac{\sum_i s_i^2}{m}',),
  2: r'\bar{\bar x}=\frac{\sum_i\bar x_i}{m}=\frac{1188+1412+1363}{3}=1321',
  4: (r'\sum_i(\bar x_i-1321)^2',r'=17689+8281+1764=27734'),
  5: (r's_{\bar x}^2=\frac{\sum_i(\bar x_i-\bar{\bar x})^2}{m-1}=\frac{27734}{2}=13867',),
  6: r's_{\mathrm{bet}}^2=n s_{\bar x}^2=12(13867)=166404',
  7: r'F=\frac{s_{\mathrm{bet}}^2}{s_{\mathrm{wit}}^2}=\frac{166404}{39763.7}=4.18483',
  8: r'\nu_n=m-1=2,\quad\nu_d=m(n-1)=3(11)=33',
 },
 'bonferroni': {
  1: (r'k=\begin{cases}m(m-1)/2&\text{all pairs}\\m-1&\text{vs control}\end{cases}', r'\mathrm{SE}_{ij}=\sqrt{s_{\mathrm{wit}}^2(1/n_i+1/n_j)}',),
  2: r'|t_{13}|=\frac{|\bar x_1-\bar x_3|}{\mathrm{SE}_{13}}=\frac{1.5}{.580425}=2.58431',
  5: r'\alpha_{\mathrm{pair}}=\alpha_T/k=.05/3=.0166667',
 },
 'holm': {1: (r'\alpha_j=\frac{\alpha_T}{k-j+1},\quad j=1,\ldots,k',)},
 'binary': {
  1: r'\hat p=m/n=8/61=.131148',
  2: r'\widehat{\operatorname{Var}}(X)=\hat p(1-\hat p)=.113948',
  3: r'\widehat{\operatorname{SD}}(X)=\sqrt{\hat p(1-\hat p)}=\sqrt{.113948}=.337562',
  4: r'\widehat{\operatorname{SE}}(\hat p)=\sqrt{\frac{\hat p(1-\hat p)}{n}}=\sqrt{\frac{.113948}{61}}=.0432203',
 },
 'z-yates': {
  1: (r'H_0:p_1=p_2,\quad H_1:p_1\ne p_2', r'\hat p_i=m_i/n_i:\quad\hat p_1=18/25=.72', r'\hat p_2=6/19=.315789,\quad\hat p=\frac{m_1+m_2}{n_1+n_2}=\frac{24}{44}=.545455'),
  2: (r'\mathrm{SE}_0=\sqrt{\hat p(1-\hat p)(1/n_1+1/n_2)}',),
  3: (r'c_Y=\tfrac12(1/n_1+1/n_2)',),
  4: (r'D_Y=\max(0,|\hat p_1-\hat p_2|-c_Y)',),
  5: r'|z_Y|=\frac{D_Y}{\mathrm{SE}_0}=\frac{.357895}{.151547}=2.36161>1.960',
  7: (r'\mathrm{SE}_0=\sqrt{.504926(.495074)(1/186+1/220)}',r'=.0498017'),
 },
 'chi2': {
  2: (r'E_{ij}=R_iC_j/N',),
  4: (r'\chi_Y^2=\sum_{ij}\frac{\max(0,|O_{ij}-E_{ij}|-.5)^2}{E_{ij}}',),
  5: (r'\chi_Y^2=1.09470+1.31364+1.44039+1.72847',r'=5.57719,\quad\nu=(r-1)(c-1)=1'),
 },
 'large-chi': {
  1: (r'H_0:\text{equal outcome proportions across groups}',),
  3: r'E_{11}=\frac{R_1C_1}{N}=\frac{167(152)}{519}=48.9094',
  6: (r'\chi^2=\sum_{ij}(O_{ij}-E_{ij})^2/E_{ij}',),
  7: (r'\nu=(r-1)(c-1)=(3-1)(2-1)=2',),
 },
 'gof': {
  1: (r'H_0:p_i=p_{i0}\ \text{for all }i', r'E_i=Np_{i0}:\quad E=(470(.60),470(.25),470(.15))',r'=(282,117.5,70.5)'),
  2: (r'\chi^2=\sum_i(O_i-E_i)^2/E_i',),
  3: (r'\nu=k-1=3-1=2',),
 },
 'chi-holm': {1: (r'\alpha_j=\alpha_T/(k-j+1)',)},
 'risk': {
  1: (r'r_T=6/19=.315789,\quad r_C=18/25=.72', r'\mathrm{RR}=r_T/r_C=.315789/.72=.438596'),
  2: r'\mathrm{ARR}=r_C-r_T=.72-.315789=.404211',
  3: r'\mathrm{NNT}=1/\mathrm{ARR}=1/.404211=2.47396\to3\text{ people}',
  5: (r'\mathrm{RRR}=1-\mathrm{RR}=1-.8=.2',r'\mathrm{ARR}=.010-.008=.002,\quad\mathrm{NNT}=1/.002=500'),
  6: (r'\mathrm{NNH}=1/(r_T-r_C)\quad\text{when treatment raises harm}',),
 },
 'odds': {1: (r'\begin{array}{c|cc}&\text{exposed}&\text{unexposed}\\\text{cases}&a&b\\\text{controls}&c&d\end{array}', r'\mathrm{OR}=\frac{a/b}{c/d}=\frac{ad}{bc}=\frac{50/14}{43/35}', r'=\frac{50(35)}{14(43)}=2.90698')},
 'quartile-steps': {
  1: r'r=1+\frac{p(n-1)}{100}:\quad r_{25}=1+.25(9)=3.25',
  8: r'\mathrm{IQR}=Q_3-Q_1=66.5-62.5=4',
 },
 'cdf-endpoints': {
  2: r'P(X>a)=1-F(a):\quad P(X>2)=1-.70=.30',
  3: r'P(X\ge a)=1-F(a^-):\quad P(X\ge2)=1-.55=.45',
  4: (r'P(a<X\le b)=F(b)-F(a)',),
 },
}

# Tuples at these locations prepend the equation to the old numeric working.
# Other tuples replace the old working with an integrated, multi-line step.
PREPEND = {
 'discrete': {1,5,7}, 'continuous': {2,5,6}, 'piecewise': {2},
 'endpoint': {1,3}, 'coefficient': {1}, 'normal': {3,5},
 'linear': {3}, 'one-t': {1}, 'pooled-t': {2,3}, 'anova': {1},
 'bonferroni': {1}, 'holm': {1}, 'z-yates': {2,3,4},
 'chi2': {2,4}, 'large-chi': {1,6,7}, 'gof': {2,3},
 'chi-holm': {1}, 'risk': {6}, 'cdf-endpoints': {4},
}
JOIN = {'discrete':{6}, 'piecewise':{3}, 'endpoint':{9}, 'sampling':{5},
        'large-chi':{7}, 'gof':{3}, 'quartile-steps':{3}, 'cdf-endpoints':{6}}
NUM = re.compile(r'<div class="worked-step"><span class="step-number">(\d+)\.</span>\\\[([\s\S]*?)\\\]</div>')
BANK = re.compile(r'<p><b>FORMULA</b></p>([\s\S]*?)<p><b>NUMBERED WORKED STEPS</b></p>')
def display(tex): return r'\['+tex+r'\]'
def step(parts, old_numbers=None):
    if isinstance(parts,str): parts=(parts,)
    return '<div class="v5-step"'+(' data-origin="'+','.join(map(str,old_numbers))+'"' if old_numbers else '')+'><span class="step-number"></span>'+''.join(map(display,parts))+'</div>'

for key, changes in R.items():
    old=source['blocks'][key]['html']
    match=BANK.search(old)
    assert match,key
    audit[key]={'removedBank':match[1], 'steps':[]}
    body=BANK.sub('',old)
    originals={int(m[1]):m[2] for m in NUM.finditer(old)}
    assert set(changes)<=set(originals),key
    def replace(m):
        n,tex=int(m[1]),m[2]
        new=changes.get(n,tex)
        if isinstance(new,str):new=(new,)
        if n in PREPEND.get(key,set()):
            new=(tex,*new) if n in JOIN.get(key,set()) else (*new,tex)
        audit[key]['steps'].append({'origin':n,'before':tex,'after':new})
        # Continuations stay in their preceding operation, not a new numbered item.
        if n in JOIN.get(key,set()):
            return '<div class="v5-continuation" data-origin="'+str(n)+'">'+''.join(map(display,new))+'</div>'
        return step(new,[n])
    body=NUM.sub(replace,body)
    if key=='uniform':
        # The standard Uniform example and the general-range operation are distinct.
        body=body.replace('<div class="worked-sequence">', '<div class="worked-sequence">'+step((r'f(x)=\frac1{b-a}=\frac1{1-0}=1\quad(0<x<1)',r'F(t)=\frac{t-a}{b-a}=\frac{t-0}{1-0}=t\quad(0<t<1)',r'P(l<X<u)=\frac{u-l}{b-a}=u-l\quad(0\le l<u\le1)')))
    if key=='linear':
        body=body.replace('</div><p><b>WRITE</b>', step((r'E[h(X)]=\sum_x h(x)f(x)\quad\text{(discrete)}',r'E[h(X)]=\int h(x)f(x)\,dx\quad\text{(continuous)}'))+'</div><p><b>WRITE</b>')
    # A wrapped calculation continues inside the same numbered step.
    body=re.sub(r'</div><div class="v5-continuation" data-origin="(\d+)">',lambda m:'<span class="continuation-origin" data-origin="'+m[1]+'"></span>',body)
    pack['blocks'][key]['html']=body

# Authored sections that do not use V4's formula-bank helper.
def edit(key,old,new):
    body=pack['blocks'][key]['html'];assert old in body,(key,old)
    pack['blocks'][key]['html']=body.replace(old,new,1)
    audit.setdefault(key,{'edits':[]}).setdefault('edits',[]).append({'before':old,'after':new})

edit('discrete-sketch', '<p><b>FORMULA</b> '+r'\(F(t)=\sum_{x\le t}f(x)\).'+ '</p>', '')
edit('discrete-sketch', '<li>CDF: hold each level flat, then jump by the next mass.</li>', '<li>CDF: '+display(r'F(t)=\sum_{x\le t}f(x)')+'Hold each level flat, then jump by the next mass.</li>')
body=pack['blocks']['continuous-sketch']['html']
edit('continuous-sketch', '<p><b>FORMULA</b> '+r'\(f(x)=.1+x\); interior \(F(x)=.1x+x^2/2\).'+ '</p>', '')
edit('continuous-sketch', '<li>PDF: straight line', '<li>'+display(r'f(x)=.1+x')+'PDF: straight line')
edit('continuous-sketch', '<li>CDF: through', '<li>'+display(r'F(x)=.1x+x^2/2')+'CDF: through')

edit('precision','<b>FORMULA / STEPS</b>','<b>ESTIMATES</b>')
edit('precision',display(r'\widehat{\mathrm{SE}}(s^2)=s^2\sqrt{\frac2{n-1}}'), '<p>Uncertainty in the sample variance:</p>'+step(r'\widehat{\mathrm{SE}}(s^2)=s^2\sqrt{\frac2{n-1}}'))
edit('precision','<p><b>WORKED</b> Four times the sample size halves SEM:</p>'+display(r'\frac{\sigma}{\sqrt{4n}}=\frac12\frac{\sigma}{\sqrt n}'), '<p>Four times the sample size halves SEM:</p>'+step(r'\mathrm{SEM}_{4n}=\frac{\sigma}{\sqrt{4n}}=\frac12\frac{\sigma}{\sqrt n}=\tfrac12\mathrm{SEM}_n'))

edit('t-output','<p><b>TRIGGER</b> Supplied t output. <b>FORMULA</b></p>'+display(r'p<\alpha\Rightarrow\text{reject }H_0'),'<p><b>TRIGGER</b> Supplied t output.</p>')
edit('t-output','Both p values are below .05.</p>', 'Both p values are below .05.</p>'+step((r'p<\alpha\Rightarrow\text{reject }H_0',r'.0003625<.05;\quad .0002594<.05')))
edit('aov-output','<p><b>TRIGGER</b> Supplied ANOVA output. <b>FORMULA</b></p>'+display(r'F=\frac{\mathrm{MS}_{\mathrm{Group}}}{\mathrm{MS}_{\mathrm{Residual}}}'),'<p><b>TRIGGER</b> Supplied ANOVA output.</p>')
edit('aov-output','<p><b>STEPS</b> Compare p with alpha.', step(r'F=\frac{\mathrm{MS}_{\mathrm{Group}}}{\mathrm{MS}_{\mathrm{Residual}}}=5.832\quad\text{(unrounded inputs)}')+'<p><b>STEPS</b> Compare p with alpha.')

norm=pack['blocks']['normal-sketch']['html']
maths=re.findall(r'\\\[([\s\S]*?)\\\]',norm);assert len(maths)==4
start=norm.index(r'\[');end=norm.index('<img')
new=step((maths[0],maths[2]))+'<p>PDF: symmetric bell at 95; mark 86.3 and 103.7 (one SD each side).</p>'+step((maths[1],maths[3]))+'<p>CDF: rising S through (95,.5), flattening toward 0 and 1. Insert mean 95 and SD 8.7.</p>'
edit('normal-sketch',norm[start:end],new)

edit('r-normal',display(r'\texttt{pnorm}:x\longmapsto F(x),\qquad\texttt{qnorm}:p\longmapsto x_p'),'')
cmd=re.search(r'<pre class="r-print">([\s\S]*?)</pre>',pack['blocks']['r-normal']['html']);lines=cmd[1].splitlines();assert len(lines)==8
out=''
for i in (0,4):
    tex=r'\texttt{pnorm}:x\longmapsto F(x)' if i==0 else r'\texttt{qnorm}:p\longmapsto x_p'
    out+=step(tex)[:-6]+'<pre class="r-print">'+'\n'.join(lines[i:i+4])+'</pre></div>'
edit('r-normal',cmd[0],out)

# Place tail decision rules at their actual decision, after the worked F.
decision=display(r'\text{two-sided t: }|t|>t_{\mathrm{crit}}\Rightarrow\text{reject}')+display(r'\text{F or }\chi^2:\ \text{statistic}>\text{upper cutoff}\Rightarrow\text{reject}')
edit('conditions',decision,'')
edit('conditions',display(r'F=16.9/68.05=.248347<5.32'),step((r'F=s_{\mathrm{bet}}^2/s_{\mathrm{wit}}^2=16.9/68.05=.248347<5.32',r'F\text{ or }\chi^2:\ \text{statistic}>\text{upper cutoff}\Rightarrow\text{reject}',r'\text{two-sided t: }|t|>t_{\mathrm{crit}}\Rightarrow\text{reject}')))

# Put the integration rule with the area substitution, rather than above it.
edit('integral-steps',display(r'\int_l^u f(x)\,dx=G(u)-G(l)'),'')
edit('integral-steps',display(r'P(1.5<X\le2)=\left[\frac{x^2}{4}\right]_{1.5}^{2}')+display(r'=\frac{2^2}{4}-\frac{1.5^2}{4}=1-.5625=.4375'),step((r'P(l<X<u)=F(u)-F(l)=\int_l^u f(x)\,dx',r'=G(u)-G(l)',r'P(1.5<X\le2)=\left[\frac{x^2}{4}\right]_{1.5}^{2}',r'=\frac{2^2}{4}-\frac{1.5^2}{4}=1-.5625=.4375')))

from expand_exam_sheet_v5 import expand_walkthroughs
algebra_expansions = expand_walkthroughs(pack, audit)

for key,b in pack['blocks'].items():
    b['html']=b['html'].replace('class="v4-plot"','class="v5-plot"').replace('href="#v4-','href="#v5-')
    assert 'FORMULA' not in b['html'],(key,'detached formula label')
    assert 'NUMBERED WORKED STEPS' not in b['html']
    assert b['title']==source['blocks'][key]['title']
    assert b['topics']==source['blocks'][key]['topics']
    assert b['sources']==source['blocks'][key]['sources']

out=ROOT/'exam-sheet-v5-data.js'
out.write_text('const V5_PACK='+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
manifest={'sourceSHA256':hashlib.sha256(raw.encode()).hexdigest(),'sourceRevision':'470f85e','placements':audit,'blocks':len(pack['blocks']),'algebraExpansions':algebra_expansions,'scope':'Same blocks, sources, examples and figures as V4. Equations and expanded algebra remain inside their corresponding worked operations.'}
(ROOT/'exam-sheet-v5-placements.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(f'Built V5: {len(pack["blocks"])} sections; {len(audit)} individually reviewed transformations; V4 read only.')
