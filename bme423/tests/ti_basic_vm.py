"""Execute the decoded TI-BASIC subset used by the calculator pack.

This is a source/bytecode execution harness, not a TI hardware or ROM emulator.
Its distribution primitives use SciPy; assertions use independent reference
identities/SciPy methods, including the complete existing practice bank.
"""
import math,re
from pathlib import Path
import numpy as np
from scipy import stats

class Halt(Exception):pass
class Jump(Exception):
    def __init__(self,label):self.label=label

def split_args(s):
    out=[];start=0;depth=0;quote=False
    for i,c in enumerate(s):
        if c=='"':quote=not quote
        if quote:continue
        if c in '({':depth+=1
        elif c in ')}':depth-=1
        elif c==',' and depth==0:out.append(s[start:i]);start=i+1
    out.append(s[start:]);return out

class Expr:
    token=re.compile(r'\s*(?:(\d*\.?\d+(?:ᴇ[⁻-]?\d+)?)|(ʟ[A-Z0-9]+)|([A-Za-z]+|θ|√|χ²cdf|𝙵cdf)|([(){}+*/^,=<>≠≤≥⁻-]))')
    def __init__(self,vm,text):
        self.vm=vm;self.tokens=[];pos=0
        while pos<len(text):
            m=self.token.match(text,pos)
            if not m:raise ValueError('Unknown expression text: '+text[pos:])
            self.tokens.append(next(g for g in m.groups() if g is not None));pos=m.end()
        self.tokens.append('EOF');self.i=0
    def pop(self):t=self.tokens[self.i];self.i+=1;return t
    def peek(self):return self.tokens[self.i]
    def expect(self,t):
        got=self.pop()
        if got!=t:raise ValueError((t,got,self.tokens))
    def expression(self,min_prec=0):
        t=self.pop()
        if t in ['⁻','-','+']:
            value=self.expression(6);value=-value if t!='+' else value
        elif t=='(':
            value=self.expression();self.expect(')')
        elif t=='{':
            values=[self.expression()]
            while self.peek()==',':self.pop();values.append(self.expression())
            self.expect('}');value=np.array(values,dtype=float)
        elif t.startswith('ʟ'):
            value=self.vm.lists.get(t[1:],np.array([],dtype=float))
            if self.peek()=='(':
                self.pop();index=self.expression();self.expect(')')
                assert index==int(index) and 1<=index<=len(value),(t,index,len(value))
                value=value[int(index)-1]
        elif t in {'getKey','Ans'}:
            value=self.vm.key() if t=='getKey' else self.vm.ans
        elif t in self.vm.functions:
            self.expect('(');args=[self.expression()]
            while self.peek()==',':self.pop();args.append(self.expression())
            self.expect(')');value=self.vm.functions[t](*args)
        elif re.fullmatch('[A-Zθ]',t):value=self.vm.variables.get(t,0.)
        elif re.match(r'\d|\.',t):value=float(t.replace('ᴇ','e').replace('⁻','-'))
        else:raise ValueError(('Unknown token',t,self.tokens))
        precedence={'or':1,'and':2,'=':3,'≠':3,'<':3,'>':3,'≤':3,'≥':3,'+':4,'-':4,'*':5,'/':5,'^':7}
        while self.peek() in precedence and precedence[self.peek()]>=min_prec:
            op=self.pop();prec=precedence[op];rhs=self.expression(prec if op=='^' else prec+1)
            if op=='+':value=value+rhs
            elif op=='-':value=value-rhs
            elif op=='*':value=value*rhs
            elif op=='/':value=value/rhs
            elif op=='^':value=value**rhs
            elif op=='=':value=value==rhs
            elif op=='≠':value=value!=rhs
            elif op=='<':value=value<rhs
            elif op=='>':value=value>rhs
            elif op=='≤':value=value<=rhs
            elif op=='≥':value=value>=rhs
            elif op=='and':value=bool(value) and bool(rhs)
            elif op=='or':value=bool(value) or bool(rhs)
        return value
    def run(self):
        value=self.expression()
        assert self.peek()=='EOF',('Unused tokens',self.tokens[self.i:])
        return value

def parse(lines):
    def block(i,terminators=()):
        nodes=[]
        while i<len(lines) and lines[i] not in terminators:
            n,i=one(i);nodes.append(n)
        return nodes,i
    def one(i):
        line=lines[i];i+=1
        if line.startswith('If '):
            condition=line[3:]
            if i<len(lines) and lines[i]=='Then':
                yes,i=block(i+1,('Else','End'));no=[]
                if lines[i]=='Else':no,i=block(i+1,('End',))
                assert lines[i]=='End'
                return ('if',condition,yes,no),i+1
            node,i=one(i);return ('if',condition,[node],[]),i
        for prefix,tag in [('For(','for'),('While ','while'),('Repeat ','repeat')]:
            if line.startswith(prefix):
                expr=line[len(prefix):]
                if tag=='for':expr=expr[:-1]
                body,i=block(i,('End',));assert lines[i]=='End'
                return (tag,expr,body),i+1
        assert line not in ('End','Then','Else'),line
        return ('cmd',line),i
    return block(0)[0]

class VM:
    def __init__(self,inputs=(),keys=(),menus=(),variables=None,root=None):
        self.inputs=iter(inputs);self.input_log=[];self.keys=iter(keys);self.menus=iter(menus)
        self.variables=dict(variables or {});self.lists={};self.ans=0.;self.steps=0
        self.grid=[' '*26 for _ in range(10)];self.screens=[];self.errors=[];self.root=root
        self.functions={
            '√':np.sqrt,'abs':np.abs,'int':np.floor,'log':np.log10,
            'round':lambda x,n=9:np.sign(x)*np.floor(np.abs(x)*10**n+.5)/10**n,
            'sum':np.sum,'mean':np.mean,'median':np.median,
            'min':lambda x,y=None:np.min(x) if y is None else np.minimum(x,y),
            'max':lambda x,y=None:np.max(x) if y is None else np.maximum(x,y),
            'not':np.logical_not,
            'normalcdf':lambda lo,hi,mu=0,sd=1:self.area(stats.norm,lo,hi,loc=mu,scale=sd),
            'invNorm':lambda p,mu=0,sd=1:stats.norm.ppf(p,loc=mu,scale=sd),
            'tcdf':lambda lo,hi,df:self.area(stats.t,lo,hi,df),
            'χ²cdf':lambda lo,hi,df:self.area(stats.chi2,lo,hi,df),
            'Fcdf':lambda lo,hi,d1,d2:self.area(stats.f,lo,hi,d1,d2),
            '𝙵cdf':lambda lo,hi,d1,d2:self.area(stats.f,lo,hi,d1,d2),
        }
    @staticmethod
    def area(dist,lo,hi,*args,**kwargs):
        # Stable equivalent of the calculator's interval-CDF primitive.
        c=dist.cdf(lo,*args,**kwargs)
        return dist.sf(lo,*args,**kwargs)-dist.sf(hi,*args,**kwargs) if c>.5 else dist.cdf(hi,*args,**kwargs)-c
    def expr(self,text):return Expr(self,text.strip()).run()
    def key(self):
        self.screens.append(self.grid.copy())
        return next(self.keys,105)
    def put(self,row,col,value):
        row,col=int(row),int(col)
        assert 1<=row<=10 and 1<=col<=26,(row,col)
        if not isinstance(value,str):
            value=float(value)
            assert math.isfinite(value),value
            # Six-significant-digit format used by the generated display code.
            value=format(value,'.6g').replace('e','E')
        assert col+len(value)<=27,('Output would run off CE screen',row,col,value)
        line=self.grid[row-1]
        self.grid[row-1]=(line[:col-1]+value+line[col-1+len(value):])[:26].ljust(26)
    def store(self,target,value):
        if target.startswith('dim('):
            name=target[5:-1];n=int(value);old=self.lists.get(name,np.array([]))
            self.lists[name]=np.pad(old[:n],(0,max(0,n-len(old))))
        elif target.startswith('ʟ'):
            if '(' in target:
                name,args=target[1:].split('(',1);index=self.expr(args[:-1])
                assert index==int(index) and 1<=index<=len(self.lists[name]),(name,index)
                self.lists[name][int(index)-1]=value
            else:self.lists[target[1:]]=np.array(value,dtype=float)
        else:
            assert re.fullmatch('[A-Zθ]',target),target
            self.variables[target]=float(value)
        self.ans=value
    def command(self,line):
        if line in ['Float','Normal','Real']:return
        if line=='ClrHome':self.grid=[' '*26 for _ in range(10)];return
        if line=='Stop':raise Halt()
        if line.startswith('Lbl '):return
        if line.startswith('Goto '):raise Jump(line[5:])
        if line.startswith('Menu('):
            args=split_args(line[5:-1]);choice=next(self.menus,1)
            raise Jump(args[2*choice])
        if line.startswith('prgm'):
            assert self.root
            self.execute((self.root/(line[4:]+'.txt')).read_text());return
        if line.startswith('Input '):
            args=split_args(line[6:]);value=next(self.inputs)
            self.input_log.append((args[0].strip('"'),value));self.store(args[1],value);return
        if line.startswith('Disp '):
            for arg in split_args(line[5:]):
                if arg.startswith('"'):value=arg[1:-1]
                else:value=self.expr(arg)
                # Disp only appears on input/error screens, not worked pages.
                self.grid=self.grid[1:]+[' '*26];self.put(10,1,value)
                if isinstance(value,str) and ('CHECK' in value or 'ZERO' in value or 'NEGATIVE' in value or 'MUST' in value):self.errors.append(value)
            return
        if line.startswith('Output('):
            r,c,val=split_args(line[7:-1]);self.put(self.expr(r),self.expr(c),val[1:-1] if val.startswith('"') else self.expr(val));return
        if line.startswith('SortA('):
            names=[s.strip()[1:] for s in split_args(line[6:-1])];order=np.argsort(self.lists[names[0]],kind='stable')
            for name in names:self.lists[name]=self.lists[name][order]
            return
        if '→' in line:
            expr,target=line.split('→');self.store(target,self.expr(expr));return
        raise ValueError('Unknown command '+line)
    def nodes(self,nodes):
        for node in nodes:
            self.steps+=1
            if self.steps>200000:raise RuntimeError('Program did not terminate')
            kind=node[0]
            if kind=='cmd':self.command(node[1])
            elif kind=='if':self.nodes(node[2] if self.expr(node[1]) else node[3])
            elif kind=='for':
                args=split_args(node[1]);var=args[0];start=self.expr(args[1]);end=self.expr(args[2]);step=self.expr(args[3]) if len(args)>3 else 1
                value=start
                while (value<=end if step>0 else value>=end):
                    self.store(var,value);self.nodes(node[2]);value=self.variables[var]+step
                self.store(var,value)
            elif kind=='while':
                while self.expr(node[1]):self.nodes(node[2])
            elif kind=='repeat':
                while True:
                    self.nodes(node[2])
                    if self.expr(node[1]):break
    def execute(self,source):
        lines=[l.strip() for l in source.splitlines() if l.strip()]
        nodes=parse(lines);labels={n[1][4:]:i for i,n in enumerate(nodes) if n[0]=='cmd' and n[1].startswith('Lbl ')}
        index=0
        while index<len(nodes):
            try:self.nodes([nodes[index]]);index+=1
            except Jump as e:index=labels[e.label]
    def run(self,source):
        try:self.execute(source)
        except Halt:pass
        return self

if __name__=='__main__':
    import json
    R=Path(__file__).resolve().parents[1]/'ti84'
    for p in json.loads((R/'manifest.json').read_text())['programs']:
        if p['name']=='BME423':continue
        vm=VM(p['example']).run((R/p['source']).read_text())
        print(p['name'],len(vm.screens),'screens',vm.errors)
