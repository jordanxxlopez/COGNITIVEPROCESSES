"""Build the Module 2 question versions (College-Level, Simplified) and the
question-priority model.

    python authoring/psyc301/question-versions/build.py

Reads   authoring/psyc301/question-versions/source/new-m<module>.json
        module2-data.js (original bank, never modified)
        authoring/psyc301/question-versions/lecture-text/m<module>.txt (text extracted from the lecture PDFs)
Writes  module2-question-versions-data.js   (window.M2_QUESTION_VERSIONS, window.M2_QUESTION_PRIORITY)
        module2-question-versions-report.json
Fails (exit 1) on any rule violation.
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
VERSIONS = ('college', 'simple')

# Wording that points at the instructional source or context (banned in stems, options and explanations).
BANNED = re.compile(
    r"\b(lectures?|class(?:es|room)?|courses?|slides?|lecture notes|class notes|modules?|chapters?|textbooks?|readings?|"
    r"professors?|instructors?|teachers?|syllabus|quiz(?:zes)?|covered|discussed|syllabi|"
    r"according to the|as shown|as described|example given|the given example|supplied|provided (?:results|figure|table|data)|"
    r"the source|we saw|you learned|you have learned|today|this topic|earlier discussion|later discussion|"
    r"presented (?:in|on|during) the|described (?:in|on) the)\b", re.I)
COWORK = re.compile(r'co-?workers', re.I)
# Words that are fine in an experimental or everyday sense (candle-problem materials, a cesarean
# section, units of information, letters presented for 50 ms) but must be read by a person.
SOFT = re.compile(r"\b(materials?|units?|sections?|exams?|notes|presented|described)\b", re.I)
YEAR = re.compile(r'\b(?:19|20)\d{2}\b')
CITE = re.compile(r'\b((?:19|20)\d{2})[a-z]?(?=\)|;|, (?:19|20)\d{2}\))')  # a year written as a citation


def load_bank():
    raw = (ROOT / 'module2-data.js').read_text()
    bank = json.loads(raw.split('window.SECOND_HALF = ', 1)[1].rstrip(';\n'))
    # Collection 15 (Articles and Labs) is added at load time from psyc301-c15-data.js, so module2-data.js stays pinned.
    extra = ROOT / 'psyc301-c15-data.js'
    if extra.exists():
        line = next(l for l in extra.read_text().split('\n') if l.startswith('window.C15_BANK = '))
        c = json.loads(line[len('window.C15_BANK = '):].rstrip(';'))
        cid = c['collection']['id']
        bank['collections'] = [x for x in bank['collections'] if x['id'] != cid] + [c['collection']]
        bank['questions'] = [q for q in bank['questions'] if q['module'] != cid] + c['questions']
        bank['modules'] = [m for m in bank['modules'] if m != cid] + [cid]
        for key in ('topics', 'coreReview', 'experiments'):
            bank[key] = [g for g in bank[key] if g.get('module') != cid] + c[key]
    return bank


def lecture_pages():
    pages = {}
    for f in sorted((HERE / 'lecture-text').glob('m*.txt')):
        for block in f.read_text().split('=== ')[1:]:
            head, _, body = block.partition('\n')
            m, p = head.strip().split(':')
            pages[(int(m), int(p))] = body
    return pages


def validate(bank, new, pages):
    errors, warnings = [], []
    orig = {q['id']: q for q in bank['questions']}
    lecture_text = {m: ' '.join(t for (mm, _), t in pages.items() if mm == m) for m in bank['modules']}
    short_simple = 0
    for e in new:
        q = orig.get(e['id'])
        if not q:
            errors.append(f"{e['id']}: not in original bank")
            continue
        for v in VERSIONS:
            x = e.get(v)
            if not x:
                errors.append(f"{e['id']} {v}: missing")
                continue
            texts = [x['stem'], *x['options'], x['why']]
            if len(x['options']) != 4 or len(set(x['options'])) != 4:
                errors.append(f"{e['id']} {v}: needs 4 distinct options")
            if x['correct'] != q['correct']:
                errors.append(f"{e['id']} {v}: correct index {x['correct']} != original {q['correct']}")
            for t in texts:
                for m in BANNED.finditer(t):
                    errors.append(f"{e['id']} {v}: banned wording '{m.group(0)}' in: {t[:90]}")
                for m in SOFT.finditer(t):
                    warnings.append(f"{e['id']} {v}: check '{m.group(0)}' in: {t[:100]}")
                if COWORK.search(t):
                    errors.append(f"{e['id']} {v}: 'coworkers'")
            if re.search(r'::', x['stem']):
                errors.append(f"{e['id']} {v}: analogy format")
            if re.search(r'\b(all|none) of the above\b', ' '.join(x['options']), re.I):
                errors.append(f"{e['id']} {v}: all/none of the above")
            for y in CITE.findall(x['stem'] + ' ' + ' '.join(x['options'])):
                if y not in lecture_text[q['module']]:
                    errors.append(f"{e['id']} {v}: year {y} not found in that lecture's text (possible invented citation)")
            words = [len(o.split()) for o in x['options']]
            if v == 'college' and min(words) < 6:
                errors.append(f"{e['id']} college: option under 6 words")
            if v == 'simple' and min(words) < 6:
                short_simple += 1
    if short_simple > 0.15 * len(new):
        errors.append(f'simplified: {short_simple} questions with short options (limit {int(0.15 * len(new))})')
    return errors, warnings, short_simple


# ---------------------------------------------------------------- priority model
POINT = re.compile(r"what[’']s the point|conclusion|results?:|➔|showed|found that|demonstrat", re.I)
NUMBER = re.compile(r'\d+(?:\.\d+)?\s?%|\b\d+ out of \d+\b')
WEIGHTS = {'core_review': 1.0, 'named_experiment': 0.8, 'researcher_year_item': 0.8, 'takeaway_slide': 0.5,
           'reported_numbers': 0.3, 'topic_depth': 0.5}


def priority(bank, pages):
    core = {(g.get('module', 6), p) for g in bank['coreReview'] for p in g['pages']}
    exp = {(g.get('module', 6), p) for g in bank['experiments'] for p in g['pages']}
    depth = Counter()
    for g in bank['experiments'] + bank['coreReview']:
        for p in g['pages']:
            depth[(g.get('module', 6), p)] = max(depth[(g.get('module', 6), p)], len(g['pages']))
    maxdepth = max(depth.values()) or 1
    scores, features = {}, {}
    for q in bank['questions']:
        key = (q['module'], q['page'])
        text = pages.get(key, '')
        f = {'core_review': key in core, 'named_experiment': key in exp,
             'researcher_year_item': q['kind'] == 'researcher' or bool(YEAR.search(q['stem'])),
             'takeaway_slide': bool(POINT.search(text)), 'reported_numbers': bool(NUMBER.search(text)),
             'topic_depth': depth[key] / maxdepth}
        s = 1 + sum(WEIGHTS[k] * float(v) for k, v in f.items())
        scores[q['id']] = round(s, 4)
        features[q['id']] = f
    # most-likely set: equal quota per lecture, highest score first, ties by original order
    per = 50 // len(bank['modules'])
    likely = []
    for m in bank['modules']:
        qs = [q for q in bank['questions'] if q['module'] == m]
        qs.sort(key=lambda q: -scores[q['id']])
        likely += [q['id'] for q in qs[:per]]
    extra = sorted((q for q in bank['questions'] if q['id'] not in likely), key=lambda q: -scores[q['id']])
    likely += [q['id'] for q in extra[:50 - len(likely)]]
    return scores, features, likely


def main():
    bank = load_bank()
    pages = lecture_pages()
    new = []
    for m in bank['modules']:
        new += json.loads((HERE / 'source' / f'new-m{m}.json').read_text())
    assert {e['id'] for e in new} == {q['id'] for q in bank['questions']}, 'every original question needs both versions'
    errors, warnings, short_simple = validate(bank, new, pages)
    scores, features, likely = priority(bank, pages)
    data = {e['id']: {v: {k: e[v][k] for k in ('stem', 'options', 'correct', 'why')} for v in VERSIONS} for e in new}
    pri = {'scores': scores, 'likely50': likely,
           'method': 'Transparent evidence-weighted ranking from lecture emphasis (not a validated forecast).'}
    out = ('// Generated by authoring/psyc301/question-versions/build.py. Original questions stay in module2-data.js.\n'
           'window.M2_QUESTION_VERSIONS = ' + json.dumps(data, ensure_ascii=False) + ';\n'
           'window.M2_QUESTION_PRIORITY = ' + json.dumps(pri, ensure_ascii=False) + ';\n')
    (ROOT / 'module2-question-versions-data.js').write_text(out)
    stats = {}
    for v in VERSIONS:
        stems = [len(e[v]['stem'].split()) for e in new]
        opts = [len(o.split()) for e in new for o in e[v]['options']]
        stats[v] = {'stem_words_mean': round(sum(stems) / len(stems), 1), 'stem_words_max': max(stems),
                    'option_words_min': min(opts), 'option_words_mean': round(sum(opts) / len(opts), 1),
                    'kinds': dict(Counter(e[v].get('kind', e['kind']) for e in new)),
                    'researcher_year_stems': sum(bool(YEAR.search(e[v]['stem'])) for e in new)}
    report = {'questions': len(new), 'versions': list(VERSIONS), 'rule_errors': errors, 'wording_to_review': warnings, 'simplified_short_option_items': short_simple,
              'stats': stats,
              'priority_model': {'validated_prediction': False, 'weights': WEIGHTS,
                                 'features': ['core_review: page in a must-know core-review group',
                                              'named_experiment: page belongs to a listed experiment',
                                              'researcher_year_item: question anchored on a named researcher and year (Jordan reports the professor tests experiments this way)',
                                              'takeaway_slide: slide text states a point, result or conclusion',
                                              'reported_numbers: slide reports percentages or counts',
                                              'topic_depth: share of slides the experiment or core topic spans'],
                                 'likely50': likely, 'limitations': ['No Exam 2 guide or past Module II exam was supplied; weights are editorial, not fitted.',
                                                                     'Scores rank study priority within this bank; they do not predict unseen questions.']},
              'top_by_lecture': {m: sorted(([q['id'], scores[q['id']]] for q in bank['questions'] if q['module'] == m), key=lambda x: -x[1])[:8] for m in bank['modules']}}
    (ROOT / 'module2-question-versions-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=1) + '\n')
    print(json.dumps({k: report[k] for k in ('questions', 'simplified_short_option_items', 'stats')}, indent=1))
    print(f'{len(errors)} rule errors, {len(warnings)} wording items to review')
    for e in errors[:80]:
        print(' -', e)
    sys.exit(1 if errors else 0)


if __name__ == '__main__':
    main()
