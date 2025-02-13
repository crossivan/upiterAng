import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {environment} from '../../../environments/environment';
import {OrderResponse} from '../../shared/ritual.interfaces';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders: Array<OrderResponse>;
  user_name: string;

  constructor(private http: HttpService) {
  }

  delete(i: number) {
    this.orders.splice(i, 1);
  }


  listOrders() {
    this.http.get2(environment.URL + '/api/order/orders').subscribe(value => {
      this.orders = value.order;
      this.user_name = value.user_name;
      console.log(value.order);
    });
  }

  ngOnInit() {
    this.listOrders();
  }
}
