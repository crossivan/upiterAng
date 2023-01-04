import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";

@Component({
  selector: 'app-auth-block',
  templateUrl: './auth-block.component.html',
  styleUrls: ['./auth-block.component.scss']
})
export class AuthBlockComponent implements OnInit {

  constructor(public auth: AuthService) { }

  authFlag: boolean = true
  showModal: boolean = false
  modalContent: string
  user: User = {
    email: 'crossivan@yandex.ru',
    password: 'sdfgsdgdfg'
  }

  showLoginComponent(){
    this.auth.isAuthenticated().then(isAuth => this.authFlag = isAuth)
    this.showModal = false
  }

  authorisation(){
    if(this.authFlag){
      this.auth.logout()
      this.showLoginComponent()
    }
    else{
      this.showModal=true
      this.showContent('login')
    }

  }

  showContent(content: string){
    this.modalContent = content
    this.authFlag ? this.showModal=false : this.showModal=true
  }

  ngOnInit(): void {
  }
}
