"""Weave verified slide wording into V3 while enforcing nondecreasing page lengths."""
from pathlib import Path
import copy
import hashlib
import json
import re
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
HERE = Path(__file__).resolve().parent

def load_js(name, prefix):
    return json.loads((ROOT/name).read_text().removeprefix(prefix).rstrip(';\n'))

def flat(blocks):
    return [p for b in blocks for p in [b['text'], *b['children']]]

def visible(text):
    return text.replace('**', '')

def size(blocks):
    text = ' '.join(visible(p) for p in flat(blocks))
    return {'words': len(text.split()), 'characters': len(text)}

def norm(text):
    text = unicodedata.normalize('NFKC', visible(text)).lower()
    return ' '.join(re.findall(r'[^\W_]+', text))

def first_sentence(text):
    match = re.search(r'[.!?](?:[”"])?(?:\*\*)?(?= [A-Z*“]|$)', text)
    assert match, text
    return text[:match.end()]

def clarify(sid, script):
    edits = json.loads((HERE/'clarifications.json').read_text()).get(sid, [])
    for old, new in edits:
        matches = [b for b in script if old in b['text']]
        assert len(matches) == 1, (sid, old)
        matches[0]['text'] = matches[0]['text'].replace(old, new)
    return script

def build():
    d = load_js('data.js', 'window.LING406 = ')
    v3 = load_js('transcripts-v3-data.js', 'window.LING406_TRANSCRIPTS_V3 = ')
    scripts = copy.deepcopy(v3['scripts'])
    sections = {s['id']: s for s in d['sections']}
    audit = {}
    problems = []
    for module in d['modules']:
        path = HERE/(module['id'].replace('-', '_')+'.txt')
        rows = {int(n): (body, anchor) for line in path.read_text().splitlines() if line.strip() for n, body, anchor in [line.split('|', 2)]}
        expected = {sections[sid]['page'] for sid in module['sections'] if scripts[sid]}
        assert set(rows) == expected, (module['id'], set(rows)^expected)
        for sid in module['sections']:
            section = sections[sid]
            if not scripts[sid]:
                audit[sid] = {'role':'title-or-reading-reminder', 'source':section['source'], 'page':section['page'], 'change':'no invented teaching added'}
                continue
            replacement, anchor = rows[section['page']]
            if replacement != '=':
                old = first_sentence(scripts[sid][0]['text'])
                scripts[sid][0]['text'] = replacement + scripts[sid][0]['text'][len(old):]
            anchor_type = 'instructional-visual' if anchor.startswith('@visual ') else 'extracted-slide-text'
            anchor = anchor.removeprefix('@visual ')
            if norm(anchor) not in norm(' '.join(flat(scripts[sid]))):
                problems.append((sid, 'anchor absent from script', anchor))
            if anchor_type == 'extracted-slide-text' and norm(anchor) not in norm(section['sourceText']):
                problems.append((sid, 'anchor absent from extracted slide', anchor))
            audit[sid] = {'role':'teaching', 'source':section['source'], 'page':section['page'], 'authorFile':str(path.relative_to(ROOT)), 'change':'already uses the complete source word' if replacement=='=' else 'source wording woven into the existing explanation', 'sourceAnchor':anchor, 'anchorType':anchor_type}
    for sid in sections:
        scripts[sid] = clarify(sid, scripts[sid])
    for review in v3['review']:
        sid, origin = review['id'], review['lectureSection']
        if review['page'] != 54:
            scripts[sid] = copy.deepcopy(scripts[origin])
        else:
            old = first_sentence(scripts[sid][0]['text'])
            replacement = 'The **Revised Hierarchical Model** explains **L1-L2 interactions in terms of spreading activation**, allowing activity from an L2 word to reach the L1 lexicon and feed back to conceptual representations through links of unequal strength.'
            scripts[sid][0]['text'] = replacement + scripts[sid][0]['text'][len(old):]
        audit[sid] = copy.deepcopy(audit[origin])
        audit[sid].update({'source':'review', 'page':review['page'], 'matchedLectureSection':origin})
        if review['page']==54:
            audit[sid].update({'sourceAnchor':'L1-L2 interactions in terms of spreading activation','anchorType':'extracted-slide-text','change':'source wording woven into the review-specific explanation'})
        anchor = audit[sid].get('sourceAnchor')
        if anchor and audit[sid]['anchorType']=='extracted-slide-text' and norm(anchor) not in norm(review['sourceText']):
            problems.append((sid,'anchor absent from review slide',anchor))
    for sid, script in scripts.items():
        before, after = size(v3['scripts'][sid]), size(script)
        if after['words'] < before['words'] or after['characters'] < before['characters']:
            problems.append((sid,'shorter than V3',before,after))
        for current, original in zip(flat(script), flat(v3['scripts'][sid])):
            if len(visible(current).split()) < len(visible(original).split()) or len(visible(current)) < len(visible(original)):
                problems.append((sid, 'a paragraph is shorter than V3'))
        prose = ' '.join(flat(script))
        assert not re.search(r'[:;]|\bneed not\b|\blawful\b', prose, re.I),sid
        assert not re.search(r'\b(this slide|the next slide|later experiments|as you can see|this illustrates|this demonstrates|this shows|the key point|attention now turns|this sets up|before getting to)\b',prose,re.I),sid
        assert all(p and p.count('**')%2==0 for p in flat(script)),sid
        audit[sid].update({'version3':before,'version4':after,'blocks':len(script),'paragraphs':len(flat(script))})
    if problems:
        for p in problems: print(p)
        raise SystemExit(f'{len(problems)} source/length problems require correction.')
    pack = {'revision':'ling406-v4-source-wording','scripts':scripts}
    (ROOT/'transcripts-v4-data.js').write_text('window.LING406_TRANSCRIPTS_V4 = '+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
    report = {'version':4,'baselineVersion':3,'baselineSHA256':hashlib.sha256((ROOT/'transcripts-v3-data.js').read_bytes()).hexdigest(),'lecturePages':229,'reviewPages':55,'words':sum(a['version4']['words'] for a in audit.values()),'lengthRule':'Every page retains or exceeds Version 3 in both visible word count and visible character count.','scripts':audit}
    (HERE/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(f'V4 built with {len(scripts)} page entries and {report["words"]:,} words. No page is shorter than Version 3.')

if __name__=='__main__':
    build()
