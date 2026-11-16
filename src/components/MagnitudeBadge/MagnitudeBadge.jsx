import { getCategory } from '../../constants/categories';
import { formatMagnitude } from '../../utils/formatMagnitude';
import './MagnitudeBadge.css';

export function MagnitudeBadge({ magnitude }) {
  return <span className={`mag-badge mag-${getCategory(magnitude).id}`}>{formatMagnitude(magnitude)}</span>;
}
