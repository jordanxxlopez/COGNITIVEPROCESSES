"""Draw the figures that the Exam 2 study questions refer to but the review sheet does not supply.

Shapes are computed, not sketched: a string fixed at both ends in Mode n is sin(n*pi*x),
and a building fixed at the bottom and free at the top in Mode n is sin((2n-1)*pi*y/2).
Output: assets/exam2/gen-*.svg (same look as the review-sheet figures).
"""
import math
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "assets" / "exam2"
INK, LINE, PURPLE, BLUE, RED = "#1f3b4d", "#9fb3c8", "#7b4bb0", "#2f74b5", "#b0304a"
FONT = "font-family='Helvetica, Arial, sans-serif'"


def svg(w, h, body):
    return f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {w} {h}' width='{w}' height='{h}'><rect width='{w}' height='{h}' fill='white'/>{body}</svg>"


def string_strip(y0, n, label, color, x0=150, x1=760, amp=26, marks=()):
    pts = " ".join(f"{x0 + (x1 - x0) * i / 300:.1f},{y0 - amp * math.sin(n * math.pi * i / 300):.1f}" for i in range(301))
    body = f"<line x1='{x0}' y1='{y0}' x2='{x1}' y2='{y0}' stroke='{LINE}' stroke-width='1.5'/>"
    for x in (x0, x1):
        body += f"<rect x='{x - 4}' y='{y0 - 34}' width='8' height='68' fill='#c9d3dc'/>"
    body += f"<polyline points='{pts}' fill='none' stroke='{color}' stroke-width='4'/>"
    body += f"<text x='30' y='{y0 + 6}' {FONT} font-size='20' font-weight='bold' fill='{color}'>{label}</text>"
    for frac, name in marks:
        x = x0 + (x1 - x0) * frac
        y = y0 - amp * math.sin(n * math.pi * frac)
        body += f"<circle cx='{x:.1f}' cy='{y:.1f}' r='7' fill='{RED}'/><text x='{x + 10:.1f}' y='{y - 10:.1f}' {FONT} font-size='18' font-weight='bold' fill='{RED}'>{name}</text>"
    return body


def string_fig(name, strips, box=None, h=None):
    h = h or 90 * len(strips) + 20
    body = "".join(string_strip(60 + 90 * i, *s) for i, s in enumerate(strips))
    if box is not None:
        x = 150 + 610 * box
        body += f"<rect x='{x - 16:.1f}' y='12' width='32' height='{h - 24}' fill='none' stroke='{INK}' stroke-width='3'/>"
    (OUT / name).write_text(svg(800, h, body))


def building_fig(name, n, label):
    x0, y0, y1, amp = 200, 380, 40, 60
    pts = " ".join(f"{x0 + amp * math.sin((2 * n - 1) * math.pi * (i / 300) / 2):.1f},{y0 - (y0 - y1) * i / 300:.1f}" for i in range(301))
    body = f"<line x1='{x0}' y1='{y0}' x2='{x0}' y2='{y1}' stroke='{LINE}' stroke-width='1.5'/>"
    body += f"<rect x='{x0 - 80}' y='{y0}' width='160' height='14' fill='#c9d3dc'/>"
    body += f"<polyline points='{pts}' fill='none' stroke='{BLUE}' stroke-width='4'/>"
    body += f"<text x='{x0 - 40}' y='{y0 + 40}' {FONT} font-size='16' fill='{INK}'>fixed ground</text>"
    body += f"<text x='{x0 + 80}' y='{y1 + 6}' {FONT} font-size='16' fill='{INK}'>free top</text>"
    body += f"<text x='20' y='30' {FONT} font-size='20' font-weight='bold' fill='{BLUE}'>{label}</text>"
    (OUT / name).write_text(svg(420, 440, body))


def spectrum_fig(name, freqs, title, fmax):
    x0, x1, y0 = 70, 760, 230
    sx = lambda f: x0 + (x1 - x0) * f / fmax
    body = f"<line x1='{x0}' y1='{y0}' x2='{x1}' y2='{y0}' stroke='{INK}' stroke-width='2'/><line x1='{x0}' y1='{y0}' x2='{x0}' y2='40' stroke='{INK}' stroke-width='2'/>"
    for f in freqs:
        body += f"<line x1='{sx(f):.1f}' y1='{y0}' x2='{sx(f):.1f}' y2='80' stroke='{PURPLE}' stroke-width='5'/><text x='{sx(f):.1f}' y='{y0 + 24}' {FONT} font-size='15' text-anchor='middle' fill='{INK}'>{f}</text>"
    body += f"<text x='{(x0 + x1) / 2}' y='{y0 + 52}' {FONT} font-size='16' text-anchor='middle' fill='{INK}'>Frequency (Hz)</text>"
    body += f"<text x='22' y='140' {FONT} font-size='16' fill='{INK}' transform='rotate(-90 22 140)' text-anchor='middle'>Amplitude</text>"
    body += f"<text x='{x0}' y='26' {FONT} font-size='18' font-weight='bold' fill='{PURPLE}'>{title}</text>"
    (OUT / name).write_text(svg(800, 300, body))


def kanizsa(name):
    pts = [(200, 60), (80, 270), (320, 270)]
    body = ""
    for i, (x, y) in enumerate(pts):
        others = [p for j, p in enumerate(pts) if j != i]
        a1 = math.degrees(math.atan2(others[0][1] - y, others[0][0] - x))
        a2 = math.degrees(math.atan2(others[1][1] - y, others[1][0] - x))
        start, end = sorted([a1, a2])
        if end - start > 180:
            start, end = end, start + 360
        r = 45
        sx, sy = x + r * math.cos(math.radians(end)), y + r * math.sin(math.radians(end))
        ex, ey = x + r * math.cos(math.radians(start + 360)), y + r * math.sin(math.radians(start + 360))
        body += f"<path d='M{x},{y} L{sx:.1f},{sy:.1f} A{r},{r} 0 1,1 {ex:.1f},{ey:.1f} Z' fill='{INK}'/>"
    (OUT / name).write_text(svg(400, 330, body))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    string_fig("gen-string-mode3.svg", [(3, "Mode 3", PURPLE)])
    string_fig("gen-string-modes-3-4-box-middle.svg", [(3, "Mode 3", PURPLE), (4, "Mode 4", BLUE)], box=0.5)
    string_fig("gen-string-mode1-mode3-points.svg",
               [(1, "Mode 1", BLUE, 150, 760, 26, [(1 / 3, "B")]), (3, "Mode 3", PURPLE, 150, 760, 26, [(1 / 3, "B"), (0.5, "C")])])
    building_fig("gen-building-mode2.svg", 2, "Mode 2")
    spectrum_fig("gen-spectrum-fixed-fixed-200.svg", [200, 400, 600, 800, 1000, 1200], "String fixed at both ends, Mode 1 at 200 Hz", 1300)
    spectrum_fig("gen-spectrum-fixed-free-200.svg", [200, 600, 1000, 1400], "Fixed-free system, Mode 1 at 200 Hz", 1500)
    spectrum_fig("gen-spectrum-f0-150.svg", [150, 300, 450, 600, 750], "Vocal folds, F0 at 150 Hz", 850)
    kanizsa("gen-kanizsa-triangle.svg")


if __name__ == "__main__":
    main()
