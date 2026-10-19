import { useCounter } from '../../hooks/useCounter';
import './MagnitudeCounter.css';

export function MagnitudeCounter({ initialThreshold = 4.5 }) {
  const { count, increment, decrement, reset } = useCounter(initialThreshold, 0.5, 1.0, 9.0);

  return (
    <div className="widget-box magnitude-counter">
      <div className="widget-header">
        <h3 className="widget-title">Поріг тривоги (магнітуда)</h3>
        <span className="widget-tag">useState</span>
      </div>

      <div className="counter-display">
        <span className="counter-prefix">M ≥</span>
        <span className="counter-number">{count.toFixed(1)}</span>
      </div>

      <div className="counter-controls">
        <button
          type="button"
          className="btn-counter"
          onClick={decrement}
        >
          − 0.5
        </button>
        <button
          type="button"
          className="btn-counter btn-reset"
          onClick={reset}
        >
          Скинути
        </button>
        <button
          type="button"
          className="btn-counter"
          onClick={increment}
        >
          + 0.5
        </button>
      </div>
    </div>
  );
}