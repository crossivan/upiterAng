import {Injectable} from "@angular/core";
import {AuthResponse, RegForm, RegResponse, User} from "../shared/interfaces";
import {BehaviorSubject, Observable, Subject, tap, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();
  private _isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private _refreshTokenTimeout: number;

  constructor(private http: HttpClient, private router: Router) {
    this._isAuthenticatedSubject.next(!!this.token);
  }

  public get token(): string | null {
    const expDate: string | null = localStorage.getItem('token_exp');
    if (!expDate) return null;
    if (new Date().getTime() > parseInt(expDate)) {
      this.clearToken.bind(this);
      return null;
    }
    return localStorage.getItem('token');
  }

  get isAuthenticated$() {
    return this._isAuthenticatedSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public register(data: RegForm): Observable<RegResponse> {
    return this.http.post<RegResponse>(environment.URL + '/api/auth/register', data)
      .pipe(
        catchError(this._handleError.bind(this))
      );
  }

  public login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.URL + '/api/auth/login', user)
      .pipe(
        tap(this._setToken.bind(this)),
        catchError(this._handleError.bind(this))
      );
  }

  public logout(): Observable<null> {
    return this.http.post<null>(environment.URL + '/api/auth/logout', null)
      .pipe(
        tap(this.clearToken.bind(this))
      );
  }

  private _refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.URL + '/api/auth/refresh', null)
      .pipe(
        tap((response: AuthResponse) => {
          this._setToken(response);
        })
      );
  }

  private _handleError(error: HttpErrorResponse) {
    const message = error.error;
    let textErr = '';

    if (message.error) textErr = 'Пользователь не зарегистрирован';
    else {
      if (message.email) {
        switch (message.email[0]) {
          case 'The email must be a valid email address.':
            textErr = `Некорректный email. `;
            break;
          case 'The email field is required.':
            textErr = `Введите email. `;
            break;
          case 'The email has already been taken.':
            textErr = `Этот email уже зарегистрирован.`;
            break;
        }
      }
      if (message.password) {
        switch (message.password[0]) {
          case 'The password must be at least 6 characters.':
            textErr += 'Пароль должен быть более 6 символов.';
            break;
          case 'The password field is required.':
            textErr += 'Введите пароль.';
            break;
          case 'The password format is invalid.':
            textErr += 'Некорректный пароль. Используйте латинские буквы, цифры и символы.';
            break;
        }
      }
    }
    this.error$.next(textErr);
    return throwError(message);
  }

  public refreshTokenTimeout(){

    if(localStorage.getItem('token_exp')){
      const expDate = Number (localStorage.getItem('token_exp'));

      let _refreshToken = this._refreshToken.bind(this);

      // const timeout = 10000;
      const timeout = expDate - Date.now() - (5 * 60 * 1000);
      console.log(timeout);

      this._refreshTokenTimeout = setTimeout(() => {
        console.log('Refresh');
        _refreshToken().subscribe();
      }, timeout);
    }
  }

  private _setToken(response: AuthResponse) {

    const token = response.access_token;
    const expDate = new Date().getTime() + response.expires_in * 1000;
    localStorage.setItem('token', token);
    localStorage.setItem('token_exp', expDate.toString());
    localStorage.setItem('id', response.user.id.toString());
    localStorage.setItem('name', response.user.name);
    localStorage.setItem('email', response.user.email);
    localStorage.setItem('role', response.user.role);

    this._isAuthenticatedSubject.next(true);

    this.refreshTokenTimeout();
  }

  private _timeoutKill() {
    clearTimeout(this._refreshTokenTimeout);
  }

  private clearToken() {
    localStorage.clear();
    this._timeoutKill();
    this._isAuthenticatedSubject.next(false);
    this.router.navigate(['/']).then();
  }
}

export class AuthServices {
}
