import { motion } from "framer-motion";

export default function Cart({ items, onClose, onPay }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex justify-center items-end z-40"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-cardbg w-full rounded-t-3xl p-7 max-w-md mx-auto shadow-glow border-t-4 border-accent2 border-b-2 border-b-accent2"
        onClick={e => e.stopPropagation()}
        initial={{ y: 150 }}
        animate={{ y: 0 }}
        exit={{ y: 200, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl text-accent2 font-bold select-none">Корзина</h3>
          <button className="text-accent2 hover:text-accent text-3xl active:scale-90" onClick={onClose}>&times;</button>
        </div>
        {items.length === 0 ? (
          <div className="text-gray-400 text-center py-10 select-none">Корзина пуста</div>
        ) : (
          <div>
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-[#22222b] py-2 select-none">
                <span className="text-white font-medium">{item.title}</span>
                <span className="text-accent font-bold">₽ {item.price}</span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 font-bold text-accent text-lg select-none">
              <span>Итого:</span>
              <span>₽ {total}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className={`w-full mt-6 bg-accent text-mainbg font-bold rounded-xl px-4 py-4 text-xl transition-all active:scale-95 shadow-glow glow-btn ${
                items.length === 0 ? "opacity-60 pointer-events-none" : ""
              }`}
              onClick={onPay}
              disabled={items.length === 0}
            >
              Оплатить
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
