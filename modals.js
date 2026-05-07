/* ═══════════════════════════════════════════════════════
   MusicRent — Общие модалы и рабочие ссылки
   Загружать: <script src="modals.js"></script>
════════════════════════════════════════════════════════ */

/* ─── HTML модалов ─── */
const MODALS_HTML = `
<!-- Модал: О нас -->
<div class="overlay" id="modalAbout">
  <div class="modal" style="max-width:560px;max-height:88vh;overflow-y:auto">
    <div class="modal-hd">
      <div class="modal-hd-title">🎸 О сервисе MusicRent</div>
      <button class="modal-x" onclick="closeInfoModal('modalAbout')">✕</button>
    </div>
    <div class="info-modal-body">
      <p>
        <strong style="color:var(--text)">MusicRent</strong> — профессиональная онлайн-платформа для аренды
        музыкального оборудования в г. Благовещенске. Мы работаем с 2024 года и помогаем
        музыкантам, организаторам мероприятий и звукорежиссёрам получать качественное
        оборудование без необходимости его покупки.
      </p>
      <h3>Наши преимущества</h3>
      <ul>
        <li>Более 200 единиц профессионального оборудования в наличии</li>
        <li>Онлайн-бронирование за 2 минуты, без звонков</li>
        <li>Оборудование проходит техническое обслуживание после каждой аренды</li>
        <li>Доставка и самовывоз — на ваш выбор</li>
        <li>Залог возвращается в полном объёме при сдаче оборудования</li>
        <li>Гибкие тарифы: скидка при аренде от 2 суток</li>
      </ul>
      <h3>Адрес и режим работы</h3>
      <p>
        📍 г. Благовещенск, ул. Горького, 172/1<br>
        🕐 Пн–Вс: 09:00 — 21:00 (без выходных)
      </p>
      <h3>Контакты</h3>
      <p>
        📞 <a href="tel:+74162000000" style="color:var(--accent)">+7 (4162) 00-00-00</a><br>
        ✉️ <a href="mailto:info@musicrent.ru" style="color:var(--accent)">info@musicrent.ru</a>
      </p>
      <p style="font-size:.82rem;color:var(--text-dim)">
        Дипломный проект · ГПОУ АО «Амурский аграрный колледж» · Данилов Я.А. · ИП-41
      </p>
    </div>
    <div class="modal-ft" style="justify-content:center">
      <button class="btn btn-primary" onclick="closeInfoModal('modalAbout')">Понятно</button>
    </div>
  </div>
</div>

<!-- Модал: Условия аренды -->
<div class="overlay" id="modalTerms">
  <div class="modal" style="max-width:580px;max-height:88vh;overflow-y:auto">
    <div class="modal-hd">
      <div class="modal-hd-title">📄 Условия аренды</div>
      <button class="modal-x" onclick="closeInfoModal('modalTerms')">✕</button>
    </div>
    <div class="info-modal-body">
      <h3>1. Порядок оформления</h3>
      <ul>
        <li>Выберите оборудование в каталоге и добавьте в корзину</li>
        <li>Укажите даты аренды и оформите заявку</li>
        <li>Администратор подтвердит бронирование в течение 15–30 минут</li>
        <li>Получите оборудование в пункте выдачи или закажите доставку</li>
      </ul>
      <h3>2. Залог</h3>
      <ul>
        <li>Для всего оборудования предусмотрен возвратный залог от 5 000 ₽</li>
        <li>Залог возвращается при сдаче оборудования в исходном состоянии</li>
        <li>При повреждении — залог удерживается для покрытия ремонта</li>
      </ul>
      <h3>3. Сроки и цены</h3>
      <ul>
        <li>Минимальный срок аренды — 1 сутки (24 часа)</li>
        <li>При аренде от 2 до 5 суток действует скидка 15–20%</li>
        <li>При аренде от 6 суток и более — индивидуальный тариф</li>
        <li>Стоимость доставки — по согласованию (бесплатно от 3 суток)</li>
      </ul>
      <h3>4. Ответственность арендатора</h3>
      <ul>
        <li>Арендатор несёт ответственность за сохранность оборудования</li>
        <li>Запрещено сдавать оборудование третьим лицам в субаренду</li>
        <li>Оборудование должно использоваться по назначению</li>
        <li>При утере оборудования арендатор возмещает его рыночную стоимость</li>
      </ul>
      <h3>5. Возврат</h3>
      <ul>
        <li>Оборудование возвращается в чистом виде, в полной комплектации</li>
        <li>Возврат принимается по адресу: г. Благовещенск, ул. Горького, 172/1</li>
        <li>Время возврата — в соответствии с указанной датой окончания аренды</li>
      </ul>
    </div>
    <div class="modal-ft" style="justify-content:center">
      <button class="btn btn-primary" onclick="closeInfoModal('modalTerms')">Принято</button>
    </div>
  </div>
</div>

<!-- Модал: Доставка и возврат -->
<div class="overlay" id="modalDelivery">
  <div class="modal" style="max-width:540px;max-height:88vh;overflow-y:auto">
    <div class="modal-hd">
      <div class="modal-hd-title">🚚 Доставка и возврат</div>
      <button class="modal-x" onclick="closeInfoModal('modalDelivery')">✕</button>
    </div>
    <div class="info-modal-body">
      <h3>Доставка по городу</h3>
      <ul>
        <li>Зона доставки — г. Благовещенск и пригороды до 20 км</li>
        <li>Стоимость доставки — от 300 ₽ (зависит от адреса и веса)</li>
        <li>Бесплатная доставка при аренде от 3 суток</li>
        <li>Время доставки согласовывается при подтверждении заказа</li>
      </ul>
      <h3>Самовывоз</h3>
      <ul>
        <li>Адрес: г. Благовещенск, ул. Горького, 172/1</li>
        <li>График выдачи: Пн–Вс 09:00 — 21:00</li>
        <li>Возьмите с собой паспорт для оформления договора</li>
      </ul>
      <h3>Возврат оборудования</h3>
      <ul>
        <li>Возврат осуществляется в пункт выдачи или через службу доставки</li>
        <li>Предварительно уведомите администратора о времени возврата</li>
        <li>Oборудование принимается только в комплектации, в которой было выдано</li>
      </ul>
    </div>
    <div class="modal-ft" style="justify-content:center">
      <button class="btn btn-primary" onclick="closeInfoModal('modalDelivery')">Понятно</button>
    </div>
  </div>
</div>

<!-- Модал: Заказать звонок -->
<div class="overlay" id="modalCallback">
  <div class="modal" style="max-width:460px">
    <div class="modal-hd">
      <div class="modal-hd-title">📞 Заказать обратный звонок</div>
      <button class="modal-x" onclick="closeInfoModal('modalCallback')">✕</button>
    </div>
    <div id="callbackFormWrap">
      <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:18px">
        Оставьте номер — перезвоним в течение 15 минут и ответим на все вопросы об аренде.
      </p>
      <div style="display:flex;flex-direction:column;gap:13px">
        <div class="form-group">
          <label class="form-label">Ваше имя</label>
          <input class="form-control" id="cbName" placeholder="Иван" autocomplete="given-name">
        </div>
        <div class="form-group">
          <label class="form-label">Номер телефона *</label>
          <input class="form-control" id="cbPhone" type="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel" required>
        </div>
        <div class="form-group">
          <label class="form-label">Комментарий (необязательно)</label>
          <textarea class="form-control" id="cbComment" rows="2" placeholder="Какое оборудование интересует?"></textarea>
        </div>
        <div id="cbError" style="display:none;color:var(--danger);font-size:.82rem"></div>
        <button class="btn btn-primary" style="justify-content:center;padding:12px" onclick="submitCallback()">
          📞 Отправить заявку
        </button>
        <p style="font-size:.75rem;color:var(--text-dim);text-align:center">
          Нажимая кнопку, вы соглашаетесь на <a href="#" onclick="openInfoModal('modalAbout');return false" style="color:var(--accent)">обработку данных</a>
        </p>
      </div>
    </div>
    <div id="callbackSuccessWrap" style="display:none" class="callback-success">
      <div class="cb-icon">✅</div>
      <h3>Заявка принята!</h3>
      <p>Свяжемся с вами в ближайшее время.<br>Среднее время ответа — 10–15 минут.</p>
      <div class="tg-hint">
        <span style="font-size:1.3rem">✈️</span>
        <span>Также можете написать нам сразу в <a href="https://t.me/musicrent_amur" target="_blank" rel="noopener" style="color:var(--accent);font-weight:700">Telegram</a> — ответим быстрее!</span>
      </div>
      <button class="btn btn-outline" style="margin-top:16px;justify-content:center;width:100%" onclick="closeInfoModal('modalCallback')">Закрыть</button>
    </div>
  </div>
</div>

<!-- Плавающие кнопки мессенджеров -->
<div class="float-btns" id="floatBtns">
  <div class="float-btn-wrap">
    <span class="float-label">Написать в Telegram</span>
    <a class="float-btn float-btn-tg" href="https://t.me/musicrent_amur" target="_blank" rel="noopener" title="Telegram">✈️</a>
  </div>
  <div class="float-btn-wrap">
    <span class="float-label">Написать в WhatsApp</span>
    <a class="float-btn float-btn-wa" href="https://wa.me/74162000000" target="_blank" rel="noopener" title="WhatsApp">💬</a>
  </div>
  <div class="float-btn-wrap">
    <span class="float-label">Заказать звонок</span>
    <button class="float-btn float-btn-cb" onclick="openCallbackModal()" title="Обратный звонок">📞</button>
  </div>
</div>
`;

/* ─── Инициализация ─── */
document.addEventListener('DOMContentLoaded', function () {
  /* Вставляем модалы */
  document.body.insertAdjacentHTML('beforeend', MODALS_HTML);

  /* Закрытие по клику на overlay */
  ['modalAbout','modalTerms','modalDelivery'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', function(e) {
      if (e.target === el) closeInfoModal(id);
    });
  });

  /* Закрытие по Escape */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      ['modalAbout','modalTerms','modalDelivery'].forEach(closeInfoModal);
    }
  });

  /* Фиксируем все ссылки */
  fixAllLinks();

  /* Помечаем body если залогинен */
  updateBodyAuthClass();
});

function openInfoModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeInfoModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

/* Устанавливаем класс body.is-logged-in */
function updateBodyAuthClass() {
  try {
    var session = localStorage.getItem('mr_session');
    if (session) {
      document.body.classList.add('is-logged-in');
    } else {
      document.body.classList.remove('is-logged-in');
    }
  } catch(e) {}
}

/* ─── Исправляем ссылки на всей странице ─── */
function fixAllLinks() {
  document.querySelectorAll('a').forEach(function(a) {
    var text = a.textContent.trim();
    var href  = (a.getAttribute('href') || '').trim();

    /* Если уже правильная ссылка — пропускаем */
    if (href && href !== '#' && !href.startsWith('javascript')) return;

    /* Телефон */
    if (text.includes('+7 (4162)') || text.includes('📞')) {
      a.href = 'tel:+74162000000';
      return;
    }

    /* Email */
    if (text.includes('@musicrent') || text.includes('✉️')) {
      a.href = 'mailto:info@musicrent.ru';
      return;
    }

    /* Адрес */
    if (text.includes('Горького') || (text.includes('📍') && text.includes('Благовещенск'))) {
      a.href   = 'https://yandex.ru/maps/?text=%D0%B3.+%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B2%D0%B5%D1%89%D0%B5%D0%BD%D1%81%D0%BA%2C+%D1%83%D0%BB.+%D0%93%D0%BE%D1%80%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE%2C+172%2F1';
      a.target = '_blank';
      a.rel    = 'noopener';
      return;
    }
    /* Адрес (краткий в navBar) */
    if (text.includes('📍') || (text.includes('Благовещенск') && !text.includes('Горького'))) {
      a.href   = 'https://yandex.ru/maps/?text=%D0%B3.+%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B2%D0%B5%D1%89%D0%B5%D0%BD%D1%81%D0%BA';
      a.target = '_blank';
      a.rel    = 'noopener';
      return;
    }

    /* Telegram */
    if (text.includes('Telegram') || text.includes('💬')) {
      a.href   = 'https://t.me/musicrent_amur';
      a.target = '_blank';
      a.rel    = 'noopener';
      return;
    }

    /* WhatsApp */
    if (text.includes('WhatsApp') || text.includes('📱')) {
      a.href   = 'https://wa.me/74162000000';
      a.target = '_blank';
      a.rel    = 'noopener';
      return;
    }

    /* О сервисе / О нас */
    if (text.includes('О сервисе') || text === 'О нас') {
      a.href = 'javascript:void(0)';
      a.addEventListener('click', function(e) { e.preventDefault(); openInfoModal('modalAbout'); });
      return;
    }

    /* Условия аренды */
    if (text.includes('Условия аренды') || text.includes('Условия')) {
      a.href = 'javascript:void(0)';
      a.addEventListener('click', function(e) { e.preventDefault(); openInfoModal('modalTerms'); });
      return;
    }

    /* Доставка и возврат */
    if (text.includes('Доставка') || text.includes('возврат')) {
      a.href = 'javascript:void(0)';
      a.addEventListener('click', function(e) { e.preventDefault(); openInfoModal('modalDelivery'); });
      return;
    }

    /* Политика конфиденциальности */
    if (text.includes('Политика') || text.includes('конфиденциальност')) {
      a.href = 'javascript:void(0)';
      a.addEventListener('click', function(e) { e.preventDefault(); alert('Политика конфиденциальности MusicRent\n\nМы собираем только данные, необходимые для оформления аренды (имя, email, телефон). Данные не передаются третьим лицам. Оплата проводится наличными или переводом при получении оборудования.'); });
      return;
    }

    /* Залог и оплата */
    if (text.includes('Залог') || text.includes('оплата')) {
      a.href = 'javascript:void(0)';
      a.addEventListener('click', function(e) { e.preventDefault(); openInfoModal('modalTerms'); });
      return;
    }
  });
}

/* ══════════════════════════════════════════════
   ОБРАТНЫЙ ЗВОНОК
══════════════════════════════════════════════ */
function openCallbackModal() {
  /* Сбрасываем форму */
  var fw = document.getElementById('callbackFormWrap');
  var sw = document.getElementById('callbackSuccessWrap');
  if (fw) fw.style.display = '';
  if (sw) sw.style.display = 'none';
  var errEl = document.getElementById('cbError');
  if (errEl) errEl.style.display = 'none';
  /* Предзаполняем имя если залогинен */
  try {
    var s = localStorage.getItem('mr_session');
    if (s) {
      var u = JSON.parse(s);
      var nameEl = document.getElementById('cbName');
      if (nameEl && u.firstName) nameEl.value = u.firstName + (u.lastName ? ' ' + u.lastName : '');
    }
  } catch(e) {}
  openInfoModal('modalCallback');
}

async function submitCallback() {
  var errEl  = document.getElementById('cbError');
  var phone  = (document.getElementById('cbPhone').value || '').trim();
  var name   = (document.getElementById('cbName').value || '').trim();
  var comment= (document.getElementById('cbComment').value || '').trim();
  errEl.style.display = 'none';

  if (!phone || phone.replace(/\D/g,'').length < 10) {
    errEl.textContent = 'Введите корректный номер телефона';
    errEl.style.display = '';
    return;
  }

  var record = {
    name: name || 'Не указано',
    phone: phone,
    comment: comment,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  try {
    if (typeof dbAdd === 'function') {
      await dbAdd('callbacks', record);
    }
  } catch(e) {
    /* Если DB недоступна — всё равно показываем успех */
    console.warn('Callback save error:', e);
  }

  document.getElementById('callbackFormWrap').style.display = 'none';
  document.getElementById('callbackSuccessWrap').style.display = '';
}
