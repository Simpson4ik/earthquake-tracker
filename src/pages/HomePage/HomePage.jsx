import { KpiSection } from '../../components/KpiSection/KpiSection';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel';
import { ModeToggle } from '../../components/ModeToggle/ModeToggle';
import { FavoritesPanel } from '../../components/FavoritesPanel/FavoritesPanel';
import { EarthquakeChartWidget } from '../../components/EarthquakeChartWidget/EarthquakeChartWidget';
import { EarthquakeList } from '../../components/EarthquakeList/EarthquakeList';
import { useFeedSubscription } from '../../hooks/useFeedSubscription';
import { APP_NAME } from '../../constants/app';

export function HomePage() {
  useFeedSubscription();

  return (
    <>
      <title>{APP_NAME}</title>
      <KpiSection />

      <main className="dashboard-grid">
        <aside className="controls-column">
          <FilterPanel />
          <ModeToggle />
          <FavoritesPanel />
        </aside>

        <section className="feed-column">
          <EarthquakeChartWidget />
          <EarthquakeList />
        </section>
      </main>
    </>
  );
}
