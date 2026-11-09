import { useMemo } from 'react';
import { KpiCard } from '../../components/KpiCard/KpiCard';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel';
import { ModeToggle } from '../../components/ModeToggle/ModeToggle';
import { EarthquakeList } from '../../components/EarthquakeList/EarthquakeList';
import { useEarthquakes } from '../../hooks/useEarthquakes';
import { useFilters } from '../../hooks/useFilters';
import { APP_NAME } from '../../constants/app';
import { ALERT_MAGNITUDE } from '../../constants/categories';
import { MAGNITUDE_OPTIONS, PERIOD_OPTIONS, getOptionLabel } from '../../constants/filters';
import { parseMinMagnitude } from '../../utils/parseMinMagnitude';
import { filterEarthquakes } from '../../utils/filterEarthquakes';
import { sortEarthquakes } from '../../utils/sortEarthquakes';
import { computeKpis } from '../../utils/computeKpis';
import { buildKpiCards } from '../../utils/buildKpiCards';
import { formatMinMagnitude } from '../../utils/formatMagnitude';

export function HomePage() {
  const { appliedFilters, isAlertMode, sort } = useFilters();
  const { magnitude, period, search, category, limit } = appliedFilters;

  const { data, loading, error, refetch } = useEarthquakes({ magnitude, period });

  const threshold = parseMinMagnitude(appliedFilters.minMagnitude);
  const minMagnitude = isAlertMode ? Math.max(threshold, ALERT_MAGNITUDE) : threshold;

  const filtered = useMemo(
    () => filterEarthquakes(data, { search, category, minMagnitude }),
    [data, search, category, minMagnitude],
  );
  const visible = useMemo(() => sortEarthquakes(filtered, sort).slice(0, Number(limit)), [filtered, sort, limit]);
  const kpis = useMemo(() => computeKpis(filtered), [filtered]);

  const selectionLabel = [
    getOptionLabel(MAGNITUDE_OPTIONS, magnitude),
    getOptionLabel(PERIOD_OPTIONS, period).toLowerCase(),
    Number.isFinite(threshold) && formatMinMagnitude(threshold),
  ]
    .filter(Boolean)
    .join(' · ');
  const kpiCards = buildKpiCards(loading || error ? null : kpis, selectionLabel);

  return (
    <>
      <title>{APP_NAME}</title>
      <section className="kpi-grid">
        {kpiCards.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </section>

      <main className="dashboard-grid">
        <aside className="controls-column">
          <FilterPanel />
          <ModeToggle />
        </aside>

        <section className="feed-column">
          <EarthquakeList
            loading={loading}
            error={error}
            onRetry={refetch}
            earthquakes={visible}
            totalCount={filtered.length}
          />
        </section>
      </main>
    </>
  );
}
