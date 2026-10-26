export const INVALID_DATA_MESSAGE = 'Сервер повернув некоректні дані.';

// Текст помилки бачить користувач, тому технічну причину лишаємо в cause
export async function fetchJson(url, signal) {
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error("Немає з'єднання з сервером. Перевірте інтернет.", { cause: err });
  }

  if (!response.ok) {
    throw new Error(`Сервер відповів помилкою (${response.status}).`);
  }

  try {
    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error(INVALID_DATA_MESSAGE, { cause: err });
  }
}
