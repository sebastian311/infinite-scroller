import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import { Photo } from 'src/app/data-access/models/photo.interface';
import { AppState } from 'src/app/data-access/models/state.interface';
import { setFavoritePhotos } from 'src/app/data-access/ngrx/actions/favorite-photos-actions';
import { selectFavPhotos } from 'src/app/data-access/ngrx/reducers/selectors';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent {
  favPhotos$: Observable<Photo[]>;
  
  constructor(
    public dialogRef: MatDialogRef<PhotoDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { photo: Photo },
    private store: Store<AppState>
    ){
      this.favPhotos$ = this.store.select(selectFavPhotos);
    }

  closeDialog() {
    this.dialogRef.close();
  }

  removeFromFavorites() {
    this.favPhotos$.pipe(
      take(1),
      map(favorites => favorites.filter(photo => photo.id !== this.data.photo.id)),
      tap(updatedFavorites => {
        this.store.dispatch(setFavoritePhotos({ favoritePhotos: updatedFavorites }));
        this.closeDialog(); // Close the dialog after updating the state
      })
    ).subscribe();
  }
}
