"""Section 15. Reading-first writing practice with optional saved responses."""
import hashlib

def assemble_writing(questions,qa,asked,review,hard,code,connections,page_map):
    rows=[];seen=set()
    def add(lid,concept,prompt,answer,sources,id=None,kind='Generated practice',image=''):
        normalized=lid+'|'+' '.join(prompt.split()).casefold()
        if normalized in seen:return
        seen.add(normalized)
        identity=id or 'modern-writing-'+hashlib.sha256((lid+'|'+prompt).encode()).hexdigest()[:16]
        rows.append(dict(id=identity,lectureId=lid,moduleId='module2',concept=concept,prompt=prompt,
          answer=answer,sources=sources,type='written',topic=concept.replace('-',' '),kind=kind,image=image))
    for q in questions:
        if q['moduleId']=='module2' and q['type']=='written':
            add(q['lectureId'],q['concept'],q['wordings']['original'],q['answer'],q['sources'],id=q['id'])
    for r in review:
        source=[dict(collection=r['collection'],page=p) for p in r['pages']]
        concept=page_map[r['collection']][r['pages'][0]]
        add(r['collection'],concept,r['question'],r['answer'],source,kind='Supplied review · rewritten study answer',image=r['image'])
        # An existing quiz prompt with the same wording gets the source image too.
        for item in rows:
            if item['prompt']==r['question']:
                item['image']=r['image'];item['kind']='Supplied review · rewritten study answer'
        add(r['collection'],concept,r['change'],r['changedAnswer'],source)
    for q in qa:
        if q['moduleId']=='module2':add(q['lectureId'],q['concept'],q['question'],'\n\n'.join(q['answer'][:2]),q['sources'])
    for g in asked:
        if g['moduleId']!='module2':continue
        for item in g['items']:add(g['collection'],g['concept'],item['question'],item['answer'],[dict(collection=g['collection'],page=p) for p in g['pages']])
    for h in hard:
        if h['moduleId']=='module2':add(h['collection'],h['concept'],h['question'],h['answer'],[dict(collection=h['collection'],page=p) for p in h['pages']])
    for c in code:add(c['collection'],c['concept'],c['question'],c['answer'],[dict(collection=c['collection'],page=p) for p in c['pages']])
    for c in connections:
        if c['moduleId']!='module2':continue
        refs=[r for r in c['sources'] if int(r['collection'][7:9])>=11]
        owner=refs[-1]
        add(owner['collection'],page_map[owner['collection']][owner['page']],c['question'],c['answer'],c['sources'])
    return rows
