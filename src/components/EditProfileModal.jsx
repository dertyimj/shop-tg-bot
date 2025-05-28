import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaCamera, FaSave } from "react-icons/fa";

export default function EditProfileModal({ profile, setProfile, onClose }) {
  const [name, setName] = useState(profile.name || "");
  const [avatar, setAvatar] = useState(profile.avatar || "");
  const [status, setStatus] = useState(profile.status || "");
  const [saving, setSaving] = useState(false);

  function save() {
    setSaving(true);
    setTimeout(() => {
      setProfile(p => ({
        ...p,
        name: name || p.name,
        avatar: avatar || p.avatar,
        status: status || p.status,
      }));
      setSaving(false);
      onClose();
    }, 1000);
  }

  function handleAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="fixed inset-0 z-[102] bg-black/60 flex items-center justify-center">
      <motion.div
        className="bg-cardbg p-8 rounded-3xl border-accent2 border-2 shadow-glow w-[420px] relative"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
      >
        <button className="absolute top-3 right-4 text-pink text-2xl" onClick={onClose}>&times;</button>
        <div className="text-xl font-bold text-accent2 mb-4 flex items-center"><FaUserEdit className="mr-2" /> Редактировать профиль</div>
        <div className="flex flex-col items-center">
          <label className="relative group cursor-pointer">
            <img src={avatar || profile.avatar || "https://cdn-icons-png.flaticon.com/512/921/921347.png"} className="w-24 h-24 rounded-full mb-2 border-4 border-accent2 shadow-glow" />
            <span className="absolute bottom-2 right-2 bg-accent2 text-mainbg rounded-full p-2 shadow-glow opacity-80 group-hover:opacity-100"><FaCamera /></span>
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </label>
          <input
            className="mt-4 px-4 py-2 rounded-xl bg-darkglow text-accent2 border-accent2 border-2 font-bold text-lg w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Имя"
          />
          <input
            className="mt-3 px-4 py-2 rounded-xl bg-darkglow text-accent2 border-accent2 border-2 font-bold text-lg w-full"
            value={status}
            onChange={e => setStatus(e.target.value)}
            placeholder="Статус (о себе)"
            maxLength={32}
          />
          <button
            className="mt-6 bg-accent2 text-mainbg px-7 py-3 rounded-xl font-bold text-lg shadow-glow flex items-center gap-2 hover:bg-accent"
            onClick={save}
            disabled={saving}
          >
            <FaSave /> {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
