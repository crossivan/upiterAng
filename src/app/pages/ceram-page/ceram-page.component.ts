import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";

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
  viewFormat: string = 'oval'
  viewHole: boolean = true
  textClass: string = 'ceram__name'

  constructor() {

  }

  changeFormat(){
    this.myForm.get('radioFormat')?.value == 1 ? this.viewFormat = 'oval' : this.viewFormat = 'rectangle'
  }

  changeHole(){
    this.myForm.get('radioHole')?.value == 1 ? this.viewHole = true : this.viewHole = false
  }

  changeName(){
    let count: string = this.myForm.get('firstName')?.value + this.myForm.get('patronymic')?.value

    // count.length > 15 ? this.textClass = 'ceram__name--mod1' : this.textClass = "ceram__name"
    if (count.length > 15) {
      this.textClass = 'textOnCeram__name--mod1'
      if (count.length > 21)  this.textClass = 'textOnCeram__name--mod2'
    }
    else this.textClass = 'textOnCeram__name'
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      radioFormat: new FormControl(1),
      radioSize: new FormControl(1),
      radioHole: new FormControl(1),
      lastName: new FormControl('Рогов', [Validators.required, Validators.minLength(4)]),
      firstName: new FormControl('Анатолий'),
      patronymic: new FormControl('Ильич'),
      birthday: new FormControl(''),
      death: new FormControl('')
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
