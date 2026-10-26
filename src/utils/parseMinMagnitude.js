// Порожнє або некоректне поле означає «без порогу».
// Округлюємо до 0.1, як і магнітуди в даних, щоб підпис «M ≥ x» збігався з фільтром
export function parseMinMagnitude(value) {
  const magnitude = Number.parseFloat(value);
  return Number.isFinite(magnitude) ? Math.round(magnitude * 10) / 10 : -Infinity;
}
