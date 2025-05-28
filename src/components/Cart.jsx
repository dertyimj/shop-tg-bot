import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaCheckCircle, FaPercent, FaGift, FaCreditCard, FaArrowRight, FaHeart, FaRedo } from "react-icons/fa";
import RecommendBlock from "./RecommendBlock";
import CouponInput from "./CouponInput";
import PaymentModal from "./PaymentModal";
import StatusNotification from "./StatusNotification";
import EasterEgg from "./EasterEgg";

// Примеры купонов
const COUPONS = [
  { code: "WELCOME", discount: 15, text: "Добро пожаловать! -15%" },
  { code: "VIP2024", discount: 30, text: "VIP-скидка -30%" },
];

export default function Cart({ items, onClose, onPay, remove, clear }) {
  const [showPay, setShowPay] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [payStatus, setPayStatus] = useState("init"); // init, success, error
  const [recommend, setRecommend] = useState([]);
  const [easter, setEaster] = useState(false);
  const [autoClose, setAutoClose] = useState(false);

  // Сумма без купона
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  // Сумма с купоном
  const total = appliedCoupon ? Math.round(subtotal * (1 - appliedCoupon.discount / 100)) : subtotal;

  // Рекомендации (top-селлеры или то, что не куплено)
  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("all_items") || "[]");
      const boughtIds = items.map(x => x.id);
      let recs = all.filter(item => !boughtIds.includes(item.id));
      recs = recs.sort(() => Math.random() - 0.5).slice(0, 2);
      setRecommend(recs);
    } catch { }
  }, [items]);

  // Easter egg: “0₽” - бесплатная корзина, шутка
  useEffect(() => {
    if (total === 0 && items.length > 0) setEaster(true);
    else setEaster(false);
  }, [total, items.length]);

  // Автоматическое закрытие после успешной оплаты
  useEffect(() => {
    if (payStatus === "success") {
      setTimeout(() => { setShowStatus(false); setAutoClose(true); onClose(); }, 2200);
    }
  }, [payStatus, onClose]);

  // Применение купона
  function applyCoupon(code) {
    const found = COUPONS.find(c => c.code === code.toUpperCase());
    setAppliedCoupon(found || null);
    setShowStatus(true);
    setPayStatus(found ? "success" : "error");
    setTimeout(() => setShowStatus(false), 1400);
  }

  // Оплата
  function handlePay() {
    setShowPay(true);
  }
  function handleFinishPay(success) {
    setShowPay(false);
    setShowStatus(true);
    setPayStatus(success ? "success" : "error");
    if (success) {
      setTimeout(() => {
        setShowStatus(false); clear(); onPay && onPay();
      }, 1900);
    } else {
      setTimeout(() => setShowStatus(false), 1400);
    }
  }

  // Сброс купона
  function clearCoupon() {
    setAppliedCoupon(null);
  }

  // Динамические анимации
  const cartVariants = {
    hidden: { y: 250, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 150, opacity: 0 }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/75 flex justify-center items-end z-50"
      onClick={() => { if (!autoClose) onClose(); }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-cardbg w-full rounded-t-3xl p-6 max-w-lg mx-auto shadow-glow border-t-4 border-accent2 border-b-2 border-b-accent2"
        onClick={e => e.stopPropagation()}
        variants={cartVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl text-accent2 font-extrabold select-none flex items-center">
            <FaGift className="mr-2" /> Корзина
          </h3>
          <button className="text-accent2 hover:text-accent text-3xl active:scale-90" onClick={onClose}>&times;</button>
        </div>
        {items.length === 0 ? (
          <div className="text-gray-400 text-center py-14 select-none text-lg">
            Ваша корзина пуста
            <div className="mt-3"><FaGift size={30} className="mx-auto text-accent2" /></div>
          </div>
        ) : (
          <div>
            <div className="overflow-y-auto max-h-52 mb-2">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id + idx}
                  className="flex items-center justify-between border-b border-[#28293c] py-2 select-none"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                >
                  <div className="flex items-center gap-2">
                    <img src={item.img} alt={item.title} className="w-10 h-10 rounded-lg glow" />
                    <span className="font-bold text-accent2">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold text-lg">₽ {item.price}</span>
                    <button
                      className="text-red-400 hover:text-pink ml-1"
                      onClick={() => remove(idx)}
                      title="Удалить"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Промокод */}
            <CouponInput applyCoupon={applyCoupon} appliedCoupon={appliedCoupon} clearCoupon={clearCoupon} />
            {/* Суммы */}
            <div className="mt-3 flex flex-col gap-2">
              {appliedCoupon && (
                <div className="flex items-center justify-between bg-pink/20 text-pink rounded-xl px-3 py-2 font-bold">
                  <span><FaPercent className="inline mr-1" /> Промокод: {appliedCoupon.code}</span>
                  <span>-{appliedCoupon.discount}%</span>
                </div>
              )}
              <div className="flex items-center justify-between font-bold text-accent text-lg">
                <span>Итого:</span>
                <span>₽ {total}</span>
              </div>
            </div>
            {/* Кнопки */}
            <div className="mt-4 flex flex-col gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className={`w-full bg-accent text-mainbg font-bold rounded-xl px-4 py-3 text-xl shadow-glow transition-all active:scale-95 glow-btn flex items-center justify-center gap-2
                ${items.length === 0 ? "opacity-60 pointer-events-none" : ""}`}
                onClick={handlePay}
                disabled={items.length === 0}
              >
                <FaCreditCard /> Оплатить
              </motion.button>
              <button
                className="w-full bg-darkglow text-accent2 font-bold rounded-xl px-4 py-2 border border-accent2 hover:bg-accent2 hover:text-mainbg transition flex items-center justify-center gap-2"
                onClick={clear}
                disabled={items.length === 0}
              >
                <FaTrash /> Очистить корзину
              </button>
            </div>
            {/* Easter egg */}
            <AnimatePresence>
              {easter && <EasterEgg />}
            </AnimatePresence>
            {/* Рекомендации */}
            {recommend.length > 0 && (
              <RecommendBlock recommend={recommend} />
            )}
          </div>
        )}
        {/* Статус оплаты */}
        <AnimatePresence>
          {showStatus && (
            <StatusNotification status={payStatus} />
          )}
        </AnimatePresence>
        {/* Оплата */}
        <AnimatePresence>
          {showPay && (
            <PaymentModal total={total} onFinish={handleFinishPay} />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
