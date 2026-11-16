import { CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AXIS_STROKE, AXIS_TICK, CHART_MARGIN, SERIES_BY_TYPE, TOOLTIP_PROPS } from './chartConfig';

export function DataChart({ data, type, xKey, yKey, tooltipLabelKey = xKey, seriesName, height }) {
  const { Component: Series, props: seriesProps, singlePointProps } = SERIES_BY_TYPE[type];
  const extraProps = data.length === 1 ? singlePointProps : undefined;
  const formatTooltipLabel = (label, payload) => payload?.[0]?.payload[tooltipLabelKey] ?? label;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={CHART_MARGIN}>
        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xKey} tick={AXIS_TICK} stroke={AXIS_STROKE} interval="preserveStartEnd" minTickGap={16} />
        <YAxis allowDecimals={false} tick={AXIS_TICK} stroke={AXIS_STROKE} width={36} />
        <Tooltip {...TOOLTIP_PROPS} labelFormatter={formatTooltipLabel} />
        <Series key={type} dataKey={yKey} name={seriesName} {...seriesProps} {...extraProps} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
