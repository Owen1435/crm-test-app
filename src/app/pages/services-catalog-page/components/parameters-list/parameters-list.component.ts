import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParameterDto} from "../../models/parameter.dto";
import {ParameterCategoryEnum} from "../../models/enums/parameter-category.enum";

@Component({
  selector: 'app-parameters-list',
  templateUrl: './parameters-list.component.html',
  styleUrls: ['./parameters-list.component.scss']
})
export class ParametersListComponent {
  @Input()
  title: string = '';
  @Input()
  parameters: ParameterDto[] = [];
  @Input()
  category: ParameterCategoryEnum;

  @Output()
  addParameterEvent: EventEmitter<{category: ParameterCategoryEnum}> = new EventEmitter<{category: ParameterCategoryEnum}>();
  @Output()
  loadParameterEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  linkParameterEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  deleteParameterEvent: EventEmitter<{ parameterId: number }> = new EventEmitter<{ parameterId: number }>();
  @Output()
  editParameterEvent: EventEmitter<{ parameter: ParameterDto }> = new EventEmitter<{ parameter: ParameterDto }>();

  public showOptions = true
  public panelOpenState = true

  addParameter() {
    this.addParameterEvent.emit({category: this.category})
  }

  loadParameter() {
    this.loadParameterEvent.emit()
  }

  linkParameter() {
    this.linkParameterEvent.emit()
  }

  deleteParameter(payload: { parameterId: number }) {
    this.deleteParameterEvent.emit(payload)
  }

  editParameter(payload: { parameter: ParameterDto }) {
    this.editParameterEvent.emit(payload)
  }
}
