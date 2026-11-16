import { MAGNITUDE_BIN_TENTHS, TIME_BUCKETS } from '../constants/chart';
import { formatTime } from './formatTime';

const UNIT_MS = { minutes: 60_000, hours: 3_600_000 };

const shortTimeFormatter = new Intl.DateTimeFormat('uk-UA', { hour: '2-digit', minute: '2-digit' });
const dayFormatter = new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: '2-digit' });

function startOfDay(time) {
  return new Date(time).setHours(0, 0, 0, 0);
}

function startOfBucket(time, { unit, size }) {
  if (unit === 'days') return startOfDay(time);
  const offsetMs = new Date(time).getTimezoneOffset() * -UNIT_MS.minutes;
  return time - ((time + offsetMs) % (size * UNIT_MS[unit]));
}

function nextBucket(time, { unit, size }) {
  if (unit !== 'days') return time + size * UNIT_MS[unit];
  const date = new Date(time);
  date.setDate(date.getDate() + size);
  return startOfDay(date.getTime());
}

function countBy(items, getKey) {
  const counts = new Map();
  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function getRange(keys) {
  let first = Infinity;
  let last = -Infinity;
  for (const key of keys) {
    if (key < first) first = key;
    if (key > last) last = key;
  }
  return { first, last };
}

function groupByTime(earthquakes, period) {
  const bucket = TIME_BUCKETS[period];
  const counts = countBy(earthquakes, (eq) => startOfBucket(eq.time, bucket));
  const { first, last } = getRange(counts.keys());
  const isDaily = bucket.unit === 'days';
  const spansDays = !isDaily && startOfDay(first) !== startOfDay(last);

  const points = [];
  for (let start = first; start <= last; start = nextBucket(start, bucket)) {
    const tooltipLabel = isDaily ? dayFormatter.format(start) : formatTime(start);
    const needsDate = isDaily || (spansDays && (start === first || start === last));
    points.push({
      key: start,
      label: needsDate ? tooltipLabel : shortTimeFormatter.format(start),
      tooltipLabel,
      count: counts.get(start) ?? 0,
    });
  }
  return points;
}

function formatTenths(tenths) {
  return (tenths / 10).toFixed(1);
}

function groupByMagnitude(earthquakes) {
  const counts = countBy(earthquakes, (eq) => Math.floor(Math.round(eq.magnitude * 10) / MAGNITUDE_BIN_TENTHS));
  const { first, last } = getRange(counts.keys());

  const points = [];
  for (let bin = first; bin <= last; bin += 1) {
    const from = formatTenths(bin * MAGNITUDE_BIN_TENTHS);
    const to = formatTenths((bin + 1) * MAGNITUDE_BIN_TENTHS);
    points.push({
      key: bin,
      label: from,
      tooltipLabel: `M ${from}–${to}`,
      count: counts.get(bin) ?? 0,
    });
  }
  return points;
}

export function buildChartData(earthquakes, groupBy, period) {
  if (earthquakes.length === 0) return [];
  return groupBy === 'magnitude' ? groupByMagnitude(earthquakes) : groupByTime(earthquakes, period);
}
