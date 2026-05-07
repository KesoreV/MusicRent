-- ================================================================
-- MusicRent — Supabase Schema
-- Запускать в: Supabase Dashboard → SQL Editor → New query → Run
-- ================================================================

-- 1. ПОЛЬЗОВАТЕЛИ
create table if not exists users (
  id          bigint generated always as identity primary key,
  "firstName" text        not null default '',
  "lastName"  text        not null default '',
  email       text unique not null,
  phone       text        not null default '',
  password    text        not null,
  role        text        not null default 'client'
              check (role in ('client', 'admin')),
  "createdAt" timestamptz not null default now()
);

-- 2. ЗАКАЗЫ
create table if not exists orders (
  id          text primary key,
  "userEmail" text        not null,
  items       jsonb       not null default '[]',
  total       numeric     not null default 0,
  status      text        not null default 'pending'
              check (status in ('pending','confirmed','active','completed','cancelled')),
  "createdAt" timestamptz not null default now()
);
create index if not exists orders_user_email_idx on orders ("userEmail");

-- 3. ОБОРУДОВАНИЕ (добавляемое через админку)
create table if not exists equipment (
  id            text primary key,
  name          text    not null,
  category      text    not null default '',
  "catFilter"   text    not null default '',
  emoji         text    not null default '🎵',
  image         text    not null default '',
  "extraImages" jsonb   not null default '[]',
  avail         text    not null default 'free'
                check (avail in ('free','booked','busy','service')),
  price1        numeric not null default 0,
  price2        numeric not null default 0,
  "invId"       text    not null default '',
  rating        numeric not null default 5.0,
  "reviewCount" int     not null default 0,
  condition     text    not null default 'good',
  description   text    not null default '',
  specs         jsonb   not null default '[]',
  perk          text    not null default '',
  "similar"     jsonb   not null default '[]',
  source        text    not null default 'admin',
  "createdAt"   timestamptz default now(),
  "updatedAt"   timestamptz default now()
);

-- 4. ОТЗЫВЫ
create table if not exists reviews (
  id            bigint generated always as identity primary key,
  "equipmentId" text        not null,
  "userEmail"   text        not null,
  "userName"    text        not null default '',
  stars         int         not null default 5 check (stars between 1 and 5),
  text          text        not null,
  "createdAt"   timestamptz not null default now()
);
create index if not exists reviews_equipment_idx on reviews ("equipmentId");
create index if not exists reviews_user_idx      on reviews ("userEmail");

-- 5. НАСТРОЙКИ САЙТА
create table if not exists settings (
  key   text primary key,
  value jsonb
);

-- 6. ЗАЯВКИ НА ОБРАТНЫЙ ЗВОНОК
create table if not exists callbacks (
  id          bigint generated always as identity primary key,
  name        text        not null default '',
  phone       text        not null,
  comment     text        not null default '',
  status      text        not null default 'new' check (status in ('new','done')),
  "createdAt" timestamptz not null default now()
);

-- ── Отключаем RLS (для дипломного проекта) ──────────────────
-- После диплома включить и настроить политики для безопасности
alter table users     disable row level security;
alter table orders    disable row level security;
alter table equipment disable row level security;
alter table reviews   disable row level security;
alter table settings  disable row level security;
alter table callbacks disable row level security;

-- ── Сид: учётная запись администратора ──────────────────────
insert into users ("firstName", "lastName", email, phone, password, role, "createdAt")
values (
  'Администратор', '', 'admin@musicrent.ru',
  '+7 (4162) 00-00-00', 'admin123', 'admin',
  '2024-01-01T00:00:00Z'
)
on conflict (email) do nothing;

-- ── Сид: настройки по умолчанию ─────────────────────────────
insert into settings (key, value) values
  ('company',  '"MusicRent"'),
  ('email',    '"info@musicrent.ru"'),
  ('phone',    '"+7 (4162) 00-00-00"'),
  ('address',  '"г. Благовещенск, ул. Горького, 64"'),
  ('deposit',  '5000')
on conflict (key) do nothing;

-- ================================================================
-- Готово! Таблицы созданы, данные засеяны.
-- Теперь запусти сайт — он подключится к Supabase автоматически.
-- ================================================================
