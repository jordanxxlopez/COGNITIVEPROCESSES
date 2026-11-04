"""Equation-chain additions inside existing lecture Apply-it solutions only."""
import re
from build_worked_equation_chains import cell_work

def source_chains(key,html):
    pairs=[]
    if key=='describe':
        pairs=[(r'\bar x=\frac{645}',r'\bar x=\frac{\sum_i x_i}{n}=\frac{645}'),(r's^2=\frac{82.5}',r's^2=\frac{\sum_i(x_i-\bar x)^2}{n-1}=\frac{82.5}'),(r's=\sqrt{9.1667}',r's=\sqrt{s^2}=\sqrt{9.1667}'),(r'\mathrm{SEM}=\frac{3.0277}',r'\mathrm{SEM}=\frac{s}{\sqrt n}=\frac{3.0277}'),(r'\operatorname{median}=(64+65)/2',r'\operatorname{median}=\frac{x_{(n/2)}+x_{(n/2+1)}}2=(64+65)/2'),(r'\operatorname{range}=69-59',r'\operatorname{range}=x_{\max}-x_{\min}=69-59'),(r'R=1+75(10-1)/100',r'R=1+\frac{p(n-1)}{100}=1+75(10-1)/100'),(r'x_{75}=65+.75(67-65)',r'x_{75}=x_{(I)}+d(x_{(I+1)}-x_{(I)})=65+.75(67-65)'),(r'\mathrm{SEM}_{40}=\mathrm{SEM}_{10}/2',r'\mathrm{SEM}_{40}=\mathrm{SEM}_{10}\sqrt{n_{10}/n_{40}}=\mathrm{SEM}_{10}\sqrt{10/40}=\mathrm{SEM}_{10}/2')]
    elif key=='percent':
        pairs=[(r'x_{.75}=x_{(7)}+.75',r'x_{.75}=x_{(I)}+d(x_{(I+1)}-x_{(I)})=x_{(7)}+.75'),(r'Q_1=69',r'R_{25}=1+\frac{p(n-1)}{100}=1+\frac{25(10-1)}{100}=3.25\\Q_1=x_{(I)}+d(x_{(I+1)}-x_{(I)})=69+.25(69-69)=69'),(r'\mathrm{IQR}=71-69',r'\mathrm{IQR}=Q_3-Q_1=71-69')]
    elif key=='discrete':
        pairs=[(r'E[X]=-.55',r'E[X]=\sum_x xf(x)=-.55'),(r'E[X^2]=.55',r'E[X^2]=\sum_x x^2f(x)=.55'),(r'\operatorname{Var}(X)=11.85',r'\operatorname{Var}(X)=E[X^2]-(E[X])^2=11.85'),(r'F(x)=\begin',r'F(x)=P(X\le x)=\sum_{u\le x}f(u)=\begin'),(r'F(2)=.70',r'F(2)=f(-1)+f(2)=.55+.15=.70'),(r'P(X<2)=.55',r'P(X<2)=\sum_{x<2}f(x)=f(-1)=.55')]
    elif key=='depend':pairs=[(r'P(X=2)=\frac38',r'P(X=2)=\frac{\text{favorable sequences}}{\text{all sequences}}=\frac38'),(r'P(\text{two kings})=\frac4',r'P(\text{two kings})=P(K_1)P(K_2\mid K_1)=\frac4')]
    elif key in ('continuous','endpoint','functionmean','uniform'):
        pairs=[(r'E[X]=\int_0',r'E[X]=\int_a^b xf(x)\,dx=\int_0'),(r'E[X^2]=\int_0',r'E[X^2]=\int_a^b x^2f(x)\,dx=\int_0'),(r'P(X<1)=\frac',r'P(X<1)=F(1)=\frac'),(r'P(X>1.5)=1-\frac',r'P(X>1.5)=1-F(1.5)=1-\frac'),(r'\operatorname{Var}(X)=2-',r'\operatorname{Var}(X)=E[X^2]-(E[X])^2=2-'),(r'\operatorname{Var}(X)=0.8300889',r'\operatorname{Var}(X)=E[X^2]-(E[X])^2=0.8300889'),(r'E[2X+1]=2(0.8495556)',r'E[2X+1]=2E[X]+1=2(0.8495556)'),(r'E[X-26]=95-26',r'E[X-26]=E[X]-26=95-26'),(r'\operatorname{Var}(X)=\frac13',r'\operatorname{Var}(X)=E[X^2]-(E[X])^2=\frac13')]
        if key=='endpoint':pairs.extend([(r'c=\frac{-.2+\sqrt{.04+8}}2',r'c=\frac{-B+\sqrt{B^2-4AC}}{2A}\quad(A=1,B=.2,C=-2)\\c=\frac{-.2+\sqrt{.04+8}}2'),(r'F(x)=.1x',r'F(x)=\int_0^x f(u)\,du=.1x')])
    elif key=='normalwork':pairs=[(r'z_{85}=\frac{85',r'z_{85}=\frac{x-\mu}{\sigma}=\frac{85'),(r'z_{115}=\frac{115',r'z_{115}=\frac{x-\mu}{\sigma}=\frac{115'),(r'P(X<85)=1-.8749',r'P(X<85)=\Phi(z_{85})=1-\Phi(1.15)=1-.8749'),(r'P(85\le X<115)=.9893',r'P(85\le X<115)=\Phi(z_{115})-\Phi(z_{85})=.9893'),(r'P(X\ge115)=1-.9893',r'P(X\ge115)=1-\Phi(z_{115})=1-.9893')]
    elif key=='inverse':pairs=[(r'z_p=1.96',r'z_p=\Phi^{-1}(p)=\Phi^{-1}(.975)\approx1.96'),(r'x_{.975}\approx112.052',r'x_{.975}=\mu+z_{.975}\sigma=95+1.96(8.7)\approx112.052')]
    elif key=='sampling':pairs=[(r'\mathrm{SEM}=\frac{1.5}',r'\mathrm{SEM}=\frac{\sigma}{\sqrt n}=\frac{1.5}'),(r'z_L=\frac{3.5',r'z_L=\frac{l-\mu}{\mathrm{SEM}}=\frac{3.5'),(r'z_U=\frac{3.8',r'z_U=\frac{u-\mu}{\mathrm{SEM}}=\frac{3.8'),(r'P=\Phi(-.942809)',r'P(3.5<\bar X<3.8)=\Phi(z_U)-\Phi(z_L)=\Phi(-.942809)')]
    elif key=='anova':pairs=[(r's_{\mathrm{wit}}^2=\frac{189',r's_{\mathrm{wit}}^2=\frac{\sum_j s_j^2}{m}=\frac{189'),(r'\bar{\bar x}=\frac{1188',r'\bar{\bar x}=\frac{\sum_j\bar x_j}{m}=\frac{1188'),(r'(1188-1321)^2',r'\sum_j(\bar x_j-\bar{\bar x})^2=(1188-1321)^2'),(r's_{\bar x}^2=\frac{27734}',r's_{\bar x}^2=\frac{\sum_j(\bar x_j-\bar{\bar x})^2}{m-1}=\frac{27734}'),(r'F=\frac{166404}',r'F=\frac{s_{\mathrm{bet}}^2}{s_{\mathrm{wit}}^2}=\frac{166404}'),(r'\nu_1=m-1=2',r'\nu_1=m-1=3-1=2'),(r'\nu_2=m(n-1)=33',r'\nu_2=m(n-1)=3(12-1)=33')]
    elif key in ('pooled','unequal','onet'):
        pairs=[(r's_1^2=6.2001',r's_1^2=2.49^2=6.2001'),(r's_2^2=4.3681',r's_2^2=2.09^2=4.3681'),(r'\nu=48',r'\nu=n_1+n_2-2=25+25-2=48'),(r'\nu=9+16-2',r'\nu=n_1+n_2-2=9+16-2'),(r's_p^2=\frac{8(',r's_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}=\frac{8('),(r'\operatorname{SE}_{\Delta}=\sqrt{.888522',r'\operatorname{SE}_{\Delta}=\sqrt{s_p^2(1/n_1+1/n_2)}=\sqrt{.888522'),(r't=\frac{2.08',r't=\frac{\bar x_1-\bar x_2}{\operatorname{SE}_{\Delta}}=\frac{2.08'),(r'\nu=n-1=4',r'\nu=n-1=5-1=4')]
    elif key=='pairs':
        pairs=[(r'\operatorname{SE}_{ij}=\sqrt{2(239.9)',r'\operatorname{SE}_{ij}=\sqrt{2s_{\mathrm{wit}}^2/n}=\sqrt{2(239.9)')]
        for i,j in [(1,3),(2,3),(1,2)]:pairs.append((f'|t_{{{i}{j}}}|=\\frac{{',f'|t_{{{i}{j}}}|=\\frac{{|\\bar x_{i}-\\bar x_{j}|}}{{\\operatorname{{SE}}_{{ij}}}}=\\frac{{'))
    elif key=='multiplicity':pairs=[(r'1-\frac{.05}{2(3)}',r'A_{\mathrm{left}}=1-\frac{\alpha_T}{2k}=1-\frac{.05}{2(3)}'),(r'k=3:\quad .05/3,\ .05/2,\ .05',r'\alpha_1=\frac{\alpha_T}{k-1+1}=.05/3,\quad\alpha_2=\frac{\alpha_T}{k-2+1}=.05/2,\quad\alpha_3=\frac{\alpha_T}{k-3+1}=.05')]
    elif key=='z':pairs=[(r'\hat p_1=18/25',r'\hat p_1=m_1/n_1=18/25'),(r'\hat p_2=6/19',r'\hat p_2=m_2/n_2=6/19'),(r'\hat p=\frac{18+6}',r'\hat p=\frac{m_1+m_2}{n_1+n_2}=\frac{18+6}'),(r'c_Y=\tfrac12(1/25',r'c_Y=\tfrac12(1/n_1+1/n_2)=\tfrac12(1/25'),(r'D_Y=\max(0,|.72',r'D_Y=\max(0,|\hat p_1-\hat p_2|-c_Y)=\max(0,|.72'),(r'|z_Y|=.357895',r'|z_Y|=D_Y/\operatorname{SE}_0=.357895')]
    elif key in ('chi2','large'):
        obs=[[18,7],[6,13]] if key=='chi2' else [[36,131],[41,132],[75,104]];expected,cells=cell_work(obs)
        # The complete cell list below already includes E11. Replace the older
        # single-cell demonstration rather than displaying that cell twice.
        if key=='large':html=re.sub(r'E_\{11\}=.*?\\\\(?=E=)', '', html, count=1)
        # Expand each cell where the numerical matrix was previously a jump.
        marker=r'E=\begin{pmatrix}';html=html.replace(marker,r'\\'.join(expected)+r'\\'+marker)
        if key=='chi2':html=html.replace(r'\chi_Y^2=\sum',r'\\'.join(cells)+r'\\\chi_Y^2=\sum')
        else:html=html.replace(r'\chi^2=\sum',r'\\'.join(cells)+r'\\\chi^2=\sum')
        pairs=[(r'\nu=(2-1)(2-1)',r'\nu=(r-1)(c-1)=(2-1)(2-1)'),(r'\nu=(3-1)(2-1)',r'\nu=(r-1)(c-1)=(3-1)(2-1)')]
    elif key=='gof':pairs=[(r'E_i=Np_i\quad\Rightarrow\quad E=(282,117.5,70.5)',r'E_1=Np_1=470(.60)=282\\E_2=Np_2=470(.25)=117.5\\E_3=Np_3=470(.15)=70.5'),(r'\chi^2=\frac{(255',r'\chi^2=\sum_i\frac{(O_i-E_i)^2}{E_i}=\frac{(255'),(r'\nu=k-1=2',r'\nu=k-1=3-1=2')]
    elif key=='risk':pairs=[(r'r_T=6/19',r'r_T=m_T/n_T=6/19'),(r'r_C=18/25',r'r_C=m_C/n_C=18/25'),(r'\mathrm{NNT}=1/\mathrm{ARR}=2.47396',r'\mathrm{NNT}=1/\mathrm{ARR}=1/.404211=2.47396'),(r'\mathrm{OR}=\frac{50/14}',r'\mathrm{OR}=\frac{\mathrm{odds}_{\mathrm{case}}}{\mathrm{odds}_{\mathrm{control}}}=\frac{a/b}{c/d}=\frac{50/14}')]
    elif key=='proportionwork':pairs=[(r'\hat p=\frac8',r'\hat p=\frac mn=\frac8'),(r'\hat p(1-\hat p)=',r'\widehat{\operatorname{Var}}(X)=\hat p(1-\hat p)='),(r'\widehat{\operatorname{SD}}(X)=\sqrt{.113948}',r'\widehat{\operatorname{SD}}(X)=\sqrt{\hat p(1-\hat p)}=\sqrt{.113948}'),(r'\operatorname{SE}(\hat p)=\sqrt{.113948/61}',r'\operatorname{SE}(\hat p)=\sqrt{\hat p(1-\hat p)/n}=\sqrt{.113948/61}')]
    elif key=='output':pairs=[(r'\alpha_j=.05/3,\ .05/2,\ .05',r'\alpha_1=\frac{\alpha_T}{k-1+1}=.05/3,\quad\alpha_2=\frac{\alpha_T}{k-2+1}=.05/2,\quad\alpha_3=\frac{\alpha_T}{k-3+1}=.05')]
    # Remaining blocks explain notation, test selection, output, table use, or
    # already contain only general formulas, with no substituted calculation.
    for old,new in pairs:html=html.replace(old,new)
    return html
