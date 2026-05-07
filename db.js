/* ═══════════════════════════════════════════════════════
   MusicRent — Supabase DB Layer
   Загрузка: data.js → db.js → auth.js → cart.js
   Требует: <script src="...supabase-js@2..."> ДО этого файла
════════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://tglffsmpukififlatliz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnbGZmc21wdWtpZmlmbGF0bGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMzczNzcsImV4cCI6MjA5MzcxMzM3N30.SRPnupE_QahpPEi45QR7KzTSRtBvrglLKKN8qMMdLP8';

let _sb = null;

function getSB() {
  if (_sb) return _sb;
  if (typeof supabase === 'undefined') {
    throw new Error('Supabase SDK не загружен! Добавь CDN-скрипт перед db.js.');
  }
  _sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
  });
  return _sb;
}

/* ══════════════════════════════════════════════
   БАЗОВЫЕ CRUD — совместимы со старым IndexedDB API
══════════════════════════════════════════════ */

async function dbGet(store, key) {
  const { data, error } = await getSB().from(store).select('*').eq('id', key).maybeSingle();
  if (error) throw error;
  return data || null;
}

async function dbGetAll(store) {
  const { data, error } = await getSB().from(store).select('*');
  if (error) throw error;
  return data || [];
}

async function dbGetAllByIndex(store, indexName, value) {
  const { data, error } = await getSB().from(store).select('*').eq(indexName, value);
  if (error) throw error;
  return data || [];
}

async function dbAdd(store, record) {
  const { data, error } = await getSB().from(store).insert(record).select('id').single();
  if (error) throw error;
  return data?.id;
}

async function dbPut(store, record) {
  const { data, error } = await getSB()
    .from(store)
    .upsert(record, { onConflict: 'id' })
    .select('id')
    .single();
  if (error) throw error;
  return data?.id;
}

async function dbDelete(store, key) {
  const { error } = await getSB().from(store).delete().eq('id', key);
  if (error) throw error;
}

async function dbCount(store) {
  const { count, error } = await getSB()
    .from(store)
    .select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count || 0;
}

/* ══════════════════════════════════════════════
   ПОЛЬЗОВАТЕЛИ
══════════════════════════════════════════════ */

async function dbFindUserByEmail(email) {
  const { data, error } = await getSB()
    .from('users')
    .select('*')
    .ilike('email', email)
    .maybeSingle();
  if (error) throw error;
  return data || null;
}

async function dbUpdateUser(id, updates) {
  const { data, error } = await getSB()
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ══════════════════════════════════════════════
   ОБОРУДОВАНИЕ
══════════════════════════════════════════════ */

async function dbGetEquipment(id) {
  /* 1. Ищем в Supabase */
  const { data } = await getSB().from('equipment').select('*').eq('id', id).maybeSingle();
  if (data) {
    /* В Supabase поле называется description, в коде — desc */
    if (data.description !== undefined && data.desc === undefined) data.desc = data.description;
    return data;
  }
  /* 2. Фолбек на статический каталог (data.js) */
  if (typeof PRODUCTS !== 'undefined' && PRODUCTS[id]) {
    return { ...PRODUCTS[id], id, source: 'seed' };
  }
  return null;
}

async function dbGetAllEquipment() {
  const { data: dbItems = [] } = await getSB().from('equipment').select('*');
  /* Нормализуем поле description → desc */
  dbItems.forEach(e => { if (e.description !== undefined) e.desc = e.description; });
  const dbIds = new Set(dbItems.map(e => e.id));
  /* Дополняем статическим каталогом */
  const staticItems = typeof PRODUCTS !== 'undefined'
    ? Object.entries(PRODUCTS)
        .filter(([id]) => !dbIds.has(id))
        .map(([id, p]) => ({ ...p, id, source: 'seed' }))
    : [];
  return [...staticItems, ...dbItems];
}

async function dbUpdateEquipmentAvail(id, avail) {
  const { data: existing } = await getSB()
    .from('equipment').select('id').eq('id', id).maybeSingle();
  if (existing) {
    await getSB().from('equipment').update({ avail }).eq('id', id);
  } else if (typeof PRODUCTS !== 'undefined' && PRODUCTS[id]) {
    const p = PRODUCTS[id];
    await getSB().from('equipment').insert({
      id, name: p.name, category: p.category, catFilter: p.catFilter,
      emoji: p.emoji, image: p.image, avail,
      price1: p.price1, price2: p.price2, invId: p.invId,
      rating: p.rating, reviewCount: p.reviewCount, condition: p.condition,
      description: p.desc || '', source: 'seed-edited'
    });
  }
}

/* ══════════════════════════════════════════════
   ОТЗЫВЫ
══════════════════════════════════════════════ */

async function dbGetReviews(equipmentId) {
  return dbGetAllByIndex('reviews', 'equipmentId', equipmentId);
}

async function dbAddReview(equipmentId, userEmail, userName, stars, text) {
  return dbAdd('reviews', { equipmentId, userEmail, userName, stars, text });
}

/* ══════════════════════════════════════════════
   НАСТРОЙКИ
══════════════════════════════════════════════ */

async function dbGetSetting(key, defaultVal) {
  const { data } = await getSB()
    .from('settings').select('value').eq('key', key).maybeSingle();
  return (data && data.value !== undefined) ? data.value : defaultVal;
}

async function dbSetSetting(key, value) {
  await getSB().from('settings').upsert({ key, value }, { onConflict: 'key' });
}

/* ══════════════════════════════════════════════
   СИД: АДМИНИСТРАТОР (при первом запуске)
══════════════════════════════════════════════ */

async function dbSeedAdmin() {
  /* Выполняем только один раз за сессию браузера */
  if (sessionStorage.getItem('_sb_seeded')) return;
  try {
    const existing = await dbFindUserByEmail('admin@musicrent.ru');
    if (!existing) {
      await getSB().from('users').insert({
        firstName: 'Администратор',
        lastName:  '',
        email:     'admin@musicrent.ru',
        phone:     '+7 (4162) 00-00-00',
        password:  'admin123',
        role:      'admin',
        createdAt: '2024-01-01T00:00:00.000Z'
      });
    }
    sessionStorage.setItem('_sb_seeded', '1');
  } catch (e) {
    console.warn('dbSeedAdmin error:', e.message);
  }
}

/* ══════════════════════════════════════════════
   СИД: ДЕМО-ЗАКАЗЫ
══════════════════════════════════════════════ */

async function dbSeedDemoOrders() {
  /* Выполняем только один раз за сессию */
  if (sessionStorage.getItem('_sb_orders_seeded')) return;
  try {
    const cnt = await dbCount('orders');
    if (cnt > 0) { sessionStorage.setItem('_sb_orders_seeded', '1'); return; }
    sessionStorage.setItem('_sb_orders_seeded', '1');
    await getSB().from('orders').insert([
      { id:'1094', userEmail:'client@example.com', items:[{id:'gibson-les-paul',name:'Gibson Les Paul Standard',emoji:'🎸',price1:850,price2:720,days:5,qty:1}],  total:8600, status:'pending',   createdAt:'2026-03-01T10:00:00.000Z' },
      { id:'1093', userEmail:'client@example.com', items:[{id:'pearl-export',   name:'Pearl Export 5-Piece',  emoji:'🥁',price1:1200,price2:950,days:3,qty:1}],   total:7850, status:'confirmed', createdAt:'2026-02-28T12:00:00.000Z' },
      { id:'1092', userEmail:'other@example.com',  items:[{id:'pioneer-ddj',    name:'Pioneer DDJ-FLX6',      emoji:'🎛️',price1:1500,price2:1200,days:2,qty:1}],  total:7400, status:'active',    createdAt:'2026-02-25T09:00:00.000Z' },
      { id:'1091', userEmail:'other@example.com',  items:[{id:'shure-sm58',     name:'Shure SM58 + Стойка',   emoji:'🎤',price1:350,price2:290,days:2,qty:1}],    total:5580, status:'completed', createdAt:'2026-02-20T14:00:00.000Z' },
      { id:'1090', userEmail:'client@example.com', items:[{id:'roland-juno',    name:'Roland JUNO-DS88',      emoji:'🎹',price1:950,price2:800,days:2,qty:1}],    total:6600, status:'completed', createdAt:'2026-02-18T11:00:00.000Z' },
    ]);
  } catch (e) {
    console.warn('dbSeedDemoOrders error:', e.message);
  }
}

/* ══════════════════════════════════════════════
   openDB — оставлен для совместимости (не нужен с Supabase)
══════════════════════════════════════════════ */
function openDB() { return Promise.resolve(null); }
