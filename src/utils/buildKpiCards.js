import { FEED } from '../constants/feed';
import { ALERT_MAGNITUDE } from '../constants/categories';
import { formatMagnitude, formatMinMagnitude } from './formatMagnitude';

const NO_VALUE = '—';

const EMPTY_VALUES = {
  total: NO_VALUE,
  peak: NO_VALUE,
  peakPlace: 'Немає даних',
  avgDepth: NO_VALUE,
  strongCount: NO_VALUE,
};

function formatKpis(kpis) {
  if (!kpis) return EMPTY_VALUES;
  return {
    total: String(kpis.total),
    peak: formatMagnitude(kpis.peak.magnitude),
    peakPlace: kpis.peak.place,
    avgDepth: `${kpis.avgDepth.toFixed(1)} км`,
    strongCount: String(kpis.strongCount),
  };
}

export function buildKpiCards(kpis) {
  const values = formatKpis(kpis);
  return [
    { id: 'kpi-total', title: FEED.title, value: values.total, change: FEED.description, trend: 'neutral' },
    { id: 'kpi-max-mag', title: 'Пікова магнітуда', value: values.peak, change: values.peakPlace, trend: 'danger' },
    { id: 'kpi-avg-depth', title: 'Середня глибина', value: values.avgDepth, change: 'Усереднено за вибіркою', trend: 'neutral' },
    {
      id: 'kpi-strong',
      title: 'Сильні події',
      value: values.strongCount,
      change: formatMinMagnitude(ALERT_MAGNITUDE),
      trend: 'neutral',
    },
  ];
}
