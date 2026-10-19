import { COLUMNS } from '../../constants/columns';
import { getCategory } from '../../constants/categories';
import { formatTime } from '../../utils/formatTime';
import { formatMagnitude } from '../../utils/formatMagnitude';
import './EarthquakeTable.css';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' };
const SORT_ARROW = { asc: ' ▲', desc: ' ▼' };

export function EarthquakeTable({ earthquakes, sort, onSort }) {
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
            const isActive = key === sort.key;
            return (
              <th key={key} scope="col" aria-sort={isActive ? ARIA_SORT[sort.direction] : 'none'}>
                <button type="button" className="sort-button" onClick={() => onSort(key)}>
                  {label}
                  <span aria-hidden="true">{isActive ? SORT_ARROW[sort.direction] : ''}</span>
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
            <tr key={eq.id} className={`mag-${category.id}`}>
              <td className="earthquake-place">{eq.place}</td>
              <td>
                <span className="mag-badge">{formatMagnitude(eq.magnitude)}</span>
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
