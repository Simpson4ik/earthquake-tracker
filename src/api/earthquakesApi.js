import { FEED, UNKNOWN_PLACE } from '../constants/feed';

function mapFeature({ id, properties, geometry }) {
  return {
    id,
    place: properties.place ?? UNKNOWN_PLACE,
    // Округлюємо до 0.1, щоб показ, поріг і категорія працювали з одним значенням (2.49 → 2.5)
    magnitude: Math.round(properties.mag * 10) / 10,
    depth: geometry.coordinates[2],
    time: properties.time,
  };
}

// Текст помилки бачить користувач, тому технічну причину лишаємо в cause
async function request(url, signal) {
  try {
    return await fetch(url, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error("Немає з'єднання з сервером USGS. Перевірте інтернет.", { cause: err });
  }
}

async function readFeatures(response) {
  try {
    const { features } = await response.json();
    if (!Array.isArray(features)) throw new TypeError('features is not an array');
    return features;
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error('Сервер USGS повернув некоректні дані.', { cause: err });
  }
}

export async function fetchEarthquakes(signal) {
  const response = await request(FEED.url, signal);
  if (!response.ok) {
    throw new Error(`Сервер USGS відповів помилкою (${response.status}).`);
  }
  const features = await readFeatures(response);
  return features.filter(({ properties }) => properties.mag !== null).map(mapFeature);
}
