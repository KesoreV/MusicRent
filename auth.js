/* ═══════════════════════════════════════════════════════
   MusicRent — Auth (IndexedDB + localStorage cache)
   Порядок загрузки: db.js → auth.js → cart.js
════════════════════════════════════════════════════════ */

const SESSION_KEY = 'mr_session';

/* ─── session cache (localStorage — сохраняется между запусками) ─── */
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
  catch { return null; }
}
function setSession(user) {
  if (!user) { localStorage.removeItem(SESSION_KEY); return; }
  const safe = { id: user.id, firstName: user.firstName, lastName: user.lastName,
                 email: user.email, phone: user.phone, role: user.role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
}
function clearSession() { localStorage.removeItem(SESSION_KEY); }
function isLoggedIn()   { return !!getCurrentUser(); }
function isAdmin()      { const u = getCurrentUser(); return u && u.role === 'admin'; }

/* ─── register ─── */
async function registerUser(firstName, lastName, email, phone, password) {
  if (!firstName || !email || !password)
    return { success: false, error: 'Заполните все обязательные поля' };
  if (password.length < 4)
    return { success: false, error: 'Пароль должен быть не менее 4 символов' };

  try {
    const existing = await dbFindUserByEmail(email);
    if (existing)
      return { success: false, error: 'Пользователь с таким email уже зарегистрирован' };

    const id = await dbAdd('users', {
      firstName, lastName: lastName || '', email,
      phone: phone || '', password, role: 'client',
      createdAt: new Date().toISOString()
    });
    const user = await dbGet('users', id);
    setSession(user);
    return { success: true, user };
  } catch (e) {
    console.error('registerUser error:', e);
    return { success: false, error: 'Ошибка базы данных: ' + (e.message || JSON.stringify(e)) };
  }
}

/* ─── login ─── */
async function loginUser(email, password) {
  if (!email || !password)
    return { success: false, error: 'Введите email и пароль' };

  try {
    const user = await dbFindUserByEmail(email);
    if (!user || user.password !== password)
      return { success: false, error: 'Неверный email или пароль' };

    setSession(user);
    return { success: true, user };
  } catch (e) {
    console.error('loginUser error:', e);
    return { success: false, error: 'Ошибка базы данных: ' + (e.message || JSON.stringify(e)) };
  }
}

/* ─── logout ─── */
function logoutUser() {
  clearSession();
  window.location.href = 'index.html';
}

/* ─── navbar injection ─── */
function initAuthNav() {
  const navRight = document.querySelector('.nav-right');
  if (!navRight) return;

  const user = getCurrentUser();

  // убираем статичные кнопки Войти / Регистрация
  navRight.querySelectorAll('a[href="login.html"]').forEach(el => el.remove());

  if (user) {
    const initials = (user.firstName ? user.firstName[0] : '') +
                     (user.lastName  ? user.lastName[0]  : '');

    const wrap = document.createElement('div');
    wrap.className = 'auth-nav-user';
    wrap.innerHTML = `
      <div class="auth-nav-ava">${initials || '?'}</div>
      <span class="auth-nav-name">${user.firstName}</span>
      <a href="profile.html" class="btn btn-ghost btn-sm">Профиль</a>
      ${user.role === 'admin'
        ? '<a href="admin.html" class="btn btn-outline btn-sm" style="margin-left:4px">Панель</a>'
        : ''}
      <button onclick="logoutUser()" class="btn btn-ghost btn-sm">Выйти</button>
    `;
    navRight.appendChild(wrap);
  } else {
    navRight.insertAdjacentHTML('beforeend', `
      <a class="btn btn-outline btn-sm" href="login.html">Войти</a>
      <a class="btn btn-primary btn-sm" href="login.html">Регистрация</a>
    `);
  }

  // inject into mobile nav drawer too
  const mobileAuth = document.getElementById('mobileNavAuth');
  if (!mobileAuth) return;
  if (user) {
    mobileAuth.innerHTML = `
      <div class="mobile-nav-user">
        <span style="font-weight:700">${user.firstName} ${user.lastName}</span>
        <span style="font-size:.78rem;color:var(--text-dim)">${user.email}</span>
        <a href="profile.html" class="btn btn-outline btn-sm" style="width:100%;justify-content:center;margin-top:6px">Мой профиль</a>
        ${user.role === 'admin'
          ? '<a href="admin.html" class="btn btn-outline btn-sm" style="width:100%;justify-content:center;margin-top:6px">Панель администратора</a>'
          : ''}
        <button onclick="logoutUser()" class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:4px;font-size:.85rem">Выйти из аккаунта</button>
      </div>
    `;
  } else {
    mobileAuth.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:8px;padding:12px 16px;border-top:1px solid var(--border)">
        <a href="login.html" class="btn btn-outline" style="justify-content:center">Войти</a>
        <a href="login.html" class="btn btn-primary" style="justify-content:center">Регистрация</a>
      </div>
    `;
  }
}

/* ─── show inline error ─── */
function showAuthError(containerId, msg) {
  let el = document.getElementById(containerId);
  if (!el) return;
  el.textContent = msg;
  el.style.display = msg ? '' : 'none';
}

/* ─── hamburger menu ─── */
function initHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileNav');
  if (!btn || !drawer) return;
  btn.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    btn.classList.toggle('open', open);
  });
  drawer.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      btn.classList.remove('open');
    });
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      btn.classList.remove('open');
    }
  });
}

/* ─── init ─── */
// authReady — промис, который другие страницы могут await-ить
let authReady;

document.addEventListener('DOMContentLoaded', () => {
  authReady = dbSeedAdmin()
    .then(() => dbSeedDemoOrders().catch(() => {}))
    .then(() => {
      initAuthNav();
      initHamburger();
    });
});
