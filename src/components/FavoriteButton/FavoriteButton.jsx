import '../../styles/button.css';
import './FavoriteButton.css';

export function FavoriteButton({ isActive, onToggle, itemLabel, compact = false }) {
  const text = isActive ? 'Прибрати з обраного' : 'Додати в обране';
  const fullLabel = isActive ? `Прибрати «${itemLabel}» з обраного` : `Додати «${itemLabel}» в обране`;

  return (
    <button
      type="button"
      className={`btn favorite-button ${compact ? 'favorite-button-compact' : ''} ${isActive ? 'is-active' : ''}`}
      aria-label={compact ? fullLabel : undefined}
      title={compact ? fullLabel : undefined}
      onClick={onToggle}
    >
      <span className="favorite-icon" aria-hidden="true">
        {isActive ? '★' : '☆'}
      </span>
      {!compact && text}
    </button>
  );
}
