import { Area, Bar, Line } from 'recharts';

const ACCENT = 'var(--color-accent)';

const SINGLE_POINT_DOT = { dot: { r: 5, fill: ACCENT, stroke: ACCENT } };

export const SERIES_BY_TYPE = {
  bar: {
    Component: Bar,
    props: { fill: ACCENT, radius: [4, 4, 0, 0], maxBarSize: 40 },
  },
  line: {
    Component: Line,
    props: { type: 'monotone', stroke: ACCENT, strokeWidth: 2, dot: false },
    singlePointProps: SINGLE_POINT_DOT,
  },
  area: {
    Component: Area,
    props: { type: 'monotone', stroke: ACCENT, strokeWidth: 2, fill: ACCENT, fillOpacity: 0.25 },
    singlePointProps: SINGLE_POINT_DOT,
  },
};

export const CHART_MARGIN = { top: 8, right: 8, bottom: 0, left: 0 };

export const AXIS_STROKE = 'var(--color-border-strong)';

export const AXIS_TICK = { fill: 'var(--color-text-muted)', fontSize: 12 };

export const TOOLTIP_PROPS = {
  contentStyle: {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border-strong)',
    borderRadius: 6,
    color: 'var(--color-text)',
  },
  labelStyle: { color: 'var(--color-text-muted)' },
  itemStyle: { color: 'var(--color-text)' },
  cursor: { fill: 'var(--color-row-hover)', stroke: 'var(--color-border-strong)' },
};
