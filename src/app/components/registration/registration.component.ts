import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegData} from '../../shared/interfaces';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  locked = false;
  regForm: FormGroup;
  registered: string;
  @Output() showReg = new EventEmitter<boolean>();
  @Output() regUser = new EventEmitter<RegData>();
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(public auth: AuthService) {
  }


  submit() {
    if (this.regForm.invalid) return;

    this.locked = true;

    const user: RegData = {
      name: this.regForm.value.name,
      phone: this.regForm.value.phone,
      email: this.regForm.value.email,
      password: this.regForm.value.password,
      password_confirmation: this.regForm.value.password_confirmation
    };

    this.regUser.emit(user);
  }



  // submit() {
  //   const formData = {...this.regForm.value};
  //   this.http.post('http://127.0.0.1/api/auth/register', formData).subscribe(
  //     value => {
  //       if (value.message) {
  //         this.regForm.reset();
  //         this.registered = value.message;
  //       } else {
  //         console.log('wer', value);
  //         this.registered = value;
  //       }
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.initForm();
    console.log(this.regForm);
    document.body.style.overflow = 'hidden';
  }

  private initForm(): void {
    this.regForm = new FormGroup({
      name: new FormControl('Wertunok', [
        Validators.required
      ]),
      phone: new FormControl('46547657', [
        Validators.required,
        Validators.pattern('((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}')
      ]),
      email: new FormControl('crosta@gmail.ru', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('qwerty123', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{6,}')
      ]),
      password_confirmation: new FormControl('qwerty123', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{6,}')
      ])
    });
  }
}
