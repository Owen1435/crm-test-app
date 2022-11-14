import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ServiceDto} from "./models/service.dto";
import {first, map, Observable, Subscription} from "rxjs";
import {select, Store} from '@ngrx/store';
import {selectedServiceSelector, servicesSelector} from "./state-management/service-catalog-page.reducers";
import {
  ADD_PARAMETER_REQUEST, DELETE_PARAMETER_REQUEST, EDIT_PARAMETER_REQUEST,
  GET_SERVICE_REQUEST,
  GET_SERVICES_LIST_REQUEST
} from "./state-management/service-catalog-page.actions";
import {ParameterDto} from "./models/parameter.dto";
import {ParameterCategoryEnum} from "./models/enums/parameter-category.enum";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  AddParametersModal,
  AddParametersModalComponent
} from "./components/add-parameter-modal/add-parameters-modal.component";
import {
  EditParameterModal,
  EditParameterModalComponent
} from "./components/edit-parameter-modal/edit-parameter-modal.component";

@Component({
  selector: 'app-service-catalog-page-presentation',
  templateUrl: './service-catalog-page.component.html',
  styleUrls: ['./service-catalog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCatalogPagePresentationComponent {
  @Input()
  services: ServiceDto[] = []
  @Input()
  selectedService: ServiceDto | null
  @Input()
  clientParameters: ParameterDto[] = []
  @Input()
  providerParameters: ParameterDto[] = []
  @Input()
  otherParameters: ParameterDto[] = []

  @Output()
  addParametersEvent: EventEmitter<{serviceId: number, category: ParameterCategoryEnum}> = new EventEmitter<{serviceId: number, category: ParameterCategoryEnum}>();
  @Output()
  editParameterEvent: EventEmitter<{serviceId: number, parameter: ParameterDto}> = new EventEmitter<{serviceId: number, parameter: ParameterDto}>();
  @Output()
  deleteParameterEvent: EventEmitter<{serviceId: number, parameterId: number }> = new EventEmitter<{serviceId: number, parameterId: number }>();
  @Output()
  loadParameterEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  linkParameterEvent: EventEmitter<void> = new EventEmitter<void>();

  parameterCategoryEnum: typeof ParameterCategoryEnum = ParameterCategoryEnum

  addParameters(payload: {category: ParameterCategoryEnum}) {
    this.addParametersEvent.emit({...payload, serviceId: this.selectedService.id})
  }

  editParameter(payload: {parameter: ParameterDto}) {
    this.editParameterEvent.emit({...payload, serviceId: this.selectedService.id})
  }

  deleteParameter(payload: { parameterId: number }) {
    this.deleteParameterEvent.emit({...payload, serviceId: this.selectedService.id})
  }

  loadParameter() {
    this.loadParameterEvent.emit()
  }

  linkParameter() {
    this.linkParameterEvent.emit()
  }
}
