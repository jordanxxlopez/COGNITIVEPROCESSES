import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const g=await b.newPage();await g.setViewport({width:1100,height:900});
await g.goto('http://localhost:8790/index.html');await new Promise(r=>setTimeout(r,1500));
await g.evaluate(()=>{view='m2explain';state.aids.filter='13';render();document.querySelector('.aid-explain').open=true});
console.log(await g.evaluate(()=>({nav:[...document.querySelectorAll('#workspaceNav button')].map(x=>x.textContent)[5],h1:document.querySelector('#content h1').textContent,paras:document.querySelectorAll('.aid-explain[open] .aid-long').length,ol:document.querySelectorAll('.aid-explain ol').length,short:document.querySelectorAll('.aid-short').length})));
await g.evaluate(()=>{state.aids.filter='all';save()});await b.close();
