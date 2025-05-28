import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGift, FaStar, FaFire, FaTrophy, FaArrowLeft, FaArrowRight, FaCrown } from "react-icons/fa";

const banners = [
  {
    id: 1,
    title: "Акция дня: -25% на все аксессуары!",
    desc: "Только сегодня! Успей купить лучшие товары по рекордным ценам.",
    img: "https://cdn-icons-png.flaticon.com/512/595/595449.png",
    color: "from-pink to-accent",
    badge: "🔥",
    cta: "Перейти к акциям",
    link: "/shop?cat=скидки",
  },
  {
    id: 2,
    title: "Бонус за первую покупку",
    desc: "Получай +200 DertyPoints за дебютный заказ и эксклюзивный бейдж.",
    img: "https://cdn-icons-png.flaticon.com/512/2596/2596128.png",
    color: "from-accent2 to-accent",
    badge: "🎁",
    cta: "Подробнее",
    link: "/profile/badges",
  },
  {
    id: 3,
    title: "Рейтинг недели",
    desc: "Войди в ТОП-10 покупателей и получи уникальный приз!",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    color: "from-accent2 to-pink",
    badge: "🏆",
    cta: "Смотреть рейтинг",
    link: "/leaderboard",
  },
  {
    id: 4,
    title: "Товар дня: Swiss Watch",
    desc: "Эксклюзивная швейцарская модель только сегодня! -35%",
    img: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
    color: "from-accent to-accent2",
    badge: "⏰",
    cta: "Купить сейчас",
    link: "/shop?item=1",
  },
  {
    id: 5,
    title: "Ежедневный квест",
    desc: "Сделай 2 покупки и получи бонус на счёт! Не пропусти шанс!",
    img: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
    color: "from-accent2 to-pink",
    badge: "⭐️",
    cta: "Участвовать",
    link: "/quests",
  }
];

export default function BannerSlider() {
  const [active, setActive] = useState(0);
  const timer = useRef();

  // Автоматическая прокрутка
  useEffect(() => {
    timer.current = setInterval(() => {
      setActive(a => (a + 1) % banners.length);
    }, 6800);
    return () => clearInterval(timer.current);
  }, []);

  // Ручной переход
  const goNext = () => setActive(a => (a + 1) % banners.length);
  const goPrev = () => setActive(a => (a - 1 + banners.length) % banners.length);

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 mb-3 relative">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={banners[active].id}
          initial={{ opacity: 0, x: 55 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5, type: "spring" }}
          className={`bg-gradient-to-r ${banners[active].color} rounded-3xl shadow-glow flex items-center px-6 py-5 min-h-[110px] overflow-hidden relative border-2 border-accent2`}
        >
          <div className="mr-5">
            <span className="text-4xl absolute left-4 top-4 animate-bounce select-none pointer-events-none">{banners[active].badge}</span>
            <img src={banners[active].img} className="w-20 h-20 rounded-xl shadow-lg border-2 border-accent2 bg-white/10" draggable="false" alt="banner" />
          </div>
          <div className="flex-1">
            <div className="font-black text-xl text-white glow">{banners[active].title}</div>
            <div className="text-accent2 text-base mt-1 mb-2">{banners[active].desc}</div>
            <button
              className="bg-accent2 text-mainbg font-bold rounded-xl px-5 py-2 shadow-glow hover:bg-accent transition-all active:scale-95 text-sm"
              onClick={() => window.location.href = banners[active].link}
            >
              {banners[active].cta}
            </button>
          </div>
          {/* Переключатели */}
          <button className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-2xl opacity-70 hover:opacity-100" onClick={goPrev}>
            <FaArrowLeft />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-2xl opacity-70 hover:opacity-100" onClick={goNext}>
            <FaArrowRight />
          </button>
          {/* Иконка-корона — для спец. акций */}
          {banners[active].id === 3 && (
            <FaCrown className="absolute right-12 top-5 text-yellow-300 text-3xl animate-pulse" />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 mt-2 justify-center">
        {banners.map((_, i) => (
          <span
            key={i}
            onClick={() => setActive(i)}
            className={`w-5 h-2 rounded-full transition-all duration-200 cursor-pointer
            ${active === i ? "bg-accent shadow-glow" : "bg-[#292929]"}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
