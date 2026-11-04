import urllib.request, json, pathlib, re
O=pathlib.Path('ling285/stimuli/sources');O.mkdir(parents=True,exist_ok=True)
urls=[
'https://corpus.linguistics.berkeley.edu/acip/course/ipachart/consonants1.html',
'https://corpus.linguistics.berkeley.edu/acip/course/ipachart/consonants2.html',
'https://corpus.linguistics.berkeley.edu/acip/course/chapter9/cardinal/cardinal.html',
'https://www.phonetics.ucla.edu/course/chapter1/linkschapter1.htm',
'https://www.phonetics.ucla.edu/course/chapter1/consonants2.html',
'https://www.phonetics.ucla.edu/course/chapter1/consonants1.html',
'https://www.fon.hum.uva.nl/praat/manual/Source-filter_synthesis_4__Using_existing_sounds.html']
out=[]
for i,url in enumerate(urls):
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'StudyStudio educational media source audit'})
  with urllib.request.urlopen(req,timeout=35) as r:data=r.read();final=r.url
  text=data.decode('utf-8','replace');(O/f'page-{i}.html').write_text(text)
  out.append({'url':url,'final':final,'file':f'page-{i}.html','links':re.findall(r'(?:src|href|data-audio)=[\'"]([^\'"]+)',text),'text':re.sub('<[^>]+>',' ',text)[:15000]})
 except Exception as e:out.append({'url':url,'error':str(e)})
(O/'web-source-audit.json').write_text(json.dumps(out,indent=2))

for name in ['cons1.gif','cons2.gif']:
 url='https://d3uxfe7dw0hhy7.cloudfront.net/acip/assets/course/ipachart/'+name
 (O/name).write_bytes(urllib.request.urlopen(url,timeout=30).read())
