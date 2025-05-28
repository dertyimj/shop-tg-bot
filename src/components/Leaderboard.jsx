import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCrown, FaStar, FaMedal, FaTrophy, FaUserAlt, FaArrowRight } from "react-icons/fa";

const mockLeaderboard = [
  {
    uid: 111,
    name: "DertyBoss",
    avatar: "https://cdn-icons-png.flaticon.com/512/921/921347.png",
    points: 2045,
    position: 1,
    isMe: true,
    badges: ["PRO", "VIP"]
  },
  {
    uid: 112,
    name: "CoolBuyer",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    points: 1800,
    position: 2,
    badges: ["VIP"]
  },
  {
    uid: 113,
    name: "Anon",
    avatar: "https://cdn-icons-png.flaticon.com/512/2596/2596128.png",
    points: 1743,
    position: 3,
    badges: ["PRO"]
  },
  {
    uid: 114,
    name: "User2024",
    avatar: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
    points: 1292,
    position: 4,
    badges: []
  },
  {
    uid: 115,
    name: "LuckyBuyer",
    avatar: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
    points: 1103,
    position: 5,
    badges: []
  },
];

function getBadgeIcon(b) {
  if (b === "VIP") return <FaCrown className="text-yellow-300" />;
  if (b === "PRO") return <FaStar className="text-accent" />;
  return <FaMedal className="text-pink" />;
}

export default function Leaderboard({ user }) {
  const [data, setData] = useState(mockLeaderboard);

  // Можно добавить динамическое обновление с API или localStorage
  useEffect(() => {
    // Example: fetch from API/localStorage if exists
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 px-4">
      <motion.h2
        className="text-3xl font-extrabold text-center text-accent2 mb-7 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}
      >
        <FaTrophy className="text-yellow-300" /> ТОП-5 Покупателей
      </motion.h2>
      <div className="bg-cardbg rounded-3xl shadow-glow p-2 mb-6 border-2 border-accent2">
        {data.map((u, idx) => (
          <motion.div
            key={u.uid}
            className={`flex items-center py-3 px-3 rounded-xl mb-2 gap-3
              ${u.isMe ? "bg-accent/20 shadow-glow scale-105" : "bg-darkglow/60"}
              ${idx === 0 && "border-2 border-yellow-400"}`}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
          >
            <span className="text-2xl font-black text-accent2 w-8 text-center">{u.position}</span>
            <div className="relative">
              <img src={u.avatar} className="w-14 h-14 rounded-full border-4 border-accent2 shadow-lg object-cover" />
              {idx === 0 && <FaCrown className="absolute -top-3 -right-3 text-yellow-300 text-3xl animate-bounce" />}
            </div>
            <div className="flex-1">
              <div className="font-extrabold text-lg text-white flex items-center">
                {u.name} {u.isMe && <span className="text-pink text-xs ml-2 bg-white/10 px-2 rounded-xl font-bold animate-pulse">Вы</span>}
              </div>
              <div className="text-accent text-sm flex items-center gap-2">
                {u.badges.map(b => (
                  <span key={b} className="ml-1">{getBadgeIcon(b)}</span>
                ))}
              </div>
            </div>
            <div className="text-lg font-bold text-accent text-right flex flex-col items-end">
              <span>{u.points} pts</span>
              {u.position === 1 && <span className="text-xs text-yellow-200 font-bold">Лидер!</span>}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <button className="bg-accent text-mainbg font-bold rounded-2xl px-6 py-3 text-lg shadow-glow glow-btn hover:bg-accent2 hover:text-accent transition-all active:scale-95 flex items-center gap-2 mx-auto">
          <FaArrowRight /> Как попасть в ТОП?
        </button>
      </div>
      <div className="mt-5 text-center text-xs text-gray-400">
        Обновление раз в сутки. Покупай чаще — увеличивай свой ранг!
      </div>
    </div>
  );
}
