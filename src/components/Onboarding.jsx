import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Добро пожаловать в DertyShop!",
    subtitle: "Black & White Marketplace с огнём, неоновым свечением и лучшими товарами!",
    img: "https://cdn-icons-png.flaticon.com/512/3176/3176297.png",
    accent: true
  },
  {
    title: "Зарабатывай за покупки",
    subtitle: "Получай бонусы, коллекционируй уникальные предметы, участвуй в розыгрышах!",
    img: "https://cdn-icons-png.flaticon.com/512/991/991993.png",
    accent: false
  },
  {
    title: "Подарки и квесты",
    subtitle: "Выполняй задания, получай ежедневные награды и следи за рейтингом!",
    img: "https://cdn-icons-png.flaticon.com/512/2596/2596128.png",
    accent: false
  },
  {
    title: "Реальные отзывы и чат",
    subtitle: "Поддержка 24/7, честная система рейтингов и активное комьюнити.",
    img: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
    accent: false
  },
  {
    title: "Начни прямо сейчас",
    subtitle: "Дерзай, выбирай свой стиль, обгоняй конкурентов и стань частью топ-100!",
    img: "https://cdn-icons-png.flaticon.com/512/1147/1147939.png",
    accent: true
  }
];

export default function Onboarding({ onFinish }) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current === slides.length - 1) {
      onFinish();
    } else {
      setCurrent(c => c + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#161620] to-[#24243c]">
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, type: "spring" }}
          className="w-full max-w-xs mx-auto flex flex-col items-center select-none"
        >
          <img
            src={slides[current].img}
            alt="welcome"
            className={`w-28 h-28 mb-6 drop-shadow-2xl ${slides[current].accent ? "glow" : ""}`}
            draggable="false"
            style={{ userSelect: "none" }}
          />
          <h2 className={`text-2xl font-black mb-3 text-center ${slides[current].accent ? "text-accent" : "text-white"}`}>{slides[current].title}</h2>
          <div className="text-base text-gray-200 mb-9 text-center px-3 font-medium">{slides[current].subtitle}</div>
          <button
            className="w-full py-3 rounded-xl font-bold text-mainbg bg-accent text-xl glow-btn shadow-glow transition-all hover:bg-accent2"
            onClick={handleNext}
          >
            {current === slides.length - 1 ? "В магазин!" : "Далее"}
          </button>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 mt-8">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-4 h-2 rounded-full transition-all duration-200 ${current === idx ? "bg-accent" : "bg-[#292929]"}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
