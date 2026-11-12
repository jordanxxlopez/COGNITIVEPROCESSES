"""Build modern/bytopic.js: "Notes by topic", Lectures 11 to 18 merged by subject.

Notes: authoring/bytopic/notes_*.json (every slide that teaches a topic, merged once, written to
STYLE-GUIDE.md). Each block gets its slide or the professor's video (same rule as Study this first
v10). Questions: the plain concept questions for the topic's concepts, plus the Study this first
questions (with their figures) sorted into the matching topic.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "authoring"))

from exam2_versions import _slide_media, build_v9  # noqa: E402

BT = ROOT / "authoring" / "bytopic"
REF = re.compile(r"Lecture (\d+) · p([\d, ]+)")

# Study this first topic -> Notes by topic topic (keyword overrides below).
STUDY_MAP = {
    "modes": "modes", "springiness": "local-change", "harmonics-formants": "fixed-ends",
    "constrictions": "vowels", "source-filter": "source-filter", "spectrogram": "spectrogram",
    "network-forward": "vowel-network", "backprop": "learning", "pytorch": "code", "sigmoid": "sigmoid",
    "training": "training-results", "lead-up": "neurons-to-sequences", "heads-layers": "heads-depth",
    "llm-sequences": "neurons-to-sequences", "gestalt-cloze": "neurons-to-sequences",
    "recurrent-dynamical": "heads-depth", "agentic": "agents-software", "phonotactics": "phonotactics",
}
OVERRIDES = [
    (re.compile(r"single mass on a spring|infinite number of masses", re.I), "mass-spring"),
    (re.compile(r"air in the vocal tract a fixed-free", re.I), "air"),
    (re.compile(r"vocal folds .*membrane|membrane", re.I), "membrane-method"),
]


def lectures_of(blocks):
    nums = sorted({int(m.group(1)) for b in blocks for m in REF.finditer(b.get("ref", ""))})
    if not nums:
        return ""
    if len(nums) == 1:
        return f"Lecture {nums[0]}"
    return "Lectures " + ", ".join(str(n) for n in nums[:-1]) + f" and {nums[-1]}"


def attach_media(blocks, media):
    for b in blocks:
        for m in REF.finditer(b.get("ref", "")):
            lec = f"lecture{int(m.group(1))}"
            for p in [int(x) for x in m.group(2).replace(" ", "").split(",") if x]:
                found = media(lec, p)
                if found:
                    b["media"] = found
                    break
            if b.get("media"):
                break
    return blocks


def build(out_path=ROOT / "modern" / "bytopic.js"):
    topic_list = json.load(open(BT / "inputs" / "topic_list.json"))
    notes = {}
    for f in sorted(BT.glob("notes_*.json")):
        notes.update(json.load(open(f)))
    concepts = json.load(open(ROOT / "authoring" / "plain" / "concepts_plain.json"))["concepts"]
    media = _slide_media(overlay=True)

    # Study this first questions, with figures (v9), sorted into topics.
    es = (ROOT / "modern" / "essentials.js").read_text()
    study = json.loads(es[es.index("=") + 1:].rstrip().rstrip(";"))["versions"]["exam2-v9"]["topics"]
    extra = {tid: [] for tid, _, _ in topic_list}
    for t in study:
        for q in t["questions"]:
            target = STUDY_MAP.get(t["id"])
            for rx, tid in OVERRIDES:
                if rx.search(q["q"]):
                    target = tid
                    break
            if target:
                extra[target].append(q)

    topics = []
    for tid, title, cs in topic_list:
        blocks = attach_media(notes.get(tid, {}).get("blocks", []), media)
        qs, seen = [], set()
        for q in extra[tid]:
            if q["q"] not in seen:
                seen.add(q["q"]); qs.append(q)
        for c in cs:
            for k in ("q1", "q2"):
                q = concepts[c][k]
                if q["question"] not in seen:
                    seen.add(q["question"]); qs.append({"source": "", "q": q["question"], "a": q["answer"]})
        topics.append({"id": tid, "title": title, "lectures": lectures_of(blocks), "blocks": blocks, "questions": qs})
    out_path.write_text("window.LING285_BYTOPIC = " + json.dumps({"topics": topics}, ensure_ascii=False) + ";\n")
    return len(topics), sum(len(t["blocks"]) for t in topics), sum(len(t["questions"]) for t in topics)


if __name__ == "__main__":
    print(build())
