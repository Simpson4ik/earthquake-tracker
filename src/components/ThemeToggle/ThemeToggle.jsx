import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, themeToggled } from '../../store/slices/themeSlice';
import { THEMES } from '../../constants/theme';
import '../../styles/button.css';
import './ThemeToggle.css';

export function ThemeToggle() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const isDark = theme === THEMES.dark;

  return (
    <button type="button" className="btn theme-toggle" onClick={() => dispatch(themeToggled())}>
      <span aria-hidden="true">{isDark ? '☀' : '☾'}</span> {isDark ? 'Світла тема' : 'Темна тема'}
    </button>
  );
}
