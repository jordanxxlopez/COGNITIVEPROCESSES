"""Contextual verbal statements for the existing BME423 tests.

No questions, answers, equations, slides or print packs are rewritten. References
for lecture examples are the original Sessions 6–12 and Session 15 review.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load(name):
    return json.loads((ROOT / name).read_text().split('=', 1)[1].rstrip(';\n'))


def pair(null, alternative, null_words, alternative_words, label=''):
    return dict(null='H_0:'+null, alternative='H_A:'+alternative,
                nullWords=null_words, alternativeWords=alternative_words, label=label)


def means(outcome='response', groups='the study groups', label=''):
    return pair(r'\mu_1=\cdots=\mu_m', r'\text{not all population means are equal}',
                f'The population mean {outcome} is the same across {groups}.',
                f'At least one pair of populations in {groups} has different mean {outcome}.', label)


def two_means(outcome='response', first='Group 1', second='Group 2', label=''):
    return pair(r'\mu_1=\mu_2', r'\mu_1\ne\mu_2',
                f'The {first} and {second} populations have the same mean {outcome}.',
                f'The {first} and {second} populations have different mean {outcome}.', label)


def one_mean(outcome='response', reference='the specified reference value', label=''):
    return pair(r'\mu=\mu_0', r'\mu\ne\mu_0',
                f'The study population mean {outcome} equals {reference}.',
                f'The study population mean {outcome} differs from {reference}.', label)


def proportions(event='the specified event', first='Group 1', second='Group 2', label=''):
    return pair(r'p_1=p_2', r'p_1\ne p_2',
                f'The population probability of {event} is the same in {first} and {second}.',
                f'The population probability of {event} differs between {first} and {second}.', label)


def distribution(outcome='the recorded outcome categories', groups='the study groups', label=''):
    return pair(r'\text{population outcome distributions are equal}',
                r'\text{at least one population outcome distribution differs}',
                f'The population proportions across {outcome} are the same across {groups}.',
                f'At least one population in {groups} has a different distribution across {outcome}.', label)


general = pair(r'\text{the stated population comparison holds}',
               r'\text{the specified population alternative holds}',
               'The population satisfies the equality, reference value or category pattern specified in the question.',
               'The population departs from that null comparison in the direction or directions specified by the question.')
gof = pair(r'(p_1,p_2,p_3)=(.60,.25,.15)',
           r'\text{at least one category probability differs from its target}',
           'The population proportions in categories one, two and three are sixty percent, twenty-five percent and fifteen percent, respectively.',
           'At least one population category proportion differs from its specified target proportion.')
pairwise = pair(r'\mu_i=\mu_j', r'\mu_i\ne\mu_j',
                'For the pair being tested, the two group populations have the same mean response.',
                'For the pair being tested, the two group populations have different mean responses.',
                'Each requested pair is a separate hypothesis')
control_pair = pair(r'\mu_j=\mu_{\mathrm{control}}', r'\mu_j\ne\mu_{\mathrm{control}}',
                    'The population mean response for the treatment being tested equals the control population mean response.',
                    'The population mean response for that treatment differs from the control population mean response.',
                    'Each requested treatment-versus-control comparison')
topics = dict(hypothesis=general, anova=means(), anovaSS=means(),
              onet=one_mean(), pooledt=two_means(), posthoc=pairwise,
              bonferroni=pairwise, holm=pairwise, zprop=proportions(),
              yates=proportions(), contingency=distribution(), chi=distribution(), gof=gof)

data, version_d, neuro = load('data.js'), load('version-d-data.js'), load('neuroscience-worked-data.js')
originals = {p['id']: p for p in data['problems'] + version_d['extraCases']}
problems = {}
for p in list(originals.values()) + neuro['problems']:
    pid, topic = p['id'], p['topic']
    is_neuro = pid.startswith('neuro-')
    source_id = p.get('originalId', pid)
    g = originals[source_id]['given']
    if topic == 'onet':
        reference = format(g['μ0'], '.12g') + (' milliseconds' if is_neuro else ' mg/dL')
        h = one_mean('neural-response latency' if is_neuro else 'LDL concentration', reference)
        population = 'sleep-restricted' if is_neuro else 'student'
        h['nullWords'] = h['nullWords'].replace('study population', population+' population')
        h['alternativeWords'] = h['alternativeWords'].replace('study population', population+' population')
    elif topic == 'pooledt':
        h = two_means('visual-discrimination score' if is_neuro else 'cognitive assessment score', 'control', 'intervention')
        h['null'] = r'H_0:\mu_{\mathrm{control}}=\mu_{\mathrm{intervention}}'
        h['alternative'] = r'H_A:\mu_{\mathrm{control}}\ne\mu_{\mathrm{intervention}}'
    elif topic == 'anova':
        h = means('visual-attention score' if is_neuro else 'laboratory response', 'the treatment groups')
        if source_id == 'class-hr':
            h = two_means('auditory-response latency', 'classical-music preference', 'electronic-music preference') if is_neuro else two_means('heart rate', 'cat-preference', 'dog-preference')
        elif source_id == 'd-hw2-filgrastim':
            h = means('EEG response amplitude', 'the low-, medium- and high-contrast groups') if is_neuro else means('neutrophil concentration', 'the low-, medium- and high-filgrastim-dose groups')
        elif source_id == 'd-hw1-tumor':
            h = means('decision latency', 'the static-, moving- and mixed-target training groups') if is_neuro else means('tumor volume', 'the three isotype-control dosing groups')
    elif topic == 'zprop':
        h = proportions('at least one migraine during follow-up' if is_neuro else 'the adverse event', 'the reference regimen population', 'the alternative regimen population')
        if source_id == 'd-hw2-dioxin':
            h = proportions('detecting the target sound', 'the visual-cue population', 'the verbal-cue population') if is_neuro else proportions('a female offspring', 'the father-only exposure population', 'the mother-only exposure population')
    elif topic == 'chi':
        h = distribution('migraine and no-migraine outcomes' if is_neuro else 'adverse-event and no-event outcomes', 'the regimen groups')
        if source_id == 'd-hw2-folate':
            h = proportions('reporting a phantom tone', 'the guided-listening population', 'the unguided-listening population') if is_neuro else proportions('a neural tube defect', 'the folate-supplement population', 'the no-folate population')
        elif source_id == 'd-hw2-mortality':
            h = distribution('persistent-tinnitus and no-persistent-tinnitus outcomes', 'the four sound-management groups') if is_neuro else distribution('survival and death outcomes', 'the four care-regimen groups')
    elif topic == 'gof':
        h = {**gof, 'label': 'Dream categories: social interaction, navigating a place, other themes' if is_neuro else 'Exercise categories: no regular exercise, sporadic exercise, regular exercise'}
    elif topic in ('posthoc', 'bonferroni'):
        h = {**pairwise, 'nullWords': 'For the requested pair, the two group populations have the same mean sensory-discrimination score.' if is_neuro else pairwise['nullWords'], 'alternativeWords': 'For the requested pair, the two group populations have different mean sensory-discrimination scores.' if is_neuro else pairwise['alternativeWords']}
        if topic == 'bonferroni' and source_id != 'bonf':
            h = {**control_pair, 'nullWords': control_pair['nullWords'].replace('response', 'sensory-discrimination score') if is_neuro else control_pair['nullWords'], 'alternativeWords': control_pair['alternativeWords'].replace('response', 'sensory-discrimination score') if is_neuro else control_pair['alternativeWords']}
    elif topic == 'holm':
        h = {**control_pair, 'nullWords': control_pair['nullWords'].replace('response', 'attention score') if is_neuro else control_pair['nullWords'], 'alternativeWords': control_pair['alternativeWords'].replace('response', 'attention score') if is_neuro else control_pair['alternativeWords']}
    elif topic == 'rcode':
        h = two_means('attention score', 'visual-cue', 'verbal-cue') if is_neuro else two_means()
    else:
        continue
    problems[pid] = h

sources = dict(
    decision=[general], anova=[means('tumor volume', 'the three isotype-control dosing groups')],
    pooled=[two_means('fasting glucose concentration', 'children without a diabetic parent', 'children with a diabetic parent')],
    onet=[one_mean('heart rate', '72 beats per minute')],
    pairs=[{**pairwise, 'nullWords': 'For the selected treatment pair, the two population mean HDL concentrations are equal.', 'alternativeWords': 'For the selected treatment pair, the two population mean HDL concentrations differ.'}],
    multiplicity=[pairwise], z=[proportions('a thrombus', 'placebo', 'aspirin')],
    chi2=[proportions('a thrombus', 'placebo', 'aspirin')],
    large=[distribution('depression and no-depression outcomes', 'the nefazodone, psychotherapy and combined-treatment groups')],
    gof=[{**gof, 'label': 'Exercise categories: no regular exercise, sporadic exercise, regular exercise'}],
    output=[proportions('death during follow-up', 'the active-treatment population being compared', 'the standard-care population', 'Each requested active-versus-control comparison')],
    anovaoutput=[means('exhaled nitric oxide', 'the lung-function groups')]
)
sources['pooled'][0]['nullWords'] = 'The population mean fasting glucose concentration is the same for children with and without a diabetic parent.'
sources['pooled'][0]['alternativeWords'] = 'The population mean fasting glucose concentration differs between children with and without a diabetic parent.'
slides = {}


def slide_range(mid, start, end, h):
    for page in range(start, end + 1):
        slides[f'{mid}:{page}'] = h


slide_range(6, 1, 2, means())
slide_range(6, 3, 15, means('cardiac output', 'the normal-diet, pasta, steak and fruit-and-nuts groups'))
slide_range(6, 16, 18, means('sperm motility', 'the cell-phone-use groups'))
slide_range(6, 19, 19, means('burnout score', 'the four clinical-unit populations'))
slide_range(7, 2, 7, slides['6:3'])
slide_range(7, 9, 17, two_means('heart rate', 'cat-preference', 'dog-preference'))
slide_range(7, 18, 25, means('forced mid-expiratory flow', 'the tobacco-exposure groups'))
slide_range(7, 32, 35, slides['6:3'])
slide_range(7, 37, 39, sources['anovaoutput'][0])
slide_range(8, 9, 14, two_means())
slide_range(8, 15, 16, sources['pooled'][0])
slide_range(8, 17, 19, two_means('cardiac index', 'halothane', 'morphine'))
slide_range(8, 20, 21, one_mean())
slide_range(8, 22, 24, sources['onet'][0])
slide_range(9, 7, 7, means('HDL concentration', 'the activity groups'))
slide_range(9, 8, 14, sources['pairs'][0])
slide_range(9, 16, 16, pair(r'\mu_1=\mu_j', r'\mu_1\ne\mu_j',
                          'For the comparison being tested, the Group 1 population and the selected other group population have the same mean response.',
                          'For that comparison, the Group 1 population and the selected other group population have different mean responses.',
                          'Each requested Group 1 comparison with another group'))
slide_range(11, 13, 15, proportions())
slide_range(11, 16, 18, proportions('death', 'halothane', 'morphine'))
slide_range(11, 19, 21, sources['z'][0])
slide_range(11, 22, 22, proportions('an adverse reaction', 'the topical-anesthetic-gel population', 'the placebo-cream population'))
slide_range(12, 4, 11, sources['chi2'][0])
slide_range(12, 13, 15, sources['large'][0])
for page, first, second in [(16, 'nefazodone', 'psychotherapy'), (17, 'nefazodone', 'combined treatment'), (18, 'psychotherapy', 'combined treatment')]:
    slides[f'12:{page}'] = proportions('depression', first, second)
slide_range(12, 19, 21, {**sources['large'][0], 'label': 'Overall comparison; each requested pair compares the two selected treatment populations'})
slide_range(12, 22, 24, sources['gof'][0])
slide_range(15, 33, 36, means())
slide_range(15, 37, 40, two_means())
slide_range(15, 41, 42, one_mean())
slide_range(15, 43, 45, pairwise)
slide_range(15, 49, 50, sources['z'][0])
slide_range(15, 51, 53, distribution())
slide_range(15, 54, 55, sources['gof'][0])

pack = dict(topics=topics, problems=problems, sources=sources, slides=slides,
            rules=dict(hmean=topics['anova'], onull=topics['onet'], propnull=topics['zprop']))
(ROOT / 'hypothesis-data.js').write_text('const HYPOTHESES='+json.dumps(pack, ensure_ascii=False, separators=(',', ':'))+';\n')
print(f'Built verbal hypotheses for {len(problems)} worked cases, {len(slides)} specific lecture slides, {len(sources)} source examples and {len(topics)} test topics.')
