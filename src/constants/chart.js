export const CHART_TYPE_OPTIONS = [
  { value: 'bar', label: 'Стовпчики' },
  { value: 'line', label: 'Лінія' },
  { value: 'area', label: 'Область' },
];

export const CHART_GROUPING_OPTIONS = [
  { value: 'time', label: 'У часі' },
  { value: 'magnitude', label: 'За магнітудою' },
];

export const DEFAULT_CHART = { type: 'bar', groupBy: 'time' };

export const CHART_HEIGHT = 280;

export const CHART_DESCRIPTIONS = {
  time: 'Кількість подій у кожному проміжку часу',
  magnitude: 'Кількість подій у кожному діапазоні магнітуди',
};

export const CHART_LABEL_HEADERS = {
  time: 'Проміжок часу',
  magnitude: 'Діапазон магнітуди',
};

export const TIME_BUCKETS = {
  hour: { unit: 'minutes', size: 5 },
  day: { unit: 'hours', size: 1 },
  week: { unit: 'days', size: 1 },
  month: { unit: 'days', size: 1 },
};

export const MAGNITUDE_BIN_TENTHS = 5;
