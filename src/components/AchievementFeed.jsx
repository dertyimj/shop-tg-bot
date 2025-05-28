import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaGift, FaMedal } from "react-icons/fa";

const FEED = [
  { icon: <FaStar className="text-yellow-400" />, title: "Достижение: Первая покупка!", desc: "Вам начислено 100 бонусов", date: "2024-05-19" },
  { icon: <FaGift className="text-accent" />, title: "Подарок: Купон на скидку!", desc: "WELCOME -15%", date: "2024-05-20" },
  { icon: <FaMedal className="text-pink" />, title: "Бейдж: ТОП-10 недели", desc: "Попал в топ!", date: "2024-05-21" },
];

export default function AchievementFeed({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center">
      <motion.div
        className="bg-cardbg p-8 rounded-3xl border-accent2 border-2 shadow-glow w-96 relative"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
      >
        <button className="absolute top-2 right-3 text-accent2 text-2xl" onClick={onClose}>&times;</button>
        <div className="text-xl font-bold text-accent2 mb-4">Лента достижений</div>
        <div className="space-y-3">
          {FEED.map((f, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 bg-darkglow/80 p-3 rounded-xl shadow-glow"
              initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
            >
              <span className="text-3xl">{f.icon}</span>
              <div>
                <div className="font-bold text-white">{f.title}</div>
                <div className="text-accent2 text-sm">{f.desc}</div>
                <div className="text-xs text-gray-400">{f.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
