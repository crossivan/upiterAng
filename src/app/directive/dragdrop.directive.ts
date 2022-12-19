import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDragdrop]'
})
export class DragdropDirective {
  constructor() { }

  @HostBinding('class.fileover') fileOver: boolean
  @Output() fileDropped = new EventEmitter<any>()

  @HostListener('dragover', ['$event']) onDragOver(event: Event){
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = true
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event: Event){
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = false
  }

  @HostListener('drop', ['$event']) public onDrop(event: DragEvent){
    event.preventDefault()
    event.stopPropagation()

    this.fileOver = false
    let files: FileList

    if(event.dataTransfer) {
      files = event.dataTransfer.files
      if (files.length > 0) {
        this.fileDropped.emit(files)
      }
    }
  }
}
