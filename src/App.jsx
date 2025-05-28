import { useEffect, useState } from "react";
import Shop from "./components/Shop";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import { FaStore, FaDice, FaUserCircle } from "react-icons/fa";

export default function App() {
  const [page, setPage] = useState("shop");
  const [user, setUser] = useState({});

  useEffect(() => {
    // Для Telegram WebApp: window.Telegram.WebApp.initDataUnsafe.user
    const tg = window?.Telegram?.WebApp?.initDataUnsafe?.user;
    setUser(tg || {
      id: 1,
      first_name: "DertyBoss",
      photo_url: "https://cdn-icons-png.flaticon.com/512/921/921347.png"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#181820] to-[#24243c] relative">
      <div className="max-w-xl mx-auto">
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-cardbg/90 backdrop-blur-2xl w-full max-w-xl px-2 py-3 flex justify-between items-center border-t-2 border-accent2 z-40 rounded-t-3xl shadow-glow">
          <button className={`flex-1 flex flex-col items-center ${page === "shop" ? "text-accent2" : "text-accent"}`} onClick={() => setPage("shop")}>
            <FaStore size={32} />
            <span className="text-xs font-bold">Магазин</span>
          </button>
          <button className={`flex-1 flex flex-col items-center ${page === "leaderboard" ? "text-accent2" : "text-accent"}`} onClick={() => setPage("leaderboard")}>
            <FaDice size={32} />
            <span className="text-xs font-bold">Рулетка</span>
          </button>
          <button className={`flex-1 flex flex-col items-center ${page === "profile" ? "text-accent2" : "text-accent"}`} onClick={() => setPage("profile")}>
            <FaUserCircle size={32} />
            <span className="text-xs font-bold">Профиль</span>
          </button>
        </nav>
        <div className="pt-4 pb-24">
          {page === "shop" && <Shop user={user} />}
          {page === "profile" && <Profile user={user} />}
          {page === "leaderboard" && <Leaderboard user={user} />}
        </div>
      </div>
    </div>
  );
}
