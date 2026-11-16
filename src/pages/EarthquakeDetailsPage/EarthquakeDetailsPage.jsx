import { useParams } from 'react-router';
import { BackLink } from '../../components/BackLink/BackLink';
import { LoadingState } from '../../components/LoadingState/LoadingState';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { EarthquakeDetails } from '../../components/EarthquakeDetails/EarthquakeDetails';
import { MessagePage } from '../MessagePage/MessagePage';
import { useEarthquakeDetails } from '../../hooks/useEarthquakeDetails';
import { isEventMissingError } from '../../api/earthquakesApi';
import { getPageTitle } from '../../constants/app';
import './EarthquakeDetailsPage.css';

export function EarthquakeDetailsPage() {
  const { id } = useParams();
  const { data: earthquake, loading, error, refetch } = useEarthquakeDetails(id);

  if (isEventMissingError(error)) {
    return <MessagePage title="Подію не знайдено" message={`USGS не має події з ідентифікатором «${id}».`} />;
  }

  return (
    <main className="details-page">
      <title>{getPageTitle(earthquake?.place ?? 'Деталі події')}</title>
      <BackLink />
      {loading && <LoadingState />}
      {error && <ErrorState error={error} onRetry={refetch} />}
      {earthquake && <EarthquakeDetails earthquake={earthquake} />}
    </main>
  );
}
