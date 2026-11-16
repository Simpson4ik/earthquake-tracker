import { useDispatch, useSelector } from 'react-redux';
import { alertModeToggled, selectIsAlertMode } from '../../store/slices/filtersSlice';
import { ALERT_MAGNITUDE } from '../../constants/categories';
import { formatMinMagnitude } from '../../utils/formatMagnitude';
import '../../styles/button.css';
import './ModeToggle.css';

export function ModeToggle() {
  const isAlertMode = useSelector(selectIsAlertMode);
  const dispatch = useDispatch();

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
            ? `У списку лише сильні події (${formatMinMagnitude(ALERT_MAGNITUDE)}).`
            : 'Поточний збір загальної телеметрії з усіх підключених сейсмостанцій.'}
        </p>
      </div>

      <button
        type="button"
        className={`btn btn-block btn-toggle ${isAlertMode ? 'btn-toggle-on' : ''}`}
        onClick={() => dispatch(alertModeToggled())}
      >
        {isAlertMode ? 'Вимкнути режим тривоги' : 'Увімкнути режим тривоги'}
      </button>
    </div>
  );
}
