const collator = new Intl.Collator('uk');

// Колонки таблиці; наявність compare робить колонку сортованою
export const COLUMNS = [
  {
    key: 'place',
    label: 'Місце',
    defaultDirection: 'asc',
    compare: (a, b) => collator.compare(a.place, b.place),
  },
  { key: 'magnitude', label: 'Магнітуда', defaultDirection: 'desc', compare: (a, b) => a.magnitude - b.magnitude },
  { key: 'depth', label: 'Глибина, км', defaultDirection: 'desc', compare: (a, b) => a.depth - b.depth },
  { key: 'time', label: 'Час', defaultDirection: 'desc', compare: (a, b) => a.time - b.time },
  { key: 'category', label: 'Категорія' },
];

export const DEFAULT_SORT = { key: 'time', direction: 'desc' };

export function getColumn(key) {
  return COLUMNS.find((column) => column.key === key);
}
