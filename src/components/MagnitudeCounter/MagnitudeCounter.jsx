import './MagnitudeCounter.css';

export function MagnitudeCounter({ threshold, step, onIncrement, onDecrement, onReset }) {
  return (
    <div className="widget-box magnitude-counter">
      <div className="widget-header">
        <h3 className="widget-title">Мінімальна магнітуда</h3>
        <span className="widget-tag">useState</span>
      </div>

      <div className="counter-display">
        <span className="counter-prefix">M ≥</span>
        <span className="counter-number">{threshold.toFixed(1)}</span>
      </div>

      <div className="counter-controls">
        <button type="button" className="btn-counter" onClick={onDecrement}>
          − {step}
        </button>
        <button type="button" className="btn-counter btn-reset" onClick={onReset}>
          Скинути
        </button>
        <button type="button" className="btn-counter" onClick={onIncrement}>
          + {step}
        </button>
      </div>
    </div>
  );
}
