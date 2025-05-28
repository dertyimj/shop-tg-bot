import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeScreen({ onNext }) {
  const [show, setShow] = useState(true);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-mainbg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <motion.div
              className="glow mb-4"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3176/3176297.png"
                alt="welcome"
                className="w-20 h-20"
                draggable="false"
              />
            </motion.div>
            <div className="text-3xl font-bold text-white mb-2 text-center leading-tight glow">
              Покупай и продавай в <span className="text-accent">DertyShop</span>
            </div>
            <div className="text-base text-gray-200 text-center mb-7 mt-2 font-medium">
              <span className="glow-accent">Зарабатывай бонусы и получай призы<br />за каждую покупку!</span>
            </div>
            <motion.button
              className="w-56 py-3 rounded-xl font-bold text-mainbg bg-accent text-xl glow-btn"
              whileTap={{ scale: 0.96 }}
              onClick={() => { setShow(false); setTimeout(onNext, 350); }}
            >
              Далее
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
