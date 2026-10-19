"""Independent checks of the new intermediate algebra and antiderivatives."""
from pathlib import Path
import json
import math
import re
import subprocess
import numpy as np
import sympy as sp
from scipy import stats

ROOT = Path(__file__).resolve().parents[1]
pack = json.loads((ROOT/'exam-sheet-v5-data.js').read_text().split('=',1)[1].rstrip(';\n'))
manifest = json.loads((ROOT/'exam-sheet-v5-placements.json').read_text())
old = json.loads(subprocess.check_output(['git','show','3c92eee:bme423/exam-sheet-v5-data.js']).decode().split('=',1)[1].rstrip(';\n'))
assert set(pack['blocks']) == set(old['blocks']) and len(pack['blocks']) == 42
assert len(manifest['algebraExpansions']) == 91
for key, before in old['blocks'].items():
    after = pack['blocks'][key]
    assert all(before[f] == after[f] for f in ['title','sources','topics'])
    # All prose and figures remain; only the displayed working is expanded.
    prose = lambda html: re.sub(r'\\\[[\s\S]*?\\\]', '', html)
    old_paragraphs = re.findall(r'<p>.*?</p>', prose(before['html']))
    assert all(text in after['html'] for text in old_paragraphs), key
    for image in re.findall(r'<img[^>]+>', before['html']): assert image in after['html']
for edit in manifest['algebraExpansions']:
    for tex in edit['after']: assert r'\['+tex+r'\]' in pack['blocks'][edit['block']]['html']

checks = 0


def shown(key, text, expected):
    global checks
    assert text in pack['blocks'][key]['html'], (key,text)
    decimals = len(text.split('.')[1]) if '.' in text else 0
    assert abs(float(text)-float(expected)) <= .501*10**(-decimals), (key,text,expected)
    checks += 1


x = np.array([65,69,59,64,62,67,68,62,64,65])
shown('summary','416025',x.sum()**2)
shown('summary','41602.5',x.sum()**2/len(x))
shown('summary','3.16228',np.sqrt(len(x)))
for text, value in [('3.301375',.55*(-1-1.45)**2),('.045375',.15*(2-1.45)**2),('.24025',.10*(3-1.45)**2),('6.1605',.20*(7-1.45)**2),('2.1025',1.45**2)]: shown('discrete',text,value)
shown('loaded','11.56',3.4**2)
shown('events','2652',52*51)
u,t,c = sp.symbols('u t c', real=True)
for integrand, primitive in [(u/2,u**2/4),(u**2/2,u**3/6),(u**3/2,u**4/8),(2-u,2*u-u**2/2),(.1+u,.1*u+u**2/2),(.1*u+u**2,.05*u**2+u**3/3)]:
    assert sp.simplify(sp.diff(primitive,u)-integrand) == 0
    checks += 1
assert sp.integrate(u/2,(u,0,t)) == t**2/4
assert sp.simplify(sp.Rational(1,2)+sp.integrate(2-u,(u,1,t))-(2*t-t**2/2-1)) == 0
assert sp.integrate(u**2/2,(u,0,2)) == sp.Rational(4,3)
assert sp.integrate(u**3/2,(u,0,2)) == 2
assert sp.simplify(sp.Rational(1,3)-sp.Rational(1,4)-sp.Rational(1,12)) == 0
roots=np.roots([1,.2,-2]);upper=max(roots)
for text,value in [('8.04',.2**2-4*1*(-2)),('2.835489',np.sqrt(8.04)),('2.635489',-.2+np.sqrt(8.04)),('-1.51774',min(roots)),('.0868226',.05*upper**2),('.762733',upper**3/3)]: shown('endpoint',text,value)
assert abs(float(sp.integrate(.1+u,(u,0,upper)))-1)<1e-12
for text,value in [('17.052',1.96*8.7),('5.86806',stats.norm.ppf(.75)*8.7)]: shown('quantile',text,value)
shown('sampling','7.07107',np.sqrt(50));shown('sampling','.045',1.5**2/50)
pooled=(21*8.4**2+26*9.5**2)/47
for text,value in [('1481.76',21*8.4**2),('2346.50',26*9.5**2),('3828.26',21*8.4**2+26*9.5**2),('.0454545',1/22),('.0370370',1/27),('.0824916',1/22+1/27),('6.719132',pooled*(1/22+1/27))]: shown('pooled-t',text,value)
shown('anova','119291',189**2+217**2+191**2);shown('anova','3963',1188+1412+1363)
shown('conditions','53.29',7.3**2);shown('conditions','82.81',9.1**2)
shown('bonferroni','5.0534',2*2.5267);shown('bonferroni','.3368933',2*2.5267/15)
prob=8/61
shown('binary','.001867998',prob*(1-prob)/61)
shown('z-yates','.0926316',1/25+1/19);shown('z-yates','.0229665',(24/44)*(20/44)*(1/25+1/19))
shown('z-yates','.00992180',1/186+1/220);shown('z-yates','.1050391',.565-.455-.5*(1/186+1/220))
o=np.array([[18,7],[6,13]]);e=stats.chi2_contingency(o,correction=True).expected_freq
shown('chi2','3.863636',abs(o[0,0]-e[0,0])-.5);shown('chi2','14.927686',(abs(o[0,0]-e[0,0])-.5)**2)
o=np.array([[36,131],[41,132],[75,104]]);e=stats.chi2_contingency(o,correction=False).expected_freq
for text,value in [('25384',167*152),('166.654',(o[0,0]-e[0,0])**2),('93.44444',(o[1,0]-e[1,0])**2),('509.680648',(o[2,0]-e[2,0])**2)]: shown('large-chi',text,value)
for text,value in [('729',(255-282)**2),('56.25',(125-117.5)**2),('380.25',(90-70.5)**2)]: shown('gof',text,value)
shown('risk','150',6*25);shown('risk','342',19*18)
shown('odds','1750',50*35);shown('odds','602',14*43)
shown('folate-risk','12825',27*475);shown('folate-risk','2100',525*4)
print(f'PASS: {checks} new intermediate arithmetic/symbolic checks; integration powers, both bounds and quadratic roots; all 42 original sections, prose and figures retained; 91 expanded operations in place.')
