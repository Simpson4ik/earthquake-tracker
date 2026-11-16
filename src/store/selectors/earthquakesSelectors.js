import { createSelector } from '@reduxjs/toolkit';
import { getQueryStatus, usgsApi } from '../../api/usgsApi';
import { selectAppliedFilters, selectIsAlertMode, selectSort } from '../slices/filtersSlice';
import { selectChartGroupBy } from '../slices/chartSlice';
import { ALERT_MAGNITUDE } from '../../constants/categories';
import { MAGNITUDE_OPTIONS, PERIOD_OPTIONS, getOptionLabel } from '../../constants/filters';
import { parseMinMagnitude } from '../../utils/parseMinMagnitude';
import { filterEarthquakes } from '../../utils/filterEarthquakes';
import { sortEarthquakes } from '../../utils/sortEarthquakes';
import { computeKpis } from '../../utils/computeKpis';
import { buildChartData } from '../../utils/buildChartData';
import { formatMinMagnitude } from '../../utils/formatMagnitude';

const NO_DATA = [];

export const selectFeedParams = createSelector(
  [(state) => selectAppliedFilters(state).magnitude, (state) => selectAppliedFilters(state).period],
  (magnitude, period) => ({ magnitude, period }),
);

const selectFeedQuery = createSelector([selectFeedParams], (params) =>
  usgsApi.endpoints.getEarthquakes.select(params),
);

const selectFeedEntry = (state) => selectFeedQuery(state)(state);

const selectFeedData = (state) => selectFeedEntry(state).data ?? NO_DATA;

export const selectFeedStatus = createSelector([selectFeedEntry], getQueryStatus);

const selectMinMagnitudeThreshold = (state) => parseMinMagnitude(selectAppliedFilters(state).minMagnitude);

const selectFilterCriteria = createSelector(
  [
    (state) => selectAppliedFilters(state).search,
    (state) => selectAppliedFilters(state).category,
    selectMinMagnitudeThreshold,
    selectIsAlertMode,
  ],
  (search, category, threshold, isAlertMode) => ({
    search,
    category,
    minMagnitude: isAlertMode ? Math.max(threshold, ALERT_MAGNITUDE) : threshold,
  }),
);

export const selectFilteredEarthquakes = createSelector([selectFeedData, selectFilterCriteria], filterEarthquakes);

export const selectVisibleEarthquakes = createSelector(
  [selectFilteredEarthquakes, selectSort, (state) => selectAppliedFilters(state).limit],
  (earthquakes, sort, limit) => sortEarthquakes(earthquakes, sort).slice(0, Number(limit)),
);

export const selectFilteredCount = (state) => selectFilteredEarthquakes(state).length;

export const selectVisibleCount = (state) => selectVisibleEarthquakes(state).length;

export const selectKpis = createSelector([selectFilteredEarthquakes], computeKpis);

export const selectSelectionLabel = createSelector(
  [selectAppliedFilters, selectMinMagnitudeThreshold],
  ({ magnitude, period }, threshold) =>
    [
      getOptionLabel(MAGNITUDE_OPTIONS, magnitude),
      getOptionLabel(PERIOD_OPTIONS, period).toLowerCase(),
      Number.isFinite(threshold) && formatMinMagnitude(threshold),
    ]
      .filter(Boolean)
      .join(' · '),
);

export const selectChartData = createSelector(
  [selectFilteredEarthquakes, selectChartGroupBy, (state) => selectAppliedFilters(state).period],
  buildChartData,
);
