/* Additive slide-linked recordings. Existing transcripts and study state stay separate. */
(() => {
  'use strict';
  const data = window.LING406_AUDIO || {clips: {}, sections: {}};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const players = () => document.querySelectorAll('audio[data-study-audio]');
  let active = null;

  function localFile(file) {
    if (typeof file !== 'string' || !file || /[\\\u0000-\u0020]/.test(file)) return '';
    try {
      const url = new URL(file, location.href);
      return url.origin === location.origin && !/^(?:javascript|data):/i.test(file) ? file : '';
    } catch { return ''; }
  }

  function referenceHTML(reference) {
    if (!reference) return '';
    const text = Array.isArray(reference) ? reference.join(' · ') : String(reference);
    if (/^https:\/\/\S+$/.test(text)) return `<p><a href="${esc(text)}" target="_blank" rel="noopener">Source reference</a></p>`;
    return `<p>${esc(text)}</p>`;
  }

  function render(section) {
    const ids = data.sections?.[section.id] || [];
    const clips = ids.map(id => ({id, ...data.clips?.[id]})).filter(clip => clip.title && localFile(clip.file));
    if (!clips.length) return '';
    return `<section class="slide-audio-examples" aria-label="Listening examples for this slide" data-audio-section="${esc(section.id)}"><h3>Listen to the examples</h3><div class="slide-audio-list">${clips.map(clip => `<article class="slide-audio-item" data-audio-id="${esc(clip.id)}"><h4>${esc(clip.title)}</h4>${clip.kind ? `<p class="slide-audio-kind">${esc(clip.kind)}</p>` : ''}${clip.spokenText ? `<p class="slide-audio-words">${esc(clip.spokenText)}</p>` : ''}<audio controls preload="none" data-study-audio="${esc(clip.id)}" aria-label="${esc(clip.title)}" src="${esc(clip.file)}">Your browser does not support embedded audio. Use the recording download below.</audio>${clip.scope ? `<p class="slide-audio-scope">${esc(clip.scope)}</p>` : ''}<div class="slide-audio-links">${clip.note || clip.reference ? `<details><summary>Source and method</summary>${clip.note ? `<p>${esc(clip.note)}</p>` : ''}${referenceHTML(clip.reference)}</details>` : ''}<a href="${esc(clip.file)}" download>Download recording</a></div><p class="slide-audio-status" role="status" aria-live="polite"></p></article>`).join('')}</div></section>`;
  }

  function stop() {
    players().forEach(audio => {
      audio.pause();
      try { audio.currentTime = 0; } catch {}
    });
    if (active && !active.isConnected) {
      active.pause();
      try { active.currentTime = 0; } catch {}
    }
    active = null;
  }

  document.addEventListener('play', event => {
    const audio = event.target;
    if (!audio.matches?.('audio[data-study-audio]')) return;
    if (active && active !== audio) active.pause();
    players().forEach(other => { if (other !== audio) other.pause(); });
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    active = audio;
    const status = audio.closest('.slide-audio-item')?.querySelector('.slide-audio-status');
    if (status) status.textContent = '';
  }, true);

  document.addEventListener('ended', event => {
    if (event.target === active) active = null;
  }, true);

  document.addEventListener('error', event => {
    const audio = event.target;
    if (!audio.matches?.('audio[data-study-audio]')) return;
    const status = audio.closest('.slide-audio-item')?.querySelector('.slide-audio-status');
    if (status) status.textContent = 'This recording could not load. Try its download link or reconnect and replay.';
    if (active === audio) active = null;
  }, true);

  // Keep arrow-key seeking inside a focused native player from navigating slides.
  document.addEventListener('keydown', event => {
    if (event.target.matches?.('audio[data-study-audio]') && ['ArrowLeft', 'ArrowRight'].includes(event.key)) event.stopPropagation();
  }, true);

  // A rerender or removed slide must not leave a detached recording playing.
  new MutationObserver(() => {
    if (active && !active.isConnected) stop();
  }).observe(document.body, {childList: true, subtree: true});
  window.addEventListener('pagehide', stop);
  window.LingAudio = {render, stop};
})();
