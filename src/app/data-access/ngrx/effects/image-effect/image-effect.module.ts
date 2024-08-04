import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FetchPhotosService } from 'src/app/data-access/services/fetch-photos.service';
import * as PhotoAction from '../../actions/photo-actions';

@Injectable()
export class PhotoEffects {
  constructor(
    private actions$: Actions,
    private fetchImagesService: FetchPhotosService
  ) {}

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotoAction.populatePhotosList),
      mergeMap(() =>
        this.fetchImagesService.loadRandomImages().pipe(
          map((photos) => PhotoAction.populatePhotosListSuccess({ photos })),
          catchError((error) =>
            of(PhotoAction.addPhotoToFavoritesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadMorePhotos$ = createEffect(() => this.actions$.pipe(
    ofType(PhotoAction.loadMorePhotos),
    mergeMap(action =>
      this.fetchImagesService.getPhotos(action.count).pipe(
        map(photos => PhotoAction.loadMorePhotosSuccess({ photos })),
        catchError(error => of(PhotoAction.loadMorePhotosFailure({ error: error.toString() })))
      )
    )
  ));
}
