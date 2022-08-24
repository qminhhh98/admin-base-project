import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();
  constructor(private http: HttpClient) {}

  signup(body: any): Observable<any> {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDymQRanyXOXhGeC0ytc0UBXnNhmZYj_tU',
        body
      )
      .pipe(
        tap((resData) => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            res
          );
        })
      );
  }

  login(body: any): Observable<any> {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDymQRanyXOXhGeC0ytc0UBXnNhmZYj_tU',
      body
    );
  }
}
