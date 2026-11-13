"""Place the user's Version 8.1 notes beside their original slides, word for word.

Version 8.1 is Version 8 plus the cloze link (Lecture 17) and the
"Where were you a year ago?" teaching (Lectures 12, 13 and 14). The source is
the eight Markdown files the Version 8.1 PDF was built from
(authoring/notes-v8.1/11.md to 18.md). It keeps Version 8's section-by-section
wording and the same placement rules as notes_v8.py; only the new sections and
bullets add slide targets.
"""
from copy import deepcopy
from pathlib import Path

from notes_v8 import SECTION_SLIDES as V8_SLIDES, build_pdf_notes

EDITION = 'notes-v8-1'
LABEL = 'Version 8.1 · Your PDF notes with cloze and year-ago'
PDF = 'sources/notes-v8-1-all-lectures-11-18.pdf'

SECTION_SLIDES = deepcopy(V8_SLIDES)
SECTION_SLIDES[12][17] = 24            # Where Were You a Year Ago?
SECTION_SLIDES[13][16] = 24            # A Sentence Over Time
SECTION_SLIDES[13][17] = 25            # Wide harmonic spacing (Section 16 in Version 8)
SECTION_SLIDES[14][9] = (18, 19, 19)   # spectrograms, plus speech never sits still


def build_notes_v8_1(root, out):
    return build_pdf_notes(root, out, EDITION, LABEL, PDF, 'notes-v8.1', SECTION_SLIDES,
                           revision='2026-11-user-pdf-notes-8-1', version='8.1')


if __name__ == '__main__':
    ROOT = Path(__file__).resolve().parents[1]
    print(build_notes_v8_1(ROOT, ROOT / 'modern'))
