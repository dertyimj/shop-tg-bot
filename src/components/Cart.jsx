import { motion } from "framer-motion";

export default function Cart({ items, onClose, onPay }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex justify-center items-end z-40"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-vibebg w-full rounded-t-2xl p-5 max-w-md mx-auto shadow-2xl border-t-4 border-accent"
        onClick={e => e.stopPropagation()}
        initial={{ y: 150 }}
        animate={{ y: 0 }}
        exit={{ y: 200, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg text-white font-bold select-none">Корзина</h3>
          <button className="text-gray-300 hover:text-white text-2xl active:scale-90" onClick={onClose}>&times;</button>
        </div>
        {items.length === 0 ? (
          <div className="text-gray-400 text-center py-8 select-none">Корзина пуста</div>
        ) : (
          <div>
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-[#373856] py-2 select-none">
                <span className="text-white">{item.title}</span>
                <span className="text-accent2 font-bold">₽ {item.price}</span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 font-bold text-accent text-lg select-none">
              <span>Итого:</span>
              <span>₽ {total}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full mt-4 bg-accent2 hover:bg-green text-mainbg font-bold rounded-xl px-4 py-3 text-base transition active:scale-95 shadow-md"
              onClick={onPay}
            >
              Оплатить
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
