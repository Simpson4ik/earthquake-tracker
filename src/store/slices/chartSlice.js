import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CHART } from '../../constants/chart';

export const chartSlice = createSlice({
  name: 'chart',
  initialState: DEFAULT_CHART,
  reducers: {
    chartTypeChanged(state, { payload }) {
      state.type = payload;
    },
    chartGroupingChanged(state, { payload }) {
      state.groupBy = payload;
    },
  },
  selectors: {
    selectChartType: (state) => state.type,
    selectChartGroupBy: (state) => state.groupBy,
  },
});

export const { chartTypeChanged, chartGroupingChanged } = chartSlice.actions;
export const { selectChartType, selectChartGroupBy } = chartSlice.selectors;
