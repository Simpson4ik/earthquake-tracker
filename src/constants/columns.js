// Колонки таблиці; наявність compare робить колонку сортованою
export const COLUMNS = [
  { key: 'place', label: 'Місце', compare: (a, b) => a.place.localeCompare(b.place) },
  { key: 'magnitude', label: 'Магнітуда', compare: (a, b) => a.magnitude - b.magnitude },
  { key: 'depth', label: 'Глибина, км', compare: (a, b) => a.depth - b.depth },
  { key: 'time', label: 'Час', compare: (a, b) => a.time - b.time },
  { key: 'category', label: 'Категорія' },
];
