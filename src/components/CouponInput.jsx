import { useState } from "react";
import { FaPercent, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function CouponInput({ applyCoupon, appliedCoupon, clearCoupon }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex gap-2 mt-3 items-center">
      <input
        className="bg-darkglow text-accent2 px-3 py-2 rounded-xl border border-accent2 outline-none w-40 font-bold"
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder="Промокод"
        disabled={!!appliedCoupon}
      />
      <button
        className="bg-accent2 text-mainbg px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-glow active:scale-95"
        disabled={!!appliedCoupon}
        onClick={() => { applyCoupon(val); setVal(""); }}
      >
        <FaPercent /> Применить
      </button>
      {appliedCoupon && (
        <button
          className="text-pink bg-pink/20 rounded-full w-8 h-8 flex items-center justify-center ml-1"
          onClick={clearCoupon}
        >
          <FaTimesCircle />
        </button>
      )}
    </div>
  );
}
