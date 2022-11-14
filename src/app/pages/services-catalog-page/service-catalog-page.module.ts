import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {ServiceCatalogPageSmartComponent} from './service-catalog-page-smart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {WidgetsPreviewComponent} from "./components/widgets-preview/widgets-preview.component";
import {ServiceItemComponent} from "./components/service-item/service-item.component";
import {ParametersListComponent} from "./components/parameters-list/parameters-list.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {ServiceCatalogPageStateModule} from "./state-management/service-catalog-page-state.module";
import {ServiceCatalogService} from "./services/service-catalog.service";
import {ParameterItemComponent} from "./components/parameter-item/parameter-item.component";
import {MatMenuModule} from "@angular/material/menu";
import {CoreModule} from "../../core/components/core.module";
import {MatDialogModule} from '@angular/material/dialog';
import {AddParametersModalComponent} from "./components/add-parameter-modal/add-parameters-modal.component";
import {AddEditServiceModalComponent} from './components/add-edit-service-modal/add-edit-service-modal.component';
import {EditParameterModalComponent} from "./components/edit-parameter-modal/edit-parameter-modal.component";
import {ParametersService} from "./services/parameters.service";
import {ServicesListComponent} from "./components/services-list/services-list.component";
import {OrdersListWidgetComponent} from "./components/widgets/orders-list-widget/orders-list-widget.component";
import {OrderWidgetComponent} from "./components/widgets/order-widget/order-widget.component";
import {MatTableModule} from "@angular/material/table";
import {MatSliderModule} from "@angular/material/slider";
import {ServiceCatalogPagePresentationComponent} from "./service-catalog-page-presentation.component";
import {ServiceScreenWidgetComponent} from "./components/widgets/service-screen-widget/service-screen-widget.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

const routes: Routes = [
  {
    path: 'services',
    component: ServiceCatalogPageSmartComponent,
  },
  {
    path: 'services/:id',
    component: ServiceCatalogPageSmartComponent
  }
];

export const MATERIAL_MODULES = [
  MatIconModule,
  MatInputModule,
  MatDividerModule,
  MatButtonModule,
  MatExpansionModule,
  MatMenuModule,
  MatDialogModule,
  MatSliderModule,
  MatTableModule,
  MatButtonToggleModule,
];

@NgModule({
  declarations: [
    ServiceCatalogPageSmartComponent,
    ServiceCatalogPagePresentationComponent,
    ServicesListComponent,
    ServiceItemComponent,
    WidgetsPreviewComponent,
    ParametersListComponent,
    ParameterItemComponent,
    AddEditServiceModalComponent,
    AddParametersModalComponent,
    EditParameterModalComponent,
    OrdersListWidgetComponent,
    OrderWidgetComponent,
    ServiceScreenWidgetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ServiceCatalogPageStateModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ...MATERIAL_MODULES,
  ],
  providers: [ServiceCatalogService, ParametersService],
  exports: [ServiceCatalogPageSmartComponent, RouterModule],
  bootstrap: [ServiceCatalogPageSmartComponent],
})
export class ServiceCatalogPageModule {
}
