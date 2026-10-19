"""Add small notation/operation references to every existing worked step."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]


def load(name):
    return json.loads((ROOT / name).read_text().split('=', 1)[1].rstrip(';\n'))


guide, version_d, old, data, neuro = [load(n) for n in
    ('equation-guide-data.js', 'version-d-data.js', 'studio-flow-data.js', 'data.js', 'neuroscience-worked-data.js')]
rules = {key: value['symbols'] for key, value in guide['rules'].items()}
rules.update(
    proppool=r'\(m_1,m_2\) (event counts); \(n_1,n_2\) (group totals); \(\hat p\) (pooled event proportion). Add events across groups, then divide by the combined number of participants.',
    mean=r'\(x_i\) (each observation); \(n\) (sample size); \(\bar x\) (sample mean). Add the observations, then divide by their count.',
    samplevar=r'\(s^2\) (sample variance); \(n-1\) (sample size minus one). Divide the total of squared distances by this divisor.',
    sem=r'\(s\) (individual sample SD); \(n\) (sample size); SEM (estimated spread of sample means). Divide the sample SD by the square root of the sample size.',
    deviation=r'\(x_i\) (each observation); \(\bar x\) (the same sample mean for every observation). Subtract that mean from each observed value.',
    squares=r'\((x_i-\bar x)^2\) (squared distance from the sample mean). Square each difference before adding.',
    sequences=r'\(N\) (number of possible complete sequences). Multiply the number of choices at each position to count all possible sequences.',
    ss=r'\(\sum\) (add all the indicated terms); \(x_i-\bar x\) (each observation’s distance from the sample mean). Add every squared distance.',
    or_=r'OR (odds ratio); numerator and denominator (odds in the two named groups). Divide the first group’s odds by the comparison group’s odds, keeping the table labels fixed.',
    densitysketch=r'\(f(x)\) (density height); \(F(x)\) (accumulated probability through the cutoff). Draw the supported curve and let the CDF rise from zero to one.',
    normalshape=r'\(x\) (one measurement); \(f(x)\) (Normal density); \(F(x)\) (area to its left); \(u\) (integration variable). The density is bell-shaped; the CDF accumulates its area.',
    populationmoments=r'\(E[X]\) (population mean); \(\operatorname{Var}(X)\) (population variance); \(\sigma\) (population SD). Square SD for variance; adding a constant changes the mean but not the variance.',
    odds_groups=r'\(\mathrm{odds}_{\mathrm{case}}\) (exposed divided by unexposed among cases); \(\mathrm{odds}_{\mathrm{control}}\) (the same fraction among controls); OR (case odds divided by control odds).',
    reverseodds=r'OR (odds ratio in the original direction); \(\mathrm{OR}_{\mathrm{reversed}}\) (ratio after reversing one comparison). Take the reciprocal.',
    absolutechange=r'\(|\Delta\mathrm{risk}|\) (size of the event-risk difference). Subtract the two risks on the zero-to-one probability scale, then take the positive magnitude.',
    peoplenumber=r'NNT (people treated per additional avoided event); NNH (people exposed per additional harmful event). Divide one by the positive absolute risk change; round upward only when whole people are requested.',
    shift=r'\(Z\) (original combined response); \(W\) (response after adding a constant); \(E[W]\) (new mean). Add the constant to the mean; retain the original variance and SD.',
    sampleplanning=r'\(n\) (independent observations); \(\sigma\) (individual population SD); SEM (target spread of sample means). Divide population SD by the target SEM, then square to obtain the required sample size.',
    individualrecover=r'\(\sigma\) (individual population SD); SEM (spread of sample means); \(n\) (sample size). Multiply SEM by the square root of the sample size.',
    binarychange=r'\(X\) (one zero-or-one event outcome); SD (spread among individuals); SE (uncertainty in the estimated proportion). Four times the independent sample size halves SE, while the event fraction stays fixed.',
    fractionnotation=r'\(\hat p_1,\hat p_2\) (observed event proportions); RR (ratio of the named population-group risk estimates). Divide the indicated numerator group’s event fraction by the reference group’s fraction.',
    decisionwords=r'The null states the population comparison being tested; the alternative states the specified departure. Compare the statistic or p value with its cutoff and name the populations in the conclusion.',
    familyconclusion=r'Each comparison retains its group labels and adjusted decision. Report the pairs supported by the completed family analysis.',
    twonullsymbols=r'\(\mu_{\mathrm{control}}\) (control population mean); \(\mu_{\mathrm{intervention}}\) (intervention population mean).',
    estimatedmeans=r'\(\hat\mu\) (estimated population mean); \(\hat\sigma\) (estimated population SD); SEM (uncertainty in the mean estimate). Reuse the sample estimates and divide SEM by two when the sample size is multiplied by four.',
    propdiffse=r'\(\mathrm{SE}_0\) (uncertainty of the proportion difference under the equal-proportion null); \(\hat p\) (pooled event proportion); \(n_1,n_2\) (group totals). Use the pooled binary variance and both group-size contributions.',
    f=r'\(F\) (ANOVA test statistic); \(s_{\mathrm{bet}}^2\) (between-groups variance estimate); \(s_{\mathrm{wit}}^2\) (within-groups variance estimate). Divide between by within.',
    twot=r'\(t\) (mean difference measured in standard-error units); \(\bar x_1,\bar x_2\) (group sample means); \(\mathrm{SE}_{\Delta}\) (standard error of their difference). Subtract in the stated group order, then divide by that SE.',
    onet=r'\(t\) (reference difference measured in SEM units); \(s\) (sample SD); \(n\) (sample size); \(\mu_0\) (fixed population reference). Subtract the reference from the sample mean, then divide by SEM.',
    zprop=r'\(|z_Y|\) (magnitude of the Yates-corrected z statistic); \(D_Y\) (corrected absolute proportion gap); \(\mathrm{SE}_0\) (pooled null standard error). Divide the corrected gap by its null SE.',
    chisum=r'\(\chi^2\) (chi-square test statistic); \(c_{ij}\) (each cell’s contribution). Add every cell’s term, with no further division.',
    hypothesislabels=r'\(H_0\) (null hypothesis); \(H_A\), also written \(H_1\) (alternative hypothesis).',
    classification=r'Nominal (category names without rank); ordered (ranked categories); discrete (separate recorded values); continuous (a measurement on a continuous scale). Classify what the recorded entry represents.',
    assignment=r'Randomization (assigning the regimen by chance); masking (concealing which regimen was assigned). Identify which procedure accomplishes the stated objective.',
    design=r'Crossover (each participant receives both regimens in separate periods); parallel groups (different participants remain in separate groups); sham (a procedure resembling the active procedure without its active component).',
    counttarget=r'Favorable outcomes (draws or complete sequences meeting the requested event); total outcomes (all equally likely possibilities). Count the outcomes that meet the condition before dividing.',
    normalpartition=r'\(\Phi(z)\) (standard Normal area to the left of z); \(P\) (probability). Subtract left areas for an interval; subtract from one for a right tail. A single continuous point has zero probability.',
    varianceboth=r'\(E[X^2]\) (average of squared outcomes); \((E[X])^2\) (square of the average outcome). Subtract the second from the first, or weight each squared distance from the mean by its probability.',
    medianrange=r'Median (middle sorted observation, or average of the two middle observations); range (largest minus smallest observation). Keep both answers in the original measurement units.',
    cdfboundary=r'\(F(t)=P(X\le t)\) (probability through the cutoff). Include a mass at the boundary for the CDF; exclude it when the requested inequality is strict.',
    densityconstant=r'\(c\) (unknown positive upper support endpoint); \(f(x)\) (density). Set the full supported area equal to one, integrate, and retain the positive root that fits the support.',
    directrr=r'Risk (events divided by all participants in a group); RR (risk ratio). Use the named first group in the numerator and the reference group in the denominator.',
)
# A label inherited by a new course case uses the same reference as the original
# procedure, without borrowing different numerical givens from a lecture example.
label_rules = {}
by_id = {p['id']: p for p in data['problems'] + version_d['extraCases']}
for pid, flow in old['problems'].items():
    for index, step in enumerate(flow):
        keys = guide['problems'].get(pid, [])[index]
        if keys:
            label_rules[(by_id[pid]['topic'], step['label'])] = keys

labels = {
    'Median and range': 'medianrange', '75th percentile': 'rank interpolate',
    'Population estimates and the larger sample': 'estimatedmeans',
    'Median, quartiles and IQR': 'median iqr',
    'Complete CDF and sketches': 'validpmf cdfboundary',
    'Mean and second moment': 'ex ex2', 'Variance by both definitions': 'varianceboth',
    'With replacement': 'independent', 'Boundary probabilities': 'cdfboundary',
    'Shifted result': 'shift', 'Check total probability': 'area integral',
    'Complete distribution and sketches': 'densitysketch', 'Moments from the density': 'cex cex2 var',
    'Median': 'medianarea', 'Tail, interval and point probabilities': 'tails interval point',
    'Density, CDF and sketches': 'normalshape',
    'Population moments and a shifted response': 'populationmoments',
    'Percentile cutoffs': 'quantile', 'Standardize the probability cutoffs': 'z',
    'Partition of the population': 'normalpartition',
    'Sampling-distribution parameters': 'meanvar meanse',
    'Right-tail probability for the mean': 'meanz meanright',
    'Non-Normal population with n=50': 'meanvar meanse',
    'Recover individual SD': 'individualrecover', 'Sample size for SEM=1': 'sampleplanning',
    'Requested family and adjusted level': 'bonf pairdf tdf',
    'Common pair standard error': 'pairse', 'Family conclusion': 'familyconclusion',
    'Different requested family': 'family holm', 'Individual SD versus proportion SE': 'binarychange',
    'Equivalent corrected chi-square comparison': 'chidf',
    'Relative event risk': 'fractionnotation', 'Association after the group comparison': 'fractionnotation',
    'Explain': 'decisionwords', 'Largest departure contribution': 'gof',
    'Absolute event-risk change': 'absolutechange', 'Number of people': 'peoplenumber',
    'Clinical interpretation': 'peoplenumber',
    'Exposure odds in the sampled outcome groups': 'odds_groups', 'Reverse one set of labels': 'reverseodds',
    'State the result': 'decisionwords', 'Critical-value confirmation': 'tdf tdecision',
    'Information in the reported df': 'tdf', 'Population SD': 'popvar',
    'All-pair family and cutoff': 'bonf pairdf pairse',
    'Adjusted dose conclusion': 'decisionwords', 'Validity': 'validpmf',
    'Full CDF': 'cdfboundary', 'Mean': 'ex', 'Second moment': 'ex2',
    'Variance by both forms': 'varianceboth', 'CDF versus a strict endpoint': 'cdfboundary',
    'Normalize the full density and select c': 'densityconstant', 'Complete CDF': 'densitysketch',
    'Mean of X': 'cex', 'Mean of the transformed response': 'ceh', 'Variance': 'var',
    'Right-tail probability': 'tails', 'Interval probability': 'interval', 'Probability at one point': 'point',
    'Density and complete CDF sketches': 'densitysketch',
    'Sampling mean and variance': 'meanvar', 'Spread of sample means': 'meanse',
    'Standardized endpoints': 'meanz', 'Actual pooled count': 'proppool',
    'Null standard error': 'propdiffse', 'Continuity-corrected gap': 'yatesgap',
    'Corrected statistic': 'zprop', 'Two-sided decision': 'zdecision',
    'Describe the area': 'normalpartition', 'Interpret': 'decisionwords',
    'Describe the cutoff': 'quantile', 'Explain the ratio': 'or_',
    'Check direction': 'quantile',
    'Distinguish the ratio from a whole-person count': 'peoplenumber',
    'State the comparison': 'or_',
}


def outcome(pid, topic, is_neuro):
    if topic == 'summary':
        if pid == 'population': return 'stimulus-frame presentation duration' if is_neuro else 'device processing time'
        return 'visual-search time' if is_neuro else 'height' if pid == 'd-hw1-heights' else 'specimen preparation time'
    if topic == 'percentile': return 'visual-search time' if is_neuro else 'laboratory measurement'
    if topic in ('normalprob', 'normalquant', 'onet'): return 'neural-response latency' if is_neuro else 'LDL concentration' if topic == 'onet' else 'glucose concentration'
    if topic == 'sampling': return 'EEG response amplitude' if is_neuro and pid == 'd-lecture-sampling' else 'neural-response latency' if is_neuro else 'individual physiological measurement'
    if topic in ('ccdf', 'integrate', 'uniform'): return 'sound-cue delay' if is_neuro and topic == 'uniform' else 'perceptual-switch waiting time' if is_neuro else 'procedure time'
    if topic in ('pmf', 'expect', 'dcdf'): return 'tone-detection score' if is_neuro else 'numerical response'
    if topic == 'random': return 'number of left-pointing cues' if is_neuro else 'number of heads'
    if topic == 'binary': return 'phantom-vibration report coded as zero or one' if is_neuro else 'event outcome coded as zero or one'
    return None


def reference_rules(pid, step, index, mode):
    p = by_id[pid]
    topic, label = p['topic'], step['label']
    origin = step.get('origin', index if mode == 'C' else None)
    keys = guide['problems'].get(pid, [])
    selected = keys[origin] if origin is not None and origin < len(keys) else []
    if not selected:
        selected = label_rules.get((topic, label), [])
    if not selected and label in labels:
        selected = labels[label].split()
    if label in ('State H0', 'Population null'):
        selected = ['hypothesislabels']
        if topic == 'anova': selected += ['hmean']
        elif topic == 'pooledt': selected += ['twonullsymbols']
        elif topic == 'onet': selected += ['onull']
        elif topic == 'zprop': selected += ['propnull']
    if label == 'Calculate each cell contribution':
        selected = ['yatescell' if any(r'\max' in tex for tex in step['math']) else 'chicell']
    if not selected and re.match(r'Groups \d+ and \d+|Low versus|Medium versus', label): selected = ['pairt', 'tdecision']
    if not selected and label.startswith('Control versus'): selected = ['holm', 'chidf']
    if not selected and label.startswith('Risk for '): selected = ['directrr']
    if not selected and topic == 'classification': selected = ['classification']
    if not selected and topic == 'trials': selected = ['design' if 'Design' in label else 'assignment']
    if not selected and label in ('Conclude', 'Conclude in context', 'Finish'): selected = ['decisionwords']
    if not selected: raise AssertionError((pid, mode, index, label))
    return selected


def reference(pid, step, index, mode, is_neuro=False):
    topic = by_id[pid]['topic']
    selected = reference_rules(pid, step, index, mode)
    selected = ['or_' if key in ('or', 'odds') else 'counttarget' if key == 'count' else key for key in selected]
    text = ' '.join(dict.fromkeys(rules[key] for key in selected))
    # Avoid importing the coin setting into the spatial-cue counterpart.
    if is_neuro:
        text = text.replace('number of tosses', 'number of cues').replace('Each toss supplies', 'Each cue supplies').replace('once per toss', 'once per cue').replace('per additional avoided adverse event', 'per additional avoided migraine event')
    what = outcome(pid, topic, is_neuro)
    if what:
        text = text.replace('(each observation)', f'(each observed {what})')
        if any(re.search(r'(?<![A-Za-z])X(?![A-Za-z])', tex) for tex in step['math']) and not any(r'\bar X' in tex or r'\bar{X}' in tex for tex in step['math']):
            text = r'\(X\) ('+what+' before its outcome is known). '+text
    if topic in ('anova', 'onet', 'pooledt', 'chi', 'zprop', 'gof', 'rcode') and any(re.search(r'\bp\s*=', tex) for tex in step['math']):
        text += r' \(p\) (tail probability of a result at least as extreme under the null hypothesis).'
    # The reference belongs to this equation's notation, not to a separate rule's
    # optional alternate notation. The full equation itself is never repeated.
    return text


if __name__ == '__main__':
    pack = {'D': {}, 'C': {}}
    for pid, q in version_d['problems'].items():
        pack['D'][pid] = [reference(pid, s, i, 'D') for i, s in enumerate(q['flow'])]
        nid = neuro['byOriginal'][pid]
        pack['D'][nid] = [reference(pid, s, i, 'D', True) for i, s in enumerate(q['flow'])]
    for pid, flow in old['problems'].items():
        pack['C'][pid] = [reference(pid, s, i, 'C') for i, s in enumerate(flow)]
    (ROOT / 'step-reference-data.js').write_text('const STEP_REFERENCES='+json.dumps(pack, ensure_ascii=False, separators=(',', ':'))+';\n')
    print('Built', sum(len(v) for mode in pack.values() for v in mode.values()), 'small step references across current, earlier and neuroscience examples.')
