import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { THEMES } from '../constants/theme';
import { readStoredTheme, writeStoredTheme } from '../utils/themeStorage';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === THEMES.dark ? THEMES.light : THEMES.dark;
    setTheme(nextTheme);
    writeStoredTheme(nextTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
