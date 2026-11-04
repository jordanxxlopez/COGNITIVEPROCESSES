"""Revise only the four-page print pack. Teaching scripts and quizzes stay unchanged."""
from pathlib import Path
import copy,json,re
from scipy import stats
R=Path(__file__).resolve().parents[1]
v=json.loads((R/'v2-data.js').read_text().removeprefix('const V2=').strip().removesuffix(';'))
B=copy.deepcopy(v['blocks'])
def p(t):return '<p>'+t+'</p>'
def eq(t):return r'\['+t+r'\]'
def strong(t):return '<b>'+t+'</b>'
def block(key,title,html):B[key]={'title':title,'html':html}
# Remove attribution and administrative filler only from this isolated print copy.
replacements={
 'HW1’s':'Candidate','Worked probability table (HW1):':'Probability table:',
 'The lecture example is':'Example:', 'HW1: ':'', '<b>HW1:</b>':'<b>Given:</b>',
 'Lecture impurity example:':'Impurity sample mean:', 'Lecture glucose:':'Glucose:',
 'Lecture cardiac index:':'Cardiac index:', 'Lecture HR:':'Heart rate:',
 'HDL lecture:':'HDL groups:', 'Depression lecture observed rows:':'Observed depression rows:',
 'Smoke lecture:':'Case-control counts:', 'HW2 output: control comparisons only':'Given output: control comparisons only',
 'The HDL lecture’s':'The HDL example’s','Lecture standard Uniform support:':'Standard Uniform support:',
 'The lecture reports':'The example gives','HW1 endpoint density':'Endpoint density',
 'for the course’s 2×2 tests':'for 2×2 tests','for this course’s 2×2 tests':'for 2×2 tests',
 'The displayed calculation is recomputed from counts, rather than a conflicting printed intermediate value.':'',
 'No manual sum-of-squares calculation is needed to read this table.':'',
 }
for b in B.values():
 b.pop('source',None)
 for a,z in replacements.items():b['html']=b['html'].replace(a,z)
# This housekeeping belongs in the app, not on scarce exam-note space.
B['trial']['html']=B['trial']['html'].split('<b>Bring:</b>')[0]+'</p>'
# Put the population formulas next to the notation they use.
B['language']['html']+=p(strong('Population (all units measured):'))+eq(r'\mu=\frac{\sum_{i=1}^{N}x_i}{N},\quad\sigma^2=\frac{\sum_{i=1}^{N}(x_i-\mu)^2}{N}')
B['percent']['html']+=p(strong('Median rule after sorting:'))+eq(r'\operatorname{median}=\begin{cases}x_{((n+1)/2)}&n\text{ odd}\\[2pt]\dfrac{x_{(n/2)}+x_{(n/2+1)}}2&n\text{ even}\end{cases}')
block('cdf-endpoints','Discrete CDF: include the correct endpoint',p(r'\(F(a^-)\) means probability strictly below \(a\); \(f(a)\) is mass exactly at \(a\).')+eq(r'P(X>a)=1-F(a),\quad P(X\ge a)=1-F(a^-)')+eq(r'P(a<X\le b)=F(b)-F(a)')+eq(r'P(a\le X\le b)=F(b)-F(a^-)')+p('For the probability table above, include 2 and 3 but exclude 7:')+eq(r'P(2\le X<7)=.15+.10=.25')+eq(r'=F(7^-)-F(2^-)=.80-.55')+p('For continuous variables, endpoint equality does not change area because point probability is zero.'))
block('variance-direct','If asked for expected squared distance',p(r'Use the same mean \(\mu=1.45\). Each distance is squared before it is weighted:')+eq(r'E[(X-\mu)^2]=.55(-1-1.45)^2+.15(2-1.45)^2')+eq(r'\phantom{E[(X-\mu)^2]=}+.10(3-1.45)^2+.20(7-1.45)^2')+eq(r'=.55(6.0025)+.15(.3025)+.10(2.4025)+.20(30.8025)')+eq(r'=3.301375+.045375+.24025+6.1605=9.7475')+p(strong('Same answer as mean square minus squared mean.')+' Use the shorter form unless the question requests the distance calculation.'))
block('normal-areas','Normal: turn wording into the shaded area',p(strong('“Above”')+r' uses the right tail; '+strong('“between”')+' subtracts left areas; '+strong('“top tail”')+' starts from a right-tail area. For a cutoff with upper-tail probability q:')+eq(r'\Phi(z)=1-q,\quad x=\mu+\sigma z')+p(r'For the middle 95% of a Normal population, leave .025 in each tail. The two measurement cutoffs are:')+eq(r'\mu-1.96\sigma,\qquad\mu+1.96\sigma')+p('These are locations of individual measurements, not a confidence interval for an estimated mean. '+strong('Density height can exceed one; probability area cannot.')))
block('r-directions','pnorm / qnorm: read inputs, predict the output',p(strong('pnorm:')+' measurement cutoff → cumulative area to its left. Inputs mean and sd describe the Normal distribution; sd is an SD, never a variance. '+strong('qnorm:')+' cumulative probability → measurement cutoff. '+strong('lower.tail=FALSE:')+' uses right-tail probability. No code writing is required.')+p('For the glucose distribution (mean 95, SD 8.7):')+eq(r'\texttt{pnorm}(85,95,8.7)\approx .125190')+eq(r'\texttt{qnorm}(.975,95,8.7)\approx112.0517')+p('A mean-probability input needs the mean’s SEM in place of individual SD. For supplied test output, read test name → statistic → df → p → contextual decision.'))
block('nulls','State the population null, not sample equality',eq(r'\begin{array}{l|l}\text{one-sample }t&H_0:\mu=\mu_0\\\text{pooled }t&H_0:\mu_1=\mu_2\\\text{ANOVA}&H_0:\mu_1=\cdots=\mu_m\\\text{two proportions}&H_0:p_1=p_2\end{array}')+p(strong('Contingency χ²:')+' same outcome distribution across groups (no association). '+strong('Goodness of fit:')+' each population category probability equals its specified target. '+strong('Two-sided alternatives:')+' the compared means/proportions differ; ANOVA means are not all equal.'))
# Compact method + application, leaving space for the actual Holm stop exercise.
B['multiplicity']['html']=p(strong('Bonferroni:')+' count requested comparisons first; use the same adjusted level for every pair.')+eq(r'\alpha_{\mathrm{pair}}=\frac{\alpha_T}{k},\quad t_{\mathrm{crit}}=t_\nu^{-1}\!\left(1-\frac{\alpha_T}{2k}\right)')+p(r'For the three HDL pairs: \(\alpha_T=.05,k=3,\nu=207\).')+eq(r'\alpha_{\mathrm{pair}}=.016667,\quad t_{\mathrm{crit}}\approx2.414')+eq(r'8.212>2.414,\quad5.615>2.414,\quad2.597>2.414')+p('Reject all three pair nulls. For control comparisons only, count only those pairs. '+strong('Holm:')+' sort p smallest first, or |t|/χ² largest first when the reference distribution and df match.')+eq(r'\alpha_j=\frac{\alpha_T}{k-j+1}')+p(strong('Reject → continue; first failure → stop all remaining.')+' Keep comparison names attached while sorting. The supplied two-tail t table uses the total individual level; halve it only when forming the inverse-t left area.')
# The actual five-comparison exercise supplies the denominator df; no group-count inference needed.
crit=[float(stats.t.isf(.05/(6-j)/2,46)) for j in range(1,6)]
block('holm-stop','Holm worked example: the stop rule matters',p(r'Given five comparisons with residual df \(46\), overall \(\alpha_T=.05\). Sort the supplied |t| values with their pair labels:')+eq(r'\begin{array}{c|r|r|r|l}j&\text{pair}&|t|&\alpha_j&\text{decision}\\1&1\!:\!6&3.3&.0100&\text{reject}\\2&1\!:\!3&2.9&.0125&\text{reject}\\3&1\!:\!5&2.3&.016667&\text{stop}\\4&1\!:\!4&2.2&.0250&\text{no reject}\\5&1\!:\!2&2.1&.0500&\text{no reject}\end{array}')+eq(fr'3.3>{crit[0]:.3f},\qquad2.9>{crit[1]:.3f},\qquad2.3<{crit[2]:.3f}')+p('The third comparison fails, so the last three nulls are not rejected. Do not restart at the larger later thresholds. '+strong('Conclusion:')+' G1 differs from G6 and G3; differences from G5, G4 and G2 were not established.'))
block('odds-table','Label a 2×2 table before taking ratios',eq(r'\begin{array}{c|cc}&\text{event}&\text{no event}\\\text{exposed/treated}&a&b\\\text{unexposed/control}&c&d\end{array}')+eq(r'r_T=\frac a{a+b},\quad r_C=\frac c{c+d},\quad\mathrm{RR}=\frac{r_T}{r_C}')+eq(r'\mathrm{OR}=\frac{a/b}{c/d}=\frac{ad}{bc}')+p('Risk uses events/all; odds uses events/non-events. Reversing only one comparison takes the reciprocal. RR/OR of one means no association in that ratio.'))
block('low-risk','Relative reduction can hide a small absolute benefit',p('Death risk drops from 10 in 1000 to 8 in 1000:')+eq(r'r_C=.010,\quad r_T=.008,\quad\mathrm{RR}=.8')+eq(r'\mathrm{RRR}=1-\mathrm{RR}=.20\quad(20\%\text{ relative reduction})')+eq(r'\mathrm{ARR}=.010-.008=.002,\quad\mathrm{NNT}=\frac1{.002}=500')+p('The absolute reduction is .2 percentage points, not 20 points. If serious-harm NNH is 20, then:')+eq(r'500/20=25\text{ harms per additional death avoided}')+p(r'For an adverse-event increase, \(r_T>r_C\):')+eq(r'\mathrm{NNH}=\frac1{r_T-r_C}')+p('Use probabilities in reciprocals. NNT/NNH is tied to the named outcome and follow-up; round upward if a whole-person count is requested.'))
block('answer-check','Final arithmetic and conclusion checks',p(strong('Units:')+' mean and SD keep measurement units; variance squares them; test statistics and probabilities have no measurement units. '+strong('Signs:')+' a two-sided t decision uses magnitude; retain sign to name the direction. '+strong('Margins:')+' expected counts must recover every observed row/column total. '+strong('Rounding:')+' store intermediate values; round the final result. '+strong('Language:')+' reject supports a population difference; failing to reject does not prove equality. A p value is not the probability the null is true.'))

# Remove repeated explanations while retaining every calculation and method.
B['normal-areas']['html']=B['normal-areas']['html'].replace('These are locations of individual measurements, not a confidence interval for an estimated mean.','These cutoffs bound individual measurements.')
median_start=B['percent']['html'].index('<p><b>Median rule after sorting:')
block('median-rule','Median: odd versus even sample size',B['percent']['html'][median_start:])
B['percent']['html']=B['percent']['html'][:median_start]
B['cdf-endpoints']['html']=p(r'\(F(a^-)\): mass below \(a\); \(f(a)\): mass exactly at \(a\).')+eq(r'P(X>a)=1-F(a),\quad P(X\ge a)=1-F(a^-)')+eq(r'P(a<X\le b)=F(b)-F(a)')+eq(r'P(a\le X\le b)=F(b)-F(a^-)')+p('Include 2 and 3, exclude 7:')+eq(r'P(2\le X<7)=.15+.10=.25')+eq(r'=F(7^-)-F(2^-)=.80-.55')
B['cltwhy']['html']=p(r'\(n\) independent observations, each with variance \(\sigma^2\): add their variances, then scale by the square of the averaging factor.')+eq(r'\operatorname{Var}\!\left(\sum X_i\right)=n\sigma^2')+eq(r'\operatorname{Var}(\bar X)=\frac{n\sigma^2}{n^2}=\frac{\sigma^2}{n}')+eq(r'\operatorname{SD}(\bar X)=\frac{\sigma}{\sqrt n}')+p('Use s to estimate unknown population SD. ANOVA multiplies the variance of group means by group size to put it back on the individual-variance scale.')
B['chooser']['html']=p(strong('Numerical outcome:')+' one sample vs fixed reference → one-sample t; two independent groups → pooled t; three or more balanced groups → ANOVA. '+strong('Counts:')+' two event proportions → Yates z or 2×2 χ²; larger table → uncorrected χ²; one count list vs target probabilities → goodness of fit. '+strong('Follow-up:')+' requested pairs with correction. '+strong('Magnitude:')+' prospective risks → RR; case-control odds → OR.')
block('bonf-work','Bonferroni: one cutoff for the requested family',p(r'\(k\) (requested pairs), \(\alpha_T\) (overall level):')+eq(r'\alpha_{\mathrm{pair}}=\frac{\alpha_T}{k},\quad t_{\mathrm{crit}}=t_\nu^{-1}\!\left(1-\frac{\alpha_T}{2k}\right)')+p(r'Three HDL pairs: \(\alpha_T=.05,k=3,\nu=207\).')+eq(r'\alpha_{\mathrm{pair}}=.016667,\quad t_{\mathrm{crit}}\approx2.414')+eq(r'8.212>2.414,\quad5.615>2.414,\quad2.597>2.414')+p('Reject all three pair nulls. Count only the requested comparisons. The two-tail t table uses the full individual level; inverse-t instead needs a left-area input.'))
block('holm-rule','Holm: order, test, continue or stop',p('Order p smallest first. With matching distribution/df, order |t| or χ² largest first. Keep the pair labels attached.')+eq(r'\alpha_j=\frac{\alpha_T}{k-j+1}')+p(strong('Reject → continue. First failure → stop all remaining.')+' Never restart at a later, larger cutoff.'))
B['output']['title']='Supplied χ² output: compare only the requested pairs'
B['output']['html']=p('Six pairs are printed, but only three control comparisons are requested. Each has df 1. Sort these χ² values strongest first: G3, G1, G2. Use Holm at overall .05:')+eq(r'\alpha_j=.05/3,\ .05/2,\ .05')+eq(r'18.234>6.635>\chi^2_{.016667,1}>5.024')+eq(r'9.4944>\chi^2_{.025,1}=5.024')+eq(r'4.6895>\chi^2_{.05,1}=3.841')+p('Each passes in sequence: control differs from G3, G1 and G2. The first cutoff is bracketed using the supplied table columns. Do not add the unrequested pairs.')

# General median equations replace the repeated prose rather than consuming a new heading.
B['percent']['html']=B['percent']['html'].replace('Even sample: average the two middle values, giving median \\(70\\).','')
B['percent']['html']+=B['median-rule']['html'].split('</p>',1)[1]
B['decision']['html']=B['decision']['html'].replace('“Fail to reject” means a difference was not established, not that equality was proved.','')
block('cdf-check','Valid CDF',eq(r'0\le F(x)\le1,\quad F(-\infty)=0,\quad F(\infty)=1')+p('Never decreases; each jump includes its new mass.'))

block('df-lookup','Degrees of freedom: quick method check',eq(r'\begin{array}{l|l}\text{one-sample }t&n-1\\\text{pooled }t&n_1+n_2-2\\\text{ANOVA }F&(m-1,\ m(n-1))\\\text{post-ANOVA pairs}&N-m\ \text{(residual df)}\\\text{table }\chi^2&(r-1)(c-1)\\\text{specified GOF}&k-1\end{array}'))
B['answer-check']['html']=B['answer-check']['html'].replace('<b>Rounding:</b> store intermediate values; round the final result. ','')
B['ti']['html']+=p(strong('Negative entries:')+' use the (-) key for a negative bound. Use the subtraction key only for subtracting. Select functions from their menu, then check the inputs before calculating.')
B['answer-check']['html']=B['answer-check']['html'].replace('<b>Signs:</b> a two-sided t decision uses magnitude; retain sign to name the direction. ','')

# Make the density-to-CDF working explicit for questions that request the function itself.
B['continuous']['html']=B['continuous']['html'].replace('<p><b>2. Accumulate area to a cutoff:</b></p>','<p><b>2. Accumulate area to a cutoff:</b></p>'+eq(r'F(x)=\int_0^x\frac{u}{2}\,du=\left[\frac{u^2}{4}\right]_0^x=\frac{x^2}{4}'))
B['endpoint']['html']=B['endpoint']['html'].replace(' A constant density is flat: probability is requested width ÷ full width.','').replace('Evaluate upper antiderivative minus lower antiderivative.','Upper antiderivative value minus lower value.')
B['normal']['html']=B['normal']['html'].replace('Density is bell-shaped; CDF rises smoothly from zero to one.','')+eq(r'F(x)=\int_{-\infty}^x\frac{e^{-(u-\mu)^2/(2\sigma^2)}}{\sigma\sqrt{2\pi}}\,du')

B['trial']['html']+=p(strong('Parallel:')+' different people receive treatments. '+strong('Crossover:')+' same person, different periods; requires stable disease and no carryover. '+strong('Single-blind:')+' patient masked; '+strong('double:')+' patient and care team; '+strong('triple:')+' also statistical evaluators.')
B['trial']['html']=B['trial']['html'].replace(' Ask separately: is a difference established (test), and how large is it (RR/OR/absolute change)?','')
S=copy.deepcopy(v['sheets'])
# Initial print grouping; the build/geometry check balances columns without shrinking type.
S[0]['columns']=[['language','classify','describe','percent'],['discrete','variance-direct','cdf-endpoints','depend'],['continuous','endpoint','uniform-definition','cdf-check']]
S[1]['columns']=[['normal','normalwork','inverse','uniform-worked'],['sampling','linear','cltwhy','normal-areas'],['functionmean','tables','ti']]
S[2]['columns']=[['decision','chooser','nulls','anova','holm-rule'],['pooled','unequal','anovaoutput','answer-check','df-lookup'],['onet','pairs','bonf-work','holm-stop']]
S[3]['columns']=[['binary','z','chi2','odds-table'],['large','gof','output','r-directions'],['risk','trial','proportionwork','low-risk']]
PACK={'revision':'Expanded four-page revision','blocks':B,'sheets':S,'margins':{'top':.3,'bottom':.3,'left':.24,'right':.24}}
(R/'note-sheet-data.js').write_text('const SHEET_PACK='+json.dumps(PACK,ensure_ascii=False,separators=(',',':'))+';\n')
# Model is used as a coverage/priority audit, never as invented unseen-exam probabilities.
priorities=json.loads((R/'exam-priorities.json').read_text())
methods=[]
for x in priorities['topics']:
 topic=x['topic'];target=v['worked'].get(topic);aliases={'uniform':['uniform-definition','uniform-worked'],'bonferroni':['bonf-work'],'holm':['holm-rule','holm-stop'],'posthoc':['pairs','bonf-work']}
 mapped=aliases.get(topic,[target] if target else [])
 used=[b for s in S for c in s['columns'] for b in c]
 methods.append({**x,'printedBlocks':[b for b in mapped if b in used],'status':'explicitly excluded' if x['excluded'] else 'covered' if any(b in used for b in mapped) else 'introductory/context topic'})
report={'method':priorities['method'],'notesOnly':True,'addedApplications':['full Holm stop exercise with supplied df 46','discrete CDF endpoint inequalities','direct expected squared-deviation calculation','population formulas and general median rule','pnorm/qnorm directions and outputs','labeled 2×2 risk/odds template','relative versus absolute benefit and NNH example','population null-hypothesis templates'],'topics':methods}
(R/'notes-coverage-report.json').write_text(json.dumps(report,indent=2))
print('Built isolated print pack:',len(set(b for s in S for c in s['columns'] for b in c)),'printed blocks; margins 0.30 top/bottom, 0.24 left/right.')
