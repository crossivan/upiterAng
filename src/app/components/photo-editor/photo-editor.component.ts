import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage} from "ngx-image-cropper";
import {catchError, finalize, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {ServerResponseUpload} from "../../shared/interfaces";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent {

  constructor(private http: HttpClient) { }

  @Input() photoURL: string
  @Input() hashName: string
  @Input() onHorizon: boolean
  @Output() emitCropImg = new EventEmitter
  @ViewChild ("crop", {static: true}) crop: ElementRef
  @ViewChild ("holst", {static: true}) canvas: ElementRef
  @ViewChild ("preview", {static: true}) preview: ElementRef

  rotateAngle = 0
  aspectRatio = 2/3
  addWhiteBorder = false
  cropParams: string
  rotatePhoto: ImageTransform = {}
  croppedImage: string | null | undefined = null
  uploadSubscription: Subscription
  URL = 'http://127.0.0.1/api/replace'

  saveCropToServer(){
    const formData = new FormData()
    formData.append("nameOld", this.hashName)
    formData.append("path", this.photoURL)
    formData.append("cropParams", this.cropParams)

    const upload$ = this.http.post(this.URL, formData, {
      reportProgress: true,
      observe: 'events'
    })

    // HttpEventType.UploadProgress это Enum в котором заданы
    // все этапы отправки файла на сервер
    // event.total - Колличество байт в файле
    this.uploadSubscription = upload$.subscribe(event => {
      if(event.type == HttpEventType.Response){
        console.log('Ok')
      }
    })
  }

  // Генерирует каждый раз, когда изображение обрезается
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
    this.cropParams = JSON.stringify(event.imagePosition)
    console.log(event.imagePosition)
  }

  // Выполняется, когда файл был загружен в обрезку
  imageLoaded(t: Object, image: LoadedImage) {

    // this.croppedImage = image.exifTransform
    // console.log('111111',this.crop.nativeElement.style.height)

    // show cropper
  }

  // Выполняется, когда обрезка готова к взаимодействию.
  // Возвращаемый объект Dimensions содержит отображаемый размер изображения.
  cropperReady(d: Dimensions) {
    // this.cropper.x1 = 50
    // this.cropper.x2 = 50
    // this.cropper.y1 = 50
    // this.cropper.y2 = 50
    // console.log(d.height, ' - ', d.width)
    // cropper ready
  }

  transformPhoto(n: number){
    this.rotateAngle += n
    this.rotatePhoto = {
      ...this.rotatePhoto,
      rotate: this.rotateAngle,
    }
  }

  loadImageFailed() {
    // show message
  }

  ngOnInit(){
    const cropStyle =this.crop.nativeElement.style
    const previewStyle =this.preview.nativeElement.style
    if(this.onHorizon){
      cropStyle.width = "600px"
      cropStyle.height = '400px'
      previewStyle.width = "300px"
      previewStyle.height = '200px'
      this.aspectRatio = 3/2
    }
    else {
      cropStyle.width = '400px'
      cropStyle.height = '600px'
      previewStyle.width = '200px'
      previewStyle.height = '300px'
    }

    this.photoURL = this.photoURL.replace('thumbnail','origin')
  }

  ngOnDestroy(){
    if(this.uploadSubscription) this.uploadSubscription.unsubscribe()
  }

}


