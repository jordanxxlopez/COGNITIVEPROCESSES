"""Actual plotted PDF/CDF sketches for the Homework 1 density example."""
import math
import os
os.environ.setdefault('MPLCONFIGDIR', '/tmp/bme423-matplotlib')
os.environ.setdefault('XDG_CACHE_HOME', '/tmp/bme423-graph-cache')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np


def build_graphs(root):
    c = -.1 + math.sqrt(2.01)
    x = np.linspace(0, c, 201)
    folder = root / 'figures'
    folder.mkdir(exist_ok=True)
    plt.rcParams.update({'font.family':'DejaVu Sans', 'font.size':6.4,
                         'axes.linewidth':.55, 'xtick.major.width':.5,
                         'ytick.major.width':.5, 'svg.hashsalt':'bme423-hw1-sketch'})
    for kind in ['pdf','cdf']:
        fig = plt.figure(figsize=(2.50, 1.10))
        ax = fig.add_axes([.19,.25,.76,.66])
        ax.spines[['top','right']].set_visible(False)
        ax.set_xlim(-.16,c+.23)
        ax.set_xticks([0,.5,c], ['0','.5',r'$c$'])
        ax.tick_params(length=2,pad=1,labelsize=6.4)
        ax.set_xlabel(r'$x$',labelpad=0,loc='right',fontsize=6.6)
        ax.set_ylabel(r'$f(x)$' if kind=='pdf' else r'$F(x)$',
                      rotation=0,labelpad=5,fontsize=6.6)
        ax.yaxis.set_label_coords(-.14,.93)
        if kind=='pdf':
            y=.1+x
            ax.set_ylim(-.10,1.61)
            ax.set_yticks([0,.1+c],['0','1.418'])
            ax.plot([-.16,0],[0,0],color='black',lw=1)
            ax.plot(x,y,color='black',lw=1.2)
            ax.plot([c,c+.23],[0,0],color='black',lw=1)
            ax.plot([0,c],[0,.1+c],'o',color='black',ms=2.7)
            ax.plot([0,c],[.1,0],'o',mfc='white',mec='black',mew=.6,ms=2.7)
            ax.annotate('.1',xy=(0,.1),xytext=(.25,.62),fontsize=6.4,
                        arrowprops={'arrowstyle':'-','lw':.5})
        else:
            y=.1*x+x*x/2
            ax.set_ylim(-.06,1.12)
            ax.set_yticks([0,1])
            ax.plot([-.16,0],[0,0],color='black',lw=1)
            ax.plot(x,y,color='black',lw=1.2)
            ax.plot([c,c+.23],[1,1],color='black',lw=1)
            ax.vlines([.5,c],[0,0],[.175,1],color='.55',lw=.5,linestyles='dashed')
            ax.plot([0,.5,c],[0,.175,1],'o',color='black',ms=2.7)
        fig.savefig(folder/f'hw1-density-{kind}.svg',metadata={'Date':None},
                    transparent=False,facecolor='white')
        plt.close(fig)
    return {'source':'hw1.pdf:3','side':2,'support':[0,c],
            'endpointDensity':.1+c,'cdfMidpoint':.1*.5+.5**2/2,
            'pdf':'figures/hw1-density-pdf.svg','cdf':'figures/hw1-density-cdf.svg',
            'sampleX':x.tolist(),'sampleDensity':(.1+x).tolist(),
            'sampleCDF':(.1*x+x*x/2).tolist()}


def render_sketch_row():
    return r'''<section class="sheet-sketch-row" aria-label="How to sketch the Homework 1 density and cumulative distribution">
<div class="sheet-sketch-steps"><h3>Sketch by hand: density → cumulative curve</h3>
<p><b>1. Axes:</b> label \(x\), then vertical \(f(x)\) or \(F(x)\). Mark \(0\) and \(c\approx1.318\).</p>
<p><b>2. PDF:</b> straight line from \((0,.1)\) (open) to \((c,1.418)\) (filled); zero outside.</p>
<p><b>3. CDF:</b> through \((0,0),(.5,.175),(c,1)\); bend upward, then stay at one. No jumps.</p>
\[F(.5)=.1(.5)+\frac{(.5)^2}{2}=.175\]
</div><figure><figcaption><b>PDF:</b> height is density; area gives probability</figcaption><img src="figures/hw1-density-pdf.svg" alt="Density zero outside zero to c, rising line from open zero point one to filled c one point four one eight; zero itself is filled at zero; c at zero is open." width="240" height="106"></figure>
<figure><figcaption><b>CDF:</b> accumulated area; starts at 0, ends at 1</figcaption><img src="figures/hw1-density-cdf.svg" alt="Continuous cumulative curve: flat at zero before zero, convex increasing through point five point one seven five to c one, then flat at one." width="240" height="106"></figure></section>'''
