import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";

export interface Ceram {
  id: number
  firstName: string
  lastName: string
  patronymic: string
  birthday: number
  death: number
}

@Component({
  selector: 'app-ceram-page',
  templateUrl: './ceram-page.component.html',
  styleUrls: ['./ceram-page.component.scss']
})
export class CeramPageComponent implements OnInit {

  // ceramNew: Ceram = {
  //   id:1,
  //   firstName: 'Константин',
  //   lastName: 'Рогов',
  //   patronymic: 'Константинович',
  //   birthday: 1955,
  //   death: 2017
  // }

  myForm: FormGroup
  formData: FormGroup
  textWidth: boolean = false
  textClass: string = 'ceram__name'

  constructor() {
  }

  changeInput($event: Event){
    let count: string = this.myForm.get('firstName')?.value + this.myForm.get('patronymic')?.value

    // count.length > 15 ? this.textClass = 'ceram__name--mod1' : this.textClass = "ceram__name"

    if (count.length > 15) {
      this.textClass = 'ceram__name--mod1'
      if (count.length > 21)  this.textClass = 'ceram__name--mod2'
    }
    else this.textClass = 'ceram__name'


    // const target = $event.target as HTMLInputElement
    // const name = target.name

    this.formData = {...this.myForm.value}

    console.log(count.length)

  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      lastName: new FormControl('Рогов', [Validators.required, Validators.minLength(4)]),
      firstName: new FormControl('Иван'),
      patronymic: new FormControl('Иванович')
    })
    this.myForm.valueChanges.subscribe((status) => {
    //console.log(status)
  })
  }

  submit() {
    console.log(this.myForm)
    const formData = {...this.myForm.value}
    console.log(formData)
  }
}
