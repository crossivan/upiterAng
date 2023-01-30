import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/interfaces";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth-block',
  templateUrl: './auth-block.component.html',
  styleUrls: ['./auth-block.component.scss']
})
export class AuthBlockComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  authFlag: boolean
  showModal: boolean = false
  modalContent: string

  login(user:User){
    this.auth.login(user).subscribe(() => {
      this.authFlag = this.auth.isAuthenticated()
      document.body.style.overflow = 'auto'
      this.showModal = false
    })
  }

  authorisation(){
    if(this.authFlag){
      this.auth.logout().subscribe()
      this.authFlag = false
    }
    else{
      this.modalContent = 'login'
      this.showModal=true
    }
  }

  ngOnInit(): void {
    this.authFlag = this.auth.isAuthenticated()
  }
}
