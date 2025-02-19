import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({standalone: true, selector: '[appDragdrop]'})
export class DragdropDirective {
  constructor() { }

  filesArr: File[] = []
  validExtension = ['jpg', 'jpeg', 'png', 'heic']

  @HostBinding('class.fileover') fileOver: boolean
  @Output() fileDropped = new EventEmitter<any>()

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event){
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = true
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: Event){
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = false
  }

  private findArr(files: FileList){
    Array.prototype.forEach.call(files, (file) => {
      const extension = file.name.split('.').pop()
      if(this.validExtension.includes(extension??"no")){
        this.filesArr.push(file)
      }
      else console.log(extension,'Error');
    });
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent){
    event.preventDefault()
    event.stopPropagation()

    this.fileOver = false
    let files: FileList

    if(event.dataTransfer) {
      files = event.dataTransfer.files
      if (files.length > 0) {
        this.findArr(files)
        this.fileDropped.emit(this.filesArr)
        this.filesArr.length = 0
      }
    }
  }
}
