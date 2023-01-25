import {SendPhotoService} from "../../services/send-photo.service";
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
  providers: [SendPhotoService]
})
export class PhotoCardComponent {

  constructor(private sendService: SendPhotoService, private http: HttpClient) { }

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
  fileName: string
  progress: number
  isLoad = false
  onHorizon = true
  showModal = false
  URL = 'http://127.0.0.1/api/upload'
  deleteURL = 'http://127.0.0.1/api/delete'


  loadImg($event: Event){
    const target = $event.target as HTMLImageElement

    if(target.naturalWidth < target.naturalHeight){
      this.onHorizon = false
      target.className = 'card__photo--vertical'
    }
    else target.className = 'card__photo--horizontal'
    this.isLoad = true
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

  delete(){
    const hashName = this.srcImg.split('/')[7]
    const formData = new FormData()
    formData.append("name", hashName)
    this.http.post(this.deleteURL,formData).subscribe(value => console.log(value))
    this.outputIndex.emit(this.index)
  }

  ngOnInit(): void {
    if(this.file){
      this.fileName = this.file.name
      const extension = this.fileName.split('.').pop()

      if(this.validExtension.includes(extension??"no")){
        const formData = new FormData()
        formData.append("photo", this.file)
        this.sendService.sendToServer(this.URL, formData)
      }
      else console.log(extension,'Загружать можно только jpg, png и heic файлы');
    }
    else this.fileName = 'Файл не загрузился'

    this.sendService.srcImg$.subscribe(value => this.srcImg = value)
    this.sendService.progress$.subscribe(value => this.progress = value)
  }
}
