import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public get(url: string, params: HttpParams): Observable<any>{
    return this.httpClient.get(url, {params});
  }

  public post(url: string, body: object): Observable<any>{
    return this.httpClient.post(url, body);
  }
}
