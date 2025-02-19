import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet]
})
export class AdminLayoutComponent {

  constructor(private router: Router) {
  }

  logout(event: Event) {
    event.preventDefault()
    this.router.navigate(['/admin', 'login'])
  }
}
