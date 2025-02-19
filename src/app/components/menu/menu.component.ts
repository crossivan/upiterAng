import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, AsyncPipe]
})
export class MenuComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }
}
