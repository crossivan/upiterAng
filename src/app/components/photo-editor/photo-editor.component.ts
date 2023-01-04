import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import {CropperPosition, Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage} from "ngx-image-cropper";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent {

  @Input() photoURL: string
  @Input() onHorizon: boolean
  @Output() emitCropImg = new EventEmitter
  @ViewChild ("crop", {static: true}) crop: ElementRef
  @ViewChild ("holst", {static: true}) canvas: ElementRef
  @ViewChild ("preview", {static: true}) preview: ElementRef





  x = 0
  y = 0
  rot = 0
  zoom = 1
  foto = new Image()
  ctx: CanvasRenderingContext2D
  foto_hp:number	// Координата угла фотографии по оси У
  foto_wp: number	// Координата угла фотографии по оси Х
  foto_id = document.querySelector('#foto')
  proba = document.querySelector('#proba')


  Download() {
    this.foto.src = this.photoURL
    // this.foto_wp=((this.canvas.nativeElement.width/2)-(this.foto.width/2))
    // this.foto_hp=((this.canvas.nativeElement.height/2)-(this.foto.height/2))
    // this.ctx.drawImage(this.foto, this.foto_wp, this.foto_hp)
    // this.ctx.save()
  }

  croppedImage: string | null | undefined = null
  rotatePhoto: ImageTransform = {}
  aspectRatio = 2/3
  cropper: CropperPosition
  addWhiteBorder = false
  rotateAngle = 0

  // Генерирует каждый раз, когда изображение обрезается
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
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
    if(this.onHorizon){
      this.crop.nativeElement.style.width = "600px"
      this.crop.nativeElement.style.height = '400px'
      this.preview.nativeElement.style.width = "300px"
      this.preview.nativeElement.style.height = '200px'
      this.aspectRatio = 3/2
    }
    else {
      this.crop.nativeElement.style.width = '400px'
      this.crop.nativeElement.style.height = '600px'
      this.preview.nativeElement.style.width = '200px'
      this.preview.nativeElement.style.height = '300px'

    }



    // this.rotatePhoto.rotate = 30
    // this.ctx = this.canvas.nativeElement.getContext("2d")
    this.Download()
  }

}
