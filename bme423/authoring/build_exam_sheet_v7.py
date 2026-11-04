"""Combine V6's explicit operations with V5's useful variants, read-only.

Never execute either earlier builder or write an earlier source/PDF. All V7
changes are authored here; merge provenance and source hashes are exported.
"""
from pathlib import Path
import copy, hashlib, html, json, re

ROOT=Path(__file__).resolve().parents[1]
def read_pack(v):return json.loads((ROOT/f'exam-sheet-v{v}-data.js').read_text().split('=',1)[1].rstrip(';\n'))
V5,V6=read_pack(5),read_pack(6)
B=copy.deepcopy(V6['blocks'])
for b in B.values():b['html']=b['html'].replace('v6-','v7-').replace('BME423 · V6.','BME423 · V7.');b['provenance']=['V6: explicit equations, operations and hypothesis wording']
def m(x):return r'\['+x+r'\]'
def i(x):return r'\('+x+r'\)'
def p(x):return '<p>'+x+'</p>'
def step(title,rule,*work,note=''):
 return '<div class="v7-step"><h4>'+title+'</h4>'+m(rule)+''.join(m(x) for x in work)+(p(note) if note else '')+'</div>'
def table(headers,rows):return '<table><thead><tr>'+''.join('<th>'+x+'</th>' for x in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+x+'</td>' for x in row)+'</tr>' for row in rows)+'</tbody></table>'
def add(k,title,body,sources,topics,provenance):B[k]=dict(title=title,html=body,sources=sources,topics=topics,provenance=provenance)
def replace(k,old,new):
 assert B[k]['html'].count(old)==1,(k,old)
 B[k]['html']=B[k]['html'].replace(old,new)
def append(k,body,why):B[k]['html']+=body;B[k]['provenance'].append(why)

# Recognition stays next to each method; no separate router or protocol.
replace('notation','A population parameter is fixed; a sample statistic changes across samples.','A population parameter is fixed; a sample statistic changes across samples. Keep full calculator precision between steps.')
append('notation',p(i(r'\nu')+' (degrees of freedom); '+i(r'\alpha')+' (test significance level); '+i('f')+' (mass/density); '+i('F')+' (CDF).'),'V5: additional symbol meanings')
replace('summary','Heights are 65, 69, 59, 64, 62, 67, 68, 62, 64, 65.','Heights (inches): 65, 69, 59, 64, 62, 67, 68, 62, 64, 65.')
replace('percentile','3. Subtract the appropriate endpoints','3. IQR and observed range (59–69)')
append('summary',step('Squared-sum check for the same variance numerator',r'\sum_i(x_i-\bar x)^2=\sum_i x_i^2-\frac{(\sum_i x_i)^2}{n}',r'\sum_i x_i^2=41685,\qquad (\sum_i x_i)^2=645^2=416025',r'41685-\frac{416025}{10}=41685-41602.5=82.5',note='The same 82.5 is divided by 9 for the sample variance.'),'V5: squared-sum shortcut and intermediate arithmetic')
append('percentile',p('<b>Shape:</b> a roughly straight Normal Q–Q plot supports a Normal shape. A box spans Q1–Q3 and marks the median; the usual whisker cutoff is 1.5×IQR. Histogram height represents bin counts.'),'V5: graphical summaries and Normal shape')

B['loaded']['title']='Loaded die: use the stated probabilities'
replace('density',p('<b>Question.</b> Let '+i(r'f(x)=x/2')+' for '+i('0<x<2')+', zero elsewhere. Verify the density, then find its CDF, mean, variance, a tail probability and median.'),
 p('<b>Question.</b> For '+i(r'f(x)=x/2')+' on (0,2), zero elsewhere, find the total area, CDF, mean, variance, a tail and median.')+
 p('<b>Integration rule:</b> '+i('dx')+' names the integration variable. Raise its power by one, divide by that new power; evaluate upper bound minus lower bound.')+
 m(r'\int_a^b kx^r\,dx=\left[\frac{kx^{r+1}}{r+1}\right]_a^b\quad(r\ne-1)'))
replace('density',m(r'\int_0^2\frac{x}{2}\,dx=\left[\frac{x^2}{4}\right]_0^2'),m(r'\int_0^2\frac{x}{2}\,dx=\frac12\left[\frac{x^{1+1}}{1+1}\right]_0^2')+m(r'=\left[\frac{x^2}{4}\right]_0^2'))
replace('density',m(r'=\left[\frac{x^3}{6}\right]_0^2=\frac86-0=\frac43'),m(r'=\frac12\left[\frac{x^{2+1}}{2+1}\right]_0^2=\left[\frac{x^3}{6}\right]_0^2')+m(r'=\frac{2^3}{6}-\frac{0^3}{6}=\frac86=\frac43'))
replace('density',m(r'E[X^2]=\int_0^2\frac{x^3}{2}\,dx=\left[\frac{x^4}{8}\right]_0^2=2'),m(r'E[X^2]=\frac12\int_0^2x^3\,dx=\frac12\left[\frac{x^{3+1}}{3+1}\right]_0^2')+m(r'=\left[\frac{x^4}{8}\right]_0^2=\frac{2^4}{8}-\frac{0^4}{8}=2'))
replace('density',m(r'P(X>1.5)=1-.5625=.4375'),m(r'P(X>1.5)=1-.5625=.4375')+m(r'=\int_{1.5}^2\frac x2\,dx=\left[\frac{x^2}{4}\right]_{1.5}^2=\frac44-\frac{2.25}{4}'))
B['density']['provenance'].append('V5: power rule, dx, constant factors, explicit powers and both bounds')
replace('piecewise',m(r'=\frac12+\left[2t-\frac{t^2}{2}\right]_1^x=2x-\frac{x^2}{2}-1'),m(r'=\frac12+\left[2t-\frac{t^2}{2}\right]_1^x')+m(r'=\frac12+\left(2x-\frac{x^2}{2}\right)-\left(2-\frac12\right)')+m(r'=2x-\frac{x^2}{2}-1'))
B['piecewise']['provenance'].append('V5: carry earlier area and subtract the lower bound explicitly')

# The support-endpoint median is a redundant extra exercise; the density
# walkthrough retains the median rule and complete solution.
start=B['endpoint']['html'].index('<div class="v7-step"><h4>9. Find the median')
B['endpoint']['html']=B['endpoint']['html'][:start]
replace('endpoint',m(r'.1c+\frac{c^2}{2}=1\Rightarrow c^2+.2c-2=0'),m(r'.1c+\frac{c^2}{2}=1')+m(r'2(.1c)+2\left(\frac{c^2}{2}\right)=2(1)')+m(r'.2c+c^2=2\Rightarrow c^2+.2c-2=0'))
replace('endpoint',m(r'c=\frac{-b\pm\sqrt{b^2-4ac}}{2a}'),m(r'Ac^2+Bc+D=0:\quad c=\frac{-B\pm\sqrt{B^2-4AD}}{2A}'))
replace('endpoint','Here the quadratic coefficients are '+i(r'a=1,b=.2,c_{\rm quad}=-2')+'; the support endpoint is the positive root. A negative endpoint cannot give this support.',
 'Here '+i('A=1,B=.2,D=-2')+'. Keep the positive endpoint; the negative root '+i('c_-=-1.51774469')+' is outside this support.')
replace('endpoint',m(r'c=1.31774469'),m(r'\sqrt{8.04}=2.83548938,\quad c=\frac{-.2+2.83548938}{2}=1.31774469'))
replace('endpoint',m(r'P(X>.5)=1-[.1(.5)+.5^2/2]=.825'),m(r'F(.5)=.1(.5)+\frac{.5^2}{2}=.05+.125=.175')+m(r'P(X>.5)=1-F(.5)=1-.175=.825'))
replace('endpoint',m(r'P(X<.6)=.1(.6)+.6^2/2=.24'),m(r'P(X<.6)=F(.6)=.1(.6)+\frac{.6^2}{2}=.06+.18=.24')+m(r'P(X=.5)=0'))
B['endpoint']['provenance'].append('V5: complete quadratic rearrangement, coefficient labels, root choice, boundary arithmetic')
replace('uniform',m(r'E[X]=\frac{a+b}{2}=\frac{0+1}{2}=.5'),m(r'E[X]=\int_0^1x\,dx=\left[\frac{x^2}{2}\right]_0^1=\frac12')+m(r'E[X]=\frac{a+b}{2}=\frac{0+1}{2}=.5'))
replace('uniform',m(r'\operatorname{Var}(X)=\frac{(b-a)^2}{12}=\frac{(1-0)^2}{12}=\frac1{12}'),m(r'E[X^2]=\int_0^1x^2\,dx=\left[\frac{x^3}{3}\right]_0^1=\frac13')+m(r'\operatorname{Var}(X)=E[X^2]-\mu^2=\frac13-\frac14=\frac{4-3}{12}')+m(r'=\frac1{12}=\frac{(b-a)^2}{12}'))
B['uniform']['provenance'].append('V5: integrate both moments and subtract squared mean')

# Match the supplied z table's actual paired-column format.
replace('normal','For 1.15 use row 1.1 and column .05; for 2.30 use row 2.3 and column .00. Shade the requested side before subtracting.',
 'The supplied table repeats complete z / LEFT-area pairs. Find 1.15 and read .8749 immediately beside it; find 2.30 and read .9893. For a negative z, subtract the positive-z area from one.')
B['normal']['sources'].append('tables/z_table_NormalDist.pdf')
B['normal']['provenance'].append('V5: correct lookup for the actual supplied paired-column z table')
append('linear',m(r'E[h(X)]=\sum_xh(x)p(x)\quad\text{(discrete)}')+m(r'E[h(X)]=\int h(x)f(x)\,dx\quad\text{(continuous)}'),'V5: general expectation of a function')
append('precision',p('<b>Estimators:</b> '+i(r'\bar x')+' estimates '+i(r'\mu')+'; '+i('s')+' estimates '+i(r'\sigma')+'. Unbiased means correctly centered across repeated samples. For a Normal population, the sample mean has the minimum-variance property discussed in class.')+
 m(r'\widehat{SE}(s^2)=s^2\sqrt{\frac2{n-1}}')+p('This estimates uncertainty in the sample variance for Normal observations; it is different from SEM.'),'V5: estimator properties and uncertainty in sample variance')

add('r-normal','Read supplied Normal-function output',
 p('<b>pnorm:</b> cutoff → area; <b>qnorm:</b> area → cutoff. Default LEFT; lower.tail=FALSE means RIGHT.')+
 '<pre>pnorm(85,95,8.7)\n[1] 0.1251903\npnorm(115,95,8.7,lower.tail=FALSE)\n[1] 0.01075671\nqnorm(.975,95,8.7)\n[1] 112.0517</pre>'+
 p('Right area .025 and left .975 give the same cutoff. The third argument is SD; use SEM for an average.'),
 ['hw1.pdf','session5.pdf','session15.pdf'],['normal-output','lower-tail'],['V5: authentic Normal-output examples; interpretation only'])

# Restore complete, authentic output and identify the exact fields needed
# for follow-up tests. No sums-of-squares calculations are introduced.
r=json.loads((ROOT/'exam-sheet-v4-r-output.json').read_text())
lines=r['outputs']['anova'].splitlines()[:3]
B['anova-output']['html']=('<pre class="aov-output">'+html.escape('\n'.join(lines))+'</pre>'+p('<b>Read:</b> Group df 2 = F numerator df; Residuals df 19 = denominator and pairwise df. Residuals Mean Sq 66.8 = within variance; F value 5.832 = test statistic; Pr(&gt;F) .0106 = p-value.')+
 m(r'F=\frac{MS_{\rm Group}}{MS_{\rm Residual}}=5.832\quad\text{(unrounded inputs)}')+
 p('At .05 reject all-equal population means; at .01 do not reject. For requested pairs retain residual variance and df, with the actual pair sample sizes.')+
 step('If residual STANDARD ERROR is supplied, square it',r's_{\rm wit}^2=(\text{residual standard error})^2',r's_{\rm wit}^2=(8.174069)^2=66.8154\approx66.8',note='Residual standard error is an SD; residual Mean Sq is already a variance.'))
B['anova-output']['provenance'].append('V5: full summary(aov) fields, alpha comparison and residual-SD conversion')

# Keep V6's three complete pair calculations but shorten duplicated setup.
replace('anova','Fifteen patients per dose receive low, medium or high filgrastim. Their neutrophil concentration summaries are below. Test whether the three population means are all equal at .05; then compare dose pairs as one family.',
 'Fifteen patients per filgrastim dose have neutrophil concentrations measured in '+i('10^9')+' cells/L. Test whether the three population means are equal at .05, then compare all dose pairs as one family.')
replace('bonferroni','<b>Question.</b> Compare all three dose pairs at family '+i(r'\alpha=.05')+', using the original ANOVA within variance and residual df.',
 '<b>Question.</b> Using the filgrastim ANOVA, compare all three dose pairs at family '+i(r'\alpha=.05')+'.')
replace('bonferroni',m(r'k=\frac{m(m-1)}2,\quad\alpha_{\rm pair}=\frac{\alpha_{\rm family}}k'),m(r'k=\begin{cases}m(m-1)/2&\text{all pairs}\\m-1&\text{vs control}\end{cases}')+m(r'\alpha_{\rm pair}=\frac{\alpha_{\rm family}}{k}'))
B['bonferroni']['provenance'].append('V5: requested comparison family, all pairs versus control')

add('holm-t','Holm t comparisons: stop at the first failure',
 p('<b>Question.</b> Five comparisons with G1 have '+i(r'\nu=46')+'. Their ordered absolute t values are 3.3, 2.9, 2.3, 2.2 and 2.1. Test the family at .05.')+
 m(r'H_{0,1j}:\mu_1=\mu_j,\quad H_{A,1j}:\mu_1\ne\mu_j')+
 p('<b>In words:</b> each null says G1 and that named group have equal population means; its alternative says their means differ.')+
 step('1. Order strongest evidence first; adjust the remaining family',r'\alpha_j=\frac{\alpha_{\rm family}}{k-j+1}',r'\alpha_1=\frac{.05}{5}=.0100,\quad\alpha_2=\frac{.05}{4}=.0125',r'\alpha_3=\frac{.05}{3}=.0166667',note='Sort p-values smallest first; with equal df, sort absolute t largest first.')+
 step('2. Check each ordered pair using its own two-sided cutoff',r'|t_j|>t_{\alpha_j/2,\nu}\Rightarrow\text{reject and continue}',r'G1:G6:\quad3.3>t_{.005,46}=2.687\quad\text{reject}',r'G1:G3:\quad2.9>t_{.00625,46}=2.59973\quad\text{reject}',r'G1:G5:\quad2.3<t_{.00833333,46}=2.48469\quad\text{STOP}',note='Retain G1:G5 and every remaining null (G1:G4, G1:G2), without further tests. Only G1:G6 and G1:G3 are supported as different at family .05. Use invT(1−alpha/2,46) when the table column is missing.'),
 ['session9.pdf','session15.pdf'],['holm-t','holm-stop'],['V5: full ordered t example including the stopping decision'])

replace('holm',m(r'18.234103>\chi^2_{.01666667,1}=5.731139'),m(r'18.234103>6.635>\chi^2_{.01666667,1}\quad\text{reject}')+
 p('The .01666667 column is absent: exceeding the stricter .01 cutoff 6.635 already establishes this first rejection.'))
B['holm']['title']='Holm chi-square: the three control comparisons'
B['holm']['provenance'].append('V5: handle the absent chi-square alpha column with a printed-table bound')
replace('holm',' For t comparisons, sort '+i('|t|')+' largest first and use two-tail cutoff '+i(r't_{\alpha_j/2,\nu}')+'.','')

B['tables']['html']=(p('<b>z:</b> complete z and adjacent cumulative LEFT area. Negative z uses symmetry. <b>t:</b> df row, total TWO-TAILED alpha column; .05 means .05 here. <b>F:</b> numerator df across top, denominator down the side; upper-tail alpha. <b>Chi-square:</b> df row, right-tail alpha; the two supplied chi-square tables describe the same distribution.')+
 step('Bound a p-value between printed table columns',r't_{\rm two\ tail\ .10,4}<|t|<t_{\rm two\ tail\ .05,4}',r'2.132<2.58630<2.776\Rightarrow .05<p_{\rm two\ sided}<.10',note='Missing df? Compare both neighboring-row cutoffs. Above both → reject; below both → do not reject; between them → obtain an exact cutoff or supplied p-value.')+
 p('<b>TI-84:</b> positive t cutoff '+i(r'\operatorname{invT}(1-\alpha/2,df)')+'; two-sided p-value '+i(r'2\operatorname{tcdf}(|t|,1E99,df)')+'. Halve alpha for the invT area conversion only; do not halve the supplied two-tail table heading.'))
B['tables']['provenance'].append('V5: printed table tails, p-value bracketing, missing rows and TI-84 conversions')

add('dioxin','Rounded proportions: the dioxin homework variant',
 p('<b>Question.</b> Female births: father exposed, .565 of 186; mother exposed, .455 of 220. Exactly 205 of all 406 babies are female. Compare population female-birth probabilities at .05.')+
 m(r'H_0:\pi_F=\pi_M,\quad H_A:\pi_F\ne\pi_M')+
 p('<b>In words:</b> female-birth probabilities are equal in the two exposure populations under the null; they differ under the alternative.')+
 step('1. Pool the exact combined count; keep the stated group fractions',r'\hat p=\frac{\text{total events}}{n_1+n_2}',r'\hat p=\frac{205}{186+220}=\frac{205}{406}=.504926108',note='Do not reconstruct integer group counts from rounded proportions.')+
 step('2. Find the null SE and half-count correction',r'SE_0=\sqrt{\hat p(1-\hat p)(1/n_1+1/n_2)}',r'SE_0=\sqrt{.504926108(.495073892)(1/186+1/220)}',r'=.04980169565495515',r'c_Y=\tfrac12(1/n_1+1/n_2)',r'c_Y=.5(1/186+1/220)=.00496089932')+
 step('3. Shrink the gap, divide by SE and compare',r'|z_Y|=\frac{\max(0,|\hat p_1-\hat p_2|-c_Y)}{SE_0}',r'D_Y=|.565-.455|-.00496089932=.105039101',r'|z_Y|=\frac{.105039101}{.04980169565495515}=2.10914707426856>1.960',note='Reject equal female-birth probabilities at .05; the father-exposed sample has the larger female proportion.'),
 ['hw2.pdf','session11.pdf'],['rounded-proportions','dioxin'],['V5: actual HW2 rounded-proportion case, rewritten with V6 operation labels'])

# Low-base-rate example distinguishes relative and absolute benefit; this
# is course content, not a new model or an exam score prediction.
append('risk',step('Small baseline risks: relative benefit versus absolute benefit',r'RR=\frac{r_T}{r_C},\quad RRR=1-RR,\quad ARR=r_C-r_T',r'r_C=10/1000=.010,\quad r_T=8/1000=.008',r'RR=\frac{.008}{.010}=.8,\quad RRR=1-.8=.20',r'ARR=.010-.008=.002,\quad NNT=1/.002=500',r'\frac{NNT}{NNH}=\frac{500}{20}=25',note='A 20% relative reduction here is .2 percentage points absolute. With NNH 20, 25 additional harms accompany one additional prevented event in this comparison.'),'V5: low-baseline-risk NNT/NNH tradeoff')
# Interpret output in its associated tests; avoid duplicate output prose
# inside the clinical-design definitions.
B['design']['html']=p('<b>Randomized trial:</b> assign treatment, then follow outcomes. <b>Cohort:</b> follow exposure groups without random assignment. Both support event risks/RR. <b>Case–control:</b> select by outcome and assess earlier exposure; use OR. <b>Parallel:</b> different participants receive treatments. <b>Crossover:</b> the same participants receive treatments in different periods; consider stability and carryover. <b>Masking:</b> hide assignment from participants, treatment/evaluation staff or statistical staff. A sham mimics the procedure experience without its active component.')
B['design']['title']='Study design: what was assigned and followed?'
append('z-yates','<pre>'+html.escape("Pearson's Chi-squared test with\nYates' continuity correction\nX-squared = 5.5772, df = 1\np-value = 0.0182")+'</pre>'+p('This is the equivalent corrected chi-square for the same aspirin/placebo data: '+i(r'\chi_Y^2=z_Y^2')+'. Read X-squared as the statistic and p-value as the upper-tail probability; .0182 &lt; .05 rejects equal event probabilities.'),'V5: authentic supplied chi-square output and corrected z/chi-square equivalence')
append('large-chi','<pre>X-squared = 21.176, df = 2\np-value = 2.522e-05</pre>'+m(r'\texttt{2.522e-05}=.00002522'),'V5: authentic larger-table output and scientific notation')
append('gof','<pre>X-squared = 8.4574, df = 2\np-value = 0.01457</pre>','V5: authentic goodness-of-fit output')
# The statistic and df are already worked out in this box; retain the
# output's p-value beside the decision instead of printing them twice.
replace('gof','<pre>X-squared = 8.4574, df = 2\np-value = 0.01457</pre>','')
replace('gof','Reject the target distribution at .05. No Yates; this is a one-list fit test. The target probabilities must sum to one. Here they are specified, not estimated from these counts.',
 'Reject the target proportions at .05 (p = .01457). Use specified target probabilities, not observed fractions. Targets sum to one; this one-list fit test has no Yates correction.')

# Numeric labels retain six significant figures on paper. The authoring
# inputs and independent checks retain full precision for calculation.
def rounded_token(match):
 s=match.group(); significant=s.replace('.','').lstrip('0')
 if len(significant)<=6:return s
 value=float(s);txt=format(value,'.6g')
 if 'e' in txt.lower():txt=format(value,'.12f').rstrip('0').rstrip('.')
 if s.startswith('.') and txt.startswith('0.'):txt=txt[1:]
 return txt
for b in B.values():
 b['html']=re.sub(r'(?<![A-Za-z0-9])(?:\d+\.\d+|\.\d+)',rounded_token,b['html'])

# A named continuation preserves the full dose-pair calculations across
# adjacent columns without shrinking the type below the stated minimum.
split=B['bonferroni']['html'].index('<div class="v7-step"><h4>5. Low versus High')
rest=B['bonferroni']['html'][split:]
B['bonferroni']['html']=B['bonferroni']['html'][:split]+p('<b>Remaining dose pairs continue at the top of the next column.</b>')
add('bonferroni-pairs','Bonferroni: remaining dose pairs',
 m(r'SE_{ij}=.580421,\quad t_{\rm crit}=2.49367')+rest,
 B['bonferroni']['sources'],['all-pairs','pairwise-equations'],['V6: complete Low–High and Medium–High substitutions, adjacent-column continuation'])
split=B['z-yates']['html'].index('<pre>')
output=B['z-yates']['html'][split:]
B['z-yates']['html']=B['z-yates']['html'][:split]
add('chi-output','Read the aspirin/placebo program output',output,
 ['session11.pdf','session12.pdf','session15.pdf'],['chi-square-output','z-chi-square-equivalence'],['V5: authentic output, attached to the same clinical data as the risk example'])
start=B['precision']['html'].index('<p><b>Estimators:')
estimators=B['precision']['html'][start:]
B['precision']['html']=B['precision']['html'][:start]
estimators=estimators.replace(m(r'\widehat{SE}(s^2)=s^2\sqrt{\frac2{n-1}}'),m(r'\widehat{SE}(s^2)=s^2\sqrt{\frac2{n-1}}=9.16667\sqrt{\frac29}=4.32121'))
append('summary',estimators,'V5: estimator properties, uncertainty in variance, evaluated for the same height sample')
replace('dioxin','<b>Question.</b> Female births: father exposed, .565 of 186; mother exposed, .455 of 220. Exactly 205 of all 406 babies are female. Compare population female-birth probabilities at .05.',
 '<b>Question.</b> Compare female-birth probabilities after father-only (.565 of 186) versus mother-only (.455 of 220) dioxin exposure. The combined sample has 205 female births among 406 babies; use .05.')
replace('dioxin','<b>In words:</b> female-birth probabilities are equal in the two exposure populations under the null; they differ under the alternative.',
 '<b>In words:</b> the two populations have equal female-birth probabilities under the null; they differ under the alternative.')

SHEETS=[
 [['notation','summary','percentile'],['discrete','discrete-cdf','loaded','events'],['density','piecewise']],
 [['endpoint','uniform'],['normal','quantile','continuous-graph'],['sampling','linear','precision','binary','r-normal']],
 [['one-t','pooled-t','t-output'],['anova','bonferroni'],['bonferroni-pairs','holm-t','holm','tables','anova-output']],
 [['z-yates','dioxin','gof'],['chi2','large-chi'],['risk','folate-risk','odds','design','chi-output']],
]
for pi,cols in enumerate(SHEETS,1):
 for ci,keys in enumerate(cols,1):
  for k in keys:B[k]['page']=pi;B[k]['column']=ci
pack=dict(version=7,revision='combined-worked-guide-v7',margins=.3,minimumBodyPt=6.1,sheets=SHEETS,blocks=B)
(ROOT/'exam-sheet-v7-data.js').write_text('const V7_PACK='+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
source_names=sorted({s for b in B.values() for s in b['sources']}|{'midterm-review-transcript.txt'})
(ROOT/'exam-sheet-v7-coverage.json').write_text(json.dumps({
 'version':7,'scope':'Sessions 2–13; Session 15 review; HW1/HW2',
 'excluded':['Session 14 errors/power','manual sums-of-squares ANOVA','R code writing'],
 'inputs':{f'exam-sheet-v{v}-data.js':hashlib.sha256((ROOT/f'exam-sheet-v{v}-data.js').read_bytes()).hexdigest() for v in [5,6]},
 'sourceHashes':{s:hashlib.sha256((ROOT/'sources'/s).read_bytes()).hexdigest() for s in source_names},
 'blocks':{k:{n:b[n] for n in ['title','sources','topics','page','column','provenance']} for k,b in B.items()},
 'selection':'V6 main methods retained. Restore V5 distinct variants and practical algebra/table guidance. Omit only duplicate illustrative cases (two-group ANOVA and a second density median), not their methods.'},indent=2)+'\n')
print(f'V7: {len(B)} sections, '+str(sum(b['html'].count(r'\[') for b in B.values()))+' display equations')
