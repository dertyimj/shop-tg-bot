import { motion } from "framer-motion";
import { FaStar, FaArrowUp } from "react-icons/fa";

export default function LevelUpModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 z-[101] bg-black/60 flex items-center justify-center">
      <motion.div
        className="bg-gradient-to-br from-accent2 to-pink text-mainbg p-12 rounded-3xl border-accent2 border-4 shadow-glow flex flex-col items-center relative"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
      >
        <button className="absolute top-3 right-4 text-pink text-3xl" onClick={onClose}>&times;</button>
        <FaStar className="text-6xl animate-pulse mb-5 text-yellow-300" />
        <div className="text-3xl font-extrabold mb-4">LVL-UP!</div>
        <div className="text-lg mb-2">Поздравляем, <span className="font-black">{user?.first_name || "User"}</span>!</div>
        <div className="text-xl mb-6 font-bold">Ваш уровень повышен</div>
        <button className="bg-accent text-mainbg px-6 py-3 rounded-xl font-bold text-lg shadow-glow animate-bounce" onClick={onClose}>
          <FaArrowUp className="inline mr-2" /> Ура!
        </button>
      </motion.div>
    </div>
  );
}
