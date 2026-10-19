import { EarthquakeListBody } from './EarthquakeListBody';
import { ALL_CATEGORIES, CATEGORIES } from '../../constants/categories';
import './EarthquakeList.css';

export function EarthquakeList({ category, onCategoryChange, ...bodyProps }) {
  const { loading, error, earthquakes } = bodyProps;
  const isReady = !loading && !error;

  return (
    <div className="widget-box earthquake-list-widget">
      <div className="list-controls-bar">
        <div>
          <h3 className="widget-title">Останні сейсмічні події</h3>
          {isReady && <span className="list-count-badge">Знайдено: {earthquakes.length}</span>}
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
        <EarthquakeListBody {...bodyProps} />
      </div>
    </div>
  );
}
