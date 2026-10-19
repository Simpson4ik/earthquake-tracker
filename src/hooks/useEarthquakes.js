import { useEffect, useState } from 'react';
import { fetchEarthquakes } from '../api/earthquakesApi';

export function useEarthquakes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchEarthquakes(controller.signal)
      .then(setData)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
