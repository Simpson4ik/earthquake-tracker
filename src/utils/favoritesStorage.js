const STORAGE_KEY = 'earthquake-tracker:favorites:v1';
const LEGACY_STORAGE_KEY = 'earthquake-tracker:favorites';

function isFavorite(item) {
  return (
    typeof item?.id === 'string' &&
    typeof item.place === 'string' &&
    Number.isFinite(item.time) &&
    Number.isFinite(item.addedAt) &&
    (item.magnitude === null || Number.isFinite(item.magnitude))
  );
}

function toFavoritesList(value) {
  return Array.isArray(value) && value.every(isFavorite) ? value : null;
}

function migrateLegacyFavorites() {
  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (legacy === null) return null;
  localStorage.removeItem(LEGACY_STORAGE_KEY);

  const { ids, entities } = JSON.parse(legacy) ?? {};
  const favorites = Array.isArray(ids) && entities ? toFavoritesList(ids.map((id) => entities[id])) : null;
  if (favorites) writeStoredFavorites(favorites);
  return favorites;
}

export function readStoredFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? migrateLegacyFavorites() : toFavoritesList(JSON.parse(stored));
  } catch {
    return null;
  }
}

export function writeStoredFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    return;
  }
}

export function subscribeToStoredFavorites(onChange) {
  const handleStorage = (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      onChange(readStoredFavorites());
    }
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}
