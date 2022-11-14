import { createFeatureSelector, createSelector } from '@ngrx/store';
import {ServiceDto} from "../models/service.dto";
import {
  EServiceCatalogPageActions,
  ServiceCatalogPageActions,
} from "./service-catalog-page.actions";
import {ParameterDto} from "../models/parameter.dto";

export interface ServiceCatalogPageState {
  services: ServiceDto[];
  selectedService: ServiceDto | null;
  availableParameters: ParameterDto[];
}

export const initialServiceCatalogPageState: ServiceCatalogPageState = {
  services: [],
  selectedService: null,
  availableParameters: [],
};

export const serviceCatalogPageKey = 'serviceCatalogPage';

export const serviceCatalogPageReducer = (
  state = initialServiceCatalogPageState,
  action: ServiceCatalogPageActions
): ServiceCatalogPageState => {
  switch (action.type) {
    case EServiceCatalogPageActions.SET_SERVICES_LIST_ACTION: {
      return {
        ...state,
        services: action.payload.services,
      };
    }
    case EServiceCatalogPageActions.SET_SELECTED_SERVICE_ACTION: {
      return {
        ...state,
        selectedService: action.payload.service,
      };
    }
    case EServiceCatalogPageActions.SET_AVAILABLE_PARAMETERS_ACTION: {
      return {
        ...state,
        availableParameters: action.payload.parameters,
      };
    }
    default:
      return state;
  }
};

export const featureSelector = createFeatureSelector<ServiceCatalogPageState>(serviceCatalogPageKey);
export const servicesSelector = createSelector(featureSelector, (state) => state.services);
export const selectedServiceSelector = createSelector(featureSelector, (state) => state.selectedService);
export const availableParametersSelector = createSelector(featureSelector, (state) => state.availableParameters);
