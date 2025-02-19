import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { AuthBlockComponent } from '../auth-block/auth-block.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [AuthBlockComponent]
})
export class HeaderComponent implements OnInit {

  showFlag: boolean;

  constructor(public auth: AuthService) {
  }

  eventChild(showFlag: boolean) {
    this.showFlag = showFlag;
  }

  ngOnInit(): void {
  }

}
