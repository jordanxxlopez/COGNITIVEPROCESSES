"""Flat, code-drawn stimulus videos for Module I (Collections 01 to 08).

Uses the drawing and encoding helpers in authoring/psyc301/module3/videos.py. Each clip shows a task display,
a model built step by step, or values stated on the slides. They are reconstructions, not recordings of the
original experiments, and they do not administer calibrated experiments. Run:

    python authoring/psyc301/module1/videos_m1.py          # encodes clips whose .mp4 is missing
    python authoring/psyc301/module1/videos_m1.py M1-tol   # re-encodes clips whose id starts with M1-tol

Writes psyc301-videos/clips/M1-*.mp4, psyc301-videos/posters/M1-*.jpg and psyc301-videos/module1-clips.js.
"""
import json, math, random, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'module3'))
from PIL import ImageDraw
from videos import W, H, BLUE, INK, GREY, BAR, SOFT, GREEN, RED, PALE, canvas, text, box, bars, encode, OUT

ORANGE, YELLOW, PURPLE = (230, 140, 40), (240, 200, 40), (120, 80, 170)


def steps(title, lines, first=2.2, last=5.0, size=32, top=190, gap=78):
    """Text built one line at a time. lines: str or (str, colour, bold)."""
    frames = []
    for upto in range(1, len(lines) + 1):
        im, d = canvas(title)
        for k, line in enumerate(lines[:upto]):
            s, col, bold = (line, INK, False) if isinstance(line, str) else line
            text(d, W / 2, top + k * gap, s, size, col, bold)
        frames.append((im, first if upto < len(lines) else last))
    return frames


def flow(d, labels, y=360, colors=None, highlight=None, x0=90, x1=1190):
    n = len(labels)
    w = (x1 - x0 - 40 * (n - 1)) / n
    for i, lab in enumerate(labels):
        a = x0 + i * (w + 40)
        fill = (colors[i] if colors else SOFT) if highlight is None or i in highlight else PALE
        box(d, a, y - 55, a + w, y + 55, fill=fill, outline=BLUE if highlight and i in highlight else None)
        for j, part in enumerate(lab.split('\n')):
            text(d, a + w / 2, y - 12 * (lab.count('\n')) + 26 * j, part, 24, INK, True)
        if i < n - 1:
            d.line((a + w + 4, y, a + w + 36, y), fill=GREY, width=4)
            d.polygon([(a + w + 36, y), (a + w + 26, y - 8), (a + w + 26, y + 8)], fill=GREY)


# ---------------------------------------------------------------- Collection 01
def ebbinghaus():
    frames = []
    rows = [('19 minutes', 400, 600), ('1 day', 650, 350), ('6 days', 730, 270)]
    for upto in range(0, 4):
        im, d = canvas('Ebbinghaus (1885/1913) · Savings')
        text(d, W / 2, 150, 'Original learning time = 1,000 seconds', 30, INK, True)
        text(d, W / 2, 200, 'Savings = original time − relearning time', 28, GREY)
        for k, (delay, relearn, saved) in enumerate(rows[:upto]):
            y = 290 + k * 90
            text(d, 260, y, delay, 30, INK, True)
            text(d, 620, y, f'relearn {relearn} s', 28)
            text(d, 990, y, f'saved {saved} s ({saved // 10}%)', 30, GREEN, True)
        frames.append((im, 2.5 if upto < 3 else 3.5))
    im, d = canvas('The savings curve')
    x0, y0, x1 = 220, 560, 1100
    d.line((x0, y0, x1, y0), fill=GREY, width=3); d.line((x0, y0, x0, 180), fill=GREY, width=3)
    pts = [(0.03, 600), (0.35, 350), (0.95, 270)]
    xy = [(x0 + p * (x1 - x0), y0 - v * 0.6) for p, v in pts]
    d.line(xy, fill=BAR, width=5)
    for (x, y), (_, v), lab in zip(xy, pts, ['19 min', '1 day', '6 days']):
        d.ellipse((x - 9, y - 9, x + 9, y + 9), fill=BAR)
        text(d, x, y - 34, f'{v // 10}%', 24, INK, True); text(d, x, y0 + 30, lab, 22, GREY)
    text(d, W / 2, 650, 'Savings drops rapidly at first and then more slowly.', 30, INK, True)
    frames.append((im, 6))
    return frames, 3


def maze(d, food=True, start=None, arrow=None):
    cx, cy, L, w = W / 2, 370, 200, 70
    d.rectangle((cx - w / 2, cy - L, cx + w / 2, cy + L), fill=SOFT)
    d.rectangle((cx - L, cy - w / 2, cx + L, cy + w / 2), fill=SOFT)
    for lab, (x, y) in {'A': (cx, cy + L + 30), 'B': (cx + L + 30, cy), 'C': (cx, cy - L - 30), 'D': (cx - L - 30, cy)}.items():
        text(d, x, y, lab, 30, INK, True)
    if food:
        d.ellipse((cx + L - 50, cy - 18, cx + L - 14, cy + 18), fill=ORANGE)
    if start:
        x, y = {'A': (cx, cy + L - 40), 'C': (cx, cy - L + 40)}[start]
        d.ellipse((x - 16, y - 16, x + 16, y + 16), fill=INK)
    if arrow:
        d.line(arrow, fill=RED, width=7)


def tolman():
    cx, cy = W / 2, 370
    frames = []
    im, d = canvas('Tolman (1938) · First the rat explores the maze'); maze(d, food=False); frames.append((im, 3))
    im, d = canvas('Trained from arm A, food in arm B'); maze(d, start='A'); frames.append((im, 2.5))
    im, d = canvas('From A, the rat learns to turn right'); maze(d, start='A', arrow=[(cx, cy + 160), (cx, cy), (cx + 160, cy)]); frames.append((im, 3.5))
    im, d = canvas('Now the rat starts in arm C'); maze(d, start='C'); frames.append((im, 2.5))
    im, d = canvas('A learned “turn right” would lead away from the food'); maze(d, start='C', arrow=[(cx, cy - 160), (cx, cy), (cx - 160, cy)])
    text(d, W / 2, 680, 'Prediction of the response account', 26, GREY); frames.append((im, 3.5))
    im, d = canvas('The rat turned left and reached the same food'); maze(d, start='C', arrow=[(cx, cy - 160), (cx, cy), (cx + 160, cy)])
    text(d, W / 2, 680, 'Tolman concluded the rat had a cognitive map of the maze.', 28, INK, True); frames.append((im, 5))
    return frames, 5


def ears(d, left, right, attended='left'):
    d.ellipse((W / 2 - 90, 280, W / 2 + 90, 460), outline=INK, width=4)
    for side, msg, x in (('left', left, 260), ('right', right, 1020)):
        col = BAR if side == attended else GREY
        box(d, x - 200, 320, x + 200, 420, fill=SOFT if side == attended else PALE)
        text(d, x, 370, msg, 28, col, side == attended)
        text(d, x, 450, ('Attended ear · shadowed' if side == attended else 'Unattended ear'), 22, GREY)


def cherry():
    frames = []
    for l, r in [('“The ship sailed…”', '“Prices rose…”'), ('“…into the harbor…”', '“…in the market…”')]:
        im, d = canvas('Cherry (1953) · Dichotic listening'); ears(d, l, r)
        text(d, W / 2, 560, 'Repeat the left message aloud as it arrives.', 28); frames.append((im, 3))
    im, d = canvas('What could be reported from the unattended ear?')
    for k, (s, c) in enumerate([('Content of the message: little or nothing', RED), ('That there was a message: yes', GREEN),
                                ('The speaker’s gender, and a change of gender or a tone: yes', GREEN)]):
        text(d, W / 2, 230 + k * 100, s, 30, c, True)
    frames.append((im, 6))
    return frames, 0


def broadbent():
    labels = ['Sensory\nmemory', 'Filter', 'Detector', 'Short-term\nmemory']
    notes = ['Holds all input for a fraction of a second', 'Passes the attended message by physical features', 'Analyzes meaning of what got through', 'Holds information for about 10 to 15 seconds']
    frames = []
    for k in range(4):
        im, d = canvas('Broadbent (1958) · Filter model')
        flow(d, labels, highlight=set(range(k + 1)))
        text(d, W / 2, 540, notes[k], 30, INK, True)
        frames.append((im, 3))
    im, d = canvas('An early selection, bottleneck model')
    flow(d, labels)
    text(d, W / 2, 530, 'Only the attended message passes the filter.', 30, INK, True)
    text(d, W / 2, 590, 'Selection happens before meaning is analyzed.', 28, GREY)
    frames.append((im, 5))
    return frames, 4


def conditioning():
    f = steps('Classical vs operant conditioning', [
        ('Classical conditioning · two stimuli', BLUE, True), 'Little Albert (Watson and Rayner, 1920): rat + loud noise',
        'After the pairings, the rat alone caused fear', ('Operant conditioning · action and consequence', BLUE, True),
        'Skinner: reinforcement makes a behavior more likely', 'Punishment makes a behavior less likely'], size=30, gap=80)
    return f, len(f) - 1


# ---------------------------------------------------------------- Collections 02 and 03
def inverse_projection():
    frames = []
    for upto in range(1, 4):
        im, d = canvas('The inverse projection problem')
        ex, ey = 150, 380
        d.ellipse((ex - 40, ey - 40, ex + 40, ey + 40), outline=INK, width=4)
        text(d, ex, ey + 70, 'Eye', 24, GREY)
        objs = [(400, 40, 'Small, near'), (720, 90, 'Medium'), (1080, 150, 'Large, far')]
        for x, h, lab in objs[:upto]:
            d.line((ex + 40, ey, x, ey - h), fill=GREY, width=2); d.line((ex + 40, ey, x, ey + h), fill=GREY, width=2)
            d.rectangle((x - 10, ey - h, x + 10, ey + h), fill=[BAR, GREEN, ORANGE][objs.index((x, h, lab))])
            text(d, x, ey + h + 34, lab, 24)
        text(d, W / 2, 640, 'Each object casts the same image on the retina.', 30, INK, True)
        frames.append((im, 3 if upto < 3 else 5))
    return frames, 2


def shaded_disc(d, cx, cy, r, up=True):
    for i in range(r, 0, -2):
        t = i / r
        for yy in range(-i, i + 1, 2):
            pass
    for k in range(2 * r):
        frac = k / (2 * r)
        g = int(235 - 170 * frac) if up else int(65 + 170 * frac)
        y = cy - r + k
        half = math.sqrt(max(0, r * r - (y - cy) ** 2))
        d.line((cx - half, y, cx + half, y), fill=(g, g, g))


def bumps():
    frames = []
    for title, up, cap in [('Light at the top, dark at the bottom', True, 'Seen as bumps'), ('The same image rotated 180 degrees', False, 'Seen as dents')]:
        im, d = canvas(title)
        d.rectangle((0, 130, W, H), fill=(150, 150, 150))
        for x in (300, 640, 980):
            shaded_disc(d, x, 380, 110, up)
        frames.append((im, 3))
        im2 = im.copy(); d2 = ImageDraw.Draw(im2)
        text(d2, W / 2, 620, cap, 36, (255, 255, 255), True)
        frames.append((im2, 3.5))
    im, d = canvas('The light-from-above assumption')
    text(d, W / 2, 260, 'The image alone fits a bump lit from above or a dent lit from below.', 28)
    text(d, W / 2, 340, 'The prior that light comes from above favors the bump.', 30, INK, True)
    frames.append((im, 5))
    return frames, 1


def rings():
    frames = []
    cols = [BAR, INK, RED, YELLOW, GREEN]
    centers = [(430, 330), (640, 330), (850, 330), (535, 430), (745, 430)]
    im, d = canvas('Prägnanz · the Olympic symbol')
    for (x, y), c in zip(centers, cols):
        d.ellipse((x - 95, y - 95, x + 95, y + 95), outline=c, width=12)
    frames.append((im, 3))
    im2 = im.copy(); d2 = ImageDraw.Draw(im2)
    text(d2, W / 2, 620, 'Seen as five overlapping circles', 34, INK, True); frames.append((im2, 3.5))
    im3 = im.copy(); d3 = ImageDraw.Draw(im3)
    text(d3, W / 2, 620, 'Not as nine irregular shapes fitted together, though that also fits the lines', 28, GREY)
    text(d3, W / 2, 670, 'The pattern is organized so the result is as simple as possible.', 28, INK, True); frames.append((im3, 5))
    return frames, 1


def continuation():
    frames = []
    im, d = canvas('Good continuation')
    pts = [(200 + x, 380 + 120 * math.sin(x / 90)) for x in range(0, 880, 8)]
    d.line(pts, fill=BAR, width=8)
    d.line([(200, 260), (1080, 500)], fill=ORANGE, width=8)
    frames.append((im, 3))
    im2 = im.copy(); d2 = ImageDraw.Draw(im2)
    text(d2, W / 2, 640, 'Seen as one wavy line and one straight line, each following the smoothest path', 28, INK, True); frames.append((im2, 4))
    im3, d3 = canvas('A contour that goes behind an object is seen as continuing')
    d3.line(pts, fill=BAR, width=8); box(d3, 520, 220, 760, 560, fill=GREY)
    frames.append((im3, 4.5))
    return frames, 1


def bayes_cough():
    frames = []
    rows = [('Cold', 'high', 'high'), ('Lung disease', 'lower', 'not stated'), ('Heartburn', 'not stated', 'lower')]
    for upto in range(1, 4):
        im, d = canvas('Bayesian inference · Mary’s cough')
        text(d, 330, 170, 'Hypothesis', 28, GREY, True); text(d, 640, 170, 'Prior', 28, GREY, True); text(d, 950, 170, 'Likelihood of a cough', 28, GREY, True)
        for k, (h, p, l) in enumerate(rows[:upto]):
            y = 260 + k * 100
            text(d, 330, y, h, 32, INK, True)
            colour = lambda v: GREEN if v == 'high' else RED if v == 'lower' else GREY
            text(d, 640, y, p, 32, colour(p), True); text(d, 950, y, l, 32, colour(l), True)
        frames.append((im, 3))
    im2 = im.copy(); d2 = ImageDraw.Draw(im2)
    text(d2, W / 2, 600, 'Posterior ∝ prior × likelihood, so the most likely cause is a cold.', 30, INK, True)
    frames.append((im2, 5))
    return frames, 3


def palmer():
    frames = []
    im, d = canvas('Palmer (1975) · Context scene, 2 seconds')
    box(d, 300, 170, 980, 560, fill=SOFT)
    text(d, W / 2, 260, 'A kitchen', 40, INK, True)
    for x, lab in [(420, 'counter'), (640, 'stove'), (860, 'cabinets')]:
        box(d, x - 80, 380, x + 80, 500, fill=PALE); text(d, x, 440, lab, 22, GREY)
    frames.append((im, 3))
    for obj, fit in [('Loaf of bread', True), ('Mailbox', False)]:
        im, d = canvas('Then a briefly flashed object')
        box(d, 470, 260, 810, 460, fill=SOFT); text(d, W / 2, 360, obj, 36, INK, True)
        text(d, W / 2, 560, 'Appropriate for the context' if fit else 'Inappropriate for the context', 30, GREEN if fit else RED, True)
        frames.append((im, 3))
    im, d = canvas('Result')
    text(d, W / 2, 260, 'Objects were identified most accurately after an appropriate context.', 30, INK, True)
    text(d, W / 2, 340, 'Accuracy was worst after an inappropriate context.', 30, INK, True)
    text(d, W / 2, 440, 'A scene schema guides object recognition.', 28, GREY)
    frames.append((im, 5))
    return frames, 1


def blakemore():
    frames = []
    im, d = canvas('Blakemore and Cooper (1970) · Rearing environment')
    for k in range(14):
        x = 340 + k * 43
        d.rectangle((x, 160, x + 21, 600), fill=INK)
    text(d, W / 2, 660, 'Kittens lived in a space with only vertical black and white stripes.', 28, INK, True)
    frames.append((im, 4))
    im, d = canvas('Later, a stick is moved in front of them')
    d.line((420, 230, 420, 520), fill=BAR, width=14); text(d, 420, 580, 'Vertical stick: batted at it', 28, GREEN, True)
    d.line((740, 380, 1040, 380), fill=BAR, width=14); text(d, 890, 580, 'Horizontal stick: ignored', 28, RED, True)
    frames.append((im, 4.5))
    im, d = canvas('Neurons in their visual cortex')
    text(d, W / 2, 300, 'responded mainly to vertical orientations.', 34, INK, True)
    text(d, W / 2, 400, 'Experience changes the structure of the brain, which is experience-dependent plasticity.', 28, GREY)
    frames.append((im, 5))
    return frames, 0


def garner():
    frames = []
    for title, pair, varied, res in [('Integral dimensions · brightness and saturation', 'Classify by brightness', 'Saturation varies from trial to trial', 'Responses slow: Garner interference'),
                                     ('Separable dimensions · shape and color', 'Classify by shape', 'Color varies from trial to trial', 'Little or no cost')]:
        im, d = canvas(title)
        text(d, W / 2, 200, pair, 32, INK, True); text(d, W / 2, 260, varied, 28, GREY)
        if 'shape' in pair:
            for k, (shape, col) in enumerate([('c', RED), ('s', GREEN), ('c', BAR), ('s', ORANGE)]):
                x = 350 + k * 190
                (d.ellipse if shape == 'c' else d.rectangle)((x - 60, 340, x + 60, 460), fill=col)
        else:
            for k, col in enumerate([(70, 90, 160), (150, 160, 200), (60, 60, 200), (140, 140, 230)]):
                x = 350 + k * 190
                d.rectangle((x - 60, 340, x + 60, 460), fill=col)
        text(d, W / 2, 570, res, 32, RED if 'slow' in res else GREEN, True)
        frames.append((im, 5))
    return frames, 0


def pathways():
    frames = []
    im, d = canvas('Two visual pathways')
    d.ellipse((250, 180, 1030, 600), outline=GREY, width=4)
    text(d, 960, 470, 'Occipital', 26, INK, True)
    d.line((930, 440, 560, 300), fill=GREEN, width=12); text(d, 520, 260, 'Dorsal · where/how · parietal', 26, GREEN, True)
    d.line((930, 470, 560, 520), fill=BAR, width=12); text(d, 520, 565, 'Ventral · what · temporal', 26, BAR, True)
    frames.append((im, 4.5))
    for title, ok, cap in [('D.F. (ventral damage) · match the slot’s orientation', False, 'Could not report or match it'),
                           ('D.F. · post the card through the slot', True, 'Posted the card accurately')]:
        im, d = canvas(title)
        d.rectangle((560, 200, 720, 520), fill=SOFT)
        d.polygon([(600, 330), (690, 300), (700, 320), (610, 350)], fill=INK)
        if ok:
            d.polygon([(470, 420), (640, 360), (650, 380), (480, 440)], fill=ORANGE)
        else:
            d.polygon([(860, 380), (1000, 380), (1000, 400), (860, 400)], fill=ORANGE)
        text(d, W / 2, 600, cap, 32, GREEN if ok else RED, True)
        frames.append((im, 4))
    return frames, 0


# ---------------------------------------------------------------- Collection 04
def attenuator():
    frames = []
    im, d = canvas('Treisman (1964) · Attenuation')
    flow(d, ['Attenuator', 'Dictionary\nunit'], y=330, x0=360, x1=920)
    d.line((140, 300, 360, 300), fill=BAR, width=14); text(d, 240, 270, 'Attended', 24, BAR, True)
    d.line((140, 360, 360, 360), fill=GREY, width=4); text(d, 240, 395, 'Unattended', 24, GREY)
    text(d, W / 2, 500, 'The unattended message is weakened, not removed.', 30, INK, True)
    frames.append((im, 4.5))
    words = [('your name', 0.2), ('fire', 0.3), ('boat', 0.7), ('platypus', 0.9)]
    for show in range(1, len(words) + 1):
        im, d = canvas('Dictionary unit · each word has a threshold')
        for k, (w, th) in enumerate(words[:show]):
            x = 260 + k * 250
            d.rectangle((x - 50, 560 - 300, x + 50, 560), outline=GREY, width=3)
            d.rectangle((x - 50, 560 - 300 * th - 4, x + 50, 560 - 300 * th + 4), fill=RED)
            text(d, x, 600, w, 26, INK, True)
            text(d, x, 220, 'low' if th < 0.5 else 'high', 24, GREEN if th < 0.5 else RED, True)
        frames.append((im, 2.5 if show < len(words) else 3))
    im2 = im.copy(); d2 = ImageDraw.Draw(im2)
    text(d2, W / 2, 660, 'A weak message can still activate a word with a low threshold.', 28, INK, True)
    frames.append((im2, 5))
    return frames, 0


def mackay():
    frames = []
    im, d = canvas('MacKay (1973)')
    ears(d, '“…stones at the bank”', '“river”')
    frames.append((im, 3.5))
    im, d = canvas('MacKay (1973)')
    ears(d, '“…stones at the bank”', '“money”')
    frames.append((im, 3.5))
    im, d = canvas('Which sentence is closest in meaning?')
    text(d, W / 2, 230, 'They threw stones toward the side of the river.', 30, INK, True)
    text(d, W / 2, 310, 'They threw stones at the savings and loan association.', 30, INK, True)
    text(d, W / 2, 430, '“River” favored the first, “money” the second.', 30, GREEN, True)
    text(d, W / 2, 500, 'Participants were unaware of the biasing words.', 28, GREY)
    frames.append((im, 6))
    return frames, 0


def load_theory():
    frames = []
    for title, used, res, col in [('Low perceptual load · easy task', 0.35, 'Spare capacity processes the distractor: more interference', RED),
                                  ('High perceptual load · hard task', 0.92, 'Little capacity left for the distractor: less interference', GREEN)]:
        im, d = canvas(title)
        d.rectangle((340, 240, 940, 340), outline=INK, width=4)
        d.rectangle((344, 244, 344 + 592 * used, 336), fill=BAR)
        text(d, W / 2, 200, 'Processing capacity', 26, GREY)
        text(d, 340 + 600 * used / 2, 290, 'task', 26, (255, 255, 255), True)
        text(d, W / 2, 470, res, 30, col, True)
        frames.append((im, 5))
    im, d = canvas('Forster and Lavie (2008)')
    text(d, W / 2, 300, 'A task-irrelevant stimulus slowed responses,', 30, INK, True)
    text(d, W / 2, 370, 'more for easier tasks than for harder tasks.', 30, INK, True)
    frames.append((im, 5))
    return frames, 0


def schneider():
    frames = []
    im, d = canvas('Schneider and Shiffrin (1977) · Memory set')
    for k, ch in enumerate('KRMT'):
        text(d, 470 + k * 110, 360, ch, 80, INK, True)
    frames.append((im, 3))
    rng = random.Random(4)
    for f in range(6):
        im, d = canvas(f'Test frame {f + 1} of 20')
        for k in range(4):
            x, y = 480 + (k % 2) * 320, 260 + (k // 2) * 200
            if f == 3 and k == 2:
                text(d, x, y, 'R', 70, INK, True)
            elif f in (1, 4):
                text(d, x, y, rng.choice('BCDFGH'), 70, GREY, True)
            else:
                for _ in range(14):
                    px, py = x + rng.randint(-50, 50), y + rng.randint(-50, 50)
                    d.ellipse((px - 4, py - 4, px + 4, py + 4), fill=GREY)
        frames.append((im, 0.8))
    im, d = canvas('Was a memory-set target in any frame?')
    text(d, W / 2, 300, 'At first this was hard.', 32, INK)
    text(d, W / 2, 380, 'After about 600 trials, the task had become automatic.', 32, GREEN, True)
    frames.append((im, 5))
    return frames, 0


# ---------------------------------------------------------------- Collection 05
def hundred_car():
    frames = []
    im, d = canvas('The 100-car naturalistic driving study')
    for k, s in enumerate(['100 drivers, own or leased cars, up to 13 months', '42,300 hours, about two million miles', '82 crashes · 761 near crashes · 8,295 incidents']):
        text(d, W / 2, 230 + k * 90, s, 30, INK, True)
    frames.append((im, 5))
    im, d = canvas('Inattention within 3 seconds before the conflict')
    bars(d, [('Crashes', [80]), ('Near crashes', [65])], 360, 580, 560, 360, 100, [BAR])
    text(d, 500, 580 - 288 - 30, '80%', 30, INK, True); text(d, 780, 580 - 234 - 30, '65%', 30, INK, True)
    frames.append((im, 6))
    return frames, 1


def cross_square():
    frames = []
    for trial in range(1, 7):
        im, d = canvas(f'Cartwright-Finch and Lavie (2007) · Trial {trial}')
        long_h = trial % 2 == 0
        d.line((640 - (180 if long_h else 120), 380, 640 + (180 if long_h else 120), 380), fill=INK, width=6)
        d.line((640, 380 - (120 if long_h else 180), 640, 380 + (120 if long_h else 180)), fill=INK, width=6)
        if trial == 6:
            d.rectangle((880, 180, 940, 240), fill=INK)
        text(d, W / 2, 640, 'Which arm of the cross is longer?', 28, GREY)
        frames.append((im, 1.4 if trial < 6 else 2.5))
    im, d = canvas('On the sixth trial a square was added')
    text(d, W / 2, 300, 'Only 10 percent of participants saw it.', 36, RED, True)
    text(d, W / 2, 400, 'Inattentional blindness', 32, INK, True)
    frames.append((im, 5))
    return frames, 5


def fit_stages():
    frames = []
    labels = ['Object', 'Preattentive\nstage', 'Focused\nattention', 'Perception']
    notes = ['A rolling red ball', 'Analyzed into features: red, round, moving right (automatic)', 'Attention combines the free-floating features', 'One red ball rolling to the right']
    for k in range(4):
        im, d = canvas('Feature integration theory (Treisman)')
        flow(d, labels, highlight=set(range(k + 1)))
        text(d, W / 2, 540, notes[k], 30, INK, True)
        frames.append((im, 3.2))
    return frames, 3


def datta():
    frames = []
    for k, lab in enumerate('ABC'):
        im, d = canvas(f'Datta and DeYoe (2009) · Attend to location {lab}')
        d.ellipse((440, 160, 840, 560), outline=GREY, width=4)
        for j, (x, y, l) in enumerate([(560, 280, 'A'), (720, 300, 'B'), (640, 460, 'C')]):
            col = ORANGE if j == k else SOFT
            d.ellipse((x - 45, y - 45, x + 45, y + 45), fill=col)
            text(d, x, y, l, 28, INK, True)
        text(d, W / 2, 630, 'fMRI activity rose in the cortical area for the attended location.', 28, INK, True)
        frames.append((im, 3))
    im, d = canvas('Decoding attention')
    text(d, W / 2, 300, 'Classifiers trained on attention maps predicted the attended location', 30, INK, True)
    text(d, W / 2, 370, 'with 100 percent accuracy in the task.', 30, GREEN, True)
    frames.append((im, 5))
    return frames, 0


def face_house():
    frames = []
    for target, area in [('the house', 'parahippocampal gyrus'), ('the face', 'fusiform face area (FFA)')]:
        im, d = canvas(f'O’Craven and colleagues (1999) · Attend to {target}')
        d.polygon([(450, 330), (640, 180), (830, 330)], outline=BAR, width=6 if 'house' in target else 2)
        d.rectangle((480, 330, 800, 560), outline=BAR, width=6 if 'house' in target else 2)
        d.ellipse((540, 250, 740, 500), outline=RED, width=6 if 'face' in target else 2)
        d.ellipse((585, 330, 615, 360), outline=RED, width=3); d.ellipse((665, 330, 695, 360), outline=RED, width=3)
        d.arc((590, 380, 690, 450), 20, 160, fill=RED, width=3)
        text(d, W / 2, 630, f'Activity increased in the {area}.', 30, INK, True)
        frames.append((im, 4.5))
    return frames, 0


# ---------------------------------------------------------------- Collection 06
def units():
    frames = []
    im, d = canvas('Phonemes · “bit”')
    for k, p in enumerate(['b', 'i', 't']):
        box(d, 420 + k * 160, 250, 540 + k * 160, 370); text(d, 480 + k * 160, 310, p, 50, INK, True)
    text(d, W / 2, 470, 'Change one phoneme and the word changes: bit → pit, bat, bin', 30)
    frames.append((im, 4.5))
    for word, parts in [('table', ['table']), ('bedroom', ['bed', 'room']), ('bedrooms', ['bed', 'room', 's'])]:
        im, d = canvas(f'Morphemes · “{word}”')
        n = len(parts)
        for k, p in enumerate(parts):
            x = W / 2 + (k - (n - 1) / 2) * 220
            box(d, x - 95, 250, x + 95, 370); text(d, x, 310, p, 46, INK, True)
        text(d, W / 2, 470, f'{n} morpheme' + ('s' if n > 1 else ''), 32, BAR, True)
        frames.append((im, 3))
    return frames, 3


def dominance():
    frames = []
    for title, sent, target, longer, note in [('Balanced dominance · CAST', 'The cast worked…', 'cast', True, 'Both meanings activated: longer look than at “cook”'),
                                              ('Biased dominance · TIN', 'The tin was…', 'tin', False, 'Dominant meaning favored: as fast as a control word'),
                                              ('Context points to the weaker meaning', '…they had beans in a tin.', 'tin', True, 'Both meanings activated: longer than “cup”')]:
        im, d = canvas(title)
        text(d, W / 2, 240, sent, 44, INK, True)
        bars(d, [(target, [0.8 if longer else 0.5]), ('control', [0.5])], 420, 560, 440, 200, 1, [ORANGE if longer else GREEN, GREY])
        text(d, W / 2, 640, note, 28, INK, True)
        text(d, 400, 330, 'Fixation duration (illustrative)', 20, GREY, anchor='lm')
        frames.append((im, 4.5))
    return frames, 0


def erp():
    frames = []
    for title, sent, comp, t, sign in [('Semantic anomaly', '“Whipped cream tastes anxious.”', 'N400', 400, -1), ('Grammatical error', '“The spoiled child throw the toy on the floor.”', 'P600', 600, 1)]:
        im, d = canvas(title)
        text(d, W / 2, 180, sent, 34, INK, True)
        x0, y0 = 240, 430
        d.line((x0, y0, 1060, y0), fill=GREY, width=2)
        pts = []
        for ms in range(0, 900, 5):
            v = sign * 110 * math.exp(-((ms - t) / 90) ** 2) + 12 * math.sin(ms / 40)
            pts.append((x0 + ms * 0.91, y0 - v))
        d.line(pts, fill=BAR, width=4)
        xpk = x0 + t * 0.91
        text(d, xpk, y0 - sign * 150, f'{comp} · about {t} ms', 28, RED, True)
        text(d, x0, y0 + 40, '0 ms', 20, GREY); text(d, 1060, y0 + 40, '900 ms', 20, GREY)
        text(d, W / 2, 640, 'Waveform shape is illustrative.', 22, GREY)
        frames.append((im, 5))
    return frames, 0


def garden_path():
    frames = []
    words = 'After the musician played the piano was wheeled off the stage'.split()
    for upto in range(1, len(words) + 1):
        im, d = canvas('A garden path sentence')
        x = 90
        for k, w in enumerate(words[:upto]):
            col = BAR if 3 <= k <= 5 and upto <= 6 else (RED if k in (6, 7) else INK)
            text(d, x, 320, w, 34, col, True, anchor='lm')
            x += 22 + d.textlength(w, font=__import__('videos').font(34, True))
        if upto == 6:
            text(d, W / 2, 440, 'Under late closure, “the piano” joins the current phrase as the object of “played”', 26, BAR, True)
        if upto == 8:
            text(d, W / 2, 440, '“was wheeled” makes that grouping fail', 28, RED, True)
        frames.append((im, 0.8 if upto not in (6, 8) else 3))
    im, d = canvas('Reanalysis')
    text(d, W / 2, 280, '[After the musician played]', 36, INK, True)
    text(d, W / 2, 360, '[the piano was wheeled off the stage]', 36, GREEN, True)
    frames.append((im, 5))
    return frames, len(frames) - 1


# ---------------------------------------------------------------- Collection 07
def priming():
    frames = []
    for prime in ['“The girl gave the book to the boy.”', '“The girl gave the boy the book.”']:
        im, d = canvas('Syntactic priming · the confederate describes a card')
        text(d, W / 2, 280, prime, 38, BAR, True)
        text(d, W / 2, 400, 'Then the participant describes the next card.', 28, GREY)
        frames.append((im, 3.5))
    im, d = canvas('Result')
    text(d, W / 2, 300, 'On 78 percent of trials, the participant used the same form as the prime.', 30, INK, True)
    text(d, W / 2, 380, 'Speakers adjust to match how other speakers talk.', 28, GREY)
    frames.append((im, 5))
    return frames, 2


def chips():
    frames = []
    def table(d, x, flipped=False, label=''):
        box(d, x - 200, 260, x + 200, 460, fill=SOFT)
        big, small = (x + 90, x - 90) if flipped else (x - 90, x + 90)
        d.ellipse((big - 40, 320, big + 40, 400), fill=INK); d.ellipse((small - 20, 340, small + 20, 380), fill=INK)
        text(d, x, 500, label, 24, GREY)
    im, d = canvas('The chips task · Table 1'); table(d, 640, label='Large dot on the left'); frames.append((im, 3.5))
    im, d = canvas('Turn 180 degrees and choose at Table 2')
    table(d, 380, False, 'Relative: same with respect to the body'); table(d, 900, True, 'Absolute: same with respect to the room')
    frames.append((im, 5))
    im, d = canvas('Dutch and Tzeltal speakers')
    text(d, W / 2, 270, 'Dutch speakers: mostly relative', 32, BAR, True)
    text(d, W / 2, 350, 'Consistent Tzeltal speakers: over 80 percent absolute', 32, GREEN, True)
    frames.append((im, 5))
    return frames, 1


def visual_field():
    frames = []
    for side, x, note in [('left', 330, 'Left visual field → right hemisphere first'), ('right', 950, 'Right visual field → left hemisphere first')]:
        im, d = canvas(f'Gilbert and colleagues (2006) · odd color on the {side}')
        text(d, W / 2, 380, '+', 50, INK, True)
        for k in range(6):
            a = k * math.pi / 3
            cx, cy = W / 2 + 330 * math.cos(a), 380 + 220 * math.sin(a)
            odd = (side == 'left' and k == 3) or (side == 'right' and k == 0)
            d.ellipse((cx - 40, cy - 40, cx + 40, cy + 40), fill=(60, 150, 210) if odd else (60, 170, 120))
        text(d, W / 2, 650, note, 26, GREY)
        frames.append((im, 3.5))
    im, d = canvas('Result')
    text(d, W / 2, 300, 'The color category effect was stronger in the right visual field,', 30, INK, True)
    text(d, W / 2, 370, 'which projects first to the left hemisphere, more tied to language.', 30, INK, True)
    frames.append((im, 5))
    return frames, 1


def marr():
    f = steps('Marr’s three levels · a cash register', [
        ('Computational: what problem is solved?', BLUE, True), 'Find the amount due and the change due',
        ('Algorithmic: which representations and operations?', BLUE, True), 'Addition for the total, subtraction for the change',
        ('Implementational: how is it physically done?', BLUE, True), 'Different devices or programs can do the calculations'], size=30, gap=78)
    return f, len(f) - 1


def elman():
    frames = []
    s = 'manyyearsago'
    err = [0.9, 0.5, 0.3, 0.2, 0.8, 0.5, 0.3, 0.2, 0.1, 0.85, 0.4, 0.2]
    for upto in range(1, len(s) + 1):
        im, d = canvas('Elman · predicting the next letter')
        x0, y0 = 200, 520
        d.line((x0, y0, x0 + 880, y0), fill=GREY, width=2)
        pts = [(x0 + 40 + k * 76, y0 - err[k] * 300) for k in range(upto)]
        if len(pts) > 1:
            d.line(pts, fill=BAR, width=4)
        for k, (x, y) in enumerate(pts):
            d.ellipse((x - 7, y - 7, x + 7, y + 7), fill=RED if err[k] > 0.7 else BAR)
            text(d, x, y0 + 32, s[k], 30, INK, True)
        text(d, x0, 190, 'Prediction error (illustrative)', 22, GREY, anchor='lm')
        frames.append((im, 0.7 if upto < len(s) else 2))
    im2 = im.copy(); d2 = ImageDraw.Draw(im2)
    text(d2, W / 2, 640, 'Error falls within a word and rises at a boundary: many | years | ago', 28, INK, True)
    frames.append((im2, 5))
    return frames, len(frames) - 1


# ---------------------------------------------------------------- Collection 08 (labs)
def signal_detection():
    frames = []
    cells = [('Hit', 'Line present · “present”', GREEN), ('Miss', 'Line present · “absent”', RED), ('False alarm', 'Line absent · “present”', RED), ('Correct rejection', 'Line absent · “absent”', GREEN)]
    for upto in range(1, 5):
        im, d = canvas('Signal detection · four outcomes')
        for k, (name, desc, col) in enumerate(cells[:upto]):
            x, y = 380 + (k % 2) * 520, 260 + (k // 2) * 200
            box(d, x - 230, y - 75, x + 230, y + 75, fill=SOFT)
            text(d, x, y - 20, name, 32, col, True); text(d, x, y + 28, desc, 24)
        frames.append((im, 2.5 if upto < 4 else 3))
    im, d = canvas('Two measures')
    text(d, W / 2, 270, 'd′ · sensitivity, from hits and false alarms (0 = no discrimination)', 30, INK, True)
    text(d, W / 2, 350, 'C · response bias (positive conservative, negative liberal)', 30, INK, True)
    frames.append((im, 5))
    return frames, 3


def blink():
    frames = []
    seq = list('PXJMBKTLRW')
    for k, ch in enumerate(seq):
        im, d = canvas('Attentional blink · letters at one location')
        target = ch in 'JK'
        text(d, W / 2, 380, ch, 120, RED if target else INK, True)
        frames.append((im, 0.35 if not target else 0.6))
    im, d = canvas('Did J and K appear?')
    text(d, W / 2, 280, 'K is often missed when it closely follows J.', 32, INK, True)
    text(d, W / 2, 360, 'Detection improves when the two are farther apart.', 30, GREEN, True)
    text(d, W / 2, 440, 'A brief gap in attention, not a blink of the eyes.', 26, GREY)
    frames.append((im, 5))
    return frames, 2


def ior():
    frames = []
    def display(d, cue=None, target=None):
        text(d, W / 2, 380, '+', 50, INK, True)
        for x in (360, 920):
            d.rectangle((x - 70, 310, x + 70, 450), outline=ORANGE if cue == x else GREY, width=10 if cue == x else 3)
        if target:
            d.ellipse((target - 25, 355, target + 25, 405), fill=INK)
    im, d = canvas('Inhibition of return · cue'); display(d, cue=360); frames.append((im, 1.5))
    im, d = canvas('Short SOA · target at the cued place'); display(d, target=360)
    text(d, W / 2, 600, 'Faster at the cued location', 30, GREEN, True); frames.append((im, 3.5))
    im, d = canvas('Long SOA · target at the cued place'); display(d, target=360)
    text(d, W / 2, 600, 'Slower at the cued location than elsewhere', 30, RED, True); frames.append((im, 3.5))
    im, d = canvas('The cue does not predict the target’s location.')
    text(d, W / 2, 330, 'SOA: time from the start of the cue to the start of the target', 28, INK, True)
    frames.append((im, 4))
    return frames, 0


def simon():
    frames = []
    for title, x, ok in [('Congruent · green square on the right', 920, True), ('Incongruent · green square on the left', 360, False)]:
        im, d = canvas(title)
        text(d, W / 2, 360, '+', 50, INK, True)
        d.rectangle((x - 60, 300, x + 60, 420), fill=GREEN)
        text(d, 300, 600, 'Left key = red', 26, GREY); text(d, 980, 600, 'Right key = green', 26, INK, True)
        text(d, W / 2, 520, 'Faster' if ok else 'Slower: the location activates the left response', 30, GREEN if ok else RED, True)
        frames.append((im, 4))
    return frames, 1


def phon_similarity():
    frames = []
    for title, letters, note in [('Similar-sounding letters', 'T P B D', 'Harder to recall in order'), ('Different-sounding letters', 'K R S Q', 'Easier to recall in order')]:
        im, d = canvas(title)
        text(d, W / 2, 330, letters, 90, INK, True)
        text(d, W / 2, 500, note, 32, RED if 'Harder' in note else GREEN, True)
        frames.append((im, 3.5))
    im, d = canvas('Articulatory suppression')
    text(d, W / 2, 260, 'Count aloud repeatedly while viewing the letters.', 30, INK, True)
    text(d, W / 2, 340, 'Counting occupies the speech process used to recode and rehearse.', 28)
    text(d, W / 2, 420, 'Predicted: the similarity effect shrinks and recall is poorer.', 30, BAR, True)
    frames.append((im, 5))
    return frames, 0


def modality():
    frames = []
    for title, mode in [('Heard list', 'spoken'), ('Read list', 'displayed')]:
        im, d = canvas(f'Modality effect · {title}')
        text(d, W / 2, 300, '4  9  2  7  5  1  8', 70, INK, True)
        text(d, W / 2, 420, f'Digits {mode}, then clicked in order', 28, GREY)
        frames.append((im, 3))
    im, d = canvas('Result')
    text(d, W / 2, 280, 'Hearing improves recall of the final items only.', 32, INK, True)
    text(d, W / 2, 360, 'Echoic memory, the brief auditory trace, adds information.', 28, GREY)
    frames.append((im, 5))
    return frames, 0


H_, P_, A_, L_, LAB = 'Introduction and history', 'Attention & perception', 'Attention & perception', 'Language', 'Labs and articles'
NOTE = ' Drawn reconstruction; it is not a recording of the original study.'
CLIPS = [
 ('M1-ebbinghaus-savings', 'Ebbinghaus (1885/1913) · Savings', ebbinghaus, ['3:19', '3:20'], H_, 'The savings for each delay are computed from the slide’s values (1,000 seconds of learning; relearning 400, 650 and 730 seconds), then plotted as a curve.'),
 ('M1-tolman-maze', 'Tolman (1938) · The cognitive map', tolman, ['3:29', '3:30', '3:31'], H_, 'A four-arm maze is drawn with arms A to D. The rat is trained from A with food in B, then started from C. The arrows show the two predictions and the turn the rats made.'),
 ('M1-cherry-dichotic', 'Cherry (1953) · Dichotic listening', cherry, ['3:36', '7:4', '7:5'], H_, 'Two different messages, one per ear, with the left ear shadowed. The message text is illustrative. The final frame lists what was and was not reported from the unattended ear, as on the slides.'),
 ('M1-broadbent-flow', 'Broadbent (1958) · Filter model', broadbent, ['3:37', '7:7', '7:8', '7:9', '7:10', '7:11'], H_, 'The flow diagram is built one stage at a time: sensory memory, filter, detector and short-term memory.'),
 ('M1-conditioning', 'Classical vs operant conditioning', conditioning, ['3:25', '3:26', '3:27'], H_, 'Text frames contrast Little Albert (Watson and Rayner, 1920) with Skinner’s reinforcement and punishment. No images of the original study are shown.'),
 ('M1-inverse-projection', 'The inverse projection problem', inverse_projection, ['5:9'], P_, 'Three objects of different sizes at different distances are drawn on the same lines of sight to one eye, so they would cast the same retinal image.'),
 ('M1-bumps-dents', 'Light from above · Bumps and dents', bumps, ['5:26', '5:38', '5:39', '5:40', '2:5'], P_, 'Shaded discs lit at the top, then the same frame turned 180 degrees. Most viewers see bumps, then dents.'),
 ('M1-olympic-pragnanz', 'Prägnanz · The Olympic symbol', rings, ['5:31', '2:2'], P_, 'Five drawn rings in the Olympic arrangement. Captions state the two readings from the slide.'),
 ('M1-good-continuation', 'Good continuation', continuation, ['5:30', '2:2'], P_, 'A wavy line crossing a straight line, then a contour passing behind a grey block.'),
 ('M1-bayes-cough', 'Bayesian inference · Mary’s cough', bayes_cough, ['2:11', '2:12', '2:13', '5:25'], P_, 'The three hypotheses with the prior and likelihood the slide gives for each, then the conclusion. Cells the slide does not state are marked “not stated”, and no probabilities are invented.'),
 ('M1-palmer-context', 'Palmer (1975) · Context and objects', palmer, ['2:9', '5:42'], P_, 'A schematic kitchen scene, then the two example objects from the slide, then the stated result. The scene drawing is illustrative.'),
 ('M1-blakemore-cooper', 'Blakemore and Cooper (1970) · Vertical stripes', blakemore, ['2:21', '2:20'], P_, 'The striped rearing space, the vertical and horizontal sticks, and the stated finding about cortical neurons.'),
 ('M1-garner', 'Garner interference · Integral and separable', garner, ['2:31'], P_, 'Example displays for integral (brightness, saturation) and separable (shape, color) dimensions, with the stated result for each.'),
 ('M1-pathways', 'Ventral and dorsal pathways · D.F.', pathways, ['5:45', '5:46'], P_, 'A schematic brain with the two pathways, then D.F.’s matching and posting tasks with the stated results.'),
 ('M1-attenuator', 'Treisman (1964) · Attenuation and thresholds', attenuator, ['7:13', '7:14', '7:15', '7:16'], P_, 'Attended and unattended inputs of different strength enter the attenuator. Example words in the dictionary unit get low or high thresholds. The example words and bar heights are illustrative.'),
 ('M1-mackay-bank', 'MacKay (1973) · The meaning of “bank”', mackay, ['7:18', '7:19'], P_, 'The attended sentence and the two biasing words from the slide, then the two test sentences and the stated result.'),
 ('M1-load-theory', 'Load theory · Forster and Lavie (2008)', load_theory, ['7:25', '7:26'], P_, 'A capacity bar filled by an easy or a hard task, with the stated effect on distraction. Bar lengths are illustrative.'),
 ('M1-schneider-shiffrin', 'Schneider and Shiffrin (1977) · Practice and automaticity', schneider, ['7:36', '7:37', '7:38', '7:39'], P_, 'A four-character memory set, then six of the 20 rapid test frames with dots, distractors or a target. The characters are illustrative.'),
 ('M1-hundred-car', 'The 100-car study · Inattention before crashes', hundred_car, ['4:3', '4:4', '4:5'], P_, 'The study’s scale, then bars for the 80 and 65 percent figures on the slide.'),
 ('M1-cross-square', 'Cartwright-Finch and Lavie (2007) · The unexpected square', cross_square, ['4:8'], P_, 'Six cross trials; a small square appears on the sixth, as in the procedure on the slide. Arm lengths and the square’s position are illustrative.'),
 ('M1-fit-stages', 'Feature integration theory · Stages', fit_stages, ['4:12', '4:13', '4:14', '4:15'], P_, 'The four boxes of feature integration theory are built one at a time, using the rolling red ball example from the slides.'),
 ('M1-datta-deyoe', 'Datta and DeYoe (2009) · Attending to locations', datta, ['4:28', '4:29', '4:30'], P_, 'A disk with locations A, B and C; each is attended in turn. The final frame states the decoding result on the slide.'),
 ('M1-face-house', 'O’Craven and colleagues (1999) · Face or house', face_house, ['4:31'], P_, 'A line-drawn house and face overlap. The attended one is drawn bolder, with the brain area the slide names for each.'),
 ('M1-phonemes-morphemes', 'Phonemes and morphemes', units, ['8:3', '8:4'], L_, 'The word “bit” split into phonemes, then “table,” “bedroom” and “bedrooms” split into morphemes, as on the slides.'),
 ('M1-meaning-dominance', 'Meaning dominance · CAST and TIN', dominance, ['8:17', '8:18', '8:19'], L_, 'The three sentence conditions from the slides with relative fixation bars. Bar heights are illustrative and show only the direction of each result.'),
 ('M1-n400-p600', 'N400 and P600', erp, ['8:22', '8:23', '8:20'], L_, 'The two example sentences from the slides with a schematic waveform peaking at about 400 or 600 milliseconds. Waveform shape is illustrative.'),
 ('M1-garden-path', 'Garden path · The piano sentence', garden_path, ['8:24', '8:27', '8:28', '1:2'], L_, 'The sentence appears word by word, with the first grouping under late closure, the point where it fails, and the repair.'),
 ('M1-syntactic-priming', 'Syntactic priming · 78 percent', priming, ['1:16', '1:17', '1:18'], L_, 'The two prime forms from the slide, then the stated result.'),
 ('M1-chips-task', 'The chips task · Dutch and Tzeltal speakers', chips, ['1:21', '1:22', '1:23'], L_, 'A card with a large and a small dot at Table 1, then the relative and absolute choices after turning 180 degrees, then the stated results.'),
 ('M1-visual-field', 'Gilbert and colleagues (2006) · Color across visual fields', visual_field, ['1:20'], L_, 'A ring of colored circles around fixation with the odd color on the left or right, then the stated result. Colors are illustrative.'),
 ('M1-marr-levels', 'Marr’s three levels · The cash register', marr, ['1:26', '1:27'], L_, 'Text frames build the three levels using the cash register example on the slide.'),
 ('M1-elman-prediction', 'Elman · Prediction error and word boundaries', elman, ['1:29'], L_, 'Letters of an unspaced phrase appear one by one with a prediction-error curve. The phrase and the error values are illustrative and show only the pattern described on the slide.'),
 ('M1-signal-detection', 'Signal detection · Hits and false alarms', signal_detection, ['0:1'], LAB, 'The four response outcomes for the hidden-line task, then the two measures, d′ and C.'),
 ('M1-attentional-blink', 'Attentional blink · J then K', blink, ['0:6'], LAB, 'Letters replace one another at one location, with J and K as targets. Timing is slowed for viewing.'),
 ('M1-inhibition-return', 'Inhibition of return · Short and long SOA', ior, ['0:7'], LAB, 'A cue at one box, then a target there after a short or long SOA, with the result stated in the lab.'),
 ('M1-simon', 'Simon effect · Congruent and incongruent', simon, ['0:8'], LAB, 'A green square on the same or opposite side as the green key, with the stated result.'),
 ('M1-phonological-similarity', 'Phonological similarity · Articulatory suppression', phon_similarity, ['0:10'], LAB, 'The two letter sets from the lab, then the suppression condition and its predicted effect.'),
 ('M1-modality', 'Modality effect · Heard and read lists', modality, ['0:21'], LAB, 'A digit list presented as heard or read, then the stated result for the final items.'),
]


def main():
    force = sys.argv[1] if len(sys.argv) > 1 else None
    manifest = []
    for clip_id, title, build, refs, group, method in CLIPS:
        frames, poster = build()
        out = OUT / 'clips' / f'{clip_id}.mp4'
        if not out.exists() or (force and clip_id.startswith(force)):
            encode(clip_id, frames, poster)
            print('encoded', clip_id, out.stat().st_size // 1024, 'KB')
        manifest.append(dict(id=clip_id, title=title, group=group, refs=refs, kind='Stimulus video (Module I)', duration=round(sum(s for _, s in frames)),
                             method=method + NOTE, source='authoring/psyc301/module1/videos_m1.py', params={}, file=f'psyc301-videos/clips/{clip_id}.mp4',
                             poster=f'psyc301-videos/posters/{clip_id}.jpg', fps=60))
    (OUT / 'module1-clips.js').write_text('// Module I stimulus videos (Collections 01 to 08). Built by authoring/psyc301/module1/videos_m1.py.\n'
                                          '(function(){ if(!window.PsycVideos) return; const extra = ' + json.dumps(manifest, ensure_ascii=False, indent=1)
                                          + ';\n window.PsycVideos.clips.push(...extra); })();\n', encoding='utf8')
    print(len(manifest), 'clips in module1-clips.js')


if __name__ == '__main__':
    main()
