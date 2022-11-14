import {Component, Input} from '@angular/core';
import {ParameterDto} from "../../models/parameter.dto";
import {OrderStatusEnum} from "../../models/enums/order-status.enum";
import {ParametersService} from "../../services/parameters.service";

@Component({
  selector: 'app-widgets-preview',
  templateUrl: './widgets-preview.component.html',
  styleUrls: ['./widgets-preview.component.scss']
})
export class WidgetsPreviewComponent {
  @Input()
  parameters: ParameterDto[] = [];

  orderStatus: OrderStatusEnum | undefined;
  deliveringTime: string | undefined;
  cost: number | undefined;
  volume: { min: number, max: number, value: number } | undefined;
  executor: {name: string, phone: string} | undefined;
  fuel: {types: string[], value: string} | undefined;

  constructor(private readonly parametersService: ParametersService) {
  }

  ngOnChanges(): void {
    this.orderStatus = this.parametersService.getParameterValue('orderStatus', this.parameters)?.value
    this.deliveringTime = this.parametersService.getParameterValue('deliveringTime', this.parameters)?.value
    this.cost = this.parametersService.getParameterValue('cost', this.parameters)?.value
    this.volume = this.parametersService.getParameterValue('volume', this.parameters)
    this.executor = this.parametersService.getParameterValue('executor', this.parameters)
    this.fuel = this.parametersService.getParameterValue('fuel', this.parameters)
  }
}
