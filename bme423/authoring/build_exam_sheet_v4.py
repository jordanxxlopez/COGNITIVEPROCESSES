"""Four full pages of source-based equations and worked methods.

Version 4 is independent of every earlier print pack and teaching version.
"""
from pathlib import Path
import html, json, re, hashlib
from build_v4_figures import build as build_figures
R=Path(__file__).resolve().parents[1]
GRAPHS=build_figures(R)
OUT=json.loads((R/'exam-sheet-v4-r-output.json').read_text())
B={}
def p(s):return '<p>'+s+'</p>'
def eq(s):return r'\['+s+r'\]'
def steps(*s):return '<ol>'+''.join('<li>'+x+'</li>' for x in s)+'</ol>'
def fields(trigger,formula,do,worked,table,write,trap):
 # The numerical sequence is the step list; the working is not printed twice.
 # General actions stay in the authoring source for review.
 index=0
 def number(match):
  nonlocal index
  index+=1
  return '<div class="worked-step"><span class="step-number">'+str(index)+'.</span>'+match.group(0)+'</div>'
 worked=re.sub(r'\\\[[\s\S]*?\\\]',number,worked)
 return (p('<b>TRIGGER</b> '+trigger)+p('<b>FORMULA</b>')+formula+
         p('<b>NUMBERED WORKED STEPS</b>')+'<div class="worked-sequence">'+worked+'</div>'+
         (p('<b>TABLE</b> '+table) if table else '')+
         p('<b>WRITE</b> '+write)+p('<b>TRAP</b> '+trap))
def add(k,title,body,topics,sources):B[k]={'title':title,'html':body,'topics':topics,'sources':sources}
def excerpt(k,keep):
 lines=OUT['outputs'][k].splitlines()
 return '<pre class="r-print">'+html.escape('\n'.join(x for x in lines if keep(x)))+'</pre>'
def chi_print(k):return excerpt(k,lambda x:('test' in x or 'correction' in x or 'X-squared' in x or 'df =' in x))

add('data','DATA TYPE + SYMBOL KEY',
 p('<b>TRIGGER</b> Classify a measurement or choose a test.')+
 p('<b>STEPS</b> 1. Measured on a numerical scale? Continuous: height/BP; discrete: number of tender joints. 2. Categories? Ordered: cancer stage/Apgar; nominal: country/ZIP/event. Numbered categories need not have equal gaps.')+
 p(r'<b>SYMBOLS</b> \(X\): random measurement; \(x_i\): observation; \(\bar x\): sample mean; \(\mu\): population mean; \(s,\sigma\): sample/population SD; \(s^2,\sigma^2\): variances; \(n\): sample count; \(\nu\): df; \(\alpha\): significance level; \(f\): mass/density; \(F\): CDF.')+
 p('<b>WRITE</b> Height: interval-continuous; ZIP: categorical-nominal.')+
 p('<b>TRAP</b> A numerical label is not automatically a measured amount.'),['classification','start','choose'],['session2.pdf','hw1.pdf:1'])

add('summary','RAW LIST → MEAN, VARIANCE, SD, SEM',fields(
 'A list of measurements; estimate center, spread, or error in the estimated mean.',
 eq(r'\bar x=\frac{\sum x_i}{n},\quad s^2=\frac{\sum(x_i-\bar x)^2}{n-1}')+eq(r's=\sqrt{s^2},\qquad\mathrm{SEM}=\frac{s}{\sqrt n}'),
 ['Add observations; divide by count.','Subtract the mean; square each distance.','Add squared distances; divide by one fewer observation.','Square-root for SD; divide SD by square-root of count for SEM.'],
 p(r'Heights: \(65,69,59,64,62,67,68,62,64,65\).')+
 eq(r'\sum x_i=645,\quad n=10,\quad\bar x=645/10=64.5')+
 eq(r'\begin{array}{c|rrrrr}x_i&65&69&59&64&62\\x_i-64.5&.5&4.5&-5.5&-.5&-2.5\\(x_i-64.5)^2&.25&20.25&30.25&.25&6.25\\\hline x_i&67&68&62&64&65\\x_i-64.5&2.5&3.5&-2.5&-.5&.5\\(x_i-64.5)^2&6.25&12.25&6.25&.25&.25\end{array}')+
 eq(r'\sum(x_i-\bar x)^2=82.5,\quad s^2=82.5/9=9.16667')+
 eq(r's=\sqrt{9.16667}=3.02765')+eq(r'\mathrm{SEM}=3.02765/\sqrt{10}=.957427')+
 p(r'Equivalent squared-sum shortcut:')+eq(r'\sum x_i^2-\frac{(\sum x_i)^2}{n}=41685-645^2/10=82.5')+
 p('Full-population formulas:')+eq(r'\mu=\frac{\sum x_i}{N},\quad\sigma^2=\frac{\sum(x_i-\mu)^2}{N}'),
 '', 'Estimated population mean: 64.5 inches; individual SD: 3.02765 inches; mean-estimation error (SEM): .957427 inch.',
 r'SD describes individuals; SEM describes sample means. Entire population measured? Use \(N\) and divide squared distances by \(N\), not \(n-1\).'),
 ['summary','estimators'],['hw1.pdf:4','session2.pdf'])

add('percentile','SAMPLE PERCENTILE + DATA DISPLAY',fields(
 'A sorted/raw list and a requested percentile, median, IQR or shape.',
 p(r'\(p\): percent; \(I\): integer rank; \(d\): fractional rank; parentheses denote sorted order.')+
 eq(r'r=1+\frac{p(n-1)}{100}=I+d')+eq(r'x_p=x_{(I)}+d[x_{(I+1)}-x_{(I)}]'),
 ['Sort low to high.','Find rank; take its integer and fractional parts.','Move that fraction from the lower observation to the next.'],
 p(r'Sorted \(3,7,8,9,14\); 30th percentile:')+
 eq(r'r=1+30(5-1)/100=2.2')+eq(r'x_{30}=7+.2(8-7)=7.2')+
 p('Median: middle value for odd count; average two middle values for even count. IQR: Q3 minus Q1. Range: minimum to maximum; width: maximum minus minimum.'),
 '', 'The 30th sample percentile is 7.2. A roughly straight Normal Q–Q plot supports a Normal shape.',
 'Histogram: bin counts; box: Q1–Q3 with median; whisker rule: 1.5×IQR; violin width: concentration. Use the lecture rank rule, not an n+1 rule.'),
 ['percentile','plots'],['session2.pdf','session5.pdf:16–17'])

add('discrete','PROBABILITY TABLE → MOMENTS + CDF',fields(
 'Separate possible values with a probability attached to each.',
 eq(r'f(x)\ge0,\quad\sum_x f(x)=1,\quad F(t)=\sum_{x\le t}f(x)')+
 eq(r'\mu=E[X]=\sum_x xf(x),\quad E[X^2]=\sum_x x^2f(x)')+
 eq(r'\operatorname{Var}(X)=E[X^2]-\mu^2=\sum_x(x-\mu)^2f(x)'),
 ['Check nonnegative masses and total one.','Multiply each value by its mass; add for the mean.','Square values first, then weight; subtract squared mean for variance.','For CDF, add all masses at or below the cutoff.'],
 eq(r'\begin{array}{c|rrrr}x&-1&2&3&7\\f(x)&.55&.15&.10&.20\\xf(x)&-.55&.30&.30&1.40\\x^2f(x)&.55&.60&.90&9.80\end{array}')+
 eq(r'\mu=-.55+.30+.30+1.40=1.45')+
 eq(r'E[X^2]=.55+.60+.90+9.80=11.85')+
 eq(r'\operatorname{Var}(X)=11.85-1.45^2=9.74750')+
 eq(r'E[(X-\mu)^2]=.55(-2.45)^2+.15(.55)^2')+eq(r'\qquad+.10(1.55)^2+.20(5.55)^2=9.74750')+
 eq(r'F(t)=\begin{cases}0&t<-1\\.55&-1\le t<2\\.70&2\le t<3\\.80&3\le t<7\\1&t\ge7\end{cases}')+
 eq(r'P(2\le X<7)=F(7^-)-F(2^-)=.80-.55=.25'),
 '', 'Mean 1.45; variance 9.74750; probability of 2 up to but excluding 7 is .25.',
 r'\(F(a^-)\) excludes mass at \(a\). \(P(X>a)=1-F(a)\); \(P(X\ge a)=1-F(a^-)\). A total of .9 is invalid.'),
 ['random','pmf','dcdf','expect','variance'],['hw1.pdf:1–2','session3.pdf'])

add('loaded','LOADED DIE → WEIGHT BY THE STATED MASSES',fields(
 'A die has unequal probabilities; asks a chance, mean or variance.',
 eq(r'F(t)=\sum_{x\le t}f(x),\quad E[X^r]=\sum_x x^rf(x)'),
 ['Use the stated probabilities instead of an equal-likelihood count.'],
 p(r'Loaded die: \(f(1)=.20\), \(f(2),\ldots,f(6)=.16\).')+
 eq(r'.20+5(.16)=1,\quad P(X\le3)=.20+.16+.16=.52')+
 eq(r'E[X]=1(.20)+(2+3+4+5+6)(.16)=3.4')+
 eq(r'E[X^2]=.20+(4+9+16+25+36)(.16)=14.6')+
 eq(r'\operatorname{Var}(X)=14.6-3.4^2=3.04'),
 '', 'Loaded-die mean 3.4, variance 3.04.',
 'Counting favorable faces out of six is valid only when all faces are equally likely.'),
 ['pmf','expect','variance'],['session3.pdf:19,24,26'])

add('events','SEQUENCE OF EVENTS → UPDATE WHAT REMAINS',fields(
 'Coins/cards or sequential trials; asks the chance of a combined outcome.',
 eq(r'P(A\cap B)=P(A)P(B\mid A)'),
 ['Check whether the first result changes the second probability.'],
 p('Two kings without replacement: after a king, 3 kings remain among 51 cards.')+
 eq(r'P=\frac4{52}\frac3{51}=.00452489')+
 p('Three fair tosses, exactly two heads: HHT, HTH, THH.')+eq(r'P=3/8=.375'),
 '', 'The chance of two kings is .00452489.',
 'Independent events retain the original second chance. Past heads do not alter the next fair toss.'),
 ['independent','random'],['session3.pdf:13–16'])

add('discrete-sketch','DRAW A DISCRETE MASS FUNCTION + CDF',
 p('<b>TRIGGER</b> Sketch a discrete probability/distribution function.')+
 p(r'<b>FORMULA</b> \(F(t)=\sum_{x\le t}f(x)\).')+
 steps('Mark each allowed x; draw its mass as a vertical stem.',
       'CDF: hold each level flat, then jump by the next mass.',
       'Fill the new/right level; leave the old/left level open.')+
 '<img class="v4-plot" src="figures/v4-discrete.svg" alt="Homework discrete masses and step CDF with open left levels and filled new values">'+
 p(r'<b>WORKED / WRITE</b> At \(x=2\), the CDF jumps from .55 to .70. Thus \(F(2)=.70\), while \(P(X<2)=.55\).')+
 p('<b>TRAP</b> Only the CDF must never decrease.'),
 ['dcdf','pmf'],['hw1.pdf:2','session3.pdf:23–24'])

add('continuous','DENSITY → AREA, CDF, MEAN, VARIANCE, MEDIAN',fields(
 'A density formula over a continuous interval; probabilities are areas.',
 eq(r'\int_a^b f(x)\,dx=1,\quad F(t)=\int_a^t f(u)\,du')+
 eq(r'P(l<X<u)=F(u)-F(l),\quad P(X>t)=1-F(t)')+
 eq(r'E[X^r]=\int_a^b x^rf(x)\,dx,\quad\operatorname{Var}(X)=E[X^2]-\mu^2')+
 eq(r'F(q)=.5\quad\text{defines the median }q'),
 ['Integrate the density over its full support to check one.','Integrate to a variable upper bound for the CDF.','Use the CDF for left/right/between probabilities.','Multiply by x or x² before integrating for moments.'],
 p(r'Analysis time: \(f(x)=x/2\), \(0\le x\le2\), zero elsewhere.')+
 eq(r'\int_0^2x/2\,dx=[x^2/4]_0^2=1')+
 eq(r'F(t)=\int_0^t u/2\,du=t^2/4\quad(0\le t\le2)')+
 p('CDF is zero below 0 and one above 2.')+
 eq(r'P(X<1)=1^2/4=.25')+eq(r'P(X>1.5)=1-1.5^2/4=.4375')+
 eq(r'\mu=\int_0^2x(x/2)\,dx=[x^3/6]_0^2=4/3')+
 eq(r'E[X^2]=\int_0^2x^2(x/2)\,dx=[x^4/8]_0^2=2')+
 eq(r'\operatorname{Var}(X)=2-(4/3)^2=2/9')+
 eq(r'q^2/4=.5\Rightarrow q=\sqrt2=1.41421'),
 '', 'Mean time 1.33333 hours; median 1.41421 hours; variance .222222 hours².',
 'An exact continuous point has probability zero. Density height can exceed one; total area cannot. Median is not necessarily the interval midpoint.'),
 ['density','ccdf','cexpect','integrate'],['session4.pdf','session5.pdf'])

add('piecewise','PIECEWISE DENSITY → CARRY EARLIER AREA',fields(
 'The density changes its expression at a boundary.',
 eq(r'F(t)=\int_a^s f_1(u)\,du+\int_s^t f_2(u)\,du\quad(t>s)'),
 ['Compute all area before the boundary.','Add only the new piece from the boundary to the requested cutoff.','State zero/one outside the full support; check continuity at the boundary.'],
 p(r'\(f(x)=x\) on 0–1; \(f(x)=2-x\) on 1–2.')+
 eq(r'F(1)=\int_0^1u\,du=1/2')+
 eq(r'F(t)=\tfrac12+\int_1^t(2-u)\,du')+
 eq(r'=\tfrac12+[2u-u^2/2]_1^t=2t-t^2/2-1')+
 eq(r'F(t)=\begin{cases}0&t<0\\t^2/2&0\le t\le1\\2t-t^2/2-1&1<t\le2\\1&t>2\end{cases}'),
 '', 'Both interior formulas give .5 at 1; the final value is 1 at 2.',
 'Do not restart the accumulated probability at zero when the density formula changes.'),
 ['ccdf','integrate'],['session4.pdf'])

add('endpoint','UNKNOWN CONSTANT / ENDPOINT → TOTAL AREA ONE',fields(
 'A density contains an unknown normalizing constant or support endpoint.',
 eq(r'\int_{\text{support}} f(x)\,dx=1')+
 eq(r'Ac^2+Bc+D=0:\quad c=\frac{-B\pm\sqrt{B^2-4AD}}{2A}'),
 ['Integrate over the whole support.','Set area to one and solve; keep a valid endpoint/nonnegative density.','Integrate to a variable upper bound for the CDF.','Substitute requested cutoffs; use complements for right tails.'],
 p(r'\(f(x)=.1+x\) for \(0<x\le c\); zero otherwise.')+
 eq(r'1=\int_0^c(.1+x)\,dx=[.1x+x^2/2]_0^c')+
 eq(r'.1c+c^2/2=1\Rightarrow c^2+.2c-2=0')+
 eq(r'c=\frac{-.2+\sqrt{.2^2-4(1)(-2)}}2=1.31774')+
 eq(r'F(t)=\begin{cases}0&t\le0\\.1t+t^2/2&0<t\le c\\1&t>c\end{cases}')+
 eq(r'P(X>.5)=1-[.1(.5)+.5^2/2]=.825')+
 eq(r'P(0<X<.6)=.1(.6)+.6^2/2=.24')+
 eq(r'P(X=.5)=0')+
 p('For the mean, multiply by x first:')+
 eq(r'\mu=\int_0^c x(.1+x)\,dx=[.05x^2+x^3/3]_0^c')+
 eq(r'=.05c^2+c^3/3=.849556')+
 eq(r'E[2X+1]=2\mu+1=2(.849556)+1=2.69911'),
 '', 'The support ends at 1.31774; mean .849556; chance above .5 is .825.',
 'Keep the unrounded root in subsequent work. A negative root cannot be this upper endpoint.'),
 ['density','ccdf','integrate','cexpect'],['hw1.pdf:3'])

add('uniform','UNIFORM → WIDTH DIVIDED BY FULL WIDTH',fields(
 'A constant density over a fixed range.',
 eq(r'f(x)=\frac1{b-a},\quad F(t)=\frac{t-a}{b-a}\quad(a\le t\le b)')+
 eq(r'P(l<X<u)=\frac{u-l}{b-a}\quad(a\le l<u\le b)'),
 ['Clip the requested interval to the support.','Divide its width by total width.','For moments, integrate x or x² times the constant density.'],
 p('Standard Uniform on 0–1:')+
 eq(r'E[X]=\int_0^1x\,dx=[x^2/2]_0^1=1/2')+
 eq(r'E[X^2]=\int_0^1x^2\,dx=[x^3/3]_0^1=1/3')+
 eq(r'\operatorname{Var}(X)=1/3-(1/2)^2=1/12')+
 eq(r'\mu=(a+b)/2,\quad\sigma^2=(b-a)^2/12'),
 '', 'Standard Uniform mean .5 and variance .0833333.',
 'CDF is zero before a, a rising line inside, one after b.'),
 ['uniform','cexpect'],['session4.pdf','session5.pdf'])

add('coefficient','DENSITY COEFFICIENT',fields(
 'Unknown multiplier; fixed support.',
 eq(r'1=\int_a^b k g(x)\,dx=k\int_a^b g(x)\,dx'),
 ['Integrate over the full support; solve for the multiplier.'],
 p('Analysis-time density on 0–2:')+
 eq(r'1=\int_0^2 kx\,dx=k[x^2/2]_0^2=2k')+
 eq(r'k=1/2\Rightarrow f(x)=x/2'),
 '', 'Density: x/2 on 0–2.',
 'Normalize over the full support.'),
 ['density','integrate'],['session4.pdf:analysis-time density'])

add('continuous-sketch','DRAW THE CONTINUOUS PDF + CDF',
 p('<b>TRIGGER</b> Sketch the density/distribution function after solving for the support.')+
 p(r'<b>FORMULA</b> \(f(x)=.1+x\); interior \(F(x)=.1x+x^2/2\).')+
 steps(r'Mark 0 and \(c\approx1.318\) on x; label the vertical axis f or F.',
 r'PDF: straight line from open \((0,.1)\) to filled \((c,1.418)\); zero outside. The point \((0,0)\) is filled.',
 r'CDF: through \((0,0),(.5,.175),(c,1)\); bend upward, then remain at one.')+
 eq(r'F(.5)=.1(.5)+(.5)^2/2=.175')+
 '<img class="v4-plot" src="figures/v4-continuous.svg" alt="Homework rising density with open and filled endpoints, and its continuous convex CDF">'+
 p('<b>WRITE</b> CDF is continuous from zero to one. <b>TRAP</b> A density jump need not cause a CDF jump.'),
 ['density','ccdf'],['hw1.pdf:3'])

add('normal','NORMAL → LEFT / RIGHT / BETWEEN AREA',fields(
 r'Normal mean and SD plus a measurement cutoff; \(X\sim N(\mu,\sigma^2)\).',
 eq(r'z=\frac{x-\mu}{\sigma},\quad\Phi(z)=P(Z\le z)')+
 eq(r'\Phi(-z)=1-\Phi(z),\quad P(l<X<u)=\Phi(z_u)-\Phi(z_l)'),
 ['Convert each cutoff to a z value.','Read left-tail areas in the supplied z table.','Left: use area; right: subtract from one; between: upper area minus lower.'],
 p(r'Glucose: \(\mu=95,\sigma=8.7\) mg/dL.')+
 eq(r'z_{85}=(85-95)/8.7=-1.14943\approx-1.15')+
 eq(r'z_{115}=(115-95)/8.7=2.29885\approx2.30')+
 eq(r'\Phi(1.15)=.8749,\quad\Phi(2.30)=.9893')+
 eq(r'P(X<85)=1-.8749=.1251')+
 eq(r'P(85\le X<115)=.9893-.1251=.8642')+
 eq(r'P(X\ge115)=1-.9893=.0107')+
 eq(r'.1251+.8642+.0107=1')+
 eq(r'z_0=(0-95)/8.7=-10.9195')+eq(r'P(X<0)\approx0,\quad P(X=95)=0'),
 'z table: find the complete positive z value in a repeated z/area pair; the adjacent area is cumulative LEFT probability.',
 'About 86.42% fall between 85 and 115 mg/dL using the table.',
 r'The second Normal parameter is variance; take its square root for SD. Individual: use \(\sigma\); average of n: use SEM at {{sampling}}.'),
 ['normal','normalprob'],['hw1.pdf:3','session5.pdf'])

add('quantile','GIVEN AREA → NORMAL CUTOFF / PERCENTILE',fields(
 'A requested percentile, top-tail fraction, or central range.',
 eq(r'z_p=\Phi^{-1}(p),\quad x_p=\mu+z_p\sigma'),
 ['Convert the request to LEFT probability.','Find that area in the z table; read z.','Multiply by SD and add the mean.'],
 p('Glucose 97.5th percentile / top 2.5%:')+
 eq(r'p=.975,\quad z_p=1.96')+eq(r'x_p=95+1.96(8.7)=112.052')+
 p('Lower/upper quartiles:')+
 eq(r'z_{.25}=-.674490,\quad z_{.75}=.674490')+
 eq(r'Q_1=95-.674490(8.7)=89.1319')+
 eq(r'Q_3=95+.674490(8.7)=100.868')+
 p('Middle 95% leaves .025 in each tail:')+
 eq(r'p_L=(1-.95)/2=.025,\quad p_U=1-.025=.975')+
 eq(r'x_L=95-1.96(8.7)=77.948')+eq(r'x_U=95+1.96(8.7)=112.052'),
 'Search the z table for .9750 to read 1.96. For a right-tail area, first subtract it from one.',
 '97.5% lie below about 112.052 mg/dL; central 95% spans 77.948–112.052.',
 'A data-list percentile uses the rank rule at {{percentile}}, not inverse Normal.'),
 ['normalquant'],['hw1.pdf:3','session5.pdf:9'])

add('normal-sketch','NORMAL PDF / CDF → LABEL MEAN + SCALE',
 p('<b>TRIGGER</b> Write or sketch the Normal density/distribution.')+
 eq(r'f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}')+
 eq(r'F(t)=\int_{-\infty}^t\frac{1}{\sigma\sqrt{2\pi}}e^{-(u-\mu)^2/(2\sigma^2)}\,du')+
 p('With the given glucose parameters:')+
 eq(r'f(x)=\frac1{8.7\sqrt{2\pi}}e^{-(x-95)^2/(2(8.7)^2)}')+
 eq(r'F(t)=\int_{-\infty}^t\frac1{8.7\sqrt{2\pi}}e^{-(u-95)^2/(2(8.7)^2)}\,du')+
 steps(r'Insert mean 95 and SD 8.7.','PDF: symmetric bell at 95; mark 86.3 and 103.7 (one SD each side).','CDF: rising S through (95,.5), flattening toward 0 and 1.')+
 '<img class="v4-plot" src="figures/v4-normal.svg" alt="Normal glucose bell at 95 and S-shaped CDF through 95 one half">'+
 p('<b>WRITE</b> The integral is sufficient for the CDF. <b>TRAP</b> CDF height is probability below x; PDF height alone is not probability.'),
 ['normal','normalprob'],['hw1.pdf:3','session5.pdf'])

add('r-normal','READ pnorm / qnorm + lower.tail',
 p('<b>TRIGGER</b> A supplied Normal command or its result.')+
 eq(r'\texttt{pnorm}:x\longmapsto F(x),\qquad\texttt{qnorm}:p\longmapsto x_p')+
 p('<b>STEPS</b> 1. Identify cutoff versus probability input. 2. Read mean, SD. 3. FALSE means RIGHT tail; default TRUE means LEFT tail.')+
 '<pre class="r-print">'+html.escape('pnorm(85,95,8.7)\n'+OUT['outputs']['pnorm_left']+'\npnorm(115,95,8.7,lower.tail=FALSE)\n'+OUT['outputs']['pnorm_right']+'\nqnorm(.975,95,8.7)\n'+OUT['outputs']['qnorm_left']+'\nqnorm(.025,95,8.7,lower.tail=FALSE)\n'+OUT['outputs']['qnorm_right'])+'</pre>'+
 p('<b>WRITE</b> Right-tail .025 gives the same cutoff as left-tail .975: about 112.052 mg/dL. <b>TRAP</b> The SD argument is not variance; for a sample mean it must be SEM.'),
 ['rcode','rbasics','normalprob','normalquant'],['session15.pdf:63','hw1.pdf:3–4'])

add('sampling','AVERAGE OF n → SAMPLING DISTRIBUTION / SEM',fields(
 'Probability concerns an average. For non-Normal individuals, independent n≥30 is the course guideline for a Normal approximation to the mean.',
 eq(r'E[\bar X]=\mu,\quad\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}')+
 eq(r'\mathrm{SEM}=\frac{\sigma}{\sqrt n},\quad z=\frac{\bar x-\mu}{\sigma/\sqrt n}'),
 ['Keep the population mean.','Divide individual SD by square-root of sample size.','Standardize bounds using SEM, then use Normal left areas.'],
 p(r'Impurity: \(\mu=4,\sigma=1.5,n=50\). Find \(P(3.5<\bar X<3.8)\).')+
 eq(r'\mathrm{SEM}=1.5/\sqrt{50}=.212132')+
 eq(r'z_L=(3.5-4)/.212132=-2.35702')+
 eq(r'z_U=(3.8-4)/.212132=-.942809')+
 eq(r'P=\Phi(-.942809)-\Phi(-2.35702)')+
 eq(r'=.172889-.00921106=.163678')+
 p('With the supplied rounded table:')+eq(r'P=.1736-.0091=.1645'),
 'Round z to −.94 and −2.36, use symmetry, then subtract. Calculator full-precision result differs slightly from rounded table.',
 'About 16.4% of such sample averages fall between 3.5 and 3.8 grams.',
 'Normal individuals give Normal averages for any n. CLT makes the average approximately Normal at large n; it does not make the original observations Normal.'),
 ['sampling'],['session10.pdf','session15.pdf:23–29'])

add('linear','CHANGED VARIABLE / INDEPENDENT SUM → MEAN + VARIANCE',fields(
 'A constant is added, values are rescaled, or independent random variables are added/subtracted.',
 eq(r'E[aX+b]=a\mu+b,\quad\operatorname{Var}(aX+b)=a^2\sigma^2')+
 eq(r'E[aX+bY+c]=a\mu_X+b\mu_Y+c')+
 eq(r'\operatorname{Var}(aX+bY+c)=a^2\sigma_X^2+b^2\sigma_Y^2')+
 eq(r'E[h(X)]=\sum_x h(x)f(x)\quad\text{(discrete)}')+
 eq(r'E[h(X)]=\int h(x)f(x)\,dx\quad\text{(continuous)}'),
 ['Apply coefficient signs to means.','Square coefficients for variances.','For independent variables, add variances even for a difference.','Square-root the final variance for SD.'],
 p('Subtract 26 from every glucose measurement:')+
 eq(r'E[X-26]=95-26=69')+eq(r'\operatorname{Var}(X-26)=8.7^2=75.69,\quad\operatorname{SD}(X-26)=8.7')+
 p('Mean uncertainty shrinks because averaging divides a sum by n:')+
 eq(r'\operatorname{Var}\left(\frac{\sum X_i}{n}\right)=\frac{n\sigma^2}{n^2}=\frac{\sigma^2}{n}'),
 '', 'A shift changes the mean but not spread; a sum of independent Normal variables is Normal.',
 'The sum-of-variances rule requires independence. A negative coefficient still contributes positive variance.'),
 ['linear','sampling'],['session5.pdf','session10.pdf'])

add('precision','ESTIMATES + WHICH SPREAD?',
 p('<b>TRIGGER</b> Explain reliability of an estimate, SD versus SEM, or changing sample size.')+
 p('<b>FORMULA / STEPS</b> Estimate population mean with sample mean and population SD with sample SD. Unbiased means correctly centered over repeated samples. For a Normal population, the sample mean is the minimum-variance mean estimator discussed in class.')+
 eq(r'\widehat{\mathrm{SE}}(s^2)=s^2\sqrt{\frac2{n-1}}')+
 p('<b>WORKED</b> Four times the sample size halves SEM:')+
 eq(r'\frac{\sigma}{\sqrt{4n}}=\frac12\frac{\sigma}{\sqrt n}')+
 p('<b>WRITE</b> A larger sample gives a more precise mean estimate without necessarily reducing variation among individuals. <b>TRAP</b> SEM has measurement units; variance has squared units.'),
 ['estimators','summary','sampling'],['session2.pdf','session10.pdf','session15.pdf:30–31'])

add('one-t','ONE SAMPLE vs FIXED VALUE → t TEST',fields(
 'One numerical sample compared with a known/reference population mean.',
 eq(r'H_0:\mu=\mu_0,\quad H_1:\mu\ne\mu_0')+
 eq(r't=\frac{\bar x-\mu_0}{s/\sqrt n},\qquad\nu=n-1'),
 ['Find SEM from the sample SD.','Subtract the reference from the sample mean.','Divide by SEM; find df.','Compare absolute t with the positive two-tailed cutoff.'],
 p(r'LDL: reference 115; student \(\bar x=103,s=16,n=16\).')+
 eq(r'H_0:\mu_{\mathrm{student}}=115')+
 eq(r'\mathrm{SEM}=16/\sqrt{16}=4')+eq(r'\bar x-\mu_0=103-115=-12')+
 eq(r't=-12/4=-3,\qquad\nu=16-1=15')+
 eq(r'|t|=3>2.131\Rightarrow\text{reject }H_0'),
 't table: df row 15; full TWO-TAILED .05 column → 2.131. Use the magnitude for a two-sided alternative.',
 'At .05, a two-sided one-sample t test supports a different population mean student LDL from 115 mg/dL; the sample mean is lower.',
 'The reference is a fixed number, not another sample. Do not pool it or give it a sample size.'),
 ['onet','hypothesis'],['hw2.pdf:1','session8.pdf:20–24'])

add('pooled-t','TWO INDEPENDENT MEANS → POOLED t',fields(
 'Two independent numerical groups; course common-variance assumption; group sizes may differ.',
 eq(r'H_0:\mu_1=\mu_2,\quad H_1:\mu_1\ne\mu_2')+
 eq(r's_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}')+
 eq(r'\mathrm{SE}_{\Delta}=\sqrt{s_p^2(1/n_1+1/n_2)}')+
 eq(r't=\frac{\bar x_1-\bar x_2}{\mathrm{SE}_{\Delta}},\quad\nu=n_1+n_2-2'),
 ['Square the SDs.','Weight each variance by its group count minus one; pool.','Find the SE of the difference.','Subtract means; divide by SE; compare absolute t.'],
 p(r'Cognitive scores: \((\bar x_1,s_1,n_1)=(49,8.4,22)\); \((\bar x_2,s_2,n_2)=(57,9.5,27)\).')+
 eq(r's_1^2=70.56,\quad s_2^2=90.25,\quad\nu=22+27-2=47')+
 eq(r's_p^2=\frac{21(70.56)+26(90.25)}{47}=81.4523')+
 eq(r'\mathrm{SE}_{\Delta}=\sqrt{81.4523(1/22+1/27)}=2.59213')+
 eq(r't=(49-57)/2.59213=-3.08627')+
 eq(r'|t|=3.08627>2.013\Rightarrow\text{reject }H_0'),
 't table: df 47 lies between rows 46 and 48; .05 two-tail cutoffs 2.013 and 2.011. The statistic exceeds both.',
 'At .05, pooled t supports different population mean cognitive scores; the intervention sample mean is higher.',
 'Do not average variances unless group sizes are equal. A negative t records group order, not a negative p value.'),
 ['pooledt','hypothesis'],['hw2.pdf:1','session8.pdf'])

add('t-output','R t OUTPUT → HEADER, df, p',
 p('<b>TRIGGER</b> Supplied t output. <b>FORMULA</b>')+
 eq(r'p<\alpha\Rightarrow\text{reject }H_0')+
 p('<b>STEPS</b> Read header, df and p; compare p with alpha. Height samples:')+
 '<b class="r-label">Default t.test(freshman, senior)</b>'+
 excerpt('welch',lambda x:'t-test' in x or x.startswith('t ='))+
 '<b class="r-label">t.test(..., var.equal = TRUE)</b>'+
 excerpt('pooled',lambda x:'t-test' in x or x.startswith('t ='))+
 p('<b>READ →</b> t = statistic; df = reference distribution; p = decision. Both p values are below .05.')+
 p('<b>WRITE</b> Population mean heights differ at .05; the senior sample mean is higher. <b>TRAP</b> Use the printed Welch df; do not replace it with pooled df. Hand method: {{pooled-t}}.'),
 ['rcode','pooledt'],['hw1.pdf:4','session9.pdf:15','session15.pdf:63'])

add('anova','SEVERAL EQUAL-SIZE MEANS → BALANCED ANOVA',fields(
 'Three or more numerical groups, same number n in each; means and SDs supplied.',
 p(r'\(m\): number of groups; \(n\): subjects per group; \(\bar{\bar x}\): grand mean.')+
 eq(r'H_0:\mu_1=\cdots=\mu_m;\quad H_1:\text{not all means equal}')+
 eq(r's_{\mathrm{wit}}^2=\frac{\sum s_i^2}{m},\quad\bar{\bar x}=\frac{\sum\bar x_i}{m}')+
 eq(r's_{\bar x}^2=\frac{\sum(\bar x_i-\bar{\bar x})^2}{m-1},\quad s_{\mathrm{bet}}^2=ns_{\bar x}^2')+
 eq(r'F=\frac{s_{\mathrm{bet}}^2}{s_{\mathrm{wit}}^2},\quad\nu_n=m-1,\quad\nu_d=m(n-1)'),
 ['Square SDs and average → within variance.','Average group means → grand mean.','Subtract grand mean from each mean; square and add.','Divide by m−1; multiply by n → between variance.','Divide between by within; look up upper-tail F.'],
 p(r'Tumors: means \(1188,1412,1363\); SDs \(189,217,191\); \(m=3,n=12\).')+
 eq(r's_{\mathrm{wit}}^2=(189^2+217^2+191^2)/3=39763.7')+
 eq(r'\bar{\bar x}=(1188+1412+1363)/3=1321')+
 eq(r'(\bar x_i-1321)=(-133,91,42)')+
 eq(r'\sum(\bar x_i-1321)^2=17689+8281+1764=27734')+
 eq(r's_{\bar x}^2=27734/2=13867')+
 eq(r's_{\mathrm{bet}}^2=12(13867)=166404')+
 eq(r'F=166404/39763.7=4.18483')+eq(r'(\nu_n,\nu_d)=(2,33)'),
 'F table: numerator df 2 across top; denominator df 33 down side. At upper-tail .05, rows 32 and 34 give 3.29 and 3.28. F exceeds both → reject.',
 'At .05, ANOVA supports a difference in population mean tumor size among dose groups. It does not identify the differing pair.',
 'Use variance, not SD, in the ratio. This balanced formula needs equal group sizes; means/SDs are given for the exam.'),
 ['anova'],['hw1.pdf:5','session15.pdf:33–35','midterm-review-transcript.txt'])

add('conditions','MEAN-TEST CONDITIONS + DECISION LANGUAGE',
 p('<b>TRIGGER</b> State assumptions, explain a result, or choose the correct tail.')+
 p('<b>STEPS</b> Numerical interval outcome; independent random observations; Normal population(s). Pooled t/ANOVA also assume common population variance. Balanced ANOVA has equal group sizes.')+
 eq(r'\text{two-sided t: }|t|>t_{\mathrm{crit}}\Rightarrow\text{reject}')+
 eq(r'\text{F or }\chi^2:\ \text{statistic}>\text{upper cutoff}\Rightarrow\text{reject}')+
 p('<b>WORKED</b> Student HR by pet preference: cat means 74.2, dog 76.8; SDs 7.3, 9.1; five students per group.')+
 eq(r's_{\mathrm{wit}}^2=(7.3^2+9.1^2)/2=68.05')+
 eq(r'\bar{\bar x}=(74.2+76.8)/2=75.5')+
 eq(r's_{\bar x}^2=\frac{(-1.3)^2+1.3^2}{2-1}=3.38')+
 eq(r's_{\mathrm{bet}}^2=5(3.38)=16.9,\quad(\nu_n,\nu_d)=(1,8)')+
 eq(r'F=16.9/68.05=.248347<5.32')+
 p('<b>TABLE</b> F df (1,8), upper .05: 5.32. <b>WRITE</b> A population mean HR difference was not established. <b>TRAP</b> A p value is an extreme-result probability under the null, not the probability that the null is true; not rejecting does not prove equality.'),
 ['hypothesis','distributions'],['session7.pdf:8–14','session8.pdf','session15.pdf'])

add('aov-output','REAL summary(aov) → WHAT EACH COLUMN ANSWERS',
 p('<b>TRIGGER</b> Supplied ANOVA output. <b>FORMULA</b>')+
 eq(r'F=\frac{\mathrm{MS}_{\mathrm{Group}}}{\mathrm{MS}_{\mathrm{Residual}}}')+
 '<pre class="r-print aov-print">'+html.escape(OUT['outputs']['anova'])+'</pre>'+
 p(r'<b>READ →</b> Group Df 2 = numerator df; Residuals Df 19 = denominator df and pairwise t df. <b>Mean Sq 66.8</b> = within variance; <b>F value 5.832</b> = statistic; <b>Pr(&gt;F) .0106</b> = p value.')+
 p('<b>STEPS</b> Compare p with alpha. At .05 reject; at .01 do not reject. For follow-ups, use residual variance and residual df with the actual pair’s sample sizes.')+
 p('If only residual standard error 8.174069 is printed, square it:')+
 eq(r's_{\mathrm{wit}}^2=(8.174069)^2=66.8154\approx66.8')+
 p('<b>WRITE</b> At .05, at least one population mean exhaled nitric-oxide level differs. <b>TRAP</b> Residual standard error is an SD, not a variance; a star is not the numerical p value.'),
 ['rcode','anova','posthoc'],['session7.pdf:37,39','session15.pdf:63'])

add('bonferroni','WHICH PAIRS? → BONFERRONI',fields(
 'Compare a named family of mean pairs at a familywise significance level.',
 p(r'\(k\): requested comparisons; \(\alpha_T\): family significance; \(\nu\): ANOVA residual df.')+
 eq(r'k=\begin{cases}m(m-1)/2&\text{all pairs}\\m-1&\text{each vs control}\end{cases}')+
 eq(r'\mathrm{SE}_{ij}=\sqrt{s_{\mathrm{wit}}^2(1/n_i+1/n_j)}')+
 eq(r'|t_{ij}|=\frac{|\bar x_i-\bar x_j|}{\mathrm{SE}_{ij}},\quad\alpha_{\mathrm{pair}}=\alpha_T/k'),
 ['Count only requested pairs. All pairs: m(m−1)/2; each treatment vs control: m−1.','Use ANOVA within variance and residual df.','Calculate each absolute t.','Compare each with the cutoff for the adjusted two-tailed level.'],
 p(r'Filgrastim means \(3.7,4.6,5.2\); \(n=15\) each; given \(s_{\mathrm{wit}}^2=2.5267,\nu=42,k=3\).')+
 eq(r'\mathrm{SE}=\sqrt{2(2.5267)/15}=.580425')+
 eq(r'|t_{13}|=(5.2-3.7)/.580425=2.58431')+
 eq(r'|t_{12}|=(4.6-3.7)/.580425=1.55059')+
 eq(r'|t_{23}|=(5.2-4.6)/.580425=1.03373')+
 eq(r'\alpha_{\mathrm{pair}}=.05/3=.0166667')+
 eq(r't_{\mathrm{crit}}=2.49367;\quad2.58431>2.49367'),
 't row 42, TWO-TAIL level .0166667. If absent, TI-84 invT uses LEFT area 1−.05/(2×3) and df 42. The table uses .0166667; only invT uses the left-area conversion.',
 'With familywise .05 Bonferroni control, low and high dose population means differ; other pair differences were not established.',
 'Use ANOVA residual df and within variance, not two-group pooled df.'),
 ['bonferroni','posthoc'],['hw2.pdf:1–2','session9.pdf'])

add('holm','MULTIPLE PAIRS → HOLM: STOP AT FIRST FAILURE',fields(
 'Holm adjustment; supplied t/chi-square statistics or unadjusted p values.',
 eq(r'\alpha_j=\frac{\alpha_T}{k-j+1},\qquad j=1,\ldots,k'),
 ['Same-df absolute statistics: sort largest first; keep pair labels. With p values, sort smallest first.','Compare first test at alpha/k.','If it passes, use alpha/(k−1) for the next.','Stop at the first failure; all remaining comparisons fail the family procedure.'],
 p(r'Five t comparisons; \(\nu=46,\alpha_T=.05\).')+
 eq(r'\begin{array}{c|r|r|r}\text{pair}&|t|&\alpha_j&t_{\mathrm{crit}}\\1:6&3.3&.0100&2.687\\1:3&2.9&.0125&2.59973\\1:5&2.3&.0166667&2.48469\\1:4&2.2&.0250&\\1:2&2.1&.0500&\end{array}')+
 eq(r'3.3>2.687:\ \text{pass};\quad2.9>2.59973:\ \text{pass}')+
 eq(r'2.3<2.48469:\ \text{STOP}'),
 't df row 46; each column is the current full TWO-TAILED alpha. Missing .0125/.0166667 columns: invT left area 1−alpha_j/2.',
 'At familywise .05, G1 differs from G6 and G3; differences from G5, G4 and G2 were not established.',
 'Order p smallest first, or absolute t largest first when df match. Stop at the first failure; remaining comparisons are not significant.'),
 ['holm','posthoc'],['session9.pdf:16','session15.pdf:45'])

add('tables','READ THE SUPPLIED TABLES WITHOUT DOUBLING TAILS',
 p('<b>TRIGGER</b> A critical value, p-value range, or missing table entry.')+
 steps('<b>z table:</b> find z and its neighboring cumulative LEFT area. Negative z: use symmetry.',
       '<b>t table:</b> row = df; column = total TWO-TAILED alpha. A .05 test uses .05, not .025.',
       '<b>F table:</b> numerator df along top, denominator df down side; use the requested UPPER tail.',
       '<b>Chi-square:</b> df down side; upper-tail probability across top. Ordinary chi-square tables are interchangeable for the same df/tail.')+
 p('<b>WORKED</b> t=2.58630, df 4:')+
 eq(r't_{.10,4}=2.132<2.58630<2.776=t_{.05,4}')+eq(r'.05<p_{\mathrm{two-sided}}<.10')+
 p('<b>Missing df?</b> Read both neighboring rows. Above both cutoffs → reject; below both → do not reject; between them → an exact cutoff or supplied p is needed.')+
 p('<b>TI-84</b> Positive t cutoff: invT(1−alpha/2,df). Two-sided p: 2×tcdf(|t|,1E99,df). Normal area: normalcdf(lower,upper,mean,SD); cutoff: invNorm(left area,mean,SD).')+
 p('<b>TRAP</b> Halve alpha for the invT left-area conversion, not a second time for the supplied two-tailed table.'),
 ['distributions','rcode'],['tables/t_table.pdf','tables/F_table.pdf','tables/Chi_Squared_Table2.pdf','tables/z_table_NormalDist.pdf','session15.pdf:2','hw2.pdf:2'])

add('binary','ONE EVENT PROPORTION → ESTIMATE + SE',fields(
 'One group with event/no-event outcomes; estimate the event chance and uncertainty.',
 p(r'\(m\): number of events; \(n\): total subjects; code event 1, other 0.')+
 eq(r'\hat p=m/n,\quad\widehat{\operatorname{Var}}(X)=\hat p(1-\hat p)')+
 eq(r'\widehat{\operatorname{SD}}(X)=\sqrt{\hat p(1-\hat p)},\quad\operatorname{SE}(\hat p)=\sqrt{\frac{\hat p(1-\hat p)}n}'),
 ['Divide event count by total count.','Multiply p-hat by one minus p-hat for binary variance.','Square-root variance for individual SD; divide by square-root n for SE of the proportion.'],
 p('Death in 8 of 61 patients:')+eq(r'\hat p=8/61=.131148')+
 eq(r'\hat p(1-\hat p)=.113948')+
 eq(r'\widehat{\operatorname{SD}}(X)=\sqrt{.113948}=.337562')+
 eq(r'\operatorname{SE}(\hat p)=\sqrt{.113948/61}=.0432203'),
 '', 'Estimated death risk .131148; standard error of the estimated proportion .0432203.',
 'Individual binary SD and SE of the estimated proportion answer different questions. Name the same event in every group.'),
 ['binary'],['session11.pdf:3–11'])

add('z-yates','TWO PROPORTIONS → YATES z',fields(
 'Two groups; each person has event/no event. Same event definition in both groups.',
 eq(r'H_0:p_1=p_2,\quad H_1:p_1\ne p_2')+
 eq(r'\hat p_i=m_i/n_i,\quad\hat p=\frac{m_1+m_2}{n_1+n_2}')+
 eq(r'\mathrm{SE}_0=\sqrt{\hat p(1-\hat p)(1/n_1+1/n_2)}')+
 eq(r'c_Y=\tfrac12(1/n_1+1/n_2),\quad D_Y=\max(0,|\hat p_1-\hat p_2|-c_Y)')+
 eq(r'|z_Y|=D_Y/\mathrm{SE}_0'),
 ['Find each proportion and pool actual event counts.','Find the pooled null SE.','Subtract the continuity correction from the absolute gap.','Divide corrected gap by SE and compare with the two-sided Normal cutoff.'],
 p('Placebo 18/25 events; aspirin 6/19:')+
 eq(r'\hat p_1=.72,\quad\hat p_2=.315789,\quad\hat p=24/44=.545455')+
 eq(r'\mathrm{SE}_0=\sqrt{.545455(.454545)(1/25+1/19)}=.151547')+
 eq(r'c_Y=.5(1/25+1/19)=.0463158')+
 eq(r'D_Y=|.72-.315789|-.0463158=.357895')+
 eq(r'|z_Y|=.357895/.151547=2.36161>1.960')+
 p('Rounded-proportion format (dioxin): .565, .455; groups 186, 220; exactly 205 female births total.')+
 eq(r'\hat p=205/406=.504926')+
 eq(r'\mathrm{SE}_0=\sqrt{.504926(.495074)(1/186+1/220)}=.0498017')+
 eq(r'c_Y=.5(1/186+1/220)=.00496090')+
 eq(r'|z_Y|=\frac{.565-.455-.00496090}{.0498017}=2.10915>1.960')+
 p('Female-birth proportions differ at .05.'),
 't table infinity-df row, full .05 two-tail column → 1.960. Reject.',
 'At .05, corrected two-proportion z supports different population thrombus rates; aspirin’s observed rate is lower.',
 'Always retain Yates for the course’s 2×2 comparisons. If proportions are rounded but an exact total event count is supplied, pool that count.'),
 ['zprop','yates'],['session11.pdf:14–20','hw2.pdf:2'])

add('chi2','2×2 COUNTS → YATES CHI-SQUARE',fields(
 'Two rows × two outcome columns; asks whether population proportions differ.',
 p(r'\(O_{ij},E_{ij}\): observed/expected count; \(R_i,C_j\): row/column totals; \(N\): all subjects.')+
 eq(r'E_{ij}=R_iC_j/N,\quad\chi_Y^2=\sum_{i,j}\frac{\max(0,|O_{ij}-E_{ij}|-.5)^2}{E_{ij}}')+
 eq(r'\nu=(r-1)(c-1)=1'),
 ['Add row/column/grand totals.','Expected cell = row total × column total ÷ grand total.','For every cell: subtract, take absolute gap, subtract .5, square, divide by expected.','Add cells; compare the upper-tail cutoff.'],
 eq(r'O=\begin{pmatrix}18&7\\6&13\end{pmatrix},\quad N=44')+
 eq(r'E=\begin{pmatrix}25(24)/44&25(20)/44\\19(24)/44&19(20)/44\end{pmatrix}')+
 eq(r'=\begin{pmatrix}13.6364&11.3636\\10.3636&8.63636\end{pmatrix}')+
 eq(r'c_{11}=\frac{(|18-13.6364|-.5)^2}{13.6364}=1.09470')+
 eq(r'\chi_Y^2=1.09470+1.31364+1.44039+1.72847=5.57719')+
 chi_print('chi_yates')+
 p('<b>READ →</b> The R header explicitly includes Yates. X-squared is the statistic; p-value is the upper-tail probability.'),
 'Chi-square row 1, upper-tail .05 → 3.841. For a p range: 5.024 (.025) < 5.57719 < 6.635 (.01), so .01<p<.025.',
 'At .05, corrected chi-square supports different thrombus proportions for placebo and aspirin.',
 'Use counts, not percentages. Corrected z squared equals this corrected chi-square.'),
 ['chi','yates','contingency','rcode'],['session12.pdf:3–11','session11.pdf:19–20'])

add('large-chi','LARGER TABLE → ORDINARY CHI-SQUARE',fields(
 'More than two rows or columns; compare population outcome distributions across groups.',
 eq(r'H_0:\text{equal population outcome proportions}')+
 eq(r'E_{ij}=R_iC_j/N,\quad\chi^2=\sum_{i,j}\frac{(O_{ij}-E_{ij})^2}{E_{ij}}')+
 eq(r'\nu=(r-1)(c-1)'),
 ['Compute margins and expected cells.','For each cell: observed minus expected; square; divide by expected.','Add all cells; compute df; compare upper-tail cutoff.'],
 eq(r'O=\begin{pmatrix}36&131\\41&132\\75&104\end{pmatrix},\quad R=(167,173,179)')+
 eq(r'C=(152,367),\quad N=519')+
 eq(r'E_{11}=167(152)/519=48.9094')+
 eq(r'E=\begin{pmatrix}48.9094&118.091\\50.6667&122.333\\52.4239&126.576\end{pmatrix}')+
 eq(r'c_{11}=(36-48.9094)^2/48.9094=3.40739')+
 eq(r'\chi^2=3.40739+1.41124+1.84430+.763851')+
 eq(r'\qquad+9.72230+4.02667=21.1757,\quad\nu=2')+
 chi_print('chi_large')+eq(r'\texttt{2.522e-05}=.00002522'),
 'Chi-square row 2, upper .05 → 5.991. Reject.',
 'At .05, population outcome distributions differ among the three treatments.',
 'No Yates for this 3×2 table. Expected counts may be fractional. Follow-up pairs each need a new 2×2 table and new margins.'),
 ['contingency','chi','rcode'],['session12.pdf:13–16'])

add('gof','ONE COUNT LIST vs TARGET PROPORTIONS → GOF',fields(
 'One observed category distribution compared with specified expected percentages/probabilities.',
 eq(r'H_0:p_i=p_{i,0}\ \text{for all categories}')+
 eq(r'E_i=Np_{i,0},\quad\chi^2=\sum_i\frac{(O_i-E_i)^2}{E_i},\quad\nu=k-1'),
 ['Convert target percentages to probabilities.','Multiply each target by total N.','Subtract expected from observed; square; divide by expected.','Add category contributions; compare upper-tail cutoff.'],
 p(r'Observed \((255,125,90)\), \(N=470\); targets \((.60,.25,.15)\).')+
 eq(r'E=(470(.60),470(.25),470(.15))=(282,117.5,70.5)')+
 eq(r'\chi^2=\frac{(255-282)^2}{282}+\frac{(125-117.5)^2}{117.5}+\frac{(90-70.5)^2}{70.5}')+
 eq(r'=2.58511+.478723+5.39362=8.45745,\quad\nu=2')+
 chi_print('chi_gof'),
 'Chi-square row 2, upper .05 → 5.991. Reject.',
 'At .05, the population exercise-category distribution differs from the stated earlier pattern.',
 'Use the specified target probabilities, not the current observed proportions. No 2×2 Yates correction for a one-list goodness-of-fit test.'),
 ['gof','rcode'],['session12.pdf:24–27'])

add('chi-holm','SUPPLIED PAIRWISE CHI-SQUARE → CONTROL FAMILY',fields(
 'Printed pairwise test statistics; asks which treatments differ from control.',
 eq(r'\alpha_j=\frac{\alpha_T}{k-j+1}'),
 ['Keep only requested comparisons.','Same df: order statistics largest first.','Compare at successive Holm levels; stop at first failure.'],
 p('Control comparisons: G1 9.4944; G2 4.6895; G3 18.234, each df 1. Six pairs were printed, but only three belong to this requested family.')+
 eq(r'k=3,\quad\alpha_j=.05/3,\ .05/2,\ .05')+
 eq(r'18.234>6.635>\chi^2_{.0166667,1}:\ \text{pass}')+
 eq(r'9.4944>\chi^2_{.025,1}=5.024:\ \text{pass}')+
 eq(r'4.6895>\chi^2_{.05,1}=3.841:\ \text{pass}'),
 'Chi-square row 1. The .0166667 column is absent, but exceeding the stricter .01 cutoff 6.635 already proves the first pass.',
 'At familywise .05, G1, G2 and G3 each differ from control in the population outcome proportion.',
 'Do not count unrequested treatment-versus-treatment pairs in k. Keep the named outcome and treatment labels in the answer.'),
 ['holm','chi','rcode'],['hw2.pdf:3–4'])

add('risk','PROSPECTIVE RISKS → RR, ARR, NNT / NNH',fields(
 'Treatment/exposure groups followed for an outcome; asks the size of a risk difference or number treated.',
 p(r'\(r_T=m_T/n_T,r_C=m_C/n_C\): treatment/control event risks.')+
 eq(r'\mathrm{RR}=r_T/r_C,\quad\mathrm{RRR}=1-\mathrm{RR}')+
 eq(r'\mathrm{ARR}=r_C-r_T,\quad\mathrm{NNT}=1/\mathrm{ARR}')+
 eq(r'\mathrm{NNH}=1/(r_T-r_C)\quad\text{when treatment raises harm risk}'),
 ['Choose the same event in both groups.','Divide events by everyone in each group.','Divide risks for RR; subtract risks for absolute change.','Reciprocate absolute benefit/harm risk; round up if whole people are requested.'],
 p('Aspirin 6/19 thrombi; placebo 18/25:')+
 eq(r'r_T=.315789,\quad r_C=.72,\quad\mathrm{RR}=.438596')+
 eq(r'\mathrm{ARR}=.72-.315789=.404211')+
 eq(r'\mathrm{NNT}=1/.404211=2.47396\Rightarrow3\text{ people}')+
 p('Low-base-rate benefit: deaths 10 to 8 per thousand.')+
 eq(r'r_C=.010,\quad r_T=.008,\quad\mathrm{RR}=.8')+
 eq(r'\mathrm{RRR}=.2,\quad\mathrm{ARR}=.002,\quad\mathrm{NNT}=500')+
 p('If NNH=20, harms per one additional avoided death:')+eq(r'\mathrm{NNT}/\mathrm{NNH}=500/20=25'),
 '', 'Aspirin thrombus risk is .438596 times placebo’s; absolute reduction is 40.4211 percentage points; about three treated per additional avoided event.',
 'Risk uses events/total; odds use events/non-events. A 20% relative reduction is not a twenty-percentage-point absolute reduction. Use decimal risks in reciprocals.'),
 ['risk','nnt'],['session13.pdf','session11.pdf:19–20'])

add('odds','CASES CHOSEN BY DISEASE → ODDS RATIO',fields(
 'People selected as cases/controls by existing outcome, then earlier exposure assessed.',
 eq(r'\begin{array}{c|cc}&\text{exposed}&\text{unexposed}\\\text{case}&a&b\\\text{control}&c&d\end{array}')+
 eq(r'\mathrm{OR}=\frac{a/b}{c/d}=\frac{ad}{bc}'),
 ['Find exposure odds among cases.','Find exposure odds among controls.','Divide odds, or use the diagonal products.'],
 p('Cases: 50 exposed, 14 unexposed; controls: 43 exposed, 35 unexposed.')+
 eq(r'\mathrm{OR}=\frac{50/14}{43/35}=\frac{50(35)}{14(43)}=2.90698'),
 '', 'Odds of secondhand-smoke exposure are about 2.90698 times as high among cases as controls.',
 'Case-control sampling does not supply population disease-risk denominators for RR. Reversing one comparison takes the reciprocal. RR/OR=1 means no association.'),
 ['odds','risk'],['session13.pdf:12–16'])

add('design','STUDY DESIGN → WHAT WAS ASSIGNED / FOLLOWED?',
 p('<b>TRIGGER</b> Identify study design, masking, or choose risk versus odds.')+
 steps('<b>Randomized trial:</b> assign treatment, then follow outcomes. <b>Cohort:</b> follow exposure groups without random assignment; both support event risks/RR.',
 '<b>Case-control:</b> select by outcome, assess earlier exposure; use OR.',
 '<b>Parallel:</b> different people in treatments. <b>Crossover:</b> same people receive both in different periods; stable disease and no carryover required.')+
 p('<b>Masking:</b> subject; treatment/evaluation team; statistical team. Each hides assignment from a possible source of expectation bias. A sham controls procedure experience/expectation.')+
 p('<b>WRITE</b> State what was assigned, how people were selected, and which outcome was followed. <b>TRAP</b> Association alone does not establish causation; volunteers need not represent every patient.'),
 ['trials'],['session10.pdf:23–31','session13.pdf:2–3,12'])

add('folate-risk','FOLATE: RISK RATIOS FROM COUNTS',
 p('<b>GIVEN</b> NTD is the event. Folate: 4 with NTD, 471 without; no folate: 27 with NTD, 498 without.')+
 p('<b>1. TOTALS</b> Add both outcomes within each group:')+
 eq(r'n_F=471+4=475,\quad n_{NF}=498+27=525')+
 p('<b>2. RISKS</b> Divide events by everyone in that group:')+
 eq(r'r_F=\frac4{475}=.00842105,\quad r_{NF}=\frac{27}{525}=.0514286')+
 p('<b>3. RATIO</b> For risk without folate relative to risk with folate:')+
 eq(r'\mathrm{RR}=\frac{r_{NF}}{r_F}=\frac{27/525}{4/475}=6.10714')+
 p('<b>RESULT</b> The no-folate group’s NTD risk was about 6.11 times the folate group’s risk.')+
 p('Swapping the groups takes the reciprocal:')+
 eq(r'\mathrm{RR}_{F:NF}=1/\mathrm{RR}_{NF:F}=.163743'),
 ['risk','odds'],['hw2.pdf:2','session13.pdf:4–10'])

add('quartile-steps','QUARTILES + IQR: LOCATE, INTERPOLATE, SUBTRACT',fields(
 'A data list; asks for quartiles, middle spread or a box plot.',
 eq(r'r=1+\frac{p(n-1)}{100},\quad\mathrm{IQR}=Q_3-Q_1'),
 ['Sort the list.','Find each percentile rank; interpolate between neighboring values.','Subtract quartiles; compare observations with the box-plot fences.'],
 p(r'Sorted heights: \(59,62,62,64,64,65,65,67,68,69\); \(n=10\).')+
 eq(r'r_{25}=1+.25(9)=3.25')+
 eq(r'Q_1=x_{(3)}+.25[x_{(4)}-x_{(3)}]')+
 eq(r'=62+.25(64-62)=62.5')+
 eq(r'r_{50}=1+.50(9)=5.5')+
 eq(r'\text{median}=64+.5(65-64)=64.5')+
 eq(r'r_{75}=1+.75(9)=7.75')+
 eq(r'Q_3=65+.75(67-65)=66.5')+
 eq(r'\mathrm{IQR}=66.5-62.5=4'),
 '', 'Middle half of the heights: 62.5–66.5 inches; median 64.5 inches.',
 'Use the fractional rank to move between two sorted observations; do not round it to the nearest rank.'),
 ['percentile','plots'],['hw1.pdf:4','session2.pdf','session15.pdf:7'])

add('cdf-endpoints','DISCRETE CDF: INCLUDE OR EXCLUDE THE ENDPOINT',fields(
 'A discrete probability with a strict or inclusive inequality.',
 eq(r'P(X>a)=1-F(a),\quad P(X\ge a)=1-F(a^-)')+
 eq(r'P(a<X\le b)=F(b)-F(a)'),
 ['For an included endpoint, keep its probability mass.','For an excluded endpoint, remove its mass.'],
 p(r'Use the probability table above. \(F(a^-)\) is the total just before \(a\).')+
 eq(r'F(2^-)=.55,\quad F(2)=.55+.15=.70')+
 eq(r'P(X>2)=1-.70=.30')+
 eq(r'P(X\ge2)=1-.55=.45')+
 eq(r'P(2<X\le7)=F(7)-F(2)=1-.70=.30')+
 eq(r'P(-1<X<3)=F(3^-)-F(-1)')+
 eq(r'=.70-.55=.15'),
 '', 'Including 2 adds its mass .15: the right-tail chance changes from .30 to .45.',
 'A discrete point can have positive probability. The continuous rule that a single point has zero probability does not apply.'),
 ['dcdf','pmf'],['hw1.pdf:2','session3.pdf','session4.pdf:3–4'])

add('integral-steps','INTEGRALS: SUBSTITUTE BOTH BOUNDS',
 p(r'Analysis time: \(f(x)=x/2\) on 0–2. An antiderivative \(G\) is a function whose derivative is \(f\).')+
 eq(r'\int_l^u f(x)\,dx=G(u)-G(l)')+
 p('<b>AREA</b> Integrate the density; insert upper and lower bounds:')+
 eq(r'P(1.5<X\le2)=\left[\frac{x^2}{4}\right]_{1.5}^{2}')+
 eq(r'=\frac{2^2}{4}-\frac{1.5^2}{4}=1-.5625=.4375')+
 p('<b>MEAN</b> Multiply the density by x before integrating:')+
 eq(r'E[X]=\int_0^2x\frac{x}{2}\,dx=\left[\frac{x^3}{6}\right]_0^2')+
 eq(r'=\frac{2^3}{6}-\frac{0^3}{6}=\frac86=\frac43'),
 ['integrate','density','cexpect'],['session4.pdf:20–21'])

S=[
 {'columns':[['data','summary','percentile','quartile-steps'],['discrete','loaded','discrete-sketch','cdf-endpoints'],['continuous','piecewise','events','integral-steps']]},
 {'columns':[['endpoint','uniform','coefficient','continuous-sketch'],['normal','quantile','normal-sketch'],['sampling','linear','precision','r-normal']]},
 {'columns':[['one-t','pooled-t','t-output'],['anova','conditions'],['bonferroni','holm','tables']],
  'bottom':[{'column':1,'span':2,'keys':['aov-output']}]},
 {'columns':[['binary','z-yates','chi2'],['large-chi','gof','chi-holm'],['risk','odds','design','folate-risk']]}
]
for page,s in enumerate(S,1):
 for col,keys in enumerate(s['columns'],1):
  for index,k in enumerate(keys,1):B[k]['location']={'page':page,'column':col,'box':index}
 for cell in s.get('bottom',[]):
  col=cell['column'];start=len(s['columns'][col-1])
  for index,k in enumerate(cell['keys'],start+1):B[k]['location']={'page':page,'column':col,'box':index,'span':cell['span']}
assert all('location' in b for b in B.values())
def code(k):
 l=B[k]['location'];return f'P{l["page"]}·C{l["column"]}·B{l["box"]}'
def ref(k):
 label={'sampling':'Sample means and SEM','percentile':'Sample percentiles','pooled-t':'Pooled t test'}[k]
 return f'<a class="method-reference" href="#v4-{k}" data-target="{k}">{label}</a>'
for b in B.values():b['html']=re.sub(r'\{\{([\w-]+)\}\}',lambda m:ref(m[1]),b['html'])
pack={'revision':'Version 4 · equations + full worked methods','blocks':B,'sheets':S,'margins':.3,'minimumBodyPt':7}
(R/'exam-sheet-v4-data.js').write_text('const V4_PACK='+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
prior=json.loads((R/'exam-priorities.json').read_text())
coverage=[]
for t in prior['topics']:
 keys=[k for k,b in B.items() if t['topic'] in b['topics']]
 coverage.append({**t,'boxes':[code(k) for k in keys],'status':'excluded' if t['excluded'] else 'covered' if keys else 'not separately requested'})
report={'revision':pack['revision'],'minimumBodyPt':7,'margins':.3,'indexRemoved':True,'protocolRemoved':True,
 'topics':coverage,'boxes':{k:{'code':code(k),'sources':b['sources']} for k,b in B.items()},
 'scopeDecisions':{'paired_t':'No paired-t procedure found in supplied Session 2–13 materials; omitted.',
 'welch':'Requested genuine default-output reading example on HW1 raw heights; no Welch derivation added.',
 'study_designs':'Masking/sham/crossover/parallel are in Session10; concise definitions retained.',
 'unbalanced_aov':'Actual source output is read as supplied; no unbalanced by-hand sum-of-squares method.',
 'f_df33':'Supplied table brackets denominator df33 by 32 and34; exact F(.05;2,33) is not a printed cell.'},
 'omitted':'Repeated numerical examples and CI lines in software output excerpts; covered methods retained. No Session14 errors/power; no R code-writing tutorial.',
 'graphs':GRAPHS,'rRuntime':OUT['runtime'], 'sourceHashes':{str(p.relative_to(R)):hashlib.sha256(p.read_bytes()).hexdigest() for p in (R/'sources').glob('*.pdf') if p.stem!='session14'}}
(R/'exam-sheet-v4-coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(f'Built Version 4: {len(B)} named sections, no index or printed navigation codes, four letter pages.')
