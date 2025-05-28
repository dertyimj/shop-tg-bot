export default function SearchInput({ value, setValue }) {
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Поиск товаров"
      className="ml-3 bg-[#222] border border-accent2 rounded-xl px-3 py-1 text-accent2 w-32 outline-none focus:border-accent"
      style={{ minWidth: "80px" }}
    />
  );
}
