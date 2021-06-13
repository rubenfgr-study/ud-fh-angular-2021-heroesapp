import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private _url: string = `${environment.baseURL}/heroes`;

  constructor(private httpClient: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this._url);
  }

  getHero(id: string): Observable<Hero> {
    return this.httpClient.get<Hero>(`${this._url}/${id}`);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this._url}?q=${term}&_limit=6`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this._url}`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.httpClient.put<Hero>(`${this._url}/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<{}> {
    return this.httpClient.delete<{}>(`${this._url}/${id}`);
  }
}
