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

  /* ── Анимация появления страницы ── */
  var _entryData = sessionStorage.getItem('_rippleExit');

  if (_entryData) {
    /* Синий круг сужается в точку (обратный ripple) */
    sessionStorage.removeItem('_rippleExit');
    var _pos  = JSON.parse(_entryData);
    var _ex   = _pos.x, _ey = _pos.y;
    var _dx   = Math.max(_ex, window.innerWidth  - _ex);
    var _dy   = Math.max(_ey, window.innerHeight - _ey);
    var _size = Math.sqrt(_dx * _dx + _dy * _dy) * 2.2;

    /* Создаём сплошной круг на весь экран */
    var _entry = document.createElement('div');
    _entry.style.cssText = [
      'position:fixed', 'border-radius:50%', 'pointer-events:none', 'z-index:99998',
      'background:linear-gradient(135deg,#3b82f6,#818cf8)',
      'width:'  + _size + 'px',
      'height:' + _size + 'px',
      'left:'   + (_ex - _size / 2) + 'px',
      'top:'    + (_ey - _size / 2) + 'px',
      'transform:scale(1)',
      'transition:transform .52s cubic-bezier(.4,0,.2,1)',
    ].join(';');
    document.body.appendChild(_entry);

    /* Страница сразу видна под кругом */
    document.body.style.opacity = '1';

    /* Запускаем сужение круга */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        _entry.style.transform = 'scale(0)';
        setTimeout(function () { _entry.remove(); }, 560);
      });
    });

  } else {
    /* Обычная загрузка — просто fade-in */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity .38s ease';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.style.opacity = '1';
      });
    });
  }

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

    sessionStorage.setItem('_rippleExit', JSON.stringify({ x: x, y: y }));
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

    /* ─── Все ссылки на каталог (включая ?cat=...) ─── */
    document.querySelectorAll('a[href^="catalog.html"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (onPage('catalog.html') && !this.getAttribute('href').includes('?')) return;
        e.preventDefault();
        var c   = center(this);
        var url = this.getAttribute('href');
        rippleNavigate(c.x, c.y, url);
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
