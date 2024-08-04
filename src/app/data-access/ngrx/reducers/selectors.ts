import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../models/state.interface';

export const selectAppStatePhotosList = createFeatureSelector<AppState>('photosList');

export const selectPhotosList = createSelector(
  selectAppStatePhotosList,
  (state: AppState) => state.photosList
);

export const selectFavPhotos = createSelector(
  selectAppStatePhotosList,
  (state: AppState) => state.favoritePhotosList
);
