"""Put the symbolic operation into every numerical worked calculation.

Read-only original banks retain questions, answers, text, figures and step order.
This overlay changes only each step's mathematical displays. Every family and
extra homework case is reviewed explicitly; neuroscience copies use their own
labels with the identical arithmetic. All routes consume the same overlay.
"""
from pathlib import Path
import ast, copy, json, math, re
import numpy as np
from scipy import stats
ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads((ROOT/name).read_text().split('=',1)[1].rstrip(';\n'))
D,V,OLD,N=[load(n) for n in ('data.js','version-d-data.js','studio-flow-data.js','neuroscience-worked-data.js')]
BY={p['id']:p for p in D['problems']+V['extraCases']}
def f(x):return format(float(x),'.7g')
def n(x):return format(float(x),'.12g')
def frac(a,b):return r'\frac{'+str(a)+'}{'+str(b)+'}'
def sumstr(xs):return '+'.join(n(x) if x>=0 else '('+n(x)+')' for x in xs)
def quantile(xs,pct,lhs=None):
    xs=sorted(xs);size=len(xs);rank=1+pct*(size-1)/100;I=int(rank);d=rank-I;lo=xs[I-1];hi=xs[min(I,size-1)];lhs=lhs or 'x_{'+n(pct)+'}'
    value=lo+d*(hi-lo)
    return [r'R_{'+n(pct)+r'}=1+\frac{p(n-1)}{100}=1+\frac{'+n(pct)+'('+str(size)+r'-1)}{100}='+f(rank),
            lhs+r'=x_{(I)}+d(x_{(I+1)}-x_{(I)})='+n(lo)+'+'+f(d)+'('+n(hi)+'-'+n(lo)+')='+f(value)]
def tcut(df,alpha=.05,pair=False):
    a=r'\alpha_{\mathrm{pair}}' if pair else r'\alpha'
    return r't_{\mathrm{crit}}=t_{\nu,\,1-'+a+r'/2}=t_{'+n(df)+r',\,1-'+f(alpha)+r'/2}='+f(stats.t.isf(alpha/2,df))
def fcut(df1,df2,alpha=.05):return r'F_{\mathrm{crit}}=F_{\nu_1,\nu_2;\,1-\alpha}=F_{'+n(df1)+','+n(df2)+r';\,1-'+f(alpha)+'}='+f(stats.f.isf(alpha,df1,df2))
def chicut(df,alpha=.05):return r'\chi^2_{\mathrm{crit}}=\chi^2_{\nu;\,1-\alpha}=\chi^2_{'+n(df)+r';\,1-'+f(alpha)+'}='+f(stats.chi2.isf(alpha,df))
def pairse(var,size):return r'\mathrm{SE}_{ij}=\sqrt{s_{\mathrm{wit}}^2(1/n_i+1/n_j)}=\sqrt{\frac{2s_{\mathrm{wit}}^2}{n}}=\sqrt{\frac{2('+f(var)+')}{'+n(size)+'}}='+f(math.sqrt(2*var/size))
def pairt(i,j,a,b,se):return r'|t_{'+str(i)+str(j)+r'}|=\frac{|\bar x_'+str(i)+r'-\bar x_'+str(j)+r'|}{\mathrm{SE}_{ij}}=\frac{|'+n(a)+'-'+n(b)+'|}{'+f(se)+'}='+f(abs(a-b)/se)
def cell_work(obs):
    obs=np.asarray(obs,float);rows,cols=obs.shape;rs=obs.sum(axis=1);cs=obs.sum(axis=0);total=obs.sum();expected=np.outer(rs,cs)/total;corrected=rows==cols==2
    es=[];con=[]
    for i in range(rows):
        for j in range(cols):
            ij=str(i+1)+str(j+1);e=expected[i,j];o=obs[i,j]
            es.append('E_{'+ij+'}='+frac('R_'+str(i+1)+'C_'+str(j+1),'N')+'='+frac(n(rs[i])+'('+n(cs[j])+')',n(total))+'='+f(e))
            sym=r'\max(0,|O_{'+ij+'}-E_{'+ij+r'}|-.5)^2' if corrected else '(O_{'+ij+'}-E_{'+ij+'})^2'
            sub=r'\max(0,|'+n(o)+'-'+f(e)+r'|-.5)^2' if corrected else '('+n(o)+'-'+f(e)+')^2'
            val=max(0,abs(o-e)-.5)**2/e if corrected else (o-e)**2/e
            con.append('c_{'+ij+'}='+frac(sym,'E_{'+ij+'}')+'='+frac(sub,f(e))+'='+f(val))
    return es,con

def common(tex,topic):
    # Operations with a context-independent definition retain their exact
    # original numbers, adding the missing symbolic link before substitution.
    tex=re.sub(r'(E\[X\^2\]=)(?!\\sum|\\int)',r'\1\\sum_x x^2f(x)=',tex) if topic in ('expect','pmf','dcdf','random') else tex
    tex=re.sub(r'(E\[X\]=)(?!\\sum|\\int)',r'\1\\sum_x xf(x)=',tex) if topic in ('expect','pmf','dcdf','random') else tex
    tex=tex.replace(r'\operatorname{Var}(X)=',r'\operatorname{Var}(X)=E[X^2]-(E[X])^2=') if r'\operatorname{Var}(X)=' in tex and not tex.split(r'\operatorname{Var}(X)=',1)[1].startswith('E[') and topic in ('expect','pmf','dcdf','ccdf','integrate','uniform') else tex
    tex=re.sub(r'(^|,\\quad)(\\hat p_[12]=)(?!\\frac\{m_)',lambda m:m[1]+m[2]+frac('m_'+m[2][-2],'n_'+m[2][-2])+'=',tex)
    tex=re.sub(r'(E_\{(\d)(\d)\}=)(?!\\frac\{R)',lambda m:m[1]+frac('R_'+m[2]+'C_'+m[3],'N')+'=',tex)
    tex=re.sub(r'(c_([123])=)(?!\\frac\{\(O)',lambda m:m[1]+frac('(O_'+m[2]+'-E_'+m[2]+')^2','E_'+m[2])+'=',tex) if topic=='gof' else tex
    tex=tex.replace(r'\operatorname{SD}(2X-3Y)=\sqrt{45}',r'\operatorname{SD}(2X-3Y)=\sqrt{\operatorname{Var}(2X-3Y)}=\sqrt{45}')
    tex=tex.replace(r'\operatorname{SD}(W)=\sqrt{45}',r'\operatorname{SD}(W)=\sqrt{\operatorname{Var}(W)}=\sqrt{45}')
    if topic=='linear':
        tex=tex.replace(r'\operatorname{Var}(2X-3Y)=36+9',r'\operatorname{Var}(2X-3Y)=2^2\operatorname{Var}(X)+(-3)^2\operatorname{Var}(Y)=36+9')
    # Explicit general probability-to-cutoff definitions (not bare constants).
    tex=re.sub(r't_\{\\mathrm\{crit\}\}\(([^;]+);([^\)]+)\)=([^,]+)',lambda m:tcut(float(m[2]),float(m[1]),float(m[1])!=.05),tex)
    tex=re.sub(r'F_\{\\mathrm\{crit\}\}\(([^;]+);([^,]+),([^\)]+)\)=([^,]+)',lambda m:fcut(float(m[2]),float(m[3]),float(m[1])),tex)
    tex=re.sub(r'\\chi\^2_\{\\mathrm\{crit\}\}\(([^;]+);([^\)]+)\)=([^,]+)',lambda m:chicut(float(m[2]),float(m[1])),tex)
    tex=re.sub(r'z_\{\\mathrm\{crit\}\}\(\.05\)=([\d.]+)',r'z_{\\mathrm{crit}}=\\Phi^{-1}(1-\\alpha/2)=\\Phi^{-1}(1-.05/2)=\1',tex)
    tex=re.sub(r'p=2P\(T_\{(\d+)\}>([^)]+)\)',r'p=2P(T_\\nu>|t|)=2P(T_{\1}>\2)',tex)
    tex=re.sub(r'p=P\(F_\{(\d+),(\d+)\}>([^)]+)\)',r'p=P(F_{\\nu_1,\\nu_2}>F_{\\mathrm{obs}})=P(F_{\1,\2}>\3)',tex)
    tex=re.sub(r'p=P\(\\chi(?:\^2_\{(\d+)\}|_(\d+)\^2)>([^)]+)\)',lambda m:r'p=P(\chi^2_\nu>\chi^2_{\mathrm{obs}})=P(\chi^2_{'+(m[1] or m[2])+'}>'+m[3]+')',tex)
    if topic in ('ccdf','integrate','uniform'):
        tex=re.sub(r'E\[2X\+1\]=2\(',r'E[2X+1]=2E[X]+1=2(',tex)
        tex=re.sub(r'(E\[X\]=)(\\int_(?!a\^b))',r'\1\\int_a^b x f(x)\\,dx=\2',tex)
        tex=re.sub(r'(E\[X\^2\]=)(\\int_(?!a\^b))',r'\1\\int_a^b x^2 f(x)\\,dx=\2',tex)
    return tex

def transform(pid,flow,base,mode):
    p=BY[pid];g=p['given'];t=p['topic'];out=[]
    for index,(s,original) in enumerate(zip(flow,base)):
        label=original['label'];ms=copy.deepcopy(s['math'])
        if t=='summary' and 'data' in g:
            x=np.array(ast.literal_eval(g['data']),float);size=len(x);mean=x.mean();var=x.var(ddof=1);sd=math.sqrt(var);se=sd/math.sqrt(size)
            if label=='Subtract the mean':ms=['d_{'+str(i)+r'}=x_{'+str(i)+r'}-\bar x='+old for i,old in enumerate(ms,1)]
            elif label=='Square those differences':ms=['d_{'+str(i)+r'}^2=(x_{'+str(i)+r'}-\bar x)^2='+old for i,old in enumerate(ms,1)]
            elif label=='Median and range':
                sortedx=sorted(x);mid=size//2
                med=(r'x_{((n+1)/2)}=x_{('+str(mid+1)+')}='+f(sortedx[mid])) if size%2 else (frac('x_{(n/2)}+x_{(n/2+1)}','2')+'='+frac(n(sortedx[mid-1])+'+'+n(sortedx[mid]),'2')+'='+f(np.median(x)))
                ms=[r'\operatorname{median}(x)='+med,ms[1]]
            elif label=='75th percentile':ms=quantile(x,75)
            elif label=='Population estimates and the larger sample':ms=[ms[0],r'\mathrm{SEM}_{4n}=\frac{s}{\sqrt{4n}}=\frac{\mathrm{SEM}_n}{2}=\frac{'+f(se)+'}{2}='+f(se/2)]
        elif pid=='population':
            if label=='Square distances from μ':ms=[r'\sum_i(x_i-\mu)^2='+m for m in ms]
            ms=[m.replace(r's^2=\frac8{3-1}',r's^2=\frac{\sum_i(x_i-\bar x)^2}{n-1}=\frac8{3-1}') for m in ms]
        elif t=='percentile' and label=='Median, quartiles and IQR':
            x=[2,4,6,8,10,12,14] if pid=='percentile' else [2,4,6,8,10,12]
            ms=quantile(x,25,'Q_1')+quantile(x,50,'Q_2')+quantile(x,75,'Q_3')+[ms[-1]]
        elif t=='random' and label=='Count all sequences':ms=[r'N=2^{\text{number of independent positions}}=2^3=8']
        elif t=='independent':
            if index==0:ms=[ms[0].replace('=',r'=\frac{\text{favorable cards}}{\text{all available cards}}=',1)]
            if index==1:ms=[ms[0].replace('=',r'=\frac{\text{targets remaining}}{\text{cards remaining}}=',1)]
        elif t in ('expect','pmf','dcdf','random'):
            if label=='Validity':ms=[r'\sum_x f(x)='+ms[0]]
            if label in ('Complete CDF and sketches','Full CDF'):
                ms=[m.replace('F(x)=',r'F(x)=P(X\le x)=\sum_{u\le x}f(u)=',1) for m in ms]
            if label in ('Variance by both definitions','Variance by both forms'):
                if pid=='d-hw1-discrete':ms=[r'E[(X-\mu)^2]=\sum_x(x-\mu)^2f(x)=(-1-1.45)^2(.55)+(2-1.45)^2(.15)+(3-1.45)^2(.10)+(7-1.45)^2(.20)=9.7475',r'\operatorname{Var}(X)=E[X^2]-(E[X])^2=11.85-1.45^2=9.7475']
                else:ms=[m.replace(r'E[(X-\mu)^2]=',r'E[(X-\mu)^2]=\sum_x(x-\mu)^2f(x)=',1) for m in ms]
            if label=='CDF versus a strict endpoint':ms=[r'F(2)=P(X\le2)=f(-1)+f(2)=.55+.15=.70',r'P(X<2)=\sum_{x<2}f(x)=f(-1)=.55']
            if label=='Boundary probabilities':ms=[r'F(1.5)=P(X\le1.5)=f(0)+f(1)=.2+.5=.7',r'P(X<1)=\sum_{x<1}f(x)=f(0)=.2',r'P(X=1)=f(1)=.5',r'P(X>1)=1-F(1)=1-(.2+.5)=.3']
        if t in ('ccdf','integrate','uniform'):
            if t=='ccdf':lo=0;hi=2 if pid=='density' else g['upper support'];a=0;b=2/hi**2
            elif t=='integrate':lo=0;hi=(math.sqrt(.04+8)-.2)/2 if pid=='d-hw1-density' else 1;a=.1 if pid=='d-hw1-density' else .5;b=1
            else:lo,hi=(g['a'],g['b']) if pid=='uniform' else map(float,g['support'].split(' to '));a=1/(hi-lo);b=0
            ex=a*(hi**2-lo**2)/2+b*(hi**3-lo**3)/3;ex2=a*(hi**3-lo**3)/3+b*(hi**4-lo**4)/4
            F=lambda v:a*(v-lo)+b*(v*v-lo*lo)/2
            if label=='Check total probability':ms=[r'\int_a^b f(x)\,dx=\int_{'+n(lo)+'}^{'+n(hi)+'}('+n(a)+'+'+n(b)+r'x)\,dx=\left['+n(a)+'x+'+frac(n(b)+'x^2',2)+r'\right]_{'+n(lo)+'}^{'+n(hi)+'}=1']
            if label in ('Complete distribution and sketches','Complete CDF'):ms=[m.replace('F(x)=',r'F(x)=\int_{-\infty}^x f(u)\,du=',1) for m in ms]
            if label=='Moments from the density':
                ms=[]
                for power,val in [(1,ex),(2,ex2)]:
                    xp='x' if power==1 else 'x^2';E='E[X]' if power==1 else 'E[X^2]';anti=frac(n(a)+'x^{'+str(power+1)+'}',power+1)+'+'+frac(n(b)+'x^{'+str(power+2)+'}',power+2)
                    upper=a*hi**(power+1)/(power+1)+b*hi**(power+2)/(power+2);lower=a*lo**(power+1)/(power+1)+b*lo**(power+2)/(power+2)
                    ms.append(E+r'=\int_a^b '+xp+r'f(x)\,dx=\int_{'+n(lo)+'}^{'+n(hi)+'}'+xp+'('+n(a)+'+'+n(b)+r'x)\,dx=\left['+anti+r'\right]_{'+n(lo)+'}^{'+n(hi)+'}='+f(upper)+'-'+f(lower)+'='+f(val))
                ms+=[r'\operatorname{Var}(X)=E[X^2]-(E[X])^2='+f(ex2)+'-('+f(ex)+')^2='+f(ex2-ex*ex),r'E[2X+1]=2E[X]+1=2('+f(ex)+')+1='+f(2*ex+1)]
            if label=='Median':
                if not b:ms=[r'F(m)=\frac{m-a}{b-a}=\frac12',r'm=\frac{a+b}{2}=\frac{'+n(lo)+'+'+n(hi)+'}{2}='+f((lo+hi)/2)]
                elif not a:ms=[r'F(m)=\int_0^m f(x)\,dx=\frac{m^2}{'+n(hi**2)+r'}=\frac12',r'm=\sqrt{\frac{'+n(hi**2)+r'}2}=\frac{'+n(hi)+r'}{\sqrt2}='+f(hi/math.sqrt(2))]
                else:ms=[r'F(m)=\int_0^m f(x)\,dx='+n(a)+r'm+\frac{m^2}{2}=\frac12',r'Am^2+Bm+C=0\quad(A=1,\ B='+n(2*a)+r',\ C=-1)',r'm=\frac{-B+\sqrt{B^2-4AC}}{2A}=\frac{-'+n(2*a)+r'+\sqrt{'+n(2*a)+r'^2-4(1)(-1)}}{2(1)}='+f(-a+math.sqrt(a*a+1))]
            if label=='Tail, interval and point probabilities':
                cut=lo+(hi-lo)/2;left=lo+(hi-lo)/4;right=lo+3*(hi-lo)/4
                if t=='uniform':left,right=(3,5) if pid=='uniform' else (lo+1,lo+3)
                ms=[r'P(X>c)=1-F(c)\quad(c='+n(cut)+')',r'P(X>'+n(cut)+')=1-F('+n(cut)+')=1-'+f(F(cut))+'='+f(1-F(cut)),r'P(l<X<u)=F(u)-F(l)',r'P('+n(left)+'<X<'+n(right)+')=F('+n(right)+')-F('+n(left)+')='+f(F(right))+'-'+f(F(left))+'='+f(F(right)-F(left)),r'P(X='+n(cut)+')=F('+n(cut)+')-F('+n(cut)+'^-)=0']
            if label=='Normalize the full density and select c':ms=[r'1=\int_a^b f(x)\,dx=\int_0^c(.1+x)\,dx=\left[.1x+\frac{x^2}2\right]_0^c=.1c+\frac{c^2}2',r'Ac^2+Bc+C=0\quad(A=1,\ B=.2,\ C=-2)',r'c=\frac{-B+\sqrt{B^2-4AC}}{2A}=\frac{-.2+\sqrt{.2^2-4(1)(-2)}}{2(1)}\approx1.317745']
        if t in ('normalprob','normalquant'):
            if label=='Population moments and a shifted response':ms=[r'E[X]=\mu='+n(g['μ']),r'\operatorname{Var}(X)=\sigma^2='+n(g['σ'])+'^2='+f(g['σ']**2),ms[-1]]
            if label=='Standardize the probability cutoffs':ms=[m.replace('z_L=',r'z_L=\frac{l-\mu}{\sigma}=',1).replace('z_U=',r'z_U=\frac{u-\mu}{\sigma}=',1) for m in ms]
            if label=='Density, CDF and sketches':
                ms[0]=ms[0].replace('f(x)=',r'f(x)=\frac1{\sigma\sqrt{2\pi}}\exp\!\left[-\frac{(x-\mu)^2}{2\sigma^2}\right]=',1)
                ms[1]=ms[1].replace('F(x)=',r'F(x)=\int_{-\infty}^x f(u)\,du=',1)
            if label=='Partition of the population':
                mu,sd=g['μ'],g['σ'];lo,hi=(85,115) if t=='normalquant' else (g['lower'],g['upper']);zl,zu=(lo-mu)/sd,(hi-mu)/sd;pl,pu=stats.norm.cdf(zl),stats.norm.cdf(zu)
                ms=[r'P(X<l)=P(X<'+n(lo)+r')=\Phi(z_L)=\Phi('+f(zl)+')='+f(pl),r'P(l\le X<u)=P('+n(lo)+r'\le X<'+n(hi)+r')=\Phi(z_U)-\Phi(z_L)=\Phi('+f(zu)+r')-\Phi('+f(zl)+')='+f(pu)+'-'+f(pl)+'='+f(pu-pl),r'P(X\ge u)=P(X\ge '+n(hi)+r')=1-\Phi(z_U)=1-\Phi('+f(zu)+')=1-'+f(pu)+'='+f(1-pu),r'P(X<l)+P(l\le X<u)+P(X\ge u)='+f(pl)+'+'+f(pu-pl)+'+'+f(1-pu)+'=1',r'P(X=\mu)=F(\mu)-F(\mu^-)=0']
        if t=='sampling':
            replacements={r'\operatorname{SD}(\bar X)=\sigma/\sqrt n=':r'\operatorname{SD}(\bar X)=\sigma/\sqrt n='+frac(n(g['σ']),r'\sqrt{'+n(g['n'])+'}')+'=',r'E[\bar X]=4':r'E[\bar X]=\mu=4',r'\operatorname{Var}(\bar X)=1.5^2/50':r'\operatorname{Var}(\bar X)=\sigma^2/n=1.5^2/50',r'\mathrm{SEM}=1.5/\sqrt{50}':r'\mathrm{SEM}=\sigma/\sqrt n=1.5/\sqrt{50}',r'z_L=':r'z_L=\frac{l-\mu}{\sigma/\sqrt n}=',r'z_U=':r'z_U=\frac{u-\mu}{\sigma/\sqrt n}='}
            ms=[replace_once(m,replacements) for m in ms]
            if label=='Right-tail probability for the mean':ms[0]=ms[0].replace('z=',r'z=\frac{\bar x-\mu}{\sigma/\sqrt n}=',1)
            if label=='Non-Normal population with n=50':ms=[m.replace(r'E[\bar X]=',r'E[\bar X]=\mu=',1).replace(r'\operatorname{SD}(\bar X)=',r'\operatorname{SD}(\bar X)=\sigma/\sqrt n=',1) for m in ms]
            if pid=='d-lecture-sampling' and label=='Interval probability':ms=[ms[0].replace('=',r'=\Phi(z_U)-\Phi(z_L)=',1)]
            if mode=='C' and label=='Calculate':ms=[r'\operatorname{SD}(\bar X)=\frac{\sigma}{\sqrt n}=\frac{'+n(g['σ'])+r'}{\sqrt{'+n(g['n'])+'}}='+f(g['σ']/math.sqrt(g['n']))]
        if t=='normalquant' and mode=='C' and label=='Calculate':ms=[r'x_p=\mu+z_p\sigma=100+(1.959964)(15)=129.3995']
        if t=='estimators' and label in ('Calculate','Sample size for SEM=1'):
            if label=='Calculate':ms=[r'\mathrm{SEM}_{\mathrm{new}}=\mathrm{SEM}_{\mathrm{old}}\sqrt{n_{\mathrm{old}}/n_{\mathrm{new}}}=3\sqrt{16/64}=3(1/2)=1.5']
            else:ms=[r'n=\left(\frac{\sigma}{\mathrm{SEM}_{\mathrm{target}}}\right)^2=\left(\frac{12}{1}\right)^2=144']
        if t=='anova' and label=='Find variance of the group means':ms=[ms[0],ms[1].replace('=',r'=\frac{\sum_j(\bar x_j-\bar{\bar x})^2}{m-1}=',1)]
        if t in ('anova','bonferroni','posthoc'):
            if label in ('All-pair family and cutoff','Requested family and adjusted level'):
                if t=='anova':m=g['m'];size=g['n per group'];var=np.mean(np.asarray(ast.literal_eval(g['SDs']))**2);k=m*(m-1)//2
                elif pid=='bonf':m=3;size=5;var=4;k=3
                elif t=='posthoc':m=3;size=g['n'];var=g['within variance'];k=3
                else:k=g['k'];m=k+1;size=12;var=9
                df=m*(size-1)
                family=(r'\frac{m(m-1)}2=\frac{'+n(m)+'('+n(m)+'-1)}2='+n(k)) if (t!='bonferroni' or pid=='bonf') else ('m-1='+n(m)+'-1='+n(k))
                ms=['k='+family,r'\alpha_{\mathrm{pair}}=\frac{\alpha_T}{k}=\frac{.05}{'+n(k)+'}='+f(.05/k),r'\nu=m(n-1)='+n(m)+'('+n(size)+'-1)='+n(df),tcut(df,.05/k,True)]
                if label=='All-pair family and cutoff':ms.append(pairse(var,size))
            if label.startswith('Groups ') or label in ('Low versus Medium','Low versus High','Medium versus High'):
                if t=='anova':means=ast.literal_eval(g['means']);size=g['n per group'];var=np.mean(np.asarray(ast.literal_eval(g['SDs']))**2);i,j={'Low versus Medium':(0,1),'Low versus High':(0,2),'Medium versus High':(1,2)}[label]
                else:
                    if pid=='bonf':means=[10,12,14];size=5;var=4
                    elif t=='posthoc':means=[10,10+g['mean gap'],10+2*g['mean gap']];size=g['n'];var=g['within variance']
                    else:means=list(range(10,11+g['k']));size=12;var=9
                    i,j=[int(z)-1 for z in re.findall(r'\d+',label)]
                se=math.sqrt(2*var/size);ms=[pairt(i+1,j+1,means[i],means[j],se),ms[1]]
            if label=='Compute pair statistics':ms=[pairt(1,3,10,14,math.sqrt(8/5)),pairt(1,2,10,12,math.sqrt(8/5)),pairt(2,3,12,14,math.sqrt(8/5))]
            if label in ('Common pair standard error','Reuse the ANOVA denominator','Reuse the ANOVA variance'):ms=[m.replace(r'\mathrm{SE}_{ij}=',r'\mathrm{SE}_{ij}=\sqrt{s_{\mathrm{wit}}^2(1/n_i+1/n_j)}=',1) for m in ms]
            ms=[m.replace(r'\alpha_{\mathrm{pair}}=\frac{.05}',r'\alpha_{\mathrm{pair}}=\frac{\alpha_T}{k}=\frac{.05}',1) for m in ms]
        if t=='holm':
            if label=='Different requested family':ms=[r'k_{\mathrm{all\ pairs}}=\frac{m(m-1)}2=\frac{4(4-1)}2=6',r'\alpha_{1,\mathrm{all\ pairs}}=\frac{\alpha_T}{k-1+1}=\frac{.05}{6}=0.008333333']
            else:ms=[re.sub(r'(\\alpha_\{[123]\}=)',r'\1\\frac{\\alpha_T}{k-j+1}=',m) for m in ms]
        if t=='binary':
            ms=[m.replace(r'\mathrm{SE}(\hat p)=\sqrt{',r'\mathrm{SE}(\hat p)=\sqrt{\frac{\hat p(1-\hat p)}n}=\sqrt{',1) if r'\mathrm{SE}(\hat p)=\sqrt{\frac{\hat p' not in m else m for m in ms]
            ms=[m.replace(r'\widehat{\operatorname{SD}}(X)=\sqrt{',r'\widehat{\operatorname{SD}}(X)=\sqrt{\hat p(1-\hat p)}=\sqrt{',1) for m in ms]
            if label=='Individual SD versus proportion SE':
                events=g.get('m',g.get('events'));size=g.get('n',g.get('patients'));pr=events/size;se=math.sqrt(pr*(1-pr)/size)
                ms[-1]=r'\mathrm{SE}_{4n}(\hat p)=\frac{\mathrm{SE}_n(\hat p)}2=\frac{'+f(se)+'}2='+f(se/2)
        if t=='zprop':
            if pid=='d-hw2-dioxin':
                ms=[m.replace(r'\hat p=\frac{205}',r'\hat p=\frac{m_1+m_2}{n_1+n_2}=\frac{205}').replace(r'c_Y=\tfrac12(1/186',r'c_Y=\tfrac12(1/n_1+1/n_2)=\tfrac12(1/186').replace('D_Y=|',r'D_Y=\max(0,|\hat p_1-\hat p_2|-c_Y)=|').replace(r'z_{\mathrm{crit}}=1.959964',r'z_{\mathrm{crit}}=\Phi^{-1}(1-\alpha/2)=\Phi^{-1}(.975)=1.959964') for m in ms]
            if label=='Equivalent corrected chi-square comparison':ms=[ms[0],r'\nu=(r-1)(c-1)=(2-1)(2-1)=1',chicut(1)]
            if label=='Relative event risk':ms=[ms[0].replace('=',r'=\frac{\hat p_2}{\hat p_1}=\frac{m_2/n_2}{m_1/n_1}=',1)]
        if t=='chi':
            obs=np.array(ast.literal_eval(g['observed table']),float)
            if label=='Build expected counts':ms=cell_work(obs)[0]
            if label=='Calculate each cell contribution':ms=cell_work(obs)[1]
            if label=='Association after the group comparison':ms=[common(ms[0],t),common(ms[1],t),ms[2].replace('='+f(s['values']['RR']),'='+frac(n(obs[0,0])+'/'+n(obs[0].sum()),n(obs[1,0])+'/'+n(obs[1].sum()))+'='+f(s['values']['RR']))]
            if label=='Risk for no folate compared with folate':
                r1,r2=ms[0].split('=')[0],ms[1].split('=')[0];event1=r1.replace('r_', 'm_',1);event2=r2.replace('r_','m_',1);size1=r1.replace('r_','n_',1);size2=r2.replace('r_','n_',1)
                ms=[ms[0].replace('=','='+frac(event1,size1)+'=',1),ms[1].replace('=','='+frac(event2,size2)+'=',1),ms[2].replace('=','='+frac(r1,r2)+'=',1)]
            if label.startswith('Control versus Group '):
                j=int(label.rsplit(' ',1)[1])-(0 if pid=='d-hw2-mortality' else 1);pair=obs[[0,j]];es,cs=cell_work(pair);ch,pval=stats.chi2_contingency(pair,correction=True)[:2];rank=sorted(range(1,len(obs)),key=lambda z:stats.chi2_contingency(obs[[0,z]],correction=True).pvalue).index(j)+1;alpha=.05/(len(obs)-rank)
                ms=es+cs+[r'\chi_Y^2=\sum_{ij}c_{ij}='+'+'.join(x.rsplit('=',1)[1] for x in cs)+'='+f(ch),r'\nu_{ij}=(r-1)(c-1)=(2-1)(2-1)=1',r'p=P(\chi^2_{\nu_{ij}}>\chi_Y^2)=P(\chi^2_1>'+f(ch)+')='+f(pval),r'\alpha_'+str(rank)+r'=\frac{\alpha_T}{k-j+1}=\frac{.05}{'+n((len(obs)-1)-rank+1)+'}='+f(alpha),chicut(1,alpha).replace(r'\nu',r'\nu_{ij}'),ms[-1]]
        if t=='gof':
            if label=='Multiply target probabilities by total':ms=['E_'+str(i+1)+'=Np_'+str(i+1)+'=470('+n(z)+')='+f(470*z) for i,z in enumerate([.6,.25,.15])]
            if label=='Add and find df':ms=[ms[0].replace('=',r'=\sum_i c_i=',1),ms[1]]
            if label=='Largest departure contribution':ms=[r'c_3=\frac{(O_3-E_3)^2}{E_3}='+ms[0]]
        if t in ('risk','nnt'):
            if label=='Relative event risk' and mode=='D':
                if pid=='risk':rt,rc=.1,.2;counts=[(10,100),(20,100)]
                elif pid=='aspirin-risk':rt,rc=6/19,18/25;counts=[(6,19),(18,25)]
                elif t=='nnt':rt,rc=.08,.03;counts=None
                else:rt,rc=g['treated'],g['control'];counts=None
                risks=[]
                if counts:risks=['r_'+group+'='+frac('m_'+group,'n_'+group)+'='+frac(n(a),n(b))+'='+f(a/b) for group,(a,b) in zip(['T','C'],counts)]
                ms=risks+[ms[0].replace('=',r'=\frac{r_T}{r_C}=',1)]
            if label=='Absolute event-risk change':ms=[ms[0].replace('=',r'=|r_C-r_T|=',1)]
            if label=='Number of people':ms=[ms[0].replace('=',r'=\frac1{\mathrm{ARI}}=',1) if 'NNH' in ms[0] else ms[0].replace('=',r'=\frac1{\mathrm{ARR}}=',1)]
            if mode=='D' and label=='Absolute event-risk change':
                harm=pid=='nnh';ms=[m.replace(r'|\Delta\mathrm{risk}|=',r'\mathrm{ARI}=|\Delta\mathrm{risk}|=' if harm else r'\mathrm{ARR}=|\Delta\mathrm{risk}|=',1) for m in ms]
            if mode=='C' and ms and re.fullmatch(r'\\mathrm\{RR\}=[\d.]+',ms[0]):
                ms=[r'\mathrm{RR}=\frac{r_T}{r_C}=\frac{'+n(g['treated'])+'}{'+n(g['control'])+'}='+ms[0].split('=',1)[1]]
            ms=[m.replace(r'r_T=6/19',r'r_T=\frac{m_T}{n_T}=6/19').replace(r'r_C=18/25',r'r_C=\frac{m_C}{n_C}=18/25').replace(r'r_T=\frac{10}{100}',r'r_T=\frac{m_T}{n_T}=\frac{10}{100}').replace(r'r_C=\frac{20}{100}',r'r_C=\frac{m_C}{n_C}=\frac{20}{100}') for m in ms]
        if t=='odds':
            if label=='Exposure odds in the sampled outcome groups':
                a,b,c,d=(50,14,43,35) if pid=='smoke-odds' else (g[z] for z in ['a','b','c','d']);case='a/b' if pid=='smoke-odds' else 'a/c';ctl='c/d' if pid=='smoke-odds' else 'b/d'
                ms=[ms[0].replace('=','='+case+'=',1),ms[1].replace('=','='+ctl+'=',1),ms[2].replace('=',r'=\frac{\mathrm{odds}_{\mathrm{case}}}{\mathrm{odds}_{\mathrm{control}}}=\frac{ad}{bc}=',1)]
            else:ms=[m.replace(r'\mathrm{odds}_1=',r'\mathrm{odds}_1=a/b=',1).replace(r'\mathrm{odds}_2=',r'\mathrm{odds}_2=c/d=',1) for m in ms]
        # Merge original split equalities into one connected display.
        joined=[]
        for m in ms:
            m=common(m,t)
            if m.startswith('=') and joined:joined[-1]+=m
            else:joined.append(m)
        out.append(joined)
    return out

def replace_once(text,pairs):
    for a,b in pairs.items():text=text.replace(a,b,1)
    return text

if __name__=='__main__':
    from worked_source_equations import source_chains
    pack={'D':{},'C':{}}
    audit=[]
    for pid,q in V['problems'].items():
        pack['D'][pid]=transform(pid,q['flow'],q['flow'],'D')
        nid=N['byOriginal'][pid];pack['D'][nid]=transform(pid,N['questions'][nid]['flow'],q['flow'],'D')
    for pid,flow in OLD['problems'].items():pack['C'][pid]=transform(pid,flow,flow,'C')
    for mode,problems in pack.items():
        for pid,steps in problems.items():
            for i,ms in enumerate(steps):
                for tex in ms:assert not re.search(r'[\x00-\x08\x0b\x0c\x0e-\x1f]',tex),(mode,pid,i)
    source_old=load('studio-question-data.js')
    pack['sources']={mode:{key:source_chains(key,q['html']) for key,q in sources.items()} for mode,sources in [('D',V['sources']),('C',source_old['sources'])]}
    (ROOT/'worked-equation-chain-data.js').write_text('const WORKED_CHAINS='+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
    print('Built',sum(len(pack[mode]) for mode in ['D','C']),'worked examples;',sum(len(ss) for mode in ['D','C'] for ss in pack[mode].values()),'steps with integrated equation chains.')
