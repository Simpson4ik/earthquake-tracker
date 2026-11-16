import { lazy, Suspense } from 'react';
import { ChartLoadError } from './ChartLoadError';
import { ChartDataTable } from '../ChartDataTable/ChartDataTable';
import { LoadingState } from '../LoadingState/LoadingState';
import { CHART_HEIGHT } from '../../constants/chart';
import '../../styles/status.css';

const dataChartModule = import('../DataChart/DataChart')
  .then((module) => ({ default: module.DataChart }))
  .catch((error) => {
    console.error(error);
    return { default: ChartLoadError };
  });

const DataChart = lazy(() => dataChartModule);

export function ChartBody({ loading, error, data, type, description, labelHeader }) {
  if (loading) {
    return <LoadingState />;
  }
  if (error) {
    return <div className="status-message">Графік недоступний: дані не завантажено.</div>;
  }
  if (data.length === 0) {
    return <div className="status-message">Немає подій для побудови графіка</div>;
  }
  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <DataChart
          data={data}
          type={type}
          xKey="label"
          yKey="count"
          tooltipLabelKey="tooltipLabel"
          seriesName="Подій"
          height={CHART_HEIGHT}
        />
      </Suspense>
      <ChartDataTable
        caption={description}
        data={data}
        rowKey="key"
        labelKey="tooltipLabel"
        valueKey="count"
        labelHeader={labelHeader}
        valueHeader="Подій"
      />
    </>
  );
}
