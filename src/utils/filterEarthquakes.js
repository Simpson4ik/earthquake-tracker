import { ALL_CATEGORIES, getCategory } from '../constants/categories';

export function filterEarthquakes(items, { minMagnitude, category }) {
  return items.filter(
    (eq) =>
      eq.magnitude >= minMagnitude &&
      (category === ALL_CATEGORIES || getCategory(eq.magnitude).id === category),
  );
}
