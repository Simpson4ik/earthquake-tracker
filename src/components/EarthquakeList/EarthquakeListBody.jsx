import { EarthquakeTable } from '../EarthquakeTable/EarthquakeTable';

export function EarthquakeListBody({ loading, error, earthquakes, ...tableProps }) {
  if (loading) {
    return <div className="status-message">Завантаження даних USGS…</div>;
  }
  if (error) {
    return (
      <div className="status-message status-error" role="alert">
        Не вдалося завантажити дані: {error.message}
      </div>
    );
  }
  if (earthquakes.length === 0) {
    return <div className="status-message empty-message">Подій за вибраними умовами не знайдено</div>;
  }
  return <EarthquakeTable earthquakes={earthquakes} {...tableProps} />;
}
