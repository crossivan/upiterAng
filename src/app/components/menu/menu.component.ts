import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() {
  }

  menus = ['photo_doc', 'print', 'ceramics', 'tacho', 'about'];
  menu_names = [
    'На документы',
    'Распечатать',
    'Ритуальное',
    'Для тахографов',
    'Контакты',
  ]


  ngOnInit(): void {
  }

}
