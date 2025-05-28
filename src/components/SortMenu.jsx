import { motion } from "framer-motion";
import { FaSortAmountDown, FaSortAlphaDown, FaStar, FaHeart } from "react-icons/fa";

const sorts = [
  { value: "new", label: "Сначала новые", icon: <FaStar /> },
  { value: "cheap", label: "Дешевле", icon: <FaSortAmountDown /> },
  { value: "expensive", label: "Дороже", icon: <FaSortAlphaDown /> },
  { value: "popular", label: "Популярные", icon: <FaHeart /> },
];

export default function SortMenu({ sort, setSort, onClose }) {
  return (
    <motion.div
      className="absolute left-1/2 top-16 -translate-x-1/2 bg-cardbg p-5 rounded-2xl border-accent2 border-2 shadow-glow flex flex-col z-[60]"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
    >
      <div className="font-bold text-accent2 mb-2 text-center">Сортировка</div>
      {sorts.map(s => (
        <button
          key={s.value}
          className={`flex items-center gap-3 px-4 py-2 rounded-xl font-bold mb-2 w-full
            ${sort === s.value ? "bg-accent text-mainbg" : "bg-darkglow text-accent2"}`}
          onClick={() => { setSort(s.value); onClose(); }}
        >
          {s.icon} {s.label}
        </button>
      ))}
    </motion.div>
  );
}
