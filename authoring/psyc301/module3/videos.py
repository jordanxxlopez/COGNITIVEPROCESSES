"""Flat, code-drawn stimulus videos for Collection 16 (Long-Term Memory: Structure).

Each clip is a short sequence of drawn frames (Pillow) encoded with FFmpeg. They illustrate the task displays
and the direction of the results stated on the slides. They are reconstructions, not recordings of the
original experiments, and they do not administer calibrated experiments. Run:

    python authoring/psyc301/module3/videos.py

Writes psyc301-videos/clips/L16-*.mp4, psyc301-videos/posters/L16-*.jpg and psyc301-videos/module3-clips.js.
"""
import json, math, random, subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'psyc301-videos'
W, H = 1280, 720
BLUE, INK, GREY, BAR, SOFT, GREEN, RED, PALE = (31, 88, 135), (72, 84, 96), (155, 165, 175), (21, 101, 192), (232, 238, 245), (46, 140, 87), (200, 70, 60), (245, 247, 250)
FONT = '/System/Library/Fonts/Helvetica.ttc'


def font(size, bold=False):
    return ImageFont.truetype(FONT, size, index=1 if bold else 0)


def canvas(title=None):
    im = Image.new('RGB', (W, H), 'white')
    d = ImageDraw.Draw(im)
    if title:
        text(d, W / 2, 70, title, 40, BLUE, bold=True)
    return im, d


def text(d, x, y, s, size=30, fill=INK, bold=False, anchor='mm'):
    d.text((x, y), s, font=font(size, bold), fill=fill, anchor=anchor)


def box(d, x0, y0, x1, y1, fill=SOFT, outline=None, r=14, width=3):
    d.rounded_rectangle((x0, y0, x1, y1), radius=r, fill=fill, outline=outline, width=width)


def bars(d, groups, x0, y0, width, height, top, colors, labels=None, ylabel=None):
    """Simple grouped bars. groups: list of (name, [values])."""
    n = len(groups)
    slot = width / n
    d.line((x0, y0, x0 + width, y0), fill=GREY, width=3)
    for i, (name, values) in enumerate(groups):
        bw = min(70, slot / (len(values) + 1))
        start = x0 + slot * i + (slot - bw * len(values)) / 2
        for k, v in enumerate(values):
            hgt = height * v / top
            d.rectangle((start + bw * k + 4, y0 - hgt, start + bw * (k + 1) - 4, y0), fill=colors[k])
        text(d, x0 + slot * i + slot / 2, y0 + 30, name, 24)
    if labels:
        for k, lab in enumerate(labels):
            d.rectangle((x0 + width + 30, y0 - height + 40 * k, x0 + width + 54, y0 - height + 40 * k + 24), fill=colors[k])
            text(d, x0 + width + 64, y0 - height + 40 * k + 12, lab, 22, anchor='lm')
    if ylabel:
        text(d, x0, y0 - height - 28, ylabel, 22, GREY, anchor='lm')


# ---------------------------------------------------------------- clips
def serial_position():
    words = ['table', 'river', 'candle', 'garden', 'window', 'pencil', 'bridge', 'ticket', 'carpet', 'button',
             'ladder', 'basket', 'mirror', 'pillow', 'tunnel', 'jacket', 'bottle', 'hammer', 'saddle', 'lemon']
    frames = []
    im, d = canvas('Serial position · A list is read')
    text(d, W / 2, 360, 'Listen to the list.', 38)
    frames.append((im, 1.6))
    for i, w in enumerate(words):
        im, d = canvas('Serial position · A list is read')
        text(d, W / 2, 340, w, 76, INK, bold=True)
        text(d, W / 2, 620, f'word {i + 1} of {len(words)}', 24, GREY)
        frames.append((im, 0.65))
    im, d = canvas('Serial position · Recall')
    text(d, W / 2, 360, 'Write down all the words you remember.', 38)
    frames.append((im, 2.6))
    im, d = canvas('Where the recalled words came from')
    for i, w in enumerate(words):
        x = 120 + (i % 10) * 116
        y = 300 if i < 10 else 420
        strong = i < 3 or i >= 16
        box(d, x - 52, y - 28, x + 52, y + 28, fill=(214, 232, 250) if i < 3 else (214, 240, 224) if i >= 16 else PALE)
        text(d, x, y, w, 21, INK if strong else GREY, bold=strong)
    text(d, 236, 232, 'Primacy effect', 26, BAR, bold=True)
    text(d, 236, 204, 'first words · long-term memory', 20, GREY)
    text(d, 1050, 500, 'Recency effect', 26, GREEN, bold=True)
    text(d, 1050, 530, 'last words · short-term memory', 20, GREY)
    text(d, W / 2, 630, 'Middle words are recalled the least.', 26)
    frames.append((im, 6))
    return frames, len(frames) - 1


def recency_delay():
    frames = []
    for title, mid, last_ok in [('No delay before recall', None, True), ('30-second delay before recall', '30-second delay', False)]:
        steps = ['List ends'] + ([mid] if mid else []) + ['Recall']
        for upto in range(1, len(steps) + 1):
            im, d = canvas(title)
            x = 250 if mid else 400
            gap = 390 if mid else 480
            for k, s in enumerate(steps[:upto]):
                box(d, x + gap * k - 150, 220, x + gap * k + 150, 300, fill=SOFT)
                text(d, x + gap * k, 260, s, 28, INK, bold=True)
                if k:
                    d.line((x + gap * (k - 1) + 160, 260, x + gap * k - 160, 260), fill=GREY, width=4)
            frames.append((im, 1.5))
        im2 = im.copy()
        d = ImageDraw.Draw(im2)
        text(d, W / 2, 400, 'Last words in the list', 28, GREY)
        if last_ok:
            text(d, W / 2, 470, 'still in short-term memory, so they are recalled well', 32, GREEN, bold=True)
            text(d, W / 2, 560, 'Recency effect present', 34, INK, bold=True)
        else:
            text(d, W / 2, 470, 'recalled no better than the middle words', 32, RED, bold=True)
            text(d, W / 2, 560, 'Recency effect eliminated · primacy effect remains', 34, INK, bold=True)
        frames.append((im2, 4.5))
    return frames, len(frames) - 1


def wickens():
    fruit = [['banana', 'peach', 'apple'], ['plum', 'apricot', 'lime'], ['melon', 'lemon', 'grape'], ['orange', 'cherry', 'pineapple']]
    prof = [['lawyer', 'firefighter', 'teacher'], ['dancer', 'minister', 'executive'], ['grocer', 'doctor', 'editor'], ['orange', 'cherry', 'pineapple']]
    frames = []
    for name, trials in [('Fruits group', fruit), ('Professions followed by fruits', prof)]:
        for upto in range(1, 5):
            im, d = canvas(name)
            for t in range(upto):
                x = 190 + t * 300
                switch = name.startswith('Prof') and t == 3
                box(d, x - 125, 190, x + 125, 400, fill=(214, 240, 224) if switch else SOFT)
                for k, w in enumerate(trials[t]):
                    text(d, x, 240 + k * 55, w, 28, INK, bold=True)
                text(d, x, 440, f'Trial {t + 1}', 26, GREY)
            if upto == 4:
                if name.startswith('Prof'):
                    text(d, W / 2, 540, 'Category changes on Trial 4 · recall goes back up', 32, GREEN, bold=True)
                    text(d, W / 2, 600, 'Release from proactive interference', 30, INK, bold=True)
                else:
                    text(d, W / 2, 540, 'Same category on every trial · recall keeps dropping', 32, RED, bold=True)
                    text(d, W / 2, 600, 'Proactive interference', 30, INK, bold=True)
            frames.append((im, 4.5 if upto == 4 else 1.7))
    im, d = canvas('Percent recalled on each trial (approximate, from the figure)')
    for gi, (name, vals, col) in enumerate([('Fruits group', [86, 38, 32, 28], RED), ('Professions followed by fruits', [84, 33, 30, 70], GREEN)]):
        x0 = 150 + gi * 560
        d.line((x0, 560, x0 + 420, 560), fill=GREY, width=3)
        d.line((x0, 560, x0, 200), fill=GREY, width=3)
        pts = [(x0 + 60 + k * 100, 560 - 3.4 * v) for k, v in enumerate(vals)]
        d.line(pts, fill=col, width=6)
        for k, (px, py) in enumerate(pts):
            d.ellipse((px - 10, py - 10, px + 10, py + 10), fill=col)
            text(d, px, 590, str(k + 1), 22, GREY)
        text(d, x0 + 210, 640, name, 26, INK, bold=True)
    frames.append((im, 6))
    return frames, 7


def sachs():
    target = '“He sent a letter about it to Galileo, the great Italian scientist.”'
    tests = [('Semantic change · meaning altered', '“Galileo, the great Italian scientist, sent him a letter about it.”', 'Still detected after a delay', GREEN),
             ('Syntactic change · passive, meaning kept', '“A letter about it was sent to Galileo, the great Italian scientist.”', 'Not detected after a delay', RED),
             ('Formal change · word order, meaning kept', '“He sent Galileo, the great Italian scientist, a letter about it.”', 'Not detected after a delay', RED)]
    frames = []
    im, d = canvas('Sachs (1967) · Target sentence in a recorded passage')
    box(d, 110, 280, W - 110, 400)
    text(d, W / 2, 340, target, 28, INK, bold=True)
    frames.append((im, 4))
    im, d = canvas('Sachs (1967) · Delay before the surprise test')
    for k, (lab, sub) in enumerate([('0 syllables', 'immediate'), ('80 syllables', 'about 27 seconds'), ('160 syllables', 'about 46 seconds')]):
        x = 260 + k * 380
        box(d, x - 150, 280, x + 150, 420)
        text(d, x, 330, lab, 32, INK, bold=True)
        text(d, x, 380, sub, 24, GREY)
    frames.append((im, 3.5))
    for upto in range(1, 4):
        for reveal in (False, True):
            im, d = canvas('Identical to the sentence you heard, or changed?')
            for k, (lab, sent, res, col) in enumerate(tests[:upto]):
                y = 190 + k * 165
                text(d, 110, y, lab, 24, BLUE, bold=True, anchor='lm')
                box(d, 100, y + 22, W - 100, y + 92, fill=PALE)
                text(d, W / 2, y + 57, sent, 25)
                if reveal or k < upto - 1:
                    text(d, W - 110, y, res, 24, col, bold=True, anchor='rm')
            frames.append((im, 2.6 if reveal else 2.2))
    im, d = canvas('Sachs (1967) · Result')
    text(d, W / 2, 300, 'After 80 or 160 syllables, memory for meaning stayed high (about 80%).', 30)
    text(d, W / 2, 360, 'Memory for exact wording fell to near chance.', 30)
    text(d, W / 2, 470, 'Long-term memory stores the gist, not the verbatim words.', 34, INK, bold=True)
    frames.append((im, 5))
    return frames, 7


def dissociations():
    frames = []
    for title, cols, rows in [('A double dissociation for STM and LTM', ['Short-term memory', 'Long-term memory'], [('H.M. and Clive Wearing', ['OK', 'Impaired']), ('K.F.', ['Impaired', 'OK'])]),
                              ('A double dissociation for semantic and episodic memory', ['Semantic memory', 'Episodic memory'], [('K.C.', ['OK', 'Poor']), ('Italian woman L.P.', ['Poor', 'OK'])])]:
        for upto in range(0, 3):
            im, d = canvas(title)
            for k, c in enumerate(cols):
                text(d, 640 + k * 330, 220, c, 28, BLUE, bold=True)
            for r, (who, vals) in enumerate(rows[:upto]):
                y = 320 + r * 130
                box(d, 90, y - 50, W - 90, y + 50, fill=PALE)
                text(d, 130, y, who, 30, INK, bold=True, anchor='lm')
                for k, v in enumerate(vals):
                    text(d, 640 + k * 330, y, v, 34, GREEN if v == 'OK' else RED, bold=True)
            if upto == 2:
                text(d, W / 2, 620, 'Opposite patterns · the two functions rely on different mechanisms', 28)
            frames.append((im, 1.2 if upto == 0 else 2.6 if upto == 1 else 4.5))
    return frames, 2


def remember_know():
    frames = []
    im, d = canvas('Remember/know procedure')
    text(d, W / 2, 200, 'For each event, choose one answer.', 30)
    for k, (lab, sub, col) in enumerate([('Remember', 'I can recall the circumstances · episodic', GREEN), ('Know', 'It is familiar, but I cannot recall the circumstances · semantic', BAR), ('Don’t know', 'I do not remember it', RED)]):
        y = 300 + k * 110
        box(d, 150, y - 42, W - 150, y + 42, fill=PALE)
        text(d, 190, y, lab, 32, col, bold=True, anchor='lm')
        text(d, 430, y, sub, 24, anchor='lm')
    frames.append((im, 6))
    for upto in (1, 2):
        im, d = canvas('Proportion of events (approximate, from the figure)')
        groups = [('10 years or less', [0.35, 0.53, 0.10]), ('40–50 years ago', [0.15, 0.47, 0.35])][:upto]
        bars(d, groups + [('', [0, 0, 0])] * (2 - upto), 200, 560, 700, 330, 0.6, [GREEN, BAR, RED], labels=['Remember', 'Know', 'Don’t know'])
        if upto == 2:
            text(d, W / 2, 660, '“Remember” drops for old events · “know” stays about the same', 28, INK, bold=True)
        frames.append((im, 3 if upto == 1 else 6))
    return frames, 2


def star_points(cx, cy, r_out, r_in):
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        r = r_out if i % 2 == 0 else r_in
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts


def mirror_tracing():
    frames = []
    rng = random.Random(16)
    outer, inner = star_points(W / 2, 390, 230, 95), star_points(W / 2, 390, 190, 72)
    mid = [((a[0] + b[0]) / 2, (a[1] + b[1]) / 2) for a, b in zip(outer, inner)]
    path = []
    for i in range(10):
        a, b = mid[i], mid[(i + 1) % 10]
        for t in range(12):
            path.append((a[0] + (b[0] - a[0]) * t / 12, a[1] + (b[1] - a[1]) * t / 12))
    for day, wobble, quote in [('Day 1', 22, None), ('Day 2', 10, 'H.M. says he has never seen the task before.'), ('Day 3', 3, 'H.M. says he has never seen the task before.')]:
        traced = [(x + rng.uniform(-wobble, wobble), y + rng.uniform(-wobble, wobble)) for x, y in path]
        for upto in range(8, len(traced) + 1, 8):
            im, d = canvas(f'Mirror tracing · {day}')
            d.polygon(outer, outline=INK, width=4)
            d.polygon(inner, outline=INK, width=4)
            d.line(traced[:upto], fill=RED if wobble > 15 else BAR if wobble > 5 else GREEN, width=5, joint='curve')
            text(d, W / 2, 660, 'Trace between the two lines, seeing the hand only in a mirror.', 24, GREY)
            frames.append((im, 0.22))
        im2 = im.copy()
        d = ImageDraw.Draw(im2)
        d.line(traced + traced[:1], fill=RED if wobble > 15 else BAR if wobble > 5 else GREEN, width=5, joint='curve')
        text(d, 190, 200, 'many errors' if wobble > 15 else 'fewer errors' if wobble > 5 else 'almost no errors', 28, INK, bold=True)
        if quote:
            text(d, W / 2, 130, quote, 30, BLUE, bold=True)
        frames.append((im2, 3 if not quote else 5))
    return frames, len(frames) - 1


def graf():
    frames = []
    for i, w in enumerate(['MOTEL', 'STUDY', 'WINDOW']):
        im, d = canvas('Graf and colleagues (1985) · Study phase')
        text(d, W / 2, 320, w, 84, INK, bold=True)
        text(d, W / 2, 470, 'How much do you like this word?', 30, GREY)
        frames.append((im, 2))
    for title, instr, col in [('Explicit test · cued recall', 'Use this stem as a clue to recall a word from the list.', BAR), ('Implicit test · word-stem completion', 'Complete this stem with the first word that comes to mind.', GREEN)]:
        im, d = canvas(title)
        text(d, W / 2, 320, 'MOT _ _', 84, INK, bold=True)
        text(d, W / 2, 470, instr, 30, col, bold=True)
        text(d, W / 2, 540, 'The stem is the same in both tests.', 24, GREY)
        frames.append((im, 5))
    im, d = canvas('Percent of studied words (approximate, from the figure)')
    for gi, (name, vals) in enumerate([('Recall (explicit)', [37, 37, 15]), ('Implicit memory test', [40, 41, 43])]):
        x0 = 130 + gi * 580
        d.line((x0, 540, x0 + 440, 540), fill=GREY, width=3)
        for k, (lab, v) in enumerate(zip(['INPT', 'ALC', 'AMN'], vals)):
            x = x0 + 60 + k * 130
            d.rectangle((x - 40, 540 - 6.2 * v, x + 40, 540), fill=[(240, 150, 90), (110, 70, 160), GREEN][k])
            text(d, x, 570, lab, 24)
        text(d, x0 + 220, 180, name, 28, INK, bold=True)
    text(d, W / 2, 650, 'Amnesic patients (AMN) are impaired only on the explicit test.', 28, INK, bold=True)
    frames.append((im, 7))
    return frames, 4


def perfect_askew():
    frames = []
    im, d = canvas('Perfect and Askew (1994) · Flip through a magazine')
    box(d, 240, 150, 700, 640, fill=PALE, outline=GREY)
    text(d, 470, 200, 'ARTICLE', 26, INK, bold=True)
    for k in range(9):
        d.line((280, 250 + k * 40, 660, 250 + k * 40), fill=GREY, width=5)
    box(d, 760, 150, 1040, 420, fill=(255, 240, 214), outline=(220, 160, 60))
    text(d, 900, 250, 'AD', 44, (190, 120, 30), bold=True)
    text(d, 900, 320, 'unfamiliar brand', 22, GREY)
    text(d, 900, 500, 'Incidental group', 26, INK, bold=True)
    text(d, 900, 540, 'told only to read the articles', 22, GREY)
    frames.append((im, 6))
    im, d = canvas('Test · 25 seen ads mixed with 25 new ads')
    for k, (lab, sub, col) in enumerate([('Explicit test · recognition', 'Which ads do you remember seeing?', BAR), ('Implicit test · liking rating', 'How appealing is each ad, from 1 to 7?', GREEN)]):
        y = 280 + k * 170
        box(d, 170, y - 60, W - 170, y + 60, fill=PALE)
        text(d, W / 2, y - 18, lab, 32, col, bold=True)
        text(d, W / 2, y + 26, sub, 26)
    frames.append((im, 6))
    im, d = canvas('Perfect and Askew (1994) · Result for the incidental group')
    text(d, W / 2, 250, 'Recognized only about 11% of the ads they had flipped past', 32, RED, bold=True)
    text(d, W / 2, 340, 'Rated the ads they had seen as more appealing than new ads', 32, GREEN, bold=True)
    text(d, W / 2, 480, 'The propaganda effect works through implicit memory.', 34, INK, bold=True)
    frames.append((im, 7))
    return frames, 2


def ltm_types():
    frames = []
    nodes = [('LONG-TERM MEMORY', W / 2, 170, None), ('EXPLICIT', 380, 310, 0), ('IMPLICIT', 900, 310, 0),
             ('Episodic', 250, 470, 1), ('Semantic', 510, 470, 1), ('Procedural memory', 720, 470, 2), ('Priming', 930, 470, 2), ('Conditioning', 1120, 470, 2)]
    subs = {1: '(conscious)', 2: '(not conscious)', 3: '(personal events)', 4: '(facts, knowledge)'}
    for upto in (1, 3, 5, 8):
        im, d = canvas('Types of long-term memory')
        for i, (lab, x, y, parent) in enumerate(nodes[:upto]):
            if parent is not None:
                px, py = nodes[parent][1], nodes[parent][2]
                d.line((px, py + 34, x, y - 30), fill=BAR, width=4)
        for i, (lab, x, y, parent) in enumerate(nodes[:upto]):
            text(d, x, y, lab, 30 if i < 3 else 26, INK, bold=i < 3)
            if i in subs:
                text(d, x, y + 34, subs[i], 22, GREY)
        frames.append((im, 2.2 if upto < 8 else 6))
    return frames, 3


CLIPS = [
 ('L16-serial-position', 'Serial position · Primacy and recency', serial_position, ['15:5', '15:6', '15:7'],
  'A 20-word list is shown one word at a time, followed by the recall instruction and a map of which positions are recalled best. The words, the timing and the number of shaded positions are illustrative; in the study the list was read aloud.'),
 ('L16-recency-delay', 'Serial position · No delay vs 30-second delay', recency_delay, ['15:7'],
  'Two timelines compare recall with no delay and with a 30-second delay. The outcome labels state the result on the slide. No data points are drawn.'),
 ('L16-wickens-release', 'Wickens and colleagues (1976) · Release from proactive interference', wickens, ['15:9', '15:10'],
  'The four trials for each group use the word triples shown on the slide. The final chart redraws the approximate values from the slide figure.'),
 ('L16-sachs-sentences', 'Sachs (1967) · Meaning and wording', sachs, ['15:12', '15:13'],
  'The target sentence, the three delays and the three changed test sentences are the ones given on the slide. In the study the passages were heard, not read. Outcome labels state the result on the slide.'),
 ('L16-double-dissociations', 'Double dissociations · H.M. and K.F., K.C. and L.P.', dissociations, ['15:16', '15:20', '15:15', '15:19'],
  'The two patient tables from the slides are built one row at a time.'),
 ('L16-remember-know', 'Remember/know · Recent and remote events', remember_know, ['15:24', '15:25'],
  'The three answers are shown, then bars redraw the approximate proportions from the slide figure for events from 10 years or less and from 40 to 50 years ago.'),
 ('L16-mirror-tracing', 'H.M. · Mirror tracing across three days', mirror_tracing, ['15:30', '15:31'],
  'A star with a double outline is traced on three days, with fewer errors each day. On the second and third days a caption states that H.M. says he has never seen the task. The traced paths are illustrative and are not H.M.’s data. The view is not mirror-reversed.'),
 ('L16-graf-word-stems', 'Graf and colleagues (1985) · Explicit and implicit tests', graf, ['15:33', '15:34', '15:35'],
  'Study words and the stem MOT are the examples on the slide. The final chart redraws the approximate values from the slide figure for the three groups.'),
 ('L16-perfect-askew-ads', 'Perfect and Askew (1994) · Ads and the propaganda effect', perfect_askew, ['15:37', '15:38'],
  'A schematic magazine page, the two tests and the stated result for the incidental group. The page layout is illustrative; no real advertisement is shown.'),
 ('L16-ltm-types', 'Types of long-term memory · Explicit and implicit', ltm_types, ['15:27', '15:29'],
  'The diagram of explicit and implicit memory from the slide is built one level at a time.'),
]


def encode(clip_id, frames, poster_index):
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        lines = []
        for i, (im, seconds) in enumerate(frames):
            im.save(tmp / f'{i:04}.png')
            lines += [f"file '{tmp / f'{i:04}.png'}'", f'duration {seconds}']
        lines.append(f"file '{tmp / f'{len(frames) - 1:04}.png'}'")
        (tmp / 'list.txt').write_text('\n'.join(lines))
        total = sum(s for _, s in frames)
        out = OUT / 'clips' / f'{clip_id}.mp4'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', str(tmp / 'list.txt'),
                        '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-vf', 'fps=60,format=yuv420p', '-c:v', 'libx264', '-crf', '24',
                        '-preset', 'medium', '-c:a', 'aac', '-b:a', '32k', '-t', f'{total:.2f}', '-movflags', '+faststart', str(out)], check=True)
        frames[poster_index][0].save(OUT / 'posters' / f'{clip_id}.jpg', quality=85)
        return round(total)


def main():
    """Render clips. With no argument, only clips whose .mp4 is missing are encoded, so earlier lectures' files stay
    byte-identical. Pass a clip-id prefix (for example L17) to re-encode those clips."""
    import sys
    import videos_enc
    force = sys.argv[1] if len(sys.argv) > 1 else None
    sets = [(CLIPS, 'Long-term memory', 'Stimulus video (long-term memory)', 'authoring/psyc301/module3/videos.py'),
            (videos_enc.CLIPS, videos_enc.GROUP, 'Stimulus video (encoding and retrieval)', 'authoring/psyc301/module3/videos_enc.py')]
    manifest = []
    for clips, group, kind, source in sets:
        for clip_id, title, build, refs, method in clips:
            frames, poster = build()
            out = OUT / 'clips' / f'{clip_id}.mp4'
            if not out.exists() or (force and clip_id.startswith(force)):
                encode(clip_id, frames, poster)
                print('encoded', clip_id, out.stat().st_size // 1024, 'KB')
            manifest.append(dict(id=clip_id, title=title, group=group, refs=refs, kind=kind, duration=round(sum(s for _, s in frames)),
                                 method=method, source=source, params={}, file=f'psyc301-videos/clips/{clip_id}.mp4',
                                 poster=f'psyc301-videos/posters/{clip_id}.jpg', fps=60))
    (OUT / 'module3-clips.js').write_text('// Module III stimulus videos (Collections 16 and 17, slides 15:x and 16:x). Built by authoring/psyc301/module3/videos.py.\n'
                                          '(function(){ if(!window.PsycVideos) return; const extra = ' + json.dumps(manifest, ensure_ascii=False, indent=1)
                                          + ';\n window.PsycVideos.clips.push(...extra); })();\n', encoding='utf8')
    print(len(manifest), 'clips in module3-clips.js')


if __name__ == '__main__':
    main()
