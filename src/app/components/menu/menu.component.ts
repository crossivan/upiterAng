import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: string[] = ['photo_doc', 'print', 'ceramics', 'tacho', 'about'];
  menu_names = [
    'На документы',
    'Распечатать',
    'Ритуальное',
    'Для тахографов',
    'Контакты'
  ];

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {

    if(!this.auth.isAuthenticated()) {
      this.menu_names.splice(2,1);
      this.menus = ['photo_doc', 'print', 'tacho', 'about'];
    }

    this.auth.menu$.subscribe(value => {
      this.menus = value;
    });
  }
}
