import { useEffect, useEffectEvent, useState } from 'react';
import { fetchJson } from '../api/http';

const identity = (data) => data;

export function useFetch(url, parse = identity) {
  // Кожна зміна url або refetch отримує новий id, тож відповідь на старий запит
  // ніколи не сплутається з поточним, навіть якщо url повернувся до попереднього
  const [request, setRequest] = useState({ url, id: 0 });
  const [result, setResult] = useState(null);

  if (request.url !== url) {
    setRequest({ url, id: request.id + 1 });
  }

  // Effect Event завжди бачить актуальний parse, але не перезапускає запит,
  // тож можна передавати й inline-функцію
  const parseResponse = useEffectEvent((data) => parse(data));

  useEffect(() => {
    if (!request.url) return undefined;
    const controller = new AbortController();

    fetchJson(request.url, controller.signal)
      .then((data) => setResult({ id: request.id, data: parseResponse(data), error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error(error);
        setResult({ id: request.id, data: null, error });
      });

    return () => controller.abort();
  }, [request]);

  const isCurrent = result?.id === request.id;
  const refetch = () => setRequest((prev) => ({ ...prev, id: prev.id + 1 }));

  return {
    data: isCurrent ? result.data : null,
    loading: Boolean(request.url) && !isCurrent,
    error: isCurrent ? result.error : null,
    refetch,
  };
}
