"""Place Version 8.2 beside the original slides.

Version 8.2 is Version 8.1 rewritten for clarity in the labeled, technical-term
style: correct terms such as constriction instead of "squeeze", a short gloss in
parentheses on first use, and lists written as "Label: full sentence" with the
items in parallel. The section and bullet structure of 8.1 is kept exactly, so
the same slide map places every bullet. Version 8.1 is unchanged.
"""
from pathlib import Path

from notes_v8 import build_pdf_notes
from notes_v8_1 import SECTION_SLIDES

EDITION = 'notes-v8-2'
LABEL = 'Version 8.2 · PDF notes, clear labeled wording'


def build_notes_v8_2(root, out):
    return build_pdf_notes(root, out, EDITION, LABEL, None, 'notes-v8.2', SECTION_SLIDES,
                           revision='2026-11-notes-8-2-labeled-wording', version='8.2',
                           wording='Version 8.1 rewritten with technical terms, short glosses and labeled lists. Section structure unchanged.')


if __name__ == '__main__':
    ROOT = Path(__file__).resolve().parents[1]
    print(build_notes_v8_2(ROOT, ROOT / 'modern'))
