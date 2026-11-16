import '../../styles/status.css';

export function ChartLoadError() {
  return (
    <div className="status-message status-error" role="alert">
      Не вдалося завантажити графік. Оновіть сторінку.
    </div>
  );
}
