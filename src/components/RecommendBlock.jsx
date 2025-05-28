export default function RecommendBlock({ recommend }) {
  return (
    <div className="mt-6 bg-darkglow/80 rounded-2xl p-4 shadow-glow">
      <div className="font-bold text-accent2 mb-2 flex items-center gap-2">
        <FaHeart className="text-pink" /> Вам может понравиться:
      </div>
      <div className="flex gap-3">
        {recommend.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center bg-cardbg p-3 rounded-xl w-28 shadow-glow">
            <img src={item.img} className="w-10 h-10 mb-1 rounded-lg" alt={item.title} />
            <div className="text-white font-bold text-xs text-center">{item.title}</div>
            <div className="text-accent text-sm">{item.price}₽</div>
          </div>
        ))}
      </div>
    </div>
  );
}
