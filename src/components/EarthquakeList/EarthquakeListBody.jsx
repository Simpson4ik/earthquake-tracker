import { EarthquakeTable } from '../EarthquakeTable/EarthquakeTable';

export function EarthquakeListBody({ loading, error, onRetry, earthquakes, sort, onSort }) {
  if (loading) {
    return (
      <div className="status-message" role="status">
        Завантаження даних USGS…
      </div>
    );
  }
  if (error) {
    return (
      <div className="status-message status-error" role="alert">
        <p>Не вдалося завантажити дані. {error.message}</p>
        <button type="button" className="btn-retry" onClick={onRetry}>
          Спробувати ще раз
        </button>
      </div>
    );
  }
  if (earthquakes.length === 0) {
    return <div className="status-message">Подій за вибраними умовами не знайдено</div>;
  }
  return <EarthquakeTable earthquakes={earthquakes} sort={sort} onSort={onSort} />;
}
