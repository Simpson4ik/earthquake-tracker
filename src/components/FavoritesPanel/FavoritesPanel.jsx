import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { MagnitudeBadge } from '../MagnitudeBadge/MagnitudeBadge';
import { FavoriteToggle } from '../FavoriteToggle/FavoriteToggle';
import { ConfirmButton } from '../ConfirmButton/ConfirmButton';
import { favoritesCleared, selectFavorites } from '../../store/slices/favoritesSlice';
import { getEarthquakePath } from '../../constants/routes';
import { formatTime } from '../../utils/formatTime';
import './FavoritesPanel.css';

export function FavoritesPanel() {
  const titleId = useId();
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  return (
    <section className="widget-box favorites-panel" aria-labelledby={titleId}>
      <div className="widget-header">
        <h3 id={titleId} className="widget-title">
          Обране
        </h3>
        <span className="widget-tag">{favorites.length}</span>
      </div>

      {favorites.length === 0 ? (
        <p className="favorites-empty">Позначте подію зірочкою ☆ у списку або на сторінці деталей.</p>
      ) : (
        <>
          <ul className="favorites-list">
            {favorites.map((favorite) => (
              <li key={favorite.id} className="favorites-item">
                {favorite.magnitude !== null && <MagnitudeBadge magnitude={favorite.magnitude} />}
                <div className="favorites-info">
                  <Link to={getEarthquakePath(favorite.id)} className="favorites-link">
                    {favorite.place}
                  </Link>
                  <span className="favorites-time">{formatTime(favorite.time)}</span>
                </div>
                <FavoriteToggle earthquake={favorite} compact />
              </li>
            ))}
          </ul>
          <ConfirmButton
            label="Очистити обране"
            confirmLabel={`Так, видалити всі (${favorites.length})`}
            onConfirm={() => dispatch(favoritesCleared())}
          />
        </>
      )}
    </section>
  );
}
