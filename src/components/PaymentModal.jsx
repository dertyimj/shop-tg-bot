import { useState } from "react";
import { motion } from "framer-motion";
import { FaCreditCard, FaCheckCircle } from "react-icons/fa";

export default function PaymentModal({ total, onFinish }) {
  const [loading, setLoading] = useState(false);

  function pay() {
    setLoading(true);
    setTimeout(() => {
      onFinish(true);
    }, 1800);
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => !loading && onFinish(false)}
    >
      <motion.div
        className="bg-cardbg p-8 rounded-2xl shadow-glow border-2 border-accent2 w-80 relative"
        initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <FaCreditCard className="text-accent text-5xl mb-3" />
          <div className="font-bold text-accent2 text-lg mb-2">Оплатить заказ</div>
          <div className="text-white text-xl font-bold mb-2">₽ {total}</div>
          {!loading
            ? <button className="bg-accent text-mainbg font-bold rounded-xl px-6 py-3 mt-2 w-full text-lg shadow-glow glow-btn"
                onClick={pay}><FaCheckCircle className="inline mr-2" />Оплатить</button>
            : <div className="animate-pulse text-accent text-xl font-bold mt-3">Платеж обрабатывается...</div>
          }
        </div>
      </motion.div>
    </motion.div>
  );
}
