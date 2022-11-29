import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) { }

  @Output()
  loginEmit = new EventEmitter()

  ngOnInit(): void {
  }

  showFlag: boolean = true
  showLoginComponent(){
    this.auth.isAuthenticated().then(isAuth => this.showFlag = isAuth)
    this.loginEmit.emit(this.showFlag)
  }
}
