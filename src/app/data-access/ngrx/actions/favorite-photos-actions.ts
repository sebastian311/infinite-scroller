import { createAction, props } from '@ngrx/store';
import { Photo } from '../../models/photo.interface';

// Set the entire list of favorite photos
export const setFavoritePhotos = createAction(
  '[Favorite-Photos Component] Set Favorite Photos',
  props<{ favoritePhotos: Photo[] }>()
);
