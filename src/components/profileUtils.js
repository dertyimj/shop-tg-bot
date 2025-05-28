export function getProfile(user) {
  const local = JSON.parse(localStorage.getItem("profile") || "{}");
  return {
    name: local.name || user?.first_name || "User",
    avatar: local.avatar || user?.photo_url || "https://cdn-icons-png.flaticon.com/512/921/921347.png",
    status: local.status || "",
    level: local.level || 1,
    xp: local.xp || 0,
    verified: local.verified || false,
    lvlUp: false
  };
}
export function saveProfile(profile) {
  localStorage.setItem("profile", JSON.stringify(profile));
}
export function getLevel(profile) {
  // Example: XP = level^2 * 100
  return Math.floor(Math.sqrt((profile.xp || 0) / 100)) + 1;
}
export function getProgress(profile) {
  const lvl = getLevel(profile);
  const next = lvl * lvl * 100;
  const prev = (lvl - 1) * (lvl - 1) * 100;
  const val = ((profile.xp - prev) / (next - prev)) * 100;
  return Math.max(0, Math.min(100, Math.round(val)));
}
export function getAchievements(user) {
  // Mock
  return [
    { title: "Первая покупка", icon: "⭐️" },
    { title: "Топ-10 недели", icon: "🏆" }
  ];
}
export function getBadges(user) {
  // Mock — просто выдать все
  return [1, 2, 3, 4];
}
export function getNextReward(user) {
  return { xp: 500, badge: 2 };
}
