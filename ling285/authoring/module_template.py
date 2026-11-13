"""The per-module study template: "Study this first", "Notes by topic" and the exam review guide.

This is the structure Module II grew into (Study this first with its notes beside the slides and
the professor's videos played on them, Notes by topic, the review guide), written once so that any
module follows it. A module is a folder under authoring/ with:

  meta.json      moduleId, study (title, lead), scope (label, covers, final, evidence), flags,
                 versions ([{key, label, overlay, split, notes}]), bytopic (title, lead)
  topics.json    the topics, in study order. Each topic: id, tier, lectures, title,
                 blocks ([{ref, main, sub, end} or {ref, items}]: the Study this first notes),
                 more ([blocks that only Notes by topic shows: every remaining slide, merged once]),
                 questions (["review-3", "exam-8", {"source": "Predicted", "q", "a", "img?", "alt?"}])
  exam.json      review (title, lead, note, sets: [{id, title, about, prefix, items: [{number,
                 question, answer, img?, alt?}]}]) : the review sheet and the exam key

build(module_dir) writes modern/<moduleId>.js as window.LING285_<MODULEID> with
{moduleId, study, versions, bytopic, review}. Blocks get their slide or video from
module_media.media_for(ref), so a block's `ref` ("Lecture 03 · p5 · Lecture 07 · p4") is the only
link to the sources. Adding a lecture means adding its pages to topics.json (new blocks, or new
pages in a ref) and its questions; nothing else changes.
"""
import copy
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from module_media import make_lookup  # noqa: E402

BANNED = [
    (re.compile(r"\b(?:the|a|this|that|their|its|his) \w+ picture\b", re.I), "picture as a noun"),
    (re.compile(r"\bpictured\b|\bpictures\b", re.I), "picture as a noun or verb other than imagine"),
    (re.compile(r"\b(thus|hence|whereby|mediated|digitizes|downstream|fares worse)\b", re.I), "formal filler"),
    (re.compile(r"\bBasically\b"), "Basically"),
    (re.compile(r"(?:^|\s)(?:the|this) (?:lecture|slide|professor|class)\b", re.I), "lecture or professor mention"),
    (re.compile(r"[→←↑↓=;]"), "arrow, equals sign or semicolon in prose"),
    (re.compile(r"\bblame\b|\bcredit\b", re.I), "borrowed idea (blame, credit)"),
]
LABEL_LINE = re.compile(r"^(?:\*\*)?[A-Z][^:*]{1,40}(?:\*\*)?: [A-Z]")


def _texts(block):
    for k in ("main", "end"):
        if block.get(k):
            yield block[k]
    for x in block.get("sub") or []:
        yield x
    for x in block.get("items") or []:
        yield x


def check_text(text, where, problems):
    plain = text.replace("**", "")
    for rx, why in BANNED:
        m = rx.search(plain)
        if m and not (why.startswith("arrow") and re.search(r"\[[^\]]*\]", plain) and m.group(0) == "="):
            problems.append(f"{where}: {why} ({m.group(0)!r})")
    if LABEL_LINE.match(plain) and not re.match(r"^(?:Done|Dean|Dune|Dan|Don|Mode \d|Step \d)", plain):
        problems.append(f"{where}: label line ({plain[:40]!r})")


def expand_questions(topic, exam):
    items = {}
    for s in exam["review"]["sets"]:
        for it in s["items"]:
            items[f"{s['id']}-{it['number']}"] = dict(source=f"{s['prefix']} {it['number']}", q=it["question"], a=it["answer"],
                                                        **({"img": it["img"], "alt": it.get("alt", "")} if it.get("img") else {}))
    out = []
    for q in topic.get("questions", []):
        if isinstance(q, str):
            if q not in items:
                raise KeyError(f"{topic['id']}: unknown question id {q}")
            out.append(dict(items[q]))
        else:
            out.append(dict(source=q.get("source", "Predicted"), q=q["q"], a=q["a"],
                            **({"img": q["img"], "alt": q.get("alt", "")} if q.get("img") else {})))
    return out


def attach(blocks, media_for, overlay):
    out = []
    for b in blocks:
        b = copy.deepcopy(b)
        m = media_for(b.get("ref", ""))
        if m:
            m = dict(m)
            if not overlay and m.get("image"):
                for k in ("videos", "video", "box", "poster"):
                    m.pop(k, None)
                m["caption"] = m["caption"].replace(" · with the video played on the slide", "")
            b["media"] = m
        out.append(b)
    return out


def build(module_dir, out_path=None):
    module_dir = Path(module_dir)
    meta = json.load(open(module_dir / "meta.json"))
    topics = [t for f in sorted(module_dir.glob("topics*.json")) for t in json.load(open(f))]
    exam = json.load(open(module_dir / "exam.json"))
    media_for = make_lookup()
    problems = []
    pages = {(c["id"], s["page"]) for c in json.load(open(ROOT / "data.json"))["collections"] for s in c["sections"]}

    for t in topics:
        for b in t.get("blocks", []) + t.get("more", []):
            if not b.get("ref"):
                problems.append(f"{t['id']}: block without ref")
            for cid, p in media_for.pages_for(b.get("ref", "")):
                if (cid, p) not in pages:
                    problems.append(f"{t['id']}: ref {b['ref']!r} names a page that is not in data.json ({cid} p{p})")
            for text in _texts(b):
                check_text(text, f"{t['id']} · {b.get('ref', '')}", problems)
        for q in expand_questions(t, exam):
            if not q["q"].strip() or not q["a"].strip():
                problems.append(f"{t['id']}: empty question or answer")
            check_text(q["a"], f"{t['id']} · {q['source']}", problems)
    for s in exam["review"]["sets"]:
        for it in s["items"]:
            check_text(it["answer"], f"{s['id']}-{it['number']}", problems)
    if problems:
        raise SystemExit("Fix these before building:\n  " + "\n  ".join(problems))

    versions = {}
    for v in meta["versions"]:
        versions[v["key"]] = {
            "label": v["label"], "range": meta["range"], "split": True, "notes": bool(v.get("notes", True)),
            "howToAnswer": [], "scope": meta["scope"], "flags": meta.get("flags", []),
            "topics": [dict(id=t["id"], tier=t["tier"], lectures=t["lectures"], title=t["title"], note=t.get("note", ""),
                            blocks=attach(t["blocks"], media_for, v.get("overlay", True)),
                            questions=expand_questions(t, exam)) for t in topics],
        }
    bytopic = {
        "title": meta["bytopic"]["title"], "lead": meta["bytopic"]["lead"],
        "topics": [dict(id=t["id"], title=t["title"], lectures=t["lectures"],
                        blocks=attach(t["blocks"] + t.get("more", []), media_for, True),
                        questions=expand_questions(t, exam)) for t in topics],
    }
    review = dict(exam["review"])
    for s in review["sets"]:
        s["items"] = [dict(it, source=f"{s['prefix']} {it['number']}") for it in s["items"]]
    data = {"moduleId": meta["moduleId"], "title": meta["title"], "study": meta["study"],
            "versions": versions, "bytopic": bytopic, "review": review}
    out_path = Path(out_path or ROOT / "modern" / f"{meta['moduleId']}.js")
    out_path.write_text(f"window.LING285_{meta['moduleId'].upper()} = " + json.dumps(data, ensure_ascii=False) + ";\n")
    n_blocks = sum(len(t["blocks"]) for t in topics)
    n_more = sum(len(t.get("more", [])) for t in topics)
    n_q = sum(len(expand_questions(t, exam)) for t in topics)
    return {"topics": len(topics), "blocks": n_blocks, "more": n_more, "questions": n_q,
            "review": sum(len(s["items"]) for s in review["sets"])}


if __name__ == "__main__":
    print(build(sys.argv[1] if len(sys.argv) > 1 else ROOT / "authoring" / "module1"))
