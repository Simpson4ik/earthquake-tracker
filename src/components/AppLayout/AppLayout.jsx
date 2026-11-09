import { Outlet, ScrollRestoration } from 'react-router';
import { Header } from '../Header/Header';
import { useFocusOnRouteChange } from '../../hooks/useFocusOnRouteChange';
import { APP_NAME, APP_SUBTITLE } from '../../constants/app';
import './AppLayout.css';

export function AppLayout() {
  const contentRef = useFocusOnRouteChange();

  return (
    <div className="app-container">
      <Header appName={APP_NAME} subtitle={APP_SUBTITLE} />
      <div ref={contentRef} className="route-content" tabIndex={-1}>
        <Outlet />
      </div>
      <ScrollRestoration />
    </div>
  );
}
