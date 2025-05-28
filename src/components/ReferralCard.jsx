import { motion } from "framer-motion";
import { FaUsers, FaCopy, FaCheck } from "react-icons/fa";
import { useState } from "react";

export default function ReferralCard({ user, onClose }) {
  const [copied, setCopied] = useState(false);
  const code = `DSHOP-${user?.id || "12345"}`;
  const url = `https://t.me/your_bot?start=${code}`;

  function copy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  }

  return (
    <div className="fixed inset-0 z-[101] bg-black/60 flex items-center justify-center">
      <motion.div
        className="bg-cardbg p-8 rounded-3xl border-accent2 border-2 shadow-glow w-[420px] relative"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
      >
        <button className="absolute top-3 right-4 text-pink text-2xl" onClick={onClose}>&times;</button>
        <div className="text-xl font-bold text-accent2 mb-4 flex items-center"><FaUsers className="mr-2" /> Реферальная программа</div>
        <div className="mb-3 text-white">Делитесь ссылкой, приглашайте друзей — получайте бонусы за каждого!</div>
        <div className="flex items-center gap-2 mb-5">
          <input value={url} readOnly className="flex-1 px-4 py-2 bg-darkglow rounded-xl text-accent2 font-bold" />
          <button className="bg-accent2 text-mainbg rounded-xl p-3 shadow-glow" onClick={copy}>
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>
        <div className="text-sm text-accent2">За каждого активного друга — +10% от их первой покупки!</div>
      </motion.div>
    </div>
  );
}
