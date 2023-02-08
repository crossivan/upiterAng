import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.auth.token
        }
      })
    }

    return next.handle(request)
      // .pipe(
      //   catchError((error: HttpErrorResponse) => {
      //     console.log('[Interceptor Error]: ', error.error)
      //     if (error.status === 401) {
      //       this.auth.logout()
      //       this.router.navigate(['/photodoc']).then()
      //     }
      //     return throwError(error.error)
      //   })
      // )
  }
}
