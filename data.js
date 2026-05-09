/* ═══════════════════════════════════════════════════════
   MusicRent — Общий каталог товаров (PRODUCTS)
   Подключать перед db.js: <script src="data.js"></script>
════════════════════════════════════════════════════════ */

const PRODUCTS = {

  'gibson-les-paul': {
    name: 'Gibson Les Paul Standard',
    category: 'Электрогитары', catFilter: 'guitars',
    emoji: '🎸', image: 'images/gibson-les-paul.webp',
    extraImages: ['images/gibson-les-paul-2.webp','images/gibson-les-paul-3.webp'],
    avail: 'free', price1: 850, price2: 720,
    invId: 'EQ-042', rating: 0, reviewCount: 0, condition: 'excellent',
    desc: 'Легендарная электрогитара Gibson Les Paul Standard с корпусом из красного дерева и кленовым топом. Обеспечивает богатый, тёплый звук с отличным сустейном — идеально для рока, блюза, хард-рока и джаза. В комплект входит фирменный кейс Gibson.',
    specs: [['Производитель','Gibson'],['Модель','Les Paul Standard'],['Тип','Электрогитара'],['Гриф','Красное дерево'],['Дека','Красное дерево + Клён'],['Звукосниматели','2× Humbucker 490R/498T'],['Цвет','Heritage Cherry Sunburst'],['Ладов','22'],['Мензура','628 мм (24.75″)'],['Год','2022'],['Комплект','Гитара + кейс Gibson'],['Состояние','Отличное']],
    perk: '📦 Фирменный кейс Gibson в комплекте',
    reviews: [],
    similar: ['fender-strat','marshall-dsl'],
  },

  'fender-strat': {
    name: 'Fender Stratocaster MIM',
    category: 'Электрогитары', catFilter: 'guitars',
    emoji: '🎸', image: 'images/fender-strat.jpg', extraImages: ['images/fender-strat-2.jpg'],
    avail: 'free', price1: 750, price2: 630,
    invId: 'EQ-041', rating: 0, reviewCount: 0, condition: 'good',
    desc: 'Классическая Fender Stratocaster мексиканского производства — одна из самых универсальных электрогитар. Три сингловых звукоснимателя дают широкий спектр тонов: от чистого джаза до острого рока.',
    specs: [['Производитель','Fender'],['Модель','Stratocaster Player (MIM)'],['Тип','Электрогитара'],['Звукосниматели','3× Single-coil'],['Цвет','Lake Placid Blue'],['Гриф','Клён'],['Ладов','22'],['Мензура','648 мм (25.5″)'],['Год','2021'],['Состояние','Хорошее']],
    perk: '🎸 Подходит для любого музыкального стиля',
    reviews: [],
    similar: ['gibson-les-paul','marshall-dsl'],
  },

  'pearl-export': {
    name: 'Pearl Export 5-Piece',
    category: 'Ударные установки', catFilter: 'drums',
    emoji: '🥁', image: 'images/pearl-export.webp', extraImages: ['images/pearl-export-2.webp','images/pearl-export-3.webp'],
    avail: 'free', price1: 1200, price2: 950,
    invId: 'EQ-040', rating: 0, reviewCount: 0, condition: 'new',
    desc: 'Профессиональная акустическая ударная установка Pearl Export — отличный выбор для концертов и репетиций. Комплект включает 5 барабанов, стойки и тарелки серии Zildjian ZBT.',
    specs: [['Производитель','Pearl'],['Модель','Export EXX725S'],['Тип','Акустическая установка'],['Барабаны','5 шт. (22″+12″+13″+16″+14″S)'],['Тарелки','Zildjian ZBT Hi-Hat 14″, Crash 16″, Ride 20″'],['Материал','Тополь/Красное дерево'],['Год','2024'],['Состояние','Новое']],
    perk: '🎵 Тарелки Zildjian ZBT в комплекте',
    reviews: [],
    similar: ['roland-td17'],
  },

  'roland-td17': {
    name: 'Roland TD-17KVX',
    category: 'Ударные установки', catFilter: 'drums',
    emoji: '🥁', image: 'images/roland-td17.webp', extraImages: ['images/roland-td17-2.webp','images/roland-td17-3.webp'],
    avail: 'free', price1: 900, price2: 760,
    invId: 'EQ-039', rating: 0, reviewCount: 0, condition: 'excellent',
    desc: 'Электронная ударная установка Roland TD-17KVX с меш-пластиками — бесшумная альтернатива акустическим барабанам. Идеальна для домашних репетиций, записи и выступлений в клубах.',
    specs: [['Производитель','Roland'],['Модель','TD-17KVX'],['Тип','Электронная установка'],['Пэды','5 шт., меш-пластики (бесшумные)'],['Тарелки','3 шт. (Hi-Hat + Crash + Ride)'],['Модуль','TD-17 (700+ звуков)'],['Подключение','USB-MIDI, наушники, линейный выход'],['Год','2023'],['Состояние','Отличное']],
    perk: '🎧 Возможность играть в наушниках — без шума',
    reviews: [],
    similar: ['pearl-export'],
  },

  'roland-juno': {
    name: 'Roland JUNO-DS88',
    category: 'Синтезаторы', catFilter: 'keys',
    emoji: '🎹', image: 'images/roland-juno.jpg', extraImages: [],  /* фото не загружено — эмодзи-заглушка */
    avail: 'booked', price1: 950, price2: 800,
    invId: 'EQ-038', rating: 0, reviewCount: 0, condition: 'excellent',
    desc: 'Roland JUNO-DS88 — 88-клавишный синтезатор с взвешенной клавиатурой. Превосходный инструмент для концертов и студийной работы. Более 1000 пресетов, встроенный арпеджиатор.',
    specs: [['Производитель','Roland'],['Модель','JUNO-DS88'],['Тип','Синтезатор'],['Клавиш','88, взвешенная клавиатура'],['Пресетов','1000+ звуков'],['Полифония','128 голосов'],['Подключение','USB, MIDI, линейный выход'],['Год','2022'],['Состояние','Отличное']],
    perk: '🎵 88 взвешенных клавиш — как настоящее пианино',
    reviews: [],
    similar: ['yamaha-p125'],
  },

  'yamaha-p125': {
    name: 'Yamaha P-125',
    category: 'Цифровые пианино', catFilter: 'keys',
    emoji: '🎹', image: 'images/yamaha-p125.jpg', extraImages: ['images/yamaha-p125-2.jpg','images/yamaha-p125-3.jpg'],
    avail: 'free', price1: 1100, price2: 920,
    invId: 'EQ-037', rating: 0, reviewCount: 0, condition: 'new',
    desc: 'Компактное цифровое пианино Yamaha P-125 с клавиатурой GHC (Graded Hammer Compact). Реалистичная взвешенная клавиатура с градуированным молоточковым механизмом. 192-голосная полифония.',
    specs: [['Производитель','Yamaha'],['Модель','P-125B'],['Тип','Цифровое пианино'],['Клавиш','88, GHC взвешенная'],['Тембров','14'],['Полифония','192 голоса'],['Выходы','Стерео Jack 6.35, USB'],['Год','2023'],['Состояние','Новое']],
    perk: '🎼 Идеально для классики и поп-музыки',
    reviews: [],
    similar: ['roland-juno'],
  },

  'marshall-dsl': {
    name: 'Marshall DSL40CR',
    category: 'Усилители', catFilter: 'amps',
    emoji: '🔊', image: 'images/marshall-dsl.webp', extraImages: ['images/marshall-dsl-2.webp','images/marshall-dsl-3.webp'],
    avail: 'free', price1: 700, price2: 590,
    invId: 'EQ-036', rating: 0, reviewCount: 0, condition: 'good',
    desc: 'Легендарный ламповый комбоусилитель Marshall DSL40CR — 40 Вт мощности, два канала, встроенный ревербератор. Классический британский звук, который знают все.',
    specs: [['Производитель','Marshall'],['Модель','DSL40CR'],['Тип','Гитарный комбо'],['Мощность','40 Вт (режим 20 Вт)'],['Лампы','ECC83 (преамп), EL34 (мощность)'],['Динамики','12″ Celestion V-Type'],['Каналы','2 (Clean/Crunch + Lead)'],['Эффекты','Встроенный реверб'],['Год','2020'],['Состояние','Хорошее']],
    perk: '🎸 Классический британский звук Marshall',
    reviews: [],
    similar: ['gibson-les-paul','fender-twin'],
  },

  'fender-twin': {
    name: 'Fender Twin Reverb',
    category: 'Усилители', catFilter: 'amps',
    emoji: '🔊', image: 'images/fender-twin.webp', extraImages: ['images/fender-twin-2.webp','images/fender-twin-3.webp'],
    avail: 'free', price1: 1400, price2: 1180,
    invId: 'EQ-035', rating: 0, reviewCount: 0, condition: 'excellent',
    desc: 'Легендарный Fender Twin Reverb — 85 Вт ламповой мощности, два 12″ динамика Jensen. Кристально чистый звук с великолепным встроенным ревербератором и тремоло.',
    specs: [['Производитель','Fender'],['Модель','65 Twin Reverb Reissue'],['Тип','Гитарный комбо'],['Мощность','85 Вт'],['Лампы','12AX7 + 6L6×4'],['Динамики','2× 12″ Jensen C12K'],['Каналы','2 (Normal + Vibrato)'],['Эффекты','Reverb + Tremolo'],['Год','2019'],['Состояние','Отличное']],
    perk: '🎶 Встроенные Reverb и Tremolo',
    reviews: [],
    similar: ['marshall-dsl'],
  },

  'shure-sm58': {
    name: 'Shure SM58 + Стойка',
    category: 'Микрофоны', catFilter: 'mics',
    emoji: '🎤', image: 'images/shure-sm58.webp', extraImages: ['images/shure-sm58-2.webp','images/shure-sm58-3.webp'],
    avail: 'free', price1: 350, price2: 290,
    invId: 'EQ-034', rating: 0, reviewCount: 0, condition: 'excellent',
    desc: 'Легендарный вокальный микрофон Shure SM58 — мировой стандарт для живых выступлений. Комплект включает микрофон, XLR-кабель 6 м и концертную стойку-журавль.',
    specs: [['Производитель','Shure'],['Модель','SM58-LC'],['Тип','Динамический вокальный'],['Характеристика','Кардиоида'],['Диапазон','50–15 000 Гц'],['Разъём','XLR (кабель 6 м в комплекте)'],['Стойка','Концертная журавль'],['Состояние','Отличное']],
    perk: '🎤 XLR-кабель 6 м и стойка включены',
    reviews: [],
    similar: ['rode-nt1a'],
  },

  'rode-nt1a': {
    name: 'Rode NT1-A + интерфейс Focusrite',
    category: 'Микрофоны', catFilter: 'mics',
    emoji: '🎤', image: 'images/rode-nt1a.jpg', extraImages: [],  /* 1 фото */
    avail: 'free', price1: 650, price2: 540,
    invId: 'EQ-033', rating: 0, reviewCount: 0, condition: 'new',
    desc: 'Профессиональный студийный конденсаторный микрофон Rode NT1-A в комплекте со звуковым интерфейсом Focusrite Scarlett Solo. Идеально для записи вокала и акустических инструментов.',
    specs: [['Производитель','Rode + Focusrite'],['Микрофон','NT1-A конденсаторный'],['Характеристика','Кардиоида'],['Интерфейс','Focusrite Scarlett Solo (USB)'],['Комплект','Микрофон, поп-фильтр, стойка, кабели, интерфейс'],['Питание','Фантомное +48 В'],['Состояние','Новое']],
    perk: '🎙️ Полный студийный комплект для записи',
    reviews: [],
    similar: ['shure-sm58'],
  },

  'pioneer-ddj': {
    name: 'Pioneer DDJ-FLX6',
    category: 'DJ-оборудование', catFilter: 'dj',
    emoji: '🎛️', image: 'images/pioneer-ddj.jpg', extraImages: [],  /* фото не загружено — эмодзи-заглушка */
    avail: 'service', price1: 1500, price2: 1200,
    invId: 'EQ-032', rating: 0, reviewCount: 0, condition: 'excellent',
    desc: 'Профессиональный 4-дековый DJ-контроллер Pioneer DDJ-FLX6. Совместим с Serato DJ Pro и rekordbox. Большие джоги, 16 перфоманс-пэдов на каждый канал.',
    specs: [['Производитель','Pioneer DJ'],['Модель','DDJ-FLX6'],['Тип','DJ-контроллер'],['Деки','4'],['Совместимость','Serato DJ Pro, rekordbox'],['Джоги','4× 6-дюймовых'],['Пэды','16× MPC-пэдов на деку'],['Год','2021'],['Состояние','Отличное']],
    perk: '🎧 Совместим с Serato DJ Pro и rekordbox',
    reviews: [],
    similar: ['pioneer-djm'],
  },

  'pioneer-djm': {
    name: 'Pioneer DJM-250MK2 Микшер',
    category: 'DJ-оборудование', catFilter: 'dj',
    emoji: '🎛️', image: 'images/pioneer-djm.png', extraImages: [],  /* 1 фото */
    avail: 'free', price1: 800, price2: 660,
    invId: 'EQ-031', rating: 0, reviewCount: 0, condition: 'new',
    desc: 'Компактный профессиональный 2-канальный DJ-микшер Pioneer DJM-250MK2 с встроенной звуковой картой. Совместим с rekordbox и Serato.',
    specs: [['Производитель','Pioneer DJ'],['Модель','DJM-250MK2'],['Тип','DJ-микшер'],['Каналы','2'],['Звуковая карта','Встроенная 24 бит/96 кГц'],['Совместимость','rekordbox, Serato DJ Pro'],['Год','2023'],['Состояние','Новое']],
    perk: '🎵 Встроенная звуковая карта',
    reviews: [],
    similar: ['pioneer-ddj'],
  },

  'led-par-set': {
    name: 'Набор LED PAR 8 шт. + стойки',
    category: 'Световое оборудование', catFilter: 'light',
    emoji: '💡', image: 'images/led-par-set.jpg', extraImages: [],  /* 1 фото */
    avail: 'free', price1: 2000, price2: 1650,
    invId: 'EQ-030', rating: 0, reviewCount: 0, condition: 'new',
    desc: 'Набор из 8 светодиодных прожекторов LED PAR с управлением DMX 512. Два алюминиевых трипода и комплект кабелей включены. Идеально для концертов, корпоративов и вечеринок.',
    specs: [['Тип','Набор LED PAR прожекторов'],['Количество','8 приборов'],['Цвета','RGB + White'],['Управление','DMX 512, ручной режим'],['Стойки','2× алюминиевых трипода (до 2.5 м)'],['Кабели','DMX + силовые в комплекте'],['Состояние','Новое']],
    perk: '💡 Полный комплект: стойки и кабели включены',
    reviews: [],
    similar: ['chauvet-spot'],
  },

  'chauvet-spot': {
    name: 'Chauvet DJ Spot 160 (2 шт.)',
    category: 'Световое оборудование', catFilter: 'light',
    emoji: '💡', image: 'images/chauvet-spot.webp', extraImages: ['images/chauvet-spot-2.webp','images/chauvet-spot-3.webp'],
    avail: 'free', price1: 800, price2: 660,
    invId: 'EQ-029', rating: 0, reviewCount: 0, condition: 'excellent',
    desc: 'Два поворотных прожектора Chauvet DJ Spot 160 с гобо и цветными фильтрами. Создают динамичные световые эффекты для клубов и сценических выступлений.',
    specs: [['Тип','Поворотный прожектор'],['Количество','2 шт.'],['Мощность','2× 32 Вт LED'],['Эффекты','Гобо (8+1), цвет (8+белый), строб'],['Управление','DMX 512 / Sound Active'],['Панорама','Pan 540°, Tilt 220°'],['Состояние','Отличное']],
    perk: '🌀 Гобо-колесо + 8 цветных фильтров',
    reviews: [],
    similar: ['led-par-set'],
  },

  'yamaha-trumpet': {
    name: 'Yamaha YTR-2330 Труба',
    category: 'Духовые инструменты', catFilter: 'brass',
    emoji: '🎺', image: 'images/yamaha-trumpet.jpg', extraImages: [],  /* 1 фото */
    avail: 'free', price1: 450, price2: 370,
    invId: 'EQ-028', rating: 0, reviewCount: 0, condition: 'excellent',
    desc: 'Труба Yamaha YTR-2330 Bb — отличный инструмент для учащихся и профессионалов начального уровня. Лакированный латунный корпус, мундштук 11C4-7C в комплекте.',
    specs: [['Производитель','Yamaha'],['Модель','YTR-2330'],['Строй','Bb (Си-бемоль)'],['Материал','Лакированная латунь'],['Поршни','Monel, 3 шт.'],['Мундштук','Yamaha 11C4-7C (в комплекте)'],['Кейс','В комплекте'],['Состояние','Отличное']],
    perk: '🎺 Мундштук и кейс включены',
    reviews: [],
    similar: ['jupiter-sax'],
  },

  'jupiter-sax': {
    name: 'Jupiter JAS-567 Альт-саксофон',
    category: 'Духовые инструменты', catFilter: 'brass',
    emoji: '🎷', image: 'images/jupiter-sax.jpg', extraImages: [],  /* 1 фото */
    avail: 'free', price1: 550, price2: 460,
    invId: 'EQ-027', rating: 0, reviewCount: 0, condition: 'good',
    desc: 'Альт-саксофон Jupiter JAS-567 Eb — надёжный инструмент для джаза, классики и эстрады. Жёлтая латунь с лаковым покрытием, удобная эргономика клапанов.',
    specs: [['Производитель','Jupiter'],['Модель','JAS-567'],['Тип','Альт-саксофон Eb'],['Материал','Жёлтая латунь'],['Клапаны','Регулируемые надульники'],['Мундштук','Jupiter в комплекте'],['Кейс','Мягкий кейс в комплекте'],['Состояние','Хорошее']],
    perk: '🎷 Мягкий кейс и мундштук включены',
    reviews: [],
    similar: ['yamaha-trumpet'],
  },

  'qsc-k12': {
    name: 'QSC K12.2 Активная акустика',
    category: 'Акустические системы', catFilter: 'speakers',
    emoji: '🔉', image: 'images/qsc-k12.webp', extraImages: ['images/qsc-k12-2.webp','images/qsc-k12-3.webp'],
    avail: 'free', price1: 1800, price2: 1500,
    invId: 'EQ-026', rating: 0, reviewCount: 0, condition: 'excellent',
    desc: 'QSC K12.2 — профессиональная активная акустика 2000 Вт с встроенным DSP. В аренду предоставляется пара колонок со стойками и кабелями.',
    specs: [['Производитель','QSC'],['Модель','K12.2'],['Тип','Активная акустика'],['Мощность','2000 Вт (Class D)'],['Динамик','12″ + 1.75″ ВЧ'],['Диапазон','45 Гц — 20 кГц'],['Аренда включает','2 колонки + 2 стойки + кабели'],['Состояние','Отличное']],
    perk: '🔉 Пара колонок + стойки + кабели в комплекте',
    reviews: [],
    similar: ['yamaha-dxr12'],
  },

  'yamaha-dxr12': {
    name: 'Yamaha DXR12mkII Колонка',
    category: 'Акустические системы', catFilter: 'speakers',
    emoji: '🔉', image: 'images/yamaha-dxr12.webp', extraImages: ['images/yamaha-dxr12-2.webp','images/yamaha-dxr12-3.webp'],
    avail: 'free', price1: 1400, price2: 1150,
    invId: 'EQ-025', rating: 0, reviewCount: 0, condition: 'new',
    desc: 'Yamaha DXR12mkII — активная PA-система 1100 Вт Class-D. Предоставляется пара со стойками. Подходит для репетиций, небольших концертов.',
    specs: [['Производитель','Yamaha'],['Модель','DXR12mkII'],['Тип','Активная акустика'],['Мощность','1100 Вт Class-D'],['Динамик','12″ + 1.4″ ВЧ'],['Диапазон','52 Гц — 20 кГц'],['Аренда включает','2 колонки + 2 стойки'],['Год','2024'],['Состояние','Новое']],
    perk: '🎵 Bluetooth-подключение без кабелей',
    reviews: [],
    similar: ['qsc-k12'],
  },

  'focusrite-scarlett': {
    name: 'Focusrite Scarlett 2i2',
    category: 'Звуковые карты / Интерфейсы', catFilter: 'audio-if',
    emoji: '🎚️', image: 'images/focusrite-scarlett.jpg', extraImages: [],  /* 1 фото */
    avail: 'free', price1: 400, price2: 320,
    invId: 'EQ-024', rating: 0, reviewCount: 0, condition: 'new',
    desc: 'Focusrite Scarlett 2i2 (4-е поколение) — самый популярный аудиоинтерфейс для домашней студии. 2 прозрачных предусилителя, 24 бит / 192 кГц, USB-C, без драйверов.',
    specs: [['Производитель','Focusrite'],['Модель','Scarlett 2i2 4-е поколение'],['Тип','USB-аудиоинтерфейс'],['Входы','2× XLR/TRS комбо'],['Разрядность','24 бит / 192 кГц'],['Подключение','USB-C'],['Состояние','Новое']],
    perk: '🎙️ Фантомное питание 48В для конденсаторных микрофонов',
    reviews: [],
    similar: ['behringer-umc','rode-nt1a'],
  },

  'behringer-umc': {
    name: 'Behringer UMC202HD',
    category: 'Звуковые карты / Интерфейсы', catFilter: 'audio-if',
    emoji: '🎚️', image: 'images/behringer-umc.jpg', extraImages: [],  /* 1 фото */
    avail: 'free', price1: 250, price2: 200,
    invId: 'EQ-023', rating: 0, reviewCount: 0, condition: 'good',
    desc: 'Behringer UMC202HD — бюджетный USB-аудиоинтерфейс с 2 предусилителями MIDAS. MIDI-вход/выход, 24 бит / 192 кГц.',
    specs: [['Производитель','Behringer'],['Модель','UMC202HD'],['Тип','USB-аудиоинтерфейс'],['Предусилители','2× MIDAS'],['Входы','2× XLR/TRS + MIDI'],['Разрядность','24 бит / 192 кГц'],['Состояние','Хорошее']],
    perk: '🎛️ Предусилители MIDAS — студийного класса',
    reviews: [],
    similar: ['focusrite-scarlett'],
  },

};

/* ─── вспомогательные константы ─── */
const AVAIL_LABEL = { free:'Свободно', booked:'Забронировано', busy:'В аренде', service:'На обслуживании' };
const AVAIL_CLASS = { free:'b-green', booked:'b-yellow', busy:'b-blue', service:'b-red' };
const AVAIL_BTN   = { free:'🛒 Добавить в корзину', booked:'Забронировано', busy:'В аренде', service:'На обслуживании' };
const COND_LABEL  = { new:'Новое', excellent:'Отличное', good:'Хорошее', ok:'Удовлетворительное' };

function pStars(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }
function pFmt(n)   { return Number(n).toLocaleString('ru') + ' ₽'; }

/* ══════════════════════════════════════════════
   Умный загрузчик изображений
   Поддерживает: .webp, .jpg, .jpeg, .png — любой порядок.
   Если первый формат не найден, автоматически пробует следующий.
══════════════════════════════════════════════ */
(function () {
  /* Порядок попытки форматов */
  var EXTS = ['.webp', '.jpg', '.jpeg', '.png'];

  function stripExt(src) {
    return src.replace(/\.(webp|jpe?g|png)(\?.*)?$/i, '');
  }

  function tryNextExt(img) {
    var src   = img.getAttribute('src') || '';
    var base  = stripExt(src);
    var tried = (img.dataset.imgTried || '').split(',').filter(Boolean);
    var current = src.match(/\.(webp|jpe?g|png)/i);
    var currentExt = current ? current[0].toLowerCase() : '';
    if (currentExt && !tried.includes(currentExt)) tried.push(currentExt);

    /* Ищем следующий непробованный формат */
    var next = EXTS.find(function (e) { return !tried.includes(e); });
    if (next) {
      img.dataset.imgTried = tried.join(',');
      img.src = base + next;
    } else {
      /* Все форматы перебраны — скрываем и сообщаем об этом */
      img.style.opacity = '0';
      img.style.display = 'none';
      img.dispatchEvent(new CustomEvent('imgallfailed', { bubbles: true }));
    }
  }

  /* Глобальный обработчик ошибок изображений */
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (img.tagName !== 'IMG') return;
    var src = img.getAttribute('src') || '';
    /* Только для наших локальных фото (папка images/) */
    if (!src.startsWith('images/') && !src.includes('/images/')) return;
    tryNextExt(img);
  }, true /* capture — перехватываем до onerror атрибута */);
})();
