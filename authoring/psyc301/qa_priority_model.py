"""Transparent priority model for the Q&A bank.

This is a reproducible heuristic, NOT a validated forecast. No Module II exam or answer key was
supplied, so the weights below are judgment calls built from signals that are actually in the repo
and from what Jordan reported about how the professor asks (experiments by researcher and year,
main themes, definitions and contrasts). Each slide gets a score, each question inherits the scores
of the slides it covers, and questions are ranked into three tiers within each topic.
"""
import html, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
W = {'core': 3.0, 'experiment': 2.0, 'topic': 1.0, 'cited_study': 2.0, 'result_numbers': 1.0, 'term_density': 1.0, 'question_names_study': 1.0}

def _sections():
    markup = (ROOT / 'psyc301-module2.html').read_text()
    data = json.loads(re.search(r'<script id="study-data" type="application/json">(.*?)</script>', markup, re.S)[1])
    raw = (ROOT / 'module2-data.js').read_text()
    bank = json.loads(raw[raw.index('{'):raw.rindex('}') + 1])
    mods = {m['id']: m for m in data['modules'] + bank['collections']}
    return bank, mods

def slide_scores():
    bank, mods = _sections()
    pages = {}
    for key, w in (('coreReview', 'core'), ('experiments', 'experiment'), ('topics', 'topic')):
        for g in bank[key]:
            for p in g['pages']:
                pages.setdefault((g.get('module', 6), p), set()).add(w)
    out = {}
    for mid in (6, 9, 10, 11, 12, 13):
        secs = mods[mid]['sections']
        dens = {s['page']: len(re.findall(r'<strong>', ' '.join(s['bullets']))) for s in secs}
        top = max(dens.values()) or 1
        for s in secs:
            text = html.unescape(re.sub(r'<[^>]+>', '', ' '.join(s['bullets'])))
            sig = {w: 1 for w in pages.get((mid, s['page']), ())}
            if re.search(r'\((?:[^()]*?)(?:19|20)\d{2}[^()]*\)', text):
                sig['cited_study'] = 1
            if re.search(r'\d+\s?%|\b\d+ of \d+\b', text):
                sig['result_numbers'] = 1
            score = sum(W[k] for k in sig) + W['term_density'] * dens[s['page']] / top
            out[(mid, s['page'])] = (round(score, 3), sorted(sig))
    return out

def rank(items):
    ss = slide_scores()
    for it in items:
        sc = [ss[(it['module'], p)][0] for p in it['slides'] if (it['module'], p) in ss]
        base = 0.6 * max(sc) + 0.4 * (sum(sc) / len(sc))
        it['score'] = round(base + (W['question_names_study'] if re.search(r'\((?:[^()]*?)(?:19|20)\d{2}[^()]*\)', it['q']) else 0), 3)
    # Tiers are cut within each topic so every topic has its own most-likely and least-likely questions.
    for mid in sorted({x['module'] for x in items}):
        idx = sorted([i for i, x in enumerate(items) if x['module'] == mid], key=lambda i: (-items[i]['score'], i))
        n = len(idx)
        for r, i in enumerate(idx):
            items[i]['tier'] = 'high' if r < round(n / 3) else 'mid' if r < round(2 * n / 3) else 'low'
    return {'method': 'Heuristic slide-signal ranking', 'validated_prediction': False, 'weights': W,
            'tiers': {t: sum(1 for x in items if x['tier'] == t) for t in ('high', 'mid', 'low')},
            'limitations': 'No Module II exam or answer key was supplied. Weights are judgment calls, so this orders study priority and does not forecast the real exam.'}
