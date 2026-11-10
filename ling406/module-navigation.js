/* Add Module III navigation without migrating Module II content or browser state. */
(() => {
  'use strict';
  const root = new URL('./', document.currentScript.src);
  const module3 = new URL('module3/?view=home', root).href;
  function selector() {
    const label = document.createElement('label');
    label.className = 'transcript-version';
    label.dataset.moduleNavigation = 'true';
    label.append('Module');
    const select = document.createElement('select');
    select.setAttribute('aria-label', 'Course module');
    select.innerHTML = '<option value="2">II · Midterm 2</option><option value="3">III · Weeks 10–12 + final review</option>';
    select.addEventListener('change', () => {
      if (select.value === '3') {
        if ('speechSynthesis' in window) speechSynthesis.cancel();
        window.LingAudio?.stop();
        window.LingVisual?.stop();
        location.assign(module3);
      }
    });
    label.append(select);
    return label;
  }
  function install() {
    document.querySelectorAll('.topbar, .reader-controls').forEach(host => {
      if (!host.querySelector('[data-module-navigation]')) host.append(selector());
    });
    const nav = document.querySelector('#courseNav');
    if (nav && !nav.querySelector('[data-module-three-link]')) {
      const link = document.createElement('a');
      link.className = 'button';
      link.dataset.moduleThreeLink = 'true';
      link.href = module3;
      link.textContent = 'Module III · Weeks 10–12 + final review';
      nav.append(link);
    }
  }
  install();
  new MutationObserver(install).observe(document.body, {childList: true, subtree: true});
})();
