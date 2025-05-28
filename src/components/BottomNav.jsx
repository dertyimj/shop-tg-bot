import { FaStore, FaDice, FaUser } from "react-icons/fa";

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#24252d] flex justify-around items-center py-2 rounded-t-2xl shadow-xl z-50">
      <button
        className={`flex flex-col items-center transition ${activeTab === "shop" ? "text-blue-400" : "text-gray-400"}`}
        onClick={() => setActiveTab("shop")}
      >
        <FaStore size={28} />
        <span className="text-xs mt-1">Магазин</span>
      </button>
      <button
        className={`flex flex-col items-center transition ${activeTab === "roulette" ? "text-blue-400" : "text-gray-400"}`}
        onClick={() => setActiveTab("roulette")}
      >
        <FaDice size={28} />
        <span className="text-xs mt-1">Рулетка</span>
      </button>
      <button
        className={`flex flex-col items-center transition ${activeTab === "profile" ? "text-blue-400" : "text-gray-400"}`}
        onClick={() => setActiveTab("profile")}
      >
        <FaUser size={28} />
        <span className="text-xs mt-1">Профиль</span>
      </button>
    </nav>
  );
}
