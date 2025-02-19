import { Component } from '@angular/core';
import { DragdropDirective } from '../../../directive/dragdrop.directive';
import { HeaderComponent } from '../../../components/header/header.component';
import { MenuComponent } from '../../../components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [DragdropDirective, HeaderComponent, MenuComponent, RouterOutlet, FooterComponent]
})
export class MainLayoutComponent {

  Dropped(){
    console.log('Не попали - заглушка для Drag&Drop в app.component.ts')
  }
}
