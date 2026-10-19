const MIN_MAGNITUDE = 2.5;

export const FEED = {
  minMagnitude: MIN_MAGNITUDE,
  url: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${MIN_MAGNITUDE}_day.geojson`,
  title: 'Подій за добу',
  description: `M ${MIN_MAGNITUDE}+ за останні 24 год`,
};

export const UNKNOWN_PLACE = 'Невідоме місце';
