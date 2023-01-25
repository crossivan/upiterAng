import {Injectable} from "@angular/core";
import {User} from "../shared/interfaces";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AuthService{

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

  login(user: User): Observable<any>{
    return this.http.post('http://127.0.0.1/api/auth/login', user)
      .pipe(
        tap(this.setToken)
      )
  }

  logout() {
    this.setToken(null)
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
