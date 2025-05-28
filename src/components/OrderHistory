import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Пример заказов — в реальном магазине берёте из API или localStorage
const fakeOrders = [
  {
    id: 1,
    title: "Swiss Watch",
    img: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
    price: 21900,
    createdAt: Date.now() - 86400000, // вчера
    status: "В пути",
    desc: "Элитные швейцарские часы.",
  },
  {
    id: 2,
    title: "Spy Agaric",
    img: "https://cdn-icons-png.flaticon.com/512/6579/6579083.png",
    price: 3080,
    createdAt: Date.now(),
    status: "Готовится к отправке",
    desc: "Мухомор для настоящих разведчиков.",
  },
];

export default function OrderHistory({ orders = fakeOrders }) {
  const [selected, setSelected] = useState(null);

  function formatTime(ts) {
    const date = new Date(ts);
    return date.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-accent">История заказов</h2>
      {orders.length === 0 ? (
        <div className="text-gray-400 text-center mt-12">У вас нет заказов.</div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <motion.div
              key={order.id}
              className="flex items-center bg-cardbg rounded-2xl shadow-card p-4 cursor-pointer hover:scale-[1.03] transition border-l-4 border-accent2"
              onClick={() => setSelected(order)}
              whileTap={{ scale: 0.97 }}
            >
              <img src={order.img} className="w-14 h-14 mr-3 rounded-xl" alt={order.title} draggable="false" />
              <div>
                <div className="font-bold text-white">{order.title}</div>
                <div className="text-xs text-gray-400">{formatTime(order.createdAt)}</div>
                <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-accent text-white">
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Модалка с деталями заказа */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-vibebg p-7 rounded-2xl shadow-2xl max-w-xs w-full relative"
              initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={selected.img} className="w-24 h-24 mx-auto mb-3 rounded-xl" alt={selected.title} />
              <div className="text-lg font-bold text-white text-center mb-1">{selected.title}</div>
              <div className="text-gray-300 text-center mb-2">{selected.desc}</div>
              <div className="text-base text-accent font-semibold mb-1 text-center">₽ {selected.price}</div>
              <div className="text-xs text-gray-400 mb-2 text-center">
                Оформлен: {formatTime(selected.createdAt)}
              </div>
              <div className="flex justify-center">
                <span className="px-4 py-1 rounded-full bg-accent2 text-mainbg font-bold text-xs">
                  {selected.status}
                </span>
              </div>
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl active:scale-90"
                onClick={() => setSelected(null)}
              >&times;</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
