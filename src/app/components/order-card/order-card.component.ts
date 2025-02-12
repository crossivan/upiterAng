import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OrderResponse} from '../../shared/ritual.interfaces';
import {environment} from '../../../environments/environment';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {

  @Input() order_number: number;
  @Input() order: OrderResponse;
  @Output() deleted = new EventEmitter();

  constructor(private http: HttpService) {
  }

  delete(i: number, id: number) {
    this.http.delete(environment.URL + '/api/ritual/orders/' + id).subscribe(value => {
      console.log(value);
      this.deleted.emit(this.order_number);
    });
  }

}
