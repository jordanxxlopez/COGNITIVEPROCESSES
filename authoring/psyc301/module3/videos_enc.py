"""Flat, code-drawn stimulus videos for Collection 17 (Encoding, Retrieval, and Consolidation).

Uses the drawing helpers in videos.py. Each clip shows a task display or redraws values that appear on the
slides. They are reconstructions, not recordings of the original experiments. Rendered by videos.py.
"""
from PIL import ImageDraw
from videos import W, H, BLUE, INK, GREY, BAR, SOFT, GREEN, RED, PALE, canvas, text, box

ORANGE = (240, 150, 90)


def table(d, x0, y0, col_w, row_h, header, rows, upto=None, colors=None):
    """Draw a simple table. rows are lists of strings. upto limits how many rows are shown."""
    for k, h in enumerate(header):
        text(d, x0 + col_w[k] / 2 + sum(col_w[:k]), y0, h, 22, BLUE, bold=True)
    for r, row in enumerate(rows[:upto if upto is not None else len(rows)]):
        y = y0 + 34 + row_h / 2 + r * row_h
        box(d, x0, y - row_h / 2 + 6, x0 + sum(col_w), y + row_h / 2 - 6, fill=PALE)
        for k, cell in enumerate(row):
            col = (colors or {}).get((r, k), INK)
            text(d, x0 + col_w[k] / 2 + sum(col_w[:k]), y, cell, 24, col, bold=k == 0 or (r, k) in (colors or {}))


def timeline(d, y, steps, x0=150, x1=1130, color=SOFT):
    gap = (x1 - x0) / (len(steps) - 1) if len(steps) > 1 else 0
    for k, s in enumerate(steps):
        x = x0 + gap * k
        if k:
            d.line((x0 + gap * (k - 1) + 120, y, x - 120, y), fill=GREY, width=4)
        box(d, x - 115, y - 38, x + 115, y + 38, fill=color)
        text(d, x, y, s, 22, INK, bold=True)


def craik_tulving():
    frames = []
    for title, question, word in [('Shallow · physical appearance', '“Is the word in capital letters?”', 'TABLE'),
                                  ('Intermediate · sound', '“Does the word rhyme with weight?”', 'crate'),
                                  ('Deep · meaning', '“Does the word fit in the sentence: ‘He met a ______ in the street’?”', 'FRIEND')]:
        for show in (False, True):
            im, d = canvas('Craik and Tulving (1975) · ' + title)
            text(d, W / 2, 250, question, 30, BLUE, bold=True)
            if show:
                text(d, W / 2, 400, word, 84, INK, bold=True)
                text(d, W / 2, 540, 'Answer yes or no.', 26, GREY)
            frames.append((im, 2 if not show else 3))
    im, d = canvas('Percent correct (approximate, from the figure)')
    d.line((330, 560, 950, 560), fill=GREY, width=3)
    for k, (lab, v, col) in enumerate([('Capital letters?', 15, (150, 205, 205)), ('Rhyme?', 48, BAR), ('Fill in the blanks', 80, ORANGE)]):
        x = 430 + k * 210
        d.rectangle((x - 55, 560 - 4 * v, x + 55, 560), fill=col)
        text(d, x, 595, lab, 24)
    text(d, W / 2, 660, 'Deeper processing gave better memory.', 30, INK, bold=True)
    frames.append((im, 6))
    return frames, len(frames) - 1


def imagery():
    frames = []
    im, d = canvas('Repetition group')
    for k in range(3):
        text(d, W / 2, 280 + k * 80, 'boat – tree', 52, INK, bold=True)
    text(d, W / 2, 580, 'Repeat the pair.', 28, GREY)
    frames.append((im, 4))
    im, d = canvas('Imagery group')
    d.rectangle((610, 400, 670, 560), fill=(140, 100, 70))
    d.ellipse((500, 250, 780, 440), fill=(70, 150, 90))
    d.polygon([(560, 250), (720, 250), (690, 290), (590, 290)], fill=(200, 80, 70))
    d.line((640, 250, 640, 170), fill=INK, width=5)
    d.polygon([(645, 172), (645, 240), (705, 240)], fill=(235, 235, 235), outline=GREY)
    text(d, W / 2, 620, 'Form an image of the two items together.', 28, GREY)
    frames.append((im, 5))
    im, d = canvas('Percent correct recall (approximate, from the figure)')
    d.line((400, 560, 880, 560), fill=GREY, width=3)
    for k, (lab, v, col) in enumerate([('Repetition group', 5, GREEN), ('Imagery group', 13, BAR)]):
        x = 520 + k * 240
        d.rectangle((x - 60, 560 - 24 * v, x + 60, 560), fill=col)
        text(d, x, 595, lab, 24)
    text(d, W / 2, 660, 'The imagery group recalled more than twice as many pairs.', 28, INK, bold=True)
    frames.append((im, 6))
    return frames, 1


def bransford():
    frames = []
    rows = [('Group 1', ['Picture', 'Passage', 'Test']), ('Group 2', ['Passage', 'Picture', 'Test']), ('Control', ['Passage', 'Test'])]
    for upto in (1, 2, 3):
        im, d = canvas('Bransford and Johnson (1972) · Three groups')
        for r, (name, steps) in enumerate(rows[:upto]):
            y = 230 + r * 130
            text(d, 130, y, name, 28, BLUE, bold=True)
            for k, s in enumerate(steps):
                x = 380 + k * 290
                if k:
                    d.line((x - 170, y, x - 120, y), fill=GREY, width=4)
                box(d, x - 115, y - 38, x + 115, y + 38, fill=(255, 240, 214) if s == 'Picture' else SOFT)
                text(d, x, y, s, 24, INK, bold=True)
        frames.append((im, 2.5))
    im2 = im.copy()
    d = ImageDraw.Draw(im2)
    text(d, W / 2, 620, 'Group 1 outperformed the others.', 32, GREEN, bold=True)
    text(d, W / 2, 665, 'A framework helps when it is there during reading.', 24)
    frames.append((im2, 6))
    return frames, len(frames) - 1


def karpicke():
    frames = []
    header = ['', 'Repeat: STUDY', 'Repeat: TEST', 'After one week']
    rows = [['Group 1', 'All pairs', 'All pairs', '81%'], ['Group 2 · less studying', 'Only pairs not recalled', 'All pairs', '81%'],
            ['Group 3 · less testing', 'All pairs', 'Only pairs not recalled', '36%']]
    colors = {(0, 3): GREEN, (1, 3): GREEN, (2, 3): RED}
    for upto in (1, 2, 3):
        im, d = canvas('Karpicke and Roediger (2008) · Word pairs')
        text(d, W / 2, 130, 'First session for every group: study all pairs, test all pairs', 24, GREY)
        table(d, 60, 220, [330, 290, 290, 250], 110, header, rows, upto, colors)
        frames.append((im, 3.5))
    im2 = im.copy()
    d = ImageDraw.Draw(im2)
    text(d, W / 2, 640, 'Less studying did not hurt. Less testing did.', 32, INK, bold=True)
    frames.append((im2, 6))
    return frames, len(frames) - 1


def retrieval_cues():
    frames = []
    rows = [('Self-generated retrieval cues', 91, ORANGE), ('Other-person-generated retrieval cues', 55, GREEN), ('Never saw the nouns; other-person-generated cues', 17, BAR)]
    for upto in (1, 2, 3):
        im, d = canvas('Percent of nouns remembered')
        for r, (lab, v, col) in enumerate(rows[:upto]):
            y = 240 + r * 130
            text(d, 120, y - 42, lab, 24, INK, anchor='lm')
            d.rectangle((120, y - 20, 120 + 9.5 * v, y + 30), fill=col)
            text(d, 140 + 9.5 * v, y + 5, str(v), 30, INK, bold=True, anchor='lm')
        frames.append((im, 3))
    im2 = im.copy()
    d = ImageDraw.Draw(im2)
    text(d, W / 2, 640, 'Cues work best when the person who uses them created them.', 28, INK, bold=True)
    frames.append((im2, 6))
    return frames, len(frames) - 1


def diving():
    frames = []
    rows = [['Underwater', 'Underwater', '32%'], ['Underwater', 'On land', '23%'], ['On land', 'On land', '38%'], ['On land', 'Underwater', '24%']]
    colors = {(0, 2): GREEN, (1, 2): RED, (2, 2): GREEN, (3, 2): RED}
    for upto in (1, 2, 3, 4):
        im, d = canvas('Diving experiment · Where words were learned and recalled')
        table(d, 190, 180, [320, 320, 260], 96, ['During learning', 'During recall', 'Words recalled'], rows, upto, colors)
        frames.append((im, 2.6))
    im2 = im.copy()
    d = ImageDraw.Draw(im2)
    text(d, W / 2, 660, 'Recall was best when the two locations matched.', 30, INK, bold=True)
    frames.append((im2, 6))
    return frames, len(frames) - 1


def matching():
    frames = []
    for title, a, b, vals in [('Grant and colleagues (1998) · “Studying” experiment', 'Noise', 'Quiet', (6.2, 5.4, 4.6, 6.7)),
                              ('Eich and Metcalfe (1989) · “Mood” experiment', 'Sad', 'Happy', (27, 17, 17, 32))]:
        for upto in (2, 4):
            im, d = canvas(title)
            cells = [(a, a, vals[0], True), (a, b, vals[1], False), (b, a, vals[2], False), (b, b, vals[3], True)]
            for k, (study, test, v, match) in enumerate(cells[:upto]):
                x = 220 + k * 280
                box(d, x - 115, 210, x + 115, 280, fill=SOFT)
                text(d, x, 245, 'Study: ' + study, 24, INK, bold=True)
                d.line((x, 285, x, 330), fill=GREY, width=4)
                box(d, x - 115, 335, x + 115, 405, fill=(214, 240, 224) if match else (250, 226, 220))
                text(d, x, 370, 'Test: ' + test, 24, INK, bold=True)
                text(d, x, 460, str(v), 44, GREEN if match else RED, bold=True)
            if upto == 4:
                text(d, W / 2, 600, 'Scores were highest when the test condition matched the study condition.', 28, INK, bold=True)
            frames.append((im, 3 if upto == 2 else 6))
    return frames, 1


def morris():
    frames = []
    im, d = canvas('Morris and colleagues (1977) · Encoding')
    for k, (lab, qn) in enumerate([('Semantic (deep)', '“Does the word fit in the sentence: ‘The ______ had a silver engine’?”'), ('Rhyme (shallow)', '“Does the word rhyme with ‘legal’?”')]):
        y = 260 + k * 190
        text(d, W / 2, y - 45, lab, 30, BLUE, bold=True)
        box(d, 110, y - 15, W - 110, y + 55, fill=PALE)
        text(d, W / 2, y + 20, qn, 24)
    frames.append((im, 7))
    im, d = canvas('Morris and colleagues (1977) · Two memory tests')
    for k, (lab, what) in enumerate([('Standard recognition test', 'Pick out the exact words that were studied.'), ('Rhyming recognition test', 'Pick out words that rhyme with the studied words, such as regal for eagle.')]):
        y = 260 + k * 190
        text(d, W / 2, y - 45, lab, 30, BLUE, bold=True)
        box(d, 110, y - 15, W - 110, y + 55, fill=PALE)
        text(d, W / 2, y + 20, what, 24)
    frames.append((im, 6))
    rows = [['Standard recognition test', '84%', '63%'], ['Rhyming recognition test', '33%', '49%']]
    colors = {(0, 1): GREEN, (0, 2): RED, (1, 1): RED, (1, 2): GREEN}
    for upto in (1, 2):
        im, d = canvas('Morris and colleagues (1977) · Results')
        table(d, 150, 220, [440, 270, 270], 120, ['', 'Semantic encoding', 'Rhyme encoding'], rows, upto, colors)
        frames.append((im, 4))
    im2 = im.copy()
    d = ImageDraw.Draw(im2)
    text(d, W / 2, 580, 'Each kind of encoding did best on the test that matched it.', 30, INK, bold=True)
    text(d, W / 2, 630, 'Transfer-appropriate processing', 28, BLUE, bold=True)
    frames.append((im2, 6))
    return frames, len(frames) - 1


def muller():
    frames = []
    for name, steps, pct, col in [('Immediate group', ['List 1', 'List 2 right away', 'Test for List 1'], '28%', RED),
                                  ('Delayed group', ['List 1', '6-minute rest', 'List 2', 'Test for List 1'], '48%', GREEN)]:
        for upto in range(1, len(steps) + 1):
            im, d = canvas('Müller and Pilzecker (1900) · ' + name)
            timeline(d, 300, steps[:upto], x0=170, x1=170 + 313 * (upto - 1))
            frames.append((im, 1.6))
        im2 = im.copy()
        d = ImageDraw.Draw(im2)
        text(d, W / 2, 470, 'Recall of the first list', 28, GREY)
        text(d, W / 2, 550, pct, 80, col, bold=True)
        frames.append((im2, 4.5))
    return frames, len(frames) - 1


def models():
    frames = []
    cortex = [(420, 230), (640, 190), (860, 230)]
    hippo = (640, 470)
    for title, stages in [('Standard model of consolidation', [(1.0, 0.25), (0.5, 0.7), (0.0, 1.0)]), ('Multiple trace model', [(1.0, 0.25), (1.0, 1.0)])]:
        for h_strength, c_strength in stages:
            im, d = canvas(title)
            for i in range(3):
                for j in range(i + 1, 3):
                    if c_strength > 0:
                        d.line((*cortex[i], *cortex[j]), fill=GREEN, width=int(2 + 8 * c_strength))
            for c in cortex:
                if h_strength > 0:
                    d.line((*hippo, *c), fill=BAR, width=int(2 + 8 * h_strength))
            for c in cortex:
                d.ellipse((c[0] - 34, c[1] - 34, c[0] + 34, c[1] + 34), fill=(245, 200, 170), outline=INK, width=3)
            d.ellipse((hippo[0] - 44, hippo[1] - 30, hippo[0] + 44, hippo[1] + 30), fill=(200, 40, 40) if h_strength > 0 else (225, 190, 190), outline=INK, width=3)
            text(d, hippo[0], hippo[1] + 60, 'Hippocampus', 24)
            text(d, 640, 130, 'Cortical areas', 24)
            label = 'New memory' if c_strength < 0.5 else ('Later' if (h_strength, c_strength) == (0.5, 0.7) else 'Remote memory')
            text(d, 180, 620, label, 30, INK, bold=True)
            if c_strength == 1.0:
                text(d, 760, 620, 'Hippocampus no longer needed' if h_strength == 0 else 'Hippocampus stays involved', 28, RED if h_strength == 0 else GREEN, bold=True)
            frames.append((im, 3.5 if c_strength < 1 else 5.5))
    return frames, 2


def reconsolidation():
    frames = []
    for title, steps, a, b in [
        ('Nader and colleagues (2000) · Rats', ['Tone + shock', 'Memory consolidates', 'Tone reactivates', 'Drug or control'],
         ('Anisomycin', 'much less freezing later', RED), ('Control infusion', 'fear response kept', GREEN)),
        ('Hupbach and colleagues (2007) · Humans', ['Learn List 1', 'Reminder or none', 'Learn List 2', 'Test on List 1'],
         ('Reminder', 'List 2 objects recalled as List 1', RED), ('No reminder', 'fewer such errors', GREEN)),
        ('Brunet and colleagues (2008) · PTSD', ['Write trauma script', 'Memory reactivated', 'Drug or placebo', 'Test 1 week later'],
         ('Propranolol', 'lower physiological fear response', GREEN), ('Placebo', 'higher physiological fear response', RED))]:
        for upto in (2, 4):
            im, d = canvas(title)
            timeline(d, 240, steps[:upto], x0=170, x1=170 + 313 * (upto - 1))
            frames.append((im, 2.5))
        im2 = im.copy()
        d = ImageDraw.Draw(im2)
        for k, (name, result, col) in enumerate([a, b]):
            y = 420 + k * 110
            box(d, 170, y - 42, W - 170, y + 42, fill=PALE)
            text(d, 200, y, name, 30, INK, bold=True, anchor='lm')
            text(d, W - 200, y, result, 26, col, bold=True, anchor='rm')
        frames.append((im2, 6))
    return frames, 2


GROUP = 'Encoding, retrieval and consolidation'
CLIPS = [
 ('L17-craik-tulving', 'Craik and Tulving (1975) · Three kinds of questions', craik_tulving, ['16:5', '16:6'],
  'The three questions and example words are the ones on the slide. The final chart redraws the approximate values from the slide figure.'),
 ('L17-imagery-pairs', 'Visual imagery · Repetition group and imagery group', imagery, ['16:7'],
  'The repetition display and a simple drawn image of a boat in a tree, then bars that redraw the approximate values from the slide figure. The drawing is illustrative.'),
 ('L17-bransford-johnson', 'Bransford and Johnson (1972) · Picture before or after', bransford, ['16:9', '16:11'],
  'The order of picture and passage for the three groups, followed by the result stated on the slide. The passage and picture themselves are not shown.'),
 ('L17-karpicke-roediger', 'Karpicke and Roediger (2008) · Less studying and less testing', karpicke, ['16:12', '16:13'],
  'The design table and the one-week scores from the slide, built one group at a time.'),
 ('L17-retrieval-cues', 'Retrieval cues · Self-generated and other-person-generated', retrieval_cues, ['16:18'],
  'Bars redraw the three percentages shown in the slide figure.'),
 ('L17-diving-context', 'Diving experiment · Matching locations', diving, ['16:19', '16:20', '16:21'],
  'The four combinations of learning and recall location with the percentages from the slide table.'),
 ('L17-matching-conditions', 'Studying and mood experiments · Matching conditions', matching, ['16:21', '16:22'],
  'The study and test conditions of Grant and colleagues (1998) and Eich and Metcalfe (1989) with the scores shown in the slide figure.'),
 ('L17-morris-transfer', 'Morris and colleagues (1977) · Transfer-appropriate processing', morris, ['16:23', '16:24', '16:25'],
  'The two encoding questions, the two memory tests and the four percentages are the ones given on the slides.'),
 ('L17-muller-pilzecker', 'Müller and Pilzecker (1900) · Immediate and delayed groups', muller, ['16:29', '16:30'],
  'Two timelines for the immediate group and the delayed group with the recall percentages from the slide figure.'),
 ('L17-consolidation-models', 'Systems consolidation · Standard model and multiple trace model', models, ['16:33', '16:36', '16:37'],
  'A schematic of the hippocampus and three cortical areas. Line thickness stands for connection strength and is illustrative; the slide figures show the same sequence on brain drawings.'),
 ('L17-reconsolidation', 'Reconsolidation · Nader, Hupbach and Brunet', reconsolidation, ['16:41', '16:42', '16:44'],
  'A timeline for each of the three studies with the outcome stated on its slide. The no-reminder and placebo rows give the comparison group; no data points are drawn.'),
]
