import { FaStore, FaDice, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const tabs = [
  { key: "shop", label: "Магазин", icon: <FaStore size={26} /> },
  { key: "roulette", label: "Рулетка", icon: <FaDice size={26} /> },
  { key: "profile", label: "Профиль", icon: <FaUser size={26} /> }
];

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-mainbg/90 backdrop-blur-md flex justify-around items-center py-3 rounded-t-2xl shadow-xl z-50 border-t border-[#373c5c]">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className="flex flex-col items-center group relative"
          onClick={() => setActiveTab(tab.key)}
        >
          <motion.div
            animate={{
              scale: activeTab === tab.key ? 1.18 : 1,
              color: activeTab === tab.key ? "#8f7cff" : "#9ca3af",
              y: activeTab === tab.key ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`transition-colors`}
          >
            {tab.icon}
          </motion.div>
          <span className={`text-xs mt-1 font-semibold transition-colors ${activeTab === tab.key ? "text-accent" : "text-gray-400"}`}>
            {tab.label}
          </span>
          {activeTab === tab.key && (
            <motion.div
              layoutId="underline"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-accent2"
            />
          )}
        </button>
      ))}
    </nav>
  );
}
