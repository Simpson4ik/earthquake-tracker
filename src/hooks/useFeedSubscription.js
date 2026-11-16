import { useSelector } from 'react-redux';
import { FEED_MAX_AGE_SECONDS, useEarthquakesSubscription } from '../api/usgsApi';
import { selectFeedParams } from '../store/selectors/earthquakesSelectors';

export function useFeedSubscription() {
  const params = useSelector(selectFeedParams);
  useEarthquakesSubscription(params, { refetchOnMountOrArgChange: FEED_MAX_AGE_SECONDS });
}
