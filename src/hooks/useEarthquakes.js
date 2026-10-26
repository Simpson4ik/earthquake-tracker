import { useFetch } from './useFetch';
import { buildEarthquakesUrl, mapEarthquakes } from '../api/earthquakesApi';

const NO_DATA = [];

export function useEarthquakes(params) {
  const { data, loading, error, refetch } = useFetch(buildEarthquakesUrl(params), mapEarthquakes);
  return { data: data ?? NO_DATA, loading, error, refetch };
}
