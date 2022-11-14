import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  ADD_PARAMETER_REQUEST,
  CREATE_SERVICE_REQUEST, DELETE_PARAMETER_REQUEST, EDIT_PARAMETER_REQUEST, EDIT_SERVICE_REQUEST,
  EServiceCatalogPageActions, GET_AVAILABLE_PARAMETERS_REQUEST, GET_SERVICE_REQUEST,
  GET_SERVICES_LIST_REQUEST,
  SEARCH_SERVICES_REQUEST, SET_AVAILABLE_PARAMETERS, SET_SELECTED_SERVICE,
  SET_SERVICES_LIST
} from "./service-catalog-page.actions";
import {ServiceCatalogService} from "../services/service-catalog.service";

@Injectable()
export class ServiceCatalogPageEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly catalogService: ServiceCatalogService,
  ) {}

  getServiceList$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GET_SERVICES_LIST_REQUEST>(EServiceCatalogPageActions.GET_SERVICES_LIST_REQUEST_ACTION),
      mergeMap(() =>
        this.catalogService.getServicesList().pipe(
          switchMap((services) => of(new SET_SERVICES_LIST({services}))),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );

  getService$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GET_SERVICE_REQUEST>(EServiceCatalogPageActions.GET_SERVICE_REQUEST_ACTION),
      map(action => action.payload),
      mergeMap(({id}) =>
        this.catalogService.getServiceById(id).pipe(
          switchMap((service) => of(new SET_SELECTED_SERVICE({service}))),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );

  createService$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CREATE_SERVICE_REQUEST>(EServiceCatalogPageActions.CREATE_SERVICE_REQUEST_ACTION),
      map(action => action.payload),
      mergeMap((payload) =>
        this.catalogService.createService(payload).pipe(
          switchMap((service) => of(new GET_SERVICES_LIST_REQUEST())),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );

  editService$ = createEffect(() =>
    this.actions$.pipe(
      ofType<EDIT_SERVICE_REQUEST>(EServiceCatalogPageActions.EDIT_SERVICE_REQUEST_ACTION),
      map(action => action.payload),
      mergeMap((payload) =>
        this.catalogService.editService(payload).pipe(
          switchMap((service) => of(new GET_SERVICES_LIST_REQUEST())),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );

  getAvailableParameters$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GET_AVAILABLE_PARAMETERS_REQUEST>(EServiceCatalogPageActions.GET_AVAILABLE_PARAMETERS_REQUEST_ACTION),
      mergeMap(() =>
        this.catalogService.getAvailableParameters().pipe(
          switchMap((parameters) => of(new SET_AVAILABLE_PARAMETERS({parameters}))),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );

  addParameterToService$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ADD_PARAMETER_REQUEST>(EServiceCatalogPageActions.ADD_PARAMETER_REQUEST_ACTION),
      map(action => action.payload),
      mergeMap(({serviceId, parameterId}) =>
        this.catalogService.addParameterToService(serviceId, parameterId).pipe(
          switchMap(() => of(new GET_SERVICE_REQUEST({id: serviceId}))),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );

  deleteParameter$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DELETE_PARAMETER_REQUEST>(EServiceCatalogPageActions.DELETE_PARAMETER_REQUEST_ACTION),
      map(action => action.payload),
      mergeMap(({serviceId, parameterId}) =>
        this.catalogService.deleteParameter(parameterId).pipe(
          switchMap(() => of(new GET_SERVICE_REQUEST({id: serviceId}))),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );

  editParameter$ = createEffect(() =>
    this.actions$.pipe(
      ofType<EDIT_PARAMETER_REQUEST>(EServiceCatalogPageActions.EDIT_PARAMETER_REQUEST_ACTION),
      map(action => action.payload),
      mergeMap(({serviceId, parameter}) =>
        this.catalogService.editParameter(serviceId, parameter).pipe(
          switchMap(() => of(new GET_SERVICE_REQUEST({id: serviceId}))),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );

  searchServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SEARCH_SERVICES_REQUEST>(EServiceCatalogPageActions.SEARCH_SERVICES_REQUEST_ACTION),
      map(action => action.payload),
      mergeMap(({term}) =>
        this.catalogService.searchServices(term).pipe(
          switchMap((services) => of(new SET_SERVICES_LIST({services}))),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );
}
