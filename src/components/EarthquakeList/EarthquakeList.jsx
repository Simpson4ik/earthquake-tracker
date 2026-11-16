import { EarthquakeListBody } from './EarthquakeListBody';
import './EarthquakeList.css';

export function EarthquakeList({ loading, error, onRetry, earthquakes, totalCount }) {
  const isReady = !loading && !error;

  return (
    <div className="widget-box earthquake-list-widget">
      <div className="list-header">
        <h3 className="widget-title">Останні сейсмічні події</h3>
        <span className="list-count-badge" aria-live="polite">
          {isReady && `Знайдено: ${totalCount}`}
          {isReady && earthquakes.length < totalCount && ` · показано ${earthquakes.length}`}
        </span>
      </div>

      <div className="earthquake-items-container">
        <EarthquakeListBody loading={loading} error={error} onRetry={onRetry} earthquakes={earthquakes} />
      </div>
    </div>
  );
}
