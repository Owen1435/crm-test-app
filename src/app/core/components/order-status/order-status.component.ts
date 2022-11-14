import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {OrderStatusEnum} from "../../../pages/services-catalog-page/models/enums/order-status.enum";

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnChanges {
  @Input()
  status!: OrderStatusEnum;

  class: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.status) {
      // @ts-ignore
      this.class = Object.keys(OrderStatusEnum).find(key => OrderStatusEnum[key] === this.status);
    }
  }

}
