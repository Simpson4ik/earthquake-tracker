import { useEffect, useState } from 'react';
import { fetchEarthquakes } from '../api/earthquakesApi';

const NO_DATA = [];

export function useEarthquakes() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchEarthquakes(controller.signal)
      .then(setData)
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error(err);
        setError(err);
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = () => {
    setData(null);
    setError(null);
    setAttempt((n) => n + 1);
  };

  return { data: data ?? NO_DATA, loading: data === null && error === null, error, retry };
}
