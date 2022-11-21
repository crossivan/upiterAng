import { Component, OnInit } from '@angular/core';
import {provideRouter} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  menus = ['photodoc','print','ceram','tacho','about']
  alphabet = ['A','B','C','D','E']

  ngOnInit(): void {
  }

}
