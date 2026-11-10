/* Shared, direct course-module links. Content and progress stay in each module. */
(() => {
  'use strict';
  const root = new URL('./', document.currentScript.src);
  const current = location.pathname.startsWith(new URL('module1/', root).pathname) ? 1 : location.pathname.startsWith(new URL('module3/', root).pathname) ? 3 : 2;
  const modules = [[1, 'Module I · Midterm 1', 'module1/'], [2, 'Module II · Midterm 2', './'], [3, 'Module III · Final', 'module3/']];
  const links = () => modules.map(([id, label, path]) => `<a class="button course-module${id === current ? ' active' : ''}" data-module-link="${id}" ${id === current ? 'aria-current="page"' : ''} href="${new URL(path + '?view=home', root).href}">${label}</a>`).join('');
  const style = document.createElement('style');
  style.textContent = '#courseNav{gap:8px}#courseNav .course-module,#courseNav > button{display:block;width:100%;text-align:left;padding:14px 13px;border:1px solid var(--border);border-radius:12px;font-size:14px;font-weight:650;line-height:1.4;background:transparent;color:var(--ink)}#courseNav .course-module:hover,#courseNav .course-module.active,#courseNav > button.active{background:var(--soft);border-color:var(--accent)}.reader-module-links{display:flex;flex-wrap:wrap;gap:6px}.reader-module-links a{font-size:13px}';
  document.head.append(style);
  function install() {
    const nav = document.querySelector('#courseNav');
    if (nav && !nav.querySelector('[data-module-link]')) {
      nav.innerHTML = `<button data-go="home" class="${!new URL(location.href).searchParams.get('view') || new URL(location.href).searchParams.get('view')==='home' ? 'active' : ''}">Course overview</button>${links()}`;
    }
    document.querySelectorAll('[data-module-navigation],label:has([data-course-module]),.archive').forEach(e => e.remove());
    document.querySelectorAll('.reader-controls').forEach(host => {
      if (!host.querySelector('.reader-module-links')) {
        const group = document.createElement('nav');
        group.className = 'reader-module-links'; group.setAttribute('aria-label', 'Course modules');
        group.innerHTML = links(); host.append(group);
      }
    });
  }
  install();
  new MutationObserver(install).observe(document.body, {childList:true,subtree:true});
  document.addEventListener('click', e => {
    if (!e.target.closest('[data-module-link]')) return;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    window.LingAudio?.stop(); window.LingVisual?.stop();
  });
})();
