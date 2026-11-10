"""Prepare original sources and empty, independently authored transcript slots.

No extracted source text is promoted into teaching prose. Re-running preserves
authored editions and requires their existing page IDs to match the sources.
"""
from pathlib import Path
import hashlib
import json
import re

import fitz
from pptx import Presentation

ROOT = Path(__file__).resolve().parents[1]
SOURCES = [
    ('reading1', 'Reading 1 · Empirical studies', 'reading1.pdf', 'reading1.pdf', 10),
    ('reading2', 'Reading 2 · Computational models', 'reading2.pdf', 'reading2.pdf', 10),
    ('morphology', 'Inflectional morphology', 'morphology.pptx', 'inflectional_morphology.pptx', 11),
    ('thought', 'Language and thought', 'thought.pdf', 'language_and_thought_2025.pdf', 11),
    ('modalities', 'Language in different modalities · Sign and Braille', 'modalities.pdf', 'sign_and_braille_2025.pdf', 12),
    ('review', 'Final review · supplied 2025 deck', 'review.pdf', 'final_review_session_2025 (in class 12-2).pdf', None),
]
EDITIONS = [
    ('psyc20', 'PSYC301 v20-style teaching'),
    ('original-c-v2', 'Original C · Version 2'),
    ('d-v2', 'D · Version 2'),
    ('original-c-v3', 'Original C · Version 3'),
]


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def main():
    data = {'revision': 'module3-template-1', 'status': 'template', 'modules': [],
            'sections': [], 'sources': {}, 'editions': [], 'questions': [],
            'guide': [], 'experiments': [], 'written': [], 'testAllocation': {}}
    for number, (key, title, filename, original, week) in enumerate(SOURCES, 1):
        path = ROOT / 'sources' / filename
        is_pptx = path.suffix == '.pptx'
        if is_pptx:
            slides = Presentation(path).slides
            texts = ['\n'.join(shape.text for shape in s.shapes if shape.has_text_frame)
                     for s in slides]
            images = [None] * len(texts)
            # A proper office-rendered PDF may be supplied later. Never draw a
            # synthetic slide and label it as the original PowerPoint visual.
            converted = ROOT / 'sources' / 'morphology.pdf'
            if converted.exists():
                document = fitz.open(converted)
                assert len(document) == len(slides)
            else:
                document = None
        else:
            document = fitz.open(path)
            texts = [page.get_text() for page in document]
            images = [None] * len(texts)
        if document:
            folder = ROOT / 'assets' / key
            folder.mkdir(parents=True, exist_ok=True)
            for i, page in enumerate(document):
                image = folder / f'{i+1:03}.webp'
                if not image.exists():
                    pix = page.get_pixmap(matrix=fitz.Matrix(1.4, 1.4), alpha=False)
                    pix.pil_save(str(image), format='WEBP', quality=86)
                images[i] = str(image.relative_to(ROOT))
        source = {'original': original, 'file': f'sources/{filename}', 'pages': len(texts),
                  'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                  'format': 'pptx' if is_pptx else 'pdf',
                  'previewStatus': 'ready' if all(images) else 'office-render-required',
                  'pdf': 'sources/morphology.pdf' if is_pptx and document else (None if is_pptx else f'sources/{filename}')}
        data['sources'][key] = source
        module = {'id': key, 'number': f'{number:02}', 'title': title, 'source': key,
                  'week': week, 'sections': []}
        for page, (text, image) in enumerate(zip(texts, images), 1):
            sid = f'm3-{key}-p{page:03}'
            lines = [re.sub(r'\s+', ' ', line).strip() for line in text.splitlines() if line.strip()]
            title_line = (lines[0][:110] if lines else f'Original page {page}')
            data['sections'].append({'id': sid, 'noteId': sid, 'module': key,
                'source': key, 'page': page, 'title': title_line, 'sourceText': text,
                'image': image, 'core': False, 'reviewPages': [], 'paragraphs': [],
                'analysis': {'status': 'pending', 'role': None, 'concepts': [],
                    'experiments': [], 'visualChecked': False, 'reviewMatches': []}})
            module['sections'].append(sid)
        data['modules'].append(module)
    ids = {s['id'] for s in data['sections']}
    for key, label in EDITIONS:
        path = ROOT / 'authoring' / f'{key}.json'
        if path.exists():
            edition = json.loads(path.read_text())
            assert set(edition['scripts']) == ids, 'Do not silently discard authored pages.'
        else:
            edition = {'id': key, 'label': label, 'scripts': {sid: {
                'status': 'pending', 'blocks': [], 'review': {
                    'sourceChecked': False, 'visualChecked': False, 'factChecked': False}}
                for sid in sorted(ids)}}
            write(path, edition)
        data['editions'].append(edition)
    write(ROOT / 'source-manifest.json', data['sources'])
    write(ROOT / 'authoring' / 'page-inventory.json', data['sections'])
    (ROOT / 'data.js').write_text('window.LING406_MODULE3 = ' + json.dumps(data, ensure_ascii=False) + ';\n')
    print(f"Prepared {len(data['modules'])} collections, {len(ids)} source pages and {len(EDITIONS)} separate editions.")


if __name__ == '__main__':
    main()
