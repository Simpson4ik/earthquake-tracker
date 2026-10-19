import './MagnitudeCounter.css';

export function MagnitudeCounter({
  threshold,
  step,
  canDecrement,
  canIncrement,
  onIncrement,
  onDecrement,
  onReset,
}) {
  return (
    <div className="widget-box magnitude-counter">
      <div className="widget-header">
        <h3 className="widget-title">Мінімальна магнітуда</h3>
        <span className="widget-tag">useState</span>
      </div>

      <div className="counter-display" aria-live="polite">
        <span className="counter-prefix">M ≥</span>
        <span className="counter-number">{threshold.toFixed(1)}</span>
      </div>

      <div className="counter-controls">
        <button
          type="button"
          className="btn-counter"
          onClick={onDecrement}
          disabled={!canDecrement}
          aria-label={`Зменшити поріг на ${step}`}
        >
          − {step}
        </button>
        <button type="button" className="btn-counter btn-reset" onClick={onReset}>
          Скинути
        </button>
        <button
          type="button"
          className="btn-counter"
          onClick={onIncrement}
          disabled={!canIncrement}
          aria-label={`Збільшити поріг на ${step}`}
        >
          + {step}
        </button>
      </div>
    </div>
  );
}
