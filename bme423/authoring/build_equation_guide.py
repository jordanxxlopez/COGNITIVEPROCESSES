"""Explicit equation placements, audited by calculation step and original slide.

This adds equations to teaching views, never to the archived print sheets.
Every problem step and slide must be classified; unknown content fails the build.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
def read(name, prefix):
    return json.loads((ROOT/name).read_text().removeprefix(prefix).rstrip(';\n'))
D = read('data.js', 'const DATA=')
V = read('v2-data.js', 'const V2=')
C = read('version-c-data.js', 'const VERSION_C=')
rules = {}
def rule(key, tex, symbols):
    assert key not in rules, key
    rules[key] = dict(tex=tex.split(' || '), symbols=symbols)

rule('mean', r'\bar x=\frac{\sum_{i=1}^n x_i}{n}', r'\(x_i\) (each observation); \(n\) (sample size); \(\bar x\) (sample mean). Add the observations, then divide by their count.')
rule('deviation', r'd_i=x_i-\bar x', r'\(d_i\) (distance of observation \(i\) from the sample mean). Subtract the same mean from each value.')
rule('squares', r'd_i^2=(x_i-\bar x)^2', r'\(d_i^2\) (squared distance). Square each difference before adding.')
rule('ss', r'S=\sum_{i=1}^n(x_i-\bar x)^2', r'\(S\) (sum of squared distances); \(\bar x\) (sample mean). Add the squared-distance column.')
rule('samplevar', r's^2=\frac{\sum_{i=1}^n(x_i-\bar x)^2}{n-1}=\frac{S}{n-1}', r'\(s^2\) (sample variance); \(S\) (sum of squared distances); \(n-1\) (sample variance divisor).')
rule('sd', r's=\sqrt{s^2}', r'\(s\) (sample SD); \(s^2\) (sample variance). Square-root the variance to return to the original units.')
rule('sem', r'\widehat{\mathrm{SEM}}=\frac{s}{\sqrt n}', r'\(s\) (individual sample SD); \(n\) (sample size); SEM (estimated spread of sample means).')
rule('popmean', r'\mu=\frac{\sum_{i=1}^N x_i}{N}', r'\(N\) (entire population size); \(\mu\) (population mean).')
rule('popss', r'S_{\mathrm{pop}}=\sum_{i=1}^N(x_i-\mu)^2', r'\(S_{\mathrm{pop}}\) (population squared-distance total); \(\mu\) (population mean).')
rule('popvar', r'\sigma^2=\frac{\sum_{i=1}^N(x_i-\mu)^2}{N} || \sigma=\sqrt{\sigma^2}', r'\(\sigma^2\) (population variance); \(\sigma\) (population SD); \(\mu\) (population mean); \(N\) (whole population count).')
rule('rank', r'R=1+\frac{p(n-1)}{100}=I+d', r'\(p\) (percentile number, such as 75); \(n\) (count); \(R\) (rank in sorted data); \(I\) (integer part); \(d\) (fractional part).')
rule('interpolate', r'x_p=x_{(I)}+d\bigl(x_{(I+1)}-x_{(I)}\bigr)', r'\(x_{(I)}\) (lower sorted observation); \(x_{(I+1)}\) (next observation); \(d\) (fraction of their gap). If \(d=0\), read the observation at rank \(I\).')
rule('median', r'\mathrm{median}=\begin{cases}x_{((n+1)/2)}&n\text{ odd}\\[2pt]\frac{x_{(n/2)}+x_{(n/2+1)}}2&n\text{ even}\end{cases}', r'\(x_{(j)}\) (observation at sorted position \(j\)); \(n\) (number of observations).')
rule('iqr', r'\mathrm{IQR}=Q_3-Q_1', r'\(Q_1\) (25th percentile); \(Q_3\) (75th percentile); IQR (width of the middle half).')
rule('fences', r'L=Q_1-1.5\,\mathrm{IQR},\qquad U=Q_3+1.5\,\mathrm{IQR}', r'\(L,U\) (box-plot fences). The whiskers reach the outermost observations within these fences.')
rule('count', r'P(A)=\frac{\#\{\text{equally likely outcomes in }A\}}{\#\{\text{all equally likely outcomes}\}}', r'\(A\) (event); \(\#\) (count). Count complete outcomes, then select those in the event.')
rule('sequences', r'\#\{\text{sequences of }n\text{ coin tosses}\}=2^n', r'\(n\) (number of tosses). Each toss supplies two possibilities, so multiply two once per toss.')
rule('conditional', r'P(A\cap B)=P(A)P(B\mid A)', r'\(B\mid A\) (event B after learning that A happened). For draws without replacement, use the remaining objects and remaining total.')
rule('independent', r'P(B\mid A)=P(B),\qquad P(A\cap B)=P(A)P(B)', r'Independence means that knowing A happened leaves B’s probability unchanged.')
rule('validpmf', r'f(x)\ge0,\qquad\sum_x f(x)=1', r'\(f(x)=P(X=x)\) (probability at a possible value). All probabilities must be nonnegative and together total one.')
rule('dcdf', r'F(t)=P(X\le t)=\sum_{x\le t}f(x)', r'\(t\) (cutoff); add only masses whose values are at or below it. Include equality at a jump.')
rule('ex', r'E[X]=\sum_x x f(x)', r'\(x\) (possible value); \(f(x)\) (its probability); \(E[X]\) (weighted mean).')
rule('ex2', r'E[X^2]=\sum_x x^2 f(x)', r'Square each value \(x\), multiply by its original probability \(f(x)\), then add. Do not square the probabilities.')
rule('eh', r'E[h(X)]=\sum_x h(x)f(x)', r'\(h(x)\) (transformed outcome); \(f(x)\) (unchanged probability). Transform the values before weighting.')
rule('var', r'\operatorname{Var}(X)=E[X^2]-\bigl(E[X]\bigr)^2', r'\(E[X^2]\) (mean of squared values); \((E[X])^2\) (square of the mean). Subtract in this order.')
rule('directvar', r'\operatorname{Var}(X)=\sum_x (x-\mu)^2 f(x)', r'\(\mu=E[X]\) (population mean); weight each squared distance by the probability of that value.')
rule('rvsd', r'\operatorname{SD}(X)=\sqrt{\operatorname{Var}(X)}', r'SD (spread in the variable’s units); variance (spread in squared units).')
rule('linearmean', r'E[aX+bY+c]=aE[X]+bE[Y]+c', r'\(a,b\) (multipliers); \(c\) (constant shift). Apply the same multipliers and shift to the means.')
rule('linearvar', r'\operatorname{Var}(aX+bY+c)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)', r'For independent \(X,Y\): square each multiplier; add the variance contributions. A constant shift adds no variance.')
rule('area', r'f(x)\ge0,\qquad\int_a^b f(x)\,dx=1', r'\(a,b\) (full support endpoints); \(f(x)\) (density). The whole supported area must be one.')
rule('integral', r"\int_a^b f(x)\,dx=G(b)-G(a),\qquad G'(x)=f(x)", r'\(G\) (antiderivative). Evaluate at the upper limit, then subtract its value at the lower limit.')
rule('powerint', r'\int x^k\,dx=\frac{x^{k+1}}{k+1}+C\quad(k\ne-1)', r'\(k\) (power); add one to the power and divide by that new power. Integrate a sum term by term.')
rule('quadratic', r'Aq^2+Bq+C=0\quad\Rightarrow\quad q=\frac{-B\pm\sqrt{B^2-4AC}}{2A}', r'\(A,B,C\) (quadratic coefficients); \(q\) (unknown). Keep a root that fits the density’s support.')
rule('ccdf', r'F(t)=P(X\le t)=\int_{-\infty}^t f(x)\,dx', r'\(t\) (cutoff); \(f(x)\) (density). Integrate from the start of support to the cutoff; use 0 before support and 1 after it.')
rule('tails', r'P(X>t)=1-F(t)', r'\(F(t)\) (left-tail probability). The right tail is the remaining area.')
rule('interval', r'P(a<X<b)=F(b)-F(a)', r'\(a\) (lower cutoff); \(b\) (upper cutoff). For a continuous variable, endpoint equality does not change the area.')
rule('point', r'P(X=t)=\int_t^t f(x)\,dx=0', r'One exact point of a continuous variable has zero width and therefore zero probability.')
rule('medianarea', r'F(m)=\frac12', r'\(m\) (median measurement). Solve for the point with half the total area to its left.')
rule('cex', r'E[X]=\int_a^b x f(x)\,dx', r'\(a,b\) (support); \(x\) (value); \(f(x)\) (density). Multiply by the value before integrating.')
rule('cex2', r'E[X^2]=\int_a^b x^2 f(x)\,dx', r'\(x^2\) (squared value); \(f(x)\) (original density). Integrate their product over the whole support.')
rule('ceh', r'E[h(X)]=\int_a^b h(x)f(x)\,dx', r'\(h(x)\) (function of the measurement). Change the value being weighted, keeping the density weights.')
rule('uheight', r'f(x)=\frac1{b-a}\quad(a<x<b)', r'\(a,b\) (Uniform endpoints); \(b-a\) (full width). Constant height times full width must equal one.')
rule('uwidth', r'P(c<X<d)=\frac{d-c}{b-a}\quad(a\le c<d\le b)', r'\(d-c\) (requested width); \(b-a\) (full width). Use this ratio only for cutoffs inside the support.')
rule('umoments', r'E[X]=\frac{a+b}{2},\qquad\operatorname{Var}(X)=\frac{(b-a)^2}{12}', r'\(a,b\) (Uniform endpoints). The midpoint gives the mean; the squared full width divided by twelve gives the variance.')
rule('triangular', r'f(x)=\frac{2x}{b^2}\ (0<x<b),\quad F(x)=\frac{x^2}{b^2} || m=\frac{b}{\sqrt2}', r'For this rising triangular density only: \(b\) (upper support); \(m\) (median). Solve \(F(m)=1/2\) and retain the positive root.')
rule('trimoments', r'E[X]=\frac{2b}{3},\qquad E[X^2]=\frac{b^2}{2} || \operatorname{Var}(X)=\frac{b^2}{2}-\left(\frac{2b}{3}\right)^2=\frac{b^2}{18}', r'For \(f(x)=2x/b^2\) on \((0,b)\): \(b\) (upper endpoint). These follow from integrating value × density and squared value × density.')
rule('z', r'z=\frac{x-\mu}{\sigma}', r'\(x\) (individual measurement); \(\mu\) (population mean); \(\sigma\) (population SD). Subtract the center, then divide by individual spread.')
rule('phi', r'\Phi(z)=P(Z\le z),\qquad\Phi(-z)=1-\Phi(z)', r'\(Z\) (standard Normal variable); \(\Phi\) (left-tail area). Use symmetry for a negative z in the supplied positive-z table.')
rule('normalinterval', r'P(a<X<b)=\Phi\!\left(\frac{b-\mu}{\sigma}\right)-\Phi\!\left(\frac{a-\mu}{\sigma}\right)', r'\(a,b\) (measurement cutoffs); \(\mu,\sigma\) (individual mean and SD). Standardize each boundary, then subtract the two left-tail areas.')
rule('normalright', r'P(X>b)=1-\Phi\!\left(\frac{b-\mu}{\sigma}\right)', r'\(b\) (upper measurement cutoff). Calculate the left area first, then subtract it from one.')
rule('zquant', r'\Phi(z_p)=p,\qquad z_p=\Phi^{-1}(p)', r'\(p\) (left-tail probability, such as .975); \(z_p\) (standard Normal cutoff). Look up area to obtain a location.')
rule('quantile', r'x_p=\mu+z_p\sigma', r'\(z_p\) (standard cutoff); \(\sigma\) (SD in measurement units); \(\mu\) (mean). Multiply by SD, then add the mean.')
rule('meanvar', r'E[\bar X]=\mu,\quad\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}', r'\(\bar X\) (random sample mean); \(n\) (independent observations); \(\sigma^2\) (individual population variance).')
rule('meanse', r'\operatorname{SD}(\bar X)=\mathrm{SEM}=\frac{\sigma}{\sqrt n}', r'\(\sigma\) (individual population SD); \(n\) (sample size). This spread belongs to means, rather than individual measurements.')
rule('meanz', r'z=\frac{\bar x-\mu}{\sigma/\sqrt n}', r'\(\bar x\) (observed sample mean); \(\mu\) (population mean); \(\sigma/\sqrt n\) (spread of sample means).')
rule('meanright', r'P(\bar X>b)=1-\Phi\!\left(\frac{b-\mu}{\sigma/\sqrt n}\right)', r'\(b\) (cutoff for the mean). Standardize using SEM before taking the right tail.')
rule('sechange', r'\frac{\mathrm{SEM}_{\mathrm{new}}}{\mathrm{SEM}_{\mathrm{old}}}=\sqrt{\frac{n_{\mathrm{old}}}{n_{\mathrm{new}}}}', r'With individual population SD unchanged: compare sample sizes under a square root; multiply the old SEM by this ratio.')
rule('unbiased', r'E[\widehat\theta]=\theta', r'\(\widehat\theta\) (estimator from a sample); \(\theta\) (population quantity). Unbiasedness describes the average over repeated samples.')
rule('sevar', r'\widehat{\operatorname{SE}}(s^2)=s^2\sqrt{\frac{2}{n-1}}', r'In the Normal setting: \(s^2\) (sample variance); this estimates uncertainty in the variance estimate, rather than in the mean.')
rule('hmean', r'H_0:\mu_1=\cdots=\mu_m', r'\(\mu_j\) (population mean of group \(j\)); \(m\) (groups). The null concerns population means.')
rule('within', r's_{\mathrm{wit}}^2=\frac{s_1^2+\cdots+s_m^2}{m}', r'Balanced groups: \(s_j\) (group SD); \(m\) (groups); \(s_{\mathrm{wit}}^2\) (within variance). Square SDs before averaging.')
rule('grand', r'\bar{\bar x}=\frac{\bar x_1+\cdots+\bar x_m}{m}', r'Balanced groups: \(\bar x_j\) (group mean); \(\bar{\bar x}\) (grand mean). Average the group means.')
rule('meansvar', r's_{\bar x}^2=\frac{\sum_{j=1}^m(\bar x_j-\bar{\bar x})^2}{m-1}', r'\(s_{\bar x}^2\) (sample variance across group means); \(m-1\) (its divisor). Subtract the grand mean, square, add, then divide.')
rule('between', r's_{\mathrm{bet}}^2=n\,s_{\bar x}^2', r'\(n\) (subjects per group); \(s_{\bar x}^2\) (variance of group means). Multiply by the common group size to restore the individual-variance scale.')
rule('f', r'F=\frac{s_{\mathrm{bet}}^2}{s_{\mathrm{wit}}^2}', r'\(s_{\mathrm{bet}}^2\) (between estimate); \(s_{\mathrm{wit}}^2\) (within estimate). Divide between by within.')
rule('fdf', r'\nu_1=m-1,\quad\nu_2=m(n-1) || P(F_{\nu_1,\nu_2}>F_{\mathrm{crit}})=\alpha', r'\(\nu_1\) (numerator df); \(\nu_2\) (denominator df); \(\alpha\) (upper-tail level). Match both df in the F table.')
rule('fdecision', r'F>F_{\mathrm{crit}}\quad\Rightarrow\quad\text{reject }H_0', r'A sufficiently large between/within ratio supports an overall difference between population means.')
rule('pool', r's_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}', r'\(s_p^2\) (pooled variance); \(s_1,s_2\) (group SDs); \(n_1,n_2\) (sizes). Weight each variance by its group’s df.')
rule('squaredsds', r's_1^2=(s_1)^2,\qquad s_2^2=(s_2)^2', r'\(s_1,s_2\) are standard deviations. Square each before entering a variance formula.')
rule('diffse', r'\mathrm{SE}_{\Delta}=\sqrt{s_p^2\left(\frac1{n_1}+\frac1{n_2}\right)}', r'\(\mathrm{SE}_{\Delta}\) (uncertainty of the mean difference); \(s_p^2\) (pooled variance); \(n_1,n_2\) (sizes). Square-root the entire product.')
rule('meanseadd', r'\operatorname{Var}(\bar X_1-\bar X_2)=\frac{\sigma_1^2}{n_1}+\frac{\sigma_2^2}{n_2} || \operatorname{SD}(\bar X_1-\bar X_2)=\sqrt{\frac{\sigma_1^2}{n_1}+\frac{\sigma_2^2}{n_2}}', r'For independent groups: \(\sigma_i^2\) (individual population variance); \(n_i\) (group size). Add the two mean variances, then take the square root. Under a shared variance, the next step uses its pooled estimate.')
rule('twot', r't=\frac{\bar x_1-\bar x_2}{\mathrm{SE}_{\Delta}}', r'\(\bar x_1-\bar x_2\) (signed mean gap under an equal-means null); \(\mathrm{SE}_{\Delta}\) (its uncertainty). Keep the sign for direction.')
rule('tdf', r'\nu=n_1+n_2-2 || P(|T_\nu|>t_{\mathrm{crit}})=\alpha', r'\(\nu\) (pooled two-sample df); \(t_{\mathrm{crit}}\) (positive cutoff in the total two-tail column).')
rule('tdecision', r'|t|>t_{\mathrm{crit}}\quad\Rightarrow\quad\text{reject }H_0', r'For a two-sided test, compare the magnitude of t with the positive critical value; the sign describes direction.')
rule('onull', r'H_0:\mu=\mu_0', r'\(\mu\) (population mean being estimated); \(\mu_0\) (fixed reference).')
rule('gap', r'\Delta=\bar x-\mu_0', r'\(\Delta\) (signed mean-minus-reference difference); \(\bar x\) (observed sample mean).')
rule('onet', r't=\frac{\bar x-\mu_0}{s/\sqrt n}=\frac{\Delta}{\mathrm{SEM}}', r'\(s\) (sample SD); \(n\) (sample size); \(\mu_0\) (fixed reference). Divide the difference by SEM.')
rule('odf', r'\nu=n-1,\qquad P(|T_\nu|>t_{\mathrm{crit}})=\alpha', r'\(\nu\) (one-sample df); use the total two-sided significance level in the supplied t table.')
rule('pairse', r'\mathrm{SE}_{ij}=\sqrt{s_{\mathrm{wit}}^2\left(\frac1{n_i}+\frac1{n_j}\right)} || n_i=n_j=n:\quad\mathrm{SE}_{ij}=\sqrt{\frac{2s_{\mathrm{wit}}^2}{n}}', r'\(i,j\) (requested pair); \(s_{\mathrm{wit}}^2\) (variance from the full ANOVA); \(n_i,n_j\) (pair’s group sizes).')
rule('pairt', r'|t_{ij}|=\frac{|\bar x_i-\bar x_j|}{\mathrm{SE}_{ij}}', r'\(|\bar x_i-\bar x_j|\) (absolute pairwise gap); \(\mathrm{SE}_{ij}\) (shared-noise uncertainty of that gap).')
rule('pairdf', r'\nu=N-m=m(n-1)\quad(\text{balanced groups})', r'\(N\) (total subjects); \(m\) (all ANOVA groups). Keep the original ANOVA residual df for follow-ups.')
rule('family', r'k_{\mathrm{all}}=\frac{m(m-1)}2,\qquad k_{\mathrm{control}}=m-1', r'\(k\) (requested comparisons); \(m\) (groups, including control). Choose the family the question actually requests.')
rule('bonf', r'\alpha_{\mathrm{pair}}=\frac{\alpha_T}{k}', r'\(\alpha_T\) (overall significance level); \(k\) (requested comparisons). Use the same adjusted level for each pair.')
rule('bonftail', r'\alpha_{\mathrm{tail}}=\frac{\alpha_T}{2k},\qquad P(T_\nu\le t_{\mathrm{crit}})=1-\frac{\alpha_T}{2k}', r'Each two-sided tail gets half the pair’s level. The supplied two-tail t table instead labels its column by the full pair level.')
rule('holm', r'p_{(1)}\le\cdots\le p_{(k)},\qquad\alpha_j=\frac{\alpha_T}{k-j+1}', r'\(j\) (ordered rank, starting at 1); \(k\) (family size). Test smallest p first, retaining its pair label.')
rule('holmdecision', r'p_{(j)}<\frac{\alpha_T}{k-j+1}\quad\Rightarrow\quad\text{reject and continue}', r'At the first failed comparison, stop; that hypothesis and all remaining hypotheses are not rejected.')
rule('prop', r'\hat p=\frac{m}{n}', r'\(m\) (events); \(n\) (all subjects in that group); \(\hat p\) (estimated event probability).')
rule('binaryvar', r'\widehat{\operatorname{Var}}(X)=\hat p(1-\hat p)', r'\(X\) (zero-one outcome); \(\hat p\) (event fraction); \(1-\hat p\) (non-event fraction).')
rule('binarypop', r'E[X]=E[X^2]=p,\qquad\operatorname{Var}(X)=p(1-p)', r'\(X\) (population zero-one outcome); \(p\) (population probability of one). Squaring zero or one leaves its value unchanged.')
rule('binarysd', r'\widehat{\operatorname{SD}}(X)=\sqrt{\hat p(1-\hat p)}', r'This is spread among individual zero-one outcomes. It has no division by sample size.')
rule('propvar', r'\widehat{\operatorname{Var}}(\hat p)=\frac{\hat p(1-\hat p)}{n}', r'\(\hat p\) (estimated proportion); \(n\) (group size). Divide binary variance by n for variance of the proportion.')
rule('propse', r'\mathrm{SE}(\hat p)=\sqrt{\frac{\hat p(1-\hat p)}{n}}', r'SE (uncertainty in the estimated proportion); \(n\) (group size). Divide the individual binary variance by n, then square-root.')
rule('propnull', r'H_0:p_1=p_2', r'\(p_1,p_2\) (population event probabilities). Use the same event definition in both groups.')
rule('proppool', r'\hat p_0=\frac{m_1+m_2}{n_1+n_2}', r'\(m_1,m_2\) (event counts); \(n_1,n_2\) (group totals); \(\hat p_0\) (pooled event fraction under equality).')
rule('propdiffse', r'\mathrm{SE}_0=\sqrt{\hat p_0(1-\hat p_0)\left(\frac1{n_1}+\frac1{n_2}\right)}', r'\(\mathrm{SE}_0\) (null uncertainty of the proportion gap); use pooled \(\hat p_0\), rather than an unweighted average of proportions.')
rule('rawpropz', r'z=\frac{\hat p_1-\hat p_2}{\sqrt{s_1^2/n_1+s_2^2/n_2}}', r'Initial uncorrected form: \(s_i^2\) (estimated individual binary variance); \(n_i\) (group size). Both samples contribute uncertainty. The next steps pool under the null and apply the course’s Yates correction.')
rule('yatesgap', r'c_Y=\frac12\left(\frac1{n_1}+\frac1{n_2}\right) || D_Y=\max\bigl(0,|\hat p_1-\hat p_2|-c_Y\bigr)', r'\(c_Y\) (Yates correction on the proportion scale); \(D_Y\) (corrected gap). Subtract before dividing; do not let the gap become negative.')
rule('zprop', r'|z_Y|=\frac{D_Y}{\mathrm{SE}_0}', r'\(D_Y\) (corrected absolute gap); \(\mathrm{SE}_0\) (pooled null SE).')
rule('zdecision', r'P(|Z|>z_{\mathrm{crit}})=\alpha,\qquad |z_Y|>z_{\mathrm{crit}}\Rightarrow\text{reject }H_0', r'For the two-sided Normal comparison, use the infinity-df row of the supplied two-tail t table.')
rule('expected', r'E_{ij}=\frac{R_iC_j}{N}', r'\(O_{ij}\) (observed cell); \(E_{ij}\) (expected cell); \(R_i\) (row total); \(C_j\) (column total); \(N\) (grand total).')
rule('chicell', r'c_{ij}=\frac{(O_{ij}-E_{ij})^2}{E_{ij}}', r'For a table larger than 2×2: subtract expected from observed, square the gap, then divide by that cell’s expected count.')
rule('yatescell', r'c_{ij}=\frac{\max(0,|O_{ij}-E_{ij}|-0.5)^2}{E_{ij}}', r'For a 2×2 table: shrink the absolute observed–expected count gap by half a count before squaring, then divide by expected.')
rule('chisum', r'\chi^2=\sum_i\sum_j c_{ij}', r'\(c_{ij}\) (each cell’s contribution). Add every cell’s term, with no further division.')
rule('chidf', r'\nu=(r-1)(c-1),\qquad P(\chi^2_\nu>\chi^2_{\mathrm{crit}})=\alpha', r'\(r,c\) (numbers of rows and columns); \(\nu\) (df). Use the upper-tail column of the chi-square table.')
rule('chidecision', r'\chi^2>\chi^2_{\mathrm{crit}}\quad\Rightarrow\quad\text{reject }H_0', r'A large total discrepancy supports different outcome distributions. Match the statistic and cutoff’s df.')
rule('gofexpected', r'E_i=Np_i', r'\(p_i\) (specified target probability); \(N\) (sample total); \(E_i\) (expected count for category i).')
rule('gof', r'\chi^2=\sum_{i=1}^k\frac{(O_i-E_i)^2}{E_i},\qquad\nu=k-1', r'\(O_i,E_i\) (observed and target-expected category counts); \(k\) (fixed categories, no estimated target parameters).')
rule('rr', r'\mathrm{RR}=\frac{r_T}{r_C}', r'\(r_T\) (treatment event risk); \(r_C\) (control event risk). Put the named comparison group in the numerator.')
rule('risks', r'r_T=\frac{m_T}{n_T},\qquad r_C=\frac{m_C}{n_C}', r'\(m_T,m_C\) (same adverse-event counts); \(n_T,n_C\) (respective group totals). Risk uses events divided by everyone in the group.')
rule('arr', r'\mathrm{ARR}=r_C-r_T', r'ARR (absolute adverse-event risk reduction); risks must be probabilities on the 0–1 scale.')
rule('rrr', r'\mathrm{RRR}=1-\mathrm{RR}', r'RRR (relative reduction); RR (treatment risk divided by control risk). A relative reduction differs from a percentage-point difference.')
rule('nnt', r'\mathrm{NNT}=\frac1{\mathrm{ARR}}', r'NNT (number treated per additional avoided adverse event). Use the absolute probability difference; round upward if asked for whole people.')
rule('ari', r'\mathrm{ARI}=r_E-r_C', r'\(r_E\) (exposed adverse-event risk); \(r_C\) (comparison risk); ARI (absolute increase).')
rule('nnh', r'\mathrm{NNH}=\frac1{\mathrm{ARI}}', r'NNH (number exposed per additional adverse event). Use a positive absolute increase as a probability.')
rule('odds', r'\mathrm{odds}_1=\frac ab,\qquad\mathrm{odds}_2=\frac cd', r'For a labeled 2×2 table with rows \((a,b),(c,d)\), form the requested within-row odds using the two categories.')
rule('or', r'\mathrm{OR}=\frac{a/b}{c/d}=\frac{ad}{bc}', r'\(a,b,c,d\) (cells of the same labeled 2×2 table). Divide the requested group’s odds by the comparison group’s odds.')
rule('ad', r'P_1=ad', r'\(a,d\) (first diagonal cells); \(P_1\) (numerator product for the chosen table orientation).')
rule('bc', r'P_2=bc', r'\(b,c\) (second diagonal cells); \(P_2\) (denominator product). Keep row and column labels fixed.')
rule('pdecision', r'p_{\mathrm{value}}<\alpha\quad\Rightarrow\quad\text{reject }H_0', r'\(p_{\mathrm{value}}\) (reported tail probability under the null); \(\alpha\) (chosen significance level).')
rule('tlookup', r'P(|T_\nu|>t_{\mathrm{crit}})=\alpha,\qquad P(T_\nu\le t_{\mathrm{crit}})=1-\alpha/2', r'\(\nu\) (entered degrees of freedom); \(\alpha\) (total two-tail level). Split the level equally between tails to find the positive cutoff.')
rule('flookup', r'P(F_{\nu_1,\nu_2}>F_{\mathrm{crit}})=\alpha', r'\(\nu_1\) (entered numerator df); \(\nu_2\) (entered denominator df); \(\alpha\) (upper-tail probability).')
rule('chilookup', r'P(\chi^2_\nu>\chi^2_{\mathrm{crit}})=\alpha', r'\(\nu\) (entered degrees of freedom); \(\alpha\) (upper-tail probability).')
rule('zlookup', r'P(|Z|>z_{\mathrm{crit}})=\alpha,\qquad\Phi(z_{\mathrm{crit}})=1-\alpha/2', r'\(Z\) (standard Normal variable); \(\alpha\) (total two-tail level); \(z_{\mathrm{crit}}\) (positive cutoff).')
rule('variancefromsd', r's^2=(s)^2', r'\(s\) (sample SD); \(s^2\) (sample variance). Square the standard deviation.')
rule('outf', r'F=\frac{\mathrm{MS}_{\mathrm{Group}}}{\mathrm{MS}_{\mathrm{Residual}}},\qquad s_{\mathrm{wit}}^2=\mathrm{MS}_{\mathrm{Residual}}', r'MS (mean square printed in the ANOVA output). Residual Mean Sq supplies the noise variance; retain its residual df for follow-ups.')
rule('sumss', r'\mathrm{SS}_{\mathrm{wit}}=\sum_j\sum_i(x_{ij}-\bar x_j)^2 || \mathrm{MS}_{\mathrm{wit}}=\frac{\mathrm{SS}_{\mathrm{wit}}}{N-m}', r'Reference section: \(x_{ij}\) (subject i in group j); \(N\) (all subjects); \(m\) (groups).')
rule('betss', r'\mathrm{SS}_{\mathrm{bet}}=\sum_j n_j(\bar x_j-\bar{\bar x})^2 || \mathrm{MS}_{\mathrm{bet}}=\frac{\mathrm{SS}_{\mathrm{bet}}}{m-1},\quad F=\frac{\mathrm{MS}_{\mathrm{bet}}}{\mathrm{MS}_{\mathrm{wit}}}', r'Reference section: \(n_j\) (group size); mean squares divide each squared-distance total by its df.')
rule('power', r'\mathrm{Power}=1-\beta', r'Optional Session 14: \(\beta\) (probability of failing to reject when the specified alternative is true).')
rule('effect', r'd=\frac{|\mu_1-\mu_2|}{\sigma}', r'Optional Session 14: \(d\) (standardized mean effect); \(\sigma\) (common individual SD).')
rule('effectback', r'\delta=d\sigma || \delta=0.9(35)=31.5\ \mathrm{mg/dL}', r'Optional cholesterol example: \(d\) (effect-to-SD ratio from the graph); \(\sigma=35\) mg/dL (population SD); \(\delta\) (detectable difference in measurement units).')

# Slide-specific substitutions. Values come from the original slides or their
# displayed inputs, with full-precision arithmetic checked independently.
rule('percentile30', r'R=1+\frac{30(5-1)}{100}=2.2 || x_{30}=7+0.2(8-7)=7.2', r'Sorted values: 3, 7, 8, 9, 14. The rank’s integer part selects 7; its fractional part selects one fifth of the gap to 8.')
rule('hrbox', r'\mathrm{IQR}=80-61.5=18.5\ \mathrm{BPM}', r'Class heart-rate box: \(Q_1=61.5\), \(Q_3=80\) BPM. Subtract the lower edge from the upper edge.')
rule('shiftmean', r'Y=a+bX\quad\Rightarrow\quad E[Y]=a+bE[X]', r'\(a\) (added constant); \(b\) (multiplier). The new mean is the old mean multiplied by b, then shifted by a.')
rule('piececdf', r'F(x)=\begin{cases}0&x<0\\x^2/2&0\le x<1\\2x-x^2/2-1&1\le x<2\\1&x\ge2\end{cases}', r'For \(f(x)=x\) on 0–1 and \(f(x)=2-x\) on 1–2. The second piece includes the first triangle’s area of 1/2.')
rule('uniform2040', r'\mu=\frac{20+40}{2}=30 || \sigma^2=\frac{(40-20)^2}{12}=\frac{100}{3}', r'Uniform support: 20 to 40. The variance is in squared measurement units; its SD is the square root of this value.')
rule('hrwithin', r's_{\mathrm{wit}}^2=\frac{7.3^2+9.1^2}{2}=68.05', r'Heart-rate groups: SDs 7.3 and 9.1 BPM. Square before averaging.')
rule('hrgrand', r'\bar{\bar x}=\frac{74.2+76.8}{2}=75.5', r'Two equally sized heart-rate groups; the grand mean is 75.5 BPM.')
rule('hrmeansvar', r's_{\bar x}^2=\frac{(74.2-75.5)^2+(76.8-75.5)^2}{2-1}=3.38', r'Two group means give a divisor of one. This variance describes means, before rescaling by the five students per group.')
rule('hrbetween', r's_{\mathrm{bet}}^2=5(3.38)=16.9', r'Five students contribute to each mean; multiply the variance of means by five.')
rule('hrf', r'F=\frac{16.9}{68.05}\approx0.24835 || \nu_1=2-1=1,\qquad\nu_2=2(5-1)=8', r'Heart-rate ANOVA: compare this ratio with the F cutoff using numerator df 1 and denominator df 8.')
rule('glucosepool', r's_p^2=\frac{24(2.49^2)+24(2.09^2)}{48}=5.2841', r'Glucose groups each have 25 children; each variance receives weight 24.')
rule('glucoset', r'\mathrm{SE}_{\Delta}=\sqrt{5.2841(1/25+1/25)}\approx0.650175 || t=\frac{82.2-86.1}{0.650175}\approx-5.99838,\qquad\nu=48', r'Keep the control-minus-comparison order in the mean gap. Use the magnitude for a two-sided decision.')
rule('cardiacpool', r's_p^2=\frac{8(1.05^2)+15(0.88^2)}{23}\approx0.888522', r'Cardiac-index groups: sizes 9 and 16. Their variance weights are 8 and 15, rather than equal weights.')
rule('cardiact', r'\mathrm{SE}_{\Delta}=\sqrt{0.888522(1/9+1/16)}\approx0.392756 || t=\frac{2.08-1.75}{0.392756}\approx0.840216,\qquad\nu=23', r'The same cardiac-index mean gap, pooled variance and group sizes determine the t statistic and its df.')
rule('hronet', r'\mathrm{SEM}=\frac{4.15}{\sqrt5}\approx1.855936 || t=\frac{76.8-72}{1.855936}\approx2.58630,\qquad\nu=5-1=4', r'One-sample HR example: mean 76.8, reference 72 BPM, sample SD 4.15 and five observations.')
rule('hdlse', r'\mathrm{SE}_{ij}=\sqrt{\frac{2(239.9)}{70}}\approx2.61807,\qquad\nu=207', r'HDL comparisons use the full ANOVA’s within variance, common group size and residual df.')
rule('hdlpairs', r'|t_{13}|=\frac{64.8-43.3}{2.61807}\approx8.21216 || |t_{23}|=\frac{58.0-43.3}{2.61807}\approx5.61483 || |t_{12}|=\frac{64.8-58.0}{2.61807}\approx2.59733', r'Labels: 1 (runners), 2 (joggers), 3 (inactive). Only retain the pairs requested by the question.')
rule('hdlbonf', r'\alpha_{\mathrm{pair}}=\frac{0.05}{3}\approx0.016667', r'All three HDL pairs form a family of three. Each two-sided test uses this same total pair level.')
rule('hdlcontrol', r'k=3-1=2,\qquad\alpha_{\mathrm{pair}}=\frac{0.05}{2}=0.025', r'Against inactive control only: two requested comparisons, rather than all three HDL pairs.')
rule('holmfive', r'\alpha_1=.05/5=.01,\quad\alpha_2=.05/4=.0125 || \alpha_3=.05/3\approx.016667', r'Ordered t magnitudes: 3.3, 2.9, 2.3, 2.2, 2.1; residual df 46. The first two pass; the third fails, ending the sequence.')
rule('halothane', r'\hat p=\frac8{61}\approx.131148 || \hat p(1-\hat p)\approx.113948 || \mathrm{SE}(\hat p)=\sqrt{\frac{.113948}{61}}\approx.0432203', r'Eight deaths among 61 patients. Recompute binary spread from the event fraction before dividing by sample size.')
rule('aspirinpool', r'\hat p_1=18/25=.72,\quad\hat p_2=6/19\approx.315789 || \hat p_0=\frac{18+6}{25+19}=\frac{24}{44}\approx.545455', r'The event is thrombus in both groups. Pool event counts and group totals under the equal-proportions null.')
rule('aspirinz', r'\mathrm{SE}_0=\sqrt{\frac{24}{44}\frac{20}{44}\left(\frac1{25}+\frac1{19}\right)}\approx.151547 || D_Y=\left|\frac{18}{25}-\frac6{19}\right|-\frac12\left(\frac1{25}+\frac1{19}\right)\approx.357895 || |z_Y|=\frac{.357895}{.151547}\approx2.36161', r'Subtract the continuity adjustment from the absolute thrombus-rate gap, then divide by the pooled null SE.')
rule('aspirinchi', r'\chi_Y^2\approx1.094697+1.313636+1.440391+1.728469 || \chi_Y^2\approx5.577193,\qquad\nu=1 || z_Y^2=\chi_Y^2', r'These are the four corrected cell contributions from the same aspirin/placebo table. Their sum agrees with the squared corrected z.')
rule('smokeor', r'\mathrm{OR}=\frac{50/14}{43/35}=\frac{50(35)}{14(43)}\approx2.90698', r'Cases: 50 exposed, 14 unexposed. Controls: 43 exposed, 35 unexposed. Divide case exposure odds by control exposure odds.')
rule('ocor', r'\mathrm{OR}=\frac{13/4987}{7/9993}=\frac{13(9993)}{4987(7)}\approx3.72136', r'OC users: 13 MI, 4987 no MI. Nonusers: 7 MI, 9993 no MI. Retain that table orientation.')
rule('aspirinnnt', r'\mathrm{ARR}=\frac{18}{25}-\frac6{19}\approx.404211 || \mathrm{NNT}=\frac1{\mathrm{ARR}}\approx2.47396\quad\Rightarrow\quad3\text{ whole people}', r'Use the unrounded absolute risk reduction before taking its reciprocal; round upward only for a requested whole-person count.')
rule('baselinebenefit', r'\mathrm{RR}=\frac{8/1000}{10/1000}=.8,\qquad\mathrm{RRR}=1-.8=.2 || \mathrm{ARR}=\frac{10-8}{1000}=.002,\qquad\mathrm{NNT}=1/.002=500', r'The relative reduction is 20%, while the absolute reduction is two events per thousand.')
rule('benefitharm', r'\frac{500\text{ people treated}}{20\text{ people per added harm}}=25\text{ added harms}', r'In this example NNT is 500 and NNH is 20. Put the benefit and harm rates on the same patient-count scale.')

# Each distinct step label is explicitly assigned, including conceptual steps
# that should not acquire an unrelated equation. Shared labels within a topic
# perform the same operation, across all their different numerical exercises.
step_rules = {}
def steps(topic, mapping):
    for labels, keys in mapping:
        for label in labels.split('|'):
            assert (topic,label) not in step_rules, (topic,label)
            step_rules[topic,label] = keys.split() if keys else []
steps('summary', [
 ('Add and average','mean'),('Subtract the mean','deviation'),('Square those differences','squares'),('Add squared deviations','ss'),('Divide by n−1|Compare the sample formula','samplevar'),('Return to original units','sd'),('Find uncertainty of the mean','sem'),('Average','popmean'),('Square distances from μ','popss'),('Divide by population size','popvar')])
steps('percentile',[('Locate the rank|Calculate rank','rank'),('Read the ranked observation|Check for interpolation|Identify brackets|Interpolate','interpolate')])
steps('classification',[('Ask what the code means|Check for natural order|Name the scale','')])
steps('random',[('Count all sequences','sequences'),('List the favorable sequences','count'),('Divide','count')])
steps('independent',[('First draw|Update the deck','count'),('Multiply dependent steps','conditional')])
steps('pmf',[('Add all probabilities|Set total equal to one|Check nonnegativity','validpmf')])
steps('dcdf',[('Read the definition|Select possible values|Add their masses','dcdf')])
steps('expect',[('Check the probability function|Check the total','validpmf'),('Multiply values by probabilities|Weighted mean','ex'),('Square values before weighting|Weighted square','ex2'),('Subtract square of the mean|Variance','var'),('Interpret','rvsd dcdf')])
steps('linear',[('Transform the means','linearmean'),('Square coefficients for variance|Add independent variance contributions','linearvar'),('Find SD if requested','rvsd')])
steps('uniform',[('Full support width|Full width','uheight'),('Desired interval width|Requested width|Divide widths|Divide','uwidth'),('Center and spread','umoments')])
steps('integrate',[('Set full area equal to one','area'),('Integrate term by term','powerint integral'),('Clear the fraction','area'),('Factor and choose the positive endpoint','quadratic')])
steps('ccdf',[('Check total area','area integral'),('Accumulate to x|Integrate the density','ccdf'),('Use the CDF for probability','ccdf tails'),('Weight the density by x','cex'),('Compute the square expectation','cex2'),('Use the variance shortcut','var'),('Find the middle-area cutoff|Set the middle area','medianarea'),('Solve for the positive median','triangular'),('Extra checks','trimoments')])
steps('normalprob',[('Standardize the lower endpoint|Standardize the upper endpoint','z'),('Read left-tail areas','phi'),('Subtract lower area from upper','normalinterval'),('Describe the area','')])
steps('normalquant',[('Find the standard cutoff','zquant'),('Undo standardization|Calculate','quantile'),('Check direction','')])
steps('sampling',[('Use the mean’s spread|Identify a mean|Substitute|Calculate|Distinguish the denominator','meanse'),('Standardize the sample mean','meanz'),('Take the right tail','meanright')])
steps('estimators',[('Compare sample sizes|Apply the square-root rule|Calculate','sechange')])
steps('anova',[('State H0','hmean'),('Average the group variances','within'),('Average the group means','grand'),('Find variance of the group means','meansvar'),('Multiply by group size','between'),('Build the F ratio','f'),('Use the correct F table coordinates','fdf'),('Conclude in context','fdecision')])
steps('pooledt',[('State H0','hmean'),('Square the SDs','squaredsds'),('Pool by degrees of freedom','pool'),('Build the SE of the difference','diffse'),('Calculate signed t','twot'),('Use magnitude for a two-sided test','tdf tdecision'),('Conclude','tdecision')])
steps('onet',[('State H0','onull'),('Calculate SEM','sem'),('Subtract the reference','gap'),('Divide by SEM','onet'),('Find df and cutoff','odf'),('Conclude','tdecision')])
steps('posthoc',[('Reuse the ANOVA variance','pairse'),('Divide the gap by this SE','pairt'),('Next decision','pairdf bonf')])
steps('bonferroni',[('Count the family','family bonf'),('Reuse the ANOVA denominator','pairse pairdf'),('Compute pair statistics','pairt'),('Read the adjusted two-tail cutoff|For two-sided t','bonftail'),('Compare and name the pair','tdecision'),('Count the specified family','family'),('Divide the total level','bonf')])
steps('holm',[('Sort smallest p first|First cutoff|Second cutoff|Third cutoff|First rank|Second rank','holm holmdecision'),('Count rejections|Do not restart at the third rank','holmdecision')])
steps('trials',[('Identify assignment|Identify knowledge|Choose','')])
steps('binary',[('Event fraction|Calculate event proportion','prop'),('Binary variance estimate|Multiply by its complement','binaryvar'),('Variance of the estimated proportion','propvar'),('Take the square root|Divide by the square root of sample size','propse'),('Take the Bernoulli SD','binarysd')])
steps('zprop',[('State H0','propnull'),('Calculate group proportions','prop'),('Pool the counts','proppool'),('Calculate the pooled SE','propdiffse'),('Apply Yates correction','yatesgap'),('Divide and compare','zprop zdecision'),('Conclude','zdecision')])
steps('chi',[('State H0',''),('Build expected counts','expected'),('Calculate each cell contribution','chicell'),('Add all contributions','chisum'),('Get degrees of freedom and cutoff','chidf'),('Conclude','chidecision')])
steps('gof',[('State H0',''),('Multiply target probabilities by total','gofexpected'),('Calculate contributions|Add and find df','gof'),('Use the upper-tail reference','chidecision'),('Explain','')])
steps('risk',[('Write event risks|Find both event risks','risks'),('Divide to get relative risk|Compare risks by a ratio|Place the named numerator first|Divide','rr'),('Subtract for absolute reduction|Find absolute reduction','arr'),('Invert the absolute reduction','nnt'),('Absolute change and NNT','arr nnt'),('Distinguish the ratio from a whole-person count|Explain','')])
steps('nnt',[('Find absolute risk increase','ari'),('Invert the increase','nnh'),('Explain','')])
steps('odds',[('Label row odds|Find exposure odds within each outcome group','odds'),('Divide odds|Check with diagonal products|Divide|Divide the odds|Use diagonal products','or'),('First diagonal','ad'),('Second diagonal','bc'),('Explain|State the comparison','')])
steps('rcode',[('Identify the test','twot tdf'),('Compare p with α','pdecision'),('State the result','')])
problem_map={}
for p in D['problems']:
    assigned=[]
    for s in p['steps']:
        key=(p['topic'],s['label'])
        assert key in step_rules, (p['id'],key)
        keys=step_rules[key]
        if key==('chi','Calculate each cell contribution'):
            table=json.loads(p['given']['observed table'])
            keys=['yatescell' if len(table)==2 and len(table[0])==2 else 'chicell']
        assigned.append(keys)
    problem_map[p['id']]=assigned

# Source-worked examples: insert the symbolic rule immediately before the
# selected original display, rather than adding a formula list above the example.
worked={}
def block(key, placements):
    assert key not in worked
    displays=__import__('re').findall(r'\\\[([\s\S]*?)\\\]',V['blocks'][key]['html'])
    for index,keys in placements.items():
        assert 0<=index<len(displays),(key,index,len(displays))
    worked[key]={str(i):keys.split() for i,keys in placements.items()}
block('describe',{0:'mean',1:'deviation squares',3:'ss',4:'samplevar sd',5:'sem'})
block('percent',{0:'rank',1:'interpolate',3:'iqr'})
block('discrete',{0:'validpmf ex ex2',3:'var',5:'dcdf'})
block('depend',{0:'count',1:'conditional'})
block('continuous',{0:'area integral',1:'ccdf',2:'ccdf',3:'tails',4:'cex',5:'cex2',6:'var',7:'medianarea'})
block('endpoint',{0:'area powerint',2:'quadratic',3:'ccdf'})
block('normalwork',{0:'z',1:'z',2:'phi',3:'phi',4:'interval',5:'tails'})
block('inverse',{0:'zquant',1:'quantile'})
block('sampling',{2:'meanse',3:'meanz',4:'meanz',5:'interval'})
block('anova',{0:'within',2:'grand',3:'meansvar',5:'meansvar',6:'between',7:'f',8:'fdf'})
block('pooled',{3:'squaredsds',4:'pool',5:'diffse',6:'twot',7:'tdf tdecision'})
block('unequal',{0:'tdf',1:'pool',3:'diffse',4:'twot'})
block('onet',{0:'sem',1:'gap',2:'onet',3:'odf tdecision'})
block('pairs',{3:'pairse',4:'pairt',5:'pairt',6:'pairt'})
block('z',{0:'prop',1:'proppool',3:'propdiffse',5:'yatesgap',8:'zprop zdecision'})
block('chi2',{1:'expected',3:'yatescell',5:'chidf chidecision'})
block('large',{0:'expected',2:'chicell',5:'chidf chidecision'})
block('gof',{1:'gof',4:'chidecision'})
block('risk',{0:'risks',1:'arr',2:'nnt',3:'or'})
block('output',{0:'holm',1:'chidf',2:'chidecision',3:'chidecision'})
block('anovaoutput',{0:'outf pdecision'})
block('proportionwork',{0:'prop',1:'binaryvar',2:'binarysd',3:'propse'})
block('functionmean',{1:'cex',2:'linearmean'})
block('uniform-worked',{0:'ccdf',1:'cex',2:'cex2',3:'var'})
block('uniform',{3:'ccdf',4:'cex',5:'cex2',6:'var'})
# These already state the rule explicitly, or teach a noncalculation concept.
worked_reviewed = {
 'language':'notation definitions', 'classify':'data-scale decisions',
 'normal':'density and standardization definitions', 'linear':'explicit transformation rules',
 'tables':'table conventions and stated cutoffs', 'ti':'calculator inputs; symbolic denominator retained',
 'decision':'hypothesis/decision sequence', 'chooser':'design and test selection',
 'multiplicity':'explicit Bonferroni/Holm formulas', 'binary':'explicit binary formulas',
 'trial':'study-design concepts', 'cltwhy':'explicit variance derivation',
 'uniform-definition':'explicit Uniform definitions',
}
assert set(worked)|set(worked_reviewed)==set(V['blocks'])

# Slide and paragraph assignments are authored separately below. No topic-level
# fallback: title pages, designs and plot-reading pages can remain conceptual.
slides={}
def slide(mid, page, at, keys):
    key=f'{mid}:{page}'
    assert key in C['slides'],key
    assert 0<=at<len(C['slides'][key]['paragraphs'])
    entry=slides.setdefault(key,{})
    assert str(at) not in entry,(key,at)
    entry[str(at)]=keys.split()
def pages(mid, numbers, at, keys):
    for page in numbers: slide(mid,page,at,keys)

# Filled with individually reviewed original-page assignments, not generated
# from module topic labels. The accompanying JSON records every page's status.
exec((ROOT/'authoring'/'equation_slide_placements.py').read_text())

lessons={
 'summary':{'0':['mean'],'1':['samplevar','sd'],'2':['sem']},
 'percentile':{'1':['rank','interpolate'],'2':['iqr']},
 'random':{'2':['sequences','count']},'independent':{'1':['conditional','independent']},
 'pmf':{'0':['validpmf']},'dcdf':{'1':['dcdf']},'expect':{'1':['ex']},
 'variance':{'1':['var']},'linear':{'1':['linearmean','linearvar']},
 'density':{'1':['area','interval']},'uniform':{'1':['uwidth'],'2':['umoments']},
 'integrate':{'1':['powerint','integral']},'ccdf':{'0':['ccdf'],'1':['tails','interval'],'2':['medianarea']},
 'cexpect':{'1':['cex','cex2','var']},'normal':{'1':['z']},
 'normalprob':{'1':['normalinterval','normalright']},'normalquant':{'1':['zquant','quantile']},
 'sampling':{'1':['meanvar','meanse'],'2':['meanz']},'estimators':{'1':['unbiased'],'2':['sechange']},
 'distributions':{'1':['tdf','fdf','chidf']},'hypothesis':{'2':['pdecision']},
 'anova':{'0':['hmean'],'1':['within','grand','meansvar','between','f'],'2':['fdf']},
 'anovaSS':{'1':['sumss','betss']},'pooledt':{'1':['pool','diffse'],'2':['twot','tdf']},
 'onet':{'1':['sem','onet'],'2':['odf']},'posthoc':{'1':['pairse','pairt','pairdf'],'2':['family']},
 'bonferroni':{'1':['bonf','bonftail']},'holm':{'1':['holm'],'2':['holmdecision']},
 'binary':{'0':['prop'],'1':['binaryvar'],'2':['propse']},
 'zprop':{'1':['proppool','propdiffse'],'2':['yatesgap','zprop']},
 'yates':{'1':['yatesgap','yatescell']},'contingency':{'1':['expected']},
 'chi':{'0':['chicell','chisum'],'1':['yatescell','chidf'],'2':['chidecision']},
 'gof':{'1':['gofexpected','gof']},'risk':{'1':['rr','arr']},
 'nnt':{'0':['nnt'],'1':['ari','nnh']},'odds':{'1':['odds','or']},
 'rcode':{'1':['outf'],'2':['pdecision']},'power':{'1':['power']},
}

# Concept questions have explicit, question-specific placements. Numerical
# questions reuse their own complete step solution, not a topic summary.
question_rules={}
def questions(ids, keys):
    for id in ids.split(): question_rules[id]=keys.split()
questions('q4','sem');questions('q5','samplevar');questions('q6','variancefromsd')
questions('q8','rank interpolate');questions('q11 q14','independent')
questions('q13','conditional');questions('q15','validpmf');questions('q16','ex')
questions('q17 q18','dcdf');questions('q19','ex2');questions('q20','var')
questions('q21 q22 q23','linearvar');questions('q24','point');questions('q25 q27','area')
questions('q26','uwidth');questions('q28','tails');questions('q29','medianarea')
questions('q30','cex');questions('q31','rvsd');questions('q32','z')
questions('q33','tails');questions('q34','interval');questions('q35','quantile')
questions('q36 q37 q38','meanvar meanse');questions('q39','sechange');questions('q40','unbiased')
questions('q42','fdecision');questions('q43','onet');questions('q44','pool twot')
questions('q47','hmean');questions('q48','within');questions('q49','between')
questions('q51','fdf');questions('q52','tdf');questions('q54','odf');questions('q55','tdecision')
questions('q56','pairse pairdf');questions('q57','family');questions('q58','bonf')
questions('q59','bonftail');questions('q60 q61','holm holmdecision')
questions('q65','binarypop');questions('q66','prop');questions('q67','proppool')
questions('q68','yatescell');questions('q69','zprop yatescell chisum')
questions('q70 q71','expected');questions('q72','chidf');questions('q73','yatescell bonf holm')
questions('q74 q75','gofexpected gof');questions('q77','risks');questions('q78','rr')
questions('q79','nnt');questions('q80','nnh');questions('q81 q82','or')
questions('q83','zquant phi');questions('q84','pdecision')
questions('review-output-1 review-output-3','outf pairdf')
questions('review-output-2','pdecision');questions('review-output-4','family')
questions('review-output-5','holm');questions('review-output-6','yatescell')
questions('review-output-7 review-output-8','tdecision')
questions('review-output-9','z phi');questions('review-output-10','zquant quantile')
questions('review-output-11','zdecision');questions('review-output-12','family bonf holm')

for mapping in [problem_map,lessons,slides,worked]:
    for key,items in mapping.items():
        for keys in (items.values() if isinstance(items,dict) else items):
            assert all(k in rules for k in keys),(key,keys)
pack=dict(rules=rules,problems=problem_map,worked=worked,slides=slides,lessons=lessons,questions=question_rules,
    rrefs=[['normalinterval','quantile','meanright'],['within','between','f','fdf'],['pool','twot','onet','bonftail','holm'],['expected','yatescell','chisum','gof'],[],['mean','samplevar','sd','sem','rank']])
(ROOT/'equation-guide-data.js').write_text('const EQUATION_GUIDE='+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
report=dict(problems=[dict(id=p['id'],topic=p['topic'],steps=[dict(label=s['label'],equations=keys,kind='calculation' if keys else 'concept or interpretation') for s,keys in zip(p['steps'],problem_map[p['id']])]) for p in D['problems']],
    worked=[dict(key=k,placements=worked.get(k,{}),review=worked_reviewed.get(k,'Equations placed beside individual substitutions')) for k in V['blocks']],
    slides=[dict(page=k,title=s['title'],placements=slides.get(k,{}),kind='equations beside explanation' if k in slides else 'concept, design, orientation, or visual interpretation; no worked calculation') for k,s in C['slides'].items()])
(ROOT/'equation-coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(f"Equation guide: {len(rules)} rules; {len(problem_map)} problems / {sum(len(x) for x in problem_map.values())} steps; {len(V['blocks'])} worked blocks; {len(C['slides'])} slides reviewed ({len(slides)} with inline placements).")
