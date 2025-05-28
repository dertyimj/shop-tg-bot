import { useState, useEffect } from "react";
import items from "../data/items";
import ItemCard from "./ItemCard";
import Cart from "./Cart";
import { AnimatePresence, motion } from "framer-motion";

// Вспомогательная функция для сохранения заказов в localStorage
function saveOrderToHistory(cart) {
  const order = {
    id: Date.now(),
    items: cart,
    createdAt: Date.now(),
    status: "Готовится к отправке",
  };
  let orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.unshift(order); // добавляем в начало истории
  localStorage.setItem("orders", JSON.stringify(orders));
  return order;
}

export default function Shop({ user }) {
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Показываем уведомление после оплаты
  const [showPaid, setShowPaid] = useState(false);

  function addToCart(item) {
    setCart([...cart, item]);
  }

  function handleCardClick(item) {
    setSelected(item);
  }

  function closeDetails() {
    setSelected(null);
  }

  function handlePay() {
    if (cart.length === 0) return;
    saveOrderToHistory(cart);
    setCart([]); // очищаем корзину
    setCartOpen(false);
    setShowPaid(true);
    setTimeout(() => setShowPaid(false), 2000);
  }

  return (
    <div className="relative">
      {/* Cart icon top right */}
      <button
        className="absolute right-4 top-2 z-10 bg-accent2 hover:bg-green text-mainbg rounded-full w-12 h-12 flex items-center justify-center shadow-xl border-2 border-accent2 active:scale-95"
        onClick={() => setCartOpen(!cartOpen)}
        tabIndex={0}
        aria-label="Открыть корзину"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35-2.7m0 0L5.4 5M7 13L5.4 5m12.2 8l1.35-2.7m0 0L18.6 5m-1.35 2.7L18.6 5" />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink rounded-full px-2 py-0.5 text-xs font-bold text-white">{cart.length}</span>
        )}
      </button>
      {/* Аватар пользователя */}
      <div className="absolute left-4 top-2 z-10">
        <img
          src={user?.photo_url || "https://cdn-icons-png.flaticon.com/512/921/921347.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-accent shadow"
          draggable="false"
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
      </div>
      {/* Сетка товаров */}
      <div className="grid grid-cols-2 gap-4 pt-6 px-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onClick={handleCardClick} addToCart={addToCart} />
        ))}
      </div>
      {/* Детали товара (модалка) */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-30"
            onClick={closeDetails}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-vibebg rounded-2xl shadow-2xl p-7 max-w-xs w-full relative"
              initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={selected.img} alt={selected.title} className="w-32 h-32 mx-auto mb-3 rounded-xl select-none" draggable="false" />
              <div className="text-xl font-bold text-white text-center mb-2 select-none">{selected.title}</div>
              <div className="text-gray-300 text-center mb-2 select-none">{selected.desc}</div>
              <div className="text-lg text-accent text-center mb-4 font-semibold select-none">₽ {selected.price}</div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full bg-accent2 hover:bg-green text-mainbg rounded-xl px-4 py-2 text-base font-bold transition active:scale-95 shadow"
                onClick={() => { addToCart(selected); closeDetails(); }}>
                В корзину
              </motion.button>
              <button className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl active:scale-90" onClick={closeDetails}>&times;</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Корзина */}
      <AnimatePresence>
        {cartOpen && <Cart items={cart} onClose={() => setCartOpen(false)} onPay={handlePay} />}
      </AnimatePresence>
      {/* Уведомление об оплате */}
      <AnimatePresence>
        {showPaid && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green text-mainbg px-8 py-4 rounded-2xl shadow-xl z-50 text-lg font-bold"
          >
            Оплата прошла! Заказ в истории.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
