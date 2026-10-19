"""Add synthetic neuro/psychology counterparts without changing the course bank.

All 236 answers, tolerances, and numerical solution steps are inherited from the
verified Version D bank. Only the study setting, outcome labels, and units change.
The new IDs isolate notes, drafts, and grading from the original worked examples.
"""
from pathlib import Path
import copy
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]


def load(name):
    return json.loads((ROOT / name).read_text().split('=', 1)[1].rstrip(';\n'))


def num(value):
    return format(float(value), '.12g')


def replace(value, pairs):
    if isinstance(value, str):
        for old, new in pairs:
            value = value.replace(old, new)
        return value
    if isinstance(value, list):
        return [replace(item, pairs) for item in value]
    if isinstance(value, dict):
        # Verification values describe arithmetic, not the study narrative.
        return {key: item if key == 'values' else replace(item, pairs)
                for key, item in value.items()}
    return value


DATA = load('data.js')
D = load('version-d-data.js')
SOURCE = DATA['problems'] + D['extraCases']
questions = {}
problems = []

for original in SOURCE:
    pid, topic, g = original['id'], original['topic'], original['given']
    base = D['problems'][pid]
    q = {key: copy.deepcopy(base[key]) for key in
         ('paragraphs', 'math', 'parts', 'check', 'flow', 'topic', 'primaryAnswer')}
    # These replacements are confined to new copies and preserve all numbers.
    pairs = [('patients', 'participants')]
    title = ''
    paras = []
    if topic == 'summary':
        title = 'Finding a hidden target: individual times and uncertainty in the mean'
        paras = [
            'A visual-search experiment asks each participant to locate a small owl hidden among distractor images. A random sample of independent participants completes the same display once. The recorded values are search times in seconds, measured from display onset until the target is selected.',
            'The population consists of people who would complete this task under the same conditions. The observations below are sample measurements. Describe the search-time distribution and estimate both its population center and the uncertainty in that estimated center.'
        ]
        pairs += [('individual preparation times', 'individual visual-search times'),
                  ('specimen times', 'visual-search times')]
        if pid == 'population':
            title = 'Three stimulus frames: describing the entire population'
            paras = [
                'A perception demonstration contains exactly three stimulus frames. Their programmed presentation durations are 2, 4 and 6 milliseconds. The population being described is this complete set of three frames; no additional frames belong to it.',
                'Describe the center and variability of the presentation durations. A second analyst proposes treating these three durations as a sample from a larger set. Compare the two variance calculations, retaining the population specified in the question.'
            ]
            pairs += [('devices', 'stimulus frames'), ('processing times', 'presentation durations')]
    elif topic == 'classification':
        title = 'What kind of variable does a brain-and-behavior study record?'
        paras = [
            'A brain-and-behavior study records neural measurements, task performance and participant categories. Numerical entries can represent either measured amounts or category labels. Classify the recorded variable itself, including the precision with which it is recorded.',
            'The variables are nerve-conduction velocity in meters per second, preferred music genre, age rounded to whole years, number of correctly detected tones, EEG amplitude in microvolts, number of missed targets, EEG channel label, membrane potential in millivolts, ordered symptom severity and pupil diameter in millimeters. EEG channels are labeled 101, 102 and 103; these numbers are identifiers.'
        ]
        pairs += [('peak flow', 'nerve-conduction velocity'),
                  ('systolic blood pressure', 'EEG amplitude'),
                  ('cell potential', 'membrane potential'), ('newborn height', 'pupil diameter'),
                  ('rounded age', 'rounded age'), ('text-message count', 'detected-tone count'),
                  ('tender-joint count', 'missed-target count'),
                  ('country of birth', 'preferred music genre'),
                  ('clinical stage', 'symptom severity'), ('ZIP-code', 'EEG-channel'),
                  ('ZIP codes', 'EEG channel labels'), ('ZIP code', 'EEG channel label'),
                  ('identifies a location', 'identifies a recording channel'),
                  ('A EEG channel label', 'An EEG channel label')]
    elif topic == 'percentile':
        title = 'Visual search: where does a slow or fast response fall?'
        paras = [
            'Participants search a crowded picture for a hidden animal. Each value below is the search time in seconds for a different independently sampled participant. The observations are already sorted, so positions in the list are ranks while the values themselves remain times.',
            f'The research report requests the {num(g["p"])}th percentile and the spread of the middle half of search times. Use the course’s fractional-rank interpolation rule. Report the requested percentile on the time scale, rather than reporting only the rank.'
        ]
    elif topic in ('expect', 'pmf', 'dcdf'):
        title = 'A surprise-tone task: probability, expectation and the CDF'
        paras = [
            'A perception task presents a brief sequence of tones, and each participant receives a numerical detection score. Let X denote the score for a randomly selected participant. The scoring scale is specified by the support below; a score is not automatically a count, and negative scores are permitted if listed.',
            'The probability model gives the probability of each possible score and is zero elsewhere. Describe what scores the model allows, how likely they are and how probabilities accumulate up to a cutoff. Show the calculations for both the center and variability of the score distribution.'
        ]
    elif topic == 'random':
        title = 'Predicting a sequence of left and right attention cues'
        paras = [
            'An attention task displays three successive spatial cues. Each cue points left (L) or right (R) with equal probability, independently of the other cues. Let X be the number of left-pointing cues in the sequence. The participant sees all three cues before responding.',
            'Construct the probability model for the number of left cues. Different cue counts can be produced by different numbers of equally likely sequences. Use those sequences to obtain probabilities, then describe the complete distribution and its moments.'
        ]
        pairs += [('head/tail', 'left/right cue'), ('heads', 'left cues'),
                  ('HHT, HTH and THH', 'LLR, LRL and RLL')]
    elif topic == 'independent':
        title = 'Choosing emotional target images with and without replacement'
        paras = [
            'A visual-attention experiment has a bank of 52 image cards, four of which show the target facial expression. Two images are selected at random in sequence. In one procedure the first card remains out of the bank; in another it is returned and the bank is reshuffled before the next selection.',
            'Determine the probability that both selected images show the target expression. Define K as selecting a target card. Account for the number of target images and total images remaining after the first selection, and compare the two sampling procedures.'
        ]
        pairs += [('two kings', 'two targets'), ('first king', 'first target'),
                  ('second king', 'second target'), ('a king', 'a target'),
                  ('kings', 'target cards'), ('deck', 'image bank')]
    elif topic == 'linear':
        title = 'Combining two independent sensory-response scores'
        paras = [
            'A sensory-processing study obtains two independently measured response scores, X and Y, on a common score scale. A composite response is defined by Z=2X−3Y. The coefficients are scoring weights: the second response is subtracted, but uncertainty from measuring it still contributes to the variability of Z.',
            'The population summaries are E[X]=10, E[Y]=4, Var(X)=9 and Var(Y)=1. A revised report uses W=Z+5. Determine how the weighting and the constant shift change the expected scores and their variability. Independence is an explicit assumption of this model.'
        ]
    elif topic in ('ccdf', 'integrate', 'uniform'):
        title = 'Waiting for a perceptual switch: density, area and cumulative probability'
        paras = [
            'During an ambiguous-image task, a viewer presses a key when the perceived image switches. Let X be the waiting time in seconds from the start of a trial to the first reported switch. The proposed continuous density below describes one waiting time and is zero outside the specified support.',
            'Use the density to characterize the waiting-time distribution. State the supported interval, obtain cumulative probabilities by integrating from its lower endpoint, and label the key values on density and CDF sketches. Work with waiting time in seconds throughout.'
        ]
        pairs += [('processing time', 'perceptual-switch waiting time'),
                  ('hours', 'seconds'), ('minutes', 'seconds')]
        if topic == 'uniform':
            title = 'A randomly timed sound cue: the Uniform waiting-time model'
            paras[0] = 'An auditory-attention task schedules a sound cue at a random time after the trial starts. Let X be the delay in seconds. The delay is Uniform over the supported interval below, so intervals of the same width within that support have the same probability.'
        if pid == 'd-hw1-density':
            paras[1] = 'The density is f(x)=.1+x on 0<x≤c and zero elsewhere. Determine the positive endpoint c from the total-area requirement, then obtain the CDF, moments and requested probabilities. Retain the supported integration limits and show the arithmetic at each stage.'
    elif topic in ('normalprob', 'normalquant'):
        title = 'How quickly does a visual signal produce a neural response?'
        paras = [
            f'A visual-evoked-response experiment measures the latency of a specified EEG response peak after a flash. In the modeled population, individual peak latencies are Normal with mean {num(g["μ"])} milliseconds and SD {num(g["σ"])} milliseconds. X denotes the latency for one randomly selected participant, measured under the same recording conditions.',
            'A report needs both probabilities for latency ranges and cutoffs that separate specified fractions of participants. Use the standard Normal table, show the standardized endpoints and keep milliseconds in cutoff answers. The task concerns a single individual’s latency, rather than an average over participants.'
        ]
        pairs += [('mg/dL', 'ms'), ('glucose measurement', 'neural-response latency'),
                  ('glucose', 'neural-response latency')]
    elif topic == 'sampling':
        title = 'How stable is the mean neural response across participants?'
        paras = [
            f'A visual-response study models individual EEG peak latencies as Normal, with population mean {num(g.get("μ", 100))} milliseconds and SD {num(g["σ"])} milliseconds. A random sample of {num(g["n"])} independent participants is tested once each, and the study reports their average latency.',
            'Imagine drawing new independent participant samples of the same size. Each sample has a different mean latency. Use the sampling distribution to distinguish variability among individual people from variability among those sample means, then evaluate the requested probability.'
        ]
        if pid == 'd-lecture-sampling':
            title = 'Mean EEG response amplitude in a large participant sample'
            paras = [
                'An EEG response-amplitude measurement has population mean 4 microvolts and population SD 1.5 microvolts. A random sample of 50 independent participants is tested once each. The question asks whether their sample mean amplitude lies between 3.5 and 3.8 microvolts.',
                'Use the course’s large-sample approximation for the distribution of the mean. Identify its center and standard error before standardizing both endpoints. The population distribution is not specified as Normal; the approximation concerns averages from independent samples.'
            ]
            pairs += [('3.8 g', '3.8 microvolts'), ('3.5 g', '3.5 microvolts')]
    elif topic == 'estimators':
        title = 'Planning a more precise EEG study'
        paras = [
            'An EEG study estimates a population mean peak amplitude from 16 independent participants. The standard error is 3 microvolts. A second study proposes testing 64 independent participants drawn from the same population with the same measurement procedure.',
            'Determine the effect of the larger sample on precision. The population spread of individual amplitudes stays the same; only the number of independently sampled participants changes. Show how to recover that population spread and how to plan a target SEM.'
        ]
    elif topic == 'onet':
        title = 'Does a sleep-restricted population have a different neural latency?'
        paras = [
            f'A visual-evoked-response reference specifies a population mean peak latency of {num(g["μ0"])} milliseconds. A sleep laboratory asks whether adults tested after a restricted-sleep night have a different mean latency from that fixed reference. Each participant contributes one latency measurement.',
            f'A random sample of {num(g["n"])} independent participants has mean latency {num(g["mean"])} milliseconds and sample SD {num(g["s"])} milliseconds. Assume a Normal latency population. The reference mean is treated as known, rather than estimated from a second sample. Use a two-sided significance level of .05.'
        ]
        pairs += [('student population mean LDL', 'sleep-restricted population mean latency'),
                  ('student population mean', 'sleep-restricted population mean'),
                  ('student population', 'sleep-restricted population'),
                  ('LDL', 'neural latency'), ('mg/dL', 'ms'),
                  ('students', 'participants')]
    elif topic == 'pooledt':
        title = 'Can attention training change visual-discrimination performance?'
        paras = [
            'A psychology study compares a visual-attention training program with a control activity. The groups contain different, independently sampled participants; nobody appears in both groups. After the assigned activity, each participant completes the same visual-discrimination assessment, scored on an interval scale.',
            'The table gives the two sample sizes, means and SDs. Group 1 is control and Group 2 is intervention. Assume Normal score populations and a common population variance. Determine whether the population mean scores differ, using a two-sided significance level of .05 and control minus intervention for the signed statistic.'
        ]
        pairs += [('cognitive assessment', 'visual-discrimination assessment'),
                  ('cognitive-score', 'visual-discrimination-score'),
                  ('cognitive scores', 'visual-discrimination scores')]
    elif topic == 'anova':
        title = 'Comparing attention-training regimens with balanced groups'
        paras = [
            'A cognitive-training experiment compares regimens intended to change performance on the same visual-attention task. Each participant receives one regimen and supplies one final interval-scale performance score. The question concerns the population mean scores for the regimens.',
            f'Each of the {num(g["m"])} groups contains {num(g["n per group"])} independent participants. The means and SDs are shown below. Assume Normal score populations and equal population variances. Use the balanced-study variance method and significance level .05.'
        ]
        if pid == 'class-hr':
            title = 'Auditory-response latency in two music-preference populations'
            paras = [
                'A psychology survey compares auditory EEG peak latency in independent groups who prefer classical music or electronic music. Each group contains five participants, and each participant supplies one latency in milliseconds. The group means and SDs appear below.',
                'Assume Normal latency populations with a common variance. Use the balanced overall comparison requested here and significance level .05. Determine whether the population mean latencies differ; the groups are preference categories, rather than randomized musical treatments.'
            ]
            pairs += [('Preference', 'Music preference'), ('Mean heart rate', 'Mean latency (ms)'),
                      ('Cats', 'Classical'), ('Dogs', 'Electronic'),
                      ('treatment population means', 'music-preference population mean latencies')]
        elif pid == 'd-hw2-filgrastim':
            title = 'EEG response amplitudes at three visual-contrast levels'
            paras = [
                'A visual-neuroscience experiment assigns different participants to low-, medium- or high-contrast flashes. Fifteen independent participants are tested at each level. Each participant contributes one EEG peak-amplitude response, measured in microvolts.',
                'The table gives the group means and SDs. Assume Normal amplitude populations with equal variance. Test the overall population means at .05, then compare all three pairs using the course’s Bonferroni procedure with family level .05 and the original within-groups variance.'
            ]
            pairs += [('Dose group', 'Contrast group'), ('Mean neutrophils', 'Mean amplitude'),
                      ('dose populations', 'contrast populations'), ('dose pairs', 'contrast pairs'),
                      ('dose comparisons', 'contrast comparisons'), ('dose pair', 'contrast pair'),
                      ('dose conclusion', 'contrast conclusion'), ('low dose', 'low contrast'),
                      ('high dose', 'high contrast')]
        elif pid == 'd-hw1-tumor':
            title = 'Decision latency after three visual-search training regimens'
            paras = [
                'A visual-search experiment compares three independent groups after training with static targets, moving targets or mixed targets. Each group contains twelve participants. One final decision latency per participant is recorded in milliseconds; the group means and SDs are shown below.',
                'Determine whether the population mean latencies differ at .05. Use the balanced-study variance method, assuming independent observations, Normal latency populations and equal variances. The requested task is the overall comparison, without follow-up pair tests.'
            ]
            pairs += [('Regimen (micrograms)', 'Training regimen'), ('Mean volume', 'Mean latency (ms)'),
                      ('Five doses of 30', 'Static targets'), ('Five doses of 100', 'Moving targets'),
                      ('One dose of 200', 'Mixed targets')]
    elif topic in ('posthoc', 'bonferroni'):
        title = 'Which sensory-training groups differ after the overall comparison?'
        paras = [
            'An experiment compares independent groups receiving sensory-discrimination training regimens. Every participant completes the same final interval-scale assessment. An overall analysis has already established a difference among the population mean scores; the follow-up question asks which specified group pairs differ.',
            base['paragraphs'][1].replace('patients', 'participants')
        ]
    elif topic == 'holm':
        title = 'Which attention-training programs differ from control?'
        paras = [
            'An attention-training study has three active programs, labeled A, B and C, and a control activity. Each program is compared with control using the same appropriate procedure for independent groups. The requested family contains only these three control comparisons.',
            'The unadjusted p values are supplied below. Keep each program label attached to its result while ordering the comparisons. Use Holm’s procedure with family significance level .05, and determine which population comparisons remain supported.'
        ]
    elif topic == 'binary':
        title = 'A phantom vibration: estimating the fraction of participants who report it'
        m, count = g.get('m', g.get('events')), g.get('n', g.get('patients'))
        paras = [
            f'After a standardized phone-attention task, {num(count)} independent participants each report once whether they felt a vibration when no vibration was delivered. A phantom vibration is reported by {num(m)} participants. Define X=1 for a report and X=0 otherwise.',
            'Estimate the population fraction reporting a phantom vibration and its uncertainty. Each participant contributes one binary outcome. Distinguish variation among individual reports from the standard error of the estimated population proportion.'
        ]
    elif topic == 'zprop':
        title = 'Comparing migraine-event proportions under two regimens'
        paras = [
            'A neurological follow-up study compares two independent groups receiving different migraine-prevention regimens. Over the same follow-up period, each participant is classified once according to whether at least one migraine occurs. Group 1 receives the reference regimen and Group 2 the alternative.',
            'The observed migraine and no-migraine counts are shown below. Determine whether the population event proportions differ. Use the course’s continuity correction and a two-sided significance level of .05. Form the null pooled estimate from actual events and full group denominators.'
        ]
        if pid == 'd-hw2-dioxin':
            title = 'Detecting an unexpected sound: rounded group proportions'
            paras = [
                'An auditory-attention study presents one unexpected target sound to each independent participant. Group 1 first completes a visual-cue task; Group 2 completes a verbal-cue task. The outcome is whether the participant detects the target sound.',
                'The visual-cue group contains 186 participants with a reported detection fraction .565; the verbal-cue group contains 220 with reported fraction .455. Across both groups, 205 of 406 participants detect the sound. The group fractions are rounded, but the actual combined detection count is supplied.'
            ]
            pairs += [('Parent exposed', 'Cue task'), ('Births', 'Participants'),
                      ('Reported female fraction', 'Detection fraction'),
                      ('Father only', 'Visual cues'), ('Mother only', 'Verbal cues'),
                      ('female births', 'detections'), ('birth counts', 'detection counts'),
                      ('female offspring', 'target detection'), ('offspring populations', 'task populations'),
                      ('female proportions', 'detection proportions'),
                      ('father-only exposure group', 'visual-cue group'),
                      ('female proportion', 'detection proportion'),
                      ('exposure groups', 'cue-task groups'),
                      (r'\mathrm{father}', r'\mathrm{visual}'),
                      (r'\mathrm{mother}', r'\mathrm{verbal}')]
    elif topic == 'chi':
        title = 'Do migraine outcomes differ among neurological follow-up groups?'
        paras = [
            'A neurological follow-up study compares migraine-prevention regimens. Each independent participant is classified once according to whether at least one migraine occurs during the common follow-up period. Every person appears in exactly one cell of the observed count table.',
            'Determine whether the population outcome distributions differ among the regimens. Use significance level .05, calculate expected counts from the observed margins, and follow the course’s two-by-two correction convention. Keep counts distinct from proportions.'
        ]
        if pid == 'd-hw2-folate':
            title = 'Guided listening and reports of a phantom tone'
            paras = [
                'An auditory-perception study follows one thousand independent participants after a standardized listening task. One group receives a guided quiet-listening procedure and the other receives an unguided procedure. Each participant then reports once whether a tone was heard during an interval containing no delivered tone.',
                'The count table classifies phantom-tone reports by listening procedure. Test whether the population report distributions differ at .05. Then quantify the report risk for the unguided group compared with the guided group, keeping that comparison direction explicit.'
            ]
            pairs += [('Prenatal supplement', 'Listening procedure'), ('Yes NTD', 'Phantom tone'),
                      ('No NTD', 'No phantom tone'), ('Took folate', 'Guided'), ('No folate', 'Unguided'),
                      ('no folate', 'unguided'), ('not supplementing with folate', 'unguided listening'),
                      ('folate and no-folate populations', 'guided and unguided populations'),
                      ('infants of mothers who did not take folate', 'participants using unguided listening'),
                      ('infants of mothers who took folate', 'participants using guided listening'),
                      ('development of NTD', 'report of a phantom tone'), ('NTD risk', 'phantom-tone report risk'),
                      ('folate', 'guided listening'), (r'no\ guided listening', 'unguided'),
                      ('no-guided listening', 'unguided')]
        elif pid == 'd-hw2-mortality':
            title = 'Persistent tinnitus after four sound-management regimens'
            paras = [
                'A tinnitus study follows independent participants under reference sound-management care or one of three alternative regimens. Each participant reports once after thirty days whether persistent tinnitus remains. Group 1 uses structured sound practice, Group 2 guided relaxation and Group 3 a combined program.',
                'The table separates participants with no persistent tinnitus from those with persistent tinnitus. First test the four population outcome distributions. Then compare only the three alternatives with standard care using the supplied corrected pair statistics and Holm family level .05.'
            ]
            pairs += [('Survived', 'No persistent tinnitus'), ('Died', 'Persistent tinnitus'),
                      ('survival differs', 'persistent-tinnitus outcomes differ')]
    elif topic == 'gof':
        title = 'Do reported dream categories match a proposed population pattern?'
        paras = [
            'A psychology model proposes that a person’s most recent remembered dream falls into one of three mutually exclusive categories: social interaction, navigating a place or another theme. The proposed population proportions are .60, .25 and .15. Each of 470 independently sampled participants contributes one dream report.',
            'The observed counts and proposed proportions are shown below. Determine whether the population dream-category distribution is consistent with the specified pattern. The category definitions and target proportions are fixed before sampling; none is estimated from these observations.'
        ]
        pairs += [('exercise-category pattern', 'dream-category pattern')]
    elif topic in ('risk', 'nnt'):
        title = 'Migraine follow-up: relative risk and the number needed to treat or harm'
        paras = [
            'A prospective neurological study follows an active-regimen group and a reference group for the same four-week period. The adverse event is at least one migraine during that period. Each participant is classified once, and both complete group denominators are available.',
            'Use the event risks below to describe the size and direction of the association. Compare active/exposed with reference in that order. Determine whether the absolute risk change represents benefit or harm, then express the corresponding number of people over the stated follow-up.'
        ]
        pairs += [('adverse event', 'migraine event')]
    elif topic == 'odds':
        title = 'Recurrent nightmares and a history of late-night screen exposure'
        paras = [
            'A psychology study selects people with recurrent nightmares as cases and people without recurrent nightmares as controls. Researchers then record whether each person had the specified late-night screen exposure before assessment. Case and control totals are set by the sampling design.',
            'The table has exposure status in the rows and nightmare case/control status in the columns. Estimate the exposure-odds association in cases compared with controls. Keep the labels and comparison direction attached to the fractions; these samples are not complete exposed and unexposed follow-up cohorts.'
        ]
        pairs += [('Disease-free controls', 'No-nightmare controls'), ('Disease cases', 'Nightmare cases'),
                  ('disease-free controls', 'no-nightmare controls'), ('disease cases', 'nightmare cases'),
                  ('disease risk', 'nightmare risk')]
    elif topic == 'trials':
        title = 'A sham-controlled brain-stimulation study: assignment and masking'
        paras = [
            'A brain-stimulation trial compares an active stimulation regimen with a sham procedure that resembles the active session without delivering its active component. A chance mechanism assigns each participant to a group. The study also seeks to keep participants and outcome evaluators unaware of assignment.',
            'A proposed alternative has each participant receive both regimens in separate periods rather than keeping separate groups throughout. Identify what each design feature accomplishes. The question concerns assignment, masking and study design, without assuming that any observed effect has occurred.'
        ]
    elif topic == 'rcode':
        title = 'Interpreting a supplied comparison of attention scores'
        paras = [
            'A psychology study compares attention scores in two independent participant populations. Scores are assumed Normal with equal population variance. The first group completes a visual-cue activity and the second a verbal-cue activity. An analyst supplies the two-group test result below.',
            'The Student pooled two-sample result has t=2.50, df=18 and two-sided p=.0223. The signed difference is visual-cue mean minus verbal-cue mean. Interpret the supplied result at .05; no software commands are needed.'
        ]
    else:
        raise AssertionError((pid, topic))

    # Contextualize table labels and conclusions while retaining numeric entries.
    if topic in ('chi', 'zprop') and pid not in ('d-hw2-folate', 'd-hw2-mortality', 'd-hw2-dioxin'):
        pairs += [('No event', 'No migraine'), ('Event', 'Migraine'),
                  ('adverse event', 'migraine event'), ('adverse outcome', 'migraine outcome'),
                  ('care-regimen', 'migraine-regimen'), ('care groups', 'regimen groups')]
    q = replace(q, pairs)
    q['title'] = title
    q['paragraphs'] = paras
    q['context'] = ' '.join(paras)
    q['originalId'] = pid
    q['basis'] = base['basis']
    q['synthetic'] = True
    q['fingerprint'] = hashlib.sha256(json.dumps(q, sort_keys=True).encode()).hexdigest()
    nid = 'neuro-' + pid
    p = {key: copy.deepcopy(original[key]) for key in
         ('topic', 'answer', 'tolerance', 'units', 'shortcut')}
    p = replace(p, pairs)
    p.update(id=nid, title=title, steps=[],
             source='Original neuroscience/psychology practice · synthetic data',
             originalId=pid)
    questions[nid] = q
    problems.append(p)

# Distinguish numeric variants in the selector without exposing raw IDs in titles.
titles = {}
for p in problems:
    titles.setdefault(p['title'], []).append(p)
for group in titles.values():
    if len(group) > 1:
        for index, p in enumerate(group, 1):
            p['title'] += f' · Case {index}'
            questions[p['id']]['title'] = p['title']

pack = {'problems': problems, 'questions': questions,
        'byOriginal': {p['originalId']: p['id'] for p in problems},
        'topics': sorted({p['topic'] for p in problems})}
(ROOT / 'neuroscience-worked-data.js').write_text(
    'const NEURO_WORKED=' + json.dumps(pack, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(f'Built {len(problems)} neuroscience/psychology worked examples across {len(pack["topics"])} statistical topics.')
