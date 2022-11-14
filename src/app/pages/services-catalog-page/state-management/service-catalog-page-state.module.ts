import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as reducer from './service-catalog-page.reducers';
import {ServiceCatalogPageEffects} from "./service-catalog-page.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(reducer.serviceCatalogPageKey, reducer.serviceCatalogPageReducer),
    EffectsModule.forFeature([ServiceCatalogPageEffects]),
  ],
})
export class ServiceCatalogPageStateModule {}
