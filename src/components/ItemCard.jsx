import { motion } from "framer-motion";

export default function ItemCard({ item, onClick, addToCart }) {
  return (
    <motion.div
      whileHover={{ scale: 1.055, boxShadow: "0 0 26px #00fff7bb, 0 0 64px #fff4" }}
      className="bg-cardbg rounded-3xl shadow-glow p-5 flex flex-col items-center cursor-pointer border-2 border-accent2 select-none transition-all"
      onClick={() => onClick(item)}
      tabIndex={0}
      style={{ userSelect: "none" }}
    >
      <img
        src={item.img}
        alt={item.title}
        className="w-24 h-24 object-contain mb-2 rounded-2xl pointer-events-none glow"
        draggable="false"
        style={{ userSelect: "none", pointerEvents: "none" }}
      />
      <div className="font-extrabold text-white text-lg mb-1 select-none text-center">{item.title}</div>
      <div className="text-base text-accent mb-2 select-none text-center">₽ {item.price}</div>
      <motion.button
        whileTap={{ scale: 0.94 }}
        className="bg-accent hover:bg-accent2 hover:text-mainbg text-mainbg rounded-xl px-5 py-2 mt-2 font-bold transition active:scale-95 shadow-glow glow-btn"
        onClick={e => { e.stopPropagation(); addToCart(item); }}
        tabIndex={0}
        style={{ userSelect: "none" }}
      >
        В корзину
      </motion.button>
    </motion.div>
  );
}
