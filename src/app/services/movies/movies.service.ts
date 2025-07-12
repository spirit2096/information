import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceMovie } from '../../interfaces/InterfaceMovie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = 'https://api.themoviedb.org/4';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/';
  private accountObjectId = '6373bb3cbf0f6300dc8ea325';
  private jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTFjMmU0Mzg4MGMwNTNlMWFmOTJkMGUwYWYwZmQyNiIsIm5iZiI6MTY2ODUyODk1Ni4yNTIsInN1YiI6IjYzNzNiYjNjYmYwZjYzMDBkYzhlYTMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._oP0bPkMS8eQzdQuNIxN1btG0EM2t225mYknLh0UHUQ';
  private language = "es-ES";
  private headers = new HttpHeaders({
    'accept': 'application/json',
    'Authorization': `Bearer ${this.jwt}`
  });
 
  http = inject(HttpClient);
  
  constructor() { }

  getMoviesNowPlaying(page: number): Observable<InterfaceMovie> {
    return this.http.get<InterfaceMovie>(`${this.baseUrl}/account/${this.accountObjectId}/movie/recommendations`, {
      headers: this.headers,
      params: {
        language: this.language,
        page: page.toString()
      }
    });
  }

  getMovieImageUrl(posterPath: string, size: string = 'w500'): string {
    if (!posterPath) {
      return '';
    }
    return `${this.imageBaseUrl}${size}${posterPath}`;
  }
}
