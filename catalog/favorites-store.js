const KEY = "atrezzo:catalog:favorites:v1";
export function loadFavorites(validIds) {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(data)) return new Set();
    return new Set(data.filter(id => typeof id === "string" && (!validIds || validIds.has(id))));
  } catch { return new Set(); }
}
export function saveFavorites(ids) {
  try { localStorage.setItem(KEY, JSON.stringify([...ids])); return true; }
  catch { return false; }
}
export function listenFavorites(callback) {
  const listener = event => { if (event.key === KEY || event.key === null) callback(); };
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}
