import { getQueryStatus, useGetEarthquakeDetailsQuery } from '../api/usgsApi';

export function useEarthquakeDetails(id) {
  const { status, error, currentData, refetch } = useGetEarthquakeDetailsQuery(id);
  return { data: currentData ?? null, refetch, ...getQueryStatus({ status, error, data: currentData }) };
}
