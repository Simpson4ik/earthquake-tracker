import { useState } from 'react';
import { KpiCard } from '../KpiCard/KpiCard';
import { MagnitudeCounter } from '../MagnitudeCounter/MagnitudeCounter';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { EarthquakeList } from '../EarthquakeList/EarthquakeList';
import { useEarthquakes } from '../../hooks/useEarthquakes';
import { useCounter } from '../../hooks/useCounter';
import { useToggle } from '../../hooks/useToggle';
import { useSort } from '../../hooks/useSort';
import { ALERT_MAGNITUDE, ALL_CATEGORIES } from '../../constants/categories';
import { DEFAULT_SORT } from '../../constants/columns';
import { THRESHOLD } from '../../constants/app';
import { filterEarthquakes } from '../../utils/filterEarthquakes';
import { sortEarthquakes } from '../../utils/sortEarthquakes';
import { computeKpis } from '../../utils/computeKpis';
import { buildKpiCards } from '../../utils/buildKpiCards';

export function EarthquakeDashboard() {
  const { data, loading, error } = useEarthquakes();
  const { count: threshold, increment, decrement, reset } = useCounter(
    THRESHOLD.initial,
    THRESHOLD.step,
    THRESHOLD.min,
    THRESHOLD.max,
  );
  const [isAlertMode, toggleAlertMode] = useToggle(false);
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [sort, toggleSort] = useSort(DEFAULT_SORT);

  const minMagnitude = isAlertMode ? Math.max(threshold, ALERT_MAGNITUDE) : threshold;
  const visible = sortEarthquakes(filterEarthquakes(data, { minMagnitude, category }), sort);
  const kpiCards = buildKpiCards(computeKpis(data));

  return (
    <>
      <section className="kpi-grid">
        {kpiCards.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </section>

      <main className="dashboard-grid">
        <aside className="controls-column">
          <MagnitudeCounter
            threshold={threshold}
            step={THRESHOLD.step}
            onIncrement={increment}
            onDecrement={decrement}
            onReset={reset}
          />
          <ModeToggle isAlertMode={isAlertMode} onToggle={toggleAlertMode} />
        </aside>

        <section className="feed-column">
          <EarthquakeList
            loading={loading}
            error={error}
            earthquakes={visible}
            category={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSort={toggleSort}
          />
        </section>
      </main>
    </>
  );
}
