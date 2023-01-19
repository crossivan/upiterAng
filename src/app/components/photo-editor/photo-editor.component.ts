import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CropperPosition, Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage} from "ngx-image-cropper";
import {Subscription} from "rxjs";
import {SendPhotoService} from "../../services/send-photo.service";


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
  providers: [SendPhotoService]
})
export class PhotoEditorComponent {

  constructor(private sendService: SendPhotoService) { }

  @Input() photoURL: string
  @Input() onHorizon: boolean
  @Output() emitCropImg = new EventEmitter
  @ViewChild ("crop", {static: true}) crop: ElementRef
  @ViewChild ("holst", {static: true}) canvas: ElementRef
  @ViewChild ("preview", {static: true}) preview: ElementRef

  hashName: string
  rotateAngle = 0
  aspectRatio = 2/3
  cropParams: string
  canvasWidth = 0
  canvasHeight = 0
  canvasBorder = false
  photoOriginalURL: string
  rotatePhoto: ImageTransform = {}
  previewImage: string | null | undefined = null
  URL = 'http://127.0.0.1/api/replace'



  firstClick = false
  increaseCanvas(){
    this.canvasBorder = !this.canvasBorder
    if(!this.canvasBorder) this.firstClick = false
  }

  // Генерирует каждый раз, когда изображение обрезается
  imageCropped(event: ImageCroppedEvent) {
    this.previewImage = event.base64
    if(event.offsetImagePosition && !this.firstClick){
      this.firstClick = true
      this.canvasWidth  = event.width
      this.canvasHeight = event.height
    }
    this.cropParams = JSON.stringify(event.imagePosition)

    console.log(event.imagePosition)
    console.log(event.cropperPosition)
    console.log(event.offsetImagePosition)

  }

  // Выполняется, когда файл был загружен в обрезку
  imageLoaded(t: Object, image: LoadedImage) {
    // show cropper
  }

  // Выполняется, когда обрезка готова к взаимодействию.
  // Возвращаемый объект Dimensions содержит отображаемый размер изображения.
  cropperReady(d: Dimensions) {
    //
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

  saveCrop(){
    const formData = new FormData()
    formData.append("nameOld", this.hashName)
    formData.append("cropParams", this.cropParams)
    formData.append("angle", this.rotateAngle.toString())
    formData.append("canvasWidth", this.canvasWidth.toString())
    formData.append("canvasHeight", this.canvasHeight.toString())
    this.sendService.sendToServer(this.URL, formData)
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

    this.photoOriginalURL = this.photoURL.replace('thumbnail','origin')
    this.hashName = this.photoURL.split('/')[7]
    this.sendService.srcImg$.subscribe(value => this.emitCropImg.emit(value))
  }
}


