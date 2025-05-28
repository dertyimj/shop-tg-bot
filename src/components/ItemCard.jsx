export default function ItemCard({ item, onClick, addToCart }) {
  return (
    <div
      className="bg-[#30313a] rounded-2xl shadow-xl p-4 flex flex-col items-center cursor-pointer transition hover:scale-105"
      onClick={() => onClick(item)}
    >
      <img src={item.img} alt={item.title} className="w-20 h-20 object-contain mb-3 rounded-xl" />
      <div className="font-bold text-white text-base mb-1">{item.title}</div>
      <div className="text-sm text-gray-300 mb-2">₽ {item.price}</div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-1 mt-1"
        onClick={e => { e.stopPropagation(); addToCart(item); }}>
        В корзину
      </button>
    </div>
  );
}
