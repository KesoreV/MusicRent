/* ═══════════════════════════════════════════════════════
   MusicRent — Визуальные переходы между страницами
════════════════════════════════════════════════════════ */
(function () {

  /* ── Элемент-круг для ripple-эффекта ── */
  var ripple = document.createElement('div');
  ripple.style.cssText = [
    'position:fixed', 'border-radius:50%', 'pointer-events:none',
    'z-index:99998', 'background:linear-gradient(135deg,#3b82f6,#818cf8)',
    'transform:scale(0)', 'opacity:0',
    'transition:transform .58s cubic-bezier(.4,0,.2,1), opacity .15s'
  ].join(';');
  document.body.appendChild(ripple);

  /* ── Анимация появления страницы (только opacity — transform ломает position:fixed) ── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .38s ease';
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.style.opacity = '1';
    });
  });

  /* ── Ripple-навигация ── */
  function rippleNavigate(x, y, url) {
    var dx   = Math.max(x, window.innerWidth  - x);
    var dy   = Math.max(y, window.innerHeight - y);
    var size = Math.sqrt(dx * dx + dy * dy) * 2.2;

    ripple.style.width   = size + 'px';
    ripple.style.height  = size + 'px';
    ripple.style.left    = (x - size / 2) + 'px';
    ripple.style.top     = (y - size / 2) + 'px';
    ripple.style.opacity = '1';
    ripple.style.transform = 'scale(0)';

    /* reflow */
    void ripple.offsetWidth;

    ripple.style.transition = 'transform .55s cubic-bezier(.4,0,.2,1), opacity .1s';
    ripple.style.transform  = 'scale(1)';

    setTimeout(function () { window.location.href = url; }, 500);
  }

  /* ── Плавный скролл вверх ── */
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── Определяем текущую страницу ── */
  function onPage(name) {
    var p = window.location.pathname;
    return p.endsWith(name) ||
           (name === 'index.html' && (p === '/' || p.endsWith('/')));
  }

  /* ── Центр элемента ── */
  function center(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* ─── Логотип ─── */
    var logo = document.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('click', function (e) {
        e.preventDefault();
        if (onPage('index.html')) {
          scrollToTop();
        } else {
          var c = center(this);
          rippleNavigate(c.x, c.y, 'index.html');
        }
      });
    }

    /* ─── Все ссылки «Каталог» ─── */
    document.querySelectorAll('a[href="catalog.html"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (onPage('catalog.html')) return; /* уже на каталоге */
        e.preventDefault();
        var c = center(this);
        rippleNavigate(c.x, c.y, 'catalog.html');
      });
    });

    /* ─── Ссылки «Главная» с других страниц ─── */
    document.querySelectorAll('a[href="index.html"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (onPage('index.html')) {
          e.preventDefault();
          scrollToTop();
          return;
        }
        e.preventDefault();
        var c = center(this);
        rippleNavigate(c.x, c.y, 'index.html');
      });
    });

  });
})();
