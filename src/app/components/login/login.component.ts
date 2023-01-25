import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor() { }

  @Output() user = new EventEmitter<User>()

  loginForm: FormGroup
  registered: string

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('crossivan@yandex.ru', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('1xz2Ktyflove', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*')
      ])
    })
  }

  submit(){
    // const formData = {...this.loginForm.value}
    if(this.loginForm.invalid) return

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.loginForm.reset()
    this.user.emit(user)
  }

  ngOnInit(): void {
    this.initForm()
    document.body.style.overflow = 'hidden'
  }
}
