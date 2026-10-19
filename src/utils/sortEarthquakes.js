import { getColumn } from '../constants/columns';

export function sortEarthquakes(items, { key, direction }) {
  const { compare } = getColumn(key);
  const sign = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => sign * compare(a, b));
}
