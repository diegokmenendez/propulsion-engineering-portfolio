/* Home page: show the name in the top bar once the big heading scrolls out of view. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var bar = document.querySelector('.bar-home');
    var h1 = document.querySelector('h1');
    if (!bar || !h1) return;
    if (!('IntersectionObserver' in window)) { bar.classList.add('show-brand'); return; }
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('show-brand', !entries[0].isIntersecting);
    }, { rootMargin: '-56px 0px 0px 0px' }).observe(h1);
  });
})();

/* Fade-in on scroll. Does nothing if the browser lacks IntersectionObserver
   or the visitor prefers reduced motion, so content is never hidden by mistake. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js');
  document.addEventListener('DOMContentLoaded', function () {
    var els = document.querySelectorAll('.overview, .section, .hotfires-head, .tl-item, .design > h2, .design .row, .about');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  });
})();
