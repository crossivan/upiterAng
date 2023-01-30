import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage} from "ngx-image-cropper";
import {PhotosService} from "../../services/photos.service";
import {MyCropperPosition, ServerResponseUpload} from "../../shared/interfaces";


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
  providers: [PhotosService]
})
export class PhotoEditorComponent {

  constructor(private photosService: PhotosService) { }

  @Input() photoURL: string
  @Input() onHorizon: boolean
  @Output() emitCropImg = new EventEmitter
  @ViewChild ("crop", {static: true}) crop: ElementRef
  @ViewChild ("holst", {static: true}) canvas: ElementRef
  @ViewChild ("preview", {static: true}) preview: ElementRef

  widthPhoto: number
  heightPhoto: number
  canvasWidth: number
  canvasHeight: number
  hashName: string
  flipH = false
  flipV = false
  rotateAngle = 0
  aspectRatio = 2/3
  cropParams: MyCropperPosition
  canvasBorder = false
  photoOriginalURL: string
  transformPhoto: ImageTransform = {}
  previewImage: string | null | undefined = null


  firstClick = false
  increaseCanvas(){
    this.canvasBorder = !this.canvasBorder
    if(!this.canvasBorder){
      this.firstClick   = false
      this.canvasWidth  = this.widthPhoto
      this.canvasHeight = this.heightPhoto
    }
  }

  // Генерирует каждый раз, когда изменяется область кадрирования
  imageCropped(event: ImageCroppedEvent) {
    this.previewImage = event.base64
    if(event.offsetImagePosition && !this.firstClick){
      this.firstClick   = true
      this.canvasWidth  = event.width
      this.canvasHeight = event.height
    }

    this.cropParams = {
      'width' : event.imagePosition.x2 - event.imagePosition.x1,
      'height': event.imagePosition.y2 - event.imagePosition.y1,
      'x': event.imagePosition.x1,
      'y': event.imagePosition.y1
    }

  }

  // Выполняется, когда файл был загружен в обрезку
  imageLoaded(t: Object, image: LoadedImage) {
    this.widthPhoto = image.original.image.width
    this.heightPhoto = image.original.image.height
    this.canvasWidth  = this.widthPhoto
    this.canvasHeight = this.heightPhoto
  }

  // Выполняется, когда обрезка готова к взаимодействию.
  // Возвращаемый объект Dimensions содержит отображаемый размер изображения.
  cropperReady(d: Dimensions) {
    //
  }

  rotatePhoto(n: number){
    this.rotateAngle += n
    this.transformPhoto = {
      ...this.transformPhoto,
      rotate: this.rotateAngle,
    }
  }

  flipPhotoH(){
    this.flipH = !this.flipH
    this.transformPhoto = {
      ...this.transformPhoto,
      flipH: !this.transformPhoto.flipH,
    }
  }

  flipPhotoV(){
    this.flipV = !this.flipV
    this.transformPhoto = {
      ...this.transformPhoto,
      flipV: !this.transformPhoto.flipV,
    }
  }

  loadImageFailed() {
    // show message
  }

  saveCrop(){
    const formData = new FormData()
    formData.append("nameOld", this.hashName)
    formData.append("cropParams", JSON.stringify(this.cropParams))
    formData.append("angle", this.rotateAngle.toString())
    formData.append("canvasWidth", this.canvasWidth.toString())
    formData.append("canvasHeight", this.canvasHeight.toString())
    formData.append("flipH", this.flipH.toString())
    formData.append("flipV", this.flipV.toString())

    this.photosService.replace(formData).subscribe(value => {
      this.emitCropImg.emit(value.path)
    })
  }

  ngOnInit(){
    const cropStyle = this.crop.nativeElement.style
    const previewStyle = this.preview.nativeElement.style
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

    this.hashName = this.photoURL.split('/')[7]
    this.photoOriginalURL = this.photoURL.replace('thumbnail','origin')
    // this.photosService.srcImg$.subscribe(value => this.emitCropImg.emit(value))
  }
}


