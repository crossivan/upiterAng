import {Component, EventEmitter, HostListener, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() hideModal = new EventEmitter<boolean>()

  @HostListener('click', ['$event'])
  modalClick(event: Event) {
    document.body.style.overflow = "hidden"
    const target = event.target as HTMLElement
    const targetClass = target.classList.value
    if (targetClass === 'modal__exit' || targetClass === 'icon-exit') {
      this.modalExit()
    }
  }

  modalExit() {
    document.body.style.overflow = 'auto'
    this.hideModal.emit(false)
  }

  ngOnInit(){
    document.body.style.overflow = "hidden"
  }
}
