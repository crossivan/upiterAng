import {Injectable} from "@angular/core";
import {AuthResponse, RegData, User} from "../shared/interfaces";
import {Observable, Subject, tap, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expDate = localStorage.getItem('token_exp');
    if (new Date().getTime() > parseInt(expDate!)) {
      this.clearToken();
      return null;
    }

    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  register(data: RegData): Observable<any> {
    return this.http.post<AuthResponse>(environment.URL + '/api/auth/register', data)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.URL + '/api/auth/login', user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): Observable<null> {
    return this.http.post<null>(environment.URL + '/api/auth/logout', null)
      .pipe(
        tap(this.clearToken)
      );
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.URL + '/api/auth/refresh', null)
      .pipe(
        tap(this.setToken)
      );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error;
    let textErr = '';

    console.error('An error occurred', message);

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

  private setToken(response: AuthResponse) {
    if (response) {
      const expDate = new Date().getTime() + response.expires_in * 1000;
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('token_exp', expDate.toString());
      localStorage.setItem('id', response.user.id.toString());
      localStorage.setItem('name', response.user.name);
      localStorage.setItem('email', response.user.email);
      localStorage.setItem('role', response.user.role);
    } else {
      localStorage.clear();
    }
  }

  private clearToken() {
    localStorage.clear();
  }
}
