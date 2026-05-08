/* ═══════════════════════════════════════════════════════
   MusicRent — Авторский курсор
   Форма: Windows-стрелка в фирменном синем.
   Анимация: ripple только при клике.
════════════════════════════════════════════════════════ */
(function () {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  /* ── Генерация SVG-курсора ── */
  function cursorUrl(fill, stroke, glow) {
    var defs = glow
      ? '<defs><filter id="g"><feDropShadow dx="0" dy="0" stdDeviation="1.8" flood-color="' + glow + '" flood-opacity="0.9"/></filter></defs>'
      : '';
    var svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">',
      defs,
      /* Стрелка Windows — заливка + обводка */
      '<path d="M3 1 L3 19 L7.5 14 L11 21 L13.5 20 L10 13 L17 13 Z"',
      ' fill="', fill, '"',
      ' stroke="', stroke, '"',
      ' stroke-width="1.4" stroke-linejoin="round"',
      glow ? ' filter="url(#g)"' : '',
      '/>',
      '</svg>'
    ].join('');
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '") 3 1, auto';
  }

  /* Обычный: синий          Hover: ярче + свечение */
  var C_DEFAULT = cursorUrl('#3b82f6', '#0b1623',  null);
  var C_POINTER = cursorUrl('#60a5fa', '#0b1623', '#3b82f6');

  /* ── CSS: применяем курсоры ── */
  var style = document.createElement('style');
  style.textContent = [
    '* { cursor: ' + C_DEFAULT + ' !important; }',

    'a, button, [onclick], label, select,',
    '.btn, .btn-rent, .btn-callback,',
    '.nav-item, .nav-dropdown-toggle, .nav-dropdown-item,',
    '.product-card, .chip, .tree-link, .adm-link,',
    '.pc-fav, .pc-img, .item-thumb, .item-main-photo,',
    '.float-btn, .faq-q, .auth-tab, .view-btn,',
    '.star-btn, .page-btn, .modal-x, .lightbox-nav,',
    '.lightbox-close, .lb-dot, .profile-nav-item,',
    '.sidebar-mobile-toggle, .act-btns button,',
    '.ci-qty button, .ci-remove, .ci-tariff-btn',
    '{ cursor: ' + C_POINTER + ' !important; }',

    /* Текстовый курсор — всегда нативный */
    'input, textarea, [contenteditable]',
    '{ cursor: text !important; }'
  ].join('\n');
  document.head.appendChild(style);

  /* ── Убираем элементы старого курсора ── */
  ['mr-cursor', 'cursorRing', 'cursorDot'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.remove();
  });
  /* Убираем класс body.cursor-active если был */
  document.body.classList.remove('cursor-active');

  /* ── Анимация клика: синий ripple из точки нажатия ── */
  document.addEventListener('mousedown', function (e) {
    var r = document.createElement('div');
    r.style.cssText = [
      'position:fixed',
      'left:' + e.clientX + 'px',
      'top:' + e.clientY + 'px',
      'width:12px', 'height:12px',
      'background:rgba(59,130,246,0.55)',
      'border-radius:50%',
      'pointer-events:none',
      'z-index:99997',
      'transform:translate(-50%,-50%) scale(1)',
      'transition:transform .4s cubic-bezier(.2,1,.4,1), opacity .4s ease-out'
    ].join(';');
    document.body.appendChild(r);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        r.style.transform = 'translate(-50%,-50%) scale(6)';
        r.style.opacity   = '0';
      });
    });
    setTimeout(function () { r.remove(); }, 440);
  });
})();
