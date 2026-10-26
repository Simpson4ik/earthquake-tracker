import { INVALID_DATA_MESSAGE } from './http';

const UNKNOWN_PLACE = 'Невідоме місце';

const FEED_BASE_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';

export function buildEarthquakesUrl({ magnitude, period }) {
  return `${FEED_BASE_URL}/${magnitude}_${period}.geojson`;
}

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

export function mapEarthquakes(geojson) {
  if (!Array.isArray(geojson?.features)) {
    throw new Error(INVALID_DATA_MESSAGE);
  }
  // Пропускаємо записи без магнітуди чи координат замість падіння всього списку
  return geojson.features
    .filter(({ properties, geometry }) => properties?.mag != null && Array.isArray(geometry?.coordinates))
    .map(mapFeature);
}
