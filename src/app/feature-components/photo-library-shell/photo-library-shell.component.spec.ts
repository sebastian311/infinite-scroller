import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PhotoLibraryShellComponent } from './photo-library-shell.component';
import { HeaderComponent } from 'src/app/shared-components/header/header.component';

describe('PhotoLibraryShellComponent', () => {
  let component: PhotoLibraryShellComponent;
  let fixture: ComponentFixture<PhotoLibraryShellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoLibraryShellComponent, HeaderComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(PhotoLibraryShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
