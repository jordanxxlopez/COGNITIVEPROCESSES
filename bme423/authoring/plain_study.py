"""Build plain-study-data.js (Version E and Order to memorize) from plain_study_content.py.

Refuses to build when a block points at a page image that does not exist, or when the
prose breaks the writing rules (labels, colons, semicolons, dashes, equals signs, arrows,
lecture/slide/professor mentions, banned filler, "picture" as a noun).
Run:  python3 bme423/authoring/plain_study.py
"""
import json, re, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from plain_study_content import LECTURES, TIERS

ROOT = pathlib.Path(__file__).resolve().parents[1]
BANNED_CHARS = [(':', 'colon'), (';', 'semicolon'), ('—', 'em dash'), ('–', 'en dash'),
                (' - ', 'dash'), ('=', 'equals sign'), ('→', 'arrow'), ('->', 'arrow')]
BANNED_WORDS = [r'\blecture', r'\bslides?\b', r'\bprofessor', r'\bthus\b', r'\bhence\b', r'\bnote that\b',
                r'\bthe key point\b', r'\bbasically\b', r'\bblame', r'\blet\'s\b', r'\bpictur(e[ds]?|ing)\b(?<!^Picture)']
problems = []

def check(text, where):
    plain = re.sub(r'\*\*', '', text)
    for ch, name in BANNED_CHARS:
        if ch in plain:
            problems.append(f'{where}: {name} in "{plain[:70]}"')
    for w in BANNED_WORDS:
        m = re.search(w, plain, re.I)
        if m and not (m.group(0).lower().startswith('pictur') and plain.startswith('Picture ')):
            problems.append(f'{where}: banned word "{m.group(0)}"')
    for sent in re.split(r'(?<=[.!?])\s+', plain):
        if len(sent.split()) > 32:
            problems.append(f'{where}: sentence over 32 words "{sent[:60]}"')

counts = {'lectures': 0, 'blocks': 0, 'questions': 0, 'types': 0, 'steps': 0}
for lec in LECTURES:
    counts['lectures'] += 1
    lid = lec['id']; assert lec['tier'] in TIERS
    check(lec['lead'], f'S{lid} lead')
    for t in lec['topics']:
        for i, b in enumerate(t['blocks']):
            counts['blocks'] += 1
            for p in b['pages']:
                if not (ROOT / 'assets' / f'session{lid}' / f'{p}.webp').exists():
                    problems.append(f'S{lid} {t["title"]}: page {p} has no image')
            for k in ('main', 'end'):
                if b.get(k): check(b[k], f'S{lid} {t["title"]} block {i+1} {k}')
            for s in b.get('sub', []): check(s, f'S{lid} {t["title"]} block {i+1} sub')
    for q in lec['questions']:
        counts['questions'] += 1
        check(q['a'], f'S{lid} answer "{q["q"][:30]}"')
    for m in lec['memorize']:
        counts['types'] += 1
        check(m['when'], f'S{lid} {m["title"]} when')
        for j, st in enumerate(m['steps']):
            counts['steps'] += 1
            check(st['do'], f'S{lid} {m["title"]} step {j+1}')
            check(st['why'], f'S{lid} {m["title"]} step {j+1} why')
            if not st['why'].startswith('This is because'):
                problems.append(f'S{lid} {m["title"]} step {j+1}: reason must start with "This is because"')


# Which class table each cutoff step uses (sources/tables/*.pdf). Matched by session and the
# start of the step text; the build fails if a listed step is not found, so nothing drops silently.
T = ('t_table.pdf', 'Use the class t table (two-tailed). Read the row for the degrees of freedom and the column for alpha, like 0.05. If that row is not printed, use the printed rows on either side.')
TINF = ('t_table.pdf#page=2', 'Use the class t table, infinity row on PDF page 2. The 0.05 column gives 1.96 and the 0.01 column gives 2.576.')
F = ('F_table.pdf', 'Use the class F table (upper tail). Numerator degrees of freedom run across the top and denominator degrees of freedom run down the side. Lightface numbers are for 0.05 and boldface numbers are for 0.01.')
CHI = ('Chi_Squared_Table2.pdf', 'Use the class chi-square table (upper tail). Read the row for the degrees of freedom and the column for alpha. For 1 degree of freedom at 0.05 the printed value is 3.841.')
Z = ('z_table_NormalDist.pdf', 'Use the class z table. It lists z beside F(z), the area to the left of z, and only for positive z.')
THOLM = ('t_table.pdf', 'Use the class t table (two-tailed) with the within-groups or residual degrees of freedom. A level like 0.0167 is not printed, so bracket it between the 0.01 and 0.02 columns, or use a cutoff the question gives.')
CHIHOLM = ('Chi_Squared_Table2.pdf', 'Use the class chi-square table with 1 degree of freedom. A level like 0.0167 is not printed, so bracket it between the 0.01 and 0.025 columns.')
POWER = (None, 'Use the class power chart for the t test, posted with the statistical tables.')
TABLE_STEPS = [
 (5, 'Look up each left area', Z), (5, 'Find the z with that left area', Z), (5, 'Use the table and combine', Z),
 (7, 'Write the critical value with its alpha', F),
 (8, 'Write the two-tailed cutoff', T), (8, 'Use n minus 1 degrees of freedom and the two-tailed table', T),
 (9, 'Look up each cutoff', THOLM), (9, 'Compare every t with the one cutoff', THOLM),
 (10, 'For a large-sample proportion', TINF),
 (11, 'Use the infinity row of the t table', TINF),
 (12, 'Start with alpha 0.05', CHI), (12, 'For a level like 0.0167', CHIHOLM), (12, 'Use the number of categories minus 1', CHI),
 (14, 'Read power from the curve', POWER),
 (17, 'Find the two-tailed t cutoff with n minus 1', T), (17, 'Find the two-tailed t cutoff for the confidence level', T),
 (17, 'Use the infinity row cutoff', TINF),
 (18, 'Compare with the two-tailed t cutoff', T), (18, 'Use the t cutoff with n minus 2', T), (18, 'Compare with the cutoff and say how strong', T), (18, 'Compare with the cutoff and conclude', T),
 (19, 'Read the F statistic', F),
 (20, 'Compare with the two-tailed cutoff', T),
 (21, 'Compare with the F cutoff', F), (21, 'Use the residual degrees of freedom for the table', THOLM), (21, 'Compare with the chi-square cutoff', CHI),
]
for lid, prefix, (path, note) in TABLE_STEPS:
    hits = [st for lec in LECTURES if lec['id'] == lid for m in lec['memorize'] for st in m['steps'] if st['do'].startswith(prefix)]
    if not hits:
        problems.append(f'S{lid}: no memorize step starts with "{prefix}" for its table note')
    for st in hits:
        st['table'] = note; st['tablePath'] = ('sources/tables/' + path) if path else None
        check(note, f'S{lid} table note')

if problems:
    print('\n'.join(problems)); sys.exit(f'{len(problems)} writing or reference problems; nothing written')
payload = {'revision': 'plain-study-1', 'tiers': TIERS, 'lectures': LECTURES}
out = ROOT / 'plain-study-data.js'
out.write_text('// Built by authoring/plain_study.py from plain_study_content.py. Do not edit by hand.\n'
               'const PLAIN_STUDY=' + json.dumps(payload, ensure_ascii=False, indent=0) + ';\n')
print('wrote', out.name, counts)
