import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck, FaClock, FaCheck, FaInfoCircle, FaStar, FaArrowDown, FaBox } from "react-icons/fa";

const statusMap = {
  "В пути": { icon: <FaTruck />, color: "text-accent" },
  "Доставлен": { icon: <FaCheck />, color: "text-green-400" },
  "Ожидание": { icon: <FaClock />, color: "text-accent2" },
};

function getEta(order) {
  // Демонстрация: 1-3 дня от даты заказа
  const date = new Date(order.createdAt);
  date.setDate(date.getDate() + 2 + (order.id % 2));
  return date.toLocaleDateString("ru-RU");
}

export default function OrderHistory() {
  const [expanded, setExpanded] = useState(null);
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (orders.length === 0) {
    return (
      <div className="mt-10 text-center text-accent2 text-lg font-bold">
        Заказов пока нет <FaBox className="inline ml-2" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-4">
      {orders.map((order, idx) => (
        <motion.div
          key={order.id}
          className="mb-5 bg-cardbg/80 rounded-2xl shadow-glow p-5 border-2 border-accent2 transition-all relative"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold text-accent2 text-base">Заказ #{order.id.toString().slice(-5)}</span>
            <span className={`ml-2 font-bold ${statusMap[order.status]?.color}`}>
              {statusMap[order.status]?.icon} {order.status}
            </span>
            <span className="ml-auto text-xs text-gray-400">{new Date(order.createdAt).toLocaleString("ru-RU")}</span>
            <button
              className="ml-3 text-accent2 hover:text-accent"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              title="Подробнее"
            >
              <FaArrowDown className={`transition-transform ${expanded === idx ? "rotate-180" : ""}`} />
            </button>
          </div>
          <AnimatePresence>
            {expanded === idx && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                className="mt-3"
              >
                <div className="flex flex-col gap-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-darkglow/60 p-2 rounded-xl">
                      <img src={item.img} className="w-10 h-10 rounded-xl" alt={item.title} />
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-accent font-bold ml-auto">₽ {item.price}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="text-xs text-accent2 flex items-center gap-1">
                    <FaClock /> Оформлен: <b>{new Date(order.createdAt).toLocaleString("ru-RU")}</b>
                  </div>
                  <div className="text-xs text-accent2 flex items-center gap-1">
                    <FaTruck /> Доставка до: <b>{getEta(order)}</b>
                  </div>
                  <div className="text-xs text-accent2 flex items-center gap-1">
                    <FaInfoCircle /> Статус: <b>{order.status}</b>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button className="bg-accent2 text-mainbg px-4 py-2 rounded-xl font-bold shadow-glow">
                    Оставить отзыв <FaStar className="inline ml-2" />
                  </button>
                  <button className="bg-darkglow text-accent2 border border-accent2 px-4 py-2 rounded-xl font-bold shadow-glow">
                    Помощь
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
