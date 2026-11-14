/**
 * Nadam Veena Academy — Local 3D Card Tilt & Golden Glare Plugin (vanilla-tilt.js)
 * Applies smooth 3D perspective tilt and warm turmeric-gold glare to .tilt-card / [data-tilt]
 * Automatically disabled on touch devices and when prefers-reduced-motion is active.
 */
(function () {
  'use strict';

  function initTiltCards() {
    var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) {
      return;
    }

    var cards = document.querySelectorAll('.tilt-card, [data-tilt]');
    cards.forEach(function (card) {
      if (card.dataset.tiltInitialized === 'true') return;
      card.dataset.tiltInitialized = 'true';

      var maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 6;
      var glareEl = document.createElement('div');
      glareEl.className = 'tilt-glare';
      glareEl.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:inherit;opacity:0;transition:opacity 0.25s ease;z-index:4;background:radial-gradient(circle at 50% 50%, rgba(245, 206, 105, 0.22), transparent 65%);';
      card.appendChild(glareEl);

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        var rotateX = ((y - centerY) / centerY) * -maxTilt;
        var rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = 'perspective(1000px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) scale3d(1.015, 1.015, 1.015)';
        var px = ((x / rect.width) * 100).toFixed(1);
        var py = ((y / rect.height) * 100).toFixed(1);
        glareEl.style.background = 'radial-gradient(circle at ' + px + '% ' + py + '%, rgba(245, 206, 105, 0.24), transparent 65%)';
        glareEl.style.opacity = '1';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        glareEl.style.opacity = '0';
      });
    });
  }

  window.NadamTilt = { init: initTiltCards };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTiltCards);
  } else {
    initTiltCards();
  }
})();
