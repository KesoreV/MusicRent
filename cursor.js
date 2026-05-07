/* ═══════════════════════════════════════════════════════
   MusicRent — Минималистичный авторский курсор
   Только на десктопе (устройства с мышью)
════════════════════════════════════════════════════════ */
(function () {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  /* ─── Стили ─── */
  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }
    #mr-cursor {
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      top: 0; left: 0;
      width: 10px; height: 10px;
      background: #3b82f6;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width .15s, height .15s, background .15s, border-radius .15s, opacity .2s;
      will-change: left, top;
      mix-blend-mode: normal;
    }
    #mr-cursor.on-hover {
      width: 36px;
      height: 36px;
      background: rgba(59, 130, 246, 0.18);
      border: 2px solid rgba(59, 130, 246, 0.7);
    }
    #mr-cursor.on-click {
      width: 7px;
      height: 7px;
      background: #60a5fa;
    }
    #mr-cursor.on-text {
      width: 3px;
      height: 22px;
      border-radius: 2px;
      background: rgba(59, 130, 246, 0.8);
    }
  `;
  document.head.appendChild(style);

  /* ─── Элемент ─── */
  const cursor = document.createElement('div');
  cursor.id = 'mr-cursor';
  document.body.appendChild(cursor);

  /* ─── Движение — точное, без лага ─── */
  document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  }, { passive: true });

  /* ─── Hover на кликабельных элементах ─── */
  const CLICK_SEL = 'a, button, [onclick], .btn, .btn-rent, .product-card, ' +
    '.nav-item, .cart-btn, .chip, .adm-link, .tree-link, ' +
    '.profile-nav-item, .pc-fav, .star-btn, label, select, ' +
    '.faq-q, .float-btn, .step-card';

  const TEXT_SEL = 'input, textarea';

  document.addEventListener('mouseover', function (e) {
    const el = e.target;
    if (el.closest(TEXT_SEL)) {
      cursor.className = 'on-text';
    } else if (el.closest(CLICK_SEL)) {
      cursor.className = 'on-hover';
    } else {
      cursor.className = '';
    }
  });

  /* ─── Клик ─── */
  document.addEventListener('mousedown', function () {
    cursor.classList.add('on-click');
  });
  document.addEventListener('mouseup', function () {
    cursor.classList.remove('on-click');
  });

  /* ─── Скрыть при выходе из окна ─── */
  document.addEventListener('mouseleave', function () {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    cursor.style.opacity = '1';
  });
})();
