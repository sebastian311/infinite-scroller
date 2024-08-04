import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoDetailsComponent } from './photo-details.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectFavPhotos } from 'src/app/data-access/ngrx/reducers/selectors';
import { setFavoritePhotos } from 'src/app/data-access/ngrx/actions/favorite-photos-actions';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let store: MockStore;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<PhotoDetailsComponent>>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [PhotoDetailsComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { photo: { id: '1', url: 'https://example.com/photo.jpg', download_url: 'https://example.com/download.jpg' } } },
        provideMockStore({ initialState: {} }),
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should remove the photo from favorites and close the dialog', () => {
    spyOn(store, 'dispatch');
    const mockPhotos = [
      { id: '1', url: 'https://example.com/photo.jpg', download_url: 'https://example.com/download.jpg' },
      { id: '2', url: 'https://example.com/photo2.jpg', download_url: 'https://example.com/download2.jpg' }
    ];
    store.overrideSelector(selectFavPhotos, mockPhotos);

    component.removeFromFavorites();

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(setFavoritePhotos({ favoritePhotos: [mockPhotos[1]] }));
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
