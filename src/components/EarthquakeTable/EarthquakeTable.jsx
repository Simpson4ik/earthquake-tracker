import { Link, useNavigate } from 'react-router';
import { MagnitudeBadge } from '../MagnitudeBadge/MagnitudeBadge';
import { useFilters } from '../../hooks/useFilters';
import { COLUMNS } from '../../constants/columns';
import { getCategory } from '../../constants/categories';
import { getEarthquakePath } from '../../constants/routes';
import { formatTime } from '../../utils/formatTime';
import './EarthquakeTable.css';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' };
const SORT_ARROW = { asc: ' ▲', desc: ' ▼' };

export function EarthquakeTable({ earthquakes }) {
  const { sort, toggleSort } = useFilters();
  const navigate = useNavigate();

  const handleRowClick = (event, id) => {
    const isLinkClick = event.target.closest('a');
    const isSelectingText = !window.getSelection().isCollapsed;
    if (!isLinkClick && !isSelectingText) {
      navigate(getEarthquakePath(id));
    }
  };

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
                <button type="button" className="sort-button" onClick={() => toggleSort(key)}>
                  {label}
                  <span aria-hidden="true">{isActive ? SORT_ARROW[sort.direction] : ''}</span>
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {earthquakes.map((eq) => (
          <tr key={eq.id} onClick={(event) => handleRowClick(event, eq.id)}>
            <td className="earthquake-place">
              <Link to={getEarthquakePath(eq.id)} className="earthquake-link">
                {eq.place}
              </Link>
            </td>
            <td>
              <MagnitudeBadge magnitude={eq.magnitude} />
            </td>
            <td>{eq.depth.toFixed(1)}</td>
            <td>{formatTime(eq.time)}</td>
            <td>{getCategory(eq.magnitude).label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
