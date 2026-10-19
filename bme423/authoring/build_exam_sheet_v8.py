"""V7 mathematics, cases and figures with V5's beginner recognition labels.

Read existing data only. Reword explanatory paragraphs in place, preserve
every display equation, table, figure and worked operation, and write V8.
"""
from pathlib import Path
import copy, hashlib, json, re

ROOT=Path(__file__).resolve().parents[1]
V7=json.loads((ROOT/'exam-sheet-v7-data.js').read_text().split('=',1)[1].rstrip(';\n'))
B=copy.deepcopy(V7['blocks'])
def i(s):return r'\('+s+r'\)'
def p(s):return '<p>'+s+'</p>'
def para(k,n,new):
 matches=list(re.finditer(r'<p>(.*?)</p>',B[k]['html'],re.S));q=matches[n]
 B[k]['html']=B[k]['html'][:q.start()]+p(new)+B[k]['html'][q.end():]
def intro(k,trigger,worked):para(k,0,'<b>TRIGGER</b> '+trigger+' <b>WORKED</b> '+worked)
def prepend(k,trigger):B[k]['html']=p('<b>TRIGGER</b> '+trigger)+B[k]['html']

TITLES={
'notation':'TYPE OF DATA → CLASSIFY + SYMBOLS',
'summary':'RAW LIST → MEAN, VARIANCE, SD, SEM',
'percentile':'SORTED DATA → PERCENTILES, MEDIAN, IQR',
'discrete':'VALUES + PROBABILITIES → MEAN + VARIANCE',
'discrete-cdf':'AT MOST / AT LEAST → DISCRETE CDF',
'loaded':'LOADED DIE → USE THE STATED MASSES',
'events':'SUCCESSIVE EVENTS → UPDATE WHAT REMAINS',
'density':'CONTINUOUS DENSITY → INTEGRATE THE AREA',
'piecewise':'DENSITY CHANGES FORMULA → PIECEWISE CDF',
'endpoint':'UNKNOWN ENDPOINT → TOTAL AREA ONE',
'uniform':'CONSTANT DENSITY → UNIFORM',
'normal':'NORMAL CUTOFFS → LEFT / RIGHT / BETWEEN',
'quantile':'GIVEN NORMAL AREA → CUTOFF / PERCENTILE',
'continuous-graph':'ASKED TO DRAW → CONTINUOUS PDF + CDF',
'sampling':'AVERAGE OF n → SAMPLING DISTRIBUTION / SEM',
'linear':'SHIFT / SCALE / SUM → MEAN + VARIANCE',
'precision':'LARGER SAMPLE → SMALLER SEM',
'one-t':'ONE SAMPLE vs FIXED MEAN → t TEST',
'pooled-t':'TWO NUMERICAL GROUPS → POOLED t',
't-output':'SUPPLIED t OUTPUT → READ df + p',
'anova':'EQUAL-SIZE NUMERICAL GROUPS → ANOVA',
'anova-output':'SUPPLIED ANOVA → READ F + WITHIN VARIANCE',
'bonferroni':'WHICH MEAN PAIRS? → BONFERRONI',
'bonferroni-pairs':'BONFERRONI → REMAINING DOSE PAIRS',
'holm-t':'ORDERED t PAIRS → HOLM; STOP AT FAILURE',
'holm':'PAIRS vs CONTROL → HOLM CHI-SQUARE',
'tables':'CRITICAL VALUE / p RANGE → READ THE TABLE',
'z-yates':'TWO PROPORTIONS → YATES z',
'chi2':'2×2 COUNTS → YATES CHI-SQUARE',
'large-chi':'LARGER COUNT TABLE → ORDINARY CHI-SQUARE',
'gof':'ONE LIST vs TARGET % → GOODNESS OF FIT',
'binary':'ONE EVENT COUNT → PROPORTION + SE',
'risk':'FOLLOWED GROUPS → RR, ARR, NNT / NNH',
'folate-risk':'RISK COMPARISON → NAME THE NUMERATOR',
'odds':'CASES CHOSEN BY DISEASE → ODDS RATIO',
'design':'ASSIGNED / SELECTED / FOLLOWED → DESIGN',
'r-normal':'SUPPLIED NORMAL OUTPUT → AREA OR CUTOFF?',
'dioxin':'ROUNDED PROPORTIONS → POOL EXACT COUNTS',
'chi-output':'SUPPLIED CHI-SQUARE → READ STATISTIC + p',
}
for k,b in B.items():
 b['title']=TITLES[k];b['html']=b['html'].replace('v7-','v8-').replace('BME423 · V7.','BME423 · V8.')

para('notation',0,'<b>TRIGGER</b> Classify data or identify symbols. <b>BME423 · V8.</b> Population = entire group; sample = measured subset. Parameters are fixed; sample statistics vary across samples. Keep full calculator precision.')
para('notation',2,'<b>WRITE</b> Interval–continuous: values within a range (BP, height, membrane potential). Interval–discrete: counts/rounded values (joints, texts, age in years). Categorical–nominal: unordered labels (country, ZIP). Categorical–ordered: ranked levels (cancer stage, severity). <b>TRAP</b> Numeric labels such as ZIP are not interval measurements.')
intro('summary','A raw list; asks for center, spread or error in its estimated mean.',
 'Heights (inches): 65, 69, 59, 64, 62, 67, 68, 62, 64, 65. Find mean, variance, SD and SEM.')
para('summary',1,'<b>WRITE</b> Estimated mean 64.5 inches; individual SD 3.02765 inches; mean-estimation error .957427 inch. <b>TRAP</b> SD describes individuals; SEM describes sample means. Variance has squared units.')
para('summary',2,'<b>TRAP</b> A complete population uses '+i('N')+' and its population mean; a sample variance divides by '+i('n-1')+'.')
para('summary',4,'<b>Estimators:</b> '+i(r'\bar x')+' estimates '+i(r'\mu')+'; '+i('s')+' estimates '+i(r'\sigma')+'. Unbiased = centered correctly across repeated samples. For Normal populations, the sample mean has the minimum-variance property taught in class.')
intro('percentile','A data list; asks for a percentile, median, IQR or range.',
 'Sorted heights: 59, 62, 62, 64, 64, 65, 65, 67, 68, 69. Find the quartiles and spread.')
para('percentile',1,i('p')+' (percentile number); '+i('I')+' (integer rank); '+i('d')+' (fraction of the next gap). <b>TRAP</b> Rank locates a value; interpolate the measurements, not their ranks.')
para('percentile',2,'<b>WRITE</b> Median 64.5; Q1 62.5; Q3 66.5; IQR 4; range 59–69. A straight Normal Q–Q plot supports Normal shape. Box = Q1–Q3 with median; usual whisker cutoff = 1.5×IQR; histogram = bin counts.')
intro('discrete','Possible values and their probabilities.',
 'Check validity; find mean, variance, CDF and probability from 2 inclusive to 7 exclusive.')
para('discrete',1,i('X')+' (random variable); '+i('x')+' (value); '+i('p(x)')+' (its probability). <b>TRAP</b> Weight values by probability; average them equally only for equal probabilities.')
B['discrete']['html']+=p('<b>WRITE</b> Mean 1.45; variance 9.7475; requested probability .25.')
prepend('discrete-cdf','“At most,” “at least,” or a CDF graph.')
para('discrete-cdf',1,'<b>WRITE / SKETCH</b> Mass: separate spikes. CDF: jump by each mass; flat between values. <b>TRAP</b> Fill each jump’s upper point; open lower point. A discrete point can have positive probability.')
intro('loaded','A die has unequal stated probabilities.',
 i('p(1)=.20')+'; each of 2–6 has .16. Find '+i(r'P(X\le3)')+', mean and variance.')
B['loaded']['html']+=p('<b>WRITE</b> Probability .52; mean 3.4; variance 3.04. <b>TRAP</b> A loaded die does not give every face probability 1/6.')
intro('events','Successive draws; check whether outcomes are replaced.',
 'Draw two cards from 52 without replacement. Find the chance both are kings.')
para('events',1,'<b>TRAP</b> Without replacement, update numerator and denominator; independent probabilities stay unchanged. <b>WRITE</b> Two kings: .00452489. Three fair flips: exactly two heads = HHT/HTH/THH, 3 of 8 equally likely sequences.')
intro('density','A density formula over an interval; asks for areas or moments.',
 i('f(x)=x/2')+' on (0,2), zero elsewhere. Find area, CDF, mean, variance, tail and median.')
para('density',2,'<b>TRAP</b> Density height is not probability; area is probability. The density must be nonnegative. '+i(r'\int_a^b g(x)\,dx=G(b)-G(a)')+' means upper-bound value minus lower-bound value.')
para('density',3,'<b>WRITE</b> Mean 4/3, variance 2/9, median '+i(r'\sqrt2')+'. <b>TRAP</b> Keep the root inside the support. Continuous points have probability zero; inclusive endpoints do not change an area.')
intro('piecewise','The density uses different formulas in different intervals.',
 i('f(x)=x')+' on (0,1), '+i('2-x')+' on [1,2). Find its CDF and '+i('P(.5<X<1.5)')+'.')
para('piecewise',1,'<b>WRITE</b> The requested interval probability is .75. <b>TRAP</b> Carry earlier area into the next piece; do not restart the CDF at zero. The CDF stays continuous at 1.')
intro('endpoint','Unknown support endpoint; the total density area must be one.',
 i('f(x)=.1+x')+' on '+i(r'0<x\le c')+', zero elsewhere. Find '+i('c')+', CDF, moments and probabilities.')
para('endpoint',1,i('A=1,B=.2,D=-2')+'. <b>TRAP</b> Use the root inside the support; the negative root '+i('c_-=-1.51774')+' is invalid here. <b>WRITE</b> Upper endpoint '+i('c=1.31774')+'.')
intro('uniform','Constant density across a fixed range.',
 'For Uniform(0,1), find height, probability below .5, mean and variance.')
B['uniform']['html']+=p('<b>WRITE</b> Mean .5; variance 1/12. <b>TRAP</b> Normalize over the entire support. A CDF is zero before its support and one after it.')
intro('normal','Normal mean and SD plus measurement cutoffs; asks for probability.',
 'Glucose '+i(r'X\sim N(95,8.7^2)')+'. Find the areas below 85, between 85 and 115, and above 115.')
para('normal',1,'<b>TRAP</b> The second Normal parameter is variance; 8.7 is SD here. Standardize and use the table; the Normal CDF integral need not be solved by hand.')
para('normal',2,'<b>TABLE</b> The supplied table repeats complete z / LEFT-area pairs. Find 1.15 → .8749; 2.30 → .9893. For negative z, subtract the positive-z area from one.')
para('normal',4,'<b>WRITE</b> Table probabilities: .1251, .8642, .0107; they sum to one. An exact continuous point has zero area.')
intro('quantile','Given a Normal percentile, top-tail fraction or middle range.',
 'Find glucose Q1, Q3 and the central 95% interval.')
para('quantile',1,'<b>TABLE / TI-84</b> invNorm(left area,95,8.7). Cumulative .975 gives z = 1.96. <b>TRAP</b> Right .025 means left .975; enter .975, not 97.5.')
para('quantile',2,'<b>WRITE</b> Q1 89.1319; Q3 100.868; central 95% 77.948–112.052 mg/dL. <b>SKETCH</b> Bell centered at '+i(r'\mu')+'; shade the requested area. Normal CDF rises smoothly 0→1, crosses .5 at '+i(r'\mu')+', and has no jumps. Larger SD widens the bell.')
prepend('continuous-graph','Asked to draw a continuous density and its accumulated probability.')
para('continuous-graph',1,'<b>WRITE / PDF</b> '+i('f(x)=.1+x')+': zero outside (0,'+i('c')+']; rising line inside, from .1 to .1+'+i('c')+'. Shade intervals underneath. <b>TRAP</b> '+i('f(.5)=.6')+' is a height, not probability.')
para('continuous-graph',2,'<b>WRITE / CDF</b> Zero before 0; '+i('F(x)=.1x+x^2/2')+' inside; flat at 1 after '+i('c')+'. It is continuous and increasing; its slope is density height. Formula changes can create corners, not point-mass jumps.')
intro('sampling','Probability concerns an average of n observations.',
 'Individuals have mean 4 and SD 1.5; independent n=50. Find the chance the sample mean is 3.5–3.8.')
para('sampling',2,'<b>TABLE</b> Round z to −.94 and −2.36; .1736−.0091=.1645. <b>WRITE</b> About 16.4% of sample averages fall in the interval. <b>TRAP</b> Use SEM for means; use '+i(r'\sigma')+' for an individual, without dividing by '+i(r'\sqrt n')+'.')
intro('linear','A constant is added, a variable is scaled, or independent variables are combined.',
 'For the glucose variable, find '+i('E[X-26]')+' and its variance.')
para('linear',2,'<b>WRITE</b> A shift changes the mean, not spread. <b>TRAP</b> Square coefficients for variance; even subtraction adds independent variances. '+i('X+X=2X')+' is not an independent sum; its variance is '+i(r'4\sigma^2')+'.')
intro('precision','Asked how changing sample size changes error in the estimated mean.',
 'Height SD 3.02765, SEM .957427, n=10. Find SEM for four times as many observations.')
para('precision',1,'<b>WRITE</b> Four times n halves SEM to .478714. For target SEM, '+i(r'n=(s/SEM_{\rm target})^2')+'; round upward. <b>TRAP</b> A more precise mean does not require smaller individual variation.')
intro('one-t','One numerical sample versus a fixed reference mean.',
 'USC students: n=16, mean LDL 103, SD 16 mg/dL; reference 115. Independent Normal responses: is the student population mean different at .05?')
para('one-t',2,'<b>TABLE</b> t row 15, total two-tail .05 → 2.131. <b>WRITE</b> At .05, student population mean LDL differs from 115 mg/dL; the observed mean is lower.')
para('one-t',3,'<b>p-value</b> '+i(r'p=2P(T_{15}\ge3)=.00897274')+'. <b>TRAP</b> The reference is fixed, not another sample. Compare p with .05; p is not the probability the null is true.')
intro('pooled-t','Two independent numerical groups; common variance, possibly unequal n.',
 'Control n=22, mean 49, SD 8.4; intervention n=27, mean 57, SD 9.5. Normal populations: do their means differ at .05?')
para('pooled-t',2,'<b>TABLE</b> df 47 lies between rows 46/48; total two-tail .05 cutoffs 2.013/2.011. The statistic exceeds both. <b>WRITE</b> Population means differ at .05; intervention’s observed mean is higher (p=.00339345). <b>TRAP</b> Weight variances by df when n differs; do not just average them.')
prepend('t-output','A printed t-test result; asks for the test, df, p or conclusion.')
para('t-output',1,'<b>WRITE</b> At .05, population mean heights differ; the first observed mean is lower. Read '+i('t')+' (statistic), df and p. <b>TRAP</b> Welch can have fractional df: use the printed df, not pooled df.')
para('t-output',2,'<b>TABLE / METHOD</b> “Two Sample t-test” uses pooled '+i(r'\nu=n_1+n_2-2')+'. The hand method assumes common variance; follow the supplied test name.')
intro('anova','Several numerical groups of equal size; asks whether any population mean differs.',
 'Filgrastim: n=15 per dose; neutrophils in '+i('10^9')+' cells/L. Test all-equal means at .05, then compare pairs.')
para('anova',3,'<b>TABLE</b> F: numerator df 2 across top, denominator df 42 down side; upper .05 lightface → 3.22. <b>WRITE</b> At .05, at least one dose population mean differs (p=.0433947). <b>TRAP</b> Use variances, not SDs; the overall test does not identify the pair.')
prepend('anova-output','Printed ANOVA output; asks for an overall decision or follow-up pairs.')
para('anova-output',2,'<b>WRITE</b> At .05, at least one population mean differs; at .01, a difference is not established. Retain residual variance and df for requested pairs, using their actual sample sizes.')
para('anova-output',3,'<b>TRAP</b> Residual standard error is an SD: square it. Residual Mean Sq is already a variance.')
intro('bonferroni','Named mean pairs; asks for comparisons at one family significance level.',
 'Compare the filgrastim dose pairs at family '+i(r'\alpha=.05')+'.')
para('bonferroni',2,'<b>TRAP</b> Count the requested family, not every possible pair. Retain ANOVA within variance and residual df. Total two-tail .0166667 equals one-tail .00833333.')
para('bonferroni',3,'<b>TABLE / TI-84</b> t row 42, total two-tail .0166667. Missing column: DISTR → invT; enter LEFT area and original df:')
prepend('bonferroni-pairs','Continue the same three-pair family with the original SE and cutoff.')
para('bonferroni-pairs',1,'<b>WRITE</b> At family .05, only low versus high population means differ. <b>TRAP</b> Nonsignificant pairs do not establish identical means.')
intro('holm-t','Supplied t pairs; asks which differ while controlling one family.',
 'Five G1 comparisons; df 46; ordered '+i('|t|')+' = 3.3, 2.9, 2.3, 2.2, 2.1. Use family .05.')
para('holm-t',2,'<b>TRAP</b> Order p smallest first; with common df, order '+i('|t|')+' largest first. Stop at the first failure.')
para('holm-t',3,'<b>WRITE</b> At family .05, G1 differs from G6 and G3. Retain G1:G5, G1:G4 and G1:G2 without further tests. <b>TABLE</b> t row 46, current two-tail alpha; if absent, invT(1−alpha/2,46).')
intro('holm','Printed chi-square pairs; asks which treatments differ from control.',
 'Mortality statistics: 18.2341, 9.49443, 4.68951; each df 1. Test the three control comparisons at family .05.')
para('holm',1,'Order p smallest first; with common df, order '+i(r'\chi^2')+' largest first. <b>In words:</b> each null says treatment and control have equal mortality probabilities; its alternative says they differ.')
para('holm',2,'<b>TABLE</b> Chi-square row 1: .0166667 is absent; the stricter .01 cutoff 6.635 already proves the first rejection.')
para('holm',3,'<b>WRITE</b> All three treatments differ from control at family .05. <b>TRAP</b> Only the three requested control pairs count; stop at the first failure and retain all remaining nulls.')
prepend('tables','Asked for a critical value, p-value range or missing table entry.')
para('tables',1,'<b>TABLE</b> z: complete z / adjacent LEFT area; negatives use symmetry. t: df row, full TWO-TAILED alpha (.05 means .05). F: numerator df across top, denominator down side; UPPER tail. Chi-square: df row, RIGHT tail; either supplied chi-square table works.')
para('tables',2,'<b>WRITE</b> Here .05 &lt; p &lt; .10. Missing df? Read neighboring rows: above both cutoffs → reject; below both → do not reject; between them → exact cutoff or supplied p needed.')
para('tables',3,'<b>TRAP / TI-84</b> Positive t cutoff '+i(r'\operatorname{invT}(1-\alpha/2,df)')+'; two-sided p '+i(r'2\operatorname{tcdf}(|t|,1E99,df)')+'. Halve alpha for invT only, not again for the two-tail table.')
intro('z-yates','Two groups; each person has event/no event.',
 'Thrombi: 18/25 placebo versus 6/19 aspirin. Are population event probabilities different at .05?')
para('z-yates',2,'<b>TABLE</b> Normal cumulative .975, or t infinite-df row, total two-tail .05 → 1.960. <b>WRITE</b> Population thrombus probabilities differ at .05; aspirin’s observed rate is lower. <b>TRAP</b> Retain Yates for the course’s 2×2 comparisons.')
intro('chi2','Two groups × two outcomes; observed COUNTS.',
 'Test whether folate use and neural tube defects are associated at .05, using the table below.')
para('chi2',3,'<b>TABLE</b> Chi-square row 1, upper .05 → 3.841. <b>WRITE</b> Folate and neural tube defects are associated at .05 (p=.00018705). <b>TRAP</b> Use counts, not percentages; Yates shrinks the absolute gap before squaring.')
intro('large-chi','More than two rows or columns of observed counts.',
 'Depression event/no-event counts: (36,131), (41,132), (75,104). Compare the population probabilities at .05.')
para('large-chi',2,'<b>TABLE</b> Chi-square row 2, upper .05 → 5.991. <b>WRITE</b> Population depression probabilities differ at .05. <b>TRAP</b> No Yates for 3×2; follow-up pairs identify which groups differ.')
intro('gof','One observed category list versus stated target percentages.',
 'Counts 255, 125, 90; target probabilities .60, .25, .15. Test fit at .05.')
para('gof',2,'<b>TABLE</b> Chi-square row 2, upper .05 → 5.991. <b>WRITE</b> Reject the target proportions at .05 (p=.01457). <b>TRAP</b> Use specified targets, not observed fractions; targets sum to one. No Yates.')
intro('binary','One group; asks for the event proportion and its error.',
 '8 events among 61 patients. Estimate the proportion and SE.')
para('binary',1,'<b>WRITE</b> Estimated event proportion .131148; SE .0432203. <b>TRAP</b> SE describes uncertainty in the estimated proportion, not variation among individual zero/one outcomes.')
intro('risk','Followed groups; asks for treatment benefit or harm.',
 'Aspirin 6/19 events; placebo 18/25. Find RR, ARR and NNT.')
para('risk',1,i('T')+' (treatment); '+i('C')+' (control). <b>TRAP</b> Risk divides events by ALL group members; odds divide events by nonevents.')
para('risk',2,'<b>WRITE</b> Aspirin risk is .439 times placebo risk; absolute reduction 40.42 percentage points. <b>TRAP</b> Relative and absolute reductions differ.')
para('risk',3,'<b>WRITE</b> Treat 3 people per additional event prevented over the study interval. <b>TRAP</b> Round NNT upward; reciprocals use decimal risks.')
para('risk',4,'<b>WRITE</b> Here 20% relative benefit is .2 percentage points absolute. With NNH 20, 25 additional harms accompany one additional prevented event.')
prepend('folate-risk','Risk in one group relative to another.')
para('folate-risk',1,'<b>WRITE</b> No-folate risk is 6.11 times folate risk. <b>TRAP</b> Reversing the ratio gives its reciprocal; name its direction.')
intro('odds','Selected by existing disease; compare earlier exposure.',
 'Cases: 50 exposed, 14 unexposed; controls: 43 exposed, 35 unexposed. Find the exposure OR.')
para('odds',1,'<b>WRITE</b> Cases have 2.91 times controls’ exposure odds. <b>TRAP</b> Case–control sampling fixes case numbers; sample fractions cannot estimate population disease risks. Use OR.')
prepend('design','Selection, treatment assignment or follow-up.')
para('design',1,'<b>WRITE</b> Randomized trial: assign treatment, follow outcomes. Cohort: follow exposure groups without assignment; both give risks/RR. Case–control: select by outcome, assess earlier exposure; OR. Parallel: different people; crossover: same people in different periods. Masking hides assignment from participants, clinicians/evaluators or statisticians. Sham mimics the procedure. <b>TRAP</b> Crossover needs stability/no carryover; case–control samples do not give disease risks.')
prepend('r-normal','Supplied Normal command/output; decide whether input is a cutoff or an area.')
para('r-normal',1,'<b>WRITE</b> pnorm: cutoff → area; qnorm: area → cutoff. Default LEFT; lower.tail=FALSE means RIGHT.')
para('r-normal',2,'<b>TRAP</b> Right .025 equals left .975. Third argument is SD; use SEM for a sample average.')
intro('dioxin','Rounded group proportions plus an exact combined event count.',
 'Female births after father-only dioxin: .565 of 186; mother-only: .455 of 220. Exactly 205/406 female overall. Compare population probabilities at .05.')
para('dioxin',2,'<b>TRAP</b> Pool the exact total event count; do not reconstruct group counts from rounded proportions.')
para('dioxin',3,'<b>TABLE</b> Normal cumulative .975 / t infinite-df two-tail .05 → 1.960. <b>WRITE</b> Female-birth probabilities differ at .05; father-exposed sample’s fraction is higher.')
prepend('chi-output','Printed statistic, df or decision.')
para('chi-output',1,'<b>WRITE</b> At .05, aspirin/placebo probabilities differ: p=.0182 &lt; .05. X-squared = statistic; p-value = RIGHT-tail area. <b>TRAP</b> Yates is already included; do not correct again. Here '+i(r'\chi_Y^2=z_Y^2')+'.')

# Preserve every worked display, source table and figure exactly. The
# labels reorganize/reword prose only; they never change the calculations.
for k,b in B.items():
 original=V7['blocks'][k]['html']
 assert re.findall(r'\\\[(.*?)\\\]',b['html'],re.S)==re.findall(r'\\\[(.*?)\\\]',original,re.S),k+' display changed'
 assert re.findall(r'<table>.*?</table>',b['html'],re.S)==re.findall(r'<table>.*?</table>',original,re.S),k+' table changed'
 assert re.findall(r'<img[^>]+>',b['html'])==[s.replace('v7-','v8-') for s in re.findall(r'<img[^>]+>',original)],k+' figure changed'
 assert '<b>TRIGGER</b>' in b['html'] and '<b>TRAP' in b['html'],k+' missing beginner cue'
 b['provenance'].append('V8: question-to-method heading; TRIGGER, WRITE, TRAP and applicable TABLE cues')

pack={**V7,'version':8,'revision':'beginner-cues-v8','blocks':B}
(ROOT/'exam-sheet-v8-data.js').write_text('const V8_PACK='+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
coverage=json.loads((ROOT/'exam-sheet-v7-coverage.json').read_text())
coverage.update(version=8,inputs={f'exam-sheet-v{v}-data.js':hashlib.sha256((ROOT/f'exam-sheet-v{v}-data.js').read_bytes()).hexdigest() for v in [5,7]},
 blocks={k:{name:b[name] for name in ['title','sources','topics','page','column','provenance']} for k,b in B.items()},
 selection='All V7 display mathematics, worked operations, tables and figures retained. Reword prose into recognition cues, model answers, table lookups and common-mistake reminders.')
(ROOT/'exam-sheet-v8-coverage.json').write_text(json.dumps(coverage,indent=2)+'\n')
print('V8: 39 question-to-method headings; 39 TRIGGER/TRAP pairs; 382 unchanged display equations.')
