import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegForm} from '../../shared/interfaces';
import {AuthService} from '../../services/auth.service';
import {appValidEqualFactory} from '../../utilities/valid-equal';
import { NgIf, AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, AsyncPipe]
})
export class RegistrationComponent implements OnInit {

  locked = false;
  regForm: FormGroup;
  @Output() showReg = new EventEmitter<boolean>();
  @Output() regUser = new EventEmitter<RegForm>();
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(public auth: AuthService) {
  }

  submit() {
    if (this.regForm.invalid) return;

    this.locked = true;

    // appValidEqualFactory(
    //   ['password', 'password_confirmation'],
    //   'error')

    this.regUser.emit(this.regForm.value);
  }

  ngOnInit(): void {
    this.initForm();
    console.log(this.regForm);
    document.body.style.overflow = 'hidden';
  }

  initForm(): void {
    this.regForm = new FormGroup<RegForm>({
      name: new FormControl('Wertunok', {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }),
      phone: new FormControl('46547657', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern('((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}')
        ]
      }),
      email: new FormControl('crosta@gmail.ru', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl('qwerty123', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{6,}')
        ]
      }),
      password_confirmation: new FormControl('qwerty1234', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{6,}')
        ]
      })
    });

    this.regForm.setValidators(appValidEqualFactory(
      ['password', 'password_confirmation'],
      'VALIDATION.ERROR')
    );
  }
}
