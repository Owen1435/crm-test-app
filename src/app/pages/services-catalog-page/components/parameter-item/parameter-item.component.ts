import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ParameterDto} from "../../models/parameter.dto";

@Component({
  selector: 'app-parameter-item',
  templateUrl: './parameter-item.component.html',
  styleUrls: ['./parameter-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParameterItemComponent {
  @Input()
  parameter!: ParameterDto;

  @Output()
  deleteParameterEvent: EventEmitter<{parameterId: number}> = new EventEmitter<{parameterId: number}>();
  @Output()
  editParameterEvent: EventEmitter<{parameter: ParameterDto}> = new EventEmitter<{parameter: ParameterDto}>();

  deleteParameter() {
    this.deleteParameterEvent.emit({parameterId: this.parameter.id})
  }

  editParameter() {
    this.editParameterEvent.emit({parameter: this.parameter})
  }
}
