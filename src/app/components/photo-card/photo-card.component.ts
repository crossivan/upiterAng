import {Component, EventEmitter, Input, Output} from '@angular/core';
import {catchError, finalize, Subject, Subscription, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {ServerResponseUpload} from "../../shared/interfaces";

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent {

  constructor(private http: HttpClient) { }

  @Input() file: File
  @Input() index: number
  @Output() outputIndex = new EventEmitter()

  selectedSize = 1
  sizes = [
    { id: 1, name: '10x15' },
    { id: 2, name: '15x21' },
    { id: 3, name: '21x30' },
  ];
  validExtension = ['jpg', 'jpeg', 'png', 'heic']
  quantity = 1
  srcImg: string
  progress: number
  fileName: string
  onHorizon = true
  showModal = false
  uploadSubscription: Subscription
  URL = 'http://127.0.0.1/api/upload'

  sendPhotoToServer(file: File){
    const formData = new FormData()
    formData.append("photo", file)
    const upload$ = this.http.post(this.URL, formData,  {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      finalize(() => {
        this.reset()
      }),
      catchError(this.handleError)
    )
    // HttpEventType.UploadProgress это Enum в котором заданы
    // все этапы отправки файла на сервер
    // event.total - Колличество байт в файле
    this.uploadSubscription = upload$.subscribe(event => {
      if (event.type == HttpEventType.UploadProgress && event.total) {
        this.progress = Math.round(100*(event.loaded / event.total))
      }
      if(event.type == HttpEventType.Response){
        const target = event.body as ServerResponseUpload
        this.srcImg = 'http://127.0.0.1'+target.path    // target.path = /storage/photos/00-15-5D-82-C5-60/thumbnail/Zha4E5cNOh95gPWno6ui8N8ccL72tMUCp8Y7L3Nt.png
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

  loadImg($event: Event){
    const tar = $event.target as HTMLImageElement
    const widthImg = tar.naturalWidth
    const heightImg = tar.naturalHeight

    if(widthImg < heightImg){
      this.onHorizon = false
      tar.className = 'card__photo--horizontal'
        ? 'card__photo--vertical'
        : 'card__photo--horizontal'
    }
    else tar.className = 'card__photo--vertical'
      ? 'card__photo--horizontal'
      : 'card__photo--vertical'
  }

  cancelUpload() {
    this.uploadSubscription.unsubscribe()
    this.reset()
  }

  reset() {
    // this.uploadProgress = 0;
    // this.uploadSubscription = null;
  }

  quantityPhoto(q:number){
    q === 0 ? this.quantity-- : this.quantity++
    if(this.quantity < 1) this.quantity = 1
  }

  implementCropImg(event: string){
    document.body.style.overflow = 'auto'
    this.srcImg = event
    this.showModal = false
  }

  ngOnInit(): void {

    if(this.file){
      this.fileName = this.file.name
      const extension = this.fileName.split('.').pop()

      if(this.validExtension.includes(extension??"no")){
        this.sendPhotoToServer(this.file)
      }
      else console.log(extension,'Загружать можно только jpg, png и heic файлы');
    }
    else this.fileName = 'Файл не загрузился'
  }

  ngOnDestroy(): void {
    if(this.uploadSubscription) this.uploadSubscription.unsubscribe()
  }
}
