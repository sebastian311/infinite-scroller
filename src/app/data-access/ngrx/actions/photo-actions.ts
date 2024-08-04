import { createAction, props } from '@ngrx/store';
import { Photo } from '../../models/photo.interface';

// Random Photos - Populate Array
export const populatePhotosList = createAction('[Photo-List Component] Update photos list')
export const populatePhotosListSuccess = createAction('[Photo-List Component] Update photos list Success', props<{ photos: Photo[] }>());
export const populatePhotosListFailure = createAction('[Photo-List Component] Update photos list Failure', props<{ error: string }>());

// Favorite Photos
export const addPhotoToFavorites = createAction('[Photo-List Component] Added photo to favorites', props<{ photoId: string }>());
export const addPhotoToFavoritesSuccess = createAction('[Photo-List Component] Added photo to favorites Success', props<{ photoId: string }>());
export const addPhotoToFavoritesFailure = createAction('[Photo-List Component] Added photo to favorites Failure', props<{ error: string }>());

// Random Photos - Update Array
export const loadMorePhotos = createAction('[Photo-List Component] Added photo to existing', props<{ count: number }>());
export const loadMorePhotosSuccess = createAction('[Photo-List Component] Added photo to existing Success', props<{ photos: Photo[] }>());
export const loadMorePhotosFailure = createAction('[Photo-List Component] Added photo to existing Failure', props<{ error: string }>());
