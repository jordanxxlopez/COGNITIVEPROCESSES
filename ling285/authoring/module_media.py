"""Slide and video lookup for any module's "Study this first" and "Notes by topic" blocks.

A block names its source pages in `ref`, for example "Lecture 03 · p5 · Lecture 05–06 · p10".
media_for(ref) returns the first page that has a slide image or a video, as
{"image": slide webp, "videos": [{"video", "box", "poster"}], "caption"} for a slide with the
professor's videos placed where he put them (box = left, top, width, height in percent), or
{"video", "poster", "caption"} for a blank slide whose only content is the video, or
{"image", "caption"} for a plain slide. Lecture numbers map to the collection ids in data.json
("05–06" is the combined deck "lecture05-06"), so new lectures work as soon as their deck is
extracted and `video_positions.py` has run.
"""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REF = re.compile(r"Lecture (\d+(?:[–-]\d+)?) · p([\d, ]+)")
FRAMES = ROOT / "assets" / "frames"


def _collections():
    d = json.load(open(ROOT / "data.json"))
    by_number = {}
    for c in d["collections"]:
        if c.get("role") == "lecture" and c.get("number"):
            by_number[c["number"].replace("-", "–")] = c["id"]
            by_number[c["number"].lstrip("0").replace("-", "–")] = c["id"]
    return by_number


def _videos_by_page():
    manifest = json.load(open(ROOT / "stimuli" / "manifest.json"))
    out = {}
    for e in manifest:
        if e.get("type") == "video" and e["id"].startswith("source-"):
            for s in e.get("slides") or []:
                s = s["id"] if isinstance(s, dict) else s
                m = re.match(r"(lecture[\d-]+)-p0*(\d+)$", s)
                if m:
                    out.setdefault(f"{m.group(1)}-{m.group(2)}", e)
    return out


def poster_for(video):
    """A still frame for a video, made once with ffmpeg into assets/frames/<stem>.jpg."""
    stem = Path(video).stem
    for candidate in (ROOT / "assets" / "exam2" / "frames" / f"{stem}.jpg", FRAMES / f"{stem}.jpg"):
        if candidate.exists():
            return str(candidate.relative_to(ROOT))
    FRAMES.mkdir(parents=True, exist_ok=True)
    target = FRAMES / f"{stem}.jpg"
    try:
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "1", "-i", str(ROOT / video),
                        "-frames:v", "1", "-q:v", "4", str(target)], check=True, timeout=60)
    except Exception:
        return ""
    return str(target.relative_to(ROOT)) if target.exists() else ""


def _blank(img):
    from PIL import Image, ImageStat
    return ImageStat.Stat(Image.open(img).convert("L")).stddev[0] < 1


def make_lookup():
    cols = _collections()
    positions = json.load(open(ROOT / "authoring" / "video-positions.json"))
    videos = _videos_by_page()

    def label(num, page):
        return f"Lecture {num} · p{page}"

    def page_media(num, page):
        cid = cols.get(num) or cols.get(num.lstrip("0"))
        if not cid:
            return None
        img = ROOT / "assets" / "slides" / cid / f"{page:03d}.webp"
        if not img.exists():
            return None
        placed = positions.get(f"{cid}-{page}")
        if placed:
            vids = [{"video": v["video"], "box": v["box"], "poster": poster_for(v["video"])} for v in placed]
            first = vids[0]
            return {"image": f"assets/slides/{cid}/{page:03d}.webp", "videos": vids,
                    "video": first["video"], "box": first["box"], "poster": first["poster"],
                    "caption": label(num, page) + " · with the video played on the slide"}
        key = f"{cid}-{page}"
        if _blank(img):
            if key in videos:
                v = videos[key]
                return {"video": v["file"], "poster": poster_for(v["file"]),
                        "caption": label(num, page) + " · " + v.get("title", "")}
            return None
        return {"image": f"assets/slides/{cid}/{page:03d}.webp", "caption": label(num, page)}

    def media_for(ref):
        for m in REF.finditer(ref or ""):
            num = m.group(1).replace("-", "–")
            for p in [int(x) for x in m.group(2).replace(" ", "").split(",") if x]:
                found = page_media(num, p)
                if found:
                    return found
        return None

    def pages_for(ref):
        out = []
        for m in REF.finditer(ref or ""):
            num = m.group(1).replace("-", "–")
            cid = cols.get(num) or cols.get(num.lstrip("0"))
            for p in [int(x) for x in m.group(2).replace(" ", "").split(",") if x]:
                out.append((cid, p))
        return out

    media_for.pages_for = pages_for
    return media_for
