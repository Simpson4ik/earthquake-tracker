import { EarthquakeTable } from '../EarthquakeTable/EarthquakeTable';
import { ALL_CATEGORIES, CATEGORIES } from '../../constants/categories';
import './EarthquakeList.css';

function ListBody({ loading, error, earthquakes, ...tableProps }) {
  if (loading) {
    return <div className="status-message">Завантаження даних USGS…</div>;
  }
  if (error) {
    return (
      <div className="status-message status-error" role="alert">
        Не вдалося завантажити дані: {error.message}
      </div>
    );
  }
  if (earthquakes.length === 0) {
    return <div className="status-message empty-message">Подій за вибраними умовами не знайдено</div>;
  }
  return <EarthquakeTable earthquakes={earthquakes} {...tableProps} />;
}

export function EarthquakeList({ category, onCategoryChange, ...bodyProps }) {
  return (
    <div className="widget-box earthquake-list-widget">
      <div className="list-controls-bar">
        <div>
          <h3 className="widget-title">Останні сейсмічні події</h3>
          <span className="list-count-badge">Знайдено: {bodyProps.earthquakes.length}</span>
        </div>
        <select
          aria-label="Фільтр за категорією"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          <option value={ALL_CATEGORIES}>Усі події</option>
          {CATEGORIES.map(({ id, label, range }) => (
            <option key={id} value={id}>
              {label} ({range})
            </option>
          ))}
        </select>
      </div>

      <div className="earthquake-items-container">
        <ListBody {...bodyProps} />
      </div>
    </div>
  );
}
