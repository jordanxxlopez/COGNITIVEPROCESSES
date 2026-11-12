"""Build "Study this first" topics and Lab material in the Module I "What to know by the end" layout.

Each topic becomes blocks. A block has a lecture-page tag, a main point (a bold opening sentence
that continues into the explanation), a sub-point (why it happens) and a closing point. Blocks come
from the plain concept notes (plain_concepts.C) for that topic's lecture pages. Facts that only the
review sheet, homework or labs add are kept in a final block, written as the same kind of sentences.
"""
import json
import re
from collections import defaultdict
from pathlib import Path

from plain_concepts import C
from unlabel import unlabel

ROOT = Path(__file__).resolve().parents[1]

TOPIC_CONCEPTS = {
 "modes": ["directions", "mass-stiffness", "two-modes", "three-modes", "many-modes"],
 "springiness": ["local-change"],
 "harmonics-formants": ["fixed-fixed", "fixed-free", "membrane", "scientific-method"],
 "constrictions": ["air-modes", "vowel-shape", "constriction", "u", "i", "a"],
 "source-filter": ["source", "filter", "sparse-harmonics"],
 "spectrogram": ["spectrogram", "continuous-speech", "splice"],
 "network-forward": ["vowel-network", "weights", "forward", "probabilities", "weight-direction"],
 "backprop": ["backward"],
 "pytorch": ["network-shape", "sequential", "training-code"],
 "sigmoid": ["sigmoid", "sigmoid-flow"],
 "training": ["overlap", "accuracy", "initialization", "training-data"],
 "lead-up": ["brain-model", "recurrent"],
 "heads-layers": ["heads"],
 "llm-sequences": ["levels", "next-token"],
 "gestalt-cloze": [],
 "recurrent-dynamical": ["dynamic-depth"],
 "agentic": ["software"],
 "phonotactics": ["phonotactics", "letter-guess"],
}

# Lines from the topic's own list that the concept blocks do not already teach.
EXTRA_LABELS = {
 "modes": ["Local rule", "Infinitely many"],
 "springiness": ["Alternation", "Shortcut", "Ends", "Perturbation theory"],
 "harmonics-formants": ["Spacing", "Building analogy", "Spectrum"],
 "constrictions": ["Fixed-free tube", "Schwa", "Four steps"],
 "source-filter": ["F0 carries meaning"],
 "spectrogram": ["Transitions"],
 "network-forward": ["Knowledge", "Inner product"],
 "backprop": ["Learning", "Order", "Credit"],
 "pytorch": ["Import lines", "Counting layers", "Learning rate"],
 "sigmoid": ["From the brain", "Perception", "In code", "Bigger idea"],
 "training": ["Other counts", "Epoch", "Overlap", "Repeated runs", "Memorizing"],
 "lead-up": ["All-or-none", "From biology", "Parallel Distributed Processing", "The limit", "Plan and state units", "The path to GPT"],
 "heads-layers": ["Head", "Classroom comparison", "Depth and width", "Why so many", "How heads learn"],
 "llm-sequences": ["The prediction game", "Vectors can be anything", "Long-distance connections", "How an LLM learns", "Hallucination"],
 "gestalt-cloze": None,  # every line
 "recurrent-dynamical": ["Dynamical system", "The LLM as a dynamical system"],
 "agentic": ["Agentic system", "The lecture example", "The critic loop", "Shared memory and fixed weights"],
 "phonotactics": None,  # every line: the fill-in words are the point of this topic
}

EXTRAS_FIRST = {"agentic", "gestalt-cloze"}

LABEL = re.compile(r"^([^:]{1,60}): ")


def page_tags():
    s = (ROOT / "modern" / "content.js").read_text()
    d = json.loads(s[s.index("{"):s.rindex("}") + 1])
    out = defaultdict(lambda: defaultdict(list))
    for lec in ["lecture1%d" % i for i in range(1, 9)]:
        for p, k in d["pageConcepts"].get(lec, {}).items():
            out[k][lec].append(int(p))
    return out


def ref(pages):
    return " · ".join(f"Lecture {lec[7:]} · p{', '.join(str(p) for p in sorted(ps))}" for lec, ps in sorted(pages.items()))


def bold_first(text):
    plain = text.replace("**", "") if text.startswith("**") else text
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z\"])", plain, maxsplit=1)
    first = parts[0].replace("**", "")
    return f"**{first}**" + (" " + parts[1] if len(parts) > 1 else "")


def concept_block(key, tags):
    opening, mechanism, consequence = C[key][0], C[key][1], C[key][2]
    return {"ref": ref(tags[key]), "main": bold_first(opening), "sub": mechanism, "end": consequence}


def extra_blocks(lines, tag):
    """One block; each remaining fact is its own full-sentence point. The first one opens in bold."""
    texts = [unlabel(x) for x in lines]
    if not texts:
        return []
    texts[0] = bold_first(texts[0])
    return [{"ref": tag, "items": texts}]


def topic_blocks(topic, tags):
    blocks = [concept_block(k, tags) for k in TOPIC_CONCEPTS.get(topic["id"], [])]
    wanted = EXTRA_LABELS.get(topic["id"], [])
    if wanted is None:
        lines = list(topic["know"])
    else:
        lines = [k for k in topic["know"] if (m := LABEL.match(k)) and m.group(1) in wanted]
    extra = extra_blocks(lines, "Also know · " + topic["lectures"])
    return extra + blocks if topic["id"] in EXTRAS_FIRST else blocks + extra


def lab_blocks(lab):
    return extra_blocks(lab["material"], lab["title"].split(":")[0])


def build_v6(topics_v3):
    tags = page_tags()
    return [dict(t, blocks=topic_blocks(t, tags)) for t in topics_v3]
