import { useDispatch, useSelector } from 'react-redux';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { favoriteToggled, selectIsFavorite } from '../../store/slices/favoritesSlice';

export function FavoriteToggle({ earthquake, compact }) {
  const isActive = useSelector((state) => selectIsFavorite(state, earthquake.id));
  const dispatch = useDispatch();

  return (
    <FavoriteButton
      isActive={isActive}
      onToggle={() => dispatch(favoriteToggled(earthquake))}
      itemLabel={earthquake.place}
      compact={compact}
    />
  );
}
