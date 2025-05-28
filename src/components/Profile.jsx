import { useState } from "react";

// Тестовые данные (можно заменить под API)
const avatar = "https://cdn-icons-png.flaticon.com/512/921/921347.png";
const username = "Dertyimj";
const inventory = [
  {
    id: 1,
    title: "Swiss Watch",
    img: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
  },
  {
    id: 2,
    title: "Sakura Flower",
    img: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
  },
];
const orders = [
  {
    id: 1,
    title: "Spy Agaric",
    img: "https://cdn-icons-png.flaticon.com/512/6579/6579083.png",
    status: "В пути",
    buy_time: "2024-05-28 12:00",
    eta: "2-3 дня",
  },
];

export default function Profile() {
  const [active, setActive] = useState("inventory");

  return (
    <div className="max-w-md mx-auto pt-2">
      {/* Аватар и ник */}
      <div className="flex flex-col items-center mb-5">
        <img src={avatar} className="w-20 h-20 rounded-full mb-2 border-4 border-blue-400 shadow-xl" alt="avatar" />
        <div className="font-bold text-white text-lg">{username}</div>
      </div>
      {/* Вкладки */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-xl font-bold mx-1 transition ${active === "inventory" ? "bg-blue-500 text-white" : "bg-[#292a35] text-gray-300"}`}
          onClick={() => setActive("inventory")}
        >
          Инвентарь
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-bold mx-1 transition ${active === "orders" ? "bg-blue-500 text-white" : "bg-[#292a35] text-gray-300"}`}
          onClick={() => setActive("orders")}
        >
          Заказы
        </button>
      </div>
      {/* Контент вкладок */}
      {active === "inventory" ? (
        <div>
          {inventory.length === 0 ? (
            <div className="text-gray-400 text-center mt-8">Инвентарь пуст</div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {inventory.map((item) => (
                <div key={item.id} className="bg-[#30313a] rounded-2xl shadow-xl p-4 flex flex-col items-center">
                  <img src={item.img} className="w-16 h-16 mb-2 rounded-xl" alt={item.title} />
                  <div className="font-bold text-white text-base">{item.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {orders.length === 0 ? (
            <div className="text-gray-400 text-center mt-8">Нет заказов в пути</div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-[#30313a] rounded-2xl shadow-xl p-4 flex items-center">
                  <img src={order.img} className="w-14 h-14 mr-3 rounded-xl" alt={order.title} />
                  <div>
                    <div className="font-bold text-white">{order.title}</div>
                    <div className="text-xs text-gray-400">
                      {order.buy_time} • ETA: {order.eta}
                    </div>
                    <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
