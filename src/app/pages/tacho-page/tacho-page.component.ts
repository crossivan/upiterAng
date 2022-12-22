import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-tacho-page',
  templateUrl: './tacho-page.component.html',
  styleUrls: ['./tacho-page.component.scss']
})
export class TachoPageComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Карты для тахографов")
  }

}
