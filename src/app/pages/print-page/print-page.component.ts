import {Component} from '@angular/core';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss']
})
export class PrintPageComponent {

  constructor() { }

  filesArr: File[]

  loadWithDropped($event: FileList) {
    if(this.filesArr) this.filesArr = [...this.filesArr, ...Object.values($event)]
    else this.filesArr = Object.values($event)
  }

  loadWithInput($event: Event){
    const target = $event.target as HTMLInputElement
    const files: FileList | null = target.files

    if(files !== null) {
      if(this.filesArr){
        this.filesArr = [...this.filesArr, ...Object.values(files)]
      }
      else this.filesArr = Object.values(files)
    }
  }

  deletePhoto(i:number){
    this.filesArr.splice(i,1)
  }
}
