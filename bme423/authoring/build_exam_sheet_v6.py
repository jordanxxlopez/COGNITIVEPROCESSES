"""Author a NEW four-page worked-solution sheet. Never reads or overwrites V5.

Numbers and conventions come from Sessions 2–13, the two homework sets,
and the Session 15 review. General equations introduce each calculation;
every named cell/comparison then receives its own substituted calculation.
"""
from pathlib import Path
import hashlib, json

ROOT=Path(__file__).resolve().parents[1]
B={}
def m(tex): return r'\['+tex+r'\]'
def i(tex): return r'\('+tex+r'\)'
def p(text): return '<p>'+text+'</p>'
def step(title, general, *work, note=''):
    return '<div class="v6-step"><h4>'+title+'</h4>'+m(general)+''.join(m(w) for w in work)+(p(note) if note else '')+'</div>'
def table(headers,rows):
    return '<table><thead><tr>'+''.join('<th>'+str(x)+'</th>' for x in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+str(x)+'</td>' for x in row)+'</tr>' for row in rows)+'</tbody></table>'
def box(key,title,html,sources,topics): B[key]=dict(title=title,html=html,sources=sources,topics=topics)

box('notation','Data types and notation',
 p('<b>BME423 · V6.</b> Population: the entire group; sample: the measured subset. A population parameter is fixed; a sample statistic changes across samples.')+
 p(i(r'x_i')+' (observation '+i('i')+'); '+i('n')+' (sample size); '+i(r'\bar x')+' (sample mean); '+i(r'\mu')+' (population mean); '+i('s')+' (sample SD); '+i(r'\sigma')+' (population SD); '+i(r's^2,\sigma^2')+' (variances). '+i(r'\sum')+' means add the specified terms.')+
 p('<b>Interval–continuous:</b> measurements on a continuum, e.g. blood pressure, height or membrane potential. <b>Interval–discrete:</b> counts or rounded measurements, e.g. tender joints, text-message count or age rounded to years. <b>Categorical–nominal:</b> unordered categories, e.g. country or ZIP code. <b>Categorical–ordered:</b> categories with a natural order, e.g. cancer stage or severity. A numeric label such as ZIP code is not an interval measurement.'),
 ['session2.pdf','session15.pdf'],['data-scales','notation'])

heights=[65,69,59,64,62,67,68,62,64,65]
box('summary','Height data: mean, variance, SD and SEM',
 p('<b>Question.</b> Heights are 65, 69, 59, 64, 62, 67, 68, 62, 64, 65. Estimate the mean, variance, SD and standard error of the mean.')+
 step('1. Add the observations; divide by their count',r'\bar x=\frac{\sum_{i=1}^{n}x_i}{n}',r'n=10,\quad \sum x_i=645',r'\bar x=\frac{645}{10}=64.5')+
 step('2. Subtract the mean, then square each difference',r'd_i=x_i-\bar x,\qquad d_i^2=(x_i-\bar x)^2',
   r'd_1=65-64.5=.5,\quad d_1^2=.5^2=.25',
   r'd_2=69-64.5=4.5,\quad d_2^2=4.5^2=20.25',
   r'd_3=59-64.5=-5.5,\quad d_3^2=(-5.5)^2=30.25',
   r'd_4=64-64.5=-.5,\quad d_4^2=(-.5)^2=.25',
   r'd_5=62-64.5=-2.5,\quad d_5^2=(-2.5)^2=6.25',
   r'd_6=67-64.5=2.5,\quad d_6^2=2.5^2=6.25',
   r'd_7=68-64.5=3.5,\quad d_7^2=3.5^2=12.25',
   r'd_8=62-64.5=-2.5,\quad d_8^2=(-2.5)^2=6.25',
   r'd_9=64-64.5=-.5,\quad d_9^2=(-.5)^2=.25',
   r'd_{10}=65-64.5=.5,\quad d_{10}^2=.5^2=.25',
   r'\sum d_i^2=82.5')+
 step('3. Divide by one less than the sample size',r's^2=\frac{\sum (x_i-\bar x)^2}{n-1}',r's^2=\frac{82.5}{10-1}=9.16666667')+
 step('4. Square-root variance; scale SD for a mean',r's=\sqrt{s^2},\qquad SEM=\frac{s}{\sqrt n}',r's=\sqrt{9.16666667}=3.02765035',r'SEM=\frac{3.02765035}{\sqrt{10}}=.957427108',note='SD describes variation among heights; SEM describes variation among repeated sample means. Variance has squared units; SD and SEM have the original units.')+
 p('<b>Whole population instead:</b> use its population mean and divide squared deviations by '+i('N')+', not '+i('n-1')+'.')+
 m(r'\mu=\frac{\sum_i x_i}{N},\qquad\sigma^2=\frac{\sum_i(x_i-\mu)^2}{N}'),
 ['hw1.pdf','session2.pdf'],['mean','variance','sd','sem'])

box('percentile','Sorted heights: median, quartiles and IQR',
 p('<b>Question.</b> For the same heights, find the median, quartiles, IQR and range. Sorted data: 59, 62, 62, 64, 64, 65, 65, 67, 68, 69.')+
 step('1. Locate a percentile between sorted ranks',r'R=1+\frac{p(n-1)}{100}=I+d',r'R_{25}=1+\frac{25(10-1)}{100}=3.25',r'R_{50}=1+\frac{50(10-1)}{100}=5.5',r'R_{75}=1+\frac{75(10-1)}{100}=7.75',note=i('p')+' (percentile number); '+i('I')+' (integer rank); '+i('d')+' (fraction of the gap to the next rank).')+
 step('2. Interpolate the measured values, not the ranks',r'x_p=x_{(I)}+d[x_{(I+1)}-x_{(I)}]',r'Q_1=62+.25(64-62)=62.5',r'Q_2=64+.5(65-64)=64.5',r'Q_3=65+.75(67-65)=66.5')+
 step('3. Subtract the appropriate endpoints',r'IQR=Q_3-Q_1,\quad \text{range}=x_{\max}-x_{\min}',r'IQR=66.5-62.5=4',r'\text{range}=69-59=10'),
 ['hw1.pdf','session2.pdf'],['percentiles','median','iqr'])

box('discrete','Discrete table: probabilities, mean and variance',
 p('<b>Question.</b> Check this probability function. Find its mean, variance, CDF, and the probability that the outcome is at least 2 but less than 7.')+
 table([i('x'),'-1','2','3','7'],[[i('p(x)'),'.55','.15','.10','.20']])+
 step('1. Check both probability requirements',r'0\le p(x)\le1,\qquad \sum_xp(x)=1',r'.55+.15+.10+.20=1')+
 step('2. Weight each value by its probability',r'\mu=E[X]=\sum_x x\,p(x)',r'\begin{aligned}\mu&=(-1)(.55)+2(.15)\\&\quad+3(.10)+7(.20)\\&=-.55+.30+.30+1.40=1.45\end{aligned}',note=i('X')+' (random variable before observing the outcome); '+i('x')+' (one possible value); '+i('p(x)')+' (its probability).')+
 step('3. Square the values before weighting',r'E[X^2]=\sum_x x^2p(x)',r'\begin{aligned}E[X^2]&=1(.55)+4(.15)\\&\quad+9(.10)+49(.20)\\&=.55+.60+.90+9.80=11.85\end{aligned}')+
 step('4. Direct variance: weight EVERY squared deviation',r'v_x=(x-\mu)^2p(x),\quad\operatorname{Var}(X)=\sum_x v_x',r'v_{-1}=(-1-1.45)^2(.55)=3.301375',r'v_2=(2-1.45)^2(.15)=.045375',r'v_3=(3-1.45)^2(.10)=.24025',r'v_7=(7-1.45)^2(.20)=6.1605',r'\operatorname{Var}(X)=3.301375+.045375+.24025+6.1605',r'=9.7475')+
 step('5. Check with the second-moment shortcut',r'\operatorname{Var}(X)=E[X^2]-(E[X])^2',r'\operatorname{Var}(X)=11.85-1.45^2=9.7475',r'SD(X)=\sqrt{9.7475}=3.12209865')+
 step('6. Add only the included masses',r'P(X\in A)=\sum_{x\in A}p(x)',r'P(2\le X<7)=p(2)+p(3)=.15+.10=.25'),
 ['hw1.pdf','session3.pdf'],['pmf','expectation','variance-discrete'])

box('discrete-cdf','Discrete CDF and graph endpoints',
 step('1. Accumulate probabilities through the endpoint',r'F(x)=P(X\le x)=\sum_{t\le x}p(t)',
 r'F(x)=\begin{cases}0&x<-1\\.55&-1\le x<2\\.70&2\le x<3\\.80&3\le x<7\\1&x\ge7\end{cases}')+
 step('2. Include or exclude the endpoint mass',r'P(X>a)=1-F(a)',r'P(X>2)=1-.70=.30',r'P(X\ge2)=1-P(X<2)=1-.55=.45',r'P(-1<X<3)=p(2)=.15')+
 '<img class="v6-plot" src="figures/v4-discrete.svg" alt="Discrete mass plot and right-continuous step CDF">'+
 p('<b>Sketch:</b> PMF uses separate mass spikes. CDF jumps by each mass, stays flat between values, and includes the new height at the jump (filled dot); the lower endpoint is open. A discrete point can have positive probability.'),
 ['session3.pdf','hw1.pdf'],['cdf-discrete','graph-discrete'])

box('loaded','Loaded die and repeated draws',
 p('<b>Question.</b> A die has '+i('p(1)=.20')+'; each of 2–6 has probability .16. Find '+i(r'P(X\le3)')+', mean and variance.')+
 step('Weight using the stated masses',r'P(X\le a)=\sum_{x\le a}p(x),\quad E[X]=\sum xp(x)',r'P(X\le3)=.20+.16+.16=.52',r'E[X]=1(.20)+(2+3+4+5+6)(.16)=3.4',r'E[X^2]=1(.20)+(4+9+16+25+36)(.16)=14.6',r'\operatorname{Var}(X)=E[X^2]-\mu^2=14.6-3.4^2=3.04'),
 ['session3.pdf','session15.pdf'],['loaded-die'])

box('events','Successive events: update the available outcomes',
 p('<b>Question.</b> Two cards are drawn without replacement from 52 cards. Find the probability that both are kings.')+
 step('Without replacement: update the second draw',r'P(A\cap B)=P(A)P(B\mid A)',r'P(\text{two kings})=\frac4{52}\frac3{51}=.00452489',note='For independent events, the second probability stays unchanged. Three fair coin flips have 8 equally likely sequences; exactly two heads occurs as HHT, HTH or THH, so its probability is 3/8.'),
 ['session3.pdf','session15.pdf'],['conditional-probability'])

box('density','Continuous density: integrate, then evaluate bounds',
 p('<b>Question.</b> Let '+i(r'f(x)=x/2')+' for '+i('0<x<2')+', zero elsewhere. Verify the density, then find its CDF, mean, variance, a tail probability and median.')+
 step('1. Check total area and nonnegative height',r'\int_{-\infty}^{\infty}f(x)\,dx=1',r'\int_0^2\frac{x}{2}\,dx=\left[\frac{x^2}{4}\right]_0^2',r'=\frac{2^2}{4}-\frac{0^2}{4}=1',note='The density is nonnegative on its support. Density height is not probability; probability is area. '+i(r'\int_a^b g(x)\,dx=G(b)-G(a)')+' means evaluate the antiderivative at the upper bound, then subtract its lower-bound value.')+
 step('2. Accumulate area only up to the requested value',r'F(x)=\int_{-\infty}^{x}f(t)\,dt',r'F(x)=\int_0^x\frac t2\,dt=\left[\frac{t^2}{4}\right]_0^x=\frac{x^2}{4}',r'F(x)=\begin{cases}0&x\le0\\x^2/4&0<x<2\\1&x\ge2\end{cases}')+
 step('3. Multiply by the outcome before integrating',r'\mu=E[X]=\int x f(x)\,dx',r'E[X]=\int_0^2 x\frac{x}{2}\,dx=\int_0^2\frac{x^2}{2}\,dx',r'=\left[\frac{x^3}{6}\right]_0^2=\frac86-0=\frac43')+
 step('4. Use a second moment for variance',r'E[X^2]=\int x^2f(x)\,dx,\quad \sigma^2=E[X^2]-\mu^2',r'E[X^2]=\int_0^2\frac{x^3}{2}\,dx=\left[\frac{x^4}{8}\right]_0^2=2',r'\sigma^2=2-\left(\frac43\right)^2=\frac{18-16}{9}=\frac29')+
 step('5. A right tail is the unaccumulated area',r'P(X>a)=1-F(a)',r'F(1.5)=\frac{1.5^2}{4}=.5625',r'P(X>1.5)=1-.5625=.4375')+
 step('6. A median splits the total area in half',r'F(m)=.5',r'\frac{m^2}{4}=.5\Rightarrow m^2=2\Rightarrow m=\sqrt2',note='Keep the positive root inside the support. For a continuous variable, '+i('P(X=a)=0')+'; strict and inclusive endpoints have the same probability.'),
 ['session4.pdf','session15.pdf'],['density','integration','cdf-continuous','moments','median-continuous'])

box('piecewise','A density with two pieces',
 p('<b>Question.</b> A triangular density is '+i('f(x)=x')+' on (0,1) and '+i('f(x)=2-x')+' on [1,2). Find its CDF and '+i('P(.5<X<1.5)')+'.')+
 step('Carry the completed first area into the second piece',r'F(x)=\int_{-\infty}^{x}f(t)\,dt',r'0<x<1:\quad F(x)=\int_0^x t\,dt=\frac{x^2}{2}',r'1\le x<2:\quad F(x)=\frac12+\int_1^x(2-t)\,dt',r'=\frac12+\left[2t-\frac{t^2}{2}\right]_1^x=2x-\frac{x^2}{2}-1',r'F(x)=0\ (x\le0),\qquad F(x)=1\ (x\ge2)')+
 step('Subtract accumulated areas',r'P(a<X<b)=F(b)-F(a)',r'F(.5)=\frac{.5^2}{2}=.125',r'F(1.5)=2(1.5)-\frac{1.5^2}{2}-1=.875',r'P(.5<X<1.5)=.875-.125=.75',note='The CDF remains continuous at 1; only its formula changes. Do not restart accumulated probability at zero.'),
 ['session4.pdf'],['piecewise-density','piecewise-cdf'])

box('endpoint','Homework density: solve the unknown endpoint',
 p('<b>Question.</b> '+i(r'f(x)=.1+x')+' for '+i(r'0<x\le c')+', zero elsewhere. Find '+i('c')+', the CDF, mean, variance and requested probabilities.')+
 step('1. Force the full support area to equal one',r'\int_0^c f(x)\,dx=1',r'\int_0^c(.1+x)\,dx=\left[.1x+\frac{x^2}{2}\right]_0^c=1',r'.1c+\frac{c^2}{2}=1\Rightarrow c^2+.2c-2=0')+
 step('2. Solve the quadratic; keep the valid endpoint',r'c=\frac{-b\pm\sqrt{b^2-4ac}}{2a}',r'c=\frac{-.2\pm\sqrt{.2^2-4(1)(-2)}}{2}',r'=\frac{-.2\pm\sqrt{8.04}}{2}',r'c=1.31774469',note='Here the quadratic coefficients are '+i(r'a=1,b=.2,c_{\rm quad}=-2')+'; the support endpoint is the positive root. A negative endpoint cannot give this support.')+
 step('3. Integrate only to the requested value',r'F(x)=\int_0^x f(t)\,dt',r'F(x)=\left[.1t+\frac{t^2}{2}\right]_0^x=.1x+\frac{x^2}{2}',r'F(x)=0\ (x\le0),\qquad F(x)=1\ (x\ge c)')+
 step('4. Multiply by x and expand before integrating',r'E[X]=\int_0^c x f(x)\,dx',r'x(.1+x)=.1x+x^2',r'E[X]=\int_0^c(.1x+x^2)\,dx',r'=\left[.05x^2+\frac{x^3}{3}\right]_0^c',r'=.05(1.31774469)^2+\frac{(1.31774469)^3}{3}',r'= .849555608')+
 step('5. Square x, not the entire density',r'E[X^2]=\int_0^c x^2f(x)\,dx',r'x^2(.1+x)=.1x^2+x^3',r'E[X^2]=\left[\frac{x^3}{30}+\frac{x^4}{4}\right]_0^c',r'=\frac{(1.31774469)^3}{30}+\frac{(1.31774469)^4}{4}',r'=.830088878')+
 step('6. Subtract squared mean from second moment',r'\operatorname{Var}(X)=E[X^2]-(E[X])^2',r'\operatorname{Var}(X)=.830088878-(.849555608)^2',r'=.108344148')+
 step('7. Use the CDF and complement',r'P(X>a)=1-F(a),\quad P(X<b)=F(b)',r'P(X>.5)=1-[.1(.5)+.5^2/2]=.825',r'P(X<.6)=.1(.6)+.6^2/2=.24')+
 step('8. Transform the mean without a new density',r'E[aX+b]=aE[X]+b',r'E[2X+1]=2(.849555608)+1=2.69911122')+
 step('9. Find the median using half the total area',r'F(m)=.5',r'.1m+\frac{m^2}{2}=.5\Rightarrow m^2+.2m-1=0',r'm=\frac{-.2+\sqrt{.04+4}}2=.904987562',note='Keep the root inside the support, 0 to 1.31774469.'),
 ['hw1.pdf','session4.pdf'],['unknown-support','quadratic','continuous-expectation','continuous-variance'])

box('uniform','Uniform range and unknown coefficient',
 p('<b>Question.</b> For the standard uniform distribution on (0,1), find its height, the probability below .5, its mean and variance.')+
 step('Spread total area one across the interval',r'f(x)=\frac1{b-a},\quad P(u<X<v)=\frac{v-u}{b-a}',r'f(x)=\frac1{1-0}=1,\qquad P(0<X<.5)=\frac{.5-0}{1-0}=.5',r'E[X]=\frac{a+b}{2}=\frac{0+1}{2}=.5',r'\operatorname{Var}(X)=\frac{(b-a)^2}{12}=\frac{(1-0)^2}{12}=\frac1{12}')+
 step('Unknown coefficient: factor it out of the area',r'f(x)=kx\ (0<x<2),\quad k\int_0^2x\,dx=1',r'k\left[\frac{x^2}{2}\right]_0^2=1\Rightarrow 2k=1\Rightarrow k=\frac12'),
 ['session4.pdf','session15.pdf'],['uniform','unknown-coefficient'])

box('normal','Glucose: left, between and right Normal areas',
 p('<b>Question.</b> Glucose '+i(r'X\sim N(95,8.7^2)')+'. Find the probabilities below 85, from 85 to 115, and above 115. Here 8.7 is SD, not variance.')+
 step('Write the Normal density and accumulated area',r'f_X(x)=\frac1{\sigma\sqrt{2\pi}}\exp\!\left[-\frac{(x-\mu)^2}{2\sigma^2}\right]',r'f_X(x)=\frac1{8.7\sqrt{2\pi}}\exp\!\left[-\frac{(x-95)^2}{2(8.7)^2}\right]',r'F_X(x)=\int_{-\infty}^{x} f_X(t)\,dt',note='The CDF integral need not be solved algebraically; use the Normal table after standardizing.')+
 step('1. Convert measurement cutoffs to SD units',r'z=\frac{x-\mu}{\sigma}',r'z_{85}=\frac{85-95}{8.7}=-1.14942529\approx-1.15',r'z_{115}=\frac{115-95}{8.7}=2.29885057\approx2.30')+
 step('2. Read accumulated LEFT area in the Normal table',r'\Phi(z)=P(Z\le z),\quad \Phi(-z)=1-\Phi(z)',r'\Phi(1.15)=.8749\Rightarrow\Phi(-1.15)=.1251',r'\Phi(2.30)=.9893',note='For 1.15 use row 1.1 and column .05; for 2.30 use row 2.3 and column .00. Shade the requested side before subtracting.')+
 step('3. Use the CDF for each requested region',r'P(X<a)=\Phi(z_a)',r'P(X<85)=\Phi(-1.15)=.1251',r'P(a<X<b)=\Phi(z_b)-\Phi(z_a)',r'P(85<X<115)=.9893-.1251=.8642',r'P(X>b)=1-\Phi(z_b)',r'P(X>115)=1-.9893=.0107')+
 p('<b>TI-84:</b> DISTR → normalcdf(lower,upper,95,8.7). Use −1E99/1E99 for infinite bounds. Calculator values are .1251903, .8640530 and .0107567; small table-rounding differences are expected.')+
 m(r'z_0=\frac{0-95}{8.7}=-10.9195402')+
 m(r'P(X<0)=\Phi(-10.9195402)\approx0,\quad P(X=95)=0')+
 p('A single exact value has zero area. The three disjoint regions below 85, from 85 to 115, and above 115 sum to one.'),
 ['hw1.pdf','session5.pdf'],['normal','normal-tails','normal-table'])

box('quantile','Given a Normal area: recover the measurement',
 p('<b>Question.</b> Find the glucose 25th and 75th percentiles and central 95% interval.')+
 step('1. Match cumulative area to a standard cutoff',r'\Phi(z_p)=p,\qquad x_p=\mu+z_p\sigma',r'z_{.25}=-.67448975,\quad z_{.75}=+.67448975',r'x_{25}=95+(-.67448975)(8.7)=89.1319392',r'x_{75}=95+(.67448975)(8.7)=100.868061')+
 step('2. Put half the omitted area in each tail',r'P(-z_*<Z<z_*)=.95\Rightarrow\Phi(z_*)=.975',r'z_*=1.96',r'x_L=\mu-z_*\sigma=95-1.96(8.7)=77.948',r'x_U=x_{97.5}=\mu+z_*\sigma=95+1.96(8.7)=112.052',note='<b>TI-84:</b> invNorm(left area,95,8.7). A right-tail area .025 means LEFT area .975. Use the specified tail; do not enter a percentage such as 97.5.')+
 '<img class="v6-plot" src="figures/v4-normal.svg" alt="Normal density and cumulative probability with shaded intervals">'+
 p('<b>Sketch:</b> density is a bell centered at '+i(r'\mu')+'; mark cutoffs and shade area. Normal CDF rises smoothly from 0 to 1, crosses .5 at '+i(r'\mu')+', and has no jumps. Larger SD widens the density.'),
 ['hw1.pdf','session5.pdf'],['inverse-normal','normal-graph'])

box('continuous-graph','Draw a continuous PDF and CDF',
 '<img class="v6-plot" src="figures/v4-continuous.svg" alt="Homework density .1 plus x and its continuous cumulative function">'+
 p('<b>Density '+i('f(x)=.1+x')+':</b> zero outside (0,'+i('c')+']; inside, draw a straight rising line from height .1 to .1+'+i('c')+'. Shade an interval under the line. '+i('f(.5)=.6')+' is a height, not a probability.')+
 p('<b>CDF:</b> zero before 0, curve '+i('F(x)=.1x+x^2/2')+' inside, then flat at 1 after '+i('c')+'. It is continuous and increasing. Its slope at each point is the density height. Changing formulas can create corners; a continuous density has no point-mass jumps.'),
 ['hw1.pdf','session4.pdf'],['continuous-graph'])

box('sampling','Average of n: sampling distribution and CLT',
 p('<b>Question.</b> Individual responses have mean 4 and SD 1.5. For independent samples of 50, find the probability that the sample mean is between 3.5 and 3.8.')+
 step('1. Keep the center; reduce variance for averaging',r'E[\bar X]=\mu,\quad\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}',r'E[\bar X]=4,\quad \operatorname{Var}(\bar X)=\frac{1.5^2}{50}=.045',r'SD(\bar X)=\frac{\sigma}{\sqrt n}=\frac{1.5}{\sqrt{50}}=.212132034',note=i(r'\bar X')+' (random sample mean); '+i(r'\bar x')+' (one observed mean). If individuals are Normal, means are Normal at any sample size. Otherwise the CLT gives an approximately Normal mean for sufficiently large independent samples (course rule: '+i(r'n\ge30')+').')+
 step('2. Divide each mean cutoff by the MEAN spread',r'z=\frac{\bar x-\mu}{\sigma/\sqrt n}',r'z_L=\frac{3.5-4}{.212132034}=-2.35702260',r'z_U=\frac{3.8-4}{.212132034}=-.942809042')+
 step('3. Subtract the accumulated areas',r'P(a<\bar X<b)=\Phi(z_b)-\Phi(z_a)',r'\Phi(-.942809042)=.172889293',r'\Phi(-2.35702260)=.009211063',r'P(3.5<\bar X<3.8)=.172889293-.009211063',r'=.163678230',note='Rounded table cutoffs −.94 and −2.36 give .1736−.0091=.1645. For an individual observation, use '+i(r'\sigma')+' itself; do not divide it by '+i(r'\sqrt n')+'.'),
 ['session10.pdf','session15.pdf'],['sampling','clt','sem-probability'])

box('linear','Shift, scale, and independent sums',
 p('<b>Question.</b> For the homework glucose variable, find '+i('E[X-26]')+'. A constant changes the center, while multiplying a variable also changes its spread.')+
 step('1. Apply coefficients directly to the mean',r'E[aX+b]=a\mu+b,\quad\operatorname{Var}(aX+b)=a^2\sigma^2',r'E[X-26]=95-26=69',r'\operatorname{Var}(X-26)=1^2(8.7^2)=75.69')+
 step('2. For independent variables, ADD variances',r'E[aX+bY]=a\mu_X+b\mu_Y',r'\operatorname{Var}(aX+bY)=a^2\sigma_X^2+b^2\sigma_Y^2',note='For two independent measurements with the glucose distribution:')+
 m(r'E[X+Y]=95+95=190')+m(r'\operatorname{Var}(X+Y)=8.7^2+8.7^2=151.38')+
 m(r'\operatorname{Var}(X-Y)=8.7^2+(-1)^2(8.7^2)=151.38')+
 p('Subtraction still adds variance because its coefficient is squared. The independent-sum variance rule does not apply to '+i('X+X')+': that is '+i('2X')+', whose variance is '+i(r'4\sigma^2')+'.'),
 ['session3.pdf','session10.pdf'],['linear-transform','independent-sum'])

box('precision','Sample size and precision of an average',
 p('<b>Question.</b> The height sample has SD 3.02765035 and SEM .957427108 with 10 observations. How does the estimated SEM change with four times as many observations?')+
 step('Compare sample sizes with individual spread held fixed',r'SEM_{\rm new}=SEM_{\rm old}\sqrt{\frac{n_{\rm old}}{n_{\rm new}}}',r'n_{\rm new}=4(10)=40',r'SEM_{\rm new}=.957427108\sqrt{\frac{10}{40}}=.478713554',note='Quadrupling sample size halves SEM. For a target SEM, rearrange '+i(r'SEM=s/\sqrt n')+': '+i(r'n=(s/SEM_{\rm target})^2')+', then round upward. Larger samples improve the mean’s precision; they do not necessarily reduce individual variation.'),
 ['session10.pdf'],['precision','sample-size'])

box('one-t','One mean: student LDL against a fixed reference',
 p('<b>Question.</b> Sixteen USC undergraduates have mean LDL 103 mg/dL and SD 16 mg/dL. The faculty/staff reference mean is 115 mg/dL. Assuming Normal independent responses, is the undergraduate population mean different at '+i(r'\alpha=.05')+'?')+
 step('1. State the population hypotheses',r'H_0:\mu=\mu_0,\qquad H_A:\mu\ne\mu_0',r'H_0:\mu=115,\qquad H_A:\mu\ne115',note='<b>In words:</b> the undergraduate population mean equals 115 under the null; it differs from 115 under the alternative. '+i(r'\mu_0')+' is the fixed reference, not another sample mean.')+
 step('2. Estimate the mean’s standard error',r'SE=\frac{s}{\sqrt n}',r'SE=\frac{16}{\sqrt{16}}=\frac{16}{4}=4')+
 step('3. Standardize the observed departure',r't=\frac{\bar x-\mu_0}{s/\sqrt n}',r't=\frac{103-115}{4}=\frac{-12}{4}=-3')+
 step('4. Use the one-sample degrees of freedom',r'\nu=n-1,\qquad |t|>t_{\rm crit}\Rightarrow\text{reject }H_0',r'\nu=16-1=15',r't_{\rm crit}=t_{.025,15}=2.131450',r'|t|=3>2.131450',note='<b>Table:</b> row 15, total two-tail column .05 (printed cutoff 2.131). Reject the null: undergraduate population mean LDL differs from 115 at .05; the sample direction is lower.')+
 p('<b>p-value:</b> '+i(r'p=2P(T_{15}\ge3)=.00897274')+'. Compare '+i('p')+' directly with .05. It is not the probability that the null hypothesis is true.'),
 ['hw2.pdf','session8.pdf'],['one-sample-t','hypothesis-words'])

box('pooled-t','Two independent means: cognitive response',
 p('<b>Question.</b> Control: '+i('n_1=22')+', mean 49, SD 8.4. Intervention: '+i('n_2=27')+', mean 57, SD 9.5. Test whether the population means differ at .05. Assume independent Normal populations with a common variance.')+
 step('1. State the hypotheses for the two populations',r'H_0:\mu_1=\mu_2,\qquad H_A:\mu_1\ne\mu_2',note='<b>In words:</b> control and intervention have equal population means under the null; their population means differ under the alternative.')+
 step('2. Pool VARIANCES, weighted by their df',r's_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}',r's_1^2=8.4^2=70.56,\qquad s_2^2=9.5^2=90.25',r's_p^2=\frac{21(70.56)+26(90.25)}{22+27-2}',r'=\frac{1481.76+2346.50}{47}=81.4523404')+
 step('3. Compute the standard error of the difference',r'SE_{\rm diff}=\sqrt{s_p^2\left(\frac1{n_1}+\frac1{n_2}\right)}',r'SE_{\rm diff}=\sqrt{81.4523404\left(\frac1{22}+\frac1{27}\right)}',r'=2.59212894')+
 step('4. Divide the observed mean gap by its SE',r't=\frac{\bar x_1-\bar x_2}{SE_{\rm diff}}',r't=\frac{49-57}{2.59212894}=-3.08626622')+
 step('5. Compare with a two-sided cutoff',r'\nu=n_1+n_2-2,\quad |t|>t_{\rm crit}',r'\nu=22+27-2=47',r'|t|=3.08626622>t_{.025,47}=2.01174051',note='If row 47 is missing, neighboring rows 46 and 48 give 2.013 and 2.011; the decision is unchanged. Reject equal population means. The intervention has the larger sample mean. '+i('p=.00339345')+'. Unequal sample sizes do not prevent pooling when common variance is assumed.'),
 ['hw2.pdf','session8.pdf'],['pooled-t','unequal-sample-sizes'])

box('t-output','Read supplied t-test output',
 '<pre>Welch Two Sample t-test\nt = -4.5298, df = 15.611\np-value = 0.0003625\nmean of x   mean of y\n64.5        69.7</pre>'+
 p('Read '+i('t')+' (observed statistic), df (reference distribution) and p-value. '+i('.0003625<.05')+': reject equal population means. The negative statistic matches the first mean being smaller. Welch output can have fractional df; use the df printed in that output.')+
 '<pre>Two Sample t-test\nt = -4.5298, df = 18\np-value = 0.0002594</pre>'+
 p('“Two Sample t-test” with pooled variances uses '+i(r'\nu=n_1+n_2-2')+'. The course’s hand calculations use the stated common-variance model; interpret supplied output according to its printed test name.'),
 ['session8.pdf','session15.pdf'],['t-output'])

box('anova','Three filgrastim doses: balanced ANOVA',
 p('<b>Question.</b> Fifteen patients per dose receive low, medium or high filgrastim. Their neutrophil concentration summaries are below. Test whether the three population means are all equal at .05; then compare dose pairs as one family.')+
 table(['Dose','Mean','SD'],[['Low','3.7','1.1'],['Medium','4.6','1.4'],['High','5.2','2.1']])+
 step('1. State the overall population hypotheses',r'H_0:\mu_1=\mu_2=\mu_3',r'H_A:\text{not all population means are equal}',note='<b>In words:</b> the three dose population means are equal under the null; at least one differs under the alternative. Assume independent Normal responses and equal population variances.')+
 step('2. Average the group variances for within spread',r's_{\rm wit}^2=\frac{\sum_{j=1}^m s_j^2}{m}',r's_{\rm wit}^2=\frac{1.1^2+1.4^2+2.1^2}{3}',r'=\frac{1.21+1.96+4.41}{3}=2.52666667',note=i('m=3')+' (number of groups); '+i('n=15')+' (people per group); '+i('s_j')+' (SD in group '+i('j')+').')+
 step('3. Average the means; square their deviations',r'\bar{\bar x}=\frac{\sum_j\bar x_j}{m}',r'\bar{\bar x}=\frac{3.7+4.6+5.2}{3}=4.5',r'\begin{aligned}\sum_j(\bar x_j-\bar{\bar x})^2&=(3.7-4.5)^2\\&\quad+(4.6-4.5)^2+(5.2-4.5)^2\\&=.64+.01+.49=1.14\end{aligned}')+
 step('4. Divide by m−1, then multiply by group size',r's_{\bar x}^2=\frac{\sum_j(\bar x_j-\bar{\bar x})^2}{m-1},\quad s_{\rm bet}^2=ns_{\bar x}^2',r's_{\bar x}^2=\frac{1.14}{3-1}=.57',r's_{\rm bet}^2=15(.57)=8.55')+
 step('5. Divide between by within',r'F=\frac{s_{\rm bet}^2}{s_{\rm wit}^2}',r'F=\frac{8.55}{2.52666667}=3.38390501')+
 step('6. Use numerator and denominator df in that order',r'\nu_1=m-1,\quad\nu_2=m(n-1)',r'\nu_1=3-1=2,\quad\nu_2=3(15-1)=42',r'F=3.38390501>F_{.05;2,42}=3.21994229',note='<b>Table:</b> right-tail .05; numerator df 2 across the top, denominator df 42 down the side, lightface value 3.22. Reject all-equal population means; at least one dose population differs. '+i('p=.04339471')+'. The pairwise calculations are separate from the overall decision.'),
 ['hw2.pdf','session6.pdf','session15.pdf'],['balanced-anova','anova-variance','anova-df'])

box('anova-output','Use supplied ANOVA output for follow-up tests',
 '<pre>             Df Mean Sq\nGroup         2  389.7\nResiduals    19   66.8\nF value = 5.832\nPr(>F) = 0.0106</pre>'+
 p('The residual Mean Sq is the within variance, 66.8; residual df is 19. The group Mean Sq is the between variance. '+i(r'F=s_{\rm bet}^2/s_{\rm wit}^2')+'; the reported F uses the unrounded mean squares. '+i('.0106<.05')+': reject all-equal population means. For requested pairwise tests, retain within variance 66.8 and df 19; do not substitute a new two-group df.')+
 p('<b>Conditions:</b> quantitative outcomes, independent observations, Normal populations and a common variance. The hand ANOVA above requires equal group sizes. A significant overall test establishes a difference somewhere; the adjusted comparisons identify which pairs are supported.'),
 ['hw2.pdf','session7.pdf','session15.pdf'],['anova-output','assumptions'])

box('bonferroni','Filgrastim pairs: Bonferroni, every comparison',
 p('<b>Question.</b> Compare all three dose pairs at family '+i(r'\alpha=.05')+', using the original ANOVA within variance and residual df.')+
 step('1. State the hypothesis for EACH dose pair',r'H_{0,ij}:\mu_i=\mu_j,\quad H_{A,ij}:\mu_i\ne\mu_j',note='<b>In words:</b> each null says the two named dose populations have equal means; each alternative says those population means differ.')+
 step('2. Divide family alpha by the requested pair count',r'k=\frac{m(m-1)}2,\quad\alpha_{\rm pair}=\frac{\alpha_{\rm family}}k',r'k=\frac{3(3-1)}2=3,\quad\alpha_{\rm pair}=\frac{.05}{3}=.01666667',r'\nu=m(n-1)=3(14)=42',r't_{\rm crit}=t_{\alpha_{\rm pair}/2,42}=2.49366738',note='Use total two-tail probability .01666667, or one-tail .00833333, once. '+i('k')+' counts the specified comparison family, not automatically every possible pair.')+
 p('<b>TI-84, missing table column:</b> DISTR → invT. Enter the LEFT cumulative area and original residual df:')+
 m(r't_{\rm crit}=\operatorname{invT}(1-\alpha_{\rm pair}/2,\nu)')+
 m(r'=\operatorname{invT}(1-(.05/3)/2,42)=2.49366738')+
 step('3. Compute the shared SE using the original within variance',r'SE_{ij}=\sqrt{s_{\rm wit}^2\left(\frac1{n_i}+\frac1{n_j}\right)}',r'SE_{ij}=\sqrt{2.52666667\left(\frac1{15}+\frac1{15}\right)}',r'=\sqrt{\frac{2(2.52666667)}{15}}=.580421303')+
 step('4. Low versus Medium',r'|t_{ij}|=\frac{|\bar x_i-\bar x_j|}{SE_{ij}}',r'|t_{LM}|=\frac{|3.7-4.6|}{.580421303}=1.550598',r'1.550598<2.49366738\Rightarrow\text{do not reject }H_{0,LM}')+
 step('5. Low versus High',r'|t_{ij}|=\frac{|\bar x_i-\bar x_j|}{SE_{ij}}',r'|t_{LH}|=\frac{|3.7-5.2|}{.580421303}=2.584330',r'2.584330>2.49366738\Rightarrow\text{reject }H_{0,LH}')+
 step('6. Medium versus High',r'|t_{ij}|=\frac{|\bar x_i-\bar x_j|}{SE_{ij}}',r'|t_{MH}|=\frac{|4.6-5.2|}{.580421303}=1.033732',r'1.033732<2.49366738\Rightarrow\text{do not reject }H_{0,MH}',note='<b>Conclusion:</b> only low versus high is supported as different at family .05. A nonsignificant pair does not establish that its population means are identical.'),
 ['hw2.pdf','session9.pdf'],['bonferroni','all-pairs','pairwise-equations'])

box('holm','Holm: compare treatments only with control',
 p('<b>Question.</b> The homework mortality table has three treatments and one control. The three Yates-corrected treatment–control statistics are 18.234103, 9.494427 and 4.689514. Use Holm at family .05.')+
 step('1. Order the evidence, then reduce the remaining family',r'\alpha_j=\frac{\alpha}{k-j+1}',r'k=3:\quad\alpha_1=.05/3=.01666667',r'\alpha_2=.05/2=.025,\qquad\alpha_3=.05/1=.05',note='Order p-values from smallest to largest. For the same df, order '+i(r'\chi^2')+' statistics largest to smallest. <b>In words:</b> each null says that treatment and control have equal mortality probabilities; each alternative says they differ.')+
 step('2. Compare each ordered statistic with its own cutoff',r'\chi_j^2>\chi^2_{\alpha_j,1}\Rightarrow\text{reject }H_{0,j}',r'18.234103>\chi^2_{.01666667,1}=5.731139',r'9.494427>\chi^2_{.025,1}=5.023886',r'4.689514>\chi^2_{.05,1}=3.841459',note='All three treatment–control differences are supported. Stop at the first comparison that fails; retain it and every remaining null. For t comparisons, sort '+i('|t|')+' largest first and use two-tail cutoff '+i(r't_{\alpha_j/2,\nu}')+'.'),
 ['hw2.pdf','session9.pdf'],['holm','chi-square-posthoc'])

box('tables','Read the supplied tables and test tails',
 p('<b>t:</b> row = df; select total two-tail '+i(r'\alpha')+' for a two-sided test. The equivalent one-tail column is '+i(r'\alpha/2')+'. Compare '+i('|t|')+' with the positive cutoff; sign gives direction. <b>F:</b> numerator df across top, denominator df down side; right-tail '+i(r'\alpha')+'. <b>Chi-square:</b> row = df; right-tail '+i(r'\alpha')+'. The two supplied chi-square tables represent the same distribution; match the printed tail heading.')+
 p('<b>Missing column:</b> obtain a more precise cutoff with the appropriate inverse distribution if available; use tail probability once. For example '+i(r't_{.00833333,42}=2.493667')+' for the Bonferroni two-sided '+i(r'\alpha=.01666667')+'. A p-value smaller than alpha and a statistic beyond its matching critical value give the same decision.'),
 ['session15.pdf','session9.pdf','tables/t_table.pdf','tables/F_table.pdf','tables/Chi_Squared_Table1.pdf','tables/Chi_Squared_Table2.pdf'],['table-reading','tails'])

box('z-yates','Two proportions: thrombi and Yates z',
 p('<b>Question.</b> Thrombi occur in 18 of 25 placebo patients and 6 of 19 aspirin patients. Is the population thrombus probability different between groups at .05?')+
 step('1. State the population hypotheses and sample fractions',r'H_0:\pi_1=\pi_2,\quad H_A:\pi_1\ne\pi_2',r'\hat p_1=\frac{x_1}{n_1}=\frac{18}{25}=.72',r'\hat p_2=\frac{x_2}{n_2}=\frac6{19}=.315789474',note='<b>In words:</b> placebo and aspirin have equal thrombus probabilities under the null; the probabilities differ under the alternative. '+i('x_i')+' is the event count; '+i('n_i')+' is that group’s total.')+
 step('2. Pool event counts for the null probability',r'\hat p=\frac{x_1+x_2}{n_1+n_2}',r'\hat p=\frac{18+6}{25+19}=\frac{24}{44}=.545454545')+
 step('3. Calculate the null SE and half-count adjustment',r'SE_0=\sqrt{\hat p(1-\hat p)\left(\frac1{n_1}+\frac1{n_2}\right)}',r'SE_0=\sqrt{.545454545(.454545455)\left(\frac1{25}+\frac1{19}\right)}',r'=.151547046',r'c_Y=\frac12\left(\frac1{n_1}+\frac1{n_2}\right)',r'c_Y=\frac12\left(\frac1{25}+\frac1{19}\right)=.0463157895')+
 step('4. Shrink the absolute observed gap, then standardize',r'|z_Y|=\frac{\max(0,|\hat p_1-\hat p_2|-c_Y)}{SE_0}',r'D_Y=\max(0,|.72-.315789474|-.0463157895)',r'=.357894737',r'|z_Y|=\frac{.357894737}{.151547046}=2.36160813')+
 step('5. Make the two-sided decision',r'|z_Y|>z_{\alpha/2}\Rightarrow\text{reject }H_0',r'2.36160813>1.959964',note='<b>Table:</b> Normal cumulative .975, or t-table infinite-df row total two-tail .05. Reject equal population thrombus probabilities; aspirin has the lower observed proportion.'),
 ['session11.pdf','session15.pdf'],['two-proportions','yates-z'])

box('chi2','Folate: every expected count and corrected cell',
 p('<b>Question.</b> Is malformation occurrence associated with folate use? Test at .05. Apply Yates to this 2×2 table.')+
 table(['Group','Event','No event','Total'],[['Folate','4','471','475'],['No folate','27','498','525'],['Total','31','969','1000']])+
 step('1. State independence in the population',r'H_0:\text{group and outcome are independent}',r'H_A:\text{group and outcome are associated}',note='<b>In words:</b> the malformation probability is the same with and without folate under the null; it differs under the alternative.')+
 step('2. Build ALL expected counts from margins',r'E_{ij}=\frac{R_iC_j}{N}',r'E_{11}=\frac{475(31)}{1000}=14.725',r'E_{12}=\frac{475(969)}{1000}=460.275',r'E_{21}=\frac{525(31)}{1000}=16.275',r'E_{22}=\frac{525(969)}{1000}=508.725',note=i('R_i')+' (row total); '+i('C_j')+' (column total); '+i('N')+' (grand total); '+i('O_{ij}')+' (observed count).')+
 step('3. Calculate EVERY corrected cell contribution',r'c_{ij}=\frac{\max(0,|O_{ij}-E_{ij}|-.5)^2}{E_{ij}}',r'c_{11}=\frac{(|4-14.725|-.5)^2}{14.725}=7.10021222',r'c_{12}=\frac{(|471-460.275|-.5)^2}{460.275}=.227148172',r'c_{21}=\frac{(|27-16.275|-.5)^2}{16.275}=6.42400154',r'c_{22}=\frac{(|498-508.725|-.5)^2}{508.725}=.205515013')+
 step('4. Add contributions; compare on the right tail',r'\chi_Y^2=\sum_i\sum_j c_{ij},\quad\nu=(r-1)(c-1)',r'\chi_Y^2=7.10021222+.227148172',r'\qquad+6.42400154+.205515013=13.9568769',r'\nu=(2-1)(2-1)=1',r'13.9568769>\chi^2_{.05,1}=3.841459',note='Reject independence: folate use and malformation occurrence are associated. '+i('p=.00018705')+'. Expected counts use the null margins; the observed counts remain unchanged. Yates shrinks the absolute gap before squaring.'),
 ['hw2.pdf','session12.pdf'],['chi-square-2x2','all-expected-cells','all-contributions'])

box('large-chi','Three groups: uncorrected larger-table chi-square',
 p('<b>Question.</b> Compare depression occurrence across three groups. Observed event/no-event counts are (36,131), (41,132), (75,104). Test at .05.')+
 step('1. State the hypotheses; total rows and columns',r'H_0:\pi_1=\pi_2=\pi_3,\quad H_A:\text{not all }\pi_i\text{ equal}',r'(R_1,R_2,R_3)=(167,173,179)',r'(C_1,C_2)=(152,367),\qquad N=519',note='<b>In words:</b> all three population event probabilities are equal under the null; at least one differs under the alternative.')+
 step('2. Calculate ALL six null expected counts',r'E_{ij}=\frac{R_iC_j}{N}',r'E_{11}=\frac{167(152)}{519}=48.9094412',r'E_{12}=\frac{167(367)}{519}=118.090559',r'E_{21}=\frac{173(152)}{519}=50.6666667',r'E_{22}=\frac{173(367)}{519}=122.333333',r'E_{31}=\frac{179(152)}{519}=52.4238921',r'E_{32}=\frac{179(367)}{519}=126.576108')+
 step('3. Calculate ALL six contributions (no Yates)',r'c_{ij}=\frac{(O_{ij}-E_{ij})^2}{E_{ij}}',r'c_{11}=\frac{(36-48.9094412)^2}{48.9094412}=3.40739270',r'c_{12}=\frac{(131-118.090559)^2}{118.090559}=1.41123621',r'c_{21}=\frac{(41-50.6666667)^2}{50.6666667}=1.84429825',r'c_{22}=\frac{(132-122.333333)^2}{122.333333}=.763851045',r'c_{31}=\frac{(75-52.4238921)^2}{52.4238921}=9.72229698',r'c_{32}=\frac{(104-126.576108)^2}{126.576108}=4.02667341')+
 step('4. Add and select the larger-table df',r'\chi^2=\sum c_{ij},\quad\nu=(r-1)(c-1)',r'\chi^2=3.40739270+1.41123621+1.84429825',r'\quad+.763851045+9.72229698+4.02667341',r'=21.1757486',r'\nu=(3-1)(2-1)=2',r'21.1757486>\chi^2_{.05,2}=5.991465',note='Reject equal population event probabilities. The statistic alone does not identify a particular differing group. Yates is applied to 2×2 tables, not this 3×2 table.'),
 ['session12.pdf','session15.pdf'],['chi-square-larger','all-six-cells'])

box('gof','One list: goodness of fit to specified probabilities',
 p('<b>Question.</b> Counts are 255, 125 and 90. Do they fit target proportions .60, .25 and .15 at .05?')+
 step('1. State the target distribution; find expected counts',r'H_0:(\pi_1,\pi_2,\pi_3)=(.60,.25,.15)',r'H_A:\text{at least one population proportion differs}',r'N=255+125+90=470,\quad E_i=Np_i',r'E_1=470(.60)=282',r'E_2=470(.25)=117.5,\quad E_3=470(.15)=70.5',note='<b>In words:</b> the population follows the specified target proportions under the null; it does not follow that distribution under the alternative.')+
 step('2. Work EVERY category, then sum',r'c_i=\frac{(O_i-E_i)^2}{E_i},\quad\chi^2=\sum_i c_i',r'c_1=\frac{(255-282)^2}{282}=2.58510638',r'c_2=\frac{(125-117.5)^2}{117.5}=.478723404',r'c_3=\frac{(90-70.5)^2}{70.5}=5.39361702',r'\chi^2=2.58510638+.478723404+5.39361702',r'=8.45744681')+
 step('3. Use category count minus one',r'\nu=k-1,\quad\chi^2>\chi^2_{\alpha,\nu}',r'\nu=3-1=2,\qquad8.45744681>5.991465',note='Reject the target distribution at .05. No Yates; this is a one-list fit test. The target probabilities must sum to one. Here they are specified, not estimated from these counts.'),
 ['session12.pdf'],['goodness-of-fit'])

box('binary','One binary proportion: SD versus SE',
 p('<b>Question.</b> Eight of 61 patients have the event. Estimate the event proportion and its SE.')+
 step('Use event count divided by all patients',r'\hat p=\frac{x}{n},\quad s_{\rm binary}=\sqrt{\hat p(1-\hat p)}',r'\hat p=\frac8{61}=.131147541',r's_{\rm binary}=\sqrt{.131147541(.868852459)}=.337561644',r'SE(\hat p)=\sqrt{\frac{\hat p(1-\hat p)}n}',r'SE(\hat p)=\sqrt{\frac{.131147541(.868852459)}{61}}=.0432203397',note='The SE is uncertainty in the estimated proportion, not the spread of individual zero/one outcomes.'),
 ['session11.pdf'],['binary-proportion','proportion-se'])

box('risk','Followed groups: risk, ARR and NNT',
 p('<b>Question.</b> In the aspirin study, event counts are 6/19 treated and 18/25 controls. Quantify the treatment effect.')+
 step('1. Find BOTH event risks from group totals',r'r_g=\frac{\text{events in group }g}{\text{all people in group }g}',r'r_T=\frac6{19}=.315789474',r'r_C=\frac{18}{25}=.72',note=i('T')+' (treatment); '+i('C')+' (control). Risks compare events with all group members, including nonevents.')+
 step('2. Divide for relative risk; subtract for reduction',r'RR=\frac{r_T}{r_C},\qquad ARR=r_C-r_T',r'RR=\frac{6/19}{18/25}=.438596491',r'ARR=\frac{18}{25}-\frac6{19}=.404210526',note='Treatment risk is about .439 times control risk. The absolute reduction is .4042, or 40.42 percentage points; it is not the relative reduction.')+
 step('3. Take the reciprocal of ABSOLUTE risk reduction',r'NNT=\frac1{ARR}',r'NNT=\frac1{.404210526}=2.47395833\Rightarrow3',note='Round upward to a whole person: treat 3 people to prevent one additional event over the studied interval. Use proportions, not percentage numbers.')+
 step('4. If treatment increases harm, use NNH',r'ARI=r_T-r_C,\quad NNH=\frac1{ARI}',r'ARI=.08-.03=.05,\qquad NNH=\frac1{.05}=20'),
 ['session13.pdf','session15.pdf'],['risk','arr','nnt','nnh'])

box('folate-risk','Folate: name the numerator risk',
 step('Compare no-folate risk with folate risk',r'r_g=\frac{x_g}{n_g},\qquad RR_{A/B}=\frac{r_A}{r_B}',r'r_{\rm no\ folate}=\frac{27}{525}=.0514285714',r'r_{\rm folate}=\frac4{475}=.00842105263',r'RR_{\rm no/yes}=\frac{27/525}{4/475}=6.10714286',r'RR_{\rm yes/no}=\frac{4/475}{27/525}=.163742690',note='No-folate risk is about 6.11 times folate risk; reversing the comparison gives the reciprocal. State which group is in the numerator.'),
 ['hw2.pdf','session13.pdf'],['risk-orientation'])

box('odds','Selected cases and controls: odds ratio',
 p('<b>Question.</b> Among cases, 50 were exposed and 14 unexposed. Among controls, 43 were exposed and 35 unexposed. Estimate the exposure odds ratio.')+
 table(['','Exposed','Unexposed'],[['Cases','50','14'],['Controls','43','35']])+
 step('Divide exposed by unexposed in EACH selected group',r'OR=\frac{a/b}{c/d}=\frac{ad}{bc}',r'O_{\rm case}=\frac{50}{14}=3.57142857',r'O_{\rm control}=\frac{43}{35}=1.22857143',r'OR=\frac{50/14}{43/35}=\frac{50(35)}{14(43)}',r'=\frac{1750}{602}=2.90697674',note='Cases have about 2.91 times the exposure odds of controls. Case–control selection fixes how many cases are sampled; these sample fractions do not estimate disease risk. Use OR for this design, not RR.'),
 ['session13.pdf'],['odds-ratio','case-control'])

box('design','Design and supplied chi-square output',
 p('<b>Prospective:</b> follow exposure/treatment groups to outcomes → risks and RR. <b>Retrospective case–control:</b> select by outcome, then compare past exposure → OR. Randomization assigns treatments; blinding/masking hides assignments. Parallel groups receive different treatments; crossover has the same participants receive treatments in different periods. Sham mimics a procedure without its active component.')+
 "<pre>Pearson's Chi-squared test with\nYates' continuity correction\nX-squared = 5.5772, df = 1\np-value = 0.0182</pre>"+
 p('Read the reported statistic, df and p-value. '+i('.0182<.05')+' rejects independence for the aspirin 2×2 table. The correction is already included. For the larger table: '+i(r'\chi^2=21.176')+', df 2, '+i('p=.00002522')+'; for goodness of fit: '+i(r'\chi^2=8.4574')+', df 2, '+i('p=.01457')+'. Interpret the population association or target proportions stated by that test.'),
 ['session10.pdf','session12.pdf','session15.pdf'],['design','chi-square-output'])

SHEETS=[
 [['notation','summary','percentile'],['discrete','discrete-cdf','loaded'],['density','piecewise','events']],
 [['endpoint','uniform'],['normal','quantile','continuous-graph'],['sampling','linear','precision','binary']],
 [['one-t','pooled-t','t-output'],['anova','anova-output'],['bonferroni','holm','tables']],
 [['z-yates','chi2'],['large-chi','gof'],['risk','folate-risk','odds','design']],
]
for pi,cols in enumerate(SHEETS,1):
    for ci,keys in enumerate(cols,1):
        for key in keys:B[key]['page']=pi;B[key]['column']=ci
pack=dict(version=6,revision='new-complete-worked-solutions',margins=.3,minimumBodyPt=6.1,
          sheets=SHEETS,blocks=B)
(ROOT/'exam-sheet-v6-data.js').write_text('const V6_PACK='+json.dumps(pack,ensure_ascii=False,separators=(',',':'))+';\n')
(ROOT/'exam-sheet-v6-coverage.json').write_text(json.dumps({
 'version':6,'scope':'Sessions 2–13; Session 15 review and HW1/HW2',
 'excluded':['Session 14 errors/power','manual sums-of-squares ANOVA','R code writing'],
 'sourceHashes':{name:hashlib.sha256((ROOT/'sources'/name).read_bytes()).hexdigest()
                 for name in sorted({s for b in B.values() for s in b['sources']}|{'midterm-review-transcript.txt'})},
 'blocks':{k:{n:v[n] for n in ['title','sources','topics','page','column']} for k,v in B.items()},
 'policy':'Independent V6 authoring; V5 source and PDF are not inputs or outputs.'},indent=2)+'\n')
print(f'Wrote independent V6: {len(B)} sections, '+str(sum(v['html'].count(r'\[') for v in B.values()))+' display equations')
