import { ALL_CATEGORIES } from './categories';

export const DEBOUNCE_MS = 400;

export const MAGNITUDE_OPTIONS = [
  { value: '2.5', label: 'M 2.5+' },
  { value: '4.5', label: 'M 4.5+' },
  { value: 'significant', label: 'Лише значні' },
];

export const PERIOD_OPTIONS = [
  { value: 'hour', label: 'Остання година' },
  { value: 'day', label: 'Остання доба' },
  { value: 'week', label: 'Останній тиждень' },
  { value: 'month', label: 'Останній місяць' },
];

export const LIMIT_OPTIONS = [
  { value: '25', label: '25 записів' },
  { value: '50', label: '50 записів' },
  { value: '100', label: '100 записів' },
  { value: '250', label: '250 записів' },
];

export const MIN_MAGNITUDE_INPUT = { min: 0, max: 10, step: 0.1 };

export const DEFAULT_FILTERS = {
  search: '',
  magnitude: '2.5',
  period: 'day',
  minMagnitude: '',
  category: ALL_CATEGORIES,
  limit: '100',
};

export function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? value;
}
