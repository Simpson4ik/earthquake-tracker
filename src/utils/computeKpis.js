import { ALERT_MAGNITUDE } from '../constants/categories';

export function computeKpis(earthquakes) {
  if (earthquakes.length === 0) return null;

  const peak = earthquakes.reduce((max, eq) => (eq.magnitude > max.magnitude ? eq : max));
  const avgDepth = earthquakes.reduce((sum, eq) => sum + eq.depth, 0) / earthquakes.length;
  const strongCount = earthquakes.filter((eq) => eq.magnitude >= ALERT_MAGNITUDE).length;

  return { total: earthquakes.length, peak, avgDepth, strongCount };
}
