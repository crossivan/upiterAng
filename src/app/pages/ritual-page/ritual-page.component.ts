import {Subscription} from "rxjs";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-ritual-page',
  templateUrl: './ritual-page.component.html',
  styleUrls: ['./ritual-page.component.scss']
})
export class RitualPageComponent implements OnInit, OnDestroy {

  sizes = [
    {id: 1, name: '13x18'},
    {id: 2, name: '18x24'},
    {id: 3, name: '20x25'},
    {id: 4, name: '20x30'},
    {id: 5, name: '20x27'}
  ];
  myForm: FormGroup;
  viewFormat: string = 'oval';
  numFrame = 0;
  viewHole: boolean = true;
  textClass: string = 'textOnRitual__name';
  private changeFormatSubscription: Subscription | undefined;
  private changeHoleSubscription: Subscription | undefined;

  constructor(private title: Title) {

  }

  submit() {
    const formData = {...this.myForm.value};
    console.log(formData);
  }

  changeName() {
    let count: string = this.myForm.get('firstName')?.value + this.myForm.get('patronymic')?.value;

    // count.length > 15 ? this.textClass = 'ritual__name--mod1' : this.textClass = "ritual__name"
    if (count.length > 15) {
      this.textClass = 'textOnRitual__name--mod1';
      if (count.length > 21) this.textClass = 'textOnRitual__name--mod2';
    } else this.textClass = 'textOnRitual__name';
  }

  // changeFormat(){
  //   this.myForm.get('radioFormat')?.value == 1 ? this.viewFormat = 'assets/images/oval.png' : this.viewFormat = 'assets/images/rectangle2.png'

  ngOnInit(): void {
    this.title.setTitle("Заказ керамики");
    this._initForm();
    this.subscribeToChangeHole();
    this.subscribeToChangeFormat();
  }

  ngOnDestroy(): void {
    this.changeFormatSubscription?.unsubscribe();
    this.changeHoleSubscription?.unsubscribe();
  }

  private _initForm(): void {
    this.myForm = new FormGroup({
      format: new FormControl(1),
      orientation: new FormControl(1),
      hole: new FormControl(1),
      size: new FormControl(null),
      withText: new FormControl(false),
      withoutPhoto: new FormControl(false),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      patronymic: new FormControl(null),
      birthday: new FormControl(null),
      death: new FormControl(null),
      epitaph: new FormControl('Помним, любим, скорбим...')
    });
  }

  // }
  private subscribeToChangeFormat(): void {
    this.changeFormatSubscription = this.myForm.get('format')?.valueChanges.subscribe((value: number) => {
      value == 1
        ? this.viewFormat = 'oval'
        : this.viewFormat = 'rectangle';
    });
  }

  private subscribeToChangeHole(): void {
    this.changeHoleSubscription = this.myForm.get('hole')?.valueChanges.subscribe((value: number) => {
      value == 1 ? this.viewHole = true : this.viewHole = false;
    });
  }
}
