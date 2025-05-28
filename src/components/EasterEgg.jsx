import { motion } from "framer-motion";

export default function EasterEgg() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-5 bg-gradient-to-r from-pink via-accent to-pink/70 text-white px-5 py-3 rounded-xl shadow-glow text-center font-bold animate-pulse"
    >
      Вы открыли секретную корзину! 🎉 Все бесплатно? ;)
    </motion.div>
  );
}
