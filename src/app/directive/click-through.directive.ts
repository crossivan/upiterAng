import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({standalone: true, selector: '[clickThrough]'})
export class ClickThroughDirective {

  @Output() clickDisabled = new EventEmitter<boolean>();

  constructor() {
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.crossOrigin = "Anonymous";
    const scale = img.width / 370;
    const x = event.offsetX / scale;
    const y = event.offsetY / scale;
    const canvas = document.createElement('canvas');
    canvas.width = img.width / scale;
    canvas.height = img.height / scale;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const pixel = ctx.getImageData(x, y, 1, 1).data;

      if (pixel[3] === 0) {
        const target = event.target as HTMLElement;
        const nextTarget = target.nextElementSibling;
        (nextTarget as HTMLElement).dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          clientX: event.clientX,
          clientY: event.clientY
        }));
        this.clickDisabled.emit(true);
      } else this.clickDisabled.emit(false);
    }
  }
}
