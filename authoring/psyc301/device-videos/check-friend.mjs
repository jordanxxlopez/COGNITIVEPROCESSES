import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const g=await b.newPage();const errs=[];g.on('pageerror',e=>errs.push(e.message));
await g.goto('http://localhost:8790/psyc301-module2.html');await new Promise(r=>setTimeout(r,1500));
const res=await g.evaluate(async()=>{const out={};for(const m of secondModules()){view='module';selected=m.id;render();await new Promise(r=>setTimeout(r,200));const s=document.querySelector('select[data-explanation-version]');out[m.id]=s?[...s.options].map(o=>o.value+':'+o.textContent.slice(0,22)):'none'}return out});
console.log(JSON.stringify(res,null,1));
console.log(await g.evaluate(()=>({nav:[...document.querySelectorAll('#workspaceNav button')].map(x=>x.textContent).slice(0,7)})));
console.log('errors',errs);await b.close();
