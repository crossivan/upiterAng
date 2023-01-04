import { Component, OnInit } from '@angular/core';
import {provideRouter} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  menus = ['photo_doc','print','ceramics','tacho','about']
  alphabet = ['A','B','C','D','E']

  ngOnInit(): void {
  }

}
