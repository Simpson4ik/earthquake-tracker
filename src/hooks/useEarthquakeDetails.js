import { useFetch } from './useFetch';
import { buildEarthquakeDetailsUrl, mapEarthquakeDetails } from '../api/earthquakesApi';

export function useEarthquakeDetails(id) {
  return useFetch(buildEarthquakeDetailsUrl(id), mapEarthquakeDetails);
}
