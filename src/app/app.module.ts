import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PhotoLibraryShellComponent } from './feature-components/photo-library-shell/photo-library-shell.component';
import { PhotoListComponent } from './feature-components/photo-list/photo-list.component';
import { FavoritePhotoListComponent } from './feature-components/favorite-photo-list/favorite-photo-list.component';
import { PhotoDetailsComponent } from './feature-components/photo-details/photo-details.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { StoreModule } from '@ngrx/store';

import { reducers, metaReducers } from './data-access/ngrx/reducers';
import { EffectsModule } from '@ngrx/effects';
import { PhotoEffects } from './data-access/ngrx/effects/image-effect/image-effect.module';
import { InfiniteScrollDirective } from './data-access/directives/infinite-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    PhotoLibraryShellComponent,
    PhotoListComponent,
    FavoritePhotoListComponent,
    PhotoDetailsComponent,
    HeaderComponent,
    InfiniteScrollDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,

    // State management meta reducer
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([PhotoEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
