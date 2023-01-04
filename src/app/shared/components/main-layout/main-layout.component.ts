import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  Dropped(){
    console.log('Не попали - заглушка для Drag&Drop в app.component.ts')
  }
}
