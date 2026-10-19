export const CATEGORIES = [
  { id: 'minor', label: 'Слабкі', min: -Infinity, max: 4.0 },
  { id: 'moderate', label: 'Помірні', min: 4.0, max: 6.0 },
  { id: 'strong', label: 'Сильні', min: 6.0, max: Infinity },
];

export const ALL_CATEGORIES = 'all';

// Режим тривоги і KPI «Сильні події» спираються на нижню межу категорії «Сильні»
export const ALERT_MAGNITUDE = CATEGORIES.find(({ id }) => id === 'strong').min;

export function getCategory(magnitude) {
  return CATEGORIES.find(({ min, max }) => magnitude >= min && magnitude < max);
}
