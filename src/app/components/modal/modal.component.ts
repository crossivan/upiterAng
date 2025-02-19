import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true
})
export class ModalComponent {

  @Output() hideModal = new EventEmitter<boolean>();

  modalExit() {
    document.body.style.overflow = 'auto';
    this.hideModal.emit(true);
  }

  ngOnInit() {
    document.body.style.overflow = "hidden";
  }
}
