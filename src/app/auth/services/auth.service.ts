import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _url: string = `${environment.baseURL}/usuarios`;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) {}

  verifyAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return this.http.get<Auth>(`${this._url}/1`).pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this._url}/1`).pipe(
      tap((auth) => {
        this._auth = auth;
        localStorage.setItem('token', auth.id);
      })
    );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
