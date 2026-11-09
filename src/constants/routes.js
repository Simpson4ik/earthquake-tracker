import { generatePath } from 'react-router';

export const ROUTES = {
  home: '/',
  earthquake: '/earthquake/:id',
};

export function getEarthquakePath(id) {
  return generatePath(ROUTES.earthquake, { id });
}
