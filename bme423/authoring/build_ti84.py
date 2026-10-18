"""Build standard, self-contained TI-BASIC programs and checked .8xp files.

Build dependency: tivars==1.1.1. No third-party software runs on the calculator.
Screens target the TI-84 Plus CE / CE Python home screen: 10 rows / 26 columns.
"""
from pathlib import Path
import hashlib, json, re, warnings, zipfile, sys
from tivars.models import TI_84PCEPY
from tivars.types import TIProgram

R=Path(__file__).resolve().parents[1]
OUT=R/'ti84'
SRC=OUT/'source'; BIN=OUT/'programs'
for d in [OUT,SRC,BIN]:d.mkdir(parents=True,exist_ok=True)
PROGRAMS=[]

class Program:
    def __init__(self,name,title,topics,use,example):
        self.name,self.title,self.topics,self.use,self.example=name,title,topics,use,example
        self.lines=['ClrHome','Float','Normal','Real']
        self.screens=[]
        PROGRAMS.append(self)
    def add(self,*lines):self.lines.extend(lines);return self
    def ask(self,label,var,condition=None):
        assert len(label)<=26
        self.add(f'Input "{label}",{var}')
        if condition:self.require(condition,'CHECK '+label[:20])
        return self
    def require(self,condition,message):
        assert len(message)<=26,message
        self.add('If not('+condition+')','Then','ClrHome',f'Disp "{message}"','Disp "CHECK INPUTS"','Stop','End')
        return self
    def screen(self,*rows,last=False):
        assert len(rows)<=9,(self.name,rows)
        self.screens.append(list(rows))
        self.add('ClrHome')
        for r,item in enumerate(rows,1):
            if isinstance(item,str):
                assert len(item)<=26,(self.name,item,len(item))
                self.add(f'Output({r},1,"{item}")')
            elif item[0]=='if':
                _,condition,yes,no=item
                assert max(len(yes),len(no))<=26,(yes,no)
                self.add('If '+condition,'Then',f'Output({r},1,"{yes}")','Else',f'Output({r},1,"{no}")','End')
            elif item[0]=='p':
                _,expr=item
                self.add('If '+expr+'<.000001','Then',f'Output({r},1,"P<0.000001")','Else')
                self.field(r,'P=',expr)
                self.add('End')
            elif item[0]=='when':
                _,condition,label,expr,fallback=item
                assert len(fallback)<=26
                self.add('If '+condition,'Then')
                self.field(r,label,expr)
                self.add('Else',f'Output({r},1,"{fallback}")','End')
            else:
                self.field(r,*item)
        self.add(f'Output(10,1,"{"ENTER/CLR:END" if last else "ENTER>NEXT CLR>X"}")',
                 '0→θ','Repeat θ=105 or θ=45','getKey→θ','End','If θ=45','Stop')
        if last:self.add('Stop')
        return self
    def field(self,row,label,expr):
        assert len(label)<=10,(self.name,label)
        # Six significant figures; math retains all calculator precision.
        self.add(f'{expr}→θ','If θ≠0',
                 'round(θ/10^int(log(abs(θ))),5)*10^int(log(abs(θ)))→θ',
                 f'Output({row},1,"{label}")',f'Output({row},{len(label)+1},θ)')
    def inverse(self,kind,alpha,df='D',df2='E',dest='C'):
        func={'t':f'tcdf(0,V,{df})','chi':f'χ²cdf(0,V,{df})','f':f'Fcdf(0,V,{df},{df2})'}[kind]
        target=f'(1-({alpha}))/2' if kind=='t' else f'1-({alpha})'
        self.add('0→U','1→V',f'While {func}<{target}','2*V→V')
        self.require('V<1ᴇ12','LEVEL TOO SMALL')
        self.add('End','For(J,1,42)','(U+V)/2→W',f'If {func.replace("V,","W,")}<{target}',
                 'Then','W→U','Else','W→V','End','End',f'(U+V)/2→{dest}')
        return self

def pval():return ('p','P')
def decision():return ('if','P<A','REJECT H0','DO NOT REJECT')
def numeric_inputs(p,fields):
    for label,var,condition in fields:p.ask(label,var,condition)
def levels(p):p.ask('ALPHA .05 ETC', 'A','A>0 and A<1')
def data_loop(p,n='N',target='ʟBMX',label='VALUE',condition=None):
    p.add(f'{n}→dim({target})',f'For(I,1,{n})','ClrHome','Disp "ITEM",I')
    p.ask(label,'X',condition)
    p.add(f'X→{target}(I)','End')

p=Program('BMDESC','Mean, variance, SD and SEM',['summary'],
          'A list of numerical observations; both sample and whole-population results.',[5,2,4,4,6,9])
p.ask('HOW MANY','N','N≥2 and N=int(N) and N≤200')
data_loop(p)
p.add('sum(ʟBMX)→B','B/N→M','sum((ʟBMX-M)^2)→H','H/(N-1)→S','√(S)→D','D/√(N)→E','H/N→F','√(F)→G')
p.screen('SAMPLE RESULTS',('MEAN=', 'M'),('VAR=', 'S'),('SD=', 'D'),('SEM=', 'E'),'MEAN=SUM/N',('SUM=', 'B'),('SS=', 'H'),('N=', 'N'))
p.screen('SAMPLE WORK','SS=SUM((X-M)^2)',('M=', 'M'),('SS=', 'H'),'VAR=SS/(N-1)',('N-1=', 'N-1'),('VAR=', 'S'))
p.screen('SD AND SEM','SD=SQRT(VAR)',('SD=', 'D'),'SEM=SD/SQRT(N)',('N=', 'N'),('SEM=', 'E'),'SD:INDIVIDUALS')
p.screen('WHOLE POPULATION','VAR=SS/N',('VAR=', 'F'),'SD=SQRT(VAR)',('SD=', 'G'),'SAMPLE USES N-1',last=True)

p=Program('BMPCTL','Percentiles, median, IQR and range',['percentile','plots'],
          'An unsorted sample and a percentile number between 0 and 100.',[5,3,7,8,9,14,30])
p.ask('HOW MANY','N','N≥2 and N=int(N) and N≤200');data_loop(p)
p.ask('PERCENT 0..100','P','P≥0 and P≤100')
p.add('SortA(ʟBMX)','1+P*(N-1)/100→R','int(R)→I','R-I→F','ʟBMX(I)→B','B→T',
      'If I<N','B+F*(ʟBMX(I+1)-B)→T','1+.25*(N-1)→R','int(R)→I',
      'ʟBMX(I)+(R-I)*(ʟBMX(I+1)-ʟBMX(I))→C','1+.75*(N-1)→R','int(R)→I',
      'ʟBMX(I)+(R-I)*(ʟBMX(I+1)-ʟBMX(I))→D','median(ʟBMX)→M','1+P*(N-1)/100→R','int(R)→I')
p.screen('PERCENTILE',('ANS=', 'T'),('PCT=', 'P'),('MED=', 'M'),('Q1=', 'C'),('Q3=', 'D'),('IQR=', 'D-C'))
p.screen('FIND RANK','R=1+P*(N-1)/100',('N=', 'N'),('P=', 'P'),('R=', 'R'),('I=', 'I'),('FRAC=', 'F'))
p.screen('INTERPOLATE','LOW+F*(HI-LOW)',('LOW=', 'B'),('if','I<N','HAS NEXT VALUE','AT LAST VALUE'),('ANS=', 'T'),'IQR=Q3-Q1',('IQR=', 'D-C'))
# Show the actual upper bracket explicitly on its own screen, including p=100.
p.add('B→H','If I<N','ʟBMX(I+1)→H')
p.screen('BRACKETS AND GAP',('LOW=', 'B'),('HIGH=', 'H'),('GAP=', 'H-B'),('FRAC=', 'F'),('ANS=', 'B+F*(H-B)'),('RANGE=', 'ʟBMX(N)-ʟBMX(1)'),last=True)

p=Program('BMDISC','Discrete probability table',['pmf','dcdf','expect','variance'],
          'Possible values and their actual probabilities; validates the PMF.',[3,0,.2,1,.5,2,.3,1.5])
p.ask('HOW MANY VALUES','N','N≥1 and N=int(N) and N≤100')
p.add('N→dim(ʟBMX)','N→dim(ʟBMP)','For(I,1,N)','ClrHome','Disp "ROW",I')
p.ask('VALUE','X').ask('PROB 0..1','P','P≥0 and P≤1')
p.add('X→ʟBMX(I)','P→ʟBMP(I)','End','sum(ʟBMP)→B')
p.require('abs(B-1)<.00000001','PROBS MUST SUM 1')
p.ask('CDF CUTOFF','C')
p.add('sum(ʟBMX*ʟBMP)→M','sum(ʟBMX^2*ʟBMP)→Q','max(0,Q-M^2)→S',
      'sum((ʟBMX≤C)*ʟBMP)→F','sum((ʟBMX<C)*ʟBMP)→G')
p.screen('DISCRETE RESULTS',('MEAN=', 'M'),('EX2=', 'Q'),('VAR=', 'S'),('CDF=', 'F'),('X< C=', 'G'),('SUM P=', 'B'),
         'MEAN=SUM(X*P)','VAR=EX2-MEAN^2')
p.screen('WEIGHT VALUES','E(X)=SUM(X*P)',('MEAN=', 'M'),'EX2=SUM(X^2*P)',('EX2=', 'Q'),'VAR=EX2-MEAN^2',('VAR=', 'S'))
p.screen('CDF ADDS X<=CUT',('CUT=', 'C'),('F(C)=', 'F'),('X>C=', '1-F'),('X<C=', 'G'),'EQUALITY MATTERS')
p.add('For(I,1,N)')
p.screen('WEIGHTED ROW',('ROW=', 'I'),('X=', 'ʟBMX(I)'),('P=', 'ʟBMP(I)'),('X*P=', 'ʟBMX(I)*ʟBMP(I)'),('X2*P=', 'ʟBMX(I)^2*ʟBMP(I)'),('DEV2P=', '(ʟBMX(I)-M)^2*ʟBMP(I)'))
p.add('End','Stop')

p=Program('BMMASS','Missing PMF constant',['pmf','expect'],
          'Probabilities are c times supplied nonnegative weights.',[3,1,2,3])
p.ask('HOW MANY WEIGHTS','N','N≥1 and N=int(N) and N≤100');data_loop(p,target='ʟBMW',label='WEIGHT',condition='X≥0')
p.add('sum(ʟBMW)→B');p.require('B>0','WEIGHTS ALL ZERO')
p.add('1/B→C','C*ʟBMW→ʟBMP')
p.screen('PMF CONSTANT',('C=', 'C'),'C=1/SUM(WEIGHTS)',('SUM W=', 'B'),'PROB(I)=C*W(I)',('SUM P=', 'sum(ʟBMP)'))
p.add('For(I,1,N)')
p.screen('NORMALIZED MASS',('ROW=', 'I'),('WEIGHT=', 'ʟBMW(I)'),('C=', 'C'),('PROB=', 'ʟBMP(I)'),'P=C*WEIGHT')
p.add('End','Stop')

p=Program('BMEVENT','Independent or conditional sequence',['random','independent'],
          'Two consecutive events; enter the second probability after the first event.',[4/52,3/51])
p.ask('P FIRST','B','B≥0 and B≤1').ask('P SECOND GIVEN 1','C','C≥0 and C≤1')
p.add('B*C→P')
p.screen('BOTH EVENTS',('ANS=', 'P'),'P(BOTH)=P1*P2',('P(A)=', 'B'),('P2=', 'C'),'NO REPLACEMENT:', 'UPDATE 2ND PROB',last=True)

p=Program('BMLINE','Linear combinations of independent variables',['linear'],
          'Z=aX+bY+c with independent X and Y; inputs are means and variances.',[2,-3,0,10,4,9,1])
p.ask('COEFF A','B').ask('COEFF B','C').ask('SHIFT C','K').ask('MEAN X','M').ask('MEAN Y','N')
p.ask('VAR X NOT SD','F','F≥0').ask('VAR Y NOT SD','G','G≥0')
p.add('B*M+C*N+K→H','B^2*F+C^2*G→S')
p.screen('Z=A*X+B*Y+C',('MEAN=', 'H'),('VAR=', 'S'),('SD=', '√(S)'),'INDEPENDENT X,Y')
p.screen('MEAN WORK','A*MX+B*MY+C',('A*MX=', 'B*M'),('B*MY=', 'C*N'),('SHIFT=', 'K'),('TOTAL=', 'H'))
p.screen('VARIANCE WORK','A^2*VX+B^2*VY',('TERM1=', 'B^2*F'),('TERM2=', 'C^2*G'),('TOTAL=', 'S'),'SHIFT ADDS 0 VAR',last=True)

p=Program('BMSHIFT','Expected value after a shift or rescaling',['linear','expect','cexpect'],
          'Y=a+bX: finds its mean first; variance and SD are optional on ENTER.',[-26,1,95,75.69])
p.ask('SHIFT A','B').ask('MULTIPLIER B','C').ask('MEAN OF X','M')
p.add('B+C*M→T')
p.screen('TRANSFORMED MEAN',('MEAN Y=', 'T'),'Y=A+B*X','E(Y)=A+B*E(X)',('A=', 'B'),('B=', 'C'),('E(X)=', 'M'),
         'ENTER FOR VARIANCE','CLEAR IF ONLY MEAN NEEDED')
p.ask('VAR X NOT SD','S','S≥0')
p.add('C^2*S→H')
p.screen('TRANSFORMED SPREAD','VAR(Y)=B^2*VAR(X)',('B=', 'C'),('VAR X=', 'S'),('VAR Y=', 'H'),('SD Y=', '√(H)'),
         'SHIFT ADDS NO VAR',last=True)

p=Program('BMUNIF','Uniform probability and moments',['uniform','density','cexpect'],
          'Uniform(a,b); choose an interval inside the support.',[2,8,3,5])
p.ask('SUPPORT LOW','B').ask('SUPPORT HIGH','C','C>B').ask('INTERVAL LOW','D','D≥B and D≤C').ask('INTERVAL HIGH','E','E≥D and E≤C')
p.add('(E-D)/(C-B)→P','(B+C)/2→M','(C-B)^2/12→S')
p.screen('UNIFORM RESULTS',('PROB=', 'P'),('MEAN=', 'M'),('VAR=', 'S'),('DENS=', '1/(C-B)'),'P=WIDTH/FULL')
p.screen('PROBABILITY WORK',('LOW=', 'D'),('HIGH=', 'E'),('WIDTH=', 'E-D'),('FULL=', 'C-B'),'P=WIDTH/FULL',('P=', 'P'))
p.screen('MOMENTS','MEAN=(A+B)/2',('A=', 'B'),('B=', 'C'),('MEAN=', 'M'),'VAR=(B-A)^2/12',('VAR=', 'S'),last=True)

# A linear density's primitive and first two moment primitives.
def primitive(a,b,x,power=0):
    return f'({a})*({x})^{power+1}/{power+1}+({b})*({x})^{power+2}/{power+2}'
def integ(a,b,lo,hi,power=0):return f'({primitive(a,b,hi,power)})-({primitive(a,b,lo,power)})'

p=Program('BMCONST','Normalize a linear density',['density','integrate'],
          'f(x)=c(a+bx) on a known support [L,U]; finds c.',[0,1,0,2])
p.ask('BASE A','B').ask('BASE B','C').ask('SUPPORT LOW','D').ask('SUPPORT HIGH','E','E>D')
p.require('B+C*D≥0 and B+C*E≥0','NEGATIVE DENSITY')
p.add(integ('B','C','D','E')+'→H');p.require('H>0','ZERO AREA')
p.add('1/H→K')
p.screen('NORMALIZE PDF',('C=', 'K'),'F(X)=C*(A+B*X)',('A=', 'B'),('B=', 'C'),('AREA=', 'H'),'C*AREA=1')
p.screen('INTEGRATE BASE','G(X)=A*X+B*X^2/2',('G(U)=', '('+primitive('B','C','E')+')'),('G(L)=', '('+primitive('B','C','D')+')'),('AREA=', 'H'),'C=1/AREA',('C=', 'K'),last=True)

p=Program('BMEND','Unknown upper density endpoint',['integrate','density'],
          'f(x)=a+bx on [0,c], with a,b nonnegative; finds positive c.',[.1,1])
p.ask('A IN A+B*X','B','B≥0').ask('B IN A+B*X','C','C≥0')
p.require('B+C>0','ZERO DENSITY')
p.add('If C=0','Then','1/B→T','Else','2/(B+√(B^2+2*C))→T','End')
p.screen('ENDPOINT C',('C=', 'T'),'A*C+B*C^2/2=1',('A=', 'B'),('B=', 'C'),('AREA=', 'B*T+C*T^2/2'))
p.screen('POSITIVE ROOT','IF B>0:', 'C=2/(A+SQRT(', 'A^2+2*B))',('ROOT=', '√(B^2+2*C)'),('C=', 'T'),'IF B=0: C=1/A',last=True)

def density_program(p,piece=False):
    # Coefficients B,C for first piece; F,G for second; support D,E;
    # split H. Moment outputs M,Q,S, CDF F(CUT) in K and interval in P.
    p.ask('A: A+B*X','B').ask('B: A+B*X','C').ask('SUPPORT LOW','D')
    if piece:
        p.ask('SPLIT POINT','H','H>D').ask('2ND A','F').ask('2ND B','G').ask('SUPPORT HIGH','E','E>H')
        p.require('min(B+C*D,B+C*H)≥0 and min(F+G*H,F+G*E)≥0','NEGATIVE DENSITY')
        area='('+integ('B','C','D','H')+')+('+integ('F','G','H','E')+')'
        moment=lambda power:'('+integ('B','C','D','H',power)+')+('+integ('F','G','H','E',power)+')'
    else:
        p.ask('SUPPORT HIGH','E','E>D')
        p.require('min(B+C*D,B+C*E)≥0','NEGATIVE DENSITY')
        area=integ('B','C','D','E');moment=lambda power:integ('B','C','D','E',power)
    p.add(area+'→T');p.require('abs(T-1)<.00000001','PDF AREA NOT 1')
    p.ask('CDF CUTOFF','L').ask('INTERVAL LOW','N').ask('INTERVAL HIGH','O','O≥N')
    p.add(moment(1)+'→M',moment(2)+'→Q','max(0,Q-M^2)→S')
    def cumulative(var,dest):
        p.add(f'min(E,max(D,{var}))→X')
        if piece:
            p.add('If X≤H','Then',integ('B','C','D','X')+'→'+dest,'Else',
                  '('+integ('B','C','D','H')+')+('+integ('F','G','H','X')+')→'+dest,'End')
        else:p.add(integ('B','C','D','X')+'→'+dest)
    cumulative('L','K');cumulative('N','A');cumulative('O','P');p.add('P-A→P')
    # Bisection median keeps the supported root, including flat/declining PDFs.
    p.add('D→U','E→V','For(J,1,42)','(U+V)/2→W')
    cumulative('W','T')
    p.add('If T<.5','Then','W→U','Else','W→V','End','End','(U+V)/2→R')
    p.screen('DENSITY RESULTS',('CDF=', 'K'),('INT P=', 'P'),('MEAN=', 'M'),('EX2=', 'Q'),('VAR=', 'S'),('MED=', 'R'),'VAR=EX2-MEAN^2','TWO LINEAR PIECES' if piece else 'PDF=A+B*X')
    if piece:
        p.screen('FIRST PIECE','F(X)=A+B*X',('A=', 'B'),('B=', 'C'),('LOW=', 'D'),('SPLIT=', 'H'),'G(X)=A*X+B*X^2/2')
        p.screen('SECOND PIECE','F(X)=A+B*X',('A=', 'F'),('B=', 'G'),('SPLIT=', 'H'),('HIGH=', 'E'),'ADD FIRST AREA')
    p.screen('CDF AND INTERVAL','G(X)=A*X+B*X^2/2','CDF=G(C)-G(L)',('CUT=', 'L'),('CDF=', 'K'),'P=F(HIGH)-F(LOW)',('P=', 'P'))
    p.screen('EXPECTED VALUE','A*X^2/2+B*X^3/3','UPPER MINUS LOW',('MEAN=', 'M'),'FOR EACH PIECE' if piece else 'ON FULL SUPPORT')
    p.screen('SECOND MOMENT','A*X^3/3+B*X^4/4',('EX2=', 'Q'),'VAR=EX2-MEAN^2',('VAR=', 'S'),'CDF(MEDIAN)=.5',('MED=', 'R'),last=True)

p=Program('BMPDF','Linear PDF, CDF, interval and moments',['density','ccdf','cexpect'],
          'A valid f(x)=a+bx on [L,U]; CDF cutoff, interval, moments and median.',[0,.5,0,2,1,1.5,2])
density_program(p)
p=Program('BMPIECE','Two-piece linear density',['density','ccdf','cexpect'],
          'Two linear pieces meeting at a split, e.g. x then 2-x.',[0,1,0,1,2,-1,2,1.5,.5,1.5])
density_program(p,True)

p=Program('BMNORM','Normal probabilities',['normal','normalprob'],
          'Individual Normal measurements: left, between and right probabilities.',[95,8.7,85,115])
p.ask('MEAN MU','M').ask('SD NOT VAR','S','S>0').ask('LOW CUTOFF','B').ask('HIGH CUTOFF','C','C≥B')
p.add('(B-M)/S→D','(C-M)/S→E','normalcdf(⁻1ᴇ99,B,M,S)→F',
      'normalcdf(B,C,M,S)→P','normalcdf(C,1ᴇ99,M,S)→G')
p.screen('NORMAL AREAS',('LEFT=', 'F'),('BETWN=', 'P'),('RIGHT=', 'G'),('Z LOW=', 'D'),('Z HI=', 'E'),'Z=(X-MU)/SD')
p.screen('STANDARDIZE',('MU=', 'M'),('SD=', 'S'),('LOW=', 'B'),('HIGH=', 'C'),'Z=(X-MU)/SD',('VAR=', 'S^2'))
p.screen('AREA WORK',('PHI L=', 'normalcdf(⁻1ᴇ99,D,0,1)'),('PHI H=', 'normalcdf(⁻1ᴇ99,E,0,1)'),
         'P=PHI H-PHI L',('BETWN=', 'P'),'RIGHT=1-PHI H',('RIGHT=', 'G'),last=True)

p=Program('BMINVN','Normal percentile or cutoff',['normalquant'],
          'Normal mean, SD and LEFT-tail probability p; returns the measurement cutoff.',[95,8.7,.975])
p.ask('MEAN MU','M').ask('SD NOT VAR','S','S>0').ask('LEFT PROB 0..1','P','P>0 and P<1')
p.add('invNorm(P,0,1)→Z','M+Z*S→T')
p.screen('NORMAL CUTOFF',('ANS=', 'T'),('Z=', 'Z'),'X=MU+Z*SD',('MU=', 'M'),('SD=', 'S'),('LEFT P=', 'P'))
p.screen('REVERSE Z SCORE','Z=INVNORM(P)',('Z=', 'Z'),('Z*SD=', 'Z*S'),'ADD MU',('ANS=', 'T'),'RIGHT P? USE 1-P',last=True)

p=Program('BMSE','Probability for a sample mean',['sampling','normalprob'],
          'Known individual population SD; probabilities for the average of n independent observations.',[4,1.5,50,3.5,3.8])
p.ask('POP MEAN MU','M').ask('POP SD SIGMA','S','S>0').ask('SAMPLE SIZE','N','N≥1 and N=int(N)')
p.ask('LOW MEAN CUT','B').ask('HIGH MEAN CUT','C','C≥B')
p.add('S/√(N)→H','(B-M)/H→D','(C-M)/H→E','normalcdf(B,C,M,H)→P',
      'normalcdf(⁻1ᴇ99,B,M,H)→F','normalcdf(C,1ᴇ99,M,H)→G')
p.screen('SAMPLE MEAN AREA',('BETWN=', 'P'),('LEFT=', 'F'),('RIGHT=', 'G'),('SEM=', 'H'),('Z LOW=', 'D'),('Z HI=', 'E'))
p.screen('MEAN SPREAD','SEM=SD/SQRT(N)',('SIGMA=', 'S'),('N=', 'N'),('SEM=', 'H'),'Z=(CUT-MU)/SEM',('MU=', 'M'))
p.screen('SUBTRACT AREAS',('PHI L=', 'normalcdf(⁻1ᴇ99,D,0,1)'),('PHI H=', 'normalcdf(⁻1ᴇ99,E,0,1)'),
         'P=PHI H-PHI L',('P=', 'P'),'NORMAL OR CLT',last=True)

p=Program('BMSECH','Change SEM when sample size changes',['estimators'],
          'Same individual SD, a known old SEM and two sample sizes.',[3,16,64])
p.ask('OLD SEM','S','S≥0').ask('OLD N','B','B≥1 and B=int(B)').ask('NEW N','C','C≥1 and C=int(C)')
p.add('S*√(B/C)→T')
p.screen('NEW SEM',('ANS=', 'T'),'OLD*SQRT(N0/N1)',('OLDSE=', 'S'),('OLD N=', 'B'),('NEW N=', 'C'),('RATIO=', '√(B/C)'),last=True)

p=Program('BMONE','One-sample t test',['onet'],
          'One Normal sample compared with a fixed population reference; two-sided.',[76.8,4.15,5,72,.05])
p.ask('SAMPLE MEAN','M').ask('SAMPLE SD','S','S>0').ask('SAMPLE N','N','N≥2 and N=int(N)').ask('REF MEAN MU0','B');levels(p)
p.add('S/√(N)→H','M-B→G','G/H→T','N-1→D','min(1,2*tcdf(abs(T),1ᴇ99,D))→P')
p.screen('ONE SAMPLE T',('T=', 'T'),('DF=', 'D'),pval(),decision(),'T=(MEAN-REF)/SE',('SE=', 'H'),('MEAN=', 'M'),('REF=', 'B'))
p.screen('SUBSTITUTE',('MEAN=', 'M'),('REF=', 'B'),('SD=', 'S'),('N=', 'N'),'SE=SD/SQRT(N)',('SE=', 'H'))
p.screen('DIVIDE THE GAP',('GAP=', 'G'),('SE=', 'H'),'T=GAP/SE',('T=', 'T'),'DF=N-1',('DF=', 'D'))
p.inverse('t','A')
p.screen('TWO SIDED TEST',('ALPHA=', 'A'),('ABS T=', 'abs(T)'),('CRIT=', 'C'),'REJECT IF |T|>C',decision(),'H0:MEAN=REF',last=True)

p=Program('BMTWO','Pooled independent two-sample t',['pooledt'],
          'Two independent Normal groups, assumed equal population variances; sizes can differ.',[20,3,12,24,4,16,.05])
p.ask('GROUP 1 MEAN','B').ask('GROUP 1 SD','C','C≥0').ask('GROUP 1 N','E','E≥2 and E=int(E)')
p.ask('GROUP 2 MEAN','F').ask('GROUP 2 SD','G','G≥0').ask('GROUP 2 N','H','H≥2 and H=int(H)');levels(p)
p.add('E+H-2→D','((E-1)*C^2+(H-1)*G^2)/D→S');p.require('S>0','ZERO POOLED VAR')
p.add('√(S*(1/E+1/H))→N','(B-F)/N→T','min(1,2*tcdf(abs(T),1ᴇ99,D))→P')
p.screen('POOLED TWO T',('T=', 'T'),('DF=', 'D'),pval(),decision(),'T=(M1-M2)/SE',('SE=', 'N'),('MEAN1=', 'B'),('MEAN2=', 'F'))
p.screen('GROUP INPUTS',('M1=', 'B'),('SD1=', 'C'),('N1=', 'E'),('M2=', 'F'),('SD2=', 'G'),('N2=', 'H'))
p.screen('POOLED VARIANCE','((N1-1)*SD1^2+', '(N2-1)*SD2^2)/DF',('TERM1=', '(E-1)*C^2'),('TERM2=', '(H-1)*G^2'),('DF=', 'D'),('POOL=', 'S'))
p.screen('BUILD SE AND T','SE=SQRT(POOL*', '(1/N1+1/N2))',('POOL=', 'S'),('SE=', 'N'),('GAP=', 'B-F'),('T=', 'T'))
p.inverse('t','A',dest='K')
p.screen('TWO SIDED TEST',('ALPHA=', 'A'),('ABS T=', 'abs(T)'),('CRIT=', 'K'),'REJECT IF |T|>C',decision(),'H0:MU1=MU2',last=True)

p=Program('BMANOVA','Balanced one-way ANOVA',['anova'],
          'Equal group sizes, supplied group means and SDs; independent Normal groups and equal variances.',[3,12,1188,189,1412,217,1363,191,.05])
p.ask('HOW MANY GROUPS','K','K≥2 and K=int(K) and K≤50').ask('N IN EACH GROUP','N','N≥2 and N=int(N)')
p.add('K→dim(ʟBMM)','K→dim(ʟBMS)','For(I,1,K)','ClrHome','Disp "GROUP",I')
p.ask('GROUP MEAN','B').ask('GROUP SD','C','C≥0')
p.add('B→ʟBMM(I)','C→ʟBMS(I)','End');levels(p)
p.add('sum(ʟBMS^2)/K→S','mean(ʟBMM)→M','sum((ʟBMM-M)^2)→H','N*H/(K-1)→B')
p.require('S>0','ZERO WITHIN VAR')
p.add('B/S→F','K-1→D','K*(N-1)→E','Fcdf(F,1ᴇ99,D,E)→P')
p.screen('BALANCED ANOVA',('F=', 'F'),('DF1=', 'D'),('DF2=', 'E'),pval(),decision(),'F=BETWEEN/WITHIN',('BETWEEN=', 'B'),('WITHIN=', 'S'))
p.screen('WITHIN + CENTER','WITHIN=SUM(SD^2)', '/NUMBER GROUPS',('M=', 'K'),('WITHIN=', 'S'),'GRAND=AVG(MEANS)',('GRAND=', 'M'))
p.screen('VAR OF MEANS','SS=SUM((MEAN-', 'GRAND)^2)',('SS=', 'H'),('M-1=', 'D'),('VAR M=', 'H/D'),'BETWEEN=N*VAR M')
p.screen('BUILD F',('N=', 'N'),('BETWN=', 'B'),('WITHIN=', 'S'),'F=BETWEEN/WITHIN',('F=', 'F'),'DF=(M-1,M*(N-1))')
p.inverse('f','A')
p.screen('UPPER TAIL TEST',('ALPHA=', 'A'),('F=', 'F'),('CRIT=', 'C'),decision(),'H0:MEANS EQUAL','PAIRS:USE WITHIN',last=True)

p=Program('BMPAIR','ANOVA pair with Bonferroni',['posthoc','bonferroni'],
          'A requested mean pair after ANOVA; retain its within variance and residual df.',[64.8,43.3,70,70,239.9,207,.05,3])
p.ask('MEAN I','B').ask('MEAN J','C').ask('N I','E','E≥1 and E=int(E)').ask('N J','F','F≥1 and F=int(F)')
p.ask('ANOVA WITHIN VAR','S','S>0')
p.add('√(S*(1/E+1/F))→H','abs(B-C)/H→T')
p.screen('ANOVA PAIR STATISTIC',('ABS T=', 'T'),('SE=', 'H'),('GAP=', 'abs(B-C)'),('WITHIN=', 'S'),
         'T=ABS(MI-MJ)/SE',('N I=', 'E'),('N J=', 'F'),'ENTER FOR ADJUSTED TEST')
p.ask('ANOVA ERROR DF','D','D≥1 and D=int(D)');levels(p)
p.ask('REQUESTED PAIRS','K','K≥1 and K=int(K)')
p.add('A/K→G','min(1,2*tcdf(T,1ᴇ99,D))→P','min(1,K*P)→Q')
p.screen('ANOVA PAIR',('ABS T=', 'T'),('DF=', 'D'),pval(),('ADJ P=', 'Q'),('if','Q<A','REJECT PAIR H0','DO NOT REJECT'),'T=ABS(GAP)/SE',('GAP=', 'abs(B-C)'),('SE=', 'H'))
p.screen('PAIR INPUTS',('MEAN I=', 'B'),('MEAN J=', 'C'),('N I=', 'E'),('N J=', 'F'),('WITHIN=', 'S'),('DF=', 'D'))
p.screen('PAIR WORK','SE=SQRT(WITHIN*', '(1/NI+1/NJ))',('SE=', 'H'),('GAP=', 'abs(B-C)'),('T=', 'T'),'KEEP ANOVA DF')
p.inverse('t','G',dest='R')
p.screen('BONFERRONI',('PAIRS=', 'K'),('FAM A=', 'A'),('PAIR A=', 'G'),('CRIT=', 'R'),('ABS T=', 'T'),('if','Q<A','REJECT PAIR H0','DO NOT REJECT'),last=True)

p=Program('BMBONF','Bonferroni from a supplied statistic',['bonferroni','rcode'],
          'A supplied t or chi-square statistic; count only the requested comparisons.',[.05,3,1,3.162277660168379,12])
levels(p);p.ask('REQUESTED PAIRS','K','K≥1 and K=int(K)')
p.add('A/K→G')
p.screen('BONFERRONI LEVEL',('PAIR A=', 'G'),('FAM A=', 'A'),('PAIRS=', 'K'),
         'PAIR A=FAMILY A/K',('EACH TAIL=', 'G/2'),'T:1-PAIR A/2',('LEFT AREA=', '1-G/2'),'ENTER TO TEST A STATISTIC')
p.ask('1 T  2 CHISQ','L','L=1 or L=2').ask('STATISTIC','T')
p.require('L=1 or T≥0','CHISQ NEEDS >=0')
p.ask('DF','D','D≥1 and D=int(D)')
p.add('If L=1','Then','min(1,2*tcdf(abs(T),1ᴇ99,D))→P','Else','χ²cdf(T,1ᴇ99,D)→P','End','min(1,K*P)→Q','A/K→G')
p.screen('BONFERRONI',('ADJ P=', 'Q'),pval(),('PAIR A=', 'G'),('if','Q<A','REJECT PAIR H0','DO NOT REJECT'),'PAIR A=FAM A/K',('K=', 'K'))
p.add('If L=1','Then');p.inverse('t','G',dest='R');p.add('Else');p.inverse('chi','G',dest='R');p.add('End')
p.screen('STATISTIC CUTOFF',('ABS S=', 'abs(T)'),('CRIT=', 'R'),('DF=', 'D'),'ADJ P=MIN(1,K*P)',('ADJ P=', 'Q'),('if','Q<A','REJECT PAIR H0','DO NOT REJECT'),last=True)

p=Program('BMHOLM','Holm ordered comparisons',['holm','rcode'],
          'Enter p values, t statistics or chi-square statistics and a numeric ID for each requested pair.',[2,5,46,.05,12,2.1,13,2.9,14,2.2,15,2.3,16,3.3])
p.ask('1 P 2 T 3 CHI','L','L≥1 and L≤3 and L=int(L)').ask('HOW MANY PAIRS','K','K≥1 and K=int(K) and K≤100')
p.add('If L>1','Then');p.ask('COMMON DF','D','D≥1 and D=int(D)');p.add('End');levels(p)
p.add('K→dim(ʟBMP)','K→dim(ʟBMID)','For(I,1,K)','ClrHome','Disp "PAIR",I')
p.ask('PAIR ID EG 13','B','B≥0 and B=int(B)').ask('P OR STAT','T')
p.add('If L=1','Then');p.require('T≥0 and T≤1','P MUST BE 0..1');p.add('T→P','End',
      'If L=2','min(1,2*tcdf(abs(T),1ᴇ99,D))→P','If L=3','Then')
p.require('T≥0','CHISQ NEEDS >=0');p.add('χ²cdf(T,1ᴇ99,D)→P','End','P→ʟBMP(I)','B→ʟBMID(I)','End','SortA(ʟBMP,ʟBMID)','0→R','1→F','K→dim(ʟBMR)',
      'For(I,1,K)','0→ʟBMR(I)','If F=1','Then','If ʟBMP(I)<A/(K-I+1)','Then',
      '1→ʟBMR(I)','R+1→R','Else','0→F','End','End','End')
p.screen('HOLM RESULTS',('REJECT=', 'R'),('PAIRS=', 'K'),'SORT SMALLEST P','A/(K-RANK+1)','STOP AT 1ST FAIL','IDS KEEP PAIRS')
p.add('For(I,1,K)')
p.screen('HOLM STEP',('RANK=', 'I'),('PAIRID=', 'ʟBMID(I)'),('P=', 'ʟBMP(I)'),('LEVEL=', 'A/(K-I+1)'),
         ('if','ʟBMR(I)=1','REJECT:CONTINUE','NO REJECT:STOP'),('if','I>R+1','STOPPED EARLIER','P<LEVEL TO PASS'))
p.add('End','Stop')

p=Program('BMBIN','Binary proportion and uncertainty',['binary'],
          'Event count and group total; distinguishes individual binary SD from proportion SE.',[8,61])
p.ask('EVENT COUNT','B','B≥0 and B=int(B)').ask('TOTAL N','N','N≥1 and N=int(N) and N≥B')
p.add('B/N→P','P*(1-P)→S','√(S)→D','√(S/N)→E')
p.screen('BINARY RESULTS',('PHAT=', 'P'),('VAR X=', 'S'),('SD X=', 'D'),('SE P=', 'E'),'PHAT=EVENTS/N')
p.screen('WORK',('EVENTS=', 'B'),('N=', 'N'),'VAR=P*(1-P)',('VAR=', 'S'),'SE=SQRT(VAR/N)',('SE=', 'E'),last=True)

p=Program('BMZ','Yates-corrected two proportions',['zprop','yates'],
          'Two independent binary groups; always applies the course correction.',[18,25,6,19,.05])
p.ask('EVENTS GROUP 1','B','B≥0 and B=int(B)').ask('TOTAL GROUP 1','E','E≥1 and E=int(E) and E≥B')
p.ask('EVENTS GROUP 2','C','C≥0 and C=int(C)').ask('TOTAL GROUP 2','F','F≥1 and F=int(F) and F≥C');levels(p)
p.add('B/E→G','C/F→H','(B+C)/(E+F)→Q')
p.require('Q>0 and Q<1','NO BINARY SPREAD')
p.add('√(Q*(1-Q)*(1/E+1/F))→S','.5*(1/E+1/F)→K','max(0,abs(G-H)-K)→N',
      'N/S→T','2*normalcdf(T,1ᴇ99,0,1)→P','invNorm(1-A/2,0,1)→R')
p.screen('YATES Z TEST',('ABS Z=', 'T'),pval(),('CRIT=', 'R'),decision(),'Z=CORR GAP/SE',('CHI2=', 'T^2'),('GAP=', 'N'),('SE=', 'S'))
p.screen('PROPORTIONS',('P1=', 'G'),('P2=', 'H'),('POOL=', 'Q'),'POOL=(M1+M2)/', '(N1+N2)',('M1+M2=', 'B+C'))
p.screen('POOLED NULL SE','SQRT(P*(1-P)*', '(1/N1+1/N2))',('N1=', 'E'),('N2=', 'F'),('SE=', 'S'))
p.screen('CORRECT THE GAP','CORR=.5*(1/N1+', '1/N2)',('RAWGAP=', 'abs(G-H)'),('CORR=', 'K'),('GAP=', 'N'),'NO NEGATIVE GAP')
p.screen('DIVIDE AND TEST',('GAP=', 'N'),('SE=', 'S'),('ABS Z=', 'T'),('CRIT=', 'R'),decision(),'H0:P1=P2',last=True)

p=Program('BMCHI2','Yates-corrected 2 by 2 table',['chi','contingency','yates'],
          'Rows are two groups; columns are event and no event; half-count correction included.',[18,7,6,13,.05])
numeric_inputs(p,[('G1 EVENT','B','B≥0 and B=int(B)'),('G1 NO EVENT','C','C≥0 and C=int(C)'),
                  ('G2 EVENT','F','F≥0 and F=int(F)'),('G2 NO EVENT','G','G≥0 and G=int(G)')]);levels(p)
p.require('(B+C)*(F+G)*(B+F)*(C+G)>0','ZERO MARGIN')
p.add('{B,C,F,G}→ʟBMO','B+C+F+G→N',
      '{(B+C)*(B+F)/N,(B+C)*(C+G)/N,(F+G)*(B+F)/N,(F+G)*(C+G)/N}→ʟBME',
      '(abs(ʟBMO-ʟBME)-.5)→ʟBMT','For(I,1,4)','max(0,ʟBMT(I))^2/ʟBME(I)→ʟBMT(I)','End',
      'sum(ʟBMT)→T','1→D','χ²cdf(T,1ᴇ99,1)→P')
p.screen('YATES 2X2 CHI2',('CHI2=', 'T'),('DF=', 'D'),pval(),decision(),'E=ROW*COL/TOTAL',('TOTAL=', 'N'))
p.add('For(I,1,4)')
p.screen('CELL WORK',('CELL=', 'I'),('O=', 'ʟBMO(I)'),('E=', 'ʟBME(I)'),('GAP=', 'max(0,abs(ʟBMO(I)-ʟBME(I))-.5)'),
         'TERM=GAP^2/E',('TERM=', 'ʟBMT(I)'))
p.add('End');p.inverse('chi','A')
p.screen('ADD ALL 4 TERMS',('CHI2=', 'T'),('DF=', 'D'),('CRIT=', 'C'),decision(),
         ('if','min(ʟBME)<5','SMALL E:CHECK','YATES INCLUDED'),'H0:EQUAL RATES',last=True)

p=Program('BMCHIR','Larger contingency table',['chi','contingency'],
          'A table larger than 2 by 2; ordinary uncorrected cell contributions.',[3,2,36,131,41,132,75,104,.05])
p.ask('ROWS','K','K≥2 and K=int(K) and K≤20').ask('COLUMNS','L','L≥2 and L=int(L) and L≤20')
p.require('K*L≤100 and K*L>4','USE BMCHI2 2X2')
p.add('K*L→dim(ʟBMO)','K→dim(ʟBMR)','L→dim(ʟBMC)','For(I,1,K)','For(J,1,L)','ClrHome','Disp "ROW",I,"COLUMN",J')
p.ask('OBS COUNT','X','X≥0 and X=int(X)')
p.add('X→ʟBMO((I-1)*L+J)','End','End','sum(ʟBMO)→N')
p.require('N>0','EMPTY TABLE')
p.add('For(I,1,K)','0→B','For(J,1,L)','B+ʟBMO((I-1)*L+J)→B','End','B→ʟBMR(I)','End',
      'For(J,1,L)','0→B','For(I,1,K)','B+ʟBMO((I-1)*L+J)→B','End','B→ʟBMC(J)','End')
p.require('min(ʟBMR)>0 and min(ʟBMC)>0','ZERO MARGIN');levels(p)
p.add('K*L→dim(ʟBME)','K*L→dim(ʟBMT)','For(I,1,K)','For(J,1,L)',
      'ʟBMR(I)*ʟBMC(J)/N→B','B→ʟBME((I-1)*L+J)',
      '(ʟBMO((I-1)*L+J)-B)^2/B→ʟBMT((I-1)*L+J)','End','End',
      'sum(ʟBMT)→T','(K-1)*(L-1)→D','χ²cdf(T,1ᴇ99,D)→P')
p.screen('CONTINGENCY CHI2',('CHI2=', 'T'),('DF=', 'D'),pval(),decision(),'NO YATES >2X2',('TOTAL=', 'N'))
p.add('For(I,1,K)','For(J,1,L)')
p.screen('EXPECTED COUNT',('ROW=', 'I'),('COL=', 'J'),('RTOTAL=', 'ʟBMR(I)'),('CTOTAL=', 'ʟBMC(J)'),
         'E=ROW*COL/TOTAL',('E=', 'ʟBME((I-1)*L+J)'))
p.screen('CELL TERM',('O=', 'ʟBMO((I-1)*L+J)'),('E=', 'ʟBME((I-1)*L+J)'),
         'GAP=O-E',('GAP=', 'ʟBMO((I-1)*L+J)-ʟBME((I-1)*L+J)'),
         'TERM=GAP^2/E',('TERM=', 'ʟBMT((I-1)*L+J)'))
p.add('End','End');p.inverse('chi','A')
p.screen('ADD CELL TERMS',('CHI2=', 'T'),('DF=', 'D'),('CRIT=', 'C'),decision(),
         ('if','min(ʟBME)<5','SMALL E:CHECK','NO YATES >2X2'),'DF=(R-1)*(C-1)',last=True)

p=Program('BMGOF','Chi-square goodness of fit',['gof'],
          'One observed count list and fixed target probabilities; no fitted parameters.',[3,255,.6,125,.25,90,.15,.05])
p.ask('HOW MANY CATS','K','K≥2 and K=int(K) and K≤100')
p.add('K→dim(ʟBMO)','K→dim(ʟBMP)','For(I,1,K)','ClrHome','Disp "CATEGORY",I')
p.ask('OBS COUNT','B','B≥0 and B=int(B)').ask('TARGET PROB','C','C>0 and C≤1')
p.add('B→ʟBMO(I)','C→ʟBMP(I)','End')
p.require('abs(sum(ʟBMP)-1)<.00000001','PROBS MUST SUM 1');p.add('sum(ʟBMO)→N');p.require('N>0','NO OBSERVATIONS');levels(p)
p.add('N*ʟBMP→ʟBME','(ʟBMO-ʟBME)^2/ʟBME→ʟBMT','sum(ʟBMT)→T','K-1→D','χ²cdf(T,1ᴇ99,D)→P')
p.screen('GOODNESS OF FIT',('CHI2=', 'T'),('DF=', 'D'),pval(),decision(),'E=TOTAL*TARGET P',('TOTAL=', 'N'))
p.add('For(I,1,K)')
p.screen('CATEGORY WORK',('CAT=', 'I'),('O=', 'ʟBMO(I)'),('PROB=', 'ʟBMP(I)'),('E=', 'ʟBME(I)'),
         'TERM=(O-E)^2/E',('TERM=', 'ʟBMT(I)'))
p.add('End');p.inverse('chi','A')
p.screen('ADD TERMS DF=K-1',('CHI2=', 'T'),('DF=', 'D'),('CRIT=', 'C'),decision(),
         ('if','min(ʟBME)<5','SMALL E:CHECK','FIXED TARGETS'),'H0:TARGET PROBS',last=True)

def risk_body(p):
    p.add('C-B→H','0→R','If C>0','B/C→R','0→T','0→K','If H≠0','Then',
          '1/abs(H)→T','int(T)→K','If T>K+.00000001','K+1→K','End')
    p.screen('RISK RESULTS',('when','C>0','RR=','R','RR UNDEFINED:CONTROL=0'),
             ('ARR=', 'H'),('when','H≠0','NNT/NNH=','T','NNT/NNH NOT FINITE'),
             ('when','H≠0','WHOLE=','K','ABSOLUTE GAP=0'),('RT=', 'B'),('RC=', 'C'),
             'RR=RT/RC; ARR=RC-RT','NNT/NNH=1/ABS(ARR)')
    p.add('If C>0','Then','B/C→R')
    p.screen('RELATIVE CHANGE',('RR=', 'R'),'RR=TREAT/CONTROL','RRR=1-RR',('RRR=', '1-R'),'RISKS ON 0..1')
    p.add('Else');p.screen('CONTROL RISK=0','RR IS UNDEFINED',('RT=', 'B'),('RC=', 'C'))
    p.add('End','If H>0','Then','1/H→T','int(T)→K','If T>K+.00000001','K+1→K')
    p.screen('NUMBER TO TREAT',('NNT=', 'T'),('WHOLE=', 'K'),'NNT=1/(RC-RT)',('RC=', 'C'),('RT=', 'B'),('ARR=', 'H'))
    p.add('Else','If H<0','Then','1/(B-C)→T','int(T)→K','If T>K+.00000001','K+1→K')
    p.screen('NUMBER TO HARM',('NNH=', 'T'),('WHOLE=', 'K'),'NNH=1/(RT-RC)',('RT=', 'B'),('RC=', 'C'),('ARI=', 'B-C'))
    p.add('Else');p.screen('NO ABSOLUTE GAP','ARR=0','NNT/NNH INFINITE',('RT=', 'B'),('RC=', 'C'))
    p.add('End','End','Stop')

p=Program('BMRISK','RR, ARR, RRR, NNT and NNH from counts',['risk','nnt'],
          'Prospective treatment/control groups; enter the same adverse event in both.',[6,19,18,25])
p.ask('TREAT EVENTS','E','E≥0 and E=int(E)').ask('TREAT TOTAL','F','F≥1 and F=int(F) and F≥E')
p.ask('CONTROL EVENTS','G','G≥0 and G=int(G)').ask('CONTROL TOTAL','N','N≥1 and N=int(N) and N≥G')
p.add('E/F→B','G/N→C');risk_body(p)
p=Program('BMNNT','NNT/NNH from given event risks',['nnt','risk'],
          'Adverse-event risks as decimals, e.g. .08; includes absolute and relative changes.',[.08,.03])
p.ask('TREAT RISK 0..1','B','B≥0 and B≤1').ask('CONTROL RISK','C','C≥0 and C≤1');risk_body(p)

p=Program('BMOR','Odds ratio from a labeled table',['odds'],
          'Rows are exposed/unexposed; columns are outcome/no outcome, or use the same labeled case-control orientation.',[20,10,10,20])
numeric_inputs(p,[('A TOP LEFT','B','B≥0 and B=int(B)'),('B TOP RIGHT','C','C≥0 and C=int(C)'),
                  ('C BOTTOM LEFT','D','D≥0 and D=int(D)'),('D BOTTOM RIGHT','E','E≥0 and E=int(E)')])
p.require('C*D>0','OR DENOM IS ZERO')
p.add('B*E→F','C*D→G','F/G→T')
p.screen('ODDS RATIO',('OR=', 'T'),'OR=(A*D)/(B*C)',('A*D=', 'F'),('B*C=', 'G'),'LABEL ROWS/COLS','ODDS NOT RISK')
p.screen('CROSS PRODUCTS',('A=', 'B'),('B=', 'C'),('C=', 'D'),('D=', 'E'),('OR=', 'T'),'KEEP ORIENTATION',last=True)

p=Program('BMOUTPUT','Use a supplied test statistic or p value',['rcode','hypothesis'],
          'Read the supplied output first; enter its p value, t, F or chi-square statistic.',[3,5.832,2,19,.05])
p.ask('1 P 2 T 3 F 4CHI','L','L≥1 and L≤4 and L=int(L)')
p.add('If L=1','Then');p.ask('PRINTED P','P','P≥0 and P≤1')
p.add('Else');p.ask('STATISTIC','T');p.add('If L>2','Then');p.require('T≥0','STAT NEEDS >=0');p.add('End')
p.ask('DF OR NUM DF','D','D≥1 and D=int(D)')
p.add('If L=3','Then');p.ask('DENOM DF','E','E≥1 and E=int(E)');p.add('End',
      'If L=2','min(1,2*tcdf(abs(T),1ᴇ99,D))→P','If L=3','Fcdf(T,1ᴇ99,D,E)→P',
      'If L=4','χ²cdf(T,1ᴇ99,D)→P','End');levels(p)
p.screen('OUTPUT DECISION',pval(),('ALPHA=', 'A'),decision(),'REJECT WHEN P<A','USE TEST H0','KEEP PAIR LABELS')
p.add('If L>1','Then')
p.screen('STATISTIC INPUTS',('STAT=', 'T'),('DF=', 'D'),'T:TOTAL 2 TAIL P','F/CHI:UPPER TAIL','ANOVA PAIRS KEEP','RESIDUAL MS + DF')
p.add('End','Stop')

p=Program('BMCOIN','Exactly k heads in fair coin tosses',['random'],
          'Independent fair tosses; counts all sequences and the favorable combinations.',[3,2])
p.ask('NUMBER TOSSES','N','N≥1 and N=int(N) and N≤100').ask('HEADS WANTED','K','K≥0 and K≤N and K=int(K)')
p.add('1→T','For(I,1,K)','T*(N-I+1)/I→T','End','2^N→B','T/B→P')
p.screen('EXACT HEAD COUNT',('PROB=', 'P'),('WAYS=', 'T'),('TOTAL=', 'B'),'P=WAYS/TOTAL',('N=', 'N'),('HEADS=', 'K'))
p.screen('COUNTING WORK','TOTAL=2^N','WAYS=N!/(K!*(N-K)!)',('WAYS=', 'T'),('TOTAL=', 'B'),('P=', 'P'),'FAIR INDEP TOSSES',('N=', 'N'),('K=', 'K'),last=True)

p=Program('BMDCDF','Discrete interval with endpoint choices',['dcdf','pmf'],
          'A probability table and an interval; specify whether each endpoint is included.',[4,-1,.55,2,.15,3,.1,7,.2,2,7,1,0])
p.ask('NUMBER VALUES','N','N≥1 and N=int(N) and N≤100')
p.add('N→dim(ʟBMX)','N→dim(ʟBMP)','For(I,1,N)','ClrHome','Disp "ROW",I')
p.ask('VALUE','X').ask('PROB','P','P≥0 and P≤1')
p.add('X→ʟBMX(I)','P→ʟBMP(I)','End')
p.require('abs(sum(ʟBMP)-1)<.00000001','PROBS MUST SUM 1')
p.ask('LOW ENDPOINT','B').ask('HIGH ENDPOINT','C','C≥B').ask('INCLUDE LOW 1/0','D','D=0 or D=1').ask('INCLUDE HIGH 1/0','E','E=0 or E=1')
p.add('sum((ʟBMX≤B)*ʟBMP)→F','sum((ʟBMX≤C)*ʟBMP)→G','sum((ʟBMX=B)*ʟBMP)→H','sum((ʟBMX=C)*ʟBMP)→K',
      'max(0,G-F+D*H-(1-E)*K)→P')
p.screen('DISCRETE INTERVAL',('P=', 'P'),('LOW=', 'B'),('HIGH=', 'C'),('if','D=1','LOW INCLUDED','LOW EXCLUDED'),
         ('if','E=1','HIGH INCLUDED','HIGH EXCLUDED'),'ADD SELECTED MASS')
p.screen('CDF ENDPOINT WORK',('F(HI)=', 'G'),('F(LO)=', 'F'),('P(X=L)=', 'H'),('P(X=H)=', 'K'),
         'START F(HI)-F(LO)','ADD LOW IF IN')
p.screen('ADJUST ENDPOINTS',('BASE=', 'G-F'),('ADD L=', 'D*H'),('SUB H=', '(1-E)*K'),
         'SUB HIGH IF OUT',('P=', 'P'),'CDF INCLUDES <=',last=True)

p=Program('BMSEVAR','Uncertainty of a sample variance',['estimators','summary'],
          'Normal setting: estimated SE of s squared, alongside SD and SEM.',[4,16])
p.ask('SAMPLE SD','S','S≥0').ask('SAMPLE N','N','N≥2 and N=int(N)')
p.add('S^2→B','B*√(2/(N-1))→T','S/√(N)→H')
p.screen('VARIANCE ESTIMATE',('VAR=', 'B'),('SEVAR=', 'T'),('SEM=', 'H'),'SEVAR=VAR*SQRT(', '2/(N-1))','NORMAL SETTING')
p.screen('KEEP TARGET CLEAR',('SD=', 'S'),('VAR=', 'B'),('N-1=', 'N-1'),('SEVAR=', 'T'),('SEM=', 'H'),'SEVAR IS NOT SEM',last=True)

p=Program('BMSEM','SEM from a given SD and n',['sampling','summary'],
          'Individual SD and sample size; no mean or probability cutoffs required.',[5,10])
p.ask('INDIVIDUAL SD','S','S≥0').ask('SAMPLE SIZE N','N','N≥1 and N=int(N)')
p.add('S/√(N)→H','S^2/N→B')
p.screen('STANDARD ERROR',('SEM=', 'H'),('VAR MEAN=', 'B'),'SEM=SD/SQRT(N)',('SD=', 'S'),('N=', 'N'),
         ('SQRT N=', '√(N)'),'SD IS INDIVIDUAL','SEM IS MEAN SPREAD',last=True)

p=Program('BMCRIT','Critical values from tail areas',['distributions','hypothesis'],
          'Positive two-sided z/t cutoff, or upper-tail F/chi-square cutoff.',[2,4,.05])
p.ask('1 Z 2 T 3 F 4CHI','L','L≥1 and L≤4 and L=int(L)')
p.add('If L>1','Then');p.ask('DF OR NUM DF','D','D≥1 and D=int(D)');p.add('End','If L=3','Then')
p.ask('DENOM DF','E','E≥1 and E=int(E)');p.add('End');levels(p)
p.add('If L=1','invNorm(1-A/2,0,1)→C','If L=2','Then');p.inverse('t','A');p.add('End','If L=3','Then');p.inverse('f','A');p.add('End','If L=4','Then');p.inverse('chi','A');p.add('End')
p.screen('CRITICAL VALUE',('CRIT=', 'C'),('ALPHA=', 'A'),('if','L≤2','Z/T: TWO SIDED','F/CHI:UPPER TAIL'),
         'T TABLE:TOTAL A','INV T:AREA=1-A/2','MATCH ALL DF',
         ('when','L>1','DF=', 'D','Z HAS NO DF'),('when','L=3','DENOM DF=', 'E',' '),last=True)

# Optional menu; every calculation file above can also run on its own.
p=Program('BME423','Program chooser',[],
          'Optional menu; download the calculation files you intend to run as well.',[])
p.add('Menu("BME423","DESCRIPTIVE",DS,"PROBABILITY",PR,"MEAN TESTS",MT,"NOMINAL TESTS",NT,"RISK AND ODDS",RR,"ADJUST/OUTPUT",AD,"EXIT",XX)',
      'Lbl DS','Menu("DESCRIPTIVE","MEAN SD SEM",D1,"PERCENTILES",D2,"CHANGE SEM",D3,"SE OF VARIANCE",D4,"GIVEN SD TO SEM",D5,"EXIT",XX)',
      'Lbl D1','prgmBMDESC','Stop','Lbl D2','prgmBMPCTL','Stop','Lbl D3','prgmBMSECH','Stop','Lbl D4','prgmBMSEVAR','Stop','Lbl D5','prgmBMSEM','Stop',
      'Lbl PR','Menu("PROBABILITY","DISCRETE",P1,"DENSITIES",P2,"NORMAL AREAS",P3,"NORMAL CUTOFF",P4,"SAMPLE MEAN",P5,"OTHER",P6,"EXIT",XX)',
      'Lbl P1','Menu("DISCRETE","TABLE MEAN CDF",P7,"MISSING C",P8,"EVENTS",P9,"EXACT HEADS",PF,"INTERVAL",PG,"EXIT",XX)',
      'Lbl P7','prgmBMDISC','Stop','Lbl P8','prgmBMMASS','Stop','Lbl P9','prgmBMEVENT','Stop','Lbl PF','prgmBMCOIN','Stop','Lbl PG','prgmBMDCDF','Stop',
      'Lbl P2','Menu("DENSITY","LINEAR PDF",P0,"TWO PIECES",PA,"MISSING C",PB,"UNKNOWN END",PC,"EXIT",XX)',
      'Lbl P0','prgmBMPDF','Stop','Lbl PA','prgmBMPIECE','Stop','Lbl PB','prgmBMCONST','Stop','Lbl PC','prgmBMEND','Stop',
      'Lbl P3','prgmBMNORM','Stop','Lbl P4','prgmBMINVN','Stop','Lbl P5','prgmBMSE','Stop',
      'Lbl P6','Menu("OTHER PROB","UNIFORM",PD,"LINEAR COMBO",PE,"SHIFT ONE X",PH,"EXIT",XX)',
      'Lbl PD','prgmBMUNIF','Stop','Lbl PE','prgmBMLINE','Stop','Lbl PH','prgmBMSHIFT','Stop',
      'Lbl MT','Menu("MEAN TESTS","ONE SAMPLE T",M1,"POOLED TWO T",M2,"BALANCED ANOVA",M3,"ANOVA PAIR",M4,"EXIT",XX)',
      'Lbl M1','prgmBMONE','Stop','Lbl M2','prgmBMTWO','Stop','Lbl M3','prgmBMANOVA','Stop','Lbl M4','prgmBMPAIR','Stop',
      'Lbl NT','Menu("NOMINAL","PROP SE",N1,"YATES Z",N2,"YATES 2X2 CHI",N3,"LARGER TABLE",N4,"GOODNESS FIT",N5,"EXIT",XX)',
      'Lbl N1','prgmBMBIN','Stop','Lbl N2','prgmBMZ','Stop','Lbl N3','prgmBMCHI2','Stop','Lbl N4','prgmBMCHIR','Stop','Lbl N5','prgmBMGOF','Stop',
      'Lbl RR','Menu("RISK ODDS","COUNTS RR NNT",R1,"GIVEN RISKS",R2,"ODDS RATIO",R3,"EXIT",XX)',
      'Lbl R1','prgmBMRISK','Stop','Lbl R2','prgmBMNNT','Stop','Lbl R3','prgmBMOR','Stop',
      'Lbl AD','Menu("ADJUST OUTPUT","BONFERRONI",A1,"HOLM",A2,"SUPPLIED OUTPUT",A3,"CRITICAL VALUES",A4,"EXIT",XX)',
      'Lbl A1','prgmBMBONF','Stop','Lbl A2','prgmBMHOLM','Stop','Lbl A3','prgmBMOUTPUT','Stop','Lbl A4','prgmBMCRIT','Stop','Lbl XX','Stop')

def build():
    evidence=json.loads((R/'exam-priorities.json').read_text())
    scores={t['topic']:t['score'] for t in evidence['topics']}
    result=[]
    for p in PROGRAMS:
        assert re.fullmatch('[A-Z][A-Z0-9]{0,7}',p.name)
        source='\n'.join(p.lines)+'\n'
        # Names, tokens and checksum are validated by round-trip and tests.
        with warnings.catch_warnings():
            warnings.simplefilter('error')
            program=TIProgram(name=p.name)
            program.load_string(source,model=TI_84PCEPY)
            program.save(str(BIN/(p.name+'.8xp')),model=TI_84PCEPY)
            reopened=TIProgram.open(str(BIN/(p.name+'.8xp')))
            assert reopened.data==program.data and reopened.name==p.name
            assert program.supported_by(TI_84PCEPY),(p.name,program.get_min_os())
        (SRC/(p.name+'.txt')).write_text(source)
        result.append(dict(name=p.name,title=p.title,topics=p.topics,use=p.use,
                           priority=max([scores.get(t,0) for t in p.topics] or [0]),
                           example=p.example,bytes=len(program.data),screens=len(p.screens),
                           download='programs/'+p.name+'.8xp',source='source/'+p.name+'.txt',
                           sha256=hashlib.sha256((BIN/(p.name+'.8xp')).read_bytes()).hexdigest()))
    manifest=dict(format='TI-BASIC / .8xp',compatibility='TI-84 Plus CE / TI-84 Plus CE Python (TI-BASIC)',
                  programCount=len(result),priorityMethod=evidence['method'],programs=result)
    (OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    print(f'Built {len(result)} programs; {sum(p["bytes"] for p in result)} token bytes. All tokens supported by the TI-84 Plus CE Python target; valid .8xp round trips.')
    return manifest

def package():
    manifest=json.loads((OUT/'manifest.json').read_text())
    validation=json.loads((OUT/'validation.json').read_text())
    assert validation['passed'] and validation['manifestSHA256']==hashlib.sha256((OUT/'manifest.json').read_bytes()).hexdigest(),'Run verification before packaging'
    paths=[OUT/'README.txt',OUT/'manifest.json',OUT/'validation.json']
    paths += sorted(BIN.glob('*.8xp'))+sorted(SRC.glob('*.txt'))
    target=OUT/'BME423_TI84_CE_PYTHON.zip'
    with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
        for path in paths:
            info=zipfile.ZipInfo(str(path.relative_to(OUT)),date_time=(2026,10,18,0,0,0))
            info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16
            archive.writestr(info,path.read_bytes())
    with zipfile.ZipFile(target) as archive:
        assert archive.testzip() is None
        assert len([n for n in archive.namelist() if n.endswith('.8xp')])==manifest['programCount']
    print(f'Packaged {target.name}: {target.stat().st_size} bytes; {manifest["programCount"]} calculator programs.')

if __name__=='__main__':
    package() if '--package' in sys.argv else build()
