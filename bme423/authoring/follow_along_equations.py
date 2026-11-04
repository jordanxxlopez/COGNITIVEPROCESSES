"""Reviewed equation-before-substitution additions for the Version 3 print pack.

Anchors refer to original display-math positions after the V3 compact overrides.
All original prose, equations, examples and topic assignments are preserved.
"""
import hashlib,re

# Compact source-equivalent formulas, using the symbols already in each block.
# The second entry links to the existing, reviewed website equation rules.
FORMULAS={
 'deviations':(r'd_i=x_i-\bar x,\qquad d_i^2=(x_i-\bar x)^2',['deviation','squares']),
 'samplevar':(r's^2=\frac{\sum_i(x_i-\bar x)^2}{n-1}',['samplevar']),
 'sd':(r's=\sqrt{s^2}',['sd']),
 'pmf':(r'f(x)\ge0,\qquad\sum_x f(x)=1',['validpmf']),
 'ex':(r'\mu=E[X]=\sum_x x f(x)',['ex']),
 'ex2':(r'E[X^2]=\sum_x x^2 f(x)',['ex2']),
 'var':(r'\operatorname{Var}(X)=E[X^2]-(E[X])^2',['var']),
 'dcdf':(r'F(t)=P(X\le t)=\sum_{x\le t}f(x)',['dcdf']),
 'directvar':(r'E[(X-\mu)^2]=\sum_x(x-\mu)^2f(x)',['directvar']),
 'dinterval':(r'P(a\le X<b)=F(b^-)-F(a^-)',['dcdf','interval']),
 'dright':(r'P(X>a)=1-F(a)',['dcdf','tails']),
 'dinclusive':(r'P(X\ge a)=1-F(a^-)',['dcdf','tails']),
 'equally':(r'P(A)=\frac{\text{favorable equally likely outcomes}}{\text{all equally likely outcomes}}',['count']),
 'conditional':(r'P(A\cap B)=P(A)P(B\mid A)',['conditional']),
 'area':(r'\int_a^b f(x)\,dx=1',['area']),
 'powerint':(r'\int x^k\,dx=\frac{x^{k+1}}{k+1}+C\quad(k\ne-1)',['powerint']),
 'ccdf':(r'F(t)=\int_a^t f(u)\,du\quad(a\le t\le b)',['ccdf']),
 'cright':(r'P(X>t)=1-F(t)',['tails']),
 'cleft':(r'P(X<t)=F(t)\quad\text{(continuous)}',['ccdf','point']),
 'cinterval':(r'P(a<X<b)=F(b)-F(a)',['interval']),
 'cex':(r'\mu=E[X]=\int_a^b x f(x)\,dx',['cex']),
 'cex2':(r'E[X^2]=\int_a^b x^2 f(x)\,dx',['cex2']),
 'median':(r'F(q)=\frac12',['medianarea']),
 'pieces':(r'F(x)=\int_a^s f_1(u)\,du+\int_s^x f_2(u)\,du',['piececdf']),
 'quadratic':(r'Ac^2+Bc+D=0:\quad c=\frac{-B\pm\sqrt{B^2-4AD}}{2A}',['quadratic']),
 'linearmean':(r'E[aX+b]=aE[X]+b',['linearmean']),
 'shift':(r'E[X+c]=\mu+c,\qquad SD(X+c)=\sigma',['shiftmean','linearvar']),
 'symmetry':(r'\Phi(-z)=1-\Phi(z)',['phi']),
 'normalinterval':(r'P(l<X<u)=\Phi(z_u)-\Phi(z_l)',['normalinterval']),
 'normalright':(r'P(X\ge u)=1-\Phi(z_u)',['normalright']),
 'zquant':(r'\Phi(z_p)=p\quad\Longrightarrow\quad z_p=\Phi^{-1}(p)',['zquant']),
 'rleft':(r'P(X\le x)=\Phi\!\left(\frac{x-\mu}{\sigma}\right)',['z','phi']),
 'quantile':(r'x_p=\mu+z_p\sigma',['quantile']),
 'meanse':(r'\mathrm{SEM}=\frac{\sigma}{\sqrt n}',['meanse']),
 'meanz':(r'z=\frac{\bar x-\mu}{\sigma/\sqrt n}',['meanz']),
 'tnull':(r'H_0:\mu=\mu_0,\qquad H_1:\mu\ne\mu_0',['onull']),
 'tcritical':(r'|t|>t_{\mathrm{crit}}\ \Rightarrow\ \text{reject }H_0',['tdecision','tlookup']),
 'within':(r's_{\mathrm{wit}}^2=\frac{\sum_{i=1}^m s_i^2}{m}',['within']),
 'grand':(r'\bar{\bar x}=\frac{\sum_{i=1}^m\bar x_i}{m}',['grand']),
 'meandeviation':(r'd_i=\bar x_i-\bar{\bar x}',['meansvar']),
 'meansvar':(r's_{\bar x}^2=\frac{\sum_i(\bar x_i-\bar{\bar x})^2}{m-1}',['meansvar']),
 'fcritical':(r'F>F_{\mathrm{crit}}\ \Rightarrow\ \text{reject }H_0',['fdecision','flookup']),
 'outputf':(r'F=\frac{\mathrm{MS}_{\mathrm{Group}}}{\mathrm{MS}_{\mathrm{Residual}}}',['outf']),
 'pairse':(r'\mathrm{SE}_{ij}=\sqrt{\frac{2s_{\mathrm{wit}}^2}{n}}\quad(n_i=n_j=n)',['pairse']),
 'pairt':(r'|t_{ij}|=\frac{|\bar x_i-\bar x_j|}{\mathrm{SE}_{ij}}',['pairt']),
 'bonfcritical':(r'P(T_\nu>t_{\mathrm{crit}})=\frac{\alpha_T}{2k}',['bonftail']),
 'binarysd':(r'\widehat{\mathrm{SD}}(X)=\sqrt{\hat p(1-\hat p)}',['binarysd']),
 'prop':(r'\hat p_i=\frac{e_i}{n_i}',['prop']),
 'yatesgap':(r'D_Y=\max(0,|\hat p_1-\hat p_2|-c_Y)',['yatesgap']),
 'zcritical':(r'|z|>z_{\mathrm{crit}}\ \Rightarrow\ \text{reject }H_0',['zdecision','zlookup']),
 'yatescell':(r'c_{ij}=\frac{\max(0,|O_{ij}-E_{ij}|-.5)^2}{E_{ij}}',['yatescell']),
 'chidf':(r'\nu=(r-1)(c-1)',['chidf']),
 'expected':(r'E_{ij}=\frac{R_iC_j}{N}',['expected']),
 'chicell':(r'c_{ij}=\frac{(O_{ij}-E_{ij})^2}{E_{ij}}',['chicell']),
 'gofexpected':(r'E_i=Np_{i,0}',['gofexpected']),
 'gof':(r'\chi^2=\sum_{i=1}^k\frac{(O_i-E_i)^2}{E_i}',['gof']),
 'holm':(r'\alpha_j=\frac{\alpha_T}{k-j+1}',['holm']),
 'risks':(r'r_T=\frac{e_T}{n_T},\qquad r_C=\frac{e_C}{n_C}',['risks']),
 'odds':(r'\operatorname{odds}_1=\frac ab,\qquad\operatorname{odds}_0=\frac cd',['odds']),
 'or':(r'\mathrm{OR}=\frac{a/b}{c/d}=\frac{ad}{bc}',['or']),
 'rr':(r'\mathrm{RR}=\frac{r_T}{r_C}',['rr']),
 'rrr':(r'\mathrm{RRR}=1-\mathrm{RR}',['rrr']),
 'arr':(r'\mathrm{ARR}=r_C-r_T',['arr']),
 'nnt':(r'\mathrm{NNT}=\frac1{\mathrm{ARR}}',['nnt']),
 'benefitharm':(r'\text{additional harms per benefit}=\frac{\mathrm{NNT}}{\mathrm{NNH}}',['benefitharm']),
 'f':(r'F=\frac{s_{\mathrm{bet}}^2}{s_{\mathrm{wit}}^2}',['f']),
}

# Existing formulas already accompany percentile ranks/interpolation, pooled t,
# its SE, one-sample t, ANOVA F/df, pair-level alpha, most risk measures, Uniform
# widths, and Normal density/CDF definitions. Retain those without duplicating.
PLACEMENTS={
 'raw':{1:['deviations'],3:['samplevar'],4:['sd']},
 'discrete':{0:['pmf'],1:['ex'],2:['ex2'],3:['var'],5:['dcdf']},
 'direct-variance':{0:['directvar']},
 'endpoints':{0:['dinterval'],1:['dright'],2:['dinclusive']},
 'independence':{0:['equally'],1:['conditional']},
 'continuous':{0:['area','powerint'],1:['ccdf'],3:['cleft'],4:['cright'],5:['cex'],6:['cex2'],7:['var'],8:['median']},
 'piecewise':{1:['pieces']},
 'endpoint':{0:['area'],2:['quadratic'],3:['ccdf'],4:['cright'],5:['cinterval']},
 'function':{0:['cex'],3:['linearmean']},
 'uniform':{3:['cex'],4:['cex2'],5:['var']},
 'linear':{0:['shift']},
 'normal':{3:['symmetry'],4:['normalinterval'],5:['normalright']},
 'quantile':{0:['zquant']},
 'r-probability':{0:['rleft'],1:['quantile']},
 'sampling':{0:['meanse'],1:['meanz'],3:['normalinterval']},
 'one-t':{0:['tnull'],5:['tcritical']},
 'two-t':{8:['tcritical']},
 'anova':{1:['within'],3:['grand'],4:['meandeviation'],7:['meansvar'],11:['fcritical']},
 'anova-output':{0:['outputf']},
 'bonferroni':{0:['pairse'],1:['pairt'],5:['bonfcritical']},
 'binary':{2:['binarysd']},
 'z':{1:['prop'],7:['yatesgap'],9:['zcritical']},
 'chi2':{3:['yatescell'],6:['chidf']},
 'large':{0:['expected'],2:['chicell']},
 'gof':{0:['gofexpected'],1:['gof']},
 'chi-holm':{0:['holm']},
 'risk':{0:['risks']},
 'odds':{0:['odds'],1:['or']},
 'nnh':{0:['rr'],1:['rrr'],2:['arr'],3:['nnt'],5:['benefitharm']},
 'anova-no':{0:['f'],1:['fcritical']},
}

# Every original block reviewed, including prose-only guidance and formulas that
# already precede their examples. A new block requires an explicit review entry.
REVIEWED={
 'choose','notation','raw','percentile','plots','discrete','direct-variance',
 'endpoints','independence','continuous','piecewise','endpoint','function',
 'uniform','linear','normal','quantile','normal-definition','r-probability',
 'sampling','sampling-rules','ti-probability','one-t','two-t','t-output',
 'anova','anova-output','assumptions','posthoc','bonferroni','holm','t-table',
 'binary','z','chi2','large','gof','chi-holm','risk','odds','nnh','trials',
 'ti-tests','anova-no'
}

def add_equations(blocks):
    assert set(blocks)==REVIEWED,('Unreviewed print block',set(blocks)^REVIEWED)
    report=[]
    for key,block in blocks.items():
        original=block['html']
        expressions=re.findall(r'\\\[([\s\S]*?)\\\]',original)
        positions=PLACEMENTS.get(key,{})
        assert all(0<=i<len(expressions) for i in positions),(key,'invalid anchor')
        index=-1
        def insert(match):
            nonlocal index
            index+=1
            ids=positions.get(index,[])
            prefix=''
            for rule in ids:
                tex=FORMULAS[rule][0]
                prefix+=f'<div class="sheet-formula" data-sheet-formula="{key}:{index}:{rule}">'+r'\['+tex+r'\]</div>'
            return prefix+match.group(0)
        block['html']=re.sub(r'\\\[([\s\S]*?)\\\]',insert,original)
        # All original display expressions and prose survive in their old order.
        clean=re.sub(r'<div class="sheet-formula"[^>]*>[\s\S]*?</div>','',block['html'])
        assert clean==original,key
        report.append(dict(block=key,originalSHA256=hashlib.sha256(original.encode()).hexdigest(),
                           originalExpressions=len(expressions),
                           additions=[dict(before=i,formula=rule,tex=FORMULAS[rule][0],sourceRules=FORMULAS[rule][1]) for i,ids in positions.items() for rule in ids],
                           status='equations inserted before substitutions' if positions else 'existing formulas or conceptual guidance retained'))
    return report
