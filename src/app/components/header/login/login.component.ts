import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) { }

  authFlag: boolean = true
  showRegistration: boolean = false

  showLoginComponent(){
    this.auth.isAuthenticated().then(isAuth => this.authFlag = isAuth)
    this.showRegistration = false
  }
  authorisation(){
    this.authFlag ? this.auth.logout() : this.auth.login()
    this.showLoginComponent()
  }

  ngOnInit(): void {
  }
}
