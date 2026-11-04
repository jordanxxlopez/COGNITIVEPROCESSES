'use strict';
// Keep the existing course timer and its handlers intact while the reader
// replaces its controls. A single timer follows the expanded reader, then
// returns to its original header without restarting the countdown.
(() => {
  function mount() {
    const timer = document.getElementById('duration')?.closest('.timer');
    if (!timer) return;
    const home = document.createComment('study timer home');
    timer.before(home);
    timer.setAttribute('role', 'group');
    timer.setAttribute('aria-label', 'Study timer');
    const selector = [
      '#readerDialog[open] .reader-controls',
      '.expanded-shell .expanded-toolbar .reader-controls',
      'body.expanded .expanded-preview .teachcontrols',
      'body.expanded .viewer-controls'
    ].join(',');
    function placeTimer() {
      const controls = document.querySelector(selector);
      if (controls) {
        if (timer.parentElement !== controls) controls.append(timer);
        if (!timer.hasAttribute('data-reader-timer')) timer.setAttribute('data-reader-timer', '');
      } else {
        if (timer.previousSibling !== home) home.after(timer);
        if (timer.hasAttribute('data-reader-timer')) timer.removeAttribute('data-reader-timer');
      }
    }
    new MutationObserver(placeTimer).observe(document.body, {
      childList: true, subtree: true, attributes: true,
      attributeFilter: ['class', 'open']
    });
    placeTimer();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once: true});
  else mount();
})();
