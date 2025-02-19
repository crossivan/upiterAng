import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OrderResponse} from '../../shared/ritual.interfaces';
import {environment} from '../../../environments/environment';
import {HttpService} from '../../services/http.service';
import { RitualPreviewComponent } from '../ritual-preview/ritual-preview.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  standalone: true,
  imports: [RitualPreviewComponent, DatePipe]
})
export class OrderCardComponent {

  @Input() order_number: number;
  @Input() order: OrderResponse;
  @Input() user_name: string;
  @Output() deleted = new EventEmitter();

  sizes = [
    {id: 1, name: '13x18'},
    {id: 2, name: '18x24'},
    {id: 3, name: '20x25'},
    {id: 4, name: '20x27'},
    {id: 5, name: '20x30'}
  ];
  path: string;

  constructor(private http: HttpService) {
  }

  delete(i: number, id: number) {
  this.http.delete(environment.URL + '/api/order/' + id).subscribe(value => {
      this.deleted.emit(this.order_number);
    });
  }

  ngOnInit(): void {
    this.path = environment.URL + '/public/storage/ritual/18-A6-F7-12-72-3F/thumbnail/' + this.order.hash_name;
  }

}
