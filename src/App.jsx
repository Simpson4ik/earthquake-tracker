import { Header } from './components/Header/Header';
import { EarthquakeDashboard } from './components/EarthquakeDashboard/EarthquakeDashboard';
import { APP_NAME, APP_SUBTITLE } from './constants/app';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <Header appName={APP_NAME} subtitle={APP_SUBTITLE} />
      <EarthquakeDashboard />
    </div>
  );
}
