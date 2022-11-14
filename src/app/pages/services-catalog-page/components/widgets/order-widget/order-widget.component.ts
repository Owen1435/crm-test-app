import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OrderStatusEnum} from "../../../models/enums/order-status.enum";

@Component({
  selector: 'app-order-widget',
  templateUrl: './order-widget.component.html',
  styleUrls: ['./order-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderWidgetComponent {
  @Input()
  orderStatus: OrderStatusEnum | undefined;
  @Input()
  deliveringTime: string | undefined;
  @Input()
  executor: {name: string, phone: string} | undefined;
}
