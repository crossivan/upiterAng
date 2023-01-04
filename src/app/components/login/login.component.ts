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
  constructor(private auth: AuthService) { }

  loginForm: FormGroup
  registered: string

  @Output() showReg = new EventEmitter<boolean>()

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
    const formData = {...this.loginForm.value}
    if(this.loginForm.invalid) return

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.auth.login(user).subscribe(value => {
      this.loginForm.reset()
      localStorage.setItem('access_token', value.access_token);
      localStorage.setItem('expires_in', value.expires_in);
      localStorage.setItem('user_name', value.user.name);
      this.registered = 'Вы залогинились'
      console.log(value)

    })
  }

  hideReg($event:Event){
    const target = $event.target as HTMLElement
    if (target.classList.value === 'reg-wrapper') this.showReg.emit(false)
    document.body.style.overflow = ''
  }


  ngOnInit(): void {
    this.initForm()
    document.body.style.overflow = 'hidden'
  }
}
