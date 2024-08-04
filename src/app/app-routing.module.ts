import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoLibraryShellComponent } from './feature-components/photo-library-shell/photo-library-shell.component';
import { PhotoListComponent } from './feature-components/photo-list/photo-list.component';
import { FavoritePhotoListComponent } from './feature-components/favorite-photo-list/favorite-photo-list.component';
import { PhotoDetailsComponent } from './feature-components/photo-details/photo-details.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoLibraryShellComponent,
    children: [
      { path: '', redirectTo: 'photos', pathMatch: 'full' },
      { path: 'photos', component: PhotoListComponent },
      { path: 'favorites', component: FavoritePhotoListComponent },
      { path: 'photos/:id', component: PhotoDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
