"""Read where the professor placed each video on his slides (from the original .pptx files).

Output: authoring/video-positions.json {"lectureNN-P": [{"video": "assets/original/<sha20>.mp4",
"box": [left%, top%, width%, height%]}]}, so the studio can overlay the video on the slide image.
"""
import hashlib
import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NS = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main",
      "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}


def positions(pptx, lec):
    import xml.etree.ElementTree as ET
    out = {}
    with zipfile.ZipFile(pptx) as z:
        pres = ET.fromstring(z.read("ppt/presentation.xml"))
        sz = pres.find("p:sldSz", NS)
        W, H = int(sz.get("cx")), int(sz.get("cy"))
        # slide order
        prels = ET.fromstring(z.read("ppt/_rels/presentation.xml.rels"))
        rid2target = {r.get("Id"): r.get("Target") for r in prels}
        order = [rid2target[s.get("{%s}id" % NS["r"])] for s in pres.find("p:sldIdLst", NS)]
        for n, target in enumerate(order, start=1):
            path = "ppt/" + target.lstrip("/").replace("ppt/", "")
            rels_path = re.sub(r"slides/(slide\d+\.xml)", r"slides/_rels/\1.rels", path)
            if rels_path not in z.namelist():
                continue
            rels = {r.get("Id"): r.get("Target") for r in ET.fromstring(z.read(rels_path))}
            slide = ET.fromstring(z.read(path))
            for pic in slide.iter("{%s}pic" % NS["p"]):
                vid = pic.find(".//a:videoFile", NS)
                ext_media = None
                if vid is not None:
                    ext_media = rels.get(vid.get("{%s}link" % NS["r"]))
                else:
                    for el in pic.iter():
                        if el.tag.endswith("}media") and el.get("{%s}embed" % NS["r"]):
                            ext_media = rels.get(el.get("{%s}embed" % NS["r"]))
                if not ext_media or not ext_media.lower().endswith((".mp4", ".mov", ".m4v")):
                    continue
                xfrm = pic.find(".//a:xfrm", NS)
                off, ext = xfrm.find("a:off", NS), xfrm.find("a:ext", NS)
                media_path = "ppt/" + ext_media.replace("../", "")
                sha = hashlib.sha256(z.read(media_path)).hexdigest()[:20]
                asset = f"assets/original/{sha}.mp4"
                if not (ROOT / asset).exists():
                    continue
                box = [round(100 * int(off.get("x")) / W, 2), round(100 * int(off.get("y")) / H, 2),
                       round(100 * int(ext.get("cx")) / W, 2), round(100 * int(ext.get("cy")) / H, 2)]
                out.setdefault(f"{lec}-{n}", []).append({"video": asset, "box": box})
    return out


def main():
    allpos = {}
    for i in range(11, 19):
        f = ROOT / "sources" / f"lecture{i}.pptx"
        if f.exists():
            allpos.update(positions(f, f"lecture{i}"))
    (ROOT / "authoring" / "video-positions.json").write_text(json.dumps(allpos, indent=1))
    return allpos


if __name__ == "__main__":
    p = main()
    print(len(p), "slides with placed videos")
    for k in ["lecture12-19", "lecture12-20", "lecture13-4", "lecture12-15", "lecture11-6"]:
        print(k, p.get(k))
