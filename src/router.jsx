import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { AppLayout } from './components/AppLayout/AppLayout';
import { HomePage } from './pages/HomePage/HomePage';
import { EarthquakeDetailsPage } from './pages/EarthquakeDetailsPage/EarthquakeDetailsPage';
import { MessagePage } from './pages/MessagePage/MessagePage';
import { ROUTES } from './constants/routes';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.home} element={<AppLayout />}>
      <Route errorElement={<MessagePage title="Щось пішло не так" message="Не вдалося показати цю сторінку." />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.earthquake} element={<EarthquakeDetailsPage />} />
        <Route path="*" element={<MessagePage title="Сторінку не знайдено" message="Такої адреси в застосунку немає." />} />
      </Route>
    </Route>,
  ),
);
