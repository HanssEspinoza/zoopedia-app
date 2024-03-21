import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #baseUrl = signal<string>(environment.baseUrl);

  constructor(private http: HttpClient) {}

  getAll<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.#baseUrl()}/${path}`);
  }

  getById<T>(path: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.#baseUrl()}/${path}/${id}`);
  }

  post<T>(path: string, body: object): Observable<T> {
    return this.http.post<T>(`${this.#baseUrl()}/${path}`, body);
  }

  put<T>(path: string, body: object, id: string) {
    return this.http.put<T>(`${this.#baseUrl()}/${path}/${id}`, body);
  }

  delete<T>(path: string, id: string) {
    return this.http.delete<T>(`${this.#baseUrl()}/${path}/${id}`);
  }
}
