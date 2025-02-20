import {PhotosService} from "../../services/photos.service";
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpEventType} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ServerResponseUpload} from "../../shared/interfaces";
import {Subs} from "../../utilities/subs";
import {NgIf, NgFor} from '@angular/common';
import {ModalComponent} from '../modal/modal.component';
import {PhotoEditorComponent} from '../photo-editor/photo-editor.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
  providers: [PhotosService],
  standalone: true,
  imports: [NgIf, NgFor, ModalComponent, PhotoEditorComponent, MatProgressBar, NgSelectModule, FormsModule]
})
export class PhotoCardComponent implements OnInit, OnDestroy {

  @Input() file: File;
  @Input() index: number;
  @Output() outputIndex = new EventEmitter();
  selectedSize = 1;
  sizes = [
    {id: 1, name: '10x15'},
    {id: 2, name: '15x21'},
    {id: 3, name: '21x30'}
  ];
  validExtension = ['jpg', 'jpeg', 'png', 'heic'];
  quantity = 1;
  srcImg: string;
  fileName: string;
  progress: number;
  isLoad = false;
  onHorizon = true;
  showModal = false;
  subs = new Subs();

  constructor(private photosService: PhotosService) {
  }

  loadImg($event: Event) {
    const target = $event.target as HTMLImageElement;

    if (target.naturalWidth < target.naturalHeight) {
      this.onHorizon = false;
      target.className = 'card__photo--vertical';
    } else target.className = 'card__photo--horizontal';
    this.isLoad = true;
  }

  quantityPhoto(q: number) {
    q === 0 ? this.quantity-- : this.quantity++;
    if (this.quantity < 1) this.quantity = 1;
  }

  implementCropImg(event: string) {
    document.body.style.overflow = 'auto';
    this.srcImg = environment.URL + event;
    this.showModal = false;
  }

  // delete(){
  //   const hashName = this.srcImg.split('/')[7]
  //   const formData = new FormData()
  //   formData.append("name", hashName)
  //
  //
  //   this.subs.add = this.photosService.remove(formData).subscribe()
  //   this.outputIndex.emit(this.index)
  // }

  delete() {
    const hashName = this.srcImg.split('/')[7];
    this.photosService.remove('photo', hashName).subscribe();
    this.outputIndex.emit(this.index);
  }

  ngOnInit(): void {
    console.log(this.file);
    if (this.file) {
      this.fileName = this.file.name;
      const extension = this.fileName.split('.').pop();

      if (this.validExtension.includes(extension ?? "no")) {
        const formData = new FormData();
        formData.append("photo", this.file);

        const url = environment.URL + '/api/photo/upload';
        this.subs.add = this.photosService.sendPhoto(formData, url).subscribe(event => {
          if (event.type == HttpEventType.UploadProgress && event.total) {
            this.progress = (Math.round(100 * (event.loaded / event.total)));
          }
          if (event.type == HttpEventType.Response) {
            const target = event.body as ServerResponseUpload;
            this.srcImg = environment.URL + target.path;
            console.log(this.srcImg);
          }
        });
      } else console.log(extension, 'Загружать можно только jpg, png и heic файлы');
    } else this.fileName = 'Файл не загрузился';
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
