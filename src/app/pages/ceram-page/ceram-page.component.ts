import {Subscription} from "rxjs";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-ceram-page',
  templateUrl: './ceram-page.component.html',
  styleUrls: ['./ceram-page.component.scss']
})
export class CeramPageComponent implements OnInit, OnDestroy {

  constructor(private title: Title) {

  }

  myForm: FormGroup
  viewFormat: string = 'assets/images/oval.png'
  viewHole: boolean = true
  textClass: string = 'ceram__name'
  private changeFormatSubscription: Subscription | undefined
  private changeHoleSubscription: Subscription | undefined

  private initForm(): void {
    this.myForm = new FormGroup({
      radioFormat: new FormControl(1),
      radioHole:   new FormControl(1),
      selectSize:  new FormControl(null),
      addText:     new FormControl(false),
      lastName:    new FormControl('Рогов', [
        Validators.required,
        Validators.minLength(4)
      ]),
      firstName:   new FormControl('Анатолий'),
      patronymic:  new FormControl('Ильич'),
      birthday:    new FormControl(null),
      death:       new FormControl(null)
    })
  }

  submit() {
    console.log(this.myForm)
    const formData = {...this.myForm.value}
    console.log(formData)
  }

  // changeFormat(){
  //   this.myForm.get('radioFormat')?.value == 1 ? this.viewFormat = 'assets/images/oval.png' : this.viewFormat = 'assets/images/rectangle2.png'
  // }
  private subscribeToChangeFormat(): void {
    this.changeFormatSubscription = this.myForm.get('radioFormat')?.valueChanges.subscribe((value: number) => {
      value == 1
        ? this.viewFormat = 'assets/images/oval.png'
        : this.viewFormat = 'assets/images/rectangle2.png'
    })
  }

  private subscribeToChangeHole(): void {
    this.changeHoleSubscription = this.myForm.get('radioHole')?.valueChanges.subscribe((value: number) => {
      value == 1 ? this.viewHole = true : this.viewHole = false
    })
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
    this.title.setTitle("Заказ керамики")
    this.initForm()
    this.subscribeToChangeHole()
    this.subscribeToChangeFormat()
  }

  ngOnDestroy(): void {
    this.changeFormatSubscription?.unsubscribe()
    this.changeHoleSubscription?.unsubscribe()
  }
}
