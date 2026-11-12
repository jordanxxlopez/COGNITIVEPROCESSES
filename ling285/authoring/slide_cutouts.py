"""Make transparent cut-outs of what sits ON TOP of the professor's videos (reveal tables, labels).

For each slide that has a video placed on it, the slide image is the video's backdrop plus the
content drawn over the video. The flat background colour is made transparent, so only that
content stays (white table cells stay opaque, as they covered the video in class).
Output: assets/exam2/overlays/<lecture>-<page>.png, and overlays.json listing which slides have
any content left (blank ones are skipped).
"""
import json
from collections import Counter
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "exam2" / "overlays"


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    positions = json.load(open(ROOT / "authoring" / "video-positions.json"))
    found = {}
    for key in positions:
        lec, page = key.split("-")
        src = ROOT / "assets" / "slides" / lec / f"{int(page):03d}.webp"
        if not src.exists():
            continue
        im = Image.open(src).convert("RGBA")
        bg = Counter(im.get_flattened_data() if hasattr(im,'get_flattened_data') else im.getdata()).most_common(1)[0][0]
        data = [(r, g, b, 0) if max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2])) <= 6 else (r, g, b, a)
                for r, g, b, a in im.getdata()]
        im.putdata(data)
        opaque = sum(1 for p in data if p[3])
        if opaque / len(data) < 0.002:
            continue
        # Give the revealed content a solid white card (its cells had the slide colour, so they would
        # otherwise be see-through over the video): fill its bounding box, padded, then redraw it.
        alpha = im.getchannel("A")
        x0, y0, x1, y1 = alpha.getbbox()
        reveal = (x1 - x0) * (y1 - y0) / (im.width * im.height) < 0.2
        name = f"{lec}-{int(page):03d}.png"
        if not reveal:
            # Labels and boxes that stay on the slide: shown on top as they are, no card.
            im.save(OUT / name, optimize=True)
            found[key] = {"src": f"assets/exam2/overlays/{name}?v=2", "mode": "always"}
            continue
        pad = 14
        card = Image.new("RGBA", im.size, (0, 0, 0, 0))
        from PIL import ImageDraw
        ImageDraw.Draw(card).rounded_rectangle([max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)],
                                               radius=12, fill=(255, 255, 255, 245), outline=(200, 210, 216, 255), width=2)
        card.alpha_composite(im)
        im = card
        im.save(OUT / name, optimize=True)
        found[key] = {"src": f"assets/exam2/overlays/{name}?v=2", "mode": "reveal"}
    (ROOT / "authoring" / "overlays.json").write_text(json.dumps(found, indent=1))
    return found


if __name__ == "__main__":
    f = main()
    print(len(f), "slides with content on top of the video")
