import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss']
})
export class PrintPageComponent implements OnInit {

  constructor() { }

  upload($event:Event){
    const target = $event.target as HTMLInputElement
    console.log(target.files)

  }

  ngOnInit(): void {
  }

}
