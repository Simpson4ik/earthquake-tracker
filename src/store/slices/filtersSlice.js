import { createSlice } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';
import { DEFAULT_FILTERS } from '../../constants/filters';
import { DEFAULT_SORT, getColumn } from '../../constants/columns';

const initialState = {
  values: DEFAULT_FILTERS,
  applied: DEFAULT_FILTERS,
  isAlertMode: false,
  sort: DEFAULT_SORT,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterChanged: {
      reducer(state, { payload }) {
        state.values[payload.name] = payload.value;
      },
      prepare: (name, value) => ({ payload: { name, value } }),
    },
    filtersApplied(state) {
      state.applied = state.values;
    },
    filtersReset(state) {
      state.values = DEFAULT_FILTERS;
      state.applied = DEFAULT_FILTERS;
      state.isAlertMode = false;
    },
    alertModeToggled(state) {
      state.isAlertMode = !state.isAlertMode;
    },
    sortToggled(state, { payload: key }) {
      const { sort } = state;
      state.sort =
        sort.key === key
          ? { key, direction: sort.direction === 'asc' ? 'desc' : 'asc' }
          : { key, direction: getColumn(key).defaultDirection };
    },
  },
  selectors: {
    selectFilterValues: (state) => state.values,
    selectAppliedFilters: (state) => state.applied,
    selectIsAlertMode: (state) => state.isAlertMode,
    selectSort: (state) => state.sort,
    selectIsFilterPending: (state) => !shallowEqual(state.values, state.applied),
    selectCanResetFilters: (state) => state.isAlertMode || !shallowEqual(state.values, DEFAULT_FILTERS),
  },
});

export const { filterChanged, filtersApplied, filtersReset, alertModeToggled, sortToggled } = filtersSlice.actions;

export const {
  selectFilterValues,
  selectAppliedFilters,
  selectIsAlertMode,
  selectSort,
  selectIsFilterPending,
  selectCanResetFilters,
} = filtersSlice.selectors;
