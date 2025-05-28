import { motion } from "framer-motion";

export default function ItemCard({ item, onClick, addToCart }) {
  return (
    <motion.div
      whileHover={{ scale: 1.045, boxShadow: "0 6px 30px #8f7cff22" }}
      className="bg-cardbg rounded-2xl shadow-card p-4 flex flex-col items-center cursor-pointer transition select-none border-b-4 border-accent2"
      onClick={() => onClick(item)}
      tabIndex={0}
    >
      <img src={item.img} alt={item.title} className="w-20 h-20 object-contain mb-3 rounded-xl pointer-events-none" draggable="false" />
      <div className="font-bold text-white text-base mb-1">{item.title}</div>
      <div className="text-sm text-accent mb-2">₽ {item.price}</div>
      <motion.button
        whileTap={{ scale: 0.94 }}
        className="bg-accent2 hover:bg-green text-mainbg rounded-xl px-4 py-2 mt-1 font-bold transition active:scale-95 shadow"
        onClick={e => { e.stopPropagation(); addToCart(item); }}
        tabIndex={0}
      >
        В корзину
      </motion.button>
    </motion.div>
  );
}
