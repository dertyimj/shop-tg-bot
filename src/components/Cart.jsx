export default function Cart({ items, onClose }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-end z-40" onClick={onClose}>
      <div className="bg-[#2c2d3c] w-full rounded-t-2xl p-5 max-w-md mx-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg text-white font-bold">Корзина</h3>
          <button className="text-gray-300 hover:text-white text-2xl" onClick={onClose}>&times;</button>
        </div>
        {items.length === 0 ? (
          <div className="text-gray-400 text-center py-8">Корзина пуста</div>
        ) : (
          <div>
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-[#373856] py-2">
                <span className="text-white">{item.title}</span>
                <span className="text-gray-300">₽ {item.price}</span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 font-bold text-blue-400 text-lg">
              <span>Итого:</span>
              <span>₽ {total}</span>
            </div>
            <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-2">Оформить заказ</button>
          </div>
        )}
      </div>
    </div>
  );
}
