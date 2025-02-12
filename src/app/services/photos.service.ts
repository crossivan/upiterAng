import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpRequest} from "@angular/common/http";
import {ServerResponseUpload} from "../shared/interfaces";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) {
  }

  sendPhoto(body: FormData, url: string): Observable<any> {
    let upload$ = new HttpRequest('POST', url, body, {
      reportProgress: true
    });
    return this.http.request(upload$)
      .pipe(
        catchError(this.handleError)
      );
  }

  cancelUpload() {
    // this.sub.unsubscribe()
    // this.reset()
  }

  reset() {
    // this.uploadProgress = 0;
    // this.uploadSubscription = null;
  }

  remove(path: string, name: string): Observable<any> {
    return this.http.delete(environment.URL + '/api/' + path + '/' + name);
  }

  replace(body: FormData): Observable<ServerResponseUpload> {
    return this.http.post<ServerResponseUpload>(environment.URL + '/api/photo/replace', body);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status) console.log('Error');

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
