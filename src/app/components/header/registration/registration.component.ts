import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { KeyValue } from '@angular/common'
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpService) { }

  regForm: FormGroup
  label = ['Ваше Имя','Телефон','e-Mail','Пароль']

  @Output() showReg = new EventEmitter<boolean>()

  private initForm(): void {
    this.regForm = new FormGroup({
      firstName: new FormControl('Wertunok',[
        Validators.required,
        Validators.minLength(2)
      ]),
      phone: new FormControl('46547657', [
        Validators.required,
        Validators.pattern('((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}')
      ]),
      email: new FormControl('c@g.te', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('fgfhtfghthS#6', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*')
      ])
    })
    //console.log(this.regForm.value)
  }

  submit() {
    const formData = {...this.regForm.value}
    this.http.post('http://upiter.ru/newUser.php', formData).subscribe(value => console.log(value))
    console.log(this.regForm)

    console.log(formData)
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

  n = {email:''}
  userExist(){
    const formData = {'email': 'c@g6.te'}
    this.http.post('http://upiter.ru/userExist.php', formData).subscribe(
      value => this.n = value
    )


  }

  ngOnInit(): void {
    this.initForm()
    document.body.style.overflow = 'hidden'
  }


}
