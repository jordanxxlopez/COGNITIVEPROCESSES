"""Build the isolated modern studio without changing original content or saved keys."""
from pathlib import Path
import hashlib, json, re
from modern_content import CONCEPTS
from modern_guide import GUIDES
from modern_model import rank
from modern_asked import ASK
from modern_pages import MAP, QUESTIONS
from modern_cards import CARDS
from modern_contrasts import CONTRASTS
from modern_hard import HARD
from modern_review import REVIEW
from modern_core import CORE
from modern_connections import CONNECTIONS
from modern_natural import NATURAL
from modern_code import CODE,source_code
from modern_figures import FIGURES
from modern_practice import assemble,wording
from modern_answers import ANSWERS
from modern_writing import assemble_writing
from modern_lectures import SUMMARIES
from modern_readings import READINGS
from original_c_d import build_editions
from clear_editions import build_clear_editions
from visual_meaning import build_visual_meaning
from notes_v7_v2 import build_notes_v7_v2
from notes_v8 import build_notes_v8
from notes_v8_1 import build_notes_v8_1
from notes_v9 import build_notes_v9
from notes_v9_1 import build_notes_v9_1
from notes_v9_2 import build_notes_v9_2
from notes_v9_3 import build_notes_v9_3
from notes_v10 import build_notes_v10

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'modern'
OUT.mkdir(exist_ok=True)

def dump(path, value):
    path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')

def build():
    data=json.loads((ROOT/'data.json').read_text())
    preserved_file=OUT/'preserved.json'
    if not preserved_file.exists():
        original=[ROOT/'app.js',ROOT/'data.json',ROOT/'practice-v2.json',ROOT/'practice-v3.json',*ROOT.glob('transcripts-*.json')]
        dump(preserved_file,{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in original})
    pages={(c['id'],s['page']) for c in data['collections'] for s in c['sections']}
    for guide in GUIDES:
        for point in guide['points']:
            assert point['concept'] in CONCEPTS
            assert all((point['collection'],p) in pages for p in point['pages'])
    model=rank(CONCEPTS,GUIDES)
    dump(OUT/'model-report.json',model)
    qa=[]
    for collection in data['collections']:
        if collection['role']!='lecture':continue
        mapped=MAP[collection['id']]
        required={s['page'] for s in collection['sections'] if s.get('teaching')}
        assert required<=set(mapped),(collection['id'],'unmapped teaching',required-set(mapped))
        for concept in dict.fromkeys(mapped.values()):
            assert concept in CONCEPTS and concept in QUESTIONS,concept
            covered=[p for p,k in mapped.items() if k==concept]
            for i,question in enumerate(QUESTIONS[concept]):
                c=CONCEPTS[concept]
                qa.append(dict(id=f'modern-qa-{collection["id"]}-{concept}-{i+1}',
                  moduleId=collection['moduleId'],lectureId=collection['id'],concept=concept,
                  kind='slides',question=question,answer=[ANSWERS[concept][i],c['mechanism'],c['consequence']],
                  sources=[dict(collection=collection['id'],page=p) for p in covered]))
    for g in GUIDES:
        qa.append(dict(id=g['id'].replace('modern-guide-','modern-connection-'),moduleId=g['moduleId'],
          lectureId=g['points'][0]['collection'],concept=g['points'][0]['concept'],kind='connections',
          question=g['question'],answer=[g['answer']],sources=[dict(collection=p['collection'],page=n) for p in g['points'] for n in p['pages']]))
    original_review=json.loads((ROOT/'exam2-review.json').read_text())['items']
    for r in REVIEW:
        r['image']=original_review[r['number']-1].get('image','')
    for c in CODE:c['code']=source_code(ROOT,c['collection'],c['sourcePage'])
    questions=assemble(data,qa,ASK,REVIEW,HARD,CODE,CONNECTIONS,CONCEPTS,MAP,model)
    by_source={(c['id'],s['page']):s for c in data['collections'] for s in c['sections']}
    for q in questions:
        source_review=next((r for r in REVIEW if r['question']==q['wordings']['original']),None)
        if source_review:q['image']=source_review['image']
        elif q['type']=='mcq' and q['concept'] in {'sigmoid','overlap','spectrogram','network-shape','heads','dynamic-depth','levels'}:
            s=by_source[(q['sources'][0]['collection'],q['sources'][0]['page'])]
            if not any(a['type']=='video' for a in s.get('assets',[])):q['image']=s.get('image','')
    writing=assemble_writing(questions,qa,ASK,REVIEW,HARD,CODE,CONNECTIONS,MAP)
    for q in writing:
        q['wordings']=wording(q['prompt'],q['concept'])
        q['priority']=1+next((r['score'] for r in model['ranking'] if r['concept']==q['concept']),0)
    coverage=dict(sourcePages=sum(len(c['sections']) for c in data['collections'] if c['role']=='lecture'),
      teachingPages=sum(len(v) for v in MAP.values()),modulePages={m['id']:sum(len(c['sections']) for c in data['collections'] if c['role']=='lecture' and c['moduleId']==m['id']) for m in data['modules']},
      currentQuestions=sum(q['moduleId']=='module2' for q in questions),
      distinctWritingPrompts=len({q['prompt'] for q in writing}),
      sourceReview='Existing full-page extraction and media inventories are retained. New exam-review pages and critical diagrams were inspected for this rewrite. Original animations remain available rather than being inferred solely from static previews.')
    dump(OUT/'coverage.json',coverage)
    uploads=json.loads((ROOT/'authoring/modern-upload-manifest.json').read_text())
    old_visuals=json.loads((ROOT/'transcripts-v4.json').read_text()).get('visualPresentation',{})
    editions={}
    for edition,label in [('professor','Professor · Rewritten teaching'),('b','B · Focused teaching'),('c','C · Natural teaching'),('follow','Version 23 · C with following slides'),('v20','Version 20 · Natural teaching transcript')]:
        revised={}
        for collection in data['collections']:
            if collection['role']!='lecture':continue
            rewritten=[]
            for s in collection['sections']:
                key=MAP[collection['id']].get(s['page'])
                blocks=[]
                if key:
                    c=CONCEPTS[key]
                    if edition=='professor':blocks=[c['opening'],c['mechanism'],c['consequence']]
                    elif edition=='b':blocks=[c['opening'],c['mechanism']]
                    elif edition in ['c','follow']:blocks=[c['plain'],c['mechanism'],c['consequence']]
                    else:blocks=[dict(text=NATURAL[key],children=[c['mechanism']]),dict(text=c['consequence'],children=[])]
                    assert blocks!=s.get('teaching'),s['id']
                rewritten.append(dict(id=s['id'],page=s['page'],title=s['title'],kind=s.get('kind'),teaching=blocks))
            revised[collection['id']]=dict(title=collection['title'],sections=rewritten)
        payload=dict(id=edition,label=label,revision='ling285-modern-1',collections=revised,visualPresentation=old_visuals,references=model['sourceFiles'],guidance='New source-grounded teaching. Original source identities and earlier transcript editions remain unchanged.')
        dump(OUT/f'transcripts-{edition}.json',payload)
        editions[edition]=label
    editions.update(build_editions(ROOT,OUT))
    editions.update(build_clear_editions(ROOT,OUT))
    editions.update(build_visual_meaning(ROOT,OUT))
    editions.update(build_notes_v7_v2(ROOT,OUT))
    editions.update(build_notes_v8(ROOT,OUT))
    editions.update(build_notes_v8_1(ROOT,OUT))
    editions.update(build_notes_v9(ROOT,OUT))
    editions.update(build_notes_v9_1(ROOT,OUT))
    editions.update(build_notes_v9_2(ROOT,OUT))
    editions.update(build_notes_v9_3(ROOT,OUT))
    editions.update(build_notes_v10(ROOT,OUT))
    pack=dict(revision='2026-11-modern-1',concepts=CONCEPTS,guides=GUIDES,model=model,asked=ASK,qa=qa,pageConcepts=MAP,cards=CARDS,contrasts=CONTRASTS,hard=HARD,review=REVIEW,core=CORE,connections=CONNECTIONS,editions=editions,code=CODE,figures=FIGURES,questions=questions,writing=writing,summaries=SUMMARIES,readings=READINGS,coverage=coverage,uploads=uploads)
    (OUT/'content.js').write_text('window.LING285_MODERN = '+json.dumps(pack,ensure_ascii=False,indent=1)+';\n')
    html=(ROOT/'index.html').read_text().replace('<head>','<head>\n  <base href="../">')
    html=re.sub(r'<link rel="stylesheet" href="(?:fitting|reader-panels)\.css\?v=[^\"]+">','',html)
    module_styles=re.findall(r'<link rel="stylesheet" href="\.\./course-module-buttons\.css\?v=[^"]+">',html)
    for tag in module_styles:html=html.replace(tag,'')
    html=html.replace('</head>','<link rel="stylesheet" href="modern/modern.css?v=1"><link rel="stylesheet" href="../workspace-modern.css?v=layout-switch-4"><link rel="stylesheet" href="modern/module2-layout.css?v=2"><link rel="stylesheet" href="fitting.css?v=3"><link rel="stylesheet" href="reader-panels.css?v=2">'+''.join(module_styles)+'</head>')
    html=html.replace('<script src="app.js?v=ling285-source-fidelity-3" defer></script>','<script src="modern/content.js?v=1" defer></script><script src="modern/app.js?v=1" defer></script>')
    # Match the actual current asset tag while preserving the source shell otherwise.
    html=re.sub(r'\s*<a id="modernWorkspaceEntry".*?</a>','',html)
    html=html.replace('<a href="./" class="brand">','<a href="modern/" class="brand">')
    html=re.sub(r'<script src="app\.js[^\"]*" defer></script>', '<script src="modern/content.js?v=1" defer></script><script src="modern/app.js?v=1" defer></script>',html)
    html=html.replace('stimuli/stimuli.js?v=1','stimuli/stimuli.js?v=silent-loops-1')
    assert 'src="modern/app.js' in html
    html=html.replace('modern/app.js?v=1','modern/app.js?v=notes-v10-loop-10')
    html=html.replace('modern/content.js?v=1','modern/content.js?v=notes-v10-loop-10')
    html=html.replace('<div class="nav-label" id="workspaceModuleLabel">','<a class="workspace-switch" href="./">Open original workspace</a><div class="nav-label" id="workspaceModuleLabel">')
    (OUT/'index.html').write_text(html)
    app=(ROOT/'app.js').read_text()
    app=app.replace("const KEY = 'ling285-study-studio-v1';","const KEY = 'ling285-modern-studio-v1';")
    runtime=(OUT/'runtime.js').read_text().replace('// MODULE_II_LAYOUT_HOOK',(OUT/'module2-layout.js').read_text())
    app=app.replace('init();\n})();', runtime+'\ninstallModern();\ninit();\n})();')
    (OUT/'app.js').write_text(app)
    dump(OUT/'build-manifest.json', {'sourceAppSha256':hashlib.sha256((ROOT/'app.js').read_bytes()).hexdigest(),'guideTopics':len(GUIDES),'originalContentUnchanged':True})

if __name__=='__main__':build()
