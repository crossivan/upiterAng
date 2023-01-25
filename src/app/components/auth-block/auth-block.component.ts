import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-block',
  templateUrl: './auth-block.component.html',
  styleUrls: ['./auth-block.component.scss']
})
export class AuthBlockComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  authFlag: boolean = true
  showModal: boolean = false
  modalContent: string

  showLoginComponent(){
    this.authFlag = this.auth.isAuthenticated()
    this.showModal = false
    this.router.navigate(['/', 'photo_doc'])
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

  login(user:User){
    this.auth.login(user).subscribe(() => {
      console.log(this.auth.token)
    })

    this.authFlag = this.auth.isAuthenticated()
    document.body.style.overflow = 'auto'
    this.showModal = false
  }

  showContent(content: string){
    this.modalContent = content

    this.showModal = !this.authFlag
  }

  ngOnInit(): void {
  }
}
