import { usgsApi } from '../api/usgsApi';
import { selectFeedParams } from './selectors/earthquakesSelectors';

export const feedRefetchRequested = () => (dispatch, getState) =>
  dispatch(
    usgsApi.endpoints.getEarthquakes.initiate(selectFeedParams(getState()), {
      subscribe: false,
      forceRefetch: true,
    }),
  );
