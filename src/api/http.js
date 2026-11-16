export const INVALID_DATA_MESSAGE = 'Сервер повернув некоректні дані.';

class HttpError extends Error {
  constructor(status) {
    super(`Сервер відповів помилкою (${status}).`);
    this.name = 'HttpError';
    this.status = status;
  }
}

export async function fetchJson(url, signal) {
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error("Немає з'єднання з сервером. Перевірте інтернет.", { cause: err });
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  try {
    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error(INVALID_DATA_MESSAGE, { cause: err });
  }
}
