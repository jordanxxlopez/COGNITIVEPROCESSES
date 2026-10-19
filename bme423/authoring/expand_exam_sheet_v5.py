"""Expand algebra inside V5's existing operations; no new sections or topics."""
import math
import re
from scipy import stats


def expand_walkthroughs(pack, placements):
    changes = []

    def expand(key, old, *new, note=None):
        before = r'\['+old+r'\]'
        body = pack['blocks'][key]['html']
        assert before in body, (key, old)
        after = (f'<p class="algebra-note">{note}</p>' if note else '') + ''.join(r'\['+tex+r'\]' for tex in new)
        pack['blocks'][key]['html'] = body.replace(before, after, 1)
        changes.append(dict(block=key, before=old, after=list(new), note=note))
        # Preserve the exact equation-to-operation audit in the expanded revision.
        for item in placements.get(key, {}).get('steps', []):
            updated = []
            for tex in item['after']:
                updated.extend(new if tex == old else [tex])
            item['after'] = updated

    expand('summary', r'\sum x_i=645,\quad n=10',
           r'\sum x_i=65+69+59+64+62', r'\qquad+67+68+62+64+65=645,\quad n=10')
    expand('summary', r'\sum(x_i-\bar x)^2=82.5',
           r'\sum(x_i-\bar x)^2=.25+20.25+30.25+.25+6.25',
           r'\qquad+6.25+12.25+6.25+.25+.25=82.5')
    expand('summary', r's^2=\frac{\sum(x_i-\bar x)^2}{n-1}=\frac{82.5}{9}=9.16667',
           r's^2=\frac{\sum(x_i-\bar x)^2}{n-1}=\frac{82.5}{10-1}=\frac{82.5}{9}=9.16667')
    expand('summary', r'\mathrm{SEM}=\frac{s}{\sqrt n}=\frac{3.02765}{\sqrt{10}}=.957427',
           r'\mathrm{SEM}=\frac{s}{\sqrt n}=\frac{3.02765}{\sqrt{10}}',r'=\frac{3.02765}{3.16228}=.957427')
    expand('summary', r'\sum x_i^2-\frac{(\sum x_i)^2}{n}=41685-645^2/10=82.5',
           r'\sum x_i^2-\frac{(\sum x_i)^2}{n}=41685-\frac{645^2}{10}',
           r'=41685-\frac{416025}{10}=41685-41602.5=82.5')
    expand('percentile', r'r=1+\frac{p(n-1)}{100}=1+\frac{30(5-1)}{100}=2.2=I+d',
           r'r=1+\frac{p(n-1)}{100}=1+\frac{30(5-1)}{100}',
           r'=1+\frac{30(4)}{100}=1+1.2=2.2=I+d',r'I=2,\quad d=.2')
    expand('percentile', r'x_{30}=7+.2(8-7)=7.2', r'x_{30}=7+.2(8-7)=7+.2(1)=7.2')
    expand('discrete', r'\operatorname{Var}(X)=E[X^2]-\mu^2=11.85-1.45^2=9.74750',
           r'\operatorname{Var}(X)=E[X^2]-\mu^2=11.85-1.45^2',r'=11.85-2.1025=9.74750')
    expand('discrete', r'\qquad+.10(1.55)^2+.20(5.55)^2=9.74750',
           r'\qquad+.10(1.55)^2+.20(5.55)^2',r'=3.301375+.045375+.24025+6.1605=9.74750')
    expand('loaded', r'=3.4', r'=.20+20(.16)=.20+3.20=3.4')
    expand('loaded', r'E[X^2]=.20+(4+9+16+25+36)(.16)=14.6',
           r'E[X^2]=.20+(4+9+16+25+36)(.16)',r'=.20+90(.16)=.20+14.40=14.6')
    expand('loaded', r'\operatorname{Var}(X)=14.6-3.4^2=3.04',r'\operatorname{Var}(X)=14.6-3.4^2=14.6-11.56=3.04')
    expand('events', r'P(\text{two kings})=\frac4{52}\frac3{51}=.00452489',
           r'P(\text{two kings})=\frac4{52}\frac3{51}=\frac{4(3)}{52(51)}',r'=\frac{12}{2652}=.00452489')
    expand('events', r'P=3/8=.375', r'N=2(2)(2)=2^3=8,\quad P=3/8=.375')

    expand('continuous', r'\int_a^b f(x)\,dx=\int_0^2\frac{x}{2}\,dx=\left[\frac{x^2}{4}\right]_0^2=1',
           r'\int_a^b x^k\,dx=\left[\frac{x^{k+1}}{k+1}\right]_a^b\quad(k=0,1,2,\ldots)',
           r'\int_a^b f(x)\,dx=\int_0^2\frac{x}{2}\,dx=\frac12\int_0^2 x\,dx',
           r'=\frac12\left[\frac{x^{1+1}}{1+1}\right]_0^2=\left[\frac{x^2}{4}\right]_0^2',
           r'=\frac{2^2}{4}-\frac{0^2}{4}=\frac44-0=1',
           note='dx means integrate with respect to x; du uses u instead. Raise the power by one, divide by that new power, then substitute upper bound minus lower bound.')
    expand('continuous', r'F(t)=\int_0^t u/2\,du=t^2/4\quad(0\le t\le2)',
           r'F(t)=\int_0^t\frac u2\,du=\frac12\left[\frac{u^2}{2}\right]_0^t',
           r'=\frac{t^2}{4}-\frac{0^2}{4}=\frac{t^2}{4}\quad(0\le t\le2)')
    expand('continuous', r'P(X>1.5)=1-\frac{1.5^2}{4}=.4375',
           r'P(X>1.5)=1-\frac{1.5^2}{4}=1-\frac{2.25}{4}',r'=1-.5625=.4375')
    expand('continuous', r'\mu=\int_0^2x(x/2)\,dx=[x^3/6]_0^2=4/3',
           r'\mu=\int_0^2x\left(\frac x2\right)\,dx=\frac12\int_0^2x^2\,dx',
           r'=\frac12\left[\frac{x^{2+1}}{2+1}\right]_0^2=\left[\frac{x^3}{6}\right]_0^2',
           r'=\frac{2^3}{6}-\frac{0^3}{6}=\frac86=\frac43')
    expand('continuous', r'E[X^2]=\int_0^2x^2(x/2)\,dx=[x^4/8]_0^2=2',
           r'E[X^2]=\int_0^2x^2\left(\frac x2\right)\,dx=\frac12\int_0^2x^3\,dx',
           r'=\frac12\left[\frac{x^{3+1}}{3+1}\right]_0^2=\left[\frac{x^4}{8}\right]_0^2',
           r'=\frac{2^4}{8}-\frac{0^4}{8}=\frac{16}{8}=2')
    expand('continuous', r'\operatorname{Var}(X)=E[X^2]-\mu^2=2-(4/3)^2=2/9',
           r'\operatorname{Var}(X)=E[X^2]-\mu^2=2-\left(\frac43\right)^2',r'=\frac{18}{9}-\frac{16}{9}=\frac29')
    expand('continuous', r'F(q)=.5:\quad q^2/4=.5\Rightarrow q=\sqrt2=1.41421',
           r'F(q)=.5:\quad\frac{q^2}{4}=.5',r'q^2=4(.5)=2\quad\Rightarrow\quad q=\sqrt2=1.41421',
           note='Multiply both sides by four, then take the positive square root (the time is nonnegative).')
    expand('piecewise', r'F(1)=\int_0^1u\,du=1/2',
           r'F(1)=\int_0^1u\,du=\left[\frac{u^2}{2}\right]_0^1',r'=\frac{1^2}{2}-\frac{0^2}{2}=\frac12')
    expand('piecewise', r'=\tfrac12+[2u-u^2/2]_1^t=2t-t^2/2-1',
           r'=\tfrac12+\left[2u-\frac{u^2}{2}\right]_1^t',
           r'=\tfrac12+\left(2t-\frac{t^2}{2}\right)-\left(2-\frac12\right)',
           r'=\tfrac12+2t-\frac{t^2}{2}-\tfrac32=2t-\frac{t^2}{2}-1')
    expand('endpoint', r'1=\int_0^c(.1+x)\,dx=[.1x+x^2/2]_0^c',
           r'1=\int_0^c(.1+x)\,dx=.1\int_0^c1\,dx+\int_0^cx\,dx',
           r'=[.1x+x^2/2]_0^c=(.1c+c^2/2)-0')
    expand('endpoint', r'.1c+c^2/2=1\Rightarrow c^2+.2c-2=0',
           r'.1c+\frac{c^2}{2}=1',r'2(.1c)+2\left(\frac{c^2}{2}\right)=2(1)',
           r'.2c+c^2=2\quad\Rightarrow\quad c^2+.2c-2=0',note='Multiply every term on both sides by two, then subtract two from both sides.')
    expand('endpoint', r'c=\frac{-.2+\sqrt{.2^2-4(1)(-2)}}2=1.31774',
           r'A=1,\ B=.2,\ D=-2:\quad B^2-4AD=.04+8=8.04',
           r'c=\frac{-.2\pm\sqrt{8.04}}{2}=\frac{-.2\pm2.835489}{2}',
           r'c_+=\frac{2.635489}{2}=1.31774,\quad c_-=-1.51774',
           note='Use the positive root for this upper endpoint; retain its full calculator precision.')
    old_cdf = r'F(t)=\begin{cases}0&t\le0\\.1t+t^2/2&0<t\le c\\1&t>c\end{cases}'
    expand('endpoint', old_cdf,
           r'F(t)=\int_0^t(.1+u)\,du=[.1u+u^2/2]_0^t',r'=(.1t+t^2/2)-0\quad(0<t\le c)',old_cdf)
    expand('endpoint', r'P(X>.5)=1-[.1(.5)+.5^2/2]=.825',
           r'P(X>.5)=1-[.1(.5)+.5^2/2]',r'=1-[.05+.25/2]=1-.175=.825')
    expand('endpoint', r'P(0<X<.6)=.1(.6)+.6^2/2=.24',
           r'P(0<X<.6)=F(.6)-F(0)=.1(.6)+.6^2/2',r'=.06+.36/2=.06+.18=.24')
    expand('endpoint', r'\mu=\int_0^c x(.1+x)\,dx=[.05x^2+x^3/3]_0^c',
           r'\mu=\int_0^cx(.1+x)\,dx=\int_0^c(.1x+x^2)\,dx',
           r'=\left[\frac{.1x^2}{2}+\frac{x^3}{3}\right]_0^c=[.05x^2+x^3/3]_0^c')
    expand('endpoint', r'=.05c^2+c^3/3=.849556',
           r'=(.05c^2+c^3/3)-0',r'=.0868226+.762733=.849556')
    expand('endpoint', r'E[2X+1]=2\mu+1=2(.849556)+1=2.69911',
           r'E[2X+1]=2\mu+1=2(.849556)+1',r'=1.69911+1=2.69911')
    expand('uniform', r'E[X]=\int_0^1x\,dx=[x^2/2]_0^1=1/2',
           r'E[X]=\int_0^1x\,dx=[x^2/2]_0^1=\frac{1^2-0^2}{2}=\frac12')
    expand('uniform', r'E[X^2]=\int_0^1x^2\,dx=[x^3/3]_0^1=1/3',
           r'E[X^2]=\int_0^1x^2\,dx=[x^3/3]_0^1=\frac{1^3-0^3}{3}=\frac13')
    expand('uniform', r'\operatorname{Var}(X)=1/3-(1/2)^2=1/12',
           r'\operatorname{Var}(X)=\frac13-\left(\frac12\right)^2=\frac13-\frac14',r'=\frac4{12}-\frac3{12}=\frac1{12}')
    expand('coefficient', r'1=\int_0^2 kx\,dx=k[x^2/2]_0^2=2k',
           r'1=\int_0^2kx\,dx=k\int_0^2x\,dx=k[x^2/2]_0^2',r'=k\left(\frac{2^2}{2}-\frac{0^2}{2}\right)=k(2)=2k')
    expand('coefficient', r'k=1/2\Rightarrow f(x)=x/2',
           r'1=2k\quad\Rightarrow\quad\frac12=\frac{2k}{2}=k',r'f(x)=kx=\frac12x=\frac x2')

    expand('normal', r'z_{85}=\frac{x-\mu}{\sigma}=\frac{85-95}{8.7}=-1.14943\approx-1.15',
           r'z_{85}=\frac{x-\mu}{\sigma}=\frac{85-95}{8.7}=\frac{-10}{8.7}',r'=-1.14943\approx-1.15')
    expand('normal', r'z_{115}=\frac{x-\mu}{\sigma}=\frac{115-95}{8.7}=2.29885\approx2.30',
           r'z_{115}=\frac{x-\mu}{\sigma}=\frac{115-95}{8.7}=\frac{20}{8.7}',r'=2.29885\approx2.30')
    expand('quantile', r'x_p=\mu+z_p\sigma=95+1.96(8.7)=112.052',
           r'x_p=\mu+z_p\sigma=95+1.96(8.7)',r'=95+17.052=112.052')
    expand('quantile', r'Q_1=95-.674490(8.7)=89.1319', r'Q_1=95-.674490(8.7)=95-5.86806=89.1319')
    expand('quantile', r'Q_3=95+.674490(8.7)=100.868', r'Q_3=95+.674490(8.7)=95+5.86806=100.868')
    expand('quantile', r'p_L=(1-.95)/2=.025,\quad p_U=1-.025=.975',
           r'p_L=\frac{1-.95}{2}=\frac{.05}{2}=.025,\quad p_U=1-.025=.975')
    expand('quantile', r'x_L=95-1.96(8.7)=77.948',r'x_L=95-1.96(8.7)=95-17.052=77.948')
    expand('quantile', r'x_U=95+1.96(8.7)=112.052',r'x_U=95+1.96(8.7)=95+17.052=112.052')
    expand('sampling', r'\mathrm{SEM}=\frac{\sigma}{\sqrt n}=\frac{1.5}{\sqrt{50}}=.212132',
           r'\operatorname{Var}(\bar X)=\frac{1.5^2}{50}=\frac{2.25}{50}=.045',
           r'\mathrm{SEM}=\frac{\sigma}{\sqrt n}=\frac{1.5}{\sqrt{50}}=\frac{1.5}{7.07107}=.212132')
    expand('sampling', r'z_L=\frac{\bar x-\mu}{\sigma/\sqrt n}=\frac{3.5-4}{.212132}=-2.35702',
           r'z_L=\frac{\bar x-\mu}{\sigma/\sqrt n}=\frac{3.5-4}{.212132}',r'=\frac{-.5}{.212132}=-2.35702')
    expand('sampling', r'z_U=\frac{\bar x-\mu}{\sigma/\sqrt n}=\frac{3.8-4}{.212132}=-.942809',
           r'z_U=\frac{\bar x-\mu}{\sigma/\sqrt n}=\frac{3.8-4}{.212132}',r'=\frac{-.2}{.212132}=-.942809')
    expand('linear', r'\operatorname{Var}\left(\frac{\sum X_i}{n}\right)=\frac{n\sigma^2}{n^2}=\frac{\sigma^2}{n}',
           r'\operatorname{Var}\left(\frac{\sum X_i}{n}\right)=\left(\frac1n\right)^2\sum\operatorname{Var}(X_i)',
           r'=\frac1{n^2}(n\sigma^2)=\frac{n\sigma^2}{n\cdot n}=\frac{\sigma^2}{n}')
    expand('precision', r'\mathrm{SEM}_{4n}=\frac{\sigma}{\sqrt{4n}}=\frac12\frac{\sigma}{\sqrt n}=\tfrac12\mathrm{SEM}_n',
           r'\sqrt{4n}=\sqrt4\sqrt n=2\sqrt n',
           r'\mathrm{SEM}_{4n}=\frac{\sigma}{\sqrt{4n}}=\frac{\sigma}{2\sqrt n}=\tfrac12\mathrm{SEM}_n')

    expand('one-t', r'\mathrm{SEM}=s/\sqrt n=16/\sqrt{16}=4',r'\mathrm{SEM}=\frac{s}{\sqrt n}=\frac{16}{\sqrt{16}}=\frac{16}{4}=4')
    expand('one-t', r'\bar x-\mu_0=103-115=-12',r'\bar x-\mu_0=103-115=-(115-103)=-12')
    expand('pooled-t', r's_p^2=\frac{21(70.56)+26(90.25)}{47}=81.4523',
           r's_p^2=\frac{21(70.56)+26(90.25)}{47}',r'=\frac{1481.76+2346.50}{47}=\frac{3828.26}{47}=81.4523')
    pool = (21*8.4**2+26*9.5**2)/47
    reciprocal = 1/22+1/27
    expand('pooled-t', r'\mathrm{SE}_{\Delta}=\sqrt{81.4523(1/22+1/27)}=2.59213',
           r'\frac1{22}+\frac1{27}=.0454545+.0370370=.0824916',
           r'\mathrm{SE}_{\Delta}=\sqrt{81.4523(.0824916)}',
           rf'=\sqrt{{{pool*reciprocal:.6f}}}=2.59213')
    expand('pooled-t', r't=\frac{\bar x_1-\bar x_2}{\mathrm{SE}_{\Delta}}=\frac{49-57}{2.59213}=-3.08627',
           r't=\frac{\bar x_1-\bar x_2}{\mathrm{SE}_{\Delta}}=\frac{49-57}{2.59213}',r'=\frac{-8}{2.59213}=-3.08627')
    expand('anova', r's_{\mathrm{wit}}^2=(189^2+217^2+191^2)/3=39763.7',
           r's_{\mathrm{wit}}^2=\frac{189^2+217^2+191^2}{3}',r'=\frac{35721+47089+36481}{3}=\frac{119291}{3}=39763.7')
    expand('anova', r'\bar{\bar x}=\frac{\sum_i\bar x_i}{m}=\frac{1188+1412+1363}{3}=1321',
           r'\bar{\bar x}=\frac{\sum_i\bar x_i}{m}=\frac{1188+1412+1363}{3}',r'=\frac{3963}{3}=1321')
    expand('anova', r'(\bar x_i-1321)=(-133,91,42)',
           r'1188-1321=-133,\quad1412-1321=91',r'1363-1321=42:\quad(\bar x_i-1321)=(-133,91,42)')
    expand('anova', r'=17689+8281+1764=27734', r'=(-133)^2+91^2+42^2',r'=17689+8281+1764=27734')
    expand('conditions', r's_{\mathrm{wit}}^2=(7.3^2+9.1^2)/2=68.05',
           r's_{\mathrm{wit}}^2=\frac{7.3^2+9.1^2}{2}=\frac{53.29+82.81}{2}=68.05')
    expand('conditions', r's_{\bar x}^2=\frac{(-1.3)^2+1.3^2}{2-1}=3.38',
           r'74.2-75.5=-1.3,\quad76.8-75.5=1.3',
           r's_{\bar x}^2=\frac{(-1.3)^2+1.3^2}{2-1}=\frac{1.69+1.69}{1}=3.38')
    expand('bonferroni', r'\mathrm{SE}=\sqrt{2(2.5267)/15}=.580425',
           r'\mathrm{SE}=\sqrt{\frac{2(2.5267)}{15}}=\sqrt{\frac{5.0534}{15}}',r'=\sqrt{.3368933}=.580425')
    expand('bonferroni', r'|t_{13}|=\frac{|\bar x_1-\bar x_3|}{\mathrm{SE}_{13}}=\frac{1.5}{.580425}=2.58431',
           r'|t_{13}|=\frac{|\bar x_1-\bar x_3|}{\mathrm{SE}_{13}}=\frac{|3.7-5.2|}{.580425}',r'=\frac{|-1.5|}{.580425}=\frac{1.5}{.580425}=2.58431')
    expand('bonferroni', r'|t_{12}|=(4.6-3.7)/.580425=1.55059',r'|t_{12}|=\frac{4.6-3.7}{.580425}=\frac{.9}{.580425}=1.55059')
    expand('bonferroni', r'|t_{23}|=(5.2-4.6)/.580425=1.03373',r'|t_{23}|=\frac{5.2-4.6}{.580425}=\frac{.6}{.580425}=1.03373')
    expand('holm', r'\alpha_j=\frac{\alpha_T}{k-j+1},\quad j=1,\ldots,k',
           r'\alpha_j=\frac{\alpha_T}{k-j+1},\quad k=5',
           r'\alpha_1=\frac{.05}{5-1+1}=\frac{.05}{5}=.0100',
           r'\alpha_2=\frac{.05}{5-2+1}=\frac{.05}{4}=.0125',
           r'\alpha_3=\frac{.05}{5-3+1}=\frac{.05}{3}=.0166667')

    expand('binary', r'\widehat{\operatorname{Var}}(X)=\hat p(1-\hat p)=.113948',
           r'1-\hat p=1-.131148=.868852',r'\widehat{\operatorname{Var}}(X)=\hat p(1-\hat p)',r'=.131148(.868852)=.113948')
    expand('binary', r'\widehat{\operatorname{SE}}(\hat p)=\sqrt{\frac{\hat p(1-\hat p)}{n}}=\sqrt{\frac{.113948}{61}}=.0432203',
           r'\widehat{\operatorname{SE}}(\hat p)=\sqrt{\frac{\hat p(1-\hat p)}{n}}=\sqrt{\frac{.113948}{61}}',
           r'\approx\sqrt{.001867998}=.0432203')
    expand('z-yates', r'\mathrm{SE}_0=\sqrt{.545455(.454545)(1/25+1/19)}=.151547',
           r'1-\hat p=.454545,\quad\frac1{25}+\frac1{19}=.0926316',
           r'\mathrm{SE}_0=\sqrt{.545455(.454545)(.0926316)}',r'=\sqrt{.0229665}=.151547')
    expand('z-yates', r'c_Y=.5(1/25+1/19)=.0463158',r'c_Y=.5(1/25+1/19)=.5(.0926316)=.0463158')
    expand('z-yates', r'D_Y=|.72-.315789|-.0463158=.357895',r'D_Y=|.72-.315789|-.0463158',r'=.404211-.0463158=.357895')
    expand('z-yates', r'c_Y=.5(1/186+1/220)=.00496090',r'c_Y=.5(1/186+1/220)=.5(.00992180)=.00496090')
    expand('z-yates', r'|z_Y|=\frac{.565-.455-.00496090}{.0498017}=2.10915>1.960',
           r'D_Y=.565-.455-.00496090=.110-.00496090',r'=.1050391,\quad |z_Y|=\frac{.1050391}{.0498017}=2.10915>1.960')
    expand('chi2', r'O=\begin{pmatrix}18&7\\6&13\end{pmatrix},\quad N=44',
           r'O=\begin{pmatrix}18&7\\6&13\end{pmatrix},\quad R=(18+7,6+13)=(25,19)',
           r'C=(18+6,7+13)=(24,20),\quad N=25+19=44')
    expand('chi2', r'c_{11}=\frac{(|18-13.6364|-.5)^2}{13.6364}=1.09470',
           r'|18-13.6364|-.5=4.363636-.5=3.863636',
           r'c_{11}=\frac{(3.863636)^2}{13.63636}=\frac{14.927686}{13.63636}=1.09470',
           r'c_{12}=\frac{14.927686}{11.36364}=1.31364',r'c_{21}=\frac{14.927686}{10.36364}=1.44039,\quad c_{22}=\frac{14.927686}{8.636364}=1.72847',
           note='Here all four cells have the same absolute observed-minus-expected gap; use each cell’s own expected count in its denominator.')
    expand('large-chi', r'E_{11}=\frac{R_1C_1}{N}=\frac{167(152)}{519}=48.9094',
           r'E_{11}=\frac{R_1C_1}{N}=\frac{167(152)}{519}=\frac{25384}{519}=48.9094')
    obs = [[36,131],[41,132],[75,104]]
    expected = stats.chi2_contingency(obs, correction=False).expected_freq
    residuals = [[obs[i][j]-expected[i,j] for j in range(2)] for i in range(3)]
    def matrix(values):
        return r'\begin{pmatrix}'+r'\\'.join('&'.join(f'{v:.6g}' for v in row) for row in values)+r'\end{pmatrix}'
    expand('large-chi', r'c_{11}=(36-48.9094)^2/48.9094=3.40739',
           r'O-E='+matrix(residuals),r'(O-E)^2='+matrix([[x*x for x in row] for row in residuals]),
           r'c_{11}=\frac{(36-48.9094)^2}{48.9094}=\frac{166.654}{48.9094}=3.40739',
           r'c_{12}=\frac{166.654}{118.091}=1.41124',
           r'c_{21}=\frac{93.44444}{50.66667}=1.84430,\quad c_{22}=\frac{93.44444}{122.3333}=.763851',
           r'c_{31}=\frac{509.680648}{52.42389}=9.72230,\quad c_{32}=\frac{509.680648}{126.5761}=4.02667')
    expand('gof', r'\chi^2=\frac{(255-282)^2}{282}+\frac{(125-117.5)^2}{117.5}+\frac{(90-70.5)^2}{70.5}',
           r'O-E=(255-282,125-117.5,90-70.5)',r'=(-27,7.5,19.5),\quad (O-E)^2=(729,56.25,380.25)',
           r'\chi^2=\frac{729}{282}+\frac{56.25}{117.5}+\frac{380.25}{70.5}')
    expand('chi-holm', r'k=3,\quad\alpha_j=.05/3,\ .05/2,\ .05',
           r'k=3:\quad\alpha_1=.05/(3-1+1)=.05/3=.0166667',
           r'\alpha_2=.05/(3-2+1)=.025,\quad\alpha_3=.05/(3-3+1)=.05')
    expand('risk', r'\mathrm{RR}=r_T/r_C=.315789/.72=.438596',
           r'\mathrm{RR}=\frac{r_T}{r_C}=\frac{6/19}{18/25}=\frac6{19}\frac{25}{18}',r'=\frac{150}{342}=.438596')
    expand('risk', r'\mathrm{NNH}=1/(r_T-r_C)\quad\text{when treatment raises harm}',
           r'\mathrm{NNH}=1/(r_T-r_C)\quad\text{when treatment raises harm}',
           r'\mathrm{NNH}=20\quad\Rightarrow\quad\text{harm increase}=1/20=.05')
    expand('odds', r'\mathrm{OR}=\frac{a/b}{c/d}=\frac{ad}{bc}=\frac{50/14}{43/35}',
           r'\mathrm{OR}=\frac{a/b}{c/d}=\frac ab\frac dc=\frac{ad}{bc}',r'=\frac{50/14}{43/35}=\frac{50}{14}\frac{35}{43}')
    expand('odds', r'=\frac{50(35)}{14(43)}=2.90698',r'=\frac{50(35)}{14(43)}=\frac{1750}{602}=2.90698')
    expand('folate-risk', r'\mathrm{RR}=\frac{r_{NF}}{r_F}=\frac{27/525}{4/475}=6.10714',
           r'\mathrm{RR}=\frac{r_{NF}}{r_F}=\frac{27/525}{4/475}=\frac{27}{525}\frac{475}{4}',r'=\frac{12825}{2100}=6.10714')
    expand('folate-risk', r'\mathrm{RR}_{F:NF}=1/\mathrm{RR}_{NF:F}=.163743',r'\mathrm{RR}_{F:NF}=\frac1{\mathrm{RR}_{NF:F}}=\frac{2100}{12825}=.163743')
    expand('quartile-steps', r'=62+.25(64-62)=62.5',r'=62+.25(64-62)=62+.25(2)=62+.5=62.5')
    expand('quartile-steps', r'\text{median}=64+.5(65-64)=64.5',r'\text{median}=64+.5(65-64)=64+.5(1)=64.5')
    expand('quartile-steps', r'Q_3=65+.75(67-65)=66.5',r'Q_3=65+.75(67-65)=65+.75(2)=65+1.5=66.5')
    expand('integral-steps', r'P(1.5<X\le2)=\left[\frac{x^2}{4}\right]_{1.5}^{2}',
           r'P(1.5<X\le2)=\int_{1.5}^2\frac x2\,dx',r'=\frac12\left[\frac{x^2}{2}\right]_{1.5}^2=\left[\frac{x^2}{4}\right]_{1.5}^{2}')
    expand('integral-steps', r'=\frac{2^2}{4}-\frac{1.5^2}{4}=1-.5625=.4375',
           r'=\frac{2^2}{4}-\frac{1.5^2}{4}=\frac44-\frac{2.25}{4}',r'=1-.5625=.4375')
    expand('integral-steps', r'E[X]=\int_0^2x\frac{x}{2}\,dx=\left[\frac{x^3}{6}\right]_0^2',
           r'E[X]=\int_0^2x\frac{x}{2}\,dx=\frac12\int_0^2x^2\,dx',r'=\frac12\left[\frac{x^3}{3}\right]_0^2=\left[\frac{x^3}{6}\right]_0^2')
    # Rebalance four existing blocks; no section or example is removed. Sample
    # quartiles sit with the other quantile examples; R probability output joins
    # the supplied-output material. All walkthroughs stay intact in one column.
    pack['sheets'][0]['columns'][0] = ['data', 'summary', 'percentile', 'piecewise']
    pack['sheets'][0]['columns'][2] = ['continuous', 'events', 'integral-steps']
    pack['sheets'][1]['columns'][0] = ['endpoint', 'uniform', 'continuous-sketch']
    pack['sheets'][1]['columns'][1] = ['normal', 'quantile', 'normal-sketch', 'quartile-steps']
    pack['sheets'][1]['columns'][2] = ['sampling', 'linear', 'precision', 'coefficient']
    pack['sheets'][2]['columns'][1] = ['anova', 'conditions', 'r-normal']
    for page, sheet in enumerate(pack['sheets'], 1):
        for column, keys in enumerate(sheet['columns'], 1):
            for box, key in enumerate(keys, 1):
                pack['blocks'][key]['location'] = dict(page=page, column=column, box=box)
        for cell in sheet.get('bottom', []):
            column = cell['column']
            for index, key in enumerate(cell['keys'], len(sheet['columns'][column-1])+1):
                pack['blocks'][key]['location'] = dict(page=page, column=column, box=index)
    return changes
