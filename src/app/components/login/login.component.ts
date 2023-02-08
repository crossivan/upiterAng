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

  @Output() user = new EventEmitter<User>();
  @Output() closeModal = new EventEmitter<boolean>();
  loginForm: FormGroup;
  locked = false;

  constructor(public auth: AuthService) {
  }

  submit() {
    if (this.loginForm.invalid) return;

    this.locked = true;

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.user.emit(user);
  }

  ngOnInit(): void {
    this.initForm();
    document.body.style.overflow = 'hidden';
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('crossivan@yandex.ru', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('1xz2Ktyflove', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{6,}')
      ])
    });
  }
}
