import { useSelector } from 'react-redux';
import { KpiCard } from '../KpiCard/KpiCard';
import { selectFeedStatus, selectKpis, selectSelectionLabel } from '../../store/selectors/earthquakesSelectors';
import { buildKpiCards } from '../../utils/buildKpiCards';

export function KpiSection() {
  const { loading, error } = useSelector(selectFeedStatus);
  const kpis = useSelector(selectKpis);
  const selectionLabel = useSelector(selectSelectionLabel);

  const kpiCards = buildKpiCards(loading || error ? null : kpis, selectionLabel);

  return (
    <section className="kpi-grid">
      {kpiCards.map((kpi) => (
        <KpiCard key={kpi.id} {...kpi} />
      ))}
    </section>
  );
}
