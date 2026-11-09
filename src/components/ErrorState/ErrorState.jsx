import '../../styles/status.css';

export function ErrorState({ error, onRetry }) {
  return (
    <div className="status-message status-error" role="alert">
      <p>Не вдалося завантажити дані. {error.message}</p>
      <button type="button" className="btn-retry" onClick={onRetry}>
        Спробувати ще раз
      </button>
    </div>
  );
}
