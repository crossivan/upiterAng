import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RitualForm} from '../../shared/interfaces';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/http.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-ritual-page',
  templateUrl: './ritual-page.component.html',
  styleUrls: ['./ritual-page.component.scss']
})
export class RitualPageComponent implements OnInit {

  sizes = [
    {id: 1, name: '13x18'},
    {id: 2, name: '18x24'},
    {id: 3, name: '20x25'},
    {id: 4, name: '20x30'},
    {id: 5, name: '20x27'}
  ];
  ritualForm: FormGroup;
  numFrame = 0;
  showHole = true;
  showCross = false;
  showFormat = 'oval';
  textClass = 'textOnRitual__name';

  constructor(private http: HttpService) {
  }
  changeShape($event: boolean) {
    $event ? this.showFormat = 'oval' : this.showFormat = 'rectangle';
    this.showCross = !$event;
    this.ritualForm.get('cross')?.setValue(!$event);
  }

  changeHoles($event: boolean) {
    this.showHole = $event;
  }

  changeCross($event: boolean) {
    this.showCross = $event;
  }


  changeName() {
    let count: string = this.ritualForm.get('firstName')?.value + this.ritualForm.get('patronymic')?.value;

    // count.length > 15 ? this.textClass = 'ritual__name--mod1' : this.textClass = "ritual__name"
    if (count.length > 15) {
      this.textClass = 'textOnRitual__name--mod1';
      if (count.length > 21) this.textClass = 'textOnRitual__name--mod2';
    } else this.textClass = 'textOnRitual__name';
  }

  // changeFormat(){
  //   this.ritualForm.get('radioFormat')?.value == 1 ? this.showFormat = 'assets/images/oval.png' : this.showFormat = 'assets/images/rectangle2.png'

  initForm(): void {
    this.ritualForm = new FormGroup<RitualForm>({
      shape: new FormControl(true, {
        nonNullable: true
      }),
      orientation: new FormControl(true, {
        nonNullable: true
      }),
      holes: new FormControl(true, {
        nonNullable: true
      }),
      sizes: new FormControl(1, {
        nonNullable: true
      }),
      cross: new FormControl(false, {
        nonNullable: true
      }),
      withText: new FormControl(false, {
        nonNullable: true
      }),
      withoutPhoto: new FormControl(false, {
        nonNullable: true
      }),
      epitaph: new FormControl('Помним, любим, скорбим...'),
      lastName: new FormControl(null),
      firstName: new FormControl(null),
      patronymic: new FormControl(null),
      birthday: new FormControl(null),
      death: new FormControl(null)
    });
  }

  submit() {
    const formData = {...this.ritualForm.value};
    console.log(formData);

    const path = environment.URL + '/api/ritual/upload'
    this.http.post(path, formData).subscribe(res => {
      console.log(res)
    })
  }

  ngOnInit(): void {
    this.initForm();
  }
}
