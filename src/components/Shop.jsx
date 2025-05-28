import { useState, useEffect, useMemo } from "react";
import itemsData from "../data/items";
import ItemCard from "./ItemCard";
import Cart from "./Cart";
import BannerSlider from "./BannerSlider";
import QuestBar from "./QuestBar";
import { AnimatePresence, motion } from "framer-motion";
import Onboarding from "./Onboarding";
import ChatWidget from "./ChatWidget";
import PromoPopup from "./PromoPopup";
import SortMenu from "./SortMenu";
import SearchInput from "./SearchInput";
import ProgressBar from "./ProgressBar";
import { FaHeart, FaRegHeart, FaSortAlphaDown, FaSortAmountDown, FaStar } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { AiOutlineReload } from "react-icons/ai";
import { BiGift } from "react-icons/bi";

// Константы фильтров и категорий
const categories = [
  "all",
  "часы",
  "аксессуары",
  "мемы",
  "электроника",
  "редкое",
  "подарки",
  "скидки",
  "бонусы"
];

const SORTS = [
  { value: "new", label: "Сначала новые", icon: <FaStar /> },
  { value: "cheap", label: "Дешевле", icon: <FaSortAmountDown /> },
  { value: "expensive", label: "Дороже", icon: <FaSortAlphaDown /> },
  { value: "popular", label: "Популярные", icon: <FaHeart /> }
];

// Сервисные хуки (localStorage)
function getFavIds() {
  return JSON.parse(localStorage.getItem("fav") || "[]");
}
function setFavIds(arr) {
  localStorage.setItem("fav", JSON.stringify(arr));
}

export default function Shop({ user }) {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [onboarding, setOnboarding] = useState(true);
  const [search, setSearch] = useState("");
  const [showPaid, setShowPaid] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [sort, setSort] = useState("new");
  const [fav, setFav] = useState(getFavIds());
  const [showSort, setShowSort] = useState(false);

  // Логика сортировки и фильтрации
  const filtered = useMemo(() => {
    let arr = itemsData.filter(item =>
      (category === "all" || item.category === category || (category === "скидки" && item.discount > 0)) &&
      (search === "" || item.title.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort === "cheap") arr.sort((a, b) => a.price - b.price);
    else if (sort === "expensive") arr.sort((a, b) => b.price - a.price);
    else if (sort === "popular") arr.sort((a, b) => b.popularity - a.popularity);
    else arr.sort((a, b) => b.id - a.id); // new first
    return arr;
  }, [category, search, sort]);

  // Онбординг (1 раз)
  useEffect(() => {
    if (window.localStorage.getItem("ds-onboarded")) setOnboarding(false);
  }, []);

  const handleOnboardFinish = () => {
    setOnboarding(false);
    window.localStorage.setItem("ds-onboarded", "1");
    setShowPromo(true);
  };

  // Корзина в localStorage
  useEffect(() => {
    const lsCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (lsCart.length > 0) setCart(lsCart);
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Добавить в корзину
  function addToCart(item) {
    setCart([...cart, item]);
  }
  // Удалить из корзины
  function removeFromCart(idx) {
    setCart(cart.filter((_, i) => i !== idx));
  }
  // Очистить корзину
  function clearCart() {
    setCart([]);
  }
  // Оплата заказа
  function handlePay() {
    if (cart.length === 0) return;
    const order = {
      id: Date.now(),
      items: cart,
      createdAt: Date.now(),
      status: "В пути"
    };
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    setCart([]);
    setCartOpen(false);
    setShowPaid(true); setTimeout(() => setShowPaid(false), 2400);
  }
  // Открыть/закрыть корзину
  function toggleCart() { setCartOpen(c => !c); }

  // Добавить/убрать избранное
  function toggleFav(id) {
    let arr = fav.includes(id) ? fav.filter(f => f !== id) : [...fav, id];
    setFav(arr); setFavIds(arr);
  }

  // Сбросить фильтры
  function resetFilters() {
    setCategory("all"); setSort("new"); setSearch("");
  }

  // Отметка купленного (анимация прогресса)
  const purchasedIds = useMemo(() => {
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    let ids = [];
    orders.forEach(order => order.items.forEach(item => ids.push(item.id)));
    return ids;
  }, [showPaid, onboarding, cart]);

  return (
    <div className="relative min-h-[92vh] pb-16">
      {/* Onboarding */}
      <AnimatePresence>{onboarding && <Onboarding onFinish={handleOnboardFinish} />}</AnimatePresence>
      {/* Баннер промо-попап */}
      <PromoPopup open={showPromo} onClose={() => setShowPromo(false)} />
      {/* Кнопки корзины/аватара */}
      <motion.div className="absolute left-4 top-2 z-10 flex items-center"
        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <img
          src={user?.photo_url || "https://cdn-icons-png.flaticon.com/512/921/921347.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-accent2 shadow-glow glow"
          draggable="false"
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
        <span className="ml-2 text-lg font-bold text-accent2">{user?.first_name || "Гость"}</span>
      </motion.div>
      <motion.button
        className="absolute right-4 top-2 z-10 bg-darkglow/70 hover:bg-accent text-accent2 rounded-full w-12 h-12 flex items-center justify-center shadow-glow border-2 border-accent2 active:scale-95 glow"
        onClick={toggleCart}
        tabIndex={0}
        aria-label="Открыть корзину"
        whileTap={{ scale: 0.93 }}
        style={{ boxShadow: "0 0 12px #00fff7cc, 0 0 40px #fff5" }}
      >
        <BiGift size={30} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent rounded-full px-2 py-0.5 text-xs font-bold text-mainbg glow">
            {cart.length}
          </span>
        )}
      </motion.button>
      {/* Баннера, акции, квесты */}
      <BannerSlider />
      <QuestBar user={user} />
      {/* Фильтры */}
      <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 mb-2 scrollbar-hide">
        <button
          onClick={resetFilters}
          className="px-2 py-1 rounded-xl font-bold text-xs border bg-darkglow text-accent2 border-[#1a1a2c] hover:bg-accent hover:text-mainbg transition"
        ><AiOutlineReload />Сбросить</button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-2xl font-bold text-sm border-2 ${category === cat ? "bg-accent text-mainbg border-accent shadow-glow" : "bg-darkglow text-accent2 border-[#1a1a2c]"}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
        <SearchInput value={search} setValue={setSearch} />
        <button onClick={() => setShowSort(s => !s)} className="ml-2 bg-accent2 text-mainbg px-3 py-1 rounded-xl border-accent border-2 font-bold flex items-center gap-2 shadow-glow">
          <FiFilter /> <span>Сортировка</span>
        </button>
      </div>
      <AnimatePresence>
        {showSort && (
          <SortMenu sort={sort} setSort={setSort} onClose={() => setShowSort(false)} />
        )}
      </AnimatePresence>
      <ProgressBar progress={Math.min((purchasedIds.length / itemsData.length) * 100, 100)} />
      {/* Каталог товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2 px-2 pb-5">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center text-accent2 text-lg font-bold mt-5">Ничего не найдено</div>
        ) : filtered.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onClick={setSelected}
            addToCart={addToCart}
            fav={fav.includes(item.id)}
            onFav={() => toggleFav(item.id)}
            isPurchased={purchasedIds.includes(item.id)}
          />
        ))}
      </div>
      {/* Детали товара */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-30"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-cardbg rounded-2xl shadow-glow p-8 max-w-xs w-full relative border-2 border-accent2"
              initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={selected.img} alt={selected.title} className="w-32 h-32 mx-auto mb-3 rounded-xl select-none glow" draggable="false" />
              <div className="text-xl font-bold text-white text-center mb-2 select-none">{selected.title}</div>
              <div className="text-gray-200 text-center mb-2 select-none">{selected.desc}</div>
              {selected.discount > 0 && (
                <div className="text-lg font-bold text-pink text-center mb-1">-{selected.discount}% скидка!</div>
              )}
              <div className="text-lg text-accent text-center mb-4 font-semibold select-none">
                ₽ {Math.round(selected.price * (1 - selected.discount / 100))}
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full bg-accent hover:bg-accent2 hover:text-mainbg text-mainbg rounded-xl px-4 py-2 text-base font-bold transition active:scale-95 glow-btn mt-2"
                onClick={() => { addToCart(selected); setSelected(null); }}>
                В корзину
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-2 w-full bg-darkglow text-accent2 font-bold rounded-xl px-4 py-2 border border-accent2 hover:bg-accent2 hover:text-mainbg transition"
                onClick={() => { toggleFav(selected.id); }}
              >
                {fav.includes(selected.id) ? <FaHeart className="inline text-pink mr-1" /> : <FaRegHeart className="inline mr-1" />}
                {fav.includes(selected.id) ? "В избранном" : "В избранное"}
              </motion.button>
              <button className="absolute top-2 right-2 text-accent2 hover:text-accent text-2xl active:scale-90" onClick={() => setSelected(null)}>&times;</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Корзина */}
      <AnimatePresence>
        {cartOpen && <Cart items={cart} onClose={() => setCartOpen(false)} onPay={handlePay} remove={removeFromCart} clear={clearCart} />}
      </AnimatePresence>
      {/* Уведомление об оплате */}
      <AnimatePresence>
        {showPaid && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-accent text-mainbg px-8 py-4 rounded-2xl shadow-glow z-50 text-lg font-bold glow"
          >
            Оплата прошла! Заказ добавлен в историю.
          </motion.div>
        )}
      </AnimatePresence>
      {/* Встроенный чат поддержки */}
      <ChatWidget />
    </div>
  );
}
