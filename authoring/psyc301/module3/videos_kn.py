"""Flat, code-drawn stimulus videos for Collection 18 (Knowledge).

Uses the drawing helpers in videos.py and videos_enc.py. Each clip shows a task display or redraws values
that appear on the slides. They are reconstructions, not recordings of the original experiments.
Rendered by videos.py.
"""
import random
from PIL import ImageDraw
from videos import W, H, BLUE, INK, GREY, BAR, SOFT, GREEN, RED, PALE, canvas, text, box
from videos_enc import table, ORANGE

GOOD_GREEN, LIGHT_GREEN = (70, 160, 105), (165, 215, 180)


def rosch_ratings():
    frames = []
    for title, items in [('Rosch (1975) · Category = birds', [('Bat', 6.15), ('Penguin', 4.53), ('Owl', 2.96), ('Sparrow', 1.18)]),
                         ('Rosch (1975) · Category = furniture', [('Telephone', 6.68), ('Mirror', 4.39), ('China closet', 2.59), ('Chair, sofa', 1.04)])]:
        for upto in range(0, 5):
            im, d = canvas(title)
            text(d, W / 2, 150, 'How well does each member represent the category?', 28)
            x0, x1, y = 180, 1100, 420
            d.line((x0, y, x1, y), fill=INK, width=4)
            for n in range(7, 0, -1):
                x = x0 + (7 - n) * (x1 - x0) / 6
                d.line((x, y - 12, x, y + 12), fill=INK, width=3)
                text(d, x, y + 40, str(n), 24, GREY)
            text(d, x0, y + 85, 'Poor', 24, GREY)
            text(d, x1, y + 85, 'Very good', 24, GREY)
            for name, v in items[:upto]:
                x = x0 + (7 - v) * (x1 - x0) / 6
                d.line((x, y - 14, x, y - 70), fill=RED, width=4)
                text(d, x, y - 120, name, 26, INK, bold=True)
                text(d, x, y - 90, f'({v})', 22, GREY)
            frames.append((im, 1.5 if upto < 4 else 4.5))
    return frames, 4


def typicality():
    frames = []
    for sentence in ['“An apple is a fruit.”', '“A pomegranate is a fruit.”']:
        im, d = canvas('Sentence verification task')
        text(d, W / 2, 320, sentence, 54, INK, bold=True)
        text(d, W / 2, 470, 'Yes or no?', 32, GREY)
        frames.append((im, 3.5))
    im, d = canvas('Reaction time by prototypicality (approximate, from the figure)')
    d.line((330, 560, 950, 560), fill=GREY, width=3)
    for k, (lab, v) in enumerate([('High (apple)', 520), ('Medium', 585), ('Low (pomegranate)', 650)]):
        x = 430 + k * 210
        d.rectangle((x - 55, 560 - (v - 450) * 1.6, x + 55, 560), fill=[GREEN, BAR, ORANGE][k])
        text(d, x, 595, lab, 22)
        text(d, x, 540 - (v - 450) * 1.6, f'{v} ms', 22, INK, bold=True)
    text(d, W / 2, 660, 'Faster responses were made to prototypical items.', 30, INK, bold=True)
    frames.append((im, 6.5))
    return frames, 2


def color_priming():
    frames = []
    im, d = canvas('Prime')
    text(d, W / 2, 330, 'Hear “green”', 60, INK, bold=True)
    frames.append((im, 2.5))
    im, d = canvas('Two seconds later')
    text(d, W / 2, 360, '…', 80, GREY)
    frames.append((im, 2))
    for title, cols, rt in [('Same color · good examples', (GOOD_GREEN, GOOD_GREEN), '610 ms'), ('Same color · poor examples', (LIGHT_GREEN, LIGHT_GREEN), '780 ms'),
                            ('Different colors', ((225, 110, 90), (80, 120, 200)), 'no “same” response')]:
        for show in (False, True):
            im, d = canvas(title)
            box(d, 360, 220, 920, 480, fill=(255, 240, 214))
            d.ellipse((430, 260, 610, 440), fill=cols[0])
            d.ellipse((670, 260, 850, 440), fill=cols[1])
            text(d, W / 2, 540, 'Press the key as quickly as possible if the two are the same.', 26, GREY)
            if show:
                text(d, W / 2, 620, 'Reaction time for “same”: ' + rt if 'ms' in rt else rt, 34, INK, bold=True)
            frames.append((im, 1.6 if not show else 3.2))
    im, d = canvas('Good examples match the prototype for green')
    text(d, W / 2, 300, 'Good examples: 610 ms', 44, GREEN, bold=True)
    text(d, W / 2, 400, 'Poor examples: 780 ms', 44, RED, bold=True)
    text(d, W / 2, 540, 'Prototypical members are more affected by a priming stimulus.', 28)
    frames.append((im, 6))
    return frames, 3


def basic_level():
    frames = []
    rows = [['Global (superordinate)', 'Furniture', '3'], ['Basic', 'Table', '9'], ['Specific (subordinate)', 'Kitchen table', '10.3']]
    for upto in (1, 2, 3):
        im, d = canvas('Rosch and colleagues (1976) · Common features')
        table(d, 150, 200, [420, 320, 240], 110, ['Level', 'Example', 'Common features'], rows, upto, {(1, 2): GREEN})
        frames.append((im, 3))
    im2 = im.copy()
    d = ImageDraw.Draw(im2)
    text(d, W / 2, 600, 'Above the basic level: lose a lot of information', 28, RED, bold=True)
    text(d, W / 2, 650, 'Below the basic level: gain just a little', 28, BAR, bold=True)
    frames.append((im2, 6))
    for obj, basic, others in [('an electric guitar', 'Guitar', 'not Stratocaster (specific) or instrument (global)'), ('a fish', 'Fish', 'not trout (specific) or animal (global)')]:
        im, d = canvas('Quick, name this object')
        text(d, W / 2, 260, 'Shown: ' + obj, 32, GREY)
        text(d, W / 2, 400, basic, 84, INK, bold=True)
        text(d, W / 2, 520, others, 28)
        frames.append((im, 4))
    return frames, 3


def experts():
    frames = []
    im, d = canvas('Coley, Medin and Atran (1997) · Naming 44 plants')
    for k, (who, what, col) in enumerate([('Undergraduates', '75% said “trees”', BAR), ('Horticulturalists', 'used specific names such as “oak”', GREEN), ('Guatemalan Itzaj culture', '“oak” behaves like a basic-level category', ORANGE)]):
        y = 240 + k * 130
        box(d, 150, y - 46, W - 150, y + 46, fill=PALE)
        text(d, 190, y, who, 30, INK, bold=True, anchor='lm')
        text(d, W - 190, y, what, 26, col, bold=True, anchor='rm')
    frames.append((im, 8))
    im, d = canvas('Tanaka and Taylor (1991) · Naming pictures of birds (approximate)')
    d.line((300, 560, 1000, 560), fill=GREY, width=3)
    for g, (who, basic, specific) in enumerate([('Experts', 25, 75), ('Non-experts', 75, 20)]):
        x = 470 + g * 360
        for k, (v, col, lab) in enumerate([(basic, BAR, 'Basic'), (specific, ORANGE, 'Specific')]):
            d.rectangle((x - 90 + k * 95, 560 - 3.6 * v, x - 10 + k * 95, 560), fill=col)
            text(d, x - 50 + k * 95, 585, lab, 20)
        text(d, x, 630, who, 28, INK, bold=True)
    text(d, 470, 220, '“sparrow,” “robin”', 22, GREY)
    text(d, 830, 220, '“bird”', 22, GREY)
    frames.append((im, 8))
    return frames, 1


def network():
    frames = []
    nodes = [('living thing', 640, 150), ('animal', 640, 270), ('bird', 640, 390), ('canary', 640, 510)]
    props = {1: 'can move · has skin', 2: 'can fly · has feathers', 3: 'can sing · is yellow'}
    for upto in (2, 3, 4):
        im, d = canvas('Collins and Quillian (1969) · A hierarchical network')
        for i in range(1, upto):
            d.line((nodes[i - 1][1], nodes[i - 1][2] + 22, nodes[i][1], nodes[i][2] - 22), fill=BAR, width=4)
            text(d, nodes[i][1] - 60, (nodes[i - 1][2] + nodes[i][2]) / 2, 'IS A', 18, GREY)
        for i, (name, x, y) in enumerate(nodes[:upto]):
            box(d, x - 110, y - 24, x + 110, y + 24, fill=SOFT)
            text(d, x, y, name, 26, INK, bold=True)
            if i in props:
                text(d, x + 140, y, props[i], 22, GREEN, anchor='lm')
        if upto == 4:
            text(d, W / 2, 620, 'Shared properties are stored once, at the higher node (cognitive economy).', 26)
        frames.append((im, 2.5 if upto < 4 else 6))
    im, d = canvas('Mean response time by levels traveled (approximate, from the figure)')
    d.line((260, 580, 1020, 580), fill=GREY, width=3)
    d.line((260, 580, 260, 180), fill=GREY, width=3)
    for vals, labs, col in [((1000, 1190, 1230), ('is a canary', 'is a bird', 'is an animal'), RED), ((1310, 1390, 1470), ('can sing', 'can fly', 'has skin'), BAR)]:
        pts = [(380 + k * 260, 580 - (v - 900) * 0.62) for k, v in enumerate(vals)]
        d.line(pts, fill=col, width=5)
        for (px, py), lab in zip(pts, labs):
            d.ellipse((px - 9, py - 9, px + 9, py + 9), fill=col)
            text(d, px, py - 28, 'A canary ' + lab, 20, INK)
    for k in range(3):
        text(d, 380 + k * 260, 610, str(k), 22, GREY)
    text(d, W / 2, 660, 'More levels to travel, longer response time', 28, INK, bold=True)
    frames.append((im, 7))
    return frames, 2


def lexical_decision():
    frames = []
    for a, b, kind in [('Fundt', 'Glurb', 'two nonwords'), ('Bleem', 'Dress', 'one nonword'), ('Chair', 'Money', 'two unrelated words'), ('Bread', 'Wheat', 'two related words')]:
        im, d = canvas('Lexical decision task · Are both of these words?')
        text(d, W / 2, 290, a, 72, INK, bold=True)
        text(d, W / 2, 400, b, 72, INK, bold=True)
        text(d, W / 2, 560, kind, 28, GREY)
        frames.append((im, 2.6))
    im, d = canvas('Meyer and Schvaneveldt · Reaction time (approximate, from the figure)')
    d.line((400, 560, 880, 560), fill=GREY, width=3)
    for k, (lab, v, col) in enumerate([('Words associated', 855, ORANGE), ('Words not associated', 940, BAR)]):
        x = 520 + k * 240
        d.rectangle((x - 60, 560 - (v - 750) * 1.5, x + 60, 560), fill=col)
        text(d, x, 595, lab, 22)
        text(d, x, 540 - (v - 750) * 1.5, f'{v} ms', 24, INK, bold=True)
    text(d, W / 2, 660, 'People were faster to respond to related pairs.', 30, INK, bold=True)
    frames.append((im, 7))
    return frames, 4


def units(d, highlight=None, back=False):
    layers = [('Input units', 520, 7, (190, 190, 190)), ('Hidden units', 370, 5, (60, 170, 120)), ('Output units', 220, 8, (70, 140, 210))]
    pos = []
    for name, y, n, col in layers:
        xs = [640 + (i - (n - 1) / 2) * 90 for i in range(n)]
        pos.append([(x, y) for x in xs])
    for a, b in ((0, 1), (1, 2)):
        for p in pos[a]:
            for q in pos[b]:
                d.line((*p, *q), fill=(RED if back else (205, 210, 216)), width=1 if not back else 2)
    for (name, y, n, col), layer in zip(layers, pos):
        for x, yy in layer:
            d.ellipse((x - 20, yy - 20, x + 20, yy + 20), fill=col, outline=INK if highlight == name else None, width=4)
        text(d, 150, y, name, 24, INK, bold=highlight == name, anchor='lm')


def connectionist():
    frames = []
    steps = [('Input units', 'A stimulus activates the input units.', False), ('Hidden units', 'Activity passes through weighted connections to the hidden units.', False),
             ('Output units', 'The output units give the network’s guess.', False), (None, 'The guess is compared with the correct response. The difference is the error signal.', False),
             (None, 'Back-propagation: the error signal is sent back, and the weights change a little.', True), (None, 'The process repeats until the error signal is zero.', False)]
    for name, caption, back in steps:
        im, d = canvas('A connectionist network')
        units(d, name, back)
        text(d, W / 2, 640, caption, 26, RED if back else INK, bold=True)
        frames.append((im, 4))
    return frames, 4


def hidden_learning():
    frames = []
    rng = random.Random(18)
    start = [0.2 + rng.uniform(-0.03, 0.03) for _ in range(8)]
    final = {'Rose': [0.15, 0.7, 0.2, 0.85, 0.1, 0.6, 0.15, 0.2], 'Daisy': [0.2, 0.65, 0.15, 0.8, 0.15, 0.7, 0.1, 0.25], 'Canary': [0.75, 0.15, 0.8, 0.1, 0.65, 0.15, 0.7, 0.6]}
    for trials, mix in [(0, 0.0), (250, 0.35), (750, 0.7), (2500, 1.0)]:
        im, d = canvas(f'Activity in the hidden units · {trials:,} learning trials')
        for r, (name, target) in enumerate(final.items()):
            y0 = 250 + r * 150
            text(d, 200, y0 - 40, name, 28, INK, bold=True)
            d.line((320, y0, 1000, y0), fill=GREY, width=2)
            for k in range(8):
                v = start[k] + (target[k] - start[k]) * mix
                d.rectangle((340 + k * 80, y0 - 110 * v, 395 + k * 80, y0), fill=(150, 205, 160))
        text(d, W / 2, 660, 'At first the patterns look alike.' if mix == 0 else ('Rose and daisy become similar. Canary becomes different.' if mix == 1 else 'The patterns change a little with each trial.'), 28, INK, bold=True)
        frames.append((im, 4 if mix < 1 else 7))
    return frames, 3


def sensory_functional():
    frames = []
    im, d = canvas('Mean rating (approximate, from the figure)')
    zero = 400
    d.line((260, zero, 1020, zero), fill=GREY, width=3)
    for k, (lab, a, b) in enumerate([('Color', 0.45, -0.5), ('Motion', 0.55, -0.1), ('Performed action', -0.75, 0.4)]):
        x = 400 + k * 240
        for j, (v, col) in enumerate([(a, RED), (b, BAR)]):
            top, bottom = sorted((zero - 200 * v, zero))
            d.rectangle((x - 70 + j * 75, top, x - 5 + j * 75, bottom), fill=col)
        text(d, x, 610, lab, 24)
    d.rectangle((1050, 180, 1074, 204), fill=RED); text(d, 1084, 192, 'Animals', 22, anchor='lm')
    d.rectangle((1050, 220, 1074, 244), fill=BAR); text(d, 1084, 232, 'Artifacts', 22, anchor='lm')
    text(d, W / 2, 670, 'Animals go with sensory attributes. Artifacts go with what is done with them.', 26, INK, bold=True)
    frames.append((im, 8))
    im, d = canvas('Warrington and Shallice · Patients K.C. and E.W. (approximate)')
    d.line((330, 560, 950, 560), fill=GREY, width=3)
    for g, (who, non, liv) in enumerate([('Patient K.C.', 90, 48), ('Patient E.W.', 90, 30)]):
        x = 480 + g * 320
        d.rectangle((x - 90, 560 - 3.6 * non, x - 10, 560), fill=GREEN)
        d.rectangle((x + 5, 560 - 3.6 * liv, x + 85, 560), fill=ORANGE)
        text(d, x, 600, who, 26, INK, bold=True)
    d.rectangle((1000, 200, 1024, 224), fill=GREEN); text(d, 1034, 212, 'Nonanimals', 22, anchor='lm')
    d.rectangle((1000, 240, 1024, 264), fill=ORANGE); text(d, 1034, 252, 'Living animals', 22, anchor='lm')
    text(d, W / 2, 660, 'Both patients did much worse with living animals.', 28, INK, bold=True)
    frames.append((im, 8))
    return frames, 1


def approaches():
    frames = []
    rows = [('Category-specific approach', 'specialized areas of the brain and networks connecting them'), ('Multiple-factor approach', 'the role of many different features and properties'),
            ('Embodied approach', 'activity caused by the sensory and motor properties of objects')]
    for upto in (0, 1, 2, 3):
        im, d = canvas('Three approaches to concepts in the brain')
        text(d, W / 2, 150, 'All agree: information about concepts is distributed across many brain structures.', 26, GREEN, bold=True)
        for r, (name, what) in enumerate(rows[:upto]):
            y = 270 + r * 130
            box(d, 110, y - 50, W - 110, y + 50, fill=PALE)
            text(d, 140, y - 16, name, 28, BLUE, bold=True, anchor='lm')
            text(d, 140, y + 20, 'emphasizes ' + what, 24, anchor='lm')
        frames.append((im, 3 if upto < 3 else 7))
    return frames, 3


GROUP = 'Knowledge'
CLIPS = [
 ('L18-rosch-ratings', 'Rosch (1975) · Typicality ratings', rosch_ratings, ['17:9', '17:10'],
  'The rating scale and the eight ratings are the ones shown in the slide figure. Members are placed one at a time.'),
 ('L18-typicality-effect', 'Sentence verification · The typicality effect', typicality, ['17:12'],
  'The two example sentences from the slide, then bars that redraw the approximate reaction times from the slide figure.'),
 ('L18-color-priming', 'Priming with a color name · Good and poor examples', color_priming, ['17:13', '17:14'],
  'The prime, the two-second gap and three kinds of color pair, with the reaction times given on the slide. The exact colors are illustrative.'),
 ('L18-basic-level', 'Rosch and colleagues (1976) · The basic level', basic_level, ['17:17', '17:18', '17:19', '17:20'],
  'The table of common features from the slide, built one level at a time, followed by the two naming examples. The objects are named in text and are not drawn.'),
 ('L18-experts-naming', 'Coley, Medin and Atran (1997), Tanaka and Taylor (1991) · Knowledge and naming', experts, ['17:21', '17:22'],
  'The plant-naming results as stated on the slide, then bars that redraw the approximate values from the Tanaka and Taylor figure.'),
 ('L18-semantic-network', 'Collins and Quillian (1969) · Network and response time', network, ['17:23', '17:24', '17:25'],
  'One branch of the network from the slide figure (living thing, animal, bird, canary), then the approximate response times from the slide graph.'),
 ('L18-lexical-decision', 'Meyer and Schvaneveldt · Lexical decision task', lexical_decision, ['17:26', '17:27'],
  'The four example pairs from the slide, one at a time, then bars that redraw the approximate reaction times from the slide figure. The display timing is illustrative.'),
 ('L18-connectionist-network', 'Connectionist network · From stimulus to back-propagation', connectionist, ['17:30', '17:31', '17:32', '17:33'],
  'A schematic network with input, hidden and output units and captions for each step of learning described on the slides. The number of units is illustrative, and no real weights are computed.'),
 ('L18-hidden-unit-learning', 'Connectionist network · Learning in the hidden units', hidden_learning, ['17:34'],
  'Bar patterns for rose, daisy and canary after 0, 250, 750 and 2,500 learning trials. The bar heights are illustrative and show the trend in the slide figure, not its exact values.'),
 ('L18-sensory-functional', 'Sensory-functional hypothesis · Ratings and patients', sensory_functional, ['17:38', '17:39'],
  'Bars redraw the approximate ratings for animals and artifacts and the approximate percent correct for patients K.C. and E.W. from the slide figures.'),
 ('L18-three-approaches', 'Three approaches to concepts in the brain', approaches, ['17:44', '17:40', '17:41', '17:43'],
  'The summary from the slide, built one approach at a time.'),
]
