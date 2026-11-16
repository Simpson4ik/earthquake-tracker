import { createApi, fakeBaseQuery, QueryStatus } from '@reduxjs/toolkit/query/react';
import { fetchJson, isAbortError } from './http';
import {
  buildEarthquakeDetailsUrl,
  buildEarthquakesUrl,
  mapEarthquakeDetails,
  mapEarthquakes,
} from './earthquakesApi';

export const FEED_MAX_AGE_SECONDS = 60;
const FEED_CACHE_SECONDS = 600;

function createLatestOnlySignal() {
  let latest = null;
  return (signal) => {
    latest?.abort();
    const controller = new AbortController();
    latest = controller;
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener('abort', () => controller.abort(), { once: true });
    }
    return controller.signal;
  };
}

const feedSignal = createLatestOnlySignal();
const detailsSignal = createLatestOnlySignal();

async function fetchMapped(url, map, signal) {
  try {
    return { data: map(await fetchJson(url, signal)) };
  } catch (error) {
    if (!isAbortError(error)) console.error(error);
    return { error: { name: error.name, status: error.status, message: error.message } };
  }
}

export function getQueryStatus({ status, error, data }) {
  const hasFailure = error !== undefined && !isAbortError(error);
  const isFailed = status === QueryStatus.rejected && hasFailure;
  const isSettled = status === QueryStatus.fulfilled || isFailed;
  const canShowCached = data !== undefined && !hasFailure;
  return {
    loading: !isSettled && !canShowCached,
    error: isFailed ? error : null,
  };
}

export const usgsApi = createApi({
  reducerPath: 'usgsApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getEarthquakes: build.query({
      keepUnusedDataFor: FEED_CACHE_SECONDS,
      queryFn: (params, { signal }) =>
        fetchMapped(buildEarthquakesUrl(params), mapEarthquakes, feedSignal(signal)),
    }),
    getEarthquakeDetails: build.query({
      queryFn: (id, { signal }) =>
        fetchMapped(buildEarthquakeDetailsUrl(id), mapEarthquakeDetails, detailsSignal(signal)),
    }),
  }),
});

export const { useGetEarthquakeDetailsQuery } = usgsApi;
export const { useQuerySubscription: useEarthquakesSubscription } = usgsApi.endpoints.getEarthquakes;
