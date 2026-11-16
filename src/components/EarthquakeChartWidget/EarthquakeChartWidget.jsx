import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartBody } from './ChartBody';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';
import { selectChartData, selectFeedStatus } from '../../store/selectors/earthquakesSelectors';
import {
  chartGroupingChanged,
  chartTypeChanged,
  selectChartGroupBy,
  selectChartType,
} from '../../store/slices/chartSlice';
import {
  CHART_DESCRIPTIONS,
  CHART_GROUPING_OPTIONS,
  CHART_HEIGHT,
  CHART_LABEL_HEADERS,
  CHART_TYPE_OPTIONS,
} from '../../constants/chart';
import './EarthquakeChartWidget.css';

const FIGURE_STYLE = { '--chart-height': `${CHART_HEIGHT}px` };

export function EarthquakeChartWidget() {
  const titleId = useId();
  const { loading, error } = useSelector(selectFeedStatus);
  const data = useSelector(selectChartData);
  const type = useSelector(selectChartType);
  const groupBy = useSelector(selectChartGroupBy);
  const dispatch = useDispatch();

  return (
    <section className="widget-box chart-widget" aria-labelledby={titleId}>
      <div className="widget-header">
        <h3 id={titleId} className="widget-title">
          Графік подій
        </h3>
        <span className="widget-tag">Recharts</span>
      </div>

      <div className="chart-controls">
        <SegmentedControl
          legend="Групування"
          options={CHART_GROUPING_OPTIONS}
          value={groupBy}
          onChange={(value) => dispatch(chartGroupingChanged(value))}
        />
        <SegmentedControl
          legend="Тип графіка"
          options={CHART_TYPE_OPTIONS}
          value={type}
          onChange={(value) => dispatch(chartTypeChanged(value))}
        />
      </div>

      <figure className="chart-figure" style={FIGURE_STYLE}>
        <ChartBody
          loading={loading}
          error={error}
          data={data}
          type={type}
          description={CHART_DESCRIPTIONS[groupBy]}
          labelHeader={CHART_LABEL_HEADERS[groupBy]}
        />
        <figcaption className="chart-caption">{CHART_DESCRIPTIONS[groupBy]} (з урахуванням активних фільтрів)</figcaption>
      </figure>
    </section>
  );
}
