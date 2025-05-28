import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCrown, FaGift, FaHistory, FaCheck, FaStar, FaUsers, FaEdit, FaTrophy, FaArrowDown, FaMedal, FaAngleDown, FaUserEdit, FaKey, FaTelegramPlane, FaBell } from "react-icons/fa";
import OrderHistory from "./OrderHistory";
import SupportChat from "./SupportChat";
import LevelUpModal from "./LevelUpModal";
import BadgeGallery from "./BadgeGallery";
import AchievementFeed from "./AchievementFeed";
import ReferralCard from "./ReferralCard";
import EditProfileModal from "./EditProfileModal";
import { getLevel, getProgress, getAchievements, getBadges, getNextReward, saveProfile, getProfile } from "../utils/profileUtils";

export default function Profile({ user }) {
  const [activeTab, setActiveTab] = useState("inventory");
  const [profile, setProfile] = useState(getProfile(user));
  const [showEdit, setShowEdit] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [achievements, setAchievements] = useState(getAchievements(user));
  const [badges, setBadges] = useState(getBadges(user));
  const [progress, setProgress] = useState(getProgress(user));
  const [nextReward, setNextReward] = useState(getNextReward(user));
  const [referralModal, setReferralModal] = useState(false);

  // Анимация увеличения уровня
  useEffect(() => {
    if (profile.lvlUp) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3500);
      setProfile(p => ({ ...p, lvlUp: false }));
    }
  }, [profile.lvlUp]);

  // Сохранение профиля
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  // Tab контент
  function renderTab() {
    if (activeTab === "inventory") {
      return (
        <div>
          <h3 className="font-bold text-accent text-lg mb-2 flex items-center">
            <FaGift className="mr-2" /> Мои товары
          </h3>
          <InventoryGrid user={user} />
        </div>
      );
    }
    if (activeTab === "orders") {
      return <OrderHistory user={user} />;
    }
    if (activeTab === "feed") {
      return <AchievementFeed user={user} />;
    }
    if (activeTab === "badges") {
      return <BadgeGallery badges={badges} />;
    }
    if (activeTab === "referrals") {
      return <ReferralCard user={user} />;
    }
    return null;
  }

  return (
    <div className="relative w-full min-h-screen pb-28">
      {/* Аватар, имя, уровень */}
      <div className="flex items-center px-5 pt-6 pb-3 border-b-2 border-accent2 bg-cardbg/80 rounded-b-3xl shadow-glow">
        <img
          src={profile?.avatar || user?.photo_url || "https://cdn-icons-png.flaticon.com/512/921/921347.png"}
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-accent2 shadow-glow glow mr-4 object-cover"
          draggable="false"
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-xl text-white">{profile?.name || user?.first_name || "User"}</h2>
            {profile?.level > 3 && <FaCrown className="text-accent2 text-xl glow" title="PRO Level" />}
            {profile?.verified && <FaCheck className="text-green-400" title="Профиль подтверждён" />}
            <button className="ml-2 bg-accent2 text-mainbg px-2 py-1 rounded-xl shadow-glow font-bold text-sm hover:bg-accent"
              onClick={() => setShowEdit(true)}
            >
              <FaEdit />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-accent2 font-bold text-lg">LVL {profile?.level || 1}</span>
            <ProgressBar value={progress} />
            <span className="text-xs text-gray-400">{progress}%</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {profile.status || "Новичок"}
          </div>
        </div>
        <div>
          <button
            className="bg-accent2 text-mainbg w-10 h-10 rounded-xl shadow-glow flex items-center justify-center text-2xl"
            onClick={() => setShowSupport(true)}
            title="Чат поддержки"
          >
            <FaTelegramPlane />
          </button>
        </div>
      </div>

      {/* Кнопки вкладок */}
      <div className="flex gap-2 mt-6 px-3 justify-center">
        <button
          className={`py-2 px-4 rounded-2xl font-bold ${activeTab === "inventory" ? "bg-accent text-mainbg shadow-glow" : "bg-darkglow text-accent2"}`}
          onClick={() => setActiveTab("inventory")}
        ><FaGift className="inline mr-1" />Инвентарь</button>
        <button
          className={`py-2 px-4 rounded-2xl font-bold ${activeTab === "orders" ? "bg-accent text-mainbg shadow-glow" : "bg-darkglow text-accent2"}`}
          onClick={() => setActiveTab("orders")}
        ><FaHistory className="inline mr-1" />Заказы</button>
        <button
          className={`py-2 px-4 rounded-2xl font-bold ${activeTab === "feed" ? "bg-accent text-mainbg shadow-glow" : "bg-darkglow text-accent2"}`}
          onClick={() => setActiveTab("feed")}
        ><FaStar className="inline mr-1" />Лента</button>
        <button
          className={`py-2 px-4 rounded-2xl font-bold ${activeTab === "badges" ? "bg-accent text-mainbg shadow-glow" : "bg-darkglow text-accent2"}`}
          onClick={() => setActiveTab("badges")}
        ><FaMedal className="inline mr-1" />Бейджи</button>
        <button
          className={`py-2 px-4 rounded-2xl font-bold ${activeTab === "referrals" ? "bg-accent text-mainbg shadow-glow" : "bg-darkglow text-accent2"}`}
          onClick={() => setActiveTab("referrals")}
        ><FaUsers className="inline mr-1" />Рефералы</button>
      </div>

      {/* Блок “достижение дня” и промо */}
      <motion.div
        className="mt-6 mx-4 p-4 rounded-2xl bg-gradient-to-br from-accent/30 to-pink/20 shadow-glow flex items-center gap-4"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      >
        <FaTrophy className="text-yellow-300 text-4xl" />
        <div>
          <div className="font-bold text-accent2">Достижение дня:</div>
          <div className="text-white">{achievements[0]?.title || "Сделай первую покупку!"}</div>
        </div>
        <button className="ml-auto bg-accent2 text-mainbg px-4 py-2 rounded-xl shadow-glow font-bold hover:bg-accent"
          onClick={() => setShowFeed(true)}
        >Лента</button>
      </motion.div>

      {/* Контент вкладки */}
      <div className="p-4">{renderTab()}</div>

      {/* Быстрые действия: подарки, прокачка, support */}
      <div className="fixed bottom-16 left-0 w-full flex gap-4 px-6 justify-center items-center">
        <button
          className="bg-pink text-white px-5 py-3 rounded-2xl font-bold shadow-glow flex items-center gap-2 hover:bg-accent2 hover:text-mainbg"
          onClick={() => setShowBadges(true)}
        ><FaMedal /> Галерея бейджей</button>
        <button
          className="bg-accent text-mainbg px-5 py-3 rounded-2xl font-bold shadow-glow flex items-center gap-2 hover:bg-accent2"
          onClick={() => setShowLevelUp(true)}
        ><FaStar /> LVL-UP</button>
        <button
          className="bg-accent2 text-mainbg px-4 py-3 rounded-2xl font-bold shadow-glow flex items-center gap-2 hover:bg-accent"
          onClick={() => setShowSupport(true)}
        ><FaBell /> Support</button>
      </div>

      {/* Модальные окна */}
      <AnimatePresence>
        {showEdit && (
          <EditProfileModal
            profile={profile}
            setProfile={setProfile}
            onClose={() => setShowEdit(false)}
          />
        )}
        {showSupport && (
          <SupportChat user={user} onClose={() => setShowSupport(false)} />
        )}
        {showLevelUp && (
          <LevelUpModal user={user} onClose={() => setShowLevelUp(false)} />
        )}
        {showBadges && (
          <BadgeGallery badges={badges} onClose={() => setShowBadges(false)} />
        )}
        {showFeed && (
          <AchievementFeed user={user} onClose={() => setShowFeed(false)} />
        )}
        {referralModal && (
          <ReferralCard user={user} onClose={() => setReferralModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Заглушки компонентов, для наглядности – вставьте свои или копируйте эти как старт.
function ProgressBar({ value }) {
  return (
    <div className="h-3 w-32 rounded-full bg-gray-800 shadow-glow relative mx-2">
      <div
        className="absolute h-3 rounded-full bg-accent"
        style={{ width: `${Math.max(5, value)}%`, minWidth: "14px" }}
      ></div>
    </div>
  );
}

function InventoryGrid({ user }) {
  // Здесь список купленных товаров пользователя
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const items = [];
  orders.forEach(order => order.items.forEach(item => items.push(item)));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.length === 0 ? (
        <div className="col-span-2 text-accent2 font-bold text-center">Нет купленных товаров</div>
      ) : (
        items.map((item, i) => (
          <div key={i} className="bg-darkglow p-3 rounded-xl shadow-glow flex flex-col items-center">
            <img src={item.img} className="w-14 h-14 mb-1 rounded-xl glow" alt={item.title} />
            <span className="text-white font-bold text-center">{item.title}</span>
            <span className="text-accent text-xs">{item.price}₽</span>
          </div>
        ))
      )}
    </div>
  );
}
