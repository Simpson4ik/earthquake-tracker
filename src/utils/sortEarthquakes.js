import { COLUMNS } from '../constants/columns';

export function sortEarthquakes(items, key, direction) {
  const { compare } = COLUMNS.find((column) => column.key === key);
  const sign = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => sign * compare(a, b));
}
