import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { FavoritePhotoListComponent } from './favorite-photo-list.component';

describe('FavoritePhotoListComponent', () => {
  let component: FavoritePhotoListComponent;
  let fixture: ComponentFixture<FavoritePhotoListComponent>;
  let store: MockStore;
  let mockLocalStorage: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    mockLocalStorage = jasmine.createSpyObj('Storage', ['getItem', 'setItem', 'removeItem', 'clear']);
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    TestBed.configureTestingModule({
      declarations: [FavoritePhotoListComponent],
      imports: [MatDialogModule, MatGridListModule ],
      providers: [provideMockStore({})]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FavoritePhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not throw when localStorage data is not valid JSON', () => {
      mockLocalStorage.getItem.and.returnValue('not a valid json');
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should correctly initialize when localStorage returns valid JSON', () => {
      const validJSON = JSON.stringify([{ id: '1', url: 'https://example.com/photo1.jpg', title: 'Photo 1' }]);
      mockLocalStorage.getItem.and.returnValue(validJSON);
      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });
});
