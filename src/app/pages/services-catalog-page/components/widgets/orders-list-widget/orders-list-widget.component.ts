import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {OrderStatusEnum} from "../../../models/enums/order-status.enum";
import {ServiceTypeEnum} from "../../../models/enums/service-type.enum";

@Component({
  selector: 'app-orders-list-widget',
  templateUrl: './orders-list-widget.component.html',
  styleUrls: ['./orders-list-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListWidgetComponent implements OnChanges {
  @Input()
  cost: number | undefined;
  @Input()
  deliveringTime: string | undefined;
  @Input()
  serviceType: ServiceTypeEnum | undefined;
  @Input()
  orderStatus: OrderStatusEnum | undefined;

  public dataSource: any[] = [{}];
  public displayedColumns: string[] = [];

  constructor() { }

  ngOnChanges(): void {
    const displayedColumns = []
    this.serviceType && displayedColumns.push('serviceType')
    this.deliveringTime && displayedColumns.push('deliveringTime')
    this.cost && displayedColumns.push('cost')
    this.orderStatus && displayedColumns.push('orderStatus')
    this.displayedColumns = displayedColumns;

    if (this.dataSource[0]) {
      this.dataSource[0].serviceType = this.serviceType
      this.dataSource[0].deliveringTime = this.deliveringTime
      this.dataSource[0].cost = this.cost
      this.dataSource[0].orderStatus = this.orderStatus
    }
  }
}
