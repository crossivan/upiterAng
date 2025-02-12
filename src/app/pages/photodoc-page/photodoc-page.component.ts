import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {HttpParams} from "@angular/common/http";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-photodoc-page',
  templateUrl: './photodoc-page.component.html',
  styleUrls: ['./photodoc-page.component.scss']
})
export class PhotodocPageComponent implements OnInit {

  constructor(public http: HttpService, private title: Title) {
  }

  getHttp() {
    const params = new HttpParams()
      .set(`name`, 'wer10')
      .set(`email`, 'ver@hjfghj.ty2')
      .set(`phone`, '4444444')
      .set(`pass`, '1234');
    this.http.get('http://upiter.ru/newUser.php', params).subscribe(value => console.log(value));
  }

  ngOnInit(): void {
    this.title.setTitle("Фото на документы");
  }

}
