import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function StatusNotification({ status }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl shadow-glow z-50 text-lg font-bold
        ${status === "success" ? "bg-accent text-mainbg" : "bg-pink/90 text-white"}`}
    >
      {status === "success"
        ? <span><FaCheckCircle className="inline mr-2" /> Оплата успешна!</span>
        : <span><FaTimesCircle className="inline mr-2" /> Ошибка оплаты или промокода!</span>
      }
    </motion.div>
  );
}
