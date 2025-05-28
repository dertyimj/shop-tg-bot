import { useState } from "react";
import items from "../data/items";
import ItemCard from "./ItemCard";
import Cart from "./Cart";

export default function Shop() {
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(item) {
    setCart([...cart, item]);
  }

  function handleCardClick(item) {
    setSelected(item);
  }

  function closeDetails() {
    setSelected(null);
  }

  return (
    <div className="relative">
      {/* Cart icon top right */}
      <button
        className="absolute right-4 top-2 z-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        onClick={() => setCartOpen(!cartOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35-2.7m0 0L5.4 5M7 13L5.4 5m12.2 8l1.35-2.7m0 0L18.6 5m-1.35 2.7L18.6 5" />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 rounded-full px-2 py-0.5 text-xs">{cart.length}</span>
        )}
      </button>
      {/* Item cards */}
      <div className="grid grid-cols-2 gap-4 pt-4 px-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onClick={handleCardClick} addToCart={addToCart} />
        ))}
      </div>
      {/* Item details modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-30" onClick={closeDetails}>
          <div className="bg-[#28293b] rounded-2xl shadow-2xl p-6 max-w-xs w-full relative" onClick={e => e.stopPropagation()}>
            <img src={selected.img} alt={selected.title} className="w-32 h-32 mx-auto mb-3 rounded-xl" />
            <div className="text-xl font-bold text-white text-center mb-2">{selected.title}</div>
            <div className="text-gray-300 text-center mb-2">{selected.desc}</div>
            <div className="text-lg text-blue-400 text-center mb-4 font-semibold">₽ {selected.price}</div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 text-base transition"
              onClick={() => { addToCart(selected); closeDetails(); }}>
              В корзину
            </button>
            <button className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl" onClick={closeDetails}>&times;</button>
          </div>
        </div>
      )}
      {/* Cart modal */}
      {cartOpen && <Cart items={cart} onClose={() => setCartOpen(false)} />}
    </div>
  );
}
