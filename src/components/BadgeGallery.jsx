import { motion } from "framer-motion";
import { FaMedal } from "react-icons/fa";

const BADGES = [
  { id: 1, title: "Новичок", img: "https://cdn-icons-png.flaticon.com/512/992/992651.png", desc: "Сделайте первую покупку!" },
  { id: 2, title: "Покоритель скидок", img: "https://cdn-icons-png.flaticon.com/512/1458/1458681.png", desc: "Используйте купон или промокод." },
  { id: 3, title: "ТОП покупатель", img: "https://cdn-icons-png.flaticon.com/512/2596/2596128.png", desc: "Войти в топ-10 недели." },
  { id: 4, title: "VIP", img: "https://cdn-icons-png.flaticon.com/512/595/595449.png", desc: "Потратьте 10.000₽ и более." },
];

export default function BadgeGallery({ badges = [], onClose }) {
  return (
    <div className="fixed inset-0 z-[101] bg-black/60 flex items-center justify-center">
      <motion.div
        className="bg-cardbg p-8 rounded-3xl border-accent2 border-2 shadow-glow w-[500px] relative"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
      >
        <button className="absolute top-2 right-3 text-accent2 text-2xl" onClick={onClose}>&times;</button>
        <div className="text-xl font-bold text-accent2 mb-4 flex items-center"><FaMedal className="mr-2" /> Галерея бейджей</div>
        <div className="grid grid-cols-2 gap-6">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.id}
              className={`flex flex-col items-center bg-darkglow/90 p-5 rounded-xl shadow-glow relative transition-all group
                ${badges.includes(b.id) ? "opacity-100" : "opacity-60 grayscale"}`}
              whileHover={{ scale: 1.08 }}
            >
              <img src={b.img} alt={b.title} className="w-20 h-20 mb-2" />
              <div className="font-bold text-white text-base">{b.title}</div>
              <div className="text-accent2 text-sm mt-2 text-center">{b.desc}</div>
              {badges.includes(b.id) && <span className="absolute top-2 right-2 bg-accent text-mainbg rounded-lg px-2 py-1 text-xs font-bold animate-pulse">Есть</span>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
