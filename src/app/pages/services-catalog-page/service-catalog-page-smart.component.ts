import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
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
  template: `
    <app-service-catalog-page-presentation
      [services]="(services$ | async)!"
      [selectedService]="(selectedService$ | async)!"
      [clientParameters]="(clientParameters$ | async)!"
      [providerParameters]="(providerParameters$ | async)!"
      [otherParameters]="(otherParameters$ | async)!"
      (addParametersEvent)="openAddParametersModal($event)"
      (editParameterEvent)="openEditParameterModal($event)"
      (deleteParameterEvent)="deleteParameter($event)"
      (loadParameterEvent)="loadParameter()"
      (linkParameterEvent)="linkParameter()"
    >
    </app-service-catalog-page-presentation>
  `,
  styleUrls: ['./service-catalog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCatalogPageSmartComponent implements OnInit, OnDestroy {
  public services$: Observable<ServiceDto[]>
  public selectedService$: Observable<ServiceDto | null>

  public clientParameters$: Observable<ParameterDto[]>
  public providerParameters$: Observable<ParameterDto[]>
  public otherParameters$: Observable<ParameterDto[]>

  public parameterCategoryEnum: typeof ParameterCategoryEnum = ParameterCategoryEnum
  private routeSubscription: Subscription

  constructor(
    private readonly store: Store,
    private readonly activateRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) {
    this.routeSubscription = activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new GET_SERVICE_REQUEST({id: Number(params['id'])}))
      }
    });
    this.services$ = this.store.pipe(select(servicesSelector));
    this.selectedService$ = this.store.pipe(select(selectedServiceSelector));

    this.clientParameters$ = this.selectedService$.pipe(
      map(service => service?.parameters || []),
      map(parameters => parameters.filter(parameter => parameter.category === ParameterCategoryEnum.CLIENT))
    )
    this.providerParameters$ = this.selectedService$.pipe(
      map(service => service?.parameters || []),
      map(parameters => parameters.filter(parameter => parameter.category === ParameterCategoryEnum.PROVIDER))
    )
    this.otherParameters$ = this.selectedService$.pipe(
      map(service => service?.parameters || []),
      map(parameters => parameters.filter(parameter => parameter.category === ParameterCategoryEnum.OTHER))
    )
  }

  ngOnInit(): void {
    this.store.dispatch(new GET_SERVICES_LIST_REQUEST())
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }

  openAddParametersModal(payload: {serviceId: number, category: ParameterCategoryEnum}) {
    const addParameter = (parameter: ParameterDto) => {
      this.store.dispatch(new ADD_PARAMETER_REQUEST({serviceId: payload.serviceId, parameterId: parameter.id}))
    }

    this.selectedService$.pipe(first()).subscribe(service => {
      this.matDialog.open(AddParametersModalComponent, {
        data: {
          saveFunction: addParameter,
          category: payload.category,
          service
        } as AddParametersModal,
        autoFocus: false
      });
    })
  }

  openEditParameterModal(payload: { serviceId: number, parameter: ParameterDto }) {
    const editParameter = (editedParameter: ParameterDto) => {
      this.store.dispatch(new EDIT_PARAMETER_REQUEST({serviceId: payload.serviceId, parameter: editedParameter}))
    }

    this.matDialog.open(EditParameterModalComponent, {
      data: {
        saveFunction: editParameter,
        parameter: payload.parameter,
      } as EditParameterModal,
      autoFocus: false
    });
  }

  deleteParameter(payload: { serviceId: number, parameterId: number }) {
    this.store.dispatch(new DELETE_PARAMETER_REQUEST({
      serviceId: payload.serviceId,
      parameterId: payload.parameterId
    }))
  }

  loadParameter() {
    console.log('loadParameter')
  }

  linkParameter() {
    console.log('linkParameter')
  }
}
