export function buildKpiCards(kpis) {
  return [
    {
      id: 'kpi-total',
      title: 'Подій за добу',
      value: kpis ? String(kpis.total) : '—',
      change: 'M 2.5+ за останні 24 год',
      trend: 'up',
    },
    {
      id: 'kpi-max-mag',
      title: 'Пікова магнітуда',
      value: kpis ? `M ${kpis.peak.magnitude.toFixed(1)}` : '—',
      change: kpis ? kpis.peak.place : 'Немає даних',
      trend: 'danger',
    },
    {
      id: 'kpi-avg-depth',
      title: 'Середня глибина',
      value: kpis ? `${kpis.avgDepth.toFixed(1)} км` : '—',
      change: 'Усереднено за вибіркою',
      trend: 'down',
    },
    {
      id: 'kpi-strong',
      title: 'Сильні події',
      value: kpis ? String(kpis.strongCount) : '—',
      change: 'M ≥ 6.0',
      trend: 'neutral',
    },
  ];
}
