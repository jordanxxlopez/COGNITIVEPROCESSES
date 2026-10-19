"""Frame existing checked problems using the professor's assignment structure.

This is an evidence-based format/ranking model, not a prediction of unseen exam
items. Every numerical input and solution remains in the original problem bank.
"""
from pathlib import Path
import ast
import hashlib
import json
import re
import subprocess
from collections import Counter

ROOT=Path(__file__).resolve().parents[1]
def load(name):
    s=(ROOT/name).read_text()
    return json.loads(s.split('=',1)[1].rstrip(';\n'))
D=load('data.js');V=load('v2-data.js')
def n(x):return format(float(x),'.12g')
def nums(s):return [float(x) for x in re.findall(r'-?\d+(?:\.\d+)?',str(s))]
def vector(xs):return r',\ '.join(n(x) for x in xs)
def table(headers,rows):
    return r'\begin{array}{'+'c'*len(headers)+'}'+ '&'.join(r'\text{'+h+'}' for h in headers)+r'\\\hline '+r'\\'.join('&'.join(n(v) if isinstance(v,(float,int)) else v for v in row) for row in rows)+r'\end{array}'
questions={}
def frame(p):
    g=p['given'];t=p['topic'];key=p['id'];math=[]
    title='';context='';parts=[];check=''
    if t=='summary' and key!='population':
        title='Measurements from a random sample'
        context='A random sample is selected from a population, and the following laboratory measurements are recorded.'
        math=[r'x_i:\quad '+vector(ast.literal_eval(g['data']))]
        parts=['Estimate the population mean and standard deviation. Show the sample variance calculation.', 'Characterize the uncertainty in the estimated population mean by calculating its standard error.']
        check='Enter the standard error of the mean.'
    elif key=='population':
        title='Variability in a complete population'
        context='The values 2, 4 and 6 represent every individual in the population, rather than a sample from it.'
        parts=['Calculate the population mean.', 'Calculate the population variance. Explain which denominator is appropriate.']
        check='Enter the population variance.'
    elif t=='classification':
        title='Classification of a recorded variable'
        context='A clinical study records each participant’s ZIP code. The entries consist of numerical digits.'
        parts=['Classify the data as interval-continuous, interval-discrete, categorical-nominal or categorical-ordered.', 'Explain whether differences between the numerical codes represent meaningful measured distances.']
        check='Enter 1 for interval-continuous, 2 for interval-discrete, 3 for categorical-nominal, or 4 for categorical-ordered.'
    elif t=='percentile':
        values=nums(re.search(r'(?:values |percentile of )([\d, ]+)',p['prompt'])[1])
        title='A percentile from observed measurements'
        context='A sample of measurements, arranged in increasing order, is given below.'
        math=[r'x_{(i)}:\quad '+vector(values)]
        parts=[f'Calculate the {n(g["p"])}th percentile using the rank convention taught in the lecture.', 'Show the rank and any interpolation between observations.']
        check='Enter the requested percentile value.'
    elif t=='expect':
        title='A discrete random variable'
        context='A discrete random variable X has the probability function shown below and probability zero elsewhere.'
        xs=nums(g['x']);ps=nums(g['probabilities'])
        math=[table(['x','f(x)'],list(zip(xs,ps)))]
        parts=['Check whether the function satisfies the properties of a probability function.', r'Compute \(E[X]\) and \(E[X^2]\), showing the weighted sums.', r'Calculate \(\operatorname{Var}(X)\).']
        check='Enter the variance.'
    elif t=='pmf':
        title='An unknown probability constant'
        context='A discrete random variable has probabilities c, 2c and 3c at the values 1, 2 and 3, respectively, and probability zero elsewhere.'
        parts=['Find the value of c that makes this a valid probability function.', 'Check both nonnegativity and total probability.']
        check='Enter c.'
    elif t=='dcdf':
        title='A distribution function at a cutoff'
        context='A discrete random variable takes the values 0, 1 and 2 with probabilities 0.2, 0.5 and 0.3, respectively.'
        parts=[r'Calculate \(F(1.5)\). Identify which possible outcomes belong in this cumulative probability.']
        check='Enter F(1.5).'
    elif t=='random':
        title='Outcomes of repeated coin tosses'
        context='Three fair coins are tossed independently.'
        parts=['Find the probability of obtaining exactly two heads. Show the possible sequences used in the calculation.']
        check='Enter the probability.'
    elif t=='independent':
        title='Two draws without replacement'
        context='Two cards are drawn in sequence from a standard deck of 52 cards containing four kings. The first card is not replaced.'
        parts=['Find the probability that both cards are kings. Show how the second-draw probability depends on the first draw.']
        check='Enter the probability.'
    elif t=='linear':
        title='A combination of independent measurements'
        context='X and Y are independent random variables with the following population means and variances.'
        math=[r'E[X]=10,\quad E[Y]=4,\quad\operatorname{Var}(X)=9,\quad\operatorname{Var}(Y)=1',r'Z=2X-3Y']
        parts=['Find the mean of Z.', 'Find the variance of Z. Show how the coefficients enter the variance calculation.']
        check='Enter the variance of Z.'
    elif t=='ccdf':
        title='A continuous probability density'
        if key=='density':b=2;density=r'0.5x';unit=r'\text{ hours}'
        else:b=g['upper support'];density=r'\frac{2x}{'+n(b*b)+'}';unit=''
        context='The continuous random variable X has the following probability density and density zero outside the stated interval.'
        math=[r'f(x)='+density+r',\quad 0\le x\le '+n(b)+unit]
        parts=['Find the distribution function inside the support.', 'Find the median by using its cumulative-probability definition.']
        if key=='density':parts.insert(1,r'Calculate \(P(X<1)\), \(E[X]\) and \(\operatorname{Var}(X)\).')
        check='Enter the median.'
    elif t=='integrate':
        title='Determine the support of a density'
        context='A continuous random variable has the following proposed density, with c an unknown positive endpoint.'
        math=[r'f(x)=\begin{cases}0.5+x&0<x\le c\\0&\text{elsewhere}\end{cases}']
        parts=['Find c so that the function is a valid density. Show the integral over the full support and retain the appropriate root.']
        check='Enter the positive endpoint c.'
    elif t=='uniform':
        if key=='uniform':a,b=g['a'],g['b'];lo,hi=3,5
        else:a,b=nums(g['support']);lo,hi=nums(re.search(r'P\((.*?)\)',p['prompt'])[1])
        title='The time required for a procedure'
        context=f'The time X required for a laboratory procedure is uniformly distributed between {n(a)} and {n(b)}.'
        parts=[f'Find the probability that the procedure takes longer than {n(lo)} but less than {n(hi)}. Show how the supported interval determines the probability.']
        if key=='uniform':parts.append('Calculate the population mean and variance of the processing time.')
        check='Enter the interval probability.'
    elif t=='normalprob':
        title='Measurements in a Normal population'
        context=f'Fasting blood-glucose concentration X in an adult population is Normally distributed with mean {n(g["μ"])} mg/dL and standard deviation {n(g["σ"])} mg/dL.'
        parts=[f'Find the probability that a randomly selected individual has a measurement between {n(g["lower"])} and {n(g["upper"])}.', 'Show the standardized endpoints and use the standard Normal table to obtain the probability. Interpret the result in terms of individuals in the population.']
        check='Enter the probability.'
    elif t=='normalquant':
        title='A cutoff in a Normal population'
        context=f'A physiological measurement is Normally distributed with mean {n(g["μ"])} and standard deviation {n(g["σ"])}.'
        parts=[f'Find the measurement below which {n(100*g["left-tail area"])}% of the population falls.', 'Show the standard Normal cutoff and convert it back to the measurement scale.']
        check='Enter the measurement cutoff.'
    elif t=='sampling' and key=='sampling':
        title='The average of independent observations'
        context='Individual measurements in a Normal population have mean 100 and standard deviation 20. A random sample of 25 independent observations is selected.'
        parts=['Find the standard deviation of the sample mean.', 'Find the probability that the sample mean exceeds 108. Show the standardization and explain which spread belongs in the denominator.']
        check='Enter the probability that the sample mean exceeds 108.'
    elif t=='sampling':
        title='Variation among repeated sample means'
        context=f'A population has standard deviation {n(g["σ"])}. Independent random samples of {n(g["n"])} observations are drawn from this population, and a mean is calculated for each sample.'
        parts=['Calculate the standard deviation of these sample means. Distinguish this quantity from the variability among individuals.']
        check='Enter the standard deviation of the sample means.'
    elif t=='estimators':
        title='The effect of increasing the sample size'
        context='The standard error of a sample mean is 3 when the sample size is 16. A new sample of 64 observations is drawn from the same population, with the same population standard deviation.'
        parts=['Calculate the standard error for the new sample size. Show how the change in sample size changes the uncertainty in the mean.']
        check='Enter the new standard error.'
    elif t=='onet':
        title='A study population and a reference mean'
        context=f'A blood measurement in a reference adult population has a known mean of {n(g["μ0"])}. To determine whether the mean differs in a student population, researchers select a random sample of {n(g["n"])} students. The sample mean is {n(g["mean"])} and the sample standard deviation is {n(g["s"])}. Assume the measured variable is Normally distributed.'
        parts=['State the population null hypothesis and identify the appropriate statistical test.', r'Use a two-sided significance level of \(\alpha=0.05\). Show the standard error, signed test statistic, degrees of freedom and critical value.', 'Give a conclusion about the study population mean compared with the reference.']
        check='Enter the signed t statistic.'
    elif t=='pooledt':
        n1,m1,s1=nums(g['group 1']);n2,m2,s2=nums(g['group 2'])
        title='A comparison of two treatment populations'
        context='Researchers compare a measured response in a control group and an intervention group. The samples are independent. Assume Normal populations with a common population variance. The sample results are summarized below.'
        math=[table(['Group','n','Mean','SD'],[[r'\text{Control}',n1,m1,s1],[r'\text{Intervention}',n2,m2,s2]])]
        parts=['State the population null hypothesis and select the test specific to two independent groups.', r'At \(\alpha=0.05\), determine whether the population means differ. Show the pooled variance, standard error, signed statistic and degrees of freedom.', 'Use the appropriate table and state the conclusion in terms of the two population means.']
        check='Enter the signed t statistic, using control minus intervention.'
    elif t=='anova':
        means=ast.literal_eval(g['means']);sds=ast.literal_eval(g['SDs']);size=g['n per group']
        title='Responses under different regimens'
        context=f'A study compares {len(means)} independent groups receiving different regimens. Each group contains {n(size)} subjects. The measured response is interval data. Assume Normal populations with equal population variances. The group summaries are given below.'
        math=[table(['Group','Mean','SD'],[[i+1,m,s] for i,(m,s) in enumerate(zip(means,sds))])]
        if key=='class-hr':
            title='Heart rate and pet preference'
            context='A class survey compares heart rate in independent samples of students who prefer cats and students who prefer dogs. Each group contains five students. Assume Normal populations with equal population variances.'
            math=[table(['Preference','Mean','SD'],[[r'\text{Cats}',means[0],sds[0]],[r'\text{Dogs}',means[1],sds[1]]])]
        parts=['State the population null hypothesis and identify the appropriate overall comparison.', r'At \(\alpha=0.05\), determine whether at least one population mean differs. Show the within- and between-groups variance estimates, test statistic and both degrees of freedom.', 'Use the F table and give the overall conclusion. Do not test individual pairs.']
        check='Enter F.'
    elif t=='bonferroni' and key=='bonf':
        title='Pair comparisons following an overall difference'
        context='An overall comparison identifies a mean difference among three groups. Each group has five observations; the group means are 10, 12 and 14. The within-groups variance estimate is 4, with 12 residual degrees of freedom.'
        parts=[r'Test the family of all three pairs using Bonferroni and an overall significance level of \(\alpha_T=0.05\).', 'Show the per-comparison level, the shared standard error and the pair statistics. Identify the pairs supported by the adjusted comparison.']
        check='Enter the magnitude of t for the comparison of means 10 and 14.'
    elif t=='bonferroni':
        title='The significance level for a requested family'
        context=f'Following an overall group comparison, the investigators request {n(g["k"])} pair comparisons as one family. The overall significance level is 0.05.'
        parts=['Use Bonferroni to find the significance level for each requested comparison.', 'Explain how that per-comparison level is used with a two-sided t table.']
        check='Enter the per-comparison significance level.'
    elif t=='posthoc':
        title='The statistic for a pair after ANOVA'
        context=f'Following ANOVA, two group means differ by {n(g["mean gap"])}. Each of those groups contains {n(g["n"])} observations. The original ANOVA within-groups variance estimate is {n(g["within variance"])}.'
        parts=['Use the original within-groups variance to calculate the standard error of the pair’s difference.', 'Calculate the magnitude of the pair’s t statistic.']
        check='Enter the magnitude of t.'
    elif t=='holm':
        vals=[.008,.020,.040] if key=='holm' else [.010,.030,.040]
        title='Decisions for a multiple-comparison family'
        context='Three requested pair comparisons form one family. Their unadjusted p values, labeled A, B and C, are shown below.'
        math=[table(['Comparison','p'],[[r'\text{'+label+'}',v] for label,v in zip('ABC',vals)])]
        parts=[r'Use Holm’s method with overall \(\alpha_T=0.05\). Show the ordered comparisons and the level used at each rank.', 'Identify which null hypotheses are rejected, applying the stopping rule where necessary.']
        check='Enter the number of rejected null hypotheses.'
    elif t=='binary':
        events=g.get('events',g.get('m'));total=g.get('patients',g.get('n'))
        title='Uncertainty in an observed event proportion'
        context=f'In a group of {n(total)} independently observed patients, {n(events)} experience the event of interest.'
        if key=='halothane-se':context='In the lecture’s halothane patient group, 8 deaths occur among 61 patients. Death is the event of interest.'
        parts=['Estimate the population event proportion.', 'Calculate the estimated binary variance and the standard error of the estimated proportion. Distinguish the proportion’s standard error from individual binary SD.']
        check='Enter the standard error of the estimated proportion.'
    elif t=='zprop':
        a,b=nums(g['m1/n1']);c,d=nums(g['m2/n2'])
        title='Event rates in two independent groups'
        context=f'A study compares an event in two independent patient groups. Group 1 has {n(a)} events among {n(b)} patients; group 2 has {n(c)} events among {n(d)} patients.'
        parts=['State the null hypothesis about the two population event proportions.', r'At \(\alpha=0.05\), use the two-proportion z comparison with the course’s Yates correction. Show the group proportions, pooled proportion, null standard error and corrected statistic.', 'Use the two-sided cutoff and state the conclusion about the population event rates.']
        check='Enter the magnitude of the corrected z statistic.'
    elif t=='chi':
        observed=ast.literal_eval(g['observed table']);rows=len(observed)
        title='Treatment group and clinical outcome'
        context='Independent groups are followed for an event. The observed numbers of patients with and without the event are shown below.'
        math=[table(['Group','Event','No event'],[[i+1,*row] for i,row in enumerate(observed)])]
        correction='Apply Yates’ correction to this 2×2 comparison.' if rows==2 else 'Use ordinary cell contributions for this larger table.'
        parts=['State the null hypothesis about the population outcome distributions.', r'At \(\alpha=0.05\), calculate expected counts, the test statistic and degrees of freedom. '+correction, 'Use the chi-square table and give a conclusion about outcome distributions across groups.']
        check='Enter the chi-square statistic.'
    elif t=='gof':
        title='Observed categories and a proposed population pattern'
        context='A sample of 470 people contains 255, 125 and 90 people in three exercise categories. A proposed population pattern assigns probabilities 0.60, 0.25 and 0.15 to these categories, respectively.'
        parts=[r'At \(\alpha=0.05\), determine whether the sample supports a departure from the proposed category proportions.', 'State the null, calculate expected counts, the test statistic and degrees of freedom, and give the table-based decision.']
        check='Enter the chi-square statistic.'
    elif t=='risk':
        title='Risk following treatment or control'
        if key in ['risk','aspirin-risk']:
            a,b,c,d=(10,100,20,100) if key=='risk' else (6,19,18,25)
            context=f'A study follows treated patients and controls for an adverse event. There are {a} events among {b} treated patients and {c} events among {d} controls.'
            if key=='aspirin-risk':
                title='Aspirin and thrombus risk'
                context='A study follows aspirin and placebo groups for thrombus formation. There are 6 thrombi among 19 aspirin patients and 18 among 25 placebo patients. Aspirin is the treatment and placebo is the reference control.'
            parts=['Calculate the risk in each group and the relative risk for treatment versus control.', 'Calculate the absolute risk reduction and the number needed to treat. Interpret the reduction in event risk.']
            check='Enter NNT before rounding to a whole-person count.' if key=='aspirin-risk' else 'Enter NNT.'
        else:
            context=f'A study follows treated patients and controls for an adverse event. The observed treatment event risk is {n(g["treated"])} and the control event risk is {n(g["control"])}.'
            parts=['Calculate the relative risk for treatment versus control and interpret the direction of the comparison.', 'Calculate the absolute risk reduction and number needed to treat.']
            check='Enter relative risk for treatment versus control.'
    elif t=='nnt':
        title='An increase in adverse-event risk'
        context='The adverse-event risk is 0.08 in an exposed group and 0.03 in an unexposed comparison group.'
        parts=['Calculate the absolute risk increase.', 'Calculate the number needed to harm and interpret the result.']
        check='Enter NNH.'
    elif t=='odds':
        title='Exposure and outcome in a count table'
        if key=='smoke-odds':
            context='A case-control study includes 50 exposed and 14 unexposed breast-cancer cases, and 43 exposed and 35 unexposed disease-free controls.'
            parts=['Calculate the exposure odds in cases and controls.', 'Calculate and interpret the exposure odds ratio for cases versus controls.']
        else:
            context='A study records exposure status and whether an event occurs. The observed counts are shown below; rows indicate exposure, and columns indicate the outcome.'
            math=[table(['','Event','No event'],[[r'\text{Exposed}',g['a'],g['b']],[r'\text{Unexposed}',g['c'],g['d']]])]
            parts=['Calculate the event odds ratio for the exposed group relative to the unexposed group. Show the labeled odds or the diagonal products.']
        check='Enter the odds ratio in the requested direction.'
    elif t=='trials':
        title='Knowledge of treatment assignment'
        context='In a clinical trial, investigators want participants to remain unaware of which treatment they receive.'
        parts=['Identify whether random assignment or masking provides this feature. Distinguish assigning treatment from concealing treatment information.']
        check='Enter 1 for random assignment or 2 for masking.'
    elif t=='rcode':
        title='A supplied statistical result'
        context='A Student two-sample t test compares two independent Normal populations with equal variances and produces the following supplied result.'
        math=[r't=2.50,\quad\nu=18,\quad p=0.0223']
        parts=[r'At \(\alpha=0.05\), state the decision about equal population means.', 'Explain the conclusion in terms of population means, using the supplied result without writing code.']
        check='Enter 1 to reject the null or 0 not to reject it.'
    else:raise ValueError((key,t,'unframed topic'))
    assert context and parts and check
    return dict(title=title,context=context,math=math,parts=parts,check=check,topic=t)

for p in D['problems']:questions[p['id']]=frame(p)
for q in questions.values():
    q['fingerprint']=hashlib.sha256(json.dumps(q,sort_keys=True,ensure_ascii=False).encode()).hexdigest()

# Evaluate observable question-format features against the supplied sources.
texts={name:subprocess.check_output(['pdftotext','-layout',str(ROOT/'sources'/name),'-']).decode() for name in ['hw1.pdf','hw2.pdf']}
texts['midterm-review-transcript.txt']=(ROOT/'sources/midterm-review-transcript.txt').read_text()
features={
 'calculation':r'\b(?:calculate|compute|find|determine)\b',
 'reasoning':r'\b(?:explain|interpret|conclusion|show|characterize)\b',
 'population_inference':r'\b(?:population|populations|null hypothesis)\b',
 'study_context':r'\b(?:subjects|patients|treatment|researchers|sample|study)\b',
 'table_or_summary':r'\b(?:table|standard deviation|sample mean|counts)\b',
}
counts={name:{f:len(re.findall(rx,text,re.I)) for f,rx in features.items()} for name,text in texts.items()}
weights={p['topic']:p['score'] for p in V['priorities'] if not p['excluded']}
report={'model':'Source-evidence question-format model','interpretation':'Counts describe source wording; topic evidence scores rank practice. Neither is a fitted probability of an unseen exam question.',
 'sourceSHA256':{name:hashlib.sha256((ROOT/'sources'/name).read_bytes()).hexdigest() for name in texts},
 'features':features,'featureCounts':counts,'topicEvidenceWeights':weights,
 'rules':['Context precedes numerical givens.','Subparts ask for the calculations supported by the existing worked solution.','Population null, table decision and contextual conclusion accompany complete hypothesis tests.','Short component exercises do not invent missing information for a full test.','Balanced ANOVA, course Yates convention and supplied-output interpretation follow the review.','No R code-writing, Session 14 power, or sum-of-squares ANOVA questions are added.'],
 'questions':len(questions),'uniqueFrames':len({q['fingerprint'] for q in questions.values()}),'byTopic':dict(Counter(q['topic'] for q in questions.values()))}
pack={'questions':questions,'weights':weights}
(ROOT/'practice-question-data.js').write_text('const PRACTICE_QUESTIONS='+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
(ROOT/'practice-question-model.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(f'Framed {len(questions)} checked problems across {len(report["byTopic"])} topics; analyzed {len(texts)} professor sources. No numerical bank changes.')
