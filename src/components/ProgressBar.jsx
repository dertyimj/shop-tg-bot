export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-3 rounded-full bg-[#181820] my-3 shadow-glow relative">
      <div
        className="absolute h-3 rounded-full bg-accent shadow-glow"
        style={{ width: `${Math.max(8, progress)}%`, minWidth: "14px" }}
      ></div>
    </div>
  );
}
