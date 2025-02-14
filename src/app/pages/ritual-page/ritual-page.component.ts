import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpService} from '../../services/http.service';
import {environment} from '../../../environments/environment';
import {PhotosService} from '../../services/photos.service';
import {HttpEventType, HttpParams} from '@angular/common/http';
import {RitualForm, UploadFileResponse} from '../../shared/ritual.interfaces';


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
    {id: 4, name: '20x27'},
    {id: 5, name: '20x30'}
  ];
  background = [
    {id: 1, name: 'Небо с облаками'},
    {id: 2, name: 'Голубой'},
    {id: 3, name: 'Голубой ореол'},
    {id: 4, name: 'Белый'},
    {id: 5, name: 'Серый'}
  ];
  ritualForm: FormGroup;
  showHole = true;
  showCross = false;
  shape = 'oval';
  withPhoto = true;
  withFIO = false;
  formSubmitted = false;
  order: number;
  filesArr: File[] = [];
  urlArr: string[] = [];
  environment = environment.URL;
  hashName = '';

  constructor(private http: HttpService, private photosService: PhotosService) {
  }

  loadWithInput($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files: FileList | null = target.files;

    if (files !== null) {

      this.filesArr = [...this.filesArr, ...Object.values(files)];
      Array.from(files).forEach(file => {

        const formData = new FormData();

        if (/\.(jpe?g|png|gif|heic)$/i.test(file.name)) {
          formData.append("photo", file);
          const url = environment.URL + '/api/ritual/photo';
          this.photosService.sendPhoto(formData, url).subscribe(value => {
            if (value.type == HttpEventType.Response) {
              const target = value.body as UploadFileResponse;
              this.urlArr.push(environment.URL + target.path);
              this.hashName = target.hash_name;
            }
          });
        } else {
          console.warn("Выбранный файл не является фотографией: ", file);
        }
      });
    }
  }

  delete_photo(photo: string) {
    const hashName = photo.split('/')[7];
    this.photosService.remove('ritual', hashName).subscribe(() =>{
      let indexToRemove = this.urlArr.indexOf(photo);
      this.urlArr.splice(indexToRemove, 1);
      this.filesArr.splice(indexToRemove, 1);
    });
  }

  refreshData(event: Object) {
    this.ritualForm.patchValue(event);
  }

  changeShape($event: boolean) {
    $event ? this.shape = 'oval' : this.shape = 'rectangle';
    this.showCross = !$event;
    this.ritualForm.get('cross')?.setValue(!$event);
  }

  changeHoles($event: boolean) {
    this.showHole = $event;
  }

  changeColored($event: boolean) {

    // this.showHole = $event;
  }

  changeCross($event: boolean) {
    this.showCross = $event;
  }

  changeNoPhoto() {
    this.withPhoto = !this.withPhoto;
    this.ritualForm.get('withText')?.setValue(!this.withPhoto);

    if(this.urlArr.length>0 && !this.withPhoto) {
      this.urlArr.forEach((url) => { this.delete_photo(url); console.log(url)})
    }
  }

  writeFIO($event: boolean){
    this.clearText();
    if($event) this.enableInput();
    else this.disableInput();
  }

  enableInput(){
    this.withFIO = true;
    this.ritualForm.get('last_name')?.enable();
    this.ritualForm.get('first_name')?.enable();
    this.ritualForm.get('patronymic')?.enable();
    this.ritualForm.get('birthday')?.enable();
    this.ritualForm.get('death')?.enable();
    this.ritualForm.get('epitaph')?.enable();
  }

  disableInput(){
    this.withFIO = false;
    this.ritualForm.get('last_name')?.disable();
    this.ritualForm.get('first_name')?.disable();
    this.ritualForm.get('patronymic')?.disable();
    this.ritualForm.get('birthday')?.disable();
    this.ritualForm.get('death')?.disable();
    this.ritualForm.get('epitaph')?.disable();
  }

  clearText() {
    if (!this.ritualForm.get('withText')?.value) {
      this.ritualForm.get('last_name')?.reset();
      this.ritualForm.get('first_name')?.reset();
      this.ritualForm.get('patronymic')?.reset();
      this.ritualForm.get('birthday')?.reset();
      this.ritualForm.get('death')?.reset();
      this.ritualForm.get('epitaph')?.reset();
    }
  }

  initForm(): void {
    this.ritualForm = new FormGroup<RitualForm>({
      hash_name: new FormControl(null),
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
      frame: new FormControl(1, {
        nonNullable: true
      }),
      background: new FormControl(1, {
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
      colored: new FormControl(true, {
        nonNullable: true
      }),
      epitaph: new FormControl({value: null, disabled: true}),
      last_name: new FormControl({value: null, disabled: true}),
      first_name: new FormControl({value: null, disabled: true}),
      patronymic: new FormControl({value: null, disabled: true}),
      birthday: new FormControl({value: null, disabled: true}),
      death: new FormControl({value: null, disabled: true})
    });
  }

  submit() {
    this.formSubmitted = true;

    this.ritualForm.get('hash_name')?.setValue(this.hashName);

    const formData = {...this.ritualForm.value};
    // formData = {...this.hashName}

    console.log(formData)

    const path = environment.URL + '/api/ritual/upload';
    this.http.post(path, formData).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.initForm();



    // const params = new HttpParams();
    // const path = environment.URL + '/api/ritual/data';
    // this.http.get(path, params).subscribe((res: DataResponse) => {
    //   if (res.files) this.urlArr = res.files.map((path: string) => environment.URL + '/' + path);
    //   this.order = res.order;
    // });
  }
}
