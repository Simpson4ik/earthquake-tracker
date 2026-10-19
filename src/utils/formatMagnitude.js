export function formatMagnitude(magnitude) {
  return `M ${magnitude.toFixed(1)}`;
}

export function formatMinMagnitude(magnitude) {
  return `M ≥ ${magnitude.toFixed(1)}`;
}

export function formatRange({ min, max }) {
  if (min === -Infinity) return `M < ${max.toFixed(1)}`;
  if (max === Infinity) return formatMinMagnitude(min);
  return `${min.toFixed(1)} ≤ M < ${max.toFixed(1)}`;
}
