import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { filtersSlice } from './slices/filtersSlice';
import { themeSlice } from './slices/themeSlice';
import { createFavoritesState, favoritesSlice, favoritesSynced } from './slices/favoritesSlice';
import { chartSlice } from './slices/chartSlice';
import { listenerMiddleware } from './listenerMiddleware';
import { usgsApi } from '../api/usgsApi';
import { readStoredTheme } from '../utils/themeStorage';
import { readStoredFavorites, subscribeToStoredFavorites } from '../utils/favoritesStorage';

const rootReducer = combineSlices(filtersSlice, themeSlice, favoritesSlice, chartSlice, usgsApi);

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    theme: readStoredTheme(),
    favorites: createFavoritesState(readStoredFavorites()),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(usgsApi.middleware),
});

subscribeToStoredFavorites((favorites) => store.dispatch(favoritesSynced(favorites)));
