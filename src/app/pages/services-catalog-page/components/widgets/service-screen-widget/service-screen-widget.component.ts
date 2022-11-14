import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OrderStatusEnum} from "../../../models/enums/order-status.enum";
import {FuelTypeEnum} from "../../../models/enums/fuel-type.enum";

@Component({
  selector: 'app-service-screen-widget',
  templateUrl: './service-screen-widget.component.html',
  styleUrls: ['./service-screen-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceScreenWidgetComponent {
  @Input()
  orderStatus: OrderStatusEnum | undefined;
  @Input()
  deliveringTime: string | undefined;
  @Input()
  executor: {name: string, phone: string} | undefined;
  @Input()
  volume: { min: number, max: number, value: number } | undefined;
  @Input()
  cost: number | undefined;
  @Input()
  fuel: {types: string[], value: string} | undefined;
}
