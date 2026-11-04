"""Recompute the upload's numerical claims independently of authored prose."""
from pathlib import Path
import ast,json,numpy as np,re,zipfile
from lxml import etree
R=Path(__file__).resolve().parents[1]
D=json.loads((R/'authoring/extracted/lecture15-native.json').read_text())
w=ast.literal_eval(D[2]['speakerNotes'].split('W matrices (each row is a destination neuron, each column a source): ')[1].split('\n')[0]);W=[np.array(x)for x in w];a=[np.array([320.,2000.])]
for mat in W:a.append(mat@a[-1])
p=np.exp(a[-1]-max(a[-1]));p/=p.sum();delta=p-np.array([0,0,1,0,0]);gs=[]
for i in reversed(range(4)):
 gs.insert(0,np.outer(delta,a[i]));delta=W[i].T@delta
source=ast.literal_eval(D[5]['speakerNotes'].split('\nGradients: ')[1].split('\n')[0])
assert all(np.allclose(x,y,atol=1e-9)for x,y in zip(gs,source))
updated=[m-eta*g for m,eta,g in zip(W,[1e-6,.02,.02,.02],gs)]
expected=ast.literal_eval(D[5]['speakerNotes'].split('\nUpdated weights: ')[1].split('\n')[0]);assert all(np.allclose(x,y)for x,y in zip(updated,expected))
# Central differences verify both marked weights independently of the chain rule.
def loss(mats):
 h=np.array([320.,2000.])
 for mat in mats:h=mat@h
 return float(np.log(np.exp(h-max(h)).sum())+max(h)-h[2])
for layer,row,col in [(0,0,0),(3,0,0)]:
 eps=1e-7;plus=[x.copy()for x in W];minus=[x.copy()for x in W];plus[layer][row,col]+=eps;minus[layer][row,col]-=eps
 assert np.isclose((loss(plus)-loss(minus))/(2*eps),gs[layer][row,col],rtol=1e-6)
sig=lambda z:1/(1+np.exp(-z));stages=[]
with zipfile.ZipFile(R/'sources/lecture15.pptx')as z:
 xml=etree.fromstring(z.read('ppt/slides/slide12.xml'));ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
 for count in range(10):
  h=np.array([320.,2000.]);left=count;values=[]
  for m in W[:-1]:
   h=m@h;take=min(left,len(h));h[:take]=sig(h[:take]);left-=take;values.append(h.tolist())
  logits=W[-1]@h;prob=np.exp(logits-max(logits));prob/=prob.sum()
  for layer,vals in enumerate(values,1):
   for index,value in enumerate(vals):
    text=''.join(xml.xpath(f'.//p:sp[p:nvSpPr/p:cNvPr[@name="stage-{count}-value-{layer}-{index}"]]//a:t/text()',namespaces=ns))
    assert abs(float(text)-value)<=.00051,(count,layer,index,text,value)
  for index,value in enumerate(prob):
   text=''.join(xml.xpath(f'.//p:sp[p:nvSpPr/p:cNvPr[@name="stage-{count}-value-4-{index}"]]//a:t/text()',namespaces=ns))
   assert abs(float(text.rstrip('%'))/100-value)<=.00051,(count,index,text,value)
  stages.append({'stage':count,'hidden':values,'probabilities':prob.tolist()})
report={'method':'Independent NumPy matrix multiplication, softmax, chain-rule gradients, central finite differences for the marked weights, original simultaneous update, and nine sequential sigmoid changes. All ten states checked against native source labels to their printed precision.','linearActivations':[x.tolist()for x in a],'softmax':p.tolist(),'gradientsMatchNotes':True,'updatedWeightsMatchNotes':True,'markedInputWeightGradient':gs[0][0,0],'markedOutputWeightGradient':gs[3][0,0],'sigmoidMinus4':float(sig(-4)),'sigmoidPlus4':float(sig(4)),'sigmoidStages':stages}
(R/'authoring/extracted/lecture15-numerical-check.json').write_text(json.dumps(report,indent=2)+'\n')
print('PASS: source activations, backward gradients, simultaneous updates, both marked-weight directions, sigmoid examples and all ten native animation states.')
