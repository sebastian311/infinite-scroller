import { Photo } from "./photo.interface";

export interface AppState {
    photosList: Photo[];
    favoritePhotosList: Photo[];
    isLoading: boolean;
}