"""Derive the Module III preview from the real LING406 interface.

Reuses reader behavior and CSS, never loads Module II's content or state.
The replacement assertions deliberately fail when the upstream template changes.
"""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT.parent
app = (BASE / 'app.js').read_text()


def replace_function(name, replacement):
    global app
    lines = app.splitlines(keepends=True)
    start = next(i for i, line in enumerate(lines) if line.startswith(f'function {name}('))
    end = start + 1
    if not lines[start].rstrip().endswith('}'):
        while lines[end].rstrip('\n') != '}':
            end += 1
        end += 1
    app = ''.join(lines[:start]) + replacement.strip() + '\n' + ''.join(lines[end:])


start = app.index('const T2=')
end = app.index('const $=')
app = app[:start] + """const D=window.LING406_MODULE3,KEY='ling406-module3-study-studio-v1',QZ=window.LingQuiz;
const sections=new Map(D.sections.map(s=>[s.id,s])),questions=new Map(D.questions.map(q=>[q.id,q]));
const collections=D.modules,modules=new Map(collections.map(m=>[m.id,m]));
const reviewModule=modules.get('review');
""" + app[end:]
app = app.replace('transcriptVersion:18', 'transcriptVersion:20')
app = app.replace('[1,2,3,4,5,6,7,10,12,14,16,18]', '[20,21,22,23]')
app = app.replace('Number(state.transcriptVersion):18', 'Number(state.transcriptVersion):20')
app = app.replace('Number(value):16', 'Number(value):20')
app = app.replace("'speech1'", "'reading1'")
app = app.replace("window.LingVisual.gallery()", "pending('Experiment videos')")
app = app.replace("if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});", '// Template preview deliberately does not install an offline cache.')
app = app.replace("LING406-notes-and-progress.json", "LING406-ModuleIII-notes-and-progress.json")

replace_function('nav', r"""function nav(){
 $('#courseNav').innerHTML=`<button data-go="home" class="${view==='home'?'active':''}">Course overview</button><a class="button" href="../?view=home">Module II · Midterm 2</a><div class="small muted" style="padding:8px 13px">Module III · Final</div>`;
 $('#workNav').innerHTML=WORK.map(([id,title])=>`<button data-go="${id}" class="${view===id?'active':''}">${title}</button>`).join('');
 $('#collectionNav').innerHTML=collections.map(m=>`<button data-lecture="${m.id}" class="${view==='collection'&&selected===m.id?'active':''}"><span class="nav-num">${m.number}</span>${esc(m.title)}</button>`).join('');
}""")
replace_function('teachingBlocks', "function teachingBlocks(s){return D.editions[state.transcriptVersion-20].scripts[s.id].blocks}")
replace_function('transcript', "function transcript(s){return teachingBlocks(s).flatMap(b=>[b.text,...b.children])}")
replace_function('teachingRich', "function teachingRich(text){return rich(text)}")
replace_function('spokenTeaching', "function spokenTeaching(text){return text}")
replace_function('displayTitle', "function displayTitle(s){return s.title}")
replace_function('transcriptHTML', r"""function transcriptHTML(s){
 const entry=D.editions[state.transcriptVersion-20].scripts[s.id];
 if(entry.status==='pending')return '<p class="small muted">Teaching explanation pending. This template keeps original source text separate from authored explanations.</p>';
 return entry.blocks.length?`<ul class="teaching-script">${entry.blocks.map(b=>`<li><p>${teachingRich(b.text)}</p>${b.children.length?`<ul>${b.children.map(p=>`<li><p>${teachingRich(p)}</p></li>`).join('')}</ul>`:''}</li>`).join('')}</ul>`:'';
}""")
replace_function('transcriptSelector', r"""function transcriptSelector(){return `<label class="transcript-version">Transcript<select data-transcript-version aria-label="Transcript version">${D.editions.map((e,i)=>`<option value="${20+i}">${esc(e.label)}</option>`).join('')}</select></label>`}""")
replace_function('sourceCaption', r"""function sourceCaption(s){const source=D.sources[s.source];return `<figcaption class="source-caption">Original source · page ${s.page}<br><a href="${source.pdf?source.pdf+'#page='+s.page:source.file}" target="_blank" rel="noopener">${esc(source.original)}</a></figcaption>`}""")
replace_function('visual', r"""function visual(s,eager=false){const source=D.sources[s.source];return `<figure class="section-visual reader-visual">${s.image?`<button class="slide-button" data-image="${esc(s.image)}" data-pdf="${source.pdf}#page=${s.page}" aria-label="Enlarge original page ${s.page}"><img class="slide" src="${s.image}" alt="${esc(displayTitle(s))} · original source page ${s.page}" loading="${eager?'eager':'lazy'}" decoding="async"></button>`:`<div class="card"><h3>Original PowerPoint · slide ${s.page}</h3><p>Visual preview pending an office render. Open the original PowerPoint to see the slide.</p><a class="button" href="${source.file}">Download original PowerPoint</a></div>`}${sourceCaption(s)}</figure>`}""")
replace_function('home', r"""function home(){const count=D.sections.filter(s=>state.read[s.id]).length;return `<span class="tag">MODULE III · TEMPLATE PREVIEW</span><div class="hero"><span class="tag">LING406 · PSYCHOLINGUISTICS</span><h1>Reading, morphology,<br>thought and modality.</h1><p>Weeks 10–12 and the supplied final review. Six collections retain the original page order, with four teaching editions prepared for authoring.</p><div class="row"><button class="primary" data-lecture="reading1">Open Reading 1</button><button data-go="sources">Sources & coverage</button><button data-review>Open final review</button></div></div><div class="notice">Template stage · Original sources are indexed. Teaching explanations, study guides and practice questions have not been authored yet.</div><div class="grid"><div class="card"><span class="tag">MODULE III</span><h2>Six individual collections</h2><p>133 lecture slides and 52 review pages · 185 pages total.</p><p class="small muted">${count} of 185 pages marked read</p><div class="progress"><span style="width:${count/185*100}%"></span></div><button data-go="combined">Open all source pages</button></div><div class="card"><span class="tag">TEACHING EDITIONS</span><h2>Four separate styles</h2><p>PSYC301 v20-style teaching, Original C Version 2, D Version 2, and Original C Version 3.</p><p>Each edition has its own page-by-page authoring records. Empty slots are not completed transcripts.</p></div><div class="card"><span class="tag">COURSE MODULES</span><h2>Module II</h2><p>Open the existing Midterm 2 workspace with its original notes, quizzes and teaching editions.</p><a class="button" href="../?view=home">Open Module II</a></div></div>`}""")
replace_function('collection', r"""function collection(){const m=modules.get(selected),items=m.sections.map(id=>sections.get(id));return `<span class="tag">INDIVIDUAL COLLECTION ${m.number}</span><h1>${esc(m.title)}</h1><p>${items.length} original source pages · teaching editions awaiting authoring.</p><div class="row study-tools"><button data-reader="lecture">Visual + transcript</button>${expandButton('lecture')}<a class="button" href="${D.sources[m.source].file}" target="_blank" rel="noopener">Open original ${D.sources[m.source].format.toUpperCase()}</a></div>${searchTools('Search original source text')}${items.map(sectionHTML).join('')}`}""")
replace_function('sources', r"""function sources(){return `<h1>Sources & coverage</h1><p>All six uploads are preserved as supplied. The final review filename is dated 2025. Its contents will guide coverage without being treated as a confirmed current exam blueprint.</p><div class="row study-tools"><button data-action="export">Export Module III notes & progress</button><a class="button" href="source-manifest.json">Source manifest</a></div><div class="grid">${D.modules.map(m=>{const s=D.sources[m.source];return `<div class="card"><h2>${esc(m.title)}</h2><p>${s.pages} source pages · ${s.previewStatus==='ready'?'original PDF visuals ready':'PowerPoint visual rendering pending'}</p><p>Four teaching editions pending.</p><a href="${s.file}">${esc(s.original)}</a><br><button data-lecture="${m.id}">Open collection</button></div>`}).join('')}</div><p>Module I is not included. Review pages have independent notes and original visuals. No study questions or experimental findings have been imported from Module II.</p>`}""")
for name, label in [('guide','What to know by the end'),('core','Must know · core review'),('experiments','Experiments to know'),('test','Current practice test'),('quizzes','Lecture quizzes'),('missed','Missed & uncertain'),('written','Written practice')]:
    replace_function(name, f"function {name}(){{return pending({json.dumps(label)})}}")
app = app.replace("[displayTitle(s),...transcript(s)]", "[displayTitle(s),s.sourceText,...transcript(s)]")
app = app.replace("render();clock();", "document.querySelector('header .transcript-version').outerHTML=transcriptSelector();render();clock();")
app += r"""
function pending(title){return `<h1>${esc(title)}</h1><div class="card"><p>This part of the Module III template is ready for source-based authoring. It does not contain completed study content yet.</p><button data-go="sources">Browse original sources</button></div>`}
"""
assert not re.search(r'\bT(?:2|3|4|5|6|7|10|12|14|16|18)\b', app)
assert '229' not in app and '55-slide' not in app and 'all nine' not in app
(ROOT / 'app.js').write_text(app)

html = (BASE / 'index.html').read_text()
html = re.sub(r'<script\b[^>]*>.*?</script>', '', html)
html = re.sub(r'href="([^"#][^"]*)"', lambda m: 'href="' + ('../' + m[1] if not m[1].startswith(('http', './')) else m[1]) + '"', html)
html = html.replace('LING406 / MIDTERM 2', 'LING406 / MODULE III · TEMPLATE')
html = html.replace('Psycholinguistics · Midterm 2', 'Psycholinguistics · Module III')
html = html.replace('<title>LING406 · Study Studio</title>', '<title>LING406 · Module III template</title>')
html = html.replace('Module 1 · Midterm 1 archive', 'Module I · Not added')
html = html.replace('Midterm 1 is complete. Its files have not been added to this LING406 workspace.', 'Module I material will be added separately.')
html = re.sub(r'(<select data-transcript-version[^>]*>).*?(</select>)', r'\1<option value="20">PSYC301 v20-style teaching</option>\2', html)
html = html.replace('</body>', '<script src="data.js"></script><script src="../quiz-engine.js"></script><script src="app.js"></script><script src="../../reader-timer.js" defer></script><script src="../../course-switcher.js" defer></script></body>')
(ROOT / 'index.html').write_text(html)
refs = ['app.js', 'index.html', 'style.css', 'transcripts-v5.css']
(ROOT / 'template-provenance.json').write_text(json.dumps({
    'baselineCommit': '536955c4da771f656876116a259c643dc811d0b2',
    'source': 'LING406 Module II',
    'files': {f'ling406/{name}': hashlib.sha256((BASE / name).read_bytes()).hexdigest() for name in refs},
    'sharedStyles': ['../style.css', '../transcripts-v5.css', '../../studio-gradients.css', '../../reader-timer.css', '../../course-switcher.css'],
    'localStorageKey': 'ling406-module3-study-studio-v1',
    'status': 'Template and source staging only. Not published.'
}, indent=2) + '\n')
print('Built Module III template using the existing LING406 layout and reader behavior.')
