"""Shared helpers for the Module I (Lectures 01–10) teaching-notes editions.

Module I authoring lives beside the Module II files:
  notes-v9.1/NN.md, notes-v9/NN.md, notes-v10/NN.md      hand-written parents
  notes-v9.2, notes-v9.3, notes-v9.4, notes-v10.1         derived by module1_notes_derive.py
  notes-v8/NN.md, notes-v8.1/NN.md, notes-v8.2/NN.md      section notes regrouped from 9.1 / 9.4 by this file
  notes-v7-v2-module1/NN.md                               adapted PDF notes with coverage lines
  notes-module1-maps.json                                 Version 7 section -> slide map, Version 8 section titles
NN is the lecture key: 01, 02, 03, 04, 05-06, 07, 08, 09, 10.
"""
import json
import re
from pathlib import Path

A = Path(__file__).resolve().parent
MODULE1 = ['01', '02', '03', '04', '05-06', '07', '08', '09', '10']
MAPS = json.loads((A / 'notes-module1-maps.json').read_text()) if (A / 'notes-module1-maps.json').exists() else {}


def available(lecture, folder):
    """Module I lectures are added one at a time; a lecture joins an edition once its file exists."""
    return (A / folder / f'{lecture}.md').exists()


def parse_pages(path):
    """'## pN' then '- main' and '  - child' lines. Lines starting with '> ' are coverage notes."""
    pages, coverage, cur = {}, {}, None
    for ln in path.read_text().splitlines():
        m = re.match(r'## p(\d+)$', ln)
        if m:
            cur = int(m[1]); assert cur not in pages, (path, cur); pages[cur] = []; coverage[cur] = []; continue
        if not ln.strip():
            continue
        if ln.startswith('> '):
            idea, source, blocks = [x.strip() for x in ln[2:].split('|')]
            coverage[cur].append(dict(idea=idea, source=source, blocks=[int(b) for b in blocks.split(',')]))
            continue
        a = re.match(r'- (.+)$', ln); b = re.match(r'  - (.+)$', ln)
        if a:
            pages[cur].append({'text': a[1], 'children': []})
        elif b:
            pages[cur][-1]['children'].append(b[1])
        else:
            raise AssertionError((path.name, ln))
    return pages, coverage


def write_v8_markdown(lecture, parent_folder, out_folder, course_header):
    """Regroup slide-by-slide notes into the Version 8 section format, one section per mapped slide.
    Every bullet keeps its wording; only the grouping and the section headings are added."""
    pages, _ = parse_pages(A / parent_folder / f'{lecture}.md')
    sections = MAPS[lecture]['v8']
    assert [p for p, _ in sections] == sorted(pages), (lecture, [p for p, _ in sections], sorted(pages))
    lines = list(course_header)
    for number, (page, title) in enumerate(sections, 1):
        lines += ['', f'**Section {number}: {title}**', '']
        for block in pages[page]:
            lines.append(f"- {block['text']}")
            lines += [f'  - {child}' for child in block['children']]
            lines.append('')
    (A / out_folder).mkdir(exist_ok=True)
    (A / out_folder / f'{lecture}.md').write_text('\n'.join(lines).rstrip() + '\n')
    return {number: page for number, (page, _) in enumerate(sections, 1)}


COURSE_HEADERS = {
    '01': ['Course: LING285: Human Language and Technology', 'Title of Lecture: Lecture 1 - Human Language and Computation', 'Date: Tuesday, August 25', 'Professor: Khalil Iskarous'],
    '02': ['Course: LING285: Human Language and Technology', 'Title of Lecture: Lecture 2 - Phonetics and AI', 'Date: Thursday, August 27', 'Professor: Khalil Iskarous'],
    '03': ['Course: LING285: Human Language and Technology', 'Title of Lecture: Lecture 3 - Dynamical Systems 1', 'Date: Tuesday, September 1', 'Professor: Khalil Iskarous'],
    '04': ['Course: LING285: Human Language and Technology', 'Title of Lecture: Lecture 4 - Dynamical Systems 2', 'Date: Thursday, September 3', 'Professor: Khalil Iskarous'],
    '05-06': ['Course: LING285: Human Language and Technology', 'Title of Lecture: Lectures 5 and 6 - Dynamical Systems 3 and 4', 'Date: September 8 and 10', 'Professor: Khalil Iskarous'],
    '07': ['Course: LING285: Human Language and Technology', 'Title of Lecture: Lecture 7 - Dynamical Systems 5', 'Date: Tuesday, September 15', 'Professor: Khalil Iskarous'],
    '08': ['Course: LING285: Human Language and Technology', 'Title of Lecture: Lecture 8 - Dynamical Systems 6', 'Date: Thursday, September 17', 'Professor: Khalil Iskarous'],
    '09': ['Course: LING285: Human Language and Technology', 'Title of Lecture: Lecture 9 - Neural Networks 1', 'Date: Tuesday, September 22', 'Professor: Khalil Iskarous'],
    '10': ['Course: LING285: Human Language and Technology', 'Title of Lecture: Lecture 10 - Neural Networks 1.5', 'Date: Thursday, September 24', 'Professor: Khalil Iskarous'],
}


def regroup_all():
    """Write notes-v8, notes-v8.1 (identical to v8 for Module I) and notes-v8.2 for every mapped lecture."""
    slides = {}
    for lecture in MODULE1:
        if lecture not in MAPS or not available(lecture, 'notes-v9.1'):
            continue
        slides[lecture] = write_v8_markdown(lecture, 'notes-v9.1', 'notes-v8', COURSE_HEADERS[lecture])
        write_v8_markdown(lecture, 'notes-v9.1', 'notes-v8.1', COURSE_HEADERS[lecture])
        if available(lecture, 'notes-v9.4'):
            write_v8_markdown(lecture, 'notes-v9.4', 'notes-v8.2', COURSE_HEADERS[lecture])
    return slides


if __name__ == '__main__':
    print(regroup_all())
