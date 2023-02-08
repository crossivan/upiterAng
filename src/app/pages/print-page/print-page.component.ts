import {Component} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss']
})
export class PrintPageComponent {

  filesArr: File[] = [];

  constructor(private title: Title, private meta: Meta) {
  }

  loadWithDropped(files: File[]) {
    this.filesArr = [...this.filesArr, ...files];
  }

  loadWithInput($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (files !== null) this.filesArr = [...this.filesArr, ...Object.values(files)];
  }

  duplicatePhoto() {

  }

  deletePhoto(i: number) {
    this.filesArr.splice(i, 1);
  }

  ngOnInit() {
    this.title.setTitle("Печать фото");
    this.meta.updateTag({name: "title", content: ""});
    this.meta.updateTag({name: "description", content: "Распечатка фотографий"});
    this.meta.updateTag({name: "image", content: "./assets/blog-image.jpg"});
    this.meta.updateTag({name: "site", content: "My Site"});
  }
}
