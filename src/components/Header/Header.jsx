import { Link } from 'react-router';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { ROUTES } from '../../constants/routes';
import './Header.css';

export function Header({ appName, subtitle }) {
  return (
    <header className="dashboard-header">
      <div className="header-top">
        <div className="header-badge">USGS Seismic Monitor</div>
        <ThemeToggle />
      </div>
      <h1 className="header-title">
        <Link to={ROUTES.home} className="header-title-link">
          {appName}
        </Link>
      </h1>
      <p className="header-subtitle">{subtitle}</p>
    </header>
  );
}
