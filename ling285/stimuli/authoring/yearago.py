"""Render the "Where were you a year ago?" fixed-free mass-spring model video.

Drawn in the same style as the lecture 12/13 slide animations (two longitudinal
chains for Mode 1 and Mode 2, fixed wall at the glottis, free end at the lips,
squeezed region drawn as heavier dark-red masses and stiffer springs).

Formant movement is computed, not hand-placed. Each sound is reduced to its main
squeeze place (lips, about 2/3 from the glottis, about 1/3 from the glottis, or
none). The shift of each formant follows the lecture's mass-spring rule
(perturbation theory for a tube closed at the glottis and open at the lips):
a squeeze where the air moves in that mode lowers the formant, and a squeeze
where the air is springy raises it. For mode n the sensitivity at position x
(0 = glottis, 1 = lips) is cos(2 k_n x) with k_n = (2n - 1) pi / 2, which is
positive where the air is springy and negative where it moves.

This is a simplified teaching model, not a recording or a measured spectrogram.

Usage: python3 yearago.py OUT.mp4 POSTER.jpg
"""
import math
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1280, 720, 30
FONT_DIR = Path('/System/Library/Fonts/Supplemental')
UNI = str(FONT_DIR / 'Arial Unicode.ttf')
BOLD = str(FONT_DIR / 'Arial Bold.ttf')


def font(path, size):
    return ImageFont.truetype(path, size)


F_TITLE, F_H, F_TXT, F_SM, F_XS = font(BOLD, 26), font(BOLD, 19), font(UNI, 17), font(UNI, 14), font(UNI, 12)
F_WORD, F_WORD_B = font(UNI, 30), font(BOLD, 30)

BG = (243, 247, 247)
INK = (27, 42, 56)
MUTED = (100, 112, 122)
BLUE = (70, 136, 210)
BLUE_EDGE = (35, 80, 140)
RED = (150, 20, 28)
ORANGE = (200, 110, 30)
TEAL = (30, 130, 150)
PINK = (214, 76, 128)
BAND = (40, 44, 52)

BASE = {1: 500.0, 2: 1500.0}        # schwa formants used in the lectures
C = 0.45                            # size of the formant shift for a full squeeze
SIGMA = 0.07                        # width of a squeeze along the tube
X = np.linspace(0, 1, 401)

WORDS = ['Where', 'were', 'you', 'a', 'year', 'ago?']
# (word index, sound label, squeezes [(place 0..1 from glottis, strength)], caption)
SEGMENTS = [
    (None, '', [], 'Start from schwa. No squeeze, so the formants sit near 500 and 1500 Hz.'),
    (0, 'w', [(1.0, 1.0)], 'w in where. The lips round, which squeezes the air at the free end.'),
    (0, 'e', [(0.67, 0.45)], 'e in where. The tongue moves toward the front, a lighter squeeze near 2/3.'),
    (1, 'w', [(1.0, 1.0)], 'w in were. The lips round again, squeezing the air at the free end.'),
    (2, 'y', [(0.67, 1.0)], 'y in you. The tongue squeezes near the front, 2/3 from the glottis, like /i/.'),
    (2, 'ou', [(1.0, 1.0)], 'ou in you. The lips round, squeezing the air at the free end, like /u/.'),
    (3, 'a', [], 'a. A schwa, so there is no squeeze and the formants go back near 500 and 1500.'),
    (4, 'y', [(0.67, 1.0)], 'y in year. The tongue squeezes near the front, 2/3 from the glottis, like /i/.'),
    (4, 'ear', [(0.67, 0.6)], 'ear in year. The front squeeze stays, but it is a little lighter.'),
    (5, 'a', [], 'a in ago. Another schwa, so the squeeze goes away.'),
    (5, 'go', [(0.33, 0.7), (1.0, 0.6)], 'go in ago. The tongue moves back near 1/3 and the lips round.'),
    (None, '', [], 'Back to schwa. Then the sentence starts again.'),
]
HOLD, MOVE, START_HOLD = 2.2, 0.6, 1.4


def gauss(center):
    g = np.exp(-0.5 * ((X - center) / SIGMA) ** 2)
    return g / np.trapezoid(g, X)


def sensitivity(n):
    return np.cos(2 * (2 * n - 1) * math.pi / 2 * X)


def formants(squeezes):
    out = {}
    for n in (1, 2):
        shift = sum(a * np.trapezoid(gauss(c) * sensitivity(n), X) for c, a in squeezes)
        out[n] = BASE[n] * (1 + C * shift)
    return out


def profile(squeezes):
    w = np.zeros_like(X)
    for c, a in squeezes:
        g = np.exp(-0.5 * ((X - c) / SIGMA) ** 2)
        w += a * g
    return np.clip(w, 0, 1.2)


def rule_text(n, squeezes):
    if not squeezes:
        return f'No squeeze, so F{n} stays near {int(BASE[n])} Hz.'
    parts = []
    for c, a in squeezes:
        s = float(np.trapezoid(gauss(c) * sensitivity(n), X))
        parts.append(s)
    total = sum(a * s for (c, a), s in zip(squeezes, parts))
    if len(squeezes) == 1:
        if parts[0] < 0:
            return f'The air there is moving in Mode {n}, so the extra mass counts and F{n} goes down ↓'
        return f'The air there is springy in Mode {n}, so the extra stiffness counts and F{n} goes up ↑'
    word = 'down ↓' if total < 0 else 'up ↑'
    if all(x < 0 for x in parts):
        return f'Both squeezes are where the air is moving in Mode {n}, so the extra mass counts and F{n} goes {word}'
    return f'One squeeze is springy and one is moving in Mode {n}. They partly cancel, and overall F{n} goes {word}'


def smooth(t):
    return t * t * (3 - 2 * t)


# Timeline: each segment holds, then blends into the next one.
starts, t = [], 0.0
for i, _ in enumerate(SEGMENTS):
    starts.append(t)
    t += (START_HOLD if i in (0, len(SEGMENTS) - 1) else HOLD) + MOVE
DURATION = t
NFRAMES = int(round(DURATION * FPS))
TARGET = [formants(s[2]) for s in SEGMENTS]
PROF = [profile(s[2]) for s in SEGMENTS]


def state(time):
    """Return (segment index, blend 0..1 toward next, formants, squeeze profile)."""
    for i in range(len(SEGMENTS)):
        end = starts[i + 1] if i + 1 < len(SEGMENTS) else DURATION
        if time < end:
            hold_end = end - MOVE
            nxt = (i + 1) % len(SEGMENTS)
            b = 0.0 if time < hold_end else smooth((time - hold_end) / MOVE)
            f = {n: (1 - b) * TARGET[i][n] + b * TARGET[nxt][n] for n in (1, 2)}
            p = (1 - b) * PROF[i] + b * PROF[nxt]
            return i, b, f, p
    return len(SEGMENTS) - 1, 0.0, TARGET[-1], PROF[-1]


TRACK = [state(k / FPS)[2] for k in range(NFRAMES)]

# Each mode's phase speeds up or slows down with its formant, so a lower formant
# visibly vibrates more slowly. Rates are scaled so the loop closes on whole cycles.
CYCLES = {1: 18, 2: 54}
PHASE = {}
for n in (1, 2):
    rate = np.array([TRACK[k][n] / BASE[n] for k in range(NFRAMES)])
    cum = np.concatenate([[0], np.cumsum(rate)[:-1]])
    PHASE[n] = 2 * math.pi * CYCLES[n] * cum / cum[-1] if cum[-1] else cum

# Layout
X0, X1 = 92, 1176
NM = 34
PLACES = [(1 / 3, '1/3  /a/', ORANGE), (2 / 3, '2/3  /i/', TEAL), (1.0, 'lips  /u/', RED)]


def xpix(x):
    return X0 + 16 + x * (X1 - X0 - 16)


def spring(d, xa, xb, y, weight):
    coils = 6 + int(round(4 * weight))
    pts = [(xa, y)]
    span = xb - xa
    for j in range(1, 2 * coils):
        pts.append((xa + span * j / (2 * coils), y + (5 if j % 2 else -5)))
    pts.append((xb, y))
    col = tuple(int((1 - weight) * c0 + weight * c1) for c0, c1 in zip((60, 66, 74), RED))
    d.line(pts, fill=col, width=1 + int(round(2 * weight)))


def draw_chain(d, y, n, phase, prof, f_now):
    d.text((X0 - 70, y - 60), 'fixed', font=F_XS, fill=MUTED)
    d.text((X0 - 70, y - 46), 'glottis', font=F_XS, fill=MUTED)
    d.text((X1 - 50, y - 60), 'free end', font=F_XS, fill=MUTED)
    d.text((X1 - 50, y - 46), 'lips', font=F_XS, fill=MUTED)
    title = f'Mode {n}  (F{n}: ' + ('lowest' if n == 1 else 'next') + ' fixed-free air mode)'
    d.text((X0 + 26, y - 58), title, font=F_H, fill=INK)
    d.text((X1 - 330, y - 56), f'F{n} now ≈ {int(round(f_now / 10) * 10)} Hz', font=F_H, fill=PINK)
    # wall
    d.rectangle([X0 - 6, y - 32, X0 + 6, y + 32], fill=(66, 74, 84))
    for k in range(-30, 34, 9):
        d.line([(X0 - 6, y + k), (X0 - 18, y + k + 9)], fill=MUTED, width=1)
    d.line([(X0, y + 42), (X1 + 6, y + 42)], fill=(150, 160, 168), width=2)
    for place, label, col in PLACES:
        px = xpix(place)
        d.line([(px, y - 30), (px, y + 32)], fill=col, width=2)
        d.text((px - 22, y + 46), label, font=F_XS, fill=col)
    k = (2 * n - 1) * math.pi / 2
    amp = 0.36 * (X1 - X0) / NM
    xs = [(i + 1) / NM for i in range(NM)]
    pos = [xpix(x) + amp * math.sin(k * x) * math.sin(phase) for x in xs]
    w = [float(np.interp(x, X, prof)) for x in xs]
    prev = X0 + 6
    for i, px in enumerate(pos):
        spring(d, prev, px - 6, y, min(1.0, w[i]))
        prev = px + 6
    for i, px in enumerate(pos):
        r = 6 + 5 * min(1.0, w[i])
        fill = tuple(int((1 - min(1, w[i])) * c0 + min(1, w[i]) * c1) for c0, c1 in zip(BLUE, RED))
        d.ellipse([px - r, y - r, px + r, y + r], fill=fill, outline=BLUE_EDGE if w[i] < 0.5 else (90, 10, 15))


def draw_words(d, seg_i, blend):
    seg = SEGMENTS[seg_i]
    x = 92
    y = 66
    for wi, word in enumerate(WORDS):
        active = seg[0] == wi and blend < 0.5
        f = F_WORD_B if active else F_WORD
        tw = d.textlength(word, font=f)
        if active:
            d.rounded_rectangle([x - 8, y - 4, x + tw + 8, y + 40], radius=8, fill=(252, 226, 236), outline=PINK, width=2)
            sound = seg[1]
            sw = d.textlength(sound, font=F_H)
            d.rounded_rectangle([x + tw / 2 - sw / 2 - 8, y + 44, x + tw / 2 + sw / 2 + 8, y + 70], radius=6, fill=PINK)
            d.text((x + tw / 2 - sw / 2, y + 46), sound, font=F_H, fill=(255, 255, 255))
        d.text((x, y), word, font=f, fill=PINK if active else INK)
        x += tw + 26


def draw_track(d, frame):
    top, bot = 524, 666
    left, right = X0, X1
    d.rectangle([left, top, right, bot], fill=(255, 255, 255), outline=(200, 208, 214))
    fmax = 2400.0

    def fy(f):
        return bot - (f / fmax) * (bot - top)

    for f in (500, 1000, 1500, 2000):
        d.line([(left, fy(f)), (left + 6, fy(f))], fill=MUTED)
        d.text((left - 44, fy(f) - 8), str(f), font=F_XS, fill=MUTED)
    for f in (500, 1500):
        for xx in range(left, right, 14):
            d.line([(xx, fy(f)), (xx + 6, fy(f))], fill=(190, 198, 204))
    d.text((left - 64, top - 2), 'Hz', font=F_XS, fill=MUTED)
    d.text((left + 8, top + 4), 'Formant track (like the dark bands of a spectrogram)', font=F_SM, fill=MUTED)

    def tx(k):
        return left + (right - left) * k / (NFRAMES - 1)

    for n in (1, 2):
        pts = [(tx(k), fy(TRACK[k][n])) for k in range(0, NFRAMES, 2)]
        d.line(pts, fill=(205, 210, 216), width=10, joint='curve')
        done = [(tx(k), fy(TRACK[k][n])) for k in range(0, frame + 1, 2)] + [(tx(frame), fy(TRACK[frame][n]))]
        if len(done) > 1:
            d.line(done, fill=BAND, width=10, joint='curve')
        d.text((right + 8, fy(TRACK[frame][n]) - 9), f'F{n}', font=F_H, fill=INK)
    px = tx(frame)
    d.line([(px, top), (px, bot)], fill=PINK, width=3)
    for i, seg in enumerate(SEGMENTS):
        if not seg[1]:
            continue
        end = starts[i + 1] if i + 1 < len(SEGMENTS) else DURATION
        mid = (starts[i] + end - MOVE) / 2
        lx = left + (right - left) * mid / DURATION
        lab = seg[1]
        d.text((lx - d.textlength(lab, font=F_XS) / 2, bot + 4), lab, font=F_XS, fill=MUTED)


def render(frame):
    t = frame / FPS
    seg_i, blend, f_now, prof = state(t)
    img = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(img)
    d.text((40, 18), 'Where were you a year ago?  The vocal tract as a fixed-free mass-spring chain', font=F_TITLE, fill=INK)
    draw_words(d, seg_i, blend)
    show = seg_i if blend < 0.5 else (seg_i + 1) % len(SEGMENTS)
    seg = SEGMENTS[show]
    d.text((40, 150), seg[3], font=F_TXT, fill=INK)
    draw_chain(d, 238, 1, PHASE[1][frame], prof, f_now[1])
    d.text((X0 + 26, 300), rule_text(1, seg[2]), font=F_SM, fill=PINK if seg[2] else MUTED)
    draw_chain(d, 418, 2, PHASE[2][frame], prof, f_now[2])
    d.text((X0 + 26, 480), rule_text(2, seg[2]), font=F_SM, fill=PINK if seg[2] else MUTED)
    draw_track(d, frame)
    d.text((40, 696), 'Simplified teaching model. Each sound is reduced to its main squeeze place, and the formant shifts follow '
           'the mass-spring rule. Not a recording.', font=F_XS, fill=MUTED)
    return img


def main(out, poster):
    with tempfile.TemporaryDirectory() as tmp:
        for k in range(NFRAMES):
            render(k).save(f'{tmp}/f{k:05d}.png')
        render(int(starts[4] * FPS + 10)).save(poster, quality=90)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(FPS), '-i', f'{tmp}/f%05d.png',
                        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '22', '-preset', 'slow',
                        '-movflags', '+faststart', '-an', out], check=True)
    print('frames', NFRAMES, 'seconds', round(DURATION, 2))
    for seg, f in zip(SEGMENTS, TARGET):
        print(f'{seg[1] or "schwa":>5}  F1 {f[1]:6.0f}  F2 {f[2]:6.0f}')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
