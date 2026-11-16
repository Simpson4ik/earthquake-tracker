import { useSelector } from 'react-redux';
import { EarthquakeListBody } from './EarthquakeListBody';
import {
  selectFeedStatus,
  selectFilteredCount,
  selectVisibleCount,
} from '../../store/selectors/earthquakesSelectors';
import './EarthquakeList.css';

export function EarthquakeList() {
  const { loading, error } = useSelector(selectFeedStatus);
  const totalCount = useSelector(selectFilteredCount);
  const visibleCount = useSelector(selectVisibleCount);
  const isReady = !loading && !error;

  return (
    <div className="widget-box earthquake-list-widget">
      <div className="list-header">
        <h3 className="widget-title">Останні сейсмічні події</h3>
        <span className="list-count-badge" aria-live="polite">
          {isReady && `Знайдено: ${totalCount}`}
          {isReady && visibleCount < totalCount && ` · показано ${visibleCount}`}
        </span>
      </div>

      <div className="earthquake-items-container">
        <EarthquakeListBody />
      </div>
    </div>
  );
}
