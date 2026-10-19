import { ALERT_MAGNITUDE } from '../../constants/categories';
import './ModeToggle.css';

export function ModeToggle({ isAlertMode, onToggle }) {
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
            ? `У списку лише сильні події (M ≥ ${ALERT_MAGNITUDE.toFixed(1)}).`
            : 'Поточний збір загальної телеметрії з усіх підключених сейсмостанцій.'}
        </p>
      </div>

      <button
        type="button"
        className={`btn-toggle ${isAlertMode ? 'btn-toggle-on' : ''}`}
        onClick={onToggle}
      >
        {isAlertMode ? 'Вимкнути режим тривоги' : 'Увімкнути режим тривоги'}
      </button>
    </div>
  );
}
