import { EarthquakeTable } from '../EarthquakeTable/EarthquakeTable';
import { LoadingState } from '../LoadingState/LoadingState';
import { ErrorState } from '../ErrorState/ErrorState';

export function EarthquakeListBody({ loading, error, onRetry, earthquakes }) {
  if (loading) {
    return <LoadingState />;
  }
  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }
  if (earthquakes.length === 0) {
    return <div className="status-message">Подій за вибраними умовами не знайдено</div>;
  }
  return <EarthquakeTable earthquakes={earthquakes} />;
}
