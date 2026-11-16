import { useDispatch, useSelector } from 'react-redux';
import { EarthquakeTable } from '../EarthquakeTable/EarthquakeTable';
import { LoadingState } from '../LoadingState/LoadingState';
import { ErrorState } from '../ErrorState/ErrorState';
import { selectFeedStatus, selectVisibleCount } from '../../store/selectors/earthquakesSelectors';
import { feedRefetchRequested } from '../../store/feedThunks';

export function EarthquakeListBody() {
  const { loading, error } = useSelector(selectFeedStatus);
  const isEmpty = useSelector(selectVisibleCount) === 0;
  const dispatch = useDispatch();

  if (loading) {
    return <LoadingState />;
  }
  if (error) {
    return <ErrorState error={error} onRetry={() => dispatch(feedRefetchRequested())} />;
  }
  if (isEmpty) {
    return <div className="status-message">Подій за вибраними умовами не знайдено</div>;
  }
  return <EarthquakeTable />;
}
