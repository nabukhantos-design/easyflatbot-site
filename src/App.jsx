import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Home,
  Percent,
  ShieldCheck,
  Users,
  MessageCircle,
  MapPin,
  Sparkles,
  KeyRound,
  Filter,
  BadgeCheck,
  ArrowRight,
  Link as LinkIcon,
} from "lucide-react";
import * as Lucide from "lucide-react";

// ======== Yandex.Metrika ========
const YM_ID = 103756826;
// ================================

// Upload icon (custom SVG)
const Upload = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={(props && props.className) || "w-6 h-6"}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 5 17 10" />
    <line x1="12" y1="5" x2="12" y2="15" />
  </svg>
);

// Safe fallbacks for possibly missing icons in lucide-react
const SendIcon =
  Lucide?.Send ||
  ((props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={(props && props.className) || "w-5 h-5"}
    >
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ));

const PhoneCallIcon =
  Lucide?.PhoneCall ||
  ((props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={(props && props.className) || "w-5 h-5"}
    >
      <path d="M15.05 5A5 5 0 0 1 19 8.95" />
      <path d="M15.05 1A9 9 0 0 1 23 8.95" />
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2H7a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.16a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ));

function runSelfTests() {
  try {
    const checks = [
      ["Rocket", Rocket],
      ["MessageCircle", MessageCircle],
      ["MapPin", MapPin],
      ["ArrowRight", ArrowRight],
      ["SendIcon", SendIcon],
      ["PhoneCallIcon", PhoneCallIcon],
      ["Upload", Upload],
    ];
    checks.forEach(([name, Comp]) => {
      if (typeof Comp !== "function") {
        console.warn(
          `[SelfTest] Icon component missing: ${name}. Using fallback if available.`
        );
      }
    });
  } catch (e) {
    console.error("[SelfTest] Error during checks", e);
  }
}

/**
 * Города для внутренней перелинковки.
 * href — только для тех, где у нас есть отдельная страница.
 * goal — идентификатор цели в Метрике.
 */
const cities = [
  { name: "Кисловодск", href: "/kislovodsk/", goal: "city_click_kislovodsk" },
  { name: "Ессентуки", href: "/essentuki/", goal: "city_click_essentuki" },
  { name: "Пятигорск", href: "/pyatigorsk/", goal: "city_click_pyatigorsk" },
  {
    name: "Железноводск",
    href: "/zheleznovodsk/",
    goal: "city_click_zheleznovodsk",
  },
  // Ставрополь оставляем без ссылки, если страницы пока нет
  { name: "Ставрополь" },
];

const faqs = [
  {
    q: "Оплата подписки звёздами — как это работает?",
    a: "Оплата подписки — в Telegram Stars, официальной валюте Telegram. Купите звёзды в официальном Premium-боте Telegram (@PremiumBot) — это быстро и удобно. Затем вернитесь в нашего бота и оплатите подписку звёздами в пару касаний.",
  },
  {
    q: "Я сдаю квартиру. Нужно ли платить?",
    a: "Нет. Размещение объявлений для арендодателей — бесплатно. Просто заполни форму в боте и добавь квартиру — займёт не больше 2 минут.",
  },
  {
    q: "Сколько стоит подписка?",
    a: "Первые 3 месяца после запуска — 100 ⭐; далее: 3 месяца — 650 ⭐, 6 месяцев — 1000 ⭐, 12 месяцев — 1 500 ⭐.",
  },
  {
    q: "Это безопасно?",
    a: "Да. EasyFlatBot — прямой контакт с владельцем, без посредников. Мы исключаем фейки, спам и неадекватных участников. Соблюдай базовые правила безопасности при аренде.",
  },
  {
    q: "Как проходит модерация обьявлений?",
    a: "Каждое объявление проверяется вручную на соответствие правилам, наличие фейков, корректность информации и фото.",
  },
  {
    q: "Могу ли я сдать несколько квартир?",
    a: "Да, можно добавить несколько объектов — для каждого создаётся отдельное объявление.",
  },
];

const roadmap = [
  {
    date: "01.09.2025",
    title: "Запуск Telegram-бота",
    points: ["Без комиссий, без переплат — честная аренда напрямую"],
  },
  {
    date: "Январь 2026",
    title: "Улучшение Telegram-бота",
    points: ["Умные фильтры", "Отзывы", "Избранное"],
  },
  {
    date: "Май 2026",
    title: "Бета мобильного приложения",
    points: ["Поддержка бронирования через бота", "Георасширение: новые города"],
  },
  {
    date: "2027",
    title: "Полноценное приложение iOS/Android",
    points: ["Единый аккаунт: бот + сайт + приложение"],
  },
];

const benefits = [
  {
    icon: Percent,
    title: "Без комиссий и агентств",
    text: "Стоимость аренды ниже, чем в классических сервисах: платишь только владельцу.",
  },
  {
    icon: Users,
    title: "Только прямые контакты",
    text: "Общайся напрямую с владельцем без посредников и сомнительных схем.",
  },
  {
    icon: Upload,
    title: "Бесплатное размещение квартир",
    text: "Добавляй объявления как собственник бесплатно — быстро и без ограничений.",
  },
  {
    icon: ShieldCheck,
    title: "Ручная модерация",
    text: "Каждая публикация проверяется — отсекаем фейки и спам.",
  },
  {
    icon: MapPin,
    title: "Города-курорты СК",
    text: "Кисловодск, Ессентуки, Пятигорск, Железноводск, Ставрополь.",
  },
  {
    icon: MessageCircle,
    title: "Всё в Telegram",
    text: "Поиск, фильтры, контакты — весь процесс в одном боте.",
  },
];

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const LogoMark = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="32" cy="32" r="28" stroke="currentColor" />
    <path d="M20 36l8-16 8 8 8-4" stroke="currentColor" />
  </svg>
);

const Logo = ({ invert = false }) => (
  <div className="flex items-center gap-2">
    <LogoMark className={`w-7 h-7 ${invert ? "text-white" : "text-black"}`} />
    <span
      className={`font-black tracking-tight text-lg sm:text-xl ${
        invert ? "text-white" : "text-black"
      }`}
    >
      EasyFlatBot
    </span>
  </div>
);

const NavLink = ({ href, children }) => (
  <a href={href} className="text-white/90 hover:text-white transition-colors">
    {children}
  </a>
);

// === goals support + external ===
const PrimaryButton = ({ href, children, icon: Icon, external = false, goal }) => {
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const onClick = () => goal && window.ym?.(YM_ID, "reachGoal", goal);
  return (
    <a
      href={href}
      {...extra}
      data-ym-goal={goal}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl bg-white text-gray-900 px-5 py-3 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
    >
      {typeof Icon === "function" && <Icon className="w-5 h-5" />}
      {children}
    </a>
  );
};

// === goals support + external ===
const GhostButton = ({
  href,
  children,
  icon: Icon,
  variant = "dark",
  external = false,
  goal,
}) => {
  const isLight = variant === "light";
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all";
  const cls = isLight
    ? "ring-1 ring-gray-300 text-gray-900 hover:bg-gray-50"
    : "ring-1 ring-white/60 text-white backdrop-blur-sm hover:bg-white/10";
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const onClick = () => goal && window.ym?.(YM_ID, "reachGoal", goal);
  return (
    <a
      href={href}
      {...extra}
      data-ym-goal={goal}
      onClick={onClick}
      className={`${base} ${cls}`}
    >
      {typeof Icon === "function" && <Icon className="w-5 h-5" />}
      {children}
    </a>
  );
};

const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/30 px-4 py-2 text-white/90 text-sm backdrop-blur-sm">
    {children}
  </span>
);

const Card = ({ children }) => (
  <div className="rounded-3xl bg-white shadow-lg p-6 md:p-8">{children}</div>
);

const GradientBG = ({ children }) => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-orange-400 blur-3xl opacity-30 animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-teal-400 via-sky-500 to-indigo-500 blur-3xl opacity-30 animate-pulse [animation-duration:6s]" />
    </div>
    {children}
  </div>
);

const Step = ({ icon: Icon, title, text }) => (
  <Card>
    <div className="flex items-start gap-4">
      <div className="shrink-0 rounded-2xl bg-gray-900 text-white p-3">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-gray-600 mt-1">{text}</p>
      </div>
    </div>
  </Card>
);

const Benefit = ({ icon: Icon, title, text }) => (
  <div className="rounded-3xl bg-white/60 backdrop-blur p-6 ring-1 ring-gray-200">
    <div className="flex items-center gap-3 mb-3">
      <div className="shrink-0 rounded-xl bg-gray-900 text-white p-2.5">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-semibold">{title}</h4>
    </div>
    <p className="text-gray-700">{text}</p>
  </div>
);

const FAQ = ({ item, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl ring-1 ring-gray-200 bg-white">
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold pr-6">{item.q}</span>
        <ArrowRight
          className={`w-5 h-5 transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>
      {open && <div className="p-5 pt-0 text-gray-700">{item.a}</div>}
    </div>
  );
};

/** ДОБАВЛЕНО: Выпадающий список городов в хедере */
function CityDropdown() {
  const [open, setOpen] = useState(false);
  const items = cities;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Города
        <span aria-hidden>▾</span>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5 py-2 z-50"
          role="menu"
        >
          {items.map((c) =>
            c.href ? (
              <a
                key={c.name}
                href={c.href}
                role="menuitem"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                onClick={() => c.goal && window.ym?.(YM_ID, "reachGoal", c.goal)}
              >
                {c.name}
              </a>
            ) : (
              <span
                key={c.name}
                role="menuitem"
                aria-disabled="true"
                className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
              >
                {c.name}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
/** /ДОБАВЛЕНО */

export default function EasyFlatBotSite() {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.__EFB_TESTED__) {
      runSelfTests();
      window.__EFB_TESTED__ = true;
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 selection:bg-fuchsia-200/60">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50">
        <GradientBG>
          <div className="bg-gradient-to-r from-fuchsia-600 via-rose-600 to-orange-500">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <a href="#home" className="flex items-center gap-3">
                <Logo invert />
              </a>
              <nav className="hidden md:flex items-center gap-6">
                <NavLink href="#what">Что это</NavLink>
                <NavLink href="#how">Как это работает</NavLink>
                <NavLink href="#benefits">Почему мы</NavLink>
                <NavLink href="#cities">Города</NavLink>
                {/* ДОБАВЛЕНО: dropdown со списком городов */}
                <CityDropdown />
                {/* /ДОБАВЛЕНО */}
                <NavLink href="#pricing">Тарифы</NavLink>
                <NavLink href="#faq">FAQ</NavLink>
                <NavLink href="#contacts">Контакты</NavLink>
              </nav>
              <div className="hidden md:flex items-center gap-3">
                <PrimaryButton
                  href="https://t.me/EasyFlatBot_bot"
                  icon={SendIcon}
                  external
                  goal="open_bot_header"
                >
                  Запустить бота
                </PrimaryButton>
              </div>
            </div>
          </div>
        </GradientBG>
      </header>

      {/* Hero */}
      <Section id="home" className="pt-28">
        <GradientBG>
          <div className="bg-gradient-to-br from-fuchsia-600 via-rose-600 to-orange-500 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-2 mb-4">
                  <Chip>
                    <Sparkles className="w-4 h-4 mr-1" /> Экономь до 40% на аренде
                  </Chip>
                  <Chip>Без посредников</Chip>
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-tight">
                  Аренда в Кисловодске без посредников — прямо в Telegram EasyFlatBot
                </h1>
                <p className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl">
                  Подписка для арендаторов. Бесплатное размещение — для собственников. Всё просто и честно.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <PrimaryButton
                    href="https://t.me/EasyFlatBot_bot"
                    icon={Rocket}
                    external
                    goal="open_bot_hero"
                  >
                    Присоединиться
                  </PrimaryButton>
                  <GhostButton
                    href="https://t.me/EasyFlatBot_chat"
                    icon={MessageCircle}
                    external
                    goal="open_chat_hero"
                  >
                    Открыть чат
                  </GhostButton>
                  <GhostButton
                    href="https://vk.com/easyflatbot_club"
                    icon={LinkIcon}
                    external
                    goal="open_vk_hero"
                  >
                    VK сообщество
                  </GhostButton>
                </div>
                <div className="mt-6 text-white/80 text-sm">
                  Старт Telegram-бота —{" "}
                  <span className="font-semibold">1 сентября 2025</span>
                </div>
              </motion.div>
            </div>
          </div>
        </GradientBG>
      </Section>

      {/* What is */}
      <Section id="what" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Что такое EasyFlatBot?
              </h2>
              <p className="mt-4 text-gray-700 text-lg">
                EasyFlatBot — Telegram-бот для поиска и сдачи жилья на короткий срок в
                городах-курортах Ставропольского края. Никаких комиссий, посредников и
                скрытых платежей.
              </p>
              <p className="mt-3 text-gray-700">
                Всё просто: подписка для арендаторов и бесплатное размещение для
                владельцев квартир.
              </p>
              <div className="mt-6 flex gap-3">
                <PrimaryButton href="#how" icon={ArrowRight}>
                  Как это работает
                </PrimaryButton>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl bg-white p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-fuchsia-100 to-rose-100 p-6">
                    <div className="font-semibold">Арендаторам</div>
                    <div className="text-sm text-gray-700 mt-2">
                      Подписка за копейки — прямой контакт с хозяином.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-teал-100 to-sky-100 p-6">
                    <div className="font-semibold">Собственникам</div>
                    <div className="text-sm text-gray-700 mt-2">
                      Бесплатное размещение объявлений.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-indigo-100 to-sky-100 p-6">
                    <div className="font-semibold">Без посредников</div>
                    <div className="text-sm text-gray-700 mt-2">
                      Только честная аренда, напрямую.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100 p-6">
                    <div className="font-semibold">Всё в Telegram</div>
                    <div className="text-sm text-gray-700 mt-2">
                      Никаких логинов и сложностей.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section id="how" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Как найти квартиру в EasyFlatBot?
          </h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Step
              icon={BadgeCheck}
              title="Оформи подписку"
              text="Очень просто — за 1 минуту прямо в боте."
            />
            <Step
              icon={Home}
              title="Выбери квартиру"
              text="Смотри и фильтруй объявления по городам."
            />
            <Step
              icon={Filter}
              title="Получай доступ"
              text="Полный доступ ко всем объявлениям без ограничений."
            />
            <Step
              icon={KeyRound}
              title="Заселяйся"
              text="Без посредников и переплат — связывайся напрямую."
            />
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section id="benefits" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Почему EasyFlatBot
          </h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <Benefit icon={b.icon} title={b.title} text={b.text} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Cities */}
      <Section id="cities" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Города
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) =>
                c.href ? (
                  <a
                    key={c.name}
                    href={c.href}
                    className="rounded-full bg-gray-900 text-white px-4 py-2 text-sm"
                    onClick={() =>
                      c.goal && window.ym?.(YM_ID, "reachGoal", c.goal)
                    }
                    aria-label={`Снять квартиру — ${c.name}`}
                  >
                    {c.name}
                  </a>
                ) : (
                  <span
                    key={c.name}
                    className="rounded-full bg-gray-300 text-gray-800 px-4 py-2 text-sm"
                    aria-label={c.name}
                  >
                    {c.name}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((c, i) => {
              const Tile = (
                <div className="rounded-3xl bg-gradient-to-br from-gray-100 to-white p-6 ring-1 ring-gray-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gray-900 text-white p-2">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="font-semibold">{c.name}</div>
                  </div>
                  <p className="text-gray-700 mt-3 text-sm">
                    Подборка актуальных квартир — прямо в боте.
                  </p>
                </div>
              );

              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  {c.href ? (
                    <a
                      href={c.href}
                      onClick={() =>
                        c.goal && window.ym?.(YM_ID, "reachGoal", c.goal)
                      }
                      aria-label={`Страница города: ${c.name}`}
                      className="block focus:outline-none focus:ring-2 focus:ring-fuchsia-400 rounded-3xl"
                    >
                      {Tile}
                    </a>
                  ) : (
                    Tile
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Тарифы подписки
              </h2>
              <p className="mt-2 text-gray-700">
                Первые 3 месяца после запуска — 100 ⭐ за весь период.
              </p>
            </div>
            <a
              href="https://t.me/EasyFlatBot_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold underline decoration-2 underline-offset-4"
            >
              Оформить в боте →
            </a>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl">3 месяца</h3>
                <Chip>1000 ₽</Chip>
              </div>
              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Доступ ко всем объявлениям</li>
                <li>Все города</li>
                <li>Поддержка</li>
              </ul>
              <a
                href="https://t.me/EasyFlatBot_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.ym?.(YM_ID, "reachGoal", "buy_3m")}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-gray-900"
              >
                Купить в боте <ArrowRight className="w-4 h-4" />
              </a>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl">6 месяцев</h3>
                <Chip>1800 ₽</Chip>
              </div>
              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Доступ ко всем объявлениям</li>
                <li>Все города</li>
                <li>Поддержка</li>
              </ul>
              <a
                href="https://t.me/EasyFlatBot_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.ym?.(YM_ID, "reachGoal", "buy_6m")}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-gray-900"
              >
                Купить в боте <ArrowRight className="w-4 h-4" />
              </a>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl">12 месяцев</h3>
                <Chip>3000 ₽</Chip>
              </div>
              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Доступ ко всем объявлениям</li>
                <li>Все города</li>
                <li>Поддержка</li>
              </ul>
              <a
                href="https://t.me/EasyFlatBot_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.ym?.(YM_ID, "reachGoal", "buy_12m")}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-gray-900"
              >
                Купить в боте <ArrowRight className="w-4 h-4" />
              </a>
            </Card>
          </div>
        </div>
      </Section>

      {/* For owners */}
      <Section id="owners" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Собственникам — бесплатно
              </h2>
              <p className="mt-3 text-gray-700">
                Размести объявление бесплатно — быстро и просто. Без платных пакетов и
                ограничений.
              </p>
              <div className="mt-6 flex gap-3">
                <PrimaryButton
                  href="https://t.me/EasyFlatBot_bot"
                  icon={Upload}
                  external
                  goal="owner_add_listing"
                >
                  Добавить квартиру
                </PrimaryButton>
                <GhostButton
                  href="https://t.me/EasyFlatBot_chat"
                  icon={MessageCircle}
                  external
                  goal="owner_question"
                >
                  Задать вопрос
                </GhostButton>
              </div>
            </div>
            <div>
              <div className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  {["Бесплатно", "Ручная модерация", "Фото и описание", "Прямой контакт"].map(
                    (t) => (
                      <div
                        key={t}
                        className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-200 text-sm font-medium"
                      >
                        {t}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Roadmap */}
      <Section id="roadmap" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Будущее</h2>
          <div className="mt-8 space-y-6">
            {roadmap.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-gray-900 text-white px-3 py-1 text-xs font-semibold">
                    {r.date}
                  </span>
                  <div className="font-semibold">{r.title}</div>
                </div>
                <ul className="mt-3 list-disc pl-6 text-gray-700">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            FAQ: вопросы и ответы
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {faqs.map((f, i) => (
              <FAQ key={i} item={f} />
            ))}
          </div>
        </div>
      </Section>

      {/* Contacts */}
      <Section id="contacts" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Контакты</h2>
              <p className="mt-3 text-gray-700">
                Техническая поддержка — через наш чат в Telegram.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton
                  href="https://t.me/EasyFlatBot_bot"
                  icon={SendIcon}
                  external
                  goal="open_bot_contacts"
                >
                  Telegram-бот
                </PrimaryButton>
                <GhostButton
                  href="https://t.me/EasyFlatBot_chat"
                  icon={MessageCircle}
                  variant="light"
                  external
                  goal="open_chat_contacts"
                >
                  Чат сообщества
                </GhostButton>
                <GhostButton
                  href="https://vk.com/easyflatbot_club"
                  icon={LinkIcon}
                  variant="light"
                  external
                  goal="open_vk_contacts"
                >
                  VK сообщество
                </GhostButton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="pb-12 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} EasyFlatBot. Все права защищены.
            </div>
            <div className="flex items-center gap-3 text-sm">
              <a href="#what" className="underline underline-offset-4">
                О нас
              </a>
              <a href="#roadmap" className="underline underline-offset-4">
                Будущее
              </a>
              <a href="#faq" className="underline underline-offset-4">
                FAQ
              </a>
              <a href="#contacts" className="underline underline-offset-4">
                Контакты
              </a>
            </div>
          </div>

          {/* ДОБАВЛЕНО: ссылки на городские страницы */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Города
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {cities
                .filter((c) => !!c.href)
                .map((c) => (
                  <a
                    key={c.name}
                    href={c.href}
                    onClick={() =>
                      c.goal && window.ym?.(YM_ID, "reachGoal", c.goal)
                    }
                    className="text-gray-700 hover:text-gray-900 underline underline-offset-4"
                    aria-label={`Страница города: ${c.name}`}
                  >
                    {c.name}
                  </a>
                ))}
            </div>
          </div>
          {/* /ДОБАВЛЕНО */}
        </div>
      </footer>
    </main>
  );
}
