import {Injectable} from "@angular/core";
import {ServerResponse, User} from "../shared/interfaces";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AuthService{

  constructor(private http: HttpClient) { }

  private isAuth = true

  getToken(): string {
    return ''
  }

  login(user: User): Observable<any>{
    this.isAuth = true
    return this.http.post('http://127.0.0.1/api/auth/login', user)
  }

  logout(){
    this.isAuth = false
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise(resolve => {resolve(this.isAuth)})
  }

  private setToken(response: ServerResponse) {
    console.log(response)
    return 'hg'
  }
}
