import { motion } from "framer-motion";

export default function Roulette() {
  return (
    <div className="flex flex-col items-center justify-center h-[65vh] select-none">
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="bg-gradient-to-br from-pink to-accent2 w-24 h-24 rounded-full flex items-center justify-center shadow-xl mb-5"
      >
        <span className="text-white text-5xl">🎰</span>
      </motion.div>
      <h1 className="text-3xl font-bold text-white mb-3">Скоро!</h1>
      <p className="text-lg text-gray-300 text-center">
        Рулетка появится<br />
        в ближайшем обновлении<br />
        <span className="text-accent font-bold">Следите за новостями!</span>
      </p>
    </div>
  );
}
