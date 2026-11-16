import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const favoritesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.addedAt - a.addedAt,
});

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesAdapter.getInitialState(),
  reducers: {
    favoriteToggled: {
      reducer(state, { payload }) {
        if (state.entities[payload.id]) {
          favoritesAdapter.removeOne(state, payload.id);
        } else {
          favoritesAdapter.addOne(state, payload);
        }
      },
      prepare: ({ id, place, magnitude, time }) => ({
        payload: { id, place, magnitude, time, addedAt: Date.now() },
      }),
    },
    favoritesCleared: favoritesAdapter.removeAll,
    favoritesSynced(state, { payload }) {
      favoritesAdapter.setAll(state, payload ?? []);
    },
  },
});

export function createFavoritesState(favorites) {
  return favoritesAdapter.setAll(favoritesAdapter.getInitialState(), favorites ?? []);
}

export const { favoriteToggled, favoritesCleared, favoritesSynced } = favoritesSlice.actions;

const favoritesSelectors = favoritesAdapter.getSelectors((state) => state.favorites);

export const selectFavorites = favoritesSelectors.selectAll;

export const selectIsFavorite = (state, id) => Boolean(favoritesSelectors.selectById(state, id));
