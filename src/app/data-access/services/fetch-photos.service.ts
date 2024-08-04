import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchPhotosService {
  webAPI = 'https://picsum.photos/v2/list?page=2&';

  constructor(private http: HttpClient) {}

  loadRandomImages(): Observable<any> {
    return this.http.get(`${this.webAPI}limit=9`);
  }

  getPhotos(count: number): Observable<any> {
    return this.http.get(`${this.webAPI}limit=${count}`);
  }
}
