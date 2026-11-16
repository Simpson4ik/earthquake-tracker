import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { filterChanged, filtersApplied } from './slices/filtersSlice';
import { selectTheme, themeToggled } from './slices/themeSlice';
import { favoritesCleared, favoriteToggled, selectFavorites } from './slices/favoritesSlice';
import { DEBOUNCE_MS } from '../constants/filters';
import { writeStoredTheme } from '../utils/themeStorage';
import { writeStoredFavorites } from '../utils/favoritesStorage';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: filterChanged,
  effect: async (_action, api) => {
    api.cancelActiveListeners();
    await api.delay(DEBOUNCE_MS);
    api.dispatch(filtersApplied());
  },
});

listenerMiddleware.startListening({
  actionCreator: themeToggled,
  effect: (_action, api) => {
    const theme = selectTheme(api.getState());
    document.documentElement.dataset.theme = theme;
    writeStoredTheme(theme);
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(favoriteToggled, favoritesCleared),
  effect: (_action, api) => {
    writeStoredFavorites(selectFavorites(api.getState()));
  },
});
