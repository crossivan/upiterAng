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
  constructor(public auth: AuthService) { }

  @Output() user = new EventEmitter<User>()

  loginForm: FormGroup
  registered: string


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

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('crossivan@yandex.ru'),
      password: new FormControl('1xz2Ktyflove')
    })
  }

  ngOnInit(): void {
    this.initForm()
    document.body.style.overflow = 'hidden'
  }
}
