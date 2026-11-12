"""Build modern/plain.js: the "Plain wording" data for the Module II panels.

Sources are the reviewed rewrites in authoring/plain/*.json, written to STYLE-GUIDE.md.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
P = ROOT / "authoring" / "plain"


def build(out_path=ROOT / "modern" / "plain.js"):
    concepts = json.load(open(P / "concepts_plain.json"))
    panels = json.load(open(P / "panels_plain.json"))
    review = json.load(open(P / "review_plain.json"))
    items = json.load(open(ROOT / "exam2-review.json"))["items"]
    by_id = {i["id"]: i for i in items}
    data = {
        "concepts": concepts["concepts"],
        "connectionQs": concepts["connections"],
        "cards": panels["cards"], "contrasts": panels["contrasts"], "hard": panels["hard"],
        "connections": panels["connections"], "figures": panels["figures"], "asked": panels["asked"],
        "review": {str(by_id[k]["number"]): dict(v, question=by_id[k]["question"]) for k, v in review.items()},
    }
    out_path.write_text("window.LING285_PLAIN = " + json.dumps(data, ensure_ascii=False) + ";\n")
    return {k: len(v) for k, v in data.items()}


if __name__ == "__main__":
    print(build())
