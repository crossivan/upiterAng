import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RitualLegend} from '../../shared/ritual.interfaces';
import { NgIf } from '@angular/common';
import { ClickThroughDirective } from '../../directive/click-through.directive';

@Component({
  selector: 'app-ritual-preview',
  templateUrl: './ritual-preview.component.html',
  styleUrls: ['./ritual-preview.component.scss'],
  standalone: true,
  imports: [NgIf, ClickThroughDirective]
})
export class RitualPreviewComponent implements OnChanges, OnInit {

  @Input() srcPhoto: string = "assets/images/no_face.png"
  @Input() width: number = 370;
  @Input() shape: string = 'oval';
  @Input() holes: boolean = true;
  @Input() cross: boolean = true;
  @Input() colored: boolean = true;
  @Input() sizes: number = 1;
  @Input() background: number = 1;
  @Input() showPrice: boolean = false;
  @Input() clickLocked: boolean = true;
  @Input() legend: RitualLegend | null = null;
  @Output() refresh = new EventEmitter();

  numFrame = 0;
  shapeIndex = 0;
  textClass = 'textOnRitual__name';


  // changeShape($event: boolean) {
  //   $event ? this.showFormat = 'oval' : this.showFormat = 'rectangle';
  //   this.cross = !$event;
  //   this.ritualForm.get('cross')?.setValue(!$event);
  // }

  constructor(private elementRef: ElementRef) {
  }

  toggleFrame($event: boolean) {
    if ($event) return;
    if (!this.clickLocked) {
      this.shapeIndex < 3 ? this.shapeIndex++ : this.shapeIndex = 0;
      switch (this.shapeIndex) {
        case 0:
          this.numFrame = 0;
          this.shape = 'oval';
          this.refresh.emit({shape: true});
          break;
        case 1:
          this.numFrame = 1;
          this.shape = 'oval';
          this.refresh.emit({shape: true});
          break;
        case 2:
          this.numFrame = 0;
          this.shape = 'rectangle';
          this.refresh.emit({shape: false});
          break;
        case 3:
          this.numFrame = 1;
          this.shape = 'rectangle';
          this.refresh.emit({shape: false});
          break;
      }
    }
  }

  toggleColored($event: boolean) {
    if ($event) return;
    if (!this.clickLocked) {
      this.colored = !this.colored;
      this.refresh.emit({colored: this.colored});
    }
  }

  toggleBackground() {
    if (!this.clickLocked) {
      if (this.background === 5) this.background = 1;
      else this.background += 1;

      this.refresh.emit({background: this.background});
    }
  }

  toggleHoles() {
    if (!this.clickLocked) {
      this.holes = !this.holes;
      this.refresh.emit({holes: this.holes});
    }
  }

  toggleCross() {
    if (!this.clickLocked) {
      this.cross = !this.cross;
      this.refresh.emit({cross: this.cross});
    }
  }

  widthNameText() {
    if (this.legend === null) return;

    let fullName: string = (this.legend.first_name ?? '') + (this.legend.patronymic ?? '');

    if (fullName.length < 16) this.textClass = 'textOnRitual__name';
    else if (fullName.length < 22) this.textClass = 'textOnRitual__name--mod1';
    else this.textClass = 'textOnRitual__name--mod2';
  }

  get price() {
    let calcPrice = 0;

    switch (this.sizes) {
      case 1:
        calcPrice = 900;
        break;
      case 2:
        calcPrice = 1200;
        break;
      case 3:
        calcPrice = 1600;
        break;
      case 4:
        calcPrice = 1800;
        break;
      case 5:
        calcPrice = 2000;
        break;
    }

    if (this.colored) calcPrice += 150;
    else {
      const bg = this.background;
      if (bg === 1 || bg === 2 || bg === 3) calcPrice += 50;
    }

    return calcPrice;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.widthNameText();
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--ritual_preview_width', this.width.toString() + 'px');
  }
}
