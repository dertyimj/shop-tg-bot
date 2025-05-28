import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift, FaTimesCircle } from "react-icons/fa";

export default function PromoPopup({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => onClose && onClose(), 8000);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-accent to-pink text-mainbg p-9 rounded-3xl border-accent2 border-4 shadow-glow flex flex-col items-center relative"
            initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
          >
            <button className="absolute top-2 right-2 text-pink text-2xl" onClick={onClose}><FaTimesCircle /></button>
            <FaGift className="text-5xl animate-bounce mb-3 text-accent2" />
            <div className="font-extrabold text-2xl mb-2">Подарок от DertyShop!</div>
            <div className="text-lg mb-4 font-medium text-accent2">Используйте промокод <span className="bg-accent2 text-mainbg px-2 rounded-lg mx-1 font-bold">WELCOME</span> для скидки 15%.</div>
            <button className="bg-accent2 text-mainbg px-6 py-3 rounded-xl shadow-glow font-bold hover:bg-pink hover:text-white text-lg transition">Спасибо!</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
