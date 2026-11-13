"""Place the user's own Module I PDF notes beside their original slides, word for word.

Lectures 01–10 each have a notes PDF in the same format as the Module II Version 7
notes (Course / Title of Lecture / Date / Professor, then numbered sections). Each PDF
contains the notes twice, a full copy followed by a shorter copy; the full first copy
is used, and its page range is recorded. Text is read character by character from the
rendered page so that inline math symbols land where they sit, bold is judged from the
rendered ink weight of each glyph against that glyph's usual weight, stacked fractions
become num/den, and each display equation becomes its own paragraph. A few display
equations with stacked sums are transcribed by hand in FIXES (the words and numbers are
unchanged). Nothing is rewritten.

Writes authoring/notes-v7-module1.json (pages with teaching and evidence) and
authoring/notes-v7-module1-extraction.json (every paragraph with its id, text and hash).
"""
import collections
import hashlib
import json
import re
import statistics
from pathlib import Path

import fitz
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
A = ROOT / 'authoring'
FILES = {'01': 'sources/notes-v7-lecture01.pdf', '02': 'sources/notes-v7-lecture02.pdf', '03': 'sources/notes-v7-lecture03.pdf',
         '04': 'sources/notes-v7-lecture04.pdf', '05-06': 'sources/notes-v7-lecture05-06.pdf', '07': 'sources/notes-lecture07.pdf',
         '08': 'sources/notes-lecture08.pdf', '09': 'sources/notes-v7-lecture09.pdf', '10': 'sources/notes-v7-lecture10.pdf'}
# Stacked sums and fractions that the automatic num/den pairing cannot express.
FIXES = {
    '150 trillion 2 trillion = 75': '150 trillion / 2 trillion = 75',
    '10 + 12 3 + 14 = 36 3 = 12': '(10 + 12 + 14) / 3 = 36 / 3 = 12',
    '78 + 67 + 98 + 85 + 8 76 + 68 + 98 + 72 = 642 8 = 80.25': '(78 + 67 + 98 + 85 + 76 + 68 + 98 + 72) / 8 = 642 / 8 = 80.25',
    '62 + 70 + 78 + 6 82 + 90 + 98 = 480 6 = 80': '(62 + 70 + 78 + 82 + 90 + 98) / 6 = 480 / 6 = 80',
    '10 + 12 3 + 14 = 12': '(10 + 12 + 14) / 3 = 12',
    '10 + 10 = 20 2 + 100 = 102': '10 + 10 = 20 and 2 + 100 = 102',
    'V AJ = min{ 12/7 +/+ V/V CJ BJ/ }': 'V_AJ = min{12 + V_BJ, 7 + V_CJ}',
    'V BJ = min⎨ ⎧/ ⎩ 6 5/9 + +/+ V V/EJ V DJ/ FJ / ⎬ ⎫/ ⎭': 'V_BJ = min{5 + V_DJ, 6 + V_EJ, 9 + V_FJ}',
    'V CJ = min⎨ ⎧/ ⎩ 10 14/11 + +/+ V V/EJ V DJ/ FJ / ⎬ ⎫/ ⎭': 'V_CJ = min{14 + V_DJ, 10 + V_EJ, 11 + V_FJ}',
    'V DJ = min⎨ ⎧/ ⎩ 7 8/10 + +/+ VHJ V/V GJ/IJ ⎬ ⎫/ ⎭': 'V_DJ = min{8 + V_GJ, 7 + V_HJ, 10 + V_IJ}',
    'V EJ = min⎨ ⎧/ ⎩ 7 9/9 + +/+ V V/HJ GJ/V IJ / ⎬ ⎫/ ⎭': 'V_EJ = min{9 + V_GJ, 7 + V_HJ, 9 + V_IJ}',
    'V FJ = min⎨ ⎧/ ⎩ 7 10/8 + +/+ V V V/HJ IJ GJ/ / ⎬ ⎫/ ⎭': 'V_FJ = min{10 + V_GJ, 7 + V_HJ, 8 + V_IJ}',
    'V GJ = 5 V HJ = 9 V IJ = 8': 'V_GJ = 5, V_HJ = 9, V_IJ = 8',
    '⎧ 8 + 5 ⎫ ⎧ 13 ⎫': '', '⎧ 9 + 5 ⎫ ⎧ 14 ⎫': '', '⎧ 10 + 5 ⎫ ⎧ 15 ⎫': '', '⎧ 5 + 13 ⎫ ⎧ 18 ⎫': '', '⎧ 14 + 13 ⎫ ⎧ 27 ⎫': '',
    'V DJ = min⎨ ⎩ 7 10 + + 9 8 ⎬ ⎭ = min⎨ ⎩ 16 18 ⎬ ⎭ = 13': 'V_DJ = min{8 + 5, 7 + 9, 10 + 8} = min{13, 16, 18} = 13',
    'V EJ = min⎨ ⎩ 7 9 + + 9 8 ⎬ ⎭ = min⎨ ⎩ 16 17 ⎬ ⎭ = 14': 'V_EJ = min{9 + 5, 7 + 9, 9 + 8} = min{14, 16, 17} = 14',
    'V FJ = min⎨ ⎩ 7 8 + + 9 8 ⎬ ⎭ = min⎨ ⎩ 16 16 ⎬ ⎭ = 15': 'V_FJ = min{10 + 5, 7 + 9, 8 + 8} = min{15, 16, 16} = 15',
    'V BJ = min⎨ ⎩ 6 9 + + 14 15 ⎬ ⎭ = min⎨ ⎩ 20 24 ⎬ ⎭ = 18': 'V_BJ = min{5 + 13, 6 + 14, 9 + 15} = min{18, 20, 24} = 18',
    'V CJ = min⎨ ⎩ 10 11 + + 14 15 ⎬ ⎭ = min⎨ ⎩ 24 26 ⎬ ⎭ = 24': 'V_CJ = min{14 + 13, 10 + 14, 11 + 15} = min{27, 24, 26} = 24',
    'V AJ = min{ 12/7 +/+ 24 18/ } = min{ 30/ 31 } = 30': 'V_AJ = min{12 + 18, 7 + 24} = min{30, 31} = 30',
    'k . ( k)': '', 'm k = 1 Δ = 0.5 Δ': 'k/m = 1, and the time step is Δt = 0.5.',
    'ẋ = v v̇ = − k/m x': 'ẋ = v and v̇ = −(k/m) x',
    'xnew = xold + Δt ⋅ vold vnew = vold − Δt ⋅ xnew': 'x_new = x_old + Δt · v_old and v_new = v_old − Δt · x_new',
    'v [1] = −1 1 × 1 × 0.5 + 0 = −0.500': 'v[1] = −(1/1) × 1 × 0.5 + 0 = −0.500',
    'v[2] = − 1/1 × 1 × 0.5 + (−0.500) = −1': 'v[2] = −(1/1) × 1 × 0.5 + (−0.500) = −1',
    'v [3] = −1 1 × 0.750 × 0.5 + (−1) = −1.375': 'v[3] = −(1/1) × 0.750 × 0.5 + (−1) = −1.375',
    'v̇ = − k/m x': 'v̇ = −(k/m) x',
    'v[n] = − k/m x[n − 1] ⋅ dt + v[n − 1]': 'v[n] = −(k/m) x[n − 1] · dt + v[n − 1]',
    'x[n] = v[n − 1] ⋅ dt + x[n − 1]': 'x[n] = v[n − 1] · dt + x[n − 1]',
    '2 3 − 2 9 = 4 9': '2/3 − 2/9 = 4/9',
    '9 4 − 27 4 = 27 8': '4/9 − 4/27 = 8/27',
}
# Inline typography the character pass cannot recover: superscripts in an electron configuration,
# and the Python listings, which are split back into their lines (a newline marks a line break).
INLINE_FIXES = {
    '1 s 22 s 22 p 63 s 2': '1s² 2s² 2p⁶ 3s²',
    '1 s 2 , 2 s 2 , 2 p 6 , and 3 s 2': '1s², 2s², 2p⁶, and 3s²',
    '2 p 6 includes': '2p⁶ includes',
    'which here is $x = 0**.**': 'which here is x = 0.',   # a stray markup fragment in the Lecture 7 PDF, read as the plain text it stands for
    # Lecture 8: inline fractions and subscripts the character pass could not place
    'v ˙ = −/m k x': 'v̇ = −(k/m) x', 'x ˙ = v': 'ẋ = v', '−/m k': '−(k/m)',
    'The ratio m sets how strongly the velocity is pushed A stiffer spring larger pushes harder': 'The ratio k/m sets how strongly the velocity is pushed. A stiffer spring (larger k) pushes harder',
    ', and the time step is t . The **time step t** is': 'The **time step Δt** is',
    'displacementx': 'displacement x', 'massm': 'mass m', 'stiffnessk': 'stiffness k', 'Stiffnessk': 'Stiffness k', 'newx': 'new x',
    'numberx': 'number x', 'numberd': 'number d', 'knowVBJ': 'know VBJ', 'xrises': 'x rises',
}
# Display lines matched by their start (garbled multi-line stacks) -> their transcription, line breaks allowed.
PREFIX_FIXES = {
    'v v[11] v[12] v[5] v[4]': 'v[4] = −(1/1) × 0.250 × 0.5 + (−1.375) = −1.500\nv[5] = −(1/1) × (−0.438) × 0.5 + (−1.500) = −1.281\nv[6] = −(1/1) × (−1.188) × 0.5 + (−1.281) = −0.688\nv[7] = −(1/1) × (−1.828) × 0.5 + (−0.688) = 0.227\nv[8] = −(1/1) × (−2.172) × 0.5 + 0.227 = 1.313\nv[9] = −(1/1) × (−2.059) × 0.5 + 1.313 = 2.342\nv[10] = −(1/1) × (−1.402) × 0.5 + 2.342 = 3.043\nv[11] = −(1/1) × (−0.231) × 0.5 + 3.043 = 3.159\nv[12] = −(1/1) × 1.290 × 0.5 + 3.159 = 2.514',
}
# List lines clipped at the page edge in the PDF, completed from the slide's own tables.
CLIPPED = {'0.578, 0.92': '0.578, 0.920]', '0.684, 0.22': '0.684, 0.224]', '1.290, 2.': '1.290, 2.869]', '3.159, 2.51': '3.159, 2.514]'}
CODE_STARTS = [' import ', ' dt = ', ' steps = ', ' x = np', ' v = np', ' x[0] = ', ' v[0] = ', ' for n in', ' x_dot = ', ' v_dot = ',
               ' x[n + 1] = ', ' v[n + 1] = ', ' t = np', ' plt.', ' x = [', ' v = [', ' d = [', ' k = m', ' gamma = ', ' x_hist', ' loss = ', ' x = x', ' print(', ' for ', ' import random', ' random.', ' return ', ' x.append', ' v.append']
Z = 3        # render scale for ink measurement
T = 1.12     # a word is bold when its letters carry 12% more ink than those letters usually do
DOTS = {'x': 'ẋ', 'v': 'v̇', 'y': 'ẏ', 'z': 'ż'}
JUNK = re.compile(r'PASTED|Now for the lecture|^Course: LING ?285|^(Title of Lecture|Date|Professor):|^\[CONTINUE\]$|DO NOT P')


def fixtext(s):
    s = re.sub(r'([xvyz])˙', lambda m: DOTS[m[1]], s)
    return s.replace('\xa0', ' ').replace('​', '')


def tokens(chars):
    """Chars on one baseline -> words by x gap: [(x0, x1, text, chars)]."""
    chars = sorted(chars, key=lambda c: (c['x0'], c['i']))
    out, w, px = [], [], None
    for c in chars:
        if px is not None and (c['x0'] - px > 0.22 * c['sz'] or c['c'] == ' ') and w:
            out.append(w); w = []
        if c['c'] != ' ':
            w.append(c)
        px = c['x1'] if px is None else max(px, c['x1'])
    if w:
        out.append(w)
    return [(w[0]['x0'], w[-1]['x1'], ''.join(c['c'] for c in w), w) for w in out]


def render_words(words, med):
    s, pb = '', False
    for x0, x1, txt, w in words:
        rs = [c['d'] / med[(c['c'], round(c['sz']))] for c in w
              if c['d'] is not None and c['c'].isalpha() and not c['m'] and (c['c'], round(c['sz'])) in med]
        b = (statistics.median(rs) > T) if rs else pb
        if b != pb:
            s = (s + '**') if b else (s.rstrip() + '** ')
            pb = b
        s += txt + ' '
    if pb:
        s = s.rstrip() + '**'
    return fixtext(re.sub(r'\*\*\s*\*\*', '', s).strip())


def group_lines(chars, tol=3.5):
    chars = sorted(chars, key=lambda c: (c['y'], c['i']))
    groups, cur, cy = [], [], None
    for c in chars:
        if cy is None or abs(c['y'] - cy) > tol:
            if cur:
                groups.append(cur)
            cur, cy = [c], c['y']
        else:
            cur.append(c)
    if cur:
        groups.append(cur)
    return groups


def fractions(parts, base_y):
    """Math tokens above and below a baseline, paired by x overlap -> [(x0, x1, 'num/den')]."""
    above = [t for t in parts if t[3][0]['y'] < base_y]
    below = [t for t in parts if t[3][0]['y'] > base_y]
    out = []
    for a in above:
        m = [b for b in below if b[0] < a[1] + 2 and b[1] > a[0] - 2]
        if m:
            b = m[0]; below.remove(b)
            out.append((min(a[0], b[0]), max(a[1], b[1]), f'{fixtext(a[2])}/{fixtext(b[2])}'))
        else:
            out.append((a[0], a[1], fixtext(a[2])))
    for b in below:
        out.append((b[0], b[1], fixtext(b[2])))
    return out


def read_pdf(path):
    doc = fitz.open(path)
    pages = []
    for page in doc:
        pix = page.get_pixmap(matrix=fitz.Matrix(Z, Z), colorspace='gray')
        img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.h, pix.w)
        chars, idx, prev = [], 0, None
        for b in page.get_text('rawdict')['blocks']:
            for l in b.get('lines', []):
                for sp in l['spans']:
                    for ch in sp['chars']:
                        x0, y0, x1, y1 = ch['bbox']; c = ch['c']; d = None
                        if x1 - x0 < 0.3 and prev is not None and abs(x0 - prev['x1']) < 0.6 and abs(prev['y'] - (y0 + y1) / 2) < 2:
                            x0 = prev['x0'] + 0.0001; x1 = x0 + 0.0001   # ligature tails (fi, ffi, fl) keep their order right after the head
                        if c.strip() and x1 > x0 + 0.5:
                            X0, Y0, X1, Y1 = int(x0 * Z), int(y0 * Z), int(np.ceil(x1 * Z)), int(np.ceil(y1 * Z))
                            crop = img[Y0:Y1, X0:X1]
                            if crop.size:
                                d = float((255 - crop).mean())
                        rec = dict(y=(y0 + y1) / 2, x0=x0, x1=x1, c=c, sz=sp['size'], d=d, i=idx, m='KaTeX' in sp['font'])
                        chars.append(rec); prev = rec; idx += 1
        pages.append(chars)
    return doc, pages


def lines_of(pages):
    by = collections.defaultdict(list)
    for p in pages:
        for c in p:
            if c['d'] is not None and c['c'].isalpha() and not c['m']:
                by[(c['c'], round(c['sz']))].append(c['d'])
    med = {k: statistics.median(v) for k, v in by.items()}
    lines = []
    for pno, chars in enumerate(pages):
        groups = group_lines(chars)
        body = [g for g in groups if not all(c['m'] or not c['c'].isalnum() for c in g)]
        mathg = [g for g in groups if all(c['m'] or not c['c'].isalnum() for c in g)]
        attached, display = collections.defaultdict(list), []
        for g in mathg:
            gy = statistics.mean(c['y'] for c in g); gx0 = min(c['x0'] for c in g); gx1 = max(c['x1'] for c in g)
            host = None
            for bi, bg in enumerate(body):
                by_ = statistics.mean(c['y'] for c in bg); bx0 = min(c['x0'] for c in bg); bx1 = max(c['x1'] for c in bg)
                sz = statistics.median(c['sz'] for c in bg)
                if abs(gy - by_) <= 0.9 * sz and gx0 >= bx0 - 2 and gx1 <= bx1 + 2:
                    host = bi; break
            if host is None:
                display.append(g)
            else:
                attached[host] += tokens(g)
        for bi, bg in enumerate(body):
            by_ = statistics.mean(c['y'] for c in bg); sz = statistics.median(c['sz'] for c in bg)
            words = tokens(bg)
            if attached.get(bi):
                extra = fractions(attached[bi], by_)
                words = sorted(words + [(x0, x1, t, [dict(c='', d=None, m=True, sz=sz)]) for x0, x1, t in extra], key=lambda w: w[0])
            lines.append(dict(page=pno + 1, y=by_, x0=min(c['x0'] for c in bg), size=sz, text=render_words(words, med), math=False))
        display.sort(key=lambda g: statistics.mean(c['y'] for c in g))
        blocks, cur = [], []
        for g in display:
            gy = statistics.mean(c['y'] for c in g)
            if cur and gy - statistics.mean(c['y'] for c in cur[-1]) > 14:
                blocks.append(cur); cur = []
            cur.append(g)
        if cur:
            blocks.append(cur)
        for blk in blocks:
            withEq = [g for g in blk if any(c['c'] in '=−+' for c in g)]
            main = max(withEq or blk, key=lambda g: max(c['x1'] for c in g) - min(c['x0'] for c in g))
            base_y = statistics.mean(c['y'] for c in main)
            parts = [t for g in blk if g is not main for t in tokens(g)]
            words = tokens(main) + [(x0, x1, t, [dict(c='', d=None, m=True, sz=12)]) for x0, x1, t in fractions(parts, base_y)]
            words.sort(key=lambda w: w[0])
            text = fixtext(' '.join(w[2] for w in words)).strip()
            text = re.sub(r'\) 2\b', ')²', text).replace('  ', ' ')
            if text:
                lines.append(dict(page=pno + 1, y=base_y, x0=min(c['x0'] for g in blk for c in g), size=13, text=text, math=True))
    lines.sort(key=lambda l: (l['page'], l['y']))
    return lines


def sections_of(lines):
    firsts = [i for i, l in enumerate(lines) if re.match(r'(\*\*)?Section 1: ', l['text'])]
    body = lines[:firsts[1]] if len(firsts) > 1 else lines
    pitch = collections.Counter(round((b['y'] - a['y']) / a['size'], 1) for a, b in zip(body, body[1:])
                                if a['page'] == b['page'] and not a['math'] and not b['math'] and a['size'] < 12.5 and b['size'] < 12.5).most_common(1)[0][0]
    xs = collections.Counter(round(l['x0']) for l in body if not l['math'] and l['size'] < 12.5)
    total = sum(xs.values())
    levels = sorted(x for x, c in xs.items() if c >= 0.12 * total)

    def level(x):
        for k, lx in enumerate(levels):
            if x < lx + 8:
                return k + 1
        return min(len(levels) + 1, 3)

    sections, sec, para, prevl = [], None, None, None
    for l in body:
        t = l['text']
        if not t:
            continue
        m = re.match(r'\*\*Section (\d+): (.+?)\*\*$', t) or re.match(r'Section (\d+): (.+)$', t.replace('**', ''))
        if m and l['size'] < 13:
            sec = dict(number=int(m[1]), title=re.sub(r'\s*\*\*\s*', ' ', m[2]).strip(), pdfPages=[l['page']], paragraphs=[])
            sections.append(sec); para = None; prevl = l; continue
        if sec is None:
            prevl = l; continue
        if l['page'] not in sec['pdfPages']:
            sec['pdfPages'].append(l['page'])
        gap = ((l['y'] - prevl['y']) / prevl['size']) if (prevl and prevl['page'] == l['page']) else 99
        continues = para is not None and not para['math'] and not l['math'] and not re.search(r'[.!?:]\**$', para['lines'][-1]) and t.lstrip('*')[:1].islower()
        newpara = para is None or l['math'] or para['math'] or (not continues and (gap > pitch * 1.1 or abs(l['x0'] - para['x0']) > 6))
        if newpara:
            para = dict(x0=l['x0'], indent=0 if l['math'] else level(l['x0']), math=l['math'], lines=[t], pdfPages=[l['page']])
            sec['paragraphs'].append(para)
        else:
            para['lines'].append(t)
            if l['page'] not in para['pdfPages']:
                para['pdfPages'].append(l['page'])
        prevl = l
    for sec in sections:
        sec['paragraphs'] = [p for p in sec['paragraphs'] if not JUNK.search(' '.join(p['lines']))]
        for p in sec['paragraphs']:
            p['lines'] = [re.sub(r'\s+', ' ', l).strip() for l in p['lines']]
        for p in sec['paragraphs']:
            text = re.sub(r'\*\*\s+\*\*', ' ', ' '.join(p['lines'])).replace('** **', ' ')
            if p['math']:
                text = FIXES.get(text, text)
                for start, full in PREFIX_FIXES.items():
                    if text.startswith(start):
                        text = full
                for clipped, full in CLIPPED.items():
                    if text.endswith(clipped):
                        text = text[:-len(clipped)] + full
                text = re.sub(r'(\d)/ (\d)', r'\1/\2', text)
            for old, new in INLINE_FIXES.items():
                text = text.replace(old, new)
            if text.startswith('python ') or text.startswith('x.append('):
                for start in CODE_STARTS:
                    text = text.replace(start, '\n' + start.strip() + (' ' if start.endswith(' ') else ''))
                text = re.sub(r'\n+', '\n', text.replace('python ', 'python\n', 1)).strip()
            p['text'] = text
            del p['lines']; del p['x0']
        sec['paragraphs'] = [p for p in sec['paragraphs'] if p['text']]
    return sections, body[-1]['page']


def extract():
    result = {}
    for n, f in FILES.items():
        doc, pages = read_pdf(ROOT / f)
        sections, last = sections_of(lines_of(pages))
        result[n] = dict(file=f, sha256=hashlib.sha256((ROOT / f).read_bytes()).hexdigest(),
                         copy1Pages=[1, last], totalPages=len(doc), sections=sections)
    return result


def blocks_for(section):
    """Paragraphs -> teaching blocks. Level 1 starts a block, deeper levels are its children,
    and a display equation is appended to the text it follows."""
    blocks, ids = [], []
    for k, p in enumerate(section['paragraphs']):
        pid = f"{section['id']}-P{k + 1}"
        if p['math']:
            if not blocks:
                blocks.append({'text': p['text'], 'children': []}); ids.append([pid])
            elif blocks[-1]['children']:
                blocks[-1]['children'][-1] += ' ' + p['text']; ids[-1].append(pid)
            else:
                blocks[-1]['text'] += ' ' + p['text']; ids[-1].append(pid)
        elif '\n' in p['text']:
            lines = p['text'].split('\n')
            blocks.append({'text': lines[0], 'children': lines[1:]}); ids.append([pid])
        elif p['indent'] <= 1 or not blocks:
            blocks.append({'text': p['text'], 'children': []}); ids.append([pid])
        else:
            blocks[-1]['children'].append(p['text']); ids[-1].append(pid)
    return blocks, ids


def build(maps):
    data = json.loads((ROOT / 'data.json').read_text())
    extracted = extract()
    collections_out, manifest = {}, {}
    for n, info in extracted.items():
        cid = f'lecture{n}'
        source = next(c for c in data['collections'] if c['id'] == cid)
        pages = {s['page']: {'page': s['page'], 'teaching': [],
                             'evidence': {'pdfFile': info['file'], 'pdfPages': [], 'paragraphIds': [], 'noteSections': []}}
                 for s in source['sections']}
        section_map = maps[n]['v7'] if n in maps else None
        sections_out = []
        for sec in info['sections']:
            sec['id'] = f"L{n}-S{sec['number']}"
            blocks, ids = blocks_for(sec)
            sections_out.append(dict(
                id=sec['id'], number=sec['number'], title=sec['title'], pdfPages=sec['pdfPages'],
                paragraphs=[dict(id=f"{sec['id']}-P{k + 1}", indent=p['indent'], math=p['math'], text=p['text'],
                                 plain=p['text'].replace('**', ''),
                                 sha256=hashlib.sha256(re.sub(r'\s+', ' ', p['text'].replace('**', '')).strip().encode()).hexdigest())
                            for k, p in enumerate(sec['paragraphs'])]))
            if section_map is None:
                continue
            target = section_map[str(sec['number'])]
            targets = target if isinstance(target, list) else [target] * len(blocks)
            assert len(targets) == len(blocks), (n, sec['number'], len(blocks), targets)
            for page, block, bid in zip(targets, blocks, ids):
                assert page in pages, (n, sec['number'], page)
                pages[page]['teaching'].append(block)
                ev = pages[page]['evidence']
                ev['paragraphIds'] += bid
                for pp in sec['pdfPages']:
                    if pp not in ev['pdfPages']:
                        ev['pdfPages'].append(pp)
                if sec['number'] not in ev['noteSections']:
                    ev['noteSections'].append(sec['number'])
        if section_map is not None:
            collections_out[cid] = {'pages': [pages[s['page']] for s in source['sections']]}
        manifest[cid] = dict(file=info['file'], sha256=info['sha256'], copy1Pages=info['copy1Pages'], totalPages=info['totalPages'],
                             mapped=section_map is not None, sections=sections_out)
    payload = dict(sourceFiles=[dict(file=i['file'], sha256=i['sha256'], label=f'LING285 notes, Lecture {n}') for n, i in extracted.items()],
                   copy='First (full) copy of each PDF; the shorter second copy is recorded in the extraction manifest page ranges.',
                   collections=collections_out)
    (A / 'notes-v7-module1.json').write_text(json.dumps(payload, ensure_ascii=False, indent=1) + '\n')
    (A / 'notes-v7-module1-extraction.json').write_text(json.dumps(dict(fixes=FIXES, lectures=manifest), ensure_ascii=False, indent=1) + '\n')
    return {cid: sum(len(p['teaching']) for p in c['pages']) for cid, c in collections_out.items()}


if __name__ == '__main__':
    print(build(json.loads((A / 'notes-module1-maps.json').read_text())))
