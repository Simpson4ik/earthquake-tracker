import { COLUMNS } from '../../constants/columns';
import { formatTime } from '../../utils/formatTime';
import { getCategory } from '../../constants/categories';
import './EarthquakeTable.css';

function ariaSort(isActive, direction) {
  if (!isActive) return 'none';
  return direction === 'asc' ? 'ascending' : 'descending';
}

function sortArrow(isActive, direction) {
  if (!isActive) return '';
  return direction === 'asc' ? ' ▲' : ' ▼';
}

export function EarthquakeTable({ earthquakes, sortKey, sortDirection, onSort }) {
  return (
    <table className="earthquake-table">
      <thead>
        <tr>
          {COLUMNS.map(({ key, label, compare }) => {
            if (!compare) {
              return (
                <th key={key} scope="col" className="th-static">
                  {label}
                </th>
              );
            }
            const isActive = key === sortKey;
            return (
              <th key={key} scope="col" aria-sort={ariaSort(isActive, sortDirection)}>
                <button type="button" className="sort-button" onClick={() => onSort(key)}>
                  {label}
                  <span aria-hidden="true">{sortArrow(isActive, sortDirection)}</span>
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {earthquakes.map((eq) => {
          const category = getCategory(eq.magnitude);
          return (
            <tr key={eq.id} className={`earthquake-row mag-${category.id}`}>
              <td className="earthquake-place">{eq.place}</td>
              <td>
                <span className="mag-badge">M {eq.magnitude.toFixed(1)}</span>
              </td>
              <td>{eq.depth.toFixed(1)}</td>
              <td>{formatTime(eq.time)}</td>
              <td>{category.label}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
