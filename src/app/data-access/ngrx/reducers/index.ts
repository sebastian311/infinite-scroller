import { AppState } from '../../models/state.interface';

export const initialState: AppState = {
  photosList: [],
  favoritePhotosList: [],
  isLoading: false
};

import { isDevMode } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';

import { Photo } from '../../models/photo.interface';
import * as LoadingActions from '../actions/loading-action';
import * as FavoritePhotosActions from "../actions/favorite-photos-actions"
import * as PhotoActions from "../actions/photo-actions"

const photoReducer = createReducer(
    initialState,
    on(PhotoActions.populatePhotosListSuccess, (state, { photos }) => ({
      ...state,
      photosList: [...photos],
      isLoading: false
    })),
    on(PhotoActions.loadMorePhotosSuccess, (state, { photos }) => ({
      ...state,
      photosList: [...state.photosList, ...photos],
      isLoading: false
    })),
    on(PhotoActions.addPhotoToFavorites, (state, { photoId }) => {
      const existingPhoto = state.favoritePhotosList.find(p => p.id === photoId);
      if (existingPhoto) {
        // Photo is already in the favorites, do not add it again
        return state;
      }
      
      const photoToAdd = state.photosList.find(p => p.id === photoId);
      
      return {
        ...state,
        favoritePhotosList: photoToAdd ? [...state.favoritePhotosList, photoToAdd] : state.favoritePhotosList
      };
    }),
    on(FavoritePhotosActions.setFavoritePhotos, (state, { favoritePhotos }) => {
      console.log("Current State:", state);
      console.log("New Favorite Photos:", favoritePhotos);
      return {
        ...state,
        favoritePhotosList: favoritePhotos
      };
    })
);

const loadingReducer = createReducer(
  initialState.isLoading,
  on(LoadingActions.startLoading, () => true),
  on(LoadingActions.stopLoading, () => false)
);

export const reducers: ActionReducerMap<AppState, Action> = {
  photosList: photoReducer as unknown as ActionReducer<Photo[], Action>,
  favoritePhotosList: photoReducer as unknown as ActionReducer<Photo[], Action>,
  isLoading: loadingReducer as ActionReducer<boolean, Action>
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
