import { Header } from './components/Header/Header';
import { KpiCard } from './components/KpiCard/KpiCard';
import { MagnitudeCounter } from './components/MagnitudeCounter/MagnitudeCounter';
import { ModeToggle } from './components/ModeToggle/ModeToggle';
import { EarthquakeList } from './components/EarthquakeList/EarthquakeList';
import { KPI_DATA, MOCK_EARTHQUAKES } from './data/mockEarthquakes';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <Header
        appName="Earthquake Monitoring Dashboard"
        subtitle="Лабораторна робота №1: Компонентна архітектура та стан віджетів"
      />

      <section className="kpi-grid">
        {KPI_DATA.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
          />
        ))}
      </section>

      <main className="dashboard-grid">
        <aside className="controls-column">
          <MagnitudeCounter initialThreshold={4.5} />
          <ModeToggle />
        </aside>

        <section className="feed-column">
          <EarthquakeList earthquakes={MOCK_EARTHQUAKES} />
        </section>
      </main>
    </div>
  );
}