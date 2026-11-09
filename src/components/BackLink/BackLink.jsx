import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import './BackLink.css';

export function BackLink() {
  return (
    <Link to={ROUTES.home} className="back-link">
      <span aria-hidden="true">←</span> Назад до списку
    </Link>
  );
}
