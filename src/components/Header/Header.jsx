import './Header.css';

export function Header({ appName, subtitle }) {
  return (
    <header className="dashboard-header">
      <div className="header-badge">USGS Seismic Monitor</div>
      <h1 className="header-title">{appName}</h1>
      <p className="header-subtitle">{subtitle}</p>
    </header>
  );
}