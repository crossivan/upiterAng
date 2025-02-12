import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  public get(url: string, params: HttpParams): Observable<any> {
    return this.http.get(url, {params});
  }

  public get2(url: string): Observable<any> {
    return this.http.get(url);
  }

  public post(url: string, body: object): Observable<any> {
    return this.http.post(url, body).pipe(
      catchError(this.handleError)
    );
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url);
  }

  private handleError(error: HttpErrorResponse) {
    let err = [];

    if (JSON.parse(error.error).email) err.push('Email is exist');
    else if (JSON.parse(error.error).password) err.push('Password confirmation error');
    else err.push('Unknown error');

    return err;
  }
}
