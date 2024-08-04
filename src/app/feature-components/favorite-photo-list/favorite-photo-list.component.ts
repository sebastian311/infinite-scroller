import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Photo } from 'src/app/data-access/models/photo.interface';
import { AppState } from 'src/app/data-access/models/state.interface';
import { selectFavPhotos } from 'src/app/data-access/ngrx/reducers/selectors';
import { PhotoDetailsComponent } from '../photo-details/photo-details.component';
import { setFavoritePhotos } from 'src/app/data-access/ngrx/actions/favorite-photos-actions';

@Component({
  selector: 'app-favorite-photo-list',
  templateUrl: './favorite-photo-list.component.html',
  styleUrls: ['./favorite-photo-list.component.scss']
})
export class FavoritePhotoListComponent implements OnInit{
  favPhotos$: Observable<Photo[]>;

  private storageKey = 'favoritePhotos';
    
  constructor(private store: Store<AppState>, private dialog: MatDialog){
    this.favPhotos$ = this.store.select(selectFavPhotos);
  }

  ngOnInit(): void {
    const storedFavorites = localStorage.getItem(this.storageKey);

    if (storedFavorites) {
      const favoritePhotos: Photo[] = JSON.parse(storedFavorites);
      this.store.dispatch(setFavoritePhotos({ favoritePhotos }));
    }

    this.favPhotos$.subscribe(favoritePhotos => {
      localStorage.setItem(this.storageKey, JSON.stringify(favoritePhotos));
    });
  }

  openPhotoDetails(photo: Photo): void {
    this.dialog.open(PhotoDetailsComponent, {
      width: '600px',
      data: { photo }
    });
  }
}
