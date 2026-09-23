import './KpiCard.css';

export function KpiCard({ title, value, change, trend = 'neutral' }) {
  return (
    <div className={`kpi-card kpi-trend-${trend}`}>
      <span className="kpi-title">{title}</span>
      <div className="kpi-value">{value}</div>
      <span className="kpi-change">{change}</span>
    </div>
  );
}