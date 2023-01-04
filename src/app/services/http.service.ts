import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, retry, shareReplay, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(url: string, params: HttpParams): Observable<any>{
    return this.http.get(url, {params});
  }

  public post(url: string, body: object): Observable<any>{
    return this.http.post(url, body).pipe(
      catchError(this.handleError),
    )
  }

  private handleError(error: HttpErrorResponse) {
    let err = []

    if(JSON.parse(error.error).email) err.push('Email is exist')
    else if(JSON.parse(error.error).password) err.push('Password confirmation error')
    else err.push('Unknown error')

    return err
  }
}
