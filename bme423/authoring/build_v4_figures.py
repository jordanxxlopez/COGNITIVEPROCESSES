"""Small labeled vector sketches of the actual course probability examples."""
import os,math
os.environ.setdefault('MPLCONFIGDIR','/tmp/bme423-matplotlib')
os.environ.setdefault('XDG_CACHE_HOME','/tmp/bme423-graph-cache')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from scipy.stats import norm

def build(root):
 plt.rcParams.update({'font.family':'DejaVu Sans','font.size':7,'axes.linewidth':.5,'svg.hashsalt':'bme-v4-source-graphs'})
 folder=root/'figures';folder.mkdir(exist_ok=True)
 for kind in ['discrete','continuous','normal']:
  fig,axes=plt.subplots(1,2,figsize=(2.5,1.05));fig.subplots_adjust(left=.12,right=.98,top=.83,bottom=.25,wspace=.42)
  for ax in axes:
   ax.spines[['top','right']].set_visible(False);ax.tick_params(labelsize=7,length=2,pad=1,width=.5)
  a,b=axes
  if kind=='discrete':
   xs=np.array([-1,2,3,7]);ps=np.array([.55,.15,.10,.20]);cum=ps.cumsum()
   a.vlines(xs,0,ps,color='black',lw=.8);a.plot(xs,ps,'ko',ms=2.2);a.set(xlim=(-2,8),ylim=(-.02,.62),xticks=xs,yticks=[0,.55]);a.set_title('Mass f(x)',fontsize=7,pad=2)
   left=-2;level=0
   for x,y in zip(xs,cum):
    b.plot([left,x],[level,level],'k-',lw=.8);b.plot(x,level,'o',mfc='white',mec='black',mew=.5,ms=2.4);b.plot(x,y,'ko',ms=2.4);left=x;level=y
   b.plot([7,8],[1,1],'k-',lw=.8);b.set(xlim=(-2,8),ylim=(-.02,1.08),xticks=[-1,2,7],yticks=[0,1]);b.set_title('Step F(x)',fontsize=7,pad=2)
  elif kind=='continuous':
   c=-.1+math.sqrt(2.01);x=np.linspace(0,c,201)
   a.plot(x,.1+x,'k-',lw=1);a.plot([-.15,0],[0,0],'k-');a.plot([c,c+.2],[0,0],'k-');a.plot([0,c],[0,.1+c],'ko',ms=2.3);a.plot([0,c],[.1,0],'o',mfc='white',mec='black',mew=.5,ms=2.3)
   a.set(xlim=(-.15,c+.2),ylim=(-.05,1.62),xticks=[0,c],xticklabels=['0','c'],yticks=[0,1.418]);a.set_title('Density f(x)',fontsize=7,pad=2)
   b.plot(x,.1*x+x*x/2,'k-',lw=1);b.plot([-.15,0],[0,0],'k-');b.plot([c,c+.2],[1,1],'k-');b.plot([0,.5,c],[0,.175,1],'ko',ms=2.2)
   b.set(xlim=(-.15,c+.2),ylim=(-.04,1.12),xticks=[0,c],xticklabels=['0','c'],yticks=[0,1]);b.set_title('CDF F(x)',fontsize=7,pad=2)
  else:
   x=np.linspace(65,125,301);a.plot(x,norm.pdf(x,95,8.7),'k-',lw=1);a.axvline(95,color='.4',ls='--',lw=.5);a.set(xlim=(65,125),xticks=[86.3,95,103.7],xticklabels=['','95',''],yticks=[]);a.set_title('Normal f(x)',fontsize=7,pad=2)
   b.plot(x,norm.cdf(x,95,8.7),'k-',lw=1);b.plot(95,.5,'ko',ms=2.3);b.set(xlim=(65,125),xticks=[95],yticks=[0,.5,1]);b.set_title('Normal F(x)',fontsize=7,pad=2)
  for ax in axes:ax.set_xlabel('x',fontsize=7,labelpad=0,loc='right')
  svg=folder/f'v4-{kind}.svg'
  fig.savefig(svg,metadata={'Date':None},facecolor='white');plt.close(fig)
  svg.write_text('\n'.join(line.rstrip() for line in svg.read_text().splitlines())+'\n')
 return {'discrete':{'x':[-1,2,3,7],'p':[.55,.15,.10,.20],'source':'hw1.pdf:2'},'continuous':{'c':-.1+math.sqrt(2.01),'source':'hw1.pdf:3'},'normal':{'mean':95,'sd':8.7,'source':'hw1.pdf:3'}}
