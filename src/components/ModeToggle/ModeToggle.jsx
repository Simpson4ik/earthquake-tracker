import { useToggle } from '../../hooks/useToggle';
import './ModeToggle.css';

export function ModeToggle() {
  const [isAlertMode, toggleAlertMode] = useToggle(false);

  return (
    <div className={`widget-box mode-toggle-widget ${isAlertMode ? 'alert-active' : ''}`}>
      <div className="widget-header">
        <h3 className="widget-title">Режим моніторингу</h3>
        <span className="widget-tag">Conditional</span>
      </div>

      <div className="toggle-status-box">
        <div className="status-indicator">
          <span className={`status-dot ${isAlertMode ? 'dot-active' : ''}`} />
          <span className="status-label">
            {isAlertMode ? 'Критичний моніторинг' : 'Стандартний моніторинг'}
          </span>
        </div>
        <p className="status-description">
          {isAlertMode
            ? 'Фокус на руйнівних подіях (M > 6.0) з увімкненим звуковим оповіщенням.'
            : 'Поточний збір загальної телеметрії з усіх підключених сейсмостанцій.'}
        </p>
      </div>

      <button
        type="button"
        className={`btn-toggle ${isAlertMode ? 'btn-toggle-on' : ''}`}
        onClick={toggleAlertMode}
      >
        {isAlertMode ? 'Вимкнути режим тривоги' : 'Увімкнути режим тривоги'}
      </button>
    </div>
  );
}