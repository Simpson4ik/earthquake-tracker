import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { KpiCard } from '../KpiCard/KpiCard';
import { FilterPanel } from '../FilterPanel/FilterPanel';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { EarthquakeList } from '../EarthquakeList/EarthquakeList';
import { useEarthquakes } from '../../hooks/useEarthquakes';
import { useDebounce } from '../../hooks/useDebounce';
import { useToggle } from '../../hooks/useToggle';
import { useSort } from '../../hooks/useSort';
import { ALERT_MAGNITUDE } from '../../constants/categories';
import { DEFAULT_SORT } from '../../constants/columns';
import {
  DEBOUNCE_MS,
  DEFAULT_FILTERS,
  MAGNITUDE_OPTIONS,
  PERIOD_OPTIONS,
  getOptionLabel,
} from '../../constants/filters';
import { parseMinMagnitude } from '../../utils/parseMinMagnitude';
import { filterEarthquakes } from '../../utils/filterEarthquakes';
import { sortEarthquakes } from '../../utils/sortEarthquakes';
import { computeKpis } from '../../utils/computeKpis';
import { buildKpiCards } from '../../utils/buildKpiCards';
import { formatMinMagnitude } from '../../utils/formatMagnitude';

export function EarthquakeDashboard() {
  const {
    control,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm({ defaultValues: DEFAULT_FILTERS });
  const filters = useWatch({ control });
  const debouncedFilters = useDebounce(filters, DEBOUNCE_MS);
  const { magnitude, period, search, category, limit } = debouncedFilters;

  const { data, loading, error, refetch } = useEarthquakes({ magnitude, period });
  const [isAlertMode, toggleAlertMode] = useToggle(false);
  const [sort, toggleSort] = useSort(DEFAULT_SORT);

  const threshold = parseMinMagnitude(debouncedFilters.minMagnitude);
  const minMagnitude = isAlertMode ? Math.max(threshold, ALERT_MAGNITUDE) : threshold;

  // Форма перерендерює контейнер на кожне натискання клавіші, а вибірка залежить
  // лише від значень після debounce — тому не перераховуємо її без потреби
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

  const handleFieldChange = (name, value) => setValue(name, value, { shouldDirty: true });

  return (
    <>
      <section className="kpi-grid">
        {kpiCards.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </section>

      <main className="dashboard-grid">
        <aside className="controls-column">
          <FilterPanel
            values={filters}
            onFieldChange={handleFieldChange}
            isPending={filters !== debouncedFilters}
            canReset={isDirty}
            onReset={() => reset(DEFAULT_FILTERS)}
          />
          <ModeToggle isAlertMode={isAlertMode} onToggle={toggleAlertMode} />
        </aside>

        <section className="feed-column">
          <EarthquakeList
            loading={loading}
            error={error}
            onRetry={refetch}
            earthquakes={visible}
            totalCount={filtered.length}
            sort={sort}
            onSort={toggleSort}
          />
        </section>
      </main>
    </>
  );
}
