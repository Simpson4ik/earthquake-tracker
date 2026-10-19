import { FEED } from './feed';

export const APP_NAME = 'Earthquake Monitoring Dashboard';
export const APP_SUBTITLE = 'Лабораторна робота №2: Дані з USGS API, useEffect та сортування';

// Нижче мінімуму фіду поріг не має сенсу: таких подій у даних немає
export const THRESHOLD = {
  initial: FEED.minMagnitude,
  step: 0.5,
  min: FEED.minMagnitude,
  max: 9.0,
};
