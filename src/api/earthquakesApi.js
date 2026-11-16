import { INVALID_DATA_MESSAGE } from './http';
import { roundMagnitude } from '../utils/roundMagnitude';

const UNKNOWN_PLACE = 'Невідоме місце';
const MISSING_EVENT_STATUSES = [404, 409];

const FEED_BASE_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';
const EVENT_BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

export function buildEarthquakesUrl({ magnitude, period }) {
  return `${FEED_BASE_URL}/${magnitude}_${period}.geojson`;
}

export function buildEarthquakeDetailsUrl(id) {
  return `${EVENT_BASE_URL}?format=geojson&eventid=${encodeURIComponent(id)}`;
}

export function isEventMissingError(error) {
  return MISSING_EVENT_STATUSES.includes(error?.status);
}

function mapFeature({ id, properties, geometry }) {
  return {
    id,
    place: properties.place ?? UNKNOWN_PLACE,
    magnitude: properties.mag == null ? null : roundMagnitude(properties.mag),
    depth: geometry.coordinates[2],
    time: properties.time,
  };
}

export function mapEarthquakes(geojson) {
  if (!Array.isArray(geojson?.features)) {
    throw new Error(INVALID_DATA_MESSAGE);
  }
  return geojson.features
    .filter(({ properties, geometry }) => properties?.mag != null && geometry?.coordinates?.[2] != null)
    .map(mapFeature);
}

export function mapEarthquakeDetails(feature) {
  if (!feature?.properties || !Array.isArray(feature.geometry?.coordinates)) {
    throw new Error(INVALID_DATA_MESSAGE);
  }
  const { properties, geometry } = feature;
  const [longitude, latitude] = geometry.coordinates;

  return {
    ...mapFeature(feature),
    longitude,
    latitude,
    updated: properties.updated,
    url: properties.url,
    magnitudeType: properties.magType,
    eventType: properties.type,
    status: properties.status,
    significance: properties.sig,
    feltReports: properties.felt,
    reportedIntensity: properties.cdi,
    estimatedIntensity: properties.mmi,
    alert: properties.alert,
    hasTsunamiFlag: properties.tsunami === 1,
    stationCount: properties.nst,
    azimuthalGap: properties.gap,
    nearestStationDistance: properties.dmin,
    rms: properties.rms,
    network: properties.net,
  };
}
