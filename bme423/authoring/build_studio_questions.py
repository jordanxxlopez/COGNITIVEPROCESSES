"""Explicit question presentations for all source worked blocks and quiz items.

Question formats follow HW1/HW2 and the review. Original sources, numerical
answers, choices and explanations remain immutable. No unseen-exam claim.
"""
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads((ROOT/name).read_text().split('=',1)[1].rstrip(';\n'))
D=load('data.js');V=load('v2-data.js')
F={}
def add(key,context,parts,math=None):F[key]={'context':context,'parts':parts,'math':math or []}
add('language','A study records observations from a sample and uses them to describe a population.', ['Identify the symbols for an individual random variable, a recorded observation, a sample mean and a population mean.','Distinguish population SD and variance from their sample estimates, and identify sample size and degrees of freedom.'])
add('classify','A clinical data set contains height, LDL concentration, blood pressure, number of tender joints, age recorded in whole years, ZIP code, country of birth, cancer stage and pain category.', ['Classify each recorded variable using the course’s interval-continuous, interval-discrete, categorical-nominal and categorical-ordered categories.'])
add('describe','A sample of ten freshmen has the heights below, measured in inches.', ['Estimate the population mean and variance. Show the deviations or the equivalent squared-sum calculation.','Calculate the sample SD and the standard error of the mean.'],[r'x_i:\quad65,69,59,64,62,67,68,62,64,65'])
add('percent','The heights in inches of ten seniors are arranged in increasing order below.', ['Calculate the 75th percentile using the lecture’s rank and interpolation rule.','Find the median, first quartile, interquartile range and range.'],[r'x_{(i)}:\quad66,67,69,69,70,70,71,71,72,72'])
add('discrete','A discrete random variable has the probability function in the table, with probability zero elsewhere.', ['Check that the function is valid. Calculate the mean, second moment and variance.','Write the CDF and determine F(2) and the probability strictly below 2.'],[r'\begin{array}{c|rrrr}x&-1&2&3&7\\f(x)&.55&.15&.10&.20\end{array}'])
add('depend','Consider two experiments: three independent fair coin tosses, and two cards drawn without replacement from a standard 52-card deck containing four kings.', ['Find the probability of exactly two heads in the coin experiment.','Find the probability that both cards are kings. Account for the first draw when calculating the second probability.'])
add('continuous','A continuous random variable has the density below and density zero outside its support.', ['Verify total area one and obtain the CDF for every x.','Calculate P(X<1), P(X>1.5), the mean, variance and median.'],[r'f(x)=x/2,\quad0\le x\le2'])
add('endpoint','A proposed density has an unknown positive upper endpoint c and is zero elsewhere.', ['Find c so that the density has total area one.','Give the CDF on the support.'],[r'f(x)=.1+x,\quad0<x\le c'])
add('normal','A continuous measurement X follows a Normal distribution with population mean μ and standard deviation σ.', ['Write its density and the standardization to Z.','Describe how symmetry and cumulative left areas determine left-tail, right-tail and interval probabilities.'])
add('normalwork','Fasting blood-glucose concentration in an adult population is Normally distributed with mean 95 mg/dL and SD 8.7 mg/dL.', ['Find the probabilities below 85, between 85 and 115, and above 115 mg/dL. Show the z values and table areas.','Find the probability of exactly 95 mg/dL and the population variance.'])
add('inverse','Fasting blood-glucose concentration is Normally distributed with mean 95 mg/dL and SD 8.7 mg/dL.', ['Find the concentration below which 97.5% of individuals fall.','Calculate the lower and upper quartiles in the original measurement units.'])
add('sampling','The amount of impurity in a population has mean 4 g and SD 1.5 g. A random sample of 50 independent observations is selected.', ['Use the sampling distribution of the mean to find the probability that the sample average is between 3.5 and 3.8 g.','Show the standard error and both standardized cutoffs.'])
add('linear','X and Y are independent random variables with known means and variances.', ['Express the mean and variance of aX+bY+c in terms of the given means and variances.','Determine how multiplying sample size by four changes SEM. Identify the course’s standard-error expression for the sample variance.'])
add('tables','Use the supplied Normal, t, F and chi-square tables for the following lookups.', ['Find the cumulative standard Normal area at z=0.05.','Find the two-sided .05 t cutoff with 4 df and its infinite-df limit.','Identify numerator and denominator df in the F table and distinguish its .05 and .01 entries.','Find upper-tail .05 chi-square cutoffs for 1 and 2 df. Explain how to handle an omitted df row.'])
add('ti','Use the calculator to check these lecture calculations after identifying the appropriate method.', ['Find the probability between glucose values 85 and 115 for a Normal population with mean 95 and SD 8.7, and its 97.5th percentile.','For impurity mean 4, individual SD 1.5 and n=50, find the probability that the mean lies between 3.5 and 3.8.','Check the one-sample heart-rate test and the two-group glucose test using the labeled summaries in the work below.'])
add('decision','A clinical study compares a measured response with a reference or with another treatment population. A significance level and the appropriate statistical test are specified.', ['State the population null hypothesis.','Identify the statistic, degrees of freedom and appropriate table tail. Explain how the comparison gives a conclusion about the population.'])
add('chooser','Several studies record different outcomes and use different sampling designs.', ['Identify the course method for one mean versus a reference, two independent means, several balanced means, two event proportions, a larger count table and one list of observed versus proposed category frequencies.','Distinguish the association measure available in a prospective study from that in a case-control sample.'])
add('anova','Three independent tumor-treatment groups each contain 12 subjects. The measured response is tumor volume in cubic millimeters. Assume Normal populations and equal population variances.', ['Determine whether at least one treatment population mean differs at α=.05. State the population null and use the balanced ANOVA calculation.','Show the within and between variance estimates, F, both df, the table comparison and conclusion.'],[r'\begin{array}{c|rrr}\text{Group}&1&2&3\\\text{Mean}&1188&1412&1363\\\text{SD}&189&217&191\end{array}'])
add('pooled','Two independent groups have the glucose summaries below. Assume Normal populations with equal population variances.', ['At α=.05, determine whether the two population means differ using the test specific to two independent groups.','Show the pooled variance, standard error, signed statistic, df and two-sided decision.'],[r'\begin{array}{c|rrr}\text{Group}&n&\text{Mean}&\text{SD}\\1&25&82.2&2.49\\2&25&86.1&2.09\end{array}'])
add('unequal','Two independent patient groups have the cardiac-index summaries below. Assume Normal populations with a common population variance.', ['At α=.05, test whether the population means differ. Use the actual unequal sample sizes in the pooled calculation.'],[r'\begin{array}{c|rrr}\text{Group}&n&\text{Mean}&\text{SD}\\1&9&2.08&1.05\\2&16&1.75&.88\end{array}'])
add('onet','A random sample of five individuals has mean heart rate 76.8 BPM and sample SD 4.15 BPM. The reference population mean is 72 BPM. Assume a Normal population.', ['At α=.05, determine whether the study population mean differs from the reference.','State the null and show SEM, t, df, the two-sided cutoff and a population conclusion.'])
add('pairs','An HDL study has three groups of 70 subjects each, with group means 64.8, 58.0 and 43.3. The ANOVA within variance is 239.9 and residual df is 207.', ['Calculate the standard error and t-statistic magnitude for each pair.','Determine the family size for all pairs and for comparisons of the two active groups against the inactive control only.'])
add('multiplicity','The HDL study compares all three pairs of means using an overall significance level .05. The pair-statistic magnitudes, with common df 207, are approximately 8.2, 5.6 and 2.6.', ['Find the Bonferroni per-comparison level and the cumulative area used for a two-sided inverse-t cutoff.','Apply Holm’s ordered levels and stopping rule to the requested three-pair family. Distinguish this family from two comparisons against control.'])
add('binary','A binary outcome records whether an individual experiences an event. A sample contains m events among n independent observations.', ['Estimate the population event proportion, the individual binary variance and SD, and the standard error of the estimated proportion.'])
counts=r'\begin{array}{l|rr}\text{Group}&\text{Thrombus}&\text{No thrombus}\\\text{Placebo}&18&7\\\text{Aspirin}&6&13\end{array}'
add('z','Patients receiving placebo or aspirin are followed for thrombus formation. The observed counts are shown below.', ['At α=.05, determine whether the population thrombus proportions differ using the Yates-corrected two-proportion z test.','Show each proportion, the pooled proportion, null SE, corrected gap and the two-sided conclusion.'],[counts])
add('chi2','Patients receiving placebo or aspirin are followed for thrombus formation. The observed counts are shown below.', ['At α=.05, test whether the population outcome distribution is the same in both groups. Use Yates’ correction.','Show the margins, expected counts, corrected cell contributions, df and conclusion.'],[counts])
add('large','A depression study records two outcomes in three independent treatment groups. The observed numbers are shown below.', ['At α=.05, test the common-outcome-distribution null. Show expected counts, chi-square, df and the conclusion.','Identify how requested pair comparisons would be handled after the overall test.'],[r'\begin{array}{c|rr}\text{Group}&\text{Outcome 1}&\text{Outcome 2}\\1&36&131\\2&41&132\\3&75&104\end{array}'])
add('gof','A sample of 470 people is classified into three exercise categories. The observed counts and proposed population proportions are shown below.', ['At α=.05, determine whether the observed frequencies support a departure from the proposed pattern.','State the null and calculate expected frequencies, cell contributions, chi-square and df.'],[r'\begin{array}{c|rr}\text{Category}&\text{Observed}&\text{Proposed proportion}\\1&255&.60\\2&125&.25\\3&90&.15\end{array}'])
add('risk','In a prospective aspirin/placebo study, thrombi occur in 6 of 19 aspirin patients and 18 of 25 placebo patients. In a separate case-control study, there are 50 exposed and 14 unexposed cases, and 43 exposed and 35 unexposed controls.', ['For aspirin versus placebo, calculate and interpret RR, absolute risk reduction and NNT. Give the whole-person NNT as well as its unrounded value.','For the case-control study, calculate exposure odds in cases and controls and the odds ratio.'])
add('output','Homework 2 supplies six pairwise chi-square results but asks which of three treatments differs from control. The three control-comparison statistics are shown below; each has one df.', ['Select the requested comparison family and apply Holm at overall α=.05. Show the order and successive levels.','Determine which treatment-versus-control nulls are rejected.'],[r'\begin{array}{c|r}\text{Comparison}&\chi^2\\G3\text{ vs control}&18.234\\G1\text{ vs control}&9.4944\\G2\text{ vs control}&4.6895\end{array}'])
add('trial','Clinical studies can assign treatment, follow exposure groups or select participants by disease status.', ['Distinguish randomized trials, prospective cohorts and case-control studies.','Explain randomization, participant/investigator masking, parallel groups, crossover and sham control using the course definitions.'])
add('uniform','A random variable is uniformly distributed between a and b. A second variable is Uniform(0,1).', ['Give the density, complete CDF, interval probability, mean and variance for the general interval.','Calculate the standard Uniform mean, second moment and variance directly by integration.'])
add('cltwhy','Independent observations have a common population mean μ and variance σ². Their average is calculated for a sample of size n.', ['Derive the mean, variance and SD of the sample mean from the corresponding properties of a sum.','State when the mean is exactly Normal and when the lecture’s central-limit approximation is used.'])
add('anovaoutput','An ANOVA of nitric-oxide measurements reports the following output. The Group-row p value is .0106.', ['State the population null and make the decision at α=.05.','Identify the within variance and df to retain for requested follow-up comparisons.'],[r'\begin{array}{l|rrr}\text{Row}&\text{df}&\text{Mean Sq}&F\\\text{Group}&2&389.7&5.832\\\text{Residuals}&19&66.8&\end{array}'])
add('proportionwork','The lecture’s halothane group has 8 deaths among 61 patients.', ['Estimate the death proportion, binary variance and individual SD.','Calculate the standard error of the estimated death proportion.'])
add('uniform-definition','A continuous random variable is uniformly distributed on the interval from a to b.', ['Write its density and complete CDF.','Express interval probabilities, mean and variance using a and b.'])
add('uniform-worked','A continuous random variable is uniformly distributed between zero and one.', ['Integrate the density to obtain the CDF.','Calculate the mean, second moment and variance, showing the integral limits.'])
add('functionmean','A random variable X has density .1+x on 0<x≤c, where c is the positive endpoint giving total area one. A separate blood-glucose variable is Normal with mean 95 mg/dL and SD 8.7 mg/dL.', ['Calculate E[X] and E[2X+1].','Find the mean and SD after subtracting 26 mg/dL from the glucose variable.'])
assert set(F)==set(V['blocks']),(set(F)^set(V['blocks']))

# Fold detached source formulas into the actual operations using those formulas.
# Every transformation names an exact original expression and fails if it drifts.
def edit(key,old,new):
    assert old in V['blocks'][key]['html'],(key,old)
    V['blocks'][key]['html']=V['blocks'][key]['html'].replace(old,new,1)
def eq(tex):return r'\['+tex+r'\]'
for tex in [r's_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}',r'\operatorname{SE}_{\Delta}=\sqrt{s_p^2(1/n_1+1/n_2)}',r't=\frac{\bar x_1-\bar x_2}{\operatorname{SE}_{\Delta}},\quad\nu=n_1+n_2-2']:edit('pooled',eq(tex),'')
edit('pooled',eq(r's_p^2=\frac{24(6.2001)+24(4.3681)}{48}=5.2841'),eq(r's_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}')+eq(r'=\frac{24(6.2001)+24(4.3681)}{48}=5.2841'))
edit('pooled',r'\operatorname{SE}_{\Delta}=\sqrt{5.2841',r'\operatorname{SE}_{\Delta}=\sqrt{s_p^2(1/n_1+1/n_2)}=\sqrt{5.2841')
edit('pooled',r't=\frac{82.2-86.1}',r't=\frac{\bar x_1-\bar x_2}{\operatorname{SE}_{\Delta}}=\frac{82.2-86.1}')
edit('onet',r't=\frac{4.8}',r't=\frac{\bar x-\mu_0}{s/\sqrt n}=\frac{4.8}')
edit('percent',r'R=1+\frac{75(10-1)}{100}',r'R=1+\frac{p(n-1)}{100}=1+\frac{75(10-1)}{100}')
edit('large',r'E_{11}=167(152)/519',r'E_{11}=\frac{R_1C_1}{N}=167(152)/519')
# Adjacent display continuations become one operation, preserving all original
# arithmetic and line breaks. They never pass through the legacy string splitter.
def join_math(html):
    pattern=r'(?:\\\[[\s\S]*?\\\]\s*){2,}'
    def group(m):
        lines=re.findall(r'\\\[([\s\S]*?)\\\]',m[0])
        return eq(r'\begin{gathered}'+r'\\'.join(lines)+r'\end{gathered}')
    return re.sub(pattern,group,html)
sources={key:{**F[key],'html':join_math(b['html'])} for key,b in V['blocks'].items()}

# Conceptual quiz questions remain questions, with self-contained study wording.
# Options/correct keys are kept in DATA; only the visible prompt is rewritten.
concepts=[
'A clinical data set contains several variables. Which variable is categorical-nominal even though its recorded values consist of digits?',
'A clinical study records patient measurements and counts. Which variable is interval-discrete under the course classification?',
'A patient’s disease severity is recorded as a category. Which listed variable has an ordered categorical scale?',
'A study records each participant’s age rounded to the nearest whole year. How is age classified as recorded?',
'A random sample is used to estimate a population mean. Which statement correctly distinguishes the standard error of that estimate from the SD of individual measurements?',
'A sample variance is calculated from deviations around the sample mean. Which divisor completes the variance estimate?',
'A sample of measurements has SD 4. What is its sample variance?',
'A percentile is to be obtained from a list of sample measurements. What must be done to the observations before locating the requested rank?',
'A sample contains n observations and the requested percentile number is p. Which expression gives the lecture’s rank for locating that percentile?',
'A Normal Q–Q plot of sample measurements is approximately straight. What does this indicate about the distribution of the measurements?',
'The same sample is displayed as a box plot and a violin plot. What additional feature is emphasized by the violin plot?',
'A fair coin has produced three consecutive heads. Tosses are independent. What is the probability of a head on the next toss?',
'An experiment has several possible outcomes. What does a random variable assign to each outcome?',
'Two observations are obtained sequentially in each of the listed experiments. In which experiment does the first draw change the probabilities for the second?',
'The events A and B are independent. Which expression gives the probability that both occur?',
'A proposed probability function lists masses at the possible values of a discrete random variable. Which two properties must be checked?',
'A discrete random variable takes separated numerical values. Can its expected value fall between two possible outcomes?',
'A random variable X has distribution function F. Which probability is represented by F(x)?',
'A discrete variable has no possible outcomes between two successive supported values. How does its CDF behave within that interval?',
'A discrete probability table is supplied. Which operation calculates the second moment E[X²]?',
'The mean and second moment of a random variable are known. Which expression gives its variance?',
'Every measured value of a random variable is increased by the same constant. What happens to its variance?',
'X and Y are independent measurements. Which expression gives the variance of their difference?',
'A new variable is defined by multiplying every value of X by 3. What is its variance in terms of Var(X)?',
'X is a continuous measurement with a density. What is the probability that it equals one specified value a exactly?',
'A proposed continuous density is greater than one on part of its support. Can the function still be a valid density?',
'A processing time is Uniform over a stated interval. Which operation gives the probability that it falls within a specified subinterval?',
'A proposed continuous density contains an unknown constant. Which condition determines that constant?',
'F is the CDF of a continuous measurement. Which expression gives the probability of a measurement greater than a?',
'A continuous random variable has CDF F. Which equation determines its median m?',
'A continuous random variable has density f(x). Which integrand is used to calculate its mean?',
'A population measurement is described by N(μ,σ²). What does the second parameter represent?',
'A measurement from a Normal population lies below the population mean. What is the sign of its standardized z value?',
'The cumulative standard Normal table supplies Φ(z), the area to the left of z. How is the area to the right obtained?',
'A continuous measurement has CDF F. Which expression gives the probability that it lies between a and b?',
'A supplied Normal calculation asks for a measurement cutoff from a specified cumulative area. Which R function performs this operation?',
'Independent observations are sampled from a population with SD σ. What is the SD of the mean of n observations?',
'A mean is calculated from independent observations. Under which condition is its sampling distribution exactly Normal for every sample size?',
'Independent observations come from a population that is not necessarily Normal. What distribution does the central limit theorem describe here?',
'A study seeks half the current SEM while keeping the population SD unchanged. How must its sample size change?',
'A statistic is used to estimate a population parameter over repeated random samples. What does it mean for the estimator to be unbiased?',
'A small-sample mean test uses a symmetric reference distribution with heavier tails than the Normal. Which distribution is this?',
'A balanced ANOVA statistic has been calculated. Which direction relative to its critical value supports rejection of the null?',
'A random sample is used to compare a population mean with a fixed reference value. Which test is appropriate?',
'A study compares means from two samples. Which setup meets the assumptions of the course’s pooled Student t test?',
'A test statistic has been observed under a specified population null hypothesis. What does its p value measure?',
'A hypothesis test does not reject its population null at the stated significance level. Which conclusion is justified?',
'Several treatment population means are compared using ANOVA. What is the population null hypothesis?',
'A balanced study supplies an SD for each equal-size treatment group. How is the ANOVA within-groups variance obtained?',
'A balanced ANOVA supplies group means and a common sample size. How is the between-groups variance estimate obtained?',
'An overall ANOVA is significant. What does this establish about the treatment population means?',
'A balanced ANOVA has m groups with n observations per group. What is its denominator degrees of freedom?',
'Two independent samples of sizes n1 and n2 are compared with the pooled Student t test. What degrees of freedom are used?',
'A supplied two-sample t calculation must use the course’s common-variance procedure. Which R argument requests that procedure?',
'A one-sample t test uses n observations to compare a mean with a fixed reference. What degrees of freedom are used?',
'A two-sided t test produces a signed statistic. Which quantity is compared with the positive critical cutoff?',
'An overall ANOVA is followed by selected pairwise mean comparisons. Which variance estimate should be retained?',
'A study has four groups in total, including one control. Each of the other groups is compared only with control. How many comparisons form the requested family?',
'Three pairwise comparisons are requested with family significance level .05. What significance level is used for each under Bonferroni?',
'A Bonferroni family contains k two-sided comparisons with overall level α. Which upper cumulative probability is used to obtain each positive inverse-t cutoff?',
'A family of comparisons is evaluated by Holm’s method. Which p value is tested first?',
'Holm’s ordered procedure reaches its first nonsignificant comparison. What decision applies to the remaining comparisons?',
'A clinical trial randomly assigns participants to treatments. What is the purpose of this randomization?',
'A clinical trial uses a crossover design. How are treatments received by each participant?',
'A clinical trial is double-blind under the course definition. Who is masked to treatment assignment?',
'A binary variable equals one for an event with probability p and zero otherwise. What is its population variance?',
'A group is followed to estimate the risk of death. Which observed count belongs in the numerator of its risk estimate?',
'A two-group test assumes equal population event proportions under H₀. How is the pooled sample proportion calculated?',
'A contingency-table test follows the course correction convention. Which table dimensions require Yates’ correction?',
'The same two-by-two data are analyzed with the course’s corrected z and chi-square methods. How are the corrected statistics related?',
'A contingency table has known row and column totals. How is an expected cell count calculated under the common-distribution null?',
'A contingency-table calculation produces a noninteger expected count. Is this allowed?',
'A contingency table has three rows and two columns. What degrees of freedom are used for its overall chi-square test?',
'A larger contingency-table test is significant and selected group pairs are compared. What must accompany the pairwise two-by-two tests?',
'A study records counts in categories. Which setup calls for a goodness-of-fit test rather than a multi-group contingency-table test?',
'A goodness-of-fit test compares four observed categories with fully specified population proportions. What degrees of freedom are used?',
'A study seeks an association between exposure and disease. Which sampling design generally requires an odds ratio instead of estimating disease relative risk directly?',
'A group is followed for a clinical event. How is the event risk defined?',
'The event relative risk for treatment compared with control is .5. What does this indicate about treatment risk?',
'A treatment reduces adverse-event risk compared with control. Which quantity is inverted to calculate NNT?',
'Two exposures have different numbers needed to harm. What does a smaller NNH indicate?',
'Rows of a two-by-two table are exposed and unexposed; columns are event and no event. The cells by row are (a,b) and (c,d). Which expression gives the exposed-versus-unexposed odds ratio?',
'An odds ratio has been calculated from a two-by-two table. What happens if only the exposure labels are reversed?',
'A standard Normal cutoff is obtained from cumulative area .8 and then passed to the standard Normal CDF. What area is returned?',
'An ANOVA output is supplied. Which column provides the p value for the overall significance decision?',
'A supplied base-R chi-square result compares two rows and two columns. Which correction does chisq.test use by default?',
'A supplied one-sample t command compares a mean with a reference. Which argument specifies that reference value?'
]
assert len(concepts)==87,len(concepts)
quizzes={}
for q in D['questions']+V['questions']:
    if q.get('problem'):quizzes[q['id']]={'problem':q['problem']}
    elif q['id'].startswith('q') and q['id'][1:].isdigit():quizzes[q['id']]={'stem':concepts[int(q['id'][1:])]}
    else:quizzes[q['id']]={'stem':q['stem'].replace('The same ANOVA output','An ANOVA output').replace('For those three control comparisons','For a family of three treatment-versus-control comparisons')}
quizzes['review-output-3']={'stem':'An ANOVA output reports Group df 2, Residuals df 19 and Residual Mean Sq 66.8. Selected population means are compared using this within variance. Which degrees of freedom accompany the follow-up comparisons?'}
quizzes['review-output-2']['math']=F['anovaoutput']['math']
quizzes['review-output-1']['math']=F['anovaoutput']['math']
assert len(quizzes)==327
(ROOT/'studio-question-data.js').write_text('const STUDIO_QUESTIONS='+json.dumps({'sources':sources,'quizzes':quizzes},ensure_ascii=False,separators=(',',':'))+';\n')
print('Framed all',len(sources),'source-worked blocks and',len(quizzes),'quiz questions; answers and options unchanged.')
