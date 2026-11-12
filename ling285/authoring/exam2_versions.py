"""Two more "Study this first" versions built on v7.

v8, standalone questions: every question makes sense on its own (no "this picture", "the box",
"point B", "that same weight", "Lab 9"), no source tags, no notes about the lecture or professor.
v9, questions with figures: v7's wording kept, with the figure shown under each question that
needs one and the spectrum drawing shown with the answer.
"""
import copy

FIG = "assets/exam2/"

# (topic id, question index) -> (new question, new answer or None to keep)
STANDALONE = {
 ("springiness", 0): ("In Mode 5 of a string fixed at both ends, where is the most springiness?",
  "The most springiness is at the two fixed ends and at the four points where the string crosses its middle line, six places in all. The string does not move at those points, but the pieces on either side move in opposite directions. So the string there is stretched and compressed the most. The tops of the five bumps have the most motion and the least springiness."),
 ("springiness", 1): ("In Mode 3 of a string fixed at both ends, where is the most springiness, and where is the most motion?", None),
 ("springiness", 2): ("In Mode 4 of a building, where is the most springiness?",
  "The most springiness is at the fixed base and at the three points where the building crosses its resting position, four places in all. Those points do not move, but the parts above and below them move in opposite directions. So the structure there stretches and compresses the most. The free top moves the most and is the least springy."),
 ("springiness", 3): ("In Mode 2 of a building, where is the most springiness?", None),
 ("springiness", 4): ("A string fixed at both ends has Mode 3 at 300 Hz and Mode 4 at 400 Hz. At one spot, Mode 3 crosses its middle line and Mode 4 is at the top of a bump. If we increase the stiffness and mass of the string at that spot, what happens to Mode 3 and Mode 4's frequencies, and why?",
  "Mode 3's frequency goes up and Mode 4's frequency goes down. In Mode 3 that spot does not move but is stretched the most, so the added mass does nothing and the added stiffness raises the frequency. In Mode 4 that spot moves the most and is not stretched, so the added mass lowers the frequency and the added stiffness does nothing."),
 ("springiness", 5): ("Mass and stiffness are added to a string fixed at both ends at a spot where Mode 3 moves the most and Mode 4 crosses its middle line. What happens to Mode 3 and Mode 4?", None),
 ("springiness", 8): ("In Mode 3 of a string fixed at both ends, one spot does not move and another spot is at the bottom of a bump. What happens to Mode 3 if you add a small weight at the still spot? At the bottom of the bump? If you stiffen the string at the still spot?",
  "A weight at the still spot leaves Mode 3 the same, because that spot does not move in Mode 3. A weight at the bottom of the bump lowers Mode 3's frequency, because that spot swings the most and the extra mass counts there. Stiffening the string at the still spot raises Mode 3's frequency, because that is where the string stretches the most."),
 ("springiness", 9): ("A spot on a string fixed at both ends does not move in Mode 3 but does move in Mode 1. Does a weight at that spot change Mode 1's frequency?",
  "Yes, a weight at that spot lowers Mode 1's frequency. In Mode 1 the whole string is one bump, so the spot is moving. Extra mass at a moving spot slows the vibration, so the frequency goes down."),
 ("harmonics-formants", 5): ("What part of speech is a fixed-free system, with formants at 1, 3 and 5 times the base frequency?", None),
 ("harmonics-formants", 9): ("A string fixed at both ends has Mode 1 at 200 Hz. Describe its spectrum up to Mode 6.", None),
 ("harmonics-formants", 10): ("A fixed-free system has Mode 1 at 200 Hz. Describe its spectrum up to Mode 4.", None),
 ("harmonics-formants", 11): ("The vocal folds have their base frequency, F0, at 150 Hz. Describe the spectrum for the first 5 harmonics.", None),
 ("network-forward", 1): ("An activation of 1.57 feeds the done output through a negative weight. If the activation goes up, what happens to the probability of done?", None),
 ("pytorch", 0): ("A network's code is nn.Sequential(nn.Linear(2, 3), nn.Linear(3, 2), nn.Linear(2, 4), nn.Linear(4, 5)). How many hidden layers does it have?", None),
 ("pytorch", 1): ("Start from nn.Linear(2, 3), nn.Linear(3, 2), nn.Linear(2, 4), nn.Linear(4, 5). Write the code with an additional hidden layer of 3 neurons right before the output layer, and adjust the other layers.", None),
 ("pytorch", 2): ("Start from nn.Linear(2, 3), nn.Linear(3, 2), nn.Linear(2, 4), nn.Linear(4, 5). If you add a hidden layer of 6 neurons right after the input, what changes?", None),
 ("sigmoid", 2): ("A hidden neuron's inner product is minus 2. If one input to that neuron goes up through a positive weight, what happens to its linear activation and its sigmoid activation?", None),
 ("gestalt-cloze", 2): ("In the Gestalt triangle figure, three black circles each have a wedge cut out, and the wedges face each other. Why do people see a triangle?", None),
 ("agentic", 0): ("What is an agentic system, in terms of LLMs? Describe an example of one.", None),
}

# v9: (topic id, question index) -> figure under the question, and/or figure with the answer
FIGURES = {
 ("springiness", 0): {"img": FIG + "q06-string-mode5.png", "alt": "Mode 5 of a string fixed at both ends, with five bumps"},
 ("springiness", 1): {"img": FIG + "gen-string-mode3.svg", "alt": "Mode 3 of a string fixed at both ends, with three bumps"},
 ("springiness", 2): {"img": FIG + "q11-building-mode4.png", "alt": "Mode 4 of a building with a fixed base and a free top"},
 ("springiness", 3): {"img": FIG + "gen-building-mode2.svg", "alt": "Mode 2 of a building with a fixed base and a free top"},
 ("springiness", 4): {"img": FIG + "q14-string-modes-3-4.png", "alt": "Modes 3 and 4 of a string with a box where Mode 3 crosses its middle line"},
 ("springiness", 5): {"img": FIG + "gen-string-modes-3-4-box-middle.svg", "alt": "Modes 3 and 4 of a string with a box in the middle, where Mode 3 moves the most and Mode 4 crosses its middle line"},
 ("springiness", 6): {"img": FIG + "q15-building-mode4.png", "alt": "Mode 4 of a building"},
 ("springiness", 7): {"img": FIG + "q15-building-mode4.png", "alt": "Mode 4 of a building"},
 ("springiness", 8): {"img": FIG + "gen-string-mode1-mode3-points.svg", "alt": "Modes 1 and 3 of a string, with point B a third of the way along and point C in the middle"},
 ("springiness", 9): {"img": FIG + "gen-string-mode1-mode3-points.svg", "alt": "Modes 1 and 3 of a string, with point B a third of the way along and point C in the middle"},
 ("harmonics-formants", 9): {"ansImg": FIG + "gen-spectrum-fixed-fixed-200.svg", "alt": "Spectrum with spikes at 200, 400, 600, 800, 1000 and 1200 Hz"},
 ("harmonics-formants", 10): {"ansImg": FIG + "gen-spectrum-fixed-free-200.svg", "alt": "Spectrum with spikes at 200, 600, 1000 and 1400 Hz"},
 ("harmonics-formants", 11): {"ansImg": FIG + "gen-spectrum-f0-150.svg", "alt": "Spectrum with spikes at 150, 300, 450, 600 and 750 Hz"},
 ("pytorch", 0): {"img": FIG + "q20-sequential-code.png", "alt": "nn.Sequential with Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)"},
 ("pytorch", 1): {"img": FIG + "q20-sequential-code.png", "alt": "nn.Sequential with Linear(2, 3), Linear(3, 2), Linear(2, 4), Linear(4, 5)"},
 ("gestalt-cloze", 2): {"img": FIG + "gen-kanizsa-triangle.svg", "alt": "Three black circles with wedges cut out, facing each other"},
}

# The moved-box question is reworded in every version to match its figure (Mode 3 is at the
# bottom of a bump there, so "moves the most" is the accurate description).
MOVED_BOX = ("springiness", 5)
MOVED_BOX_Q = "The box is moved to a spot where Mode 3 moves the most and Mode 4 crosses its middle line. Mass and stiffness are added there. What happens?"


def build_v8(topics_v7):
    out = []
    for t in topics_v7:
        t = copy.deepcopy(t)
        t["note"] = ""
        for i, q in enumerate(t["questions"]):
            q["source"] = ""
            if (t["id"], i) in STANDALONE:
                nq, na = STANDALONE[(t["id"], i)]
                q["q"] = nq
                if na:
                    q["a"] = na
        out.append(t)
    return out


def build_v9(topics_v7):
    out = []
    for t in topics_v7:
        t = copy.deepcopy(t)
        for i, q in enumerate(t["questions"]):
            if (t["id"], i) == MOVED_BOX:
                q["q"] = MOVED_BOX_Q
            if (t["id"], i) in FIGURES:
                q.update(FIGURES[(t["id"], i)])
        out.append(t)
    return out


# ---- v10: v9 with each lecture-page block showing its slide (or the professor's video) on the right.
import json
import re
from pathlib import Path

_ROOT = Path(__file__).resolve().parents[1]
_REF = re.compile(r"Lecture (\d+) · p([\d, ]+)")


def _slide_media(overlay=False):
    """Map 'lectureNN-P' to a slide image, or to the source video when the slide image is blank."""
    from PIL import Image, ImageStat
    manifest = json.load(open(_ROOT / "stimuli" / "manifest.json"))
    videos = {}
    for e in manifest:
        if e.get("type") == "video" and e["id"].startswith("source-"):
            for s in e.get("slides") or []:
                s = s["id"] if isinstance(s, dict) else s
                m = re.match(r"(lecture\d+)-p0*(\d+)", s)
                if m:
                    videos.setdefault(f"{m.group(1)}-{m.group(2)}", e)

    positions = json.load(open(_ROOT / "authoring" / "video-positions.json")) if overlay else {}
    reveals = json.load(open(_ROOT / "authoring" / "overlays.json")) if overlay else {}

    def media(lec, page):
        img = _ROOT / "assets" / "slides" / lec / f"{page:03d}.webp"
        if not img.exists():
            return None
        placed = positions.get(f"{lec}-{page}")
        if placed:
            v = placed[0]
            stem = Path(v["video"]).stem
            poster = f"assets/exam2/frames/{stem}.jpg"
            return {"image": f"assets/slides/{lec}/{page:03d}.webp", "video": v["video"], "box": v["box"],
                    "reveal": (reveals.get(f"{lec}-{page}") or {}).get("src", ""),
                    "revealMode": (reveals.get(f"{lec}-{page}") or {}).get("mode", ""),
                    "poster": poster if (_ROOT / poster).exists() else "",
                    "caption": f"Lecture {lec[7:]} · p{page} · with the video played on the slide"}
        blank = ImageStat.Stat(Image.open(img).convert("L")).stddev[0] < 1
        key = f"{lec}-{page}"
        if blank and key in videos:
            v = videos[key]
            vid = Path(v["file"]).stem
            poster = f"assets/exam2/frames/{vid}.jpg"
            if not (_ROOT / poster).exists():
                poster = ""
            return {"video": v["file"], "poster": poster, "caption": f"Lecture {lec[7:]} · p{page} · {v.get('title', '')}"}
        if blank:
            return None
        return {"image": f"assets/slides/{lec}/{page:03d}.webp", "caption": f"Lecture {lec[7:]} · p{page}"}
    return media


ALSO_KNOW_MEDIA = {
    "springiness": {"image": FIG + "q06-string-mode5.png", "caption": "Mode 5 of a string fixed at both ends"},
    "gestalt-cloze": {"image": FIG + "gen-kanizsa-triangle.svg", "caption": "The Gestalt triangle figure"},
}


def build_v10(topics_v9):
    media = _slide_media()
    out = []
    for t in topics_v9:
        t = copy.deepcopy(t)
        for b in t["blocks"]:
            for m in _REF.finditer(b.get("ref", "")):
                lec = f"lecture{int(m.group(1))}"
                for p in [int(x) for x in m.group(2).replace(" ", "").split(",") if x]:
                    found = media(lec, p)
                    if found:
                        b["media"] = found
                        break
                if b.get("media"):
                    break
            if not b.get("media") and t["id"] in ALSO_KNOW_MEDIA and b.get("ref", "").startswith("Also know"):
                b["media"] = ALSO_KNOW_MEDIA[t["id"]]
        out.append(t)
    return out


def build_v11(topics_v9):
    """v10 with each video placed on its slide where the professor put it (from the .pptx)."""
    media = _slide_media(overlay=True)
    out = []
    for t in topics_v9:
        t = copy.deepcopy(t)
        for b in t["blocks"]:
            for m in _REF.finditer(b.get("ref", "")):
                lec = f"lecture{int(m.group(1))}"
                for p in [int(x) for x in m.group(2).replace(" ", "").split(",") if x]:
                    found = media(lec, p)
                    if found:
                        b["media"] = found
                        break
                if b.get("media"):
                    break
            if not b.get("media") and t["id"] in ALSO_KNOW_MEDIA and b.get("ref", "").startswith("Also know"):
                b["media"] = ALSO_KNOW_MEDIA[t["id"]]
        out.append(t)
    return out
