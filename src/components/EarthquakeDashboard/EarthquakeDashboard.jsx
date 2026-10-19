import { useState } from 'react';
import { KpiCard } from '../KpiCard/KpiCard';
import { MagnitudeCounter } from '../MagnitudeCounter/MagnitudeCounter';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { EarthquakeList } from '../EarthquakeList/EarthquakeList';
import { useEarthquakes } from '../../hooks/useEarthquakes';
import { useCounter } from '../../hooks/useCounter';
import { useToggle } from '../../hooks/useToggle';
import { ALERT_MAGNITUDE, ALL_CATEGORIES, getCategory } from '../../constants/categories';
import { DEFAULT_THRESHOLD } from '../../constants/app';
import { sortEarthquakes } from '../../utils/sortEarthquakes';
import { computeKpis } from '../../utils/computeKpis';
import { buildKpiCards } from '../../utils/buildKpiCards';

export function EarthquakeDashboard() {
  const { data, loading, error } = useEarthquakes();
  const { count: threshold, increment, decrement, reset } = useCounter(DEFAULT_THRESHOLD, 0.5, 1.0, 9.0);
  const [isAlertMode, toggleAlertMode] = useToggle(false);
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [sort, setSort] = useState({ key: 'time', direction: 'desc' });

  const handleSort = (key) => {
    setSort((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: key === 'place' ? 'asc' : 'desc' };
    });
  };

  const minMagnitude = isAlertMode ? Math.max(threshold, ALERT_MAGNITUDE) : threshold;
  const filtered = data.filter(
    (eq) =>
      eq.magnitude >= minMagnitude &&
      (category === ALL_CATEGORIES || getCategory(eq.magnitude).id === category),
  );
  const visible = sortEarthquakes(filtered, sort.key, sort.direction);

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
          <MagnitudeCounter threshold={threshold} onIncrement={increment} onDecrement={decrement} onReset={reset} />
          <ModeToggle isAlertMode={isAlertMode} onToggle={toggleAlertMode} />
        </aside>

        <section className="feed-column">
          <EarthquakeList
            loading={loading}
            error={error}
            earthquakes={visible}
            category={category}
            onCategoryChange={setCategory}
            sortKey={sort.key}
            sortDirection={sort.direction}
            onSort={handleSort}
          />
        </section>
      </main>
    </>
  );
}
