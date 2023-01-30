import {Injectable} from "@angular/core";
import {AuthResponse, User} from "../shared/interfaces";
import {Observable, Subject, tap, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService{

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }


  get token(): string | null {
    let temp = localStorage.getItem('token_exp')
    const expDate = (temp == null) ? new Date(0) : new Date(temp)

    if(new Date() > expDate) {
      this.logout()
      return null
    }

    return localStorage.getItem('token')
  }

  login(user: User): Observable<AuthResponse>{
    return this.http.post(environment.URL + '/api/auth/login', user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)),
      )
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error
    console.log(error.error)
    if(message.error) this.error$.next('Пользователь не зарегестрирован')
    else if(message.email) this.error$.next('Некорректный email')
    else if(message.password) this.error$.next('Некорректный пароль')
    else this.error$.next('Неизвестная ошибка')

    return throwError(message)
  }

  logout(): Observable<any>{
    return this.http.post(environment.URL + '/api/auth/logout', null)
      .pipe(
        tap(()=>{this.setToken(null)})
      )
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: any) {
    if(response) {
      const expDate = new Date().getTime() + response.expires_in * 1000
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('token_exp', expDate.toString());
      // localStorage.setItem('user_name', value.user.name);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('token_exp');
      // localStorage.removeItem('user_name');
    }
  }
}
