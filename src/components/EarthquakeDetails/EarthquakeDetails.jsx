import { MagnitudeBadge } from '../MagnitudeBadge/MagnitudeBadge';
import { getCategory } from '../../constants/categories';
import { buildDetailSections } from '../../utils/buildDetailSections';
import { formatDateTime } from '../../utils/formatTime';
import './EarthquakeDetails.css';

export function EarthquakeDetails({ earthquake }) {
  const { magnitude, place, time, url } = earthquake;
  const hasMagnitude = magnitude !== null;

  return (
    <article className="earthquake-details">
      <header className="widget-box details-summary">
        {hasMagnitude && <MagnitudeBadge magnitude={magnitude} />}
        <div className="details-heading">
          <h2 className="details-title">{place}</h2>
          <p className="details-meta">
            {hasMagnitude && `${getCategory(magnitude).label} · `}
            {formatDateTime(time)}
          </p>
        </div>
        <a className="details-source" href={url} target="_blank" rel="noreferrer">
          Сторінка події на USGS
        </a>
      </header>

      <div className="details-grid">
        {buildDetailSections(earthquake).map(({ id, title, items }) => (
          <section key={id} className="widget-box">
            <h3 className="widget-title">{title}</h3>
            <dl className="details-list">
              {items.map(({ label, value }) => (
                <div key={label} className="details-row">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </article>
  );
}
