import { useState } from "react";
import BottomNav from "./components/BottomNav";
import Shop from "./components/Shop";
import Roulette from "./components/Roulette";
import Profile from "./components/Profile";

export default function App() {
  const [activeTab, setActiveTab] = useState("shop");

  return (
    <div className="min-h-screen bg-mainbg pt-4 pb-20">
      {activeTab === "shop" && <Shop />}
      {activeTab === "roulette" && <Roulette />}
      {activeTab === "profile" && <Profile />}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
