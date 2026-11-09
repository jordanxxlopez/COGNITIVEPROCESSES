"""Priority model for Q&A Version 3 (and Version 4, which reuses the same questions).

A reproducible heuristic, NOT a validated forecast. No Module II exam or key was supplied, and
Jordan says everything is fair game, so the model ranks by how much the slides themselves stress
an idea instead of guessing a format. Signals (weights in W):
  core / experiment / topic  membership in the study-aid lists already built for the course
  cited_study                the slide cites a study with a year (the professor tests studies as 'Researcher (year)')
  result_numbers             the slide reports percentages or counts
  term_repeat                bolded key terms on the slide that recur on other slides of the same topic
  definition_form            the question asks what a term is (definitions are fair game)
  names_study                the question itself names a study with a year
  integrative                connection questions get a small bonus, scored from the slides they link
Question score = 0.6 * strongest slide + 0.4 * mean slide + question-level bonuses. Tiers are cut in
thirds within each topic, separately for slide questions and connection questions.
"""
import html, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
W = {'core': 3.0, 'experiment': 2.0, 'topic': 1.0, 'cited_study': 2.0, 'result_numbers': 1.0,
     'term_repeat': 1.5, 'definition_form': 0.7, 'names_study': 1.0, 'integrative': 0.5}
YEAR = re.compile(r'\((?:[^()]*?)(?:19|20)\d{2}[^()]*\)')

def _load():
    markup = (ROOT / 'psyc301-module2.html').read_text()
    data = json.loads(re.search(r'<script id="study-data" type="application/json">(.*?)</script>', markup, re.S)[1])
    raw = (ROOT / 'module2-data.js').read_text()
    bank = json.loads(raw[raw.index('{'):raw.rindex('}') + 1])
    mods = {m['id']: m for m in data['modules'] + bank['collections']}
    c = (ROOT / 'psyc301-c15-data.js').read_text()
    c15 = json.JSONDecoder().raw_decode(c[c.index('window.C15_BANK = ') + len('window.C15_BANK = '):])[0]
    mods[14] = c15['collection']
    lists = {'coreReview': [], 'experiments': [], 'topics': []}
    for key in lists:
        for g in bank[key]:
            lists[key].append((g.get('module', 6), g['pages']))
        for g in c15.get(key, []):
            lists[key].append((14, g['pages']))
    return mods, lists

def slide_info():
    mods, lists = _load()
    sig = {}
    for key, name in (('coreReview', 'core'), ('experiments', 'experiment'), ('topics', 'topic')):
        for m, pages in lists[key]:
            for p in pages:
                sig.setdefault((m, p), set()).add(name)
    info = {}
    for mid in (6, 9, 10, 11, 12, 13, 14):
        secs = mods[mid]['sections']
        plain = {s['page']: html.unescape(re.sub(r'<[^>]+>', '', ' '.join(s['bullets']))) for s in secs}
        for s in secs:
            raw = ' '.join(s['bullets'])
            terms = {html.unescape(t).strip().lower() for t in re.findall(r'<strong>(.*?)</strong>', raw) if len(t.strip()) > 3}
            text = plain[s['page']]
            others = [plain[p].lower() for p in plain if p != s['page']]
            rep = 0
            for t in terms:
                if any(t in o for o in others):
                    rep += 1
            term_repeat = min(1.0, rep / 4) if terms else 0.0
            flags = set(sig.get((mid, s['page']), ()))
            if YEAR.search(text): flags.add('cited_study')
            if re.search(r'\d+\s?%|\b\d+ of \d+\b', text): flags.add('result_numbers')
            score = sum(W[k] for k in flags) + W['term_repeat'] * term_repeat
            info[(mid, s['page'])] = (round(score, 3), sorted(flags), round(term_repeat, 2))
    return info

DEF = re.compile(r'^(What (is|are|does|do) [^?]*?(mean|stand for)?\b|What is a|What are a)', re.I)

def rank(items):
    info = slide_info()
    for it in items:
        sc = [info[(it['module'], p)][0] for p in it['slides'] if (it['module'], p) in info]
        base = 0.6 * max(sc) + 0.4 * sum(sc) / len(sc)
        bonus = 0.0
        if it['kind'] == 'slide' and re.match(r'^What (is|are) (an? |the )?[^,?]{2,60}\?$', it['q']): bonus += W['definition_form']
        if YEAR.search(it['q']): bonus += W['names_study']
        if it['kind'] == 'relate': bonus += W['integrative']
        it['score'] = round(base + bonus, 3)
    for mid in sorted({x['module'] for x in items}):
        for kind in ('slide', 'relate'):
            idx = sorted([i for i, x in enumerate(items) if x['module'] == mid and x['kind'] == kind],
                         key=lambda i: (-items[i]['score'], i))
            n = len(idx)
            for r, i in enumerate(idx):
                items[i]['tier'] = 'high' if r < round(n / 3) else 'mid' if r < round(2 * n / 3) else 'low'
    return {'method': 'Heuristic slide-emphasis ranking (version 3)', 'validated_prediction': False, 'weights': W,
            'tiers': {t: sum(1 for x in items if x['tier'] == t) for t in ('high', 'mid', 'low')},
            'limitations': 'No Module II exam or answer key was supplied and any topic is fair game, so this orders study priority from how strongly the slides stress each idea and does not forecast the real exam.'}
