// Reproduce genuine R output using only raw measurements/counts in the supplied PDFs.
// Usage: node capture_v4_r_outputs.cjs /path/to/webr/dist/webr.cjs
const fs=require('node:fs'),path=require('node:path');
const {WebR}=require(process.argv[2]||'/tmp/bme423-r-runtime/node_modules/webr/dist/webr.cjs');
(async()=>{
 const r=new WebR();await r.init();
 await r.evalRVoid(`
 options(width=72, digits=7)
 freshman <- c(65,69,59,64,62,67,68,62,64,65)
 senior <- c(69,66,70,71,72,67,70,71,72,69)
 welch <- t.test(freshman,senior)
 pooled <- t.test(freshman,senior,var.equal=TRUE)
 Exhaled_NO <- c(23.1,37.8,19.4,29.3,41,26.5,
                 9.1,10.8,6.5,21,18.4,23.9,17.7,34.8,4.5,10.1,
                 10.5,16.1,24.5,12.4,20.6,18.6)
 Group <- factor(rep(c('A','B','C'),c(6,10,6)))
 fit <- aov(Exhaled_NO ~ Group)
 thrombi <- matrix(c(18,7,6,13),nrow=2,byrow=TRUE)
 depression <- matrix(c(36,131,41,132,75,104),nrow=3,byrow=TRUE)
 exercise <- c(255,125,90)
 chi_y <- chisq.test(thrombi)
 chi_large <- chisq.test(depression)
 chi_gof <- chisq.test(exercise,p=c(.60,.25,.15))
 `);
 const calls={welch:'welch',pooled:'pooled',anova:'summary(fit)',anova_print:'print(fit)',
  chi_yates:'chi_y',chi_large:'chi_large',chi_gof:'chi_gof',
  pnorm_left:'pnorm(85,95,8.7)',pnorm_right:'pnorm(115,95,8.7,lower.tail=FALSE)',
  qnorm_left:'qnorm(.975,95,8.7)',qnorm_right:'qnorm(.025,95,8.7,lower.tail=FALSE)'};
 const outputs={};for(const [key,call] of Object.entries(calls)){
  outputs[key]=await r.evalRString(`paste(capture.output(${call}),collapse="\\n")`);
 }
 const numbers={};for(const [key,expression] of Object.entries({
  welch:'c(welch$statistic,welch$parameter,welch$p.value)',
  pooled:'c(pooled$statistic,pooled$parameter,pooled$p.value)',
  anova:'c(summary(fit)[[1]][1,4],summary(fit)[[1]][1,5],sigma(fit)^2)',
  chi_yates:'c(chi_y$statistic,chi_y$parameter,chi_y$p.value)',
  chi_large:'c(chi_large$statistic,chi_large$parameter,chi_large$p.value)',
  chi_gof:'c(chi_gof$statistic,chi_gof$parameter,chi_gof$p.value)'})){
  numbers[key]=await (await r.evalR(expression)).toArray();
 }
 const result={runtime:await r.evalRString('R.version.string'),sources:{
  welch:'hw1.pdf p4: freshman/senior raw heights; requested output-reading example only',
  pooled:'hw1.pdf p4: same raw heights',anova:'session7.pdf pp37,39: actual nitric-oxide data and output',
  chi_yates:'session11.pdf pp19–20; session12.pdf pp9–11',chi_large:'session12.pdf pp13–16',
  chi_gof:'session12.pdf pp24–27',normal:'hw1.pdf p3: glucose mean95 SD8.7'},outputs,numbers};
 fs.writeFileSync(path.join(__dirname,'..','exam-sheet-v4-r-output.json'),JSON.stringify(result,null,2)+'\n');
 console.log('Captured genuine R output for',Object.keys(outputs).join(', '));r.close();
})().catch(e=>{console.error(e);process.exit(1)});
