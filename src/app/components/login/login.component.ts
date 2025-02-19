import {Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../../services/auth.service";
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, AsyncPipe]
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

    this.user.emit(this.loginForm.value);
  }

  ngOnInit(): void {
    this.initForm();
    document.body.style.overflow = 'hidden';
  }

  private initForm(): void {
    this.loginForm = new FormGroup<User>({
      email: new FormControl('crossivan@yandex.ru', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl('1xz2Ktyflove', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6)
          // Validators.pattern('(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{6,}')
        ]
      })
    });
  }
}
