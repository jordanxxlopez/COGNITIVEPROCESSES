(() => {
 const key='ling406-module1-preferences';
 let prefs={theme:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light',sideClosed:innerWidth<761};
 try{Object.assign(prefs,JSON.parse(localStorage.getItem(key)||'{}'))}catch{}
 function apply(){document.documentElement.dataset.theme=prefs.theme;document.body.classList.toggle('side-closed',prefs.sideClosed);document.querySelector('#sidebarLabel').textContent=prefs.sideClosed?'Open sidebar':'Close sidebar';document.querySelectorAll('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===prefs.theme)))}
 document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.theme)prefs.theme=b.dataset.theme;else if(b.dataset.action==='sidebar')prefs.sideClosed=!prefs.sideClosed;else if(b.id==='openSidebar')prefs.sideClosed=false;else if(b.dataset.go==='home'){document.querySelector('#content').focus();return}else return;apply();try{localStorage.setItem(key,JSON.stringify(prefs))}catch{}});
 apply();
})();
