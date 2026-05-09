/* ═══════════════════════════════════════════════════════
   MusicRent — Cart (localStorage)
   Подключать на каждой странице: <script src="cart.js"></script>
   Требует: #cartModal, #cartBody, #cartFooter, #cartTotal, #toast
════════════════════════════════════════════════════════ */

const CART_KEY = 'mr_cart';

/* ─── storage ─── */
function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

/* ─── count badge ─── */
function updateCartCount() {
  const total = loadCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent    = total || '';
    el.style.display  = total > 0 ? 'flex' : 'none';
  });
}

/* ─── helpers ─── */
function parsePriceStr(s) { return parseInt(String(s).replace(/[^\d]/g, '')) || 0; }
function fmtPrice(n) { return n.toLocaleString('ru') + ' ₽'; }
function dayWord(n) {
  if (n === 1) return 'день';
  if (n >= 2 && n <= 4) return 'дня';
  return 'дней';
}

/* ─── price for item based on days ─── */
function getItemRate(item) {
  return item.days >= 2 ? item.price2 : item.price1;
}

/* ─── add / remove ─── */
function addToCart(id, name, emoji, price1, price2, days) {
  if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
    showToast('🔒 Войдите в аккаунт, чтобы добавить в корзину');
    setTimeout(() => { window.location.href = 'login.html'; }, 1400);
    return;
  }

  /* Проверяем актуальный статус в Supabase перед добавлением */
  if (typeof dbGetEquipment === 'function') {
    /* Сразу показываем что клик принят */
    showToast('⏳ Проверяем наличие...');

    /* Таймаут 6 сек — если Supabase не ответил, добавляем всё равно */
    var timeout = new Promise(function(resolve) { setTimeout(function() { resolve(null); }, 6000); });

    Promise.race([dbGetEquipment(id), timeout]).then(function(eq) {
      if (eq && eq.avail !== 'free') {
        const MSG = {
          booked:  '🔒 «' + name + '» уже забронирован другим клиентом',
          busy:    '🔒 «' + name + '» сейчас находится в аренде',
          service: '🔧 «' + name + '» на техническом обслуживании',
        };
        showToast(MSG[eq.avail] || '❌ «' + name + '» недоступен');
        _updateCardBtn(id, eq.avail, name);
        return;
      }
      _doAddToCart(id, name, emoji, price1, price2, days);
    }).catch(function() {
      /* Supabase недоступен — добавляем, проверим повторно на оформлении */
      _doAddToCart(id, name, emoji, price1, price2, days);
    });
    return;
  }

  _doAddToCart(id, name, emoji, price1, price2, days);
}

/* Вспомогательная: обновить кнопку на карточке когда товар уже занят */
function _updateCardBtn(id, avail, name) {
  const AVAIL_LABEL = { booked:'Забронировано', busy:'В аренде', service:'На обслуживании' };
  const AVAIL_BADGE = { booked:'b-yellow', busy:'b-blue', service:'b-red' };
  document.querySelectorAll('.product-card').forEach(function(card) {
    var href = card.getAttribute('href') || '';
    if (!href.includes('id=' + id)) return;
    var btn = card.querySelector('.btn-rent');
    if (btn) { btn.textContent = AVAIL_LABEL[avail] || avail; btn.style.opacity = '0.5'; btn.style.cursor = 'not-allowed'; }
    var badge = card.querySelector('.pc-badge');
    if (badge) badge.innerHTML = '<span class="badge ' + (AVAIL_BADGE[avail]||'b-gray') + '">' + (AVAIL_LABEL[avail]||avail) + '</span>';
  });
}

/* Фактическое добавление в корзину */
function _doAddToCart(id, name, emoji, price1, price2, days) {
  days = parseInt(days) || 1;
  const cart = loadCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
    existing.days = days;
  } else {
    cart.push({ id, name, emoji, price1: +price1, price2: +price2, days, qty: 1 });
  }
  saveCart(cart);
  showToast('✓ «' + name + '» добавлен в корзину');
}

function removeFromCart(id) {
  saveCart(loadCart().filter(i => i.id !== id));
  renderCartBody();
}

function changeQty(id, delta) {
  const cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
  renderCartBody();
}

/* ─── изменить количество дней аренды ─── */
function changeDays(id, delta) {
  const cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.days = Math.max(1, Math.min(30, item.days + delta));
  saveCart(cart);
  renderCartBody();
}

/* ─── изменить тариф ─── */
function changeTariff(id, tariff) {
  const cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  if (tariff === '1') {
    item.days = 1;
  } else if (tariff === '2-5') {
    if (item.days < 2) item.days = 2;
    if (item.days > 5) item.days = 5;
  } else if (tariff === '6+') {
    if (item.days < 6) item.days = 6;
  }
  saveCart(cart);
  renderCartBody();
}

function clearCart() {
  saveCart([]);
  renderCartBody();
}

/* ─── total ─── */
function getCartTotal() {
  return loadCart().reduce((sum, item) => {
    return sum + getItemRate(item) * item.days * item.qty;
  }, 0);
}

/* ─── modal open/close ─── */
function openCart() {
  renderCartBody();
  document.getElementById('cartModal').classList.add('open');
}
function closeCart() {
  document.getElementById('cartModal').classList.remove('open');
}

/* ─── render ─── */
function renderCartBody() {
  const body   = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (!body) return;
  const cart = loadCart();

  if (cart.length === 0) {
    body.innerHTML = `
      <div style="text-align:center;padding:44px 20px;color:var(--text-muted)">
        <div style="font-size:2.8rem;margin-bottom:12px">🛒</div>
        <div style="font-weight:700;margin-bottom:4px">Корзина пуста</div>
        <div style="font-size:.83rem">Добавьте оборудование из <a href="catalog.html" style="color:var(--accent)">каталога</a></div>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = '';

  body.innerHTML = cart.map(item => {
    const rate  = getItemRate(item);
    const total = rate * item.days * item.qty;

    // определяем активный тариф для селектора
    let activeTariff = '1';
    if (item.days >= 6)             activeTariff = '6+';
    else if (item.days >= 2)        activeTariff = '2-5';

    return `
    <div class="cart-item" data-id="${item.id}">
      <div class="ci-emoji">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>

        <!-- Тариф -->
        <div class="ci-tariff-row">
          <span class="ci-tariff-lbl">Тариф:</span>
          <div class="ci-tariff-btns">
            <button class="ci-tariff-btn${activeTariff==='1'?' active':''}"
              onclick="changeTariff('${item.id}','1')">1 день</button>
            <button class="ci-tariff-btn${activeTariff==='2-5'?' active':''}"
              onclick="changeTariff('${item.id}','2-5')">2–5 дн.</button>
            <button class="ci-tariff-btn${activeTariff==='6+'?' active':''}"
              onclick="changeTariff('${item.id}','6+')">6+ дн.</button>
          </div>
        </div>

        <!-- Кол-во дней -->
        <div class="ci-days-row">
          <span class="ci-days-lbl">Дней:</span>
          <div class="ci-qty">
            <button onclick="changeDays('${item.id}',-1)">−</button>
            <span>${item.days}</span>
            <button onclick="changeDays('${item.id}',+1)">+</button>
          </div>
          <span class="ci-rate-lbl">${fmtPrice(rate)}/сут</span>
        </div>

        <!-- Кол-во единиц -->
        <div class="ci-units-row">
          <span class="ci-days-lbl">Кол-во:</span>
          <div class="ci-qty">
            <button onclick="changeQty('${item.id}',-1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${item.id}',+1)">+</button>
          </div>
          <span class="ci-rate-lbl">× ${item.days} ${dayWord(item.days)}</span>
        </div>
      </div>
      <div class="ci-right">
        <div class="ci-total">${fmtPrice(total)}</div>
        <button class="ci-remove" onclick="removeFromCart('${item.id}')" title="Удалить">✕</button>
      </div>
    </div>`;
  }).join('');

  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = fmtPrice(getCartTotal());
}

/* ─── checkout ─── */
async function checkoutCart() {
  if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
    showToast('Войдите в аккаунт для оформления заказа');
    setTimeout(() => { window.location.href = 'login.html'; }, 1200);
    return;
  }
  const cart = loadCart();
  if (!cart.length) return;
  const body   = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  /* Показываем индикатор загрузки */
  const checkoutBtn = document.querySelector('#cartFooter .btn-primary');
  if (checkoutBtn) { checkoutBtn.disabled = true; checkoutBtn.textContent = '⏳ Оформляем...'; }

  const u = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const orderNum = Date.now().toString();

  try {
    /* 1. Проверяем актуальный статус каждой позиции */
    for (const item of cart) {
      const eq = await dbGetEquipment(item.id).catch(() => null);
      if (eq && eq.avail !== 'free') {
        showToast('❌ «' + item.name + '» уже недоступна — удалите из корзины');
        if (checkoutBtn) { checkoutBtn.disabled = false; checkoutBtn.textContent = 'Оформить заказ'; }
        return;
      }
    }

    /* 2. Сохраняем заказ */
    await dbPut('orders', {
      id:        orderNum,
      userEmail: u ? u.email : 'guest',
      items:     cart,
      total:     getCartTotal(),
      status:    'pending',
      createdAt: new Date().toISOString()
    });

    /* 3. Сразу помечаем оборудование как «Забронировано» */
    for (const item of cart) {
      await dbUpdateEquipmentAvail(item.id, 'booked').catch(() => {});
    }

  } catch {
    showToast('Ошибка сохранения заказа. Попробуйте ещё раз.');
    if (checkoutBtn) { checkoutBtn.disabled = false; checkoutBtn.textContent = 'Оформить заказ'; }
    return;
  }

  body.innerHTML = `
    <div style="text-align:center;padding:36px 20px">
      <div style="font-size:3rem;margin-bottom:14px">✅</div>
      <div style="font-weight:800;font-size:1.05rem;margin-bottom:8px">Заявка отправлена!</div>
      <div style="font-size:.84rem;color:var(--text-muted);line-height:1.5">
        Мы свяжемся с вами в течение 15 минут<br>для подтверждения заказа.
      </div>
      <div style="margin-top:18px;font-size:.8rem;color:var(--text-dim)">Номер заявки: #${orderNum}</div>
    </div>`;
  if (footer) footer.style.display = 'none';
  saveCart([]);
}

/* ─── toast ─── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ─── favorites (heart toggle) ─── */
function initFavorites() {
  const favs = JSON.parse(localStorage.getItem('mr_favs') || '[]');
  document.querySelectorAll('.pc-fav').forEach(btn => {
    const card = btn.closest('.product-card');
    const id = card ? new URL(card.href, location.href).searchParams.get('id') : null;
    if (id && favs.includes(id)) {
      btn.textContent = '♥';
      btn.classList.add('fav-active');
    }
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
        showToast('🔒 Войдите в аккаунт, чтобы добавить в избранное');
        setTimeout(() => { window.location.href = 'login.html'; }, 1400);
        return;
      }
      const favList = JSON.parse(localStorage.getItem('mr_favs') || '[]');
      const cardEl  = this.closest('.product-card');
      const pid     = cardEl ? new URL(cardEl.href, location.href).searchParams.get('id') : null;
      if (pid) {
        const idx = favList.indexOf(pid);
        if (idx === -1) { favList.push(pid); this.textContent = '♥'; this.classList.add('fav-active'); }
        else { favList.splice(idx, 1); this.textContent = '♡'; this.classList.remove('fav-active'); }
        localStorage.setItem('mr_favs', JSON.stringify(favList));
      } else {
        this.textContent = this.textContent === '♡' ? '♥' : '♡';
        this.classList.toggle('fav-active');
      }
    });
  });
}

/* ─── catalog card buttons ─── */
function initCardButtons() {
  document.querySelectorAll('.btn-rent').forEach(btn => {
    if (btn.dataset.cartInited) return; /* уже инициализирована — пропускаем */
    btn.dataset.cartInited = '1';
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.disabled || this.style.opacity === '0.5' || this.style.cursor === 'not-allowed') return;
      const card = this.closest('.product-card');
      if (!card) return;
      const href   = card.getAttribute('href') || '';
      const id     = new URL(href, location.href).searchParams.get('id') || href;
      const name   = (card.querySelector('.pc-title') || {}).textContent || '?';
      const emoji  = (card.querySelector('.pc-emoji') || {}).textContent || '🎵';
      const prices = card.querySelectorAll('.pc-price-val');
      const price1 = parsePriceStr(prices[0] ? prices[0].textContent : '0');
      const price2 = parsePriceStr(prices[1] ? prices[1].textContent : price1);
      addToCart(id, name, emoji, price1, price2, 1);
    });
  });
}

/* ─── init ─── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initFavorites();
  initCardButtons();
  const modal = document.getElementById('cartModal');
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeCart(); });
});
