import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-price-for-doc',
  templateUrl: './price-for-doc.component.html',
  styleUrls: ['./price-for-doc.component.scss']
})
export class PriceForDocComponent implements OnInit{

  @Input() size: number[]
  @Input() quantity: number[]
  @ViewChild ("img", {static: true}) img: ElementRef

  ngOnInit(): void {
     this.img.nativeElement.style="width:"+this.size[0]*45+"px"
  }
}
