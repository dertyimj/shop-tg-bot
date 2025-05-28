import { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav";
import Shop from "./components/Shop";
import Roulette from "./components/Roulette";
import Profile from "./components/Profile";

export default function App() {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("shop");

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      setUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
  }, []);

  return (
    <div className="min-h-screen bg-mainbg pt-4 pb-20">
      {activeTab === "shop" && <Shop user={user} />}
      {activeTab === "roulette" && <Roulette user={user} />}
      {activeTab === "profile" && <Profile user={user} />}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
