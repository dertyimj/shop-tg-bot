import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRegCircle, FaGift, FaStar } from "react-icons/fa";

const QUESTS = [
  {
    id: 1,
    title: "Совершить первую покупку",
    reward: 100,
    done: () => {
      let orders = JSON.parse(localStorage.getItem("orders") || "[]");
      return orders.length > 0;
    },
  },
  {
    id: 2,
    title: "Сделать 3 заказа за день",
    reward: 200,
    done: () => {
      let orders = JSON.parse(localStorage.getItem("orders") || "[]");
      let today = new Date().toDateString();
      let count = orders.filter(o => new Date(o.createdAt).toDateString() === today).length;
      return count >= 3;
    },
  },
  {
    id: 3,
    title: "Добавить 2 товара в избранное",
    reward: 150,
    done: () => {
      let fav = JSON.parse(localStorage.getItem("fav") || "[]");
      return fav.length >= 2;
    },
  },
];

export default function QuestBar() {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setCompleted(QUESTS.filter(q => q.done()).map(q => q.id));
  }, [localStorage.getItem("orders"), localStorage.getItem("fav")]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center my-4 px-2">
      {QUESTS.map((quest, idx) => {
        const done = completed.includes(quest.id);
        return (
          <motion.div
            key={quest.id}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-glow
              ${done ? "bg-accent2/90 text-mainbg" : "bg-darkglow/90 text-white"}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              {done
                ? <FaCheckCircle className="text-accent text-2xl animate-bounce" />
                : <FaRegCircle className="text-accent2 text-2xl" />}
              <div>
                <div className="font-bold">{quest.title}</div>
                <div className="text-accent text-sm flex items-center gap-1">
                  <FaGift />+{quest.reward} бонусов
                </div>
              </div>
            </div>
            <div className="ml-auto">
              <button className={`px-4 py-2 rounded-xl font-bold shadow-glow text-base
                ${done ? "bg-accent text-mainbg" : "bg-darkglow text-accent2 border border-accent2"}`}
                disabled={done}>
                {done ? <span className="flex items-center"><FaStar className="mr-1" /> Получено</span> : "Выполнить"}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
