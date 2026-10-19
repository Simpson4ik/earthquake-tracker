import { useEffect, useState } from 'react';
import { fetchEarthquakes } from '../api/earthquakesApi';

const NO_DATA = [];

export function useEarthquakes() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchEarthquakes(controller.signal)
      .then(setData)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err);
      });

    return () => controller.abort();
  }, []);

  return { data: data ?? NO_DATA, loading: data === null && error === null, error };
}
