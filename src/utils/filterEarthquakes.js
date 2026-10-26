import { ALL_CATEGORIES, getCategory } from '../constants/categories';

export function filterEarthquakes(items, { search, category, minMagnitude }) {
  const query = search.trim().toLowerCase();
  return items.filter(
    (eq) =>
      eq.magnitude >= minMagnitude &&
      (category === ALL_CATEGORIES || getCategory(eq.magnitude).id === category) &&
      (query === '' || eq.place.toLowerCase().includes(query)),
  );
}
