import { DEFAULT_THEME, THEMES } from '../constants/theme';

const STORAGE_KEY = 'earthquake-tracker:theme';

export function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return Object.values(THEMES).includes(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function writeStoredTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    return;
  }
}
