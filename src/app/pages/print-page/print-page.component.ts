import {Component} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {PhotosService} from '../../services/photos.service';
import { DragdropDirective } from '../../directive/dragdrop.directive';
import { NgFor, NgIf } from '@angular/common';
import { PhotoCardComponent } from '../../components/photo-card/photo-card.component';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss'],
  standalone: true,
  imports: [DragdropDirective, NgFor, PhotoCardComponent, NgIf]
})
export class PrintPageComponent {

  filesArr: File[] = [];
  price = 0;

  constructor(
    private meta: Meta,
    private title: Title,
    private photosService: PhotosService
  ) {
  }

  loadWithDropped(files: File[]) {
    this.filesArr = [...this.filesArr, ...files];
    this.calcPrice();
  }

  loadWithInput($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (files !== null) this.filesArr = [...this.filesArr, ...Object.values(files)];
    this.calcPrice();
  }

  calcPrice() {
    let p = 0;
    const l = this.filesArr.length;
    if (l > 0 && l < 6) p = 30;
    else if (l >= 6 && l < 50) p = 20;
    else if (l >= 50 && l < 100) p = 18;
    else if (l >= 100) p = 16;

    this.price = l * p;
  }

  deletePhoto(i: number) {
    this.filesArr.splice(i, 1);
    this.calcPrice();
  }

  deleteAllPhotos() {
    this.filesArr = [];
    this.calcPrice();
  }

  ngOnInit() {
    this.title.setTitle("Печать фото");
    this.meta.updateTag({name: "title", content: ""});
    this.meta.updateTag({name: "description", content: "Распечатка фотографий"});
    this.meta.updateTag({name: "image", content: "./assets/blog-image.jpg"});
    this.meta.updateTag({name: "site", content: "My Site"});
  }
}
