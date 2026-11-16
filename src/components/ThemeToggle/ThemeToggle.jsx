import { useTheme } from '../../hooks/useTheme';
import { THEMES } from '../../constants/theme';
import './ThemeToggle.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === THEMES.dark;

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      <span aria-hidden="true">{isDark ? '☀' : '☾'}</span> {isDark ? 'Світла тема' : 'Темна тема'}
    </button>
  );
}
