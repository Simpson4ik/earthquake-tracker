const FEED_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';

function mapFeature({ id, properties, geometry }) {
  return {
    id,
    place: properties.place,
    // Округлюємо до 0.1, щоб показ, поріг і категорія працювали з одним значенням (2.49 → 2.5)
    magnitude: Math.round(properties.mag * 10) / 10,
    depth: geometry.coordinates[2],
    time: properties.time,
  };
}

export async function fetchEarthquakes(signal) {
  const response = await fetch(FEED_URL, { signal });
  if (!response.ok) {
    throw new Error(`USGS API: ${response.status} ${response.statusText}`);
  }
  const { features } = await response.json();
  return features.filter(({ properties }) => properties.mag !== null).map(mapFeature);
}
