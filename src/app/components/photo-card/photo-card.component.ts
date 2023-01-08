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

  sizes = [
    { id: 1, name: '10x15' },
    { id: 2, name: '15x21' },
    { id: 3, name: '21x30' },
  ];
  validExtension = ['jpg', 'jpeg', 'png', 'heic']
  selectedSize = 1
  quantity = 1
  srcImg: string
  fileName: string
  progress: number
  widthImg: number
  heightImg: number
  imgBlob = new Subject<string>()
  uploadSubscription: Subscription
  showModal = false
  onHorizon = true
  // URL = "http://upiter.ru/getPhoto.php"
  URL = 'http://127.0.0.1/api/upload'

  quantityPhoto(q:number){
    q === 0 ? this.quantity-- : this.quantity++
    if(this.quantity < 1) this.quantity = 1
  }

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

        this.previewFile(file)
      }
      if(event.type == HttpEventType.Response){
        const target = event.body as ServerResponseUpload
        console.log(target.path)
        this.srcImg = 'http://127.0.0.1/'+target.path
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

  previewFile(file: File) {
    const reader = new FileReader()

    // Преобразует изображение в Blob
    if (file) reader.readAsDataURL(file)
    reader.addEventListener("load", () => {
      if (typeof (reader.result) === 'string') {
        this.imgBlob.next(reader.result)
      }
    }, false)
  }

  loadImg($event: Event){
    const tar = $event.target as HTMLImageElement
    this.widthImg = tar.naturalWidth
    this.heightImg = tar.naturalHeight

    if(this.widthImg < this.heightImg){
      this.onHorizon = false
      tar.className = 'card__photo--horizontal'
        ? 'card__photo--vertical'
        : 'card__photo--horizontal'
    }
    else tar.className = 'card__photo--vertical'
      ? 'card__photo--horizontal'
      : 'card__photo--vertical'
  }

  // formatBytes(bytes: number, decimals = 2) {
  //   if (bytes === 0) {
  //     return "0 Bytes";
  //   }
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  // }

  cancelUpload() {
    this.uploadSubscription.unsubscribe()
    this.reset()
  }

  reset() {
    // this.uploadProgress = 0;
    // this.uploadSubscription = null;
  }


  implementCropImg(event: string){
    document.body.style.overflow = 'auto'
    // this.srcImg = event
    this.showModal = false
  }

  ngOnInit(): void {

    if(this.file){

      this.fileName = this.file.name
      const extension = this.fileName.split('.').pop()

      if(this.validExtension.includes(extension??"no")){
        this.sendPhotoToServer(this.file)
      }
      else console.log(extension,'Error');
    }
    else this.fileName = 'File not load'

    this.imgBlob.subscribe(value => this.srcImg = value)
  }


  ngOnDestroy(): void {
    if(this.uploadSubscription) this.uploadSubscription.unsubscribe()
  }
}
