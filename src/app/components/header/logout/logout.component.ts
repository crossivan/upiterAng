import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public auth: AuthService) { }

  @Output()
  logoutEmit = new EventEmitter()

  ngOnInit(): void {
  }

  showFlag: boolean = false
  showLoginComponent(){
    this.auth.isAuthenticated().then(isAuth => this.showFlag = isAuth)
    this.logoutEmit.emit(this.showFlag)
  }
}
