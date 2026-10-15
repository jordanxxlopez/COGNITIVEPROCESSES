const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');const app=fs.readFileSync(path.join(root,'app.js'),'utf8');const DATA=JSON.parse(fs.readFileSync(path.join(root,'data.js'),'utf8').replace(/^const DATA=/,'').trim().replace(/;$/,''));
const V2=JSON.parse(fs.readFileSync(path.join(root,'v2-data.js'),'utf8').replace(/^const V2=/,'').trim().replace(/;$/,''));DATA.questions.push(...V2.questions);
const s=vm.createContext({});vm.runInContext(app.slice(app.indexOf('function shuffleChoiceOrder('),app.indexOf('function startQuiz(')),s);const before=JSON.stringify(DATA.questions);const keys=new Set();
for(let i=0;i<500;i++){const items=s.prepareQuizItems(DATA.questions);assert(s.validateAnswerKey(items));let key=items.map(q=>q.order.indexOf(q.correct));for(let j=1;j<key.length;j++)assert.notEqual(key[j],key[j-1]);keys.add(key.join(''))}assert.equal(keys.size,500);assert.equal(JSON.stringify(DATA.questions),before);
const order=s.shuffleChoiceOrder;let draws=0,checks=0;const validator=s.validateAnswerKey;s.shuffleChoiceOrder=n=>++draws<=100?[0,1,2,3]:order(n);s.validateAnswerKey=items=>{checks++;return validator(items)};assert(validator(s.prepareQuizItems(DATA.questions.slice(0,100))));assert(checks>=2);
vm.runInContext(app.slice(app.indexOf('function parseAnswer('),app.indexOf('function gradeProblem(')),s);for(const [input,expected]of[['1/2',.5],['50%',.5],['−2.5',-2.5],['1e-3',.001]])assert.equal(s.parseAnswer(input),expected);assert(Number.isNaN(s.parseAnswer('2+2')));assert(!Number.isFinite(s.parseAnswer('1/0')));
const jStat=require(path.join(root,'vendor/jstat.min.js')).jStat;
for(const x of JSON.parse(fs.readFileSync(path.join(__dirname,'math-reference.json'),'utf8'))){const n=x.type==='normal'?jStat.normal.cdf(x.x,0,1):x.type==='t'?jStat.studentt.inv(x.p,x.df):x.type==='chi'?jStat.chisquare.inv(x.p,x.df):jStat.centralF.inv(x.p,x.df,x.df2);assert(Math.abs(n-x.expected)<=Math.max(.00002,Math.abs(x.expected)*.00002),JSON.stringify({x,actual:n}))}
console.log('PASS: 500 validated full-bank random keys, deliberate key rejection/revalidation, immutable questions, safe numeric/fraction/percentage input, and browser distribution functions cross-checked against SciPy.');
// Regression: aliases and numerical variants must not duplicate stems in the full exam.
s.DATA=DATA;s.render=()=>{};s.window={scrollTo(){}};s.state={missed:[]};
vm.runInContext(app.split('\n').find(x=>x.startsWith('function shuffle(a)')),s);
vm.runInContext(app.split('\n').find(x=>x.startsWith('function startQuiz(')),s);
for(let i=0;i<100;i++){s.startQuiz('100');assert.equal(s.quiz.items.length,100);assert.equal(new Set(s.quiz.items.map(q=>q.stem)).size,100);assert(validator(s.quiz.items))}
console.log('PASS: 100 generated combined exams each contain 100 distinct question stems with valid answer keys.');
