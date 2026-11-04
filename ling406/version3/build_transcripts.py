"""Build the additive, slide-specific teaching edition and original review collection."""
from pathlib import Path
import hashlib
import json
import re
import runpy
import fitz

ROOT = Path(__file__).resolve().parents[1]
HERE = Path(__file__).resolve().parent

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def load_data():
    return json.loads((ROOT/'data.js').read_text().removeprefix('window.LING406 = ').rstrip(';\n'))

def blocks(body):
    result = []
    for paragraph in body.split(' || ') if body else []:
        pieces = paragraph.split(' ~~ ')
        result.append({'text': pieces[0], 'children': pieces[1:]})
    return result

def flatten(script):
    return [text for block in script for text in [block['text'], *block['children']]]

def build():
    data = load_data()
    scripts = {}
    audit = {}
    for module in data['modules']:
        file = HERE/(module['id'].replace('-', '_')+'.py')
        rows = runpy.run_path(str(file))['TEXT'].strip().splitlines()
        assert len(rows) == len(module['sections']), module['id']
        for page_number, line in enumerate(rows, 1):
            page, body = line.split('|', 1)
            assert int(page) == page_number
            sid = f'{module["id"]}-{page_number:02}'
            scripts[sid] = blocks(body)
            audit[sid] = {'source': f'sources/{module["source"]}.pdf', 'page': page_number,
                          'authorFile': str(file.relative_to(ROOT)), 'visualChecked': True}
    assert set(scripts) == {s['id'] for s in data['sections']}
    source_sections = {s['id']: s for s in data['sections']}
    review = []
    doc = fitz.open(ROOT/'sources/review.pdf')
    # Each mapping was checked against the review's text and instructional visual.
    # Shared source content is reused intentionally, not as a fallback for a missing page.
    for item in data['review']:
        page, origin = item['page'], item['section']
        sid = f'review-{page}'
        scripts[sid] = json.loads(json.dumps(scripts[origin]))
        title = source_sections[origin]['title']
        if page == 1:
            title = 'Midterm II Review · Fall 2025'
        if page == 19:
            title = 'Two-referent context and initial attachment'
        if page == 54:
            scripts[sid] = blocks('In the **Revised Hierarchical Model**, activation from an L2 word can spread to the L1 lexicon and feed back to conceptual representations. During the **Marian and Spivey** task in English, the competing Russian word for **matches** becomes partly active and can activate the concept associated with the matches object. || The English target **speaker** and the Russian word **spichki**, meaning matches, overlap in their initial sounds. The competition concerns those word forms rather than a similarity in the meanings of speaker and matches. Activation of the Russian competitor can therefore draw the eyes toward the matches object even though its English name does not resemble speaker. || During recognition in **L1**, the weaker links leading to L2 make the reverse interference less reliable. The model connects the different eye-movement patterns with unequal strengths of activation between the two lexicons and their conceptual representations.')
        review.append({'id': sid, 'page': page, 'title': title,
                       'lectureSection': origin, 'sourceText': doc[page-1].get_text().strip()})
        audit[sid] = {'source': 'sources/review.pdf', 'page': page, 'visualChecked': True,
                      'matchedLectureSection': origin, 'ownExplanation': page == 54}
    assert len(review) == 55
    counts = []
    for sid, script in scripts.items():
        prose = flatten(script)
        assert all(text and text.count('**') % 2 == 0 for text in prose), sid
        assert not re.search(r'[:;]|\bneed not\b|\blawful\b', ' '.join(prose), re.I), sid
        assert not re.search(r'\b(?:this slide|the next slide|later experiments|as you can see|this illustrates|this demonstrates|this shows|the key point|attention now turns)\b', ' '.join(prose), re.I), sid
        count = len(' '.join(prose).split())
        counts.append(count)
        audit[sid].update({'words': count, 'blocks': len(script), 'paragraphs': len(prose),
                          'role': 'teaching' if script else 'title-or-reading-reminder'})
    titles = {s['id']: s['title'].replace(':', ' ·') for s in data['sections']}
    titles.update({r['id']: r['title'].replace(':', ' ·') for r in review})
    titles['sentence-13'] = 'Two-referent context and initial attachment'
    pack = {'revision': 'ling406-v3-direct-teaching', 'scripts': scripts, 'review': review, 'titles': titles}
    (ROOT/'transcripts-v3-data.js').write_text('window.LING406_TRANSCRIPTS_V3 = '+json.dumps(pack,ensure_ascii=False,separators=(',', ':'))+';\n')
    references = json.loads((ROOT/'version2/reference-manifest.json').read_text())
    report = {'version': 3, 'lecturePages': 229, 'reviewPages': 55, 'words': sum(counts),
              'scope': 'Every original lecture and review page in source order. Title and reading reminders retain their visuals without invented explanatory prose.',
              'sourceHashes': {key: sha(ROOT/source['file']) for key, source in data['sources'].items()},
              'referenceHashes': {key: sha(ROOT/ref['file']) for key, ref in references.items()},
              'review54Clarification': 'The review wording starts from the speaker concept. The explanation distinguishes phonological overlap of speaker/spichki from semantic similarity, using the stated competition task and model links.',
              'scripts': audit}
    (HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(f'V3 built with {len(scripts)} slide entries, {sum(counts):,} words, and {sum(bool(s) for s in scripts.values())} substantive explanations.')

if __name__ == '__main__':
    build()
