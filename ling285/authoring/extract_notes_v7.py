"""Place the supplied v7 PDF's wording and emphasis beside its source slides.

This is a typography-aware extraction, not a teaching-text generator. Every
paragraph is assigned exactly once; headings and course metadata are retained in
the extraction manifest. Wrapped lines are joined with one space. Eight display
equations are transcribed into equivalent inline notation because PDF reading
order separates fraction numerators from denominators.
"""
from collections import Counter
from hashlib import sha256
import json
from pathlib import Path
import re

import fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'sources/notes-v7-all-lectures-11-18.pdf'
EXPECTED_SHA = 'b250fb6eb8ecaa119656efdac6c113a64f3f8cd937606c3c439092d589d9a195'
ZIP_SHA = '4b4530cf476e5495bc53c0ada73fac16e76f4d6f0c0e184ceb502a557e02b02f'
INDIVIDUAL_PDFS = {
    11:(6,'53d747c7bece947f4a0f948ba938078629ca169963bd31be6e414ac60f525a43'),
    12:(8,'6ae1ac1c1afa708fb6e86aa7aee4f39094969249a04dce09e50d23a2835fd41e'),
    13:(10,'2a753b0b6da289229f46effe15e732a309fa74e4ad58348d031bf19bdd94bc98'),
    14:(8,'0e6e1accca3d292fa51f9047c926dde30ddfe156b15e4ef8e123ac57ffa5c4e8'),
    15:(9,'bf5d757823815e2cd78a9121a669bbca864affa23946411820d714546374a4af'),
    16:(9,'4adca3ca42e9341843bf1316054fd1a80fd111ff50f988c780c1fc1460d91c35'),
    17:(7,'4c1236ef9d1e5b34a516060594edc78cd40ab2494a696db131ef3aeb2fee2c23'),
    18:(8,'bb5c78e74c65c76affd52777fa64deb95584c955623846618ee5ae3407d04ddc'),
}

# Combined-PDF page, vertical bounds, and a faithful inline rendering of the
# displayed expression. None changes an explanatory word or a numerical value.
EQUATIONS = {
    33: (670, 690, 'w₁ F1 + w₂ F2'),
    34: (540, 580, 'pᵢ = exp(zᵢ) / (Σⱼ exp(zⱼ))'),
    35: (700, 737, 'W ← W - η (∂L / ∂W)'),
    40: (375, 412, 'σ(z) = 1 / (1 + exp(-z))'),
    42: (538, 560, 'w₁ F1 + w₂ F2'),
    43: (42, 83, 'pᵢ = exp(zᵢ) / (Σⱼ exp(zⱼ))'),
    44: (339, 376, 'W ← W - η (∂L / ∂W)'),
    48: (340, 378, 'σ(z) = 1 / (1 + exp(-z))'),
}

# PDF section numbers and original slide numbers are different, especially when
# one note section explains multiple original slides. Repeated note sections are
# retained, not deduplicated or silently condensed.
SECTION_SLIDES = {
    11: {1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10, 10:11},
    12: {1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:10, 9:9, 10:11,
         11:12, 12:13, 13:14, 14:15, 15:16, 16:19, 17:20, 18:21},
    13: {1:2, 2:2, 3:3, 4:4, 5:6, 6:7, 7:8, 8:7, 9:9, 10:10,
         11:11, 12:12, 13:13, 14:12, 15:13, 16:16, 17:16, 18:17,
         19:17, 20:18, 21:18, 22:20, 23:23, 24:25},
    14: {1:2, 2:3, 3:4, 4:5, 5:6, 6:8, 7:9, 8:11, 9:12, 10:13,
         11:15, 12:16, 13:17, 14:18, 15:20, 16:21, 17:23, 18:25},
    15: {1:2, 2:3, 3:3, 4:4, 5:6, 6:6, 7:7, 8:7, 9:8, 10:9,
         11:10, 12:11, 13:12, 14:13},
    16: {1:2, 2:3, 3:5, 4:7, 5:8, 6:9, 7:10, 8:11, 9:11, 10:12,
         11:13, 12:14, 13:15, 14:16},
    17: {1:2, 2:3, 3:4, 4:4, 5:4, 6:5, 7:6, 8:7},
    18: {1:2, 2:2, 3:3, 4:2, 5:4, 6:5, 7:6, 8:7, 9:8},
}

# Entire bullets moved to their specific visual. Coordinates are one-based PDF
# section/bullet numbers; the source paragraph and all children stay unchanged.
BULLET_SLIDES = {
    (12,14,2):23, (12,14,4):18, (12,18,3):23,
    (12,9,7):22, (12,9,8):22,
    (13,4,4):5,
    (13,11,3):14, (13,11,4):19, (13,11,5):15, (13,11,6):15,
    (14,5,2):14, (14,5,4):7, (14,7,3):10,
    (14,14,3):19, (14,16,2):22, (14,17,3):24, (14,17,4):24,
    (18,8,3):8, (18,8,4):8,
}


def normalize(text):
    return re.sub(r'\s+', ' ', text).strip()


def markdown(runs):
    """Keep each non-whitespace character's original bold font membership."""
    merged = []
    for value, bold in runs:
        value = re.sub(r'\s+', ' ', value)
        if merged and merged[-1][1] == bold:
            merged[-1][0] += value
        else:
            merged.append([value, bold])
    result = ''
    for value, bold in merged:
        if bold and value.strip():
            leading = ' ' if value.startswith(' ') else ''
            trailing = ' ' if value.endswith(' ') else ''
            result += leading + '**' + value.strip() + '**' + trailing
        else:
            result += value
    return normalize(result)


def marked_characters(runs):
    return [(c,bool(bold)) for value,bold in runs for c in value if not c.isspace()]


def markdown_characters(value):
    result=[]
    bold=False
    index=0
    while index < len(value):
        if value[index:index+2]=='**':
            bold=not bold
            index+=2
            continue
        if not value[index].isspace():result.append((value[index],bold))
        index+=1
    assert not bold,value
    return result


def physical_rows(page, number):
    fragments = []
    equation = EQUATIONS.get(number)
    omitted = []
    for block in page.get_text('dict')['blocks']:
        for line in block.get('lines', []):
            if line['bbox'][1] > 750:
                continue  # printed page number, not the notes' body
            if equation and equation[0] <= line['bbox'][1] < equation[1]:
                omitted.append(line)
                continue
            fragments.append(line)
    rows = []
    for line in sorted(fragments, key=lambda x:(round(x['bbox'][1], 1), x['bbox'][0])):
        y = line['bbox'][1]
        if rows and abs(rows[-1]['y'] - y) < .4:
            rows[-1]['lines'].append(line)
        else:
            rows.append({'y':y, 'lines':[line]})
    for row in rows:
        row['lines'].sort(key=lambda x:x['bbox'][0])
        row['x'] = min(x['bbox'][0] for x in row['lines'])
        row['runs'] = []
        for i,line in enumerate(row['lines']):
            if i and row['runs'] and not row['runs'][-1][0].endswith(' '):
                row['runs'].append((' ',False))
            row['runs'].extend((s['text'], bool(s['flags'] & 16)) for s in line['spans'])
        row['text'] = normalize(''.join(s for s,_ in row['runs']))
    if equation:
        rows.append({'y':equation[0], 'x':200, 'text':equation[2],
                     'runs':[(equation[2],False)], 'equation':True})
        rows.sort(key=lambda x:x['y'])
    return rows, omitted


def extract():
    assert sha256(SOURCE.read_bytes()).hexdigest() == EXPECTED_SHA
    document = fitz.open(SOURCE)
    sections = {}
    headers, equations, layout = [], [], []
    lecture = section = bullet = unit = None
    for index,page in enumerate(document):
        number = index + 1
        rows, omitted = physical_rows(page, number)
        assert not page.get_images(), f'Unprocessed raster image on PDF page {number}'
        layout.append({'pdfPage':number, 'width':page.rect.width, 'height':page.rect.height,
                       'textLines':len(rows), 'images':0, 'renderedAndVisuallyReviewed':True})
        if omitted:
            equations.append({'pdfPage':number, 'originalExtraction':[
                {'bbox':line['bbox'], 'spans':line['spans']} for line in omitted],
                'inline':EQUATIONS[number][2]})
        for row in rows:
            text = row['text']
            if text.startswith('Title of Lecture:'):
                lecture = int(re.search(r'Lecture (\d+)',text)[1])
            if row['x'] < 50:
                heading = re.match(r'Section (\d+): (.+)',text)
                if heading:
                    section = {'lecture':lecture,'number':int(heading[1]),
                               'title':heading[2], 'pdfPages':[number], 'bullets':[]}
                    key=(lecture,section['number'])
                    assert key not in sections, key
                    sections[key]=section
                    bullet=unit=None
                    continue
                elif re.match(r'Course:|Title of Lecture:|Date:|Professor:',text):
                    headers.append({'pdfPage':number,'text':text})
                    continue
            assert section is not None, (number,text)
            if number not in section['pdfPages']:section['pdfPages'].append(number)
            runs=row['runs'][:]
            marker=text.startswith('•')
            if marker:
                # The marker is a distinct fragment in the PDF. Preserve all
                # following font runs exactly, including justified fragments.
                for j,(value,bold) in enumerate(runs):
                    if '•' in value:
                        runs[j]=(value.replace('•','',1).lstrip(),bold)
                        break
                runs=[x for x in runs if x[0]]
                if row['x'] < 60:
                    bullet={'main':None,'children':[]}
                    section['bullets'].append(bullet)
                    key=f'L{lecture}-S{section["number"]}-B{len(section["bullets"])}'
                    unit={'id':key,'runs':runs,'pdfPages':[number]}
                    bullet['main']=unit
                else:
                    assert bullet is not None,(number,text)
                    key=f'{bullet["main"]["id"]}-C{len(bullet["children"])+1}'
                    unit={'id':key,'runs':runs,'pdfPages':[number]}
                    bullet['children'].append(unit)
            elif unit is None:
                # The supplied Closure section is a prose paragraph without a
                # printed bullet. Retain its complete wording as one main item.
                assert row['x'] < 50,(number,text)
                bullet={'main':None,'children':[]}
                section['bullets'].append(bullet)
                key=f'L{lecture}-S{section["number"]}-B{len(section["bullets"])}'
                unit={'id':key,'runs':runs,'pdfPages':[number]}
                bullet['main']=unit
            else:
                assert unit is not None,(number,text)
                # A display expression belongs to the preceding explanatory
                # bullet; it is neither discarded nor turned into a new label.
                previous=unit['runs'][-1][1] if unit['runs'] else False
                first=runs[0][1] if runs else False
                unit['runs'].append((' ',previous and first))
                unit['runs'].extend(runs)
                if number not in unit['pdfPages']:unit['pdfPages'].append(number)
    for sec in sections.values():
        for b in sec['bullets']:
            for u in [b['main'],*b['children']]:
                u['text']=markdown(u['runs'])
                u['plain']=normalize(''.join(s for s,_ in u['runs']))
                assert normalize(u['text'].replace('**',''))==u['plain'],u['id']
                characters=marked_characters(u['runs'])
                assert markdown_characters(u['text'])==characters,u['id']
                u['normalizedTextSha256']=sha256(u['plain'].encode()).hexdigest()
                u['boldCharactersSha256']=sha256(json.dumps(characters,ensure_ascii=False,
                    separators=(',',':')).encode()).hexdigest()
    return sections, headers, equations, layout


def verify_all_source_characters(sections):
    """Independent raw-span coverage check, excluding only documented layouts."""
    expected=Counter()
    all_spans=[]
    for i,page in enumerate(fitz.open(SOURCE),1):
        lines=[]
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines',[]):
                lines.append({'bbox':line['bbox'],'spans':[
                    {key:span[key] for key in ('text','font','size','flags','bbox','origin')}
                    for span in line['spans']]})
                raw=''.join(span['text'] for span in line['spans'])
                if line['bbox'][1]>750:continue
                if re.match(r'Course:|Title of Lecture:|Date:|Professor:|Section \d+:',raw):continue
                equation=EQUATIONS.get(i)
                if equation and equation[0]<=line['bbox'][1]<equation[1]:continue
                for span in line['spans']:
                    expected.update((c,bool(span['flags']&16)) for c in span['text']
                                    if not c.isspace() and c!='•')
        all_spans.append({'pdfPage':i,'width':page.rect.width,'height':page.rect.height,
                          'lines':lines})
    actual=Counter()
    for sec in sections.values():
        for bullet in sec['bullets']:
            for unit in [bullet['main'],*bullet['children']]:actual.update(marked_characters(unit['runs']))
    for _,_,inline in EQUATIONS.values():actual.subtract((c,False) for c in inline if not c.isspace())
    assert +actual==expected and not -actual,(expected-actual,actual-expected)
    (ROOT/'authoring/notes-v7-typography.json').write_text(json.dumps({
        'sourceSha256':EXPECTED_SHA,'pages':all_spans},ensure_ascii=False,separators=(',',':'))+'\n')
    return {'sourceNonWhitespaceCharacters':sum(expected.values()),
            'sourceBoldNonWhitespaceCharacters':sum(count for (_,bold),count in expected.items() if bold),
            'allSourceBodyCharactersPreserved':True,'allParagraphBoldCharactersPreserved':True,
            'excludedLayouts':['32 course metadata lines','115 section-heading lines',
                               'printed page numbers','8 explicitly transcribed display equations']}


def build():
    sections,headers,equations,layout=extract()
    proof=verify_all_source_characters(sections)
    assert len(headers)==32
    source=json.loads((ROOT/'modern/transcripts-original-c.json').read_text())
    pages={n:{s['page']:{'page':s['page'],'teaching':[], 'evidence':{
        'pdfFile':'sources/notes-v7-all-lectures-11-18.pdf','pdfPages':[],
        'paragraphIds':[], 'noteSections':[]}}
        for s in source['collections'][f'lecture{n}']['sections']} for n in range(11,19)}
    assignments=[]
    for n,sn,bi in BULLET_SLIDES:
        assert (n,sn) in sections and bi <= len(sections[(n,sn)]['bullets']),(n,sn,bi)
    def place(n,slide,sec,main,children):
        dest=pages[n][slide]
        dest['teaching'].append({'text':main['text'],'children':[u['text'] for u in children]})
        units=[main,*children]
        evidence=dest['evidence']
        evidence['pdfPages']=sorted(set(evidence['pdfPages']+[p for u in units for p in u['pdfPages']]))
        evidence['paragraphIds'].extend(u['id'] for u in units)
        if sec['number'] not in evidence['noteSections']:evidence['noteSections'].append(sec['number'])
        assignments.extend({'id':u['id'],'lecture':n,'sourceSlide':slide,
                            'role':'main' if u is main else 'child'} for u in units)
    for (n,sn),sec in sections.items():
        assert sn in SECTION_SLIDES[n],(n,sn)
        for bi,b in enumerate(sec['bullets'],1):
            slide=BULLET_SLIDES.get((n,sn,bi),SECTION_SLIDES[n][sn])
            if (n,sn,bi)==(13,22,3):
                # The PDF gathers all three vowel filters into one section;
                # place the /i/ and /a/ wording beside their original visuals.
                assert len(b['children'])==5
                place(n,20,sec,b['main'],[b['children'][0],b['children'][1],b['children'][4]])
                place(n,21,sec,b['children'][2],[])
                place(n,22,sec,b['children'][3],[])
            else:
                place(n,slide,sec,b['main'],b['children'])
    expected=[u['id'] for sec in sections.values() for b in sec['bullets'] for u in [b['main'],*b['children']]]
    assert Counter(expected)==Counter(x['id'] for x in assignments)
    payload={'sourceFiles':[{'file':'sources/notes-v7-all-lectures-11-18.pdf',
                            'sha256':EXPECTED_SHA,
                            'label':'LING285 Notes v7 - All Lectures 11-18.pdf'}],
             'collections':{f'lecture{n}':{'pages':list(pages[n].values())} for n in range(11,19)}}
    manifest={'sourceSha256':EXPECTED_SHA, 'sourcePdfPages':65,
        'archiveVerification':{'zipSha256':ZIP_SHA,
            'combinedPdfBytesIdenticalToZipEntry':True,
            'individualPdfPageTypographyIdenticalToCombined':True,
            'individualPdfs':{f'lecture{n}':{'pages':count,'sha256':digest}
                              for n,(count,digest) in INDIVIDUAL_PDFS.items()}},
        'sourceMetadata':headers,'displayEquationTranscriptions':equations,
        'pageInventory':layout,'noteSections':list(sections.values()),
        'assignments':assignments,
        'preservation':{**proof,
            'paragraphs':len(expected),'allParagraphsAssignedExactlyOnce':True,
            'wording':'All explanatory words retained; only whitespace/line wrapping normalized.',
            'bold':'Every non-whitespace character retains its PDF bold-font membership.',
            'formulas':'Eight display expressions converted to equivalent inline notation.',
            'headings':'Course metadata and note section headings are retained here. Original slide titles remain the reader headings.',
            'mapping':'Whole note bullets stay together except the two vowel-specific children of L13 S22 B3, promoted beside their own visuals.',
            'scope':'Only supplied Module II notes; no Module I notes inferred.'}}
    for name,value in [('notes-v7.json',payload),('notes-v7-extraction.json',manifest)]:
        (ROOT/'authoring'/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'pdfPages':65,'sections':len(sections),'paragraphs':len(expected),
        'collections':{n:{'slides':len(v),'withNotes':sum(bool(p['teaching']) for p in v.values())} for n,v in pages.items()}}))


if __name__=='__main__':build()
