import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_THEME, THEMES } from '../../constants/theme';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: DEFAULT_THEME,
  reducers: {
    themeToggled: (theme) => (theme === THEMES.dark ? THEMES.light : THEMES.dark),
  },
  selectors: {
    selectTheme: (theme) => theme,
  },
});

export const { themeToggled } = themeSlice.actions;
export const { selectTheme } = themeSlice.selectors;
