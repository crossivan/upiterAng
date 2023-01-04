import { KeyValue } from '@angular/common'
import {HttpService} from "../../services/http.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpService) { }

  regForm: FormGroup
  // label = ['Ваше Имя','Телефон','email','Пароль','Подтвердите пароль']
  label = ['name','email','Пароль','Подтвердите пароль']
  registered: string

  @Output() showReg = new EventEmitter<boolean>()

  private initForm(): void {
    this.regForm = new FormGroup({
      name: new FormControl('Wertunok',[
        Validators.required,
        Validators.minLength(2)
      ]),
      // phone: new FormControl('46547657', [
      //   Validators.required,
      //   Validators.pattern('((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}')
      // ]),
      email: new FormControl('c@g.te', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('fgfhtfghthS#6', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*')
      ]),
      password_confirmation: new FormControl('fgfhtfghthS#6', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*')
      ])
    })
    //console.log(this.regForm.value)
  }

  submit(){
    const formData = {...this.regForm.value}
    this.http.post('http://127.0.0.1/api/auth/register', formData).subscribe(
      value => {
        if(value.message) {
          this.regForm.reset()
          this.registered = value.message
        }
        else {
          console.log('wer',value)
          this.registered = value
        }

      },
    )


  }

  // Отключение сортировки в pipe keyvalue
  originalOrder = (a: KeyValue<string,string>, b: KeyValue<string,string>): number => {
    return 0;
  }

  // Без этой функции поля теряют input фокус
  trackByFn(index: number, item: object) {
    return index;
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
