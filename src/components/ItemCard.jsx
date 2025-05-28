import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar, FaPercent, FaGift } from "react-icons/fa";

export default function ItemCard({ item, onClick, addToCart, fav, onFav, isPurchased }) {
  // “Товар дня”, скидки, бейджи, приз
  const isDeal = !!item.discount && item.discount > 0;
  const isGift = item.isGift;
  const purchased = isPurchased;

  return (
    <motion.div
      whileHover={{ scale: 1.07, boxShadow: "0 0 30px #00fff7bb, 0 0 120px #fff3" }}
      whileTap={{ scale: 0.97 }}
      className={`relative bg-cardbg rounded-3xl shadow-glow p-5 flex flex-col items-center border-2 border-accent2 select-none transition-all
      ${purchased ? "opacity-60 grayscale pointer-events-none" : ""}`}
      tabIndex={0}
      style={{ userSelect: "none" }}
      onClick={() => !purchased && onClick(item)}
    >
      {/* Бейджи */}
      {isDeal && (
        <div className="absolute left-3 top-3 bg-pink text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-glow animate-pulse">
          <FaPercent className="mr-1" /> -{item.discount}%
        </div>
      )}
      {isGift && (
        <div className="absolute right-3 top-3 bg-accent text-mainbg px-2 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-glow">
          <FaGift className="mr-1" /> Подарок
        </div>
      )}
      {/* Сердечко — фавориты */}
      <button
        className={`absolute right-4 bottom-4 text-2xl transition-all active:scale-90
          ${fav ? "text-pink" : "text-accent2 opacity-70"}`}
        title={fav ? "В избранном" : "В избранное"}
        onClick={e => { e.stopPropagation(); onFav(item.id); }}
      >
        {fav ? <FaHeart /> : <FaRegHeart />}
      </button>
      {/* Фото */}
      <img
        src={item.img}
        alt={item.title}
        className={`w-24 h-24 mb-2 rounded-2xl pointer-events-none shadow-lg glow
          ${purchased ? "opacity-50 grayscale" : ""}`}
        draggable="false"
        style={{ userSelect: "none", pointerEvents: "none" }}
      />
      {/* Название, цена */}
      <div className="font-extrabold text-white text-lg mb-1 select-none text-center">{item.title}</div>
      <div className="text-base text-accent mb-2 select-none text-center">
        {isDeal
          ? <>
              <span className="line-through text-pink/60 text-sm mr-2">{item.price}₽</span>
              <span>₽ {Math.round(item.price * (1 - item.discount / 100))}</span>
            </>
          : <>₽ {item.price}</>
        }
      </div>
      {/* Кнопка “В корзину” / статус */}
      {purchased
        ? (
          <div className="mt-2 text-green-400 font-bold flex items-center gap-2"><FaStar /> Куплено</div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.93 }}
            className="bg-accent hover:bg-accent2 hover:text-mainbg text-mainbg rounded-xl px-5 py-2 mt-2 font-bold transition active:scale-95 shadow-glow glow-btn"
            onClick={e => { e.stopPropagation(); addToCart(item); }}
            tabIndex={0}
            style={{ userSelect: "none" }}
          >
            В корзину
          </motion.button>
        )
      }
      {/* Easter egg: Если супер-товар */}
      {item.id === 42 && (
        <div className="absolute bottom-3 left-3 text-accent2 font-black animate-pulse">Секретный!</div>
      )}
      {/* Прогресс-покупки (геймификация) */}
      {item.progress && (
        <div className="mt-2 w-full h-2 bg-darkglow rounded-full overflow-hidden shadow-inner">
          <div className="h-2 bg-accent rounded-full" style={{ width: `${item.progress}%` }}></div>
        </div>
      )}
    </motion.div>
  );
}
