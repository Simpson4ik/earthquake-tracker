import { roundMagnitude } from './roundMagnitude';

export function parseMinMagnitude(value) {
  const magnitude = Number.parseFloat(value);
  return Number.isFinite(magnitude) ? roundMagnitude(magnitude) : -Infinity;
}
