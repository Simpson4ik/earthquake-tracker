const COORDINATE_DIGITS = 3;

export function formatLatitude(latitude) {
  return `${Math.abs(latitude).toFixed(COORDINATE_DIGITS)}° ${latitude >= 0 ? 'пн. ш.' : 'пд. ш.'}`;
}

export function formatLongitude(longitude) {
  return `${Math.abs(longitude).toFixed(COORDINATE_DIGITS)}° ${longitude >= 0 ? 'сх. д.' : 'зх. д.'}`;
}
