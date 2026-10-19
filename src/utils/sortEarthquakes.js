export const SORT_FIELDS = {
  place: { label: 'Місце', compare: (a, b) => a.place.localeCompare(b.place) },
  magnitude: { label: 'Магнітуда', compare: (a, b) => a.magnitude - b.magnitude },
  depth: { label: 'Глибина, км', compare: (a, b) => a.depth - b.depth },
  time: { label: 'Час', compare: (a, b) => a.time - b.time },
};

export function sortEarthquakes(items, key, direction) {
  const sign = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => sign * SORT_FIELDS[key].compare(a, b));
}
