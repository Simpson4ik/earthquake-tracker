export const CATEGORIES = [
  { id: 'minor', label: 'Слабкі', range: 'M < 4.0', min: -Infinity, max: 4.0 },
  { id: 'moderate', label: 'Помірні', range: 'M 4.0 – 5.9', min: 4.0, max: 6.0 },
  { id: 'strong', label: 'Сильні', range: 'M ≥ 6.0', min: 6.0, max: Infinity },
];

export const ALL_CATEGORIES = 'all';

export const ALERT_MAGNITUDE = 6.0;

export function getCategory(magnitude) {
  return CATEGORIES.find(({ min, max }) => magnitude >= min && magnitude < max);
}
