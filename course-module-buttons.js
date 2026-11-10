/* Shared module navigation; each course retains its existing study engine and state. */
(() => {
  'use strict';
  const script = document.currentScript;
  const root = new URL('./', script.src);
  const course = script.dataset.course;
  const ling = course === 'ling285';
  const modern = ling && location.pathname.includes('/modern/');
  let pending = new URL(location.href).searchParams.get('pendingModule') === '3';
  const sidebar = document.querySelector('#sidebar');
  if (!sidebar) return;
  const host = document.createElement('section');
  host.id = 'courseModuleButtons';
  host.setAttribute('aria-label', 'Course modules');
  const anchor = document.querySelector(ling ? '#courseNav' : course === 'bme423' ? '#workNav' : '#workspaceNav');
  const label = anchor?.previousElementSibling;
  if (label?.matches('.label,.nav-label')) label.hidden = true;
  anchor.before(host);
  if (ling) {
    document.querySelector('#modernWorkspaceEntry')?.remove();
    document.querySelector('.workspace-switch')?.remove();
  }
  const empty = document.createElement('section');
  empty.id = 'pendingCourseModule'; empty.tabIndex = -1; empty.hidden = true;
  empty.innerHTML = `<div class="hero"><span class="tag">${course.toUpperCase()} · MODULE III</span><h1>Module III</h1><p>Module III materials have not been added yet.</p></div>`;
  document.querySelector('#content').after(empty);
  const labels = ling ? ['Module I · Midterm 1','Module II · Midterm 2','Module III'] : course === 'bme423' ? ['Module I · Midterm','Module II · Second half','Module III'] : ['Module I · Exam 1','Module II · Exam 2','Module III'];
  function activeModule() {
    if (pending) return 3;
    if (ling) return Number(document.querySelector('#moduleNav [aria-pressed="true"]')?.dataset.module?.replace('module','')) || 2;
    if (course === 'bme423') return typeof inModuleII === 'function' && inModuleII() ? 2 : (typeof view !== 'undefined' && view === 'courseOverview' ? 0 : 1);
    return (typeof inSecondHalf === 'function' && inSecondHalf()) || (typeof view !== 'undefined' && view === 'home') ? 2 : 1;
  }
  function install() {
    const active = activeModule();
    if (host.dataset.active !== String(active)) {
      host.dataset.active = String(active);
      host.innerHTML = (ling ? `<a class="course-module-button workspace-entry" href="${new URL(modern?'ling285/':'ling285/modern/',root).href}">${modern?'Open original workspace':'Open modern workspace'}</a>` : '') +
        '<div class="nav-label label">Course modules</div><nav aria-label="Switch course module"><button class="course-module-button" data-studio-module="overview">Course overview</button>' +
        labels.map((text,i)=>`<button class="course-module-button${active===i+1?' active':''}" data-studio-module="${i+1}" aria-pressed="${active===i+1}">${text}</button>`).join('')+'</nav>';
    }
    document.body.classList.toggle('pending-course-module', pending);
    if (empty.hidden === pending) empty.hidden = !pending;
    const content = document.querySelector('#content');
    if (content.hidden !== pending) content.hidden = pending;
  }
  function clearPending() {
    pending = false;
    const url = new URL(location.href); url.searchParams.delete('pendingModule');
    history.replaceState(null,'',url); install();
  }
  host.addEventListener('click', e => {
    const button = e.target.closest('[data-studio-module]'); if (!button) return;
    const id = button.dataset.studioModule;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (id === '3') {
      pending = true;
      const url = new URL(location.href); url.searchParams.set('pendingModule','3'); history.replaceState(null,'',url);
      install(); empty.focus(); return;
    }
    clearPending();
    let target;
    if (ling) target = document.querySelector(id==='overview' ? '#courseNav [data-go="home"]' : `#moduleNav [data-module="module${id}"]`);
    else if (course==='bme423') target = document.querySelector(id==='overview' ? '#workNav [data-view="courseOverview"]' : id==='1' ? '#moduleIArchive [data-view="home"]' : '#workNav [data-view="m2home"]');
    else target = document.querySelector(id==='1' ? '#moduleNav [data-view="essentials"]' : '#workspaceNav [data-view="home"]');
    target?.click(); install();
    if (id==='1' && !ling) {
      const archive = document.querySelector(course==='bme423'?'#moduleIArchive':'#examOneArchive');
      if (archive) archive.open=true;
    }
  });
  document.addEventListener('click', e => {
    if (pending && !host.contains(e.target) && e.target.closest('[data-view],[data-go],[data-module],[data-collection]')) clearPending();
  },true);
  window.addEventListener('popstate',()=>{pending=new URL(location.href).searchParams.get('pendingModule')==='3';install()});
  install();
  new MutationObserver(install).observe(document.body,{childList:true,subtree:true});
})();
