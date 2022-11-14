import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ServiceDto} from "../../models/service.dto";

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceItemComponent {
  @Input()
  service: ServiceDto | undefined;
  @Input()
  selected: boolean = false;

  @Output()
  selectServiceEvent: EventEmitter<ServiceDto> = new EventEmitter<ServiceDto>();
  @Output()
  editServiceEvent: EventEmitter<ServiceDto> = new EventEmitter<ServiceDto>();

  selectService() {
    this.selectServiceEvent.emit(this.service)
  }

  editService() {
    this.editServiceEvent.emit(this.service)
  }
}
