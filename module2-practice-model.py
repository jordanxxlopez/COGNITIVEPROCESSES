"""Reproducible practice-bank coverage audit, not an exam prediction model."""
import argparse
from collections import Counter
import html
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent

def audit():
    raw = (ROOT / 'module2-data.js').read_text()
    bank = json.loads(raw.split('window.SECOND_HALF = ', 1)[1].rstrip(';\n'))
    markup = (ROOT / 'index.html').read_text()
    data = json.loads(re.search(r'<script id="study-data" type="application/json">(.*?)</script>', markup, re.S)[1])
    modules = {m['id']: m for m in data['modules']}
    questions = bank['questions']
    assert len({q['id'] for q in questions}) == len(questions), 'Duplicate IDs'
    kinds = Counter(q['kind'] for q in questions)
    stem_lengths, option_lengths = [], []
    researcher_items = []
    sources = []
    for q in questions:
        assert q['module'] in bank['modules'], 'Question outside current coverage'
        section = next(s for s in modules[q['module']]['sections'] if s['page'] == q['page'])
        assert len(q['options']) == 4 and len(set(q['options'])) == 4
        assert 0 <= q['correct'] < 4 and q['why'].strip()
        years = re.findall(r'\b(?:19|20)\d{2}\b', q['stem'])
        # Verify cited years occur in supplied lecture material, not invented citations.
        lecture = html.unescape(json.dumps(modules[q['module']], ensure_ascii=False))
        assert all(year in lecture for year in years), (q['id'], years)
        if years:
            researcher_items.append({'id': q['id'], 'years': years})
        sources.append({'id': q['id'], 'module': q['module'], 'page': q['page'], 'title': section['title']})
        stem_lengths.append(len(q['stem'].split()))
        option_lengths.extend(len(o.split()) for o in q['options'])
    return {
        'revision': bank['revision'],
        'method': 'Editorial style quotas and source-coverage validation',
        'validated_prediction': False,
        'empirical_difficulty_calibrated': False,
        'basis': bank['styleBasis'],
        'prior_model_use': 'Retain lecture/source alignment and transparent reporting. Do not transfer Exam 1 chapter weights or six sample-question similarities to a new exam without its guide.',
        'question_count': len(questions),
        'question_types': dict(kinds),
        'stem_words': {'minimum': min(stem_lengths), 'maximum': max(stem_lengths)},
        'option_words': {'minimum': min(option_lengths), 'maximum': max(option_lengths)},
        'short_relationship_items': sum(q['kind'] == 'definition' for q in questions),
        'items_with_researcher_year_cues': researcher_items,
        'source_anchors': sources,
        'limitations': ['Student recollections describe format, not measured exam frequencies.', 'No second-exam study guide or instructor question set was supplied.', 'No claim of predicting question content or grades; difficulty requires student-response data.'],
    }

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    report = audit()
    if args.output:
        args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({k: report[k] for k in ['revision', 'question_count', 'question_types', 'stem_words', 'option_words', 'validated_prediction']}, indent=2))
