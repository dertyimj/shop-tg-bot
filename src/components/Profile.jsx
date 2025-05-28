import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Данные пользователя (аватар и ник берутся из пропсов user)
// Для реального проекта inventory и orders можно брать из API или localStorage

const fakeInventory = [
  {
    id: 1,
    title: "Swiss Watch",
    img: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
  },
  {
    id: 2,
    title: "Sakura Flower",
    img: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
  },
];

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

function formatTime(ts) {
  const date = new Date(ts);
  return date.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function Profile({ user = {} }) {
  const [active, setActive] = useState("inventory");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Можно заменить на реальные данные из localStorage или API:
  const inventory = fakeInventory;
  const orders = fakeOrders;

  return (
    <div className="max-w-md mx-auto pt-2">
      {/* Аватар и ник */}
      <div className="flex flex-col items-center mb-5">
        <img
          src={user?.photo_url || "https://cdn-icons-png.flaticon.com/512/921/921347.png"}
          className="w-20 h-20 rounded-full mb-2 border-4 border-accent shadow-xl select-none"
          alt="avatar"
          draggable="false"
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
        <div className="font-bold text-white text-lg select-none">{user?.first_name || "Гость"}</div>
      </div>
      {/* Вкладки */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-xl font-bold mx-1 transition-all duration-200 ${
            active === "inventory" ? "bg-accent text-white shadow" : "bg-[#292a35] text-gray-300"
          }`}
          onClick={() => setActive("inventory")}
        >
          Инвентарь
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-bold mx-1 transition-all duration-200 ${
            active === "orders" ? "bg-accent2 text-mainbg shadow" : "bg-[#292a35] text-gray-300"
          }`}
          onClick={() => setActive("orders")}
        >
          Заказы
        </button>
      </div>
      {/* Контент вкладок */}
      <AnimatePresence mode="wait">
        {active === "inventory" ? (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="grid grid-cols-2 gap-4"
          >
            {inventory.length === 0 ? (
              <div className="text-gray-400 text-center mt-8 col-span-2">Инвентарь пуст</div>
            ) : (
              inventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-cardbg rounded-2xl shadow-card p-4 flex flex-col items-center select-none"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                >
                  <img src={item.img} className="w-16 h-16 mb-2 rounded-xl" alt={item.title} draggable="false" />
                  <div className="font-bold text-white text-base">{item.title}</div>
                </div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            <h2 className="text-xl font-bold mb-4 text-accent select-none">История заказов</h2>
            {orders.length === 0 ? (
              <div className="text-gray-400 text-center mt-12">У вас нет заказов.</div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <motion.div
                    key={order.id}
                    className="flex items-center bg-cardbg rounded-2xl shadow-card p-4 cursor-pointer hover:scale-[1.03] transition border-l-4 border-accent2"
                    onClick={() => setSelectedOrder(order)}
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
              {selectedOrder && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
                  onClick={() => setSelectedOrder(null)}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-vibebg p-7 rounded-2xl shadow-2xl max-w-xs w-full relative"
                    initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <img src={selectedOrder.img} className="w-24 h-24 mx-auto mb-3 rounded-xl" alt={selectedOrder.title} />
                    <div className="text-lg font-bold text-white text-center mb-1">{selectedOrder.title}</div>
                    <div className="text-gray-300 text-center mb-2">{selectedOrder.desc}</div>
                    <div className="text-base text-accent font-semibold mb-1 text-center">₽ {selectedOrder.price}</div>
                    <div className="text-xs text-gray-400 mb-2 text-center">
                      Оформлен: {formatTime(selectedOrder.createdAt)}
                    </div>
                    <div className="flex justify-center">
                      <span className="px-4 py-1 rounded-full bg-accent2 text-mainbg font-bold text-xs">
                        {selectedOrder.status}
                      </span>
                    </div>
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl active:scale-90"
                      onClick={() => setSelectedOrder(null)}
                    >&times;</button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
