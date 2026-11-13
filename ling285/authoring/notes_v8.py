"""Place the user's Version 8 notes beside their original slides, word for word.

The source is the eight Markdown files the Version 8 PDF was built from
(authoring/notes-v8/11.md to 18.md). Nothing is rewritten. Each main bullet and
its sub-bullets move as one unit to the slide page they explain. Section
headings and the four course header lines stay in the PDF; the reader uses the
original slide titles as headings. A fenced code block becomes sub-bullets of
the bullet that introduces it, one complete statement per sub-bullet, because
the reader formats teaching text with bold only.
"""
from collections import Counter
from copy import deepcopy
import json
from pathlib import Path
import re

from clear_editions import check_blocks, digest, dump, metrics
from module1_notes import regroup_all

EDITION = 'notes-v8'
LABEL = 'Version 8 · Your PDF notes'
PDF = 'sources/notes-v8-all-lectures-11-18.pdf'

# Note section -> source slide page. A tuple maps the section's main bullets in
# order, so one section can explain several consecutive slides.
SECTION_SLIDES = {
    11: {1:2, 2:3, 3:4, 4:4, 5:6, 6:7, 7:8, 8:9, 9:10, 10:11},
    12: {1:2, 2:(3,5,6), 3:7, 4:8, 5:9, 6:11, 7:(12,13,12), 8:14, 9:15, 10:16,
         11:18, 12:19, 13:20, 14:21, 15:22, 16:23},
    13: {1:2, 2:3, 3:4, 4:(5,6), 5:7, 6:8, 7:9, 8:10, 9:11, 10:12, 11:13,
         12:(16,17,18,18,19), 13:20, 14:(21,22,22), 15:23, 16:25},
    14: {1:2, 2:(3,5), 3:7, 4:(8,9), 5:(11,12,13,14), 6:15, 7:16, 8:17,
         9:(18,19), 10:20, 11:(21,22,22), 12:23, 13:24, 14:25},
    15: {1:2, 2:3, 3:4, 4:6, 5:7, 6:8, 7:9, 8:10, 9:11, 10:12, 11:13},
    16: {1:2, 2:(3,7), 3:(8,8,9), 4:5, 5:10, 6:11, 7:12, 8:(13,14), 9:15, 10:16},
    17: {1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8},
    18: {1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8},
}


def statements(lines):
    """Group code lines into complete statements, keeping every character."""
    out, current, depth = [], [], 0
    for line in lines:
        if not line.strip():
            continue
        current.append(line.strip())
        depth += line.count('(') - line.count(')')
        if depth <= 0:
            out.append(' '.join(current).replace('( ', '('))
            current, depth = [], 0
    assert not current, lines
    return out


def parse(path):
    sections, section, bullet, code = [], None, None, None
    for line in path.read_text().splitlines():
        if line.strip().startswith('```'):
            if code is None:
                code = []
            else:
                bullet['children'].extend(statements(code))
                bullet['codeStatements'] = bullet.get('codeStatements', 0) + len(statements(code))
                code = None
            continue
        if code is not None:
            code.append(line)
            continue
        if not line.strip() or line.strip() == '[CONTINUE]':
            continue
        if re.match(r'(Course|Title of Lecture|Date|Professor):', line):
            continue
        heading = re.match(r'\*\*Section (\d+): (.+)\*\*$', line)
        if heading:
            section = {'number': int(heading[1]), 'title': heading[2], 'bullets': []}
            sections.append(section)
            continue
        main = re.match(r'- (.+)$', line)
        child = re.match(r'  - (.+)$', line)
        if main:
            bullet = {'text': main[1], 'children': []}
            section['bullets'].append(bullet)
        elif child:
            bullet['children'].append(child[1])
        else:
            raise AssertionError((path.name, line))
    assert code is None
    return sections


def plain_words(text):
    return re.findall(r'[A-Za-z0-9]+', text.replace('**', ''))


def build_notes_v8(root, out):
    return build_pdf_notes(root, out, EDITION, LABEL, PDF, 'notes-v8', SECTION_SLIDES,
                           revision='2026-11-user-pdf-notes-8', version='8')


def build_pdf_notes(root, out, edition, label, pdf, src_dir, section_slides, revision, version, wording=None):
    base_path = out / 'transcripts-notes-v7.json'
    base = json.loads(base_path.read_text())
    payload = deepcopy(base)
    for collection in payload['collections'].values():
        for section in collection['sections']:
            section['teaching'] = []
    sources, assignments = {}, []
    module1 = regroup_all()  # writes notes-v8, notes-v8.1 and notes-v8.2 for the Module I lectures written so far
    section_slides = {**{k: {num: page for num, page in v.items()} for k, v in module1.items()}, **section_slides}
    for n in list(module1) + list(range(11, 19)):
        path = root / f'authoring/{src_dir}/{n}.md'
        sources[f'authoring/{src_dir}/{n}.md'] = digest(path)
        sections = parse(path)
        assert [s['number'] for s in sections] == list(range(1, len(sections) + 1)), n
        assert set(section_slides[n]) == {s['number'] for s in sections}, n
        collection = payload['collections'][f'lecture{n}']
        by_page = {s['page']: s for s in collection['sections']}
        for sec in sections:
            target = section_slides[n][sec['number']]
            pages = target if isinstance(target, tuple) else (target,) * len(sec['bullets'])
            assert len(pages) == len(sec['bullets']), (n, sec['number'], len(sec['bullets']))
            for index, (page, bullet) in enumerate(zip(pages, sec['bullets']), 1):
                assert page in by_page, (n, page)
                by_page[page]['teaching'].append({'text': bullet['text'], 'children': bullet['children']})
                assignments.append({'lecture': n, 'noteSection': sec['number'],
                                    'sectionTitle': sec['title'], 'bullet': index, 'sourceSlide': page,
                                    'subBullets': len(bullet['children']),
                                    'codeStatements': bullet.get('codeStatements', 0)})
        # Every word of every bullet reaches the reader exactly once and in order.
        source_words = [w for sec in sections for b in sec['bullets']
                        for t in [b['text'], *b['children']] for w in plain_words(t)]
        placed = Counter(w for s in collection['sections'] for b in s['teaching']
                         for t in [b['text'], *b['children']] for w in plain_words(t))
        assert placed == Counter(source_words), n
        for s in collection['sections']:
            check_blocks(s['teaching'], f'{edition}:{s["id"]}')
    payload.update(id=edition, label=label, revision=revision,
                   availableModules=['module1', 'module2'] if module1 else ['module2'],
                   origin=dict(authoringFiles=sources, pdf=pdf, pdfSha256=digest(root / pdf) if pdf else None,
                               wording=wording or f'User-authored Version {version} notes retained word for word, with bold emphasis.',
                               followingSlides=True, provenance=f'modern/{edition}-provenance.json'),
                   guidance=f'Your Version {version} notes beside the original slides for Lectures 11–18, and the same section notes written for Lectures 01–10.',
                   module1=dict(lectures=sorted(module1), source='Section notes regrouped from the Module I slide-by-slide notes (module1_notes.py); Version 8 and 8.1 are identical for Module I because the cloze and year-ago additions belong to Lectures 12–14 and 17.') if module1 else None)
    payload['metrics'] = metrics(payload['collections'])
    dump(out / f'transcripts-{edition}.json', payload)
    dump(out / f'{edition}-provenance.json', dict(
        edition=edition, label=label, authoringFiles=sources, pdf=pdf, pdfSha256=digest(root / pdf) if pdf else None,
        baseLayout='modern/transcripts-notes-v7.json', baseLayoutSha256=digest(base_path),
        bullets=len(assignments), assignments=assignments,
        preservation=dict(wordsUnchanged=True, eachBulletPlacedOnce=True,
                          omitted='The four course header lines and the section headings, which the reader replaces with the original slide titles.',
                          code='Each fenced code block is shown as sub-bullets of the bullet that introduces it, one complete statement per sub-bullet.'),
        otherEditionsChanged=False))
    return {edition: label}


if __name__ == '__main__':
    ROOT = Path(__file__).resolve().parents[1]
    print(build_notes_v8(ROOT, ROOT / 'modern'))
