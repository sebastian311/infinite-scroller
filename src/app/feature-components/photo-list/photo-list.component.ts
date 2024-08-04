import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Photo } from 'src/app/data-access/models/photo.interface';
import { AppState } from 'src/app/data-access/models/state.interface';
import { addPhotoToFavorites, loadMorePhotos, populatePhotosList } from 'src/app/data-access/ngrx/actions/photo-actions';
import { selectPhotosList } from 'src/app/data-access/ngrx/reducers/selectors';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit{
  photosList$: Observable<Photo[]>;
  
  constructor(private store: Store<AppState>){
    this.photosList$ = this.store.select(selectPhotosList);
  }

  ngOnInit(): void {
    this.photosList$.pipe(take(1)).subscribe(photos => {
      if (photos.length === 0) {
        this.store.dispatch(populatePhotosList());
      }
    });
  }

  addToFavorites(id: string) {
    this.store.dispatch(addPhotoToFavorites({ photoId: id }))
  }

  loadMorePhotos() {
    this.store.dispatch(loadMorePhotos({ count: 6 }));
  }
}
