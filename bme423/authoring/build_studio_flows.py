"""Author connected formula/substitution/result steps for every live problem.

The canonical bank is read only. Each family is handled explicitly; an unknown
family or a changed step count fails the build instead of receiving a fallback.
"""
from pathlib import Path
import ast,json,math,re
import numpy as np
from scipy import stats

ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads((ROOT/name).read_text().split('=',1)[1].rstrip(';\n'))
D=load('data.js')
def f(v):return format(float(v),'.7g')
def inp(v):return format(float(v),'.12g')
def frac(a,b):return r'\frac{'+str(a)+'}{'+str(b)+'}'
def arr(rows):return r'\begin{array}{'+'c'*len(rows[0])+'}'+r'\\'.join('&'.join(str(x) for x in row) for row in rows)+r'\end{array}'
def step(*tex,text=None):return {'math':list(tex),'text':[] if text is None else [text]}
def say(text):return step(text=text)
def decision(value,cut,null='the population null hypothesis',absolute=False):
    lhs=(r'|'+f(value)+'|='+f(abs(value))) if absolute else f(value)
    reject=abs(value)>cut if absolute else value>cut
    return step(lhs+('>' if reject else r'\le ')+f(cut)+r'\quad\Rightarrow\quad\text{'+('reject' if reject else 'do not reject')+r' }H_0',text=('The data support a departure from '+null+'.') if reject else ('The data do not establish a departure from '+null+'.'))
def flow(p):
    g=p['given'];t=p['topic'];pid=p['id'];out=[];answer=None
    if t=='summary' and 'data' in g:
        x=np.array(ast.literal_eval(g['data']),float);n=len(x);mean=x.mean();dev=x-mean;ss=sum(dev**2);var=ss/(n-1);sd=math.sqrt(var);se=sd/math.sqrt(n)
        out=[step(r'\bar x=\frac{\sum_i x_i}{n}=\frac{'+f(sum(x))+'}{'+str(n)+'}='+f(mean)),
             step(*[f(v)+'-'+f(mean)+'='+f(d) for v,d in zip(x,dev)]),
             step(*['('+f(d)+')^2='+f(d*d) for d in dev]),
             step(r'\sum_i(x_i-\bar x)^2='+'+'.join(f(d*d) for d in dev)+'='+f(ss)),
             step(r's^2=\frac{\sum_i(x_i-\bar x)^2}{n-1}=\frac{'+f(ss)+'}{'+str(n)+'-1}='+f(var)),
             step(r's=\sqrt{s^2}=\sqrt{'+f(var)+'}='+f(sd)),
             step(r'\mathrm{SEM}=\frac{s}{\sqrt n}=\frac{'+f(sd)+r'}{\sqrt{'+str(n)+'}}='+f(se),text='SD describes individual variation; SEM describes uncertainty in the estimated population mean.')];answer=se
    elif pid=='population':
        out=[step(r'\mu=\frac{\sum_i x_i}{N}=\frac{2+4+6}{3}=4'),step(r'(2-4)^2+(4-4)^2+(6-4)^2=4+0+4=8'),step(r'\sigma^2=\frac{\sum_i(x_i-\mu)^2}{N}=\frac83=2.666667'),step(r's^2=\frac8{3-1}=4',text='The divisor 2 would apply to a sample; this question gives the full population, so the population variance uses 3.')];answer=8/3
    elif t=='classification':
        out=[say('A ZIP code identifies a location; its digits do not measure an amount.'),say('Differences between ZIP codes do not represent measured distances or a ranked category scale.'),say('The variable is categorical-nominal. The answer code is 3.')];answer=3
    elif t=='percentile':
        x=[2,4,6,8,10,12,14] if pid=='percentile' else [2,4,6,8,10,12];n=len(x);pct=g['p'];rank=1+pct*(n-1)/100;I=math.floor(rank);d=rank-I;lo=x[I-1];hi=x[I];v=lo+d*(hi-lo)
        out=[step(r'R=1+\frac{p(n-1)}{100}=1+\frac{'+str(pct)+'('+str(n)+'-1)}{100}='+f(rank)),
             step(r'x_{('+str(I)+')}='+str(lo)+r',\quad x_{('+str(I+1)+')}='+str(hi),text='Rank '+f(rank)+' lies '+f(d)+' of the way from observation '+str(I)+' to observation '+str(I+1)+'.'),
             step(r'x_{'+str(pct)+r'}=x_{(I)}+d\bigl(x_{(I+1)}-x_{(I)}\bigr)',r'='+str(lo)+'+'+f(d)+'('+str(hi)+'-'+str(lo)+')='+f(v))];answer=v
    elif pid=='coins':
        out=[step(r'N=2^3=8',text='The eight head/tail sequences are equally likely.'),say('Exactly two heads occurs in HHT, HTH and THH: three favorable sequences.'),step(r'P(\text{exactly two heads})=\frac{\text{favorable sequences}}{\text{all sequences}}=\frac38=.375')];answer=3/8
    elif pid=='cards':
        out=[step(r'P(\text{first king})=\frac4{52}'),step(r'P(\text{second king}\mid\text{first king})=\frac{4-1}{52-1}=\frac3{51}'),step(r'P(\text{two kings})=P(K_1)P(K_2\mid K_1)=\frac4{52}\frac3{51}=.004524887')];answer=4/52*3/51
    elif pid=='pmf':
        out=[step(r'\sum_x f(x)=c+2c+3c=6c'),step(r'6c=1\quad\Rightarrow\quad c=\frac16'),step(r'f(1)=\frac16,\quad f(2)=\frac26,\quad f(3)=\frac36',text='Each probability is nonnegative, and the probabilities add to one.')];answer=1/6
    elif t=='expect':
        x=np.array([0,1,2]);ps=np.array([float(v) for v in g['probabilities'].split(',')]);mean=x@ps;ex2=x**2@ps;var=ex2-mean**2
        out=[step(r'\sum_x f(x)='+'+'.join(inp(z) for z in ps)+'=1',text='All listed probabilities are nonnegative.'),step(r'E[X]=\sum_x x f(x)='+'+'.join(str(a)+'('+inp(b)+')' for a,b in zip(x,ps))+'='+f(mean)),step(r'E[X^2]=\sum_x x^2 f(x)='+'+'.join(str(a)+'^2('+inp(b)+')' for a,b in zip(x,ps))+'='+f(ex2)),step(r'\operatorname{Var}(X)=E[X^2]-(E[X])^2='+f(ex2)+'-('+f(mean)+')^2='+f(var))]
        if pid=='discrete':out.append(say('The mean is '+f(mean)+'; the variance is '+f(var)+'. Squaring the values before weighting gives a different quantity from squaring their mean.'))
        answer=var
    elif pid=='dcdf':
        out=[step(r'F(1.5)=P(X\le1.5)'),say('Only the supported values 0 and 1 are at or below 1.5.'),step(r'F(1.5)=f(0)+f(1)=.2+.5=.7')];answer=.7
    elif pid=='linear':
        out=[step(r'E[2X-3Y]=2E[X]-3E[Y]=2(10)-3(4)=8'),step(r'2^2\operatorname{Var}(X)=4(9)=36',r'(-3)^2\operatorname{Var}(Y)=9(1)=9'),step(r'\operatorname{Var}(2X-3Y)=36+9=45',text='Independence makes the variance contributions add, including the contribution from the subtracted variable.'),step(r'\operatorname{SD}(2X-3Y)=\sqrt{45}=6.708204')];answer=45
    elif t=='ccdf':
        b=2 if pid=='density' else g['upper support'];b2=b*b;med=b/math.sqrt(2);ex=2*b/3;ex2=b*b/2;var=b*b/18
        cdf=r'F(x)=\int_0^x\frac{2u}{'+inp(b2)+r'}\,du=\frac{x^2}{'+inp(b2)+r'}\quad(0\le x\le '+inp(b)+')'
        median=r'F(m)=\frac{m^2}{'+inp(b2)+r'}=\frac12'
        if pid=='density':out=[step(r'\int_0^2\frac{x}{2}\,dx=\left[\frac{x^2}{4}\right]_0^2=1'),step(cdf,text='The complete CDF is zero below 0 and one above 2.'),step(r'P(X<1)=F(1)=\frac{1^2}{4}=.25'),step(r'E[X]=\int_0^2x\frac{x}{2}\,dx=\left[\frac{x^3}{6}\right]_0^2=\frac43'),step(r'E[X^2]=\int_0^2x^2\frac{x}{2}\,dx=\left[\frac{x^4}{8}\right]_0^2=2'),step(r'\operatorname{Var}(X)=E[X^2]-(E[X])^2=2-\left(\frac43\right)^2=\frac29'),step(median,r'm=\frac{2}{\sqrt2}=\sqrt2='+f(med))]
        else:out=[step(cdf),step(median),step(r'm=\frac{'+inp(b)+r'}{\sqrt2}='+f(med)),step(r'E[X]=\frac{2b}{3}=\frac{2('+inp(b)+')}{3}='+f(ex),r'\operatorname{Var}(X)=\frac{b^2}{18}=\frac{'+inp(b2)+'}{18}='+f(var))]
        answer=med
    elif pid=='normalize':
        out=[step(r'1=\int_0^c(0.5+x)\,dx'),step(r'1=\left[0.5x+\frac{x^2}{2}\right]_0^c=0.5c+\frac{c^2}{2}'),step(r'c^2+c-2=0'),step(r'(c+2)(c-1)=0\quad\Rightarrow\quad c=1',text='The positive root is the upper endpoint of the support.')];answer=1
    elif t=='uniform':
        a,b=(g['a'],g['b']) if pid=='uniform' else (float(z) for z in g['support'].split(' to '));lo,hi=(3,5) if pid=='uniform' else (a+1,a+3);pr=(hi-lo)/(b-a)
        out=[step(r'b-a='+inp(b)+'-'+inp(a)+'='+f(b-a)),step(r'u-l='+inp(hi)+'-'+inp(lo)+'='+f(hi-lo)),step(r'P(l<X<u)=\frac{u-l}{b-a}=\frac{'+f(hi-lo)+'}{'+f(b-a)+'}='+f(pr))]
        if pid=='uniform':out.append(step(r'E[X]=\frac{a+b}{2}=\frac{2+8}{2}=5',r'\operatorname{Var}(X)=\frac{(b-a)^2}{12}=\frac{(8-2)^2}{12}=3'))
        answer=pr
    elif t=='normalprob':
        mu,sd,l,u=g['μ'],g['σ'],g['lower'],g['upper'];zl=(l-mu)/sd;zu=(u-mu)/sd;pl=stats.norm.cdf(zl);pu=stats.norm.cdf(zu);pr=pu-pl
        out=[step(r'z_L=\frac{l-\mu}{\sigma}=\frac{'+inp(l)+'-'+inp(mu)+'}{'+inp(sd)+'}='+f(zl)),step(r'z_U=\frac{u-\mu}{\sigma}=\frac{'+inp(u)+'-'+inp(mu)+'}{'+inp(sd)+'}='+f(zu)),step(r'\Phi('+f(zl)+')='+f(pl)+r',\quad\Phi('+f(zu)+')='+f(pu),text='These are the cumulative areas to the left of the two standardized cutoffs.'),step(r'P('+inp(l)+'<X<'+inp(u)+r')=\Phi('+f(zu)+r')-\Phi('+f(zl)+')',r'='+f(pu)+'-'+f(pl)+'='+f(pr)),say('About '+f(100*pr)+'% of individuals have measurements in the requested interval.')];answer=pr
    elif pid=='quantile':
        z=stats.norm.ppf(.975);v=100+15*z
        out=[step(r'\Phi(z_{.975})=.975\quad\Rightarrow\quad z_{.975}='+f(z)),step(r'x_{.975}=\mu+z_{.975}\sigma=100+('+f(z)+')(15)'),step(r'x_{.975}='+f(v)),say('The 97.5th-percentile cutoff exceeds the population mean, as expected for this upper percentile.')];answer=v
    elif t=='sampling' and pid=='sampling':
        out=[step(r'\mathrm{SEM}=\frac{\sigma}{\sqrt n}=\frac{20}{\sqrt{25}}=4'),step(r'z=\frac{\bar x-\mu}{\mathrm{SEM}}=\frac{108-100}{4}=2'),step(r'P(\bar X>108)=1-\Phi(2)=1-.9772499=.02275013'),say('The denominator is 4 for sample means. The individual-measurement SD is 20.')];answer=stats.norm.sf(2)
    elif t=='sampling':
        se=g['σ']/math.sqrt(g['n'])
        out=[say('The random quantity is the sample mean, so its spread uses the population SD divided by the square root of the sample size.'),step(r'\operatorname{SD}(\bar X)=\frac{\sigma}{\sqrt n}=\frac{'+inp(g['σ'])+r'}{\sqrt{'+inp(g['n'])+'}}'),step(r'\operatorname{SD}(\bar X)='+f(se))];answer=se
    elif pid=='sem':
        out=[step(r'\frac{n_{\mathrm{new}}}{n_{\mathrm{old}}}=\frac{64}{16}=4'),step(r'\mathrm{SEM}_{\mathrm{new}}=\mathrm{SEM}_{\mathrm{old}}\sqrt{\frac{n_{\mathrm{old}}}{n_{\mathrm{new}}}}=3\sqrt{\frac{16}{64}}'),step(r'\mathrm{SEM}_{\mathrm{new}}=3(1/2)=1.5')];answer=1.5
    elif t=='anova':
        means=np.array(ast.literal_eval(g['means']),float);sds=np.array(ast.literal_eval(g['SDs']),float);n=g['n per group'];m=len(means);wit=np.mean(sds**2);grand=means.mean();ss=sum((means-grand)**2);mv=ss/(m-1);bet=n*mv;F=bet/wit;df1=m-1;df2=m*(n-1);cut=stats.f.isf(.05,df1,df2)
        out=[step(r'H_0:\mu_1=\cdots=\mu_{'+str(m)+'}'),step(r's_{\mathrm{wit}}^2=\frac{\sum_j s_j^2}{m}',r'=\frac{'+'+'.join(inp(z)+'^2' for z in sds)+'}{'+str(m)+'}='+f(wit)),step(r'\bar{\bar x}=\frac{\sum_j\bar x_j}{m}=\frac{'+'+'.join(inp(z) for z in means)+'}{'+str(m)+'}='+f(grand)),step(r'\sum_j(\bar x_j-\bar{\bar x})^2='+'+'.join('('+inp(z)+'-'+f(grand)+')^2' for z in means)+'='+f(ss),r's_{\bar x}^2=\frac{'+f(ss)+'}{'+str(m)+'-1}='+f(mv)),step(r's_{\mathrm{bet}}^2=n s_{\bar x}^2='+str(n)+'('+f(mv)+')='+f(bet)),step(r'F=\frac{s_{\mathrm{bet}}^2}{s_{\mathrm{wit}}^2}=\frac{'+f(bet)+'}{'+f(wit)+'}='+f(F)),step(r'\nu_1=m-1='+str(m)+'-1='+str(df1),r'\nu_2=m(n-1)='+str(m)+'('+str(n)+'-1)='+str(df2),r'F_{\mathrm{crit}}(.05;'+str(df1)+','+str(df2)+')='+f(cut),r'p=P(F_{'+str(df1)+','+str(df2)+'}>'+f(F)+')='+f(stats.f.sf(F,df1,df2))),decision(F,cut,'equal population means')];answer=F
    elif t=='onet':
        mean,sd,n,ref=g['mean'],g['s'],g['n'],g['μ0'];se=sd/math.sqrt(n);gap=mean-ref;tv=gap/se;df=n-1;cut=stats.t.isf(.025,df)
        out=[step(r'H_0:\mu=\mu_0='+inp(ref)),step(r'\mathrm{SEM}=\frac{s}{\sqrt n}=\frac{'+inp(sd)+r'}{\sqrt{'+str(n)+'}}='+f(se)),step(r'\Delta=\bar x-\mu_0='+inp(mean)+'-'+inp(ref)+'='+f(gap)),step(r't=\frac{\bar x-\mu_0}{s/\sqrt n}=\frac{'+f(gap)+'}{'+f(se)+'}='+f(tv)),step(r'\nu=n-1='+str(n)+'-1='+str(df),r't_{\mathrm{crit}}(.05;'+str(df)+')='+f(cut),r'p=2P(T_{'+str(df)+'}>'+f(abs(tv))+')='+f(2*stats.t.sf(abs(tv),df))),decision(tv,cut,'a population mean of '+inp(ref),True)];answer=tv
    elif t=='pooledt':
        n1,m1,s1=map(float,g['group 1'].split(','));n2,m2,s2=map(float,g['group 2'].split(','));df=int(n1+n2-2);pool=((n1-1)*s1*s1+(n2-1)*s2*s2)/df;se=math.sqrt(pool*(1/n1+1/n2));tv=(m1-m2)/se;cut=stats.t.isf(.025,df)
        out=[step(r'H_0:\mu_{\mathrm{control}}=\mu_{\mathrm{intervention}}'),step(r's_1^2='+inp(s1)+'^2='+f(s1*s1)+r',\quad s_2^2='+inp(s2)+'^2='+f(s2*s2)),step(r's_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}',r'=\frac{('+inp(n1)+'-1)('+f(s1*s1)+')+('+inp(n2)+'-1)('+f(s2*s2)+')}{'+inp(n1)+'+'+inp(n2)+'-2}='+f(pool)),step(r'\mathrm{SE}_{\Delta}=\sqrt{s_p^2(1/n_1+1/n_2)}',r'=\sqrt{'+f(pool)+'(1/'+inp(n1)+'+1/'+inp(n2)+')}='+f(se)),step(r't=\frac{\bar x_1-\bar x_2}{\mathrm{SE}_{\Delta}}=\frac{'+inp(m1)+'-'+inp(m2)+'}{'+f(se)+'}='+f(tv)),step(r'\nu=n_1+n_2-2='+inp(n1)+'+'+inp(n2)+'-2='+str(df),r't_{\mathrm{crit}}(.05;'+str(df)+')='+f(cut),r'p=2P(T_{'+str(df)+'}>'+f(abs(tv))+')='+f(2*stats.t.sf(abs(tv),df))),decision(tv,cut,'equal population means',True)];answer=tv
    elif t=='posthoc':
        var,n,gap=g['within variance'],g['n'],g['mean gap'];se=math.sqrt(2*var/n);tv=gap/se
        out=[step(r'\mathrm{SE}_{ij}=\sqrt{2s_{\mathrm{wit}}^2/n}=\sqrt{2('+inp(var)+')/'+inp(n)+'}='+f(se)),step(r'|t_{ij}|=\frac{|\bar x_i-\bar x_j|}{\mathrm{SE}_{ij}}=\frac{'+inp(gap)+'}{'+f(se)+'}='+f(tv)),say('Retain the original ANOVA within variance and residual degrees of freedom for the requested pair comparison.')];answer=tv
    elif t=='bonferroni' and pid!='bonf':
        k=g['k'];a=.05/k
        out=[step(r'k='+str(k)),step(r'\alpha_{\mathrm{pair}}=\frac{\alpha_T}{k}=\frac{.05}{'+str(k)+'}='+f(a)),step(r'\alpha_{\mathrm{tail}}=\frac{\alpha_{\mathrm{pair}}}{2}=\frac{'+f(a)+'}{2}='+f(a/2),text='Use the full per-comparison level in the supplied two-tailed t table.')];answer=a
    elif pid=='bonf':
        se=math.sqrt(8/5);tv=4/se;cut=stats.t.isf(.05/6,12)
        out=[step(r'k=\frac{m(m-1)}2=\frac{3(3-1)}2=3',r'\alpha_{\mathrm{pair}}=\frac{.05}{3}=.01666667'),step(r'\mathrm{SE}_{ij}=\sqrt{2s_{\mathrm{wit}}^2/n}=\sqrt{2(4)/5}='+f(se)),step(r'|t_{13}|=\frac{|10-14|}{'+f(se)+'}='+f(tv),r'|t_{12}|=|t_{23}|=\frac2{'+f(se)+'}='+f(2/se)),step(r'\nu=m(n-1)=3(5-1)=12',r't_{\mathrm{crit}}(.01666667;12)='+f(cut)),step(f(tv)+'>'+f(cut)+r',\quad '+f(2/se)+'<'+f(cut),text='Only the lowest- versus highest-mean pair passes the Bonferroni-adjusted comparison.')];answer=tv
    elif t=='holm':
        ps=[.008,.020,.040] if pid=='holm' else [.010,.030,.040];k=3;passed=0;fail=False;tests=[]
        for i,pv in enumerate(ps):
            a=.05/(k-i);reject=not fail and pv<a
            if reject:passed+=1
            else:fail=True
            tests.append(step(r'p_{'+str(i+1)+'}='+inp(pv)+(' < ' if pv<a else ' > ')+r'\alpha_{'+str(i+1)+r'}=\frac{.05}{'+str(k-i)+'}='+f(a),text='Reject this comparison and continue.' if reject else 'Do not reject this comparison; stop the Holm procedure.'))
        if pid=='holm':out=[step(r'p_A=.008<p_B=.020<p_C=.040'),*tests,say('All three comparisons are rejected. The numerical answer is 3.')]
        else:out=[tests[0],tests[1],say('Comparison C is not rejected after the failure at B. Holm does not restart at C, even though its unadjusted p value is below .05. One null hypothesis is rejected.')]
        answer=passed
    elif t=='binary':
        events=g.get('m',g.get('events'));n=g.get('n',g.get('patients'));pr=events/n;var=pr*(1-pr);se=math.sqrt(var/n)
        out=[step(r'\hat p=\frac mn=\frac{'+str(events)+'}{'+str(n)+'}='+f(pr)),step(r'\widehat{\operatorname{Var}}(X)=\hat p(1-\hat p)',r'=\frac{'+str(events)+'}{'+str(n)+r'}\frac{'+str(n-events)+'}{'+str(n)+'}='+f(var))]
        if pid=='proportion':out.extend([step(r'\widehat{\operatorname{Var}}(\hat p)=\frac{\hat p(1-\hat p)}n=\frac{'+f(var)+'}{'+str(n)+'}='+f(var/n)),step(r'\mathrm{SE}(\hat p)=\sqrt{'+f(var/n)+'}='+f(se))])
        else:out.extend([step(r'\widehat{\operatorname{SD}}(X)=\sqrt{'+f(var)+'}='+f(math.sqrt(var))),step(r'\mathrm{SE}(\hat p)=\sqrt{\frac{\hat p(1-\hat p)}n}=\sqrt{\frac{'+f(var)+'}{'+str(n)+'}}='+f(se))])
        answer=se
    elif t=='zprop':
        a,n1=map(int,g['m1/n1'].split('/'));b,n2=map(int,g['m2/n2'].split('/'));p1=a/n1;p2=b/n2;pool=(a+b)/(n1+n2);se=math.sqrt(pool*(1-pool)*(1/n1+1/n2));cy=.5*(1/n1+1/n2);gap=max(0,abs(p1-p2)-cy);z=gap/se;cut=stats.norm.isf(.025)
        out=[step(r'H_0:p_1=p_2'),step(r'\hat p_1=\frac{'+str(a)+'}{'+str(n1)+'}='+f(p1)+r',\quad\hat p_2=\frac{'+str(b)+'}{'+str(n2)+'}='+f(p2)),step(r'\hat p_0=\frac{m_1+m_2}{n_1+n_2}=\frac{'+str(a)+'+'+str(b)+'}{'+str(n1)+'+'+str(n2)+'}='+f(pool)),step(r'\mathrm{SE}_0=\sqrt{\hat p_0(1-\hat p_0)(1/n_1+1/n_2)}',r'=\sqrt{'+f(pool)+'('+f(1-pool)+')(1/'+str(n1)+'+1/'+str(n2)+')}='+f(se)),step(r'c_Y=\tfrac12(1/n_1+1/n_2)=\tfrac12(1/'+str(n1)+'+1/'+str(n2)+')='+f(cy),r'D_Y=\max(0,|\hat p_1-\hat p_2|-c_Y)',r'=\max(0,|'+f(p1)+'-'+f(p2)+'|-'+f(cy)+')='+f(gap)),step(r'|z_Y|=\frac{D_Y}{\mathrm{SE}_0}=\frac{'+f(gap)+'}{'+f(se)+'}='+f(z),r'z_{\mathrm{crit}}(.05)='+f(cut)),decision(z,cut,'equal population event proportions')];answer=z
    elif t=='chi':
        obs=np.array(ast.literal_eval(g['observed table']),float);rows,cols=obs.shape;tot=obs.sum();rs=obs.sum(axis=1);cs=obs.sum(axis=0);exp=np.outer(rs,cs)/tot;corrected=rows==cols==2;gap=np.maximum(0,abs(obs-exp)-.5) if corrected else obs-exp;contrib=gap**2/exp;chi=contrib.sum();df=(rows-1)*(cols-1);cut=stats.chi2.isf(.05,df)
        exrows=[[r'E_{'+str(i+1)+str(j+1)+r'}=\frac{'+f(rs[i])+'('+f(cs[j])+')}{'+f(tot)+'}='+f(exp[i,j]) for j in range(cols)] for i in range(rows)]
        formula=r'c_{ij}=\frac{\max(0,|O_{ij}-E_{ij}|-.5)^2}{E_{ij}}' if corrected else r'c_{ij}=\frac{(O_{ij}-E_{ij})^2}{E_{ij}}'
        first=r'c_{11}=\frac{'+(r'\max(0,|'+f(obs[0,0])+'-'+f(exp[0,0])+r'|-.5)^2' if corrected else '('+f(obs[0,0])+'-'+f(exp[0,0])+')^2')+'}{'+f(exp[0,0])+'}='+f(contrib[0,0])
        out=[step(r'H_0:\text{population outcome distributions are equal}'),step(r'E_{ij}=\frac{R_iC_j}{N}',*[z for row in exrows for z in row]),step(formula,first,r'(c_{ij})='+r'\begin{pmatrix}'+r'\\'.join('&'.join(f(v) for v in row) for row in contrib)+r'\end{pmatrix}'),step(r'\chi^2=\sum_{ij}c_{ij}='+'+'.join(f(v) for v in contrib.flat)+'='+f(chi)),step(r'\nu=(r-1)(c-1)=('+str(rows)+'-1)('+str(cols)+'-1)='+str(df),r'\chi^2_{\mathrm{crit}}(.05;'+str(df)+')='+f(cut),r'p=P(\chi^2_{'+str(df)+'}>'+f(chi)+')='+f(stats.chi2.sf(chi,df))),decision(chi,cut,'equal population outcome distributions')];answer=chi
    elif t=='gof':
        obs=np.array([255,125,90]);targets=np.array([.60,.25,.15]);exp=470*targets;con=(obs-exp)**2/exp;chi=sum(con);cut=stats.chi2.isf(.05,2)
        out=[step(r'H_0:(p_1,p_2,p_3)=(.60,.25,.15)'),step(r'E_i=Np_i:\quad E=(470(.60),470(.25),470(.15))',r'=(282,117.5,70.5)'),step(r'\chi^2=\sum_i\frac{(O_i-E_i)^2}{E_i}',*[r'c_'+str(i+1)+r'=\frac{('+str(obs[i])+'-'+f(exp[i])+')^2}{'+f(exp[i])+'}='+f(con[i]) for i in range(3)]),step(r'\chi^2='+'+'.join(f(v) for v in con)+'='+f(chi),r'\nu=k-1=3-1=2'),step(r'\chi^2_{\mathrm{crit}}(.05;2)='+f(cut),f(chi)+'>'+f(cut)),say('Reject the proposed population category proportions at .05; the observed distribution differs from the specified target pattern.')];answer=chi
    elif t=='risk':
        if pid in ['risk','aspirin-risk']:rt,rc=(.1,.2) if pid=='risk' else (6/19,18/25);rr=rt/rc;arr=rc-rt;nnt=1/arr
        else:rt,rc=g['treated'],g['control'];rr=rt/rc;arr=rc-rt;nnt=1/arr
        if pid=='risk':out=[step(r'r_T=\frac{10}{100}=.1,\quad r_C=\frac{20}{100}=.2'),step(r'\mathrm{RR}=r_T/r_C=.1/.2=.5'),step(r'\mathrm{ARR}=r_C-r_T=.2-.1=.1'),step(r'\mathrm{NNT}=1/\mathrm{ARR}=1/.1=10'),say('Treating 10 people is associated with one additional avoided adverse event compared with control.')];answer=nnt
        elif pid=='aspirin-risk':out=[step(r'r_T=6/19='+f(rt)+r',\quad r_C=18/25='+f(rc)),step(r'\mathrm{RR}=r_T/r_C=\frac{6/19}{18/25}='+f(rr)),step(r'\mathrm{ARR}=r_C-r_T=18/25-6/19='+f(arr)),step(r'\mathrm{NNT}=1/\mathrm{ARR}=1/'+f(arr)+'='+f(nnt)),say('The requested ratio before whole-person rounding is '+f(nnt)+'. A whole-person NNT rounds upward to 3.')];answer=nnt
        else:out=[step(r'\mathrm{RR}=\frac{r_T}{r_C}=\frac{'+inp(rt)+'}{'+inp(rc)+'}'),step(r'\mathrm{RR}='+f(rr)),step(r'\mathrm{ARR}=r_C-r_T='+inp(rc)+'-'+inp(rt)+'='+f(arr),r'\mathrm{NNT}=1/\mathrm{ARR}=1/'+f(arr)+'='+f(nnt))];answer=rr
    elif pid=='nnh':
        out=[step(r'\mathrm{ARI}=r_E-r_C=.08-.03=.05'),step(r'\mathrm{NNH}=1/\mathrm{ARI}=1/.05=20'),say('One additional adverse event is associated with exposure for every 20 people, compared with the unexposed group.')];answer=20
    elif t=='odds':
        a,b,c,d=(50,14,43,35) if pid=='smoke-odds' else (g[x] for x in ['a','b','c','d']);v=a*d/(b*c)
        if pid.startswith('odds-'):out=[step(r'ad='+inp(a)+'('+inp(d)+')='+f(a*d)),step(r'bc='+inp(b)+'('+inp(c)+')='+f(b*c)),step(r'\mathrm{OR}=\frac{ad}{bc}=\frac{'+f(a*d)+'}{'+f(b*c)+'}='+f(v))]
        else:out=[step(r'\mathrm{odds}_1=\frac{'+inp(a)+'}{'+inp(b)+r'},\quad\mathrm{odds}_2=\frac{'+inp(c)+'}{'+inp(d)+'}'),step(r'\mathrm{OR}=\frac{a/b}{c/d}=\frac{'+inp(a)+'/'+inp(b)+'}{'+inp(c)+'/'+inp(d)+'}'),step(r'\mathrm{OR}=\frac{ad}{bc}=\frac{'+inp(a)+'('+inp(d)+')}{'+inp(b)+'('+inp(c)+')}='+f(v)),say('The requested odds in the first group are '+f(v)+' times the reference group’s odds.')]
        answer=v
    elif pid=='trial':out=[say('Random assignment determines which treatment a participant receives.'),say('Masking keeps participants unaware of their treatment assignment.'),say('The requested procedure is masking; its answer code is 2.')];answer=2
    elif pid=='rout':out=[say('The supplied result is a pooled Student two-sample t test of equal population means.'),step(r'p=.0223<\alpha=.05\quad\Rightarrow\quad\text{reject }H_0'),say('The supplied test supports a difference between the two population means. The numerical decision code is 1.')];answer=1
    else:raise ValueError((pid,t,'unhandled problem'))
    assert len(out)==len(p['steps']),(pid,len(out),len(p['steps']))
    assert math.isclose(answer,p['answer'],rel_tol=1e-10,abs_tol=1e-10),(pid,answer,p['answer'])
    for i,s in enumerate(out):s['label']=p['steps'][i]['label'];s['origin']=i
    return out

if __name__=='__main__':
    flows={p['id']:flow(p) for p in D['problems']}
    (ROOT/'studio-flow-data.js').write_text('const STUDIO_FLOWS='+json.dumps({'problems':flows},ensure_ascii=False,separators=(',',':'))+';\n')
    print('Integrated',len(flows),'problems;',sum(map(len,flows.values())),'individually assigned steps. Canonical answers agree.')
