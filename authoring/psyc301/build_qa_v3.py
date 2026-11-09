"""Build psyc301-qa-v3-data.js from authoring/psyc301/qa-v3/m*.py and wire it into the three entry pages. Additive only."""
import importlib.util, json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'authoring/psyc301/qa-v3'
sys.path.insert(0, str(Path(__file__).resolve().parent))
import qa_v3_model
NOTES = [
 (6, 'What are the three stores of Atkinson', "The slides give short-term memory as five to seven items for about fifteen to twenty seconds. Modern work puts working capacity nearer three to four chunks, which matches the three to four items the slides give for visual short-term memory."),
 (6, 'What is the traditional estimate of memory span', "Miller’s seven plus or minus two is about chunks, and modern estimates are nearer four chunks. The slides also give five to seven items elsewhere, so the two figures on the slides do not match each other."),
 (6, 'What is persistence of vision', "Film continuity is usually attributed to apparent motion (the phi phenomenon) and flicker fusion, not persistence of vision. Persistence of vision does account for the sparkler trail."),
 (6, 'What was the Brown–Peterson procedure', "Brown and Peterson and Peterson found the decline in recall with delay. The trial-by-trial proactive-interference analysis is usually credited to Keppel and Underwood (1962), who are not named on these slides."),
 (6, 'Why does the average over all trials', "The slides say recall at 18 seconds is relatively high on the first trial and substantially reduced on later trials, and that the average combines early trials with little interference and later trials with more. The words steady and very low are stronger than the slides."),
 (10, 'How long would the 64-disk', "The minimum for 64 disks is 2^64 − 1 moves, which at one move per second is about 585 billion years, so a trillion years is a rounded overstatement."),
 (10, 'What is means–end analysis?', "The slides give no year for means–end analysis. The 1956 date belongs to the Logic Theorist, and means–end analysis is usually dated to Newell and Simon’s later General Problem Solver work."),
 (10, 'What happened when the experimenter accidentally', "In the original study the experimenter set the string moving deliberately, not accidentally, as the slide words it."),
 (9, 'What happens to the phonological similarity effect under articulatory suppression', "The similarity effect is abolished by articulatory suppression only when items are presented visually. With auditory presentation it persists."),
 (11, 'What did Chi et al. (1982) do?', "The sorting study is usually cited as Chi, Feltovich and Glaser (1981), with advanced physics PhD students as the experts. Low confidence, so check before relying on it."),
 (12, 'What do most people answer, and what is correct?', "The three-to-one figure is not verified. The commonly stated ratio is closer to two to one. The direction, that words with r are more common in third position, holds."),
 (12, 'What is the base rate, and what is base-rate neglect?', "The 2.2 million and 120,000 are counts of farms and libraries, not of people in each occupation. Farmers still outnumber librarians, so the conclusion stands, but the comparison is loose."),
 (12, 'What does casino gambling show?', "Casino gambling shows that people do not maximize expected money. It does not by itself refute expected utility theory, because utility can include enjoyment of gambling."),
 (12, 'Which bowl do people choose, and what does it show?', "The slide says most participants choose the 7-out-of-100 bowl. I could not verify that a majority chose it in the original finding."),
 (12, 'What did Lord and colleagues (1979) do?', "In the original study participants read two mixed-evidence studies on capital punishment, not the same article, and the result is usually described as biased assimilation and attitude polarization."),
 (13, 'Which cards should be turned over', "Wason’s percentages are for combinations of cards. About 46 percent chose E and 4 and about 7 percent chose E and 7, so only 7 percent chose the 7 understates how many selected it."),
 (13, 'How do opt-in and opt-out procedures differ', "Not every opt-out country exceeds 99 percent consent. Reported effective consent in opt-out countries ranges from about 86 percent to about 99.98 percent."),
 (13, 'What is the status quo bias?', "The usual definition of status quo bias is a preference for the current state or default, and doing nothing is the mechanism, not the definition."),
]
FLAGS = [
 (14, 'What did Peterson and Peterson (1959) conclude?', "The short-term memory slides treat the Brown–Peterson pattern as evidence of proactive interference, while this slide gives decay as the conclusion of Peterson and Peterson (1959) and cites Keppel and Underwood (1962) for an alternative. The two sets of slides take different views of the same task."),
]
items = []
for m in (6, 9, 10, 11, 12, 13, 14):
    spec = importlib.util.spec_from_file_location(f'm{m}', SRC / f'm{m}.py'); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    last = 0
    for slides, q, a in mod.S:
        assert slides and q.strip() and a.strip(), (m, q)
        assert min(slides) >= last, ('slide order', m, q)
        last = min(slides)
        items.append({'module': m, 'kind': 'slide', 'slides': slides, 'q': q, 'a': a})
    for q, a, slides in mod.R:
        assert slides and q.strip() and a.strip(), (m, q)
        items.append({'module': m, 'kind': 'relate', 'slides': slides, 'q': q, 'a': a})
for it in items:
    low = (it['q'] + ' ' + it['a']).lower()
    for bad in ('need not', 'coworker', 'lecture'):
        assert bad not in low, (bad, it['q'])
for i, it in enumerate(items):
    it['id'] = i
for lst, key in ((NOTES, 'note'), (FLAGS, 'flag')):
    for m, pre, text in lst:
        hit = [it for it in items if it['module'] == m and it['q'].startswith(pre)]
        assert len(hit) == 1, (pre, len(hit))
        hit[0][key] = text
report = qa_v3_model.rank(items)
(SRC / 'priority-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=1))
(ROOT / 'psyc301-qa-v3-data.js').write_text(
    '// Generated by authoring/psyc301/build_qa_v3.py from authoring/psyc301/qa-v3/*.py\n'
    'window.QA_V3 = ' + json.dumps(items, ensure_ascii=False) + ';\n')
tags = '<script src="psyc301-qa-v3-data.js?v=v3-2"></script>'
for name in ['index.html', 'psyc301-module2.html', 'share.html']:
    p = ROOT / name
    html = p.read_text()
    if 'psyc301-qa-v3-data.js' in html:
        continue
    anchor = '<script src="psyc301-qa-bank.js?v=qa-10"></script>'
    assert anchor in html, name
    p.write_text(html.replace(anchor, anchor + tags, 1))
from collections import Counter
print(len(items), Counter((i['module'], i['kind']) for i in items))
print(report['tiers'])
