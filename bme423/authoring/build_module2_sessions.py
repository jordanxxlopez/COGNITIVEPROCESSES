"""Merge authoring/module2/session{N}.json (Sessions 18+) into module2-sessions-data.js.

module2-data.js (Session 17) is not touched, so its hash locks and tests stay valid.
The build refuses to write when a pack breaks the Session 17 format (see authoring/module2/SPEC.md).
Run:  python3 bme423/authoring/build_module2_sessions.py
"""
import json, re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / 'authoring' / 'module2'
errors, out = [], {'modules': [], 'methods': [], 'cases': [], 'questions': [], 'sourceNotes': []}
seen = set()
BANNED = re.compile(r'\bpictur(e|es|ed)\b(?!\s+(a|an|the|\d))', re.I)

def need(cond, msg):
    if not cond: errors.append(msg)

def text_of(obj):
    return json.dumps(obj, ensure_ascii=False)

for path in sorted(SRC.glob('session*.json'), key=lambda p: int(re.findall(r'\d+', p.stem)[0])):
    n = int(re.findall(r'\d+', path.stem)[0])
    if n <= 17:
        continue
    d = json.loads(path.read_text())
    m = d['module']; tag = f'S{n}'
    need(m['id'] == n, f'{tag}: module id {m["id"]}')
    pages = [s['page'] for s in m['slides']]
    need(pages == list(range(1, m['count'] + 1)), f'{tag}: slide pages are not 1..{m["count"]}')
    need(len(list((ROOT / 'assets' / f'session{n}').glob('*.webp'))) == m['count'], f'{tag}: image count differs from count')
    method_ids = {x['id'] for x in d['methods']}; case_ids = {x['id'] for x in d['cases']}
    for s in m['slides']:
        need(len(s['paragraphs']) == 3 and len(set(s['paragraphs'])) == 3, f'{tag} p{s["page"]}: needs 3 distinct paragraphs')
        need(s['topic'] in method_ids, f'{tag} p{s["page"]}: topic {s["topic"]} is not a method')
        need(s.get('case') in (None, *case_ids), f'{tag} p{s["page"]}: unknown case {s.get("case")}')
    for x in d['methods']:
        need(x['id'] not in seen, f'{tag}: duplicate id {x["id"]}'); seen.add(x['id'])
        need(x['example'] in case_ids, f'{tag} method {x["id"]}: example case missing')
        x['module'] = n
    for c in d['cases']:
        need(c['id'] not in seen, f'{tag}: duplicate id {c["id"]}'); seen.add(c['id'])
        need(c['topic'] in method_ids, f'{tag} case {c["id"]}: topic not a method')
        need(c.get('module') == n, f'{tag} case {c["id"]}: module must be {n}')
        need(isinstance(c.get('answer'), (int, float)) and c.get('tolerance', 0) > 0, f'{tag} case {c["id"]}: numeric answer and tolerance needed')
        for i, st in enumerate(c['steps']):
            look = st.pop('tableLookup', None) or (st.pop('lookup', None) if isinstance(st.get('lookup'), dict) else None)
            if look:
                need(str(look.get('path', '')).startswith('sources/tables/') and (ROOT / look['path']).exists(), f'{tag} case {c["id"]} step {i+1}: class table file missing')
                st['classTable'] = look
            need(st.get('general') and st.get('work') is not None and st.get('words'), f'{tag} case {c["id"]} step {i+1}: general, work and words needed')
    for q in d['questions']:
        need(q['id'] not in seen, f'{tag}: duplicate id {q["id"]}'); seen.add(q['id'])
        need(q.get('module') == n and q['topic'] in method_ids, f'{tag} {q["id"]}: module/topic')
        need(len(q['options']) == 4 and len(set(q['options'])) == 4 and q['correct'] in range(4), f'{tag} {q["id"]}: needs 4 distinct options and a valid key')
        need(q.get('case') in (None, *case_ids), f'{tag} {q["id"]}: unknown case')
    need(len(d['questions']) >= 20, f'{tag}: fewer than 20 questions')
    if BANNED.search(text_of(d)):
        errors.append(f'{tag}: "picture" used as a noun')
    out['modules'].append(m); out['methods'] += d['methods']; out['cases'] += d['cases']; out['questions'] += d['questions']
    out['sourceNotes'] += [{'page': f'S{n} p{x["page"]}', 'text': x['text']} for x in d.get('sourceNotes', [])]

if errors:
    print('\n'.join(errors)); sys.exit(f'{len(errors)} problems; nothing written')
(ROOT / 'module2-sessions-data.js').write_text(
    '// Built by authoring/build_module2_sessions.py from authoring/module2/session*.json. Do not edit by hand.\n'
    'const BME_MODULE_II_EXTRA=' + json.dumps(out, ensure_ascii=False) + ';\n')
print('wrote module2-sessions-data.js', {k: len(v) for k, v in out.items()},
      'slides', sum(len(m['slides']) for m in out['modules']))
