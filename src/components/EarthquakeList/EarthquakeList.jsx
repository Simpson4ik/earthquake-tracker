import { useEarthquakeFilter } from '../../hooks/useEarthquakeFilter';
import './EarthquakeList.css';

export function EarthquakeList({ earthquakes }) {
  const { selectedCategory, setSelectedCategory, filteredItems } = useEarthquakeFilter(earthquakes);

  return (
    <div className="widget-box earthquake-list-widget">
      <div className="list-controls-bar">
        <div>
          <h3 className="widget-title">Останні сейсмічні події</h3>
          <span className="list-count-badge">Знайдено: {filteredItems.length}</span>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">Усі події</option>
          <option value="minor">Слабкі (M &lt; 4.0)</option>
          <option value="moderate">Помірні (M 4.0 - 5.9)</option>
          <option value="strong">Сильні (M ≥ 6.0)</option>
        </select>
      </div>

      <div className="earthquake-items-container">
        {filteredItems.length === 0 ? (
          <div className="empty-message">Подій у вибраній категорії не знайдено</div>
        ) : (
          filteredItems.map((event) => (
            <div key={event.id} className={`earthquake-row mag-${event.category}`}>
              <div className="mag-badge">
                M {event.magnitude.toFixed(1)}
              </div>
              <div className="earthquake-info">
                <div className="earthquake-place">{event.place}</div>
                <div className="earthquake-meta">
                  Глибина: {event.depth} км • {event.time}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}