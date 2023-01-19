import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from "@angular/common/http";
import {ServerResponseUpload} from "../shared/interfaces";
import {Subject, Subscription, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SendPhotoService implements OnDestroy{

  constructor(private http: HttpClient) { }


  public srcImg$ = new Subject<string>()
  public progress$ = new Subject<number>()
  public sub: Subscription


  public sendToServer(URL: string, formData: FormData){
    const upload$ = new HttpRequest('POST', URL, formData, {
      reportProgress: true
    })

    this.sub = this.http.request(upload$).subscribe(event => {
      if (event.type == HttpEventType.UploadProgress && event.total) {
        this.progress$.next(Math.round(100*(event.loaded / event.total)))
      }
      if(event.type == HttpEventType.Response){
        const target = event.body as ServerResponseUpload
        this.srcImg$.next('http://127.0.0.1'+target.path)    // target.path = /storage/photos/00-15-5D-82-C5-60/thumbnail/Zha4E5cNOh95gPWno6ui8N8ccL72tMUCp8Y7L3Nt.png
      }
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error)
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'))
  }

  cancelUpload() {
    this.sub.unsubscribe()
    this.reset()
  }

  reset() {
    // this.uploadProgress = 0;
    // this.uploadSubscription = null;
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }
}
