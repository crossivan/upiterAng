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

  regForm: FormGroup
  authFlag: boolean = true
  showRegistration: boolean = false

  private initForm(): void {
    this.regForm = new FormGroup({
      radioFormat: new FormControl(1),
      radioHole: new FormControl(1),
      selectSize: new FormControl(''),
      addText: new FormControl(false),
      lastName: new FormControl('Рогов', [Validators.required, Validators.minLength(4)]),
      firstName: new FormControl('Анатолий'),
      patronymic: new FormControl('Ильич'),
      birthday: new FormControl(''),
      death: new FormControl('')
    })
  }

  submit() {
    console.log(this.regForm)
    const formData = {...this.regForm.value}
    console.log(formData)
  }

  showLoginComponent(){
    this.auth.isAuthenticated().then(isAuth => this.authFlag = isAuth)
  }
  authorisation(){
    this.authFlag ? this.auth.logout() : this.auth.login()
    this.showLoginComponent()
  }

  ngOnInit(): void {
    this.initForm()
  }
}
