import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }

  Dropped(){
    console.log('Не попали - заглушка для Drag&Drop в app.component.ts')
  }
}
