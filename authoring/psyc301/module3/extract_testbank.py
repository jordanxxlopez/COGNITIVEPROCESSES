"""Extract one chapter's multiple-choice questions from the supplied Goldstein Cognero bank.

    python authoring/psyc301/module3/extract_testbank.py 8

Writes testbank-source-chNN.json beside this file (stems, options, 0-based keyed answer) and prints each
question so it can be mapped to a slide in <lecture>_testbank.py. Open-response prompts are skipped.
"""
import json, re, sys
from pathlib import Path
import fitz

BANK = Path.home() / 'Downloads' / 'Goldstein-Cognero-bank-Studylib-original.pdf'


def extract(chapter):
    doc = fitz.open(BANK)
    tag = f'Chapter {chapter:02d}'
    text = ''
    for page in doc:
        raw = page.get_text()
        if tag not in raw[:200]:
            continue
        text += re.sub(r'Name:\s*\n\s*Class:\s*\n\s*\n\s*Date:\s*\n\s*\n\s*\n' + tag + r'\s*\n\s*\nCopyright Cengage Learning\. Powered by Cognero\.\s*\nPage \d+\s*\n', '', raw)
    text = re.sub(r'[ \t]+', ' ', text)
    clean = lambda z: re.sub(r'\s+', ' ', z).strip()
    questions, skipped = [], []
    for item in re.split(r'\n\s*(?=\d{1,2}\. )', text):
        m = re.match(r'(\d{1,2})\. (.*)', item, re.S)
        if not m:
            continue
        number, body = int(m.group(1)), m.group(2)
        key = re.search(r'ANSWER:\s*([a-d])\b', body)
        options = re.findall(r'\n\s*([a-d])\.\s+(.*?)(?=\n\s*[a-d]\.\s|\n\s*ANSWER:)', body, re.S)
        if key and len(options) == 4:
            questions.append(dict(id=f'G{chapter:02d}-{number:03d}', chapter=chapter, number=number, stem=clean(re.split(r'\n\s*a\.\s', body)[0]),
                                  options=[clean(o[1]) for o in options], correct='abcd'.index(key.group(1))))
        else:
            skipped.append(number)
    return questions, skipped


if __name__ == '__main__':
    chapter = int(sys.argv[1])
    questions, skipped = extract(chapter)
    out = Path(__file__).parent / f'testbank-source-ch{chapter:02d}.json'
    out.write_text(json.dumps(questions, ensure_ascii=False, indent=1), encoding='utf8')
    print(len(questions), 'multiple-choice questions written to', out.name, '· skipped (open-response):', skipped)
    for q in questions:
        print(q['number'], '|', q['stem'], '||', ' / '.join(('*' if i == q['correct'] else '') + o for i, o in enumerate(q['options'])))
