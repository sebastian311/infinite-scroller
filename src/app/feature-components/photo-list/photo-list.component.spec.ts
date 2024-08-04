import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoListComponent } from './photo-list.component';
import { selectPhotosList } from 'src/app/data-access/ngrx/reducers/selectors';
import { addPhotoToFavorites, loadMorePhotos, populatePhotosList } from 'src/app/data-access/ngrx/actions/photo-actions';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let store: MockStore;
  let mockSelectPhotosList: { setResult: (arg0: { id: string; url: string; }[]) => void; };

  const initialState = {
    photosList: [],
    favoritePhotosList: [],
    isLoading: false
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoListComponent],
      imports: [MatGridListModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockSelectPhotosList = store.overrideSelector(selectPhotosList, []);
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch populatePhotosList if photosList is empty on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(populatePhotosList());
  });

  it('should not dispatch populatePhotosList if photosList is not empty', () => {
    spyOn(store, 'dispatch');
    mockSelectPhotosList.setResult([{ id: '1', url: 'https://example.com/photo.jpg' }]);
    store.refreshState();  // Update state after setting new result
    component.ngOnInit();
    expect(store.dispatch).not.toHaveBeenCalledWith(populatePhotosList());
  });

  it('should dispatch addPhotoToFavorites when addToFavorites is called', () => {
    spyOn(store, 'dispatch');
    component.addToFavorites('1');
    expect(store.dispatch).toHaveBeenCalledWith(addPhotoToFavorites({ photoId: '1' }));
  });

  it('should dispatch loadMorePhotos when loadMorePhotos is called', () => {
    spyOn(store, 'dispatch');
    component.loadMorePhotos();
    expect(store.dispatch).toHaveBeenCalledWith(loadMorePhotos({ count: 6 }));
  });
});
