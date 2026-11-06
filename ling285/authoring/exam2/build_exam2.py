"""Build ling285/exam2-review.json and ling285/practice-v3.json, then check them.

Run from anywhere: python3 ling285/authoring/exam2/build_exam2.py
Checks: every source page exists, counts per lecture, unique IDs, and the LING285 writing
rules (no colons, semicolons, dashes, arrows or equals signs in prose, no banned phrases).
"""
import hashlib, json, re, sys
from pathlib import Path

here = Path(__file__).resolve().parent
root = here.parents[1]
sys.path.insert(0, str(here))
from review_content import MODEL, REVIEW  # noqa: E402
from practice_content import Q  # noqa: E402

data_bytes = (root / 'data.json').read_bytes()
data = json.loads(data_bytes)
pages = {(c['id'], s['page']) for c in data['collections'] for s in c['sections']}
LECTURES = [f'lecture{n}' for n in range(11, 19)]
BLUEPRINT = {'lecture11': 3, 'lecture12': 4, 'lecture13': 4, 'lecture14': 4,
             'lecture15': 3, 'lecture16': 3, 'lecture17': 2, 'lecture18': 2}
EXAM_MCQ = 6
# Figures cropped from the Exam 2 review sheet (assets/exam2), shown on their review cards.
IMAGES = {6: 'assets/exam2/q06-string-mode5.png', 11: 'assets/exam2/q11-building-mode4.png',
          14: 'assets/exam2/q14-string-modes-3-4.png', 15: 'assets/exam2/q15-building-mode4.png',
          20: 'assets/exam2/q20-sequential-code.png'}
BANNED = ['this shows', 'shows that', 'illustrates', 'demonstrates', 'the key point', 'the key finding',
          "let's", 'remember that', 'need not', 'lawful', 'on this plot', 'the slide', 'the lecture',
          'the professor', 'this means', 'the question is', 'note that']
CODE = re.compile(r'nn\.|net =|\[[\d., ]+\]')
problems = []


def prose_check(where, text, allow_code=False):
    plain = text.replace('**', '')
    body = CODE.sub('', plain) if allow_code else plain
    for mark, name in [(';', 'semicolon'), (' — ', 'dash'), (' – ', 'dash'), ('→', 'arrow'), ('->', 'arrow')]:
        if mark in body:
            problems.append(f'{where}: {name}')
    if ':' in body:
        problems.append(f'{where}: colon')
    if ' = ' in body or '=' in body:
        problems.append(f'{where}: equals sign')
    low = plain.lower()
    for phrase in BANNED:
        if phrase in low:
            problems.append(f'{where}: banned phrase "{phrase}"')


def ref(collection, page):
    if (collection, page) not in pages:
        problems.append(f'missing source {collection} p{page}')
    return {'collection': collection, 'page': page}


review_items = []
for item in REVIEW:
    w = f'review {item["n"]}'
    prose_check(w + ' answer', item['answer'])
    prose_check(w + ' change', item['change'])
    for i, t in enumerate(item['teach']):
        prose_check(f'{w} teach {i + 1}', t)
    review_items.append({
        'id': f'exam2-review-{item["n"]:02d}', 'number': item['n'], 'question': item['q'],
        'figure': item.get('figure', ''), 'answer': item['answer'], 'code': item.get('code', ''),
        'teaching': item['teach'], 'change': item['change'], 'image': IMAGES.get(item['n'], ''),
        'sources': [ref(c, p) for c, p in item['refs']]})
for image in IMAGES.values():
    if not (root / image).is_file():
        problems.append(f'missing figure {image}')
assert [r['number'] for r in review_items] == list(range(1, 22)), 'review must have questions 1 to 21'

questions, counters = [], {}
for entry in Q:
    kind, lecture, pg, topic, priority, prompt = entry[:6]
    lid = f'lecture{lecture}'
    counters[(lid, kind)] = counters.get((lid, kind), 0) + 1
    qid = f'v3-l{lecture}-{"mcq" if kind == "m" else "written"}-{counters[(lid, kind)]:03d}'
    base = {'id': qid, 'moduleId': 'module2', 'lectureId': lid, 'prompt': prompt,
            'sources': [ref(lid, p) for p in pg], 'topic': topic, 'priority': float(priority),
            'assessmentVersion': 'v3', 'edition': '2026-11-06-practice-v3-exam2', 'examKeyRefs': []}
    if kind == 'w':
        answer, rubric = entry[6], entry[7]
        prose_check(qid, answer, allow_code=True)
        base.update({'type': 'written', 'answer': answer, 'rubric': rubric, 'pattern': 'written'})
    else:
        options, correct = entry[6], entry[7]
        assert len(options) == 4, qid
        ids = 'abcd'
        for text, feedback in options:
            prose_check(qid + ' feedback', feedback)
        base.update({'type': 'mcq', 'pattern': 'choice',
                     'options': [{'id': ids[i], 'text': t, 'feedback': f} for i, (t, f) in enumerate(options)],
                     'correctOption': ids[correct], 'answer': options[correct][1] if options[correct][1] != 'Correct.' else options[correct][0],
                     'rubric': [f'The best answer is {options[correct][0]}.']})
    questions.append(base)

for lid in LECTURES:
    w, m = counters.get((lid, 'w'), 0), counters.get((lid, 'm'), 0)
    if (w, m) != (9, 3):
        problems.append(f'{lid}: expected 9 written and 3 multiple choice, found {w} and {m}')
if len({q['id'] for q in questions}) != len(questions):
    problems.append('duplicate question ids')
if sum(BLUEPRINT.values()) != 25:
    problems.append('blueprint must total 25')

if problems:
    print('\n'.join(problems))
    sys.exit(1)

base_sha = hashlib.sha256(data_bytes).hexdigest()
practice = {
    'id': 'v3', 'label': 'Version 3 · Exam 2 style', 'revision': '2026-11-06-practice-v3-exam2',
    'baseDataSha256': base_sha, 'lectureIds': LECTURES, 'questions': questions,
    'policy': {'currentTestSize': 25, 'mcqCount': EXAM_MCQ, 'blueprint': BLUEPRINT, 'writingExamSize': 25},
    'model': {
        'title': 'Exam 2 style, weighted by what he emphasized',
        'summary': 'Version 3 is written in the professor’s own question forms from the Exam 1 key and the Exam 2 review sheet. The current test has 25 questions like the real exam, mostly written with a few choice questions, and it gives more questions to Lectures 12 to 14 because most of the review sheet is masses, springs, formants and spectrograms.',
        'evidence': ['Exam 2 review sheet, questions 1 to 21', 'Exam 1 key and the class review answer sets', 'Class transcript, Oct 6 to Nov 5, exam cues', 'Notes v3 for Lectures 11 to 17 and Notes v6 for Lecture 18'],
        'limitations': ['These are practice questions modeled on his style. They are not the real exam, and the answers to the review sheet are only confirmed when he goes through them on Tuesday, November 10.'],
    },
    'references': [],
}
review = {'id': 'exam2-review', 'title': 'Exam 2 review guide', 'examDate': 'Thursday, November 12',
          'reviewDate': 'Tuesday, November 10', 'baseDataSha256': base_sha, 'model': MODEL, 'items': review_items}
(root / 'practice-v3.json').write_text(json.dumps(practice, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
(root / 'exam2-review.json').write_text(json.dumps(review, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print(f'wrote practice-v3.json ({len(questions)} questions) and exam2-review.json ({len(review_items)} items)')
