import { Action } from '@ngrx/store';
import {ServiceDto} from "../models/service.dto";
import {EditServiceRequestDto} from "../models/edit-service.request.dto";
import { CreateServiceRequestDto } from '../models/create-service.request.dto';
import {ParameterDto} from "../models/parameter.dto";

export enum EServiceCatalogPageActions {
  GET_SERVICES_LIST_REQUEST_ACTION = '[service-catalog-page] GET_SERVICES_LIST_REQUEST_ACTION',
  SET_SERVICES_LIST_ACTION = '[service-catalog-page] SET_SERVICES_LIST_ACTION',
  GET_SERVICE_REQUEST_ACTION = '[service-catalog-page] GET_SERVICE_REQUEST_ACTION',
  SET_SELECTED_SERVICE_ACTION = '[service-catalog-page] SET_SELECTED_SERVICE_ACTION',
  SEARCH_SERVICES_REQUEST_ACTION = '[service-catalog-page] SEARCH_SERVICES_REQUEST_ACTION',
  CREATE_SERVICE_REQUEST_ACTION = '[service-catalog-page] CREATE_SERVICE_REQUEST_ACTION',
  EDIT_SERVICE_REQUEST_ACTION = '[service-catalog-page] EDIT_SERVICE_REQUEST_ACTION',
  GET_AVAILABLE_PARAMETERS_REQUEST_ACTION = '[service-catalog-page] GET_AVAILABLE_PARAMETERS_REQUEST_ACTION',
  SET_AVAILABLE_PARAMETERS_ACTION = '[service-catalog-page] SET_AVAILABLE_PARAMETERS_ACTION',
  ADD_PARAMETER_REQUEST_ACTION = '[service-catalog-page] ADD_PARAMETER_REQUEST_ACTION',
  DELETE_PARAMETER_REQUEST_ACTION = '[service-catalog-page] DELETE_PARAMETER_REQUEST_ACTION',
  EDIT_PARAMETER_REQUEST_ACTION = '[service-catalog-page] EDIT_PARAMETER_REQUEST_ACTION',
}

export class GET_SERVICES_LIST_REQUEST implements Action {
  public readonly type = EServiceCatalogPageActions.GET_SERVICES_LIST_REQUEST_ACTION;
}

export class SET_SERVICES_LIST implements Action {
  public readonly type = EServiceCatalogPageActions.SET_SERVICES_LIST_ACTION;

  constructor(public payload: { services: ServiceDto[] }) {}
}

export class GET_SERVICE_REQUEST implements Action {
  public readonly type = EServiceCatalogPageActions.GET_SERVICE_REQUEST_ACTION;

  constructor(public payload: { id: number }) {}
}

export class SET_SELECTED_SERVICE implements Action {
  public readonly type = EServiceCatalogPageActions.SET_SELECTED_SERVICE_ACTION;

  constructor(public payload: { service: ServiceDto | null }) {}
}

export class SEARCH_SERVICES_REQUEST implements Action {
  public readonly type = EServiceCatalogPageActions.SEARCH_SERVICES_REQUEST_ACTION;

  constructor(public payload: { term: string }) {}
}

export class CREATE_SERVICE_REQUEST implements Action {
  public readonly type = EServiceCatalogPageActions.CREATE_SERVICE_REQUEST_ACTION;

  constructor(public payload: CreateServiceRequestDto) {}
}

export class EDIT_SERVICE_REQUEST implements Action {
  public readonly type = EServiceCatalogPageActions.EDIT_SERVICE_REQUEST_ACTION;

  constructor(public payload: EditServiceRequestDto) {}
}

export class GET_AVAILABLE_PARAMETERS_REQUEST implements Action {
  public readonly type = EServiceCatalogPageActions.GET_AVAILABLE_PARAMETERS_REQUEST_ACTION;
}

export class SET_AVAILABLE_PARAMETERS implements Action {
  public readonly type = EServiceCatalogPageActions.SET_AVAILABLE_PARAMETERS_ACTION;

  constructor(public payload: {parameters: ParameterDto[]}) {}
}

export class ADD_PARAMETER_REQUEST implements Action {
  public readonly type = EServiceCatalogPageActions.ADD_PARAMETER_REQUEST_ACTION;

  constructor(public payload: {serviceId: number, parameterId: number}) {}
}

export class DELETE_PARAMETER_REQUEST implements Action {
  public readonly type = EServiceCatalogPageActions.DELETE_PARAMETER_REQUEST_ACTION;

  constructor(public payload: {serviceId: number, parameterId: number}) {}
}

export class EDIT_PARAMETER_REQUEST implements Action {
  public readonly type = EServiceCatalogPageActions.EDIT_PARAMETER_REQUEST_ACTION;

  constructor(public payload: {serviceId: number, parameter: ParameterDto}) {}
}

export type ServiceCatalogPageActions =
  | GET_SERVICES_LIST_REQUEST
  | SET_SERVICES_LIST
  | GET_SERVICE_REQUEST
  | SET_SELECTED_SERVICE
  | SEARCH_SERVICES_REQUEST
  | CREATE_SERVICE_REQUEST
  | EDIT_SERVICE_REQUEST
  | GET_AVAILABLE_PARAMETERS_REQUEST
  | SET_AVAILABLE_PARAMETERS
  | ADD_PARAMETER_REQUEST
  | DELETE_PARAMETER_REQUEST;
